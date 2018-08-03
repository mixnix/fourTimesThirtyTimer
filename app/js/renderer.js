// Require moment.js
const moment = require('moment');
// Require ipcRender
const {ipcRenderer} = require('electron');

//global object for playing music
var audio = new Audio(__dirname + '/../mp3/take_on_me.mp3');

//array storing how many and how long the timers should be
var timersTime;

//const - how many second in one minute, five minutes and
const m5 = 60*5;
const m30 = 60*30;

initialization();

// Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
    return `${min}:${sec}`;
};

function setTimer(seconds){

    let currentTime = seconds;

    timerDiv.innerHTML = secondsToTime(currentTime);

    // Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            restartMusic();

            //document.querySelector('#stopMusic').addEventListener('click', removeListeners);


            clearInterval(timer);
        }
    }, 1000); // 1 second
}

function initialization(){
    window.onload = function(){
        document.querySelector('#one').addEventListener('click', oneBlock);
        document.querySelector('#two').addEventListener('click', twoBlocks);
        document.querySelector('#three').addEventListener('click', threeBlocks);
        document.querySelector('#four').addEventListener('click', fourBlocks);

        document.querySelector('#stopMusic').addEventListener('click', stopMusic);
        document.querySelector('#stopMusic').addEventListener('click', function(){
            // console.log("timerTime: " + timersTime);
            var setTime = timersTime.shift()
            // console.log("setTime: " + setTime);
            if (setTime === undefined) {
                return;
            }else {
                setTimer(setTime);
            }
        });
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


