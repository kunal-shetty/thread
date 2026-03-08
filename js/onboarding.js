// ── THEME ────────────────────────────────────────────────────────
const LS_THEME = 'th_theme';
function getTheme() { try { const v = localStorage.getItem(LS_THEME); return v ? JSON.parse(v) : 'light'; } catch { return 'light'; } }
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(LS_THEME, JSON.stringify(t));
  document.getElementById('themeIcon').className = t === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
}
applyTheme(getTheme());
document.getElementById('themeToggle').addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));

// ── ONBOARDING STATE ─────────────────────────────────────────────
const OB_KEY = 'th_onboarding';
let obData = JSON.parse(localStorage.getItem(OB_KEY) || '{}');
let currentStep = obData.currentStep || 1;
const TOTAL_STEPS = 7;
const STEP_LABELS = [
  'Create your account',
  'Verify your email',
  'About yourself',
  'Set up your workspace',
  'Choose your mode',
  'Customise workspace',
  'Invite your team',
];

function saveOb() {
  obData.currentStep = currentStep;
  localStorage.setItem(OB_KEY, JSON.stringify(obData));
}

// ── PROGRESS ─────────────────────────────────────────────────────
function buildProgress() {
  const container = document.getElementById('progressSteps');
  container.innerHTML = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    if (i > 1) {
      const line = document.createElement('div');
      line.className = 'progress-line' + (i <= currentStep ? ' done' : '');
      container.appendChild(line);
    }
    const dot = document.createElement('div');
    dot.className = 'progress-step ' + (i < currentStep ? 'done' : i === currentStep ? 'active' : 'todo');
    if (i < currentStep) {
      dot.innerHTML = '<i class="ri-check-line"></i>';
      dot.onclick = () => goToStep(i);
      dot.title = STEP_LABELS[i - 1];
    } else {
      dot.textContent = i;
    }
    container.appendChild(dot);
  }
  document.getElementById('progressLabel').innerHTML = `Step <span>${currentStep}</span> of ${TOTAL_STEPS} — ${STEP_LABELS[currentStep - 1]}`;
}

function goToStep(n) {
  document.getElementById('step-' + currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('step-' + currentStep).classList.add('active');
  buildProgress();
  saveOb();
  if (currentStep === 2) startResendTimer();
  // Restore saved data into fields
  restoreStep(currentStep);
}

function goNext() { if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1); }
function goPrev() { if (currentStep > 1) goToStep(currentStep - 1); }

buildProgress();
restoreStep(1);

// ── RESTORE FIELDS ───────────────────────────────────────────────
function restoreStep(s) {
  if (s === 1) {
    if (obData.name) document.getElementById('fullName').value = obData.name;
    if (obData.email) { document.getElementById('emailField').value = obData.email; document.getElementById('verifyEmail').textContent = obData.email; }
    validateStep1();
  }
  if (s === 4) {
    if (obData.orgName) document.getElementById('orgName').value = obData.orgName;
    if (obData.orgSlug) { document.getElementById('orgSlug').value = obData.orgSlug; document.getElementById('slugVal').textContent = obData.orgSlug; }
    if (obData.orgType) { document.querySelectorAll('#orgTypeGrid .select-card').forEach(c => { if (c.dataset.value === obData.orgType) c.classList.add('selected'); }); }
  }
  if (s === 5 && obData.mode) {
    document.querySelectorAll('.mode-pick-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.mode === obData.mode);
      const chk = c.querySelector('.mode-pick-check'); if (chk) chk.remove();
      if (c.dataset.mode === obData.mode) { const ico = document.createElement('i'); ico.className = 'ri-check-circle-fill mode-pick-check'; c.appendChild(ico); }
    });
    document.getElementById('step5Btn').disabled = false;
  }
  if (s === 3 && obData.role) {
    document.querySelectorAll('#roleGrid .select-card').forEach(c => { if (c.dataset.value === obData.role) c.classList.add('selected'); });
  }
}

// ── STEP 1 ───────────────────────────────────────────────────────
function validateStep1() {
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('emailField').value.trim();
  const pw = document.getElementById('pwField').value;
  const valid = name.length > 1 && email.includes('@') && pw.length >= 8;
  document.getElementById('step1Btn').disabled = !valid;
  if (name) obData.name = name;
  if (email) { obData.email = email; document.getElementById('verifyEmail').textContent = email; }
  saveOb();
}

