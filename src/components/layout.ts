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
  const metaKeywords    = seo.keywords    || 'jobs in india, job portal india, AI job matching, CosmosIQ careers, employment opportunities, hire talent india, job search 2025, naukri alternative, career portal pune'
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
  <meta name="copyright" content="© 2025 CosmosIQ Talent Solutions. Matriye Group."/>
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

  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌌</text></svg>"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            cosmos: {
              50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe',
              300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1',
              600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81'
            }
          },
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; }
    .gradient-hero { background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); }
    .gradient-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .gradient-cosmos { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); }
    .glass { background: rgba(255,255,255,0.07); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); }
    .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(99,102,241,0.15); }
    .nav-link { position: relative; transition: color 0.2s; }
    .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #6366f1; transition: width 0.3s; }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }
    .badge { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .search-glow:focus-within { box-shadow: 0 0 0 3px rgba(99,102,241,0.3); }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 3px; }
    .mobile-menu { display: none; } .mobile-menu.open { display: block; }
    .dropdown { display: none; position: absolute; } .dropdown-parent:hover .dropdown { display: block; }
    @media(max-width:768px){ .desktop-nav{display:none} }
  </style>
</head>
<body class="bg-gray-50 text-gray-800">

<!-- ══ NAVBAR ═══════════════════════════════════════════════════════════════ -->
<nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 no-underline">
        <div class="w-9 h-9 rounded-xl gradient-cosmos flex items-center justify-center text-white font-black text-lg">C</div>
        <div>
          <span class="text-xl font-black text-cosmos-700">CosmosIQ</span>
          <span class="block text-[10px] font-medium text-gray-400 -mt-1 tracking-widest uppercase">Talent Solutions</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <div class="desktop-nav hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <a href="/" class="nav-link ${activePage==='home'?'active text-cosmos-600':'hover:text-cosmos-600'}">Home</a>
        <div class="dropdown-parent relative">
          <a href="/jobs" class="nav-link ${activePage==='jobs'?'active text-cosmos-600':'hover:text-cosmos-600'} flex items-center gap-1">
            Jobs <i class="fas fa-chevron-down text-[10px]"></i>
          </a>
          <div class="dropdown top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
            <a href="/jobs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600">Browse Jobs</a>
            <a href="/jobs?type=remote" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600">Remote Jobs</a>
            <a href="/jobs?type=featured" class="block px-4 py-2 text-sm text-gray-700 hover:bg-cosmos-50 hover:text-cosmos-600">Featured Jobs</a>
          </div>
        </div>
        <a href="/companies" class="nav-link ${activePage==='companies'?'active text-cosmos-600':'hover:text-cosmos-600'}">Companies</a>
        <a href="/blog" class="nav-link ${activePage==='blog'?'active text-cosmos-600':'hover:text-cosmos-600'}">Blog</a>
        <a href="/about" class="nav-link ${activePage==='about'?'active text-cosmos-600':'hover:text-cosmos-600'}">About</a>
        <a href="/contact" class="nav-link ${activePage==='contact'?'active text-cosmos-600':'hover:text-cosmos-600'}">Contact</a>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <a href="/login" class="text-sm font-semibold text-gray-600 hover:text-cosmos-600 px-3 py-2 rounded-lg hover:bg-cosmos-50 transition">Login</a>
        <a href="/signup" class="text-sm font-semibold text-white gradient-cosmos px-4 py-2 rounded-xl hover:opacity-90 transition shadow-sm">Post a Job</a>
      </div>

      <!-- Mobile Toggle -->
      <button onclick="document.getElementById('mobileMenu').classList.toggle('open')" class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobileMenu" class="mobile-menu bg-white border-t border-gray-100 px-4 pb-4 md:hidden">
    <div class="pt-3 space-y-2 text-sm font-medium">
      <a href="/" class="block py-2 px-3 rounded-lg ${activePage==='home'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">🏠 Home</a>
      <a href="/jobs" class="block py-2 px-3 rounded-lg ${activePage==='jobs'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">💼 Browse Jobs</a>
      <a href="/companies" class="block py-2 px-3 rounded-lg ${activePage==='companies'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">🏢 Companies</a>
      <a href="/blog" class="block py-2 px-3 rounded-lg ${activePage==='blog'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">📝 Blog</a>
      <a href="/about" class="block py-2 px-3 rounded-lg ${activePage==='about'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">ℹ️ About</a>
      <a href="/contact" class="block py-2 px-3 rounded-lg ${activePage==='contact'?'bg-cosmos-50 text-cosmos-600':'text-gray-700 hover:bg-gray-50'}">📞 Contact</a>
      <div class="flex gap-2 pt-2 border-t border-gray-100 mt-2">
        <a href="/login" class="flex-1 text-center py-2 border border-cosmos-500 text-cosmos-600 rounded-xl font-semibold">Login</a>
        <a href="/signup" class="flex-1 text-center py-2 gradient-cosmos text-white rounded-xl font-semibold">Sign Up</a>
      </div>
    </div>
  </div>
