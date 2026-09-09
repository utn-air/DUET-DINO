'use strict';
const videos = [...document.querySelectorAll('video')];
// Pause all motion when the page is hidden and respect reduced-motion preferences.
const teaser = document.querySelector(".teaser-video video");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) teaser?.pause();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});
// Each experiment can be played and paused as a comparison group.
document.querySelectorAll('.compare-play').forEach(button => {
  const group = [...document.getElementById(button.dataset.target).querySelectorAll('video')];
  const update = () => {
    button.textContent = group.some(video => !video.paused) ? 'Pause comparison Ⅱ' : 'Play comparison ▷';
  };
  button.addEventListener('click', async () => {
    if (group.some(video => !video.paused)) group.forEach(video => video.pause());
    else {
      group.forEach(video => { video.currentTime = 0; });
      await Promise.allSettled(group.map(video => video.play()));
    }
    update();
  });
  group.forEach(video => {
    video.addEventListener('play', update);
    video.addEventListener('pause', update);
  });
});
