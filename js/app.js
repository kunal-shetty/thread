
/* ══════════════════════════════════════════════
   THREAD — Full App  |  jQuery + localStorage
══════════════════════════════════════════════ */

// ─── STORAGE ───
const LS = {
  get(k, d = null) { try { const v = localStorage.getItem('th_' + k); return v === null ? d : JSON.parse(v) } catch { return d } },
  set(k, v) { try { localStorage.setItem('th_' + k, JSON.stringify(v)) } catch { } },
  del(k) { localStorage.removeItem('th_' + k) }
};

// ─── DEFAULT DATA ───
const DEFAULT_USER = {
  name: 'Alex Rivera', email: 'alex@citybeat.com', initials: 'AR',
  org: 'City Beat Newsroom', orgSlug: 'city-beat', plan: 'Team',
  mode: 'journalism', theme: 'light', aiEnabled: true, emailNotifs: true, font: 'Fraunces'
};
const DEFAULT_DOCS = [
  {
    id: 'd1', title: 'The Future of Local Journalism', status: 'draft', words: 1240, author: 'Alex Rivera', authorInit: 'AR', updated: '2h ago', mode: 'journalism',
    content: '<p>The decline of local newsrooms has accelerated at an unprecedented pace over the past decade, leaving vast stretches of the country without reliable, community-focused reporting. As private equity firms acquire and systematically dismantle regional papers, a new generation of independent journalists is quietly building something different — and potentially more durable.</p><h2>The Scale of the Problem</h2><p>Since 2005, over 2,500 newspapers have closed across the United States alone — a staggering figure that represents not just the closure of businesses, but the disappearance of institutional knowledge, civic accountability, and the cultural fabric that binds communities together.</p><blockquote>"Without a local newspaper asking questions, who holds the municipal council accountable? Who covers the planning meeting that rezones your neighbourhood?" — Media scholar Dr. Priya Iyer</blockquote><h2>A New Model Emerging</h2><p>In cities like Chicago, Denver, and Austin, something interesting is happening. Former newspaper journalists are founding nonprofit newsrooms, reader-supported newsletters, and cooperative media organisations. These entities are small, scrappy, and deeply local in ways that the corporate newspapers they replaced rarely were.</p>',
    deadline: '2026-03-20', assignee: 'Alex Rivera', comments: [
      { id: 'c1', author: 'Sam Park', init: 'SP', color: 'mint', time: '2h ago', text: 'Great lede! Can we add a specific data point here — the exact number of papers closed would strengthen the opener.', resolved: false },
      { id: 'c2', author: 'Jordan Lee', init: 'JL', color: 'lav', time: '5h ago', text: 'The Priya Iyer quote is powerful. Do we have proper attribution? Check AP Style.', resolved: false }
    ]
  },
  {
    id: 'd2', title: 'Q4 Editorial Performance Report', status: 'review', words: 3420, author: 'Sam Park', authorInit: 'SP', updated: '1d ago', mode: 'writer',
    content: '<p>This report covers the editorial performance of Thread Newsroom for Q4 2025. It includes story output metrics, team productivity analysis, and recommendations for Q1 2026 planning.</p><h2>Key Metrics</h2><p>Our team published 127 stories in Q4, a 14% increase from Q3. Breaking news response time improved to an average of 23 minutes — our best figure ever.</p><h2>Recommendations</h2><p>Invest further in data journalism capacity. Our data-driven pieces consistently outperformed narrative-only stories by 40% on engagement metrics.</p>',
    deadline: '2026-03-12', assignee: 'Sam Park', comments: []
  },
  {
    id: 'd3', title: 'Interview: Mayor Williams on Housing', status: 'approved', words: 2100, author: 'Jordan Lee', authorInit: 'JL', updated: '3d ago', mode: 'journalism',
    content: '<p>Mayor Sarah Williams sat down for an exclusive 90-minute interview covering the city\'s response to the affordable housing crisis — her first major policy interview since the November election.</p><h2>On the Housing Bill</h2><p>"We\'ve been talking about this for fifteen years," the Mayor said. "The bill that passed this week is just the beginning. We need 3,000 new affordable units by 2028 and we have a plan to get there."</p>',
    deadline: '2026-03-10', assignee: 'Jordan Lee', comments: []
  },
  {
    id: 'd4', title: 'City Council Votes 7–2 on Housing Bill', status: 'published', words: 890, author: 'Alex Rivera', authorInit: 'AR', updated: '5d ago', mode: 'journalism',
    content: '<p>The city council voted 7 to 2 Tuesday evening to approve a sweeping affordable housing bill that will reshape development policy across the city for the next decade, according to council records reviewed by Thread.</p>',
    deadline: '', assignee: 'Alex Rivera', comments: []
  },
  {
    id: 'd5', title: "Tech Giants' Capitol Hill Testimony", status: 'revision', words: 1780, author: 'Casey Morgan', authorInit: 'CM', updated: '6h ago', mode: 'journalism',
    content: '<p>Five of the world\'s largest technology executives faced pointed questioning from lawmakers on Tuesday, as a Senate subcommittee convened a hearing on data privacy practices that critics say put users at significant risk.</p>',
    deadline: '2026-03-18', assignee: 'Casey Morgan', comments: [
      { id: 'c3', author: 'Alex Rivera', init: 'AR', color: 'peach', time: '6h ago', text: 'Paragraph 3 needs the specific citation for the FTC study. Please double-check the figure — I believe it is 2.4 billion not 2.1 billion.', resolved: false }
    ]
  },
  {
    id: 'd6', title: 'Climate Change: Local Impact 2026', status: 'review', words: 2650, author: 'Casey Morgan', authorInit: 'CM', updated: '2d ago', mode: 'writer',
    content: '<p>The summer of 2025 shattered temperature records across the region, with seventeen districts reporting their hottest July on record. Farmers, urban planners, and public health officials are now grappling with what scientists have long warned: climate change is no longer a distant threat.</p>',
    deadline: '2026-03-22', assignee: 'Casey Morgan', comments: []
  },
];
const DEFAULT_KB = [
  { id: 'kb1', title: 'AP Style Guide Reference', icon: 'ri-book-2-line', color: 'peach', updated: '1 week ago', category: 'Style' },
  { id: 'kb2', title: 'Source Attribution Policy', icon: 'ri-user-voice-line', color: 'sky', updated: '2 weeks ago', category: 'Policy' },
  { id: 'kb3', title: 'Story Templates Library', icon: 'ri-file-copy-2-line', color: 'mint', updated: '3 days ago', category: 'Templates' },
  { id: 'kb4', title: 'FOIA Request Log', icon: 'ri-government-line', color: 'lav', updated: '1 day ago', category: 'Legal' },
  { id: 'kb5', title: 'Brand Voice Guide', icon: 'ri-sound-module-line', color: 'blush', updated: '5 days ago', category: 'Brand' },
  { id: 'kb6', title: 'Data Sources & APIs', icon: 'ri-database-2-line', color: 'lemon', updated: '4 days ago', category: 'Data' },
];
const DEFAULT_NOTIFS = [
  { id: 'n1', icon: 'ri-checkbox-circle-line', iconBg: 'mint-ll', iconColor: 'mint', title: 'Document approved', body: '"Interview: Mayor Williams on Housing" was approved by the editorial team.', time: '2 hours ago', unread: true },
  { id: 'n2', icon: 'ri-refresh-line', iconBg: 'blush-ll', iconColor: 'blush', title: 'Revision requested', body: 'Alex requested changes on "Tech Giants\' Capitol Hill Testimony".', time: '5 hours ago', unread: true },
  { id: 'n3', icon: 'ri-chat-3-line', iconBg: 'lav-ll', iconColor: 'lav', title: 'New comment', body: 'Jordan commented on your cover story draft.', time: 'Yesterday', unread: false },
  { id: 'n4', icon: 'ri-user-add-line', iconBg: 'mint-ll', iconColor: 'mint', title: 'Team member joined', body: 'Casey Morgan accepted your team invitation.', time: '2 days ago', unread: false },
  { id: 'n5', icon: 'ri-send-plane-line', iconBg: 'sky-ll', iconColor: 'sky', title: 'Document submitted', body: 'Sam submitted "Q4 Editorial Report" for review.', time: '3 days ago', unread: false },
];
const DEFAULT_ORGS = [
  { id: 'o1', name: 'City Beat Newsroom', slug: 'city-beat', abbr: 'CB', members: 8, plan: 'Team' },
  { id: 'o2', name: 'Freelance Portfolio', slug: 'freelance', abbr: 'FP', members: 1, plan: 'Solo' },
];

// ─── STATE ───
let STATE = {
  onboarded: LS.get('onboarded', false),
  currentView: 'dashboard',
  currentDocId: null,
  sidebarCollapsed: LS.get('sidebarCollapsed', false),
  panelOpen: LS.get('panelOpen', true),
  panelTab: 'ai',
  theme: LS.get('theme', 'light'),
  docs: LS.get('docs', DEFAULT_DOCS),
  kb: LS.get('kb', DEFAULT_KB),
  notifs: LS.get('notifs', DEFAULT_NOTIFS),
  orgs: LS.get('orgs', DEFAULT_ORGS),
  user: LS.get('user', DEFAULT_USER),
  obStep: 1, obData: {},
  focusMode: false,
  cmdOpen: false,
};

function persist() {
  LS.set('docs', STATE.docs);
  LS.set('kb', STATE.kb);
  LS.set('notifs', STATE.notifs);
  LS.set('orgs', STATE.orgs);
  LS.set('user', STATE.user);
  LS.set('sidebarCollapsed', STATE.sidebarCollapsed);
  LS.set('panelOpen', STATE.panelOpen);
  LS.set('theme', STATE.theme);
}

// ─── BOOT ───
$(function () {
  applyTheme(STATE.theme, false);
  STATE.onboarded = true;
  LS.set('onboarded', true);
  launchApp();

  $(document).on('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmd(); }
    if (e.key === 'Escape') { closeCmd(); closeAllOverlays(); }
    if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); runAI('continue'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'b' && $('#view-editor:visible').length) { e.preventDefault(); fmt('bold'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'i' && $('#view-editor:visible').length) { e.preventDefault(); fmt('italic'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'u' && $('#view-editor:visible').length) { e.preventDefault(); fmt('underline'); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && $('#view-editor:visible').length) { e.preventDefault(); document.execCommand('undo'); }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z')) && $('#view-editor:visible').length) { e.preventDefault(); document.execCommand('redo'); }
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#notif-panel,#btn-notif').length) $('#notif-panel').addClass('hidden');
    if (!$(e.target).closest('#profile-dropdown,#user-avatar-btn').length) $('#profile-dropdown').addClass('hidden');
    if (!$(e.target).closest('.dropdown-menu,[data-dd]').length) $('.dropdown-menu').not('#context-menu').remove();
    if (!$(e.target).closest('#context-menu').length) $('#context-menu').addClass('hidden').empty();
  });
  $(document).on('click', '[data-view-link]', function () { switchView($(this).data('view-link')); });
});

