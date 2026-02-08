// 1. Import the specific functions we need from your modules
import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';
import { toggleMusic } from './music.js';
import { handleMagic } from './magic.js';

// 2. Wait for the page to load, then boot the system
window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: System Booting... 🚀");
    
    // Kick off the clock, background, and portraits
    if (typeof initUI === 'function') initUI();

    // 3. EXPOSE TO WINDOW 
    // This is the most important part. It tells the HTML buttons 
    // "Yo, when you click 'toggleView', look here!"
    window.toggleTimer = toggleTimer;
    window.toggleMusic = toggleMusic;
    window.handleMagic = handleMagic;
    
    // Note: toggleView is already exposed inside ui.js, 
    // but we can add it here too just to be safe:
    // window.toggleView = toggleView;
});
