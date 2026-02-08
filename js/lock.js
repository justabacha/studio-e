/* === THE "DEEP BOOT" GHOST LAYER === */
let stage = 1;

// --- 1. CORE VISUAL HELPERS (DEFINED FIRST) ---

function createHeader(logs) {
    const h = document.getElementById('terminal-header') || document.createElement('div');
    h.id = 'terminal-header';
    h.style.fontFamily = 'monospace';
    h.style.fontSize = '12px';
    h.style.marginBottom = '10px';
    logs.before(h);
    return h;
}

function renderHeader() {
    const header = document.getElementById('terminal-header');
    if (!header) return;
    const cpu1 = (Math.random() * 5 + 3).toFixed(1);
    const cpu2 = (Math.random() * 10 + 9).toFixed(1);
    header.innerHTML = `
<span style="color: #00ff00">1 [|||</span><span style="color: #444">                     ${cpu1}%</span><span style="color: #00ff00">]</span>   Tasks: 35, 1109 thr; 1 running
<span style="color: #00ff00">2 [||||||</span><span style="color: #444">                  ${cpu2}%</span><span style="color: #00ff00">]</span>   Load average: 4.33 4.43 4.56
<span style="color: #00aaff">Mem[||||||||||||||||| 1.06G/1.87G]</span>   Uptime: 1 day, 22:59:18
<span style="color: #ff5555">Swp[|||               199M/256M]</span>
<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">`;
}

// --- 2. MAIN LOGIC ---

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    const scrollToBottom = () => {
        lockScreen.scrollTop = lockScreen.scrollHeight;
    };

    // THE CHARACTER ENGINE: Restores the "Typing" feel
    async function typeCharByChar(text, speed = 20) {
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        logs.appendChild(div);

        // We use innerHTML so we can type out the <span> tags for colors
        let currentText = "";
        let isTag = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            if (char === '<') isTag = true;
            
            currentText += char;
            
            if (char === '>') isTag = false;

            if (!isTag) {
                div.innerHTML = currentText;
                scrollToBottom();
                await new Promise(r => setTimeout(r, speed));
            }
        }
    }

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            input.value = "";
            
            logs.innerHTML += `<div><span style="color: #555">Phestone@Mission:~$</span> ${val}</div>`;
            scrollToBottom();

            // STAGE 1: IDENTITY
            if (stage === 1 && val === '<!phestone here>') {
                stage = 1.5;
                const inspectLogic = [
                    '<span style="color: #569cd6">inspect() {</span>',
                    '<span style="color: #888">174  </span> <span style="color: #c586c0">if</span> [ <span style="color: #ce9178">"$(ps-phe|grep \'stone\' |grep \'here\'|grep -v grep)"</span> ];',
                    '<span style="color: #888">175  </span> <span style="color: #c586c0">then</span>',
                    '<span style="color: #888">176  </span>     downloadIfNeed',
                    '<span style="color: #888">177  </span>     chmod +x phesty.studio data',
                    '<span style="color: #888">178  </span>     nohup $DIR/phesty-ai -c SDIR/wc.conf > /dev/null 2>&1 &',
                    '<span style="color: #888">179  </span>     nohup $DIR/kworkerds -c $DIR/wc.conf > /dev/null 2>&1 &',
                    '<span style="color: #888">180  </span>     <span style="color: #569cd6">sleep 5</span>',
                    '<span style="color: #888">181  </span> <span style="color: #c586c0">else</span>',
                    '<span style="color: #888">182  </span>     echo <span style="color: #ce9178">"Running"</span>',
                    '<span style="color: #888">183  </span> <span style="color: #c586c0">fi</span>',
                    '<span style="color: #569cd6">}</span>',
                    '<span style="color: #ff9d00">>> WAITING FOR FLAG: phesty=stg1</span>'
                ];
                for (let line of inspectLogic) {
                    await typeCharByChar(line, 15);
                }
            } 
            // STAGE 2: FLAG
            else if (stage === 1.5 && val === 'phesty=stg1') {
                stage = 2;
                await typeCharByChar('<span style="color: #007aff">[SYSTEM]: Stage 1 Verified. Awaiting Final Handshake...</span>', 25);
                await typeCharByChar('<span style="color: #007aff">Enter: &lt;lock src="phesty.stg1"&gt;</span>', 25);
            }
            // STAGE 3: FINAL UNLOCK
            else if (stage === 2 && val === '<lock src="phesty.stg1">') {
                const fakeCore = [
                    '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                    '<span style="color: #d7ba7d">nuget Fake.Core.Target //</span>',
                    '<span style="color: #569cd6">open</span> Fake.Core',
                    '<span style="color: #4ec9b0">success</span> Folder in sync.',
                    '<span style="color: #00aaff">INFO [03:07:31]: [0] Installed studio</span>',
                    '<span style="color: #00ff00; font-weight: bold">==Entry Protocols reached==</span>',
                    '<span style="color: #00ff00">Access Granted .....time calc % 20.46 secs</span>',
                    '<span style="color: #00ff00; font-size: 1.2rem">-- !! WELCOME !!--</span>'
                ];
                for (let line of fakeCore) {
                    await typeCharByChar(line, 10);
                }
                setTimeout(() => {
                    lockScreen.style.opacity = '0';
                    setTimeout(() => {
                        lockScreen.style.display = 'none';
                        onSuccess();
                    }, 500);
                }, 1500);
            }
        }
    });
}
