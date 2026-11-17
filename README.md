# Richmond Chess Club website

A responsive website for a chess club, built with plain HTML, CSS and vanilla JavaScript. No frameworks and no build step.

**Live demo:** _add your GitHub Pages link here_

<!-- Add a screenshot here: docs/screenshot.png -->

## Features

- **Playable chess puzzle:** a mate-in-one board built from scratch (click a piece, then a square), with hint and reset, and screen-reader labels on every square.
- **Photo gallery with lightbox:** native `<dialog>`, keyboard navigation (arrow keys and Esc), thumbnails for fast loading and full-size images on demand.
- **Booking form:** validation, a guest stepper, date and time inputs, and a confirmation summary. Set `data-endpoint` on the form (for example a Formspree URL) to send real requests. Without one it runs as a demo.
- **Navigation:** header that turns solid on scroll, active-section highlighting (IntersectionObserver) and an accessible mobile menu.
- **Layout:** CSS Grid and Flexbox, a fluid type scale, and no breakpoint-per-device hacks.

## Engineering notes

- **Performance:** images resized and compressed (the images folder went from about 16 MB to about 1 MB). Gallery images are lazy-loaded.
- **Accessibility:** skip link, semantic landmarks, alt text, visible focus states, ARIA live regions and reduced-motion support.
- **Structure:** one JS file per feature (`nav`, `puzzle`, `gallery`, `booking`), each self-contained. Classic scripts, so the site also works when opened straight from disk.

## Run it

Open `index.html` in a browser.

## Deploy

Settings → Pages → Deploy from a branch → `main` / `/ (root)`.

## Structure

```
index.html
styles.css
js/        nav.js, puzzle.js, gallery.js, booking.js
images/    optimized photos; thumbs/ holds gallery thumbnails
```
