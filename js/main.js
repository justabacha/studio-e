import './ui.js';
import './timer.js';
// import './music.js';  <-- Comment this out with // if the file is missing or empty
// import './magic.js';  <-- Comment this out too if it's giving a 404

window.addEventListener('DOMContentLoaded', () => {
    if (window.initUI) {
        window.initUI();
        console.log("System Online 🚀");
    }
});
