/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — MAIN APPLICATION CONTROLLER (app.js)
 * Lifecycle coordinator, theme engine, PWA installation & service worker
 * ============================================================================
 */

import { 
  appState, 
  loadPersistedState, 
  switchSettingsTab, 
  openSettingsModal, 
  closeSettingsModal, 
  toggleCustomCoverBox, 
  saveAllSettings, 
  resetDemoContent 
} from './settings.js';

import { runAutoPagination, applyTypography } from './paginator.js';
import { DEFAULT_DEMO_CONTENT } from './demo-content.js';

// PWA deferred install prompt holder
let deferredInstallPrompt = null;
let lastThemeToggleTime = 0;

const SUN_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const MOON_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

/**
 * Explicitly applies and persists selected theme (dark | light)
 * @param {'dark' | 'light'} theme 
 */
export function setTheme(theme) {
  const htmlEl = document.documentElement;
  appState.theme = theme;
  htmlEl.setAttribute('data-theme', theme);

  // Sync Android / System Status Bar Color
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#180B10' : '#4A1112');
  }

  // Sync Brand Header Icon with Active Theme Architecture
  const brandImgs = document.querySelectorAll('.ui-brand img, .intro-brand-header img');
  brandImgs.forEach(img => {
    img.src = (theme === 'dark') ? './icons/icon-dark.svg' : './icons/icon.svg';
  });

  const btnIcon = document.getElementById('themeBtnIcon');
  const btnText = document.getElementById('themeBtnText');
  const fabIcon = document.getElementById('fabThemeIcon');
  const fabTooltip = document.getElementById('fabThemeTooltip');

  if (theme === 'light') {
    if (btnIcon) btnIcon.innerHTML = MOON_SVG;
    if (btnText) btnText.innerText = 'Dark Mahogany';
    if (fabIcon) fabIcon.innerHTML = MOON_SVG;
    if (fabTooltip) fabTooltip.innerText = 'Dark Mahogany';
  } else {
    if (btnIcon) btnIcon.innerHTML = SUN_SVG;
    if (btnText) btnText.innerText = 'Warm White';
    if (fabIcon) fabIcon.innerHTML = SUN_SVG;
    if (fabTooltip) fabTooltip.innerText = 'Warm White';
  }

  localStorage.setItem('mutu_doc_theme', theme);
  setTimeout(() => runAutoPagination(appState), 40);
}

/**
 * Toggles the 3D Circular Floating Action Menu (FAB)
 * @param {Event} [e]
 */
export function toggleFabMenu(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const fabMenu = document.getElementById('fabMenu');
  if (fabMenu) {
    fabMenu.classList.toggle('active');
  }
}

/**
 * Dual-Theme Switcher (Dark Mahogany <-> Warm White Light)
 * Includes debounce protection against accidental double-invocations
 */
export function toggleAcademicTheme(e) {
  if (e && e.preventDefault) e.preventDefault();

  const now = Date.now();
  if (now - lastThemeToggleTime < 350) {
    return; // Ignore rapid duplicate call
  }
  lastThemeToggleTime = now;

  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme') || appState.theme || 'dark';
  const targetTheme = (currentTheme === 'dark') ? 'light' : 'dark';
  setTheme(targetTheme);
}

/**
 * Initializes PWA Service Worker Registration immediately
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    const swUrl = './sw.js';
    navigator.serviceWorker.register(swUrl, { scope: './' })
      .then((registration) => {
        console.log('[MUTU PWA] Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('[MUTU PWA] Service Worker registration failed:', error);
      });
  }
}

/**
 * Studio Non-Blocking Glassmorphic Toast Notification
 * (Strict compliance with iframe sandbox & zero window.alert policy)
 * @param {string} message 
 * @param {number} [duration=3500] 
 */
