/* === THE "PHESTONE" 24-HOUR GHOST VAULT === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

// Keep your high-res nature links here for stability
const quoteBackgrounds = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000"
];

const JSON_PATH = "./quotes_feed.json";

export async function initQuotes() {
    const now = new Date();
    const today = now.toDateString();
    const quoteTile = document.getElementById('quote-card');
    const qDateElem = document.getElementById('q-date');

    // 1. Permanent Date Display
    if (qDateElem) {
        const d = now.getDate();
        const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
        qDateElem.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }

    // 2. The 24-Hour Check
    const cachedDate = localStorage.getItem('quote_date');
    if (cachedDate === today) {
        // LOCK IN: Load exactly what was saved yesterday
        render(localStorage.getItem('quote_text'), localStorage.getItem('quote_emoji'));
        if (quoteTile) {
            const savedBg = localStorage.getItem('quote_bg');
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${savedBg}') center/cover no-repeat`;
        }
    } else {
        // NEW DAY: Run the sync cycle
        await dailySync(today, quoteTile);
    }
}

async function dailySync(today, quoteTile) {
    try {
        const response = await fetch(`${JSON_PATH}?v=${Date.now()}`);
        if (!response.ok) throw new Error("Sync Interrupted");
        const quotesList = await response.json();

        // 3. Never Repeat Logic
        let used = JSON.parse(localStorage.getItem('used_quotes') || "[]");
        let available = quotesList.filter(q => !used.includes(q));

        if (available.length === 0) {
            used = [];
            available = quotesList;
        }

        // Random Selection happens here once every 24hrs
        const finalQuote = available[Math.floor(Math.random() * available.length)];
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const bg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Update Used List
        used.push(finalQuote);
        
        // Save everything to the Vault
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', bg);
        localStorage.setItem('used_quotes', JSON.stringify(used));

        render(finalQuote, emoji);
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${bg}') center/cover no-repeat`;
        }

        console.log("%c [GHOST-VAULT]: 24hr Cycle Synchronized.", "color: #4ec9b0; font-weight: bold;");

    } catch (error) {
        console.error("GHOST-VAULT: Sync failed.", error);
    }
}

function render(text, emoji) {
    const t = document.getElementById('q-text');
    const e = document.getElementById('q-emoji');
    if (t) t.innerText = text || "Protect your peace.";
    if (e) e.innerText = emoji || "🧊";
}
