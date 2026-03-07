$(function () {

  /* ═══ THEME ═══ */
  let theme = localStorage.getItem('tws-theme') || 'light';
  applyTheme(theme);

  function applyTheme(t) {
    $('html').attr('data-theme', t);
    $('#themeToggle').text(t === 'dark' ? '☀️' : '🌙');
    theme = t;
    localStorage.setItem('tws-theme', t);
  }

  $('#themeToggle').on('click', function () {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  });

  /* ═══ STEP STATE ═══ */
  let currentStep = 1;
  const totalSteps = 7;
  const stepNames = ['Create account', 'Verify email', 'About you', 'Organization', 'Choose mode', 'Customize', 'Invite team'];

  /* ═══ PROGRESS BAR ═══ */
  function buildProgress() {
    const $container = $('#progressSteps').empty();

    for (let i = 1; i <= totalSteps; i++) {
      if (i > 1) {
        $container.append('<div class="progress-line' + (i <= currentStep ? ' done' : '') + '"></div>');
      }

      const cls = i < currentStep ? 'done' : i === currentStep ? 'active' : 'todo';
      const label = i < currentStep ? '✓' : i;
      const $dot = $('<div class="progress-step ' + cls + '">' + label + '</div>');

      if (i < currentStep) {
        (function (step) {
          $dot.on('click', function () { goToStep(step); });
        })(i);
      }

      $container.append($dot);
    }

    $('#stepNum').text(currentStep);
    $('#stepName').text(stepNames[currentStep - 1]);
  }

  function goToStep(n) {
    $('#step' + currentStep).removeClass('active');
    currentStep = n;
    $('#step' + currentStep).addClass('active');
    buildProgress();
    if (currentStep === 2) startResendTimer();
  }

  function goNext() { if (currentStep < totalSteps) goToStep(currentStep + 1); }
  function goPrev() { if (currentStep > 1) goToStep(currentStep - 1); }

  window.goNext = goNext;
  window.goPrev = goPrev;

  buildProgress();

  /* ═══ STEP 1 VALIDATION ═══ */
  function validateStep1() {
    const name  = $('#fullName').val().trim();
    const email = $('#emailField').val().trim();
    const pw    = $('#pwField').val();
    const valid = name.length > 1 && email.includes('@') && pw.length >= 8;
    $('#step1Btn').prop('disabled', !valid);
    if (email) $('#verifyEmail').text(email);
  }

  function checkPassword(val) {
    const levels = [
      { min: 0,  w: '0%',   bg: '',        msg: 'Enter a strong password' },
      { min: 1,  w: '20%',  bg: '#EF4444', msg: 'Very weak'   },
      { min: 6,  w: '40%',  bg: '#F97316', msg: 'Weak'        },
      { min: 8,  w: '60%',  bg: '#F5C842', msg: 'Fair'        },
      { min: 10, w: '80%',  bg: '#10B981', msg: 'Strong'      },
      { min: 14, w: '100%', bg: '#059669', msg: 'Very strong ✓' }
    ];
    let level = levels[0];
    levels.forEach(function (l) { if (val.length >= l.min) level = l; });
    $('#pwBar').css({ width: level.w, background: level.bg });
    $('#pwHint').text(level.msg).css('color', level.bg || 'var(--text3)');
    validateStep1();
  }

  $('#fullName, #emailField').on('input', validateStep1);
  $('#pwField').on('input', function () { checkPassword($(this).val()); });

  /* ═══ OTP ═══ */
  function otpInput(idx, input) {
    $(input).toggleClass('filled', input.value !== '');
    if (input.value && idx < 5) $('#otp' + (idx + 1)).focus();
    const allFilled = Array.from({ length: 6 }, function (_, i) {
      return document.getElementById('otp' + i).value;
    }).every(function (v) { return v; });
    $('#step2Btn').prop('disabled', !allFilled);
  }

  window.otpInput = otpInput;

  let resendSeconds = 60;
  let resendInterval;

  function startResendTimer() {
    clearInterval(resendInterval);
    resendSeconds = 60;
    $('#resendBtn').prop('disabled', true);
    $('#resendTimer').show();
    resendInterval = setInterval(function () {
      resendSeconds--;
      $('#resendTimer').text('(' + resendSeconds + 's)');
      if (resendSeconds <= 0) {
        clearInterval(resendInterval);
        $('#resendBtn').prop('disabled', false);
        $('#resendTimer').hide();
      }
    }, 1000);
  }

  window.startResendTimer = startResendTimer;
  setTimeout(startResendTimer, 100);

  /* ═══ CARD SELECT ═══ */
  function selectCard(el, group) {
    $(el).closest('.card-grid').find('.select-card').removeClass('selected');
    $(el).addClass('selected');
  }

  window.selectCard = selectCard;

  /* ═══ TAG TOGGLE ═══ */
  function toggleTag(el) { $(el).toggleClass('selected'); }
  window.toggleTag = toggleTag;

  /* ═══ SLUG ═══ */
  let slugTimeout;

  function updateSlug(val) {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'your-org';
    $('#slugVal').text(slug);
    $('#orgSlug').val(slug);
    checkSlug(slug);
  }

  function checkSlug(val) {
    const $check = $('#urlCheck');
    if (!val) { $check.hide(); return; }
    $check.show().text('⏳ Checking...').attr('class', 'url-check');
    clearTimeout(slugTimeout);
    slugTimeout = setTimeout(function () {
      const taken = ['newsroom', 'media', 'legal', 'writers'];
      const ok = !taken.includes(val.toLowerCase());
      $check.text(ok ? '✓ Available' : '✗ Already taken').attr('class', 'url-check ' + (ok ? 'ok' : 'err'));
      $('#slugVal').text(val || 'your-org');
    }, 500);
  }

  window.updateSlug = updateSlug;
  window.checkSlug = checkSlug;

  $('#orgName').on('input', function () { updateSlug($(this).val()); });
  $('#orgSlug').on('input', function () { checkSlug($(this).val()); });

  /* ═══ MODE SELECT ═══ */
  function selectMode(el) {
    $('.mode-pick-card').removeClass('selected');
    $(el).addClass('selected');
    $('#step5Btn').prop('disabled', false);
  }

  window.selectMode = selectMode;

  /* ═══ THEME PREF ═══ */
  function selectThemePref(el, pref) {
    $('.theme-card').removeClass('selected');
    $(el).addClass('selected');
    if (pref !== 'system') applyTheme(pref);
  }

  window.selectThemePref = selectThemePref;

  /* ═══ FONT ═══ */
  function selectFont(el) {
    $('.font-opt').removeClass('selected');
    $(el).addClass('selected');
  }

  window.selectFont = selectFont;

  /* ═══ PILL TOGGLE ═══ */
  function togglePill(el) { $(el).toggleClass('on'); }
  window.togglePill = togglePill;

  /* ═══ INVITE CHIPS ═══ */
  const inviteEmails = [];

  function handleInviteKey(e) {
    const $input = $('#inviteInput');
    if ((e.key === 'Enter' || e.key === ',') && $input.val().trim()) {
      e.preventDefault();
      const email = $input.val().trim().replace(/,/g, '');
      if (email.includes('@') && !inviteEmails.includes(email)) {
        inviteEmails.push(email);
        const $chip = $('<div class="invite-chip"><span>' + $('<div>').text(email).html() + '</span><span class="invite-chip-remove" data-email="' + $('<div>').text(email).html() + '">×</span></div>');
        $chip.insertBefore($input);
      }
      $input.val('');
    }
  }

  window.handleInviteKey = handleInviteKey;

  $('#inviteInput').on('keydown', handleInviteKey);

  $(document).on('click', '.invite-chip-remove', function () {
    const email = $(this).data('email');
    inviteEmails.splice(inviteEmails.indexOf(email), 1);
    $(this).parent().remove();
  });

  $('#inviteChips').on('click', function () { $('#inviteInput').focus(); });

  /* ═══ COPY LINK ═══ */
  function copyLink(btn) {
    $(btn).text('Copied! ✓').css('color', 'var(--mint)');
    setTimeout(function () {
      $(btn).text('Copy link').css('color', '');
    }, 2000);
  }

  window.copyLink = copyLink;

  /* ═══ LAUNCH ═══ */
  function launchWorkspace() {
    const $btn = $('.btn-launch');
    $btn.text('🎉 Launching...').css('pointer-events', 'none');
    setTimeout(function () { window.location.href = 'app.html'; }, 1000);
  }

  window.launchWorkspace = launchWorkspace;

  /* social buttons on step 1 */
  $(document).on('click', '.social-btn', function () { goNext(); });

});

// ═══ DATA-ACTION DELEGATION ═══
$(document).on('click', '[data-action]', function () {
  var self = this;
  var action = $(self).data('action');
  switch (action) {
    case 'goNext':          goNext(); break;
    case 'goPrev':          goPrev(); break;
    case 'toggleTag':       toggleTag(self); break;
    case 'selectMode':      selectMode(self); break;
    case 'selectFont':      selectFont(self); break;
    case 'togglePill':      togglePill(self); break;
    case 'startResendTimer':startResendTimer(); break;
    case 'copyLink':        copyLink(self); break;
    case 'launchWorkspace': launchWorkspace(); break;
    case 'selectCard': {
      var group = $(self).data('group');
      selectCard(self, group);
      break;
    }
    case 'selectThemePref': {
      var pref = $(self).data('pref');
      selectThemePref(self, pref);
      break;
    }
  }
});

// OTP input delegation
$(document).on('input', '[data-otp-idx]', function () {
  var idx = parseInt($(this).data('otp-idx'), 10);
  otpInput(idx, this);
});

