// Require moment.js
const moment = require('moment');
// Require ipcRender
const {ipcRenderer} = require('electron');

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
            clearInterval(timer);
        }
    }, 1000); // 1 second
}

function oneBlock(){
    //set timer gor 30min = 30 * 60s
    setTimer(30*60);
}
function twoBlocks(){
    console.log('60min');
    alert('60min');
}
function threeBlocks(){
    console.log('90min');
    alert('90min');
}
function fourBlocks(){
    console.log('120min');
    alert('120min');
}


window.onload = function(){
    document.querySelector('#one').addEventListener('click', oneBlock);
    document.querySelector('#two').addEventListener('click', twoBlocks);
    document.querySelector('#three').addEventListener('click', threeBlocks);
    document.querySelector('#four').addEventListener('click', fourBlocks);
}