export function showToast(message, duration = 3500) {
  let toast = document.getElementById('studioToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'studioToast';
    toast.className = 'studio-toast no-print';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/**
 * Main Direct PWA Install Handler (Called by Header Install Button, Intro Modal, & Diagnostics)
 */
export async function triggerPWAInstall() {
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);
  if (isStandalone) {
    showToast("✅ MUTU STUDY অ্যাপটি ইতিমধ্যে আপনার ডিভাইসে ইনস্টল করা আছে!");
    const btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.style.display = 'none';
    return;
  }

  // 1. If native deferred prompt is already captured, trigger immediately in user gesture!
  const promptEvent = window.__pwaInstallPrompt || deferredInstallPrompt;
  if (promptEvent) {
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      console.log('[MUTU PWA] User prompt choice:', choice.outcome);
      if (choice.outcome === 'accepted') {
        showToast("🎉 MUTU STUDY অ্যাপ ইনস্টলেশন শুরু হয়েছে!");
        window.__pwaInstallPrompt = null;
        deferredInstallPrompt = null;
        const btn = document.getElementById('pwaInstallBtn');
        if (btn) btn.style.display = 'none';
        closePWAFrameModal();
        closePWAIntro(true);
      } else {
        showToast("ইনস্টলেশন বাতিল হয়েছে। প্রয়োজনে পুনরায় ক্লিক করুন।");
      }
      return;
    } catch (err) {
      console.warn('[MUTU PWA] Error triggering install prompt:', err);
    }
  }

  // 2. If running on iOS Safari
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  if (isIOS) {
    openIOSInstallDialog();
    return;
  }

  // 3. If running inside an iFrame (e.g. AI Studio preview sandbox)
  // Attempt top-level standalone window launch for direct 1-click install
  const isIframe = window.self !== window.top;
  if (isIframe) {
    const directUrl = window.location.origin + window.location.pathname + '?source=pwa&install=1';
    const newWin = window.open(directUrl, '_blank');
    if (!newWin) {
      openPWAFrameModal();
    } else {
      showToast("🚀 নতুন উইন্ডোতে অ্যাপ ওপেন করা হয়েছে—সেখানে সরাসরি ১-ক্লিকে ইনস্টল সম্পন্ন করুন!");
    }
    return;
  }

  // 4. In a top-level window, wait up to 1.5 seconds in case beforeinstallprompt is firing asynchronously
  showToast("ইনস্টলার চালু হচ্ছে...", 1500);
  const eventFired = await new Promise((resolve) => {
    if (window.__pwaInstallPrompt || deferredInstallPrompt) return resolve(true);
    const onPrompt = () => {
      window.removeEventListener('pwa-prompt-ready', onPrompt);
      resolve(true);
    };
    window.addEventListener('pwa-prompt-ready', onPrompt);
    setTimeout(() => {
      window.removeEventListener('pwa-prompt-ready', onPrompt);
      resolve(false);
    }, 1500);
  });

  const readyPrompt = window.__pwaInstallPrompt || deferredInstallPrompt;
  if (readyPrompt) {
    try {
      await readyPrompt.prompt();
      const choice = await readyPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        showToast("🎉 MUTU STUDY অ্যাপ ইনস্টলেশন সম্পন্ন হয়েছে!");
        window.__pwaInstallPrompt = null;
        deferredInstallPrompt = null;
        const btn = document.getElementById('pwaInstallBtn');
        if (btn) btn.style.display = 'none';
        closePWAFrameModal();
        closePWAIntro(true);
      }
      return;
    } catch (err) {
      console.warn('[MUTU PWA] Prompt launch error:', err);
    }
  }

  // 5. If browser did not supply prompt event
  showToast("ইনস্টলার প্রস্তুত হচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর আবার ক্লিক করুন।", 3000);
}

/**
 * Configures In-App PWA Install Prompts (Android/Chromium & iOS)
 */
function initInstallPrompt() {
  const installBtn = document.getElementById('pwaInstallBtn');
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);

  if (isStandalone) {
    if (installBtn) installBtn.style.display = 'none';
    return;
  }

  if (installBtn) {
    installBtn.style.display = 'inline-flex';
    installBtn.addEventListener('click', triggerPWAInstall);
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    window.__pwaInstallPrompt = e;
    if (installBtn && !isStandalone) {
      installBtn.style.display = 'inline-flex';
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('[MUTU PWA] Application was successfully installed.');
    deferredInstallPrompt = null;
    window.__pwaInstallPrompt = null;
    window.__pwaIsStandalone = true;
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    closePWAIntro(true);
    closePWAFrameModal();
    closePWADiagnosticModal();
    showToast("MUTU STUDY অ্যাপটি সফলভাবে আপনার ডিভাইসে ইনস্টল হয়েছে!");
  });
}

