# DUET-DINO project page

Static, dependency-free page for **DUET-DINO: Simultaneous Cross-View World Modeling for Latent Planning in Robot Manipulation**. Serve the repository directly with GitHub Pages; no build step is needed.

## Preview

```sh
cd DUET-DINO # omit if already inside the repository
python3 -m http.server 8000
```

Open http://localhost:8000. Native video controls, figure links, and expandable result tables remain available without JavaScript.

## Page organization

The narrative follows `.cache/DUET-DINO.pptx`: the full 7-DoF planning challenge; cross-view world-model training; zero-shot latent planning; reach; angled reach; visual shifts; hardware; angled grasp-and-lift; and latent-dynamics/patch-correspondence analysis. The page uses a conventional academic layout: a full paper title and authors, a six-rollout teaser, the manuscript abstract, method figures, plain result tables, and task-specific videos. Subtle white and slate section bands, thin rules, and consistent spacing follow the restrained organization of the ProbEx project page. There are no promotional slogans, oversized statistic tiles, branded sticky navigation, or resource cards. A plain success-rate summary table precedes the detailed experiments.

Each experiment includes its protocol, quantitative results, and qualitative evidence. Reach and angled-reach tables include all paper baselines and final errors, not only the three DINOv3 models in the summary table. Hardware and visual-shift tables include position and orientation errors. The lift table distinguishes angled-reach-stage and lift-stage success; their tolerances differ from the standalone angled-reach task.

## Official paper figures

Only uncommented `includegraphics` references reachable through `main.tex` and its `input` files in `.cache/DUET_DINO__RAL.zip` are used. Original files are retained in `static/figures/`, with clickable original-file links below each figure.

| Active TeX source | Original asset | Page use |
| --- | --- | --- |
| `2_introduction.tex` | `figures/DUET-DINO-COVER.png` | Retained official Figure 1 source; replaced in the page hero by the rollout teaser |
| `4_method.tex` | `figures/DUET-DINO.pdf` | Training architecture / Figure 2 |
| `5_experiments.tex` | `figures/LatentPlanning3.pdf` | Latent planning / Figure 3 |
| `5_experiments.tex` | `figures/breakfast_table_reach_tasks.png` | Reach setup / Figure 4 |
| `5_experiments.tex` | `figures/dinov3_vjepa_emb_analysis.pdf` | Latent dynamics / Figure 5 |
| `5_experiments.tex` | `figures/QualitativeResults.pdf` | Patch correspondences / Figure 6 |

PDFs are displayed as SVGs with outlined text and embedded image content. PNGs are displayed as lossless WebP at their original dimensions. `static/figures/manifest.json` records exact source paths and conversions. Unused variants such as `DUET-DINO2.pdf`, `LatentPlanning.pdf`, `LatentPlanning2.pdf`, and `dinov3_vjepa_emb_analysis2.png` are intentionally excluded. The old architecture crop from the compiled manuscript has been replaced by its official source figure.

## Video and result provenance

`static/media/manifest.json` records source archive members/cache paths and processing for every deployed clip.

- The side-camera-only hero teaser combines separate strong DUET-DINO reach, angled-reach, lemon-lift, bottle-lift, artist-workshop, and wooden-lounge rollouts. Four have successful evaluation logs; the two lift clips have null per-episode labels and were selected for visibly retained grasps.
- Coffee-pot comparisons come from slide 18: `media3.mp4` (DUET-DINO), `media2.mp4` (DINOv3 independent dual-view), and `media4.mp4` (V-JEPA 2 side-view).
- Drill comparisons come from slide 19: `media5.mp4` (DUET-DINO), `media6.mp4` (DINOv3 independent dual-view), and `media7.mp4` (V-JEPA 2 wrist-view).
- Ketchup comparisons come from slide 21: `media11.mp4` (DUET-DINO), `media12.mp4` (DINOv3 independent dual-view), and `media13.mp4` (DINOv3 wrist-only).
- Video-to-model mappings were checked against video shape coordinates and adjacent labels in the slide XML. Both camera views are retained and stacked for legibility; source frame rates and edited timing are preserved.
- Hardware continues to use the user-selected `.cache/hw_edited` files: `duetdino-dinal.MP4`, `ind-dino-final.MP4`, and `wrist-final.MP4`. Their full edits, framing, and 30 fps timing are preserved in 1280 × 720 web copies.
- The distractor example comes from the cached DUET-DINO five-object cabin run and has a successful JSON log.

Selected videos illustrate behavior and are not aggregate success estimates. Edited playback does not represent wall-clock planning latency. Tables are transcribed from the active `5_experiments.tex` and cross-checked against the manuscript: I (reach), II (angled reach), III (visual shifts), IV (hardware), and V (lift). Ablations use Section IV-F. The combined-data and DROID-only runs differ in both data and training steps, which the page explicitly notes.

## Editing and release links

- `index.html`: paper header and abstract, complete result tables, figure/video links, and resource placeholders.
- `static/css/index.css`: responsive layout and styles.
- `static/js/index.js`: teaser motion preferences and group video controls.
- The Paper button currently points to the placeholder URL `https://arxiv.org/`; replace it with the paper's final arXiv abstract or PDF URL when available.

The Code and Hugging Face checkpoint buttons intentionally say **TBD**. When URLs are available, replace the two disabled buttons with anchors (remove `disabled`, `placeholder`, and the badges). BibTeX remains marked **Coming soon** until verified publication metadata is available.

When changing results, update the summary and task-specific HTML tables. No external scripts, fonts, analytics, or `.cache` paths are required at runtime. Each comparison has play/pause controls; all videos also have native controls.

## Credits

Adapted from [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) and [Nerfies](https://nerfies.github.io/), with section organization inspired by [ProbEx](https://horwitz.ai/probex) and a video-led presentation inspired by [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/). Website design is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); paper and research assets retain their respective rights.
