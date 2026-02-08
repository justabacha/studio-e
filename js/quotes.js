/* === THE "PHESTONE" SHORT-FORM QUOTE ENGINE === */

const EMOJIS = ["🧊","🔥","🍃","⚒️","🧠","🫧","🚀"];

const quoteBackgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
];

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

    if (textElem) textElem.innerText = "Filtering for power...";

    // Still in Refresh Mode for your testing
    await fetchShortQuote(now.toDateString(), quoteTile);
}

async function fetchShortQuote(today, quoteTile) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');

    try {
        // Fetching from ZenQuotes with a cache buster
        const targetUrl = encodeURIComponent('https://zenquotes.io/api/random');
        const cacheBuster = `&t=${Date.now()}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}${cacheBuster}`);
        
        const data = await response.json();
        const quoteArray = JSON.parse(data.contents);
        let finalQuote = quoteArray[0].q;

        // --- LENGTH GUARD: If > 10 words, we try one more time or trim it ---
        const wordCount = finalQuote.split(' ').length;
        
        if (wordCount > 10) {
            console.log(`[GHOST-LAYER]: Quote too long (${wordCount} words). Re-fetching...`);
            return fetchShortQuote(today, quoteTile); // Recursive call to get a shorter one
        }

        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        // Save for the 24hr cycle (once we lock it)
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', randomBg);

        if (textElem) textElem.innerText = finalQuote;
        if (emojiElem) emojiElem.innerText = emoji;
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${randomBg}') center/cover no-repeat`;
        }

    } catch (error) {
        console.error("GHOST-LAYER: Fetch failed.", error);
        if (textElem) textElem.innerText = "Protect your peace."; 
    }
}
