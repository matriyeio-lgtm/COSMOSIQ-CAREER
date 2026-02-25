// ─── CosmosIQ Internal Email API v4.0 ─────────────────────────────────────────
// Endpoint: POST /api/v1/emails
// Health:   GET  /api/v1/emails/health
//
// Architecture:
//   Cloudflare Worker → Brevo SMTP API (primary)
//   Fallback: GoDaddy cPanel PHP mailer
//
// Authentication: X-API-Key header
// Body: { to, subject, html, text?, from? }
// Success (201): { success: true, messageId, provider, timestamp }

import { Hono } from 'hono'

type Bindings = {
  EMAIL_API_KEY:  string   // Internal API key
  BREVO_API_KEY:  string   // Brevo (Sendinblue) API key — set via wrangler secret
}

// ── Constants ─────────────────────────────────────────────────────────────────
// INTERNAL_API_KEY is set via Cloudflare secret (INTERNAL_API_KEY env var) for production
// For local dev, set in .dev.vars file
const INTERNAL_API_KEY = 'SET_VIA_CLOUDFLARE_SECRET'  // wrangler secret put INTERNAL_API_KEY
const FROM_EMAIL       = 'noreply@cosmosiqcareers.com'
const FROM_NAME        = 'CosmosIQ Careers'
const MAILER_URL       = 'https://mail.cosmosiqcareers.com/mailer.php'  // GoDaddy fallback

export function registerEmailApiRoutes(app: Hono<{ Bindings: Bindings }>) {

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/v1/emails — Send a transactional email
// ══════════════════════════════════════════════════════════════════════════════
app.post('/api/v1/emails', async (c) => {
  try {
    // ── Auth ───────────────────────────────────────────────────────────────────
    const apiKey   = c.req.header('X-API-Key') || c.req.header('x-api-key') || ''
    const validKey = c.env?.EMAIL_API_KEY || INTERNAL_API_KEY

    if (!apiKey || apiKey !== validKey) {
      return c.json({ success: false, error: 'Unauthorized' }, 401)
    }

    // ── Parse body ─────────────────────────────────────────────────────────────
    const body = await c.req.json() as {
      to: string
      subject: string
      html: string
      text?: string
      from?: string
    }

    const { to, subject, html, text } = body

    // ── Validate ───────────────────────────────────────────────────────────────
    if (!to || !subject || !html) {
      return c.json({ success: false, error: 'Missing required fields: to, subject, html' }, 400)
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return c.json({ success: false, error: 'Invalid email address' }, 400)
    }

    // ── Try Brevo API first (best inbox delivery) ──────────────────────────────
    const brevoKey = c.env?.BREVO_API_KEY || ''
    if (brevoKey) {
      const brevoResult = await sendViaBrevo({ to, subject, html, text: text || '' }, brevoKey)
      if (brevoResult.ok) {
        return c.json({
          success:   true,
          messageId: brevoResult.messageId,
          provider:  'brevo-smtp',
          timestamp: new Date().toISOString()
        }, 201)
      }
      console.error('Brevo failed:', brevoResult.error)
    }

    // ── Fallback: GoDaddy cPanel PHP mailer ────────────────────────────────────
    const cpanelResult = await sendViaCpanelMailer({ to, subject, html, text: text || '' })
    if (cpanelResult.ok) {
      return c.json({
        success:   true,
        messageId: cpanelResult.messageId,
        provider:  'cpanel-sendmail',
        timestamp: new Date().toISOString()
      }, 201)
    }

    return c.json({
      success: false,
      error:   'All email providers failed',
      details: cpanelResult.error
    }, 500)

  } catch (err: any) {
    console.error('Email API error:', err)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/v1/emails/health
// ══════════════════════════════════════════════════════════════════════════════
app.get('/api/v1/emails/health', (c) => {
  const hasBrevo = !!(c.env?.BREVO_API_KEY)
  return c.json({
    status:    'ok',
    service:   'CosmosIQ Email API',
    version:   '4.0.0',
    provider:  hasBrevo ? 'brevo-smtp (primary) + cpanel-sendmail (fallback)' : 'cpanel-sendmail (primary)',
    brevo_configured: hasBrevo,
    timestamp: new Date().toISOString(),
    endpoints: {
      send:   'POST /api/v1/emails',
      health: 'GET  /api/v1/emails/health'
    }
  })
})

} // end registerEmailApiRoutes

// ══════════════════════════════════════════════════════════════════════════════
// Brevo (Sendinblue) SMTP API
// API Docs: https://developers.brevo.com/reference/sendtransacemail
// Free: 300 emails/day, 9000/month
// DKIM/SPF: Brevo handles authentication automatically
// ══════════════════════════════════════════════════════════════════════════════
async function sendViaBrevo(
  email: { to: string; subject: string; html: string; text: string },
  apiKey: string
): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  try {
    const messageId = `ciq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@cosmosiqcareers.com`

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key':      apiKey,
        'Accept':       'application/json'
      },
      body: JSON.stringify({
        sender:     { name: FROM_NAME, email: FROM_EMAIL },
        to:         [{ email: email.to }],
        subject:    email.subject,
        htmlContent: email.html,
        textContent: email.text || email.html.replace(/<[^>]+>/g, ''),
        headers: {
          'X-Mailer':        'CosmosIQ-v4',
          'X-CosmosIQ-Type': 'otp-transactional'
        }
      })
    })

    const data = await res.json() as any

    if (res.status === 201 && data?.messageId) {
      return { ok: true, messageId: data.messageId }
    }

    return {
      ok: false,
      error: data?.message || data?.error || `Brevo HTTP ${res.status}`
    }

  } catch (err: any) {
    return { ok: false, error: `Brevo error: ${err.message}` }
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// GoDaddy cPanel PHP mailer (fallback)
// Note: Emails may go to spam due to missing DKIM signing on GoDaddy server
// ══════════════════════════════════════════════════════════════════════════════
async function sendViaCpanelMailer(email: {
  to: string; subject: string; html: string; text: string
}): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  try {
    const res = await fetch(MAILER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key':    INTERNAL_API_KEY
      },
      body: JSON.stringify({
        to:      email.to,
        from:    FROM_EMAIL,
        subject: email.subject,
        html:    email.html,
        text:    email.text
      })
    })


    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const raw = await res.text()
      return { ok: false, error: `Mailer error: ${raw.substring(0, 200)}` }
    }

    const data = await res.json() as any
    if (res.status === 201 && data?.success) {
      return { ok: true, messageId: data.messageId }
    }

    return { ok: false, error: data?.error || `HTTP ${res.status}` }

  } catch (err: any) {
    return { ok: false, error: `cPanel mailer error: ${err.message}` }
  }
}
