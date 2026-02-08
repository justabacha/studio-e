/* === THE "PHESTONE" GHOST LAYER: SECURED & OVERCLOCKED === */
let stage = 1;

function createHeader(logs) {
    const h = document.getElementById('terminal-header') || document.createElement('div');
    h.id = 'terminal-header';
    h.style.fontFamily = 'monospace';
    h.style.fontSize = '11px';
    h.style.marginBottom = '15px';
    logs.before(h);
    return h;
}

function renderHeader() {
    const header = document.getElementById('terminal-header');
    if (!header) return;
    
    const cpu1 = (Math.random() * 2 + 1).toFixed(1);
    const cpu2 = (Math.random() * 5 + 4).toFixed(1);
    const rx = (Math.random() * 150 + 20).toFixed(1);
    const tx = (Math.random() * 50 + 5).toFixed(1);
    
    header.innerHTML = `
<div style="font-family: monospace; line-height: 1.2;">
    <div style="display: flex; justify-content: space-between;">
        <span style="color: #4ec9b0">1 [||</span><span style="color: #333">                       ${cpu1}%]</span>
        <span style="color: #d7ba7d; animation: blink 1.5s infinite;">GHOST-LINK: ESTABLISHED</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
        <span style="color: #4ec9b0">2 [|||||</span><span style="color: #333">                    ${cpu2}%]</span>
        <span style="color: #606060">Tasks: 42, 1 running</span>
    </div>
    <span style="color: #569cd6">Mem[|||||||||          840M/1.87G]</span>   <span style="color: #606060">Load avg: 0.12 0.25</span>
    <span style="color: #f44747">Swp[||                 199M/256M]</span>    <span style="color: #606060">Uptime: 04:20:55</span>
    <div style="margin-top: 4px; border-top: 1px dashed #222; padding-top: 4px;">
        <span style="color: #9cdcfe">NET RX:</span> <span style="color: #ccc">${rx} KiB/s</span> | <span style="color: #9cdcfe">TX:</span> <span style="color: #ccc">${tx} KiB/s</span> | <span style="color: #ce9178">STG: phesty-node-01</span>
    </div>
</div>
<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">
<style> @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } } </style>`;
}

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    const scrollToBottom = () => { lockScreen.scrollTop = lockScreen.scrollHeight; };

    async function typeEntry(htmlContent, speed = 8, lineWait = 60) {
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        div.style.whiteSpace = 'pre-wrap';
        logs.appendChild(div);

        let currentHTML = "";
        div.style.visibility = 'hidden';
        div.innerHTML = htmlContent;
        const finalHTML = div.innerHTML;
        div.innerHTML = "";
        div.style.visibility = 'visible';

        for (let i = 0; i < finalHTML.length; i++) {
            if (finalHTML[i] === '<') {
                while (finalHTML[i] !== '>') { currentHTML += finalHTML[i]; i++; }
                currentHTML += '>';
                continue;
            }
            currentHTML += finalHTML[i];
            div.innerHTML = currentHTML;
            scrollToBottom();
            await new Promise(r => setTimeout(r, speed));
        }
        await new Promise(r => setTimeout(r, lineWait));
    }

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            input.value = "";
            logs.innerHTML += `<div><span style="color: #444">Phestone@Mission:~$</span> <span style="color: #9cdcfe">${val}</span></div>`;
            scrollToBottom();

            // STAGE 1: THE MYSTERY SCRIPT
            if (stage === 1) {
                if (val === '<!phestone here>') {
                    stage = 1.5;
                    const bash = [
                        '<span style="color: #9cdcfe">inspect() {</span>',
                        '<span style="color: #606060">174  </span><span style="color: #c586c0">if</span> [ <span style="color: #ce9178">"$(ps-phe|grep \'stone\' |grep \'here\'|grep -v grep)"</span> ];',
                        '<span style="color: #606060">175  </span><span style="color: #c586c0">then</span>',
                        '<span style="color: #606060">176  </span>   <span style="color: #dcdcaa">downloadIfNeed</span>',
                        '<span style="color: #606060">177  </span>   <span style="color: #dcdcaa">chmod</span> +x phesty.studio data',
                        '<span style="color: #606060">178  </span>   <span style="color: #9cdcfe">nohup</span> <span style="color: #f44747">$DIR</span>/phesty-ai -c <span style="color: #f44747">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                        '<span style="color: #606060">180  </span>   <span style="color: #569cd6">sleep 5</span>',
                        '<span style="color: #606060">181  </span><span style="color: #c586c0">else</span>',
                        '<span style="color: #606060">182  </span>   echo <span style="color: #ce9178">"Running"</span>',
                        '<span style="color: #606060">183  </span><span style="color: #c586c0">fi</span>',
                        '<span style="color: #9cdcfe">}</span>',
                        '<br><span style="color: #f44747">STG_1_LOCKED: Awaiting Stage Flag...</span>'
                    ];
                    for (let l of bash) await typeEntry(l, 8, 40);
                } else {
                    await typeEntry('<span style="color: #f44747">bash: command not found: ' + val + '</span>', 5, 20);
                    await typeEntry('<span style="color: #606060">Hint: System requires identity handshake.</span>', 5, 20);
                }
            } 
            // STAGE 2: THE FLAG (No leaks!)
            else if (stage === 1.5) {
                if (val === 'phesty=stg1') {
                    stage = 2;
                    await typeEntry('<span style="color: #4ec9b0">[SUCCESS]: Stage 1 Verified. Buffer decrypted.</span>', 15, 300);
                    await typeEntry('<span style="color: #9cdcfe">Awaiting Final Handshake Protocol...</span>', 15, 300);
                } else {
                    await typeEntry('<span style="color: #f44747">CRITICAL_ERROR: Unauthorized Flag Attempt. Logged.</span>', 10, 50);
                }
            }
            // STAGE 3: THE FINAL KEY
            else if (stage === 2) {
                if (val === '<lock src="phesty.stg1">') {
                    const final_seq = [
                        '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                        '<span style="color: #d7ba7d">nuget Fake.Core.Target //"</span>',
                        '<span style="color: #c586c0">open</span> Fake.Core',
                        '<span style="color: #c586c0">Target.create</span> <span style="color: #ce9178">"Deploy"</span> (fun _ -> Trace.log <span style="color: #ce9178">"---Deploying Studio Session IDs ---"</span>)',
                        '<span style="color: #4ec9b0">success</span> Folder in sync.',
                        'Done in 4.22s.',
                        '<br><span style="color: #569cd6">INFO: [0] Connecting phesty-ai...</span>'
                    ];
                    for (let l of final_seq) await typeEntry(l, 5, 50);

                    const plugins = ["studio", "caption", "play", "mforward", "ephoto", "time", "ig", "calc", "tg", "audio", "upscale"];
                    for (let p of plugins) {
                        let delay = Math.floor(Math.random() * 800) + 300;
                        await typeEntry(`<span style="color: #606060">INFO [08-02-26]: [0] Installed ${p}</span>`, 3, delay);
                    }

                    await typeEntry('<br><span style="color: #4ec9b0; font-weight: bold">==Entry Protocols reached==</span>', 20, 800);
                    await typeEntry('<span style="color: #4ec9b0; font-size: 1.2rem">-- !! WELCOME !!--</span>', 40, 4000);

                    setTimeout(() => {
                        lockScreen.style.transition = "opacity 2.5s ease";
                        lockScreen.style.opacity = '0';
                        setTimeout(() => {
                            lockScreen.style.display = 'none';
                            onSuccess();
                        }, 2500);
                    }, 500);
                } else {
                    await typeEntry('<span style="color: #f44747">ACCESS_DENIED: Handshake mismatch.</span>', 10, 50);
                }
            }
        }
    });
}
