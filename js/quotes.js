/* === THE "PHESTONE" GHOST LAYER: REFERENCE FIX === */
let stage = 1;

// 1. Define this FIRST so initLock can see it
function renderHeader() {
    const header = document.getElementById('terminal-header');
    if (!header) return;
    const cpu1 = (Math.random() * 2 + 1).toFixed(1);
    const rx = (Math.random() * 150 + 20).toFixed(1);
    header.innerHTML = `
<div style="font-family: monospace; line-height: 1.2; font-size: 11px;">
    <div style="display: flex; justify-content: space-between;">
        <span style="color: #4ec9b0">1 [||</span><span style="color: #333">                       ${cpu1}%]</span>
        <span style="color: #d7ba7d; animation: blink 1.5s infinite;">GHOST-LINK: ESTABLISHED</span>
    </div>
    <span style="color: #569cd6">Mem[|||||||||          840M/1.87G]</span>
    <div style="margin-top: 4px; border-top: 1px dashed #222; padding-top: 4px;">
        <span style="color: #9cdcfe">NET RX:</span> <span style="color: #ccc">${rx} KiB/s</span> | <span style="color: #ce9178">STG: phesty-node-01</span>
    </div>
</div>
<hr style="border: 0; border-top: 1px solid #222; margin: 10px 0;">`;
}

export function initLock(onSuccess) {
    const lockScreen = document.getElementById('terminal-lock');
    const logs = document.getElementById('terminal-logs');
    
    // Now this call won't fail
    renderHeader(); 
    setInterval(renderHeader, 2000);
    
    // ... rest of your original logic for input/stages ...
}
