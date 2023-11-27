import Notiflix from 'notiflix';

const form = document.querySelector('form.form');

form.addEventListener('submit', onCreatePromiseClick);

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

function onCreatePromiseClick(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  function createNextPromise(i) {
    if (i <= inputAmount) {
      createPromise(i, inputDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
          inputDelay += inputStep;
          createNextPromise(i + 1);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
          inputDelay += inputStep;
          createNextPromise(i + 1);
        });
    }
  }

  createNextPromise(1);
}
