console.log("JS loaded");

const playlist = document.getElementById("playlist");
const player = document.getElementById("player");

fetch("https://sparrow-streamm-backend.onrender.com/api/videos")
  .then(res => {
    if (!res.ok) {
      throw new Error("API error");
    }
    return res.json();
  })
  .then(videos => {
    console.log("VIDEOS:", videos);

    playlist.innerHTML = "";

    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${video.thumbnailLink}" alt="${video.name}">
        <p>${video.name}</p>
      `;

      card.onclick = () => {
        player.src = `https://sparrow-streamm-backend.onrender.com/api/stream/${video.id}`;
        player.play();
      };

      playlist.appendChild(card);
    });
  })
  .catch(err => {
    console.error("FETCH ERROR:", err);
    playlist.innerHTML = "<p style='color:red'>Failed to load videos</p>";
  });
