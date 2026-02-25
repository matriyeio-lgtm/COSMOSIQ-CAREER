// ─── OAuth Handler — Google & LinkedIn ──────────────────────────────────────
// Flow: /auth/google → Google → /auth/google/callback → profile → /auth/success
//       /auth/linkedin → LinkedIn → /auth/linkedin/callback → profile → /auth/success
// v3 — credentials via env bindings with fallback to build-time constants

import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

type Bindings = {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  LINKEDIN_CLIENT_ID: string
  LINKEDIN_CLIENT_SECRET: string
  BASE_URL: string
}

// ── Build-time fallback constants (set via Cloudflare env secrets) ─────────────
// IMPORTANT: Set real values as Cloudflare Pages secrets, not here!
const BUILD_GOOGLE_CLIENT_ID      = process.env.GOOGLE_CLIENT_ID      || 'SET_VIA_CLOUDFLARE_SECRET'
const BUILD_GOOGLE_CLIENT_SECRET  = process.env.GOOGLE_CLIENT_SECRET  || 'SET_VIA_CLOUDFLARE_SECRET'
const BUILD_LINKEDIN_CLIENT_ID    = process.env.LINKEDIN_CLIENT_ID    || 'SET_VIA_CLOUDFLARE_SECRET'
const BUILD_LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || 'SET_VIA_CLOUDFLARE_SECRET'
const BUILD_BASE_URL              = 'https://cosmosiqcareers.com'

export function registerAuthRoutes(app: Hono<{ Bindings: Bindings }>) {

// ── Utility: Generate random state string ────────────────────────────────────
function generateState(): string {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}

// ── Utility: Base64url encode ─────────────────────────────────────────────────
function base64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// ── Utility: Create simple JWT-like session token ────────────────────────────
function createSessionToken(user: Record<string, string>): string {
  const payload = base64urlEncode(JSON.stringify({ ...user, iat: Date.now() }))
  return `cosmosiq.${payload}`
}

// ── Utility: Parse session token ─────────────────────────────────────────────
function parseSessionToken(token: string): Record<string, string> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 2 || parts[0] !== 'cosmosiq') return null
    return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// GOOGLE OAUTH
// ══════════════════════════════════════════════════════════════════════════════

// Step 1: Redirect to Google Authorization
app.get('/auth/google', (c) => {
  const clientId = c.env?.GOOGLE_CLIENT_ID || BUILD_GOOGLE_CLIENT_ID
  const baseUrl  = c.env?.BASE_URL          || BUILD_BASE_URL

  if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
    return c.html(oauthErrorPage('Google OAuth not configured', 'GOOGLE_CLIENT_ID is not set.'))
  }

  const state = generateState()
  setCookie(c, 'oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 600, // 10 minutes
    path: '/'
  })

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'online',
    prompt: 'select_account'
  })

  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
})

