const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startColorSwitcher() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    changeBodyColor();
  }, 1000);
}

function stopColorSwitcher() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);
