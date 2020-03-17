const rl = require('readline-sync'); 
const vpns = require('./vpns.json');
const questionData = require('./questions.json');

class Question {
    constructor(prompt, choices, criteria, choice) {
        this.prompt = prompt;
        this.choices = choices;
        this.criteria = criteria; 
        this.choice = choice;
    }

    ask() {
        var display = this.prompt + '\n'; 
        for (var i = 0; i < this.choices.length; i++) {
            display += (Number(i+1) + ". " + this.choices[i] + '\n'); 
        }
        return display; 
    }

    getChoice() {
        this.choice = Number(rl.question(this.ask()) - 1);
    }

    filterVPNs(vpns) {
        return vpns.filter(this.criteria(this.choice));
    }

}

var questions = Array(questionData.length); // array of questions
var i = 0; 
for (var q of questionData) {
    questions[i] = (new Question(q["Prompt"], q["Choices"])); 
    i++; 
}

function printVPNs(vpns) {
    for (var vpn of vpns) {
        console.log(vpn["VPN"] + ": " + vpn["Techlore Score"]);
    } 
}

function findVPN(initialPool) {
    var i = 0; 
    var curPool = initialPool; 
    while (i < questions.length) {
        curQuestion = questions[i]; 
        curQuestion.getChoice(); 
        curPool = curQuestion.filterVPNs(curPool); 
        printVPNs(curPool); 
        i++;
    }
    return curPool;
}

questions[0].criteria = (choice) => {
    return (vpn) => {
        var r; 
        var opt1 =  vpn["Security Score"] > 3 &&
                    vpn["Privacy Score"] > 3 &&
                    (vpn["OpenVPN"] == "Yes" || vpn["Wireguard"] == "Yes") &&
                    vpn["System Killswitch"] == "Yes" &&
                    vpn["Strongest Data Encryption"] == "AES 256" &&
                    (vpn["Strongest Handshake Encryption"] == "RSA 2048" || vpn["Strongest Handshake Encryption"] == "RSA 4096") &&
                    vpn["Logging Policy"] == "No Logs" &&
                    vpn["History (S)"] != "Questionable";

        var opt2 =  vpn["Stability Score"] > 4 &&
                    vpn["System Killswitch"] == "Yes" &&
                    vpn["Logging Policy"] == "No Logs"; 

        switch (choice) {
            case 0:
                r = opt1; 
                break;
            case 1:
                r = opt2; 
                break;
            case 2: 
                r = opt1 && opt2; 
                break;
            default: 
                r = true;
        }
        return r; 
    }
}

questions[1].criteria = (choice) => {
    return (vpn) => {
        var r; 
        switch (choice) {
            case 0: 
                r = vpn["User Label"] != "Beginner" &&
                    vpn["Settings Score"] > 3
                break;
            case 1: 
                r =
                    vpn["Usage Score"] > 3 &&
                    vpn["Settings Score"] > 2.5
                break;
            case 2: 
                r = vpn["User Label"] != "Advanced" &&
                    vpn["Usage Score"] > 3 &&
                    vpns["Settings Score"] < 4
                break;
            default: 
                r = true
        }
        return r; 
    }
}

questions[2].criteria = (choice) => {
    return (vpn) => {
        var r;
        switch (choice) {
            case 0: 
                r = vpn["14 Eyes"] == "No"
                break; 
            case 1: 
                r = vpn["Privacy Score"] > 3
                break;
            default: 
                r = true
        }
        return r;
    }
}

questions[3].criteria = (choice) => {
    return (vpn) => {
        var r;
        switch (choice) {
            case 0: 
                r = vpn["Simultaenous Devices"] > 3
                break;
            case 1: 
                r = vpn["Simultaenous Devices"] > 6
                break;
            default: 
                r = true
        }
        return r || vpn["Simultaenous Devices"] == "Unlimited";
    }
}

questions[4].criteria = (choice) => {
    return (vpn) => {
        var r;
        switch (choice) {
            case 0: 
                r = vpn["Windows Client?"] == "Yes"
                break;
            case 1: 
                r = vpn["MacOS Client?"] == "Yes"
                break;
            case 2: 
                r = vpn["Linux Client?"] == "Yes"
                break;
            case 3: 
                r = vpn["Linux Client?"] == "Yes"
                break;
            case 4: 
                r = vpn["Android Client?"] == "Yes"
                break;
            case 5: 
                r = vpn["iOS Client?"] == "Yes"
                break;
            default: 
                r = true
        }
        return r;
    }
}

let res = findVPN(vpns); 
