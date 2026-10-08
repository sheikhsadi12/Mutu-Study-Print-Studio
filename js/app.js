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
 * Initializes PWA Service Worker Registration
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Register with relative path for seamless hosting on Vercel or GitHub Pages
      const swUrl = './sw.js';
      navigator.serviceWorker.register(swUrl)
        .then((registration) => {
          console.log('[MUTU PWA] Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.warn('[MUTU PWA] Service Worker registration failed:', error);
        });
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
 * Configures In-App PWA Install Prompts (Android/Chromium & iOS)
 */
function initInstallPrompt() {
  const installBtn = document.getElementById('pwaInstallBtn');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator.standalone === true);

  if (isStandalone && installBtn) {
    installBtn.style.display = 'none';
    return;
  }

  // Detect iOS Safari
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('[MUTU PWA] Application was successfully installed.');
    deferredInstallPrompt = null;
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    closePWAIntro(true);
    showToast("MUTU STUDY অ্যাপটি সফলভাবে আপনার ডিভাইসে ইনস্টল হয়েছে!");
  });

  if (installBtn) {
    if (isIOS && !isStandalone) {
      installBtn.style.display = 'inline-flex';
    }

    installBtn.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        console.log('[MUTU PWA] User install choice:', outcome);
        deferredInstallPrompt = null;
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
          showToast("ইনস্টলেশন শুরু হয়েছে...");
        }
      } else if (isIOS) {
        openIOSInstallDialog();
      } else {
        showToast("ইনস্টল করতে ব্রাউজারের অ্যাড্রেস বারের Install (⬇) বা মেনু থেকে 'Add to Home Screen' ক্লিক করুন।");
      }
    });
  }
}

/**
 * Opens PWA Welcome & Intro Dialog
 */
export function openPWAIntro() {
  const modal = document.getElementById('pwaIntroModal');
  if (modal) modal.classList.add('open');
}

/**
 * Closes PWA Welcome & Intro Dialog
 * @param {boolean} dontShowAgain 
 */
export function closePWAIntro(dontShowAgain = false) {
  const modal = document.getElementById('pwaIntroModal');
  if (modal) modal.classList.remove('open');

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
  const installBtn = document.getElementById('pwaInstallBtn');

  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log('[MUTU PWA] Intro install choice:', outcome);
    deferredInstallPrompt = null;
    if (outcome === 'accepted' && installBtn) {
      installBtn.style.display = 'none';
      showToast("ইনস্টলেশন শুরু হয়েছে...");
    }
  } else {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    if (isIOS) {
      openIOSInstallDialog();
    } else {
      showToast("ইনস্টল করতে ব্রাউজারের অ্যাড্রেস বারের Install (⬇) বা মেনু থেকে 'Add to Home Screen' ক্লিক করুন।");
    }
  }
}

/**
 * Displays iOS Safari installation instructions modal
 */
export function openIOSInstallDialog() {
  const dialog = document.getElementById('iosInstallModal');
  if (dialog) dialog.classList.add('open');
}

export function closeIOSInstallDialog() {
  const dialog = document.getElementById('iosInstallModal');
  if (dialog) dialog.classList.remove('open');
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
    if (offlinePill) {
      if (!navigator.onLine) {
        offlinePill.classList.add('visible');
      } else {
        offlinePill.classList.remove('visible');
      }
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
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

  if (modal) modal.classList.add('open');
}

/**
 * Closes Dual Theme PDF Export Dialog
 */
export function closeDualExportModal() {
  const modal = document.getElementById('dualExportModal');
  if (modal) modal.classList.remove('open');
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
 * Updates dynamic responsive scaling on mobile & tablet viewports
 */
export function updateResponsivePageScale() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 860 && !document.documentElement.classList.contains('view-mode-actual')) {
    const a4PixelWidth = 794; // Standard 210mm in 96dpi CSS px
    const availableWidth = Math.max(280, viewportWidth - 20);
    const scale = Math.min(1, availableWidth / a4PixelWidth);
    document.documentElement.style.setProperty('--doc-preview-scale', scale.toFixed(4));
  } else {
    document.documentElement.style.setProperty('--doc-preview-scale', '1');
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
    showToast("প্রিভিউ মোড: মোবাইল ফিট (স্ক্রিনের মাপে ফিট)");
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
    settingsBtn.addEventListener('click', openSettingsModal);
  }

  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', closeSettingsModal);
  }

  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', saveAllSettings);
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

  // Check and display PWA Intro on first visit
  const introDismissed = localStorage.getItem('mutu_intro_dismissed');
  if (!introDismissed) {
    setTimeout(() => {
      openPWAIntro();
    }, 700);
  }

  // Close FAB circular menu when clicking outside
  document.addEventListener('click', (e) => {
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu && !fabMenu.contains(e.target)) {
      fabMenu.classList.remove('active');
    }
  });
});

// Debounced Window Resize & Orientation Change Handler
let resizeTimer;
const handleViewportResize = () => {
  updateResponsivePageScale();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => runAutoPagination(appState), 150);
};

window.addEventListener('resize', handleViewportResize);
window.addEventListener('orientationchange', handleViewportResize);

// Global Window Exports for direct HTML onclick binding & console access
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.setTheme = setTheme;
  window.toggleAcademicTheme = toggleAcademicTheme;
  window.toggleFabMenu = toggleFabMenu;
  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;
  window.switchSettingsTab = switchSettingsTab;
  window.toggleCustomCoverBox = toggleCustomCoverBox;
  window.saveAllSettings = saveAllSettings;
  window.resetDemoContent = resetDemoContent;
  window.runAutoPagination = () => runAutoPagination(appState);
  window.openIOSInstallDialog = openIOSInstallDialog;
  window.closeIOSInstallDialog = closeIOSInstallDialog;
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
