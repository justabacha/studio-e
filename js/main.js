import { initUI } from './ui.js';
import { getWeather } from './weather.js';
import { initQuotes } from './quotes.js';
import { setupMagic } from './magic.js';
import { initTimer } from './timer.js';

window.addEventListener('DOMContentLoaded', () => {
  initUI();
  getWeather();
  initQuotes();
  setupMagic();
  initTimer();
});
