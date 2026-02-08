export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    if (!input) {
        console.error("Terminal Input not found in HTML! ❌");
        return;
    }

    console.log("Terminal Lock Initialized... Waiting for input. ⌨️");

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim(); // Removed toLowerCase for strict command
            console.log("Command received:", command); // Check if this shows in F12 console
            
            input.value = "";
            
            // Log the command to the screen
            logs.innerHTML += `<span style="color: #555">Phestone@Mission:~$ ${command}</span>\n`;
            
            processCommand(command);
        }
    });

    function processCommand(cmd) {
        if (cmd === 'phesty --access' || cmd === 'access') {
            logs.innerHTML += "<span style='color: #007aff'>> ACCESS GRANTED. INITIALIZING...</span>\n";
            setTimeout(() => {
                lockScreen.style.display = "none";
                onSuccess(); 
            }, 800);
        } else if (cmd === 'help') {
            logs.innerHTML += "> Available: help, clear, access\n";
        } else {
            logs.innerHTML += `<span style='color: #ff2d55'>> '${cmd}' not recognized. Peak.</span>\n`;
        }
    }
}
