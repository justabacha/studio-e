/* === CONFIG & STATE === */
let stage = 1;

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    // 1. Start the "htop" Pulse Header
    renderHeader();
    setInterval(renderHeader, 2000);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            input.value = "";
            processSequence(val);
        }
    });

    function renderHeader() {
        const header = document.getElementById('terminal-header') || createHeader();
        const cpu = (Math.random() * 10 + 2).toFixed(1);
        const mem = (Math.random() * 5 + 40).toFixed(1);
        header.innerHTML = `
[1] [|||                     ${cpu}%]   Tasks: 42, 1 running
[2] [||||||||                ${mem}%]   Load average: 0.42 0.51 0.55
[M] [|||||||||||||||   1.02G/4.00G]   Uptime: 0 days, 04:20:12
------------------------------------------------------------`;
    }

    function createHeader() {
        const h = document.createElement('div');
        h.id = 'terminal-header';
        h.style.color = '#0f0';
        h.style.marginBottom = '15px';
        logs.before(h);
        return h;
    }

    async function processSequence(cmd) {
        logs.innerHTML += `<div><span style="color: #555">Phestone@Mission:~$</span> ${cmd}</div>`;

        if (stage === 1) {
            if (cmd === '<!phestone here>') {
                logs.innerHTML += `<div style="color: #888">Step 1: Identity Confirmed. Waiting for stage flag...</div>`;
                stage = 1.5;
            } else {
                logs.innerHTML += `<div style="color: #ff2d55">> AUTH_FAILURE: Check identity string.</div>`;
            }
        } 
        else if (stage === 1.5) {
            if (cmd === 'phesty=stg1') {
                logs.innerHTML += `<div style="color: #007aff">> FLAG_ACCEPTED. INITIALIZING DEPLOYMENT SCRIPT...</div>`;
                stage = 2;
                await runDeploymentSequence();
            } else {
                logs.innerHTML += `<div style="color: #ff2d55">> ERR: Invalid stage flag.</div>`;
                stage = 1; // Reset to start on fail
            }
        }
        else if (stage === 2) {
            if (cmd === '<lock src="phesty.stg1">') {
                logs.innerHTML += `<div style="color: #0f0; font-weight: bold">> SUCCESS: Handshake Complete. Rolling...</div>`;
                setTimeout(() => {
                    lockScreen.style.opacity = '0';
                    setTimeout(() => {
                        lockScreen.style.display = 'none';
                        onSuccess();
                    }, 500);
                }, 800);
            } else {
                logs.innerHTML += `<div style="color: #ff2d55">> CRITICAL: Final source lock failed.</div>`;
            }
        }
        lockScreen.scrollTop = lockScreen.scrollHeight;
    }

    async function runDeploymentSequence() {
        const lines = [
            "chmod +x /sys/studio_v2",
            "nohup ./phesty_daemon --vibe &",
            "grep 'access' /etc/ghost_layer",
            "ESTABLISHING_TIME_SYNC... [OK]",
            "READY_FOR_SOURCE_LOCK..."
        ];
        for (let line of lines) {
            await new Promise(r => setTimeout(r, 400));
            logs.innerHTML += `<div style="color: #007aff">> ${line}</div>`;
            lockScreen.scrollTop = lockScreen.scrollHeight;
        }
    }
}
