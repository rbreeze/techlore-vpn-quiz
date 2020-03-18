(this["webpackJsonpvpn-finder-react"]=this["webpackJsonpvpn-finder-react"]||[]).push([[0],{11:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(6),i=a.n(s),c=(a(16),a(4)),l=a.n(c),o=a(7),u=a(2),h=a(3),m=a(9),d=a(8),v=a(1),f=a(10),p=function(){function e(t,a,n,r,s){Object(u.a)(this,e),this.prompt=t,this.choices=a,this.criteria=n,this.choice=s,this.multi=r}return Object(h.a)(e,[{key:"ask",value:function(){for(var e=this.prompt+"\n",t=0;t<this.choices.length;t++)e+=Number(t+1)+". "+this.choices[t]+"\n";return e}},{key:"filterVPNs",value:function(e){return e.filter(this.criteria(this.choice))}}]),e}(),E=new Array(5);function b(e,t){return t["Techlore Score"]-e["Techlore Score"]}E[0]=function(e){return function(t){var a,n=t["Security Score"]>3&&t["Privacy Score"]>3&&("Yes"==t.OpenVPN||"Yes"==t.Wireguard)&&"Yes"==t["System Killswitch"]&&"AES 256"==t["Strongest Data Encryption"]&&("RSA 2048"==t["Strongest Handshake Encryption"]||"RSA 4096"==t["Strongest Handshake Encryption"])&&("No Logs"==t["Logging Policy"]||"Timestamps/Bandwidth"==t["Logging Policy"]||"Timestamp"==t["Logging Policy"])&&"Questionable"!=t["History (S)"],r=t["Stability Score"]>4&&"Yes"==t["System Killswitch"]&&("No Logs"==t["Logging Policy"]||"Timestamps/Bandwidth"==t["Logging Policy"]||"Timestamp"==t["Logging Policy"]);switch(e){case 0:a=n;break;case 1:a=r;break;case 2:a=n&&r;break;default:a=!0}return a}},E[1]=function(e){return function(t){var a;switch(e){case 0:a="Beginner"!=t["User Label"]&&t["Settings Score"]>3;break;case 1:a=t["Usage Score"]>3&&t["Settings Score"]>2.5;break;case 2:a="Advanced"!=t["User Label"]&&t["Usage Score"]>3&&t["Settings Score"]<4;break;default:a=!0}return a}},E[2]=function(e){return function(t){var a;switch(e){case 0:a="No"==t["14 Eyes"];break;case 1:a=t["Privacy Score"]>3;break;default:a=!0}return a}},E[3]=function(e){return function(t){var a;switch(e){case 0:a=t["Simultaenous Devices"]>3;break;case 1:a=t["Simultaenous Devices"]>6;break;default:a=!0}return a||"Unlimited"==t["Simultaenous Devices"]}},E[4]=function(e){return function(t){var a=!0,n=!0,r=!1,s=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done);n=!0){switch(i.value){case 0:a="Yes"==t["Windows Client?"]&&a;break;case 1:a="Yes"==t["MacOS Client?"]&&a;break;case 2:case 3:a="Yes"==t["Linux Client?"]&&a;break;case 4:a="Yes"==t["Android Client?"]&&a;break;case 5:a="Yes"==t["iOS Client?"]&&a;break;default:a=a}}}catch(l){r=!0,s=l}finally{try{n||null==c.return||c.return()}finally{if(r)throw s}}return a}};var g=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={isLoaded:!1,questions:[],error:null,selected:0,selections:[],top:[],vpns:[],cur:0,lastQuestion:!1,finished:!1,curVpn:0},a.choose=a.choose.bind(Object(v.a)(a)),a.chooseMulti=a.chooseMulti.bind(Object(v.a)(a)),a.nextQuestion=a.nextQuestion.bind(Object(v.a)(a)),a.changeVpn=a.changeVpn.bind(Object(v.a)(a)),a.finish=a.finish.bind(Object(v.a)(a)),a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a,n,r,s,i,c,o,u,h,m,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://raw.githubusercontent.com/rbreeze/techlore-vpn-quiz/master/vpns.json");case 2:return e.next=4,e.sent.json();case 4:return t=e.sent.sort(b),e.next=7,fetch("https://raw.githubusercontent.com/rbreeze/techlore-vpn-quiz/master/questions.json");case 7:return e.next=9,e.sent.json();case 9:for(a=e.sent,n=Array(a.length),r=[],s=0,i=!0,c=!1,o=void 0,e.prev=16,u=a[Symbol.iterator]();!(i=(h=u.next()).done);i=!0)m=h.value,d=m["Max Selections"],n[s]=new p(m.Prompt,m.Choices,E[s],d),r=d>1?Array(d):[],s++;e.next=24;break;case 20:e.prev=20,e.t0=e.catch(16),c=!0,o=e.t0;case 24:e.prev=24,e.prev=25,i||null==u.return||u.return();case 27:if(e.prev=27,!c){e.next=30;break}throw o;case 30:return e.finish(27);case 31:return e.finish(24);case 32:r.fill(!1),r[0]=!0,this.setState({isLoaded:!0,vpns:t,top:t.slice(0,3),questions:n,selections:r});case 35:case"end":return e.stop()}}),e,this,[[16,20,24,32],[25,,27,31]])})));return function(){return e.apply(this,arguments)}}()},{key:"choose",value:function(e){this.setState({selected:e})}},{key:"chooseMulti",value:function(e){var t=this.state.selections;t[e]=!t[e],this.setState({selections:t})}},{key:"nextQuestion",value:function(){var e=this.state.cur,t=this.state.questions,a=e>=t.length-1?0:e+1;t[e].choice=t[e].multi?this.state.selections:this.state.selected;var n=t[e].filterVPNs(this.state.vpns).sort(b);this.setState({cur:a,vpns:n,top:n.slice(0,3),selected:0,questions:t,lastQuestion:a==t.length-1})}},{key:"finish",value:function(){this.setState({finished:!0})}},{key:"changeVpn",value:function(e){this.setState({curVpn:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoaded,n=t.questions,s=t.error,i=t.selected,c=t.top,l=t.vpns,o=t.cur,u=t.lastQuestion,h=t.finished,m=t.curVpn,d=t.selections;if(s)return r.a.createElement("div",null,"Error: ",s.message);if(a){var v,f;if(l.length>0){var p=c[m];v=r.a.createElement("div",null,r.a.createElement("h2",null," ",p.VPN," "),r.a.createElement("div",{className:"cur-vpn"},r.a.createElement("div",{className:"row"},r.a.createElement("div",null," User Level ")," ",r.a.createElement("div",{className:"right"}," ",p["User Label"]," ")),r.a.createElement("div",{className:"row"},r.a.createElement("div",null," Security ")," ",r.a.createElement("div",{className:"right"}," ",p["Security Score"]," / 5 ")),r.a.createElement("div",{className:"row"},r.a.createElement("div",null," Privacy ")," ",r.a.createElement("div",{className:"right"}," ",p["Privacy Score"]," / 5 ")),r.a.createElement("div",{className:"row"},r.a.createElement("div",null," Speed ")," ",r.a.createElement("div",{className:"right"}," ",p["Speed Score"]," / 5 ")))),f=r.a.createElement("div",null,r.a.createElement("h2",null," Your Top VPNs "),r.a.createElement("ul",{className:"vpn-list"},c.map((function(t,a){return r.a.createElement("li",{key:a,onClick:function(){return e.changeVpn(a)},className:a==m?"selected":""},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"name"}," ",t.VPN," "),r.a.createElement("div",{className:"metadata"}," ",t["Techlore Score"]," / 5 ")))}))))}else f=r.a.createElement("div",null),v=r.a.createElement("div",null,r.a.createElement("h2",null," No VPNs found! "));var E,b=r.a.createElement("div",null,r.a.createElement("h2",null," Welcome to the Techlore VPN Quiz "),r.a.createElement("div",null," This VPN Finder Tool will match you with services that fit your needs best. Surprisingly, we\u2019ve found it only takes 5 questions to narrow most users down to their ideal list of VPN services. Please note there are other features this quiz does not evaluate, and if you do have specific requirements for a feature, this tool won\u2019t likely include it. This is currently limited to services offered on our VPN Chart. Speeds are NOT currently taken into consideration, but will once reviews are updated with The Speed Team testing. ")),g=n[o],y=g.prompt,S=g.choices,N=g.multi||!1,k=u?r.a.createElement("button",{onClick:this.finish},r.a.createElement("i",{className:"fas fa-check"})):r.a.createElement("button",{onClick:this.nextQuestion},r.a.createElement("i",{className:"fas fa-arrow-right"})),w=r.a.createElement("i",{className:"fas fa-check"}),P=r.a.createElement("i",null);return E=h?r.a.createElement("div",{className:"content"},r.a.createElement("h2",{className:"prompt"}," Thanks for taking the quiz! "),r.a.createElement("div",null," Your results are to the left. "),r.a.createElement("div",null," Click ",r.a.createElement("a",{href:"https://techlore.tech"},"here")," to return to the Techlore homepage.")):r.a.createElement("div",{className:"content"},r.a.createElement("h2",{className:"prompt"}," ",y," "),r.a.createElement("div",{className:"choices"},S.map((function(t,a){return r.a.createElement("div",{key:a,className:"choice",onClick:N?function(){return e.chooseMulti(a)}:function(){return e.choose(a)}},r.a.createElement("div",{className:"radio"},(N?1==d[a]:Number(i)==a)?w:P),r.a.createElement("label",null," ",t," "))}))),r.a.createElement("div",{className:"progress"},r.a.createElement("div",null," Question ",o+1," / ",n.length," "),k)),r.a.createElement("div",{className:"finder"},r.a.createElement("div",{className:"results"},r.a.createElement("div",{className:"c"}," ",0==o?b:[f,v]," ")),r.a.createElement("div",{className:"question"},E))}return r.a.createElement("div",null,"Loading...")}}]),t}(r.a.Component);var y=function(){return r.a.createElement("div",{id:"app"},r.a.createElement(g,null))};i.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.18a12446.chunk.js.map