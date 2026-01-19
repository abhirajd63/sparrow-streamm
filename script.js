const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const player = document.getElementById("player");
const playlist = document.getElementById("playlist");

fetch(`${API_BASE}/api/videos/list`)
  .then(res => res.json())
  .then(videos => {
    if (!videos.length) return;

    loadVideo(videos[0]);

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = video.thumbnailLink;

      const title = document.createElement("p");
      title.innerText = video.name;

      card.appendChild(img);
      card.appendChild(title);

      card.onclick = () => loadVideo(video);

      playlist.appendChild(card);
    });
  });

function loadVideo(video) {
  player.src = `${API_BASE}/api/stream/${video.id}`;
  player.load();
  player.play();
}
