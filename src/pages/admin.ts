// ─── ADMIN PORTAL ───────────────────────────────────────────────────────────
import { JOBS, COMPANIES } from '../data/index'
import { layout } from '../components/layout'

export function adminDashboard(): string {
  const body = `
<div class="bg-gray-950 min-h-screen text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Admin Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl gradient-cosmos flex items-center justify-center font-black">A</div>
        <div>
          <h1 class="text-xl font-black text-white">CosmosIQ Admin Portal</h1>
          <p class="text-gray-400 text-xs">Super Administrator · Full Access</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span class="text-green-400 text-xs font-semibold">System Healthy</span>
        <button onclick="window.location.href='/admin/profile'" class="p-2 bg-purple-900/50 border border-purple-700 text-purple-300 rounded-lg hover:bg-purple-800 transition text-xs font-bold px-3"><i class="fas fa-user-circle mr-1"></i>Profile</button>
        <button onclick="window.location.href='/admin/logout'" class="p-2 bg-red-900/50 border border-red-700 text-red-400 rounded-lg hover:bg-red-800 transition text-xs font-bold px-3"><i class="fas fa-sign-out-alt mr-1"></i>Logout</button>
        <button onclick="alert('Admin settings coming soon!')" class="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"><i class="fas fa-cog"></i></button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      ${[
        { icon: '👥', label: 'Total Users', val: '5,241,390', change: '+2,340 today', positive: true },
        { icon: '🏢', label: 'Employers', val: '12,840', change: '+48 this week', positive: true },
        { icon: '💼', label: 'Active Jobs', val: '51,240', change: '-120 expired', positive: false },
        { icon: '💰', label: 'MRR', val: '₹1.2Cr', change: '+18% MoM', positive: true },
      ].map(s => `
        <div class="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <div class="text-2xl mb-3">${s.icon}</div>
          <p class="text-2xl font-black text-white">${s.val}</p>
          <p class="text-gray-300 text-sm mt-0.5 font-medium">${s.label}</p>
          <p class="text-xs mt-1 ${s.positive ? 'text-green-400' : 'text-red-400'}">${s.change}</p>
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Admin Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Manage Users -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-black text-white flex items-center gap-2"><i class="fas fa-users text-cosmos-400"></i> Recent Users</h2>
            <div class="flex gap-2">
              <button onclick="alert('Export users coming soon!')" class="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-600 transition">Export CSV</button>
              <button onclick="alert('Filter users coming soon!')" class="px-3 py-1.5 gradient-cosmos text-white rounded-lg text-xs font-semibold hover:opacity-90 transition">Filter</button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-gray-400 text-xs uppercase tracking-wide">
                  <th class="text-left py-2 pb-3">User</th>
                  <th class="text-left py-2 pb-3">Type</th>
                  <th class="text-left py-2 pb-3">Joined</th>
                  <th class="text-left py-2 pb-3">Status</th>
                  <th class="text-left py-2 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                ${[
                  { name: 'Priya Sharma', email: 'priya@gmail.com', type: 'Job Seeker', joined: 'Feb 24', status: 'Active' },
                  { name: 'Infra360 Ltd', email: 'hr@infra360.com', type: 'Employer', joined: 'Feb 23', status: 'Premium' },
                  { name: 'Rahul Mehta', email: 'rahul@outlook.com', type: 'Job Seeker', joined: 'Feb 22', status: 'Active' },
                  { name: 'AI Ventures', email: 'talent@aiventures.io', type: 'Employer', joined: 'Feb 21', status: 'Trial' },
                  { name: 'Ananya Singh', email: 'ananya@yahoo.com', type: 'Job Seeker', joined: 'Feb 20', status: 'Active' },
                ].map(u => `
                  <tr class="hover:bg-gray-750 transition">
                    <td class="py-3">
                      <div class="font-medium text-white text-sm">${u.name}</div>
                      <div class="text-gray-400 text-xs">${u.email}</div>
                    </td>
                    <td class="py-3"><span class="badge ${u.type==='Employer' ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-300'} text-xs">${u.type}</span></td>
                    <td class="py-3 text-gray-400 text-xs">${u.joined}</td>
                    <td class="py-3">
                      <span class="badge text-xs ${u.status==='Active'?'bg-green-900 text-green-400':u.status==='Premium'?'bg-amber-900 text-amber-400':'bg-blue-900 text-blue-400'}">${u.status}</span>
                    </td>
                    <td class="py-3">
                      <div class="flex gap-2">
                        <button onclick="alert('View user profile')" class="text-cosmos-400 hover:text-cosmos-300 text-xs"><i class="fas fa-eye"></i></button>
                        <button onclick="alert('Edit user')" class="text-blue-400 hover:text-blue-300 text-xs"><i class="fas fa-edit"></i></button>
                        <button onclick="alert('Suspend user?')" class="text-red-400 hover:text-red-300 text-xs"><i class="fas fa-ban"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Manage Jobs -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-black text-white flex items-center gap-2"><i class="fas fa-briefcase text-cosmos-400"></i> Job Moderation Queue</h2>
            <span class="badge bg-amber-900 text-amber-400 text-xs">12 Pending Review</span>
          </div>
          <div class="space-y-3">
            ${JOBS.slice(0, 4).map(job => `
              <div class="flex items-center justify-between p-3 rounded-xl bg-gray-750 border border-gray-700 hover:border-gray-600 transition">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs" style="background:${job.color}">${job.logo}</div>
                  <div>
                    <p class="font-semibold text-sm text-white">${job.title}</p>
                    <p class="text-xs text-gray-400">${job.company} · ${job.location}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="badge bg-amber-900 text-amber-400 text-xs">Pending</span>
                  <button onclick="alert('Job approved!')" class="px-2 py-1 bg-green-800 text-green-300 rounded-lg text-xs font-bold hover:bg-green-700 transition">Approve</button>
                  <button onclick="alert('Job rejected!')" class="px-2 py-1 bg-red-900 text-red-300 rounded-lg text-xs font-bold hover:bg-red-800 transition">Reject</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Analytics -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <h2 class="font-black text-white mb-5 flex items-center gap-2"><i class="fas fa-chart-bar text-cosmos-400"></i> Platform Analytics</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            ${[
              { label: 'Jobs Applied Today', val: '8,420' },
              { label: 'New Signups', val: '2,340' },
              { label: 'Active Sessions', val: '18,940' },
              { label: 'Revenue Today', val: '₹4.2L' },
            ].map(s => `
              <div class="bg-gray-900 rounded-xl p-4 text-center">
                <p class="text-xl font-black text-cosmos-400">${s.val}</p>
                <p class="text-gray-400 text-xs mt-1">${s.label}</p>
              </div>
            `).join('')}
          </div>
          <!-- Weekly Chart -->
          <div>
            <p class="text-xs text-gray-400 mb-3">Weekly Applications Trend</p>
            <div class="flex items-end gap-2 h-24">
              ${[40, 65, 55, 80, 70, 45, 60].map((h, i) => `
                <div class="flex-1 flex flex-col items-center gap-1">
                  <div class="w-full gradient-cosmos rounded-t-lg opacity-${i===3?'100':'70'}" style="height:${h}%"></div>
                  <span class="text-gray-500 text-[10px]">${['M','T','W','T','F','S','S'][i]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-5">
        
        <!-- Quick Nav -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-5">
          <h3 class="font-bold text-white mb-4 text-sm">Admin Navigation</h3>
          <nav class="space-y-1">
            ${[
              { icon: 'fas fa-tachometer-alt', label: 'Overview', active: true },
              { icon: 'fas fa-users', label: 'Manage Users', active: false },
              { icon: 'fas fa-building', label: 'Manage Employers', active: false },
              { icon: 'fas fa-briefcase', label: 'Manage Jobs', active: false },
              { icon: 'fas fa-newspaper', label: 'Blog & Content', active: false },
              { icon: 'fas fa-chart-line', label: 'Reports', active: false },
              { icon: 'fas fa-bell', label: 'Notifications', active: false },
              { icon: 'fas fa-cog', label: 'Settings', active: false },
            ].map(n => `
              <button onclick="alert('${n.label} section coming soon!')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${n.active ? 'gradient-cosmos text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}">
                <i class="${n.icon} w-4 text-center"></i>${n.label}
              </button>
            `).join('')}
          </nav>
        </div>

        <!-- System Status -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-5">
          <h3 class="font-bold text-white mb-4 text-sm flex items-center gap-2">
            <i class="fas fa-heartbeat text-green-400"></i> System Status
          </h3>
          <div class="space-y-3">
            ${[
              { service: 'Web App', status: 'Operational', color: 'text-green-400' },
              { service: 'API Server', status: 'Operational', color: 'text-green-400' },
              { service: 'AI Engine', status: 'Operational', color: 'text-green-400' },
              { service: 'Email Service', status: 'Degraded', color: 'text-amber-400' },
              { service: 'CDN', status: 'Operational', color: 'text-green-400' },
              { service: 'Database', status: 'Operational', color: 'text-green-400' },
            ].map(s => `
              <div class="flex items-center justify-between">
                <span class="text-gray-400 text-xs">${s.service}</span>
                <span class="${s.color} text-xs font-semibold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full ${s.status==='Operational'?'bg-green-400':'bg-amber-400'} animate-pulse"></span>
                  ${s.status}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-5">
          <h3 class="font-bold text-white mb-4 text-sm"><i class="fas fa-activity text-cosmos-400 mr-2"></i>Recent Activity</h3>
          <div class="space-y-3">
            ${[
              { action: 'New employer verified', time: '2 min ago', icon: '🏢' },
              { action: 'Job removed (spam)', time: '8 min ago', icon: '🗑️' },
              { action: '500 new users today', time: '1h ago', icon: '👥' },
              { action: 'Blog post published', time: '2h ago', icon: '📝' },
              { action: 'Payment ₹4,999 received', time: '3h ago', icon: '💰' },
            ].map(a => `
              <div class="flex items-start gap-2">
                <span class="text-base flex-shrink-0">${a.icon}</span>
                <div>
                  <p class="text-gray-300 text-xs">${a.action}</p>
                  <p class="text-gray-600 text-xs mt-0.5">${a.time}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
  return layout('Admin Portal', body, '')
}
