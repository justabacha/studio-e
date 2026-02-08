/* === THE "PHESTONE" REPO-SYNC ENGINE === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];
const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
];

// If the JSON is in the same repo/folder as your code, use a relative path:
const JSON_PATH = "./quotes_feed.json";

export async function initQuotes() {
    const now = new Date();
    const qDateElem = document.getElementById('q-date');
    const quoteTile = document.getElementById('quote-card');
    const textElem = document.getElementById('q-text');

    // 1. Date Logic
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // 2. TRIAL MODE: Force Refresh from Repo
    if (textElem) textElem.innerText = "Syncing Ghost Feed...";
    await syncRepoQuotes(now.toDateString(), quoteTile);
}

async function syncRepoQuotes(today, quoteTile) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');

    try {
        // Fetching with a timestamp to kill any "Too Many Requests" cache
        const response = await fetch(`${JSON_PATH}?v=${Date.now()}`);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const quotesList = await response.json();
        
        // Randomly pick from your Pinterest-curated JSON
        const finalQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const bg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Save to clear the old "Too Many Requests" ghost
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', bg);

        // Render
        if (textElem) textElem.innerText = finalQuote;
        if (emojiElem) emojiElem.innerText = emoji;
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bg}') center/cover no-repeat`;
        }

        console.log("%c [GHOST-SYNC]: JSON feed active.", "color: #4ec9b0; font-weight: bold;");

    } catch (error) {
        console.error("GHOST-SYNC: Failed to reach JSON.", error);
        if (textElem) textElem.innerHTML = `<span style="color: #f44747;">SYNC_ERROR: ${error.message}</span>`;
    }
}
