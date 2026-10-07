/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — COVER PAGE GENERATORS (cover-studio.js)
 * Multi-Theme Cover Page Engines (Royal Classic, Modern Split, Grand Seal, Custom)
 * ============================================================================
 */

import { getLogoSVG, getWatermarkSVG } from './demo-content.js';
import { appState } from './settings.js';

/**
 * Creates and renders the A4 Cover Page based on Selected Theme or Custom Code
 * @param {object} [state=appState] - Application state object
 * @returns {HTMLElement} article element representing the cover page
 */
export function createCoverPage(state = appState) {
  const page = document.createElement('article');
  page.className = `a4-page a4-cover-page cover-theme-${state.coverTheme}`;

  // Theme: Custom HTML Code provided by user
  if (state.coverTheme === 'custom' && state.coverCustomHtml && state.coverCustomHtml.trim()) {
    page.innerHTML = `
      ${getWatermarkSVG()}
      <div class="cover-page-content" style="padding:0; width:100%; height:100%;">
        ${state.coverCustomHtml}
      </div>
    `;
    return page;
  }

  // Built-in Themes (Royal Classic, Modern Minimal Split, Grand Academic Seal)
  const logoHeight = state.coverTheme === 'seal' ? 64 : 50;

  page.innerHTML = `
    <div class="cover-border-frame"></div>
    ${getWatermarkSVG()}

    <div class="cover-page-content">
      <div class="cover-top-badge-row">
        <span class="cover-kicker">MUTU STUDY &bull; ACADEMIC EXCELLENCE SERIES</span>
        <div style="margin: 8px 0;">
          ${getLogoSVG(logoHeight)}
        </div>
        <div class="cover-subject-pill">${state.coverSubject || state.headerCourse}</div>
      </div>

      <div class="cover-title-block">
        <div class="cover-ornament-line"><span>✦</span></div>
        <h1 class="cover-main-en-title">${state.coverTitleEn}</h1>
        <div class="cover-main-bn-title">${state.coverTitleBn}</div>
        <div class="cover-ornament-line"><span>✦</span></div>
      </div>

      <div style="display:flex; flex-direction:column; align-items:center; gap:16px; width:100%;">
        <div class="cover-meta-grid">
          <div class="cover-meta-item">
            <strong>Lecturer &amp; Curriculum Design</strong>
            <span>${state.coverInstructor}</span>
          </div>
          <div class="cover-meta-item">
            <strong>Target Batch &amp; Session</strong>
            <span>${state.coverSession}</span>
          </div>
          <div class="cover-meta-item" style="grid-column: span 2;">
            <strong>Department &amp; Publication Series</strong>
            <span>${state.coverInstitution}</span>
          </div>
        </div>

        <div class="cover-footer-imprint">
          Official Master Study Compendium &bull; All Rights Reserved
        </div>
      </div>
    </div>
  `;

  return page;
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.createCoverPage = createCoverPage;
}
