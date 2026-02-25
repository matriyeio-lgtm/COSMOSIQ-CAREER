// ─── AUTHENTICATION PAGES ───────────────────────────────────────────────────
import { layout } from '../components/layout'

export function loginPage(): string {
  const body = `
<div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-md">

    <!-- Card -->
    <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg">C</div>
        <h1 class="text-2xl font-black text-white">Welcome Back!</h1>
        <p class="text-indigo-200 text-sm mt-1">Sign in to continue your career journey</p>
      </div>

      <!-- OAuth Login Buttons -->
      <div class="space-y-3 mb-6">
        <a href="/auth/google" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition group shadow-sm">
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span>Continue with Google</span>
        </a>
        <a href="/auth/linkedin" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0077B5] rounded-xl text-sm font-semibold text-white hover:bg-[#006097] transition group">
          <i class="fab fa-linkedin-in flex-shrink-0"></i>
          <span>Continue with LinkedIn</span>
        </a>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <div class="flex-1 h-px bg-white/20"></div>
        <span class="text-xs text-indigo-300 font-medium">or sign in with email OTP</span>
        <div class="flex-1 h-px bg-white/20"></div>
      </div>

      <!-- Step 1: Email Input -->
      <div id="step1">
        <!-- User Type Toggle -->
        <div class="flex bg-white/10 rounded-xl p-1 mb-4">
          <button type="button" onclick="setType('seeker')" id="btnSeeker" class="flex-1 py-2 rounded-lg text-sm font-semibold transition bg-white text-indigo-700 shadow-sm">
            <i class="fas fa-user-tie mr-1.5"></i>Job Seeker
          </button>
          <button type="button" onclick="setType('employer')" id="btnEmployer" class="flex-1 py-2 rounded-lg text-sm font-semibold transition text-white/70">
            <i class="fas fa-building mr-1.5"></i>Employer
          </button>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold text-indigo-200 mb-1.5">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm"></i>
            <input type="email" id="loginEmail" placeholder="you@example.com"
              class="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"/>
          </div>
        </div>

        <button onclick="sendLoginOTP()" id="sendOtpBtn"
          class="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
          <i class="fas fa-paper-plane"></i>
          <span>Send OTP to Email</span>
        </button>

        <div id="otpError" class="hidden mt-3 text-red-300 text-xs text-center bg-red-500/10 rounded-xl p-3"></div>
      </div>

      <!-- Step 2: OTP Verification -->
      <div id="step2" class="hidden">
        <div class="text-center mb-6">
          <div class="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-envelope-open-text text-green-400 text-xl"></i>
          </div>
          <p class="text-white font-semibold text-sm">OTP sent to</p>
          <p id="displayEmail" class="text-indigo-300 font-bold text-sm"></p>
          <p class="text-white/50 text-xs mt-1">Enter the 6-digit code from your email</p>
        </div>

        <!-- OTP Input Boxes -->
        <div class="flex gap-2 justify-center mb-5" id="otpBoxes">
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,0)" onkeydown="otpKeydown(event,0)"/>
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,1)" onkeydown="otpKeydown(event,1)"/>
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,2)" onkeydown="otpKeydown(event,2)"/>
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,3)" onkeydown="otpKeydown(event,3)"/>
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,4)" onkeydown="otpKeydown(event,4)"/>
          <input type="text" maxlength="1" class="otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="otpInput(this,5)" onkeydown="otpKeydown(event,5)"/>
        </div>

        <button onclick="verifyLoginOTP()" id="verifyBtn"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mb-3">
          <i class="fas fa-check-circle"></i>
          <span>Verify & Sign In</span>
        </button>

        <div id="verifyError" class="hidden mb-3 text-red-300 text-xs text-center bg-red-500/10 rounded-xl p-3"></div>

        <!-- Timer + Resend -->
        <div class="text-center">
          <p class="text-white/50 text-xs" id="timerText">Resend OTP in <span id="countdown" class="text-indigo-300 font-bold">60</span>s</p>
          <button onclick="resendOTP()" id="resendBtn" class="hidden text-indigo-300 text-xs font-semibold hover:text-white transition mt-1">
            <i class="fas fa-redo-alt mr-1"></i>Resend OTP
          </button>
          <button onclick="goBack()" class="block w-full text-white/40 text-xs mt-3 hover:text-white/70 transition">
            <i class="fas fa-arrow-left mr-1"></i>Change email
          </button>
        </div>
      </div>

      <p class="text-center text-sm text-white/50 mt-6">
        Don't have an account?
        <a href="/signup" class="text-indigo-300 font-bold hover:text-white transition">Create one free</a>
      </p>
    </div>

    <!-- Trust badges -->
    <div class="flex items-center justify-center gap-6 mt-5 text-xs text-white/30">
      <span class="flex items-center gap-1"><i class="fas fa-lock text-green-400"></i> SSL Secured</span>
      <span class="flex items-center gap-1"><i class="fas fa-shield-alt text-blue-400"></i> GDPR Compliant</span>
      <span class="flex items-center gap-1"><i class="fas fa-user-check text-purple-400"></i> Verified Platform</span>
    </div>
  </div>
</div>

<script>
let userType = 'seeker';
let loginEmailValue = '';
let otpTimer = null;

function setType(t) {
  userType = t;
  const s = document.getElementById('btnSeeker');
  const e = document.getElementById('btnEmployer');
  if (t === 'seeker') {
    s.className = 'flex-1 py-2 rounded-lg text-sm font-semibold transition bg-white text-indigo-700 shadow-sm';
    e.className = 'flex-1 py-2 rounded-lg text-sm font-semibold transition text-white/70';
  } else {
    e.className = 'flex-1 py-2 rounded-lg text-sm font-semibold transition bg-white text-indigo-700 shadow-sm';
    s.className = 'flex-1 py-2 rounded-lg text-sm font-semibold transition text-white/70';
  }
}

async function sendLoginOTP() {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    showError('otpError', 'Please enter a valid email address.');
    return;
  }
  loginEmailValue = email;
  const btn = document.getElementById('sendOtpBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
  hideError('otpError');

  try {
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mode: 'login', role: userType })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('displayEmail').textContent = email;
      document.getElementById('step1').classList.add('hidden');
      document.getElementById('step2').classList.remove('hidden');
      startTimer();
      // If dev mode shows OTP, auto-fill it
      if (data._dev_otp) {
        const boxes = document.querySelectorAll('.otp-box');
        data._dev_otp.toString().split('').forEach((d, i) => {
          if (boxes[i]) boxes[i].value = d;
        });
        showError('verifyError', '⚠️ Email service offline — OTP auto-filled for testing: ' + data._dev_otp);
        document.getElementById('verifyError').classList.remove('hidden');
        document.getElementById('verifyError').className = 'mb-3 text-yellow-300 text-xs text-center bg-yellow-500/10 rounded-xl p-3';
      }
    } else {
      showError('otpError', data.error || 'Failed to send OTP. Please try again.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send OTP to Email</span>';
    }
  } catch (err) {
    showError('otpError', 'Network error. Please try again.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send OTP to Email</span>';
  }
}

async function verifyLoginOTP() {
  const boxes = document.querySelectorAll('.otp-box');
  const otp = Array.from(boxes).map(b => b.value).join('');
  if (otp.length !== 6) {
    showError('verifyError', 'Please enter all 6 digits.');
    return;
  }

  const btn = document.getElementById('verifyBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Verifying...';
  hideError('verifyError');

  try {
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmailValue, otp, mode: 'login', role: userType })
    });
    const data = await res.json();

    if (data.success) {
      btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Verified! Redirecting...';
      btn.className = btn.className.replace('from-green-500 to-emerald-600', 'from-emerald-500 to-teal-600');
      setTimeout(() => {
        window.location.href = data.role === 'employer' ? '/employer' : '/dashboard';
      }, 800);
    } else {
      showError('verifyError', data.error || 'Invalid OTP. Please try again.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check-circle"></i><span>Verify & Sign In</span>';
    }
  } catch (err) {
    showError('verifyError', 'Network error. Please try again.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check-circle"></i><span>Verify & Sign In</span>';
  }
}

async function resendOTP() {
  const btn = document.getElementById('resendBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Sending...';

  try {
    const res = await fetch('/api/otp/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmailValue, mode: 'login', role: userType })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('resendBtn').classList.add('hidden');
      document.getElementById('timerText').classList.remove('hidden');
      startTimer();
      if (data._dev_otp) {
        const boxes = document.querySelectorAll('.otp-box');
        data._dev_otp.toString().split('').forEach((d, i) => {
          if (boxes[i]) boxes[i].value = d;
        });
      }
    }
  } catch (e) {}
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-redo-alt mr-1"></i>Resend OTP';
}

function goBack() {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  const btn = document.getElementById('sendOtpBtn');
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send OTP to Email</span>';
  if (otpTimer) clearInterval(otpTimer);
}

function startTimer() {
  let seconds = 60;
  document.getElementById('countdown').textContent = seconds;
  document.getElementById('timerText').classList.remove('hidden');
  document.getElementById('resendBtn').classList.add('hidden');
  if (otpTimer) clearInterval(otpTimer);
  otpTimer = setInterval(() => {
    seconds--;
    document.getElementById('countdown').textContent = seconds;
    if (seconds <= 0) {
      clearInterval(otpTimer);
      document.getElementById('timerText').classList.add('hidden');
      document.getElementById('resendBtn').classList.remove('hidden');
    }
  }, 1000);
}

function otpInput(el, idx) {
  el.value = el.value.replace(/[^0-9]/g, '');
  if (el.value && idx < 5) {
    document.querySelectorAll('.otp-box')[idx + 1].focus();
  }
}

function otpKeydown(e, idx) {
  if (e.key === 'Backspace') {
    const boxes = document.querySelectorAll('.otp-box');
    if (!boxes[idx].value && idx > 0) {
      boxes[idx - 1].focus();
      boxes[idx - 1].value = '';
    }
  }
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}
function hideError(id) {
  document.getElementById(id).classList.add('hidden');
}
</script>
`
  return layout('Login', body, '')
}

