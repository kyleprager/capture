var url = "http://127.0.0.1:3000/";
var startUrl = url + "start";
var stopUrl  = url + "stop";
var img = document.createElement("img");
var max = 95; // minutes
var jid = '27965_194052@chat.hipchat.com';

var pid = setInterval(function(){
    var x = $("div [jid='" + jid + "']").find('.idle').html();
    var y = x.split(" ");
    for (var i = 0; i < y.length; i++) {
        y[i] = y[i].replace("h", "");
        y[i] = y[i].replace("m", "");
        y[i] = parseInt(y[i] || 0);
    }
    var mins = 0;
    if (y.length > 1) {
        mins += y[0] * 60;
        mins += y[1];
    }
    console.log(mins);
    if (mins > max) {
        max = mins;
        img.src = startUrl;
    }
    if (mins < max) {
        img.src = stopUrl;
    }
}, 1000);
function end() {
    clearInterval(pid);
}



//// code to paste in first to test people