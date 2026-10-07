# MUTU STUDY A4 Auto-Pagination & Educational Publishing Studio

A production-ready, modular Progressive Web App (PWA) for generating academic lecture notes, bilingual study compendiums, and print-perfect A4 PDFs (`210mm x 297mm`).

---

## 📁 Modular Project Architecture

```text
├── index.html              # Clean semantic HTML5 shell & PWA container
├── manifest.json           # Web App Manifest (PWA installability metadata)
├── sw.js                   # Service Worker (offline caching & background sync)
├── vercel.json             # Zero-config Vercel deployment headers & routing
├── icon.svg                # Master 2X Vector Brand Emblem
│
├── css/
│   ├── variables.css       # Design tokens, Dark Mahogany & Warm White Light themes
│   ├── typography.css      # Extended font library & ligature-safe Bengali typography
│   ├── layout.css          # Physical A4 dimensions, running headers/footers, @media print
│   ├── components.css      # Vocabulary matrix, grammar rules, tables, cards, mnemonics
│   ├── ui.css              # Screen top bar, tabbed settings modal, install prompts
│   └── style.css           # Master CSS manifest importing all 5 modular stylesheets
│
├── js/
│   ├── app.js              # Lifecycle controller, dual-theme switcher, PWA installer
│   ├── paginator.js        # Dynamic DOM height-measuring auto-pagination engine
│   ├── cover-studio.js     # Royal, Minimal, Seal & Custom HTML cover page engines
│   ├── settings.js         # Tabbed modal controller & LocalStorage persistence
│   └── demo-content.js     # Master 2X SVG defs & default academic lecture content
│
└── icons/
    ├── icon.svg            # Scalable vector logo for desktop & browser tabs
    ├── icon-192.png        # PWA 192x192 icon for mobile home screens
    ├── icon-512.png        # PWA 512x512 splash screen & maskable icon
    └── apple-touch-icon.png# iOS Safari 180x180 touch icon
```

---

## 🚀 Zero-Configuration Deployment

### 1. Deploy on Vercel (Instant 5-Second Deploy)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave all build settings at their defaults (Zero build step needed — Vercel detects static HTML/CSS/JS automatically via `vercel.json`).
5. Click **Deploy**. Your PWA is live with HTTPS and offline caching enabled!

### 2. Deploy on GitHub Pages
1. Push to your GitHub repository.
2. Navigate to **Settings > Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your studio will be live at `https://<username>.github.io/<repo-name>/`.

---

## 💎 Key Features

- **Dynamic Auto-Pagination Engine**: Real-time DOM height measurement that distributes arbitrary sections across strict A4 physical sheets without content clipping or manual page-break tagging.
- **Dual Academic Themes**: Seamless switching between *Dark Mahogany* and *Warm White (Ivory Light)* with full color synchronization of the 2X Scaled Master Logo.
- **Ligature-Safe Bengali Typography**: Hardened OpenType rules (`font-feature-settings: "kern" 1, "liga" 1`, `letter-spacing: normal !important`) ensuring pristine conjunct characters (*যুক্তবর্ণ*).
- **Progressive Web App (PWA)**: Installable on Android, Windows, macOS, ChromeOS, and iOS Safari with offline reading support via Cache-First & Stale-While-Revalidate service worker strategies.
- **In-System Settings Studio**: Real-time modal for pasting custom lecture HTML, switching cover page themes (Royal Classic, Modern Split, Grand Seal, or Custom HTML), customizing fonts, and configuring watermarks.
