/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — SETTINGS CONTROLLER & PERSISTENCE (settings.js)
 * Master state container, modal tab routing, and localStorage sync.
 * ============================================================================
 */

import { DEFAULT_DEMO_CONTENT } from './demo-content.js';

// Master Application State
export const appState = {
  theme: 'light',
  watermarkEnabled: true,
  watermarkOpacity: 0.08,
  
  // Dynamic Header & Footer Metadata
  headerCourse: "English For Today • Classes XI-XII",
  headerUnit: "Unit 1: Education and Life • Lesson 2",
  footerTagline: "Academic Publishing Series",

  // Cover Page Configuration
  coverEnabled: true,
  coverTheme: 'royal', // 'royal' | 'minimal' | 'seal' | 'custom'
  coverCustomHtml: '',
  coverSubject: "English For Today • Classes XI-XII",
  coverTitleEn: "AI in The Classroom: Pros, Cons and The Role Of EdTech",
  coverTitleBn: "শ্রেণিকক্ষে কৃত্রিম বুদ্ধিমত্তা: সুবিধা, অসুবিধা এবং এডটেক কোম্পানিগুলোর ভূমিকা",
  coverInstructor: "Olufemi Shonubi / MUTU STUDY Team",
  coverSession: "Classes XI-XII • Academic Session 2026-27",
  coverInstitution: "Department of English • MUTU STUDY Press",

  // Dynamic Typography Configuration
  fontEnglishBody: "'Outfit', sans-serif",
  fontEnglishHeading: "'Playfair Display', Georgia, serif",
  fontBengali: "'Hind Siliguri', 'Kalpurush', sans-serif",
  fontScale: 1.0,

  // In-System Raw Content HTML
  rawContentHtml: ''
};

/**
 * Loads persisted configuration from LocalStorage
 */
export function loadPersistedState() {
  const saved = localStorage.getItem('mutu_studio_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(appState, parsed);
    } catch (e) {
      console.warn('[MUTU STUDIO] Failed to parse saved state:', e);
    }
  }

  if (!appState.rawContentHtml || !appState.rawContentHtml.trim()) {
    appState.rawContentHtml = DEFAULT_DEMO_CONTENT;
  }
}

/**
 * Switches Active Tab inside the Settings Studio Modal
 * @param {string} tabId - 'content' | 'cover' | 'typography' | 'general'
 */
