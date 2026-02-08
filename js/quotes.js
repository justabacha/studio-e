/* === THE "PHESTONE" API-ONLY TEST ENGINE === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg",
    "https://i.postimg.cc/9fMv0VzX/hustle-1.jpg", // Add more as needed
    "https://i.postimg.cc/44YfV2yP/hustle-2.jpg"
];

export async function initQuotes() {
    const now = new Date();
    
    // 1. Live Date Display
    const qDateElem = document.getElementById('q-date');
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    const quoteTile = document.getElementById('quote-card');
    
    // 2. FOR TESTING: Always fetch on refresh
    // (To set back to 24hrs later, we wrap this in: if (localStorage.getItem('quote_date') !== now.toDateString()))
    await fetchAndRotate(now.toDateString(), quoteTile);
}

async function fetchAndRotate(today, quoteTile) {
    const textElem = document.getElementById('q-text');
    if (textElem) textElem.innerText = "Connecting to Ghost Feed...";

    try {
        // Fetching from Quotable API with tags for Hustle/Life
        const response = await fetch('https://api.quotable.io/random?maxLength=65&tags=inspirational|wisdom|business|competition');
        
        if (!response.ok) throw new Error("API Offline");
        
        const data = await response.json();
        const finalQuote = data.content;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Save to Storage
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', randomBg);

        // Render Live
        render(finalQuote, emoji);
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${randomBg}') center/cover no-repeat`;
        }

        console.log(`%c [GHOST-QUOTE]: Fetched via API -> "${finalQuote}"`, "color: #4ec9b0; font-weight: bold;");

    } catch (error) {
        // If this fires, you'll know the API is the issue
        render("API Link Severed. Check Connection.", "⚠️");
        console.error("GHOST-LAYER: Fetch failed.", error);
    }
}

function render(text, emoji) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');
    if (textElem) textElem.innerText = text;
    if (emojiElem) emojiElem.innerText = emoji;
}
