/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — SETTINGS CONTROLLER & PERSISTENCE (settings.js)
 * Master state container, modal tab routing, and localStorage sync.
 * ============================================================================
 */

import { DEFAULT_DEMO_CONTENT, SUBJECT_DEMO_TEMPLATES } from './demo-content.js';

// Subject Profiles Metadata Definition
export const SUBJECT_META = {
  english: {
    label: "উচ্চমাধ্যমিক ইংরেজি প্রথম পত্র",
    title: "উচ্চমাধ্যমিক ইংরেজি প্রথম পত্র",
    headerCourse: "English For Today • Classes XI-XII",
    headerUnit: "Unit 1: Education and Life • Lesson 2",
    coverSubject: "English For Today • Classes XI-XII",
    coverTitleEn: "AI in The Classroom: Pros, Cons and The Role Of EdTech",
    coverTitleBn: "শ্রেণিকক্ষে কৃত্রিম বুদ্ধিমত্তা: সুবিধা, অসুবিধা এবং এডটেক কোম্পানিগুলোর ভূমিকা",
    coverSubtitle: "Comprehensive Higher Secondary Academic & Admission Companion",
    coverInstitution: "Department of English • MUTU STUDY Press"
  },
  physics: {
    label: "উচ্চমাধ্যমিক পদার্থবিজ্ঞান ১ম ও ২য় পত্র",
    title: "উচ্চমাধ্যমিক পদার্থবিজ্ঞান • প্রথম ও দ্বিতীয় পত্র",
    headerCourse: "Physics 1st & 2nd Paper • Classes XI-XII",
    headerUnit: "অধ্যায় ০২ ও ০৬: ভেক্টর বিশ্লেষণ &bull; বলবিদ্যা ও মহাকর্ষ",
    coverSubject: "HSC Physics • ১ম ও ২য় পত্র",
    coverTitleEn: "Vector Mechanics, Gravitation & Quantum Dynamics",
    coverTitleBn: "ভেক্টর বলবিদ্যা, মহাকর্ষ এবং আধুনিক পদার্থবিজ্ঞানের সূচনা",
    coverSubtitle: "Mathematical Formulations, Vector Graphs & Board Problem Matrix",
    coverInstitution: "Department of Physics • MUTU STUDY Press"
  },
  chemistry: {
    label: "উচ্চমাধ্যমিক রসায়ন ১ম ও ২য় পত্র",
    title: "উচ্চমাধ্যমিক রসায়ন • দ্বিতীয় পত্র",
    headerCourse: "Chemistry 1st & 2nd Paper • Classes XI-XII",
    headerUnit: "অধ্যায় ০২: জৈব রসায়ন &bull; অ্যারোমেটিক প্রতিস্থাপন",
    coverSubject: "HSC Chemistry • জৈব ও অজৈব রসায়ন",
    coverTitleEn: "Organic Reaction Mechanisms & Industrial Chemistry",
    coverTitleBn: "জৈব বিক্রিয়া কৌশল, বেনজিন বলয় এবং ইলেক্ট্রোফিলিক প্রতিস্থাপন",
    coverSubtitle: "Electrophilic Substitution, Reaction Mechanisms & Formula Tables",
    coverInstitution: "Department of Chemistry • MUTU STUDY Press"
  },
  math: {
    label: "উচ্চমাধ্যমিক উচ্চতর গণিত ১ম ও ২য় পত্র",
    title: "উচ্চমাধ্যমিক উচ্চতর গণিত • প্রথম ও দ্বিতীয় পত্র",
    headerCourse: "Higher Mathematics • Classes XI-XII",
    headerUnit: "অধ্যায় ০৯: অন্তরীকরণ ও মৌলিক উপপাদ্যসমূহ",
    coverSubject: "HSC Higher Math • ১ম ও ২য় পত্র",
    coverTitleEn: "Differential Calculus & Integral Formulations",
    coverTitleBn: "অন্তরীকরণ ও নির্দিষ্ট যোগজীকরণ: গাণিতিক প্রমাণ ও সমাধান",
    coverSubtitle: "Limits, Chain Rule, Trigonometric Derivatives & Tangent Slopes",
    coverInstitution: "Department of Mathematics • MUTU STUDY Press"
  },
  bangla: {
    label: "উচ্চমাধ্যমিক বাংলা ১ম ও ২য় পত্র",
    title: "উচ্চমাধ্যমিক বাংলা • সাহিত্যপাঠ",
    headerCourse: "সাহিত্যপাঠ ও সহপাঠ • উচ্চমাধ্যমিক বাংলা",
    headerUnit: "গদ্য: অপরিচিতা — রবীন্দ্রনাথ ঠাকুর &bull; চরিত্র বিশ্লেষণ",
    coverSubject: "HSC Bangla 1st Paper • সাহিত্যপাঠ",
    coverTitleEn: "Bangla Sahityapath: Critical Analysis & Creative Matrix",
    coverTitleBn: "অপরিচিতা, সোনার তরী এবং বিদ্রোহী: পুঙ্খানুপুঙ্খ চরিত্র ও সৃজনশীল বিশ্লেষণ",
    coverSubtitle: "শব্দার্থ ও টীকা, মূলভাব, চরিত্রচিত্রণ এবং বোর্ড সৃজনশীল প্রশ্ন",
    coverInstitution: "বাংলা সাহিত্য বিভাগ • MUTU STUDY Press"
  }
};

