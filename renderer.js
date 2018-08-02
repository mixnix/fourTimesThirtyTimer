function oneBlock(){
    console.log('30min');
    alert('30min');
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
