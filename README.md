# RC RC Colorado Website

This is a proof-of-concept website for RC RC Colorado, built with Hugo and Tailwind CSS.

## Getting Started

### Prerequisites

1.  **Node.js**: Ensure Node.js (v18+) is installed.
2.  **Hugo**: Install Hugo Extended (for PostCSS support).
    *   Mac: `brew install hugo`
    *   Windows: `choco install hugo-extended`
    *   Linux: `snap install hugo`

### Installation

1.  Clone this repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Site

To start the development server:

```bash
npx hugo server
```

Navigate to `http://localhost:1313/` in your browser.

## Editing Content

### Homepage Text
Edit the file `content/_index.md`. You can change the "About" text, hours, location, and owner details in the front matter (the section between `---` at the top) or the main content body.

### Leaderboard
Edit `data/leaderboard.json` to update the Top 5 scores. The format is:
```json
[
  { "name": "Driver Name", "score": 1500, "vehicle": "Truck Model" },
  ...
]
```

### Slideshow Images
Edit `data/slideshow.json`. Add or replace image URLs. For local images, place them in the `static/images` folder and reference them like `/images/my-photo.jpg`.

### Colors & Styling
Edit `tailwind.config.js` to change the brand colors (e.g., `rc-red`).
Edit `assets/css/main.css` for custom CSS.

## Building for Production

To build the static site for deployment (e.g., to Netlify, Vercel, or GitHub Pages):

```bash
npx hugo --minify
```

The output will be in the `public` directory.
