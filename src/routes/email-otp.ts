// ─── Email OTP Authentication ─────────────────────────────────────────────────
// Flow (Login):  /login → POST /api/otp/send → /otp/verify?email=x&mode=login
// Flow (Signup): /signup → POST /api/otp/send → /otp/verify?email=x&mode=signup
// Uses: Cloudflare KV to store OTPs (TTL 10 min)
//
// Email Provider: GoDaddy cPanel SMTP via mailer.php
//   DKIM signed:  default._domainkey.cosmosiqcareers.com (RSA 2048)
//   SPF:          v=spf1 include:secureserver.net ~all
//   DMARC:        v=DMARC1; p=none; rua=mailto:dmarc@cosmosiqcareers.com
//   MX:           route1/2/3.mx.cloudflare.net (Cloudflare Email Routing)

import { Hono } from 'hono'

type Bindings = {
  DKIM_PRIVATE_KEY: string   // reserved / unused
  OTP_KV:           KVNamespace
  BASE_URL:         string
}

// ── Constants ──────────────────────────────────────────────────────────────────
const FROM_EMAIL       = 'noreply@cosmosiqcareers.com'
const FROM_NAME        = 'CosmosIQ Careers'
const BASE_URL         = 'https://cosmosiqcareers.com'
// GoDaddy cPanel mailer (primary)
const MAILER_URL       = 'https://mail.cosmosiqcareers.com/mailer.php'
// INTERNAL_API_KEY is set via Cloudflare secret (INTERNAL_API_KEY env var) for production
// For local dev, set in .dev.vars file
const INTERNAL_API_KEY = 'SET_VIA_CLOUDFLARE_SECRET'  // wrangler secret put INTERNAL_API_KEY

