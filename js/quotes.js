/* === THE "PHESTONE" REPO-DRIVEN QUOTE ENGINE === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];
const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
];

// REPLACE THIS with your actual GitHub Raw URL
const REPO_JSON_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/quotes_feed.json";

export async function initQuotes() {
    const now = new Date();
    const today = now.toDateString();
    const quoteTile = document.getElementById('quote-card');
    const qDateElem = document.getElementById('q-date');

    // 1. Date Display Logic (Preserving your specific ordinals)
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // 2. 24-Hour Persistence Logic
    const cachedDate = localStorage.getItem('quote_date');
    if (cachedDate === today) {
        render(localStorage.getItem('quote_text'), localStorage.getItem('quote_emoji'));
        if (quoteTile) {
            const bg = localStorage.getItem('quote_bg') || quoteBackgrounds[0];
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bg}') center/cover no-repeat`;
        }
    } else {
        await syncWithRepo(today, quoteTile);
    }
}

async function syncWithRepo(today, quoteTile) {
    try {
        // Fetching your curated Pinterest quotes from your Repo
        const response = await fetch(`${REPO_JSON_URL}?t=${Date.now()}`); // Cache buster included
        if (!response.ok) throw new Error("Repo Offline");
        
        const quotesList = await response.json();
        
        // Pick a random quote from your curated list
        const quoteText = quotesList[Math.floor(Math.random() * quotesList.length)];
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const bg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Save for the next 24 hours
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', quoteText);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', bg);

        render(quoteText, emoji);
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bg}') center/cover no-repeat`;
        }

        console.log("%c [GHOST-SYNC]: Repo quotes updated.", "color: #4ec9b0");

    } catch (e) {
        console.error("GHOST-SYNC: Error fetching repo. Using emergency fallback.", e);
        render("Protect your peace.", "🧊"); // Emergency fallback
    }
}

function render(text, emoji) {
    const t = document.getElementById('q-text');
    const e = document.getElementById('q-emoji');
    if (t) t.innerText = text;
    if (e) e.innerText = emoji;
}
