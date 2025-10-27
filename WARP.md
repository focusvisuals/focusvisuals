# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

- Open in browser (PowerShell):
  ```pwsh path=null start=null
  Start-Process .\index.html
  ```
- Serve locally (choose one):
  - Python 3 built-in server
    ```pwsh path=null start=null
    python -m http.server 8080 --directory .
    # then open http://localhost:8080
    ```
  - Node (no setup required)
    ```pwsh path=null start=null
    npx serve -l 8080 .
    # then open http://localhost:8080
    ```

Build, lint, and tests: none are configured in this repo.

## Architecture and structure

- Static site with a single HTML entry point: `index.html`.
- Styling: `styles.css` is linked in `<head>`.
- Scripts: `script.js` is loaded at the end of `<body>`; currently logs a readiness message and has no dependencies.
- No bundler, framework, or package manager; assets are referenced directly from the HTML.

## Production (focusvisuals.pro)

- Open production:
  ```pwsh path=null start=null
  Start-Process https://focusvisuals.pro
  ```
- Recommended hosting: Netlify (static site, no build needed). See Deploy on Netlify below.
- Current DNS host: GoDaddy (keep DNS there unless you move to Netlify DNS).

### Deploy on Netlify

1) Put code on GitHub (or any Git provider).
   - If Git isn’t installed, you can create a new repo on GitHub and upload these files via the web UI.
2) Netlify → Add new site → Import from Git
   - Framework preset: None; Build command: none; Publish directory: "."
3) Add custom domain in Netlify: focusvisuals.pro (and www.focusvisuals.pro). Set focusvisuals.pro as Primary domain.
4) In GoDaddy DNS, create/update records:
   - A @ → 75.2.60.5
   - A @ → 99.83.190.102
   - CNAME www → your-site-name.netlify.app
5) Back in Netlify, verify DNS, enable HTTPS (Let’s Encrypt), wait for propagation.

- Verify (optional):
  ```pwsh path=null start=null
  Resolve-DnsName focusvisuals.pro
  ```

## Notes

- The top-level `README.md` is minimal: open `index.html` to view, edit `styles.css`/`script.js` to customize.
- If a toolchain (e.g., npm, formatter, tests) is added later, update this file with the relevant commands.
