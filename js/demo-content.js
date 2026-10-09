/**
 * ============================================================================
 * MUTU STUDY A4 STUDIO — DEMO CONTENT & VECTOR ASSETS (demo-content.js)
 * Default raw lecture content pool & Master 2X Vector SVG Branding Defs
 * ============================================================================
 */

export const DEFAULT_DEMO_CONTENT = `
  <section class="chapter-hero-banner">
    <div>
      <h1>AI in The Classroom: Pros, Cons and The Role Of EdTech</h1>
      <div class="bn-sub">শ্রেণিকক্ষে কৃত্রিম বুদ্ধিমত্তা: সুবিধা, অসুবিধা এবং এডটেক কোম্পানিগুলোর ভূমিকা</div>
    </div>
    <div class="chapter-meta-pill">
      <span>By Olufemi Shonubi</span><br>
      <span>EdTech Specialist</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Reading Passage &bull; মূল পাঠ ও প্রাঞ্জল বঙ্গানুবাদ</div>
    <div class="bilingual-passage-card">
      <div class="passage-en">
        Artificial intelligence has the profound potential to revolutionise the way we learn and teach. As an indispensable tool in modern classrooms, AI can provide students with personalised learning experiences, automate repetitive administrative tasks, and deliver instant analytical feedback. It can grade assignments and quizzes, which frees up valuable time for teachers to engage in curriculum design and offer one-on-one mentorship. However, educators must critically address algorithmic bias and preserve human empathy in pedagogical environments.
      </div>
      <div class="passage-bn">
        কৃত্রিম বুদ্ধিমত্তা আমাদের শেখার এবং শেখানোর পদ্ধতিতে সুদূরপ্রসারী বৈপ্লবিক পরিবর্তন আনার ব্যাপক সম্ভাবনা রাখে। আধুনিক শ্রেণিকক্ষে একটি অপরিহার্য অনুষঙ্গ হিসেবে এআই শিক্ষার্থীদের স্বতন্ত্র চাহিদানুযায়ী শিক্ষার অভিজ্ঞতা প্রদান করতে পারে, শিক্ষকদের পুনরাবৃত্তিমূলক দাপ্তরিক কাজ স্বয়ংক্রিয় করতে পারে এবং তাৎক্ষণিক ফলাফল বিশ্লেষণ প্রদান করতে পারে। এটি অ্যাসাইনমেন্ট ও কুইজ মূল্যায়ন করতে পারে, যা শিক্ষকদের সময় বাঁচিয়ে পাঠ পরিকল্পনা প্রণয়ন এবং শিক্ষার্থীদের এককভাবে নিবিড় যত্ন নেওয়ার সুযোগ তৈরি করে। তবে শিক্ষাবিদদের অবশ্যই অ্যালগরিদমের পক্ষপাত নিরসন এবং শিক্ষাদানে মানবিক সহমর্মিতা রক্ষা করার বিষয়টি গুরুত্বের সাথে বিবেচনা করতে হবে।
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Contextual Insight &bull; প্রাসঙ্গিক তাৎপর্য ও ভাবার্থ</div>
    <div class="explanation-card">
      <strong>মূল ভাবার্থ:</strong> এই অনুচ্ছেদে কৃত্রিম বুদ্ধিমত্তার দ্বিমুখী প্রভাব নির্দেশ করা হয়েছে। এআই একদিকে যেমন গতানুগতিক শিক্ষার প্রশাসনিক প্রতিবন্ধকতা কমিয়ে <em>ব্যক্তিকেন্দ্রিক পাঠদান (Personalised Learning)</em> ত্বরান্বিত করে, অন্যদিকে এটি কখনোই শিক্ষকের মানবিক বিকল্প হতে পারে না। প্রযুক্তিকে শিক্ষকের প্রতিস্থাপক নয়, বরং সহায়ক হাতিয়ার হিসেবে ব্যবহার করাই এই পাঠের মূল লক্ষ্য।
    </div>
  </section>

  <section>
    <div class="module-heading">Key Vocabulary Matrix &bull; শব্দভাণ্ডার ও পদবিন্যাস</div>
    <div class="vocab-matrix-grid">
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Revolutionise</span><span class="vocab-badge">Verb</span></div>
        <div class="vocab-bn-meaning">বৈপ্লবিক পরিবর্তন ঘটানো</div>
        <div class="vocab-synonym">Syn: Transform radically</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Personalised</span><span class="vocab-badge">Adj</span></div>
        <div class="vocab-bn-meaning">ব্যক্তিকেন্দ্রিক / স্বতন্ত্র</div>
        <div class="vocab-synonym">Syn: Tailored, Custom</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Repetitive</span><span class="vocab-badge">Adj</span></div>
        <div class="vocab-bn-meaning">বারবার ঘটে এমন কাজ</div>
        <div class="vocab-synonym">Syn: Routine, Monotonous</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Pedagogy</span><span class="vocab-badge">Noun</span></div>
        <div class="vocab-bn-meaning">শিক্ষণবিজ্ঞান / পাঠদান নীতি</div>
        <div class="vocab-synonym">Syn: Teaching method</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Indispensable</span><span class="vocab-badge">Adj</span></div>
        <div class="vocab-bn-meaning">অপরিহার্য বা অত্যাবশ্যক</div>
        <div class="vocab-synonym">Syn: Essential, Vital</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Automate</span><span class="vocab-badge">Verb</span></div>
        <div class="vocab-bn-meaning">স্বয়ংক্রিয়ভাবে সম্পাদন</div>
        <div class="vocab-synonym">Syn: Mechanize, Digitize</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Algorithmic Bias</span><span class="vocab-badge">Noun</span></div>
        <div class="vocab-bn-meaning">অ্যালগরিদমের পক্ষপাত</div>
        <div class="vocab-synonym">Syn: Data prejudice</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Empathy</span><span class="vocab-badge">Noun</span></div>
        <div class="vocab-bn-meaning">সহমর্মিতা ও সহানুভূতি</div>
        <div class="vocab-synonym">Syn: Compassion</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Mentorship</span><span class="vocab-badge">Noun</span></div>
        <div class="vocab-bn-meaning">प्रत्यক্ষ পরামর্শ ও তত্ত্বাবধান</div>
        <div class="vocab-synonym">Syn: Guidance</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Proprietary</span><span class="vocab-badge">Adj</span></div>
        <div class="vocab-bn-meaning">ব্যক্তিমালিকানাধীন ব্যবস্থা</div>
        <div class="vocab-synonym">Syn: Privately owned</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Exacerbate</span><span class="vocab-badge">Verb</span></div>
        <div class="vocab-bn-meaning">তীব্রতর বা সংকটময় করা</div>
        <div class="vocab-synonym">Syn: Worsen, Aggravate</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">Scaffolding</span><span class="vocab-badge">Noun</span></div>
        <div class="vocab-bn-meaning">শিক্ষার্থীদের ক্রমান্বয়ে সহায়তা</div>
        <div class="vocab-synonym">Syn: Guided support</div>
      </div>
    </div>
  </section>

  <section class="explanation-card" style="padding: 6.5px 10px; font-size: 9pt;">
    <strong>গুরুত্বপূর্ণ ফ্রেজ ও প্রয়োগ (Collocations):</strong> 
    <em>'Have the potential to'</em> (সম্ভাবনা থাকা) &bull; 
    <em>'Free up teachers' time'</em> (সময় সাশ্রয় করা) &bull; 
    <em>'One-on-one attention'</em> (একক নিবিড় তত্ত্বাবধান) &bull; 
    <em>'Bridge the learning divide'</em> (শিক্ষার বৈষম্য দূর করা)।
  </section>

  <section class="sentence-breakdown-card">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:7.6pt; font-weight:700; color:var(--accent-primary); text-transform:uppercase;">Sentence Analytical Focus &bull; 01</span>
      <span style="font-size:7.2pt; color:var(--text-english-muted);">Textbook Line 06</span>
    </div>
    <div class="st-en">"Another distinct advantage of AI is its proven ability to automate repetitive tasks."</div>
    <div class="st-bn">"এআই-এর আরেকটি সুনির্দিষ্ট ইতিবাচক দিক হলো এর পুনরাবৃত্তিমূলক কাজগুলোকে স্বয়ংক্রিয় করার প্রমাণিত সক্ষমতা।"</div>
  </section>

  <section class="sentence-breakdown-card">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:7.6pt; font-weight:700; color:var(--accent-primary); text-transform:uppercase;">Sentence Analytical Focus &bull; 02</span>
      <span style="font-size:7.2pt; color:var(--text-english-muted);">Textbook Line 08</span>
    </div>
    <div class="st-en">"It can grade assignments and quizzes, which can free up teachers' valuable time for lesson planning."</div>
    <div class="st-bn">"এটি অ্যাসাইনমেন্ট এবং কুইজের দ্রুত মূল্যায়ন করতে পারে, যা শিক্ষকদের সময় বাঁচিয়ে সৃজনশীল পাঠ পরিকল্পনা প্রণয়নের সুযোগ দেয়।"</div>
  </section>

  <section class="grammar-analysis-card">
    <div class="grammar-rule-name">Rule 1: Non-defining Relative Clause with Parallel Gerunds</div>
    <div class="grammar-formula-chip">Main Clause, + which + Verb Phrase | such as + [Gerund-1 + and + Gerund-2]</div>
    <div class="grammar-explanation">
      কমা-পরবর্তী <strong>', which can free up...'</strong> অংশটি পূর্ববর্তী পূর্ণাঙ্গ বক্তব্যের ফলাফল নির্দেশ করতে ব্যবহূত হয়েছে। এছাড়া প্রিপজিশনাল ফ্রেজ 'such as'-এর পরে <strong>'planning'</strong> ও <strong>'providing'</strong> সমান্তরাল জেরান্ড (Parallelism) বজায় রেখেছে।
    </div>
    <div class="grammar-example-row">
      <span class="example-en">Ex: The school introduced digital labs, which significantly improved student engagement.</span><br>
      <span class="example-bn">বঙ্গানুবাদ: বিদ্যালয়টি ডিজিটাল ল্যাব চালু করেছিল, যা শিক্ষার্থীদের সম্পৃক্ততা লক্ষণীয়ভাবে বৃদ্ধি করেছিল।</span>
    </div>
  </section>

  <section class="grammar-analysis-card">
    <div class="grammar-rule-name">Rule 2: Adjectival Infinitive Modifying Noun of Capacity</div>
    <div class="grammar-formula-chip">Subject + Linking Verb + Complement [Noun (ability/potential) + to + Verb₁]</div>
    <div class="grammar-explanation">
      'Ability', 'Opportunity', বা 'Potential'-এর মতো বিমূর্ত নাউনের পর বসা <code>to + Verb₁</code> এডজেক্টিভ হিসেবে নাউনের উদ্দেশ্য বা কার্যকারিতা সংজ্ঞায়িত করে।
    </div>
    <div class="grammar-example-row">
      <span class="example-en">Ex: Students develop the ability to think critically when challenged with complex problems.</span><br>
      <span class="example-bn">বঙ্গানুবাদ: জটিল সমস্যার মুখোমুখি হলে শিক্ষার্থীরা সমালোচনামূলক চিন্তা করার সক্ষমতা অর্জন করে।</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Comparative Analysis &bull; এআই বনাম মানব শিক্ষকের ভূমিকা</div>
    <table class="academic-table">
      <thead>
        <tr>
          <th style="width: 22%;">Domain (ক্ষেত্র)</th>
          <th style="width: 39%;">AI Capabilities (এআই-এর ভূমিকা)</th>
          <th style="width: 39%;">Human Teacher Role (শিক্ষকের ভূমিকা)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="font-weight:700;">Task Automation</td>
          <td class="bn-cell">দ্রুত গ্রেডিং, রুটিন হাজিরা ও ডেটা সংরক্ষণ।</td>
          <td class="bn-cell">কৌশলগত সিদ্ধান্ত, প্রশ্ন প্রণয়ন ও নিয়ন্ত্রণ।</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Instruction Model</td>
          <td class="bn-cell">ব্যক্তিগত গতির সাথে ডেটাভিত্তিক অভিযোজন।</td>
          <td class="bn-cell">অনুপ্রেরণা, নৈতিক শিক্ষা ও সরাসরি মেন্টরিং।</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Emotional Support</td>
          <td class="bn-cell">সীমাবদ্ধ (মানবিক অনুভূতি শনাক্তে অক্ষম)।</td>
          <td class="bn-cell">সহমর্মিতা, মানসিক যত্ন ও চরিত্র গঠন।</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="teachers-corner-card">
    <div class="tc-header">
      <span class="tc-title">TEACHER'S CORNER &bull; বিশ্ববিদ্যালয় ভর্তি ও বোর্ড পরীক্ষার স্পেশাল হ্যাকস</span>
      <span class="tc-tag">BUET &bull; DU &bull; BOARD EXAM</span>
    </div>
    <div class="tc-grid">
      <div class="tc-item"><strong>১. ইনফিনিটিভ নাউন মডিফায়ার:</strong> 'Ability', 'Opportunity'-এর পর সরাসরি <code>to + Verb₁</code> বসে।</div>
      <div class="tc-item"><strong>২. ফ্রিহ্যান্ড রাইটিং হ্যাক:</strong> <em>'free up teachers' time'</em> ফ্রেজটি ব্যবহার করলে লেখার শৈলী বৃদ্ধি পায়।</div>
    </div>
  </section>

  <section class="editorial-quote-box">
    <div class="quote-en">"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important."</div>
    <div class="quote-bn">— প্রযুক্তি শুধুই একটি সহায়ক হাতিয়ার; শিক্ষার্থীদের উৎসাহিত করার ক্ষেত্রে শিক্ষকের ভূমিকাই সর্বাগ্রে।</div>
  </section>

  <section class="mnemonic-ribbon">
    <span class="mnemonic-pill">ছন্দ কর্নার</span>
    <div class="mnemonic-text">"<em>ইনফিনিটিভে উদ্দেশ্য</em> প্রকাশ পায়, <em>কমা-হুইচে আগের ক্লজ</em> বোঝায়; <em>জেরান্ডে পাই আই-এন-জি</em>, ইংলিশ গ্রামার তবেই ইজি!"</div>
  </section>

  <section class="practice-question-card">
    <div class="pq-title">Question 01 (Vocabulary Focus)</div>
    <div class="pq-content">
      <strong>What is the closest contextual synonym for 'Indispensable'?</strong><br>
      (a) Superfluous &nbsp;&nbsp;&nbsp; (b) Imperative / Essential &nbsp;&nbsp;&nbsp; (c) Optional
    </div>
    <div class="pq-answer"><strong>সঠিক উত্তর:</strong> (b) Imperative / Essential</div>
  </section>

  <section class="explanation-card" style="padding: 6.5px 10px; font-size: 8.8pt;">
    <strong>পরীক্ষার্থীদের জন্য বিশেষ দিকনির্দেশনা:</strong> 
    বোর্ড পরীক্ষায় ফ্রি-হ্যান্ড রাইটিংয়ে ভালো নম্বর পেতে প্রতিটি ইউনিটের টেক্সটবুক ভিত্তিক শব্দার্থ এবং জটিল বাক্যের গঠন নিয়মিত নিজে লেখার চর্চা বজায় রাখা জরুরি।
  </section>
`;

