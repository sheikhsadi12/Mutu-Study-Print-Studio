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
  if (theme === 'light') {
    if (btnIcon) btnIcon.innerText = '🌙';
    if (btnText) btnText.innerText = 'Switch to Dark Mahogany';
  } else {
    if (btnIcon) btnIcon.innerText = '☀️';
    if (btnText) btnText.innerText = 'Switch to Warm White';
  }

  localStorage.setItem('mutu_doc_theme', theme);
  setTimeout(() => runAutoPagination(appState), 40);
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
        }
      } else if (isIOS) {
        openIOSInstallDialog();
      } else {
        alert("অ্যাপটি ইনস্টল করতে আপনার ব্রাউজারের অ্যাড্রেস বারের Install (⬇) বা মেনু থেকে 'Add to Home Screen' ক্লিক করুন।");
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
    }
  } else {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    if (isIOS) {
      openIOSInstallDialog();
    } else {
      alert("অ্যাপটি ইনস্টল করতে আপনার ব্রাউজারের অ্যাড্রেস বারের Install (⬇) আইকন বা মেনু থেকে 'Add to Home Screen' ক্লিক করুন।");
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
    alert('দুঃখিত, এই ব্রাউজারটিতে ওয়েব নোটিফিকেশন সুবিধা পাওয়া যায়নি।');
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
      alert('নোটিফিকেশন অনুমতি ব্লক করা রয়েছে। ব্রাউজারের সাইট সেটিংস থেকে নোটিফিকেশন এলাও করুন।');
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

  // Initial Auto-Pagination
  runAutoPagination(appState);

  // Re-run once web fonts finish loading to prevent layout shifts
  if (document.fonts) {
    document.fonts.ready.then(() => {
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
});

// Debounced Window Resize Handler for Real-Time Auto-Pagination
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => runAutoPagination(appState), 150);
});

// Global Window Exports for direct HTML onclick binding & console access
if (typeof window !== 'undefined') {
  window.appState = appState;
  window.setTheme = setTheme;
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
  window.openPWAIntro = openPWAIntro;
  window.closePWAIntro = closePWAIntro;
  window.triggerInstallFromIntro = triggerInstallFromIntro;
  window.requestNotificationPermissionAndSendDemo = requestNotificationPermissionAndSendDemo;
}
