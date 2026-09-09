# DUET-DINO project page

Static, dependency-free page for **DUET-DINO: Simultaneous Cross-View World Modeling for Latent Planning in Robot Manipulation**. Serve the repository directly with GitHub Pages; no build step is needed.

## Preview

```sh
cd DUET-DINO # omit if already inside the repository
python3 -m http.server 8000
```

Open http://localhost:8000. Native video controls and links to full-resolution figures remain available without JavaScript.

## Page organization

The page has four sections: (1) the paper header and side-camera teaser, (2) the manuscript abstract, (3) the DUET-DINO cross-view model and zero-shot latent-planning method, and (4) selected task videos followed by the representation-analysis visuals. It uses subtle white and slate bands, thin rules, and the restrained organization of the ProbEx project page.

Tables, detailed experiment protocols, ablations, numbered figure captions, and comparison controls are omitted to keep the paper narrative concise. Paper visuals are followed by short explanatory paragraphs.

## Official paper figures

Only uncommented `includegraphics` references reachable through `main.tex` and its `input` files in `.cache/DUET_DINO__RAL.zip` were imported. Original files remain in `static/figures/`; each displayed figure opens its full-resolution source.

| Active TeX source | Original asset | Page use |
| --- | --- | --- |
| `2_introduction.tex` | `figures/DUET-DINO-COVER.png` | Retained official source; not rendered on the simplified page |
| `4_method.tex` | `figures/DUET-DINO.pdf` | Cross-view modeling method |
| `5_experiments.tex` | `figures/LatentPlanning3.pdf` | Zero-shot latent planning |
| `5_experiments.tex` | `figures/breakfast_table_reach_tasks.png` | Retained official source; not rendered on the simplified page |
| `5_experiments.tex` | `figures/dinov3_vjepa_emb_analysis.pdf` | Representation analysis |
| `5_experiments.tex` | `figures/QualitativeResults.pdf` | Patch correspondences |

PDFs are displayed as SVGs with outlined text and embedded image content. PNGs are displayed as lossless WebP at their original dimensions. `static/figures/manifest.json` records exact source paths and conversions. Unused variants such as `DUET-DINO2.pdf`, `LatentPlanning.pdf`, `LatentPlanning2.pdf`, and `dinov3_vjepa_emb_analysis2.png` are intentionally excluded. The old architecture crop from the compiled manuscript has been replaced by its official source figure.

## Video and result provenance

`static/media/manifest.json` records source archive members/cache paths and processing for every deployed clip.

- The side-camera-only hero teaser combines separate strong DUET-DINO reach, angled-reach, lemon-lift, bottle-lift, artist-workshop, and wooden-lounge rollouts. Four have successful evaluation logs; the two lift clips have null per-episode labels and were selected for visibly retained grasps.
- The Results section uses only the DUET-DINO rollout from each slide comparison: coffee-pot reach (`media3.mp4`, slide 18), angled drill reach (`media5.mp4`, slide 19), and ketchup grasp-and-lift (`media11.mp4`, slide 21).
- Hardware uses the user-selected `.cache/hw_edited/duetdino-dinal.MP4` edit.
- The distractor example comes from the cached DUET-DINO five-object cabin run and has a successful JSON log.
- Baseline comparison media remain in the provenance archive but are not rendered on the simplified page.

Selected videos illustrate behavior and are not aggregate success estimates. Edited playback does not represent wall-clock planning latency.

## Editing and release links

- `index.html`: four-section paper narrative, figure/video links, and resource placeholders.
- `static/css/index.css`: responsive layout and styles.
- `static/js/index.js`: teaser motion preferences and visibility-aware video pausing.
- The Paper button currently points to the placeholder URL `https://arxiv.org/`; replace it with the paper's final arXiv abstract or PDF URL when available.

The Code and Hugging Face checkpoint buttons intentionally say **TBD**. When URLs are available, replace the two disabled buttons with anchors (remove `disabled`, `placeholder`, and the badges). The footer marks BibTeX as **Coming soon** until verified publication metadata is available.

No external scripts, fonts, analytics, or `.cache` paths are required at runtime. All videos use native controls.

## Credits

Adapted from [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) and [Nerfies](https://nerfies.github.io/), with section organization inspired by [ProbEx](https://horwitz.ai/probex) and a video-led presentation inspired by [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/). Website design is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); paper and research assets retain their respective rights.
