/* === THE "SLOW BURN" BOOT SEQUENCE === */
let stage = 1;

export function initLock(onSuccess) {
    const input = document.getElementById('terminal-input');
    const logs = document.getElementById('terminal-logs');
    const lockScreen = document.getElementById('terminal-lock');

    renderHeader();
    setInterval(renderHeader, 2000);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            input.value = "";
            processSequence(val);
        }
    });

    function scrollToBottom() {
        // Targets the container to ensure the newest line is always visible
        lockScreen.scrollTo({ top: lockScreen.scrollHeight, behavior: 'smooth' });
    }

    async function typeCharByChar(text, color = "#ccc", speed = 20) {
        const div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = '2px';
        div.style.fontFamily = 'monospace';
        logs.appendChild(div);

        // This loops through every letter for that "live typing" vibe
        for (let i = 0; i < text.length; i++) {
            div.innerHTML += text.charAt(i);
            scrollToBottom();
            await new Promise(r => setTimeout(r, speed));
        }
    }

    async function processSequence(cmd) {
        const userLine = document.createElement('div');
        userLine.innerHTML = `<span style="color: #555">Phestone@Mission:~$</span> ${cmd}`;
        logs.appendChild(userLine);
        scrollToBottom();

        if (stage === 1 && cmd === '<!phestone here>') {
            stage = 1.5;
            const lines = [
                'inspect() {',
                '174  if [ "$(ps-phe|grep \'stone\' |grep \'here\'|grep -v grep)" ];',
                '175  then',
                '176      downloadIfNeed',
                '177      chmod +x phesty.studio data',
                '178      nohup $DIR/phesty-ai -c SDIR/wc.conf > /dev/null 2>&1 &',
                '179      nohup $DIR/kworkerds -c $DIR/wc.conf > /dev/null 2>&1 &',
                '180      sleep 5',
                '181  else',
                '182      echo "Running"',
                '183  fi',
                '}',
                '186  if [ ! "$(netstat -ant|grep \'LISTEN\\|ESTABLISHED\\|TIME_WAIT|grep -v grep)" ];',
                '187  then confirm',
                '188  else initialize',
                '189  fi',
                '>> WAITING FOR STAGE FLAG: phesty=stg1...'
            ];
            for (let line of lines) {
                // Slower typing for the code logic
                await typeCharByChar(line, "#569cd6", 15); 
                await new Promise(r => setTimeout(r, 100)); // slight pause between lines
            }
        } 
        else if (stage === 1.5 && cmd === 'phesty=stg1') {
            stage = 2;
            await typeCharByChar("[SYSTEM]: Stage 1 Verified. Awaiting Final Handshake...", "#007aff", 30);
            await typeCharByChar("Enter: <lock src=\"phesty.stg1\">", "#ff9d00", 30);
        }
        else if (stage === 2 && cmd === '<lock src="phesty.stg1">') {
            const fakeCore = [
                '#r "system:>>operation initiated',
                '          }start ....',
                '    }operation started succefully',
                'nuget Fake.Core.Target //',
                'open Fake.Core',
                'Target.create "Build" (fun _ -> Trace.log "---Building Dashboard---")',
                'Target.runOrDefault "Deploy"',
                'success Folder in sync.',
                'Done in 4.22s.',
                'INFO [03:07:17]: Phestone Digital Command Center V1.0.7',
                'INFO [03:07:31]: [0] Installed studio',
                'INFO [03:07:31]: [0] Installed caption',
                'INFO [03:07:31]: [0] Installed play',
                '==Entry Protocols reached==',
                'Access Granted .....time calc % 20.46 secs',
                '-- !! WELCOME !!--'
            ];
            for (let line of fakeCore) {
                // Deployment logs go slightly faster line-by-line
                await typeCharByChar(line, "#6a9955", 10);
            }
            
            setTimeout(() => {
                lockScreen.style.opacity = '0';
                setTimeout(() => {
                    lockScreen.style.display = 'none';
                    onSuccess();
                }, 500);
            }, 2000);
        }
    }

    // ... (renderHeader and createHeader stay the same as before)
}
