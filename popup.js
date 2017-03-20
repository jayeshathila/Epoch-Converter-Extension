document.addEventListener('DOMContentLoaded', function() {
 var days = ['Sun','Mon','Tue','We','Thu','Fri','Sat'];
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 epochTicker();
 var button = document.getElementById('button');
 button.addEventListener('click', function() {
  myFunction();
}, false);
 var epochInput = document.getElementById('epoch');
 epochInput.addEventListener('keydown', function(e) {

    if (e.keyCode == 13) {
      myFunction();  
    }}
    );
function myFunction() {
    var val  = document.getElementById("epoch").value;
    if(!isInt(val) || val.length < 10) {
      setError();
      return;
    }
    if(val.length == 10) {
      val = val + "000";
    }
    setValidDisplayProperty();
    var date = new Date(parseInt(val));
    document.getElementById("local").textContent = date.toString();
    var gmt = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
     var gmt = date.toUTCString();
    document.getElementById("gmt").textContent = days[date.getUTCDay()] + " " + months[date.getUTCMonth()] + " " + date.getUTCDate() + " " + date.getUTCFullYear() + " " + date.getUTCHours() +":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
}

function setError() {
      setErrorDisplayProperty();
      var error_el = document.getElementById("error").textContent ="Incorrect epoch";
}

function setErrorDisplayProperty() {
  document.getElementById("error_div").style.display ="inline";
  document.getElementById("gmt_div").style.display ="none";
  document.getElementById("local_div").style.display ="none";
}

function setValidDisplayProperty() {
 document.getElementById("error_div").style.display ="none";
  document.getElementById("gmt_div").style.display ="inline";
  document.getElementById("local_div").style.display ="inline"; 
}

function epochTicker() {
    setInterval(function(){ 
          document.getElementById("current_epoch").textContent = parseInt(new Date().getTime()/1000); }, 100);
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}
}, false);