// Master Application State
export const appState = {
  theme: 'light',
  watermarkEnabled: true,
  watermarkOpacity: 0.08,
  
  // Multi-Subject Configuration
  currentSubject: 'chemistry', // 'chemistry' | 'physics' | 'math' | 'bangla' | 'english'
  currentSubjectLabel: "উচ্চমাধ্যমিক রসায়ন",
  currentSubjectTitle: "উচ্চমাধ্যমিক রসায়ন • দ্বিতীয় পত্র",
  activeSubject: 'chemistry',
  activeSubjectTitle: "উচ্চমাধ্যমিক রসায়ন • দ্বিতীয় পত্র",
  activeSubjectLabel: "উচ্চমাধ্যমিক রসায়ন • দ্বিতীয় পত্র",

  // Dynamic Header & Footer Metadata
  headerCourse: "Chemistry 1st & 2nd Paper • Classes XI-XII",
  headerUnit: "অধ্যায় ০২: জৈব রসায়ন &bull; অ্যারোমেটিক প্রতিস্থাপন",
  footerTagline: "Academic Publishing Series",

  // Subject-specific saved content snippets
  subjectSnippets: {
    chemistry: SUBJECT_DEMO_TEMPLATES.chemistry,
    physics: SUBJECT_DEMO_TEMPLATES.physics,
    math: SUBJECT_DEMO_TEMPLATES.math,
    bangla: SUBJECT_DEMO_TEMPLATES.bangla,
    english: SUBJECT_DEMO_TEMPLATES.english
  },

  // Cover Page Configuration
  coverEnabled: true,
  coverTheme: 'royal', // 'royal' | 'minimal' | 'seal' | 'sovereign' | 'modernist' | 'blueprint' | 'custom'
  coverCustomHtml: '',
  coverKicker: "MUTU STUDY • ACADEMIC EXCELLENCE SERIES",
  coverSubject: "HSC Chemistry • জৈব ও অজৈব রসায়ন",
  coverTitleEn: "Organic Reaction Mechanisms & Industrial Chemistry",
  coverTitleBn: "জৈব বিক্রিয়া কৌশল, বেনজিন বলয় এবং ইলেক্ট্রোফিলিক প্রতিস্থাপন",
  coverSubtitle: "Comprehensive Higher Secondary Academic & Admission Companion",
  coverInstructor: "MUTU STUDY Science Faculty",
  coverSession: "Classes XI-XII • Academic Session 2026-27",
  coverInstitution: "Department of Chemistry • MUTU STUDY Press",
  coverEdition: "First Edition 2026 • Board Exam Special",
  coverFooterImprint: "Official Master Study Compendium • All Rights Reserved",

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

  // Ensure subjectSnippets are populated
  if (!appState.subjectSnippets) {
    appState.subjectSnippets = { ...SUBJECT_DEMO_TEMPLATES };
  } else {
    for (const key of Object.keys(SUBJECT_DEMO_TEMPLATES)) {
      if (!appState.subjectSnippets[key] || !appState.subjectSnippets[key].trim()) {
        appState.subjectSnippets[key] = SUBJECT_DEMO_TEMPLATES[key];
      }
    }
  }

  // If user is currently stuck on English AI classroom demo or previous session, make sure currentSubject has updated headers & content
  const curSub = appState.currentSubject || appState.activeSubject || 'physics';
  appState.currentSubject = curSub;
  appState.activeSubject = curSub;
  const meta = SUBJECT_META[curSub] || SUBJECT_META.physics;
  
  appState.currentSubjectLabel = meta.title || meta.label;
  appState.activeSubjectLabel = meta.title || meta.label;
  appState.activeSubjectTitle = meta.title || meta.label;

  // Clean state migration: if stored raw content is empty or contains legacy English content while curSub is science/math
  if (!appState.rawContentHtml || !appState.rawContentHtml.trim() || 
      (curSub !== 'english' && appState.rawContentHtml.includes('AI in The Classroom') && !appState.rawContentHtml.includes('Physics') && !appState.rawContentHtml.includes('Chemistry')) ||
      (appState.rawContentHtml.includes('AI in The Classroom') && !localStorage.getItem('mutu_user_custom_edited'))) {
    appState.rawContentHtml = appState.subjectSnippets[curSub] || SUBJECT_DEMO_TEMPLATES[curSub];
    appState.headerCourse = meta.headerCourse;
    appState.headerUnit = meta.headerUnit;
    appState.coverSubject = meta.coverSubject;
    appState.coverTitleEn = meta.coverTitleEn;
    appState.coverTitleBn = meta.coverTitleBn;
    appState.coverSubtitle = meta.coverSubtitle;
    appState.coverInstitution = meta.coverInstitution;
  }

  // Sync quick subject dropdown selector in UI
  const quickSubj = document.getElementById('quickSubjectSelector');
  if (quickSubj) quickSubj.value = curSub;
}

