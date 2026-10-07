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

/**
 * Dual-Theme Switcher (Dark Mahogany <-> Warm White Light)
 */
export function toggleAcademicTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme');
  const btnIcon = document.getElementById('themeBtnIcon');
  const btnText = document.getElementById('themeBtnText');

  if (currentTheme === 'dark') {
    appState.theme = 'light';
    htmlEl.setAttribute('data-theme', 'light');
    if (btnIcon) btnIcon.innerText = '🌙';
    if (btnText) btnText.innerText = 'Switch to Dark Mahogany';
  } else {
    appState.theme = 'dark';
    htmlEl.setAttribute('data-theme', 'dark');
    if (btnIcon) btnIcon.innerText = '☀️';
    if (btnText) btnText.innerText = 'Switch to Warm White (Light)';
  }

  localStorage.setItem('mutu_doc_theme', appState.theme);
  setTimeout(() => runAutoPagination(appState), 50);
}

/**
 * Initializes PWA Service Worker Registration
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Register with relative path so it deploys on any subpath or root
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
    // Prevent Chromium 76 and later from automatically showing prompt
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
  });

  if (installBtn) {
    // If on iOS and not standalone, show install button to provide guided instructions
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
        }
      } else if (isIOS) {
        openIOSInstallDialog();
      } else {
        // Fallback tip for desktop/browser
        alert("অ্যাপটি ইনস্টল করতে আপনার ব্রাউজারের অ্যাড্রেস বারের Install (⬇) বা মেনু থেকে 'Add to Home Screen' ক্লিক করুন।");
      }
    });
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
 * Attaches Event Handlers for UI Buttons
 */
function bindUIEventListeners() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleAcademicTheme);
  }

  const printBtn = document.getElementById('printNowBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
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
  if (savedTheme) {
    appState.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btnIcon = document.getElementById('themeBtnIcon');
    const btnText = document.getElementById('themeBtnText');
    if (savedTheme === 'light') {
      if (btnIcon) btnIcon.innerText = '🌙';
      if (btnText) btnText.innerText = 'Switch to Dark Mahogany';
    } else {
      if (btnIcon) btnIcon.innerText = '☀️';
      if (btnText) btnText.innerText = 'Switch to Warm White (Light)';
    }
  }

  // Bind Listeners
  bindUIEventListeners();
  initServiceWorker();
  initInstallPrompt();
  initNetworkStatusListener();

  // Initial Auto-Pagination
  runAutoPagination(appState);

  // Re-run once web fonts finish loading to prevent layout shifts
  if (document.fonts) {
    document.fonts.ready.then(() => {
      runAutoPagination(appState);
    });
  }
});

// Debounced Window Resize Handler for Real-Time Auto-Pagination
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => runAutoPagination(appState), 150);
});

// Global Window Exports for direct HTML onclick binding
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.toggleAcademicTheme = toggleAcademicTheme;
  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;
  window.switchSettingsTab = switchSettingsTab;
  window.toggleCustomCoverBox = toggleCustomCoverBox;
  window.saveAllSettings = saveAllSettings;
  window.resetDemoContent = resetDemoContent;
  window.runAutoPagination = () => runAutoPagination(appState);
  window.openIOSInstallDialog = openIOSInstallDialog;
  window.closeIOSInstallDialog = closeIOSInstallDialog;
}
