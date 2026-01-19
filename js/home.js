const row = document.getElementById("videoRow");

fetch("http://localhost:5000/api/videos")
  .then(res => res.json())
  .then(videos => {
    videos.forEach(video => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<span>${video.name}</span>`;

      card.onclick = () => {
        window.location.href = `player.html?id=${video.id}`;
      };

      row.appendChild(card);
    });
  })
  .catch(err => console.error(err));
