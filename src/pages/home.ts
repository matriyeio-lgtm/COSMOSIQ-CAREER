// ─── HOME PAGE ───────────────────────────────────────────────────────────────
import { JOBS, COMPANIES, TESTIMONIALS, STATS, JOB_CATEGORIES } from '../data/index'
import { layout } from '../components/layout'

export function homePage(): string {
  const trendingJobs = JOBS.slice(0, 6)
  const featuredCompanies = COMPANIES.slice(0, 6)

  const jobCards = trendingJobs.map(job => `
    <div class="card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm" style="background:${job.color}">${job.logo}</div>
          <div>
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">${job.title}</h3>
            <p class="text-gray-500 text-xs mt-0.5">${job.company}</p>
          </div>
        </div>
        ${job.featured ? '<span class="badge bg-amber-50 text-amber-600 border border-amber-200">Featured</span>' : ''}
      </div>
      <div class="flex flex-wrap gap-1.5 mb-3">
        ${job.tags.map(t => `<span class="badge bg-cosmos-50 text-cosmos-600">${t}</span>`).join('')}
      </div>
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span class="flex items-center gap-1"><i class="fas fa-map-marker-alt text-cosmos-400"></i>${job.location}</span>
        <span class="flex items-center gap-1"><i class="fas fa-clock text-cosmos-400"></i>${job.posted}</span>
      </div>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <span class="font-bold text-cosmos-600 text-sm">${job.salary}</span>
        <span class="badge bg-green-50 text-green-600 border border-green-200">${job.type}</span>
      </div>
      <a href="/jobs" class="mt-3 block w-full text-center py-2 rounded-xl border border-cosmos-200 text-cosmos-600 text-sm font-semibold hover:bg-cosmos-600 hover:text-white transition">Apply Now</a>
    </div>
  `).join('')

  const companyCards = featuredCompanies.map(c => `
    <div class="card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
      <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3" style="background:${c.color}">${c.logo}</div>
      <h4 class="font-semibold text-gray-900 text-sm">${c.name}</h4>
      <p class="text-gray-400 text-xs mt-1 mb-3">${c.industry}</p>
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-500"><i class="fas fa-map-marker-alt mr-1 text-cosmos-400"></i>${c.location}</span>
        <span class="font-semibold text-cosmos-600">${c.openJobs} Jobs</span>
      </div>
    </div>
  `).join('')

  const testimonialCards = TESTIMONIALS.map(t => `
    <div class="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div class="flex items-center gap-1 mb-4">${'<i class="fas fa-star text-amber-400 text-sm"></i>'.repeat(t.rating)}</div>
      <p class="text-gray-600 text-sm leading-relaxed mb-5 italic">"${t.text}"</p>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full gradient-cosmos flex items-center justify-center text-white font-bold text-xs">${t.avatar}</div>
        <div>
          <p class="font-semibold text-gray-900 text-sm">${t.name}</p>
          <p class="text-gray-400 text-xs">${t.role}</p>
        </div>
      </div>
    </div>
  `).join('')

  const categoryCards = JOB_CATEGORIES.map(cat => `
    <a href="/jobs?category=${encodeURIComponent(cat.name)}" class="card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 group">
      <div class="text-3xl">${cat.icon}</div>
      <div>
        <p class="font-semibold text-gray-800 text-sm group-hover:text-cosmos-600 transition">${cat.name}</p>
        <p class="text-gray-400 text-xs mt-0.5">${cat.count.toLocaleString()} open positions</p>
      </div>
      <i class="fas fa-arrow-right ml-auto text-gray-300 group-hover:text-cosmos-500 group-hover:translate-x-1 transition-all"></i>
    </a>
  `).join('')

  const body = `

<!-- ═══ HERO SECTION ═══════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden" style="background: linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #24243e 100%); min-height: 92vh;">

  <!-- Animated background particles -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Glowing orbs -->
    <div class="absolute" style="top:-80px;left:-80px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.25) 0%,transparent 70%);animation:pulse-slow 6s ease-in-out infinite;"></div>
    <div class="absolute" style="bottom:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.2) 0%,transparent 70%);animation:pulse-slow 8s ease-in-out infinite reverse;"></div>
    <div class="absolute" style="top:40%;left:60%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%);animation:pulse-slow 7s ease-in-out infinite;"></div>

    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);background-size:60px 60px;"></div>

    <!-- Floating dots -->
    <div class="absolute w-2 h-2 rounded-full bg-indigo-400 opacity-60" style="top:15%;left:8%;animation:float1 5s ease-in-out infinite;"></div>
    <div class="absolute w-3 h-3 rounded-full bg-purple-400 opacity-40" style="top:25%;left:85%;animation:float2 7s ease-in-out infinite;"></div>
    <div class="absolute w-2 h-2 rounded-full bg-blue-400 opacity-50" style="top:70%;left:12%;animation:float3 6s ease-in-out infinite;"></div>
    <div class="absolute w-2 h-2 rounded-full bg-violet-300 opacity-40" style="top:55%;left:92%;animation:float1 8s ease-in-out infinite reverse;"></div>
    <div class="absolute w-1.5 h-1.5 rounded-full bg-indigo-300 opacity-50" style="top:80%;left:45%;animation:float2 5s ease-in-out infinite;"></div>
  </div>

  <style>
    @keyframes pulse-slow { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.1);opacity:1} }
    @keyframes float1 { 0%,100%{transform:translateY(0px) translateX(0px)} 33%{transform:translateY(-18px) translateX(8px)} 66%{transform:translateY(8px) translateX(-5px)} }
    @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-24px)} }
    @keyframes float3 { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-16px) rotate(180deg)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .shimmer-text { background: linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #a78bfa); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
    .hero-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
    .search-bar { background: rgba(255,255,255,0.97); }
    .hero-badge { background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3)); border: 1px solid rgba(255,255,255,0.15); }
    .anim-left { animation: slideInLeft 0.8s ease forwards; }
    .anim-right { animation: slideInRight 0.8s ease 0.2s forwards; opacity:0; }
    .anim-up { animation: fadeInUp 0.8s ease 0.4s forwards; opacity:0; }
    .floating-card { animation: float2 4s ease-in-out infinite; }
    .floating-card-2 { animation: float1 5s ease-in-out infinite; }
  </style>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div class="grid lg:grid-cols-2 gap-12 items-center">

      <!-- ── LEFT COLUMN: Text + Search ── -->
      <div class="anim-left">

        <!-- Top badge -->
        <div class="inline-flex items-center gap-2 hero-badge text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          India's #1 AI-Powered Career Platform &nbsp;·&nbsp; 50,000+ Live Jobs
        </div>

        <!-- Main Headline -->
        <!-- H1 — Primary keyword: AI-powered job portal India -->
        <h1 class="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-5" itemprop="headline">
          Find Your<br/>
          <span class="shimmer-text">Dream Job in India</span><br/>
          <span class="text-white/90">with AI-Powered CosmosIQ</span>
        </h1>

        <!-- Subheadline -->
        <p class="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
          AI-powered job matching across 12,000+ top companies. Your next opportunity is one smart search away.
        </p>

        <!-- Search Bar -->
        <div class="search-bar rounded-2xl p-1.5 shadow-2xl mb-5">
          <div class="flex flex-col sm:flex-row gap-1.5">
            <div class="flex-1 flex items-center gap-2 px-4 py-3">
              <i class="fas fa-search text-indigo-500 text-sm flex-shrink-0"></i>
              <input type="text" id="searchJob" placeholder="Job title, skill or company..." class="w-full text-gray-800 text-sm outline-none font-medium placeholder-gray-400 bg-transparent"/>
            </div>
            <div class="flex items-center gap-2 px-4 py-3 border-t sm:border-t-0 sm:border-l border-gray-100 sm:w-40">
              <i class="fas fa-map-marker-alt text-indigo-500 text-sm flex-shrink-0"></i>
              <input type="text" id="searchLocation" placeholder="City / Remote" class="w-full text-gray-800 text-sm outline-none font-medium placeholder-gray-400 bg-transparent"/>
            </div>
            <button onclick="window.location='/jobs'" class="px-6 py-3 rounded-xl font-bold text-sm text-white transition whitespace-nowrap" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">
              <i class="fas fa-bolt mr-1.5"></i>Find Jobs
            </button>
          </div>
        </div>

        <!-- Trending tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span class="text-white/40 text-xs self-center">🔥 Popular:</span>
          ${['React Dev','Data Science','Product Manager','DevOps','UX Designer','AI/ML'].map(s =>
            `<a href="/jobs?q=${encodeURIComponent(s)}" class="hero-badge text-white/70 hover:text-white text-xs font-medium px-3 py-1.5 rounded-full transition hover:bg-white/10">${s}</a>`
          ).join('')}
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3">
          <a href="/signup" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition hover:opacity-90 shadow-lg" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">
            <i class="fas fa-rocket"></i> Get Started Free
          </a>
          <a href="/jobs" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white/80 border border-white/20 hover:bg-white/10 transition">
            <i class="fas fa-briefcase"></i> Browse Jobs
          </a>
          <a href="/employer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white/80 border border-white/20 hover:bg-white/10 transition">
            <i class="fas fa-building"></i> Post a Job
          </a>
        </div>
      </div>

      <!-- ── RIGHT COLUMN: Visual Cards ── -->
      <div class="hidden lg:block relative anim-right" style="height:480px;">

        <!-- Main Job Match Card -->
        <div class="floating-card absolute hero-card rounded-2xl p-5 shadow-2xl" style="top:0;left:30px;width:300px;">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">AI</div>
            <div>
              <p class="text-white text-xs font-bold">AI Match Found</p>
              <p class="text-white/40 text-xs">98% compatibility</p>
            </div>
            <span class="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          </div>
          <div class="space-y-2">
            ${[
              {title:'Senior React Developer', company:'Google', salary:'₹32L', match:'98%', color:'#4285F4'},
              {title:'Product Manager', company:'Microsoft', salary:'₹28L', match:'95%', color:'#00A4EF'},
              {title:'Data Scientist', company:'Amazon', salary:'₹35L', match:'92%', color:'#FF9900'},
            ].map((j,i) => `
            <div class="flex items-center gap-2 p-2 rounded-xl" style="background:rgba(255,255,255,0.05);">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:${j.color}">${j.company[0]}</div>
              <div class="flex-1 min-w-0">
                <p class="text-white text-xs font-semibold truncate">${j.title}</p>
                <p class="text-white/40 text-xs">${j.company} · ${j.salary}/yr</p>
              </div>
              <span class="text-xs font-bold text-green-400 flex-shrink-0">${j.match}</span>
            </div>`).join('')}
          </div>
          <button class="mt-3 w-full py-2 rounded-xl text-xs font-bold text-white" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">View All Matches →</button>
        </div>

        <!-- Stats Card -->
        <div class="floating-card-2 absolute hero-card rounded-2xl p-4 shadow-xl" style="top:20px;right:0;width:180px;">
          <p class="text-white/50 text-xs mb-3 font-medium">Platform Stats</p>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-white/70">Jobs Live</span>
                <span class="text-green-400 font-bold">50K+</span>
              </div>
              <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.1);">
                <div class="h-1.5 rounded-full bg-green-400" style="width:85%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-white/70">Hired Today</span>
                <span class="text-blue-400 font-bold">1,240</span>
              </div>
              <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.1);">
                <div class="h-1.5 rounded-full bg-blue-400" style="width:72%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-white/70">Companies</span>
                <span class="text-purple-400 font-bold">12K+</span>
              </div>
              <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.1);">
                <div class="h-1.5 rounded-full bg-purple-400" style="width:60%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Cards -->
        <div class="absolute hero-card rounded-xl px-4 py-3 shadow-lg flex items-center gap-3" style="bottom:140px;left:0;animation:float3 5s ease-in-out infinite;">
          <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-check text-white text-xs"></i>
          </div>
          <div>
            <p class="text-white text-xs font-bold">Offer Received! 🎉</p>
            <p class="text-white/50 text-xs">Priya S. · ₹42 LPA at Flipkart</p>
          </div>
        </div>

        <div class="absolute hero-card rounded-xl px-4 py-3 shadow-lg flex items-center gap-3" style="bottom:60px;right:10px;animation:float2 6s ease-in-out infinite reverse;">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">
            <i class="fas fa-users text-white text-xs"></i>
          </div>
          <div>
            <p class="text-white text-xs font-bold">New Applications</p>
            <p class="text-white/50 text-xs">+124 this hour</p>
          </div>
        </div>

        <!-- Profile Card -->
        <div class="absolute hero-card rounded-xl px-4 py-3 shadow-lg flex items-center gap-3" style="bottom:0;left:50px;animation:float1 7s ease-in-out infinite;">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">KS</div>
          <div>
            <p class="text-white text-xs font-bold">Profile Score: 94%</p>
            <p class="text-white/50 text-xs">Top 5% of candidates</p>
          </div>
          <div class="ml-2 flex gap-0.5">
            ${[1,2,3,4,5].map(()=>'<i class="fas fa-star text-amber-400 text-xs"></i>').join('')}
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Bottom wave -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 70 0 20L0 80Z" fill="#f9fafb"/>
    </svg>
  </div>
</section>

<!-- ═══ STATS BAR ══════════════════════════════════════════════════════════ -->
<section class="bg-white border-b border-gray-100 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      ${STATS.map(s => `
        <div class="py-2">
          <div class="text-3xl mb-1">${s.icon}</div>
          <div class="text-2xl font-black text-cosmos-700">${s.value}</div>
          <div class="text-xs text-gray-500 font-medium mt-1">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ═══ JOB CATEGORIES ═════════════════════════════════════════════════════ -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Explore by Field</span>
      <!-- H2 — Secondary keyword: job categories India -->
      <h2 class="text-3xl font-black text-gray-900 mt-2">Browse Jobs by Category in India</h2>
      <p class="text-gray-500 mt-2">Discover thousands of IT, finance, marketing, healthcare & engineering jobs across every industry</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${categoryCards}
    </div>
  </div>
</section>

<!-- ═══ TRENDING JOBS ══════════════════════════════════════════════════════ -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Latest Openings</span>
        <!-- H2 — Secondary keyword: trending jobs 2025 -->
        <h2 class="text-3xl font-black text-gray-900 mt-1">Trending Jobs in India 2025</h2>
      </div>
      <a href="/jobs" class="hidden md:flex items-center gap-2 text-cosmos-600 font-semibold text-sm hover:underline">
        View All Jobs <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${jobCards}
    </div>
    <div class="text-center mt-8">
      <a href="/jobs" class="inline-flex items-center gap-2 gradient-cosmos text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition">
        Explore All 50,000+ Jobs <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- ═══ HOW IT WORKS ═══════════════════════════════════════════════════════ -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
      <!-- H2 — How to get hired -->
      <h2 class="text-3xl font-black text-gray-900 mt-2">How to Get Hired Fast — 3 Easy Steps</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${[
        { step: '01', icon: 'fas fa-user-circle', title: 'Create Your Profile', desc: 'Sign up in seconds. Build your professional profile with your skills, experience, and salary expectations. Upload your resume for AI parsing.', color: '#6366f1' },
        { step: '02', icon: 'fas fa-robot', title: 'AI Matches You', desc: 'Our intelligent engine scans 50,000+ jobs and surfaces the best matches based on your profile, preferences, and career trajectory.', color: '#8b5cf6' },
        { step: '03', icon: 'fas fa-paper-plane', title: 'Apply & Get Hired', desc: 'One-click apply to matched jobs. Track your applications, schedule interviews, and get real-time notifications at every stage.', color: '#0ea5e9' },
      ].map(s => `
        <div class="text-center relative">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-lg" style="background:${s.color}">
            <i class="${s.icon}"></i>
          </div>
          <div class="absolute top-0 right-1/4 text-7xl font-black opacity-5 text-gray-900 select-none">${s.step}</div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">${s.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${s.desc}</p>
        </div>
      `).join('')}
    </div>
    <div class="text-center mt-10">
      <a href="/signup" class="inline-flex items-center gap-2 gradient-cosmos text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition">
        Get Started Free <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- ═══ FEATURED EMPLOYERS ════════════════════════════════════════════════ -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-10">
      <div>
        <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Top Hirers</span>
        <!-- H2 — Top companies hiring India -->
        <h2 class="text-3xl font-black text-gray-900 mt-1">Top Companies Hiring in India</h2>
      </div>
      <a href="/companies" class="hidden md:flex items-center gap-2 text-cosmos-600 font-semibold text-sm hover:underline">
        View All Companies <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      ${companyCards}
    </div>
  </div>
</section>

<!-- ═══ AI FEATURES BANNER ════════════════════════════════════════════════ -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="gradient-cosmos rounded-3xl p-10 text-white overflow-hidden relative">
      <div class="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-white/5"></div>
      <div class="absolute -left-10 -bottom-10 w-96 h-96 rounded-full bg-white/5"></div>
      <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span class="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <i class="fas fa-brain"></i> Powered by AI
          </span>
          <!-- H2 — AI job matching feature -->
          <h2 class="text-3xl font-black mb-4">AI-Powered Job Matching — 94% Accuracy</h2>
          <p class="text-white/80 mb-6 leading-relaxed">Our AI engine analyzes your resume, skills, experience, and preferences to deliver hyper-personalized job recommendations with a 94% match accuracy rate.</p>
          <div class="space-y-3">
            ${[
              'Resume parsing and skill extraction',
              'Salary benchmarking & negotiation insights',
              'Career path predictions & skill gap analysis',
              'One-click smart applications',
            ].map(f => `<div class="flex items-center gap-3 text-sm"><i class="fas fa-check-circle text-green-400"></i><span>${f}</span></div>`).join('')}
          </div>
          <a href="/signup" class="mt-8 inline-flex items-center gap-2 bg-white text-cosmos-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            Try AI Matching Free <i class="fas fa-arrow-right"></i>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-4">
          ${[
            { icon: '🎯', label: 'AI Job Match', val: '94% Accuracy' },
            { icon: '⚡', label: 'Fast Apply', val: 'One Click' },
            { icon: '📊', label: 'Skill Score', val: 'Live Report' },
            { icon: '🔔', label: 'Job Alerts', val: 'Real-time' },
          ].map(f => `
            <div class="bg-white/10 rounded-2xl p-5 text-center">
              <div class="text-3xl mb-2">${f.icon}</div>
              <p class="font-bold text-sm">${f.label}</p>
              <p class="text-white/60 text-xs mt-1">${f.val}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ TESTIMONIALS ═══════════════════════════════════════════════════════ -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Success Stories</span>
      <!-- H2 — Social proof -->
      <h2 class="text-3xl font-black text-gray-900 mt-2">What Job Seekers Say About CosmosIQ</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      ${testimonialCards}
    </div>
  </div>
</section>

<!-- ═══ NEWSLETTER ════════════════════════════════════════════════════════ -->
<section class="py-16 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
    <div class="text-4xl mb-4">📬</div>
    <!-- H2 — Newsletter / career advice -->
    <h2 class="text-3xl font-black text-gray-900 mb-3">Get Free Weekly Career Tips &amp; Job Alerts</h2>
    <p class="text-gray-500 mb-8">Get weekly curated job picks, career tips, and industry insights delivered straight to your inbox.</p>
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" placeholder="Enter your email address" class="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-cosmos-300 focus:border-cosmos-400 transition"/>
      <button onclick="alert('Thank you for subscribing! 🎉')" class="gradient-cosmos text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition whitespace-nowrap">
        Subscribe Free
      </button>
    </div>
    <p class="text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime. Join 200,000+ subscribers.</p>
  </div>
</section>

<!-- ═══ CTA BANNER ════════════════════════════════════════════════════════ -->
<section class="py-14 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-cosmos-50 border border-cosmos-100 rounded-3xl p-8">
        <div class="text-4xl mb-4">🧑‍💼</div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">Looking for a Job?</h3>
        <p class="text-gray-600 mb-5 text-sm">Create your free profile and let AI match you with your perfect career opportunity.</p>
        <a href="/signup" class="inline-flex items-center gap-2 gradient-cosmos text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">
          Create Free Profile <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <div class="bg-amber-50 border border-amber-100 rounded-3xl p-8">
        <div class="text-4xl mb-4">🏢</div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">Hiring Top Talent?</h3>
        <p class="text-gray-600 mb-5 text-sm">Access India's largest talent pool. Post jobs and get AI-matched candidates instantly.</p>
        <a href="/employer" class="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition">
          Post a Job — Free Trial <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</section>

`

  return layout('Home', body, 'home', {
    title: 'CosmosIQ Careers — #1 AI-Powered Job Portal India | Find Jobs & Hire Talent',
    description: 'CosmosIQ Careers is India\'s leading AI-powered job portal. Search 50,000+ jobs in IT, finance, marketing & more. AI job matching, 1-click apply, instant OTP login. Join 2 lakh+ job seekers. Powered by Matriye Group, Pune.',
    keywords: 'job portal india, jobs in india 2025, AI job matching, find jobs online india, top companies hiring india, naukri alternative, cosmosiq careers, job search pune, IT jobs india, freshers jobs india, remote jobs india, work from home jobs india',
    canonical: 'https://cosmosiqcareers.com/',
    ogType: 'website'
  })
}
