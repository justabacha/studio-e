import { initLock } from './lock.js';
import { initUI } from './ui.js';
import { getWeather } from './weather.js';
import { initQuotes } from './quotes.js';
import { initMagic } from './magic.js';
import { toggleTimer } from './timer.js';

window.addEventListener('DOMContentLoaded', () => {
    // Start the Hacker Lock sequence
    initLock(() => {
        console.log("Initializing Mission Dashboard...");
        
        // These only run after 'phesty --access'
        initUI();
        getWeather();
        initQuotes();
        initMagic();
        
        // Link globally
        window.toggleTimer = toggleTimer;
    });
}); // <--- This line is likely what's missing or broken!
// Place Service Worker registration here - Outside the main block
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('%c [GHOST-PWA]: Service Worker Active', 'color: #4ec9b0'))
      .catch(err => console.log('PWA registration failed: ', err));
  });
}
