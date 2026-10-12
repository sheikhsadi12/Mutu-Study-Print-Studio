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

// Multi-Subject Templates Pool (Physics, Chemistry, Math, Bangla, English)
export const SUBJECT_DEMO_TEMPLATES = {
  english: DEFAULT_DEMO_CONTENT,

  physics: `
  <section class="chapter-hero-banner">
    <div>
      <h1>Physics 1st Paper &bull; Vector Mechanics &amp; Gravitation</h1>
      <div class="bn-sub">অধ্যায় ০২ ও ০৬: ভেক্টর বিশ্লেষণ, গতিসূত্র এবং নিউটনীয় মহাকর্ষ বলবিদ্যা</div>
    </div>
    <div class="chapter-meta-pill">
      <span>HSC Academic Core</span><br>
      <span>Physics Department</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Kinematics &amp; Motion &bull; প্রক্ষেপক বা প্রাসের গতিবিদ্যা (Projectile Motion)</div>
    <div class="physics-diagram-card">
      <div class="physics-diagram-header">
        <span class="physics-diagram-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>প্রক্ষেপকের পরাবৃত্তাকার গতিপথ (Parabolic Trajectory Diagram)</span>
        </span>
        <span class="physics-diagram-badge">অধ্যায় ০৩: গতিবিদ্যা</span>
      </div>

      <div class="physics-diagram-svg-wrap">
        <svg viewBox="0 0 520 225" xmlns="http://www.w3.org/2000/svg" aria-label="Projectile Motion Vector Diagram">
          <defs>
            <marker id="arrow-ax" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--text-english-muted)" />
            </marker>
            <marker id="arrow-v0" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L8,3.5 z" fill="var(--accent-primary)" />
            </marker>
            <marker id="arrow-comp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--accent-secondary)" />
            </marker>
            <linearGradient id="traj-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="var(--accent-primary)" />
              <stop offset="50%" stop-color="#D6A13B" />
              <stop offset="100%" stop-color="var(--accent-secondary)" />
            </linearGradient>
          </defs>

          <!-- Axes -->
          <line x1="40" y1="180" x2="480" y2="180" stroke="var(--border-color)" stroke-width="2" marker-end="url(#arrow-ax)" />
          <line x1="50" y1="190" x2="50" y2="25" stroke="var(--border-color)" stroke-width="2" marker-end="url(#arrow-ax)" />
          <text x="485" y="184" font-size="11" font-weight="700" fill="var(--text-english)">x (m)</text>
          <text x="45" y="20" font-size="11" font-weight="700" fill="var(--text-english)">y (m)</text>
          <text x="32" y="196" font-size="11" fill="var(--text-english-muted)">O(0,0)</text>

          <!-- Parabolic Trajectory -->
          <path d="M 50 180 Q 250 10 450 180" fill="none" stroke="url(#traj-grad)" stroke-width="3" stroke-linecap="round" />
          
          <!-- Launch Vector v0 -->
          <line x1="50" y1="180" x2="135" y2="95" stroke="var(--accent-primary)" stroke-width="2.6" marker-end="url(#arrow-v0)" />
          <text x="138" y="92" font-size="12" font-weight="800" fill="var(--accent-primary)">v&#8320;</text>

          <!-- Component Vectors at Launch -->
          <line x1="50" y1="180" x2="130" y2="180" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrow-comp)" />
          <text x="80" y="195" font-size="9.5" font-weight="600" fill="var(--accent-secondary)">v&#8320;&#8339; = v&#8320;cos&theta;&#8320;</text>
          <line x1="50" y1="180" x2="50" y2="105" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrow-comp)" />
          <text x="56" y="115" font-size="9.5" font-weight="600" fill="var(--accent-secondary)">v&#8320;&#7522; = v&#8320;sin&theta;&#8320;</text>

          <!-- Angle Arc -->
          <path d="M 85 180 A 35 35 0 0 0 75 155" fill="none" stroke="#D6A13B" stroke-width="2" />
          <text x="92" y="168" font-size="11" font-weight="700" fill="#D6A13B">&theta;&#8320;</text>

          <!-- Max Height Peak H (Point P) -->
          <circle cx="250" cy="95" r="4.5" fill="#D6A13B" stroke="var(--accent-primary)" stroke-width="2" />
          <line x1="250" y1="95" x2="250" y2="180" stroke="var(--text-english-muted)" stroke-width="1.4" stroke-dasharray="4,3" />
          <!-- Peak Horizontal Velocity -->
          <line x1="250" y1="95" x2="310" y2="95" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrow-v0)" />
          <text x="315" y="98" font-size="9.5" font-weight="600" fill="var(--accent-primary)">v&#8339; = v&#8320;cos&theta;&#8320; (v&#7522; = 0)</text>
          <text x="210" y="140" font-size="11" font-weight="700" fill="#D6A13B">H&#7522;&#8336;&#8339;</text>

          <!-- Landing Point (Range R) -->
          <circle cx="450" cy="180" r="4.5" fill="var(--accent-secondary)" />
          <text x="440" y="200" font-size="10.5" font-weight="700" fill="var(--accent-secondary)">(R, 0)</text>

          <!-- Range Measurement Line below -->
          <line x1="50" y1="210" x2="450" y2="210" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <line x1="50" y1="205" x2="50" y2="215" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <line x1="450" y1="205" x2="450" y2="215" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <text x="230" y="218" font-size="10.5" font-weight="700" fill="var(--accent-secondary)">অনুভূমিক পাল্লা (Range, R)</text>
        </svg>
      </div>

      <div class="physics-diagram-caption">
        <strong>চিত্র ৩.১:</strong> প্রক্ষেপকের পরাবৃত্তাকার গতিপথ (Parabolic Trajectory), সর্বোচ্চ উচ্চতা $H$ এবং অনুভূমিক পাল্লা $R$ এর চিত্ররূপ।
      </div>

      <div class="physics-formula-legend-grid">
        <div class="physics-legend-item">
          <strong>সর্বোচ্চ উচ্চতা ($H$):</strong><br>
          $H = \\frac{v_0^2 \\sin^2\\theta_0}{2g}$
        </div>
        <div class="physics-legend-item">
          <strong>উড্ডয়নকাল ($T$):</strong><br>
          $T = \\frac{2v_0 \\sin\\theta_0}{g}$
        </div>
        <div class="physics-legend-item">
          <strong>অনুভূমিক পাল্লা ($R$):</strong><br>
          $R = \\frac{v_0^2 \\sin 2\\theta_0}{g}$
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Scientific Law &bull; নিউটনীয় মহাকর্ষ সূত্র ও ভেক্টর রূপ</div>
    <div class="law-callout-box">
      <div class="law-header">
        <span class="law-badge">মহাকর্ষ সূত্র</span>
        <span class="law-source">Sir Isaac Newton (1687)</span>
      </div>
      <div class="law-text">
        মহাবিশ্বের প্রতিটি বস্তুকণা একে অপরকে নিজের দিকে আকর্ষণ করে এবং এই আকর্ষণ বলের মান বস্তুকণাদ্বয়ের ভরের গুণফলের সমানুপাতিক, এদের মধ্যকার দূরত্বের বর্গের ব্যস্তানুপাতিক এবং এই বল এদের সংযোজক সরলরেখা বরাবর ক্রিয়া করে।
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Mathematical Formulation &bull; গাণিতিক প্রতিপাদন ও সমীকরণ</div>
    <div class="math-formula-box">
      <div class="formula-badge">Gravitational Vector Law</div>
      <div class="formula-equation">
        $$\\vec{F}_{12} = -G \\frac{m_1 m_2}{r^2} \\hat{r}_{12}$$
      </div>
      <div class="formula-legend">
        <span>এখানে, $G = 6.673 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2\\text{/kg}^2$ (সর্বজনীন মহাকর্ষীয় ধ্রুবক)</span>
        <span>$\\hat{r}_{12}$ হলো একক ভেক্টর এবং ঋনাত্মক চিহ্ন নির্দেশ করে বলটি সর্বদা আকর্ষণধর্মী।</span>
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Vector Resolution &amp; Diagram &bull; ভেক্টর বিভাজন ও লব্ধি বিশ্লেষণ</div>
    <div class="science-concept-card">
      <div class="concept-title">
        <span>সামান্তরিক সূত্র (Parallelogram Law of Vectors)</span>
        <span class="concept-tag">বলবিদ্যা</span>
      </div>
      <div class="concept-body">
        যদি কোনো কণার ওপর একই সময়ে ক্রিয়ারত দুটি ভেক্টরকে $\\vec{P}$ ও $\\vec{Q}$ দ্বারা নির্দেশ করা হয় এবং তাদের মধ্যবর্তী কোণ $\\alpha$ হয়, তবে তাদের লব্ধির মান $R$ হবে:
        $$R = \\sqrt{P^2 + Q^2 + 2PQ \\cos\\alpha}$$
        এবং লব্ধির দিক $\\theta$:
        $$\\tan\\theta = \\frac{Q \\sin\\alpha}{P + Q \\cos\\alpha}$$
      </div>
    </div>

    <div class="diagram-svg-container">
      <svg viewBox="0 0 460 170" class="diagram-svg" aria-label="Vector Parallelogram Diagram">
        <!-- Grid baseline -->
        <line x1="40" y1="130" x2="420" y2="130" stroke="var(--border-color)" stroke-dasharray="3,3" />
        <!-- P vector -->
        <line x1="60" y1="130" x2="240" y2="130" stroke="var(--accent-primary)" stroke-width="2.5" marker-end="url(#arrow)" />
        <text x="140" y="150" fill="var(--accent-primary)" font-weight="700" font-size="12">P (ভেক্টর)</text>
        <!-- Q vector -->
        <line x1="60" y1="130" x2="160" y2="40" stroke="var(--accent-secondary)" stroke-width="2.5" />
        <text x="85" y="75" fill="var(--accent-secondary)" font-weight="700" font-size="12">Q (ভেক্টর)</text>
        <!-- Parallelogram dotted lines -->
        <line x1="240" y1="130" x2="340" y2="40" stroke="var(--text-english-muted)" stroke-dasharray="4,4" />
        <line x1="160" y1="40" x2="340" y2="40" stroke="var(--text-english-muted)" stroke-dasharray="4,4" />
        <!-- Resultant R vector -->
        <line x1="60" y1="130" x2="340" y2="40" stroke="#C1621A" stroke-width="3" />
        <text x="220" y="70" fill="#C1621A" font-weight="800" font-size="13">R (লব্ধি ভেক্টর)</text>
        <!-- Angle arc -->
        <path d="M 100 130 A 40 40 0 0 0 88 105" fill="none" stroke="var(--text-bengali)" stroke-width="1.5" />
        <text x="106" y="118" fill="var(--text-bengali)" font-size="11">&alpha;</text>
      </svg>
      <div class="diagram-caption">চিত্র ২.১: সামান্তরিক সূত্রে ভেক্টর $\\vec{P}$ ও $\\vec{Q}$-এর লব্ধি $\\vec{R}$ নির্ধারণ।</div>
    </div>
  </section>

  <section>
    <div class="module-heading">Analytical Application &bull; বোর্ড ও ভর্তি পরীক্ষার গাণিতিক সমস্যা</div>
    <div class="practice-question-card">
      <div class="pq-title">বোর্ড স্ট্যান্ডার্ড সৃজনশীল প্রশ্ন (ঢাকা বোর্ড ২০২৪)</div>
      <div class="pq-content">
        দুটি সমান বলের লব্ধির বর্গ তাদের গুণফলের ৩ গুণ হলে বলদ্বয়ের মধ্যবর্তী কোণ $\\alpha$ এর মান নির্ণয় করো।
      </div>
      <div class="pq-answer">
        <strong>সমাধান:</strong> ধরি বলদ্বয় $P = Q$। প্রশ্নমতে, $R^2 = 3P \\cdot P = 3P^2$।<br>
        সূত্রমতে: $R^2 = P^2 + P^2 + 2P^2\\cos\\alpha \\implies 3P^2 = 2P^2(1 + \\cos\\alpha) \\implies 1 + \\cos\\alpha = \\frac{3}{2} \\implies \\cos\\alpha = \\frac{1}{2}$।<br>
        $\\therefore \\alpha = \\cos^{-1}(0.5) = 60^\\circ$। <em>(উত্তর: ৬০ ডিগ্রি)</em>
      </div>
    </div>
  </section>
  `,

  chemistry: `
  <section class="chapter-hero-banner">
    <div>
      <h1>Chemistry 2nd Paper &bull; Organic Electrophilic Substitution</h1>
      <div class="bn-sub">অধ্যায় ০২: জৈব রসায়ন &bull; বেনজিন বলয় এবং ইলেক্ট্রোফিলিক প্রতিস্থাপন কৌশল</div>
    </div>
    <div class="chapter-meta-pill">
      <span>HSC Academic Core</span><br>
      <span>Department of Chemistry</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Reaction Profile &bull; বেনজিনের নাইট্রেশন বিক্রিয়া (Nitration of Benzene)</div>
    <div class="chem-reaction-row">
      <span><strong>বিক্রিয়ক:</strong> C<sub>6</sub>H<sub>6</sub> + HNO<sub>3</sub></span>
      <span style="font-size:16px; color:var(--accent-primary);">&rarr; [গাঢ় H<sub>2</sub>SO<sub>4</sub>, ৫৫°C] &rarr;</span>
      <span><strong>উৎপাদ:</strong> C<sub>6</sub>H<sub>5</sub>NO<sub>2</sub> + H<sub>2</sub>O</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Structural Grid &bull; গুরুত্বপূর্ণ অ্যারোমেটিক যৌগসমূহের আণবিক গঠন</div>
    <div class="chem-grid">
      <div class="chem-box">
        <svg viewBox="0 0 100 120" style="width: 82px; height: 96px; overflow: visible;">
          <!-- Benzene Ring -->
          <polygon points="50,26 80,43 80,77 50,94 20,77 20,43" fill="none" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="50" cy="60" r="20" fill="none" stroke="var(--accent-secondary)" stroke-width="1.8" stroke-dasharray="3.5,2"/>
        </svg>
        <div class="title">বেনজিন (Benzene)</div>
        <div class="formula">C<sub>6</sub>H<sub>6</sub></div>
      </div>

      <div class="chem-box">
        <svg viewBox="0 0 100 120" style="width: 82px; height: 96px; overflow: visible;">
          <!-- Toluene -->
          <text x="50" y="14" font-size="12" font-weight="700" fill="var(--text-english)" text-anchor="middle" dominant-baseline="central">CH&#8323;</text>
          <line x1="50" y1="22" x2="50" y2="36" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linecap="round"/>
          <polygon points="50,36 78,52 78,84 50,100 22,84 22,52" fill="none" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="50" cy="68" r="18" fill="none" stroke="var(--accent-secondary)" stroke-width="1.8"/>
        </svg>
        <div class="title">টলুইন (Toluene)</div>
        <div class="formula">C<sub>7</sub>H<sub>8</sub></div>
      </div>

      <div class="chem-box">
        <svg viewBox="0 0 100 120" style="width: 82px; height: 96px; overflow: visible;">
          <!-- Phenol -->
          <text x="50" y="14" font-size="12" font-weight="700" fill="var(--accent-secondary)" text-anchor="middle" dominant-baseline="central">OH</text>
          <line x1="50" y1="22" x2="50" y2="36" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linecap="round"/>
          <polygon points="50,36 78,52 78,84 50,100 22,84 22,52" fill="none" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="50" cy="68" r="18" fill="none" stroke="var(--accent-secondary)" stroke-width="1.8"/>
        </svg>
        <div class="title">ফেনল (Phenol)</div>
        <div class="formula">C<sub>6</sub>H<sub>5</sub>OH</div>
      </div>

      <div class="chem-box">
        <svg viewBox="0 0 100 120" style="width: 82px; height: 96px; overflow: visible;">
          <!-- Nitrobenzene -->
          <text x="50" y="14" font-size="12" font-weight="700" fill="#C1621A" text-anchor="middle" dominant-baseline="central">NO&#8322;</text>
          <line x1="50" y1="22" x2="50" y2="36" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linecap="round"/>
          <polygon points="50,36 78,52 78,84 50,100 22,84 22,52" fill="none" stroke="var(--accent-primary)" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="50" cy="68" r="18" fill="none" stroke="var(--accent-secondary)" stroke-width="1.8"/>
        </svg>
        <div class="title">নাইট্রোবেনজিন</div>
        <div class="formula">C<sub>6</sub>H<sub>5</sub>NO<sub>2</sub></div>
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Mechanism Steps &bull; তিন-ধাপের বিক্রিয়া কৌশল</div>
    <div class="science-card">
      <div style="font-weight:700; color:var(--accent-primary); margin-bottom:4px;">ইলেক্ট্রোফিলিক প্রতিস্থাপন কৌশল (Step-by-Step)</div>
      <div style="font-size:9.2pt; line-height:1.55; color:var(--text-bengali);">
        <strong>ধাপ ১ (ইলেক্ট্রোফাইল সৃষ্টি):</strong> $\\text{HNO}_3 + 2\\text{H}_2\\text{SO}_4 \\rightleftharpoons \\text{NO}_2^+ + \\text{H}_3\\text{O}^+ + 2\\text{HSO}_4^-$<br>
        <strong>ধাপ ২ (কার্বোক্যাটায়ন মধ্যবর্তী গঠন):</strong> $\\text{C}_6\\text{H}_6 + \\text{NO}_2^+ \\rightarrow [\\text{C}_6\\text{H}_6\\text{NO}_2]^+$ (ধীরগতির হার-নির্ধারক ধাপ)<br>
        <strong>ধাপ ৩ (প্রোটন ত্যাগ ও রেজোন্যান্স পুনরুদ্ধার):</strong> মধ্যবর্তী বলয় ক্ষারীয় $\\text{HSO}_4^-$ এর কাছে প্রোটন ($H^+$) স্থানান্তর করে সুস্থিতি ফিরিয়ে আনে।
      </div>
    </div>
  </section>
  `,

  math: `
  <section class="chapter-hero-banner">
    <div>
      <h1>Higher Mathematics &bull; Differential &amp; Integral Calculus</h1>
      <div class="bn-sub">উচ্চতর গণিত ১ম পত্র &bull; অধ্যায় ০৯: অন্তরীকরণ ও মৌলিক উপপাদ্যসমূহ</div>
    </div>
    <div class="chapter-meta-pill">
      <span>Classes XI-XII</span><br>
      <span>Mathematics Studio</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Fundamental Theorem &bull; অন্তরীকরণের মূল সংজ্ঞার্থ ও সীমা</div>
    <div class="law-callout-box">
      <div class="law-header">
        <span class="law-badge">অন্তরজের মূল সংজ্ঞা</span>
        <span class="law-source">Definition of Derivative</span>
      </div>
      <div class="law-text">
        কোনো ফাংশন $f(x)$ এর জন্য $x$ বিন্দুতে প্রথম অন্তরজ $f'(x)$ বা $\\frac{dy}{dx}$ হলো:
        $$\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$
        যদি এই সীমার বাস্তব ও নির্দিষ্ট মান বিদ্যমান থাকে।
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Essential Formula Box &bull; ত্রিকোণমিতিক ও সূচকীয় অন্তরজ সূত্রাবলী</div>
    <div class="math-formula-box">
      <div class="formula-badge">Calculus Core Identities</div>
      <div class="formula-equation">
        $$\\frac{d}{dx}(\\sin x) = \\cos x, \\quad \\frac{d}{dx}(\\cos x) = -\\sin x, \\quad \\frac{d}{dx}(e^{ax}) = a e^{ax}$$
      </div>
      <div class="formula-legend">
        <span><strong>গুণনের নিয়ম (Product Rule):</strong> $\\frac{d}{dx}[u \\cdot v] = u \\frac{dv}{dx} + v \\frac{du}{dx}$</span>
        <span><strong>ভাগের নিয়ম (Quotient Rule):</strong> $\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v \\frac{du}{dx} - u \\frac{dv}{dx}}{v^2}$</span>
      </div>
    </div>
  </section>

  <section>
    <div class="module-heading">Geometric Interpretation &bull; জ্যামিতিক তাৎপর্য ও স্পর্শকের ঢাল</div>
    <div class="science-concept-card">
      <div class="concept-title">
        <span>বক্ররেখার স্পর্শকের ঢাল (Slope of Tangent)</span>
        <span class="concept-tag">জ্যামিতি</span>
      </div>
      <div class="concept-body">
        বক্ররেখা $y = f(x)$ এর ওপর $(x_1, y_1)$ বিন্দুতে স্পর্শকের ঢাল $m = \\left(\\frac{dy}{dx}\\right)_{(x_1, y_1)}$।<br>
        উক্ত বিন্দুতে স্পর্শকের সরলরেখা সমীকরণ:
        $$y - y_1 = m(x - x_1)$$
      </div>
    </div>

    <div class="diagram-svg-container">
      <svg viewBox="0 0 440 160" class="diagram-svg" aria-label="Calculus Curve and Tangent Line">
        <!-- Axes -->
        <line x1="30" y1="140" x2="410" y2="140" stroke="var(--border-color)" stroke-width="1.8" />
        <line x1="40" y1="150" x2="40" y2="15" stroke="var(--border-color)" stroke-width="1.8" />
        <text x="415" y="145" font-size="11" fill="var(--text-english)">x</text>
        <text x="35" y="15" font-size="11" fill="var(--text-english)">y</text>
        <!-- Curve f(x) -->
        <path d="M 50 120 Q 180 115 280 40 T 400 20" fill="none" stroke="var(--accent-primary)" stroke-width="3" />
        <text x="360" y="35" font-size="12" font-weight="700" fill="var(--accent-primary)">y = f(x)</text>
        <!-- Tangent Line -->
        <line x1="120" y1="135" x2="350" y2="15" stroke="#C1621A" stroke-width="2.2" stroke-dasharray="5,2" />
        <!-- Tangent Point P -->
        <circle cx="230" cy="74" r="5" fill="#D6A13B" stroke="var(--accent-primary)" stroke-width="2" />
        <text x="240" y="80" font-size="11" font-weight="700" fill="var(--text-english)">P(x&#8321;, y&#8321;)</text>
        <text x="280" y="55" font-size="10.5" font-weight="600" fill="#C1621A">ঢাল m = tan&theta;</text>
      </svg>
      <div class="diagram-caption">চিত্র ৯.১: বক্ররেখার নির্দিষ্ট বিন্দুতে স্পর্শক ও তাৎক্ষণিক ঢাল বিশ্লেষণ।</div>
    </div>
  </section>
  `,

  bangla: `
  <section class="chapter-hero-banner">
    <div>
      <h1>উচ্চমাধ্যমিক বাংলা সাহিত্যপাঠ &bull; রবীন্দ্রনাথ ঠাকুর</h1>
      <div class="bn-sub">গদ্য অংশ: 'অপরিচিতা' &bull; যৌতুকবিরোধী চেতনা, আত্মমর্যাদাবোধ ও নারীজাগরণ</div>
    </div>
    <div class="chapter-meta-pill">
      <span>HSC Bangla 1st Paper</span><br>
      <span>সাহিত্য ও ভাষা বিভাগ</span>
    </div>
  </section>

  <section>
    <div class="module-heading">Theme Analysis &bull; গল্পের মূলভাব ও প্রেক্ষাপট</div>
    <div class="explanation-card">
      <strong>মূলভাব:</strong> 'অপরিচিতা' রবীন্দ্রনাথ ঠাকুরের এক অনবদ্য ছোটগল্প, যেখানে বিশ শতকের প্রথম দশকের বাঙালি সমাজের যৌতুকপ্রথার কুৎসিত রূপ এবং পুরুষের কাপুরুষতার বিপরীতে এক আত্মমর্যাদাসম্পন্ন নারীর প্রতিবাদী অবস্থান ফুটে উঠেছে। কল্যাণী চরিত্রটির মাধ্যমে লেখক এমন এক নবযুগের নারীর প্রতীক এঁকেছেন, যে বিবাহিত জীবনের কৃত্রিম মোহ উপেক্ষা করে সমাজকল্যাণ ও শিক্ষার ব্রতে নিজেকে উৎসর্গ করেছে।
    </div>
  </section>

  <section>
    <div class="module-heading">Character Matrix &bull; চরিত্রচিত্রণ ও তুলনামূলক রূপরেখা</div>
    <div class="academic-table-wrap">
      <table class="academic-table">
        <thead>
          <tr>
            <th>চরিত্র</th>
            <th>মূল বৈশিষ্ট্য</th>
            <th>আচরণের সামাজিক তাৎপর্য</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>অনুপম</strong></td>
            <td>পরনির্ভরশীল, ভীরু, সুন্দর অথচ ব্যক্তিত্বহীন</td>
            <td>অভিভাবকের নিয়ন্ত্রণে থাকা তৎকালীন অসচেতন যুবসমাজের প্রতীক।</td>
          </tr>
          <tr>
            <td><strong>কল্যাণী</strong></td>
            <td>দৃঢ়চেতা, আত্মমর্যাদাসম্পন্ন, আধুনিক</td>
            <td>যৌতুকের বিরুদ্ধে রুখে দাঁড়ানো সংগ্রামী নারীশক্তির প্রথম অগ্রদূত।</td>
          </tr>
          <tr>
            <td><strong>শম্ভুনাথ সেন</strong></td>
            <td>কর্তব্যপরায়ণ, আত্মসম্মানবোধে আপসহীন</td>
            <td>মেয়ের মর্যাদা রক্ষায় সমাজের প্রচলিত প্রথা ভেঙে দেওয়া সাহসী পিতা।</td>
          </tr>
          <tr>
            <td><strong>মামাবাবু</strong></td>
            <td>লোভী, কর্তৃত্বকামী, সংকীর্ণমনা</td>
            <td>পিতৃতান্ত্রিক সমাজের স্বার্থপর ও বিবেকহীন অভিভাবকত্বের চিত্র।</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="module-heading">Vocabulary &amp; Annotations &bull; গুরুত্বপূর্ণ শব্দার্থ ও টীকা</div>
    <div class="vocab-matrix-grid">
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">অণ্ডজ</span><span class="vocab-badge">বিশেষণ</span></div>
        <div class="vocab-bn-meaning">ডিম থেকে জন্ম যার</div>
        <div class="vocab-synonym">প্রসঙ্গ: অনুপমের নবীন বয়সের তুলনা</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">গণ্ডুষ</span><span class="vocab-badge">বিশেষ্য</span></div>
        <div class="vocab-bn-meaning">এক অঞ্জলি / এক আঁজলা জল</div>
        <div class="vocab-synonym">প্রসঙ্গ: যৎসামান্য দান গ্রহণ</div>
      </div>
      <div class="vocab-card">
        <div class="vocab-top"><span class="vocab-en-term">মকরমুখো</span><span class="vocab-badge">বিশেষণ</span></div>
        <div class="vocab-bn-meaning">কুমিরের মুখের মতো গড়নবিশিষ্ট</div>
        <div class="vocab-synonym">প্রসঙ্গ: গয়নার বিশেষ অলংকরণ</div>
      </div>
    </div>
  </section>
  `
};

