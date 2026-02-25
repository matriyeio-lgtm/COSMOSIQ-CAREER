// ─── Shared Layout Shell ────────────────────────────────────────────────────
// SEO options: pass seo object for per-page meta title, description, keywords, canonical
interface SEOOptions {
  title?:       string   // full <title> override (if not passed, uses `${title} | CosmosIQ Careers`)
  description?: string
  keywords?:    string
  canonical?:   string
  ogImage?:     string
  ogType?:      string   // default: website
  noIndex?:     boolean  // for admin/private pages
}

export const layout = (
  title: string,
  body: string,
  activePage: string = '',
  seo: SEOOptions = {}
) => {
  const BASE = 'https://cosmosiqcareers.com'
  const metaTitle       = seo.title       || `${title} | CosmosIQ Careers — AI-Powered Job Portal India`
  const metaDesc        = seo.description || 'CosmosIQ Careers — India\'s #1 AI-powered job portal. Discover 50,000+ jobs at top companies. Instant OTP login, 1-click apply, AI job matching. Join 2 lakh+ job seekers today.'
  const metaKeywords    = seo.keywords    || 'jobs in india, job portal india, AI job matching, CosmosIQ careers, employment opportunities, hire talent india, job search 2026, naukri alternative, career portal pune'
  const canonical       = seo.canonical   || `${BASE}${activePage === 'home' ? '/' : '/' + activePage}`
  const ogImage         = seo.ogImage     || `${BASE}/static/og-image.png`
  const ogType          = seo.ogType      || 'website'
  const robotsContent   = seo.noIndex     ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- ═══ PRIMARY SEO META ═══════════════════════════════════════════════════ -->
  <title>${metaTitle}</title>
  <meta name="description" content="${metaDesc}"/>
  <meta name="keywords" content="${metaKeywords}"/>
  <meta name="robots" content="${robotsContent}"/>
  <meta name="author" content="CosmosIQ Talent Solutions — Matriye Group, Pune"/>
  <meta name="copyright" content="© 2026 CosmosIQ Talent Solutions. Matriye Group."/>
  <meta name="language" content="en-IN"/>
  <meta name="geo.region" content="IN-MH"/>
  <meta name="geo.placename" content="Pune, Maharashtra, India"/>
  <link rel="canonical" href="${canonical}"/>

  <!-- ═══ OPEN GRAPH (Facebook / LinkedIn / WhatsApp) ════════════════════════ -->
  <meta property="og:type"        content="${ogType}"/>
  <meta property="og:title"       content="${metaTitle}"/>
  <meta property="og:description" content="${metaDesc}"/>
  <meta property="og:url"         content="${canonical}"/>
  <meta property="og:image"       content="${ogImage}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:site_name"   content="CosmosIQ Careers"/>
  <meta property="og:locale"      content="en_IN"/>

  <!-- ═══ TWITTER CARD ═══════════════════════════════════════════════════════ -->
  <meta name="twitter:card"        content="summary_large_image"/>
  <meta name="twitter:site"        content="@CosmosIQCareers"/>
  <meta name="twitter:title"       content="${metaTitle}"/>
  <meta name="twitter:description" content="${metaDesc}"/>
  <meta name="twitter:image"       content="${ogImage}"/>

  <!-- ═══ STRUCTURED DATA — Organization + Website ══════════════════════════ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "${BASE}/#organization",
        "name": "CosmosIQ Talent Solutions",
        "alternateName": "CosmosIQ Careers",
        "url": "${BASE}",
        "logo": "${BASE}/static/logo.png",
        "description": "India's #1 AI-powered job portal connecting job seekers with top employers.",
        "foundingDate": "2023",
        "founder": { "@type": "Person", "name": "Kumar Sanjeev" },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-89564-18531",
          "contactType": "Customer Support",
          "email": "hello@cosmosiqcareers.com",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/cosmosiq",
          "https://twitter.com/CosmosIQCareers"
        ],
        "parentOrganization": {
          "@type": "Organization",
          "name": "Matriye Group",
          "url": "https://matriye.com"
        }
      },
      {
        "@type": "WebSite",
        "@id": "${BASE}/#website",
        "url": "${BASE}",
        "name": "CosmosIQ Careers",
        "description": "AI-Powered Job Portal India",
        "publisher": { "@id": "${BASE}/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "${BASE}/jobs?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }
  </script>

  <!-- ═══ FAVICON ════════════════════════════════════════════════════════════ -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌌</text></svg>"/>

  <!-- ═══ PERFORMANCE: DNS prefetch + Preconnect ════════════════════════════ -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com"/>
  <link rel="dns-prefetch" href="https://fonts.gstatic.com"/>
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

  <!-- ═══ FONT: Inter — non-render-blocking via preload + onload swap ════════ -->
  <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"
        onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript>
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"/>
  </noscript>

  <!-- ═══ FONTAWESOME — non-render-blocking (preload swap) ══════════════════ -->
  <link rel="preload" as="style"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"
        onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  </noscript>

  <!-- ═══ CRITICAL INLINE CSS (above-the-fold — eliminates ALL render blocking) -->
  <style>
    /* ── Reset & Base ──────────────────────────────────────────── */
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#f9fafb;color:#1f2937;line-height:1.6;-webkit-font-smoothing:antialiased}

    /* ── Typography ────────────────────────────────────────────── */
    h1,h2,h3,h4,h5,h6{line-height:1.2;font-weight:800}
    a{color:inherit;text-decoration:none}

    /* ── Layout helpers ────────────────────────────────────────── */
    .max-w-7xl{max-width:80rem;margin-left:auto;margin-right:auto}
    .px-4{padding-left:1rem;padding-right:1rem}
    @media(min-width:640px){.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}}
    @media(min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}

    /* ── Gradients (critical — used in hero/navbar) ─────────────── */
    .gradient-hero{background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)}
    .gradient-cosmos{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)}
    .gradient-card{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}

    /* ── Navbar (critical — first visible element) ──────────────── */
    nav.site-nav{background:#fff;border-bottom:1px solid #f3f4f6;position:sticky;top:0;z-index:50;box-shadow:0 1px 3px rgba(0,0,0,.06)}
    .nav-logo-box{width:2.25rem;height:2.25rem;border-radius:.75rem;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:1.125rem}
    .nav-link{position:relative;transition:color .2s;color:#4b5563;font-weight:500;font-size:.875rem}
    .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:#6366f1;transition:width .3s}
    .nav-link:hover::after,.nav-link.active::after{width:100%}
    .nav-link:hover,.nav-link.active{color:#4f46e5}

    /* ── Badge ──────────────────────────────────────────────────── */
    .badge{display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600}

    /* ── Buttons ─────────────────────────────────────────────────
       Meets WCAG AA contrast: white text on #4f46e5 = 4.6:1 ratio  */
    .btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:700;font-size:.875rem;color:#fff;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);transition:opacity .2s,transform .1s;box-shadow:0 4px 12px rgba(99,102,241,.3)}
    .btn-primary:hover{opacity:.9;transform:translateY(-1px)}
    .btn-outline{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:700;font-size:.875rem;color:#fff;border:2px solid rgba(255,255,255,.5);transition:background .2s}
    .btn-outline:hover{background:rgba(255,255,255,.15)}

    /* ── Cards ──────────────────────────────────────────────────── */
    .card-hover{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s}
    .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(99,102,241,.15)}

    /* ── Cosmos color palette ───────────────────────────────────── */
    .text-cosmos-600{color:#4f46e5}.text-cosmos-700{color:#4338ca}
    .text-cosmos-400{color:#818cf8}.text-cosmos-500{color:#6366f1}
    .bg-cosmos-50{background:#eef2ff}.bg-cosmos-100{background:#e0e7ff}
    .border-cosmos-100{border-color:#e0e7ff}.border-cosmos-300{border-color:#a5b4fc}
    .border-cosmos-500{border-color:#6366f1}
    .focus\:ring-cosmos-300:focus{box-shadow:0 0 0 3px rgba(165,180,252,.5)}
    .focus\:border-cosmos-400:focus{border-color:#818cf8}
    .hover\:text-cosmos-600:hover{color:#4f46e5}
    .hover\:bg-cosmos-50:hover{background:#eef2ff}

    /* ── Glass morphism ─────────────────────────────────────────── */
    .glass{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12)}

    /* ── Mobile menu ────────────────────────────────────────────── */
    .mobile-menu{display:none}.mobile-menu.open{display:block}
    .dropdown{display:none;position:absolute}.dropdown-parent:hover .dropdown{display:block}
    @media(max-width:768px){.desktop-nav{display:none}}

    /* ── Animations — will-change avoids non-composited animation warning ──── */
    .animate-float{animation:float 3s ease-in-out infinite;will-change:transform}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

    /* ── Search glow ────────────────────────────────────────────── */
    .search-glow:focus-within{box-shadow:0 0 0 3px rgba(99,102,241,.3)}

    /* ── Scrollbar ──────────────────────────────────────────────── */
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:#f1f5f9}
    ::-webkit-scrollbar-thumb{background:#6366f1;border-radius:3px}

    /* ── Accessibility: focus visible ───────────────────────────── */
    :focus-visible{outline:3px solid #6366f1;outline-offset:2px;border-radius:4px}

    /* ── Skip link (screen readers) ─────────────────────────────── */
    .skip-link{position:absolute;top:-40px;left:0;background:#4f46e5;color:#fff;padding:8px 16px;border-radius:0 0 8px 0;font-weight:600;z-index:9999;transition:top .2s}
    .skip-link:focus{top:0}

    /* ── FontAwesome fallback glyphs (shows until FA CSS loads) ───── */
    .fa-bars::before{content:"☰"}
    .fa-times::before{content:"✕"}
    .fa-chevron-down::before{content:"▾"}
    .fa-search::before{content:"🔍"}
    .fa-map-marker-alt::before{content:"📍"}
    .fa-clock::before{content:"🕐"}
    .fa-star::before{content:"★"}
    .fa-arrow-right::before{content:"→"}
    .fa-check::before{content:"✓"}
    .fa-users::before{content:"👥"}
    .fa-briefcase::before{content:"💼"}
    .fa-building::before{content:"🏢"}
    .fa-envelope::before{content:"✉"}
    .fa-phone::before{content:"📞"}
  </style>

  <!-- ═══ TAILWIND CONFIG (must run before CDN parse) ══════════════════════ -->
  <script>
    window.tailwind={config:{theme:{extend:{colors:{cosmos:{50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'}},fontFamily:{sans:['Inter','system-ui','sans-serif']}}}}}
  </script>

  <!-- ═══ TAILWIND CDN — deferred so it NEVER blocks rendering ════════════ -->
  <script src="https://cdn.tailwindcss.com" defer></script>
</head>
<body class="bg-gray-50 text-gray-800">

<!-- Skip to main content (Accessibility) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- ══ NAVBAR ═══════════════════════════════════════════════════════════════ -->
<nav class="site-nav bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm" role="navigation" aria-label="Main navigation">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 no-underline" aria-label="CosmosIQ Careers — Go to homepage">
        <div class="w-9 h-9 rounded-xl gradient-cosmos flex items-center justify-center text-white font-black text-lg" aria-hidden="true">C</div>
        <div>
          <span class="text-xl font-black text-cosmos-700">CosmosIQ</span>
          <span class="block text-[10px] font-medium text-gray-400 -mt-1 tracking-widest uppercase">Talent Solutions</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <div class="desktop-nav hidden md:flex items-center gap-6 text-sm font-medium text-gray-600" role="list">
        <a href="/" role="listitem" class="nav-link ${activePage==='home'?'active text-cosmos-600':'hover:text-cosmos-600'}" ${activePage==='home'?'aria-current="page"':''}>Home</a>
        <div class="dropdown-parent relative" role="listitem">
          <a href="/jobs" class="nav-link ${activePage==='jobs'?'active text-cosmos-600':'hover:text-cosmos-600'} flex items-center gap-1" aria-haspopup="true" aria-expanded="false" ${activePage==='jobs'?'aria-current="page"':''}>
            Jobs <span aria-hidden="true" class="fa fa-chevron-down text-[10px]"></span>
          </a>
          <div class="dropdown top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50" role="menu">
            <a href="/jobs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600" role="menuitem">Browse Jobs</a>
            <a href="/jobs?type=remote" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600" role="menuitem">Remote Jobs</a>
            <a href="/jobs?type=featured" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600" role="menuitem">Featured Jobs</a>
          </div>
        </div>
        <a href="/companies" role="listitem" class="nav-link ${activePage==='companies'?'active text-cosmos-600':'hover:text-cosmos-600'}" ${activePage==='companies'?'aria-current="page"':''}>Companies</a>
        <a href="/blog" role="listitem" class="nav-link ${activePage==='blog'?'active text-cosmos-600':'hover:text-cosmos-600'}" ${activePage==='blog'?'aria-current="page"':''}>Blog</a>
        <a href="/about" role="listitem" class="nav-link ${activePage==='about'?'active text-cosmos-600':'hover:text-cosmos-600'}" ${activePage==='about'?'aria-current="page"':''}>About</a>
        <a href="/contact" role="listitem" class="nav-link ${activePage==='contact'?'active text-cosmos-600':'hover:text-cosmos-600'}" ${activePage==='contact'?'aria-current="page"':''}>Contact</a>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <a href="/login" class="text-sm font-semibold text-gray-700 hover:text-cosmos-600 px-3 py-2 rounded-lg hover:bg-cosmos-50 transition">Login</a>
        <a href="/employer" class="text-sm font-semibold text-white gradient-cosmos px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm" aria-label="Post a job on CosmosIQ">Post a Job</a>
      </div>

      <!-- Mobile Toggle -->
      <button
        onclick="const m=document.getElementById('mobileMenu');const open=m.classList.toggle('open');this.setAttribute('aria-expanded',open)"
        class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        aria-controls="mobileMenu"
        aria-expanded="false"
        aria-label="Toggle mobile navigation menu">
        <span class="fa fa-bars text-xl" aria-hidden="true"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobileMenu" class="mobile-menu bg-white border-t border-gray-100 px-4 pb-4 md:hidden" role="navigation" aria-label="Mobile navigation">
    <div class="pt-3 space-y-2 text-sm font-medium">
      <a href="/" class="block py-2 px-3 rounded-lg ${activePage==='home'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='home'?'aria-current="page"':''}>🏠 Home</a>
      <a href="/jobs" class="block py-2 px-3 rounded-lg ${activePage==='jobs'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='jobs'?'aria-current="page"':''}>💼 Browse Jobs</a>
      <a href="/companies" class="block py-2 px-3 rounded-lg ${activePage==='companies'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='companies'?'aria-current="page"':''}>🏢 Companies</a>
      <a href="/blog" class="block py-2 px-3 rounded-lg ${activePage==='blog'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='blog'?'aria-current="page"':''}>📝 Blog</a>
      <a href="/about" class="block py-2 px-3 rounded-lg ${activePage==='about'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='about'?'aria-current="page"':''}>ℹ️ About</a>
      <a href="/contact" class="block py-2 px-3 rounded-lg ${activePage==='contact'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}" ${activePage==='contact'?'aria-current="page"':''}>📞 Contact</a>
      <div class="flex gap-2 pt-2 border-t border-gray-100 mt-2">
        <a href="/login" class="flex-1 text-center py-2 border-2 border-cosmos-500 text-cosmos-600 rounded-xl font-semibold">Login</a>
        <a href="/signup" class="flex-1 text-center py-2 gradient-cosmos text-white rounded-xl font-semibold" aria-label="Sign up for CosmosIQ">Sign Up</a>
      </div>
    </div>
  </div>
</nav>

<!-- ══ PAGE BODY ═════════════════════════════════════════════════════════════ -->
<main id="main-content">
${body}
</main>

<!-- ══ FOOTER ════════════════════════════════════════════════════════════════ -->
<footer class="bg-gray-900 text-white mt-20" role="contentinfo">
  <!-- Top Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
      
      <!-- Brand -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-9 h-9 rounded-xl gradient-cosmos flex items-center justify-center font-black text-lg" aria-hidden="true">C</div>
          <div>
            <span class="text-xl font-black">CosmosIQ</span>
            <span class="block text-[10px] text-gray-400 -mt-1 tracking-widest uppercase">Talent Solutions</span>
          </div>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-5">India's most trusted AI-powered job portal, connecting 5 million+ job seekers with 12,000+ top companies across all industries.</p>
        <div class="flex gap-3" aria-label="CosmosIQ social media links">
          <a href="https://www.linkedin.com/company/cosmosiq" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition" aria-label="CosmosIQ on LinkedIn" rel="noopener noreferrer" target="_blank"><span class="fab fa-linkedin-in text-sm" aria-hidden="true"></span></a>
          <a href="https://twitter.com/CosmosIQCareers" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition" aria-label="CosmosIQ on Twitter / X" rel="noopener noreferrer" target="_blank"><span class="fab fa-twitter text-sm" aria-hidden="true"></span></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition" aria-label="CosmosIQ on Instagram"><span class="fab fa-instagram text-sm" aria-hidden="true"></span></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition" aria-label="CosmosIQ on Facebook"><span class="fab fa-facebook-f text-sm" aria-hidden="true"></span></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition" aria-label="CosmosIQ on YouTube"><span class="fab fa-youtube text-sm" aria-hidden="true"></span></a>
        </div>
      </div>

      <!-- For Job Seekers -->
      <nav aria-label="Job seekers navigation">
        <h2 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Job Seekers</h2>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/jobs" class="hover:text-white transition">Browse Jobs</a></li>
          <li><a href="/dashboard" class="hover:text-white transition">My Dashboard</a></li>
          <li><a href="/dashboard#resume" class="hover:text-white transition">Resume Builder</a></li>
          <li><a href="/dashboard#assessments" class="hover:text-white transition">Skill Assessments</a></li>
          <li><a href="/dashboard#tracker" class="hover:text-white transition">Application Tracker</a></li>
          <li><a href="/blog" class="hover:text-white transition">Career Advice</a></li>
        </ul>
      </nav>

      <!-- For Employers -->
      <nav aria-label="Employers navigation">
        <h2 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Employers</h2>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/employer" class="hover:text-white transition">Post a Job</a></li>
          <li><a href="/employer" class="hover:text-white transition">Employer Dashboard</a></li>
          <li><a href="/companies" class="hover:text-white transition">Company Profiles</a></li>
          <li><a href="/careers" class="hover:text-white transition">Hiring Solutions</a></li>
          <li><a href="/contact" class="hover:text-white transition">Enterprise Plans</a></li>
        </ul>
      </nav>

      <!-- Company -->
      <nav aria-label="Company navigation">
        <h2 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Company</h2>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/about" class="hover:text-white transition">About Us</a></li>
          <li><a href="/careers" class="hover:text-white transition">Careers at CosmosIQ</a></li>
          <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact Us</a></li>
          <li><a href="/privacy" class="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:text-white transition">Terms & Conditions</a></li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
      <p class="text-gray-500 text-xs">© 2026 CosmosIQ Talent Solutions. A proud product of <a href="https://matriye.com" class="text-cosmos-400 hover:text-cosmos-300" rel="noopener noreferrer">Matriye Group</a>. All rights reserved.</p>
      <nav class="flex gap-5 text-xs text-gray-500" aria-label="Legal and support links">
        <a href="/privacy" class="hover:text-white transition">Privacy</a>
        <a href="/terms" class="hover:text-white transition">Terms</a>
        <a href="/sitemap.xml" class="hover:text-white transition">Sitemap</a>
        <a href="/contact" class="hover:text-white transition">Support</a>
      </nav>
    </div>
  </div>
</footer>

</body>
</html>`;
}