// Android Pure-App History & Modal State Manager
let lastBackPressTime = 0;

export function pushModalHistory(modalId) {
  try {
    window.history.pushState({ modalId }, document.title);
  } catch (e) {
    console.debug('[MUTU PWA] History push failed:', e);
  }
}

export function popModalHistory(modalId) {
  try {
    if (window.history.state && window.history.state.modalId === modalId) {
      window.history.back();
    }
  } catch (e) {
    console.debug('[MUTU PWA] History back failed:', e);
  }
}

/**
 * Opens PWA Welcome & Intro Dialog
 */
export function openPWAIntro() {
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);
  if (isStandalone) {
    // In standalone mode, user is already in installed app
    localStorage.setItem('mutu_intro_dismissed', 'true');
    return;
  }
  const modal = document.getElementById('pwaIntroModal');
  if (modal) {
    modal.classList.add('open');
    pushModalHistory('pwaIntroModal');
  }
}

/**
 * Closes PWA Welcome & Intro Dialog
 * @param {boolean} dontShowAgain 
 */
export function closePWAIntro(dontShowAgain = false) {
  const modal = document.getElementById('pwaIntroModal');
  if (modal) {
    modal.classList.remove('open');
    popModalHistory('pwaIntroModal');
  }

  const checkbox = document.getElementById('introDontShowCheck');
  if (dontShowAgain || (checkbox && checkbox.checked)) {
    localStorage.setItem('mutu_intro_dismissed', 'true');
  }
}

/**
 * Trigger Install Flow directly from the Intro Modal
 */
export async function triggerInstallFromIntro() {
  closePWAIntro(false);
  await triggerPWAInstall();
}

/**
 * Displays iOS Safari installation instructions modal
 */
export function openIOSInstallDialog() {
  const dialog = document.getElementById('iosInstallModal');
  if (dialog) {
    dialog.classList.add('open');
    pushModalHistory('iosInstallModal');
  }
}

export function closeIOSInstallDialog() {
  const dialog = document.getElementById('iosInstallModal');
  if (dialog) {
    dialog.classList.remove('open');
    popModalHistory('iosInstallModal');
  }
}

/**
 * Displays PWA iFrame Launcher Guide Modal
 */
export function openPWAFrameModal() {
  const modal = document.getElementById('pwaFrameModal');
  const openBtn = document.getElementById('pwaOpenTabBtn');
  if (openBtn) {
    openBtn.href = window.location.origin + window.location.pathname + '?source=pwa&install=1';
  }
  if (modal) {
    modal.classList.add('open');
    pushModalHistory('pwaFrameModal');
  }
}

export function closePWAFrameModal() {
  const modal = document.getElementById('pwaFrameModal');
  if (modal) {
    modal.classList.remove('open');
    popModalHistory('pwaFrameModal');
  }
}

/**
 * Displays PWA System Health & Diagnostic Center
 */
