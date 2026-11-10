/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — AUTO-PAGINATION ENGINE (paginator.js)
 * Dynamic DOM height-measuring auto-pagination engine & dynamic page calculator
 * ============================================================================
 */

import { DEFAULT_DEMO_CONTENT, getLogoSVG, getWatermarkSVG } from './demo-content.js';
import { createCoverPage } from './cover-studio.js';
import { appState } from './settings.js';

let cachedPageTemplate = null;
let cachedPageSignature = '';

/**
 * Creates standard A4 content page structure using ultra-fast template cloning
 * @param {object} [state=appState] - Application state object
 * @returns {HTMLElement} article element representing the A4 page
 */
export function createNewA4Page(state = appState) {
  const subLabel = state.currentSubjectTitle || state.currentSubjectLabel || 'উচ্চমাধ্যমিক বিজ্ঞান ও মানবিক';
  const sig = `${state.headerCourse}||${state.headerUnit}||${subLabel}||${state.footerTagline}`;

  if (!cachedPageTemplate || cachedPageSignature !== sig) {
    const page = document.createElement('article');
    page.className = 'a4-page tex2jax_process';
    page.dataset.mathRendered = 'true';

    page.innerHTML = `
      ${getWatermarkSVG()}

      <header class="page-header">
        <div class="header-branding">
          ${getLogoSVG(36)}
        </div>

        <div class="header-meta">
          <strong>${state.headerCourse}</strong><br>
          <span>${state.headerUnit}</span>
        </div>
      </header>

      <div class="page-content-area tex2jax_process"></div>

      <footer class="page-footer">
        <div class="footer-left-meta">
          <span>MUTU STUDY &bull; ${subLabel}</span>
          <span class="footer-tagline-badge">${state.footerTagline}</span>
        </div>
        <div class="footer-page-num">PAGE -- / --</div>
      </footer>
    `;
    cachedPageTemplate = page;
    cachedPageSignature = sig;
  }

  return cachedPageTemplate.cloneNode(true);
}

/**
 * High-performance Dual Engine Math Typesetter (KaTeX + MathJax 3)
 * Ultra-fast synchronous rendering with zero CPU thrashing
 * @param {HTMLElement} container - DOM element containing LaTeX expressions
 */
export async function renderAllMathInElement(container) {
  if (!container) return;

  // 1. Instant KaTeX Synchronous Rendering (handles $...$, $$...$$, \\[...\\], \\(...\\))
  if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false,
        trust: true
      });
    } catch (err) {
      console.warn('[MUTU Math] KaTeX render notice:', err);
    }
  }

  // 2. MathJax 3: Only invoke if raw unparsed math formulas exist outside KaTeX
  const hasUnrendered = container.innerHTML.includes('$$') && !container.querySelector('.katex');
  if (hasUnrendered && typeof window !== 'undefined' && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
    try {
      await window.MathJax.typesetPromise([container]);
    } catch (err) {
      console.warn('[MUTU Math] MathJax typesetPromise notice:', err);
    }
  }
}

/**
 * Applies Dynamic Typography Styles via CSS Custom Properties
 * Ensures English text ALWAYS renders in selected English font, and Bengali ALWAYS renders in Hind Siliguri!
 * @param {object} [state=appState] - Application state object
 */