// ─── THEME ───
function applyTheme(t, save = true) {
  STATE.theme = t;
  $('html').attr('data-theme', t);
  const dark = t === 'dark';
  $('#btn-theme i,#ob-theme-btn i').attr('class', dark ? 'ri-moon-line' : 'ri-sun-line');
  if (save) { LS.set('theme', t); persist(); }
}
$(document).on('click', '#btn-theme,#ob-theme-btn', function () {
  applyTheme(STATE.theme === 'dark' ? 'light' : 'dark');
  toast('info', STATE.theme === 'dark' ? 'Dark mode' : 'Light mode', STATE.theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line');
});

// ─── TOAST ───
function toast(type, msg, icon = 'ri-information-line', dur = 2800) {
  const $t = $(`<div class="toast toast-${type}"><i class="ri ${icon}"></i><span>${msg}</span></div>`);
  $('#toast-container').append($t);
  setTimeout(() => { $t.css({ animation: 'toastOut .28s ease forwards' }); setTimeout(() => $t.remove(), 280); }, dur);
}

// ─── MODAL ───
function openModal(html, size = '') {
  closeModal();
  const $o = $(`<div class="modal-overlay" id="active-modal"><div class="modal ${size}">${html}</div></div>`);
  $('#modal-container').append($o);
  $o.on('click', function (e) { if ($(e.target).is($o)) closeModal(); });
  setTimeout(() => $o.find('input:first').trigger('focus'), 80);
}
function closeModal() { $('#active-modal').remove(); }
$(document).on('click', '.modal-close', closeModal);

// ─── DROPDOWN ───
function showDropdown(items, $anchor) {
  $('.dropdown-menu').not('#context-menu').remove();
  const $m = $('<div class="dropdown-menu"></div>');
  items.forEach(item => {
    if (item === '-') { $m.append('<div class="dropdown-divider"></div>'); return; }
    if (item.label_section) { $m.append(`<div class="dropdown-label">${item.label_section}</div>`); return; }
    const $i = $(`<div class="dropdown-item ${item.danger ? 'danger' : ''}">${item.icon ? `<i class="ri ${item.icon}"></i>` : ''}<span>${item.label}</span></div>`);
    $i.on('click', () => { $m.remove(); item.action && item.action(); });
    $m.append($i);
  });
  $('body').append($m);
  const p = $anchor[0].getBoundingClientRect();
  $m.css({ top: p.bottom + 6, left: Math.min(p.left, window.innerWidth - $m.outerWidth() - 10) });
}
function showCtxMenu(items, x, y) {
  $('#context-menu').removeClass('hidden').empty().css({ top: y, left: x });
  items.forEach(item => {
    if (item === '-') { $('#context-menu').append('<div class="dropdown-divider"></div>'); return; }
    const $i = $(`<div class="dropdown-item ${item.danger ? 'danger' : ''}">${item.icon ? `<i class="ri ${item.icon}"></i>` : ''}<span>${item.label}</span></div>`);
    $i.on('click', () => { $('#context-menu').addClass('hidden').empty(); item.action && item.action(); });
    $('#context-menu').append($i);
  });
  const $c = $('#context-menu');
  if (x + $c.outerWidth() > window.innerWidth) $c.css({ left: x - $c.outerWidth() });
  if (y + $c.outerHeight() > window.innerHeight) $c.css({ top: y - $c.outerHeight() });
}
function closeAllOverlays() {
  $('.dropdown-menu').not('#context-menu').remove();
  $('#context-menu').addClass('hidden').empty();
  $('#notif-panel').addClass('hidden');
  $('#profile-dropdown').addClass('hidden');
}

/* ══════════════ ONBOARDING ══════════════ */
const OB_STEPS = [
  { id: 1, icon: 'ri-user-add-line', title: 'Create your account', sub: 'Join thousands of writers already on Thread.' },
  { id: 2, icon: 'ri-mail-send-line', title: 'Verify your email', sub: 'We sent a 6-digit code. Enter it below to continue.' },
  { id: 3, icon: 'ri-hand-heart-line', title: 'Tell us about yourself', sub: 'Help us personalise your Thread experience.' },
  { id: 4, icon: 'ri-building-2-line', title: 'Set up your workspace', sub: 'Create your team or personal workspace.' },
  { id: 5, icon: 'ri-focus-3-line', title: 'Choose your writing mode', sub: 'Pick the mode that fits your work best. Change anytime.' },
  { id: 6, icon: 'ri-palette-line', title: 'Customise Thread', sub: 'Set your look and preferences — tweak these anytime in Settings.' },
  { id: 7, icon: 'ri-team-line', title: 'Invite your team', sub: 'Add teammates now or skip and invite them later.' },
];

function initOnboarding() {
  renderObProgress(1);
  renderObStep(1);
}
function renderObProgress(step) {
  STATE.obStep = step;
  let h = '';
  OB_STEPS.forEach((s, i) => {
    if (i > 0) h += `<div class="ob-step-line ${s.id <= step ? 'done' : ''}"></div>`;
    const cls = s.id < step ? 'done' : s.id === step ? 'active' : 'todo';
    h += `<div class="ob-step-dot ${cls}" data-step="${s.id}">${s.id < step ? '<i class="ri-check-line"></i>' : s.id}</div>`;
  });
  $('#ob-steps-row').html(h);
  $('#ob-progress-label').html(`Step <em>${step}</em> of 7 — ${OB_STEPS[step - 1].title}`);
  $('.ob-step-dot.done').on('click', function () { goOb(+$(this).data('step')); });
}
function goOb(step) { renderObProgress(step); renderObStep(step); }
function renderObStep(step) {
  const s = OB_STEPS[step - 1];
  let c = '';
  if (step === 1) {
    const d = STATE.obData;
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
      <button class="btn btn-ghost w-full" style="justify-content:center" id="ob-google"><i class="ri-google-fill" style="color:#4285F4"></i> Google</button>
      <button class="btn btn-ghost w-full" style="justify-content:center" id="ob-github"><i class="ri-github-fill"></i> GitHub</button>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;color:var(--text3);font-size:12px"><span style="flex:1;height:1px;background:var(--border)"></span>or with email<span style="flex:1;height:1px;background:var(--border)"></span></div>
    <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" id="ob-name" placeholder="Your name" value="${d.name || ''}"></div>
    <div class="form-group"><label class="form-label">Email Address *</label><input class="form-input" id="ob-email" type="email" placeholder="you@example.com" value="${d.email || ''}"></div>
    <div class="form-group"><label class="form-label">Password *</label><input class="form-input" id="ob-pw" type="password" placeholder="8+ characters">
      <div class="pw-bar-wrap"><div class="pw-bar" id="ob-pw-bar" style="width:0"></div></div>
      <div class="pw-hint" id="ob-pw-hint" style="color:var(--text3)">Enter a password</div>
    </div>
    <div class="ob-btn-row"><button class="btn btn-primary" id="ob-next-1" disabled><i class="ri-arrow-right-line"></i> Create Account</button></div>
    <div class="ob-skip">Already have an account? <a id="ob-signin">Sign in</a></div>`;
  } else if (step === 2) {
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2>
    <p class="ob-step-sub">We sent a code to <strong>${STATE.obData.email || 'your email'}</strong></p>
    <div class="otp-row" id="otp-row">${[0, 1, 2, 3, 4, 5].map(i => `<input class="otp-digit" maxlength="1" id="otp-${i}" inputmode="numeric">`).join('')}</div>
    <div style="text-align:center;font-size:13px;color:var(--text3);margin-bottom:16px">
      Didn't get it? <button class="btn btn-sm btn-ghost" id="ob-resend" disabled style="padding:3px 10px"><i class="ri-refresh-line"></i> Resend <span id="ob-resend-timer">(60s)</span></button>
    </div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-2"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-next-2" disabled><i class="ri-check-line"></i> Verify</button>
    </div>`;
  } else if (step === 3) {
    const d = STATE.obData;
    const roles = ['Writer', 'Journalist', 'Legal Pro', 'Editor', 'Content Manager', 'Other'];
    const types = ['Articles & Blogs', 'News Reporting', 'Legal Docs', 'Scripts', 'Marketing', 'Technical', 'Fiction', 'Research'];
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div class="form-label" style="margin-bottom:6px">Your Role</div>
    <div class="option-grid cols-3" id="role-grid">${roles.map(r => `<div class="option-card ${d.role === r ? 'selected' : ''}" data-role="${r}"><i class="ri-user-3-line"></i><div class="option-card-label">${r}</div></div>`).join('')}</div>
    <div class="form-label" style="margin-bottom:6px">Writing Types <span style="font-weight:400;color:var(--text3)">(select all)</span></div>
    <div class="tag-select" id="type-tags">${types.map(t => `<div class="tag-option ${(d.types || []).includes(t) ? 'selected' : ''}" data-type="${t}">${t}</div>`).join('')}</div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-3"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-next-3"><i class="ri-arrow-right-line"></i> Continue</button>
    </div>`;
  } else if (step === 4) {
    const d = STATE.obData;
    const orgTypes = ['Solo Workspace', 'Small Team (2–10)', 'Agency', 'Newsroom', 'Law Firm', 'Enterprise'];
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div class="form-group"><label class="form-label">Workspace Name *</label><input class="form-input" id="ob-org-name" placeholder="City Beat Newsroom" value="${d.orgName || ''}"></div>
    <div class="form-group"><label class="form-label">URL Slug</label><input class="form-input" id="ob-org-slug" placeholder="city-beat" value="${d.orgSlug || ''}">
      <div class="slug-preview">thread.app/<span class="slug-val" id="ob-slug-val">${d.orgSlug || 'your-workspace'}</span></div>
      <div class="slug-avail" id="ob-slug-avail"></div>
    </div>
    <div class="form-label" style="margin-bottom:6px">Workspace Type</div>
    <div class="option-grid cols-2" id="org-type-grid">${orgTypes.map(t => `<div class="option-card ${d.orgType === t ? 'selected' : ''}" data-orgtype="${t}"><i class="ri-building-2-line"></i><div class="option-card-label">${t}</div></div>`).join('')}</div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-4"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-next-4"><i class="ri-arrow-right-line"></i> Continue</button>
    </div>`;
  } else if (step === 5) {
    const d = STATE.obData;
    const modes = [
      { key: 'writer', icon: 'ri-edit-2-line', title: 'Writer', desc: 'For bloggers, content teams, and independent creators', feats: ['Flexible templates', 'AI continue & improve', 'Word count goals'] },
      { key: 'journalism', icon: 'ri-newspaper-line', title: 'Journalism', desc: 'For reporters, editors, and newsrooms', feats: ['AP Style enforcement', 'AI headline generator', 'Source tracking'] },
      { key: 'legal', icon: 'ri-scales-line', title: 'Legal', desc: 'For attorneys, paralegals, and legal teams', feats: ['Tracked changes always on', 'AI clause review', 'Bluebook citations'] },
    ];
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px" id="mode-cards">
      ${modes.map(m => `<div class="mode-pick-card" data-mode="${m.key}" style="display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:12px;border:2px solid ${d.mode === m.key ? 'var(--peach)' : 'var(--border)'};background:${d.mode === m.key ? 'var(--peach-ll)' : 'var(--card)'};cursor:pointer;transition:all .2s var(--spring)">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--peach-ll);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="${m.icon}" style="font-size:20px;color:var(--peach)"></i></div>
        <div style="flex:1"><div style="font-size:14px;font-weight:700;margin-bottom:2px">${m.title}</div><div style="font-size:12px;color:var(--text3);margin-bottom:6px">${m.desc}</div>
          <div style="display:flex;flex-direction:column;gap:3px">${m.feats.map(f => `<div style="font-size:11px;color:var(--text2);display:flex;align-items:center;gap:5px"><i class="ri-check-line" style="color:var(--peach)"></i>${f}</div>`).join('')}</div>
        </div>${d.mode === m.key ? '<i class="ri-check-circle-fill" style="color:var(--peach);font-size:18px;flex-shrink:0"></i>' : ''}
      </div>`).join('')}
    </div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-5"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-next-5" ${d.mode ? '' : 'disabled'}><i class="ri-arrow-right-line"></i> Continue</button>
    </div>`;
  } else if (step === 6) {
    const d = STATE.obData;
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div class="form-label" style="margin-bottom:8px">Theme</div>
    <div class="theme-picker">
      <div class="theme-card ${(!d.theme || d.theme === 'light') ? 'selected' : ''}" data-theme-pick="light">
        <div class="theme-preview" style="background:#FFFBF7"><div class="theme-bar" style="background:#F4845F"></div><div class="theme-bar" style="background:#FFDAB9;width:40%"></div></div>
        <div class="theme-label-text"><i class="ri-sun-line"></i> Light</div>
      </div>
      <div class="theme-card ${d.theme === 'dark' ? 'selected' : ''}" data-theme-pick="dark">
        <div class="theme-preview" style="background:#0A0A0A"><div class="theme-bar" style="background:#F97316"></div><div class="theme-bar" style="background:#431407;width:40%"></div></div>
        <div class="theme-label-text"><i class="ri-moon-line"></i> Dark</div>
      </div>
      <div class="theme-card ${d.theme === 'system' ? 'selected' : ''}" data-theme-pick="system">
        <div class="theme-preview" style="background:linear-gradient(135deg,#FFFBF7 50%,#0A0A0A 50%)"><i class="ri-computer-line" style="font-size:22px;color:var(--text3)"></i></div>
        <div class="theme-label-text"><i class="ri-computer-line"></i> System</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--card);border-radius:10px;border:1px solid var(--border)">
        <div><div style="font-size:13px;font-weight:600">AI Writing Assistant</div><div style="font-size:11px;color:var(--text3)">Inline AI commands in the editor</div></div>
        <div class="toggle-switch ${d.aiEnabled !== false ? 'on' : ''}" id="ob-ai-toggle"><div class="toggle-thumb"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--card);border-radius:10px;border:1px solid var(--border)">
        <div><div style="font-size:13px;font-weight:600">Email Notifications</div><div style="font-size:11px;color:var(--text3)">Approvals, comments, and digest</div></div>
        <div class="toggle-switch ${d.emailNotifs !== false ? 'on' : ''}" id="ob-notif-toggle"><div class="toggle-thumb"></div></div>
      </div>
    </div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-6"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-next-6"><i class="ri-arrow-right-line"></i> Continue</button>
    </div>`;
  } else if (step === 7) {
    c = `<div class="ob-step-icon"><i class="${s.icon}"></i></div>
    <h2 class="ob-step-title">${s.title}</h2><p class="ob-step-sub">${s.sub}</p>
    <div class="form-label" style="margin-bottom:5px">Invite by email</div>
    <div class="invite-chip-field" id="invite-chip-field">
      ${(STATE.obData.invites || []).map(e => `<div class="invite-chip" data-email="${e}"><span>${e}</span><span class="invite-chip-x" data-chip="${e}"><i class="ri-close-line"></i></span></div>`).join('')}
      <input type="text" class="invite-text-input" id="invite-input" placeholder="email@example.com — press Enter to add">
    </div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:14px">Press Enter or comma after each email address</div>
    <div class="form-label" style="margin-bottom:6px">Default role</div>
    <div class="option-grid cols-3" id="invite-role-grid" style="margin-bottom:14px">
      <div class="option-card ${(STATE.obData.inviteRole || 'Writer') === 'Viewer' ? 'selected' : ''}" data-inv-role="Viewer"><i class="ri-eye-line"></i><div class="option-card-label">Viewer</div></div>
      <div class="option-card ${(STATE.obData.inviteRole || 'Writer') === 'Writer' ? 'selected' : ''}" data-inv-role="Writer"><i class="ri-edit-2-line"></i><div class="option-card-label">Writer</div></div>
      <div class="option-card ${(STATE.obData.inviteRole || 'Writer') === 'Editor' ? 'selected' : ''}" data-inv-role="Editor"><i class="ri-user-settings-line"></i><div class="option-card-label">Editor</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:9px;padding:10px 13px;background:var(--bg3);border-radius:10px;margin-bottom:16px">
      <i class="ri-link" style="font-size:16px;color:var(--text3)"></i>
      <span style="flex:1;font-size:12px;color:var(--text2)">Share invite link</span>
      <button class="btn btn-sm btn-ghost" id="ob-copy-link"><i class="ri-clipboard-line"></i> Copy</button>
    </div>
    <div class="ob-btn-row">
      <button class="btn btn-ghost" id="ob-back-7"><i class="ri-arrow-left-line"></i> Back</button>
      <button class="btn btn-primary" id="ob-launch" style="background:linear-gradient(135deg,var(--peach),var(--blush))"><i class="ri-rocket-line"></i> Launch Thread</button>
    </div>
    <div class="ob-skip"><a id="ob-skip-invite">Skip — invite teammates later</a></div>`;
  }
  $('#ob-step-container').html(`<div class="ob-step-card">${c}</div>`);
  bindObStep(step);
}

function bindObStep(step) {
  if (step === 1) {
    $('#ob-name,#ob-email,#ob-pw').on('input', function () {
      const n = $('#ob-name').val().trim(), e = $('#ob-email').val().trim(), p = $('#ob-pw').val();
      const lvls = [{ min: 0, w: '0', c: '', m: 'Enter a password' }, { min: 1, w: '20%', c: '#EF4444', m: 'Very weak' }, { min: 6, w: '40%', c: '#F97316', m: 'Weak' }, { min: 8, w: '60%', c: '#F5C842', m: 'Fair' }, { min: 10, w: '80%', c: '#10B981', m: 'Strong' }, { min: 14, w: '100%', c: '#059669', m: 'Very strong ✓' }];
      let lv = lvls[0]; for (const l of lvls) if (p.length >= l.min) lv = l;
      $('#ob-pw-bar').css({ width: lv.w, background: lv.c });
      $('#ob-pw-hint').text(lv.m).css('color', lv.c || 'var(--text3)');
      $('#ob-next-1').prop('disabled', !(n && e.includes('@') && p.length >= 8));
    });
    $('#ob-next-1').on('click', function () {
      STATE.obData.name = $('#ob-name').val().trim();
      STATE.obData.email = $('#ob-email').val().trim();
      goOb(2); startOtpTimer();
    });
    $('#ob-google,#ob-github').on('click', function () {
      STATE.obData.name = 'Alex Rivera'; STATE.obData.email = 'alex@thread.app';
      goOb(2); startOtpTimer();
    });
    $('#ob-signin').on('click', finishOnboarding);
  } else if (step === 2) {
    startOtpTimer();
    $('.otp-digit').on('input', function () {
      const idx = +this.id.split('-')[1];
      $(this).toggleClass('filled', $(this).val() !== '');
      if ($(this).val() && idx < 5) $(`#otp-${idx + 1}`).trigger('focus');
      const all = [0, 1, 2, 3, 4, 5].every(i => $(`#otp-${i}`).val() !== '');
      $('#ob-next-2').prop('disabled', !all);
    });
    $('.otp-digit').on('keydown', function (e) {
      const idx = +this.id.split('-')[1];
      if (e.key === 'Backspace' && !$(this).val() && idx > 0) { $(`#otp-${idx - 1}`).val('').trigger('focus').removeClass('filled'); }
    });
    $('#ob-next-2').on('click', () => goOb(3));
    $('#ob-back-2').on('click', () => goOb(1));
    $('#ob-resend').on('click', () => { toast('info', 'Code resent!', 'ri-mail-send-line'); startOtpTimer(); });
  } else if (step === 3) {
    $('#role-grid .option-card').on('click', function () { $('#role-grid .option-card').removeClass('selected'); $(this).addClass('selected'); STATE.obData.role = $(this).data('role'); });
    $('#type-tags .tag-option').on('click', function () { $(this).toggleClass('selected'); STATE.obData.types = $('#type-tags .tag-option.selected').map(function () { return $(this).data('type'); }).get(); });
    $('#ob-next-3').on('click', () => goOb(4));
    $('#ob-back-3').on('click', () => goOb(2));
  } else if (step === 4) {
    let slugTimer;
    $('#ob-org-name').on('input', function () {
      const slug = $(this).val().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      $('#ob-org-slug').val(slug); $('#ob-slug-val').text(slug || 'your-workspace');
      STATE.obData.orgName = $(this).val(); STATE.obData.orgSlug = slug;
      clearTimeout(slugTimer); slugTimer = setTimeout(() => checkSlug(slug), 500);
    });
    $('#ob-org-slug').on('input', function () {
      $('#ob-slug-val').text($(this).val() || 'your-workspace'); STATE.obData.orgSlug = $(this).val();
      clearTimeout(slugTimer); slugTimer = setTimeout(() => checkSlug($(this).val()), 500);
    });
    $('#org-type-grid .option-card').on('click', function () { $('#org-type-grid .option-card').removeClass('selected'); $(this).addClass('selected'); STATE.obData.orgType = $(this).data('orgtype'); });
    $('#ob-next-4').on('click', () => goOb(5));
    $('#ob-back-4').on('click', () => goOb(3));
  } else if (step === 5) {
    $('#mode-cards .mode-pick-card').on('click', function () { STATE.obData.mode = $(this).data('mode'); goOb(5); });
    $('#ob-next-5').on('click', () => goOb(6));
    $('#ob-back-5').on('click', () => goOb(4));
  } else if (step === 6) {
    $(document).on('click.thpick', '.theme-card', function () {
      $('.theme-card').removeClass('selected'); $(this).addClass('selected');
      STATE.obData.theme = $(this).data('theme-pick');
      if (STATE.obData.theme !== 'system') applyTheme(STATE.obData.theme);
    });
    $('#ob-ai-toggle').on('click', function () { $(this).toggleClass('on'); STATE.obData.aiEnabled = $(this).hasClass('on'); });
    $('#ob-notif-toggle').on('click', function () { $(this).toggleClass('on'); STATE.obData.emailNotifs = $(this).hasClass('on'); });
    $('#ob-next-6').on('click', () => { $(document).off('click.thpick'); goOb(7); });
    $('#ob-back-6').on('click', () => { $(document).off('click.thpick'); goOb(5); });
  } else if (step === 7) {
    $('#invite-input').on('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ',') && $(this).val().trim()) {
        e.preventDefault();
        const email = $(this).val().trim().replace(',', '');
        if (email.includes('@') && !(STATE.obData.invites || []).includes(email)) {
          STATE.obData.invites = (STATE.obData.invites || []).concat(email);
          const $chip = $(`<div class="invite-chip" data-email="${email}"><span>${email}</span><span class="invite-chip-x" data-chip="${email}"><i class="ri-close-line"></i></span></div>`);
          $chip.insertBefore($(this));
        }
        $(this).val('');
      }
    });
    $(document).on('click.chips', '.invite-chip-x', function () {
      const em = $(this).data('chip');
      STATE.obData.invites = (STATE.obData.invites || []).filter(x => x !== em);
      $(`[data-email="${em}"]`).remove();
    });
    $('#invite-role-grid .option-card').on('click', function () { $('#invite-role-grid .option-card').removeClass('selected'); $(this).addClass('selected'); STATE.obData.inviteRole = $(this).data('inv-role'); });
    $('#ob-copy-link').on('click', function () {
      $(this).html('<i class="ri-check-line"></i> Copied!').css('color', 'var(--mint)');
      setTimeout(() => $(this).html('<i class="ri-clipboard-line"></i> Copy').css('color', ''), 2000);
    });
    $('#ob-launch,#ob-skip-invite').on('click', () => { $(document).off('click.chips'); finishOnboarding(); });
    $('#ob-back-7').on('click', () => { $(document).off('click.chips'); goOb(6); });
  }
}

