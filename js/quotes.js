/* === THE "PHESTONE" REPO-SYNC ENGINE: NATURE TRIAL === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

// HD Landscape & Nature Collection
const quoteBackgrounds = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000", // Yosemite Valley
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", // Rocky Mountains
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000", // Foggy Forest
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000", // Sunlit Woods
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000", // New Zealand Lake
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000"  // Peaceful Meadow
];

const JSON_PATH = "./quotes_feed.json";

export async function initQuotes() {
    const now = new Date();
    const qDateElem = document.getElementById('q-date');
    const quoteTile = document.getElementById('quote-card');
    const textElem = document.getElementById('q-text');

    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // TRIAL MODE: Always sync and rotate backgrounds on refresh
    await syncRepoQuotes(now.toDateString(), quoteTile);
}

async function syncRepoQuotes(today, quoteTile) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');

    try {
        const response = await fetch(`${JSON_PATH}?v=${Date.now()}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const quotesList = await response.json();
        const finalQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        
        // Pick a fresh HD nature background
        const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Save state
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', randomBg);

        if (textElem) textElem.innerText = finalQuote;
        if (emojiElem) emojiElem.innerText = emoji;
        if (quoteTile) {
            // Apply HD background with a subtle dark overlay for text readability
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${randomBg}') center/cover no-repeat`;
        }

        console.log("%c [GHOST-TRIAL]: Nature background & Quote Synced.", "color: #4ec9b0; font-weight: bold;");

    } catch (error) {
        console.error("GHOST-SYNC: Error.", error);
    }
}
