export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    // Initial message
    logs.innerHTML = "SYSTEM BOOT... v2.0.26\nUNAUTHORIZED ACCESS PROHIBITED.\nTYPE 'help' FOR COMMANDS.\n\n";

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            input.value = "";
            processCommand(command);
        }
    });

    function processCommand(cmd) {
        if (cmd === 'help') {
            logs.innerHTML += "> Available: help, clear, status, phesty --access\n";
        } else if (cmd === 'clear') {
            logs.innerHTML = "";
        } else if (cmd === 'status') {
            logs.innerHTML += "> System: Ghost Layer v2 | Location: Eldoret | Status: Waiting for Phestone...\n";
        } else if (cmd === 'phesty --access' || cmd === 'access') {
            logs.innerHTML += "<span class='success-msg'>> ACCESS GRANTED. INITIALIZING DASHBOARD...</span>\n";
            setTimeout(() => {
                lockScreen.style.display = "none";
                onSuccess(); // This triggers the main app
            }, 1000);
        } else {
            logs.innerHTML += `<span class='error-msg'>> Command '${cmd}' not recognized. Peak.</span>\n`;
        }
        // Auto-scroll
        window.scrollTo(0, document.body.scrollHeight);
    }
}
