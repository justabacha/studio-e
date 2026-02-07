let timer;
let timeLeft = 25 * 60;
let running = false;

export function initTimer() {
  update();
}

window.toggleTimer = function () {
  const btn = document.getElementById('timer-btn');

  if (running) {
    clearInterval(timer);
    btn.innerText = "START FOCUS";
  } else {
    timer = setInterval(tick, 1000);
    btn.innerText = "PAUSE";
  }
  running = !running;
};

function tick() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("Safe, focus done 😤");
    return;
  }
  timeLeft--;
  update();
}

function update() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  document.getElementById('timer-display').innerText =
    `${m}:${s < 10 ? '0' : ''}${s}`;
}