function checkPassword(val) {
  const bar = document.getElementById('pwBar');
  const hint = document.getElementById('pwHint');
  const levels = [
    { min: 0, w: '0%', bg: '', msg: 'Enter a strong password', icon: 'ri-information-line' },
    { min: 1, w: '20%', bg: '#EF4444', msg: 'Very weak', icon: 'ri-error-warning-line' },
    { min: 6, w: '40%', bg: '#F97316', msg: 'Weak', icon: 'ri-alert-line' },
    { min: 8, w: '60%', bg: '#F5C842', msg: 'Fair', icon: 'ri-checkbox-blank-circle-line' },
    { min: 10, w: '80%', bg: '#10B981', msg: 'Strong', icon: 'ri-checkbox-circle-line' },
    { min: 14, w: '100%', bg: '#059669', msg: 'Very strong', icon: 'ri-shield-check-line' },
  ];
  let level = levels[0];
  for (const l of levels) { if (val.length >= l.min) level = l; }
  bar.style.width = level.w; bar.style.background = level.bg;
  hint.innerHTML = `<i class="${level.icon}" style="color:${level.bg || 'var(--text3)'}"></i> ${level.msg}`;
  hint.style.color = level.bg || 'var(--text3)';
  validateStep1();
}

function socialLogin(provider) {
  obData.name = provider === 'Google' ? 'Ayushi Upadhyay' : 'dev_user';
  obData.email = provider === 'Google' ? 'ayushi@newsroom.co' : 'dev@github.com';
  saveOb();
  goNext();
  startResendTimer();
  document.getElementById('verifyEmail').textContent = obData.email;
}

// ── STEP 2 (OTP) ─────────────────────────────────────────────────
function otpInput(idx, input) {
  input.classList.toggle('filled', input.value !== '');
  if (input.value && idx < 5) document.getElementById('otp' + (idx + 1)).focus();
  const all = Array.from({ length: 6 }, (_, i) => document.getElementById('otp' + i).value).every(v => v);
  document.getElementById('step2Btn').disabled = !all;
  if (all) { obData.emailVerified = true; saveOb(); }
}
function otpKeydown(idx, e) {
  if (e.key === 'Backspace' && !e.target.value && idx > 0) {
    document.getElementById('otp' + (idx - 1)).value = '';
    document.getElementById('otp' + (idx - 1)).classList.remove('filled');
    document.getElementById('otp' + (idx - 1)).focus();
  }
}

let resendInterval;
function startResendTimer() {
  clearInterval(resendInterval);
  let secs = 60;
  const btn = document.getElementById('resendBtn');
  const timer = document.getElementById('resendTimer');
  btn.disabled = true; timer.textContent = '(60s)';
  resendInterval = setInterval(() => {
    secs--;
    timer.textContent = secs > 0 ? `(${secs}s)` : '';
    if (secs <= 0) { clearInterval(resendInterval); btn.disabled = false; }
  }, 1000);
}
setTimeout(startResendTimer, 200);

function resendCode() {
  document.getElementById('resendBtn').disabled = true;
  startResendTimer();
}

