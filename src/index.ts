import { Hono } from 'hono'
import { JOBS, BLOG_POSTS, JOB_CATEGORIES } from './data/index'
import { authRoutes } from './routes/oauth'
import { otpRoutes } from './routes/email-otp'
import { emailApiRoutes } from './routes/email-api'
import { homePage } from './pages/home'
import { jobsPage } from './pages/jobs'
import { loginPage, signupPage, forgotPasswordPage } from './pages/auth'
import { seekerDashboard } from './pages/dashboard'
import { employerDashboard } from './pages/employer'
import { aboutPage, blogPage, careersPage, contactPage, companiesPage, termsPage, privacyPage } from './pages/misc'
import { adminDashboard } from './pages/admin'

// ── Bindings type — matches Cloudflare Pages env vars ────────────────────────
type Bindings = {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  LINKEDIN_CLIENT_ID: string
  LINKEDIN_CLIENT_SECRET: string
  BASE_URL: string
  EMAIL_API_KEY: string
  OTP_KV: KVNamespace
  MAILGUN_API_KEY: string
  MAILGUN_DOMAIN: string
  RESEND_API_KEY: string
  ADMIN_PASSWORD: string
}

// ── Admin credentials ─────────────────────────────────────────────────────────
const ADMIN_USER         = 'cosmosiq_admin'
const ADMIN_PASS_DEFAULT = 'CosmosIQ@Admin2025#'
const ADMIN_TOKEN_KEY    = 'cosmosiq_admin_session'

function checkAdminAuth(c: any): boolean {
  const cookie = c.req.header('cookie') || ''
  const match  = cookie.match(/cosmosiq_admin_session=([^;]+)/)
  if (!match) return false
  try {
    const decoded  = atob(match[1])
    const [user, ts] = decoded.split(':')
    if (user !== ADMIN_USER) return false
    if (Date.now() - parseInt(ts) > 8 * 60 * 60 * 1000) return false
    return true
  } catch { return false }
}

