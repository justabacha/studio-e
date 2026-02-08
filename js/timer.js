let timer = null;
let timeLeft = 25 * 60;
let running = false;

export function initTimer() {
  updateDisplay();
}

function updateDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  document.getElementById('timer-display').innerText =
    `${m}:${s < 10 ? '0' : ''}${s}`;
}

function tick() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    running = false;
    alert("Focus done 😤");
    return;
  }
  timeLeft--;
  updateDisplay();
}

window.toggleTimer = function () {
  const btn = document.getElementById('timer-btn');

  if (!running) {
    timer = setInterval(tick, 1000);
    btn.innerText = "PAUSE";
  } else {
    clearInterval(timer);
    btn.innerText = "START FOCUS";
  }

  running = !running;
};
// Bottom of timer.js
window.toggleTimer = toggleTimer;
