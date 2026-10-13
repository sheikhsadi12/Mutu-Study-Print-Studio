/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — AUTO-PAGINATION ENGINE (paginator.js)
 * Dynamic DOM height-measuring auto-pagination engine & dynamic page calculator
 * ============================================================================
 */

import { DEFAULT_DEMO_CONTENT, getLogoSVG, getWatermarkSVG } from './demo-content.js';
import { createCoverPage } from './cover-studio.js';
import { appState } from './settings.js';

/**
 * Creates standard A4 content page structure
 * @param {object} [state=appState] - Application state object
 * @returns {HTMLElement} article element representing the A4 page
 */
export function createNewA4Page(state = appState) {
  const page = document.createElement('article');
  page.className = 'a4-page tex2jax_process';

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
        <span>MUTU STUDY &bull; ${state.currentSubjectTitle || state.currentSubjectLabel || 'উচ্চমাধ্যমিক বিজ্ঞান ও মানবিক'}</span>
        <span class="footer-tagline-badge">${state.footerTagline}</span>
      </div>
      <div class="footer-page-num">PAGE -- / --</div>
    </footer>
  `;

  return page;
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
  root.style.setProperty('--font-cover-meta-value', `'${coverMetaValName}', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-cover-imprint', `'${coverImprintName}', 'Cinzel', 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);

  // Cascade: Primary English font matches Latin ASCII first; Bengali glyphs fall back to Hind Siliguri
  root.style.setProperty('--font-english', `${primaryEnBody}, 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-display', `${primaryEnHead}, 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-bengali', `${primaryEnBody}, 'HindSiliguriBengali', ${primaryBn}, 'Kalpurush', sans-serif`);
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
 * Master Auto-Pagination Engine
 * Ultra-fast single-pass math rendering & atomic DOM document fragment replacement
 * @param {object} [state=appState] - Application state object
 */
export async function runAutoPagination(state = appState) {
  if (isPaginating) {
    pendingPagination = true;
    return;
  }
  isPaginating = true;

  try {
    applyTypography(state);

    // Validate or fall back to demo content
    let rawHtml = (state.rawContentHtml && state.rawContentHtml.trim()) ? state.rawContentHtml.trim() : DEFAULT_DEMO_CONTENT;
    state.rawContentHtml = rawHtml;

    // Create temporary offscreen container with exact A4 printable content width (182mm)
    const tempPool = document.createElement('div');
    tempPool.id = 'mutu-temp-math-pool';
    tempPool.className = 'a4-page page-content-area tex2jax_process';
    tempPool.style.position = 'absolute';
    tempPool.style.left = '-9999px';
    tempPool.style.top = '0';
    tempPool.style.width = '182mm';
    tempPool.style.visibility = 'hidden';
    tempPool.style.pointerEvents = 'none';
    tempPool.innerHTML = rawHtml;
    document.body.appendChild(tempPool);

    // Render all math formulas in the pool ONCE
    await renderAllMathInElement(tempPool);

    const stage = document.getElementById('document-stage');
    if (!stage) {
      if (tempPool.parentNode) tempPool.parentNode.removeChild(tempPool);
      return;
    }

    stage.innerHTML = '';

    // 1. Inject Cover Page if Enabled (wrapped for natural 2D zoom & safe layout)
    let pageSequence = 0;
    if (state.coverEnabled) {
      const coverPage = createCoverPage(state);
      const wrapper = document.createElement('div');
      wrapper.className = 'a4-page-wrapper';
      wrapper.dataset.pageIndex = String(pageSequence++);
      wrapper.appendChild(coverPage);
      stage.appendChild(wrapper);
    }

    // 2. Paginate Content Nodes into strict A4 sheets
    const items = Array.from(tempPool.children);
    if (items.length > 0) {
      let currentPage = createNewA4Page(state);
      let currentWrapper = document.createElement('div');
      currentWrapper.className = 'a4-page-wrapper';
      currentWrapper.dataset.pageIndex = String(pageSequence++);
      currentWrapper.appendChild(currentPage);
      stage.appendChild(currentWrapper);
      let contentArea = currentPage.querySelector('.page-content-area');

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const clone = item.cloneNode(true);
        contentArea.appendChild(clone);

        // Height detection against exact physical printable container
        if (contentArea.scrollHeight > contentArea.clientHeight + 2) {
          contentArea.removeChild(clone);

          currentPage = createNewA4Page(state);
          currentWrapper = document.createElement('div');
          currentWrapper.className = 'a4-page-wrapper';
          currentWrapper.dataset.pageIndex = String(pageSequence++);
          currentWrapper.appendChild(currentPage);
          stage.appendChild(currentWrapper);
          contentArea = currentPage.querySelector('.page-content-area');
          contentArea.appendChild(clone);
        }
      }
    }

    // Clean up temporary DOM measurement pool
    if (tempPool.parentNode) {
      tempPool.parentNode.removeChild(tempPool);
    }

    // Watermark configuration
    if (!state.watermarkEnabled) {
      stage.classList.add('watermark-disabled');
    } else {
      stage.classList.remove('watermark-disabled');
    }
    document.documentElement.style.setProperty('--watermark-opacity', state.watermarkOpacity);

    // 3. Dynamic Page Numbers Calculation (PAGE XX / YY)
    const contentPages = stage.querySelectorAll('.a4-page:not(.a4-cover-page)');
    const totalContentPages = contentPages.length;
    contentPages.forEach((page, index) => {
      const pageNumEl = page.querySelector('.footer-page-num');
      if (pageNumEl) {
        const currentP = String(index + 1).padStart(2, '0');
        const totalP = String(totalContentPages).padStart(2, '0');
        pageNumEl.innerText = `PAGE ${currentP} / ${totalP}`;
      }
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mutu-pages-rendered'));
    }
  } finally {
    isPaginating = false;
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
}