// Step 2: Handle Google Callback
app.get('/auth/google/callback', async (c) => {
  const clientId     = c.env?.GOOGLE_CLIENT_ID     || BUILD_GOOGLE_CLIENT_ID
  const clientSecret = c.env?.GOOGLE_CLIENT_SECRET || BUILD_GOOGLE_CLIENT_SECRET
  const baseUrl      = c.env?.BASE_URL              || BUILD_BASE_URL

  const code = c.req.query('code')
  const state = c.req.query('state')
  const error = c.req.query('error')
  const savedState = getCookie(c, 'oauth_state')

  // Handle user cancellation
  if (error === 'access_denied') {
    return c.redirect('/login?error=cancelled')
  }

  // Validate state to prevent CSRF
  if (!state || !savedState || state !== savedState) {
    return c.html(oauthErrorPage('Security Error', 'State mismatch detected. This could be a CSRF attack. Please try logging in again.'))
  }

  if (!code) {
    return c.html(oauthErrorPage('Authorization Failed', 'No authorization code received from Google.'))
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${baseUrl}/auth/google/callback`
      })
    })

    const tokenData = await tokenRes.json() as any

    if (!tokenRes.ok || tokenData.error) {
      return c.html(oauthErrorPage('Token Exchange Failed', tokenData.error_description || 'Failed to exchange code for token.'))
    }

    // Fetch user profile from Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })

    const profile = await profileRes.json() as any

    if (!profileRes.ok) {
      return c.html(oauthErrorPage('Profile Fetch Failed', 'Could not retrieve your Google profile information.'))
    }

    // Create session
    const sessionToken = createSessionToken({
      id: profile.id,
      name: profile.name || '',
      email: profile.email || '',
      picture: profile.picture || '',
      provider: 'google',
      given_name: profile.given_name || '',
      family_name: profile.family_name || '',
    })

    // Set session cookie
    setCookie(c, 'cosmosiq_session', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    // Clear state cookie
    deleteCookie(c, 'oauth_state', { path: '/' })

    return c.redirect('/auth/success')

  } catch (err) {
    console.error('Google OAuth error:', err)
    return c.html(oauthErrorPage('Unexpected Error', 'Something went wrong during Google authentication. Please try again.'))
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// LINKEDIN OAUTH
// ══════════════════════════════════════════════════════════════════════════════
// Your LinkedIn app has "profile" + "openid" scopes available (partial OIDC).
// We use scope: "openid profile" — this works and gives name + photo.
// Email is NOT requested (requires "Sign In with LinkedIn using OpenID Connect"
// product to be fully enabled). We fall back gracefully to LinkedIn username.

app.get('/auth/linkedin', (c) => {
  const clientId = c.env?.LINKEDIN_CLIENT_ID || BUILD_LINKEDIN_CLIENT_ID
  const baseUrl  = c.env?.BASE_URL            || BUILD_BASE_URL

  if (!clientId || clientId === 'YOUR_LINKEDIN_CLIENT_ID') {
    return c.html(oauthErrorPage('LinkedIn OAuth not configured', 'LINKEDIN_CLIENT_ID is not set.'))
  }

  const state = generateState()
  setCookie(c, 'oauth_state', state, {
    httpOnly: true, secure: true, sameSite: 'Lax', maxAge: 600, path: '/'
  })

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: `${baseUrl}/auth/linkedin/callback`,
    state: state,
    scope: 'openid profile email'  // ✅ all three scopes now active (OIDC product approved)
  })

  return c.redirect(`https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`)
})

// Keep /auth/linkedin/legacy as alias
app.get('/auth/linkedin/legacy', (c) => c.redirect('/auth/linkedin'))

// Step 2: Handle LinkedIn Callback (handles both OIDC and legacy)
app.get('/auth/linkedin/callback', async (c) => {
  const clientId     = c.env?.LINKEDIN_CLIENT_ID     || BUILD_LINKEDIN_CLIENT_ID
  const clientSecret = c.env?.LINKEDIN_CLIENT_SECRET || BUILD_LINKEDIN_CLIENT_SECRET
  const baseUrl      = c.env?.BASE_URL                || BUILD_BASE_URL

  const code       = c.req.query('code')
  const state      = c.req.query('state')
  const error      = c.req.query('error')
  const errorDesc  = c.req.query('error_description') || ''
  const savedState = getCookie(c, 'oauth_state')

  // ── Handle cancellation ─────────────────────────────────────────────────────
  if (error === 'user_cancelled_login' || error === 'user_cancelled_authorize') {
    return c.redirect('/login?error=cancelled')
  }

  // ── Scope error — LinkedIn app missing required Product ─────────────────────
  if (error === 'invalid_scope_error') {
    deleteCookie(c, 'oauth_state', { path: '/' })
    deleteCookie(c, 'li_scope_mode', { path: '/' })
    return c.html(linkedinSetupGuidePage())
  }

  // ── Any other OAuth error ───────────────────────────────────────────────────
  if (error) {
    const friendly = error === 'access_denied'
      ? 'You cancelled the LinkedIn login. Please try again.'
      : `LinkedIn returned: <strong>${error}</strong>. ${errorDesc}`
    return c.html(oauthErrorPage('LinkedIn Login Failed', friendly))
  }

  // ── CSRF state check ────────────────────────────────────────────────────────
  if (!state || !savedState || state !== savedState) {
    return c.html(oauthErrorPage('Security Error', 'State mismatch. Please try logging in again.'))
  }

  if (!code) {
    return c.html(oauthErrorPage('Authorization Failed', 'No authorization code received from LinkedIn.'))
  }

  try {
    // ── Exchange code for access token ────────────────────────────────────────
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${baseUrl}/auth/linkedin/callback`,
        client_id: clientId,
        client_secret: clientSecret
      })
    })

    const tokenData = await tokenRes.json() as any

    if (!tokenRes.ok || tokenData.error) {
      return c.html(oauthErrorPage('Token Exchange Failed',
        tokenData.error_description || `HTTP ${tokenRes.status}: Failed to exchange code.`))
    }

    const accessToken = tokenData.access_token

    // ── Fetch profile via OIDC userinfo endpoint ──────────────────────────────
    // scope "openid profile" gives: sub, name, given_name, family_name, picture
    // email is NOT available without the full OIDC product — handled gracefully
    const uiRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const ui = await uiRes.json() as any

    if (!uiRes.ok) {
      return c.html(oauthErrorPage('Profile Error',
        `Could not fetch LinkedIn profile (HTTP ${uiRes.status}). Please try again.`))
    }

    const profileId = ui.sub          || `li_${Date.now()}`
    const firstName = ui.given_name   || ''
    const lastName  = ui.family_name  || ''
    const fullName  = ui.name         || `${firstName} ${lastName}`.trim() || 'LinkedIn User'
    const email     = ui.email        || ''   // may be empty without email scope
    const picture   = ui.picture      || ''

    // ── Build session ────────────────────────────────────────────────────────
    const sessionToken = createSessionToken({
      id:          profileId,
      name:        fullName,
      email:       email,
      picture:     picture,
      provider:    'linkedin',
      given_name:  firstName,
      family_name: lastName,
    })

    setCookie(c, 'cosmosiq_session', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    deleteCookie(c, 'oauth_state', { path: '/' })

    return c.redirect('/auth/success')

  } catch (err) {
    console.error('LinkedIn OAuth error:', err)
    return c.html(oauthErrorPage('Unexpected Error',
      'Something went wrong during LinkedIn authentication. Please try again.'))
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// SUCCESS PAGE — Shown after successful OAuth login
// ══════════════════════════════════════════════════════════════════════════════
app.get('/auth/success', (c) => {
  const sessionToken = getCookie(c, 'cosmosiq_session')
  const user = sessionToken ? parseSessionToken(sessionToken) : null

  if (!user) {
    return c.redirect('/login?error=session_failed')
  }

  const providerIcon = user.provider === 'google'
    ? `<svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`
    : `<i class="fab fa-linkedin-in text-white"></i>`

  const providerColor = user.provider === 'google' ? 'border-gray-200 bg-white text-gray-700' : 'bg-[#0077B5] text-white border-[#0077B5]'
  const providerLabel = user.provider === 'google' ? 'Google' : 'LinkedIn'

  const avatarContent = user.picture
    ? `<img src="${user.picture}" alt="${user.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer"/>`
    : `<span class="text-2xl font-black text-white">${(user.name || 'U').charAt(0).toUpperCase()}</span>`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome — CosmosIQ</title>
  <link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/></noscript>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"/></noscript>
  <script>window.tailwind={config:{}}</script>
  <script src="https://cdn.tailwindcss.com" defer></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
    .gradient-cosmos { background: linear-gradient(135deg, #4f46e5, #7c3aed); }
    @keyframes confetti { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
    .confetti-piece { position:fixed; width:10px; height:10px; animation: confetti 3s ease-in forwards; }
  </style>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center px-4">

  <!-- Confetti -->
  <div id="confetti-container"></div>

  <div class="w-full max-w-md">
    <!-- Success Card -->
    <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      
      <!-- Top Banner -->
      <div class="gradient-cosmos p-8 text-center text-white relative overflow-hidden">
        <div class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10"></div>
        <div class="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/10"></div>
        <div class="relative">
          <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 mx-auto mb-3 flex items-center justify-center bg-white/20">
            ${avatarContent}
          </div>
          <div class="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <i class="fas fa-check-circle text-green-300"></i> Verified via ${providerLabel}
          </div>
          <h1 class="text-2xl font-black">Welcome, ${user.given_name || user.name}! 🎉</h1>
          <p class="text-white/70 text-sm mt-1">You're now signed in to CosmosIQ</p>
        </div>
      </div>

      <!-- User Info -->
      <div class="p-6">
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i class="fas fa-user text-cosmos-500 w-5 text-center" style="color:#6366f1"></i>
            <div>
              <p class="text-xs text-gray-400">Full Name</p>
              <p class="font-semibold text-gray-900 text-sm">${user.name}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i class="fas fa-envelope w-5 text-center" style="color:#6366f1"></i>
            <div>
              <p class="text-xs text-gray-400">Email Address</p>
              <p class="font-semibold text-gray-900 text-sm">${user.email}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div class="w-5 flex items-center justify-center ${user.provider === 'linkedin' ? 'text-[#0077B5]' : ''}">
              ${user.provider === 'google'
                ? `<svg viewBox="0 0 24 24" class="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`
                : `<i class="fab fa-linkedin-in text-[#0077B5]"></i>`}
            </div>
            <div>
              <p class="text-xs text-gray-400">Signed in via</p>
              <p class="font-semibold text-gray-900 text-sm capitalize">${providerLabel} OAuth 2.0</p>
            </div>
            <span class="ml-auto bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
              <i class="fas fa-shield-alt mr-1"></i>Secure
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-2">
          <a href="/dashboard" class="w-full flex items-center justify-center gap-2 gradient-cosmos text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition" style="background:linear-gradient(135deg,#4f46e5,#7c3aed)">
            <i class="fas fa-tachometer-alt"></i> Go to My Dashboard
          </a>
          <a href="/jobs" class="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
            <i class="fas fa-search" style="color:#6366f1"></i> Browse Jobs
          </a>
          <a href="/auth/logout" class="w-full flex items-center justify-center gap-2 text-gray-400 py-2 rounded-xl font-medium text-xs hover:text-red-500 transition">
            <i class="fas fa-sign-out-alt"></i> Sign Out
          </a>
        </div>
      </div>
    </div>

    <!-- Security Note -->
    <p class="text-center text-xs text-gray-400 mt-4">
      <i class="fas fa-lock mr-1"></i>Session secured with HttpOnly cookie · Expires in 7 days
    </p>
  </div>

  <script>
    // Confetti animation
    const colors = ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#0ea5e9']
    const container = document.getElementById('confetti-container')
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const el = document.createElement('div')
        el.className = 'confetti-piece'
        el.style.cssText = \`
          left: \${Math.random() * 100}vw;
          top: -20px;
          background: \${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: \${Math.random() > 0.5 ? '50%' : '2px'};
          width: \${6 + Math.random() * 8}px;
          height: \${6 + Math.random() * 8}px;
          animation-duration: \${2 + Math.random() * 2}s;
          animation-delay: \${Math.random() * 0.5}s;
        \`
        container.appendChild(el)
        setTimeout(() => el.remove(), 4000)
      }, i * 30)
    }
  </script>
</body>
</html>`

  return c.html(html)
})

// ══════════════════════════════════════════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════════════════════════════════════════
app.get('/auth/logout', (c) => {
  deleteCookie(c, 'cosmosiq_session', { path: '/' })
  deleteCookie(c, 'oauth_state', { path: '/' })
  return c.redirect('/login?message=logged_out')
})

// ══════════════════════════════════════════════════════════════════════════════
// API: Get current session user
// ══════════════════════════════════════════════════════════════════════════════
app.get('/api/auth/me', (c) => {
  const sessionToken = getCookie(c, 'cosmosiq_session')
  const user = sessionToken ? parseSessionToken(sessionToken) : null
  if (!user) return c.json({ authenticated: false, user: null }, 401)
  const { id, name, email, picture, provider, given_name, family_name } = user
  return c.json({ authenticated: true, user: { id, name, email, picture, provider, given_name, family_name } })
})

// ══════════════════════════════════════════════════════════════════════════════
// LINKEDIN SETUP GUIDE PAGE
// Shown when LinkedIn app hasn't enabled the required Product
// ══════════════════════════════════════════════════════════════════════════════
function linkedinSetupGuidePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>LinkedIn Setup Required — CosmosIQ</title>
  <link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/></noscript>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"/></noscript>
  <script>window.tailwind={config:{}}</script>
  <script src="https://cdn.tailwindcss.com" defer></script>
  <style>body{font-family:'Inter',sans-serif;}</style>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
  <div class="w-full max-w-lg">
    <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="bg-[#0077B5] p-6 text-white text-center">
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <i class="fab fa-linkedin-in text-2xl"></i>
        </div>
        <h1 class="text-xl font-black">LinkedIn App Setup Required</h1>
        <p class="text-white/75 text-sm mt-1">One-time configuration needed in LinkedIn Developer Portal</p>
      </div>

      <!-- Steps -->
      <div class="p-6 space-y-4">
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <i class="fas fa-exclamation-triangle text-amber-500 mt-0.5 flex-shrink-0"></i>
          <div>
            <p class="font-bold text-amber-800 text-sm">LinkedIn app missing required Product</p>
            <p class="text-amber-700 text-xs mt-0.5">Your LinkedIn app needs <strong>"Share on LinkedIn"</strong> or <strong>"Sign In with LinkedIn"</strong> product to allow login.</p>
          </div>
        </div>

        <p class="text-sm font-bold text-gray-700">Follow these 4 steps to fix it:</p>

        <div class="space-y-3">
          <!-- Step 1 -->
          <div class="flex gap-3 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0077B5] text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
            <div>
              <p class="text-sm font-semibold text-gray-800">Open LinkedIn Developer Portal</p>
              <a href="https://www.linkedin.com/developers/apps" target="_blank" class="text-[#0077B5] text-xs font-medium hover:underline inline-flex items-center gap-1 mt-0.5">
                linkedin.com/developers/apps <i class="fas fa-external-link-alt text-[10px]"></i>
              </a>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex gap-3 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0077B5] text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
            <div>
              <p class="text-sm font-semibold text-gray-800">Select your app → click <strong>"Products"</strong> tab</p>
              <p class="text-xs text-gray-500 mt-0.5">Look for the app with Client ID: <code class="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">86zgdw5arxpbm0</code></p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex gap-3 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0077B5] text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
            <div>
              <p class="text-sm font-semibold text-gray-800">Request <strong>"Sign In with LinkedIn using OpenID Connect"</strong></p>
              <p class="text-xs text-gray-500 mt-0.5">Click the <strong>Request Access</strong> button next to it. Usually approved instantly.</p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex gap-3 items-start">
            <div class="w-7 h-7 rounded-full bg-[#0077B5] text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
            <div>
              <p class="text-sm font-semibold text-gray-800">Go to <strong>"Auth"</strong> tab → Add Redirect URL</p>
              <div class="bg-gray-50 rounded-xl px-3 py-2 mt-1 font-mono text-xs text-gray-700 border border-gray-200 flex items-center justify-between gap-2">
                <span>https://cosmosiq-portal.pages.dev/auth/linkedin/callback</span>
                <button onclick="navigator.clipboard.writeText('https://cosmosiq-portal.pages.dev/auth/linkedin/callback').then(()=>{this.innerHTML='<i class=\\'fas fa-check text-green-500\\'></i>'})" class="flex-shrink-0 text-gray-400 hover:text-gray-600">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Screenshot hint -->
        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-700">
          <i class="fas fa-info-circle mr-1"></i>
          <strong>After completing setup:</strong> Come back and try LinkedIn login again — it will work immediately. The product approval is usually <strong>instant</strong> for "Sign In with LinkedIn using OpenID Connect".
        </div>

        <!-- Buttons -->
        <div class="space-y-2 pt-2">
          <a href="https://www.linkedin.com/developers/apps" target="_blank"
            class="w-full flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#006097] text-white py-3.5 rounded-xl font-bold text-sm transition">
            <i class="fab fa-linkedin-in"></i> Open LinkedIn Developer Portal
          </a>
          <a href="/login"
            class="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
            <i class="fas fa-arrow-left text-gray-400"></i> Back to Login
          </a>
          <a href="/auth/google"
            class="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
            <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Use Google login instead
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

} // end registerAuthRoutes

// ══════════════════════════════════════════════════════════════════════════════
// ERROR PAGE TEMPLATE
// ══════════════════════════════════════════════════════════════════════════════
function oauthErrorPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Auth Error — CosmosIQ</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"/></noscript>
  <script>window.tailwind={config:{}}</script>
  <script src="https://cdn.tailwindcss.com" defer></script>
  <style>body{font-family:'Inter',sans-serif;}</style>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center px-4">
  <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">⚠️</div>
    <h1 class="text-xl font-black text-gray-900 mb-2">${title}</h1>
    <p class="text-gray-500 text-sm mb-6 leading-relaxed">${message}</p>
    <div class="space-y-2">
      <a href="/login" class="w-full block py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition" style="background:linear-gradient(135deg,#4f46e5,#7c3aed)">
        ← Back to Login
      </a>
      <a href="/contact" class="w-full block py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
        Contact Support
      </a>
    </div>
  </div>
</body>
</html>`
}
