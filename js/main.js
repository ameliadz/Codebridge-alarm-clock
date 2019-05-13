var currentTime;

function time() {
	var now = new Date(); //get current date object
	var hrs = now.getHours(); // get current hours
	var min = now.getMinutes(); // get current minutes
	var sec = now.getSeconds(); // get current seconds
	var ampm;

	// figure out AM or PM
	if (hrs < 12) {
		ampm = "AM";
	} else {
		ampm = "PM";
	}

	// convert to 12-hour from 24-hour
	if (hrs > 12) {
		hrs -= 12;
	} else {
		hrs;
	}

	// add a leading zero to get hh:mm format
	function leadingZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	//update time holder variables to reflect leading zero
	hrs = leadingZero(hrs);
	min = leadingZero(min);
	sec = leadingZero(sec);

	// make sure midnight displays as 12
	if (hrs == 0) {
		hrs = 12;
	} else {
		hrs;
	}

	//create full time holder
	currentTime = hrs + ":" + min + ":" + sec + " " + ampm;
	//put it in the div
	document.getElementById('clock').innerHTML = currentTime;
	setTimeout(time, 1000); // rerun the function every second to update
}


// ALARM SOUND
var alarmSound = document.getElementById('sound');

// variables for buttons
var reset = document.getElementById('reset-alarm');
var set = document.getElementById('submit-alarm');
var ambutton = document.getElementById('am');
var pmbutton = document.getElementById('pm');
var alarmTime;


//CLEAR ALARM INPUT
function clearAlarm() {
	document.getElementById('set-alarm').value = "";
	reset.disabled = true;
	set.disabled = false;
	ambutton.checked = false;
	pmbutton.checked = false;
	if (alarmSound.play() !== false) {
		alarmSound.pause();
	}
}


var alarmTime;
//SET ALARM
function setAlarm() {

	// var alarmTimeHrs;
	// var alarmTimeMin;
	// var alarmTimeSec;
		// i was going to try to produce an error message if these weren't valid, but instead an error message happened every time, soooo... i gave up on that.
	let alarmTimeAMPM;

	//get time from input field
	alarmTime = document.getElementById('set-alarm').value;
		if (document.getElementById('am').checked) {
			alarmTimeAMPM = "AM"
		} else if (document.getElementById('pm').checked) {
			alarmTimeAMPM = "PM"
		} else {
			alarmTimeAMPM = "AM"
		}

		alarmTime = alarmTime + " " + alarmTimeAMPM;

		document.body.style.background = 'black';
		reset.disabled = false;
		set.disabled = true;
		return alarmTime;
	}


//MAKE SOUND IF IT'S ALARM TIME
function ring() {
	if (currentTime == alarmTime) {
		alarmSound.play();
		//turn the light on
		document.body.style.background = 'linear-gradient(#d0dbff, #faffb7)';
	} else {
		setTimeout('ring()', 500);
	}
}

// STOP THE ALARM
function resetAlarm() {
	set.disabled = false;
	reset.disabled = true;
	alarmTime = "";

	// for some reason it seems to play automatically upon setAlarm() if this says equals true instead of not equals false?
	if (alarmSound.play() !== false) {
		alarmSound.pause();
	}
	// turn the light on again
	document.body.style.background = 'linear-gradient(#d0dbff, #faffb7)';
}
