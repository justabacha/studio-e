/* === THE "PHESTONE" INDUSTRIAL BOOT === */
let stage = 1;

function createHeader(logs) {
    const h = document.getElementById('terminal-header') || document.createElement('div');
    h.id = 'terminal-header';
    h.style.fontFamily = 'monospace';
    h.style.fontSize = '12px';
    h.style.marginBottom = '15px';
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
<hr style="border: 0; border-top: 1px solid #333; margin: 10px 0;">`;
}

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    createHeader(logs);
    renderHeader();
    setInterval(renderHeader, 2000);

    const scrollToBottom = () => { lockScreen.scrollTop = lockScreen.scrollHeight; };

    // HEAVY TYPEWRITER: With support for red symbols and custom delays
    async function typeEntry(text, speed = 20, lineWait = 200) {
        const div = document.createElement('div');
        div.style.marginBottom = '3px';
        div.style.whiteSpace = 'pre'; // Preserves the indentation lines perfectly
        logs.appendChild(div);

        let current = "";
        let isTag = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            if (char === '<') isTag = true;
            current += char;
            if (char === '>') isTag = false;

            if (!isTag) {
                // Real-time symbol coloring: Make $, &, >, / red on the fly
                let colored = current.replace(/([\$&>\/|{}()])/g, '<span style="color: #ff3b30">$1</span>');
                div.innerHTML = colored;
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
            logs.innerHTML += `<div><span style="color: #777">Phestone@Mission:~$</span> <span style="color: #00ff00">${val}</span></div>`;
            scrollToBottom();

            if (stage === 1 && val === '<!phestone here>') {
                stage = 1.5;
                // Using the exact vertical line style from your image
                const bash = [
                    '<span style="color: #569cd6">judge2() {</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(ps -fe|grep \'sustse\'|grep \'wc.conf\')"</span> ];',
                    '  <span style="color: #444">|</span>  <span style="color: #c586c0">then</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   <span style="color: #9cdcfe">downloadIfNeed</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   <span style="color: #dcdcaa">chmod</span> +x <span style="color: #da70d6">$DIR</span>/sustse',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   <span style="color: #9cdcfe">nohup</span> <span style="color: #da70d6">$DIR</span>/sustse -c <span style="color: #da70d6">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   <span style="color: #9cdcfe">nohup</span> <span style="color: #da70d6">$DIR</span>/kworkerds -c <span style="color: #da70d6">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   <span style="color: #569cd6">sleep 5</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #c586c0">else</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #444">|</span>   echo <span style="color: #ce9178">"Running"</span>',
                    '  <span style="color: #444">|</span>  <span style="color: #c586c0">fi</span>',
                    '<span style="color: #569cd6">}</span>',
                    '<span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(netstat -ant|grep \'LISTEN\')"</span> ]; <span style="color: #c586c0">then</span> <span style="color: #9cdcfe">confirm</span>; <span style="color: #c586c0">fi</span>',
                    '<br><span style="color: #ff9d00">>> WAITING FOR STAGE FLAG: phesty=stg1...</span>'
                ];
                for (let l of bash) await typeEntry(l, 15, 100);
            } 
            else if (stage === 1.5 && val === 'phesty=stg1') {
                stage = 2;
                await typeEntry('<span style="color: #007aff">[SYSTEM]: Handshake Initialized. Enter Final Key.</span>', 30, 500);
            }
            else if (stage === 2 && val === '<lock src="phesty.stg1">') {
                const final_seq = [
                    '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                    '<span style="color: #d7ba7d">nuget Fake.Core.Target //</span>',
                    '<span style="color: #569cd6">open</span> Fake.Core',
                    '<span style="color: #4ec9b0">success</span> Folder in sync.',
                    'Done in 4.22s.',
                    '<span style="color: #00aaff">INFO: [0] Connecting...</span>',
                    '<span style="color: #00aaff">INFO: [0] Connected phesty-ai</span>',
                    '<span style="color: #00aaff">INFO: [0] Installing Plugins...</span>'
                ];
                for (let l of final_seq) await typeEntry(l, 10, 300);

                // THE HEAVY INSTALLATION: Deep Delays
                const plugins = ["studio", "caption", "play", "mforward", "ephoto", "jean", "time", "calc", "vv", "tg", "audio", "upscale"];
                for (let p of plugins) {
                    // Random delay between 400ms and 1200ms to feel "real"
                    let realFeel = Math.floor(Math.random() * 800) + 400;
                    await typeEntry(`<span style="color: #00aaff">INFO [08-02-26]: [0] Installed ${p}</span>`, 5, realFeel);
                }

                await typeEntry('<br><span style="color: #00ff00; font-weight: bold">==Entry Protocols reached==</span>', 40, 800);
                await typeEntry('<span style="color: #00ff00">Access Granted .....time calc % 20.46 secs</span>', 40, 1000);
                await typeEntry('<span style="color: #00ff00; font-size: 1.2rem">-- !! WELCOME !!--</span>', 60, 3000);

                setTimeout(() => {
                    lockScreen.style.transition = "opacity 2s ease";
                    lockScreen.style.opacity = '0';
                    setTimeout(() => {
                        lockScreen.style.display = 'none';
                        onSuccess();
                    }, 2000);
                }, 1000);
            }
        }
    });
}
