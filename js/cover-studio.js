/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — COVER PAGE GENERATORS (cover-studio.js)
 * Multi-Theme Cover Engines & Live Inline WYSIWYG Editing Architecture
 * ============================================================================
 */

import { getLogoSVG, getWatermarkSVG } from './demo-content.js';
import { appState, savePersistedState } from './settings.js';

/**
 * Creates and renders the A4 Cover Page based on Selected Theme or Custom Code
 * @param {object} [state=appState] - Application state object
 * @returns {HTMLElement} article element representing the cover page
 */
export function createCoverPage(state = appState) {
  const page = document.createElement('article');
  const theme = state.coverTheme || 'royal';
  page.className = `a4-page a4-cover-page cover-theme-${theme}`;

  // Theme: Custom HTML Code provided by user
  if (theme === 'custom' && state.coverCustomHtml && state.coverCustomHtml.trim()) {
    page.innerHTML = `
      ${getWatermarkSVG()}
      <div class="cover-page-content cover-custom-container" style="padding:0; width:100%; height:100%;">
        ${state.coverCustomHtml}
      </div>
    `;
    attachInlineCoverEditing(page);
    return page;
  }

  const kicker = state.coverKicker || 'MUTU STUDY • ACADEMIC EXCELLENCE SERIES';
  const subject = state.coverSubject || state.headerCourse || 'English For Today • Classes XI-XII';
  const titleEn = state.coverTitleEn || 'AI in The Classroom: Pros, Cons and The Role Of EdTech';
  const titleBn = state.coverTitleBn || 'শ্রেণিকক্ষে কৃত্রিম বুদ্ধিমত্তা: সুবিধা, অসুবিধা এবং এডটেক কোম্পানিগুলোর ভূমিকা';
  const subtitle = state.coverSubtitle || 'Comprehensive Higher Secondary Academic & Admission Companion';
  const instructor = state.coverInstructor || 'Olufemi Shonubi / MUTU STUDY Team';
  const session = state.coverSession || 'Classes XI-XII • Academic Session 2026-27';
  const institution = state.coverInstitution || 'Department of English • MUTU STUDY Press';
  const edition = state.coverEdition || 'First Edition 2026 • Board Exam Special';
  const footerImprint = state.coverFooterImprint || 'Official Master Study Compendium • All Rights Reserved';

  const brandKickerHtml = `
    <span class="cover-kicker cover-editable-field" data-cover-field="coverKicker" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${kicker}</span>
  `;

  let innerContentHtml = '';

  // --------------------------------------------------------------------------
  // THEME 1: Royal Classic Heritage (রয়্যাল ক্লাসিক ফ্রেম)
  // --------------------------------------------------------------------------
  if (theme === 'royal') {
    innerContentHtml = `
      <div class="cover-border-frame"></div>
      ${getWatermarkSVG()}
      <div class="cover-page-content">
        <div class="cover-top-badge-row">
          ${brandKickerHtml}
          <div class="cover-logo-wrapper">
            ${getLogoSVG(52)}
          </div>
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subject}</div>
        </div>

        <div class="cover-title-block">
          <div class="cover-ornament-line"><span>✦</span></div>
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subtitle}</div>
          <div class="cover-ornament-line"><span>✦</span></div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:14px; width:100%;">
          <div class="cover-meta-grid">
            <div class="cover-meta-item">
              <strong>Lecturer &amp; Curriculum Design</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Target Batch &amp; Session</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Department &amp; Publication Series</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Publication Edition</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // THEME 2: Modern Editorial Split (মডার্ন এডিটোরিয়াল স্প্লিট)
  // --------------------------------------------------------------------------
  else if (theme === 'minimal') {
    innerContentHtml = `
      <div class="cover-minimal-stripe"></div>
      ${getWatermarkSVG()}
      <div class="cover-page-content">
        <div class="cover-top-badge-row" style="align-items:flex-start; text-align:left;">
          ${brandKickerHtml}
          <div style="margin: 10px 0;">
            ${getLogoSVG(46)}
          </div>
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subject}</div>
        </div>

        <div class="cover-title-block" style="align-items:flex-start; text-align:left;">
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-size:25pt;">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subtitle}</div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:flex-start; gap:14px; width:100%;">
          <div class="cover-meta-grid" style="max-width:100%; border-left:4px solid var(--accent-secondary);">
            <div class="cover-meta-item">
              <strong>Faculty &amp; Author</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Batch &amp; Session</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Academic Unit</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Volume / Edition</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // THEME 3: Grand Academic Seal (গ্র্যান্ড একাডেমিক সিল)
  // --------------------------------------------------------------------------
  else if (theme === 'seal') {
    innerContentHtml = `
      <div class="cover-seal-circle-bg"></div>
      ${getWatermarkSVG()}
      <div class="cover-page-content" style="justify-content:space-around;">
        <div class="cover-top-badge-row">
          ${brandKickerHtml}
          <div class="cover-seal-crest-wrap">
            ${getLogoSVG(68)}
          </div>
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subject}</div>
        </div>

        <div class="cover-title-block">
          <div class="cover-seal-divider"><span>★ ★ ★</span></div>
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subtitle}</div>
          <div class="cover-seal-divider"><span>★ ★ ★</span></div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:14px; width:100%;">
          <div class="cover-meta-grid" style="border-radius:12px; border-left:4.5px solid #D6A13B;">
            <div class="cover-meta-item">
              <strong>Author &amp; Faculty Lead</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Session</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong>University / Publisher</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Special Release</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // THEME 4: Sovereign Luxury Gold & Crimson (সাভারেন লাক্সারি গোল্ড)
  // --------------------------------------------------------------------------
  else if (theme === 'sovereign') {
    innerContentHtml = `
      <div class="cover-sovereign-frame">
        <span class="corner-ornament c-tl">❖</span>
        <span class="corner-ornament c-tr">❖</span>
        <span class="corner-ornament c-bl">❖</span>
        <span class="corner-ornament c-br">❖</span>
      </div>
      ${getWatermarkSVG()}
      <div class="cover-page-content">
        <div class="cover-top-badge-row">
          <div class="cover-sovereign-ribbon">
            ${brandKickerHtml}
          </div>
          <div class="cover-logo-wrapper" style="margin: 10px 0;">
            ${getLogoSVG(56)}
          </div>
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="border-color:#D6A13B;">${subject}</div>
        </div>

        <div class="cover-title-block">
          <div class="cover-gold-rule"></div>
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="color:var(--text-english);">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="color:#D6A13B;">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subtitle}</div>
          <div class="cover-gold-rule"></div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:14px; width:100%;">
          <div class="cover-meta-grid" style="border: 1px solid rgba(214, 161, 59, 0.45); border-left: 5px solid #D6A13B; background:rgba(74, 17, 18, 0.08);">
            <div class="cover-meta-item">
              <strong style="color:#D6A13B;">Lecturer / Course Director</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="color:#D6A13B;">Academic Session</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="color:#D6A13B;">Publishing House</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="color:#D6A13B;">Official Edition</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="color:#D6A13B;">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // THEME 5: Clean Ivory Modernist (আইভরি মিনিমালিস্ট মডার্ন)
  // --------------------------------------------------------------------------
  else if (theme === 'modernist') {
    innerContentHtml = `
      <div class="cover-modernist-grid-frame"></div>
      ${getWatermarkSVG()}
      <div class="cover-page-content" style="align-items:flex-start; text-align:left; padding: 12mm 10mm;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%; border-bottom:2px solid var(--accent-primary); padding-bottom:8px;">
          ${brandKickerHtml}
          ${getLogoSVG(40)}
        </div>

        <div style="margin: 20px 0 10px 0;">
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="border-radius:4px;">${subject}</div>
        </div>

        <div class="cover-title-block" style="align-items:flex-start; text-align:left; max-width:100%; margin-bottom:auto;">
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-size:26pt; line-height:1.18;">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-size:16pt;">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-size:10pt; max-width:90%;">${subtitle}</div>
        </div>

        <div style="width:100%; border-top:1px solid var(--border-color); padding-top:14px;">
          <div class="cover-meta-grid" style="max-width:100%; grid-template-columns: repeat(4, 1fr); border:none; background:transparent; padding:0; box-shadow:none;">
            <div class="cover-meta-item">
              <strong>Instructor</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Session</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Institute</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong>Edition</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="margin-top:12px; text-align:left;">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // THEME 6: Technical Academic Blueprint (টেকনিক্যাল ব্লুপ্রিন্ট)
  // --------------------------------------------------------------------------
  else if (theme === 'blueprint') {
    innerContentHtml = `
      <div class="cover-blueprint-crosshairs">
        <span class="ch-tl">+</span><span class="ch-tr">+</span>
        <span class="ch-bl">+</span><span class="ch-br">+</span>
      </div>
      ${getWatermarkSVG()}
      <div class="cover-page-content">
        <div class="cover-top-badge-row">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; border:1px dashed var(--border-color); padding:6px 12px; border-radius:6px;">
            ${brandKickerHtml}
            <span style="font-family:monospace; font-size:7.5pt; color:var(--accent-secondary); font-weight:700;">DOCUMENT REF: MS-2026-A4</span>
          </div>
          <div class="cover-logo-wrapper" style="margin: 10px 0;">
            ${getLogoSVG(50)}
          </div>
          <div class="cover-subject-pill cover-editable-field" data-cover-field="coverSubject" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-family:monospace; letter-spacing:0.08em;">${subject}</div>
        </div>

        <div class="cover-title-block" style="background:var(--surface-card); border:1px solid var(--border-color); border-top:3px solid var(--accent-primary); border-radius:8px; padding:18px 24px;">
          <h1 class="cover-main-en-title cover-editable-field" data-cover-field="coverTitleEn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleEn}</h1>
          <div class="cover-main-bn-title cover-editable-field" data-cover-field="coverTitleBn" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${titleBn}</div>
          <div class="cover-subtitle cover-editable-field" data-cover-field="coverSubtitle" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${subtitle}</div>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:14px; width:100%;">
          <div class="cover-meta-grid" style="border:1px dashed var(--border-color); background:var(--surface-card-subtle);">
            <div class="cover-meta-item">
              <strong style="font-family:monospace;">[FIELD 01: INSTRUCTOR]</strong>
              <span class="cover-editable-field" data-cover-field="coverInstructor" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${instructor}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="font-family:monospace;">[FIELD 02: TARGET BATCH]</strong>
              <span class="cover-editable-field" data-cover-field="coverSession" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${session}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="font-family:monospace;">[FIELD 03: SERIES IMPRINT]</strong>
              <span class="cover-editable-field" data-cover-field="coverInstitution" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${institution}</span>
            </div>
            <div class="cover-meta-item">
              <strong style="font-family:monospace;">[FIELD 04: EDITION / CODE]</strong>
              <span class="cover-editable-field" data-cover-field="coverEdition" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন">${edition}</span>
            </div>
          </div>

          <div class="cover-footer-imprint cover-editable-field" data-cover-field="coverFooterImprint" contenteditable="true" spellcheck="false" title="ক্লিক করে এডিট করুন" style="font-family:monospace;">
            ${footerImprint}
          </div>
        </div>
      </div>
    `;
  }

  page.innerHTML = innerContentHtml;
  attachInlineCoverEditing(page);
  return page;
}

/**
 * Attaches Live WYSIWYG Inline Editing to Cover Page Elements
 * Synchronizes user typing on the page directly with appState and LocalStorage
 * @param {HTMLElement} coverPageElement
 */
function attachInlineCoverEditing(coverPageElement) {
  const editableNodes = coverPageElement.querySelectorAll('[data-cover-field]');
  editableNodes.forEach((node) => {
    node.addEventListener('input', (e) => {
      const field = e.target.getAttribute('data-cover-field');
      const val = e.target.innerText.trim();
      if (field && field in appState) {
        appState[field] = val;
        savePersistedState();

        // Also sync input field in settings modal if open
        const inputId = 'cfg' + field.charAt(0).toUpperCase() + field.slice(1);
        const inputEl = document.getElementById(inputId);
        if (inputEl && inputEl.value !== val) {
          inputEl.value = val;
        }
      }
    });

    node.addEventListener('keydown', (e) => {
      // Prevent accidental Enter creating new block in titles unless shift key
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        node.blur();
      }
    });
  });
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.createCoverPage = createCoverPage;
}
