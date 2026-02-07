const QUOTES = [
  "Protect your peace.",
  "Discipline beats motivation.",
  "Silence is power.",
  "Consistency prints results.",
  "Build quietly.",
  "Low noise, high output.",
  "Energy is currency.",
  "Focus is rare.",
  "Time exposes everything.",
  "Earn your calm.",
  "Life keeps on going,stay strong.",
  "Mindset is everyhting.",
  "Stay real Always."
];

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

export function initQuotes() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem('quote_date');

  if (lastDate === today) {
    render(
      localStorage.getItem('quote_text'),
      localStorage.getItem('quote_emoji')
    );
    return;
  }

  const used = JSON.parse(localStorage.getItem('used_quotes') || "[]");
  const available = QUOTES.filter(q => !used.includes(q));

  if (!available.length) {
    document.getElementById('q-text').innerText =
      "Quote pool empty. Add more wisdom 🧠";
    return;
  }

  const quote = available[Math.floor(Math.random() * available.length)];
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  used.push(quote);

  localStorage.setItem('used_quotes', JSON.stringify(used));
  localStorage.setItem('quote_date', today);
  localStorage.setItem('quote_text', quote);
  localStorage.setItem('quote_emoji', emoji);

  render(quote, emoji);
}

function render(text, emoji) {
  document.getElementById('q-text').innerText = text;
  document.getElementById('q-emoji').innerText = emoji;
}
