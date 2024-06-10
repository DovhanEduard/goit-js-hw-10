// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const dateTimePickerInput = document.querySelector('#datetime-picker');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const chosenDate = selectedDates[0].getTime();

    if (chosenDate < currentDate) {
      startBtn.disabled = true;

      iziToast.show({
        messageColor: '#fff',
        backgroundColor: 'red',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      userSelectedDate =
        new Date(dateTimePickerInput.value).getTime() - currentDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePickerInput, options);

startBtn.addEventListener('click', () => {
  dateTimePickerInput.disabled = true;
  startBtn.disabled = true;

  let intervalId = setInterval(() => {
    if (userSelectedDate > 0) {
      let convertedDate = convertMs(userSelectedDate);

      const time = addLeadingZero(convertedDate);

      spanDays.innerHTML = time.days;
      spanHours.innerHTML = time.hours;
      spanMinutes.innerHTML = time.minutes;
      spanSeconds.innerHTML = time.seconds;

      userSelectedDate -= 1000;
    } else {
      clearInterval(intervalId);

      dateTimePickerInput.disabled = false;
      startBtn.disabled = false;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(time) {
  time.days = time.days.toString().padStart(2, '0');
  time.hours = time.hours.toString().padStart(2, '0');
  time.minutes = time.minutes.toString().padStart(2, '0');
  time.seconds = time.seconds.toString().padStart(2, '0');

  return time;
}
