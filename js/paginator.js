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
  page.className = 'a4-page';

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

    <div class="page-content-area"></div>

    <footer class="page-footer">
      <div class="footer-left-meta">
        <span>MUTU STUDY &bull; উচ্চমাধ্যমিক ইংরেজি প্রথম পত্র</span>
        <span class="footer-tagline-badge">${state.footerTagline}</span>
      </div>
      <div class="footer-page-num">PAGE -- / --</div>
    </footer>
  `;

  return page;
}

/**
 * Applies Dynamic Typography Styles via CSS Custom Properties
 * @param {object} [state=appState] - Application state object
 */
export function applyTypography(state = appState) {
  const root = document.documentElement;
  root.style.setProperty('--font-english', state.fontEnglishBody);
  root.style.setProperty('--font-display', state.fontEnglishHeading);
  root.style.setProperty('--font-bengali', state.fontBengali);
  root.style.setProperty('--global-font-scale', state.fontScale);
}

/**
 * Master Auto-Pagination Engine
 * Measures child block heights and distributes them across strict A4 physical sheets
 * @param {object} [state=appState] - Application state object
 */
export function runAutoPagination(state = appState) {
  applyTypography(state);

  // Validate or fall back to demo content
  let rawHtml = (state.rawContentHtml && state.rawContentHtml.trim()) ? state.rawContentHtml.trim() : DEFAULT_DEMO_CONTENT;
  state.rawContentHtml = rawHtml;

  // Create temporary offscreen container for parsing nodes
  const tempPool = document.createElement('div');
  tempPool.innerHTML = rawHtml;

  const stage = document.getElementById('document-stage');
  if (!stage) return;
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
  const items = Array.from(tempPool.children);
  if (items.length === 0) return;

  let currentPage = createNewA4Page(state);
  stage.appendChild(currentPage);
  let contentArea = currentPage.querySelector('.page-content-area');

  items.forEach((item) => {
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
  });

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
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.createNewA4Page = createNewA4Page;
  window.applyTypography = applyTypography;
  window.runAutoPagination = runAutoPagination;
}
