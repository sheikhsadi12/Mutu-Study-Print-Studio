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
  const badgeClassRegex = /\b(?:uni-pill|uni-badge|university-badge|concept-tag|formula-badge|struct-badge|struct-category-badge|struct-number-badge|tc-badge|tc-tag|law-badge|chapter-badge|chapter-meta-pill|physics-diagram-badge|vocab-badge|sa-pos-badge|chem-temp|type-badge|box-hack-header)\b/i;

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

/**
 * Master Auto-Pagination Engine
 * Ultra-fast single-pass math rendering, 2-column diagram grid normalization,
 * O(1) offscreen page measurement (handles 5,000–10,000+ lines with zero lag),
 * and deep recursive inside-box splitting across A4 page margins (zero dead bottom voids)
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

    // Render all math formulas in the pool ONCE
    await renderAllMathInElement(tempPool);

    const stage = document.getElementById('document-stage');
    if (!stage) {
      if (tempPool.parentNode) tempPool.parentNode.removeChild(tempPool);
      return;
    }

    // Build all pages into an offscreen DocumentFragment, using a SINGLE measurement page
    // in the DOM so layout calculation is O(1) per block even for 6,000+ line lecture sheets!
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

    // Flatten plain <section> wrappers that have no visual card border/background of their own
    const flowNodes = [];
    Array.from(tempPool.children).forEach((child) => {
      if (child.tagName === 'SECTION' && child.classList.length === 0 && child.children.length > 1) {
        Array.from(child.children).forEach((inner) => flowNodes.push(inner));
      } else {
        flowNodes.push(child);
      }
    });

    // Clean up tempPool before measuring pages
    if (tempPool.parentNode) {
      tempPool.parentNode.removeChild(tempPool);
    }

    if (flowNodes.length > 0) {
      // Dedicated offscreen measurement host for O(1) reflow cost
      const measureHost = document.createElement('div');
      measureHost.style.position = 'absolute';
      measureHost.style.left = '-9999px';
      measureHost.style.top = '0';
      measureHost.style.visibility = 'hidden';
      measureHost.style.pointerEvents = 'none';
      document.body.appendChild(measureHost);

      let currentPage = createNewA4Page(state);
      measureHost.appendChild(currentPage);
      let contentArea = currentPage.querySelector('.page-content-area');
      const maxContentHeight = contentArea.clientHeight + 2;

      const flushCurrentPageToFragment = () => {
        if (currentPage.parentNode) {
          currentPage.parentNode.removeChild(currentPage);
        }
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
        if (lastEl && isHeadingElement(lastEl) && contentArea.children.length > 1) {
          carriedHeading = lastEl;
          contentArea.removeChild(lastEl);
        }
        flushCurrentPageToFragment();
        currentPage = createNewA4Page(state);
        measureHost.appendChild(currentPage);
        contentArea = currentPage.querySelector('.page-content-area');
        if (carriedHeading) {
          contentArea.appendChild(carriedHeading);
        }
      };

      const fitsInCurrentPage = () => contentArea.scrollHeight <= maxContentHeight;

      /**
       * Deep recursive inside-box splitter:
       * Splits cards (.science-card, .grammar-structure-card, .teachers-corner-card, etc.) AND
       * their inner wrapper lists (.tc-list, .tc-grid, .struct-formula-box, .concept-body, etc.)
       * so no large blank space is ever left at the bottom of the previous page.
       */
      const appendNodeWithNaturalSplit = (node) => {
        contentArea.appendChild(node);
        if (fitsInCurrentPage()) {
          return;
        }

        contentArea.removeChild(node);

        // 1. Table row-by-row splitting across page boundaries
        if (node.tagName === 'TABLE' && node.querySelector('tbody')) {
          const thead = node.querySelector('thead');
          const rows = Array.from(node.querySelectorAll('tbody > tr'));
          if (rows.length > 1) {
            let tablePart = node.cloneNode(false);
            if (thead) tablePart.appendChild(thead.cloneNode(true));
            let tbodyPart = document.createElement('tbody');
            tablePart.appendChild(tbodyPart);
            contentArea.appendChild(tablePart);

            let addedToFirstPart = 0;
            for (let r = 0; r < rows.length; r++) {
              const rowClone = rows[r];
              tbodyPart.appendChild(rowClone);
              if (!fitsInCurrentPage()) {
                tbodyPart.removeChild(rowClone);
                if (addedToFirstPart === 0) {
                  contentArea.removeChild(tablePart);
                }
                startNextPage();
                tablePart = node.cloneNode(false);
                if (thead) tablePart.appendChild(thead.cloneNode(true));
                tbodyPart = document.createElement('tbody');
                tablePart.appendChild(tbodyPart);
                contentArea.appendChild(tablePart);
                tbodyPart.appendChild(rowClone);
                addedToFirstPart = 1;
              } else {
                addedToFirstPart++;
              }
            }
            return;
          }
        }

        // 2. Recursive multi-child card & inner-list splitting (supports 2-level nested lists like .tc-list, .tc-grid, .concept-body, etc.)
        const childElements = Array.from(node.children);
        const isUnsplittableGrid =
          node.classList.contains('diagram-side-by-side-grid') ||
          node.classList.contains('science-diagram-grid') ||
          node.classList.contains('chapter-hero-banner');

        if (childElements.length > 1 && !isUnsplittableGrid) {
          let cardPart = node.cloneNode(false);
          contentArea.appendChild(cardPart);
          let nonHeadingAdded = 0;

          for (let c = 0; c < childElements.length; c++) {
            const child = childElements[c];
            cardPart.appendChild(child);

            if (!fitsInCurrentPage()) {
              cardPart.removeChild(child);

              // Check if `child` itself is a multi-item inner container (e.g. .tc-list, .tc-grid, .vocab-matrix-grid, .syn-ant-grid, .chem-grid, or multi-block div)
              const grandChildren = Array.from(child.children);
              const isChildUnsplittable =
                child.classList.contains('diagram-side-by-side-grid') ||
                child.classList.contains('science-diagram-grid') ||
                child.classList.contains('katex-display') ||
                child.classList.contains('katex') ||
                child.tagName === 'SVG';

              if (grandChildren.length > 1 && !isChildUnsplittable) {
                let innerPart = child.cloneNode(false);
                cardPart.appendChild(innerPart);
                let innerAdded = 0;

                for (let g = 0; g < grandChildren.length; g++) {
                  const gc = grandChildren[g];
                  innerPart.appendChild(gc);
                  if (!fitsInCurrentPage()) {
                    innerPart.removeChild(gc);
                    if (innerAdded === 0 && nonHeadingAdded === 0) {
                      cardPart.removeChild(innerPart);
                      contentArea.removeChild(cardPart);
                      startNextPage();
                      cardPart = node.cloneNode(false);
                      contentArea.appendChild(cardPart);
                      // Re-append any headings that were in the original node before `c`
                      for (let prevIdx = 0; prevIdx < c; prevIdx++) {
                        cardPart.appendChild(childElements[prevIdx].cloneNode(true));
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
                      innerPart = child.cloneNode(false);
                      cardPart.appendChild(innerPart);
                    }
                    innerPart.appendChild(gc);
                    innerAdded = 1;
                    nonHeadingAdded = 1;
                  } else {
                    innerAdded++;
                    nonHeadingAdded++;
                  }
                }
                continue;
              }

              // If only a heading fit inside cardPart so far and `child` couldn't split, move the whole card to next page
              if (nonHeadingAdded === 0) {
                contentArea.removeChild(cardPart);
                startNextPage();
                cardPart = node.cloneNode(false);
                contentArea.appendChild(cardPart);
                for (let prevIdx = 0; prevIdx < c; prevIdx++) {
                  cardPart.appendChild(childElements[prevIdx]);
                }
                cardPart.appendChild(child);
                nonHeadingAdded = isHeadingElement(child) ? 0 : 1;
              } else {
                startNextPage();
                cardPart = node.cloneNode(false);
                contentArea.appendChild(cardPart);
                cardPart.appendChild(child);
                nonHeadingAdded = isHeadingElement(child) ? 0 : 1;
              }
            } else {
              if (!isHeadingElement(child)) {
                nonHeadingAdded++;
              }
            }
          }
          return;
        }

        // 3. Atomic block: move to next page (carrying any preceding orphan heading with it)
        if (contentArea.children.length > 0) {
          startNextPage();
        }
        contentArea.appendChild(node);
      };

      for (let i = 0; i < flowNodes.length; i++) {
        appendNodeWithNaturalSplit(flowNodes[i]);
      }

      // Flush final page
      if (contentArea.children.length > 0) {
        flushCurrentPageToFragment();
      } else if (currentPage.parentNode) {
        currentPage.parentNode.removeChild(currentPage);
      }

      if (measureHost.parentNode) {
        measureHost.parentNode.removeChild(measureHost);
      }
    }

    // Watermark configuration
    if (!state.watermarkEnabled) {
      stage.classList.add('watermark-disabled');
    } else {
      stage.classList.remove('watermark-disabled');
    }
    document.documentElement.style.setProperty('--watermark-opacity', state.watermarkOpacity);

    // 3. Dynamic Page Numbers Calculation (PAGE XX / YY) in DocumentFragment before mounting
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
  window.sanitizeAndFormatTemplateHtml = sanitizeAndFormatTemplateHtml;
  window.normalizeDiagramGrids = normalizeDiagramGrids;
}
