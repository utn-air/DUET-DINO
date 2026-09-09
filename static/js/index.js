"use strict";
const videos = [...document.querySelectorAll("video")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const carousel = document.querySelector(".teaser-carousel");
if (carousel) {
  const track = carousel.querySelector(".teaser-track");
  const slides = [...track.children];
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  const status = carousel.querySelector(".carousel-status");
  const playback = carousel.querySelector(".carousel-playback");
  let paused = reducedMotion.matches;
  const visibleVideos = new Set();
  function updatePlayback() {
    playback.textContent = paused ? "Play videos" : "Pause videos";
    videos.forEach(video => {
      if (!paused && !document.hidden && visibleVideos.has(video)) video.play().catch(() => {});
      else video.pause();
    });
  }
  function updateNavigation() {
    const step = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    const first = Math.round(track.scrollLeft / step);
    const count = Math.max(1, Math.round((track.clientWidth + 18) / step));
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const last = Math.min(first + count, slides.length);
    status.textContent = first + 1 === last ? `${last} / ${slides.length}` : `${first + 1}–${last} / ${slides.length}`;
  }
  function move(direction) {
    const step = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? "instant" : "smooth" });
  }
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  track.addEventListener("keydown", event => {
    if (event.target !== track || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  });
  track.addEventListener("scroll", updateNavigation, { passive: true });
  new ResizeObserver(updateNavigation).observe(track);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= .5) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
    });
    updatePlayback();
  }, { threshold: [0, .5] });
  videos.forEach(video => observer.observe(video));
  playback.addEventListener("click", () => { paused = !paused; updatePlayback(); });
  reducedMotion.addEventListener("change", () => { paused = reducedMotion.matches; updatePlayback(); });
  document.addEventListener("visibilitychange", updatePlayback);
  previous.hidden = next.hidden = false;
  carousel.querySelector(".carousel-controls").hidden = false;
  updateNavigation();
  updatePlayback();
}
