// main.js
import { initUI } from './ui.js';
import { toggleTimer } from './timer.js';

// Comment these out if the files aren't ready yet to prevent the 404 crash
// import './music.js';
// import './magic.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("Phestone Mission: Booting System...");
    if (typeof initUI === 'function') {
        initUI();
    }
});
