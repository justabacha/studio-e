/* === PDCC GALLERY ENGINE: SNAP & SYNC === */

let db;
const DB_NAME = "PDCC_Archive";

// 1. BOOT THE VAULT (IndexedDB)
export function initGallery() {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        db.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        console.log("Archive Vault: ONLINE 🟢");
        loadLocalGallery();
        setupCamera();
        // The 30s "Silent Sync" loop
        setInterval(silentSync, 30000);
    };
}

// 2. THE LIVE VIEW (Camera Capture)
async function setupCamera() {
    const video = document.getElementById('viewfinder');
    const shutter = document.getElementById('shutter');
    const startBtn = document.getElementById('start-cam');

    startBtn.onclick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            video.srcObject = stream;
            startBtn.style.display = 'none';
            shutter.style.display = 'inline-block';
        } catch (err) {
            console.error("Camera Access Denied:", err);
        }
    };

    shutter.onclick = () => {
        const canvas = document.getElementById('snapshot-buffer');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        saveAndFlex(imageData); // INSTANT VIEW
    };
}

// 3. THE INSTANT FLEX
function saveAndFlex(data) {
    const transaction = db.transaction(["photos"], "readwrite");
    transaction.objectStore("photos").add({ data, timestamp: Date.now() });
    loadLocalGallery(); // Refresh UI immediately for that iPhone feel
}

function loadLocalGallery() {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;
    
    const transaction = db.transaction(["photos"], "readonly");
    const store = transaction.objectStore("photos");
    grid.innerHTML = ''; 

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

// 4. THE SILENT SYNC (The Ghost Logic)
function silentSync() {
    console.log("Ghost Sync: Scanning Cloud for new Flexes...");
    // GitHub API Sync logic goes here next!
}

window.viewFull = (src) => {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.classList.remove('hidden');
};
