// ─── JOBS LISTING PAGE ──────────────────────────────────────────────────────
import { JOBS, JOB_CATEGORIES } from '../data/index'
import { layout } from '../components/layout'

export function jobsPage(query = '', location = '', category = '', type = ''): string {
  const filtered = JOBS.filter(j => {
    const q = query.toLowerCase()
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q))
    const matchL = !location || j.location.toLowerCase().includes(location.toLowerCase())
    const matchC = !category || j.category === category
    const matchT = !type || j.type.toLowerCase().includes(type.toLowerCase())
    return matchQ && matchL && matchC && matchT
  })

  const jobList = filtered.map(job => `
    <div class="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div class="flex items-start justify-between">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0" style="background:${job.color}">${job.logo}</div>
          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-bold text-gray-900">${job.title}</h3>
              ${job.featured ? '<span class="badge bg-amber-50 text-amber-600 border border-amber-200">⭐ Featured</span>' : ''}
            </div>
            <p class="text-gray-600 text-sm mt-0.5 font-medium">${job.company}</p>
            <div class="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
              <span class="flex items-center gap-1"><i class="fas fa-map-marker-alt text-cosmos-400"></i>${job.location}</span>
              <span class="flex items-center gap-1"><i class="fas fa-briefcase text-cosmos-400"></i>${job.type}</span>
              <span class="flex items-center gap-1"><i class="fas fa-tag text-cosmos-400"></i>${job.category}</span>
              <span class="flex items-center gap-1"><i class="fas fa-clock text-cosmos-400"></i>${job.posted}</span>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-3">
              ${job.tags.map(t => `<span class="badge bg-cosmos-50 text-cosmos-600">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="text-right flex-shrink-0 ml-4">
          <p class="font-bold text-cosmos-700 text-base">${job.salary}</p>
          <div class="flex gap-2 mt-3">
            <button onclick="alert('Job saved! ❤️')" class="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition">
              <i class="fas fa-heart text-sm"></i>
            </button>
            <a href="/jobs/${job.id}" class="gradient-cosmos text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition">Apply</a>
          </div>
        </div>
      </div>
    </div>
  `).join('')

  const body = `
<div class="bg-gray-50 min-h-screen">
  <!-- Page Header -->
  <div class="gradient-hero text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-black mb-2">Browse Jobs</h1>
      <p class="text-white/70">Discover ${JOBS.length.toLocaleString()}+ opportunities across all industries</p>
      
      <!-- Search Bar -->
      <div class="glass rounded-2xl p-2 mt-6 max-w-3xl">
        <form action="/jobs" method="get" class="flex flex-col sm:flex-row gap-2">
          <input name="q" value="${query}" type="text" placeholder="Job title, skill, keyword..." class="flex-1 bg-white rounded-xl px-4 py-3 text-gray-800 text-sm outline-none font-medium"/>
          <input name="location" value="${location}" type="text" placeholder="Location or Remote" class="sm:w-44 bg-white rounded-xl px-4 py-3 text-gray-800 text-sm outline-none font-medium"/>
          <button type="submit" class="gradient-cosmos px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap">Search</button>
        </form>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- ── Filters Sidebar ── -->
      <aside class="w-full lg:w-72 flex-shrink-0">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fas fa-sliders-h text-cosmos-500"></i> Filter Jobs
          </h3>
          
          <!-- Job Type -->
          <div class="mb-5">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Job Type</p>
            ${['Full Time', 'Part Time', 'Remote', 'Internship', 'Freelance'].map(t => `
              <label class="flex items-center gap-2 py-1.5 cursor-pointer hover:text-cosmos-600 transition">
                <input type="checkbox" class="rounded text-cosmos-600" ${type === t ? 'checked' : ''}/>
                <span class="text-sm text-gray-600">${t}</span>
              </label>
            `).join('')}
          </div>

          <!-- Category -->
          <div class="mb-5">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Category</p>
            ${JOB_CATEGORIES.slice(0, 6).map(c => `
              <a href="/jobs?category=${encodeURIComponent(c.name)}" class="flex items-center justify-between py-1.5 group">
                <span class="text-sm text-gray-600 group-hover:text-cosmos-600 transition">${c.icon} ${c.name}</span>
                <span class="text-xs text-gray-400">${c.count.toLocaleString()}</span>
              </a>
            `).join('')}
          </div>

          <!-- Experience Level -->
          <div class="mb-5">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Experience</p>
            ${['Fresher (0-1 yr)', 'Junior (1-3 yr)', 'Mid-level (3-6 yr)', 'Senior (6-10 yr)', 'Lead (10+ yr)'].map(e => `
              <label class="flex items-center gap-2 py-1.5 cursor-pointer hover:text-cosmos-600 transition">
                <input type="checkbox" class="rounded text-cosmos-600"/>
                <span class="text-sm text-gray-600">${e}</span>
              </label>
            `).join('')}
          </div>

          <!-- Salary Range -->
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Salary Range</p>
            <div class="space-y-2">
              <input type="range" min="0" max="50" class="w-full accent-cosmos-600"/>
              <div class="flex justify-between text-xs text-gray-500">
                <span>₹0 LPA</span><span>₹50+ LPA</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- ── Job Listings ── -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm text-gray-600"><span class="font-bold text-gray-900">${filtered.length}</span> jobs found${query ? ` for "<span class="text-cosmos-600">${query}</span>"` : ''}</p>
          <select class="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-cosmos-300">
            <option>Most Recent</option>
            <option>Most Relevant</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        ${filtered.length > 0 ? `<div class="space-y-4">${jobList}</div>` : `
          <div class="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
            <p class="text-gray-500 text-sm mb-5">Try adjusting your search criteria or explore all jobs.</p>
            <a href="/jobs" class="gradient-cosmos text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">Browse All Jobs</a>
          </div>
        `}

        <!-- Pagination -->
        ${filtered.length > 0 ? `
        <div class="flex items-center justify-center gap-2 mt-8">
          <button class="w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:bg-cosmos-50 hover:border-cosmos-200 transition flex items-center justify-center">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          ${[1,2,3,4,5].map(n => `
            <button class="w-10 h-10 rounded-xl ${n===1 ? 'gradient-cosmos text-white' : 'border border-gray-200 text-gray-600 hover:bg-cosmos-50 hover:border-cosmos-200'} transition font-semibold text-sm">${n}</button>
          `).join('')}
          <button class="w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:bg-cosmos-50 hover:border-cosmos-200 transition flex items-center justify-center">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>` : ''}
      </div>
    </div>
  </div>
</div>
`
  return layout('Browse Jobs', body, 'jobs')
}