let otpInt;
function startOtpTimer() {
  clearInterval(otpInt); let sec = 60;
  $('#ob-resend').prop('disabled', true); $('#ob-resend-timer').text(`(${sec}s)`);
  otpInt = setInterval(() => { sec--; $('#ob-resend-timer').text(`(${sec}s)`); if (sec <= 0) { clearInterval(otpInt); $('#ob-resend').prop('disabled', false); $('#ob-resend-timer').text(''); } }, 1000);
}
function checkSlug(slug) {
  if (!slug) { $('#ob-slug-avail').html(''); return; }
  $('#ob-slug-avail').html('<i class="ri-loader-4-line"></i> Checking…').removeClass('ok taken');
  setTimeout(() => {
    const taken = ['thread', 'newsroom', 'media', 'legal', 'writers'];
    const ok = !taken.includes(slug.toLowerCase());
    $('#ob-slug-avail').html(`<i class="ri-${ok ? 'check-circle' : 'close-circle'}-line"></i> ${ok ? 'Available' : 'Already taken'}`).addClass(ok ? 'ok' : 'taken');
  }, 600);
}
function finishOnboarding() {
  const d = STATE.obData;
  if (d.name) STATE.user.name = d.name;
  if (d.email) STATE.user.email = d.email;
  if (d.mode) STATE.user.mode = d.mode;
  if (d.orgName) STATE.user.org = d.orgName;
  if (d.orgSlug) STATE.user.orgSlug = d.orgSlug;
  if (d.aiEnabled !== undefined) STATE.user.aiEnabled = d.aiEnabled;
  if (d.emailNotifs !== undefined) STATE.user.emailNotifs = d.emailNotifs;
  if (d.theme) STATE.user.theme = d.theme;
  const words = STATE.user.name.split(' ');
  STATE.user.initials = (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
  clearInterval(otpInt);
  LS.set('onboarded', true);
  persist();
  STATE.onboarded = true;
  $('#onboarding-overlay').addClass('hidden');
  launchApp();
}

/* ══════════════ APP ══════════════ */
function launchApp() {
  $('#app').removeClass('hidden');
  if (STATE.sidebarCollapsed) $('#sidebar').addClass('collapsed');
  applyTheme(STATE.theme, false);
  updateUserUI();
  updateGreeting();
  renderSidebarDocs();
  renderStats();
  renderDocGrid();
  renderQueueList();
  renderKbGrid();
  renderNotifPanel();
  if (!STATE.panelOpen) $('#context-panel').addClass('panel-hidden');
  bindTopbar();
  bindSidebar();
  bindDashboard();
  bindEditor();
  bindContextPanel();
  bindCmdPalette();
  renderResearchDefault();
  toast('success', `Welcome back, ${STATE.user.name.split(' ')[0]}!`, 'ri-hand-coin-line');
}

// ─── USER UI ───
function updateUserUI() {
  const u = STATE.user;
  const init = u.initials || (u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase());
  $('#user-avatar-btn').text(init);
  const abbr = (u.org || 'My').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  $('#ws-logo').text(abbr);
  $('#ws-name-label').text(u.org || 'My Workspace');
  $('#ws-plan-label').text((u.plan || 'Solo') + ' Plan');
}
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const ic = h < 12 ? 'ri-sun-line' : h < 17 ? 'ri-sun-foggy-line' : 'ri-moon-line';
  $('#dash-greeting').html(`${g}, ${STATE.user.name.split(' ')[0]} <i class="${ic}" style="font-size:18px;color:var(--lemon)"></i>`);
  $('#dash-pending-count').text(STATE.docs.filter(d => d.status === 'review').length);
}

// ─── STATUS CONFIG ───
const SC = {
  draft: { label: 'Draft', cls: 'badge-draft', dot: '#F5C842' },
  review: { label: 'In Review', cls: 'badge-review', dot: '#3B82F6' },
  approved: { label: 'Approved', cls: 'badge-approved', dot: '#10B981' },
  published: { label: 'Published', cls: 'badge-published', dot: '#A855F7' },
  revision: { label: 'Revision', cls: 'badge-revision', dot: '#F472B6' },
  idea: { label: 'Idea', cls: 'badge-idea', dot: '#9C8575' },
};
const AGCS = ['linear-gradient(135deg,var(--peach),var(--blush))', 'linear-gradient(135deg,var(--mint),var(--sky))', 'linear-gradient(135deg,var(--lav),var(--blush))', 'linear-gradient(135deg,var(--lemon),var(--peach))', 'linear-gradient(135deg,var(--sky),var(--lav))'];

function badgeHtml(st) { const c = SC[st] || SC.draft; return `<span class="badge ${c.cls}">${c.label}</span>`; }
function avHtml(init, i, sz = 22) { return `<div class="av-sm" style="width:${sz}px;height:${sz}px;font-size:${sz < 22 ? 9 : 9}px;background:${AGCS[i % AGCS.length]}">${init}</div>`; }

// ─── STATS ───
function renderStats() {
  const docs = STATE.docs;
  const active = docs.filter(d => d.status !== 'published' && d.status !== 'archived').length;
  const review = docs.filter(d => d.status === 'review').length;
  const published = docs.filter(d => d.status === 'published').length;
  const words = docs.reduce((a, d) => a + (d.words || 0), 0);
  const s = [
    { lbl: 'Active Docs', icon: 'ri-file-edit-line', val: active, delta: `↑ ${Math.max(0, active - 2)} this week`, type: 'up' },
    { lbl: 'Pending Review', icon: 'ri-eye-line', val: review, delta: review > 0 ? 'Needs attention' : 'All clear', type: review > 0 ? 'warn' : 'up' },
    { lbl: 'Published', icon: 'ri-send-plane-line', val: published, delta: '↑ 2 this month', type: 'up' },
    { lbl: 'Words Written', icon: 'ri-quill-pen-line', val: (words / 1000).toFixed(0) + 'k', delta: '↑ 12k this week', type: 'up' },
  ];
  $('#stats-grid').html(s.map(x => `<div class="stat-card"><div class="stat-lbl"><i class="ri ${x.icon}"></i>${x.lbl}</div><div class="stat-val">${x.val}</div><div class="stat-delta ${x.type}"><i class="ri ${x.type === 'up' ? 'ri-arrow-up-line' : 'ri-alert-line'}"></i>${x.delta}</div></div>`).join(''));
}

// ─── DOC GRID ───
function renderDocGrid() {
  const docs = STATE.docs.slice(0, 5);
  let h = docs.map(d => `
    <div class="doc-card" data-docid="${d.id}">
      <div class="doc-card-top"><div class="doc-card-title">${d.title}</div>${badgeHtml(d.status)}</div>
      <div class="doc-card-meta"><i class="ri-file-word-line"></i>${(d.words || 0).toLocaleString()} words<i class="ri-time-line"></i>${d.updated}</div>
      <div class="doc-card-foot"><div class="avatar-stack">${avHtml(d.authorInit, 0)}</div><span style="font-size:11px;color:var(--text3)">${d.author.split(' ')[0]}</span></div>
    </div>`).join('');
  h += `<div class="doc-card new-doc-card" id="new-doc-card-btn"><i class="ri-add-circle-line"></i>New Document</div>`;
  $('#doc-grid').html(h);
  $('#doc-grid').on('click', '.doc-card:not(.new-doc-card)', function () { openDoc($(this).data('docid')); });
  $('#doc-grid').on('contextmenu', '.doc-card:not(.new-doc-card)', function (e) { e.preventDefault(); docCtxMenu($(this).data('docid'), e.pageX, e.pageY); });
  $('#new-doc-card-btn').on('click', openNewDocModal);
}

// ─── QUEUE LIST ───
function renderQueueList() {
  const q = STATE.docs.filter(d => d.status === 'review' || d.status === 'revision');
  const bgMap = { review: 'var(--sky-ll)', revision: 'var(--blush-ll)' };
  const clrMap = { review: 'var(--sky)', revision: 'var(--blush)' };
  const icMap = { review: 'ri-eye-line', revision: 'ri-refresh-line' };
  $('#dash-queue-list').html(q.length ? q.map(d => `
    <div class="queue-row" data-docid="${d.id}">
      <div class="queue-icon" style="background:${bgMap[d.status] || 'var(--bg3)'}"><i class="ri ${icMap[d.status] || 'ri-file-line'}" style="color:${clrMap[d.status] || 'var(--text3)'}"></i></div>
      <div class="queue-row-info"><div class="queue-row-title">${d.title}</div><div class="queue-row-meta"><i class="ri-user-3-line"></i>${d.author} &nbsp;·&nbsp; <i class="ri-time-line"></i>${d.updated}</div></div>
      ${badgeHtml(d.status)}
    </div>`).join('') : '<div style="color:var(--text3);font-size:13px;padding:12px;text-align:center;display:flex;align-items:center;gap:6px;justify-content:center"><i class="ri-checkbox-circle-line" style="font-size:18px;color:var(--mint)"></i> Queue is empty — great work!</div>');
  $('#dash-queue-list').on('click', '.queue-row', function () { openDoc($(this).data('docid')); });
  $('#nav-queue-badge').text(q.length || '');
  q.length ? $('#nav-queue-badge').show() : $('#nav-queue-badge').hide();
  $('#dash-pending-count').text(q.length);
}

// ─── KB GRID ───
function renderKbGrid() {
  $('#dash-kb-grid').html(STATE.kb.slice(0, 4).map(k => `
    <div class="kb-item" data-kbid="${k.id}">
      <i class="ri ${k.icon} kb-icon" style="color:var(--${k.color})"></i>
      <div><div class="kb-item-name">${k.title}</div><div class="kb-item-meta"><i class="ri-folder-line"></i>${k.category} · ${k.updated}</div></div>
    </div>`).join(''));
  $('#dash-kb-grid').on('click', '.kb-item', function () { toast('info', `Opening "${STATE.kb.find(k => k.id === $(this).data('kbid')).title}"…`, 'ri-book-2-line'); });
}

// ─── SIDEBAR DOCS ───
function renderSidebarDocs() {
  $('#sidebar-docs-list').html(STATE.docs.map(d => `
    <div class="sidebar-doc-item ${STATE.currentDocId === d.id ? 'active' : ''}" data-docid="${d.id}">
      <div class="sdot" style="background:${(SC[d.status] || SC.draft).dot}"></div>
      <div class="sname">${d.title}</div>
      <button class="smore" data-docid="${d.id}"><i class="ri-more-2-fill"></i></button>
    </div>`).join(''));
  $('#sidebar-docs-list').on('click', '.sidebar-doc-item', function (e) {
    if (!$(e.target).closest('.smore').length) openDoc($(this).data('docid'));
  });
  $('#sidebar-docs-list').on('click', '.smore', function (e) { e.stopPropagation(); docCtxMenu($(this).data('docid'), e.pageX, e.pageY); });
}

// ─── TOPBAR ───
function bindTopbar() {
  $('#logo-home').on('click', () => switchView('dashboard'));
  $('#open-cmd').on('click', openCmd);
  $('#btn-notif').on('click', function (e) { e.stopPropagation(); $('#profile-dropdown').addClass('hidden'); $('#notif-panel').toggleClass('hidden'); });
  $('#user-avatar-btn').on('click', function (e) { e.stopPropagation(); $('#notif-panel').addClass('hidden'); renderProfileDropdown(); $('#profile-dropdown').toggleClass('hidden'); });
  $('#btn-fullscreen').on('click', () => {
    document.fullscreenElement ? document.exitFullscreen().catch(() => { })
      : document.documentElement.requestFullscreen().catch(() => { });
  });
}

function renderProfileDropdown() {
  const u = STATE.user;
  const init = u.initials || (u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase());
  $('#profile-dropdown').html(`
    <div class="profile-card">
      <div class="profile-user">
        <div class="profile-av">${init}</div>
        <div><div class="profile-name">${u.name}</div><div class="profile-email">${u.email}</div><div class="profile-plan">${u.plan || 'Solo'} Plan</div></div>
      </div>
      <div class="dropdown-item" id="pd-settings"><i class="ri-settings-3-line"></i> Settings</div>
      <div class="dropdown-item" id="pd-workspace"><i class="ri-building-2-line"></i> Switch Workspace</div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-item danger" id="pd-signout"><i class="ri-logout-box-line"></i> Sign Out</div>
    </div>`);
  $('#pd-settings').on('click', () => { $('#profile-dropdown').addClass('hidden'); switchView('settings'); });
  $('#pd-workspace').on('click', () => { $('#profile-dropdown').addClass('hidden'); openWorkspaceSwitcher(); });
  $('#pd-signout').on('click', () => { LS.del('onboarded'); location.reload(); });
}

function renderNotifPanel() {
  const notifs = STATE.notifs;
  const uc = notifs.filter(n => n.unread).length;
  uc ? $('#notif-dot').show() : $('#notif-dot').hide();
  $('#notif-panel').html(`
    <div class="notif-header">
      <div class="notif-header-title"><i class="ri-notification-3-line"></i> Notifications${uc ? ` <span style="background:var(--peach);color:#fff;font-size:10px;font-weight:700;padding:1px 7px;border-radius:99px">${uc}</span>` : ''}</div>
      <button class="notif-mark-all" id="notif-mark-all">Mark all read</button>
    </div>
    <div class="notif-list">
      ${notifs.map(n => `
        <div class="notif-item ${n.unread ? 'unread' : ''}" data-nid="${n.id}">
          <div class="notif-icon-wrap" style="background:var(--${n.iconBg})"><i class="ri ${n.icon}" style="color:var(--${n.iconColor})"></i></div>
          <div style="flex:1;min-width:0">
            <div class="notif-title-text">${n.title}</div>
            <div class="notif-body-text">${n.body}</div>
            <div class="notif-time-text"><i class="ri-time-line"></i>${n.time}</div>
          </div>
          ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
        </div>`).join('')}
    </div>
    <div class="notif-footer" id="notif-clear">Clear all</div>`);
  $('#notif-mark-all').on('click', () => { STATE.notifs.forEach(n => n.unread = false); persist(); renderNotifPanel(); });
  $('#notif-clear').on('click', () => { STATE.notifs = []; persist(); renderNotifPanel(); $('#notif-panel').addClass('hidden'); });
  $('#notif-panel .notif-item').on('click', function () {
    const n = STATE.notifs.find(x => x.id === $(this).data('nid'));
    if (n) { n.unread = false; persist(); renderNotifPanel(); }
  });
}