export function applyTypography(state = appState) {
  const root = document.documentElement;

  // Extract pure primary English font names (stripping any trailing generic fallbacks)
  const rawEnBody = state.fontEnglishBody || "'Outfit'";
  const rawEnHead = state.fontEnglishHeading || "'Playfair Display'";
  const rawBn = state.fontBengali || "'Hind Siliguri'";

  const enBodyName = rawEnBody.split(',')[0].trim().replace(/['"]/g, '');
  const enHeadName = rawEnHead.split(',')[0].trim().replace(/['"]/g, '');
  const bnName = rawBn.split(',')[0].trim().replace(/['"]/g, '');

  const primaryEnBody = `'${enBodyName}'`;
  const primaryEnHead = `'${enHeadName}'`;
  const primaryBn = `'${bnName}'`;

  // Set individual and composite font design tokens
  root.style.setProperty('--font-english-primary', primaryEnBody);
  root.style.setProperty('--font-heading-primary', primaryEnHead);
  root.style.setProperty('--font-bengali-primary', primaryBn);

  // Individual Cover Specific Font Stacks (English in selected font, Bengali in Hind Siliguri)
  const rawCoverTitleEn = state.fontCoverTitleEn || state.fontCoverTitle || state.fontEnglishHeading || "'Playfair Display'";
  const rawCoverTitleBn = state.fontCoverTitleBn || state.fontBengali || "'Hind Siliguri'";
  const rawCoverSub = state.fontCoverSubtitle || state.fontEnglishBody || "'Outfit'";
  const rawCoverKicker = state.fontCoverKicker || "'Cinzel Decorative'";
  const rawCoverSubject = state.fontCoverSubject || state.fontCoverSubtitle || "'Outfit'";
  const rawCoverMetaLabel = state.fontCoverMetaLabel || "'Cinzel'";
  const rawCoverMetaVal = state.fontCoverMetaValue || state.fontCoverSubtitle || "'Outfit'";
  const rawCoverImprint = state.fontCoverImprint || "'Cinzel'";

  const cleanFontName = (str) => (str || '').split(',')[0].trim().replace(/['"]/g, '');

  const coverTitleEnName = cleanFontName(rawCoverTitleEn);
  const coverTitleBnName = cleanFontName(rawCoverTitleBn);
  const coverSubName = cleanFontName(rawCoverSub);
  const coverKickerName = cleanFontName(rawCoverKicker);
  const coverSubjectName = cleanFontName(rawCoverSubject);
  const coverMetaLabelName = cleanFontName(rawCoverMetaLabel);
  const coverMetaValName = cleanFontName(rawCoverMetaVal);
  const coverImprintName = cleanFontName(rawCoverImprint);

  root.style.setProperty('--font-cover-title', `'${coverTitleEnName}', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-cover-title-en', `'${coverTitleEnName}', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-cover-title-bn', `'${coverTitleBnName}', 'HindSiliguriBengali', 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-cover-subtitle', `'${coverSubName}', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-cover-kicker', `'${coverKickerName}', 'Cinzel', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-cover-subject', `'${coverSubjectName}', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-cover-meta-label', `'${coverMetaLabelName}', 'Cinzel', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-cover-meta-value', `'${coverMetaValName}', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`);
  root.style.setProperty('--font-cover-imprint', `'${coverImprintName}', 'Cinzel', 'Hind Siliguri', 'Noto Sans Bengali', serif`);

  // Running Header & Running Footer Dynamic Fonts
  const rawHdrCourseFont = state.headerCourseFont || state.fontEnglishBody || "'Outfit'";
  const rawHdrUnitFont = state.headerUnitFont || state.fontEnglishBody || "'Outfit'";
  const rawFooterFont = state.footerTaglineFont || state.fontEnglishBody || "'Outfit'";
  const hdrCourseFontName = cleanFontName(rawHdrCourseFont);
  const hdrUnitFontName = cleanFontName(rawHdrUnitFont);
  const footerFontName = cleanFontName(rawFooterFont);
  root.style.setProperty('--font-header-course', `'${hdrCourseFontName}', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`);
  root.style.setProperty('--font-header-unit', `'${hdrUnitFontName}', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`);
  root.style.setProperty('--font-footer-tag', `'${footerFontName}', 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`);

  // Cascade: Primary English font matches Latin ASCII; Bengali glyphs fall back to Hind Siliguri without fragmentation
  root.style.setProperty('--font-english', `${primaryEnBody}, 'Hind Siliguri', 'Noto Sans Bengali', sans-serif`);
  root.style.setProperty('--font-display', `${primaryEnHead}, 'Hind Siliguri', 'Noto Sans Bengali', serif`);
  root.style.setProperty('--font-bengali', `'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif`);
  root.style.setProperty('--global-font-scale', state.fontScale);
}

let isPaginating = false;
let pendingPagination = false;
let paginationDebounceTimer = null;

// Auto-recovery listener when MathJax finishes async loading
if (typeof window !== 'undefined') {
  window.addEventListener('mathjax-ready', () => {
    runAutoPagination(appState);
  });
}

/**
 * Sanitizes raw template HTML to escape nested brackets, remove stray `}]` or raw `\hfill [Target: ...]` tokens,
 * and convert standalone university / admission tags into Dark Mahogany `.uni-pill` badges without double-nesting.
 * @param {string} html
 * @returns {string}
 */
export function sanitizeAndFormatTemplateHtml(html) {
  if (!html || typeof html !== 'string') return '';
  let out = html;

  // 1. Clean up \hfill [Target: ...] or \hfill \text{[...]} inside or outside math blocks
  out = out.replace(/\\hfill\s*\\text\{\s*\[((?:[^\[\]{}]|\{[^{}]*\})+)\]\s*\}/g, '<span class="uni-pill">[$1]</span>');
  out = out.replace(/\\hfill\s*\[((?:[^\[\]{}]|\{[^{}]*\})+)\]/g, '<span class="uni-pill">[$1]</span>');
  out = out.replace(/\\hfill/g, ' ');

  // 2. Fix malformed nested bracket-brace pairs like \text{[...}] or stray `}]` outside math
  out = out.replace(/\\text\{\s*\[([^\[\]{}]+)\}\]/g, '\\text{[$1]}');
  out = out.replace(/([^\\$])\}\]/g, '$1]');

  // 3. Convert standalone university / target / type tags outside math ($...$, $$...$$) and outside existing badge/pill tags
  const parts = out.split(/(\$\$[\s\S]*?\$\$|\$[^$]+?\$|<[^>]+>)/g);
  const uniPattern = /\[((?:[^\[\]{}]|\{[^{}]*\})*(?:BUET|KUET|RUET|CUET|IUT|CKRUET|SUST|BUTEX|DU|JU|CU|RU|GST|MAT|DAT|AFMC|MIST|BUP|Target|Written|MCQ|Type|Hack|Board|বোর্ড)(?:[^\[\]{}]|\{[^{}]*\})*)\]/gi;
  const badgeClassRegex = /\b(?:uni-pill|uni-badge|univ-tag|university-badge|concept-tag|formula-badge|struct-badge|struct-category-badge|struct-number-badge|tc-badge|tc-tag|law-badge|chapter-badge|chapter-meta-pill|physics-diagram-badge|vocab-badge|sa-pos-badge|chem-temp|type-badge|box-hack-header)\b/i;

  let insideBadgeDepth = 0;

  for (let i = 0; i < parts.length; i++) {
    const seg = parts[i];
    if (!seg) continue;

    if (seg.startsWith('<')) {
      if (/^<\s*\/span\b/i.test(seg) || /^<\s*\/div\b/i.test(seg)) {
        if (insideBadgeDepth > 0) insideBadgeDepth--;
      } else if (badgeClassRegex.test(seg) && !/\/>\s*$/.test(seg)) {
        insideBadgeDepth++;
      }
      continue;
    }

    if (seg.startsWith('$') || insideBadgeDepth > 0) continue;

    parts[i] = seg.replace(uniPattern, (match, inner) => {
      const cleanInner = inner.replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\}\]/g, ']').trim();
      return `<span class="uni-pill">[${cleanInner}]</span>`;
    });
  }

  return parts.join('');
}

/**
 * Normalizes diagram sections into compact 2-column side-by-side grids
 * (left column: mathematical theory/conditions/formulas; right column: compact 250px-260px diagram)
 * @param {HTMLElement} rootContainer
 */
export function normalizeDiagramGrids(rootContainer) {
  if (!rootContainer) return;

  // Constrain all diagram containers & inner aspect-ratio wrappers to 255px
  const allDiagrams = rootContainer.querySelectorAll('.diagram-svg-container, .diagram-container, .physics-diagram-svg-wrap');
  allDiagrams.forEach((diag) => {
    diag.style.maxWidth = '255px';
    diag.style.width = '100%';
    const aspectBox = diag.querySelector('div[style*="aspect-ratio"]');
    if (aspectBox) {
      aspectBox.style.maxWidth = '250px';
      aspectBox.style.width = '100%';
    }
  });

  // Refactor sections that contain both theory/formulas and a diagram into .diagram-side-by-side-grid
  const sections = Array.from(rootContainer.querySelectorAll('section, .science-card, .physics-diagram-card'));
  sections.forEach((sec) => {
    if (sec.querySelector('.diagram-side-by-side-grid, .science-diagram-grid')) return;

    // Case A: .physics-diagram-card with .physics-diagram-svg-wrap and .physics-formula-legend-grid
    if (sec.classList.contains('physics-diagram-card')) {
      const svgWrap = sec.querySelector('.physics-diagram-svg-wrap');
      const legendGrid = sec.querySelector('.physics-formula-legend-grid');
      const caption = sec.querySelector('.physics-diagram-caption');
      if (svgWrap && legendGrid) {
        const grid = document.createElement('div');
        grid.className = 'diagram-side-by-side-grid';
        const leftCol = document.createElement('div');
        leftCol.className = 'diagram-theory-col';
        legendGrid.style.gridTemplateColumns = '1fr';
        leftCol.appendChild(legendGrid);
        const rightCol = document.createElement('div');
        rightCol.className = 'diagram-figure-col';
        rightCol.appendChild(svgWrap);
        if (caption) rightCol.appendChild(caption);
        grid.appendChild(leftCol);
        grid.appendChild(rightCol);
        sec.appendChild(grid);
        return;
      }
    }

    // Case B: section containing both a theory/concept/formula block and a .diagram-svg-container
    const diagContainer = sec.querySelector(':scope > .diagram-svg-container, :scope > .diagram-container');
    if (diagContainer) {
      const children = Array.from(sec.children);
      const theoryNodes = children.filter(
        (el) => el !== diagContainer && !el.classList.contains('module-heading')
      );
      if (theoryNodes.length > 0) {
        const grid = document.createElement('div');
        grid.className = 'diagram-side-by-side-grid';
        const leftCol = document.createElement('div');
        leftCol.className = 'diagram-theory-col';
        theoryNodes.forEach((node) => leftCol.appendChild(node));
        const rightCol = document.createElement('div');
        rightCol.className = 'diagram-figure-col';
        rightCol.appendChild(diagContainer);
        grid.appendChild(leftCol);
        grid.appendChild(rightCol);
        sec.appendChild(grid);
      } else if (sec.previousElementSibling) {
        // Case C: Standalone diagram section immediately following a math-formula-box or science-concept-card
        const prev = sec.previousElementSibling;
        if (
          prev &&
          (prev.classList.contains('math-formula-box') ||
            prev.classList.contains('science-concept-card') ||
            prev.querySelector('.math-formula-box, .science-concept-card'))
        ) {
          const grid = document.createElement('div');
          grid.className = 'diagram-side-by-side-grid';
          const leftCol = document.createElement('div');
          leftCol.className = 'diagram-theory-col';
          Array.from(prev.children).forEach((ch) => {
            if (!ch.classList.contains('module-heading')) {
              leftCol.appendChild(ch);
            }
          });
          if (prev.classList.contains('math-formula-box') || prev.classList.contains('science-concept-card')) {
            const clonedPrev = prev.cloneNode(true);
            leftCol.innerHTML = '';
            leftCol.appendChild(clonedPrev);
            prev.remove();
          }
          const rightCol = document.createElement('div');
          rightCol.className = 'diagram-figure-col';
          rightCol.appendChild(diagContainer);
          grid.appendChild(leftCol);
          grid.appendChild(rightCol);
          sec.appendChild(grid);
        }
      }
    }
  });
}

/**
 * Helper to check if an element is a section/card heading that should not be orphaned at page bottom
 * @param {Element} el
 * @returns {boolean}
 */
function isHeadingElement(el) {
  if (!el || el.nodeType !== 1) return false;
  const tag = el.tagName.toUpperCase();
  if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4') return true;
  return (
    el.classList.contains('module-heading') ||
    el.classList.contains('struct-header') ||
    el.classList.contains('tc-header') ||
    el.classList.contains('law-header') ||
    el.classList.contains('concept-title')
  );
}

let viewportMathObserver = null;
let idleMathQueue = [];
let idleMathHandle = null;

/**
 * Renders KaTeX / MathJax on a single A4 page or section if not yet rendered
 * @param {HTMLElement} pageEl
 */
export async function renderPageMathIfNeeded(pageEl) {
  if (!pageEl || pageEl.dataset.mathPending !== 'true') return;
  pageEl.dataset.mathPending = 'false';
  pageEl.dataset.mathRendered = 'true';
  await renderAllMathInElement(pageEl);
}

/**
 * Synchronously flushes KaTeX / MathJax on all remaining unrendered pages (used before PDF export / print)
 */
export function renderAllPendingPagesMath() {
  if (idleMathHandle) {
    if (typeof window !== 'undefined' && window.cancelIdleCallback) {
      window.cancelIdleCallback(idleMathHandle);
    } else {
      clearTimeout(idleMathHandle);
    }
    idleMathHandle = null;
  }
  idleMathQueue = [];

  const pendingPages = document.querySelectorAll('.a4-page[data-math-pending="true"]');
  pendingPages.forEach((page) => {
    page.dataset.mathPending = 'false';
    page.dataset.mathRendered = 'true';
    if (viewportMathObserver) {
      viewportMathObserver.unobserve(page);
    }
    if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(page, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false,
          trust: true
        });
      } catch (err) {
        console.warn('[MUTU Math] Print flush notice:', err);
      }
    }
  });
}

/**
 * Schedules non-blocking idle background math rendering for offscreen pages
 */
function scheduleNextIdleMathRender() {
  if (idleMathQueue.length === 0) {
    idleMathHandle = null;
    return;
  }

  const runSlice = (deadline) => {
    while (
      idleMathQueue.length > 0 &&
      (!deadline || deadline.timeRemaining() > 6 || deadline.didTimeout)
    ) {
      const nextPage = idleMathQueue.shift();
      if (nextPage && nextPage.isConnected && nextPage.dataset.mathPending === 'true') {
        if (viewportMathObserver) {
          viewportMathObserver.unobserve(nextPage);
        }
        renderPageMathIfNeeded(nextPage);
        break; // Render at most 1 page per idle slice to keep 60fps responsiveness
      }
    }
    if (idleMathQueue.length > 0) {
      scheduleNextIdleMathRender();
    } else {
      idleMathHandle = null;
    }
  };

  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    idleMathHandle = window.requestIdleCallback(runSlice, { timeout: 1200 });
  } else {
    idleMathHandle = setTimeout(() => runSlice(null), 60);
  }
}

