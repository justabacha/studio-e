/* === ASSETS === */
const backgrounds = [
    "https://i.postimg.cc/JGsdX7Xt/1000481158.jpg", "https://i.postimg.cc/BtnH4MFy/IMG-20250406-150134-376.jpg", 
    "https://i.postimg.cc/JtYJnZ3d/IMG-20250508-130946-260.jpg", "https://i.postimg.cc/Yh4Fm0b4/IMG-20250508-132241-849.jpg", 
    "https://i.postimg.cc/kBVStGfK/IMG-20250509-132838-632.jpg", "https://i.postimg.cc/MXpVqdBC/IMG-20250509-132907-265.jpg", 
    "https://i.postimg.cc/V5ZM6n9T/IMG-20250512-134741-670.jpg", "https://i.postimg.cc/Wqzk81VS/IMG-20250512-134749-669.jpg", 
    "https://i.postimg.cc/SYRMdx4g/IMG-20250512-150754-489.jpg", "https://i.postimg.cc/F1H3NDSx/IMG-20250512-150817-455.jpg", 
    "https://i.postimg.cc/FdDS0JMP/IMG-20250512-150837-816.jpg", "https://i.postimg.cc/Lh8L2NPP/IMG-20250512-164716-997.jpg", 
    "https://i.postimg.cc/9w07bQVW/IMG-20250512-230127-265.jpg", "https://i.postimg.cc/K48BxJTs/IMG-20250514-085431-587.jpg", 
    "https://i.postimg.cc/5jKv0Lqt/IMG-20250514-085449-167.jpg", "https://i.postimg.cc/5QyCg21y/IMG-20250514-085457-920.jpg", 
    "https://i.postimg.cc/0Kjwnyxv/IMG-20250514-113004-812.jpg", "https://i.postimg.cc/DmpsZLdV/IMG-20250514-113029-203.jpg", 
    "https://i.postimg.cc/bsGn2r3b/IMG-20250514-113037-963.jpg", "https://i.postimg.cc/V0vCgkw2/IMG-20250514-113046-487.jpg", 
    "https://i.postimg.cc/4nxVsBtC/IMG-20250514-231007-068.jpg", "https://i.postimg.cc/JH0kxzm7/IMG-20250515-185904-877.jpg", 
    "https://i.postimg.cc/bdwkp3nt/IMG-20250516-204755-207.jpg", "https://i.postimg.cc/143wsJ61/IMG-20250516-204813-696.jpg", 
    "https://i.postimg.cc/D8WGb0Bf/IMG-20250516-204816-036.jpg", "https://i.postimg.cc/hfJm7vp1/IMG-20250516-204827-799.jpg", 
    "https://i.postimg.cc/1VXqB3PP/IMG-20250516-211520-422.jpg", "https://i.postimg.cc/rRsrjwcL/IMG-20250517-025228-630.jpg", 
    "https://i.postimg.cc/c6Lw0X3k/IMG-20250517-025244-570.jpg", "https://i.postimg.cc/hhtTcpmp/IMG-20250517-150343-574.jpg", 
    "https://i.postimg.cc/qgDnRycF/IMG-20250517-150412-479.jpg", "https://i.postimg.cc/ctCnhLW5/IMG-20250517-181821-042.jpg", 
    "https://i.postimg.cc/fkqXLmjM/IMG-20250518-233931-873.jpg", "https://i.postimg.cc/y3xZj8BH/IMG-20250519-002048-519.jpg", 
    "https://i.postimg.cc/N5yXrFp5/IMG-20250519-181534-964.jpg", "https://i.postimg.cc/dDNd1rmY/IMG-20250520-224137-084.jpg", 
    "https://i.postimg.cc/XXYd4QFb/IMG-20250522-015401-406.jpg", "https://i.postimg.cc/fSy9CRZT/IMG-20250524-175922-403.jpg", 
    "https://i.postimg.cc/nMhBp0mG/IMG-20250527-144224-313.jpg", "https://i.postimg.cc/pyc8TzQ6/IMG-20250527-145207-040.jpg", 
    "https://i.postimg.cc/CdrD1kHq/IMG-20250527-145216-476.jpg", "https://i.postimg.cc/9w07bQ2v/IMG-20250528-192417-652.jpg", 
    "https://i.postimg.cc/GTtyKmRV/IMG-20250624-190509-198.jpg", "https://i.postimg.cc/YjCYMbF6/IMG-20250707-175550-865.jpg", 
    "https://i.postimg.cc/WtYr3g6q/IMG-20250707-175630-022.jpg", "https://i.postimg.cc/bsGn2r3w/IMG-20250709-014509-559.jpg", 
    "https://i.postimg.cc/jCSPtZfX/IMG-20250723-145118-427.jpg", "https://i.postimg.cc/rKd4tsQm/IMG-20251117-171325-519.jpg", 
    "https://i.postimg.cc/9w07bQ2g/IMG-20251125-235854-063.jpg", "https://i.postimg.cc/Z0s3RpFz/IMG-20251209-235255-046.jpg", 
    "https://i.postimg.cc/Th3gfCbg/IMG-20251209-235338-019.jpg", "https://i.postimg.cc/gXgwxXQP/20250217-164714-3.jpg", 
    "https://i.postimg.cc/ZBw9WBg7/20250303-180654.jpg", "https://i.postimg.cc/fVvMW41g/20251127-154101.jpg", 
    "https://i.postimg.cc/RJqWKCxS/20251224-174420.jpg", "https://i.postimg.cc/FdTfYd84/254781072164-status-72a8ad8d414b4fd9b4cdbdd2b42f7324.jpg", 
    "https://i.postimg.cc/cvcd1qVN/7afe2684-b3e3-4a12-a80b-17531d44bad4.jpg"
];

