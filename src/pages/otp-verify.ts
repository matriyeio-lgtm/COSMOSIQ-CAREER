// ─── OTP VERIFY PAGE ─────────────────────────────────────────────────────────

export function otpVerifyPage(email: string, mode: string, name: string, role: string): string {
  const isSignup = mode === 'signup'
  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + b.replace(/./g, '*') + c)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${isSignup ? 'Verify Email' : 'Enter OTP'} — CosmosIQ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    body { font-family: 'Inter', sans-serif; }
    .gradient-cosmos { background: linear-gradient(135deg, #4f46e5, #7c3aed); }
    .otp-input {
      width: 52px; height: 60px;
      text-align: center; font-size: 24px; font-weight: 800;
      border: 2px solid #e5e7eb; border-radius: 14px;
      outline: none; transition: all 0.2s; color: #1f2937;
      background: white;
    }
    .otp-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
    .otp-input.filled { border-color: #6366f1; background: #eef2ff; color: #4f46e5; }
    .otp-input.error { border-color: #ef4444; background: #fef2f2; animation: shake 0.4s ease; }
    .otp-input.success { border-color: #10b981; background: #ecfdf5; color: #059669; }
    @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { animation: spin 0.8s linear infinite; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .fade-in { animation: fadeIn 0.4s ease forwards; }
    .countdown-ring { transform: rotate(-90deg); }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center px-4 py-10" style="background:linear-gradient(135deg,#f0f4ff 0%,#faf5ff 100%);">

  <div class="w-full max-w-md fade-in">
    <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

      <!-- Header -->
      <div class="gradient-cosmos p-7 text-center text-white relative overflow-hidden">
        <div class="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10"></div>
        <div class="absolute -left-6 -bottom-6 w-20 h-20 rounded-full bg-white/10"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-envelope-open-text text-2xl"></i>
          </div>
          <h1 class="text-xl font-black">Check Your Email</h1>
          <p class="text-white/70 text-sm mt-1">We sent a 6-digit code to</p>
          <p class="text-white font-bold text-sm mt-0.5">${maskedEmail}</p>
        </div>
      </div>

      <!-- Body -->
      <div class="p-7">

        <!-- Error / Success message -->
        <div id="msg" class="hidden mb-4 rounded-xl px-4 py-3 text-sm font-medium"></div>

        <!-- OTP Inputs -->
        <div class="flex justify-center gap-2 mb-6" id="otpContainer">
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="0" autocomplete="off"/>
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="1" autocomplete="off"/>
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="2" autocomplete="off"/>
          <div class="flex items-center px-1"><div class="w-2 h-0.5 bg-gray-300 rounded"></div></div>
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="3" autocomplete="off"/>
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="4" autocomplete="off"/>
          <input class="otp-input" type="text" inputmode="numeric" maxlength="1" data-index="5" autocomplete="off"/>
        </div>

        <!-- Timer -->
        <div class="flex items-center justify-center gap-2 mb-6">
          <div class="relative w-10 h-10">
            <svg class="w-10 h-10 countdown-ring" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="2.5"/>
              <circle id="timerRing" cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" stroke-width="2.5"
                stroke-dasharray="100 100" stroke-linecap="round" style="transition:stroke-dasharray 1s linear;"/>
            </svg>
            <span id="timerText" class="absolute inset-0 flex items-center justify-center text-xs font-black text-indigo-600">10:00</span>
          </div>
          <div>
            <p id="timerLabel" class="text-sm text-gray-500">Code expires in <span id="timerCountdown" class="font-bold text-indigo-600">10:00</span></p>
          </div>
        </div>

        <!-- Verify Button -->
        <button id="verifyBtn" onclick="verifyOTP()"
          class="w-full gradient-cosmos text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition mb-3 flex items-center justify-center gap-2"
          disabled>
          <i class="fas fa-shield-check"></i> Verify Code
        </button>

        <!-- Resend -->
        <div class="text-center">
          <p class="text-gray-500 text-sm">Didn't receive it?
            <button id="resendBtn" onclick="resendOTP()" class="text-indigo-600 font-bold hover:underline ml-1" disabled>
              Resend in <span id="resendCountdown">60s</span>
            </button>
          </p>
        </div>

        <!-- Back link -->
        <div class="text-center mt-4">
          <a href="${isSignup ? '/signup' : '/login'}" class="text-xs text-gray-400 hover:text-gray-600 transition">
            <i class="fas fa-arrow-left mr-1"></i>Back to ${isSignup ? 'Sign Up' : 'Login'}
          </a>
        </div>

      </div>
    </div>

    <!-- Tips -->
    <div class="mt-4 bg-white/60 rounded-2xl p-4 border border-white">
      <p class="text-xs text-gray-500 text-center"><i class="fas fa-info-circle text-indigo-400 mr-1"></i>
        Check spam/junk folder if you don't see the email · Code is valid for <strong>10 minutes</strong></p>
    </div>
  </div>

  <script>
    const EMAIL = '${email}'
    const MODE  = '${mode}'
    const NAME  = '${name}'
    const ROLE  = '${role}'
    const inputs = Array.from(document.querySelectorAll('.otp-input'))
    let totalSeconds = 600   // 10 min
    let resendSeconds = 60
    const circumference = 2 * Math.PI * 15.9  // ~99.9

    // ── Auto-focus first input ──
    inputs[0].focus()

    // ── OTP input handling ──
    inputs.forEach((inp, i) => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!inp.value && i > 0) { inputs[i-1].focus(); inputs[i-1].value = ''; inputs[i-1].classList.remove('filled') }
          else { inp.value = ''; inp.classList.remove('filled') }
          updateVerifyBtn()
          return
        }
        if (e.key === 'ArrowLeft'  && i > 0) { inputs[i-1].focus(); e.preventDefault() }
        if (e.key === 'ArrowRight' && i < 5) { inputs[i+1].focus(); e.preventDefault() }
      })
      inp.addEventListener('input', (e) => {
        const val = inp.value.replace(/\\D/g,'')
        inp.value = val.slice(-1)
        if (val) { inp.classList.add('filled'); if (i < 5) inputs[i+1].focus() }
        else { inp.classList.remove('filled') }
        updateVerifyBtn()
        clearMsg()
      })
      inp.addEventListener('paste', (e) => {
        e.preventDefault()
        const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\\D/g,'').slice(0,6)
        paste.split('').forEach((ch, idx) => {
          if (inputs[idx]) { inputs[idx].value = ch; inputs[idx].classList.add('filled') }
        })
        if (paste.length >= 6) inputs[5].focus()
        updateVerifyBtn()
      })
    })

    function getOTP() { return inputs.map(i => i.value).join('') }

    function updateVerifyBtn() {
      const otp = getOTP()
      document.getElementById('verifyBtn').disabled = otp.length !== 6
    }

    // ── Countdown timer (10 min) ──
    const timerRing = document.getElementById('timerRing')
    const timerText = document.getElementById('timerText')
    const timerCountdown = document.getElementById('timerCountdown')
    const timerLabel = document.getElementById('timerLabel')

    const timerInterval = setInterval(() => {
      totalSeconds--
      if (totalSeconds <= 0) {
        clearInterval(timerInterval)
        timerText.textContent = '0:00'
        timerCountdown.textContent = '0:00'
        timerLabel.innerHTML = '<span class="text-red-500 font-bold">Code expired. Please request a new one.</span>'
        timerRing.style.strokeDasharray = '0 100'
        inputs.forEach(i => i.disabled = true)
        document.getElementById('verifyBtn').disabled = true
        return
      }
      const mins = Math.floor(totalSeconds / 60)
      const secs = totalSeconds % 60
      const display = mins + ':' + secs.toString().padStart(2,'0')
      timerText.textContent = display
      timerCountdown.textContent = display
      const progress = (totalSeconds / 600) * circumference
      timerRing.style.strokeDasharray = progress + ' ' + circumference
      if (totalSeconds <= 60) timerRing.style.stroke = '#ef4444'
    }, 1000)

    // ── Resend countdown (60s) ──
    const resendInterval = setInterval(() => {
      resendSeconds--
      document.getElementById('resendCountdown').textContent = resendSeconds + 's'
      if (resendSeconds <= 0) {
        clearInterval(resendInterval)
        const btn = document.getElementById('resendBtn')
        btn.disabled = false
        btn.innerHTML = '<span class="text-indigo-600 font-bold hover:underline">Resend Code</span>'
      }
    }, 1000)

    // ── Verify OTP ──
    async function verifyOTP() {
      const otp = getOTP()
      if (otp.length !== 6) return

      const btn = document.getElementById('verifyBtn')
      btn.disabled = true
      btn.innerHTML = '<svg class="w-4 h-4 spinner" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="3" stroke-dasharray="40 60"/></svg> Verifying...'

      try {
        const res = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: EMAIL, otp, mode: MODE, name: NAME, role: ROLE })
        })
        const data = await res.json()

        if (data.success) {
          inputs.forEach(i => i.classList.add('success'))
          showMsg('✅ Email verified! Redirecting...', 'success')
          btn.innerHTML = '<i class="fas fa-check-circle"></i> Verified!'
          clearInterval(timerInterval)
          setTimeout(() => {
            window.location.href = data.role === 'employer' ? '/employer' : '/auth/success-email'
          }, 1200)
        } else {
          inputs.forEach(i => { i.classList.add('error'); i.classList.remove('filled') })
          showMsg('❌ ' + data.error, 'error')
          setTimeout(() => inputs.forEach(i => { i.classList.remove('error'); i.value = '' }), 600)
          inputs[0].focus()
          btn.disabled = false
          btn.innerHTML = '<i class="fas fa-shield-check"></i> Verify Code'
        }
      } catch(e) {
        showMsg('❌ Network error. Please try again.', 'error')
        btn.disabled = false
        btn.innerHTML = '<i class="fas fa-shield-check"></i> Verify Code'
      }
    }

    // ── Resend OTP ──
    async function resendOTP() {
      const btn = document.getElementById('resendBtn')
      btn.disabled = true
      btn.textContent = 'Sending...'
      try {
        const res = await fetch('/api/otp/resend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: EMAIL, mode: MODE, name: NAME, role: ROLE })
        })
        const data = await res.json()
        if (data.success) {
          showMsg('✅ New code sent to ' + EMAIL, 'success')
          if (data._dev_otp) showMsg('🔧 Dev OTP: ' + data._dev_otp, 'info')
          // Reset timer
          totalSeconds = 600
          resendSeconds = 60
          timerRing.style.stroke = '#6366f1'
          inputs.forEach(i => { i.value = ''; i.classList.remove('filled','error','success'); i.disabled = false })
          inputs[0].focus()
          btn.innerHTML = 'Resend in <span id="resendCountdown">60s</span>'
        } else {
          showMsg('❌ ' + data.error, 'error')
          btn.disabled = false
          btn.textContent = 'Resend Code'
        }
      } catch(e) {
        showMsg('❌ Network error.', 'error')
        btn.disabled = false
        btn.textContent = 'Resend Code'
      }
    }

    function showMsg(text, type) {
      const el = document.getElementById('msg')
      el.className = 'mb-4 rounded-xl px-4 py-3 text-sm font-medium fade-in ' + (
        type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
        type === 'error'   ? 'bg-red-50 text-red-700 border border-red-200' :
                             'bg-blue-50 text-blue-700 border border-blue-200'
      )
      el.textContent = text
      el.classList.remove('hidden')
    }
    function clearMsg() { document.getElementById('msg').classList.add('hidden') }

    // Allow Enter key to submit
    document.addEventListener('keydown', e => { if (e.key === 'Enter' && getOTP().length === 6) verifyOTP() })
  </script>
