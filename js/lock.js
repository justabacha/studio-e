/* === THE "SLOW BURN" BOOT SEQUENCE === */
let stage = 1;

// --- 1. DEFINE ALL HELPER FUNCTIONS FIRST ---

function createHeader(logs) {
    const h = document.createElement('div');
    h.id = 'terminal-header';
    h.style.fontFamily = 'monospace';
    h.style.fontSize = '12px';
    h.style.color = '#00ff00';
    logs.before(h);
    return h;
}

function renderHeader() {
    const header = document.getElementById('terminal-header');
    if (!header) return;
    const cpu1 = (Math.random() * 5 + 3).toFixed(1);
    const cpu2 = (Math.random() * 10 + 9).toFixed(1);
    header.innerHTML = `
[1] [|||                     ${cpu1}%]   Tasks: 35, 1109 thr; 1 running
[2] [||||||                  ${cpu2}%]   Load average: 4.33 4.43 4.56
Mem [||||||||||||||||| 1.06G/1.87G]   Uptime: 1 day, 22:59:18
------------------------------------------------------------`;
}

// --- 2. THE MAIN EXPORT ---

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    if (!input || !logs) return;

    // Initialize Header
    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    // Auto-scroll function
    const scrollToBottom = () => {
        lockScreen.scrollTop = lockScreen.scrollHeight;
    };

    // Realistic Typing Engine
    async function typeCharByChar(text, color = "#ccc", speed = 30) {
        const div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = '2px';
        logs.appendChild(div);

        for (let i = 0; i < text.length; i++) {
            div.innerHTML += text.charAt(i);
            scrollToBottom(); // Pin to bottom after every letter
            await new Promise(r => setTimeout(r, speed));
        }
    }

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            input.value = "";
            
            // Log user input
            const userLine = document.createElement('div');
            userLine.innerHTML = `<span style="color: #555">Phestone@Mission:~$</span> ${cmd}`;
            logs.appendChild(userLine);
            scrollToBottom();

            if (stage === 1 && cmd === '<!phestone here>') {
                stage = 1.5;
                const bashLogic = [
                    'inspect() {',
                    '174  if [ "$(ps-phe|grep \'stone\' |grep \'here\')" ];',
                    '175  then downloadIfNeed',
                    '177  chmod +x phesty.studio data',
                    '178  nohup $DIR/phesty-ai -c SDIR/wc.conf > /dev/null &',
                    '180  sleep 5',
                    '183  fi',
                    '}',
                    '>> FLAG REQUIRED: phesty=stg1'
                ];
                for (const line of bashLogic) {
                    await typeCharByChar(line, "#569cd6", 25);
                }
            } 
            else if (stage === 1.5 && cmd === 'phesty=stg1') {
                stage = 2;
                await typeCharByChar("[SYSTEM]: Stage 1 Verified. Awaiting Handshake...", "#007aff", 40);
            }
            else if (stage === 2 && cmd === '<lock src="phesty.stg1">') {
                const deployLogs = [
                    '#r "system:>>operation initiated',
                    'success Folder in sync.',
                    'INFO: [0] Installed studio',
                    'INFO: [0] Installed play',
                    '==Entry Protocols reached==',
                    '-- !! WELCOME !!--'
                ];
                for (const line of deployLogs) {
                    await typeCharByChar(line, "#6a9955", 15);
                }
                setTimeout(() => {
                    lockScreen.style.opacity = '0';
                    setTimeout(() => {
                        lockScreen.style.display = 'none';
                        onSuccess();
                    }, 500);
                }, 1000);
            }
        }
    });
}