// ─── SIDEBAR ───
function bindSidebar() {
  $('#sidebar-collapse-btn').on('click', () => {
    STATE.sidebarCollapsed = !STATE.sidebarCollapsed;
    $('#sidebar').toggleClass('collapsed', STATE.sidebarCollapsed);
    persist();
  });
  $('#workspace-row').on('click', openWorkspaceSwitcher);
  $(document).on('click', '.nav-item[data-view]', function () { switchView($(this).data('view')); });
}

function openWorkspaceSwitcher() {
  openModal(`
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-building-2-line"></i> Switch Workspace</div>
    <div class="ws-modal-org-list">
      ${STATE.orgs.map(o => `
        <div class="ws-modal-org ${o.slug === STATE.user.orgSlug ? 'active' : ''}" data-slug="${o.slug}" data-name="${o.name}" data-plan="${o.plan}">
          <div class="ws-org-logo" style="background:linear-gradient(135deg,var(--peach),var(--lav))">${o.abbr}</div>
          <div><div class="ws-org-name">${o.name}</div><div class="ws-org-members"><i class="ri-team-line"></i>${o.members} member${o.members !== 1 ? 's' : ''} · ${o.plan}</div></div>
          ${o.slug === STATE.user.orgSlug ? '<i class="ri-check-line" style="color:var(--peach);font-size:18px;margin-left:auto"></i>' : ''}
        </div>`).join('')}
    </div>
    <button class="btn btn-ghost w-full" style="justify-content:center" id="ws-create-new"><i class="ri-add-line"></i> Create New Workspace</button>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Close</button></div>`, 'modal-sm');
  $('.ws-modal-org').on('click', function () {
    STATE.user.org = $(this).data('name');
    STATE.user.orgSlug = $(this).data('slug');
    STATE.user.plan = $(this).data('plan');
    persist(); closeModal(); updateUserUI();
    toast('success', `Switched to ${STATE.user.org}`, 'ri-building-2-line');
  });
  $('#ws-create-new').on('click', () => { closeModal(); openNewOrgModal(); });
}
function openNewOrgModal() {
  openModal(`
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-add-circle-line"></i> New Workspace</div>
    <div class="form-group"><label class="form-label">Name *</label><input class="form-input" id="no-name" placeholder="My Newsroom"></div>
    <div class="form-group"><label class="form-label">URL Slug</label><input class="form-input" id="no-slug" placeholder="my-newsroom">
      <div class="slug-preview">thread.app/<span class="slug-val" id="no-slug-val">my-newsroom</span></div>
    </div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="no-create"><i class="ri-check-line"></i> Create</button></div>`);
  $('#no-name').on('input', function () { const s = $(this).val().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); $('#no-slug').val(s); $('#no-slug-val').text(s || 'my-org'); });
  $('#no-create').on('click', function () {
    const name = $('#no-name').val().trim(); if (!name) { $('#no-name').addClass('error'); return; }
    const slug = $('#no-slug').val() || name.toLowerCase().replace(/\s+/g, '-');
    const abbr = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    STATE.orgs.push({ id: 'o' + Date.now(), name, slug, abbr, members: 1, plan: 'Solo' });
    STATE.user.org = name; STATE.user.orgSlug = slug; STATE.user.plan = 'Solo';
    persist(); closeModal(); updateUserUI();
    toast('success', `"${name}" created!`, 'ri-building-2-line');
  });
}

// ─── VIEW SWITCHING ───
function switchView(view) {
  STATE.currentView = view;
  const views = ['dashboard', 'editor', 'queue', 'kb', 'settings'];
  views.forEach(v => $(`#view-${v}`).toggleClass('hidden', v !== view));
  $('.nav-item[data-view]').removeClass('active');
  $(`.nav-item[data-view="${view}"]`).addClass('active');
  if (view === 'kb') renderKbView();
  if (view === 'queue') renderQueueView();
  if (view === 'settings') renderSettingsBody();
  if (view === 'editor' && !STATE.currentDocId) switchView('dashboard');
}

// ─── DASHBOARD BINDINGS ───
function bindDashboard() {
  $('#btn-new-doc').on('click', openNewDocModal);
  $('#btn-goto-queue').on('click', () => switchView('queue'));
  $('#btn-new-folder').on('click', () => toast('info', 'Folders coming soon!', 'ri-folder-add-line'));
  $('#btn-view-all-docs').on('click', openAllDocsModal);
  $('#btn-new-article').on('click', openNewArticleModal);
  $('#btn-search-kb').on('click', () => toast('info', 'KB Search coming soon!', 'ri-search-line'));
}

function openAllDocsModal() {
  openModal(`
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-files-line"></i> All Documents</div>
    <div style="max-height:420px;overflow-y:auto;display:flex;flex-direction:column;gap:7px;margin-top:12px">
      ${STATE.docs.map(d => `
        <div class="all-doc-row" data-docid="${d.id}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:1px solid var(--border);cursor:pointer;transition:background .14s">
          <div style="width:8px;height:8px;border-radius:50%;background:${(SC[d.status] || SC.draft).dot};flex-shrink:0"></div>
          <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.title}</div><div style="font-size:11px;color:var(--text3)"><i class="ri-user-3-line"></i>${d.author} · <i class="ri-time-line"></i>${d.updated}</div></div>
          ${badgeHtml(d.status)}
        </div>`).join('')}
    </div>`, 'modal-lg');
  $(document).on('click.alldocs', '.all-doc-row', function () { closeModal(); $(document).off('click.alldocs'); openDoc($(this).data('docid')); });
}

function openNewArticleModal() {
  openModal(`
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-add-circle-line"></i> New KB Article</div>
    <div class="form-group"><label class="form-label">Article Title *</label><input class="form-input" id="kb-title" placeholder="AP Style Guide Reference"></div>
    <div class="form-group"><label class="form-label">Category</label>
      <select class="form-select" id="kb-cat"><option>Style</option><option>Policy</option><option>Templates</option><option>Legal</option><option>Brand</option><option>Data</option></select>
    </div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="kb-create-btn"><i class="ri-check-line"></i> Create</button></div>`);
  $('#kb-create-btn').on('click', function () {
    const t = $('#kb-title').val().trim(); if (!t) { $('#kb-title').addClass('error'); return; }
    STATE.kb.push({ id: 'kb' + Date.now(), title: t, icon: 'ri-file-text-line', color: 'peach', updated: 'Just now', category: $('#kb-cat').val() });
    persist(); closeModal(); renderKbView(); renderKbGrid(); toast('success', 'Article created!', 'ri-book-2-line');
  });
}

// ─── NEW DOC MODAL ───
const TEMPLATES = {
  blank: '<p></p>',
  news: '<h2>Headline</h2><p><strong>City, Date</strong> — [LEDE: The most important information in one sentence.]</p><h3>Background</h3><p>[Context and supporting details here.]</p><h3>Quotes</h3><p>"[Direct quote from source]," said [Name], [Title].</p><h3>Analysis</h3><p>[Deeper context and implications.]</p>',
  legal: '<h2>Matter: [Matter Number]</h2><h3>Parties</h3><p><strong>Plaintiff:</strong> [Name]<br><strong>Defendant:</strong> [Name]</p><h3>Statement of Facts</h3><p>1. [First fact]</p><p>2. [Second fact]</p><h3>Legal Arguments</h3><p>[Primary argument]</p><h3>Relief Sought</h3><p>[Requested relief]</p>',
  blog: '<h2>Title</h2><p>[Hook — why should the reader care?]</p><h3>Introduction</h3><p>[Set the scene and context.]</p><h3>Main Points</h3><p>[First point]</p><p>[Second point]</p><h3>Conclusion</h3><p>[Summary and call to action]</p>',
  memo: `<p><strong>TO:</strong> [Recipient]<br><strong>FROM:</strong> [Your Name]<br><strong>DATE:</strong> ${new Date().toLocaleDateString()}<br><strong>RE:</strong> [Subject]</p><hr><h3>Summary</h3><p>[Brief summary]</p><h3>Background</h3><p>[Context]</p><h3>Recommendation</h3><p>[Action requested]</p>`,
  interview: '<p><strong>Subject:</strong> [Name, Title, Organisation]<br><strong>Date:</strong> [Date]<br><strong>Location:</strong> [Location/Remote]</p><hr><h3>Q: [First question]</h3><p><strong>A:</strong> [Answer]</p><h3>Q: [Second question]</h3><p><strong>A:</strong> [Answer]</p>',
};
function openNewDocModal() {
  openModal(`
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-add-circle-line" style="color:var(--peach)"></i> New Document</div>
    <div class="modal-sub">What are you working on today?</div>
    <div class="form-group"><label class="form-label">Document Title *</label><input class="form-input" id="nd-title" placeholder="Untitled document…"></div>
    <div class="form-group"><label class="form-label">Template</label>
      <div class="option-grid cols-3">
        <div class="option-card selected" data-tpl="blank"><i class="ri-file-line"></i><div class="option-card-label">Blank</div></div>
        <div class="option-card" data-tpl="news"><i class="ri-newspaper-line"></i><div class="option-card-label">News Story</div></div>
        <div class="option-card" data-tpl="legal"><i class="ri-scales-line"></i><div class="option-card-label">Legal Brief</div></div>
        <div class="option-card" data-tpl="blog"><i class="ri-edit-2-line"></i><div class="option-card-label">Blog Post</div></div>
        <div class="option-card" data-tpl="memo"><i class="ri-file-list-2-line"></i><div class="option-card-label">Memo</div></div>
        <div class="option-card" data-tpl="interview"><i class="ri-mic-line"></i><div class="option-card-label">Interview</div></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="nd-create"><i class="ri-check-line"></i> Create</button></div>`);
  let selTpl = 'blank';
  $('.option-card[data-tpl]').on('click', function () { $('.option-card[data-tpl]').removeClass('selected'); $(this).addClass('selected'); selTpl = $(this).data('tpl'); });
  $('#nd-create').on('click', () => {
    const title = $('#nd-title').val().trim() || 'Untitled Document';
    createDoc(title, TEMPLATES[selTpl] || TEMPLATES.blank);
    closeModal();
  });
  $('#nd-title').on('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); $('#nd-create').trigger('click'); } });
}
function createDoc(title, content = '<p></p>') {
  const id = 'd' + Date.now();
  const doc = {
    id, title, status: 'draft', words: countWords(content), author: STATE.user.name,
    authorInit: STATE.user.initials || '??', updated: 'Just now', mode: STATE.user.mode || 'writer',
    content, deadline: '', assignee: STATE.user.name, comments: []
  };
  STATE.docs.unshift(doc); persist();
  renderSidebarDocs(); renderDocGrid(); renderStats();
  openDoc(id);
  toast('success', `"${title}" created!`, 'ri-file-add-line');
}

// ─── DOC CONTEXT MENU ───
function docCtxMenu(docId, x, y) {
  showCtxMenu([
    { icon: 'ri-eye-line', label: 'Open', action: () => openDoc(docId) },
    { icon: 'ri-pencil-line', label: 'Rename', action: () => renameDocModal(docId) },
    { icon: 'ri-file-copy-line', label: 'Duplicate', action: () => duplicateDoc(docId) },
    '-',
    { icon: 'ri-send-plane-line', label: 'Submit for Review', action: () => { setDocStatus(docId, 'review'); toast('success', 'Submitted for review!', 'ri-send-plane-line'); } },
    { icon: 'ri-checkbox-circle-line', label: 'Mark Approved', action: () => { setDocStatus(docId, 'approved'); toast('success', 'Marked as approved!', 'ri-checkbox-circle-line'); } },
    '-',
    { icon: 'ri-delete-bin-line', label: 'Delete', danger: true, action: () => deleteDocConfirm(docId) },
  ], x, y);
}
function renameDocModal(docId) {
  const doc = STATE.docs.find(d => d.id === docId); if (!doc) return;
  openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-pencil-line"></i> Rename Document</div>
    <div class="form-group"><input class="form-input" id="rename-val" value="${doc.title}"></div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="rename-save"><i class="ri-check-line"></i> Save</button></div>`, 'modal-sm');
  $('#rename-save').on('click', () => {
    const v = $('#rename-val').val().trim(); if (!v) return;
    doc.title = v; doc.updated = 'Just now'; persist(); closeModal();
    renderDocGrid(); renderSidebarDocs();
    if (STATE.currentDocId === docId) $('#doc-title').val(v);
    toast('success', 'Renamed!', 'ri-pencil-line');
  });
}
function duplicateDoc(docId) {
  const doc = STATE.docs.find(d => d.id === docId); if (!doc) return;
  const dup = { ...JSON.parse(JSON.stringify(doc)), id: 'd' + Date.now(), title: doc.title + ' (Copy)', updated: 'Just now', status: 'draft' };
  STATE.docs.splice(STATE.docs.indexOf(doc) + 1, 0, dup);
  persist(); renderDocGrid(); renderSidebarDocs(); renderStats();
  toast('success', 'Duplicated!', 'ri-file-copy-line');
}
function deleteDocConfirm(docId) {
  openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title" style="color:var(--blush)"><i class="ri-delete-bin-line"></i> Delete Document</div>
    <div class="modal-sub">This will permanently delete this document. This cannot be undone.</div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-danger" id="confirm-del"><i class="ri-delete-bin-line"></i> Delete</button></div>`, 'modal-sm');
  $('#confirm-del').on('click', () => {
    STATE.docs = STATE.docs.filter(d => d.id !== docId); persist(); closeModal();
    if (STATE.currentDocId === docId) { STATE.currentDocId = null; switchView('dashboard'); }
    renderDocGrid(); renderSidebarDocs(); renderStats(); renderQueueList();
    toast('success', 'Document deleted.', 'ri-delete-bin-line');
  });
}
function setDocStatus(docId, status) {
  const doc = STATE.docs.find(d => d.id === docId);
  if (doc) { doc.status = status; doc.updated = 'Just now'; persist(); }
  renderDocGrid(); renderSidebarDocs(); renderQueueList(); renderStats();
  if (STATE.currentDocId === docId) { renderDocBadge(doc); renderWorkflowPane(doc); }
}

