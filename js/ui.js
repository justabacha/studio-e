/* === ASSETS === */
export const backgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
     "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1433086566608-571ad11350a9?auto=format&fit=crop&q=80&w=1000"
    // ... add your full list here
];

const portraits = [
    "https://i.postimg.cc/MvFbdDqk/1000481154.jpg"
];

/* === CORE LOGIC === */
export function initUI() {
    updateUI();
    setInterval(updateUI, 1000);

    // Apply Random Background
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${randomBg}')`;

    // Apply Random Portrait
    const portraitElem = document.getElementById('portrait-img');
    if (portraitElem) {
        const randomPortrait = portraits[Math.floor(Math.random() * portraits.length)];
        portraitElem.style.backgroundImage = `url('${randomPortrait}')`;
    }
    console.log("UI Engine: Wallpaper & Portraits Synced ✅");
}

export function toggleView(view) {
    const dash = document.getElementById('dashboard-view');
    const studio = document.getElementById('studio-view');

    if (view === 'studio') {
        dash.classList.remove('active-view');
        studio.classList.add('active-view');
    } else {
        studio.classList.remove('active-view');
        dash.classList.add('active-view');
    }
}

export function updateUI() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const dateH = document.getElementById('date-header');
    
    if (clock) clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (dateH) dateH.innerText = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

// Global Links for HTML
window.toggleView = toggleView;
window.initUI = initUI;