function adminLoginPage(error = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Admin Login — CosmosIQ</title>
  <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/></noscript>
  <script>window.tailwind={config:{}}</script>
  <script src="https://cdn.tailwindcss.com" defer></script>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;}
    .gradient-cosmos{background:linear-gradient(135deg,#4f46e5,#7c3aed);}
    .bg-cosmos{background:linear-gradient(160deg,#0f0c29 0%,#302b63 50%,#24243e 100%);}
  </style>
</head>
<body class="bg-cosmos min-h-screen flex items-center justify-center px-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 mb-4">
        <span class="text-3xl">🌌</span>
        <div class="text-left">
          <div class="text-white font-black text-lg leading-tight">CosmosIQ</div>
          <div class="text-purple-300 text-xs font-semibold tracking-widest uppercase">Admin Portal</div>
        </div>
      </div>
      <h1 class="text-white text-2xl font-black mb-1">Administrator Login</h1>
      <p class="text-purple-300 text-sm">Restricted access — authorised personnel only</p>
    </div>
    <div class="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-8 shadow-2xl">
      ${error ? `<div class="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2"><i class="fas fa-exclamation-circle mr-1"></i>${error}</div>` : ''}
      <form method="POST" action="/admin/login">
        <div class="mb-5">
          <label class="block text-purple-200 text-xs font-bold uppercase tracking-widest mb-2">Username</label>
          <div class="relative">
            <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-sm"></i>
            <input type="text" name="username" value="cosmosiq_admin" readonly
              class="w-full bg-white/5 border border-white/15 text-white/70 rounded-xl pl-10 pr-4 py-3 text-sm cursor-not-allowed"/>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-purple-200 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-sm"></i>
            <input type="password" name="password" id="pwd" placeholder="Enter admin password"
              class="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-12 py-3 text-sm
                     focus:outline-none focus:border-purple-400 focus:bg-white/15 transition" autofocus/>
            <button type="button" onclick="var p=document.getElementById('pwd');p.type=p.type==='password'?'text':'password'"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition">
              <i class="fas fa-eye text-sm"></i></button>
          </div>
        </div>
        <button type="submit"
          class="w-full gradient-cosmos text-white font-black py-3.5 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2">
          <i class="fas fa-shield-alt"></i> Sign In to Admin
        </button>
      </form>
    </div>
    <p class="text-center text-purple-400/40 text-xs mt-6">
      © ${new Date().getFullYear()} CosmosIQ Talent Solutions · Matriye Group
    </p>
  </div>
</body>
</html>`
}

const app = new Hono<{ Bindings: Bindings }>()

// ── Security Headers Middleware ───────────────────────────────────────────────
app.use('*', async (c, next) => {
  await next()
  // Prevent clickjacking
  c.res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  // Prevent MIME sniffing
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  // XSS protection (legacy browsers)
  c.res.headers.set('X-XSS-Protection', '1; mode=block')
  // Referrer policy
  c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  // Permissions policy
  c.res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  // HSTS (force HTTPS for 1 year with subdomains)
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  // Cross-Origin Opener Policy (isolates browsing context)
  c.res.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  // Cross-Origin Resource Policy
  c.res.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  // Content Security Policy — allows CDN scripts + Google Fonts + FA
  c.res.headers.set('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com data:; " +
    "img-src 'self' https: data:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'self'; " +
    "form-action 'self'; " +
    "base-uri 'self'"
  )
})

// ── OAuth Routes (Google + LinkedIn) ─────────────────────────────────────────
app.route('/', authRoutes)

// ── Internal Email API (POST /api/v1/emails) ─────────────────────────────────
app.route('/', emailApiRoutes)

// ── Email OTP Routes ──────────────────────────────────────────────────────────
app.route('/', otpRoutes)

// ── Home ──────────────────────────────────────────────────────────────────────
app.get('/', (c) => c.html(homePage()))

// ── Jobs ──────────────────────────────────────────────────────────────────────
app.get('/jobs', (c) => {
  const q        = c.req.query('q')        || ''
  const location = c.req.query('location') || ''
  const category = c.req.query('category') || ''
  const type     = c.req.query('type')     || ''
  return c.html(jobsPage(q, location, category, type))
})

// ── Auth pages ────────────────────────────────────────────────────────────────
app.get('/login',           (c) => c.html(loginPage()))
app.get('/signup',          (c) => c.html(signupPage()))
app.get('/forgot-password', (c) => c.html(forgotPasswordPage()))

// ── Dashboards ────────────────────────────────────────────────────────────────
app.get('/dashboard', (c) => c.html(seekerDashboard()))
app.get('/employer',  (c) => c.html(employerDashboard()))

// ── Admin Login / Logout (protected) ─────────────────────────────────────────
app.get('/admin/login', (c) => {
  if (checkAdminAuth(c)) return c.redirect('/admin')
  return c.html(adminLoginPage())
})

app.post('/admin/login', async (c) => {
  const form      = await c.req.parseBody()
  const username  = (form.username as string || '').trim()
  const password  = (form.password as string || '').trim()
  const validPass = c.env?.ADMIN_PASSWORD || ADMIN_PASS_DEFAULT
  if (username === ADMIN_USER && password === validPass) {
    const token = btoa(`${ADMIN_USER}:${Date.now()}`)
    return new Response(null, {
      status: 302,
      headers: {
        'Location':   '/admin',
        'Set-Cookie': `${ADMIN_TOKEN_KEY}=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${8*3600}; Path=/`
      }
    })
  }
  return c.html(adminLoginPage('❌ Invalid username or password. Please try again.'), 401)
})

app.get('/admin/logout', (c) =>
  new Response(null, {
    status: 302,
    headers: {
      'Location':   '/admin/login',
      'Set-Cookie': `${ADMIN_TOKEN_KEY}=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/`
    }
  })
)

app.get('/admin', (c) => {
  if (!checkAdminAuth(c)) return c.redirect('/admin/login')
  return c.html(adminDashboard())
})

// ── Admin Profile ─────────────────────────────────────────────────────────────
const ADMIN_PROFILE_KV_KEY   = 'admin:profile'
const ADMIN_EMAIL_OTP_KV_KEY = 'admin:email_otp'

function adminProfilePage(profile: any, msg = '', msgType = 'success', step = 'form'): string {
  const name   = profile?.name   || ''
  const email  = profile?.email  || ''
  const mobile = profile?.mobile || ''
  const emailVerified = profile?.emailVerified || false

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Admin Profile — CosmosIQ</title>
  <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/></noscript>
  <script>window.tailwind={config:{}}</script>
  <script src="https://cdn.tailwindcss.com" defer></script>
  <style>
    body { font-family:'Segoe UI',Arial,sans-serif; }
    .bg-cosmos { background: linear-gradient(160deg,#0f0c29 0%,#302b63 50%,#24243e 100%); }
    .gradient-cosmos { background: linear-gradient(135deg,#4f46e5,#7c3aed); }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.10); border-radius:20px; }
    .input-field {
      width:100%; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15);
      color:#fff; border-radius:12px; padding:12px 16px 12px 44px;
      font-size:14px; outline:none; transition:border 0.2s;
      box-sizing:border-box;
    }
    .input-field:focus { border-color:#7c3aed; background:rgba(255,255,255,0.1); }
    .input-field::placeholder { color:rgba(255,255,255,0.3); }
    .input-field:read-only { opacity:0.55; cursor:not-allowed; }
    .label { display:block; color:#c4b5fd; font-size:11px; font-weight:700;
             letter-spacing:1.5px; text-transform:uppercase; margin-bottom:8px; }
    .btn-primary {
      gradient-cosmos; background:linear-gradient(135deg,#4f46e5,#7c3aed);
      color:#fff; font-weight:800; padding:12px 28px; border-radius:12px;
      border:none; cursor:pointer; font-size:14px; transition:opacity 0.2s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .btn-primary:hover { opacity:0.88; }
    .btn-secondary {
      background:rgba(255,255,255,0.07); color:#c4b5fd; font-weight:700;
      padding:12px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15);
      cursor:pointer; font-size:13px; transition:all 0.2s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .btn-secondary:hover { background:rgba(255,255,255,0.12); }
    .otp-input {
      width:52px; height:60px; text-align:center; font-size:24px; font-weight:900;
      background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.2);
      color:#fff; border-radius:14px; outline:none; transition:all 0.2s;
    }
    .otp-input:focus { border-color:#7c3aed; background:rgba(124,58,237,0.2); }
    .verified-badge { display:inline-flex; align-items:center; gap:5px;
      background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3);
      color:#34d399; border-radius:20px; padding:3px 10px; font-size:11px; font-weight:700; }
    .unverified-badge { display:inline-flex; align-items:center; gap:5px;
      background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3);
      color:#fbbf24; border-radius:20px; padding:3px 10px; font-size:11px; font-weight:700; }
  </style>
</head>
<body class="bg-cosmos min-h-screen">

  <!-- Top nav -->
  <div class="border-b border-white/10 bg-black/20 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <a href="/admin" class="text-purple-300 hover:text-white transition text-sm flex items-center gap-2">
        <i class="fas fa-arrow-left text-xs"></i> Back to Dashboard
      </a>
      <span class="text-white/20 text-sm">|</span>
      <span class="text-white font-bold text-sm flex items-center gap-2">
        <i class="fas fa-user-shield text-purple-400"></i> Admin Profile
      </span>
    </div>
    <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
      <span class="text-2xl">🌌</span>
      <div>
        <div class="text-white text-xs font-black">CosmosIQ</div>
        <div class="text-purple-400 text-[10px] font-semibold uppercase tracking-widest">Admin</div>
      </div>
    </div>
  </div>

  <div class="max-w-2xl mx-auto px-4 py-10">

    <!-- Page title -->
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-3">
        <!-- Avatar -->
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
             style="background:linear-gradient(135deg,#4f46e5,#7c3aed);">
          ${name ? name.charAt(0).toUpperCase() : 'A'}
        </div>
        <div>
          <h1 class="text-white text-2xl font-black">${name || 'Admin Profile'}</h1>
          <p class="text-purple-300 text-sm">Super Administrator · CosmosIQ Careers</p>
        </div>
      </div>
    </div>

    <!-- Alert message -->
    ${msg ? `
    <div class="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-3 font-semibold
      ${msgType === 'success'
        ? 'bg-green-500/15 border border-green-500/30 text-green-300'
        : msgType === 'error'
        ? 'bg-red-500/15 border border-red-500/30 text-red-300'
        : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'}">
      <i class="fas ${msgType === 'success' ? 'fa-check-circle' : msgType === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
      ${msg}
    </div>` : ''}

    <!-- ── STEP: OTP Verification box ── -->
    ${step === 'otp' ? `
    <div class="card p-8 mb-6 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
           style="background:linear-gradient(135deg,#4f46e5,#7c3aed);">✉️</div>
      <h2 class="text-white font-black text-xl mb-2">Verify Your Email</h2>
      <p class="text-gray-400 text-sm mb-6">
        A 6-digit code was sent to <strong class="text-purple-300">${email}</strong><br/>
        Enter it below to verify your email address.
      </p>
      <form method="POST" action="/admin/profile/verify-otp">
        <div class="flex justify-center gap-3 mb-6" id="otp-boxes">
          <input class="otp-input" type="text" maxlength="1" name="d1" inputmode="numeric" autofocus
                 oninput="moveNext(this,'d2')" onkeydown="movePrev(event,this,'')"/>
          <input class="otp-input" type="text" maxlength="1" name="d2" inputmode="numeric"
                 oninput="moveNext(this,'d3')" onkeydown="movePrev(event,this,'d1')"/>
          <input class="otp-input" type="text" maxlength="1" name="d3" inputmode="numeric"
                 oninput="moveNext(this,'d4')" onkeydown="movePrev(event,this,'d2')"/>
          <input class="otp-input" type="text" maxlength="1" name="d4" inputmode="numeric"
                 oninput="moveNext(this,'d5')" onkeydown="movePrev(event,this,'d3')"/>
          <input class="otp-input" type="text" maxlength="1" name="d5" inputmode="numeric"
                 oninput="moveNext(this,'d6')" onkeydown="movePrev(event,this,'d4')"/>
          <input class="otp-input" type="text" maxlength="1" name="d6" inputmode="numeric"
                 oninput="moveNext(this,'')"  onkeydown="movePrev(event,this,'d5')"/>
        </div>
        <div class="flex justify-center gap-3">
          <button type="submit" class="btn-primary">
            <i class="fas fa-check-circle"></i> Verify Email
          </button>
          <a href="/admin/profile" class="btn-secondary">
            <i class="fas fa-times"></i> Cancel
          </a>
        </div>
        <p class="text-gray-500 text-xs mt-4">
          Didn't receive the code?
          <a href="/admin/profile/send-otp?email=${encodeURIComponent(email)}&resend=1"
             class="text-purple-400 hover:text-purple-300 font-semibold">Resend OTP</a>
        </p>
      </form>
    </div>
    <script>
      function moveNext(el, nextId) {
        if (el.value.length === 1 && nextId) {
          document.getElementsByName(nextId)[0]?.focus();
        }
      }
      function movePrev(e, el, prevId) {
        if (e.key === 'Backspace' && el.value === '' && prevId) {
          document.getElementsByName(prevId)[0]?.focus();
        }
      }
    </script>
    ` : `

    <!-- ── STEP: Profile form ── -->
    <form method="POST" action="/admin/profile">
      <div class="card p-6 mb-5">
        <h2 class="text-white font-black text-base mb-5 flex items-center gap-2">
          <i class="fas fa-id-card text-purple-400"></i> Personal Information
        </h2>

        <!-- Full Name -->
        <div class="mb-5">
          <label class="label">Full Name</label>
          <div class="relative">
            <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-sm"></i>
            <input type="text" name="name" value="${name}" placeholder="Enter your full name"
                   class="input-field" required/>
          </div>
        </div>

        <!-- Email with verification status -->
        <div class="mb-5">
          <label class="label">
            Email Address
            <span class="ml-2 ${emailVerified ? 'verified-badge' : 'unverified-badge'}">
              <i class="fas ${emailVerified ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
              ${emailVerified ? 'Verified' : 'Not Verified'}
            </span>
          </label>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-sm"></i>
              <input type="email" name="email" value="${email}" placeholder="admin@cosmosiqcareers.com"
                     class="input-field" required/>
            </div>
            <a href="/admin/profile/send-otp?email=${encodeURIComponent(email)}"
               id="verifyBtn"
               class="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition
               ${emailVerified
                 ? 'bg-green-900/40 border border-green-700/50 text-green-400 pointer-events-none'
                 : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500'}">
              <i class="fas ${emailVerified ? 'fa-check' : 'fa-paper-plane'} text-xs"></i>
              ${emailVerified ? 'Verified' : 'Send OTP'}
            </a>
          </div>
          ${!emailVerified ? `<p class="text-amber-400/70 text-xs mt-2 flex items-center gap-1">
            <i class="fas fa-info-circle"></i>
            Save your email first, then click "Send OTP" to verify it.
          </p>` : ''}
        </div>

        <!-- Mobile -->
        <div class="mb-2">
          <label class="label">Mobile Number</label>
          <div class="relative">
            <i class="fas fa-mobile-alt absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-sm"></i>
            <input type="tel" name="mobile" value="${mobile}" placeholder="+91 89564 18531"
                   class="input-field" pattern="[+]?[0-9\\s\\-]{10,15}"/>
          </div>
          <p class="text-gray-500 text-xs mt-2">Format: +91 XXXXXXXXXX or 10-digit number</p>
        </div>
      </div>

      <!-- Save button -->
      <div class="flex items-center justify-between">
        <button type="submit" class="btn-primary">
          <i class="fas fa-save"></i> Save Profile
        </button>
        <a href="/admin" class="btn-secondary">
          <i class="fas fa-times"></i> Cancel
        </a>
      </div>
    </form>

    <!-- Email change tip -->
    <p class="text-gray-600 text-xs text-center mt-6">
      <i class="fas fa-lock mr-1"></i>
      If you change your email address, you'll need to verify the new one with OTP.
    </p>

    <script>
      // When email input changes, update the Send OTP button href dynamically
      document.querySelector('input[name="email"]').addEventListener('input', function() {
        var btn = document.getElementById('verifyBtn');
        if (btn) btn.href = '/admin/profile/send-otp?email=' + encodeURIComponent(this.value);
      });
    </script>
    `}

  </div>
</body>
</html>`
}

// ── Admin Profile Routes ──────────────────────────────────────────────────────

// GET /admin/profile — show profile page
app.get('/admin/profile', async (c) => {
  if (!checkAdminAuth(c)) return c.redirect('/admin/login')
  const raw     = c.env?.OTP_KV ? await c.env.OTP_KV.get(ADMIN_PROFILE_KV_KEY) : null
  const profile = raw ? JSON.parse(raw) : {}
  return c.html(adminProfilePage(profile))
})

// POST /admin/profile — save name, email, mobile
app.post('/admin/profile', async (c) => {
  if (!checkAdminAuth(c)) return c.redirect('/admin/login')
  const form   = await c.req.parseBody()
  const name   = (form.name   as string || '').trim()
  const email  = (form.email  as string || '').trim().toLowerCase()
  const mobile = (form.mobile as string || '').trim()

  if (!name)  return c.html(adminProfilePage({ name, email, mobile }, 'Full name is required.', 'error'))
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.html(adminProfilePage({ name, email, mobile }, 'Please enter a valid email address.', 'error'))

  // Load existing profile to check if email changed → reset verification
  const raw     = c.env?.OTP_KV ? await c.env.OTP_KV.get(ADMIN_PROFILE_KV_KEY) : null
  const existing = raw ? JSON.parse(raw) : {}
  const emailChanged = existing.email && existing.email !== email

  const profile = {
    name,
    email,
    mobile,
    emailVerified: emailChanged ? false : (existing.emailVerified || false),
    updatedAt: new Date().toISOString()
  }

  if (c.env?.OTP_KV) {
    await c.env.OTP_KV.put(ADMIN_PROFILE_KV_KEY, JSON.stringify(profile))
  }

  const msg = emailChanged
    ? 'Profile saved. Email changed — please verify your new email with OTP.'
    : 'Profile saved successfully!'
  const type = emailChanged ? 'info' : 'success'
  return c.html(adminProfilePage(profile, msg, type))
})

// GET /admin/profile/send-otp — send OTP to admin email
app.get('/admin/profile/send-otp', async (c) => {
  if (!checkAdminAuth(c)) return c.redirect('/admin/login')

  const emailParam = (c.req.query('email') || '').trim().toLowerCase()
  const isResend   = c.req.query('resend') === '1'

  // Load current profile
  const raw     = c.env?.OTP_KV ? await c.env.OTP_KV.get(ADMIN_PROFILE_KV_KEY) : null
  const profile = raw ? JSON.parse(raw) : {}

  // Must have saved email first
  if (!emailParam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailParam)) {
    return c.html(adminProfilePage(profile, 'Please save a valid email address first, then click Send OTP.', 'error'))
  }

  // Generate 6-digit OTP
  const arr = new Uint8Array(3)
  crypto.getRandomValues(arr)
  const otp = (((arr[0] << 16) | (arr[1] << 8) | arr[2]) % 1000000).toString().padStart(6, '0')

  // Store OTP in KV (5 min TTL)
  if (c.env?.OTP_KV) {
    await c.env.OTP_KV.put(
      ADMIN_EMAIL_OTP_KV_KEY,
      JSON.stringify({ otp, email: emailParam, attempts: 0, createdAt: Date.now() }),
      { expirationTtl: 300 }
    )
  }

  // Send OTP email via GoDaddy mailer
  const subject = `${otp} — CosmosIQ Admin Email Verification`
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0f0c29;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"
  style="background:linear-gradient(160deg,#0f0c29,#302b63,#24243e);padding:40px 16px;">
  <tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0"
      style="background:#1e1b4b;border-radius:24px;overflow:hidden;border:1px solid rgba(99,102,241,0.3);">
      <tr>
        <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;text-align:center;">
          <div style="font-size:36px;margin-bottom:10px;">🛡️</div>
          <h1 style="color:#fff;font-size:20px;font-weight:900;margin:0 0 4px;">Admin Email Verification</h1>
          <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0;">CosmosIQ Careers · Super Administrator</p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 32px;">
          <p style="color:#e0e7ff;font-size:15px;font-weight:700;margin:0 0 6px;">Hello, Admin 👋</p>
          <p style="color:#a5b4fc;font-size:13px;line-height:1.7;margin:0 0 28px;">
            ${isResend ? 'You requested a new verification code.' : 'Use the code below to verify your email address for the Admin profile.'}
            This code expires in <strong style="color:#fff;">5 minutes</strong>.
          </p>
          <!-- OTP digits -->
          <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 24px;">
            <tr>
              ${otp.split('').map(d => `
              <td style="padding:0 5px;">
                <div style="width:48px;height:60px;background:linear-gradient(135deg,#4f46e5,#7c3aed);
                            border-radius:14px;text-align:center;line-height:60px;
                            color:#fff;font-size:28px;font-weight:900;font-family:'Courier New',monospace;
                            box-shadow:0 4px 14px rgba(79,70,229,0.5);">${d}</div>
              </td>`).join('')}
            </tr>
          </table>
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);
                      border-radius:12px;padding:14px 18px;margin:0 0 20px;">
            <p style="color:#fbbf24;font-size:12px;font-weight:700;margin:0 0 2px;">⚠️ Security Notice</p>
            <p style="color:#f59e0b;font-size:12px;margin:0;">
              Never share this code. If you didn't request this, your account may be at risk.
            </p>
          </div>
          <p style="color:#6b7280;font-size:11px;margin:0;">
            Sent to: ${emailParam} · CosmosIQ Admin Portal
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#0f0c29;padding:18px 32px;text-align:center;
                   border-top:1px solid rgba(99,102,241,0.2);">
          <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">
            © ${new Date().getFullYear()} CosmosIQ Talent Solutions · Matriye Group · Pune, India
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`

  const text = `CosmosIQ Admin Email Verification\n\nYour OTP: ${otp}\n\nExpires in 5 minutes. Do not share this code.\n\n— CosmosIQ Admin Portal`

  try {
    const res = await fetch('https://mail.cosmosiqcareers.com/mailer.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': c.env?.INTERNAL_API_KEY || 'SET_VIA_CLOUDFLARE_SECRET' },
      body: JSON.stringify({ to: emailParam, from: 'noreply@cosmosiqcareers.com', subject, html, text })
    })
    const data = await res.json() as any
    if ((res.status === 200 || res.status === 201) && data?.success) {
      // Show OTP input page
      const updatedProfile = { ...profile, email: emailParam }
      return c.html(adminProfilePage(updatedProfile,
        `Verification code sent to ${emailParam}. Check your inbox.`, 'info', 'otp'))
    }
    throw new Error(`Mailer returned ${res.status}`)
  } catch (err: any) {
    return c.html(adminProfilePage(profile,
      `Failed to send OTP: ${err.message}. Please try again.`, 'error'))
  }
})

// POST /admin/profile/verify-otp — verify the 6-digit code
app.post('/admin/profile/verify-otp', async (c) => {
  if (!checkAdminAuth(c)) return c.redirect('/admin/login')

  const form = await c.req.parseBody()
  const otp  = ['d1','d2','d3','d4','d5','d6'].map(k => (form[k] as string || '').trim()).join('')

  // Load current profile
  const profileRaw = c.env?.OTP_KV ? await c.env.OTP_KV.get(ADMIN_PROFILE_KV_KEY) : null
  const profile    = profileRaw ? JSON.parse(profileRaw) : {}

  if (!/^\d{6}$/.test(otp)) {
    return c.html(adminProfilePage(profile, 'Please enter all 6 digits.', 'error', 'otp'))
  }

  // Load stored OTP
  const otpRaw = c.env?.OTP_KV ? await c.env.OTP_KV.get(ADMIN_EMAIL_OTP_KV_KEY) : null
  if (!otpRaw) {
    return c.html(adminProfilePage(profile, 'OTP expired or not found. Please request a new one.', 'error'))
  }

  const stored = JSON.parse(otpRaw)

  // Max 3 attempts
  if (stored.attempts >= 3) {
    if (c.env?.OTP_KV) await c.env.OTP_KV.delete(ADMIN_EMAIL_OTP_KV_KEY)
    return c.html(adminProfilePage(profile, 'Too many failed attempts. Please request a new OTP.', 'error'))
  }

  if (stored.otp !== otp) {
    stored.attempts++
    if (c.env?.OTP_KV) {
      await c.env.OTP_KV.put(ADMIN_EMAIL_OTP_KV_KEY, JSON.stringify(stored), { expirationTtl: 300 })
    }
    const left = 3 - stored.attempts
    return c.html(adminProfilePage(profile,
      `Incorrect code. ${left} attempt${left !== 1 ? 's' : ''} remaining.`, 'error', 'otp'))
  }

  // ✅ OTP correct — mark email as verified
  if (c.env?.OTP_KV) await c.env.OTP_KV.delete(ADMIN_EMAIL_OTP_KV_KEY)

  const updatedProfile = { ...profile, email: stored.email, emailVerified: true, updatedAt: new Date().toISOString() }
  if (c.env?.OTP_KV) {
    await c.env.OTP_KV.put(ADMIN_PROFILE_KV_KEY, JSON.stringify(updatedProfile))
  }

  return c.html(adminProfilePage(updatedProfile,
    `✅ Email ${stored.email} verified successfully!`, 'success'))
})
app.get('/about',     (c) => c.html(aboutPage()))
app.get('/blog',      (c) => c.html(blogPage()))
app.get('/careers',   (c) => c.html(careersPage()))
app.get('/contact',   (c) => c.html(contactPage()))
app.get('/companies', (c) => c.html(companiesPage()))
app.get('/terms',     (c) => c.html(termsPage()))
app.get('/privacy',   (c) => c.html(privacyPage()))

// ── Redirect aliases ──────────────────────────────────────────────────────────
app.get('/register', (c) => c.redirect('/signup'))
app.get('/post-job', (c) => c.redirect('/employer'))

// ── Sitemap XML ───────────────────────────────────────────────────────────────
app.get('/sitemap.xml', (c) => {
  const BASE = 'https://cosmosiqcareers.com'
  const today = new Date().toISOString().split('T')[0]   // e.g. 2026-02-25

  // ── 1. Static public pages ──────────────────────────────────────────────────
  const staticPages = [
    { url: '/',          priority: '1.0', changefreq: 'daily'   },
    { url: '/jobs',      priority: '0.9', changefreq: 'hourly'  },
    { url: '/companies', priority: '0.8', changefreq: 'weekly'  },
    { url: '/about',     priority: '0.7', changefreq: 'monthly' },
    { url: '/blog',      priority: '0.8', changefreq: 'weekly'  },
    { url: '/careers',   priority: '0.7', changefreq: 'monthly' },
    { url: '/contact',   priority: '0.6', changefreq: 'monthly' },
    { url: '/terms',     priority: '0.3', changefreq: 'yearly'  },
    { url: '/privacy',   priority: '0.3', changefreq: 'yearly'  },
  ]

  // ── 2. Job category filter pages ────────────────────────────────────────────
  const categories = [
    'Technology', 'Marketing', 'Finance', 'Design',
    'Healthcare', 'Education', 'Human Resources', 'Operations',
    'Data Science', 'Management',
  ]
  const categoryPages = categories.map(cat => ({
    url: `/jobs?category=${encodeURIComponent(cat)}`,
    priority: '0.8',
    changefreq: 'daily',
  }))

  // ── 3. Location filter pages (major Indian cities) ──────────────────────────
  const locations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune',
    'Chennai', 'Kolkata', 'Ahmedabad', 'Noida', 'Gurugram', 'Remote',
  ]
  const locationPages = locations.map(loc => ({
    url: `/jobs?location=${encodeURIComponent(loc)}`,
    priority: '0.7',
    changefreq: 'daily',
  }))

  // ── 4. Job type filter pages ────────────────────────────────────────────────
  const jobTypes = ['Full Time', 'Remote', 'Part Time', 'Contract', 'Internship']
  const typePages = jobTypes.map(type => ({
    url: `/jobs?type=${encodeURIComponent(type)}`,
    priority: '0.7',
    changefreq: 'daily',
  }))

  // ── 5. Individual job listing pages ─────────────────────────────────────────
  const jobPages = JOBS.map(job => ({
    url: `/jobs/${job.id}/${job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    priority: '0.6',
    changefreq: 'weekly',
  }))

  // ── 6. Blog post pages ───────────────────────────────────────────────────────
  const blogPages = [
    { slug: 'ats-friendly-resume-2026',           date: '2026-02-18' },
    { slug: 'top-10-skills-employers-2026',       date: '2026-02-15' },
    { slug: 'behavioral-interviews-star-method',  date: '2026-02-12' },
    { slug: 'remote-work-2026-opportunities',     date: '2026-02-10' },
    { slug: 'salary-negotiation-guide',           date: '2026-02-08' },
    { slug: 'linkedin-profile-tips-recruiters',   date: '2026-02-05' },
  ].map(b => ({
    url: `/blog/${b.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: b.date,
  }))

  // ── 7. Popular keyword search pages ─────────────────────────────────────────
  const popularSearches = [
    'React Developer', 'Data Scientist', 'Product Manager',
    'DevOps Engineer', 'UX Designer', 'Python Developer',
    'Digital Marketing', 'Business Analyst', 'Java Developer',
    'Machine Learning Engineer', 'HR Manager', 'Sales Manager',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Cloud Architect', 'Cybersecurity Analyst', 'Content Writer',
    'Graphic Designer', 'Financial Analyst',
  ]
  const searchPages = popularSearches.map(q => ({
    url: `/jobs?q=${encodeURIComponent(q)}`,
    priority: '0.65',
    changefreq: 'daily',
  }))

  // ── Build XML ────────────────────────────────────────────────────────────────
  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...locationPages,
    ...typePages,
    ...jobPages,
    ...blogPages,
    ...searchPages,
  ]

  const urlEntries = allPages.map(p => `
  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${(p as any).lastmod || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`

  return c.body(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600',
  })
})

// ── Robots.txt ────────────────────────────────────────────────────────────────
app.get('/robots.txt', (c) => {
  const BASE = 'https://cosmosiqcareers.com'
  const robots = `# CosmosIQ Careers — robots.txt
# Generated: 2026-02-25
# Site: ${BASE}

User-agent: *
Allow: /

# Public pages — always crawl
Allow: /jobs
Allow: /jobs?*
Allow: /companies
Allow: /about
Allow: /blog
Allow: /blog/*
Allow: /careers
Allow: /contact
Allow: /terms
Allow: /privacy
Allow: /sitemap.xml

# Block admin & private pages
Disallow: /admin
Disallow: /admin/*
Disallow: /dashboard
Disallow: /employer
Disallow: /login
Disallow: /signup
Disallow: /forgot-password
Disallow: /otp-verify
Disallow: /api/
Disallow: /auth/

# Block internal redirects
Disallow: /register
Disallow: /post-job

# Crawl delay (be polite to servers)
Crawl-delay: 1

# Sitemaps
Sitemap: ${BASE}/sitemap.xml

# ── Specific bot rules ────────────────────────────────────────────────────────
# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`

  return c.body(robots, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
  })
})

// ── API: Jobs ─────────────────────────────────────────────────────────────────
app.get('/api/jobs', (c) => {
  const q = c.req.query('q') || ''
  const filtered = q
    ? JOBS.filter(j =>
        j.title.toLowerCase().includes(q.toLowerCase()) ||
        j.company.toLowerCase().includes(q.toLowerCase()))
    : JOBS
  return c.json({ success: true, count: filtered.length, jobs: filtered })
})

app.get('/api/jobs/:id', (c) => {
  const job = JOBS.find(j => j.id === parseInt(c.req.param('id')))
  if (!job) return c.json({ success: false, error: 'Job not found' }, 404)
  return c.json({ success: true, job })
})

// ── API: Newsletter ───────────────────────────────────────────────────────────
app.post('/api/newsletter', async (c) => {
  const { email } = await c.req.json()
  if (!email) return c.json({ success: false, error: 'Email required' }, 400)
  return c.json({ success: true, message: 'Subscribed successfully!' })
})

// ── API: Contact ──────────────────────────────────────────────────────────────
app.post('/api/contact', async (c) => {
  const data = await c.req.json()
  if (!data.email || !data.message)
    return c.json({ success: false, error: 'Email and message required' }, 400)
  return c.json({ success: true, message: 'Message received. We will reply within 24 hours.' })
})

// ── 404 ───────────────────────────────────────────────────────────────────────
app.notFound((c) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>404 — CosmosIQ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet"/>
  <style>body{font-family:'Inter',sans-serif;}.gradient-cosmos{background:linear-gradient(135deg,#4f46e5,#7c3aed)}</style>
</head>
<body class="bg-gray-50 flex items-center justify-center min-h-screen text-center px-4">
  <div>
    <div class="text-8xl font-black text-gray-900 mb-4">404</div>
    <div class="text-6xl mb-6">🌌</div>
    <h1 class="text-2xl font-black text-gray-900 mb-2">Page Lost in the Cosmos</h1>
    <p class="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="/" class="gradient-cosmos text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">Go Home</a>
      <a href="/jobs" class="border-2 border-indigo-500 text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition">Browse Jobs</a>
    </div>
  </div>
</body>
</html>`
  return c.html(html, 404)
})

export default app