/**
 * Sets up IntersectionObserver so KaTeX/MathJax only triggers for pages/sections entering the viewport
 * @param {NodeListOf<Element>|Element[]} pages
 */
function observePagesForViewportMath(pages) {
  if (typeof window === 'undefined') return;

  if (viewportMathObserver) {
    viewportMathObserver.disconnect();
  }
  if (idleMathHandle) {
    if (window.cancelIdleCallback) {
      window.cancelIdleCallback(idleMathHandle);
    } else {
      clearTimeout(idleMathHandle);
    }
    idleMathHandle = null;
  }
  idleMathQueue = [];

  const viewportRoot = document.getElementById('document-viewport') || null;

  if ('IntersectionObserver' in window) {
    viewportMathObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageEl = entry.target;
            viewportMathObserver.unobserve(pageEl);
            renderPageMathIfNeeded(pageEl);
          }
        });
      },
      {
        root: viewportRoot,
        rootMargin: '900px 0px 900px 0px',
        threshold: 0.01
      }
    );
  }

  const pageArray = Array.from(pages);
  // Immediately render the first 2 visible pages so initial paint has zero flicker
  const immediateCount = Math.min(2, pageArray.length);
  for (let i = 0; i < immediateCount; i++) {
    renderPageMathIfNeeded(pageArray[i]);
  }

  // Observe remaining pages via IntersectionObserver and queue for low-priority idle rendering
  for (let i = immediateCount; i < pageArray.length; i++) {
    const page = pageArray[i];
    if (viewportMathObserver) {
      viewportMathObserver.observe(page);
    }
    idleMathQueue.push(page);
  }

  if (idleMathQueue.length > 0) {
    scheduleNextIdleMathRender();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeprint', () => {
    renderAllPendingPagesMath();
  });
}