// Master SVG Defs for 2X Scaled Logo
export const SVG_DEFS = `
  <defs>
    <style>
      .logo-fn { font-family: 'Cinzel Decorative', Georgia, serif; font-weight: 700; font-size: 130px; fill: var(--logo-text-color); }
      .logo-bs { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 110px; fill: var(--logo-text-color); }
    </style>
    <linearGradient id="m-left-fill" x1="91" y1="46" x2="121" y2="323" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--logo-left-1)"/><stop offset="49%" stop-color="var(--logo-left-2)"/><stop offset="100%" stop-color="var(--logo-left-3)"/>
    </linearGradient>
    <linearGradient id="m-center-fill" x1="290" y1="105" x2="183" y2="276" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--logo-center-1)"/><stop offset="52%" stop-color="var(--logo-center-2)"/><stop offset="100%" stop-color="var(--logo-center-3)"/>
    </linearGradient>
    <linearGradient id="m-gold-upper" x1="291" y1="27" x2="243" y2="168" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--logo-gold-1)"/><stop offset="50%" stop-color="var(--logo-gold-2)"/><stop offset="100%" stop-color="var(--logo-gold-3)"/>
    </linearGradient>
    <linearGradient id="m-gold-lower" x1="190" y1="214" x2="195" y2="283" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="var(--logo-gold-1)"/><stop offset="50%" stop-color="var(--logo-gold-2)"/><stop offset="100%" stop-color="var(--logo-gold-3)"/>
    </linearGradient>
    <linearGradient id="m-cap-board" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="var(--logo-cap-board-1)"/><stop offset="50%" stop-color="var(--logo-cap-board-2)"/><stop offset="100%" stop-color="var(--logo-cap-board-3)"/>
    </linearGradient>
    <linearGradient id="m-cap-gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--logo-gold-1)"/><stop offset="50%" stop-color="var(--logo-gold-2)"/><stop offset="100%" stop-color="var(--logo-gold-3)"/>
    </linearGradient>
  </defs>
`;