export function openPWADiagnosticModal() {
  const modal = document.getElementById('pwaDiagnosticModal');
  if (!modal) return;
  modal.classList.add('open');
  pushModalHistory('pwaDiagnosticModal');

  const swElem = document.getElementById('diagSWStatus');
  const promptElem = document.getElementById('diagPromptStatus');
  const promptDesc = document.getElementById('diagPromptDesc');

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    if (swElem) swElem.innerText = '✅ সক্রিয় (Active Controller)';
  } else if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      if (swElem) swElem.innerText = '✅ সক্রিয় (Service Worker Ready)';
    });
  }

  const promptEvent = window.__pwaInstallPrompt || deferredInstallPrompt;
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);
  const isIframe = window.self !== window.top;

  if (isStandalone) {
    if (promptElem) {
      promptElem.innerText = '✅ অ্যাপ ইতিমধ্যে ইনস্টলড';
      promptElem.style.color = '#10B981';
    }
    if (promptDesc) promptDesc.innerText = 'অ্যাপ্লিকেশনটি ডিভাইস হোম স্ক্রিন / স্ট্যান্ডঅ্যালোন মোডে রানিং রয়েছে।';
  } else if (promptEvent) {
    if (promptElem) {
      promptElem.innerText = '✅ প্রস্তুত (Ready for 1-Click)';
      promptElem.style.color = '#10B981';
    }
    if (promptDesc) promptDesc.innerText = '১-ক্লিকে ইনস্টল বাটন চাপলেই সিস্টেম ইনস্টলেশন পপআপ চলে আসবে।';
  } else if (isIframe) {
    if (promptElem) {
      promptElem.innerText = '⚠️ আইফ্রেম মোড (iFrame Sandbox)';
      promptElem.style.color = '#EF4444';
    }
    if (promptDesc) promptDesc.innerText = 'ব্রাউজার সিকিউরিটি প্রিভিউ আইফ্রেমে ইনস্টল ব্লক রাখে। নতুন ট্যাবে খুলুন।';
  } else {
    if (promptElem) {
      promptElem.innerText = 'ℹ️ ইনস্টল সক্রিয়';
      promptElem.style.color = '#F59E0B';
    }
    if (promptDesc) promptDesc.innerText = 'ইনস্টল ডায়ালগ সরাসরি পেতে পেজটি একবার রিলোড করুন অথবা "অ্যাপ ইনস্টল করুন" বাটনে চাপুন।';
  }
}

export function closePWADiagnosticModal() {
  const modal = document.getElementById('pwaDiagnosticModal');
  if (modal) {
    modal.classList.remove('open');
    popModalHistory('pwaDiagnosticModal');
  }
}

export function forceTriggerPWAInstall() {
  closePWADiagnosticModal();
  triggerPWAInstall();
}

/**
 * PWA Web Push Notification Requester & Demo Trigger
 * Demonstrates notification with white monochrome emblem badge beside status bar date/time
 */
export async function requestNotificationPermissionAndSendDemo() {
  if (!('Notification' in window)) {
    showToast('দুঃখিত, এই ব্রাউজারটিতে ওয়েব নোটিফিকেশন সুবিধা পাওয়া যায়নি।');
    return;
  }

  try {
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      // Priority 1: Service Worker Registration showNotification (allows proper badge icon on Android/OS)
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          reg.showNotification('MUTU STUDY Studio', {
            body: 'নোটিফিকেশন সক্রিয় হয়েছে! আপনার মোবাইল বা ডিভাইসের স্ট্যাটাস বারে টাইম/ডেটের পাশে সাদা আইকনটি দৃশ্যমান হবে।',
            icon: './icons/icon-192.png',
            badge: './icons/badge-72x72.png', // Pure white monochrome emblem silhouette
            vibrate: [100, 50, 100],
            tag: 'mutu-welcome-notification',
            renotify: true,
            data: { url: './' }
          });
          return;
        }
      }

      // Priority 2: Native Window Notification
      new Notification('MUTU STUDY Studio', {
        body: 'নোটিফিকেশন সক্রিয় হয়েছে! স্ট্যাটাস বারে টাইম/ডেটের পাশে সাদা আইকনটি দৃশ্যমান হবে।',
        icon: './icons/icon-192.png',
        badge: './icons/badge-72x72.png'
      });
    } else if (permission === 'denied') {
      showToast('নোটিফিকেশন অনুমতি ব্লক করা রয়েছে। সাইট সেটিংস থেকে নোটিফিকেশন এলাও করুন।');
    }
  } catch (err) {
    console.warn('[MUTU PWA] Notification trigger error:', err);
  }
}

/**
 * Monitors Online / Offline Network Connectivity
 */