// Reusable Projectile Motion SVG Diagram Component Generator
export function getProjectileMotionDiagramSVG() {
  return `
    <div class="physics-diagram-card projectile-motion-diagram physics-svg-container">
      <div class="physics-diagram-header">
        <span class="physics-diagram-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>প্রক্ষেপকের পরাবৃত্তাকার গতিপথ (Parabolic Trajectory Diagram)</span>
        </span>
        <span class="physics-diagram-badge">অধ্যায় ০৩: গতিবিদ্যা</span>
      </div>

      <div class="physics-diagram-svg-wrap">
        <svg viewBox="0 0 520 225" xmlns="http://www.w3.org/2000/svg" aria-label="Projectile Motion Vector Diagram">
          <defs>
            <marker id="arrow-ax" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--text-english-muted)" />
            </marker>
            <marker id="arrow-v0" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L8,3.5 z" fill="var(--accent-primary)" />
            </marker>
            <marker id="arrow-comp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--accent-secondary)" />
            </marker>
            <linearGradient id="traj-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="var(--accent-primary)" />
              <stop offset="50%" stop-color="#D6A13B" />
              <stop offset="100%" stop-color="var(--accent-secondary)" />
            </linearGradient>
          </defs>

          <!-- Axes -->
          <line x1="40" y1="180" x2="480" y2="180" stroke="var(--border-color)" stroke-width="2" marker-end="url(#arrow-ax)" />
          <line x1="50" y1="190" x2="50" y2="25" stroke="var(--border-color)" stroke-width="2" marker-end="url(#arrow-ax)" />
          <text x="485" y="184" font-size="11" font-weight="700" fill="var(--text-english)">x (m)</text>
          <text x="45" y="20" font-size="11" font-weight="700" fill="var(--text-english)">y (m)</text>
          <text x="32" y="196" font-size="11" fill="var(--text-english-muted)">O(0,0)</text>

          <!-- Parabolic Trajectory -->
          <path d="M 50 180 Q 250 10 450 180" fill="none" stroke="url(#traj-grad)" stroke-width="3" stroke-linecap="round" />
          
          <!-- Launch Vector v0 -->
          <line x1="50" y1="180" x2="135" y2="95" stroke="var(--accent-primary)" stroke-width="2.6" marker-end="url(#arrow-v0)" />
          <text x="138" y="92" font-size="12" font-weight="800" fill="var(--accent-primary)">v&#8320;</text>

          <!-- Component Vectors at Launch -->
          <line x1="50" y1="180" x2="130" y2="180" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrow-comp)" />
          <text x="80" y="195" font-size="9.5" font-weight="600" fill="var(--accent-secondary)">v&#8320;&#8339; = v&#8320;cos&theta;&#8320;</text>
          <line x1="50" y1="180" x2="50" y2="105" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrow-comp)" />
          <text x="56" y="115" font-size="9.5" font-weight="600" fill="var(--accent-secondary)">v&#8320;&#7522; = v&#8320;sin&theta;&#8320;</text>

          <!-- Angle Arc -->
          <path d="M 85 180 A 35 35 0 0 0 75 155" fill="none" stroke="#D6A13B" stroke-width="2" />
          <text x="92" y="168" font-size="11" font-weight="700" fill="#D6A13B">&theta;&#8320;</text>

          <!-- Max Height Peak H (Point P) -->
          <circle cx="250" cy="95" r="4.5" fill="#D6A13B" stroke="var(--accent-primary)" stroke-width="2" />
          <line x1="250" y1="95" x2="250" y2="180" stroke="var(--text-english-muted)" stroke-width="1.4" stroke-dasharray="4,3" />
          <!-- Peak Horizontal Velocity -->
          <line x1="250" y1="95" x2="310" y2="95" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrow-v0)" />
          <text x="315" y="98" font-size="9.5" font-weight="600" fill="var(--accent-primary)">v&#8339; = v&#8320;cos&theta;&#8320; (v&#7522; = 0)</text>
          <text x="210" y="140" font-size="11" font-weight="700" fill="#D6A13B">H&#7522;&#8336;&#8339;</text>

          <!-- Landing Point (Range R) -->
          <circle cx="450" cy="180" r="4.5" fill="var(--accent-secondary)" />
          <text x="440" y="200" font-size="10.5" font-weight="700" fill="var(--accent-secondary)">(R, 0)</text>

          <!-- Range Measurement Line below -->
          <line x1="50" y1="210" x2="450" y2="210" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <line x1="50" y1="205" x2="50" y2="215" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <line x1="450" y1="205" x2="450" y2="215" stroke="var(--accent-secondary)" stroke-width="1.5" />
          <text x="230" y="218" font-size="10.5" font-weight="700" fill="var(--accent-secondary)">অনুভূমিক পাল্লা (Range, R)</text>
        </svg>
      </div>

      <div class="physics-diagram-caption">
        <strong>চিত্র ৩.১:</strong> প্রক্ষেপকের পরাবৃত্তাকার গতিপথ (Parabolic Trajectory), সর্বোচ্চ উচ্চতা $H$ এবং অনুভূমিক পাল্লা $R$ এর চিত্ররূপ।
      </div>

      <div class="physics-formula-legend-grid">
        <div class="physics-legend-item">
          <strong>সর্বোচ্চ উচ্চতা ($H$):</strong><br>
          $H = \\frac{v_0^2 \\sin^2\\theta_0}{2g}$
        </div>
        <div class="physics-legend-item">
          <strong>উড্ডয়নকাল ($T$):</strong><br>
          $T = \\frac{2v_0 \\sin\\theta_0}{g}$
        </div>
        <div class="physics-legend-item">
          <strong>অনুভূমিক পাল্লা ($R$):</strong><br>
          $R = \\frac{v_0^2 \\sin 2\\theta_0}{g}$
        </div>
      </div>
    </div>
  `;
}

// Global browser window fallback
if (typeof window !== 'undefined') {
  window.DEFAULT_DEMO_CONTENT = DEFAULT_DEMO_CONTENT;
  window.SUBJECT_DEMO_TEMPLATES = SUBJECT_DEMO_TEMPLATES;
  window.getProjectileMotionDiagramSVG = getProjectileMotionDiagramSVG;
  window.SVG_DEFS = SVG_DEFS;
  window.getLogoSVG = getLogoSVG;
  window.getWatermarkSVG = getWatermarkSVG;
}

