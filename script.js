console.log("JS loaded");

const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");

// 🔹 Load videos on page load
async function loadVideos() {
  try {
    const res = await fetch(`${API_BASE}/api/videos`);
    const videos = await res.json();

    playlist.innerHTML = "";

    videos.forEach((video) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${video.thumbnailLink}" alt="${video.name}">
        <p>${video.name}</p>
      `;

      card.onclick = () => playVideo(video.id);

      playlist.appendChild(card);
    });
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
}

// 🔹 Play selected video
function playVideo(videoId) {
  player.src = `${API_BASE}/api/stream/${videoId}`;
  player.play();
}

// 🚀 Init
loadVideos();
