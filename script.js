const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const player = videojs("main-player");

function loadVideo(video) {
  player.src({
    src: `${API_BASE}/api/stream/${video.id}`,
    type: "video/mp4",
  });

  document.getElementById("video-title").innerText = video.name;
  document.getElementById("video-desc").innerText = video.description || "No description";
  player.play();
}

fetch(`${API_BASE}/api/videos/list`)
  .then(res => res.json())
  .then(videos => {
    const playlist = document.getElementById("playlist");

    // Load first video by default
    loadVideo(videos[0]);

    videos.forEach((video) => {
      const card = document.createElement("div");
      card.classList.add("playlist-card");

      // Auto thumbnail from Drive
      const thumb = document.createElement("img");
      thumb.src = video.thumbnailLink;   // <-- Auto thumbnail
      thumb.classList.add("thumb");

      const title = document.createElement("div");
      title.innerText = video.name;
      title.classList.add("thumb-title");

      card.appendChild(thumb);
      card.appendChild(title);

      card.addEventListener("click", () => {
        loadVideo(video);
      });

      playlist.appendChild(card);
    });
  })
  .catch(err => console.error(err));
