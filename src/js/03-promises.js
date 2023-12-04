import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', makePromiseSubmit);

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

function makePromiseSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let infoDelay = Number(delay.value);
  let infoStep = Number(step.value);
  let infoAmount = Number(amount.value);

  for (let i = 1; i <= infoAmount; i += 1) {
    createPromise(i, infoDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`Rejected promise ${position} in ${delay}ms`);
      });

    infoDelay += infoStep;
  }

  // Очищення полів форми після натискання кнопки
  delay.value = '';
  step.value = '';
  amount.value = '';
}
