/* === THE DEEP BOOT SEQUENCE === */
let stage = 1;

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    // Start htop pulse
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
        const cpu1 = (Math.random() * 5 + 3).toFixed(1);
        const cpu2 = (Math.random() * 10 + 9).toFixed(1);
        header.innerHTML = `
<span style="color: #00ff00">1 [|||</span><span style="color: #444">                     ${cpu1}%</span><span style="color: #00ff00">]</span>   Tasks: 35, 1109 thr; 1 running
<span style="color: #00ff00">2 [||||||</span><span style="color: #444">                  ${cpu2}%</span><span style="color: #00ff00">]</span>   Load average: 4.33 4.43 4.56
<span style="color: #00aaff">Mem[||||||||||||||||| 1.06G/1.87G]</span>   Uptime: 1 day, 22:59:18
<span style="color: #ff5555">Swp[|||               199M/256M]</span>
<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">`;
    }

    function createHeader() {
        const h = document.createElement('div');
        h.id = 'terminal-header';
        h.style.fontFamily = 'monospace';
        h.style.fontSize = '12px';
        logs.before(h);
        return h;
    }

    async function streamLogs(lines, color = "#ccc") {
        for (let line of lines) {
            const div = document.createElement('div');
            div.style.color = color;
            div.style.marginBottom = '2px';
            div.innerHTML = line;
            logs.appendChild(div);
            lockScreen.scrollTop = lockScreen.scrollHeight;
            await new Promise(r => setTimeout(r, 60)); // The "Streaming" feel
        }
    }

    async function processSequence(cmd) {
        logs.innerHTML += `<div><span style="color: #555">Phestone@Mission:~$</span> ${cmd}</div>`;

        if (stage === 1 && cmd === ' access') {
             await streamLogs(["Terminal Ready. Phestone, type 'access' 🔓"], "#00ff00");
        }

        if (stage === 1 && cmd === '<!phestone here>') {
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
                '<span style="color: #888">186  </span> <span style="color: #c586c0">if</span> [ ! <span style="color: #ce9178">"$(netstat -ant|grep \'LISTEN\\|ESTABLISHED\\|TIME_WAIT|grep -v grep)"</span> ];',
                '<span style="color: #888">187  </span> <span style="color: #c586c0">then</span>',
                '<span style="color: #888">188  </span>     confirm ',
                '<span style="color: #888">189  </span> <span style="color: #c586c0">else</span>',
                '<span style="color: #888">190  </span>     intialize',
                '<span style="color: #888">191  </span> <span style="color: #c586c0">fi</span>',
                '<br><span style="color: #ff9d00">WAITING FOR STAGE FLAG: phesty=stg1...</span>'
            ];
            await streamLogs(inspectLogic);
        } 
        else if (stage === 1.5 && cmd === 'phesty=stg1') {
            stage = 2;
            await streamLogs(["[SYSTEM]: Stage 1 Verified. Awaiting Final Handshake...", "Enter: &lt;lock src=\"phesty.stg1\"&gt;"], "#007aff");
        }
        else if (stage === 2 && cmd === '<lock src="phesty.stg1">') {
            const fakeCore = [
                '<span style="color: #6a9955">#r "system:>>operation initiated</span>',
                '<span style="color: #6a9955">          }start ....</span>',
                '<span style="color: #6a9955">    }operation started succefully</span>',
                '<span style="color: #d7ba7d">nuget Fake.Core.Target //</span>',
                '<span style="color: #569cd6">open</span> Fake.Core',
                '<span style="color: #d7ba7d">Target.create</span> <span style="color: #ce9178">"Build"</span> (fun _ -> Trace.log <span style="color: #ce9178">"---Building the Dashboard---"</span>)',
                '<span style="color: #d7ba7d">Target.runOrDefault</span> <span style="color: #ce9178">"Deploy"</span>',
                '<span style="color: #4ec9b0">success</span> Folder in sync.',
                'Done in 4.22s.',
                '<span style="color: #00aaff">INFO [03:07:17]: Phestone Digital Command Center V1.0.7</span>',
                '<span style="color: #00aaff">INFO [03:07:31]: [0] Installed studio</span>',
                '<span style="color: #00aaff">INFO [03:07:31]: [0] Installed caption</span>',
                '<span style="color: #00aaff">INFO [03:07:31]: [0] Installed play</span>',
                '<span style="color: #00aaff">INFO [03:07:33]: [0] Installed time</span>',
                '<br><span style="color: #00ff00; font-weight: bold">==Entry Protocols reached==</span>',
                '<span style="color: #00ff00">Access Granted .....time calc % 20.46 secs</span>',
                '<span style="color: #00ff00; font-size: 1.2rem">-- !! WELCOME !!--</span>'
            ];
            await streamLogs(fakeCore);
            setTimeout(() => {
                lockScreen.style.opacity = '0';
                setTimeout(() => {
                    lockScreen.style.display = 'none';
                    onSuccess();
                }, 500);
            }, 1500);
        }
    }
}
