const API_BASE = "https://sparrow-streamm-backend.onrender.com";

const playlist = document.getElementById("playlist");
const searchBar = document.getElementById("searchBar");
const player = document.getElementById("player");

/* =========================
   LOAD VIDEOS FROM BACKEND
========================= */
async function loadVideos() {
  const res = await fetch(`${API_BASE}/videos`);
  const videos = await res.json();

  playlist.innerHTML = "";

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${video.thumbnailLink || 'fallback.jpg'}">
      <p class="video-title">${video.name}</p>
    `;

    card.onclick = () => {
      player.src = `${API_BASE}/stream/${video.id}`;
      player.play();
    };

    playlist.appendChild(card);
  });
}

loadVideos();

/* =========================
   SEARCH (FIXED)
========================= */
searchBar.addEventListener("input", () => {
  const term = searchBar.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card
      .querySelector(".video-title")
      .innerText
      .toLowerCase();

    card.style.display = title.includes(term)
      ? "block"
      : "none";
  });
});
