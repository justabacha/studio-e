const QUOTES = [
  "Protect your peace.",
  "Legends never die.",
  "Stay focused.",
  "Real over fake.",
  "Discipline beats motivation.",
  "Silence is power.",
  "Consistency prints results.",
  "Low noise, high output.",
  "Build quietly.",
  "Energy is currency
  "Mindset is everything"
  "Never give up"
  "Another day another life"
  "It will get better soon"
  "Life keeps going"
  // you can add 10k quotes here, no stress
];

export function initQuotes() {
  const today = new Date().toDateString();

  const lastDate = localStorage.getItem('quote_date');
  if (lastDate === today) {
    loadStoredQuote();
    return;
  }

  const used = JSON.parse(localStorage.getItem('used_quotes') || "[]");

  const available = QUOTES.filter(q => !used.includes(q));

  if (available.length === 0) {
    document.getElementById('q-text').innerText =
      "⚠️ Quote pool empty. Add new wisdom.";
    return;
  }

  const quote = available[Math.floor(Math.random() * available.length)];
  const emoji = pickEmoji();

  used.push(quote);

  localStorage.setItem('used_quotes', JSON.stringify(used));
  localStorage.setItem('quote_date', today);
  localStorage.setItem('quote_text', quote);
  localStorage.setItem('quote_emoji', emoji);

  renderQuote(quote, emoji);
}

function loadStoredQuote() {
  renderQuote(
    localStorage.getItem('quote_text'),
    localStorage.getItem('quote_emoji')
  );
}

function renderQuote(text, emoji) {
  document.getElementById('q-text').innerText = text;
  document.getElementById('q-emoji').innerText = emoji;
}

function pickEmoji() {
  const emojis = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
