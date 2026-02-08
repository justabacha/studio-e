import './ui.js';
import './timer.js';
import './music.js';
import './magic.js';

window.addEventListener('DOMContentLoaded', () => {
  if (window.initUI) {
      window.initUI();
      console.log("UI Initialized ✅");
  } else {
      console.error("UI Script not loaded ❌");
  }
});
