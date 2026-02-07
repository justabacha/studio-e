export function initUI() {
  updateUI();
  setInterval(updateUI, 1000);

  document.body.style.backgroundImage =
    `url('${backgrounds[Math.floor(Math.random() * backgrounds.length)]}')`;

  document.getElementById('portrait-img').style.backgroundImage =
    `url('${portraits[Math.floor(Math.random() * portraits.length)]}')`;
}

export function toggleView(view) {
  document.getElementById('dashboard-view').classList.remove('active-view');
  document.getElementById('studio-view').classList.remove('active-view');

  if (view === 'studio')
    document.getElementById('studio-view').classList.add('active-view');
  else
    document.getElementById('dashboard-view').classList.add('active-view');
}

function updateUI() {
  const now = new Date();

  document.getElementById('clock').innerText =
    now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById('date-header').innerText =
    now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const d = now.getDate();
  const s =
    (d % 10 === 1 && d !== 11) ? 'st' :
    (d % 10 === 2 && d !== 12) ? 'nd' :
    (d % 10 === 3 && d !== 13) ? 'rd' : 'th';

  document.getElementById('q-date').innerText =
    `📌 ${now.toLocaleString('default', { month: 'long' })} ${d}${s}, ${now.toLocaleString('default', { weekday: 'long' })}`;
}

/* shared assets */
const backgrounds = [/* KEEP YOUR BIG ARRAY HERE */];
const portraits = [/* KEEP YOUR PORTRAITS ARRAY HERE */];

window.toggleView = toggleView; // expose to HTML