function initNetworkStatusListener() {
  const offlinePill = document.getElementById('offlinePill');
  const updateOnlineStatus = () => {
    if (!offlinePill) return;
    if (navigator.onLine === false) {
      offlinePill.classList.add('visible');
    } else {
      offlinePill.classList.remove('visible');
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  if (navigator.onLine === false) {
    offlinePill.classList.add('visible');
  } else if (offlinePill) {
    offlinePill.classList.remove('visible');
  }
}

/**
 * Extracts and sanitizes the primary document title for clean PDF filename
 * @returns {string} Sanitized title string
 */
export function getDocumentBaseTitle() {
  if (appState.coverTitleEn && appState.coverTitleEn.trim()) {
    return appState.coverTitleEn.trim().replace(/[/\\?%*:|"<>]/g, '-');
  }
  if (appState.headerCourse && appState.headerCourse.trim()) {
    return appState.headerCourse.trim().replace(/[/\\?%*:|"<>]/g, '-');
  }
  return "MUTU STUDY Lecture";
}

/**
 * Exports/Prints PDF with exact requested Theme suffix in filename
 * Light PDF: "[Document Name] - Light Theme.pdf"
 * Dark PDF:  "[Document Name] - Dark Theme.pdf"
 * @param {'light' | 'dark' | null} [targetTheme=null]
 */
export function exportPDF(targetTheme = null) {
  const currentTheme = appState.theme || document.documentElement.getAttribute('data-theme') || 'light';
  const themeToApply = targetTheme || currentTheme;
  const themeSuffix = (themeToApply === 'light') ? 'Light Theme' : 'Dark Theme';
  const baseTitle = getDocumentBaseTitle();
  const pdfFileName = `${baseTitle} - ${themeSuffix}`;

  const previousTitle = document.title;
  document.title = pdfFileName;

  const isSwitchNeeded = (themeToApply !== currentTheme);
  if (isSwitchNeeded) {
    setTheme(themeToApply);
  }

  showToast(`PDF প্রস্তুত হচ্ছে: "${pdfFileName}.pdf"`, 2500);

  setTimeout(() => {
    window.print();

    // After print dialog closes, restore title and theme if it was switched
    setTimeout(() => {
      document.title = previousTitle;
      if (isSwitchNeeded) {
        setTheme(currentTheme);
      }
    }, 1500);
  }, isSwitchNeeded ? 140 : 40);
}

/**
 * Opens Dual Theme PDF Export Dialog
 */
export function openDualExportModal() {
  const modal = document.getElementById('dualExportModal');
  const baseTitle = getDocumentBaseTitle();
  const lightNameEl = document.getElementById('dualLightFileName');
  const darkNameEl = document.getElementById('dualDarkFileName');
  if (lightNameEl) lightNameEl.innerText = `${baseTitle} - Light Theme.pdf`;
  if (darkNameEl) darkNameEl.innerText = `${baseTitle} - Dark Theme.pdf`;

  if (modal) {
    modal.classList.add('open');
    pushModalHistory('dualExportModal');
  }
}

/**
 * Closes Dual Theme PDF Export Dialog
 */
export function closeDualExportModal() {
  const modal = document.getElementById('dualExportModal');
  if (modal) {
    modal.classList.remove('open');
    popModalHistory('dualExportModal');
  }
}

/**
 * Sequential One-Click Dual PDF Export Flow
 */
export function sequentialDualExport() {
  closeDualExportModal();
  showToast("ধাপ ১/২: প্রথমে Light Theme PDF প্রিন্ট/সেভ করুন...", 2800);
  exportPDF('light');

  setTimeout(() => {
    showToast("ধাপ ২/২: এখন Dark Theme PDF প্রিন্ট/সেভ করুন...", 3500);
    setTimeout(() => {
      exportPDF('dark');
    }, 1000);
  }, 2200);
}

/**
 * Wrapped Settings Modal Openers with Android History Support
 */
export function handleOpenSettingsModal() {
  openSettingsModal();
  pushModalHistory('settingsModal');
}

export function handleCloseSettingsModal() {
  closeSettingsModal();
  popModalHistory('settingsModal');
}

/**
 * Updates dynamic responsive scaling on mobile & tablet viewports
 * Completely fluid across tablet rotation (portrait <-> landscape)
 */
export function updateResponsivePageScale() {
  const viewportWidth = window.innerWidth;
  const html = document.documentElement;

  if (html.classList.contains('view-mode-actual')) {
    html.style.setProperty('--doc-preview-scale', '1');
    return;
  }

  const a4PixelWidth = 794; // Standard 210mm in 96dpi CSS px
  let horizontalPadding = 16;
  if (viewportWidth >= 1024) {
    horizontalPadding = 48;
  } else if (viewportWidth >= 768) {
    horizontalPadding = 28;
  }

  const availableWidth = viewportWidth - horizontalPadding;

  if (availableWidth < a4PixelWidth) {
    const scale = Math.max(0.35, Math.min(1, availableWidth / a4PixelWidth));
    html.style.setProperty('--doc-preview-scale', scale.toFixed(4));
  } else {
    html.style.setProperty('--doc-preview-scale', '1');
  }
}

/**
 * Toggles between "Fit to Screen" (scaled mobile preview) and "100% Print View"
 */
export function toggleViewMode() {
  const html = document.documentElement;
  const isActual = html.classList.toggle('view-mode-actual');
  const toggleBtnText = document.getElementById('viewModeBtnText');
  const fabViewTooltip = document.getElementById('fabViewTooltip');

  if (isActual) {
    if (toggleBtnText) toggleBtnText.innerText = 'Fit to Screen';
    if (fabViewTooltip) fabViewTooltip.innerText = 'Fit to Screen';
    showToast("প্রিভিউ মোড: ১০০% আসল প্রিন্ট সাইজ (হরাইজন্টাল প্যানিং চালু)");
  } else {
    if (toggleBtnText) toggleBtnText.innerText = '100% Zoom';
    if (fabViewTooltip) fabViewTooltip.innerText = '100% Zoom';
    showToast("প্রিভিউ মোড: স্ক্রিন ফিট (ট্যাবলেট/মোবাইলের মাপে ফিট)");
  }
  updateResponsivePageScale();
}

/**
 * Attaches Event Handlers for UI Buttons
 */
function bindUIEventListeners() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleAcademicTheme);
  }

  const printBtn = document.getElementById('printNowBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => exportPDF());
  }

  const settingsBtn = document.getElementById('openSettingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', handleOpenSettingsModal);
  }

  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', handleCloseSettingsModal);
  }

  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      saveAllSettings();
      popModalHistory('settingsModal');
    });
  }

  const resetContentBtn = document.getElementById('resetContentBtn');
  if (resetContentBtn) {
    resetContentBtn.addEventListener('click', resetDemoContent);
  }
}