// ─── EDITOR ───
function openDoc(docId) {
  const doc = STATE.docs.find(d => d.id === docId); if (!doc) return;
  STATE.currentDocId = docId;
  switchView('editor');
  $('#doc-title').val(doc.title).css('height', 'auto').css('height', $('#doc-title')[0].scrollHeight + 'px');
  $('#doc-content').html(doc.content || '<p></p>');
  $('#meta-author-name').text(doc.author);
  $('#meta-date-val').text(doc.updated === 'Just now' ? 'Today' : doc.updated);
  $('#wf-deadline').val(doc.deadline || '');
  $('#wf-assignee').text(doc.assignee || doc.author);
  $('#wf-assignee-av').text((doc.assignee || doc.author).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase());
  const mi = { writer: 'Writer Mode', journalism: 'Journalism Mode', legal: 'Legal Mode' };
  const ii = { writer: 'ri-edit-2-line', journalism: 'ri-newspaper-line', legal: 'ri-scales-line' };
  $('#meta-mode').html(`<i class="ri ${ii[doc.mode] || 'ri-edit-2-line'}"></i> ${mi[doc.mode] || 'Writer Mode'}`);
  renderDocBadge(doc);
  renderWorkflowPane(doc);
  renderCommentsPane(doc);
  updateWc();
  renderSidebarDocs();
  // colab avatars
  $('#colab-avatars').html([{ init: 'SP', i: 1 }, { init: 'JL', i: 2 }].map(a => `<div class="av-sm" style="width:24px;height:24px;font-size:9px;background:${AGCS[a.i % AGCS.length]};margin-right:-6px;border:1.5px solid var(--card)">${a.init}</div>`).join(''));
}
function renderDocBadge(doc) {
  const c = SC[doc.status] || SC.draft;
  $('#doc-badge-container').html(`<span class="badge ${c.cls}">${c.label}</span>`);
}
function renderWorkflowPane(doc) {
  const states = [
    { key: 'idea', label: 'Idea', desc: 'Pitch or early-stage note', dot: '#9C8575' },
    { key: 'draft', label: 'Draft', desc: 'Active writing in progress', dot: '#F5C842' },
    { key: 'review', label: 'In Review', desc: 'Submitted for editorial review', dot: '#3B82F6' },
    { key: 'revision', label: 'Revision Requested', desc: 'Changes requested by editor', dot: '#F472B6' },
    { key: 'approved', label: 'Approved', desc: 'Ready to publish', dot: '#10B981' },
    { key: 'published', label: 'Published', desc: 'Live', dot: '#A855F7' },
  ];
  $('#workflow-states-list').html(states.map(st => `
    <div class="wf-state-item ${doc.status === st.key ? 'current' : ''}" data-wfstate="${st.key}">
      <div class="wf-dot" style="background:${st.dot}"></div>
      <div class="wf-info"><div class="wf-state-name">${st.label}</div><div class="wf-state-desc">${st.desc}</div></div>
      ${doc.status === st.key ? '<i class="ri-record-circle-line wf-cur-icon"></i>' : ''}
    </div>`).join(''));
  $('#workflow-states-list').on('click', '.wf-state-item', function () {
    setDocStatus(STATE.currentDocId, $(this).data('wfstate'));
    toast('success', `Status: ${$(this).find('.wf-state-name').text()}`, 'ri-git-branch-line');
  });
}
function renderCommentsPane(doc) {
  const cs = doc.comments || [];
  $('#comments-list').html(cs.length ? cs.map(c => `
    <div class="comment-card ${c.resolved ? 'resolved' : ''}" data-cid="${c.id}">
      <div class="comment-head">
        <div class="comment-av" style="background:${AGCS[['peach', 'mint', 'lav', 'blush', 'sky'].indexOf(c.color || 'peach') % AGCS.length]}">${c.init}</div>
        <div class="comment-author">${c.author}</div>
        <div class="comment-time"><i class="ri-time-line"></i>${c.time}</div>
      </div>
      <div class="comment-text">${c.text}</div>
      <div class="comment-footer">
        ${!c.resolved ? `<button class="comment-action resolve" data-cid="${c.id}"><i class="ri-check-line"></i> Resolve</button>` : '<span style="font-size:11px;color:var(--text3)"><i class="ri-check-double-line"></i> Resolved</span>'}
        <button class="comment-action"><i class="ri-reply-line"></i> Reply</button>
      </div>
    </div>`).join('') : '<div style="color:var(--text3);font-size:12px;text-align:center;padding:20px"><i class="ri-chat-3-line" style="font-size:28px;display:block;margin-bottom:8px;opacity:.4"></i>No comments yet</div>');
  $('#comments-list').on('click', '.comment-action.resolve', function () {
    const cid = $(this).data('cid');
    const doc = STATE.docs.find(d => d.id === STATE.currentDocId);
    const c = (doc.comments || []).find(x => x.id === cid);
    if (c) { c.resolved = true; persist(); renderCommentsPane(doc); toast('success', 'Resolved!', 'ri-check-line'); }
  });
}

