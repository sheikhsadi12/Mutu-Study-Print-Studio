# MUTU STUDY A4 Auto-Pagination & Educational Publishing Studio

A production-ready, modular Progressive Web App (PWA) for generating academic lecture notes, bilingual study compendiums, and print-perfect A4 PDFs (`210mm x 297mm`).

---

## 🎨 থিম ও আইকন কনফিগারেশন (Theme & Icon Enhancements)

### ১. মূল লাইট থিম (Warm White - Authentic Academic Colors)
- ব্যবহারকারীর মূল স্পেসিফিকেশন অনুযায়ী লাইট মোডের সকল রঙ পুনরুদ্ধার করা হয়েছে:
  - বডি ও টেক্সট কালার: ডিপ অ্যারিস্টোক্রেটিক ডার্ক মেরুন-বার্গান্ডি (`#4A1112`, `#710E29`, `#1F1B1C`) — কোনো অতিরিক্ত লালচে ভাব নেই।
  - পেজ ও ব্যাকগ্রাউন্ড: মার্জিত আইভরি ওয়ার্ম হোয়াইট (`#FDFBF7`, `#F4EFE6`, `#EFE9DE`)।
  - অ্যাকসেন্ট গোল্ড: রাজকীয় একাডেমিক গোল্ড (`#D6A13B`, `#C7892E`)।
- অ্যাপের প্রধান ডিফল্ট থিম হিসেবে লাইট মোড চালু থাকে এবং টগল বাটনে ক্লিক করলে তাৎক্ষণিকভাবে ডার্ক মেহগনি থিমে রূপান্তর ঘটে।

### ২. পিডব্লিউএ (PWA) অ্যাপ আইকন
- **ওয়ার্ম হোয়াইট ব্যাকগ্রাউন্ড (`#FDFBF7`):** অ্যাপ ইনস্টল করার পর ডিভাইসের হোমস্ক্রিনে লাইট মোডের সাথে ম্যাচ করা প্রিমিয়াম ওয়ার্ম হোয়াইট ব্যাকগ্রাউন্ডের মূল আইকনটি প্রদর্শিত হবে।
- **ক্যাপ ছাড়া মূল এমব্লেম (No Cap on App Icon):** ব্যবহারকারীর নির্দেশনানুযায়ী গ্র্যাজুয়েশন ক্যাপটি শুধুমাত্র মূল লোগোর নামের ‘S’ অক্ষরের উপরে লক করা আছে। অ্যাপ আইকন এবং ওয়াটারমার্কে কোনো ক্যাপ থাকবে না—এখানে প্রদর্শিত হচ্ছে ৪টি জ্যামিতিক ফোল্ডেড রিবনের পিওর মাস্টার এমব্লেম।

### ৩. অ্যাডভান্সড পুশ নোটিফিকেশন ও স্ট্যাটাস বার ব্যাজ আইকন
- অ্যান্ড্রয়েড ও আধুনিক ডিভাইসে নোটিফিকেশন আসার পর ঘড়ির সময়/তারিখের পাশে সিস্টেম স্ট্যাটাস বারে দেখানোর জন্য পিওর হোয়াইট মনোক্রোম পিএনজি ব্যাজ (`badge-72x72.png`, `badge-96x96.png`) যুক্ত করা হয়েছে।
- অ্যাপের সেটিংস এবং ইন্ট্রো মোডাল থেকে সরাসরি **"🔔 নোটিফিকেশন টেস্ট করুন"** বাটন দিয়ে এই নোটিফিকেশন পরখ করে নেওয়া যাবে।

---

## 🚀 Vercel Zero-Config Deployment (ভার্সেলে এক ক্লিকে ডিপ্লয়)

এই প্রজেক্টটি Vercel-এ কোনো বাড়তি কনফিগারেশন ছাড়াই সরাসরি লাইভ হোস্ট করার জন্য সম্পূর্ণ তৈরি:

1. আপনার গিটহাব রিপোজিটরিতে কোড পুশ করুন।
2. [Vercel](https://vercel.com)-এ লগইন করে **"Add New Project"** সিলেক্ট করুন।
3. আপনার গিটহাব রিপোজিটরিটি ইমপোর্ট করুন।
4. **Build and Output Settings** অটোমেটিক ডিটেক্ট হবে (`dist` আউটপুট এবং `vite build`), কোনো পরিবর্তন করার প্রয়োজন নেই।
5. **Deploy** বাটনে ক্লিক করুন। ৫ সেকেন্ডের মধ্যে আপনার স্টুডিও লাইভ হয়ে যাবে এবং HTTPS, অফলাইন ক্যাশিং ও PWA নোটিফিকেশন সিস্টেম কার্যকর হবে!

---

## 📁 Modular Project Structure

```text
├── index.html              # Clean semantic HTML5 shell & PWA container
├── manifest.json           # Web App Manifest (PWA installability metadata)
├── sw.js                   # Service Worker (offline cache, push & notification badge)
├── vercel.json             # Vercel deployment headers & caching rules
├── public/                 # Production-ready public assets for Vite & Vercel
│
├── css/
│   ├── variables.css       # Design tokens, Dark Mahogany & Warm White Light themes
│   ├── typography.css      # Extended font library & ligature-safe Bengali typography
│   ├── layout.css          # Physical A4 dimensions, running headers/footers, @media print
│   ├── components.css      # Vocabulary matrix, grammar rules, tables, cards, mnemonics
│   ├── ui.css              # Screen top bar, tabbed settings modal, PWA intro & install UI
│   └── style.css           # Master CSS manifest importing all modular stylesheets
│
├── js/
│   ├── app.js              # Lifecycle controller, debounced theme switcher, PWA installer
│   ├── paginator.js        # Dynamic DOM height-measuring auto-pagination engine
│   ├── cover-studio.js     # Royal, Minimal, Seal & Custom HTML cover page engines
│   ├── settings.js         # Tabbed modal controller & LocalStorage persistence
│   └── demo-content.js     # Master 2X SVG defs & default academic lecture content
│
└── icons/
    ├── icon.svg            # Scalable Warm White vector logo (no cap)
    ├── icon-192.png        # PWA 192x192 icon for mobile home screens
    ├── icon-512.png        # PWA 512x512 splash screen & maskable icon
    ├── apple-touch-icon.png# iOS Safari 180x180 touch icon
    ├── badge.svg           # Pure white monochrome emblem for notification status bar
    ├── badge-72x72.png     # Android status bar notification badge (72x72)
    └── badge-96x96.png     # Android status bar notification badge (96x96)
```
