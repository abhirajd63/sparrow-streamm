console.log("JS loaded");

const API_BASE = "https://sparrow-streamm-backend.onrender.com";
const player = document.getElementById("player");
const playlist = document.getElementById("playlist");
const seekBar = document.getElementById("seekBar");

/* ==========================
   LOAD VIDEOS FROM BACKEND
========================== */
fetch(`${API_BASE}/api/videos`)
  .then(res => res.json())
  .then(videos => {
    playlist.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerText = video.name;

      card.onclick = () => {
        playVideo(video.id);
      };

      playlist.appendChild(card);
    });
  })
  .catch(err => {
    console.error("FETCH ERROR:", err);
  });

/* ==========================
   PLAY VIDEO
========================== */
function playVideo(id) {
  player.src = `${API_BASE}/api/stream/${id}`;
  player.load();
  player.play();
}

/* ==========================
   SKIP FUNCTION (VLC STYLE)
========================== */
function seek(seconds) {
  if (!player.duration) return;

  let newTime = player.currentTime + seconds;

  if (newTime < 0) newTime = 0;
  if (newTime > player.duration) newTime = player.duration;

  player.currentTime = newTime;
}

/* ==========================
   SEEK BAR SYNC
========================== */
player.addEventListener("loadedmetadata", () => {
  seekBar.max = Math.floor(player.duration);
});

player.addEventListener("timeupdate", () => {
  seekBar.value = Math.floor(player.currentTime);
});

seekBar.addEventListener("input", () => {
  player.currentTime = seekBar.value;
});

/* ==========================
   KEYBOARD SKIP (VLC FEEL)
========================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") seek(10);
  if (e.key === "ArrowLeft") seek(-10);
});
