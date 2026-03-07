
    // ── THEME (localStorage persistent) ──────────────────────────────
    const LS_THEME = 'thread_theme';
    function getTheme() { return localStorage.getItem(LS_THEME) || 'light'; }
    function applyTheme(t) {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(LS_THEME, t);
      document.getElementById('themeIcon').className = t === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    }
    applyTheme(getTheme());
    document.getElementById('themeToggle').addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));

    // ── NAV SCROLL ───────────────────────────────────────────────────
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── MOBILE NAV ───────────────────────────────────────────────────
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('mobileNav').classList.toggle('open');
    });
    function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }

    // ── REVEAL ON SCROLL ─────────────────────────────────────────────
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── MODE TABS ────────────────────────────────────────────────────
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('mode-' + tab.dataset.mode).classList.add('active');
      });
    });

    // ── AI DEMO CHIPS ────────────────────────────────────────────────
    document.querySelectorAll('.ai-cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.ai-cmd-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        document.getElementById('aiCommandText').textContent = chip.dataset.cmd;
        const resp = chip.dataset.resp.replace(/\\n/g, '\n');
        const el = document.getElementById('aiResponse');
        el.style.opacity = '0';
        setTimeout(() => { el.textContent = resp; el.style.opacity = '1'; el.style.transition = 'opacity .4s'; }, 200);
      });
    });

    // ── PRICING TOGGLE ───────────────────────────────────────────────
    let annual = false;
    function toggleBilling() {
      annual = !annual;
      document.getElementById('billingToggle').classList.toggle('on', annual);
      document.getElementById('savingsBadge').style.opacity = annual ? '1' : '0';
      document.getElementById('price-solo').innerHTML = `<sup>$</sup>0<span class="period">/mo</span>`;
      document.getElementById('price-team').innerHTML = annual
        ? `<sup>$</sup>14<span class="period">/user/mo</span>`
        : `<sup>$</sup>18<span class="period">/user/mo</span>`;
    }

    // ── FAQ ACCORDION ────────────────────────────────────────────────
    function toggleFaq(el) {
      const item = el.parentElement;
      const a = item.querySelector('.faq-a');
      const inner = item.querySelector('.faq-a-inner');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-a').style.height = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.height = inner.offsetHeight + 'px';
      }
    }
    // Init first open
    const firstFaq = document.querySelector('.faq-item.open');
    if (firstFaq) { const inner = firstFaq.querySelector('.faq-a-inner'); firstFaq.querySelector('.faq-a').style.height = inner.offsetHeight + 20 + 'px'; }

    // ── CTA EMAIL SIGNUP ─────────────────────────────────────────────
    function handleSignup(btn) {
      const email = document.getElementById('ctaEmail').value.trim();
      if (!email || !email.includes('@')) { document.getElementById('ctaEmail').style.borderColor = 'var(--blush)'; return; }
      // Save email to localStorage
      const signups = JSON.parse(localStorage.getItem('thread_signups') || '[]');
      if (!signups.includes(email)) { signups.push(email); localStorage.setItem('thread_signups', JSON.stringify(signups)); }
      btn.innerHTML = '<i class="ri-check-line"></i> You\'re on the list!';
      btn.style.background = 'var(--mint)';
      btn.disabled = true;
      document.getElementById('ctaEmail').value = '';
      setTimeout(() => window.location.href = 'onboarding.html', 1200);
    }
  