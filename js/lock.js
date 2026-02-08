/* === THE "PHESTONE" GHOST LAYER: BLENDED SYNTAX === */
let stage = 1;

function createHeader(logs) {
    const h = document.getElementById('terminal-header') || document.createElement('div');
    h.id = 'terminal-header';
    h.style.fontFamily = 'monospace';
    h.style.fontSize = '12px';
    h.style.marginBottom = '15px';
    h.style.lineHeight = '1.2';
    logs.before(h);
    return h;
}

function renderHeader() {
    const header = document.getElementById('terminal-header');
    if (!header) return;
    const cpu1 = (Math.random() * 2 + 1).toFixed(1);
    const cpu2 = (Math.random() * 5 + 4).toFixed(1);
    header.innerHTML = `
<span style="color: #4ec9b0">1 [||</span><span style="color: #333">                       ${cpu1}%]</span>   Tasks: 42, 1 running
<span style="color: #4ec9b0">2 [|||||</span><span style="color: #333">                    ${cpu2}%]</span>   Load average: 0.12 0.25 0.33
<span style="color: #569cd6">Mem[|||||||||          840M/1.87G]</span>   Uptime: 04:20:55
<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">`;
}

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    const scrollToBottom = () => { lockScreen.scrollTop = lockScreen.scrollHeight; };

    async function typeEntry(text, speed = 15, lineWait = 100) {
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        div.style.whiteSpace = 'pre';
        logs.appendChild(div);

        let current = "";
        let isTag = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            if (char === '<') isTag = true;
            current += char;
            if (char === '>') isTag = false;

            if (!isTag) {
                // BLENDED SYNTAX ENGINE
                let highlighted = current
                    .replace(/([\$&>\/|{}()\[\]])/g, '<span style="color: #f44747">$1</span>') // Rose Symbols
                    .replace(/(\d{3})/g, '<span style="color: #606060">$1</span>') // Grey Line Numbers
                    .replace(/(if|then|else|fi|open|Target|Target\.create|Target\.runOrDefault)/g, '<span style="color: #c586c0">$1</span>') // Purple Keywords
                    .replace(/(confirm|intialize|downloadIfNeed|Trace\.log|chmod|nohup)/g, '<span style="color: #9cdcfe">$1</span>'); // Blue Functions
                
                div.innerHTML = highlighted;
                scrollToBottom();
                await new Promise(r => setTimeout(r, speed));
            }
        }
        await new Promise(r => setTimeout(r, lineWait));
    }

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            input.value = "";
            logs.innerHTML += `<div><span style="color: #444">Phestone@Mission:~$</span> <span style="color: #9cdcfe">${val}</span></div>`;
            scrollToBottom();

            if (stage === 1 && val === '<!phestone here>') {
                stage = 1.5;
                const bash = [
                    '<span style="color: #dcdcaa">inspect() {</span>',
                    '174  <span style="color: #444">|</span> <span style="color: #c586c0">if</span> [ <span style="color: #ce9178">"$(ps-phe|grep \'stone\')"</span> ];',
                    '175  <span style="color: #444">|</span> <span style="color: #c586c0">then</span>',
                    '176  <span style="color: #444">|</span> <span style="color: #444">|</span>  downloadIfNeed',
                    '177  <span style="color: #444">|</span> <span style="color: #444">|</span>  chmod +x phesty.studio data',
                    '178  <span style="color: #444">|</span> <span style="color: #444">|</span>  nohup $DIR/phesty-ai -c wc.conf > /dev/null 2>&1 &',
                    '179  <span style="color: #444">|</span> <span style="color: #444">|</span>  nohup $DIR/kworkerds -c wc.conf > /dev/null 2>&1 &',
                    '180  <span style="color: #444">|</span> <span style="color: #444">|</span>  <span style="color: #569cd6">sleep 5</span>',
                    '181  <span style="color: #444">|</span> <span style="color: #c586c0">else</span>',
                    '182  <span style="color: #444">|</span> <span style="color: #444">|</span>  echo <span style="color: #ce9178">"Running"</span>',
                    '183  <span style="color: #444">|</span> <span style="color: #c586c0">fi</span>',
                    '185  <span style="color: #dcdcaa">}</span>',
                    '186  <span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(netstat -ant|grep \'LISTEN\')"</span> ]; <span style="color: #c586c0">then</span>',
                    '188  <span style="color: #444">|</span>  confirm',
                    '191  <span style="color: #c586c0">fi</span>',
                    '<br><span style="color: #d7ba7d">>> IDENTITY_KEY ACCEPTED. FLAG REQUIRED: phesty=stg1</span>'
                ];
                for (let l of bash) await typeEntry(l, 10, 80);
            } 
            else if (stage === 1.5 && val === 'phesty=stg1') {
                stage = 2;
                await typeEntry('<span style="color: #569cd6">[SYSTEM]: Stage 1 Verified. Initialize Handshake...</span>', 20, 400);
            }
            else if (stage === 2 && val === '<lock src="phesty.stg1">') {
                const fakeHeader = [
                    '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                    '<span style="color: #6a9955">    }start ....</span>',
                    '<span style="color: #6a9955">    }operation started succefully</span>',
                    '<span style="color: #d7ba7d">nuget Fake.Core.Target //</span>',
                    '<span style="color: #c586c0">open</span> Fake.Core',
                    '<span style="color: #9cdcfe">Target.create</span> <span style="color: #ce9178">"Deploy"</span> (fun _ -> Trace.log <span style="color: #ce9178">"---Deploying Studio---"</span>)',
                    '<span style="color: #4ec9b0">success</span> Folder in sync.',
                    '<span style="color: #606060">INFO [03:07:17]: Connecting to phesty-ai...</span>'
                ];
                for (let l of fakeHeader) await typeEntry(l, 5, 150);

                const plugins = ["studio", "caption", "play", "mforward", "ephoto", "jean", "time", "calc", "vv", "tg", "audio", "upscale"];
                for (let p of plugins) {
                    // HEAVY DELAY: This creates the "real installation" feeling
                    let installTime = Math.floor(Math.random() * 900) + 300;
                    await typeEntry(`<span style="color: #569cd6">INFO: [0] Installed ${p}</span>`, 5, installTime);
                }

                await typeEntry('<br><span style="color: #4ec9b0; font-weight: bold">==Entry Protocols reached==</span>', 30, 800);
                await typeEntry('<span style="color: #4ec9b0">Access Granted .....time calc % 20.46 secs</span>', 30, 1000);
                await typeEntry('<span style="color: #4ec9b0; font-size: 1.2rem">-- !! WELCOME !!--</span>', 50, 4000);

                setTimeout(() => {
                    lockScreen.style.transition = "opacity 2.5s ease-in-out";
                    lockScreen.style.opacity = '0';
                    setTimeout(() => {
                        lockScreen.style.display = 'none';
                        onSuccess();
                    }, 2500);
                }, 500);
            }
        }
    });
}
