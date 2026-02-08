let timer = null;
let timeLeft = 25 * 60;
let running = false;

// 1. Define the function properly
export function toggleTimer() {
    const btn = document.getElementById('timer-btn');

    if (!running) {
        timer = setInterval(tick, 1000);
        btn.innerText = "PAUSE";
    } else {
        clearInterval(timer);
        btn.innerText = "START FOCUS";
    }
    running = !running;
}

// 2. The internal logic
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
// 3. Expose to global window for the HTML button
window.toggleTimer = toggleTimer;
// 3. Expose to global window for the HTML button
window.toggleTimer = toggleTimer;
