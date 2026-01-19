const params = new URLSearchParams(window.location.search);
const videoId = params.get("id");

const video = document.getElementById("video");
video.src = `http://localhost:5000/api/videos/stream/${videoId}`;
