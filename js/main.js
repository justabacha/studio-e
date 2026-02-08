// main.js
import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';
import { getWeather } from './weather.js'; // 1. Import the weather function

// keep these commented until we fix them one by one
// import './music.js';
// import './magic.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: Booting System... 🚀");
    
    // 2. Run the UI first (Wallpaper/Clock)
    initUI();

    // 3. Run the Weather update
    getWeather();

    // 4. Set up globals for HTML
    window.toggleTimer = toggleTimer;
    
    console.log("Weather Synced for Eldoret 🇰🇪");
});
