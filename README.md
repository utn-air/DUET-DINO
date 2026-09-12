# [DUET-DINO Project Page](https://utn-air.github.io/DUET-DINO/)

## Credits
Adapted from [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) and [Nerfies](https://nerfies.github.io/) with sections inspired by [ProbEx](https://horwitz.ai/probex) and [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/). 

## License
Website design is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
`ReachBagelTask` follows the orange-carton group using episode 0 from the same three model archives. VJEPA 2-AC* and DUET-DINO are logged successful (✅); Side-view VJEPA 2 is unlabeled (❗). Each video has its own light-blue object-name label. The spatial-reach manifest lists both task groups.

`ReachCoffeeCanTask` follows Bagel with episode 0 from the same model archives: ❗ for both unlabeled baseline outcomes and ✅ for logged DUET-DINO success. Coffee Can videos keep their full duration, native global-camera resolution, and bottom-left DUET-DINO wrist inset.

Angled Reach contains episode-0 comparisons for Ketchup, Drill, and Carton (`AngledReachCartoon2Task`). Ketchup compares V-JEPA 2-AC*, side-view V-JEPA 2, wrist-view V-JEPA 2, and DUET-DINO. Drill compares wrist-view DINOv3, independent DINOv3, and DUET-DINO. Carton compares side-view DINOv3, side-view V-JEPA 2, and DUET-DINO. Wrist-only models display only the wrist camera; independent DINOv3 and DUET-DINO display the global camera with a bottom-left wrist inset. Symbols follow episode-0 logs, and exact sources are recorded in `static/media/results-angled-reach-manifest.json`.

Below the result carousels, `LatentChanges.svg` and `QualitativeResults.svg` appear stacked in the white-background Embeddings Analysis section. They were converted directly from their PDFs in `.cache/DUET_DINO__RAL.zip`; conversion provenance is in `static/figures/results-plots-manifest.json`.
