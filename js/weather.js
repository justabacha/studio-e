export async function getWeather() {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=0.51&longitude=35.26&current=temperature_2m,relative_humidity_2m'
    );
    const data = await res.json();

    const temp = Math.round(data.current.temperature_2m);
    document.getElementById('temp').innerText = temp + "°C";
    document.getElementById('hum').innerText =
      data.current.relative_humidity_2m + "%";

    const vibe = document.getElementById('weather-vibe');
    if (temp < 19) vibe.innerText = "Cold weather for coffee ☕";
    else if (temp < 24) vibe.innerText = "Eldoret is feeling right 🍃";
    else vibe.innerText = "Eldoret is heating up! ☀️";

  } catch {
    document.getElementById('temp').innerText = "--°C";
  }
}
