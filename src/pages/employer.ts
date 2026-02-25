// ─── EMPLOYER DASHBOARD ─────────────────────────────────────────────────────
import { JOBS } from '../data/index'
import { layout } from '../components/layout'

export function employerDashboard(): string {
  const body = `
<div class="bg-gray-50 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Header -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
      <div class="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/5"></div>
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl gradient-cosmos flex items-center justify-center text-2xl font-black">M</div>
          <div>
            <p class="text-white/60 text-sm">Employer Dashboard</p>
            <h1 class="text-2xl font-black">Matriye Group</h1>
            <p class="text-white/60 text-sm mt-0.5">EdTech · Pune, India · Premium Plan</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="#post-job" class="gradient-cosmos px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition">
            <i class="fas fa-plus mr-2"></i>Post New Job
          </a>
          <button onclick="alert('Analytics report coming soon!')" class="bg-white/10 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition">
            <i class="fas fa-chart-bar mr-2"></i>Analytics
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      ${[
        { icon: '💼', label: 'Active Jobs', val: '6', sub: '2 expiring soon', color: 'text-cosmos-600', bg: 'bg-cosmos-50' },
        { icon: '👥', label: 'Total Applicants', val: '284', sub: '+52 this week', color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: '⭐', label: 'Shortlisted', val: '38', sub: 'Awaiting review', color: 'text-amber-600', bg: 'bg-amber-50' },
        { icon: '🎉', label: 'Hired This Month', val: '3', sub: '2 more in pipeline', color: 'text-green-600', bg: 'bg-green-50' },
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
      
      <!-- Left: Jobs + Candidates -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Active Job Postings -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-black text-gray-900 flex items-center gap-2"><i class="fas fa-briefcase text-cosmos-500"></i> Active Job Postings</h2>
            <a href="#post-job" class="text-cosmos-600 text-sm font-bold hover:underline">+ Add New</a>
          </div>
          <div class="space-y-3">
            ${JOBS.slice(0, 4).map((job, i) => `
              <div class="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-bold text-gray-900 text-sm">${job.title}</h3>
                    <div class="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                      <span><i class="fas fa-map-marker-alt text-cosmos-400 mr-1"></i>${job.location}</span>
                      <span><i class="fas fa-briefcase text-cosmos-400 mr-1"></i>${job.type}</span>
                      <span><i class="fas fa-calendar text-cosmos-400 mr-1"></i>Posted ${job.posted}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="badge bg-green-50 text-green-600 border border-green-200">Active</span>
                    <button onclick="alert('Edit job coming soon!')" class="p-1.5 text-gray-400 hover:text-cosmos-600 transition"><i class="fas fa-edit text-sm"></i></button>
                  </div>
                </div>
                <div class="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 text-xs">
                  <span class="text-gray-600"><span class="font-bold text-gray-900">${(i+1)*18+22}</span> Applicants</span>
                  <span class="text-gray-600"><span class="font-bold text-gray-900">${(i+1)*4+3}</span> Shortlisted</span>
                  <span class="text-gray-600"><span class="font-bold text-cosmos-600">${job.salary}</span></span>
                  <button onclick="alert('View applicants coming soon!')" class="ml-auto gradient-cosmos text-white px-3 py-1.5 rounded-lg font-bold hover:opacity-90 transition">View All</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Applicants -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-black text-gray-900 mb-5 flex items-center gap-2"><i class="fas fa-users text-cosmos-500"></i> Recent Applicants</h2>
          <div class="space-y-3">
            ${[
              { name: 'Priya Sharma', role: 'Senior Frontend Dev', exp: '5 yrs', match: 94, avatar: 'PS', color: '#6366f1' },
              { name: 'Rahul Mehta', role: 'Product Manager', exp: '7 yrs', match: 88, avatar: 'RM', color: '#10b981' },
              { name: 'Ananya Singh', role: 'Data Scientist', exp: '4 yrs', match: 91, avatar: 'AS', color: '#f59e0b' },
              { name: 'Vikram Nair', role: 'UX Designer', exp: '6 yrs', match: 85, avatar: 'VN', color: '#ef4444' },
            ].map(a => `
              <div class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs" style="background:${a.color}">${a.avatar}</div>
                  <div>
                    <p class="font-semibold text-sm text-gray-900">${a.name}</p>
                    <p class="text-xs text-gray-500">${a.role} · ${a.exp} experience</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-center">
                    <p class="text-xs font-bold text-green-600">${a.match}%</p>
                    <p class="text-xs text-gray-400">Match</p>
                  </div>
                  <div class="flex gap-1.5">
                    <button onclick="alert('Shortlist feature coming soon!')" class="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition">Shortlist</button>
                    <button onclick="alert('Reject feature coming soon!')" class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition">Pass</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Post New Job Form -->
        <div id="post-job" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 class="font-black text-gray-900 mb-6 flex items-center gap-2"><i class="fas fa-plus-circle text-cosmos-500"></i> Post New Job</h2>
          <form onsubmit="handleJobPost(event)" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Job Title *</label>
                <input type="text" placeholder="e.g. Senior React Developer" required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Department *</label>
                <select class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none">
                  <option>Technology</option><option>Marketing</option><option>Finance</option><option>Design</option><option>Operations</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                <input type="text" placeholder="e.g. Pune, India or Remote" required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Job Type *</label>
                <select class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none">
                  <option>Full Time</option><option>Part Time</option><option>Remote</option><option>Internship</option><option>Freelance</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Min Salary (LPA)</label>
                <input type="number" placeholder="e.g. 15" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Max Salary (LPA)</label>
                <input type="number" placeholder="e.g. 25" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Required Skills (comma-separated)</label>
              <input type="text" placeholder="React, TypeScript, Node.js, AWS" class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Job Description *</label>
              <textarea rows="5" placeholder="Describe the role, responsibilities, requirements, and benefits..." required class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cosmos-300 outline-none resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Attach Document (JD PDF)</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-cosmos-300 transition cursor-pointer">
                <i class="fas fa-cloud-upload-alt text-3xl text-gray-300 mb-2"></i>
                <p class="text-sm text-gray-500">Drag & drop or <span class="text-cosmos-600 font-semibold">click to upload</span></p>
                <p class="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
              </div>
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" onclick="alert('Job saved as draft!')" class="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition">
                Save as Draft
              </button>
              <button type="submit" class="flex-2 gradient-cosmos text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">
                <i class="fas fa-paper-plane mr-2"></i>Publish Job
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-5">
        
        <!-- Company Profile -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="gradient-cosmos h-20"></div>
          <div class="px-5 pb-5">
            <div class="w-16 h-16 rounded-2xl gradient-cosmos flex items-center justify-center text-white font-black text-2xl border-4 border-white -mt-8 mb-3">M</div>
            <h3 class="font-black text-gray-900">Matriye Group</h3>
            <p class="text-sm text-gray-500 mt-0.5">EdTech · Pune, India</p>
            <div class="flex items-center gap-2 mt-3 flex-wrap">
              <span class="badge bg-green-50 text-green-600 border border-green-200">Verified Employer</span>
              <span class="badge bg-amber-50 text-amber-600 border border-amber-200">Premium</span>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
              <div class="flex items-center gap-2"><i class="fas fa-globe text-cosmos-400"></i> matriyeacademy.com</div>
              <div class="flex items-center gap-2"><i class="fas fa-users text-cosmos-400"></i> 50-200 Employees</div>
              <div class="flex items-center gap-2"><i class="fas fa-calendar text-cosmos-400"></i> Founded 2019</div>
            </div>
            <button onclick="alert('Company profile editor coming soon!')" class="mt-4 w-full border border-cosmos-200 text-cosmos-600 py-2 rounded-xl text-sm font-bold hover:bg-cosmos-50 transition">
              <i class="fas fa-edit mr-2"></i>Edit Company Profile
            </button>
          </div>
        </div>

        <!-- Plan Info -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-crown text-amber-500"></i>
            <h3 class="font-bold text-gray-900 text-sm">Premium Plan</h3>
          </div>
          <div class="space-y-2 text-xs text-gray-600 mb-4">
            ${['10 Active Job Posts', 'Unlimited Applicants', 'Featured Listing', 'AI Candidate Matching', 'Analytics Dashboard'].map(f => `
              <div class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i>${f}</div>
            `).join('')}
          </div>
          <div class="text-xs text-gray-400 mb-3">Renews in 18 days</div>
          <button onclick="alert('Upgrade plan coming soon!')" class="w-full bg-amber-500 text-white py-2 rounded-xl text-xs font-bold hover:bg-amber-600 transition">
            Upgrade to Enterprise
          </button>
        </div>

        <!-- Quick Stats Chart -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fas fa-chart-line text-cosmos-500"></i> Applicant Trend</h3>
          <div class="space-y-3">
            ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => {
              const pct = [30,65,45,80,55,20,40][i]
              return `
              <div class="flex items-center gap-2 text-xs">
                <span class="w-6 text-gray-400">${d}</span>
                <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full gradient-cosmos rounded-full" style="width:${pct}%"></div>
                </div>
                <span class="text-gray-500 w-6 text-right">${Math.round(pct/5)}</span>
              </div>`
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
function handleJobPost(e) {
  e.preventDefault();
  alert('✅ Job posted successfully! Your listing is now live on CosmosIQ.');
}
</script>
`
  return layout('Employer Dashboard', body, '')
}
