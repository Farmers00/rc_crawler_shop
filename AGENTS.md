# AGENTS.md - Developer & Agent Guide

This document serves as the primary reference for agents (and human developers) working on the **RC RC Colorado** website. It outlines the project structure, build commands, code style, and behavioral expectations for autonomous agents.

## 1. Project Context & Architecture

*   **Type:** Static Site Generator (SSG).
*   **Framework:** [Hugo](https://gohugo.io/) (Extended version required).
*   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) processed via PostCSS.
*   **Language:** HTML (Go Templates), JavaScript (ES6+), CSS.
*   **Content:** Markdown (`.md`) with Front Matter (YAML/TOML) and Data files (`.json`).
*   **Purpose:** Proof-of-concept site for a local RC crawler shop.

## 2. Environment Setup

Agents must ensure the environment is correctly configured before running commands.

### Prerequisites
*   **Node.js:** v18.19.1 (or higher compatible LTS).
*   **NPM:** v9.2.0+.
*   **Hugo:** Extended edition (required for PostCSS/Sass).
    *   *Agent Note:* Use `npx hugo` to ensure the local version is used if global is missing.

### Installation
```bash
# Install Node.js dependencies (Tailwind, PostCSS, etc.)
npm install
```

## 3. Build & Development Commands

Agents should primarily use `npx` to execute project-local binaries.

### Development Server
Starts the local server with live reload.
```bash
npx hugo server
# Default access: http://localhost:1313/
```

### Production Build
Generates the static site in the `public/` directory.
```bash
npx hugo --minify
```

### Linting & Testing
*   **Linting:** Currently, there is no strict linter configured.
    *   *Action:* Ensure HTML structure is valid.
    *   *Action:* Check console for PostCSS/Tailwind warnings during build.
*   **Testing:** No automated unit tests are configured.
    *   *Action:* Agents must verify changes by running `npx hugo` to check for build errors.
    *   *Action:* If modifying JS, ensure no runtime errors occur in the browser console (simulated via thought process).

## 4. Code Style & Guidelines

Strict adherence to these patterns is required to maintain the "easy to maintain" goal.

### 4.1. File Structure & Organization
*   **`content/`**: Markdown files for pages. `_index.md` is the homepage.
    *   *Rule:* Update content here, NOT in HTML layouts, whenever possible.
*   **`layouts/`**: HTML templates using Go Templating.
    *   `_default/baseof.html`: The master shell (head, nav, footer).
    *   `index.html`: The homepage layout.
*   **`assets/css/`**: Source CSS files (Tailwind entry point).
*   **`static/`**: Static assets (images, compiled JS).
    *   `static/js/main.js`: Vanilla JS logic.
*   **`data/`**: JSON files for structured data (e.g., `leaderboard.json`, `slideshow.json`).

### 4.2. Naming Conventions
*   **Files/Directories:** `kebab-case` (e.g., `my-new-page.md`, `main.css`).
*   **Front Matter (YAML/TOML):** `snake_case` (e.g., `map_url`, `monday_saturday`).
*   **JSON Data Keys:** `camelCase` (e.g., `vehicleName`, `highScore`) OR `snake_case` to match Front Matter if consistent.
    *   *Current State:* `leaderboard.json` uses `camelCase` (name, score, vehicle).
*   **CSS Classes:** `kebab-case` (standard Tailwind).
*   **JS Variables:** `camelCase` (e.g., `themeToggle`, `initSlideshow`).

### 4.3. HTML & Go Templates (`layouts/`)
*   **Indentation:** 4 spaces.
*   **Templating:** Use `{{ .Params.variable }}` for front matter data.
*   **Conditionals:**
    ```html
    {{ if .Params.show_feature }}
        <div>...</div>
    {{ end }}
    ```
*   **Loops:**
    ```html
    {{ range .Site.Data.items }}
        <li>{{ .name }}</li>
    {{ end }}
    ```
*   **Tailwind:** Apply utility classes directly to HTML elements.
    *   *Avoid:* Creating new CSS classes in `main.css` unless for `@apply` components (e.g., `.btn`).

### 4.4. JavaScript (`static/js/`)
*   **Syntax:** ES6+ (Arrow functions, `const`/`let`).
*   **Indentation:** 2 spaces.
*   **DOM Manipulation:** Use `document.getElementById` or `querySelector`.
*   **Safety:** Always check if an element exists before adding listeners.
    ```javascript
    const btn = document.getElementById('btn');
    if (btn) {
        btn.addEventListener('click', () => { ... });
    }
    ```

### 4.5. CSS (`assets/css/`)
*   **Framework:** Rely on Tailwind utilities.
*   **Custom CSS:** Place in `main.css` using the `@layer components` directive.
    ```css
    @layer components {
        .custom-card {
            @apply bg-white p-4 rounded shadow;
        }
    }
    ```

## 5. Agent Behavioral Rules

### 5.1. "Plan Mode" & Read-Only Checks
*   **Verification:** Before making changes, ALWAYS run `ls -R` or `read` to confirm file paths.
*   **Context:** Read `package.json` and `hugo.toml` to understand the current configuration before proposing changes.
*   **No Assumptions:** Do not assume a library (like React or jQuery) exists. Use Vanilla JS unless instructed otherwise.

### 5.2. Error Handling
*   **Build Failures:** If `npx hugo` fails, analyze the error log. Common issues:
    *   PostCSS configuration errors (check `postcss.config.js`).
    *   Tailwind version mismatch (ensure compatibility).
    *   Go Template syntax errors (unclosed brackets).
*   **Fix Strategy:**
    1.  Read the error message.
    2.  Locate the file and line number.
    3.  Compare with working examples in the codebase.
    4.  Apply fix and re-run build.

## 6. Specific Feature Implementation Guides

### 6.1. Leaderboard Updates
*   **File:** `data/leaderboard.json`
*   **Format:** Array of objects.
*   **Action:** To add a score, append to the array. Ensure valid JSON syntax.

### 6.2. Slideshow
*   **File:** `data/slideshow.json` for images.
*   **Logic:** `static/js/main.js` handles rotation.
*   **Images:** Place real images in `static/images/` and reference as `/images/filename.jpg`.

### 6.3. Dark Mode
*   **Logic:** `static/js/main.js` checks `localStorage` and system preference.
*   **Styling:** Use `dark:` prefix in Tailwind classes (e.g., `dark:bg-gray-900`).
*   **Config:** `darkMode: 'class'` is set in `tailwind.config.js`.

---
*Generated by OpenCode Agent on 2026-02-19*
