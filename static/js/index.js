"use strict";
const videos = [...document.querySelectorAll("video")];
const teaser = document.querySelector(".teaser-video video");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) teaser?.pause();
document.addEventListener("visibilitychange", () => {
  if (document.hidden) videos.forEach(video => video.pause());
});
