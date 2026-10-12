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
 * Guarantees zero raw LaTeX and accurate physical A4 box heights
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

  // 2. MathJax 3 Asynchronous Engine (typesets any remaining or MathJax-specific tags)
  if (typeof window !== 'undefined' && window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
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

  // Cascade: Primary English font matches Latin ASCII first; Bengali glyphs fall back to Hind Siliguri
  root.style.setProperty('--font-english', `${primaryEnBody}, ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--font-display', `${primaryEnHead}, ${primaryBn}, 'Kalpurush', serif`);
  root.style.setProperty('--font-bengali', `${primaryEnBody}, ${primaryBn}, 'Kalpurush', sans-serif`);
  root.style.setProperty('--global-font-scale', state.fontScale);
}

let isPaginating = false;
let pendingPagination = false;

// Auto-recovery listener when MathJax or KaTeX finishes async loading
if (typeof window !== 'undefined') {
  window.addEventListener('mathjax-ready', () => {
    console.log('[MUTU Paginator] MathJax ready event received. Re-paginating with rendered math...');
    runAutoPagination(appState);
  });
}

/**
 * Master Auto-Pagination Engine
 * Asynchronously renders math formulas and distributes child blocks across strict A4 sheets
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

    // CRITICAL: Render all math formulas before measuring element heights
    await renderAllMathInElement(tempPool);

    const stage = document.getElementById('document-stage');
    if (!stage) {
      if (tempPool.parentNode) tempPool.parentNode.removeChild(tempPool);
      return;
    }
    stage.innerHTML = '';

    // Watermark configuration
    if (!state.watermarkEnabled) {
      stage.classList.add('watermark-disabled');
    } else {
      stage.classList.remove('watermark-disabled');
    }
    document.documentElement.style.setProperty('--watermark-opacity', state.watermarkOpacity);

    // 1. Inject Cover Page if Enabled
    if (state.coverEnabled) {
      const coverPage = createCoverPage(state);
      stage.appendChild(coverPage);
    }

    // 2. Paginate Content Nodes
    // Since tempPool has already been typeset, its children have real DOM heights and vector equations
    const items = Array.from(tempPool.children);
    if (items.length > 0) {
      let currentPage = createNewA4Page(state);
      stage.appendChild(currentPage);
      let contentArea = currentPage.querySelector('.page-content-area');

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const clone = item.cloneNode(true);
        contentArea.appendChild(clone);

        // Height detection against exact physical printable container
        if (contentArea.scrollHeight > contentArea.clientHeight + 2) {
          contentArea.removeChild(clone);

          currentPage = createNewA4Page(state);
          stage.appendChild(currentPage);
          contentArea = currentPage.querySelector('.page-content-area');
          contentArea.appendChild(clone);
        }
      }
    }

    // Clean up temporary DOM measurement pool
    if (tempPool.parentNode) {
      tempPool.parentNode.removeChild(tempPool);
    }

    // 3. Typeset any remaining formulas on stage
    await renderAllMathInElement(stage);

    // 4. Dynamic Page Numbers Calculation (PAGE XX / YY)
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
  } finally {
    isPaginating = false;
    if (pendingPagination) {
      pendingPagination = false;
      setTimeout(() => runAutoPagination(state), 40);
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
