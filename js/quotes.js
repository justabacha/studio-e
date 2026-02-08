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

// Add your background array here or import it from ui.js
const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
    // Use the same ones from your ui.js for consistency
];

export function initQuotes() {
    const now = new Date();
    const today = now.toDateString();
    
    // 1. Fix the Date Display inside the Quote Tile
    const qDateElem = document.getElementById('q-date');
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // 2. Handle Quote Rotation Logic
    const lastDate = localStorage.getItem('quote_date');
    if (lastDate === today) {
        render(
            localStorage.getItem('quote_text'),
            localStorage.getItem('quote_emoji')
        );
    } else {
        const used = JSON.parse(localStorage.getItem('used_quotes') || "[]");
        const available = QUOTES.filter(q => !used.includes(q));

        if (!available.length) {
            render("Keep building.", "🧠");
        } else {
            const quote = available[Math.floor(Math.random() * available.length)];
            const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

            used.push(quote);
            localStorage.setItem('used_quotes', JSON.stringify(used));
            localStorage.setItem('quote_date', today);
            localStorage.setItem('quote_text', quote);
            localStorage.setItem('quote_emoji', emoji);

            render(quote, emoji);
        }
    }

    // 3. Fix the Quote Tile Wallpaper
    const quoteTile = document.getElementById('quote-card');
    if (quoteTile) {
        const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];
        quoteTile.style.background = `url('${randomBg}') center/cover no-repeat`;
    }
}

function render(text, emoji) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');
    if (textElem) textElem.innerText = text;
    if (emojiElem) emojiElem.innerText = emoji;
}
