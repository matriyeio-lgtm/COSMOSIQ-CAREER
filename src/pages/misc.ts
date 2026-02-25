// ─── ABOUT, BLOG, CAREERS, CONTACT, LEGAL PAGES ────────────────────────────
import { BLOG_POSTS } from '../data/index'
import { layout } from '../components/layout'

// ── ABOUT US ────────────────────────────────────────────────────────────────
export function aboutPage(): string {
  const body = `
<!-- Hero -->
<div class="gradient-hero text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="inline-block bg-white/10 text-white/80 text-xs font-medium px-4 py-2 rounded-full border border-white/20 mb-5">🌌 Our Story</span>
    <!-- H1: About page — brand + mission keyword -->
    <h1 class="text-4xl md:text-5xl font-black mb-5">Transforming How India Finds Work — About CosmosIQ</h1>
    <p class="text-white/70 text-lg max-w-2xl mx-auto">CosmosIQ Talent Solutions is redefining career discovery with the power of artificial intelligence and human insight.</p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  
  <!-- Mission & Vision -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <div class="bg-cosmos-50 border border-cosmos-100 rounded-3xl p-8">
      <div class="text-4xl mb-4">🎯</div>
      <!-- H2: Mission statement -->
      <h2 class="text-2xl font-black text-gray-900 mb-3">Our Mission — Democratising Jobs in India</h2>
      <p class="text-gray-600 leading-relaxed">To democratize access to quality employment opportunities across India — empowering every professional, from freshers to C-suite executives, to discover roles that align with their skills, values, and ambitions using the precision of AI.</p>
    </div>
    <div class="bg-purple-50 border border-purple-100 rounded-3xl p-8">
      <div class="text-4xl mb-4">🔭</div>
      <!-- H2: Vision statement -->
      <h2 class="text-2xl font-black text-gray-900 mb-3">Our Vision — India's Leading AI Talent Ecosystem</h2>
      <p class="text-gray-600 leading-relaxed">To become the most trusted AI-powered talent ecosystem in Asia — where every company finds the right person and every person finds the right opportunity. A world where talent knows no boundaries.</p>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 text-center">
    ${[
      { val: '5M+', label: 'Job Seekers', icon: '👥' },
      { val: '12K+', label: 'Partner Companies', icon: '🏢' },
      { val: '50K+', label: 'Active Jobs', icon: '💼' },
      { val: '2M+', label: 'Placements', icon: '🎉' },
    ].map(s => `
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="text-3xl mb-2">${s.icon}</div>
        <p class="text-3xl font-black text-cosmos-600">${s.val}</p>
        <p class="text-gray-500 text-sm mt-1 font-medium">${s.label}</p>
      </div>
    `).join('')}
  </div>

  <!-- Leadership Team -->
  <div class="mb-16">
    <div class="text-center mb-10">
      <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">People Behind the Vision</span>
      <h2 class="text-3xl font-black text-gray-900 mt-2">Leadership Team</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${[
        { name: 'Kumar Sanjeev', role: 'CEO & Founder', dept: 'Executive Leadership', avatar: 'KS', color: '#6366f1', bio: 'EdTech visionary & Award-winning entrepreneur. Gujarat Business Glory Award 2024, ET Business Award 2023.' },
        { name: 'Dr. Priya Rajan', role: 'CTO', dept: 'Technology', avatar: 'PR', color: '#8b5cf6', bio: 'AI/ML expert with 15 years of engineering leadership at Google and Microsoft. Built systems at 100M+ scale.' },
        { name: 'Ankit Sharma', role: 'VP — Product', dept: 'Product', avatar: 'AS', color: '#0ea5e9', bio: 'Human-centered product leader. Previously built India\'s #1 HR tool with 2M+ users.' },
        { name: 'Meena Pillai', role: 'VP — Growth', dept: 'Marketing', avatar: 'MP', color: '#10b981', bio: 'Growth strategist who scaled 3 startups to ₹100Cr+ ARR. Passionate about data-driven marketing.' },
      ].map(m => `
        <div class="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-center">
          <div class="h-24 gradient-cosmos relative">
            <div class="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl border-4 border-white absolute -bottom-10 left-1/2 -translate-x-1/2" style="background:${m.color}">${m.avatar}</div>
          </div>
          <div class="pt-14 pb-6 px-5">
            <h3 class="font-black text-gray-900">${m.name}</h3>
            <p class="text-cosmos-600 text-sm font-semibold mt-0.5">${m.role}</p>
            <p class="text-gray-400 text-xs mt-0.5">${m.dept}</p>
            <p class="text-gray-500 text-xs mt-3 leading-relaxed">${m.bio}</p>
            <div class="flex justify-center gap-2 mt-4">
              <a href="#" class="w-8 h-8 rounded-full bg-[#0077B5] flex items-center justify-center text-white text-xs hover:opacity-80 transition"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs hover:opacity-80 transition"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Timeline -->
  <div class="mb-16">
    <div class="text-center mb-10">
      <span class="text-cosmos-600 font-semibold text-sm uppercase tracking-widest">Our Journey</span>
      <h2 class="text-3xl font-black text-gray-900 mt-2">Company Timeline</h2>
    </div>
    <div class="max-w-3xl mx-auto space-y-6">
      ${[
        { year: '2019', title: 'Foundation', desc: 'CosmosIQ Talent Solutions founded in Pune with a vision to revolutionize India\'s job market.' },
        { year: '2020', title: 'First 10,000 Users', desc: 'Survived COVID, pivoted to remote-first platform. Reached 10K registered job seekers.' },
        { year: '2021', title: 'AI Engine v1.0', desc: 'Launched our proprietary AI matching engine with 87% placement accuracy. Onboarded 500+ companies.' },
        { year: '2022', title: 'Series A Funding', desc: 'Raised ₹25Cr in Series A funding. Expanded to 20 cities across India. 1 million users milestone.' },
        { year: '2023', title: 'National Awards', desc: 'Won "Indian Iconic Online Learning Platform 2023". Surpassed 3 million users. Launched Employer Analytics.' },
        { year: '2024', title: 'AI v3.0 & Scale', desc: 'Launched AI v3.0 with 94% match accuracy. 5M+ users, 12K+ companies, ₹100Cr+ revenue milestone.' },
        { year: '2026', title: 'CosmosIQ Enterprise', desc: 'Launched CosmosIQ Enterprise for Fortune 500 companies. International expansion to SEA & Middle East.' },
      ].map((t, i) => `
        <div class="flex gap-5">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-xl gradient-cosmos flex items-center justify-center text-white font-black text-xs flex-shrink-0">${t.year}</div>
            ${i < 6 ? '<div class="w-0.5 flex-1 bg-cosmos-100 mt-2"></div>' : ''}
          </div>
          <div class="pb-6">
            <h3 class="font-bold text-gray-900">${t.title}</h3>
            <p class="text-gray-500 text-sm mt-1 leading-relaxed">${t.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Achievements -->
  <div class="gradient-cosmos rounded-3xl p-10 text-white text-center">
    <h2 class="text-3xl font-black mb-8">Awards & Recognition</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
      ${[
        { icon: '🏆', title: 'Indian Iconic Platform 2023', org: 'National EdTech Awards' },
        { icon: '⭐', title: 'Gujarat Business Glory 2024', org: 'Future Leader Category' },
        { icon: '🥇', title: 'ET Business Award 2023', org: 'The Economic Times' },
        { icon: '💡', title: 'Best AI HR Platform', org: 'NASSCOM Innovation 2024' },
      ].map(a => `
        <div class="bg-white/10 rounded-2xl p-5">
          <div class="text-3xl mb-3">${a.icon}</div>
          <p class="font-bold text-sm">${a.title}</p>
          <p class="text-white/60 text-xs mt-1">${a.org}</p>
        </div>
      `).join('')}
    </div>
  </div>
</div>
`
  return layout('About Us', body, 'about', {
    title: 'About CosmosIQ Careers | AI-Powered Job Portal by Matriye Group, Pune',
    description: 'Learn about CosmosIQ Careers — India\'s #1 AI-powered job portal founded by Kumar Sanjeev, CEO Matriye Group. Our mission: democratise employment across India using AI-matching for freshers to executives.',
    keywords: 'about cosmosiq, cosmosiq careers about us, matriye group pune, kumar sanjeev CEO, AI job portal india, job portal company pune, cosmosiq talent solutions',
    canonical: 'https://cosmosiqcareers.com/about'
  })
}

// ── BLOG PAGE ────────────────────────────────────────────────────────────────
export function blogPage(): string {
  const featured = BLOG_POSTS[0]
  const posts = BLOG_POSTS.slice(1)
  const body = `
<div class="gradient-hero text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="inline-block bg-white/10 text-white/80 text-xs font-medium px-4 py-2 rounded-full border border-white/20 mb-5">📚 Knowledge Hub</span>
    <!-- H1: Blog page -->
    <h1 class="text-4xl font-black mb-3">Career Advice, Job Tips &amp; Industry Insights</h1>
    <p class="text-white/70 max-w-xl mx-auto">Expert articles on career growth, interview preparation, resume writing, and India hiring trends</p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Categories -->
  <div class="flex flex-wrap gap-2 mb-10">
    ${['All', 'Career Advice', 'Resume Tips', 'Interview Tips', 'Industry Trends', 'Job Search', 'Skill Development'].map((c, i) => `
      <button class="px-4 py-2 rounded-xl text-sm font-semibold transition ${i===0 ? 'gradient-cosmos text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-cosmos-300 hover:text-cosmos-600'}">${c}</button>
    `).join('')}
  </div>

  <!-- Featured Post -->
  <div class="card-hover bg-gradient-to-br from-cosmos-600 to-purple-700 rounded-3xl p-8 text-white mb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <span class="badge bg-white/20 text-white text-xs mb-4 inline-block">📌 Featured Article</span>
        <h2 class="text-2xl font-black mb-3">${featured.title}</h2>
        <p class="text-white/80 text-sm leading-relaxed mb-5">${featured.excerpt}</p>
        <div class="flex items-center gap-4 text-xs text-white/60 mb-5">
          <span>✍️ ${featured.author}</span>
          <span>📅 ${featured.date}</span>
          <span>⏱ ${featured.readTime} read</span>
        </div>
        <a href="/blog/${featured.id}" class="inline-flex items-center gap-2 bg-white text-cosmos-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition">
          Read Full Article <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <div class="text-8xl text-center">${featured.image}</div>
    </div>
  </div>

  <!-- Post Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${posts.map(post => `
      <div class="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="bg-gradient-to-br from-gray-100 to-gray-50 h-40 flex items-center justify-center text-6xl">${post.image}</div>
        <div class="p-5">
          <span class="badge bg-cosmos-50 text-cosmos-600 text-xs mb-3 inline-block">${post.category}</span>
          <h3 class="font-bold text-gray-900 text-base mb-2 leading-tight">${post.title}</h3>
          <p class="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">${post.excerpt}</p>
          <div class="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full gradient-cosmos flex items-center justify-center text-white font-bold text-[10px]">${post.author.split(' ').map(n=>n[0]).join('')}</div>
              <span class="font-medium text-gray-600">${post.author}</span>
            </div>
            <span>${post.readTime} · ${post.date}</span>
          </div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Newsletter CTA -->
  <div class="bg-cosmos-50 border border-cosmos-100 rounded-3xl p-8 mt-12 text-center">
    <!-- H2: Blog newsletter -->
    <h3 class="text-2xl font-black text-gray-900 mb-2">Get Free Weekly Job Alerts &amp; Career Tips</h3>
    <p class="text-gray-500 mb-5">Join 200,000+ professionals getting expert career advice every week.</p>
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" placeholder="your@email.com" class="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-cosmos-300"/>
      <button onclick="alert('Subscribed! 🎉')" class="gradient-cosmos text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">Subscribe</button>
    </div>
  </div>
</div>
`
  return layout('Blog — Career Insights', body, 'blog', {
    title: 'Career Advice Blog — Job Tips, Resume & Interview Guide India | CosmosIQ',
    description: 'Free career advice for Indian job seekers. Expert tips on resume writing, interview preparation, salary negotiation, job search strategies and industry trends. Updated weekly by CosmosIQ experts.',
    keywords: 'career advice india, job tips india, resume writing tips, interview preparation india, salary negotiation, career growth india, job search tips 2026, freshers career guide india',
    canonical: 'https://cosmosiqcareers.com/blog'
  })
}

// ── CAREERS PAGE ─────────────────────────────────────────────────────────────
export function careersPage(): string {
  const body = `
<div class="gradient-hero text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- H1: Careers / Hiring solutions page -->
    <h1 class="text-4xl font-black mb-3">Hire Top Talent in India — AI-Powered Recruitment Solutions</h1>
    <p class="text-white/70 text-lg max-w-xl mx-auto">Partner with CosmosIQ to find India's best professionals in IT, finance, marketing & more. 94% match accuracy, 3x faster hiring.</p>
    <a href="/employer" class="inline-flex items-center gap-2 bg-white text-cosmos-700 px-6 py-3 rounded-xl font-bold mt-6 hover:bg-gray-100 transition">
      Start Hiring Free <i class="fas fa-arrow-right"></i>
    </a>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <!-- Why Partner -->
  <div class="text-center mb-12">
    <!-- H2: Why companies choose CosmosIQ -->
    <h2 class="text-3xl font-black text-gray-900 mb-3">Why 12,000+ Companies Choose CosmosIQ to Hire in India</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${[
      { icon: '🤖', title: 'AI-Powered Matching', desc: '94% match accuracy. Our AI analyzes 50+ data points to surface candidates who fit your exact requirements.' },
      { icon: '⚡', title: 'Hire 3x Faster', desc: 'Reduce time-to-hire from 45 days to 15. Pre-screened candidates arrive ready for interviews.' },
      { icon: '🌐', title: 'India\'s Largest Talent Pool', desc: 'Access 5M+ active job seekers across technology, finance, marketing, design, and 50+ more fields.' },
    ].map(f => `
      <div class="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center">
        <div class="text-4xl mb-4">${f.icon}</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">${f.title}</h3>
        <p class="text-gray-500 text-sm leading-relaxed">${f.desc}</p>
      </div>
    `).join('')}
  </div>

  <!-- Pricing Plans -->
  <div class="text-center mb-10">
    <h2 class="text-3xl font-black text-gray-900 mb-3">Employer Plans</h2>
    <p class="text-gray-500">Start free, scale as you grow.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
    ${[
      { name: 'Starter', price: 'Free', per: 'Forever', features: ['3 Job Posts/month', '100 Applicants/job', 'Basic Analytics', 'Email Support'], popular: false, color: 'border-gray-200', btn: 'bg-gray-900 text-white' },
      { name: 'Growth', price: '₹4,999', per: '/month', features: ['15 Job Posts/month', 'Unlimited Applicants', 'AI Matching', 'Featured Listing', 'Priority Support', 'Analytics Dashboard'], popular: true, color: 'border-cosmos-500', btn: 'gradient-cosmos text-white' },
      { name: 'Enterprise', price: 'Custom', per: 'Contact us', features: ['Unlimited Job Posts', 'Dedicated Account Manager', 'Custom AI Integration', 'Video Interviews', 'ATS Integration', 'SLA Guarantee'], popular: false, color: 'border-gray-200', btn: 'bg-gray-900 text-white' },
    ].map(p => `
      <div class="card-hover bg-white rounded-2xl border-2 ${p.color} shadow-sm p-7 relative ${p.popular ? 'shadow-lg' : ''}">
        ${p.popular ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 gradient-cosmos text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>' : ''}
        <h3 class="text-xl font-black text-gray-900 mb-1">${p.name}</h3>
        <div class="flex items-baseline gap-1 mb-4">
          <span class="text-3xl font-black text-cosmos-700">${p.price}</span>
          <span class="text-gray-400 text-sm">${p.per}</span>
        </div>
        <ul class="space-y-2.5 mb-6">
          ${p.features.map(f => `<li class="flex items-center gap-2 text-sm text-gray-600"><i class="fas fa-check text-green-500"></i>${f}</li>`).join('')}
        </ul>
        <button onclick="alert('Plan selection coming soon! Please contact sales@cosmosiq.in')" class="w-full py-3 rounded-xl font-bold text-sm hover:opacity-90 transition ${p.btn}">
          Get Started
        </button>
      </div>
    `).join('')}
  </div>

  <!-- Hiring Process -->
  <div class="text-center mb-10">
    <h2 class="text-3xl font-black text-gray-900 mb-3">How It Works for Employers</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    ${[
      { step: '1', icon: '📋', title: 'Post Your Job', desc: 'Create a detailed job listing in under 5 minutes with our smart templates.' },
      { step: '2', icon: '🤖', title: 'AI Screens Candidates', desc: 'Our AI reviews all applications and surfaces the best matches automatically.' },
      { step: '3', icon: '📅', title: 'Schedule Interviews', desc: 'Use our integrated scheduler to book interviews directly with shortlisted candidates.' },
      { step: '4', icon: '🎉', title: 'Hire & Onboard', desc: 'Make offers, collect documents, and onboard new hires seamlessly.' },
    ].map(s => `
      <div class="text-center">
        <div class="w-14 h-14 gradient-cosmos rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">${s.icon}</div>
        <div class="inline-block bg-cosmos-100 text-cosmos-700 text-xs font-black px-3 py-1 rounded-full mb-2">Step ${s.step}</div>
        <h3 class="font-bold text-gray-900 mb-2">${s.title}</h3>
        <p class="text-gray-500 text-xs leading-relaxed">${s.desc}</p>
      </div>
    `).join('')}
  </div>
</div>
`
  return layout('Hiring Solutions', body, '', {
    title: 'Hire Top Talent in India — AI Recruitment Solutions | CosmosIQ Careers',
    description: 'Post jobs and hire top talent in India with CosmosIQ Careers. AI-powered candidate matching, pre-screened profiles, 3x faster hiring. Access 5M+ job seekers across IT, finance, marketing, engineering & more.',
    keywords: 'hire talent india, post job india, recruitment solutions india, AI recruitment platform, bulk hiring india, employer job portal india, IT recruitment india, hire software developers india',
    canonical: 'https://cosmosiqcareers.com/careers'
  })
}

// ── CONTACT PAGE ─────────────────────────────────────────────────────────────
export function contactPage(): string {
  const body = `
<div class="gradient-hero text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- H1: Contact page -->
    <h1 class="text-4xl font-black mb-3">Contact CosmosIQ Careers — We're Here to Help</h1>
    <p class="text-white/70">Our support team responds within 24 hours. Reach us via phone, email or live chat.</p>
  </div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
    
    <!-- Contact Info -->
    <div class="space-y-5">
      ${[
        { icon: '📍', title: 'Office Address', lines: ['CosmosIQ Talent Solutions', 'Level 4, Matriye Tower', 'Baner Road, Pune 411045', 'Maharashtra, India'] },
        { icon: '📞', title: 'Support Phone', lines: ['+91 20 4567 8900', '+91 98765 43210 (WhatsApp)', 'Mon-Sat: 9 AM – 6 PM IST'] },
        { icon: '📧', title: 'Email', lines: ['support@cosmosiq.in', 'careers@cosmosiq.in', 'enterprise@cosmosiq.in'] },
      ].map(i => `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="text-2xl">${i.icon}</div>
            <h3 class="font-bold text-gray-900">${i.title}</h3>
          </div>
          ${i.lines.map(l => `<p class="text-gray-600 text-sm">${l}</p>`).join('')}
        </div>
      `).join('')}

      <!-- Social Links -->
      <div class="bg-cosmos-50 border border-cosmos-100 rounded-2xl p-5">
        <h3 class="font-bold text-gray-900 mb-3">Follow Us</h3>
        <div class="flex gap-3">
          ${['fab fa-linkedin-in:#0077B5', 'fab fa-twitter:#1DA1F2', 'fab fa-instagram:#E4405F', 'fab fa-youtube:#FF0000'].map(s => {
            const [icon, color] = s.split(':')
            return `<a href="#" class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm hover:opacity-80 transition" style="background:${color}"><i class="${icon}"></i></a>`
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="lg:col-span-2">
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h2 class="text-2xl font-black text-gray-900 mb-6">Send Us a Message</h2>
        <form onsubmit="handleContact(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <input type="text" placeholder="Kumar Sanjeev" required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
              <input type="email" placeholder="you@example.com" required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
              <select required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none">
                <option value="">Select a subject</option>
                <option>Job Seeker Support</option>
                <option>Employer / Hiring Query</option>
                <option>Enterprise Partnership</option>
                <option>Technical Issue</option>
                <option>Billing / Payments</option>
                <option>Press / Media</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
            <textarea rows="5" required placeholder="Tell us how we can help you..." class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none resize-none"></textarea>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <input type="checkbox" required id="captcha" class="w-4 h-4"/>
            <label for="captcha" class="text-sm text-gray-600">I am not a robot <span class="text-gray-400">(Simple verification)</span></label>
            <i class="fas fa-robot text-cosmos-400 ml-auto text-xl"></i>
          </div>
          <button type="submit" class="w-full gradient-cosmos text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition">
            <i class="fas fa-paper-plane mr-2"></i>Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
function handleContact(e) {
  e.preventDefault();
  alert('✅ Message sent successfully! Our team will respond within 24 hours.');
}
</script>
`
  return layout('Contact Us', body, 'contact', {
    title: 'Contact CosmosIQ Careers | Support, Helpdesk & Business Enquiries',
    description: 'Contact CosmosIQ Careers for job seeker support, employer enquiries, partnership requests or technical help. Pune, Maharashtra. Phone: +91 89564 18531. Email: hello@cosmosiqcareers.com.',
    keywords: 'contact cosmosiq, cosmosiq support, cosmosiq phone number, cosmosiq careers contact, job portal support india, employer support cosmosiq, cosmosiq helpdesk',
    canonical: 'https://cosmosiqcareers.com/contact'
  })
}

// ── COMPANIES PAGE ────────────────────────────────────────────────────────────
export function companiesPage(): string {
  const { COMPANIES } = { COMPANIES: [
    { name: 'TechNova Solutions', logo: 'TN', color: '#6366f1', industry: 'Software / SaaS', openJobs: 12, location: 'Bangalore' },
    { name: 'GrowthBase Inc.', logo: 'GB', color: '#0ea5e9', industry: 'FinTech', openJobs: 8, location: 'Mumbai' },
    { name: 'AI Ventures', logo: 'AV', color: '#8b5cf6', industry: 'Artificial Intelligence', openJobs: 6, location: 'Remote' },
    { name: 'PixelCraft Studios', logo: 'PC', color: '#f59e0b', industry: 'Design & Creative', openJobs: 4, location: 'Pune' },
    { name: 'Cloudify Systems', logo: 'CS', color: '#10b981', industry: 'Cloud & DevOps', openJobs: 9, location: 'Hyderabad' },
    { name: 'BrandBoost Media', logo: 'BB', color: '#ef4444', industry: 'Marketing & Advertising', openJobs: 5, location: 'Delhi' },
    { name: 'PeopleFirst Corp', logo: 'PF', color: '#f97316', industry: 'HR & Recruiting', openJobs: 3, location: 'Chennai' },
    { name: 'Infra360', logo: 'I3', color: '#14b8a6', industry: 'Cloud Infrastructure', openJobs: 7, location: 'Hyderabad' },
    { name: 'Matriye Group', logo: 'MG', color: '#6366f1', industry: 'EdTech', openJobs: 10, location: 'Pune' },
  ]}
  const body = `
<div class="gradient-hero text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- H1: Companies page -->
    <h1 class="text-4xl font-black mb-3">Top Companies Hiring in India — Browse &amp; Apply</h1>
    <p class="text-white/70">Explore 12,000+ verified companies across IT, fintech, EdTech, healthcare & more. Find your dream employer.</p>
  </div>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    ${COMPANIES.map((c) => `
      <div class="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="h-24 gradient-cosmos relative">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl border-4 border-white absolute -bottom-8 left-6" style="background:${c.color}">${c.logo}</div>
        </div>
        <div class="pt-12 pb-5 px-5">
          <h3 class="font-black text-gray-900">${c.name}</h3>
          <p class="text-gray-500 text-sm mt-0.5">${c.industry}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xs text-gray-500 flex items-center gap-1"><i class="fas fa-map-marker-alt text-cosmos-400"></i>${c.location}</span>
            <a href="/jobs?company=${encodeURIComponent(c.name)}" class="gradient-cosmos text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition">${c.openJobs} Open Jobs</a>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
`
  return layout('Top Companies', body, 'companies', {
    title: 'Top Companies Hiring in India 2026 — Browse Employer Profiles | CosmosIQ',
    description: 'Browse 12,000+ top companies hiring in India. Explore employer profiles, open jobs, company culture and salaries for Google, Amazon, TCS, Infosys, startups and more. Apply directly on CosmosIQ Careers.',
    keywords: 'top companies hiring india, employer profiles india, best companies to work india, IT companies hiring 2026, startup jobs india, MNC jobs india, google india jobs, amazon india jobs, tcs jobs, infosys jobs',
    canonical: 'https://cosmosiqcareers.com/companies'
  })
}

// ── TERMS & PRIVACY ──────────────────────────────────────────────────────────
export function termsPage(): string {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using CosmosIQ Talent Solutions ("Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services. These terms apply to all users including job seekers, employers, and recruiters.' },
    { title: '2. User Eligibility', content: 'You must be at least 18 years of age to use this Platform. By using CosmosIQ, you represent that you have the legal capacity to enter into binding agreements and comply with applicable laws.' },
    { title: '3. Account Registration', content: 'Users are required to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.' },
    { title: '4. Employer Responsibilities', content: 'Employers posting jobs must ensure all listings are genuine, non-discriminatory, and comply with applicable labor laws. False or misleading job postings will result in immediate account suspension. Employers are prohibited from collecting fees from job seekers.' },
    { title: '5. Content Policy', content: 'All content submitted (resumes, job descriptions, blog comments) must not be defamatory, discriminatory, illegal, or violate intellectual property rights. CosmosIQ reserves the right to remove content that violates these policies.' },
    { title: '6. Intellectual Property', content: 'All content, designs, logos, and software on CosmosIQ are owned by or licensed to Matriye Group. Unauthorized reproduction, distribution, or modification of platform content is strictly prohibited.' },
    { title: '7. Dispute Resolution', content: 'Any disputes arising from use of the Platform shall first be subject to good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with proceedings in Pune, Maharashtra.' },
    { title: '8. Limitation of Liability', content: 'CosmosIQ shall not be liable for indirect, incidental, or consequential damages arising from use of the Platform. Our total liability shall not exceed the amount paid by the user in the preceding 12 months.' },
    { title: '9. Modifications', content: 'We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the updated Terms. We will notify users of material changes via email.' },
  ]
  const body = `
<div class="gradient-hero text-white py-12">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <!-- H1: Terms page -->
    <h1 class="text-3xl font-black mb-2">Terms &amp; Conditions — CosmosIQ Careers</h1>
    <p class="text-white/70 text-sm">Last Updated: February 25, 2026</p>
  </div>
</div>
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
    <p class="text-gray-600 text-sm leading-relaxed border-l-4 border-cosmos-500 pl-4 italic">Please read these Terms and Conditions carefully before using CosmosIQ Talent Solutions. These terms govern your use of our platform and services.</p>
    ${sections.map(s => `
      <div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">${s.title}</h2>
        <p class="text-gray-600 text-sm leading-relaxed">${s.content}</p>
      </div>
    `).join('')}
    <div class="bg-cosmos-50 border border-cosmos-100 rounded-2xl p-5 text-center">
      <p class="text-sm text-gray-600">For legal queries, contact: <a href="mailto:legal@cosmosiq.in" class="text-cosmos-600 font-semibold">legal@cosmosiq.in</a></p>
    </div>
  </div>
</div>
`
  return layout('Terms & Conditions', body, '', {
    title: 'Terms & Conditions | CosmosIQ Careers — Matriye Group',
    description: 'Read the Terms and Conditions for using CosmosIQ Careers job portal. Covers user eligibility, employer responsibilities, content policy, intellectual property, and dispute resolution for India.',
    keywords: 'cosmosiq terms and conditions, job portal terms of service india, cosmosiq careers legal',
    canonical: 'https://cosmosiqcareers.com/terms',
    noIndex: false
  })
}

export function privacyPage(): string {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly (name, email, resume, work history), usage data (pages visited, features used), device information, and data from third-party platforms like LinkedIn or Google when you use social login.' },
    { title: '2. How We Use Your Data', content: 'Your data is used to: match you with relevant jobs/candidates, personalize your experience, send job alerts and notifications, improve our AI matching algorithms, process payments (employers), and comply with legal obligations.' },
    { title: '3. Data Sharing', content: 'We share your profile with employers only when you apply for a job. We do not sell your personal data to third parties. Data may be shared with trusted service providers (hosting, analytics, payment processing) under strict confidentiality agreements.' },
    { title: '4. Cookies & Tracking', content: 'We use cookies and similar technologies for authentication, preferences, analytics, and personalization. You can control cookie settings in your browser. Disabling cookies may limit functionality. We use Google Analytics 4 and Hotjar for analytics.' },
    { title: '5. Data Retention', content: 'Active account data is retained for the duration of your account. If you delete your account, we retain data for 30 days (recovery period) then permanently delete it, except where legally required to retain it longer.' },
    { title: '6. Your Rights (PDPB 2023)', content: 'Under India\'s Personal Data Protection Bill 2023, you have the right to: access your data, correct inaccurate data, erase your data, withdraw consent, and data portability. Submit requests to privacy@cosmosiq.in. We will respond within 30 days.' },
    { title: '7. Security', content: 'We implement industry-standard security measures including SSL encryption, two-factor authentication, regular security audits, and access controls. However, no system is completely secure and we cannot guarantee absolute security.' },
    { title: '8. Contact', content: 'For privacy concerns, contact our Data Protection Officer at privacy@cosmosiq.in or write to: CosmosIQ Talent Solutions, Level 4, Matriye Tower, Baner Road, Pune 411045, Maharashtra, India.' },
  ]
  const body = `
<div class="gradient-hero text-white py-12">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1 class="text-3xl font-black mb-2">Privacy Policy</h1>
    <p class="text-white/70 text-sm">Last Updated: February 25, 2026 | Effective: March 1, 2026</p>
  </div>
</div>
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
    <p class="text-gray-600 text-sm leading-relaxed border-l-4 border-green-500 pl-4 italic">Your privacy is fundamental to us. This policy explains how CosmosIQ Talent Solutions collects, uses, and protects your personal information.</p>
    ${sections.map(s => `
      <div>
        <h2 class="text-lg font-bold text-gray-900 mb-2">${s.title}</h2>
        <p class="text-gray-600 text-sm leading-relaxed">${s.content}</p>
      </div>
    `).join('')}
    <div class="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
      <p class="text-sm text-gray-600">Privacy questions? Contact: <a href="mailto:privacy@cosmosiq.in" class="text-cosmos-600 font-semibold">privacy@cosmosiq.in</a></p>
    </div>
  </div>
</div>
`
  return layout('Privacy Policy', body, '', {
    title: 'Privacy Policy | CosmosIQ Careers — Data Protection India (PDPB 2023)',
    description: 'CosmosIQ Careers Privacy Policy. How we collect, use and protect your data under India\'s PDPB 2023. Your rights, cookie policy, data retention and security practices.',
    keywords: 'cosmosiq privacy policy, job portal privacy india, PDPB 2023 compliance, data protection job portal',
    canonical: 'https://cosmosiqcareers.com/privacy',
    noIndex: false
  })
}
