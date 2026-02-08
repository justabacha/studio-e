// main.js
import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';
import { getWeather } from './weather.js';
import { initQuotes } from './quotes.js'; // 1. Import the wisdom

// import './music.js';
// import './magic.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: Booting System... 🚀");
    
    initUI();
    getWeather();
    initQuotes(); // 2. Initialize the daily quote logic

    window.toggleTimer = toggleTimer;
    
    console.log("Quotes & Wisdom Synced. Stay real. 🧠");
});
