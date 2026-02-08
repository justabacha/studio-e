let timer = null;
let timeLeft = 25 * 60;
let running = false;

export function toggleTimer() {
    const btn = document.getElementById('timer-btn');

    if (!running) {
        timer = setInterval(tick, 1000);
        btn.innerText = "PAUSE";
        running = true;
    } else {
        clearInterval(timer);
        btn.innerText = "START FOCUS";
        running = false;
    }
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

function updateDisplay() {
    const display = document.getElementById('timer-display');
    if (!display) return;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

window.toggleTimer = toggleTimer;
window.toggleTimer = toggleTimer;
