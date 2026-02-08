import { initLock } from './lock.js';
import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';
import { getWeather } from './weather.js';
import { initQuotes } from './quotes.js';
import { initMagic, handleMagic } from './magic.js'; // 1. Import Magic

window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: Booting System... 🚀");
    
    initUI();
    getWeather();
    initQuotes();
    initMagic(); // 2. Boot the AI/WA mode

    // 3. Set up globals
    window.toggleTimer = toggleTimer;
    window.handleMagic = handleMagic;
    
    console.log("Magic Mode Active. Dun know. 😎");
});