function bindEditor() {
  $('#doc-title').on('input', function () {
    this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';
    const doc = STATE.docs.find(d => d.id === STATE.currentDocId);
    if (doc) { doc.title = $(this).val() || 'Untitled'; doc.updated = 'Just now'; triggerSave(); }
    renderSidebarDocs();
  });
  $('#doc-content').on('input', function () {
    updateWc();
    const doc = STATE.docs.find(d => d.id === STATE.currentDocId);
    if (doc) { doc.content = $(this).html(); doc.words = countWords($(this).text()); doc.updated = 'Just now'; }
    triggerSave();
  });
  // Toolbar
  $('#tb-bold').on('click', () => fmt('bold'));
  $('#tb-italic').on('click', () => fmt('italic'));
  $('#tb-underline').on('click', () => fmt('underline'));
  $('#tb-strike').on('click', () => fmt('strikeThrough'));
  $('#tb-ul').on('click', () => fmt('insertUnorderedList'));
  $('#tb-ol').on('click', () => fmt('insertOrderedList'));
  $('#tb-quote').on('click', () => { document.execCommand('formatBlock', false, 'blockquote'); });
  $('#tb-code').on('click', () => {
    const sel = window.getSelection();
    sel && sel.toString()
      ? document.execCommand('insertHTML', false, `<code>${sel}</code>`)
      : document.execCommand('insertHTML', false, '<code>code</code>');
  });
  $('#tb-hr').on('click', () => document.execCommand('insertHTML', false, '<hr>'));
  $('#tb-link').on('click', () => { const u = prompt('Enter URL:'); if (u) document.execCommand('createLink', false, u.startsWith('http') ? u : 'https://' + u); });
  $('#tb-align-l').on('click', () => fmt('justifyLeft'));
  $('#tb-align-c').on('click', () => fmt('justifyCenter'));
  $('#tb-align-r').on('click', () => fmt('justifyRight'));
  $('#tb-undo').on('click', () => document.execCommand('undo'));
  $('#tb-redo').on('click', () => document.execCommand('redo'));
  $('#tb-ai').on('click', () => { openPanelTab('ai'); if (!STATE.panelOpen) togglePanel(); });
  $('#heading-select').on('change', function () { document.execCommand('formatBlock', false, $(this).val()); $('#doc-content').trigger('focus'); });
  $('#doc-content').on('keyup mouseup', updateTbState);
  $('#btn-back-dash').on('click', () => switchView('dashboard'));
  $('#btn-submit-review,#wf-submit-btn').on('click', () => {
    if (!STATE.currentDocId) return;
    setDocStatus(STATE.currentDocId, 'review');
    const n = { id: 'n' + Date.now(), icon: 'ri-send-plane-line', iconBg: 'sky-ll', iconColor: 'sky', title: 'Submitted for review', body: `"${$('#doc-title').val()}" submitted for review.`, time: 'Just now', unread: true };
    STATE.notifs.unshift(n); persist(); renderNotifPanel();
    toast('success', 'Submitted for review!', 'ri-send-plane-line');
  });
  $('#btn-toggle-panel').on('click', togglePanel);
  $('#btn-focus-mode').on('click', () => {
    STATE.focusMode = !STATE.focusMode;
    $('#editor-canvas').toggleClass('focus-mode', STATE.focusMode);
    $('#btn-focus-mode i').attr('class', STATE.focusMode ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line');
    if (STATE.focusMode && STATE.panelOpen) togglePanel();
    toast('info', STATE.focusMode ? 'Focus mode on' : 'Focus mode off', STATE.focusMode ? 'ri-fullscreen-line' : 'ri-fullscreen-exit-line');
  });
  $('#btn-export-doc').on('click', () => {
    const doc = STATE.docs.find(d => d.id === STATE.currentDocId); if (!doc) return;
    const blob = new Blob([`# ${doc.title}\n\n${$('#doc-content').text()}`], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = doc.title + '.txt'; a.click();
    toast('success', 'Exported!', 'ri-download-line');
  });
  $('#wf-delete-btn').on('click', () => { if (STATE.currentDocId) deleteDocConfirm(STATE.currentDocId); });
  $('#wf-version-btn').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-history-line"></i> Version History</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
        ${['Current Version — Just now', 'v3 — 2 hours ago', 'v2 — Yesterday 4:30 PM', 'v1 — 2 days ago'].map((v, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;border:1px solid ${i === 0 ? 'var(--peach)' : 'var(--border)'};background:${i === 0 ? 'var(--peach-ll)' : 'var(--card)'}">
            <i class="ri-${i === 0 ? 'record-circle-fill' : 'circle-line'}" style="color:var(--peach)"></i>
            <span style="flex:1;font-size:13px;font-weight:${i === 0 ? '600' : '400'}">${v}</span>
            ${i > 0 ? `<button class="btn btn-sm btn-ghost" onclick="toast('info','Version restored!','ri-history-line');closeModal()"><i class="ri-arrow-go-back-line"></i> Restore</button>` : ''}
          </div>`).join('')}
      </div>`);
  });
  $('#wf-reassign-btn').on('click', () => {
    const members = ['Alex Rivera', 'Sam Park', 'Jordan Lee', 'Casey Morgan'];
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-user-add-line"></i> Reassign Document</div>
      <div class="form-group"><label class="form-label">Assign to</label>
        <select class="form-select" id="reassign-sel">
          ${members.map(m => `<option ${m === (STATE.docs.find(d => d.id === STATE.currentDocId) || {}).assignee ? 'selected' : ''}>${m}</option>`).join('')}
        </select>
      </div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="do-reassign"><i class="ri-check-line"></i> Reassign</button></div>`, 'modal-sm');
    $('#do-reassign').on('click', () => {
      const n = $('#reassign-sel').val();
      const doc = STATE.docs.find(d => d.id === STATE.currentDocId);
      if (doc) { doc.assignee = n; persist(); $('#wf-assignee').text(n); $('#wf-assignee-av').text(n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()); closeModal(); toast('success', `Assigned to ${n}!`, 'ri-user-check-line'); }
    });
  });
  $('#wf-deadline').on('change', function () {
    const doc = STATE.docs.find(d => d.id === STATE.currentDocId);
    if (doc) { doc.deadline = $(this).val(); persist(); toast('info', 'Deadline saved!', 'ri-calendar-check-line'); }
  });
  $('#add-comment-btn').on('click', postComment);
  $('#new-comment-input').on('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') postComment(); });
}
function postComment() {
  const text = $('#new-comment-input').val().trim(); if (!text) return;
  const doc = STATE.docs.find(d => d.id === STATE.currentDocId); if (!doc) return;
  const init = STATE.user.initials || STATE.user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  doc.comments = (doc.comments || []).concat({ id: 'c' + Date.now(), author: STATE.user.name, init, color: 'peach', time: 'Just now', text, resolved: false });
  persist(); $('#new-comment-input').val(''); renderCommentsPane(doc);
  toast('success', 'Comment posted!', 'ri-chat-3-line');
}
function fmt(cmd) { document.execCommand(cmd); $('#doc-content').trigger('focus'); updateTbState(); }
function updateTbState() {
  $('#tb-bold').toggleClass('active', document.queryCommandState('bold'));
  $('#tb-italic').toggleClass('active', document.queryCommandState('italic'));
  $('#tb-underline').toggleClass('active', document.queryCommandState('underline'));
  $('#tb-strike').toggleClass('active', document.queryCommandState('strikeThrough'));
}

// ─── WORD COUNT + AUTOSAVE ───
function countWords(text) { return text.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length; }
function updateWc() {
  const text = $('#doc-content').text();
  const w = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(x => x.length > 0).length;
  const m = Math.max(1, Math.ceil(w / 200));
  $('#wc-label,#status-wc').text(`${w.toLocaleString()} words`);
  $('#rt-label,#status-rt').text(`${m} min read`);
}
let saveTimer;
function triggerSave() {
  $('.status-dot').addClass('saving'); $('#editor-status-label,#status-label-bar').text('Saving…');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    persist();
    $('.status-dot').removeClass('saving'); $('#editor-status-label,#status-label-bar').text('Saved');
  }, 1300);
}

// ─── CONTEXT PANEL ───
function bindContextPanel() {
  $('#panel-tabs').on('click', '.panel-tab', function () { openPanelTab($(this).data('pane')); });
}
function openPanelTab(pane) {
  STATE.panelTab = pane;
  $('.panel-tab').removeClass('active'); $(`.panel-tab[data-pane="${pane}"]`).addClass('active');
  $('.panel-pane').removeClass('active'); $(`#pane-${pane}`).addClass('active');
  if (!STATE.panelOpen) togglePanel();
}
function togglePanel() {
  STATE.panelOpen = !STATE.panelOpen;
  $('#context-panel').toggleClass('panel-hidden', !STATE.panelOpen);
  persist();
}

// ─── AI ───
const AI_R = {
  continue: "The revenue models emerging across this new ecosystem are experimental by design: membership fees, foundation grants, events revenue, and an increasingly common hybrid approach. None replicate the scale of legacy advertising — but many are proving sustainable, and a handful are genuinely thriving.",
  improve: "✨ Suggested rewrite:\n\nConsider opening with the most striking statistic before adding context — the impact lands harder when readers grasp the scale before the cause. Also, consider varying sentence length in paragraph three to improve rhythm.",
  shorten: "📝 Condensed version:\n\nLocal journalism is disappearing. Since 2005, over 2,500 newspapers have closed. But in the rubble, independent journalists are building nonprofit newsrooms — scrappy, deeply local, and showing early signs of sustainability.",
  headline: "📰 Five headline options:\n1. After the Newsroom: Who Covers Your Neighbourhood Now?\n2. 2,500 Papers Gone — What Comes Next?\n3. The Journalists Rebuilding Local News From Scratch\n4. News Deserts Are Spreading. So Is the Solution.\n5. The Death — and Quiet Rebirth — of Local Journalism",
  summarize: "📋 Three-sentence summary:\n\nLocal journalism has declined sharply since 2005, with thousands of newspapers closing and leaving communities without accountability reporting. Private equity and hedge funds have accelerated this by acquiring and gutting regional outlets. A new generation of journalists is responding with nonprofit, reader-supported models that are showing early promise.",
  research: "🔍 Related sources in Knowledge Base:\n• AP Style Guide: Attribution and quote format\n• Source Library: Reuters Institute Digital News Report 2024\n• Related: 'Media Consolidation Briefing 2025'\n\nSuggested searches: 'nonprofit newsroom models 2025', 'local journalism revenue'",
};
const AI_CHAT = [
  "Based on your draft structure, I'd suggest adding a data visualisation callout in section 2 — the closure figures are compelling and readers respond well to numbers presented visually.",
  "That's a solid direction. Your transition between sections 1 and 2 could be smoother. Want me to draft a bridging sentence?",
  "Looking at the document context, consider strengthening your quote attribution by including the full title and institutional affiliation.",
  "Your paragraphs in section 3 are quite dense. Consider breaking the fourth paragraph in two for better readability on mobile.",
  "Strong lede. The word 'unprecedented' in paragraph 1 is often overused — AP Style recommends a specific figure instead.",
];
function runAI(cmd) {
  openPanelTab('ai');
  const $c = $('#ai-conversation');
  appendMsg('user', `/ai ${cmd}`, $c);
  const $t = $('<div class="ai-typing"><div class="ai-td"></div><div class="ai-td"></div><div class="ai-td"></div></div>');
  $c.append($t); $c.scrollTop($c[0].scrollHeight);
  setTimeout(() => { $t.remove(); appendMsg('bot', AI_R[cmd] || 'Here are my suggestions…', $c); }, 1100);
}
function sendAIMsg() {
  const msg = $('#ai-chat-input').val().trim(); if (!msg) return;
  const $c = $('#ai-conversation');
  appendMsg('user', msg, $c); $('#ai-chat-input').val('');
  const $t = $('<div class="ai-typing"><div class="ai-td"></div><div class="ai-td"></div><div class="ai-td"></div></div>');
  $c.append($t); $c.scrollTop($c[0].scrollHeight);
  setTimeout(() => { $t.remove(); appendMsg('bot', AI_CHAT[Math.floor(Math.random() * AI_CHAT.length)], $c); }, 900);
}
function appendMsg(type, text, $c) {
  $c.append(`<div class="ai-msg ${type}">${$('<div>').text(text).html().replace(/\n/g, '<br>')}</div>`);
  $c.scrollTop($c[0].scrollHeight);
}
$(document).on('click', '.ai-quick-btn[data-cmd]', function () { runAI($(this).data('cmd')); });
$(document).on('click', '#ai-send-btn', sendAIMsg);
$(document).on('keydown', '#ai-chat-input', function (e) { if (e.key === 'Enter') sendAIMsg(); });

// ─── RESEARCH ───
function renderResearchDefault() {
  renderSources([
    { domain: 'Reuters Institute', icon: 'ri-news-line', title: 'Digital News Report 2025: Local Journalism', excerpt: 'Print circulation has declined 62% over the past decade. Digital transition has proven insufficient to offset revenue losses.' },
    { domain: 'Columbia Journalism Review', icon: 'ri-news-line', title: 'News Deserts: Who Covers Your Town Now?', excerpt: 'Over 1,800 US communities now have no local newspaper, with similar trends emerging in smaller cities globally.' },
  ]);
  $('#research-go-btn').on('click', doResearch);
  $('#research-input').on('keydown', function (e) { if (e.key === 'Enter') doResearch(); });
}
function doResearch() {
  const q = $('#research-input').val().trim(); if (!q) return;
  $('#research-results').html('<div style="color:var(--text3);font-size:12px;padding:16px;text-align:center"><i class="ri-loader-4-line" style="font-size:22px;display:block;margin-bottom:6px;animation:spin 1s linear infinite"></i>Searching…</div>');
  $('<style>@keyframes spin{to{transform:rotate(360deg)}}</style>').appendTo('head');
  setTimeout(() => renderSources([
    { domain: 'Wire Services', icon: 'ri-news-line', title: `${q}: Latest Coverage`, excerpt: 'Reporting from multiple correspondents with primary source data and expert commentary across regions.' },
    { domain: 'Guardian Editorial', icon: 'ri-news-line', title: `Analysis: ${q} and implications`, excerpt: 'In-depth analysis examining the broader policy, social, and economic implications for the coming year.' },
    { domain: 'Academic Research', icon: 'ri-microscope-line', title: `Peer Review: ${q} — A Study`, excerpt: 'Peer-reviewed findings from a 3-year longitudinal study covering 14 countries and 800+ respondents.' },
  ]), 900);
}
function renderSources(sources) {
  $('#research-results').html(`<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);margin-bottom:8px"><i class="ri-search-line"></i> Sources</div>
    ${sources.map(s => `<div class="source-card">
      <div class="source-domain"><i class="ri ${s.icon}"></i>${s.domain}</div>
      <div class="source-title">${s.title}</div>
      <div class="source-excerpt">${s.excerpt}</div>
      <div class="source-actions">
        <button class="src-btn" onclick="citeSrc('${s.title.replace(/'/g, '&#39;')}')"><i class="ri-double-quotes-l"></i>Cite</button>
        <button class="src-btn" onclick="pinSrc('${s.title.replace(/'/g, '&#39;')}')"><i class="ri-pushpin-line"></i>Pin</button>
        <button class="src-btn"><i class="ri-external-link-line"></i>Open</button>
      </div>
    </div>`).join('')}`);
}
function citeSrc(t) { navigator.clipboard.writeText(`${t} (${new Date().getFullYear()}).`).catch(() => { }); toast('success', 'Citation copied!', 'ri-double-quotes-l'); }
function pinSrc(t) { toast('info', `"${t.slice(0, 30)}…" pinned`, 'ri-pushpin-line'); }

// ─── VIEWS: QUEUE, KB, SETTINGS ───
function renderQueueView() {
  const q = STATE.docs.filter(d => d.status === 'review' || d.status === 'revision');
  $('#queue-body').html(q.length ? q.map(d => `
    <div class="queue-card" data-docid="${d.id}">
      <div class="queue-card-top"><div class="queue-card-title">${d.title}</div>${badgeHtml(d.status)}</div>
      <div class="queue-card-meta"><i class="ri-user-3-line"></i>${d.author}<i class="ri-time-line"></i>${d.updated}${d.deadline ? `<i class="ri-calendar-line"></i>${d.deadline}` : ''}</div>
      <div class="queue-card-actions">
        <button class="btn btn-sm btn-primary" data-qa="open" data-docid="${d.id}"><i class="ri-eye-line"></i> Review</button>
        ${d.status === 'review'
      ? `<button class="btn btn-sm btn-success" data-qa="approve" data-docid="${d.id}"><i class="ri-checkbox-circle-line"></i> Approve</button>
            <button class="btn btn-sm btn-danger" data-qa="revise" data-docid="${d.id}"><i class="ri-close-circle-line"></i> Request Revision</button>`
      : `<button class="btn btn-sm btn-ghost" data-qa="open" data-docid="${d.id}"><i class="ri-pencil-line"></i> Open</button>`}
      </div>
    </div>`).join('') : '<div style="text-align:center;color:var(--text3);padding:40px 20px"><i class="ri-checkbox-circle-line" style="font-size:36px;display:block;margin-bottom:10px;color:var(--mint)"></i><div style="font-size:15px;font-weight:600;margin-bottom:4px">Queue is empty</div><div style="font-size:13px">All documents are up to date.</div></div>');
  $('#queue-body').on('click', '[data-qa="open"]', function () { openDoc($(this).data('docid')); });
  $('#queue-body').on('click', '[data-qa="approve"]', function () { setDocStatus($(this).data('docid'), 'approved'); renderQueueView(); toast('success', 'Approved!', 'ri-checkbox-circle-line'); });
  $('#queue-body').on('click', '[data-qa="revise"]', function () { setDocStatus($(this).data('docid'), 'revision'); renderQueueView(); toast('warn', 'Revision requested.', 'ri-refresh-line'); });
}
function renderKbView() {
  $('#kb-article-list').html(STATE.kb.map(k => `
    <div class="kb-article-row" data-kbid="${k.id}">
      <div class="kb-article-icon" style="background:color-mix(in srgb,var(--${k.color}) 12%,transparent)"><i class="ri ${k.icon}" style="color:var(--${k.color})"></i></div>
      <div style="flex:1;min-width:0"><div class="kb-article-title">${k.title}</div><div class="kb-article-meta"><i class="ri-folder-line"></i>${k.category}<span style="margin:0 6px">·</span><i class="ri-time-line"></i>Updated ${k.updated}</div></div>
      <button class="btn btn-sm btn-ghost" style="flex-shrink:0" onclick="toast('info','Opening…','ri-book-2-line')"><i class="ri-pencil-line"></i> Edit</button>
    </div>`).join(''));
}
function renderSettingsBody() {
  const u = STATE.user;
  const init = u.initials || (u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase());
  $('#settings-body').html(`
    <div class="settings-section">
      <div class="settings-section-title"><i class="ri-user-3-line"></i> Account</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Display Name</div><div class="settings-row-desc">${u.name}</div></div>
        <button class="btn btn-sm btn-ghost" id="st-edit-name"><i class="ri-pencil-line"></i> Edit</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Email Address</div><div class="settings-row-desc">${u.email}</div></div>
        <button class="btn btn-sm btn-ghost" id="st-edit-email"><i class="ri-pencil-line"></i> Edit</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Password</div><div class="settings-row-desc">Last changed: never</div></div>
        <button class="btn btn-sm btn-ghost"><i class="ri-lock-line"></i> Change</button>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title"><i class="ri-building-2-line"></i> Workspace</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Workspace Name</div><div class="settings-row-desc">${u.org}</div></div>
        <button class="btn btn-sm btn-ghost" id="st-edit-org"><i class="ri-pencil-line"></i> Edit</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">URL</div><div class="settings-row-desc">thread.app/${u.orgSlug || 'your-workspace'}</div></div>
        <button class="btn btn-sm btn-ghost"><i class="ri-pencil-line"></i> Edit</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Plan</div><div class="settings-row-desc" style="color:var(--peach);font-weight:600">${u.plan} Plan</div></div>
        <button class="btn btn-sm btn-primary"><i class="ri-vip-crown-line"></i> Upgrade</button>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title"><i class="ri-palette-line"></i> Preferences</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Theme</div><div class="settings-row-desc">Current: ${STATE.theme}</div></div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm btn-ghost" id="st-light"><i class="ri-sun-line"></i> Light</button>
          <button class="btn btn-sm btn-ghost" id="st-dark"><i class="ri-moon-line"></i> Dark</button>
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Writing Mode</div><div class="settings-row-desc">${u.mode || 'writer'} mode</div></div>
        <select class="form-select" id="st-mode" style="width:140px;height:34px;font-size:12px">
          <option ${u.mode === 'writer' ? 'selected' : ''} value="writer">Writer</option>
          <option ${u.mode === 'journalism' ? 'selected' : ''} value="journalism">Journalism</option>
          <option ${u.mode === 'legal' ? 'selected' : ''} value="legal">Legal</option>
        </select>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">AI Writing Assistant</div><div class="settings-row-desc">Inline AI commands in the editor</div></div>
        <div class="toggle-switch ${u.aiEnabled !== false ? 'on' : ''}" id="st-ai-toggle"><div class="toggle-thumb"></div></div>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Email Notifications</div><div class="settings-row-desc">Approvals, comments, digest</div></div>
        <div class="toggle-switch ${u.emailNotifs !== false ? 'on' : ''}" id="st-notif-toggle"><div class="toggle-thumb"></div></div>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title"><i class="ri-team-line"></i> Team Members</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px">
        ${[{ n: 'Alex Rivera', e: 'alex@citybeat.com', r: 'Owner', init: 'AR', i: 0 }, { n: 'Sam Park', e: 'sam@citybeat.com', r: 'Editor', init: 'SP', i: 1 }, { n: 'Jordan Lee', e: 'jordan@citybeat.com', r: 'Writer', init: 'JL', i: 2 }, { n: 'Casey Morgan', e: 'casey@citybeat.com', r: 'Writer', init: 'CM', i: 3 }].map(m => `
          <div style="display:flex;align-items:center;gap:10px">
            <div class="av-sm" style="width:32px;height:32px;font-size:12px;background:${AGCS[m.i % AGCS.length]};margin-right:0;flex-shrink:0">${m.init}</div>
            <div style="flex:1"><div style="font-size:13px;font-weight:600">${m.n}</div><div style="font-size:11px;color:var(--text3)">${m.e}</div></div>
            <span class="badge ${m.r === 'Owner' ? 'badge-published' : m.r === 'Editor' ? 'badge-approved' : 'badge-draft'}">${m.r}</span>
          </div>`).join('')}
      </div>
      <button class="btn btn-ghost btn-sm" style="justify-content:center;width:100%" id="st-invite"><i class="ri-user-add-line"></i> Invite Member</button>
    </div>
    <div class="settings-section">
      <div class="settings-section-title"><i class="ri-shield-user-line"></i> Danger Zone</div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label" style="color:var(--blush)">Delete Account</div><div class="settings-row-desc">Permanently deletes all data.</div></div>
        <button class="btn btn-sm btn-danger" id="st-delete-acc"><i class="ri-delete-bin-line"></i> Delete</button>
      </div>
      <div class="settings-row">
        <div class="settings-row-info"><div class="settings-row-label">Sign Out</div><div class="settings-row-desc">Sign out of all devices</div></div>
        <button class="btn btn-sm btn-ghost" id="st-signout"><i class="ri-logout-box-line"></i> Sign Out</button>
      </div>
    </div>`);
  // bindings
  $('#st-light').on('click', () => { applyTheme('light'); renderSettingsBody(); toast('info', 'Light mode', 'ri-sun-line'); });
  $('#st-dark').on('click', () => { applyTheme('dark'); renderSettingsBody(); toast('info', 'Dark mode', 'ri-moon-line'); });
  $('#st-mode').on('change', function () { STATE.user.mode = $(this).val(); persist(); toast('success', 'Mode updated', 'ri-focus-3-line'); });
  $('#st-ai-toggle').on('click', function () { $(this).toggleClass('on'); STATE.user.aiEnabled = $(this).hasClass('on'); persist(); });
  $('#st-notif-toggle').on('click', function () { $(this).toggleClass('on'); STATE.user.emailNotifs = $(this).hasClass('on'); persist(); });
  $('#st-edit-name').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-user-3-line"></i> Edit Name</div>
      <div class="form-group"><input class="form-input" id="st-name-val" value="${STATE.user.name}"></div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="st-save-name"><i class="ri-check-line"></i> Save</button></div>`, 'modal-sm');
    $('#st-save-name').on('click', () => {
      const v = $('#st-name-val').val().trim(); if (!v) return;
      STATE.user.name = v; STATE.user.initials = v.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      persist(); closeModal(); updateUserUI(); updateGreeting(); renderSettingsBody();
      toast('success', 'Name updated!', 'ri-user-3-line');
    });
  });
  $('#st-edit-email').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-mail-line"></i> Edit Email</div>
      <div class="form-group"><input class="form-input" id="st-email-val" type="email" value="${STATE.user.email}"></div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="st-save-email"><i class="ri-check-line"></i> Save</button></div>`, 'modal-sm');
    $('#st-save-email').on('click', () => {
      const v = $('#st-email-val').val().trim(); if (!v || !v.includes('@')) { $('#st-email-val').addClass('error'); return; }
      STATE.user.email = v; persist(); closeModal(); renderSettingsBody();
      toast('success', 'Email updated!', 'ri-mail-line');
    });
  });
  $('#st-edit-org').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-building-2-line"></i> Edit Workspace Name</div>
      <div class="form-group"><input class="form-input" id="st-org-val" value="${STATE.user.org}"></div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="st-save-org"><i class="ri-check-line"></i> Save</button></div>`, 'modal-sm');
    $('#st-save-org').on('click', () => {
      STATE.user.org = $('#st-org-val').val().trim(); persist(); closeModal(); updateUserUI(); renderSettingsBody();
      toast('success', 'Workspace updated!', 'ri-building-2-line');
    });
  });
  $('#st-invite').on('click', () => openInviteModal());
  $('#st-delete-acc').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title" style="color:var(--blush)"><i class="ri-alert-line"></i> Delete Account</div>
      <div class="modal-sub">This permanently deletes your account and all workspace data. This cannot be undone.</div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-danger" id="confirm-del-acc"><i class="ri-delete-bin-line"></i> Delete Forever</button></div>`, 'modal-sm');
    $('#confirm-del-acc').on('click', () => { ['onboarded', 'docs', 'user', 'kb', 'notifs', 'orgs', 'sidebarCollapsed', 'panelOpen', 'theme'].forEach(k => LS.del(k)); location.reload(); });
  });
  $('#st-signout').on('click', () => {
    openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
      <div class="modal-title"><i class="ri-logout-box-line"></i> Sign Out</div>
      <div class="modal-sub">Are you sure you want to sign out?</div>
      <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="confirm-so"><i class="ri-logout-box-line"></i> Sign Out</button></div>`, 'modal-sm');
    $('#confirm-so').on('click', () => { LS.del('onboarded'); location.reload(); });
  });
}

function openInviteModal() {
  openModal(`<button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-title"><i class="ri-user-add-line"></i> Invite Team Member</div>
    <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" id="inv-email" type="email" placeholder="colleague@example.com"></div>
    <div class="form-group"><label class="form-label">Role</label>
      <select class="form-select" id="inv-role"><option>Viewer</option><option selected>Writer</option><option>Editor</option><option>Admin</option></select>
    </div>
    <div style="display:flex;align-items:center;gap:9px;padding:10px 13px;background:var(--bg3);border-radius:10px;margin-bottom:4px;font-size:12px">
      <i class="ri-link" style="color:var(--text3)"></i>
      <span style="flex:1">Or share invite link</span>
      <button class="btn btn-sm btn-ghost" id="inv-copy"><i class="ri-clipboard-line"></i> Copy</button>
    </div>
    <div class="modal-footer"><button class="btn btn-ghost modal-close">Cancel</button><button class="btn btn-primary" id="inv-send"><i class="ri-send-plane-line"></i> Send Invite</button></div>`);
  $('#inv-copy').on('click', function () { $(this).html('<i class="ri-check-line"></i> Copied!').css('color', 'var(--mint)'); setTimeout(() => $(this).html('<i class="ri-clipboard-line"></i> Copy').css('color', ''), 2000); });
  $('#inv-send').on('click', () => {
    const e = $('#inv-email').val().trim();
    if (!e || !e.includes('@')) { $('#inv-email').addClass('error'); return; }
    closeModal(); toast('success', `Invite sent to ${e}!`, 'ri-mail-send-line');
  });
}

// ─── CMD PALETTE ───
const CMD_ITEMS = [
  { icon: 'ri-add-circle-line', section: 'Actions', text: 'New Document', desc: 'Create blank or from template', action: openNewDocModal },
  { icon: 'ri-building-2-line', section: 'Actions', text: 'Switch Workspace', desc: '', action: openWorkspaceSwitcher },
  { icon: 'ri-user-add-line', section: 'Actions', text: 'Invite Team Member', desc: '', action: openInviteModal },
  { icon: 'ri-dashboard-2-line', section: 'Navigate', text: 'Dashboard', desc: '', action: () => switchView('dashboard') },
  { icon: 'ri-file-list-3-line', section: 'Navigate', text: 'Review Queue', desc: '', action: () => switchView('queue') },
  { icon: 'ri-book-2-line', section: 'Navigate', text: 'Knowledge Base', desc: '', action: () => switchView('kb') },
  { icon: 'ri-settings-3-line', section: 'Navigate', text: 'Settings', desc: '', action: () => switchView('settings') },
  { icon: 'ri-sparkling-2-line', section: 'AI', text: 'AI: Continue writing', desc: 'Extend current paragraph', action: () => runAI('continue') },
  { icon: 'ri-magic-line', section: 'AI', text: 'AI: Improve prose', desc: 'Rewrite for clarity & style', action: () => runAI('improve') },
  { icon: 'ri-newspaper-line', section: 'AI', text: 'AI: Generate headlines', desc: '5 options', action: () => runAI('headline') },
  { icon: 'ri-compress-v-line', section: 'AI', text: 'AI: Shorten text', desc: 'Condense selection', action: () => runAI('shorten') },
  { icon: 'ri-sun-line', section: 'Settings', text: 'Light Mode', desc: '', action: () => applyTheme('light') },
  { icon: 'ri-moon-line', section: 'Settings', text: 'Dark Mode', desc: '', action: () => applyTheme('dark') },
  { icon: 'ri-logout-box-line', section: 'Account', text: 'Sign Out', desc: '', action: () => { LS.del('onboarded'); location.reload(); } },
];
let cmdIdx = 0;
function bindCmdPalette() {
  $('#cmd-input').on('input', function () { renderCmdResults($(this).val()); });
  $('#cmd-input').on('keydown', function (e) {
    const $items = $('#cmd-results .cmd-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdIdx = Math.min(cmdIdx + 1, $items.length - 1); updateCmdFocus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cmdIdx = Math.max(cmdIdx - 1, 0); updateCmdFocus(); }
    else if (e.key === 'Enter') { e.preventDefault(); $items.eq(cmdIdx).trigger('click'); }
    else if (e.key === 'Escape') closeCmd();
  });
  $('#cmd-palette-overlay').on('click', function (e) { if ($(e.target).is(this)) closeCmd(); });
}
function openCmd() {
  STATE.cmdOpen = true; cmdIdx = 0;
  $('#cmd-palette-overlay').removeClass('hidden');
  $('#cmd-input').val('').trigger('focus');
  renderCmdResults('');
}
function closeCmd() { STATE.cmdOpen = false; $('#cmd-palette-overlay').addClass('hidden'); }
function renderCmdResults(q) {
  const docItems = STATE.docs.slice(0, 5).map(d => ({ icon: 'ri-file-text-line', section: 'Documents', text: d.title, desc: d.status, action: () => openDoc(d.id) }));
  const all = [...CMD_ITEMS, ...docItems];
  const filtered = q ? all.filter(i => i.text.toLowerCase().includes(q.toLowerCase()) || i.desc.toLowerCase().includes(q.toLowerCase())) : all;
  const secs = {};
  filtered.forEach((it, i) => { const s = it.section || 'Other'; if (!secs[s]) secs[s] = []; secs[s].push({ ...it, _i: i }); });
  let h = '', gi = 0;
  Object.entries(secs).forEach(([sec, items]) => {
    h += `<div class="cmd-section-label">${sec}</div>`;
    items.forEach(item => {
      h += `<div class="cmd-item ${gi === cmdIdx ? 'focused' : ''}" data-gi="${gi}"><div class="cmd-item-icon"><i class="ri ${item.icon}"></i></div><div><div class="cmd-item-text">${item.text}</div>${item.desc ? `<div class="cmd-item-desc">${item.desc}</div>` : ''}</div></div>`;
      gi++;
    });
  });
  $('#cmd-results').html(h || '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px"><i class="ri-search-line" style="font-size:20px;display:block;margin-bottom:6px;opacity:.4"></i>No results</div>');
  const flatItems = Object.values(secs).flat();
  $('#cmd-results .cmd-item').on('click', function () {
    const i = +$(this).data('gi');
    const item = flatItems[i];
    closeCmd();
    if (item) item.action();
  });
}
function updateCmdFocus() {
  $('#cmd-results .cmd-item').removeClass('focused');
  const $f = $('#cmd-results .cmd-item').eq(cmdIdx);
  $f.addClass('focused');
  $f.get(0)?.scrollIntoView({ block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════
   HACKATHON FEATURES — PROFESSION MODE, ROLES, ANALYTICS
   CALENDAR, TEAMS, INTELLIGENCE PANEL
═══════════════════════════════════════════════════════ */

// ─── PROFESSION MODE ───
const MODES = {
  journalism: {
    label: 'Journalism', icon: 'ri-newspaper-line', color: 'sky',
    aiLabel: 'Editorial AI', aiHints: ['AP Style check', 'Fact verify', 'Source check', 'Headline draft', 'Lede shorten'],
    widget: () => `
          <div class="mode-widget">
            <div class="mode-widget-title" style="color:var(--sky)"><i class="ri-newspaper-line"></i> AP Style Monitor <span style="margin-left:auto;font-size:10px;font-weight:400;color:var(--text3)">Live</span></div>
            <div class="ap-style-item"><i class="ri-alert-line" style="color:var(--lemon)"></i><span><strong>"unprecedented"</strong> — AP Style avoids vague superlatives. Use a specific figure instead.</span></div>
            <div class="ap-style-item"><i class="ri-check-line" style="color:var(--mint)"></i><span>Attribution format correct: "said [Name], [Title]"</span></div>
            <div class="ap-style-item"><i class="ri-alert-line" style="color:var(--lemon)"></i><span>Date format: Use "March 8" not "8th of March"</span></div>
          </div>
          <div class="mode-widget">
            <div class="mode-widget-title" style="color:var(--sky)"><i class="ri-send-plane-line"></i> Publishing Pipeline</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${STATE.docs.filter(d => d.status === 'review').slice(0, 3).map(d => `
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;padding:7px 10px;background:var(--bg2);border-radius:8px;border:1px solid var(--border)">
                  <div style="width:7px;height:7px;border-radius:50%;background:var(--sky);flex-shrink:0"></div>
                  <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.title}</span>
                  <span style="font-size:10px;color:var(--text3)">${d.updated}</span>
                </div>`).join('')}
            </div>
          </div>`
  },
  legal: {
    label: 'Legal', icon: 'ri-scales-line', color: 'lav',
    aiLabel: 'Legal AI', aiHints: ['Check citations', 'Flag risks', 'Bluebook format', 'Clause review', 'Case lookup'],
    widget: () => `
          <div class="mode-widget">
            <div class="mode-widget-title" style="color:var(--lav)"><i class="ri-shield-check-line"></i> Risk Flag Monitor</div>
            <div class="case-item"><span class="risk-chip risk-high">HIGH</span><span style="font-size:12px;flex:1">Liability clause in §3.2 — ambiguous scope. Review required.</span></div>
            <div class="case-item"><span class="risk-chip risk-med">MED</span><span style="font-size:12px;flex:1">Citation 14 CFR §25.1309 — verify revision year.</span></div>
            <div class="case-item"><span class="risk-chip risk-low">LOW</span><span style="font-size:12px;flex:1">Standard boilerplate detected — may require jurisdiction check.</span></div>
          </div>
          <div class="mode-widget">
            <div class="mode-widget-title" style="color:var(--lav)"><i class="ri-file-list-3-line"></i> Active Matters</div>
            ${['Case #2024-0847 — Rivera v. City', 'Matter #LG-2025-11 — Merger Review', 'Brief #CR-551 — Sentencing Memo'].map((c, i) => `
              <div class="case-item"><span class="case-num">${['#0847', '#LG-11', '#CR-551'][i]}</span><span style="font-size:12px;flex:1">${c.split('—')[1]?.trim()}</span></div>`).join('')}
          </div>`
  },
  writer: {
    label: 'Writer', icon: 'ri-edit-2-line', color: 'peach',
    aiLabel: 'Writing AI', aiHints: ['Continue', 'Improve', 'Headlines', 'Shorten', 'Summarise'],
    widget: () => {
      const totalWords = STATE.docs.reduce((a, d) => a + (d.words || 0), 0);
      const goal = 10000;
      const pct = Math.min(100, Math.round(totalWords / goal * 100));
      return `
            <div class="mode-widget">
              <div class="mode-widget-title" style="color:var(--peach)"><i class="ri-quill-pen-line"></i> Word Goal — ${totalWords.toLocaleString()} / ${goal.toLocaleString()}</div>
              <div class="word-goal-track"><div class="word-goal-fill" style="width:${pct}%"></div></div>
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3)"><span>${pct}% complete</span><span>${(goal - totalWords).toLocaleString()} remaining</span></div>
            </div>
            <div class="mode-widget">
              <div class="mode-widget-title" style="color:var(--peach)"><i class="ri-lightbulb-line"></i> Story Ideas</div>
              ${['The city after dark: a portrait', 'Industry shift: what AI means for journalists', 'Interview: The indie newsroom founders'].map(i => `
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;padding:6px 0;border-bottom:1px solid var(--border)"><i class="ri-add-circle-line" style="color:var(--peach)"></i>${i}</div>`).join('')}
            </div>`;
    }
  }
};

let currentMode = STATE.user.mode || 'journalism';

function applyMode(mode) {
  currentMode = mode;
  STATE.user.mode = mode;
  LS.set('user', STATE.user);
  // update pills
  $('.mode-pill').removeClass('mp-active');
  $(`#mp-${mode}`).addClass('mp-active');
  // clear and re-render profession widget area
  renderModeWidgets();
  const m = MODES[mode];
  if (m) {
    // Update AI panel hints
    const aiHints = m.aiHints || [];
    $('.ai-quick-grid').html(aiHints.map(h => {
      const cmdMap = {
        'Continue': 'continue', 'Improve': 'improve', 'Shorten': 'shorten', 'Headlines': 'headline', 'Summarise': 'summarize',
        'AP Style check': 'improve', 'Fact verify': 'research', 'Source check': 'research', 'Headline draft': 'headline', 'Lede shorten': 'shorten',
        'Check citations': 'research', 'Flag risks': 'improve', 'Bluebook format': 'summarize', 'Clause review': 'improve', 'Case lookup': 'research'
      };
      const ic = { continue: 'ri-arrow-right-circle-line', improve: 'ri-magic-line', shorten: 'ri-compress-v-line', headline: 'ri-newspaper-line', summarize: 'ri-file-text-line', research: 'ri-search-eye-line' };
      const cmd = cmdMap[h] || 'improve';
      return `<button class="ai-quick-btn" data-cmd="${cmd}"><i class="ri ${ic[cmd]}"></i>${h}</button>`;
    }).join(''));
    // Update mode badge in editor meta
    const mi = { writer: 'Writer Mode', journalism: 'Journalism Mode', legal: 'Legal Mode' };
    const ii = { writer: 'ri-edit-2-line', journalism: 'ri-newspaper-line', legal: 'ri-scales-line' };
    $('#meta-mode').html(`<i class="ri ${ii[mode]}"></i> ${mi[mode]}`);
    toast('info', `${m.label} mode activated`, `ri ${m.icon}`);
  }
  renderIntelPanel();
}