export function registerOtpRoutes(app: Hono<{ Bindings: Bindings }>) {

// ── Utility: Generate 6-digit OTP ─────────────────────────────────────────────
function generateOTP(): string {
  const arr = new Uint8Array(3)
  crypto.getRandomValues(arr)
  const num = ((arr[0] << 16) | (arr[1] << 8) | arr[2]) % 1000000
  return num.toString().padStart(6, '0')
}

// ── Utility: base64url encode ──────────────────────────────────────────────────
function base64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// ── Utility: Create session token ─────────────────────────────────────────────
function createSessionToken(user: Record<string, string>): string {
  const payload = base64urlEncode(JSON.stringify({ ...user, iat: Date.now() }))
  return `cosmosiq.${payload}`
}

// ── Utility: OTP KV key ────────────────────────────────────────────────────────
function otpKey(email: string, mode: string): string {
  return `otp:${mode}:${email.toLowerCase().trim()}`
}

// ── Utility: Build OTP email HTML ─────────────────────────────────────────────
function buildOTPEmailHTML(toName: string, otp: string, mode: 'login' | 'signup'): string {
  const year = new Date().getFullYear()
  const isSignup = mode === 'signup'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>${isSignup ? 'Verify your CosmosIQ account' : 'Your CosmosIQ sign-in code'}</title>
</head>
<body style="margin:0;padding:0;background:#0f0c29;font-family:'Segoe UI',Arial,sans-serif;">

<!-- ░░░ OUTER WRAPPER ░░░ -->
<table width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background:linear-gradient(160deg,#0f0c29 0%,#302b63 50%,#24243e 100%);min-height:100vh;padding:32px 16px;">
  <tr><td align="center" valign="top">

    <!-- ── CARD (600px) ── -->
    <table width="600" cellpadding="0" cellspacing="0" border="0"
      style="max-width:600px;width:100%;">

      <!-- ══ HEADER: Logo + Hero ══ -->
      <tr>
        <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 60%,#a78bfa 100%);
                   border-radius:24px 24px 0 0;padding:0;overflow:hidden;">

          <!-- top nav bar -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:24px 32px 0;">
                <!-- LOGO BADGE -->
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background:rgba(255,255,255,0.15);border-radius:14px;
                               padding:10px 16px;border:1px solid rgba(255,255,255,0.25);">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <!-- Galaxy icon SVG inline -->
                          <td style="padding-right:10px;vertical-align:middle;">
                            <div style="width:36px;height:36px;background:linear-gradient(135deg,#a78bfa,#60a5fa);
                                        border-radius:10px;text-align:center;line-height:36px;font-size:20px;">🌌</div>
                          </td>
                          <td style="vertical-align:middle;">
                            <div style="color:#ffffff;font-size:15px;font-weight:800;letter-spacing:0.3px;
                                        line-height:1.2;">CosmosIQ</div>
                            <div style="color:rgba(255,255,255,0.7);font-size:10px;font-weight:500;
                                        letter-spacing:1.5px;text-transform:uppercase;">Careers</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="padding-left:12px;vertical-align:middle;">
                      <div style="background:rgba(167,139,250,0.25);border:1px solid rgba(167,139,250,0.4);
                                  border-radius:20px;padding:5px 14px;display:inline-block;">
                        <span style="color:#e9d5ff;font-size:11px;font-weight:600;letter-spacing:0.5px;">
                          ${isSignup ? '✨ New Account' : '🔐 Secure Login'}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- hero illustration strip -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:20px 32px 28px;text-align:center;">

                <!-- Decorative orbit/planet illustration (pure CSS+HTML) -->
                <div style="position:relative;display:inline-block;margin-bottom:20px;">
                  <!-- Outer glow ring -->
                  <div style="width:100px;height:100px;border-radius:50%;
                               background:radial-gradient(circle,rgba(99,102,241,0.6) 0%,rgba(124,58,237,0.3) 50%,transparent 70%);
                               margin:0 auto;display:flex;align-items:center;justify-content:center;
                               box-shadow:0 0 40px rgba(99,102,241,0.5),0 0 80px rgba(167,139,250,0.2);">
                    <!-- Center planet -->
                    <div style="width:64px;height:64px;border-radius:50%;
                                 background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);
                                 display:flex;align-items:center;justify-content:center;
                                 box-shadow:0 8px 24px rgba(99,102,241,0.6);
                                 font-size:30px;line-height:64px;text-align:center;">
                      ${isSignup ? '🚀' : '🔑'}
                    </div>
                  </div>
                </div>

                <h1 style="color:#ffffff;font-size:26px;font-weight:900;margin:0 0 8px;
                            letter-spacing:-0.5px;line-height:1.2;">
                  ${isSignup ? 'Welcome to CosmosIQ!' : 'Verify It\'s You'}
                </h1>
                <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0;line-height:1.6;">
                  ${isSignup
                    ? 'India\'s #1 AI-Powered Career Platform — your dream job awaits'
                    : 'Use the code below to securely sign in to your account'}
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- ══ MAIN BODY ══ -->
      <tr>
        <td style="background:#ffffff;padding:40px 36px 32px;">

          <!-- Greeting -->
          <p style="color:#111827;font-size:18px;font-weight:700;margin:0 0 6px;">
            Hi ${toName || 'there'} 👋
          </p>
          <p style="color:#6b7280;font-size:14px;line-height:1.75;margin:0 0 32px;">
            ${isSignup
              ? 'You\'re one step away from unlocking thousands of AI-matched job opportunities. Enter the verification code below to activate your CosmosIQ account.'
              : 'We received a request to sign in to your CosmosIQ Careers account. Use the one-time code below — it expires in <strong style="color:#4f46e5;">10 minutes</strong>.'}
          </p>

          <!-- ── OTP CODE BOX ── -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td align="center">
                <div style="background:linear-gradient(135deg,#f5f3ff 0%,#eef2ff 100%);
                             border:2px solid #c7d2fe;border-radius:20px;
                             padding:28px 40px;text-align:center;
                             box-shadow:0 4px 20px rgba(99,102,241,0.12);">
                  <p style="color:#6366f1;font-size:10px;font-weight:800;letter-spacing:5px;
                              text-transform:uppercase;margin:0 0 12px;">
                    &#x2022; Verification Code &#x2022;
                  </p>
                  <!-- Individual digit boxes -->
                  <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 12px;">
                    <tr>
                      ${otp.split('').map(d => `
                      <td style="padding:0 4px;">
                        <div style="width:44px;height:56px;background:linear-gradient(135deg,#4f46e5,#7c3aed);
                                     border-radius:12px;text-align:center;line-height:56px;
                                     color:#ffffff;font-size:28px;font-weight:900;
                                     font-family:'Courier New',monospace;
                                     box-shadow:0 4px 12px rgba(79,70,229,0.4);">${d}</div>
                      </td>`).join('')}
                    </tr>
                  </table>
                  <p style="color:#818cf8;font-size:11px;font-weight:500;margin:0;">
                    &#x231A; Valid for 10 minutes only
                  </p>
                </div>
              </td>
            </tr>
          </table>

          <!-- ── Features strip (signup only) ── -->
          ${isSignup ? `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr>
              <td style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border-radius:16px;
                          padding:20px 24px;border-left:4px solid #10b981;">
                <p style="color:#065f46;font-size:13px;font-weight:700;margin:0 0 12px;">
                  &#x2728; What awaits you at CosmosIQ Careers:
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="50%" style="padding-bottom:8px;vertical-align:top;">
                      <span style="color:#10b981;font-size:13px;margin-right:6px;">&#x2714;</span>
                      <span style="color:#374151;font-size:13px;">AI-matched job recommendations</span>
                    </td>
                    <td width="50%" style="padding-bottom:8px;vertical-align:top;">
                      <span style="color:#10b981;font-size:13px;margin-right:6px;">&#x2714;</span>
                      <span style="color:#374151;font-size:13px;">1-click apply to top companies</span>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="vertical-align:top;">
                      <span style="color:#10b981;font-size:13px;margin-right:6px;">&#x2714;</span>
                      <span style="color:#374151;font-size:13px;">Smart resume builder & tips</span>
                    </td>
                    <td width="50%" style="vertical-align:top;">
                      <span style="color:#10b981;font-size:13px;margin-right:6px;">&#x2714;</span>
                      <span style="color:#374151;font-size:13px;">Real-time salary insights</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>` : ''}

          <!-- ── Security warning ── -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
            <tr>
              <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:14px 18px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:20px;padding-right:10px;vertical-align:top;">&#x26A0;</td>
                    <td>
                      <p style="color:#92400e;font-size:13px;font-weight:700;margin:0 0 2px;">Security Notice</p>
                      <p style="color:#b45309;font-size:12px;margin:0;line-height:1.5;">
                        Never share this code with anyone. CosmosIQ support will <strong>never</strong> ask for your OTP.
                        If you didn't request this, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">
            This code was sent to you as part of the CosmosIQ Careers ${isSignup ? 'account creation' : 'sign-in'} process.
            It will automatically expire after 10 minutes.
          </p>

        </td>
      </tr>

      <!-- ══ DIVIDER BANNER ══ -->
      <tr>
        <td style="background:linear-gradient(90deg,#4f46e5,#7c3aed,#a78bfa,#60a5fa);
                   padding:2px 0;"></td>
      </tr>

      <!-- ══ STATS BAR ══ -->
      <tr>
        <td style="background:#1e1b4b;padding:20px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" width="33%" style="padding:0 8px;border-right:1px solid rgba(255,255,255,0.1);">
                <div style="color:#a78bfa;font-size:20px;font-weight:900;line-height:1;">50K+</div>
                <div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;text-transform:uppercase;letter-spacing:1px;">Jobs Listed</div>
              </td>
              <td align="center" width="33%" style="padding:0 8px;border-right:1px solid rgba(255,255,255,0.1);">
                <div style="color:#60a5fa;font-size:20px;font-weight:900;line-height:1;">2L+</div>
                <div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;text-transform:uppercase;letter-spacing:1px;">Job Seekers</div>
              </td>
              <td align="center" width="33%" style="padding:0 8px;">
                <div style="color:#34d399;font-size:20px;font-weight:900;line-height:1;">5K+</div>
                <div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;text-transform:uppercase;letter-spacing:1px;">Companies</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ══ FOOTER ══ -->
      <tr>
        <td style="background:#0f0c29;border-radius:0 0 24px 24px;padding:28px 32px;">

          <!-- Contact details -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
            <tr>
              <td>
                <p style="color:rgba(255,255,255,0.4);font-size:10px;font-weight:700;letter-spacing:2px;
                            text-transform:uppercase;margin:0 0 14px;">Get In Touch</p>
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-bottom:8px;padding-right:32px;vertical-align:middle;">
                      <span style="font-size:14px;margin-right:6px;">&#x1F310;</span>
                      <a href="https://cosmosiqcareers.com"
                         style="color:#a78bfa;font-size:12px;text-decoration:none;font-weight:600;">
                        cosmosiqcareers.com
                      </a>
                    </td>
                    <td style="padding-bottom:8px;vertical-align:middle;">
                      <span style="font-size:14px;margin-right:6px;">&#x2709;</span>
                      <a href="mailto:support@cosmosiqcareers.com"
                         style="color:#a78bfa;font-size:12px;text-decoration:none;">
                        support@cosmosiqcareers.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align:middle;">
                      <span style="font-size:14px;margin-right:6px;">&#x1F4CD;</span>
                      <span style="color:rgba(255,255,255,0.5);font-size:12px;">Pune, Maharashtra, India</span>
                    </td>
                    <td style="vertical-align:middle;">
                      <span style="font-size:14px;margin-right:6px;">&#x1F4DE;</span>
                      <a href="tel:+918956418531"
                         style="color:#a78bfa;font-size:12px;text-decoration:none;">
                        +91 89564 18531
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <div style="border-top:1px solid rgba(255,255,255,0.08);margin-bottom:16px;"></div>

          <!-- Social + copyright -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <p style="color:rgba(255,255,255,0.25);font-size:11px;margin:0 0 6px;">
                  &#169; ${year} CosmosIQ Talent Solutions · Matriye Group · All rights reserved.
                </p>
                <p style="color:rgba(255,255,255,0.2);font-size:10px;margin:0;">
                  India's #1 AI-Powered Job Platform &nbsp;·&nbsp;
                  <a href="https://cosmosiqcareers.com/privacy" style="color:rgba(167,139,250,0.6);text-decoration:none;">Privacy Policy</a>
                  &nbsp;·&nbsp;
                  <a href="https://cosmosiqcareers.com/terms" style="color:rgba(167,139,250,0.6);text-decoration:none;">Terms of Service</a>
                  &nbsp;·&nbsp;
                  <a href="https://cosmosiqcareers.com/unsubscribe" style="color:rgba(167,139,250,0.6);text-decoration:none;">Unsubscribe</a>
                </p>
              </td>
              <td align="right" style="vertical-align:middle;">
                <!-- Social icons as emoji -->
                <a href="https://linkedin.com/company/cosmosiq" style="text-decoration:none;margin-left:8px;font-size:18px;">&#x1F4BC;</a>
                <a href="https://twitter.com/MatriyeA"         style="text-decoration:none;margin-left:8px;font-size:18px;">&#x1D54F;</a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

    </table>
    <!-- /CARD -->

  </td></tr>
</table>

</body>
</html>`
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL SENDER — GoDaddy cPanel SMTP only
// ══════════════════════════════════════════════════════════════════════════════

async function sendOTPEmail(
  toEmail: string,
  toName: string,
  otp: string,
  mode: 'login' | 'signup'
): Promise<{ ok: boolean; error?: string; provider?: string }> {

  const subject = mode === 'signup'
    ? `${otp} — Verify your CosmosIQ account`
    : `${otp} — Your CosmosIQ sign-in code`

  const html = buildOTPEmailHTML(toName, otp, mode)
  const text = `Your CosmosIQ verification code: ${otp}\n\nExpires in 10 minutes. Do not share this code.\n\n— CosmosIQ Careers\nhttps://cosmosiqcareers.com`

  // ── Provider 1: GoDaddy cPanel SMTP (DKIM-signed, SPF-authorised) ──────────
  // DNS: default._domainkey.cosmosiqcareers.com (RSA 2048)
  // SPF: include:secureserver.net
  try {
    const res = await fetch(MAILER_URL, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key':    INTERNAL_API_KEY
      },
      body: JSON.stringify({
        to:      toEmail,
        from:    FROM_EMAIL,
        subject,
        html,
        text
      })
    })
    const data = await res.json() as any
    if ((res.status === 200 || res.status === 201) && data?.success) {
      console.log(`[GoDaddy] OTP sent to ${toEmail}, id=${data.messageId}`)
      return { ok: true, provider: 'godaddy' }
    }
    console.warn('[GoDaddy] Unexpected response:', res.status, JSON.stringify(data))
  } catch (err: any) {
    console.error('[GoDaddy] Fetch error:', err.message)
  }

  return { ok: false, error: 'GoDaddy email provider failed' }
}

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/otp/send — Generate OTP and email it
// Body: { email, name?, mode: 'login'|'signup', role?: 'seeker'|'employer' }
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/otp/send', async (c) => {
  try {
    const body  = await c.req.json() as any
    const email = (body.email || '').trim().toLowerCase()
    const name  = (body.name  || '').trim()
    const mode  = body.mode  === 'signup' ? 'signup' : 'login'
    const role  = body.role  === 'employer' ? 'employer' : 'seeker'

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ success: false, error: 'Please enter a valid email address.' }, 400)
    }
    if (mode === 'signup' && !name) {
      return c.json({ success: false, error: 'Please enter your full name.' }, 400)
    }

    const otp = generateOTP()
    const key = otpKey(email, mode)

    if (c.env?.OTP_KV) {
      await c.env.OTP_KV.put(
        key,
        JSON.stringify({ otp, email, name, role, attempts: 0, createdAt: Date.now() }),
        { expirationTtl: 600 }
      )
    }

    const result = await sendOTPEmail(email, name, otp, mode)

    if (!result.ok) {
      console.error('OTP email failed:', result.error)
      return c.json({ success: false, error: 'Could not send verification email. Please try again.' }, 500)
    }

    console.log(`OTP sent via [${result.provider}] to ${email}`)

    const otpPayload = base64urlEncode(JSON.stringify({
      otp, email, name, role, mode,
      exp: Date.now() + 10 * 60 * 1000
    }))

    const response = new Response(
      JSON.stringify({ success: true, message: `Verification code sent to ${email}` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

    // Cookie fallback if KV is not bound
    if (!c.env?.OTP_KV) {
      response.headers.append(
        'Set-Cookie',
        `otp_${mode}_${email.replace('@','_').replace(/\./g,'_')}=${otpPayload}; HttpOnly; Secure; SameSite=Strict; Max-Age=600; Path=/`
      )
    }

    return response

  } catch (err: any) {
    console.error('OTP send error:', err)
    return c.json({ success: false, error: 'Server error. Please try again.' }, 500)
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/otp/verify — Verify OTP and create session
// Body: { email, otp, mode, name?, role? }
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/otp/verify', async (c) => {
  try {
    const body  = await c.req.json() as any
    const email = (body.email || '').trim().toLowerCase()
    const otp   = (body.otp   || '').trim()
    const mode  = body.mode  === 'signup' ? 'signup' : 'login'

    if (!email || !otp) {
      return c.json({ success: false, error: 'Email and OTP are required.' }, 400)
    }
    if (!/^\d{6}$/.test(otp)) {
      return c.json({ success: false, error: 'OTP must be exactly 6 digits.' }, 400)
    }

    const key = otpKey(email, mode)
    let storedData: any = null

    if (c.env?.OTP_KV) {
      const raw = await c.env.OTP_KV.get(key)
      if (!raw) {
        return c.json({ success: false, error: 'OTP expired or not found. Please request a new one.' }, 400)
      }
      storedData = JSON.parse(raw)
    } else {
      const cookieName   = `otp_${mode}_${email.replace('@','_').replace(/\./g,'_')}`
      const cookieHeader = c.req.header('cookie') || ''
      const match        = cookieHeader.match(new RegExp(`${cookieName}=([^;]+)`))
      if (match) {
        try {
          const decoded = JSON.parse(atob(match[1].replace(/-/g,'+').replace(/_/g,'/')))
          if (decoded.exp && Date.now() > decoded.exp) {
            return c.json({ success: false, error: 'OTP expired. Please request a new one.' }, 400)
          }
          storedData = decoded
        } catch {
          return c.json({ success: false, error: 'Invalid OTP session. Please request a new one.' }, 400)
        }
      } else {
        return c.json({ success: false, error: 'OTP session not found. Please request a new code.' }, 400)
      }
    }

    if (storedData.attempts >= 3) {
      if (c.env?.OTP_KV) await c.env.OTP_KV.delete(key)
      return c.json({ success: false, error: 'Too many failed attempts. Please request a new OTP.' }, 400)
    }

    if (storedData.otp !== otp) {
      storedData.attempts++
      if (c.env?.OTP_KV) {
        await c.env.OTP_KV.put(key, JSON.stringify(storedData), { expirationTtl: 600 })
      }
      const remaining = 3 - storedData.attempts
      return c.json({
        success: false,
        error: `Incorrect code. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`
      }, 400)
    }

    if (c.env?.OTP_KV) await c.env.OTP_KV.delete(key)

    const userName = storedData.name || body.name || email.split('@')[0]
    const userRole = storedData.role || body.role || 'seeker'
    const userId   = `email_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    const sessionToken = createSessionToken({
      id:          userId,
      name:        userName,
      email:       email,
      picture:     '',
      provider:    'email',
      given_name:  userName.split(' ')[0] || '',
      family_name: userName.split(' ').slice(1).join(' ') || '',
      role:        userRole,
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Verified! Redirecting...', role: userRole }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `cosmosiq_session=${sessionToken}; HttpOnly; Secure; SameSite=Lax; Max-Age=${60*60*24*7}; Path=/`
        }
      }
    )

  } catch (err: any) {
    console.error('OTP verify error:', err)
    return c.json({ success: false, error: 'Server error. Please try again.' }, 500)
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/otp/resend — Resend OTP
// Body: { email, mode, name? }
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/otp/resend', async (c) => {
  try {
    const body  = await c.req.json() as any
    const email = (body.email || '').trim().toLowerCase()
    const mode  = body.mode === 'signup' ? 'signup' : 'login'
    const name  = body.name || ''

    if (!email) return c.json({ success: false, error: 'Email required.' }, 400)

    let existingData: any = null
    if (c.env?.OTP_KV) {
      const raw = await c.env.OTP_KV.get(otpKey(email, mode))
      if (raw) existingData = JSON.parse(raw)
    }

    const otp      = generateOTP()
    const userName = existingData?.name || name || ''

    if (c.env?.OTP_KV) {
      await c.env.OTP_KV.put(
        otpKey(email, mode),
        JSON.stringify({ otp, email, name: userName, role: existingData?.role || body.role || 'seeker', attempts: 0, createdAt: Date.now() }),
        { expirationTtl: 600 }
      )
    }

    const result = await sendOTPEmail(email, userName, otp, mode)

    if (!result.ok) {
      return c.json({ success: false, error: `Could not resend: ${result.error}` }, 500)
    }

    return c.json({ success: true, message: 'New verification code sent!' })

  } catch (err: any) {
    return c.json({ success: false, error: 'Server error.' }, 500)
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/email/test — Live diagnostic: tests email providers from CF Worker
// Usage: GET /api/email/test?to=you@example.com
// ══════════════════════════════════════════════════════════════════════════════
app.get('/api/email/test', async (c) => {
  const to   = c.req.query('to') || 'matriyeio@gmail.com'
  const results: Record<string, any> = {}

  // Test 1: GoDaddy cPanel SMTP (primary)
  try {
    const r = await fetch(MAILER_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': INTERNAL_API_KEY },
      body: JSON.stringify({
        to,
        from:    FROM_EMAIL,
        subject: 'CosmosIQ OTP Test — GoDaddy (Primary)',
        html:    '<h2 style="color:#4f46e5">Test: 123456</h2><p>GoDaddy DKIM-signed delivery test from Cloudflare Worker.</p>',
        text:    'Test OTP: 123456 — GoDaddy delivery test'
      })
    })
    const data = await r.json() as any
    results['godaddy'] = {
      status:    r.status,
      success:   data?.success,
      messageId: data?.messageId,
      note:      (r.status === 200 || r.status === 201) && data?.success
        ? '✅ GoDaddy sent — check inbox (DKIM+SPF signed)'
        : '❌ GoDaddy failed'
    }
  } catch (e: any) { results['godaddy'] = { error: e.message } }

  results['kv_bound'] = !!c.env?.OTP_KV
  results['to']       = to
  results['dns'] = {
    spf:   'v=spf1 include:_spf.mx.cloudflare.net include:secureserver.net ~all',
    dkim:  'default._domainkey.cosmosiqcareers.com (GoDaddy RSA 2048)',
    dmarc: 'v=DMARC1; p=none; rua=mailto:dmarc@cosmosiqcareers.com'
  }

  return c.json(results, 200)
})

} // end registerOtpRoutes
