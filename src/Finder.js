import { Question, criteria } from './Questions'
import React, { Component } from 'react';

function vpnCompare(a, b) {
    return b["Techlore Score"] - a["Techlore Score"]; 
};

class Finder extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            isLoaded: false, 
            questions: [],
            error: null, 
            selected: 0, 
            selections: [], 
            top: [], 
            vpns: [], 
            cur: 0, 
            lastQuestion: false, 
            finished: false, 
            curVpn: 0
        };

        this.choose = this.choose.bind(this);
        this.chooseMulti = this.chooseMulti.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this); 
        this.changeVpn = this.changeVpn.bind(this);
        this.finish = this.finish.bind(this); 
    } 

    async componentDidMount() {
        let vpnData = (await (await fetch("https://raw.githubusercontent.com/rbreeze/techlore-vpn-quiz/master/vpns.json")).json()).sort(vpnCompare); 
        let questionData = (await (await fetch("https://raw.githubusercontent.com/rbreeze/techlore-vpn-quiz/master/questions.json")).json()); 

        var questions = Array(questionData.length);
        var selections = []; 
        var i = 0; 
        for (var q of questionData) {
            let m = q["Max Selections"]; 
            questions[i] = (new Question(q["Prompt"], q["Choices"], criteria[i], m)); 
            selections = m > 1 ? Array(m) : []; 
            i++; 
        }

        selections.fill(false); 
        selections[0] = true; 

        this.setState({
            isLoaded: true, 
            vpns: vpnData,
            top: vpnData.slice(0,3),
            questions: questions, 
            selections: selections
        })
    }

    choose(i) {
        this.setState({ selected: i });
    }

    chooseMulti(i) {
        var newSelections = this.state.selections; 
        newSelections[i] = !newSelections[i]; 
        this.setState({ selections: newSelections }); 
    }

    nextQuestion() {
        let cur = this.state.cur;
        let questions = this.state.questions; 
        let next = cur >= questions.length-1 ? 0 : cur+1; 

        questions[cur].choice = questions[cur].multi ? this.state.selections : this.state.selected; 
        let newPool = questions[cur].filterVPNs(this.state.vpns).sort(vpnCompare);

        this.setState({ cur: next, vpns: newPool, top: newPool.slice(0,3), selected: 0, questions: questions, lastQuestion: next == questions.length-1 }); 
    }

    finish() {
        this.setState({ finished: true });
    }

    changeVpn(i) {
        this.setState({ curVpn: i }); 
    }

    render() {
        const { isLoaded, questions, error, selected, top, vpns, cur, lastQuestion, finished, curVpn, selections } = this.state; 

        if (error) { return (<div>Error: {error.message}</div>) }
        else if (!isLoaded) { return (<div>Loading...</div>) }
        else {

            var curVpnView; 
            var vpnList; 

            if (vpns.length > 0) {
                let cv = top[curVpn]; 
                curVpnView = (
                    <div>
                        <h2> {cv["VPN"]} </h2> 
                        <div className="cur-vpn"> 
                            <div className="row"> 
                                <div> User Level </div> <div className="right"> {cv["User Label"]} </div> 
                            </div> 
                            <div className="row"> 
                                <div> Security </div> <div className="right"> {cv["Security Score"]} / 5 </div> 
                            </div> 
                            <div className="row">
                                <div> Privacy </div> <div className="right"> {cv["Privacy Score"]} / 5 </div> 
                            </div> 
                            <div className="row"> 
                                <div> Speed </div> <div className="right"> {cv["Speed Score"]} / 5 </div> 
                            </div> 
                        </div> 
                    </div> 
                )

                vpnList = (
                    <div> 
                        <h2> Your Top VPNs </h2> 
                        <ul className="vpn-list"> 
                            { top.map((vpn, key) => (
                                <li key={key} onClick={() => this.changeVpn(key)} className={key == curVpn ? "selected" : ""}> 
                                    <div className="content">
                                        <div className="name"> {vpn["VPN"]} </div>
                                        <div className="metadata"> {vpn["Techlore Score"]} / 5 </div> 
                                    </div> 
                                </li> 
                            ))}
                        </ul> 
                    </div> 
                )
            } else {
                vpnList = (<div></div>); 
                curVpnView = (
                    <div>
                        <h2> No VPNs found! </h2> 
                    </div> 
                )
            }

            let intro = (
                <div> 
                    <h2> Welcome to the Techlore VPN Quiz </h2> 
                    <div> This VPN Finder Tool will match you with services that fit your needs best. Surprisingly, we’ve found it only takes 5 questions to narrow most users down to their ideal list of VPN services. Please note there are other features this quiz does not evaluate, and if you do have specific requirements for a feature, this tool won’t likely include it. This is currently limited to services offered on our VPN Chart. Speeds are NOT currently taken into consideration, but will once reviews are updated with The Speed Team testing. </div> 
                </div> 
            )

            let curQuestion = questions[cur]; 
            let prompt = curQuestion.prompt; 
            let choices = curQuestion.choices; 
            let multi = curQuestion.multi || false; 

            let actionButton = lastQuestion ?
                <button onClick={this.finish}><i className="fas fa-check"></i></button> : 
                <button onClick={this.nextQuestion}><i className="fas fa-arrow-right"></i></button>

            let checked = (<i className="fas fa-check"></i>)
            let unchecked = (<i></i>)

            var qc; 

            if (!finished) {
                qc = (
                    <div className="content"> 
                        <h2 className="prompt"> {prompt} </h2>
                        <div className="choices">
                            { choices.map((choice, key) => (
                                <div key={key} className="choice" onClick={ multi ? () => this.chooseMulti(key) : () => this.choose(key)}> 
                                    <div className="radio">{ (multi ? selections[key] == true : Number(selected) == key) ? checked : unchecked }</div> 
                                    <label> {choice} </label> 
                                </div>
                            )) }
                        </div>
                        <div className="progress">
                            <div> Question {cur+1} / {questions.length} </div> 
                            {actionButton}
                        </div>
                    </div> 
                )
            } else {
                qc = (
                    <div className="content"> 
                        <h2 className="prompt"> Thanks for taking the quiz! </h2> 
                        <div> Your results are to the left. </div> 
                        <div> Click <a href="https://techlore.tech">here</a> to return to the Techlore homepage.</div> 
                    </div>     
                )
            }
            return (
                <div className="finder"> 
                    <div className="results">
                        <div className="c"> { cur == 0 ? intro : [vpnList, curVpnView] } </div> 
                    </div> 
                    <div className="question">
                        {qc}
                    </div> 
                </div>
           )
        }
    }
}

export default Finder