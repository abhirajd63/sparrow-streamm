const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const videoGrid = document.getElementById("videoGrid");
const modal = document.getElementById("playerModal");
const player = document.getElementById("videoPlayer");

// Load videos
fetch(`${API_BASE}/api/videos`)
  .then(res => res.json())
  .then(videos => {
    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "video-card";

      card.innerHTML = `
        <img src="https://via.placeholder.com/300x170?text=Video" />
        <p>${video.name}</p>
      `;

      card.onclick = () => playVideo(video.id);

      videoGrid.appendChild(card);
    });
  })
  .catch(err => console.error(err));

// Play video
function playVideo(id) {
  player.src = `${API_BASE}/api/stream/${id}`;
  modal.style.display = "block";
}

// Close player
function closePlayer() {
  player.pause();
  player.src = "";
  modal.style.display = "none";
}
