/* === ASSETS === */
export const backgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg",
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
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