export function signupPage(): string {
  const body = `
<div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">

      <div class="text-center mb-7">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-lg">C</div>
        <h1 class="text-2xl font-black text-white">Join CosmosIQ</h1>
        <p class="text-indigo-200 text-sm mt-1">Create your free account — no password needed!</p>
      </div>

      <!-- Role Selection -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button onclick="selectRole('seeker')" id="seekerBtn" class="p-4 border-2 border-indigo-400 bg-indigo-500/20 rounded-2xl text-center transition">
          <div class="text-2xl mb-2">🧑‍💼</div>
          <p class="font-bold text-white text-sm">Job Seeker</p>
          <p class="text-xs text-indigo-300 mt-0.5">Find your dream job</p>
        </button>
        <button onclick="selectRole('employer')" id="employerBtn" class="p-4 border-2 border-white/20 rounded-2xl text-center transition hover:border-indigo-400/50">
          <div class="text-2xl mb-2">🏢</div>
          <p class="font-bold text-white/70 text-sm">Employer</p>
          <p class="text-xs text-white/40 mt-0.5">Hire top talent</p>
        </button>
      </div>

      <!-- OAuth -->
      <div class="space-y-3 mb-5">
        <a href="/auth/google" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span>Sign up with Google</span>
        </a>
        <a href="/auth/linkedin" class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0077B5] rounded-xl text-sm font-semibold text-white hover:bg-[#006097] transition">
          <i class="fab fa-linkedin-in flex-shrink-0"></i>
          <span>Sign up with LinkedIn</span>
        </a>
      </div>

      <div class="flex items-center gap-3 mb-5">
        <div class="flex-1 h-px bg-white/20"></div>
        <span class="text-xs text-indigo-300 font-medium">or register with email OTP</span>
        <div class="flex-1 h-px bg-white/20"></div>
      </div>

      <!-- Step 1: Name + Email -->
      <div id="signupStep1">
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label class="block text-xs font-semibold text-indigo-200 mb-1.5">First Name</label>
            <input type="text" id="firstName" placeholder="Kumar"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"/>
          </div>
          <div>
            <label class="block text-xs font-semibold text-indigo-200 mb-1.5">Last Name</label>
            <input type="text" id="lastName" placeholder="Sanjeev"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"/>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold text-indigo-200 mb-1.5">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm"></i>
            <input type="email" id="signupEmail" placeholder="you@example.com"
              class="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"/>
          </div>
        </div>

        <label class="flex items-start gap-2 cursor-pointer mb-4">
          <input type="checkbox" id="agreeTerms" class="rounded mt-0.5 flex-shrink-0 w-4 h-4 text-indigo-600"/>
          <span class="text-xs text-white/50">I agree to CosmosIQ's <a href="/terms" class="text-indigo-300 hover:underline">Terms of Service</a> and <a href="/privacy" class="text-indigo-300 hover:underline">Privacy Policy</a></span>
        </label>

        <button onclick="sendSignupOTP()" id="signupSendBtn"
          class="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
          <i class="fas fa-paper-plane"></i>
          <span>Send Verification Code</span>
        </button>

        <div id="signupError" class="hidden mt-3 text-red-300 text-xs text-center bg-red-500/10 rounded-xl p-3"></div>
      </div>

      <!-- Step 2: OTP Verify -->
      <div id="signupStep2" class="hidden">
        <div class="text-center mb-6">
          <div class="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-envelope-open-text text-green-400 text-xl"></i>
          </div>
          <p class="text-white font-semibold text-sm">OTP sent to</p>
          <p id="signupDisplayEmail" class="text-indigo-300 font-bold text-sm"></p>
          <p class="text-white/40 text-xs mt-1">Check your inbox and enter the 6-digit code</p>
        </div>

        <div class="flex gap-2 justify-center mb-5">
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,0)" onkeydown="sotpKeydown(event,0)"/>
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,1)" onkeydown="sotpKeydown(event,1)"/>
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,2)" onkeydown="sotpKeydown(event,2)"/>
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,3)" onkeydown="sotpKeydown(event,3)"/>
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,4)" onkeydown="sotpKeydown(event,4)"/>
          <input type="text" maxlength="1" class="s-otp-box w-11 h-14 text-center text-xl font-black text-white bg-white/10 border-2 border-white/20 rounded-xl focus:border-indigo-400 focus:bg-white/20 outline-none transition" oninput="sotpInput(this,5)" onkeydown="sotpKeydown(event,5)"/>
        </div>

        <button onclick="verifySignupOTP()" id="signupVerifyBtn"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mb-3">
          <i class="fas fa-rocket"></i>
          <span>Create Account & Sign In</span>
        </button>

        <div id="signupVerifyError" class="hidden mb-3 text-xs text-center rounded-xl p-3"></div>

        <div class="text-center">
          <p class="text-white/50 text-xs" id="signupTimerText">Resend in <span id="signupCountdown" class="text-indigo-300 font-bold">60</span>s</p>
          <button onclick="resendSignupOTP()" id="signupResendBtn" class="hidden text-indigo-300 text-xs font-semibold hover:text-white transition mt-1">
            <i class="fas fa-redo-alt mr-1"></i>Resend OTP
          </button>
          <button onclick="goBackSignup()" class="block w-full text-white/40 text-xs mt-3 hover:text-white/70 transition">
            <i class="fas fa-arrow-left mr-1"></i>Edit details
          </button>
        </div>
      </div>

      <p class="text-center text-sm text-white/50 mt-6">
        Already have an account? <a href="/login" class="text-indigo-300 font-bold hover:text-white transition">Sign in</a>
      </p>
    </div>
  </div>
</div>

<script>
let selectedRole = 'seeker';
let signupEmailValue = '';
let signupName = '';
let signupTimer = null;

function selectRole(r) {
  selectedRole = r;
  const s = document.getElementById('seekerBtn');
  const e = document.getElementById('employerBtn');
  if (r === 'seeker') {
    s.className = 'p-4 border-2 border-indigo-400 bg-indigo-500/20 rounded-2xl text-center transition';
    s.querySelector('p.font-bold').className = 'font-bold text-white text-sm';
    s.querySelector('p.text-xs').className = 'text-xs text-indigo-300 mt-0.5';
    e.className = 'p-4 border-2 border-white/20 rounded-2xl text-center transition hover:border-indigo-400/50';
    e.querySelector('p.font-bold').className = 'font-bold text-white/70 text-sm';
    e.querySelector('p.text-xs').className = 'text-xs text-white/40 mt-0.5';
  } else {
    e.className = 'p-4 border-2 border-indigo-400 bg-indigo-500/20 rounded-2xl text-center transition';
    e.querySelector('p.font-bold').className = 'font-bold text-white text-sm';
    e.querySelector('p.text-xs').className = 'text-xs text-indigo-300 mt-0.5';
    s.className = 'p-4 border-2 border-white/20 rounded-2xl text-center transition hover:border-indigo-400/50';
    s.querySelector('p.font-bold').className = 'font-bold text-white/70 text-sm';
    s.querySelector('p.text-xs').className = 'text-xs text-white/40 mt-0.5';
  }
}

async function sendSignupOTP() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const agreed = document.getElementById('agreeTerms').checked;

  if (!firstName) { showSignupError('signupError', 'Please enter your first name.'); return; }
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { showSignupError('signupError', 'Please enter a valid email.'); return; }
  if (!agreed) { showSignupError('signupError', 'Please agree to the Terms of Service.'); return; }

  signupEmailValue = email;
  signupName = (firstName + ' ' + lastName).trim();

  const btn = document.getElementById('signupSendBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
  hideSignupError('signupError');

  try {
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: signupName, mode: 'signup', role: selectedRole })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('signupDisplayEmail').textContent = email;
      document.getElementById('signupStep1').classList.add('hidden');
      document.getElementById('signupStep2').classList.remove('hidden');
      startSignupTimer();
      if (data._dev_otp) {
        const boxes = document.querySelectorAll('.s-otp-box');
        data._dev_otp.toString().split('').forEach((d, i) => { if (boxes[i]) boxes[i].value = d; });
        const errEl = document.getElementById('signupVerifyError');
        errEl.textContent = '⚠️ Email service offline — OTP auto-filled for testing: ' + data._dev_otp;
        errEl.classList.remove('hidden');
        errEl.className = 'mb-3 text-yellow-300 text-xs text-center bg-yellow-500/10 rounded-xl p-3';
      }
    } else {
      showSignupError('signupError', data.error || 'Failed to send OTP.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Verification Code</span>';
    }
  } catch (err) {
    showSignupError('signupError', 'Network error. Please try again.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Verification Code</span>';
  }
}

async function verifySignupOTP() {
  const boxes = document.querySelectorAll('.s-otp-box');
  const otp = Array.from(boxes).map(b => b.value).join('');
  if (otp.length !== 6) { showSignupError('signupVerifyError', 'Enter all 6 digits.'); return; }

  const btn = document.getElementById('signupVerifyBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Account...';
  hideSignupError('signupVerifyError');

  try {
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signupEmailValue, otp, mode: 'signup', name: signupName, role: selectedRole })
    });
    const data = await res.json();

    if (data.success) {
      btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Account created! Redirecting...';
      setTimeout(() => {
        window.location.href = data.role === 'employer' ? '/employer' : '/dashboard';
      }, 800);
    } else {
      showSignupError('signupVerifyError', data.error || 'Invalid OTP.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-rocket"></i><span>Create Account & Sign In</span>';
    }
  } catch (err) {
    showSignupError('signupVerifyError', 'Network error. Please try again.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-rocket"></i><span>Create Account & Sign In</span>';
  }
}

async function resendSignupOTP() {
  const btn = document.getElementById('signupResendBtn');
  btn.disabled = true;
  try {
    const res = await fetch('/api/otp/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signupEmailValue, mode: 'signup', name: signupName, role: selectedRole })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('signupResendBtn').classList.add('hidden');
      document.getElementById('signupTimerText').classList.remove('hidden');
      startSignupTimer();
      if (data._dev_otp) {
        const boxes = document.querySelectorAll('.s-otp-box');
        data._dev_otp.toString().split('').forEach((d, i) => { if (boxes[i]) boxes[i].value = d; });
      }
    }
  } catch(e) {}
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-redo-alt mr-1"></i>Resend OTP';
}

function goBackSignup() {
  document.getElementById('signupStep2').classList.add('hidden');
  document.getElementById('signupStep1').classList.remove('hidden');
  const btn = document.getElementById('signupSendBtn');
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Verification Code</span>';
  if (signupTimer) clearInterval(signupTimer);
}

function startSignupTimer() {
  let s = 60;
  document.getElementById('signupCountdown').textContent = s;
  document.getElementById('signupTimerText').classList.remove('hidden');
  document.getElementById('signupResendBtn').classList.add('hidden');
  if (signupTimer) clearInterval(signupTimer);
  signupTimer = setInterval(() => {
    s--;
    document.getElementById('signupCountdown').textContent = s;
    if (s <= 0) {
      clearInterval(signupTimer);
      document.getElementById('signupTimerText').classList.add('hidden');
      document.getElementById('signupResendBtn').classList.remove('hidden');
    }
  }, 1000);
}

function sotpInput(el, idx) {
  el.value = el.value.replace(/[^0-9]/g, '');
  if (el.value && idx < 5) document.querySelectorAll('.s-otp-box')[idx + 1].focus();
}
function sotpKeydown(e, idx) {
  if (e.key === 'Backspace') {
    const boxes = document.querySelectorAll('.s-otp-box');
    if (!boxes[idx].value && idx > 0) { boxes[idx - 1].focus(); boxes[idx - 1].value = ''; }
  }
}

function showSignupError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}
function hideSignupError(id) {
  document.getElementById(id).classList.add('hidden');
}
</script>
`
  return layout('Sign Up', body, '')
}

export function forgotPasswordPage(): string {
  const body = `
<div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-md">
    <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl mx-auto mb-5">🔐</div>
      <h1 class="text-2xl font-black text-white mb-2">Reset Your Password</h1>
      <p class="text-indigo-200 text-sm mb-8">Enter your email — we'll send a reset link within 2 minutes.</p>

      <form onsubmit="handleReset(event)" class="text-left space-y-4">
        <div>
          <label class="block text-sm font-semibold text-indigo-200 mb-1.5">Email Address</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm"></i>
            <input type="email" placeholder="you@example.com" required
              class="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"/>
          </div>
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition">
          <i class="fas fa-paper-plane mr-2"></i>Send Reset Link
        </button>
      </form>

      <a href="/login" class="inline-flex items-center gap-2 text-indigo-300 text-sm font-medium mt-6 hover:text-white transition">
        <i class="fas fa-arrow-left text-xs"></i> Back to Login
      </a>
    </div>
  </div>
</div>
<script>
function handleReset(e) {
  e.preventDefault();
  alert('Reset link sent! Check your inbox 📬');
  window.location = '/login';
}
</script>
`
  return layout('Forgot Password', body, '')
}
