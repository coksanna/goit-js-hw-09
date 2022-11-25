const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
// console.log(stopBtn);
const bodyRef = document.querySelector('body');
// console.log(bodyRef);
let intervalId = null;
startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChange);
stopBtn.disabled = true;
function changeColor(e) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(() => {
       bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);    
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stopChange() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(intervalId);
}
