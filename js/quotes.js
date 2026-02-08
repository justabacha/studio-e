/* === THE "PHESTONE" PERSISTENT QUOTE ENGINE === */

const FALLBACK_QUOTES = [
    "Protect your peace.", "Discipline beats motivation.", "Silence is power.",
    "Consistency prints results.", "Build quietly.", "Low noise, high output.",
    "Energy is currency.", "Focus is rare.", "Time exposes everything.",
    "Earn your calm.", "Life keeps on going,stay strong.", "Mindset is everyhting.",
    "Stay real Always."
];

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
];

export async function initQuotes() {
    const now = new Date();
    const today = now.toDateString();
    
    // 1. Fix the Date Display inside the Quote Tile
    const qDateElem = document.getElementById('q-date');
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // 2. Handle 24-Hour Persistence Logic
    const lastDate = localStorage.getItem('quote_date');
    const quoteTile = document.getElementById('quote-card');

    if (lastDate === today) {
        // STAY THE SAME: Don't change background or quote on refresh
        render(
            localStorage.getItem('quote_text'),
            localStorage.getItem('quote_emoji')
        );
        if (quoteTile) {
            quoteTile.style.background = `url('${localStorage.getItem('quote_bg')}') center/cover no-repeat`;
        }
    } else {
        // 24 HOURS PASSED: Fetch and Rotate
        await rotateQuoteAndBg(today, quoteTile);
    }
}

async function rotateQuoteAndBg(today, quoteTile) {
    let finalQuote = "";
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

    try {
        // Try to get a fresh short quote from the web
        const response = await fetch('https://api.quotable.io/random?maxLength=50&tags=inspirational');
        const data = await response.json();
        finalQuote = data.content;
    } catch (e) {
        // Fallback to your original hardcoded list if API fails
        const used = JSON.parse(localStorage.getItem('used_quotes') || "[]");
        const available = FALLBACK_QUOTES.filter(q => !used.includes(q));
        
        if (!available.length) {
            finalQuote = "Keep building.";
            localStorage.setItem('used_quotes', "[]"); // Reset cycle
        } else {
            finalQuote = available[Math.floor(Math.random() * available.length)];
            used.push(finalQuote);
            localStorage.setItem('used_quotes', JSON.stringify(used));
        }
    }

    // Save everything for the next 24 hours
    localStorage.setItem('quote_date', today);
    localStorage.setItem('quote_text', finalQuote);
    localStorage.setItem('quote_emoji', emoji);
    localStorage.setItem('quote_bg', randomBg);

    render(finalQuote, emoji);
    if (quoteTile) {
        quoteTile.style.background = `url('${randomBg}') center/cover no-repeat`;
    }
}

function render(text, emoji) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');
    if (textElem) textElem.innerText = text;
    if (emojiElem) emojiElem.innerText = emoji;
}