// ── CARD SELECT ──────────────────────────────────────────────────
function selectCard(el, group) {
  el.closest('.card-grid').querySelectorAll('.select-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  if (group === 'role') { obData.role = el.dataset.value; }
  if (group === 'orgtype') { obData.orgType = el.dataset.value; }
  saveOb();
}

// ── TAG TOGGLE ───────────────────────────────────────────────────
function toggleTag(el) {
  el.classList.toggle('selected');
  const types = Array.from(document.querySelectorAll('#typesTags .tag.selected')).map(t => t.textContent.trim());
  obData.writingTypes = types;
  saveOb();
}

// ── SLUG ────────────────────────────────────────────────────────
let slugTimeout;
function updateSlug(val) {
  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'your-org';
  document.getElementById('slugVal').textContent = slug;
  document.getElementById('orgSlug').value = slug;
  obData.orgName = val; obData.orgSlug = slug;
  saveOb();
  checkSlug(slug);
}

function checkSlug(val) {
  const check = document.getElementById('urlCheck');
  const msg = document.getElementById('urlCheckMsg');
  if (!val) { check.style.display = 'none'; return; }
  check.style.display = 'flex';
  check.className = 'url-check';
  check.querySelector('i').className = 'ri-loader-4-line';
  msg.textContent = 'Checking…';
  clearTimeout(slugTimeout);
  slugTimeout = setTimeout(() => {
    const taken = ['newsroom', 'media', 'legal', 'writers', 'thread', 'admin'];
    const ok = !taken.includes(val.toLowerCase());
    check.className = 'url-check ' + (ok ? 'ok' : 'err');
    check.querySelector('i').className = ok ? 'ri-checkbox-circle-line' : 'ri-close-circle-line';
    msg.textContent = ok ? 'Available' : 'Already taken';
    obData.orgSlug = ok ? val : ''; saveOb();
    document.getElementById('slugVal').textContent = val || 'your-org';
  }, 500);
}

// ── MODE SELECT ──────────────────────────────────────────────────
function selectMode(el) {
  document.querySelectorAll('.mode-pick-card').forEach(c => {
    c.classList.remove('selected');
    const chk = c.querySelector('.mode-pick-check'); if (chk) chk.remove();
  });
  el.classList.add('selected');
  const ico = document.createElement('i');
  ico.className = 'ri-check-circle-fill mode-pick-check';
  ico.style.cssText = 'margin-left:auto;flex-shrink:0;color:var(--peach);font-size:22px';
  el.appendChild(ico);
  obData.mode = el.dataset.mode;
  saveOb();
  document.getElementById('step5Btn').disabled = false;
}

// ── THEME PREF ───────────────────────────────────────────────────
function selectThemePref(el, pref) {
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  obData.theme = pref;
  saveOb();
  if (pref !== 'system') applyTheme(pref);
}

// ── FONT ────────────────────────────────────────────────────────
function selectFont(el) {
  document.querySelectorAll('.font-opt').forEach(f => f.classList.remove('selected'));
  el.classList.add('selected');
  obData.font = el.dataset.font;
  saveOb();
}

// ── TOGGLE PILL ──────────────────────────────────────────────────
function togglePill(el) {
  el.classList.toggle('on');
  const id = el.id;
  if (id === 'aiToggle') obData.aiEnabled = el.classList.contains('on');
  if (id === 'notifToggle') obData.emailNotifs = el.classList.contains('on');
  saveOb();
}

// ── INVITE CHIPS ─────────────────────────────────────────────────
const inviteEmails = obData.inviteEmails || [];
function handleInviteKey(e) {
  const input = document.getElementById('inviteInput');
  if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
    e.preventDefault();
    const email = input.value.trim().replace(/,/g, '');
    if (email.includes('@') && !inviteEmails.includes(email)) {
      inviteEmails.push(email);
      obData.inviteEmails = inviteEmails; saveOb();
      const chip = document.createElement('div');
      chip.className = 'invite-chip';
      chip.dataset.email = email;
      chip.innerHTML = `<i class="ri-mail-line" style="font-size:12px"></i><span>${email}</span><span class="invite-chip-remove" onclick="removeChip(this,'${email}')">×</span>`;
      document.getElementById('inviteChips').insertBefore(chip, input);
    }
    input.value = '';
  }
}
function removeChip(el, email) {
  inviteEmails.splice(inviteEmails.indexOf(email), 1);
  obData.inviteEmails = inviteEmails; saveOb();
  el.parentElement.remove();
}

function selectInviteRole(el) {
  document.querySelectorAll('#inviteRoleCards .role-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  obData.inviteRole = el.dataset.role; saveOb();
}

function copyLink(btn) {
  const link = `https://thread.so/invite/${obData.orgSlug || 'org'}?token=abc123`;
  navigator.clipboard.writeText(link).catch(() => { });
  btn.innerHTML = '<i class="ri-check-line"></i> Copied!';
  btn.style.color = 'var(--mint)';
  setTimeout(() => { btn.innerHTML = '<i class="ri-clipboard-line"></i> Copy link'; btn.style.color = ''; }, 2000);
}

// ── LAUNCH ──────────────────────────────────────────────────────
function launchWorkspace() {
  // Build final user object from onboarding data
  const user = {
    name: obData.name || 'New User',
    email: obData.email || '',
    initials: (obData.name || 'NU').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    org: obData.orgName || 'My Workspace',
    orgSlug: obData.orgSlug || 'my-workspace',
    plan: obData.orgType === 'Solo Workspace' ? 'Solo' : 'Team',
    mode: obData.mode || 'writer',
    theme: obData.theme || 'light',
    font: obData.font || 'Fraunces',
    aiEnabled: obData.aiEnabled !== false,
    emailNotifs: obData.emailNotifs !== false,
    role: obData.role || 'Writer',
    onboarded: true,
  };
  localStorage.setItem('th_user', JSON.stringify(user));
  localStorage.setItem('th_onboarded', 'true');
  if (obData.theme && obData.theme !== 'system') localStorage.setItem('th_theme', JSON.stringify(obData.theme));

  // Animate launch button
  const btn = document.getElementById('launchBtn');
  btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Setting up…';
  btn.disabled = true;
  document.head.insertAdjacentHTML('beforeend', '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>');
  setTimeout(() => { window.location.href = 'app.html'; }, 1400);
}

// Restore invite emails from storage
if (obData.inviteEmails && obData.inviteEmails.length) {
  obData.inviteEmails.forEach(email => {
    const chip = document.createElement('div');
    chip.className = 'invite-chip'; chip.dataset.email = email;
    chip.innerHTML = `<i class="ri-mail-line" style="font-size:12px"></i><span>${email}</span><span class="invite-chip-remove" onclick="removeChip(this,'${email}')">×</span>`;
    document.getElementById('inviteChips').insertBefore(chip, document.getElementById('inviteInput'));
    if (!inviteEmails.includes(email)) inviteEmails.push(email);
  });
}
