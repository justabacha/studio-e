/* === THE "PHESTONE" GHOST LAYER: ULTIMATE EDITION === */
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

    // SAFE TYPE ENGINE: Types characters but renders HTML correctly
    async function typeEntry(htmlContent, speed = 10, lineWait = 80) {
        const div = document.createElement('div');
        div.style.marginBottom = '2px';
        div.style.whiteSpace = 'pre-wrap';
        logs.appendChild(div);

        // Create a temporary element to hold the final HTML
        const temp = document.createElement('div');
        temp.innerHTML = htmlContent;
        const fullText = temp.innerText;
        
        // Match characters to the final HTML structure
        let charIndex = 0;
        let currentHTML = "";
        
        // This logic ensures we see characters one by one but with the right colors
        div.innerHTML = htmlContent; // Set the full HTML first
        div.style.visibility = 'hidden'; // Hide it
        const finalHTML = div.innerHTML;
        div.innerHTML = ""; // Clear it
        div.style.visibility = 'visible'; // Show it

        let visibleChars = 0;
        for (let i = 0; i < finalHTML.length; i++) {
            // If we hit a tag, skip through it instantly
            if (finalHTML[i] === '<') {
                while (finalHTML[i] !== '>') {
                    currentHTML += finalHTML[i];
                    i++;
                }
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

            if (stage === 1 && val === '<!phestone here>') {
                stage = 1.5;
                const bash = [
                    '<span style="color: #9cdcfe">inspect() {</span>',
                    '<span style="color: #606060">174  </span><span style="color: #c586c0">if</span> [ <span style="color: #ce9178">"$(ps-phe|grep \'stone\' |grep \'here\'|grep -v grep)"</span> ];',
                    '<span style="color: #606060">175  </span><span style="color: #c586c0">then</span>',
                    '<span style="color: #606060">176  </span>   <span style="color: #dcdcaa">downloadIfNeed</span>',
                    '<span style="color: #606060">177  </span>   <span style="color: #dcdcaa">chmod</span> +x phesty.studio data',
                    '<span style="color: #606060">178  </span>   <span style="color: #9cdcfe">nohup</span> <span style="color: #f44747">$DIR</span>/phesty-ai -c <span style="color: #f44747">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '<span style="color: #606060">179  </span>   <span style="color: #9cdcfe">nohup</span> <span style="color: #f44747">$DIR</span>/kworkerds -c <span style="color: #f44747">$DIR</span>/wc.conf > /dev/null 2>&1 &',
                    '<span style="color: #606060">180  </span>   <span style="color: #569cd6">sleep 5</span>',
                    '<span style="color: #606060">181  </span><span style="color: #c586c0">else</span>',
                    '<span style="color: #606060">182  </span>   echo <span style="color: #ce9178">"Running"</span>',
                    '<span style="color: #606060">183  </span><span style="color: #c586c0">fi</span>',
                    '<span style="color: #606060">184  </span>',
                    '<span style="color: #606060">185  </span><span style="color: #9cdcfe">}</span>',
                    '<span style="color: #606060">186  </span><span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(netstat -ant|grep \'LISTEN\\|ESTABLISHED\\|TIME_WAIT|grep -v grep)"</span> ];',
                    '<span style="color: #606060">187  </span><span style="color: #c586c0">then</span>',
                    '<span style="color: #606060">188  </span>   <span style="color: #dcdcaa">confirm</span>',
                    '<span style="color: #606060">189  </span><span style="color: #c586c0">else</span>',
                    '<span style="color: #606060">190  </span>   <span style="color: #dcdcaa">intialize</span>',
                    '<span style="color: #606060">191  </span><span style="color: #c586c0">fi</span>',
                    '<br><span style="color: #d7ba7d">>> IDENTITY_KEY ACCEPTED. FLAG: phesty=stg1</span>'
                ];
                for (let l of bash) await typeEntry(l, 8, 50);
            } 
            else if (stage === 1.5 && val === 'phesty=stg1') {
                stage = 2;
                await typeEntry('<span style="color: #569cd6">[SYSTEM]: Stage 1 Verified. Handshake Initiated...</span>', 15, 300);
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
                    '<span style="color: #4ec9b0">INFO: [0] Plugins Installed</span>'
                ];
                for (let l of final_seq) await typeEntry(l, 5, 80);

                const plugins = ["studio", "caption", "play", "mforward", "ephoto", "jean", "time", "ig", "calc", "emix", "vv", "doc", "find", "tg", "emoji", "audio", "upscale"];
                for (let p of plugins) {
                    let installDelay = Math.floor(Math.random() * 600) + 200;
                    await typeEntry(`<span style="color: #569cd6">INFO [08-02-26]: [0] Installed ${p}</span>`, 3, installDelay);
                }

                await typeEntry('<span style="color: #c586c0">Target.runOrDefault</span> <span style="color: #ce9178">"Deploy"</span>', 10, 500);
                await typeEntry('<br><span style="color: #4ec9b0; font-weight: bold">==Entry Protocols reached==</span>', 20, 800);
                await typeEntry('<span style="color: #4ec9b0">Access Granted .....time calc % 20.46 secs</span>', 20, 1000);
                await typeEntry('<span style="color: #4ec9b0; font-size: 1.2rem">-- !! WELCOME !!--</span>', 40, 4000);

                setTimeout(() => {
                    lockScreen.style.transition = "opacity 2.5s ease";
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