/**
 * Estimates extra vertical height that unrendered LaTeX display math ($$...$$) will occupy once KaTeX renders
 * @param {Element} el
 * @returns {number}
 */
function estimateUnrenderedMathDelta(el) {
  if (!el || !el.textContent) return 0;
  const txt = el.textContent;
  if (!txt.includes('$') && !txt.includes('\\[')) return 0;

  let extra = 0;
  const displayMatches = txt.match(/\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]/g);
  if (displayMatches) {
    for (let i = 0; i < displayMatches.length; i++) {
      const m = displayMatches[i];
      extra += 14;
      if (m.includes('\\frac') || m.includes('\\dfrac') || m.includes('\\int') || m.includes('\\sum')) {
        extra += 12;
      }
      if (m.includes('\\begin{aligned}') || m.includes('\\\\')) {
        const lines = m.split('\\\\').length;
        extra += (lines - 1) * 16;
      }
    }
  }
  return extra;
}

/**
 * Master Auto-Pagination Engine
 * Ultra-fast single-pass batch height measurement, 2-column diagram grid normalization,
 * zero-reflow arithmetic page packing (handles 5,000–10,000+ lines with zero UI freeze),
 * and IntersectionObserver lazy KaTeX/MathJax rendering for sections/pages in the viewport.
 * @param {object} [state=appState] - Application state object
 */
