# Immunology — Lesson 1.1 practice activities

A self-contained static website for GitHub Pages featuring three **ungraded** practice activities, drafted closely from Cana's Lesson 1.1 assessment ideas:

1. **Complete the hematopoietic lineage** — fourteen dropdown destinations, following the progenitor branches illustrated on the lecture slide. Dendritic cells are included under both lineages.
2. **Sort myeloid and lymphoid cells** — a simple two-lineage classification with a **Both** option for dendritic cells, as the instructor explicitly noted.
3. **Identify growth factors, surface receptors, and transcription factors** — uses an adapted crop from lecture slide 8.

## Publish on GitHub Pages
1. Create a new GitHub repository (for example, `immunology-practice`).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder into the repository root. Preserve the folder structure.
3. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Open your published GitHub Pages URL. Test the page within Coursera's embedding mechanism before sharing it with learners; iframe behavior depends on the particular Coursera tool and its configuration.

## Accessibility
- Proper heading structure, activity links, and a skip link.
- All questions have labeled native `<select>` controls, accessible by keyboard and touch; dragging is **not required**.
- Text feedback in `role=status` live regions, plus per-item feedback (not color alone).
- Strong visible focus indicators, sufficient contrast, responsive design, and reduced-motion support.
- No tracking, storage, login, libraries, or external dependencies.

## Design / content notes
- The actual Slidesgo PPT **template** was not available: the `~$Immunology - Bachelor of Science in Biological Sciences by Slidesgo.pptx` upload is only a 165-byte Microsoft PowerPoint lock file. This package therefore uses the pale-blue theme of Cana's original lecture slides, rather than claiming an exact Slidesgo template match. Replace the CSS variables in `styles.css` if the full template becomes available.
- `assets/lineage-reference.png` is a direct slide 7 rendering; `assets/progenitor-cell.png` is a crop from slide 8. Before public release, confirm all images in the lecture deck are licensed for redistribution on an open GitHub Pages site. A teaching deck's inclusion of an image does not guarantee that it may be republished publicly.
- The lineage tree is simplified into named destinations instead of attempting to erase and remake the complex rasterized illustration. This avoids unreadable small text and supports keyboard accessibility. We can revise the visual layout after instructor review.
- This is an **ungraded practice site** and does not submit scores to Coursera.
