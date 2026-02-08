export function initLock(onSuccess) {
    // We wait 100ms to ensure the DOM is actually painted
    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        const logs = document.getElementById('terminal-logs');
        const lockScreen = document.getElementById('terminal-lock');

        if (!input) {
            console.error("Critical: Terminal Input missing from DOM. Check index.html ❌");
            return;
        }

        console.log("Terminal Ready. Phestone, type 'access' 🔓");
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                input.value = "";
                
                // Print command to screen immediately
                logs.innerHTML += `<div><span style="color: #555">Phestone@Mission:~$</span> ${command}</div>`;
                
                if (command === 'phesty --access' || command === 'access') {
                    logs.innerHTML += "<div style='color: #007aff'>> ACCESS GRANTED. LOADING GHOST LAYER...</div>";
                    setTimeout(() => {
                        lockScreen.style.display = "none";
                        onSuccess();
                    }, 800);
                } else if (command === 'help') {
                    logs.innerHTML += "<div>> Commands: help, access, clear</div>";
                } else if (command === 'clear') {
                    logs.innerHTML = "";
                } else {
                    logs.innerHTML += `<div style='color: #ff2d55'>> Command '${command}' not found.</div>`;
                }

                // Scroll to bottom
                lockScreen.scrollTop = lockScreen.scrollHeight;
            }
        });

        // Ensure focus stays on input
        document.addEventListener('click', () => input.focus());
    }, 100);
}
