import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
formRef.addEventListener('submit', onStart);

function onStart(e) {
  e.preventDefault();
  const step = Number(formRef.elements.step.value);
  let delay = Number(formRef.elements.delay.value);
  const amount = Number(formRef.elements.amount.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  } 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {      
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}