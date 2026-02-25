// ─── JOB SEEKER DASHBOARD ───────────────────────────────────────────────────
import { JOBS } from '../data/index'
import { layout } from '../components/layout'

export function seekerDashboard(): string {
  const appliedJobs = JOBS.slice(0, 4)

  const body = `
<div class="bg-gray-50 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Welcome Header -->
    <div class="gradient-cosmos rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/5"></div>
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">KS</div>
          <div>
            <p class="text-white/70 text-sm">Welcome back,</p>
            <h1 class="text-2xl font-black">Kumar Sanjeev 👋</h1>
            <p class="text-white/70 text-sm mt-0.5">Your profile is 72% complete</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="/jobs" class="bg-white text-cosmos-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition">
            <i class="fas fa-search mr-2"></i>Browse Jobs
          </a>
          <a href="#profile" class="bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition">
            <i class="fas fa-user mr-2"></i>Complete Profile
          </a>
        </div>
      </div>
      <!-- Progress Bar -->
      <div class="mt-5">
        <div class="flex items-center justify-between text-xs text-white/70 mb-2">
          <span>Profile Completion</span><span>72%</span>
        </div>
        <div class="h-2 bg-white/20 rounded-full">
          <div class="h-2 bg-white rounded-full" style="width:72%"></div>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      ${[
        { icon: '📄', label: 'Applications', val: '12', sub: '+3 this week', color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: '👁️', label: 'Profile Views', val: '248', sub: '+42 this week', color: 'text-purple-600', bg: 'bg-purple-50' },
        { icon: '❤️', label: 'Saved Jobs', val: '18', sub: '5 expiring soon', color: 'text-red-600', bg: 'bg-red-50' },
        { icon: '📅', label: 'Interviews', val: '2', sub: 'Upcoming this week', color: 'text-green-600', bg: 'bg-green-50' },
      ].map(s => `
        <div class="card-hover bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="text-2xl">${s.icon}</div>
            <span class="${s.bg} ${s.color} text-xs font-semibold px-2.5 py-1 rounded-full">Live</span>
          </div>
          <p class="text-3xl font-black text-gray-900">${s.val}</p>
          <p class="text-sm font-semibold text-gray-700 mt-0.5">${s.label}</p>
          <p class="text-xs text-gray-400 mt-1">${s.sub}</p>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Application Tracker -->
        <div id="tracker" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-black text-gray-900 flex items-center gap-2"><i class="fas fa-tasks text-cosmos-500"></i> Application Tracker</h2>
            <span class="text-xs text-gray-400">Last updated 2h ago</span>
          </div>
          <!-- Status Tabs -->
          <div class="flex gap-2 flex-wrap mb-5">
            ${[
              { label: 'All (12)', active: true },
              { label: 'Pending (5)', active: false },
              { label: 'Shortlisted (4)', active: false },
              { label: 'Interview (2)', active: false },
              { label: 'Offer (1)', active: false },
            ].map(t => `
              <button class="px-3 py-1.5 rounded-lg text-xs font-semibold transition ${t.active ? 'gradient-cosmos text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">${t.label}</button>
            `).join('')}
          </div>
          <div class="space-y-3">
            ${appliedJobs.map((job, i) => {
              const statuses = [
                { label: 'Shortlisted', color: 'bg-green-100 text-green-700', icon: '✅' },
                { label: 'Interview Scheduled', color: 'bg-blue-100 text-blue-700', icon: '📅' },
                { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700', icon: '🔍' },
                { label: 'Offer Received', color: 'bg-purple-100 text-purple-700', icon: '🎉' },
              ]
              const s = statuses[i % statuses.length]
              return `
              <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs" style="background:${job.color}">${job.logo}</div>
                  <div>
                    <p class="font-semibold text-sm text-gray-900">${job.title}</p>
                    <p class="text-xs text-gray-500">${job.company} · Applied ${job.posted}</p>
                  </div>
                </div>
                <span class="badge ${s.color} text-xs">${s.icon} ${s.label}</span>
              </div>`
            }).join('')}
          </div>
          <a href="/jobs" class="mt-4 text-cosmos-600 text-sm font-semibold hover:underline flex items-center gap-1">
            View all applications <i class="fas fa-arrow-right text-xs"></i>
          </a>
        </div>

        <!-- Recommended Jobs -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-black text-gray-900 mb-5 flex items-center gap-2">
            <i class="fas fa-robot text-cosmos-500"></i> AI Recommended Jobs
            <span class="badge bg-cosmos-50 text-cosmos-600 text-xs ml-2">Personalized</span>
          </h2>
          <div class="space-y-3">
            ${JOBS.slice(0, 4).map(job => `
              <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-cosmos-50 hover:border-cosmos-200 transition group">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs" style="background:${job.color}">${job.logo}</div>
                  <div>
                    <p class="font-semibold text-sm text-gray-900 group-hover:text-cosmos-700">${job.title}</p>
                    <p class="text-xs text-gray-500">${job.company} · ${job.location} · ${job.salary}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">92% Match</span>
                  <a href="/jobs" class="gradient-cosmos text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition">Apply</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Career Tools -->
        <div id="assessments" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-black text-gray-900 mb-5 flex items-center gap-2"><i class="fas fa-tools text-cosmos-500"></i> Career Tools</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${[
              { icon: '📄', title: 'Resume Builder', desc: 'Create ATS-optimized resume', btn: 'Build Now', color: 'bg-blue-50 border-blue-200' },
              { icon: '🎓', title: 'Skill Assessments', desc: '3 tests pending completion', btn: 'Start Test', color: 'bg-purple-50 border-purple-200' },
              { icon: '📅', title: 'Interview Calendar', desc: '2 upcoming interviews', btn: 'View Schedule', color: 'bg-green-50 border-green-200' },
            ].map(t => `
              <div class="${t.color} border rounded-2xl p-5 text-center">
                <div class="text-3xl mb-3">${t.icon}</div>
                <h3 class="font-bold text-gray-900 text-sm mb-1">${t.title}</h3>
                <p class="text-xs text-gray-500 mb-4">${t.desc}</p>
                <button onclick="alert('${t.title} feature launching soon!')" class="w-full gradient-cosmos text-white py-2 rounded-xl text-xs font-bold hover:opacity-90 transition">${t.btn}</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-5">
        
        <!-- Profile Card -->
        <div id="profile" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fas fa-user text-cosmos-500"></i> My Profile</h3>
          <div class="space-y-3 text-sm">
            ${[
              { label: 'Full Name', val: 'Kumar Sanjeev', icon: 'fas fa-user' },
              { label: 'Email', val: 'kumar@matriye.com', icon: 'fas fa-envelope' },
              { label: 'Location', val: 'Pune, India', icon: 'fas fa-map-marker-alt' },
              { label: 'Experience', val: '8+ Years', icon: 'fas fa-briefcase' },
              { label: 'Notice Period', val: 'Immediate', icon: 'fas fa-clock' },
            ].map(f => `
              <div class="flex items-center gap-2 py-1.5 border-b border-gray-50">
                <i class="${f.icon} text-cosmos-400 w-4 text-center"></i>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-400">${f.label}</p>
                  <p class="font-medium text-gray-800 truncate">${f.val}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <button onclick="alert('Profile edit feature coming soon!')" class="w-full mt-4 border border-cosmos-200 text-cosmos-600 py-2.5 rounded-xl text-sm font-bold hover:bg-cosmos-50 transition">
            <i class="fas fa-edit mr-2"></i>Edit Profile
          </button>
        </div>

        <!-- Skills -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fas fa-star text-cosmos-500"></i> Skills</h3>
          <div class="flex flex-wrap gap-2">
            ${['EdTech', 'Product Strategy', 'AI/ML', 'Leadership', 'Business Dev', 'Content', 'Analytics', 'Marketing'].map(s => `
              <span class="badge bg-cosmos-50 text-cosmos-700 border border-cosmos-200 text-xs">${s}</span>
            `).join('')}
          </div>
          <button onclick="alert('Add skills feature coming soon!')" class="mt-3 text-cosmos-600 text-xs font-semibold hover:underline">+ Add Skills</button>
        </div>

        <!-- Saved Jobs -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fas fa-heart text-cosmos-500"></i> Saved Jobs</h3>
          <div class="space-y-3">
            ${JOBS.slice(0, 3).map(j => `
              <div class="flex items-center gap-3 py-2 border-b border-gray-50">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style="background:${j.color}">${j.logo}</div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-xs text-gray-900 truncate">${j.title}</p>
                  <p class="text-xs text-gray-400 truncate">${j.company}</p>
                </div>
                <i class="fas fa-heart text-red-400 text-xs flex-shrink-0"></i>
              </div>
            `).join('')}
          </div>
          <a href="/jobs" class="mt-2 text-cosmos-600 text-xs font-semibold hover:underline block">View all →</a>
        </div>

        <!-- Search Alerts -->
        <div class="bg-cosmos-50 border border-cosmos-100 rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-bell text-cosmos-500"></i>
            <h3 class="font-bold text-gray-900 text-sm">Job Alerts Active</h3>
          </div>
          <div class="space-y-2 text-xs text-gray-600">
            ${['Product Manager · Mumbai', 'CEO · Remote', 'EdTech Lead · Pan India'].map(a => `
              <div class="flex items-center justify-between py-1">
                <span>🔔 ${a}</span>
                <button class="text-red-400 hover:text-red-600 transition"><i class="fas fa-times"></i></button>
              </div>
            `).join('')}
          </div>
          <button onclick="alert('Add job alert feature coming soon!')" class="mt-3 w-full border border-cosmos-300 text-cosmos-600 py-2 rounded-xl text-xs font-bold hover:bg-cosmos-100 transition">
            + Create New Alert
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`
  return layout('My Dashboard', body, '', {
    title: 'Job Seeker Dashboard | CosmosIQ Careers',
    description: 'Manage your job applications, saved jobs, resume builder, skill assessments and job alerts from your CosmosIQ Careers dashboard.',
    canonical: 'https://cosmosiqcareers.com/dashboard',
    noIndex: true
  })
}