</body>
</html>`
}

// ── Success page after email OTP login ────────────────────────────────────────
export function emailSuccessPage(user: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome — CosmosIQ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    body{font-family:'Inter',sans-serif;}
    .gradient-cosmos{background:linear-gradient(135deg,#4f46e5,#7c3aed);}
    @keyframes confetti{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
    .confetti-piece{position:fixed;animation:confetti 3s ease-in forwards;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fade-in{animation:fadeIn 0.5s ease forwards;}
  </style>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center px-4">
  <div id="confetti-container"></div>
  <div class="w-full max-w-md fade-in">
    <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      <div class="gradient-cosmos p-8 text-center text-white relative overflow-hidden">
        <div class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10"></div>
        <div class="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/10"></div>
        <div class="relative">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-3xl font-black border-4 border-white/30">
            ${(user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div class="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <i class="fas fa-envelope-circle-check text-green-300"></i> Email Verified
          </div>
          <h1 class="text-2xl font-black">Welcome, ${user.given_name || user.name}! 🎉</h1>
          <p class="text-white/70 text-sm mt-1">You're now signed in to CosmosIQ</p>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i class="fas fa-user w-5 text-center" style="color:#6366f1"></i>
            <div><p class="text-xs text-gray-400">Full Name</p><p class="font-semibold text-gray-900 text-sm">${user.name}</p></div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i class="fas fa-envelope w-5 text-center" style="color:#6366f1"></i>
            <div><p class="text-xs text-gray-400">Email Address</p><p class="font-semibold text-gray-900 text-sm">${user.email}</p></div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i class="fas fa-shield-check w-5 text-center" style="color:#10b981"></i>
            <div><p class="text-xs text-gray-400">Authentication</p><p class="font-semibold text-gray-900 text-sm">Email OTP Verified</p></div>
            <span class="ml-auto bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">Secure</span>
          </div>
        </div>
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
    <p class="text-center text-xs text-gray-400 mt-4"><i class="fas fa-lock mr-1"></i>Session secured · Expires in 7 days</p>
  </div>
  <script>
    const colors=['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#0ea5e9']
    const container=document.getElementById('confetti-container')
    for(let i=0;i<60;i++){
      setTimeout(()=>{
        const el=document.createElement('div')
        el.className='confetti-piece'
        el.style.cssText=\`left:\${Math.random()*100}vw;top:-20px;background:\${colors[Math.floor(Math.random()*colors.length)]};border-radius:\${Math.random()>.5?'50%':'2px'};width:\${6+Math.random()*8}px;height:\${6+Math.random()*8}px;animation-duration:\${2+Math.random()*2}s;animation-delay:\${Math.random()*.5}s;\`
        container.appendChild(el)
        setTimeout(()=>el.remove(),4000)
      },i*30)
    }
    setTimeout(()=>window.location.href='/dashboard',4000)
  </script>
</body>
</html>`
}
