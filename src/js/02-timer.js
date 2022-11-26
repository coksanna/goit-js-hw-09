import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/02-timer.css';

const inputRef = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let timerId = null;
let userDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= options.defaultDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startBtn.disabled = true;
      }
      else {
        startBtn.disabled = false;
      }
      userDate = selectedDates[0];
    },
};

flatpickr(inputRef, options);

function onStart(e) {
  userDate = Date.parse(inputRef.value);
  timerId = setInterval(() => {
    startBtn.disabled = true;
    updateClockFace(convertMs(userDate - Date.now()));
    if ((userDate - Date.now()) <= 1000 ) {
      stopTimer();
    }
  }, 1000);  
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopTimer() {  
    clearInterval(timerId);   
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

startBtn.addEventListener('click', onStart);