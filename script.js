const player = document.getElementById("player");
const playlist = document.getElementById("playlist");
const audioSelect = document.getElementById("audioSelect");
const subtitleSelect = document.getElementById("subtitleSelect");

const BACKEND = "https://sparrow-streamm-backend.onrender.com";

// 🔹 Load videos
fetch(`${BACKEND}/api/videos`)
  .then(res => res.json())
  .then(videos => {
    playlist.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${video.thumbnailLink}">
        <p>${video.name}</p>
      `;
      card.onclick = () => playVideo(video.id);
      playlist.appendChild(card);
    });
  });

// 🔹 Play selected video
function playVideo(id) {
  player.src = `${BACKEND}/api/stream/${id}`;
  player.load();
  player.play();

  player.onloadedmetadata = () => {
    loadAudioTracks();
    loadSubtitles();
  };
}

// 🔹 Seek forward/backward (VLC style)
function seek(seconds) {
  player.currentTime += seconds;
}

// 🔹 Load audio tracks
function loadAudioTracks() {
  audioSelect.innerHTML = "";

  if (!player.audioTracks) {
    audioSelect.innerHTML = `<option>No Audio Tracks</option>`;
    return;
  }

  for (let i = 0; i < player.audioTracks.length; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = `Audio ${i + 1}`;
    audioSelect.appendChild(opt);
  }

  audioSelect.onchange = () => {
    for (let i = 0; i < player.audioTracks.length; i++) {
      player.audioTracks[i].enabled = (i == audioSelect.value);
    }
  };
}

// 🔹 Load subtitles
function loadSubtitles() {
  subtitleSelect.innerHTML = `<option value="off">Subtitles OFF</option>`;

  const tracks = player.textTracks;

  for (let i = 0; i < tracks.length; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = tracks[i].label || `Subtitle ${i + 1}`;
    subtitleSelect.appendChild(opt);
    tracks[i].mode = "disabled";
  }

  subtitleSelect.onchange = () => {
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = "disabled";
    }

    if (subtitleSelect.value !== "off") {
      tracks[subtitleSelect.value].mode = "showing";
    }
  };
}

// 🔹 Keyboard shortcuts (VLC style)
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") seek(10);
  if (e.key === "ArrowLeft") seek(-10);
  if (e.key === " ") {
    e.preventDefault();
    player.paused ? player.play() : player.pause();
  }
});