// Window Lifecycle Orchestrator
window.addEventListener('DOMContentLoaded', () => {
  loadPersistedState();

  // Restore Theme from localStorage if present
  const savedTheme = localStorage.getItem('mutu_doc_theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    setTheme(savedTheme);
  } else {
    setTheme(appState.theme || 'dark');
  }

  // Bind Listeners
  bindUIEventListeners();
  initServiceWorker();
  initInstallPrompt();
  initNetworkStatusListener();

  // Initial Responsive Sizing & Auto-Pagination
  updateResponsivePageScale();
  runAutoPagination(appState);

  // Re-run once web fonts finish loading to prevent layout shifts
  if (document.fonts) {
    document.fonts.ready.then(() => {
      updateResponsivePageScale();
      runAutoPagination(appState);
    });
  }

  // Pure Native Android PWA Standalone Detection
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);

  if (isStandalone) {
    // In standalone mode, user is already installed and using the native app
    localStorage.setItem('mutu_intro_dismissed', 'true');
    const pwaBtn = document.getElementById('pwaInstallBtn');
    if (pwaBtn) pwaBtn.style.display = 'none';
    const banner = document.getElementById('pwaDirectInstallBanner');
    if (banner) banner.style.display = 'none';
  } else {
    // Check and display PWA Intro on first browser visit only
    const introDismissed = localStorage.getItem('mutu_intro_dismissed');
    if (!introDismissed) {
      setTimeout(() => {
        openPWAIntro();
      }, 700);
    }
  }

  // Close FAB circular menu when clicking outside
  document.addEventListener('click', (e) => {
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu && !fabMenu.contains(e.target)) {
      fabMenu.classList.remove('active');
    }
  });

  // Base history state for smooth Android back navigation
  try {
    if (!window.history.state) {
      window.history.replaceState({ root: true }, document.title);
    }
  } catch (err) {}
});

