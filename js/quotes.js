/* === THE "PHESTONE" INFINITE QUOTE ENGINE (FRESH HIT MODE) === */

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

    if (textElem) textElem.innerText = "Bypassing Cache...";

    // Force a fresh fetch on every refresh
    await fetchNewQuote(now.toDateString(), quoteTile);
}

async function fetchNewQuote(today, quoteTile) {
    const textElem = document.getElementById('q-text');
    const emojiElem = document.getElementById('q-emoji');

    try {
        // ADDING CACHE BUSTER: ?t=[timestamp] ensures the proxy gives us a fresh quote
        const cacheBuster = `&t=${Date.now()}`;
        const targetUrl = encodeURIComponent('https://zenquotes.io/api/random');
        const response = await fetch(`https://api.allorigins.win/get?url=${targetUrl}${cacheBuster}`);
        
        if (!response.ok) throw new Error("Network Response Fail");

        const data = await response.json();
        const quoteArray = JSON.parse(data.contents);
        const finalQuote = quoteArray[0].q;
        
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const randomBg = quoteBackgrounds[Math.floor(Math.random() * quoteBackgrounds.length)];

        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_text', finalQuote);
        localStorage.setItem('quote_emoji', emoji);
        localStorage.setItem('quote_bg', randomBg);

        if (textElem) textElem.innerText = finalQuote;
        if (emojiElem) emojiElem.innerText = emoji;
        if (quoteTile) {
            quoteTile.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${randomBg}') center/cover no-repeat`;
        }

        console.log(`%c [GHOST-QUOTE]: NEW FETCH -> ${finalQuote}`, "color: #4ec9b0; font-weight: bold;");

    } catch (error) {
        if (textElem) {
            textElem.innerHTML = `<span style="color: #f44747;">GHOST-SYS: Feed Offline</span>`;
        }
        console.error("GHOST-LAYER: Fetch failed.", error);
    }
}
