"use strict";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".teaser-carousel, .results-carousel").forEach(carousel => {
  const videos = [...carousel.querySelectorAll("video")];
  const track = carousel.querySelector(".teaser-track");
  const slides = [...track.children];
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  let paused = reducedMotion.matches;
  const visibleVideos = new Set();
  function updatePlayback() {
    videos.forEach(video => {
      if (!paused && !document.hidden && visibleVideos.has(video)) video.play().catch(() => {});
      else video.pause();
    });
  }
  function updateNavigation() {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
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
  reducedMotion.addEventListener("change", () => { paused = reducedMotion.matches; updatePlayback(); });
  document.addEventListener("visibilitychange", updatePlayback);
  previous.hidden = next.hidden = false;
  updateNavigation();
  updatePlayback();
});

const resultTabs = [...document.querySelectorAll('.result-tabs [role="tab"]')];
function selectResultTab(selected) {
  resultTabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.hidden = !active;
    if (!active) panel.querySelectorAll("video").forEach(video => video.pause());
  });
}
resultTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectResultTab(tab));
  tab.addEventListener("keydown", event => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % resultTabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + resultTabs.length) % resultTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = resultTabs.length - 1;
    else return;
    event.preventDefault();
    selectResultTab(resultTabs[next]);
    resultTabs[next].focus();
  });
});
