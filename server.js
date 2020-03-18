// server
var express = require('express')
var app = express(); 
app.use(express.static('finder/build'));
let port = 5000;
app.listen(port); 
console.log("App running on port " + port); 

const rl = require('readline-sync'); 
const vpns = require('./vpns.json');
const questions = require('./questions.json');

app.get('/vpns', (req, res) => {
    res.send({ vpns: vpns }); 
});

app.get('/questions', (req, res) => {
    res.send({ questions: questions }); 
});
