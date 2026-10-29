# Mila Jovanoska | Portfolio

Academic and professional portfolio built with semantic HTML, CSS and minimal vanilla JavaScript. No framework, build step, backend, analytics or external runtime assets.

Website: https://milajovanoska.github.io/
Repository: https://github.com/MilaJovanoska/milajovanoska.github.io

## Content and maintenance

- `index.html`: approved six-section wording, navigation, original Home/About photographs and one Download CV button.
- `js/data.js`: central ordered data for seven projects, 28 linked skills and contact destinations. Preserve approved order, statuses and verified public URLs. The Leo project is In Progress; the Coral Maker coursework is Submitted Coursework; neither has an invented Learn More link.
- `js/main.js`: renders the cards and provides accessible mobile navigation/active-section behaviour. ROS identification includes the required trademark symbols without changing the existing logo image.
- `css/styles.css`: established white/blush/rose/navy palette, installed Georgia/Arial font pairing and responsive layouts. No font binaries are redistributed.
- `credits.html` and `css/credits.css`: compact image/research/technology acknowledgements, original source records, required licence notices and trademark attribution, linked from the footer.

The approved original Manchester background, graduation portrait, Leo Rover and Coral Maker photographs, and Recipe Manager infographic are preserved unchanged. The owner confirmed ownership or the necessary publication rights on 29 October 2026. That declaration is not a transfer of third-party ownership or a blanket licence for reuse. Retain accurate credits and all upstream licence notices. Original technology artwork sources, revisions and hashes are recorded in `assets/images/skills/sources.json`; the MIT, BSD-3-Clause, CC0 and Apache-2.0 notices are in `assets/licenses/`. These do not override brand/trademark conditions. ROS and the nine-dot logo are trademarks of Open Source Robotics Foundation; no sponsorship or affiliation is implied.

The four reviewed scientific PNGs retain their full-resolution links, source acknowledgements, research coauthors and study limitations. No model fitting or experiments were rerun during portfolio preparation. Future image changes require owner approval; never overwrite or regenerate the scientific data, labels or original photographs as a routine edit.

## Download CV

The owner explicitly approves public distribution of `assets/documents/mila-jovanoska-academic-cv.pdf`. The header Download CV anchor retains its document/download icon, relative path and download attribute. The supplied PDF is unchanged: SHA-256 `e755b8dce6d22ee9e698d76110a0e5d15712bf7049999ac5306c2a4c2f1f3e0b`.

For a future approved update, replace that exact file, review the public information, update the release integrity record, and test the served/downloaded PDF bytes. Do not publish other private documents. Update project/contact/skill values only in `js/data.js`; retain case-sensitive relative paths and approved public destinations. Future skill additions are content changes requiring review, not automatic imports from the CV.

## Preview and deployment

Run `python -m http.server 8000 --bind 127.0.0.1` in a public-file checkout and open http://127.0.0.1:8000/. Stop with Ctrl+C. Do not expose the entire development directory: it contains private QA/reference files excluded from this repository.

GitHub Pages configuration: public `MilaJovanoska/milajovanoska.github.io`, branch `main`, Deploy from a branch → main → /(root). Use an isolated publishing checkout and the reviewed public-file manifest. Exclude internal QA, development mockups/specifications, notebooks/datasets, credentials, temporary files and unrelated private documents.

For approved future updates: preview and test the changes, confirm `git remote -v`, inspect `git status` and `git diff`, stage only explicit approved paths, inspect `git diff --cached`, commit and push to origin/main. Do not force-push or discard unrelated history. Check the Pages build/deployment and verify the actual public HTTPS page, original images, credits, links, mobile navigation and CV download after each push. A successful push alone does not establish a working deployment.