/**
 * Saves current application state to LocalStorage
 */
export function savePersistedState() {
  try {
    localStorage.setItem('mutu_studio_state', JSON.stringify(appState));
  } catch (e) {
    console.warn('[MUTU STUDIO] Failed to save state:', e);
  }
}

/**
 * Navigates into a dedicated Settings Subpage (Content, Cover, Typography, Layout, Metadata, System)
 * @param {string} pageId - 'content' | 'cover' | 'typography' | 'layout' | 'metadata' | 'system'
 */
export function navigateToSettingsPage(pageId) {
  const hubView = document.getElementById('settingsViewHub');
  if (hubView) hubView.style.display = 'none';

  const subpages = document.querySelectorAll('.settings-subpage');
  subpages.forEach(p => p.classList.remove('active'));

  const target = document.getElementById(`settingsSubpage-${pageId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update Breadcrumb & Header Title
  const titles = {
    content: "📝 বিষয়ভিত্তিক কন্টেন্ট ম্যানেজার",
    cover: "🎨 কভার পেজ স্টুডিও",
    typography: "✍️ ফন্ট ও টাইপোগ্রাফি",
    layout: "📄 পেজ সেটআপ ও মার্জিন",
    metadata: "🏷️ মেটাডাটা ও জলছাপ",
    system: "⚙️ সিস্টেম, ব্যাকআপ ও লাইভ সিঙ্ক"
  };

  const breadcrumbActive = document.getElementById('settingsActiveBreadcrumb');
  if (breadcrumbActive && titles[pageId]) {
    breadcrumbActive.innerText = titles[pageId];
  }
}

/**
 * Returns from subpage back to Settings Hub Dashboard
 */
export function navigateToSettingsHub() {
  const subpages = document.querySelectorAll('.settings-subpage');
  subpages.forEach(p => p.classList.remove('active'));

  const hubView = document.getElementById('settingsViewHub');
  if (hubView) hubView.style.display = 'block';

  const breadcrumbActive = document.getElementById('settingsActiveBreadcrumb');
  if (breadcrumbActive) {
    breadcrumbActive.innerText = "স্টুডিও ড্যাশবোর্ড";
  }
}

/**
 * Inserts predefined LaTeX, Chemistry, or Diagram template into content editor
 * @param {string} type 
 */
export function insertFormulaSnippet(type) {
  const textarea = document.getElementById('cfgRawContentInput');
  if (!textarea) return;

  const snippets = {
    'inline-math': '$v = u + at$',
    'display-math': '$$\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)$$',
    'fraction': '$$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$',
    'limit': '$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$',
    'chem-benzene': `
<div class="chem-structure-card">
  <div class="chem-structure-name">বেনজিন বলয় (Benzene Ring, $C_6H_6$)</div>
  <svg viewBox="0 0 100 100" class="chem-benzene-svg" width="90" height="90">
    <polygon points="50,12 85,32 85,72 50,92 15,72 15,32" fill="none" stroke="currentColor" stroke-width="2.5" />
    <circle cx="50" cy="52" r="22" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,3" />
  </svg>
</div>`,
    'chem-reaction': `
<div class="chem-reaction-card">
  <div class="chem-reaction-title">বেনজিনের নাইট্রেশন বিক্রিয়া (Nitration)</div>
  <div class="chem-reaction-row">
    <span class="chem-reactant">C_6H_6</span>
    <span class="chem-plus">+</span>
    <span class="chem-reactant">HNO_3</span>
    <span class="chem-arrow">&xrarr;</span>
    <span class="chem-product">C_6H_5NO_2</span>
    <span class="chem-plus">+</span>
    <span class="chem-byproduct">H_2O</span>
  </div>
</div>`,
    'concept-box': `
<div class="science-concept-card">
  <div class="concept-badge">&bull; মূল ধারণা ও সূত্র</div>
  <h3 class="concept-title">মহাকর্ষীয় বিভব ও মুক্তিবেগ</h3>
  <p>মহাকর্ষীয় ক্ষেত্রের কোনো বিন্দুতে একক ভরের বস্তুকে অসীম হতে আনতে যে পরিমাণ কাজ সম্পন্ন হয়:</p>
  <div class="math-formula-box">$$V = -\\frac{GM}{r}, \\quad v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$$</div>
</div>`,
    'academic-table': `
<table class="academic-table">
  <thead>
    <tr><th>রাশি (Quantity)</th><th>প্রতীক</th><th>SI একক</th><th>মাত্রা সমীকরণ</th></tr>
  </thead>
  <tbody>
    <tr><td>বল (Force)</td><td>$F$</td><td>Newton (N)</td><td>$[MLT^{-2}]$</td></tr>
    <tr><td>কাজ (Work)</td><td>$W$</td><td>Joule (J)</td><td>$[ML^2T^{-2}]$</td></tr>
  </tbody>
</table>`,
    'mnemonic-box': `
<div class="mnemonic-ribbon">
  <strong>&bigstar; মনে রাখার শর্টকাট টেকনিক:</strong> &ldquo;প-তে পজিটিভ, ন-তে নেগেটিভ&rdquo; &mdash; চার্জ ও দিক নির্ণয়ের বিশেষ সূত্র।
</div>`
  };

  const textToInsert = snippets[type] || '';
  if (!textToInsert) return;

  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const oldVal = textarea.value;

  textarea.value = oldVal.substring(0, start) + textToInsert + oldVal.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
  textarea.focus();

  onContentTextareaInput(textarea.value);

  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast("সফলভাবে কোড স্নিপেট যুক্ত করা হয়েছে!");
  }
}

/**
 * Applies edited content to preview immediately with auto-pagination
 */
export function applyContentAndRepaginate() {
  const contentInput = document.getElementById('cfgRawContentInput');
  if (contentInput) {
    onContentTextareaInput(contentInput.value);
  }
  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }
  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast("⚡ কন্টেন্ট লাইভ প্রিভিউতে সফলভাবে রেন্ডার হয়েছে!");
  }
}

/**
 * 1-Click Preview Sync & Stale Cache Flush Engine (Zero Bloat)
 */
export function syncAndForceRefreshPreview() {
  // 1. Flush SW and browser CacheStorage immediately
  if ('caches' in window) {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage('clearCache');
  }

  // 2. Re-trigger pagination immediately
  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }

  // 3. Close settings modal if open
  closeSettingsModal();

  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast("⚡ ক্যাশ সম্পূর্ণ পরিষ্কার ও লাইভ ফ্রেশ সিঙ্ক সম্পন্ন হয়েছে!", 2500);
  }
}

/**
 * Exports all settings and custom subject notes as downloadable JSON file
 */
export function exportProjectBackup() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `MUTU_STUDY_Backup_${Date.now()}.json`);
  dlAnchorElem.click();
  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast("📥 প্রজেক্ট ব্যাকআপ JSON ডাউনলোড সম্পন্ন হয়েছে!");
  }
}

/**
 * Imports configuration JSON file
 * @param {HTMLInputElement} inputEl 
 */
export function importProjectBackup(inputEl) {
  if (!inputEl || !inputEl.files || !inputEl.files[0]) return;
  const file = inputEl.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && typeof parsed === 'object') {
        Object.assign(appState, parsed);
        savePersistedState();
        if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
          window.runAutoPagination();
        }
        if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast("📤 ব্যাকআপ ডেটা সফলভাবে রিস্টোর হয়েছে!");
        }
        openSettingsModal();
      }
    } catch (err) {
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("ত্রুটি: ব্যাকআপ ফাইলটি সঠিক নয়!");
      }
    }
  };
  reader.readAsText(file);
}

/**
 * Resets all user customization and restores factory defaults
 */
export function resetFactoryDefaults() {
  try {
    localStorage.removeItem('mutu_studio_master_state_v2');
    localStorage.removeItem('mutu_user_custom_edited');
    localStorage.removeItem('mutu_doc_theme');
    localStorage.removeItem('mutu_active_subject');
  } catch (e) {}

  window.location.reload();
}

/**
 * Switches Active Tab inside the Settings Studio Modal (legacy alias)
 * @param {string} tabId - 'content' | 'cover' | 'typography' | 'general'
 */
export function switchSettingsTab(tabId) {
  navigateToSettingsPage(tabId);
}

/**
 * Opens Settings Modal and Populates All Fields with Current State
 * @param {string} [initialPage=null]
 */
export function openSettingsModal(initialPage = null) {
  const modal = document.getElementById('settingsModal');
  if (!modal) return;

  if (initialPage) {
    navigateToSettingsPage(initialPage);
  } else {
    navigateToSettingsHub();
  }

  // Subject Selector
  const curSub = appState.currentSubject || appState.activeSubject || 'chemistry';
  const subjectSelect = document.getElementById('cfgActiveSubject');
  if (subjectSelect) subjectSelect.value = curSub;
  const generalSubject = document.getElementById('cfgGeneralSubject');
  if (generalSubject) generalSubject.value = curSub;

  // Sync Subject Tab Navigation
  const tabBtns = document.querySelectorAll('.subject-tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-subject') === curSub);
  });
  const badge = document.getElementById('activeSubjectBadge');
  if (badge && SUBJECT_META[curSub]) {
    badge.innerText = `বর্তমান: ${SUBJECT_META[curSub].title || SUBJECT_META[curSub].label}`;
  }

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

  const coverKicker = document.getElementById('cfgCoverKicker');
  if (coverKicker) coverKicker.value = appState.coverKicker;

  const coverSubject = document.getElementById('cfgCoverSubject');
  if (coverSubject) coverSubject.value = appState.coverSubject;

  const coverTitleEn = document.getElementById('cfgCoverTitleEn');
  if (coverTitleEn) coverTitleEn.value = appState.coverTitleEn;

  const coverTitleBn = document.getElementById('cfgCoverTitleBn');
  if (coverTitleBn) coverTitleBn.value = appState.coverTitleBn;

  const coverSubtitle = document.getElementById('cfgCoverSubtitle');
  if (coverSubtitle) coverSubtitle.value = appState.coverSubtitle;

  const coverInstructor = document.getElementById('cfgCoverInstructor');
  if (coverInstructor) coverInstructor.value = appState.coverInstructor;

  const coverSession = document.getElementById('cfgCoverSession');
  if (coverSession) coverSession.value = appState.coverSession;

  const coverInstitution = document.getElementById('cfgCoverInstitution');
  if (coverInstitution) coverInstitution.value = appState.coverInstitution;

  const coverEdition = document.getElementById('cfgCoverEdition');
  if (coverEdition) coverEdition.value = appState.coverEdition;

  const coverFooterImprint = document.getElementById('cfgCoverFooterImprint');
  if (coverFooterImprint) coverFooterImprint.value = appState.coverFooterImprint;

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
  if (typeof window !== 'undefined' && typeof window.pushModalHistory === 'function') {
    window.pushModalHistory('settingsModal');
  }
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

  // Subject
  const subjectSelect = document.getElementById('cfgActiveSubject');
  if (subjectSelect) {
    appState.activeSubject = subjectSelect.value;
    if (SUBJECT_META[subjectSelect.value]) {
      appState.activeSubjectLabel = SUBJECT_META[subjectSelect.value].label;
    }
  }

  const footerInput = document.getElementById('cfgFooterTag');
  if (footerInput) appState.footerTagline = footerInput.value;

  const wmToggle = document.getElementById('cfgWatermarkToggle');
  if (wmToggle) appState.watermarkEnabled = wmToggle.checked;

  const wmOpacity = document.getElementById('cfgWatermarkOpacity');
  if (wmOpacity) appState.watermarkOpacity = Number(wmOpacity.value) / 100;

  // Content
  const contentInput = document.getElementById('cfgRawContentInput');
  if (contentInput) {
    appState.rawContentHtml = contentInput.value;
    const curSub = appState.currentSubject || appState.activeSubject || 'chemistry';
    if (!appState.subjectSnippets) appState.subjectSnippets = {};
    appState.subjectSnippets[curSub] = contentInput.value;
  }

  // Cover Page
  const coverToggle = document.getElementById('cfgCoverToggle');
  if (coverToggle) appState.coverEnabled = coverToggle.checked;

  const coverTheme = document.getElementById('cfgCoverTheme');
  if (coverTheme) appState.coverTheme = coverTheme.value;

  const coverKicker = document.getElementById('cfgCoverKicker');
  if (coverKicker) appState.coverKicker = coverKicker.value;

  const coverSubject = document.getElementById('cfgCoverSubject');
  if (coverSubject) appState.coverSubject = coverSubject.value;

  const coverTitleEn = document.getElementById('cfgCoverTitleEn');
  if (coverTitleEn) appState.coverTitleEn = coverTitleEn.value;

  const coverTitleBn = document.getElementById('cfgCoverTitleBn');
  if (coverTitleBn) appState.coverTitleBn = coverTitleBn.value;

  const coverSubtitle = document.getElementById('cfgCoverSubtitle');
  if (coverSubtitle) appState.coverSubtitle = coverSubtitle.value;

  const coverInstructor = document.getElementById('cfgCoverInstructor');
  if (coverInstructor) appState.coverInstructor = coverInstructor.value;

  const coverSession = document.getElementById('cfgCoverSession');
  if (coverSession) appState.coverSession = coverSession.value;

  const coverInstitution = document.getElementById('cfgCoverInstitution');
  if (coverInstitution) appState.coverInstitution = coverInstitution.value;

  const coverEdition = document.getElementById('cfgCoverEdition');
  if (coverEdition) appState.coverEdition = coverEdition.value;

  const coverFooterImprint = document.getElementById('cfgCoverFooterImprint');
  if (coverFooterImprint) appState.coverFooterImprint = coverFooterImprint.value;

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
  savePersistedState();

  closeSettingsModal();

  // Re-run Pagination if engine is bound
  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }
}

/**
 * Automatically Switches Active Subject Tab, Loads Subject-Specific Snippet & Re-paginates
 * @param {string} subjectKey - 'chemistry' | 'physics' | 'math' | 'bangla' | 'english'
 */
export function switchSubjectTab(subjectKey) {
  if (!subjectKey || !SUBJECT_META[subjectKey]) return;
  const meta = SUBJECT_META[subjectKey];

  // 1. Save currently typed content in textarea into previous subject snippet
  const contentInput = document.getElementById('cfgRawContentInput');
  const oldSubject = appState.currentSubject || appState.activeSubject;
  if (contentInput && oldSubject) {
    if (!appState.subjectSnippets) appState.subjectSnippets = { ...SUBJECT_DEMO_TEMPLATES };
    appState.subjectSnippets[oldSubject] = contentInput.value;
  }

  // 2. Set active subject state
  appState.currentSubject = subjectKey;
  appState.currentSubjectLabel = meta.title || meta.label;
  appState.activeSubject = subjectKey;
  appState.activeSubjectTitle = meta.title || meta.label;
  appState.activeSubjectLabel = meta.label || meta.title;

  appState.headerCourse = meta.headerCourse;
  appState.headerUnit = meta.headerUnit;
  appState.coverSubject = meta.coverSubject;
  appState.coverTitleEn = meta.coverTitleEn;
  appState.coverTitleBn = meta.coverTitleBn;
  appState.coverSubtitle = meta.coverSubtitle;
  appState.coverInstitution = meta.coverInstitution;

  // 3. Load target subject's saved content snippet
  if (!appState.subjectSnippets) appState.subjectSnippets = { ...SUBJECT_DEMO_TEMPLATES };
  const snippet = appState.subjectSnippets[subjectKey] || SUBJECT_DEMO_TEMPLATES[subjectKey] || DEFAULT_DEMO_CONTENT;
  appState.rawContentHtml = snippet;
  if (contentInput) {
    contentInput.value = snippet;
  }

  // 4. Update UI tab navigation buttons active state
  const tabBtns = document.querySelectorAll('.subject-tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-subject') === subjectKey);
  });

  const badge = document.getElementById('activeSubjectBadge');
  if (badge) {
    badge.innerText = `বর্তমান: ${meta.title || meta.label}`;
  }

  // Sync dropdown selectors if present
  const subj1 = document.getElementById('cfgActiveSubject');
  if (subj1) subj1.value = subjectKey;
  const subj2 = document.getElementById('cfgGeneralSubject');
  if (subj2) subj2.value = subjectKey;
  const quickSubj = document.getElementById('quickSubjectSelector');
  if (quickSubj) quickSubj.value = subjectKey;

  const courseInput = document.getElementById('cfgHeaderCourse');
  if (courseInput) courseInput.value = meta.headerCourse;

  const unitInput = document.getElementById('cfgHeaderUnit');
  if (unitInput) unitInput.value = meta.headerUnit;

  const covSubj = document.getElementById('cfgCoverSubject');
  if (covSubj) covSubj.value = meta.coverSubject;

  const covEn = document.getElementById('cfgCoverTitleEn');
  if (covEn) covEn.value = meta.coverTitleEn;

  const covBn = document.getElementById('cfgCoverTitleBn');
  if (covBn) covBn.value = meta.coverTitleBn;

  const covSub = document.getElementById('cfgCoverSubtitle');
  if (covSub) covSub.value = meta.coverSubtitle;

  const covInst = document.getElementById('cfgCoverInstitution');
  if (covInst) covInst.value = meta.coverInstitution;

  savePersistedState();

  // 5. Trigger auto-pagination
  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }

  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast(`স্টাডি বিষয় পরিবর্তন: ${meta.title || meta.label}`);
  }
}

/**
 * Real-time Handler for Raw Content Textarea Input
 * @param {string} val 
 */
export function onContentTextareaInput(val) {
  appState.rawContentHtml = val;
  const curSub = appState.currentSubject || appState.activeSubject || 'chemistry';
  if (!appState.subjectSnippets) appState.subjectSnippets = { ...SUBJECT_DEMO_TEMPLATES };
  appState.subjectSnippets[curSub] = val;
  try {
    localStorage.setItem('mutu_user_custom_edited', 'true');
  } catch (e) {}
  savePersistedState();
}

/**
 * Switch subject alias requested by user
 * @param {string} subKey 
 */
export function switchSubject(subKey) {
  switchSubjectTab(subKey);
}

/**
 * Dropdown alias for switchSubjectTab
 */
export function onSubjectChange(subjectKey) {
  switchSubjectTab(subjectKey);
}

/**
 * Resets Content Input to Active Subject's Default Lecture Template Pool
 */
export function resetDemoContent() {
  const currentSubject = appState.currentSubject || appState.activeSubject || 'chemistry';
  const snippet = SUBJECT_DEMO_TEMPLATES[currentSubject] || DEFAULT_DEMO_CONTENT;
  const input = document.getElementById('cfgRawContentInput');
  if (input) {
    input.value = snippet;
  }
  appState.rawContentHtml = snippet;
  if (!appState.subjectSnippets) appState.subjectSnippets = { ...SUBJECT_DEMO_TEMPLATES };
  appState.subjectSnippets[currentSubject] = snippet;
  savePersistedState();

  if (typeof window !== 'undefined' && typeof window.runAutoPagination === 'function') {
    window.runAutoPagination();
  }

  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast("ডেমো কন্টেন্ট সফলভাবে রিস্টোর করা হয়েছে।");
  }
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.SUBJECT_META = SUBJECT_META;
  window.switchSubjectTab = switchSubjectTab;
  window.switchSubject = switchSubject;
  window.onContentTextareaInput = onContentTextareaInput;
  window.onSubjectChange = onSubjectChange;
  window.loadPersistedState = loadPersistedState;
  window.switchSettingsTab = switchSettingsTab;
  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;
  window.toggleCustomCoverBox = toggleCustomCoverBox;
  window.navigateToSettingsPage = navigateToSettingsPage;
  window.navigateToSettingsHub = navigateToSettingsHub;
  window.insertFormulaSnippet = insertFormulaSnippet;
  window.applyContentAndRepaginate = applyContentAndRepaginate;
  window.syncAndForceRefreshPreview = syncAndForceRefreshPreview;
  window.exportProjectBackup = exportProjectBackup;
  window.importProjectBackup = importProjectBackup;
  window.resetFactoryDefaults = resetFactoryDefaults;
  window.saveAllSettings = saveAllSettings;
  window.resetDemoContent = resetDemoContent;
}
