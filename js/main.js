import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';

// If these files exist but are empty, they might still cause issues. 
// Only uncomment when the files have code inside.
// import './weather.js';
// import './quotes.js';
// import './magic.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: Booting System... 🚀");
    
    // 1. Start UI
    initUI();

    // 2. Explicitly map buttons again to ensure no 'undefined' errors
    window.toggleTimer = toggleTimer;
    
    console.log("All Systems Operational. Dun know the vibe. 😎");
});
