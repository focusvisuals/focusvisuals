# Focus Visuals Website - Development Guide

## Project Structure

```
website/
├── live-index.html      # "Coming Soon" page for production
├── index.html           # Redirects to home.html
├── home.html           # Main homepage (in development)
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── our-story.html      # About page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript
├── logo.svg            # Logo
├── icon.svg            # Favicon
└── hero-bg.png         # Hero background image
```

## For Live Website (Production)

### Option 1: GitHub + Netlify (Recommended)

1. **Setup Git & GitHub:**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/focusvisuals.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Set publish directory: `.`
   - Click "Deploy"

3. **Show "Coming Soon" page:**
   - Rename `live-index.html` to `index.html` (replace the current one)
   - Push to GitHub - Netlify will auto-deploy

4. **When ready to launch full site:**
   - Replace `index.html` with your full homepage
   - Push to GitHub

### Option 2: Direct Netlify Upload

1. Go to https://app.netlify.com
2. Drag and drop your `website` folder
3. Rename files in Netlify:
   - Rename `live-index.html` to `index.html`

## For Development (Local)

### Method 1: VS Code Live Server (Easiest)

1. Install VS Code: https://code.visualstudio.com
2. Install "Live Server" extension
3. Right-click on `home.html` → "Open with Live Server"
4. Edit files and see changes instantly

### Method 2: Python Simple Server

```bash
# Open terminal in website folder
python -m http.server 8000

# Open browser to: http://localhost:8000/home.html
```

### Method 3: Node.js http-server

```bash
# Install Node.js from https://nodejs.org
# Then run:
npx http-server . -p 8000

# Open browser to: http://localhost:8000/home.html
```

## Workflow

1. **Make changes** locally using any of the development methods above
2. **Test** your changes at http://localhost:8000/home.html
3. **When ready**, push to GitHub (if using Git)
4. **Netlify** will automatically deploy your changes

## Tips

- Always test locally before deploying
- Use browser DevTools (F12) to debug CSS
- Clear cache (Ctrl+Shift+R) when testing
- Keep `live-index.html` for quick "maintenance mode"

## Files to Upload to GitHub

Upload everything EXCEPT:
- `DEV-GUIDE.md` (optional - this file)
- `.git/` folder (automatically created)
- Any personal notes or backup files
