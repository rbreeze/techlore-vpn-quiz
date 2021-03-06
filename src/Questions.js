class Question {
    constructor(prompt, choices, criteria, multi, choice) {
        this.prompt = prompt;
        this.choices = choices;
        this.criteria = criteria; 
        this.choice = choice;
        this.multi = multi
    }

    ask() {
        var display = this.prompt + '\n'; 
        for (var i = 0; i < this.choices.length; i++) {
            display += (Number(i+1) + ". " + this.choices[i] + '\n'); 
        }
        return display; 
    }
    
    filterVPNs(vpns) {
        return vpns.filter(this.criteria(this.choice));
    }

}

var criteria = new Array(5); 

criteria[0] = (choice) => {
    return (vpn) => {
        var r; 
        var opt1 =  vpn["Security Score"] > 3 &&
                    vpn["Privacy Score"] > 3 &&
                    (vpn["OpenVPN"] == "Yes" || vpn["Wireguard"] == "Yes") &&
                    vpn["System Killswitch"] == "Yes" &&
                    vpn["Strongest Data Encryption"] == "AES 256" &&
                    (vpn["Strongest Handshake Encryption"] == "RSA 2048" || vpn["Strongest Handshake Encryption"] == "RSA 4096") &&
                    (vpn["Logging Policy"] == "No Logs" || vpn["Logging Policy"] == "Timestamps/Bandwidth" || vpn["Logging Policy"] == "Timestamp") &&
                    vpn["History (S)"] != "Questionable";

        var opt2 =  vpn["Stability Score"] > 4 &&
                    vpn["System Killswitch"] == "Yes" &&
                    (vpn["Logging Policy"] == "No Logs" || vpn["Logging Policy"] == "Timestamps/Bandwidth" || vpn["Logging Policy"] == "Timestamp"); 

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

criteria[1] = (choice) => {
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
                    vpn["Settings Score"] < 4
                break;
            default: 
                r = true
        }
        return r; 
    }
}

criteria[2] = (choice) => {
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

criteria[3] = (choice) => {
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

criteria[4] = (choices) => {
    return (vpn) => {
        var r = true;
        for (var choice of choices) {
            switch (choice) {
                case 0: 
                    r = vpn["Windows Client?"] == "Yes" && r; 
                    break;
                case 1: 
                    r = vpn["MacOS Client?"] == "Yes" && r; 
                    break;
                case 2: 
                    r = vpn["Linux Client?"] == "Yes" && r; 
                    break;
                case 3: 
                    r = vpn["Linux Client?"] == "Yes" && r; 
                    break;
                case 4: 
                    r = vpn["Android Client?"] == "Yes" && r; 
                    break;
                case 5: 
                    r = vpn["iOS Client?"] == "Yes" && r; 
                    break;
                default: 
                    r = r 
            }
        }
        return r;
    }
}

export { Question, criteria }