</nav>

<!-- ══ PAGE BODY ═════════════════════════════════════════════════════════════ -->
${body}

<!-- ══ FOOTER ════════════════════════════════════════════════════════════════ -->
<footer class="bg-gray-900 text-white mt-20">
  <!-- Top Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
      
      <!-- Brand -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-9 h-9 rounded-xl gradient-cosmos flex items-center justify-center font-black text-lg">C</div>
          <div>
            <span class="text-xl font-black">CosmosIQ</span>
            <span class="block text-[10px] text-gray-400 -mt-1 tracking-widest uppercase">Talent Solutions</span>
          </div>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-5">India's most trusted AI-powered job portal, connecting 5 million+ job seekers with 12,000+ top companies across all industries.</p>
        <div class="flex gap-3">
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition"><i class="fab fa-linkedin-in text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition"><i class="fab fa-twitter text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition"><i class="fab fa-instagram text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition"><i class="fab fa-facebook-f text-sm"></i></a>
          <a href="#" class="w-9 h-9 rounded-xl bg-gray-800 hover:bg-cosmos-600 flex items-center justify-center transition"><i class="fab fa-youtube text-sm"></i></a>
        </div>
      </div>

      <!-- For Job Seekers -->
      <div>
        <h4 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Job Seekers</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/jobs" class="hover:text-white transition">Browse Jobs</a></li>
          <li><a href="/dashboard" class="hover:text-white transition">My Dashboard</a></li>
          <li><a href="/dashboard#resume" class="hover:text-white transition">Resume Builder</a></li>
          <li><a href="/dashboard#assessments" class="hover:text-white transition">Skill Assessments</a></li>
          <li><a href="/dashboard#tracker" class="hover:text-white transition">Application Tracker</a></li>
          <li><a href="/blog" class="hover:text-white transition">Career Advice</a></li>
        </ul>
      </div>

      <!-- For Employers -->
      <div>
        <h4 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Employers</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/employer" class="hover:text-white transition">Post a Job</a></li>
          <li><a href="/employer" class="hover:text-white transition">Employer Dashboard</a></li>
          <li><a href="/companies" class="hover:text-white transition">Company Profiles</a></li>
          <li><a href="/careers" class="hover:text-white transition">Hiring Solutions</a></li>
          <li><a href="/contact" class="hover:text-white transition">Enterprise Plans</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h4 class="font-bold text-sm uppercase tracking-widest text-gray-300 mb-4">Company</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="/about" class="hover:text-white transition">About Us</a></li>
          <li><a href="/careers" class="hover:text-white transition">Careers at CosmosIQ</a></li>
          <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact Us</a></li>
          <li><a href="/privacy" class="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:text-white transition">Terms & Conditions</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
      <p class="text-gray-500 text-xs">© 2025 CosmosIQ Talent Solutions. A proud product of <a href="#" class="text-cosmos-400 hover:text-cosmos-300">Matriye Group</a>. All rights reserved.</p>
      <div class="flex gap-5 text-xs text-gray-500">
        <a href="/privacy" class="hover:text-white transition">Privacy</a>
        <a href="/terms" class="hover:text-white transition">Terms</a>
        <a href="/sitemap" class="hover:text-white transition">Sitemap</a>
        <a href="/contact" class="hover:text-white transition">Support</a>
      </div>
    </div>
  </div>
</footer>

</body>
</html>`;
}
