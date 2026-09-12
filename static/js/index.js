"use strict";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".teaser-carousel, .results-carousel").forEach(carousel => {
  const videos = [...carousel.querySelectorAll("video")];
  const userPaused = new WeakSet();
  const manuallyStarted = new WeakSet();
  const playbackControls = new Map();
  const pauseIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const replayIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 7.6A7 7 0 1 1 5 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M3.8 4.8v5h5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function updatePlaybackControl(video) {
    const control = playbackControls.get(video);
    if (!control) return;
    const replay = video.paused || video.ended;
    control.innerHTML = replay ? replayIcon : pauseIcon;
    control.setAttribute("aria-label", replay ? "Replay video from beginning" : "Pause video");
    control.title = replay ? "Replay" : "Pause";
  }
  videos.forEach(video => {
    video.controls = false;
    let frame = video.parentElement;
    if (!frame.classList.contains("comparison-video")) {
      const wrapper = document.createElement("div");
      wrapper.className = "video-frame";
      frame.insertBefore(wrapper, video);
      wrapper.appendChild(video);
      frame = wrapper;
    }
    const control = document.createElement("button");
    control.className = "video-playback-control";
    control.type = "button";
    playbackControls.set(video, control);
    frame.appendChild(control);
    control.addEventListener("click", event => {
      event.stopPropagation();
      if (!video.paused && !video.ended) {
        userPaused.add(video);
        manuallyStarted.delete(video);
        video.pause();
      } else {
        userPaused.delete(video);
        manuallyStarted.add(video);
        video.currentTime = 0;
        video.play().catch(() => updatePlaybackControl(video));
      }
    });
    video.addEventListener("play", () => updatePlaybackControl(video));
    video.addEventListener("pause", () => updatePlaybackControl(video));
    video.addEventListener("ended", () => updatePlaybackControl(video));
    updatePlaybackControl(video);
  });
  const track = carousel.querySelector(".teaser-track");
  const slides = [...track.querySelectorAll(".comparison-video")];
  if (!slides.length) slides.push(...track.children);
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  let paused = reducedMotion.matches;
  const visibleVideos = new Set();
  function updatePlayback() {
    videos.forEach(video => {
      const shouldPlay = !document.hidden && visibleVideos.has(video) && !userPaused.has(video) && (!paused || manuallyStarted.has(video));
      if (shouldPlay) video.play().catch(() => updatePlaybackControl(video));
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

const copyCitation = document.querySelector(".bibtex-copy");
if (copyCitation) {
  copyCitation.hidden = false;
  let copyReset;
  copyCitation.addEventListener("click", async () => {
    clearTimeout(copyReset);
    try {
      await navigator.clipboard.writeText(document.getElementById("bibtex-code").textContent);
      copyCitation.textContent = "Copied!";
      copyCitation.setAttribute("aria-label", "BibTeX citation copied");
    } catch {
      copyCitation.textContent = "Select to copy";
      copyCitation.setAttribute("aria-label", "Copy unavailable; select the citation to copy manually");
      const range = document.createRange();
      range.selectNodeContents(document.getElementById("bibtex-code"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    copyReset = setTimeout(() => {
      copyCitation.textContent = "Copy";
      copyCitation.setAttribute("aria-label", "Copy BibTeX citation");
    }, 2500);
  });
}