export function switchSettingsTab(tabId) {
  const navButtons = document.querySelectorAll('.tab-nav-btn');
  const panes = document.querySelectorAll('.tab-pane');

  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  panes.forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabId}`);
  });
}

/**
 * Opens Settings Modal and Populates All Fields with Current State
 */
export function openSettingsModal() {
  const modal = document.getElementById('settingsModal');
  if (!modal) return;

  // Tab 1: General & Metadata
  const courseInput = document.getElementById('cfgHeaderCourse');
  if (courseInput) courseInput.value = appState.headerCourse;

  const unitInput = document.getElementById('cfgHeaderUnit');
  if (unitInput) unitInput.value = appState.headerUnit;

  const footerInput = document.getElementById('cfgFooterTag');
  if (footerInput) footerInput.value = appState.footerTagline;

  const wmToggle = document.getElementById('cfgWatermarkToggle');
  if (wmToggle) wmToggle.checked = appState.watermarkEnabled;

  const wmOpacity = document.getElementById('cfgWatermarkOpacity');
  const opacityVal = document.getElementById('cfgOpacityVal');
  if (wmOpacity) wmOpacity.value = Math.round(appState.watermarkOpacity * 100);
  if (opacityVal) opacityVal.innerText = Math.round(appState.watermarkOpacity * 100) + '%';

  // Tab 2: Content
  const contentInput = document.getElementById('cfgRawContentInput');
  if (contentInput) contentInput.value = appState.rawContentHtml;

  // Tab 3: Cover Page
  const coverToggle = document.getElementById('cfgCoverToggle');
  if (coverToggle) coverToggle.checked = appState.coverEnabled;

  const coverTheme = document.getElementById('cfgCoverTheme');
  if (coverTheme) coverTheme.value = appState.coverTheme;

  const coverTitleEn = document.getElementById('cfgCoverTitleEn');
  if (coverTitleEn) coverTitleEn.value = appState.coverTitleEn;

  const coverTitleBn = document.getElementById('cfgCoverTitleBn');
  if (coverTitleBn) coverTitleBn.value = appState.coverTitleBn;

  const coverInstructor = document.getElementById('cfgCoverInstructor');
  if (coverInstructor) coverInstructor.value = appState.coverInstructor;

  const coverSession = document.getElementById('cfgCoverSession');
  if (coverSession) coverSession.value = appState.coverSession;

  const coverCustomHtml = document.getElementById('cfgCoverCustomHtml');
  if (coverCustomHtml) coverCustomHtml.value = appState.coverCustomHtml;

  toggleCustomCoverBox();

  // Tab 4: Typography
  const fontEnBody = document.getElementById('cfgFontEnBody');
  if (fontEnBody) fontEnBody.value = appState.fontEnglishBody;

  const fontEnHead = document.getElementById('cfgFontEnHead');
  if (fontEnHead) fontEnHead.value = appState.fontEnglishHeading;

  const fontBn = document.getElementById('cfgFontBn');
  if (fontBn) fontBn.value = appState.fontBengali;

  const fontScale = document.getElementById('cfgFontScale');
  const scaleVal = document.getElementById('cfgScaleVal');
  if (fontScale) fontScale.value = Math.round(appState.fontScale * 100);
  if (scaleVal) scaleVal.innerText = Math.round(appState.fontScale * 100) + '%';

  modal.classList.add('open');
}

/**
 * Closes Settings Studio Modal
 */
export function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('open');
}

/**
 * Toggles visibility of Custom Cover HTML Code box
 */
export function toggleCustomCoverBox() {
  const themeEl = document.getElementById('cfgCoverTheme');
  const customBox = document.getElementById('customCoverCodeRow');
  if (themeEl && customBox) {
    customBox.style.display = (themeEl.value === 'custom') ? 'flex' : 'none';
  }
}

/**
 * Saves All Settings, Persists to LocalStorage and Triggers Auto-Pagination
 */
export function saveAllSettings() {
  // General & Metadata
  const courseInput = document.getElementById('cfgHeaderCourse');
  if (courseInput) {
    appState.headerCourse = courseInput.value;
    appState.coverSubject = courseInput.value;
  }

  const unitInput = document.getElementById('cfgHeaderUnit');
  if (unitInput) appState.headerUnit = unitInput.value;

  const footerInput = document.getElementById('cfgFooterTag');
  if (footerInput) appState.footerTagline = footerInput.value;

  const wmToggle = document.getElementById('cfgWatermarkToggle');
  if (wmToggle) appState.watermarkEnabled = wmToggle.checked;

  const wmOpacity = document.getElementById('cfgWatermarkOpacity');
  if (wmOpacity) appState.watermarkOpacity = Number(wmOpacity.value) / 100;

  // Content
  const contentInput = document.getElementById('cfgRawContentInput');
  if (contentInput) appState.rawContentHtml = contentInput.value;

  // Cover Page
  const coverToggle = document.getElementById('cfgCoverToggle');
  if (coverToggle) appState.coverEnabled = coverToggle.checked;

  const coverTheme = document.getElementById('cfgCoverTheme');
  if (coverTheme) appState.coverTheme = coverTheme.value;

  const coverTitleEn = document.getElementById('cfgCoverTitleEn');
  if (coverTitleEn) appState.coverTitleEn = coverTitleEn.value;

  const coverTitleBn = document.getElementById('cfgCoverTitleBn');
  if (coverTitleBn) appState.coverTitleBn = coverTitleBn.value;

  const coverInstructor = document.getElementById('cfgCoverInstructor');
  if (coverInstructor) appState.coverInstructor = coverInstructor.value;

  const coverSession = document.getElementById('cfgCoverSession');
  if (coverSession) appState.coverSession = coverSession.value;

  const coverCustomHtml = document.getElementById('cfgCoverCustomHtml');
  if (coverCustomHtml) appState.coverCustomHtml = coverCustomHtml.value;

  // Typography
  const fontEnBody = document.getElementById('cfgFontEnBody');
  if (fontEnBody) appState.fontEnglishBody = fontEnBody.value;

  const fontEnHead = document.getElementById('cfgFontEnHead');
  if (fontEnHead) appState.fontEnglishHeading = fontEnHead.value;

  const fontBn = document.getElementById('cfgFontBn');
  if (fontBn) appState.fontBengali = fontBn.value;

  const fontScale = document.getElementById('cfgFontScale');
  if (fontScale) appState.fontScale = Number(fontScale.value) / 100;

  // Persist State to LocalStorage
  localStorage.setItem('mutu_studio_state', JSON.stringify(appState));

  closeSettingsModal();

  // Re-run Pagination if engine is bound
  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }
}

/**
 * Resets Content Input to Default Lecture Content Pool
 */
export function resetDemoContent() {
  const input = document.getElementById('cfgRawContentInput');
  if (input) {
    input.value = DEFAULT_DEMO_CONTENT;
    appState.rawContentHtml = DEFAULT_DEMO_CONTENT;
    if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
      window.showToast("ডেমো কন্টেন্ট সফলভাবে রিস্টোর করা হয়েছে।");
    }
  }
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.loadPersistedState = loadPersistedState;
  window.switchSettingsTab = switchSettingsTab;
  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;
  window.toggleCustomCoverBox = toggleCustomCoverBox;
  window.saveAllSettings = saveAllSettings;
  window.resetDemoContent = resetDemoContent;
}