function renderModeWidgets() {
  const m = MODES[currentMode];
  const html = m ? m.widget() : '';
  if ($('#mode-widget-area').length) $('#mode-widget-area').html(html);
}

// Insert mode widget area into dashboard body after stats grid
function injectModeWidgetArea() {
  if (!$('#mode-widget-area').length) {
    $('<div id="mode-widget-area"></div>').insertAfter('#stats-grid');
  }
  renderModeWidgets();
}

// Mode pill click handlers
$(document).on('click', '.mode-pill', function () {
  const mode = this.id.replace('mp-', '');
  if (MODES[mode]) applyMode(mode);
});

// ─── ROLE SYSTEM ───
const ROLES = [
  { key: 'lead', name: 'Lead Editor', icon: '👑', chipClass: 'chip-lead', desc: 'Full access: approvals, analytics, team management', dashVariant: 'lead' },
  { key: 'editor', name: 'Editor', icon: '✍️', chipClass: 'chip-editor', desc: 'Edit, review, approve drafts from team writers', dashVariant: 'editor' },
  { key: 'reviewer', name: 'Reviewer', icon: '🔍', chipClass: 'chip-reviewer', desc: 'Review and annotate — cannot publish directly', dashVariant: 'reviewer' },
  { key: 'writer', name: 'Writer', icon: '📝', chipClass: 'chip-writer', desc: 'Create and draft documents', dashVariant: 'writer' },
  { key: 'publisher', name: 'Publisher', icon: '🚀', chipClass: 'chip-publisher', desc: 'Publish approved docs and manage schedules', dashVariant: 'publisher' },
  { key: 'associate', name: 'Associate', icon: '👤', chipClass: 'chip-reviewer', desc: 'View-only access with comment permissions', dashVariant: 'associate' },
];

let currentRole = 'lead';

function openRoleSwitcher() {
  openModal(`
        <button class="modal-close"><i class="ri-close-line"></i></button>
        <div class="modal-title"><i class="ri-user-settings-line" style="color:var(--peach)"></i> Switch Role <span style="font-size:11px;font-weight:400;color:var(--text3);margin-left:6px">Demo mode</span></div>
        <div class="modal-sub">See how Thread adapts to different roles and responsibilities.</div>
        <div class="role-switcher-grid" id="role-switcher-grid">
          ${ROLES.map(r => `
            <div class="role-option ${r.key === currentRole ? 'selected' : ''}" data-role="${r.key}">
              <span class="role-option-icon">${r.icon}</span>
              <span class="role-option-name">${r.name}</span>
              <span class="role-option-desc">${r.desc}</span>
            </div>`).join('')}
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost modal-close">Cancel</button>
          <button class="btn btn-primary" id="apply-role-btn"><i class="ri-check-line"></i> Apply Role</button>
        </div>`);
  let sel = currentRole;
  $(document).on('click.rolesel', '.role-option', function () { $('.role-option').removeClass('selected'); $(this).addClass('selected'); sel = $(this).data('role'); });
  $('#apply-role-btn').on('click', () => { $(document).off('click.rolesel'); applyRole(sel); closeModal(); });
}

function applyRole(roleKey) {
  const role = ROLES.find(r => r.key === roleKey);
  if (!role) return;
  currentRole = roleKey;
  // Update role chip
  $('#role-chip-display').attr('class', `role-chip ${role.chipClass}`).attr('title', role.desc);
  $('#role-chip-label').text(role.name);
  // Adapt dashboard based on role
  adaptDashboardForRole(roleKey);
  toast('success', `Now viewing as: ${role.name}`, 'ri-user-star-line');
}

function adaptDashboardForRole(roleKey) {
  // Show/hide analytics nav for leads
  if (roleKey === 'lead' || roleKey === 'editor') {
    $('.nav-item[data-view="analytics"]').show();
  } else {
    $('.nav-item[data-view="analytics"]').hide();
    if (STATE.currentView === 'analytics') switchView('dashboard');
  }
  // Adapt pending count display
  const pendingCount = STATE.docs.filter(d => d.status === 'review').length;
  if (roleKey === 'reviewer' || roleKey === 'editor' || roleKey === 'lead') {
    $('#dash-pending-count').text(pendingCount).parent().show();
  }
  // Update greeting
  const roleGreet = { lead: 'Your team has', editor: 'You have', reviewer: 'Awaiting your review:', writer: "You're working on", publisher: 'Ready to publish:' };
  if (roleKey === 'writer') {
    const myDocs = STATE.docs.filter(d => d.author === STATE.user.name);
    $('#dash-sub-role').remove();
    $('<div id="dash-sub-role" style="font-size:12px;color:var(--text3);margin-top:2px"></div>')
      .text(`${myDocs.length} documents in progress`)
      .insertAfter('#dash-sub-placeholder');
  }
}

$(document).on('click', '#role-chip-display', openRoleSwitcher);

