// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const radioBtnFulfilled = form.querySelector('[value="fulfilled"]');
const radioBtnRejected = form.querySelector('[value="rejected"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = inputDelay.value;

  const state = radioBtnFulfilled.checked;

  promiseGenerator(delay, state)
    .then(ms => {
      iziToast.show({
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${ms}ms`,
      });
    })
    .catch((ms) => {
      iziToast.show({
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        position: 'topRight',
        message: `❌ Rejected promise in ${ms}ms`,
      });
    });
  form.reset();
});

function promiseGenerator(ms, state) {
  return new Promise((resolve, reject) => {
    if (state) {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    } else {
      setTimeout(() => {
        reject(ms);
      }, ms);
    }
  });
}
