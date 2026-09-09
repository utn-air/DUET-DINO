'use strict';
const videos = [...document.querySelectorAll('video')];
// Playback is opt-in, including for visitors who prefer reduced motion.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});
document.getElementById('copy-citation').addEventListener('click', async () => {
  const citation = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    status.textContent = 'BibTeX copied to clipboard.';
  } catch (_) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(citation);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C (or ⌘C) to copy.';
  }
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