// ─── ANALYTICS VIEW ───
function renderAnalyticsView() {
  const docs = STATE.docs;
  const byAuthor = {};
  docs.forEach(d => { byAuthor[d.author] = (byAuthor[d.author] || 0) + (d.words || 0); });
  const authors = Object.entries(byAuthor).sort((a, b) => b[1] - a[1]);
  const maxW = authors[0]?.[1] || 1;
  const colors = ['linear-gradient(90deg,var(--peach),var(--blush))', 'linear-gradient(90deg,var(--sky),var(--lav))', 'linear-gradient(90deg,var(--mint),var(--sky))', 'linear-gradient(90deg,var(--lemon),var(--peach))'];

  $('#analytics-body').html(`
        <div class="kpi-row">
          <div class="kpi-card"><div class="kpi-val" style="color:var(--peach)">${docs.length}</div><div class="kpi-lbl">Total Docs</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:var(--sky)">${docs.filter(d => d.status === 'review').length}</div><div class="kpi-lbl">In Review</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:var(--mint)">${docs.filter(d => d.status === 'published').length}</div><div class="kpi-lbl">Published</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:var(--lav)">${Math.round(docs.reduce((a, d) => a + (d.words || 0), 0) / 1000)}k</div><div class="kpi-lbl">Words Total</div></div>
        </div>
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="analytics-card-title"><i class="ri ri-quill-pen-line"></i> Words by Author</div>
            <div class="bar-chart">
              ${authors.map((a, i) => `
                <div class="bar-row">
                  <div class="bar-label">${a[0].split(' ')[0]}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${Math.round(a[1] / maxW * 100)}%;background:${colors[i % colors.length]}"></div></div>
                  <div class="bar-val">${Math.round(a[1] / 100) / 10}k</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="analytics-card">
            <div class="analytics-card-title"><i class="ri ri-pie-chart-line"></i> Status Breakdown</div>
            <div class="bar-chart">
              ${['draft', 'review', 'revision', 'approved', 'published'].map(s => {
    const cnt = docs.filter(d => d.status === s).length;
    const dot = { draft: '#F5C842', review: '#3B82F6', revision: '#F472B6', approved: '#10B981', published: '#A855F7' }[s];
    return `<div class="bar-row">
                  <div class="bar-label" style="text-transform:capitalize">${s}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, cnt / docs.length * 100)}%;background:${dot}"></div></div>
                  <div class="bar-val">${cnt}</div>
                </div>`;
  }).join('')}
            </div>
          </div>
        </div>
        <div class="analytics-grid">
          <div class="analytics-card">
            <div class="analytics-card-title"><i class="ri ri-line-chart-line"></i> Publish Velocity (last 7 days)</div>
            <div class="bar-chart">
              ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
    const v = [2, 4, 1, 6, 3, 5, 2][i];
    return `<div class="bar-row">
                  <div class="bar-label">${d}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${v * 14}%;background:linear-gradient(90deg,var(--peach),var(--blush))"></div></div>
                  <div class="bar-val">${v}</div>
                </div>`;
  }).join('')}
            </div>
          </div>
          <div class="analytics-card" style="overflow-y:auto">
            <div class="analytics-card-title"><i class="ri ri-time-line"></i> Team Activity</div>
            <div>
              ${[
      { av: 'AR', bg: 0, text: '<strong>Alex</strong> submitted "Local Journalism" for review', time: '2h ago' },
      { av: 'SP', bg: 1, text: '<strong>Sam</strong> approved "Q4 Editorial Report"', time: '3h ago' },
      { av: 'JL', bg: 2, text: '<strong>Jordan</strong> posted a comment on "Mayor Williams"', time: '5h ago' },
      { av: 'CM', bg: 3, text: '<strong>Casey</strong> created "Climate Change: Local Impact"', time: '2d ago' },
      { av: 'AR', bg: 0, text: '<strong>Alex</strong> invited Casey Morgan to the workspace', time: '3d ago' },
    ].map(a => `
                <div class="activity-item">
                  <div class="activity-av" style="background:${AGCS[a.bg % AGCS.length]}">${a.av}</div>
                  <div class="activity-text">${a.text}</div>
                  <div class="activity-time">${a.time}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>`);
}

// ─── CALENDAR VIEW ───
function renderCalendarView() {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Build 7-day week starting from Sunday of current week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i); return d;
  });

  // Map docs to days by deadline
  const docsByDay = {};
  STATE.docs.forEach(d => {
    if (d.deadline) {
      const dl = new Date(d.deadline);
      const key = dl.toDateString();
      if (!docsByDay[key]) docsByDay[key] = [];
      docsByDay[key].push(d);
    }
  });

  const calGrid = weekDays.map(d => {
    const isToday = d.toDateString() === now.toDateString();
    const docsForDay = docsByDay[d.toDateString()] || [];
    const addDoc = STATE.docs.find(doc => {
      const dl = new Date(doc.deadline || '');
      return Math.abs(dl - d) < 86400000 * 0.5 && doc.status === 'review';
    });
    return `
          <div class="cal-day ${isToday ? 'today' : ''}">
            <div class="cal-day-label">${days[d.getDay()]}</div>
            <div class="cal-day-num">${d.getDate()}</div>
            ${docsForDay.map(doc => `<div class="cal-event ${doc.status}" title="${doc.title}">${doc.title.slice(0, 18)}…</div>`).join('')}
            ${addDoc && docsForDay.length === 0 ? `<div class="cal-event review">${addDoc.title.slice(0, 16)}…</div>` : ''}
          </div>`;
  }).join('');

  const publishSchedule = [
    ...STATE.docs.filter(d => d.status === 'approved').map(d => ({ title: d.title, date: 'Mar 10', type: 'approved' })),
    ...STATE.docs.filter(d => d.status === 'published').map(d => ({ title: d.title, date: 'Mar 5', type: 'published' })),
  ].slice(0, 4);

  $('#calendar-body').html(`
        <div class="cal-week-nav">
          <div class="cal-week-label">Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          <button class="btn btn-sm btn-ghost" id="cal-prev"><i class="ri-arrow-left-s-line"></i> Prev</button>
          <button class="btn btn-sm btn-ghost" id="cal-next">Next <i class="ri-arrow-right-s-line"></i></button>
        </div>
        <div class="cal-grid">${calGrid}</div>
        <div class="section-bar">
          <div class="section-bar-title"><i class="ri-send-plane-line"></i> Publish Schedule</div>
          <button class="btn btn-sm btn-ghost" onclick="toast('info','Full schedule coming soon!','ri-calendar-line')">View all <i class="ri-arrow-right-line"></i></button>
        </div>
        ${publishSchedule.length ? publishSchedule.map(p => `
          <div class="pq-row">
            <div class="pq-date">${p.date}</div>
            <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.title}</div><div style="font-size:11px;color:var(--text3)">${p.type === 'approved' ? 'Approved — ready to publish' : 'Published'}</div></div>
            ${badgeHtml(p.type)}
          </div>`).join('') : '<div style="color:var(--text3);font-size:13px;padding:12px;text-align:center">No scheduled publications. Approve documents to add them.</div>'}
        <div style="height:8px"></div>
        <div class="section-bar"><div class="section-bar-title"><i class="ri-calendar-check-line"></i> Upcoming Deadlines</div></div>
        ${STATE.docs.filter(d => d.deadline).map(d => `
          <div class="pq-row">
            <div class="pq-date">${new Date(d.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.title}</div><div style="font-size:11px;color:var(--text3)"><i class="ri-user-3-line"></i> ${d.assignee || d.author}</div></div>
            ${badgeHtml(d.status)}
          </div>`).join('') || '<div style="color:var(--text3);font-size:13px;padding:12px;text-align:center">No deadlines set yet.</div>'}`);

  $('#cal-prev,#cal-next,#btn-cal-today').on('click', function () { toast('info', 'Calendar navigation', 'ri-calendar-2-line'); });
  $('#btn-new-event').on('click', () => toast('info', 'New event coming soon!', 'ri-add-line'));
}

// ─── TEAMS VIEW ───
function renderTeamsView() {
  const MODE_TEAMS = {
    journalism: [
      {
        name: 'Editorial Team', emoji: '📰', color: 'sky', desc: 'Breaking news, investigative reporting',
        members: [{ n: 'Alex Rivera', e: 'alex@citybeat.com', init: 'AR', role: 'lead' }, { n: 'Sam Park', e: 'sam@citybeat.com', init: 'SP', role: 'editor' }, { n: 'Jordan Lee', e: 'jordan@citybeat.com', init: 'JL', role: 'reviewer' }, { n: 'Casey Morgan', e: 'casey@citybeat.com', init: 'CM', role: 'writer' }]
      },
      {
        name: 'Publishing Desk', emoji: '🚀', color: 'peach', desc: 'Scheduling and distribution',
        members: [{ n: 'Dana Reyes', e: 'dana@citybeat.com', init: 'DR', role: 'publisher' }, { n: 'Mo Williams', e: 'mo@citybeat.com', init: 'MW', role: 'writer' }]
      },
    ],
    legal: [
      {
        name: 'Litigation Team', emoji: '⚖️', color: 'lav', desc: 'Active cases and briefs',
        members: [{ n: 'Alex Rivera', e: 'alex@firm.com', init: 'AR', role: 'lead' }, { n: 'Sam Park', e: 'sam@firm.com', init: 'SP', role: 'editor' }, { n: 'Jordan Lee', e: 'jordan@firm.com', init: 'JL', role: 'reviewer' }]
      },
      {
        name: 'Compliance', emoji: '🛡️', color: 'mint', desc: 'Regulatory and risk management',
        members: [{ n: 'Casey Morgan', e: 'casey@firm.com', init: 'CM', role: 'associate' }, { n: 'Dana Reyes', e: 'dana@firm.com', init: 'DR', role: 'writer' }]
      },
    ],
    writer: [
      {
        name: 'Content Team', emoji: '✍️', color: 'peach', desc: 'Blog, newsletter, and brand writing',
        members: [{ n: 'Alex Rivera', e: 'alex@studio.com', init: 'AR', role: 'lead' }, { n: 'Sam Park', e: 'sam@studio.com', init: 'SP', role: 'writer' }, { n: 'Jordan Lee', e: 'jordan@studio.com', init: 'JL', role: 'writer' }, { n: 'Casey Morgan', e: 'casey@studio.com', init: 'CM', role: 'reviewer' }]
      },
    ]
  };
  const teams = MODE_TEAMS[currentMode] || MODE_TEAMS.journalism;
  const roleCls = { lead: 'role-lead', editor: 'role-editor', reviewer: 'role-reviewer', writer: 'role-writer', publisher: 'role-publisher', associate: 'role-badge' };
  const roleLabel = { lead: 'Lead Editor', editor: 'Editor', reviewer: 'Reviewer', writer: 'Writer', publisher: 'Publisher', associate: 'Associate' };
  $('#teams-body').html(teams.map(t => `
        <div class="team-card">
          <div class="team-card-head">
            <div style="display:flex;align-items:center;gap:10px">
              <div class="team-badge" style="background:color-mix(in srgb,var(--${t.color}) 18%,transparent)">${t.emoji}</div>
              <div><div class="team-name">${t.name}</div><div class="team-desc">${t.desc}</div></div>
            </div>
            <button class="btn btn-sm btn-ghost" onclick="toast('info','Team settings','ri-settings-3-line')"><i class="ri-more-2-fill"></i></button>
          </div>
          <div>
            ${t.members.map((m, i) => `
              <div class="member-row">
                <div class="av-sm" style="width:30px;height:30px;font-size:10px;background:${AGCS[i % AGCS.length]};margin-right:0;flex-shrink:0">${m.init}</div>
                <div class="member-info"><div class="member-name">${m.n}</div><div class="member-email">${m.e}</div></div>
                <span class="role-badge ${roleCls[m.role] || 'role-badge'}">${roleLabel[m.role] || m.role}</span>
              </div>`).join('')}
          </div>
        </div>`).join('') + `
        <div style="display:flex;gap:8px;margin-top:4px">
          <button class="btn btn-ghost flex-1" style="justify-content:center" id="btn-invite-member2"><i class="ri-user-add-line"></i> Invite Member</button>
          <button class="btn btn-ghost flex-1" style="justify-content:center" id="btn-new-team2"><i class="ri-add-line"></i> New Team</button>
        </div>`);
  $('#btn-invite-member,#btn-invite-member2').on('click', openInviteModal);
  $('#btn-new-team,#btn-new-team2').on('click', () => toast('info', 'Team creation coming soon!', 'ri-team-line'));
}

// ─── INTELLIGENCE / VALIDATION PANEL ───
function renderIntelPanel() {
  const mode = currentMode;
  let html = '';
  if (mode === 'journalism') {
    html = `
          <div class="intel-section-hd"><i class="ri ri-newspaper-line"></i> AP Style Checks</div>
          <div class="intel-flag warn"><i class="ri-alert-line"></i><span><strong>Passive voice detected</strong> in paragraph 2. AP Style prefers active constructions.</span></div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>Attribution format correct throughout the document.</span></div>
          <div class="intel-flag warn"><i class="ri-alert-line"></i><span>"Unprecedented" (¶1) — replace with specific data point per AP Style guidelines.</span></div>
          <div class="intel-section-hd"><i class="ri ri-search-eye-line"></i> Fact Flags</div>
          <div class="intel-flag info"><i class="ri-information-line"></i><span>Statistic in ¶3 (2,500 closures) — source not cited. Add attribution or KB reference.</span></div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>Dr. Priya Iyer quote correctly attributed with title and institution.</span></div>
          <div class="intel-section-hd"><i class="ri ri-shield-check-line"></i> Compliance</div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>No defamatory statements detected.</span></div>`;
  } else if (mode === 'legal') {
    html = `
          <div class="intel-section-hd"><i class="ri ri-scales-line"></i> Risk Flags</div>
          <div class="intel-flag error"><i class="ri-close-circle-line"></i><span><strong>§3.2 Liability clause</strong> — ambiguous scope may expose party to unintended risk. Legal review required.</span></div>
          <div class="intel-flag warn"><i class="ri-alert-line"></i><span><strong>Citation: 14 CFR §25.1309</strong> — verify current revision year (2023 vs 2024).</span></div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>Parties correctly identified and styled per jurisdiction conventions.</span></div>
          <div class="intel-section-hd"><i class="ri ri-book-2-line"></i> Bluebook Citations</div>
          <div class="intel-flag info"><i class="ri-information-line"></i><span>Short form citation used on 3rd reference (cf. Rule 10.9) — acceptable.</span></div>
          <div class="intel-flag warn"><i class="ri-alert-line"></i><span>Case name italicisation inconsistent on page 2. Standardise per Bluebook Rule 10.2.</span></div>`;
  } else {
    html = `
          <div class="intel-section-hd"><i class="ri ri-edit-2-line"></i> Writing Quality</div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>Readability score: <strong>Good</strong> (Grade 9 equivalent — accessible for general readers).</span></div>
          <div class="intel-flag warn"><i class="ri-alert-line"></i><span>Sentence length variance is low in ¶3. Consider mixing short and long sentences for rhythm.</span></div>
          <div class="intel-flag info"><i class="ri-information-line"></i><span>Word count: 1,240 — approaching target length for this template.</span></div>
          <div class="intel-section-hd"><i class="ri ri-lightbulb-line"></i> Suggestions</div>
          <div class="intel-flag info"><i class="ri-information-line"></i><span>Opening hook is strong. Consider adding a sub-headline to break up the introduction.</span></div>
          <div class="intel-flag ok"><i class="ri-check-circle-line"></i><span>No duplicate phrases detected. Vocabulary variety is good.</span></div>`;
  }
  $('#intel-panel-body').html(html);
}

// ─── EXTEND switchView ───
const _origSwitchView = switchView;
switchView = function (view) {
  STATE.currentView = view;
  const views = ['dashboard', 'editor', 'queue', 'kb', 'settings', 'analytics', 'calendar', 'teams'];
  views.forEach(v => $(`#view-${v}`).toggleClass('hidden', v !== view));
  $('.nav-item[data-view]').removeClass('active');
  $(`.nav-item[data-view="${view}"]`).addClass('active');
  if (view === 'kb') renderKbView();
  if (view === 'queue') renderQueueView();
  if (view === 'settings') renderSettingsBody();
  if (view === 'analytics') renderAnalyticsView();
  if (view === 'calendar') renderCalendarView();
  if (view === 'teams') renderTeamsView();
  if (view === 'editor' && !STATE.currentDocId) switchView('dashboard');
  if (view === 'dashboard') {
    setTimeout(injectModeWidgetArea, 10);
  }
};

// CMD items for new views
CMD_ITEMS.push(
  { icon: 'ri-bar-chart-line', section: 'Navigate', text: 'Analytics', desc: 'Team productivity & doc velocity', action: () => switchView('analytics') },
  { icon: 'ri-calendar-2-line', section: 'Navigate', text: 'Editorial Calendar', desc: 'Deadlines and publish schedule', action: () => switchView('calendar') },
  { icon: 'ri-team-line', section: 'Navigate', text: 'Team & Roles', desc: 'Manage members and permissions', action: () => switchView('teams') },
  { icon: 'ri-user-star-line', section: 'Actions', text: 'Switch Role (Demo)', desc: 'Preview Lead Editor, Reviewer, Writer…', action: openRoleSwitcher }
);

// Init mode and role on load
setTimeout(() => {
  applyMode(STATE.user.mode || 'journalism');
  applyRole('lead');
  injectModeWidgetArea();
  renderIntelPanel();
}, 80);