export async function runAutoPagination(state = appState) {
  if (isPaginating) {
    pendingPagination = true;
    return;
  }
  isPaginating = true;
  if (typeof window !== 'undefined') {
    window.__mutuPaginating = true;
  }

  try {
    applyTypography(state);

    // Validate or fall back to demo content
    let rawHtml = (state.rawContentHtml && state.rawContentHtml.trim()) ? state.rawContentHtml.trim() : DEFAULT_DEMO_CONTENT;
    state.rawContentHtml = rawHtml;

    const cleanedHtml = sanitizeAndFormatTemplateHtml(rawHtml);

    // Create temporary offscreen container with exact A4 printable content width (182mm)
    const tempPool = document.createElement('div');
    tempPool.id = 'mutu-temp-math-pool';
    tempPool.className = 'a4-page page-content-area tex2jax_process';
    tempPool.dataset.mathRendered = 'true';
    tempPool.style.position = 'absolute';
    tempPool.style.left = '-9999px';
    tempPool.style.top = '0';
    tempPool.style.width = '182mm';
    tempPool.style.height = 'auto';
    tempPool.style.minHeight = '0';
    tempPool.style.maxHeight = 'none';
    tempPool.style.visibility = 'hidden';
    tempPool.style.pointerEvents = 'none';
    tempPool.style.contain = 'layout style';
    tempPool.innerHTML = cleanedHtml;
    document.body.appendChild(tempPool);

    // Normalize oversized diagrams into compact 2-column side-by-side grids
    normalizeDiagramGrids(tempPool);

    const stage = document.getElementById('document-stage');
    if (!stage) {
      if (tempPool.parentNode) tempPool.parentNode.removeChild(tempPool);
      return;
    }

    // Flatten plain <section> wrappers that have no visual card border/background of their own
    const flowNodes = [];
    Array.from(tempPool.children).forEach((child) => {
      if (child.tagName === 'SECTION' && child.classList.length === 0 && child.children.length > 1) {
        Array.from(child.children).forEach((inner) => flowNodes.push(inner));
      } else {
        flowNodes.push(child);
      }
    });

    // SINGLE-PASS BATCH LAYOUT MEASUREMENT (1 layout read pass total, zero layout thrashing!)
    const heightMap = new WeakMap();
    const measureEl = (el, isLeaf = false) => {
      if (!el || el.nodeType !== 1) return 24;
      const h = el.offsetHeight || 22;
      const mathDelta = isLeaf ? estimateUnrenderedMathDelta(el) : 0;
      const total = h + mathDelta + 5;
      heightMap.set(el, total);
      return total;
    };

    for (let i = 0; i < flowNodes.length; i++) {
      const node = flowNodes[i];
      const children = node.children;
      const hasChildren = children && children.length > 1;
      measureEl(node, !hasChildren);

      if (node.tagName === 'TABLE' && node.querySelector('tbody')) {
        const thead = node.querySelector('thead');
        if (thead) measureEl(thead, true);
        const rows = node.querySelectorAll('tbody > tr');
        for (let r = 0; r < rows.length; r++) {
          measureEl(rows[r], true);
        }
      } else if (hasChildren) {
        for (let c = 0; c < children.length; c++) {
          const child = children[c];
          const grandChildren = child.children;
          const hasGrand = grandChildren && grandChildren.length > 1;
          measureEl(child, !hasGrand);
          if (hasGrand) {
            for (let g = 0; g < grandChildren.length; g++) {
              measureEl(grandChildren[g], true);
            }
          }
        }
      }
    }

    const getH = (el) => heightMap.get(el) || 26;

    // Clean up tempPool immediately after the single batch read pass
    if (tempPool.parentNode) {
      tempPool.parentNode.removeChild(tempPool);
    }

    const stageFragment = document.createDocumentFragment();
    let pageSequence = 0;

    if (state.coverEnabled) {
      const coverPage = createCoverPage(state);
      coverPage.dataset.mathRendered = 'true';
      const wrapper = document.createElement('div');
      wrapper.className = 'a4-page-wrapper';
      wrapper.dataset.pageIndex = String(pageSequence++);
      wrapper.dataset.mathRendered = 'true';
      wrapper.appendChild(coverPage);
      stageFragment.appendChild(wrapper);
    }

    if (flowNodes.length > 0) {
      // Exact printable content height inside A4 page (1123px page - 64px top/bottom pad - 66px header/footer - 16px gaps)
      const maxContentHeight = 964;
      const cardShellOverhead = 16;

      let currentPage = createNewA4Page(state);
      currentPage.dataset.mathPending = 'true';
      let contentArea = currentPage.querySelector('.page-content-area');
      let usedHeight = 0;

      const flushCurrentPageToFragment = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'a4-page-wrapper';
        wrapper.dataset.pageIndex = String(pageSequence++);
        wrapper.dataset.mathRendered = 'true';
        wrapper.appendChild(currentPage);
        stageFragment.appendChild(wrapper);
      };

      const startNextPage = () => {
        const lastEl = contentArea.lastElementChild;
        let carriedHeading = null;
        let carriedHeight = 0;
        if (lastEl && isHeadingElement(lastEl) && contentArea.children.length > 1) {
          carriedHeading = lastEl;
          carriedHeight = getH(lastEl);
          contentArea.removeChild(lastEl);
        }
        flushCurrentPageToFragment();
        currentPage = createNewA4Page(state);
        currentPage.dataset.mathPending = 'true';
        contentArea = currentPage.querySelector('.page-content-area');
        usedHeight = 0;
        if (carriedHeading) {
          contentArea.appendChild(carriedHeading);
          usedHeight += carriedHeight;
        }
      };

      const fitsHeight = (additionalPx) => (usedHeight + additionalPx) <= maxContentHeight;

      /**
       * Zero-reflow arithmetic inside-box splitter:
       * Packs and splits cards, tables, and inner lists purely in memory using pre-measured heights!
       */
      const appendNodeWithNaturalSplit = (node) => {
        const nodeH = getH(node);
        if (fitsHeight(nodeH)) {
          contentArea.appendChild(node);
          usedHeight += nodeH;
          return;
        }

        // 1. Table row-by-row splitting across page boundaries
        if (node.tagName === 'TABLE' && node.querySelector('tbody')) {
          const thead = node.querySelector('thead');
          const theadH = thead ? getH(thead) : 28;
          const rows = Array.from(node.querySelectorAll('tbody > tr'));
          if (rows.length > 1) {
            if (!fitsHeight(theadH + getH(rows[0]) + 10) && contentArea.children.length > 0) {
              startNextPage();
            }
            let tablePart = node.cloneNode(false);
            if (thead) tablePart.appendChild(thead.cloneNode(true));
            let tbodyPart = document.createElement('tbody');
            tablePart.appendChild(tbodyPart);
            contentArea.appendChild(tablePart);
            usedHeight += theadH + 8;

            for (let r = 0; r < rows.length; r++) {
              const row = rows[r];
              const rowH = getH(row);
              if (!fitsHeight(rowH) && tbodyPart.children.length > 0) {
                startNextPage();
                tablePart = node.cloneNode(false);
                if (thead) tablePart.appendChild(thead.cloneNode(true));
                tbodyPart = document.createElement('tbody');
                tablePart.appendChild(tbodyPart);
                contentArea.appendChild(tablePart);
                usedHeight += theadH + 8;
              }
              tbodyPart.appendChild(row);
              usedHeight += rowH;
            }
            return;
          }
        }

        // 2. Recursive multi-child card & inner-list splitting
        const childElements = Array.from(node.children);
        const isUnsplittableGrid =
          node.classList.contains('diagram-side-by-side-grid') ||
          node.classList.contains('science-diagram-grid') ||
          node.classList.contains('solve-split') ||
          node.classList.contains('chapter-hero-banner');

        if (childElements.length > 1 && !isUnsplittableGrid) {
          let cardPart = node.cloneNode(false);
          contentArea.appendChild(cardPart);
          usedHeight += cardShellOverhead;
          let nonHeadingAdded = 0;

          for (let c = 0; c < childElements.length; c++) {
            const child = childElements[c];
            const childH = getH(child);

            if (fitsHeight(childH)) {
              cardPart.appendChild(child);
              usedHeight += childH;
              if (!isHeadingElement(child)) {
                nonHeadingAdded++;
              }
              continue;
            }

            // Check if `child` itself is a multi-item inner container (.tc-list, .tc-grid, .concept-body, etc.)
            const grandChildren = Array.from(child.children);
            const isChildUnsplittable =
              child.classList.contains('diagram-side-by-side-grid') ||
              child.classList.contains('science-diagram-grid') ||
              child.classList.contains('solve-split') ||
              child.classList.contains('katex-display') ||
              child.classList.contains('katex') ||
              child.tagName === 'SVG';

            if (grandChildren.length > 1 && !isChildUnsplittable) {
              let innerPart = child.cloneNode(false);
              cardPart.appendChild(innerPart);
              let innerAdded = 0;

              for (let g = 0; g < grandChildren.length; g++) {
                const gc = grandChildren[g];
                const gcH = getH(gc);

                if (!fitsHeight(gcH)) {
                  if (innerAdded === 0 && nonHeadingAdded === 0) {
                    cardPart.removeChild(innerPart);
                    contentArea.removeChild(cardPart);
                    startNextPage();
                    cardPart = node.cloneNode(false);
                    contentArea.appendChild(cardPart);
                    usedHeight += cardShellOverhead;
                    for (let prevIdx = 0; prevIdx < c; prevIdx++) {
                      const prevClone = childElements[prevIdx].cloneNode(true);
                      cardPart.appendChild(prevClone);
                      usedHeight += getH(childElements[prevIdx]);
                    }
                    innerPart = child.cloneNode(false);
                    cardPart.appendChild(innerPart);
                  } else {
                    if (innerAdded === 0) {
                      cardPart.removeChild(innerPart);
                    }
                    startNextPage();
                    cardPart = node.cloneNode(false);
                    contentArea.appendChild(cardPart);
                    usedHeight += cardShellOverhead;
                    innerPart = child.cloneNode(false);
                    cardPart.appendChild(innerPart);
                  }
                }

                innerPart.appendChild(gc);
                usedHeight += gcH;
                innerAdded++;
                nonHeadingAdded++;
              }
              continue;
            }

            // If only a heading fit inside cardPart so far and `child` couldn't split, move the card to next page
            if (nonHeadingAdded === 0) {
              contentArea.removeChild(cardPart);
              if (contentArea.children.length > 0) {
                startNextPage();
              } else {
                usedHeight = 0;
              }
              cardPart = node.cloneNode(false);
              contentArea.appendChild(cardPart);
              usedHeight += cardShellOverhead;
              for (let prevIdx = 0; prevIdx < c; prevIdx++) {
                cardPart.appendChild(childElements[prevIdx]);
                usedHeight += getH(childElements[prevIdx]);
              }
              cardPart.appendChild(child);
              usedHeight += childH;
              nonHeadingAdded = isHeadingElement(child) ? 0 : 1;
            } else {
              startNextPage();
              cardPart = node.cloneNode(false);
              contentArea.appendChild(cardPart);
              usedHeight += cardShellOverhead;
              cardPart.appendChild(child);
              usedHeight += childH;
              nonHeadingAdded = isHeadingElement(child) ? 0 : 1;
            }
          }
          return;
        }

        // 3. Atomic block: move to next page (carrying any preceding orphan heading with it)
        if (contentArea.children.length > 0) {
          startNextPage();
        }
        contentArea.appendChild(node);
        usedHeight += nodeH;
      };

      for (let i = 0; i < flowNodes.length; i++) {
        appendNodeWithNaturalSplit(flowNodes[i]);
      }

      // Flush final page
      if (contentArea.children.length > 0) {
        flushCurrentPageToFragment();
      }
    }

    // Watermark configuration
    if (!state.watermarkEnabled) {
      stage.classList.add('watermark-disabled');
    } else {
      stage.classList.remove('watermark-disabled');
    }
    document.documentElement.style.setProperty('--watermark-opacity', state.watermarkOpacity);

    // Dynamic Page Numbers Calculation (PAGE XX / YY) in DocumentFragment before mounting
    const contentPages = stageFragment.querySelectorAll('.a4-page:not(.a4-cover-page)');
    const totalContentPages = contentPages.length;
    contentPages.forEach((page, index) => {
      const pageNumEl = page.querySelector('.footer-page-num');
      if (pageNumEl) {
        const currentP = String(index + 1).padStart(2, '0');
        const totalP = String(totalContentPages).padStart(2, '0');
        pageNumEl.textContent = `PAGE ${currentP} / ${totalP}`;
      }
    });

    // Single atomic DOM replacement — zero layout thrashing!
    stage.replaceChildren(stageFragment);

    // Trigger IntersectionObserver viewport-based KaTeX/MathJax rendering for mounted pages
    const mountedContentPages = stage.querySelectorAll('.a4-page:not(.a4-cover-page)');
    observePagesForViewportMath(mountedContentPages);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mutu-pages-rendered'));
    }
  } finally {
    isPaginating = false;
    if (typeof window !== 'undefined') {
      window.__mutuPaginating = false;
    }
    if (pendingPagination) {
      pendingPagination = false;
      requestAnimationFrame(() => runAutoPagination(state));
    }
  }
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.createNewA4Page = createNewA4Page;
  window.applyTypography = applyTypography;
  window.runAutoPagination = runAutoPagination;
  window.renderAllMathInElement = renderAllMathInElement;
  window.renderAllPendingPagesMath = renderAllPendingPagesMath;
  window.sanitizeAndFormatTemplateHtml = sanitizeAndFormatTemplateHtml;
  window.normalizeDiagramGrids = normalizeDiagramGrids;
}

