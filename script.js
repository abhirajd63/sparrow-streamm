const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");

// Load videos
fetch(`${API_BASE}/api/videos`)
  .then(res => res.json())
  .then(videos => {
    playlist.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${video.thumbnailLink}" alt="${video.name}">
        <p>${video.name}</p>
      `;

      card.onclick = () => playVideo(video.id);

      playlist.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading videos:", err);
  });

// Play video
function playVideo(id) {
  player.src = `${API_BASE}/api/stream/${id}`;
  player.play();
}
