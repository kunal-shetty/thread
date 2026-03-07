$(function () {

  /* ═══ THEME ═══ */
  let theme = localStorage.getItem('tws-theme') || 'light';
  applyTheme(theme);

  function applyTheme(t) {
    $('html').attr('data-theme', t);
    theme = t;
    localStorage.setItem('tws-theme', t);
    $('#themeToggle').text(t === 'dark' ? '☀️' : '🌸');
  }

  $('#themeToggle').on('click', function () {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  });

  /* ═══ SCROLL NAV ═══ */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 20) {
      $('nav').addClass('scrolled');
    } else {
      $('nav').removeClass('scrolled');
    }
  });

  /* ═══ MOBILE MENU ═══ */
  $('#hamburger').on('click', function () {
    $('#mobileMenu').toggleClass('open');
  });

  function closeMobile() {
    $('#mobileMenu').removeClass('open');
  }

  $('#mobileMenu a').on('click', function () {
    closeMobile();
  });

  /* ═══ MODE TABS ═══ */
  $('.mode-tab').on('click', function () {
    const mode = $(this).data('mode');
    $('.mode-tab').removeClass('active');
    $(this).addClass('active');
    $('.mode-panel').removeClass('active');
    $('#mode-' + mode).addClass('active');
  });

  /* ═══ AI DEMO ═══ */
  const aiDemoContent = {
    'continue': {
      cmd: 'continue',
      text: 'The rise of independent newsletters and community-funded reporting platforms suggests that audiences haven\'t lost their appetite for local news — they\'ve lost faith in the institutions that once delivered it. This gap represents both a crisis and an extraordinary opportunity.'
    },
    'improve': {
      cmd: 'improve',
      text: '✨ Suggested improvement: Consider leading with the most striking statistic (2,500 newspapers lost since 2005) before contextualizing it. The impact will land harder and immediately signal the scale of the crisis to readers.'
    },
    'shorten': {
      cmd: 'shorten',
      text: '📝 Shortened: Local journalism is disappearing fast. Since 2005, 2,500+ newspapers have closed. But in the ruins, independent journalists are quietly building a new model — nonprofit, hyper-local, and increasingly viable.'
    },
    'headline': {
      cmd: 'headline',
      text: '📰 5 Headline Options:\n1. After the Newsroom: Who Covers Your Town Now?\n2. 2,500 Newspapers Gone. What Comes Next?\n3. The Journalists Rebuilding Local News from Scratch\n4. News Deserts Are Spreading — But So Is a Solution\n5. The Death and Quiet Rebirth of Local Journalism'
    },
    'research': {
      cmd: 'research',
      text: '🔍 Found in Knowledge Base:\n• Reuters Institute Digital News Report 2024\n• Columbia Journalism Review: "News Desert" mapping\n• Local Media Association annual report\n• Related: "Media Consolidation Briefing 2025"'
    },
    'tone [formal]': {
      cmd: 'tone [formal]',
      text: '🎓 Formal tone applied: The accelerating attrition of regional and local print journalism since 2005 has produced a significant democratic deficit — one that independent, digitally-native newsrooms are now endeavouring to address through innovative funding and distribution strategies.'
    }
  };

  function switchAI(btn, cmd) {
    $('.ai-cmd-chip').removeClass('active');
    $(btn).addClass('active');
    const data = aiDemoContent[cmd] || aiDemoContent['continue'];
    $('#aiCommand').text(data.cmd);
    const $resp = $('#aiDemoResponse');
    $resp.css('opacity', 0);
    setTimeout(function () {
      $resp.text(data.text).animate({ opacity: 1 }, 300);
    }, 150);
  }

  // expose for onclick attributes on chip buttons
  window.switchAI = function (el, cmd) { switchAI(el, cmd); };

  // wire up via jQuery too
  $(document).on('click', '.ai-cmd-chip', function () {
    const cmd = $(this).text().replace(/^\/\s*/, '').trim();
    switchAI(this, cmd);
  });

  /* ═══ PRICING TOGGLE ═══ */
  const monthlyPrices = { solo: 0, team: 18, pro: 32 };
  const annualPrices  = { solo: 0, team: 13, pro: 23 };
  let isAnnual = false;

  $('#billingToggle').on('click', function () {
    isAnnual = !isAnnual;
    $(this).toggleClass('on', isAnnual);

    const prices = isAnnual ? annualPrices : monthlyPrices;
    $('#price-solo').text(prices.solo);
    $('#price-team').text(prices.team);

    if (isAnnual) {
      $('#savingsBadge').css('opacity', 1);
    } else {
      $('#savingsBadge').css('opacity', 0);
    }
  });

  /* ═══ FAQ ACCORDION ═══ */
  $(document).on('click', '.faq-q', function () {
    const $item = $(this).closest('.faq-item');
    $item.toggleClass('open');
  });

  /* ═══ CTA SIGNUP ═══ */
  $(document).on('click', '#ctaSignupBtn', function () {
    handleSignup(this);
  });

  function handleSignup(btn) {
    const email = $('#ctaEmail').val().trim();
    if (!email || !email.includes('@')) {
      $('#ctaEmail').css('border-color', 'var(--blush)');
      setTimeout(function () { $('#ctaEmail').css('border-color', ''); }, 1500);
      return;
    }
    $(btn).text('🎉 You\'re on the list!').prop('disabled', true);
    $('#ctaEmail').prop('disabled', true);
  }

  window.handleSignup = function (btn) { handleSignup(btn); };

  /* ═══ SCROLL REVEAL ═══ */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $('.reveal').each(function () {
      observer.observe(this);
    });
  } else {
    $('.reveal').addClass('visible');
  }

});