// Pure Android Hardware Back Button & Tab Navigation Engine
window.addEventListener('popstate', () => {
  // 1. If any modal dialog is open, close the topmost modal
  const openModals = document.querySelectorAll('.modal-overlay.open');
  if (openModals.length > 0) {
    const topModal = openModals[openModals.length - 1];
    topModal.classList.remove('open');
    return;
  }

  // 2. If FAB action menu is open, collapse it
  const fabMenu = document.getElementById('fabMenu');
  if (fabMenu && fabMenu.classList.contains('active')) {
    fabMenu.classList.remove('active');
    return;
  }

  // 3. Android Standalone Double-Back Exit Protection
  const isStandalone = window.__pwaIsStandalone ||
                       window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);
  if (isStandalone) {
    const now = Date.now();
    if (now - lastBackPressTime < 2200) {
      // User tapped back twice quickly: allow system to exit/minimize
      window.history.back();
    } else {
      lastBackPressTime = now;
      showToast("আর একবার ব্যাক বাটন চাপলে অ্যাপ থেকে বের হবেন", 2200);
      try {
        window.history.pushState({ root: true }, document.title);
      } catch (err) {}
    }
  }
});

// Hardware Keyboard Support for Android Tablets & Cases (Escape / Tab handling)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal-overlay.open');
    if (openModals.length > 0) {
      openModals[openModals.length - 1].classList.remove('open');
      return;
    }
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu && fabMenu.classList.contains('active')) {
      fabMenu.classList.remove('active');
    }
  }
});

// Debounced Window Resize & Orientation Change Handler
// Fluidly adapts scale without clearing DOM or crashing pagination!
let scaleDebounceTimer;
const handleViewportResize = () => {
  updateResponsivePageScale();
  clearTimeout(scaleDebounceTimer);
  scaleDebounceTimer = setTimeout(() => {
    updateResponsivePageScale();
  }, 200);
};

window.addEventListener('resize', handleViewportResize, { passive: true });
window.addEventListener('orientationchange', handleViewportResize, { passive: true });
if (window.screen && window.screen.orientation) {
  window.screen.orientation.addEventListener('change', handleViewportResize, { passive: true });
}

// Global Window Exports for direct HTML onclick binding & console access
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.setTheme = setTheme;
  window.toggleAcademicTheme = toggleAcademicTheme;
  window.toggleFabMenu = toggleFabMenu;
  window.openSettingsModal = handleOpenSettingsModal;
  window.closeSettingsModal = handleCloseSettingsModal;
  window.switchSettingsTab = switchSettingsTab;
  window.toggleCustomCoverBox = toggleCustomCoverBox;
  window.saveAllSettings = saveAllSettings;
  window.resetDemoContent = resetDemoContent;
  window.runAutoPagination = () => runAutoPagination(appState);
  window.openIOSInstallDialog = openIOSInstallDialog;
  window.closeIOSInstallDialog = closeIOSInstallDialog;
  window.openPWAFrameModal = openPWAFrameModal;
  window.closePWAFrameModal = closePWAFrameModal;
  window.openPWADiagnosticModal = openPWADiagnosticModal;
  window.closePWADiagnosticModal = closePWADiagnosticModal;
  window.forceTriggerPWAInstall = forceTriggerPWAInstall;
  window.triggerPWAInstall = triggerPWAInstall;
  window.openPWAIntro = openPWAIntro;
  window.closePWAIntro = closePWAIntro;
  window.triggerInstallFromIntro = triggerInstallFromIntro;
  window.requestNotificationPermissionAndSendDemo = requestNotificationPermissionAndSendDemo;
  window.showToast = showToast;
  window.getDocumentBaseTitle = getDocumentBaseTitle;
  window.exportPDF = exportPDF;
  window.openDualExportModal = openDualExportModal;
  window.closeDualExportModal = closeDualExportModal;
  window.sequentialDualExport = sequentialDualExport;
  window.updateResponsivePageScale = updateResponsivePageScale;
  window.toggleViewMode = toggleViewMode;
}
