const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
// console.log(stopBtn);
const bodyRef = document.querySelector('body');
// console.log(bodyRef);
startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChange);
function changeColor(e) {
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        bodyRef.style.backgroundColor = `${color}`;
    }, 1000);    
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stopChange() {
    stopBtn.setAttribute('disabled', 'disabled');
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
}
