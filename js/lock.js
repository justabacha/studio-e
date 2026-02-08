/* === THE "PHESTONE" PERSISTENT GHOST LAYER === */
let stage = 1;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 Minutes in milliseconds

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
    const lockScreen = document.getElementById('terminal-lock');
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');

    // --- CHECK SESSION PERSISTENCE ---
    const lastAccess = localStorage.getItem('phestone_session');
    if (lastAccess && (Date.now() - lastAccess < SESSION_TIMEOUT)) {
        lockScreen.style.display = 'none';
        onSuccess();
        return;
    }

    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    const scrollToBottom = () => { lockScreen.scrollTop = lockScreen.scrollHeight; };

    async function typeEntry(html, speed = 8, wait = 60) {
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        div.style.whiteSpace = 'pre-wrap';
        logs.appendChild(div);

        let cur = "";
        div.style.visibility = 'hidden';
        div.innerHTML = html;
        const final = div.innerHTML;
        div.innerHTML = "";
        div.style.visibility = 'visible';

        for (let i = 0; i < final.length; i++) {
            if (final[i] === '<') {
                while (final[i] !== '>') { cur += final[i]; i++; }
                cur += '>'; continue;
            }
            cur += final[i];
            div.innerHTML = cur;
            scrollToBottom();
            await new Promise(r => setTimeout(r, speed));
        }
        await new Promise(r => setTimeout(r, wait));
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
                    '<span style="color: #9cdcfe">inspect() {</span>',
                    '174  <span style="color: #c586c0">if</span> [ <span style="color: #ce9178">"$(ps-phe|grep \'stone\' |grep \'here\'|grep -v grep)"</span> ];',
                    '175  <span style="color: #c586c0">then</span>',
                    '176     <span style="color: #dcdcaa">downloadIfNeed</span>',
                    '177     <span style="color: #dcdcaa">chmod</span> +x phesty.studio data',
                    '178     <span style="color: #9cdcfe">nohup</span> <span style="color: #f44747">$DIR</span>/phesty-ai -c <span style="color: #f44747">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '179     <span style="color: #9cdcfe">nohup</span> <span style="color: #f44747">$DIR</span>/kworkerds -c <span style="color: #f44747">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '180     <span style="color: #569cd6">sleep 5</span>',
                    '181  <span style="color: #c586c0">else</span>',
                    '182     echo <span style="color: #ce9178">"Running"</span>',
                    '183  <span style="color: #c586c0">fi</span>',
                    '184',
                    '185  <span style="color: #9cdcfe">}</span>',
                    '186  <span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(netstat -ant|grep \'LISTEN\\|ESTABLISHED\\|TIME_WAIT|grep -v grep)"</span> ];',
                    '187  <span style="color: #c586c0">then</span>',
                    '188     <span style="color: #dcdcaa">confirm</span>',
                    '189  <span style="color: #c586c0">else</span>',
                    '190     <span style="color: #dcdcaa">intialize</span>',
                    '191  <span style="color: #c586c0">fi</span>',
                    '<br><span style="color: #f44747">STG_1_LOCKED: Awaiting Stage Flag...</span>'
                ];
                for (let l of bash) await typeEntry(l);
            } 
            else if (stage === 1.5 && val === 'phesty=stg1') {
                stage = 2;
                await typeEntry('<span style="color: #4ec9b0">[SUCCESS]: Stage 1 Verified. Buffer decrypted.</span>', 15, 300);
            }
            else if (stage === 2 && val === '<lock src="phesty.stg1">') {
                const final_seq = [
                    '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                    '<span style="color: #6a9955">          }start ....</span>',
                    '<span style="color: #6a9955">    }operation started succefully</span>',
                    '',
                    '<span style="color: #d7ba7d">nuget Fake.Core.Target //"</span>',
                    '<span style="color: #606060">// include Fake modules, see Fake modules section</span>',
                    '<span style="color: #c586c0">open</span> Fake.Core',
                    '',
                    '<span style="color: #606060">// ** Define Targets **</span>',
                    '<span style="color: #c586c0">Target.create</span> <span style="color: #ce9178">"Clean"</span> (fun _ -> Trace.log <span style="color: #ce9178">" ---Cleaning stuff ---"</span>)',
                    '<span style="color: #c586c0">Target.create</span> <span style="color: #ce9178">"Build"</span> (fun _ -> Trace.log <span style="color: #ce9178">"---Building the Darsboard---"</span>)',
                    '<span style="color: #c586c0">Target.create</span> <span style="color: #ce9178">"Deploy"</span> (fun _ -> Trace.log <span style="color: #ce9178">" ---Deploying Studio Session IDs ---"</span>)',
                    '',
                    '<span style="color: #c586c0">open</span> Fake.Core.TargetOperators',
                    '',
                    '<span style="color: #606060">// ** Define Dependencies **</span>',
                    '<span style="color: #ce9178">"Clean" ==> "Build" ==> "Deploy"</span>',
                    '',
                    '<span style="color: #606060">// ** Start Build **</span>',
                    '(use \'js --trace-deprecation ...\' to show where the warning was created)',
                    '',
                    '<span style="color: #4ec9b0">success</span> Folder in sync.',
                    'Done in 4.22s.',
                    '<br><span style="color: #569cd6">INFO [03:07:17]: Phestone\'s Digital Command Center V1.0.7</span>',
                    '<span style="color: #606060">INFO: [0] Connecting...</span>',
                    '<span style="color: #606060">INFO: [0] Connected phesty-ai</span>',
                    '<span style="color: #606060">INFO: [0] Installing Plugins...</span>',
                    '<span style="color: #4ec9b0">INFO: [0] Plugins Installed</span>',
                    '<span style="color: #606060">INFO: [0] Installing External plugins...</span>'
                ];
                for (let l of final_seq) await typeEntry(l, 5);

                const plugins = ["studio", "caption", "play", "mforward", "ephoto", "jean", "time", "ig", "calc", "emix", "vv", "doc", "find", "tg", "emoji", "audio", "upscale"];
                for (let p of plugins) {
                    await typeEntry(`<span style="color: #569cd6">INFO: [0] Installed ${p}</span>`, 3, Math.random() * 800 + 200);
                }

                await typeEntry('<br><span style="color: #c586c0">Target.runOrDefault</span> <span style="color: #ce9178">"Deploy"</span>', 10, 500);
                await typeEntry('<br><span style="color: #4ec9b0; font-weight: bold">==Entry Protocols reached==</span>', 20, 800);
                await typeEntry('<span style="color: #4ec9b0; font-size: 1.2rem">-- !! WELCOME !!--</span>', 40, 4000);

                // --- SAVE SESSION ---
                localStorage.setItem('phestone_session', Date.now());

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
    });
}
