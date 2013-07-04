var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var express = require('express');

var app = express();
var tid = false;
var interval = 1000 * 60;

app.get('/start', function(req, res) {
    console.log("start called");
    if (!tid) {
        startScreencapture();
    } else {
        console.log("Screencapture alread started. Call /stop to stop.")
    }
    res.send("start called");
});

app.get('/stop', function(req, res) {
    console.log("stop called");
    endScreencapture();
    res.send("stop called");
});

app.listen(3000, 'localhost');
console.log('Express server started');

// start capturing screen shots in a loop
function startScreencapture() {
    console.log("starting screencap loop");
    screencap();
    tid = setInterval(screencap, interval);
}

// stop capturing screenshots in a loop
function endScreencapture() {
    console.log("ending screencap loop");
    clearInterval(tid);
    tid = false; // reset the tid (timerId)
}

// take an actual screencapture
function screencap() {
    console.log("capturing screenshot - current time: " + new Date());
    exec("screencapture -x ./img/screencap_" + Date.now() + ".png", puts); // screencap on interval timer
}