// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const radioBtnFulfilled = form.querySelector('[value="fulfilled"]');
const radioBtnRejected = form.querySelector('[value="rejected"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const {
    delay: { value: delayValue },
    state: { value: selectedAction },
  } = event.target.elements;

  promiseGenerator(delayValue, selectedAction)
    .then(ms => {
      iziToast.show({
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${ms}ms`,
      });
    })
    .catch(ms => {
      iziToast.show({
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        position: 'topRight',
        message: `❌ Rejected promise in ${ms}ms`,
      });
    });

  form.reset();
});

function promiseGenerator(ms, selectedAction) {
  return new Promise((resolve, reject) => {
    const actionCallbackMap = {
      [radioBtnFulfilled.value]: resolve,
      [radioBtnRejected.value]: reject,
    };

    setTimeout(() => {
      actionCallbackMap[selectedAction] &&
        actionCallbackMap[selectedAction](ms);
    }, ms);
  });
}