/**
 * Generates Scaled 2X Master SVG Logo
 * @param {number} height - Rendered height in pixels
 * @returns {string} SVG HTML string
 */
export function getLogoSVG(height = 38) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 220" style="height: ${height}px; width: auto;" role="img" aria-label="MUTU STUDY Master Logo">
      ${SVG_DEFS}
      <g transform="translate(-20, 42) scale(0.492)">
        <path fill="url(#m-left-fill)" d="M 58.05,46.45 L 147.48,97.94 C 162.85,106.75 170.78,120.15 170.78,135.43 L 170.78,322.16 L 75.14,267.86 C 64.14,261.61 58.05,252.95 58.05,240.17 Z"/>
        <path fill="url(#m-center-fill)" d="M 290.75,104.54 L 199.54,166.45 C 191.19,172.12 186.69,176.00 186.69,183.09 C 186.69,190.18 191.61,195.98 199.66,200.23 L 246.45,224.91 C 257.11,230.52 261.78,238.05 261.78,246.31 C 261.78,254.48 258.67,261.18 249.36,267.17 L 192.14,303.51 C 188.45,305.85 186.74,308.03 186.74,311.14 L 186.74,323.27 L 275.19,269.26 C 285.43,263.01 290.75,254.51 290.75,241.91 Z"/>
        <path fill="url(#m-gold-upper)" d="M 291.42,26.78 L 210.28,81.46 C 196.41,90.76 188.85,101.12 188.85,116.95 L 188.85,152.66 L 278.07,92.10 C 287.35,85.81 291.42,77.74 291.42,66.92 Z"/>
        <path fill="url(#m-gold-lower)" d="M 189.52,214.14 L 230.66,235.55 C 235.16,237.89 237.36,240.63 237.36,245.66 C 237.36,250.43 235.55,253.07 231.10,255.96 L 189.52,283.43 Z"/>
      </g>
      <text x="158" y="164"><tspan class="logo-fn">M</tspan><tspan class="logo-bs">utu</tspan></text>
      <text x="470" y="164" class="logo-fn">S</text>
      <text x="558" y="164" class="logo-bs">tudy</text>
      <g transform="translate(448, 16) scale(0.08)">
        <path d="M 460 340 L 1110 340 L 1108 642 C 970 638, 840 622, 730 622 C 610 622, 500 700, 460 760 Z" fill="var(--logo-cap-base)"/>
        <path d="M 160 280 L 800 75 L 1440 280 L 800 490 Z" fill="url(#m-cap-board)"/>
        <path d="M 160 280 L 800 490 L 800 508 L 160 298 Z" fill="var(--logo-cap-edge-left)"/>
        <path d="M 800 490 L 1440 280 L 1440 298 L 800 508 Z" fill="var(--logo-cap-edge-right)"/>
        <path d="M 160 280 L 800 490 L 1440 280" stroke="var(--logo-cap-ridge)" stroke-width="4" fill="none"/>
        <ellipse cx="800" cy="285" rx="42" ry="29" fill="url(#m-cap-gold)"/>
        <path d="M 800 288 C 670 306 500 348 375 398 C 335 415 322 440 324 472" stroke="var(--logo-tassel-cord)" stroke-width="20" stroke-linecap="round" fill="none"/>
        <circle cx="324" cy="475" r="28" fill="var(--logo-knot-circle)"/>
        <path d="M 296 510 L 352 510 L 360 620 L 288 620 Z" fill="url(#m-cap-gold)"/>
      </g>
    </svg>
  `;
}

/**
 * Generates Subtle Anti-Piracy Watermark SVG
 * @returns {string} Watermark HTML container string
 */
export function getWatermarkSVG() {
  return `
    <div class="page-watermark" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 20 250 310">
        ${SVG_DEFS}
        <g>
          <path fill="url(#m-left-fill)" d="M 58.05,46.45 L 147.48,97.94 C 162.85,106.75 170.78,120.15 170.78,135.43 L 170.78,322.16 L 75.14,267.86 C 64.14,261.61 58.05,252.95 58.05,240.17 Z"/>
          <path fill="url(#m-center-fill)" d="M 290.75,104.54 L 199.54,166.45 C 191.19,172.12 186.69,176.00 186.69,183.09 C 186.69,190.18 191.61,195.98 199.66,200.23 L 246.45,224.91 C 257.11,230.52 261.78,238.05 261.78,246.31 C 261.78,254.48 258.67,261.18 249.36,267.17 L 192.14,303.51 C 188.45,305.85 186.74,308.03 186.74,311.14 L 186.74,323.27 L 275.19,269.26 C 285.43,263.01 290.75,254.51 290.75,241.91 Z"/>
          <path fill="url(#m-gold-upper)" d="M 291.42,26.78 L 210.28,81.46 C 196.41,90.76 188.85,101.12 188.85,116.95 L 188.85,152.66 L 278.07,92.10 C 287.35,85.81 291.42,77.74 291.42,66.92 Z"/>
          <path fill="url(#m-gold-lower)" d="M 189.52,214.14 L 230.66,235.55 C 235.16,237.89 237.36,240.63 237.36,245.66 C 237.36,250.43 235.55,253.07 231.10,255.96 L 189.52,283.43 Z"/>
        </g>
      </svg>
    </div>
  `;
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.DEFAULT_DEMO_CONTENT = DEFAULT_DEMO_CONTENT;
  window.SVG_DEFS = SVG_DEFS;
  window.getLogoSVG = getLogoSVG;
  window.getWatermarkSVG = getWatermarkSVG;
}