const portraits = [
    "https://i.postimg.cc/MvFbdDqk/1000481154.jpg", "https://i.postimg.cc/XpJkfhMq/1000481158.jpg", 
    "https://i.postimg.cc/xqgPbQZN/1000481160.jpg", "https://i.postimg.cc/fJLfcF4b/1000481161.jpg", 
    "https://i.postimg.cc/w7vQXPK6/1000481163.jpg", "https://i.postimg.cc/JGn5NgwD/1000481166.jpg", 
    "https://i.postimg.cc/0bQ0Y3gb/1000481167.jpg", "https://i.postimg.cc/vcBtrjRV/1000488116.jpg", 
    "https://i.postimg.cc/PPRz24Tn/1000511845.jpg", "https://i.postimg.cc/rKPCQJcH/1000511870.jpg", 
    "https://i.postimg.cc/bsJ9xMXZ/1000528689.jpg", "https://i.postimg.cc/SjVGz4P2/1000533205.jpg", 
    "https://i.postimg.cc/mtDyYqx1/1000607482.jpg", "https://i.postimg.cc/bsJ9xMXJ/1000614811.jpg", 
    "https://i.postimg.cc/4mSbB5sT/1000615886.jpg", "https://i.postimg.cc/WhH6XnTj/1000616227.jpg", 
    "https://i.postimg.cc/LnX3t7dT/1000616232.jpg", "https://i.postimg.cc/LnbBNTRj/1000616365.jpg", 
    "https://i.postimg.cc/gnJHV59h/pm-1709016191987-cmp-2.jpg", "https://i.postimg.cc/vDXv6yK1/pm-1709016424337-cmp.jpg"
];

/* === CORE LOGIC === */

export function initUI() {
    updateUI();
    setInterval(updateUI, 1000);

    // Set Random Wallpaper
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${randomBg}')`;

    // Set Random Portrait
    const portraitElem = document.getElementById('portrait-img');
    if (portraitElem) {
        const randomPortrait = portraits[Math.floor(Math.random() * portraits.length)];
        portraitElem.style.backgroundImage = `url('${randomPortrait}')`;
    }
}

export function toggleView(view) {
    const dash = document.getElementById('dashboard-view');
    const studio = document.getElementById('studio-view');

    dash.classList.remove('active-view');
    studio.classList.remove('active-view');

    if (view === 'studio') {
        studio.classList.add('active-view');
    } else {
        dash.classList.add('active-view');
    }
}

export function updateUI() {
    const now = new Date();
    
    // Time & Date Headers
    const clock = document.getElementById('clock');
    const dateH = document.getElementById('date-header');
    const qDate = document.getElementById('q-date');

    if (clock) clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (dateH) dateH.innerText = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    // Ordinal Date (1st, 2nd, 3rd...)
    const d = now.getDate();
    const s = (d % 10 === 1 && d !== 11) ? 'st' : (d % 10 === 2 && d !== 12) ? 'nd' : (d % 10 === 3 && d !== 13) ? 'rd' : 'th';
    
    if (qDate) {
        qDate.innerText = `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
    }
}

/* === EXPOSE GLOBALS === */
window.toggleView = toggleView;
window.initUI = initUI;
