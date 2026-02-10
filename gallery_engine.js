/* === PDCC GALLERY ENGINE: SNAP & SYNC === */

let db;
const DB_NAME = "PDCC_Archive";

// 1. BOOT LOCAL DATABASE (IndexedDB)
export function initGallery() {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        db.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        console.log("Archive Local DB: ONLINE 🟢");
        loadLocalGallery();
        setupCamera();
        // Start the 30s Ghost Sync
        setInterval(silentSync, 30000);
    };
}

// 2. CAMERA LOGIC
async function setupCamera() {
    const video = document.getElementById('viewfinder');
    const shutter = document.getElementById('shutter');
    const startBtn = document.getElementById('start-cam');

    startBtn.onclick = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        startBtn.style.display = 'none';
        shutter.style.display = 'inline-block';
    };

    shutter.onclick = () => {
        const canvas = document.getElementById('snapshot-buffer');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        saveToLocal(imageData); // INSTANT FLEX
    };
}

// 3. THE "SNAP" SAVE (Local Only for now)
function saveToLocal(data) {
    const transaction = db.transaction(["photos"], "readwrite");
    transaction.objectStore("photos").add({ data, timestamp: Date.now() });
    loadLocalGallery(); // Refresh UI instantly
}

function loadLocalGallery() {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;
    
    const transaction = db.transaction(["photos"], "readonly");
    const store = transaction.objectStore("photos");
    grid.innerHTML = ''; // Clear for fresh load

    store.openCursor(null, "prev").onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${cursor.value.data}" onclick="viewFull('${cursor.value.data}')">`;
            grid.appendChild(item);
            cursor.continue();
        }
    };
}

// 4. SILENT SYNC (The Ghost Loop)
function silentSync() {
    console.log("Ghost Sync: Checking GitHub for updates...");
    // We will add the GitHub API fetch here once the server is stable!
}

window.viewFull = (src) => {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.classList.remove('hidden');
};
