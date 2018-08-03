// Require moment.js
const moment = require('moment');
// Require ipcRender
const {ipcRenderer} = require('electron');

//global object for playing music
var audio = new Audio(__dirname + '/../mp3/take_on_me.mp3');

//array storing how many and how long the timers should be
var timersTime;

//for  message getting from main thread


//const - how many second in one minute, five minutes and
const m5 = {
    seconds : 60*5,
    label : "przerwa!"
};
const m30 = {
    seconds : 60*30,
    label : "blok pracy!"
};
const s5 = {
    seconds : 5,
    label : "blok pracy!"
};
const s3 = {
    seconds : 3,
    label : "przerwa"
};

initialization();

// Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
    return `${min}:${sec}`;
};

function setTimer(interval){

    let currentTime = interval.seconds;

    timerDiv.innerHTML = secondsToTime(currentTime);
    labelDiv.innerHTML = interval.label;

    // Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            restartMusic();

            clearInterval(timer);
        }
    }, 1000); // 1 second
}

function setNextTimer() {
    // console.log("timerTime: " + timersTime);
    var timerObject = timersTime.shift()

    // console.log("setTime: " + setTime);
    if (timerObject === undefined) {
        return;
    }else {
        setTimer(timerObject);
    }
}

ipcRenderer.on('global-shortcut', function (arg) {
    stopMusic();
    setNextTimer();
});

function initialization(){
    window.onload = function(){
        document.querySelector('#one').addEventListener('click', oneBlock);
        document.querySelector('#two').addEventListener('click', twoBlocks);
        document.querySelector('#three').addEventListener('click', threeBlocks);
        document.querySelector('#four').addEventListener('click', fourBlocks);

        document.querySelector('#stopMusic').addEventListener('click', stopMusic);
        document.querySelector('#stopMusic').addEventListener('click', setNextTimer);


    }
}

function oneBlock(){
    //set timer gor 30min = 30 * 60s
    setTimer(m30);
}
function twoBlocks(){
    timersTime = [m5, m30];
    setTimer(m30);
}
function threeBlocks(){
    timersTime = [m5, m30, m5, m30,];
    setTimer(m30);
    // timersTime = [s3, s5];
    // setTimer(s5)
}
function fourBlocks(){
    timersTime = [m5, m30, m5, m30, m5, m30];
    setTimer(m30);
}

function restartMusic(){
    audio.currentTime = 0;
    audio.play();
}

function stopMusic(){
    audio.pause();
    audio.currentTime = 0;
}


