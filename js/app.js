$(function () {

  /* ═══ THEME ═══ */
  let theme = localStorage.getItem('tws-theme') || 'light';
  applyTheme(theme);

  function applyTheme(t) {
    $('html').attr('data-theme', t);
    theme = t;
    localStorage.setItem('tws-theme', t);
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(next === 'dark' ? 'Dark mode on 🌙' : 'Light mode on ☀️', '');
  }

  window.toggleTheme = toggleTheme;

  /* ═══ VIEW SWITCHING ═══ */
  function showDashboard() {
    $('#dashboardView').css('display', 'flex');
    $('#editorView').css('display', 'none');
    $('.nav-item').removeClass('active');
    $('.nav-item:first-child').addClass('active');
  }

  function showEditorFromNav() { openDoc('The Future of Local Journalism', 'draft'); }
  function showEditorWithReview() { openDoc('Q4 Editorial Report', 'review'); }

  window.showDashboard = showDashboard;
  window.showEditorFromNav = showEditorFromNav;
  window.showEditorWithReview = showEditorWithReview;

  /* ═══ OPEN DOCUMENT ═══ */
  const docContents = {
    'Q4 Editorial Report': '<p>This report covers the editorial performance of City Beat Newsroom for Q4 2025. It includes story output metrics, team productivity analysis, and recommendations for Q1 2026 planning.</p><h2>Key Metrics</h2><p>Our team published 127 stories in Q4, a 14% increase from Q3. Breaking news response time improved to an average of 23 minutes from tip to publication — our best ever figure.</p>',
    'Interview: Mayor Williams': '<p>Mayor Sarah Williams sat down with City Beat for an exclusive 90-minute interview covering the city\'s response to the affordable housing crisis, her first major policy interview since the November election.</p><h2>On the Housing Bill</h2><p>"We\'ve been talking about this for fifteen years," the Mayor said. "The bill that passed this week is just the beginning. We need 3,000 new affordable units by 2028, and we have a plan to get there."</p>'
  };

  const statusMap = {
    draft:    { label: 'Draft',             cls: 'badge-draft'    },
    review:   { label: 'In Review',         cls: 'badge-review'   },
    approved: { label: 'Approved',          cls: 'badge-approved' },
    published:{ label: 'Published',         cls: 'badge-published'},
    revision: { label: 'Revision Requested',cls: 'badge-revision' }
  };

  function openDoc(title, status) {
    $('#dashboardView').css('display', 'none');
    $('#editorView').css('display', 'flex');
    $('#docTitleInput').val(title);

    const s = statusMap[status] || statusMap.draft;
    $('#docBadgeContainer').html('<span class="doc-badge ' + s.cls + '">' + s.label + '</span>');

    if (docContents[title]) {
      $('#docContent').html(docContents[title]);
    }

    updateWordCount();

    $('.nav-item').each(function () {
      $(this).toggleClass('active', $(this).text().trim().startsWith('📝'));
    });

    showToast('Opened "' + title + '"', '📄');
  }

  window.openDoc = openDoc;

  /* ═══ SIDEBAR TOGGLE ═══ */
  let sidebarCollapsed = false;

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    $('#sidebar').toggleClass('collapsed', sidebarCollapsed);
    $('.sidebar-collapse-btn span:first-child').text(sidebarCollapsed ? '▶' : '◀');
  }

  window.toggleSidebar = toggleSidebar;

  /* ═══ CONTEXT PANEL ═══ */
  let panelVisible = true;

  function toggleContextPanel() {
    panelVisible = !panelVisible;
    $('#contextPanel').toggleClass('hidden', !panelVisible);
  }

  function openPanelTab(tab) {
    if (!panelVisible) {
      panelVisible = true;
      $('#contextPanel').removeClass('hidden');
    }
    $('.panel-tab').removeClass('active');
    $('.panel-section').removeClass('active');
    const cap = tab.charAt(0).toUpperCase() + tab.slice(1);
    $('#tab' + cap).addClass('active');
    $('#panel' + cap).addClass('active');
  }

  window.toggleContextPanel = toggleContextPanel;
  window.openPanelTab = openPanelTab;

  /* ═══ WORD COUNT ═══ */
  function updateWordCount() {
    const text = $('#docContent').prop('innerText') || '';
    const words = text.trim().split(/\s+/).filter(function (w) { return w.length > 0; }).length;
    const mins = Math.ceil(words / 200);
    $('#wordCount').text(words.toLocaleString());
    $('#readTime').text(mins);
    $('#statusWordCount').text(words.toLocaleString() + ' words');
    $('#statusReadTime').text(mins + ' min read');
  }

  window.updateWordCount = updateWordCount;

  /* ═══ AUTOSAVE ═══ */
  let saveTimeout;

  function triggerAutosave() {
    $('#saveDot, #editSaveDot').addClass('saving');
    $('#saveStatus').html('<span class="status-dot saving" id="saveDot"></span>Saving...');
    $('#editSaveLabel').text('Saving...');
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function () {
      $('#saveDot, #editSaveDot').removeClass('saving');
      $('#saveStatus').html('<span class="status-dot" id="saveDot"></span>Saved');
      $('#editSaveLabel').text('Saved');
    }, 1200);
  }

  window.triggerAutosave = triggerAutosave;

  $('#docContent').on('input', function () { updateWordCount(); triggerAutosave(); });
  $('#docTitleInput').on('input', function () { triggerAutosave(); });

  /* ═══ FORMATTING ═══ */
  function toggleFormat(cmd) {
    const content = document.getElementById('docContent');
    if (!content) return;
    content.focus();
    if (cmd === 'strikethrough') {
      document.execCommand('strikethrough');
    } else if (cmd === 'code') {
      const sel = window.getSelection();
      if (sel.toString()) {
        const range = sel.getRangeAt(0);
        const code = document.createElement('code');
        range.surroundContents(code);
      }
    } else {
      document.execCommand(cmd);
    }
    const btnMap = { bold: 'tbBold', italic: 'tbItalic', underline: 'tbUnderline' };
    if (btnMap[cmd]) {
      $('#' + btnMap[cmd]).toggleClass('active', document.queryCommandState(cmd));
    }
    triggerAutosave();
  }

  function applyHeading(val) {
    const content = document.getElementById('docContent');
    if (!content) return;
    content.focus();
    document.execCommand('formatBlock', false, val === 'p' ? 'p' : val);
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    if (url) document.execCommand('createLink', false, url);
  }

  function insertBlockquote() {
    document.getElementById('docContent').focus();
    document.execCommand('formatBlock', false, 'blockquote');
  }

  function insertList(type) {
    document.getElementById('docContent').focus();
    if (type === 'ul') document.execCommand('insertUnorderedList');
    else document.execCommand('insertOrderedList');
  }

  window.toggleFormat = toggleFormat;
  window.applyHeading = applyHeading;
  window.insertLink = insertLink;
  window.insertBlockquote = insertBlockquote;
  window.insertList = insertList;

  /* ═══ AI RESPONSES ═══ */
  const aiResponses = {
    continue:  'The revenue models are experimental: membership fees, foundation grants, events, and increasingly, a hybrid approach that combines several streams. None of them are easy. But many are surviving — and a handful are genuinely thriving.',
    improve:   '✨ Suggested improvement:\n\nConsider restructuring your opening paragraph to lead with the most striking statistic (2,500 newspapers lost) before contextualizing it. The impact will land harder.',
    shorten:   '📝 Shortened version:\n\nLocal journalism is disappearing at alarming speed. Since 2005, 2,500+ newspapers have closed. But in the ruins, independent journalists are building a new model — nonprofit, local, and increasingly viable.',
    headline:  '📰 5 Headline Options:\n1. After the Newsroom: Who Covers Your Town Now?\n2. 2,500 Newspapers Gone. What Comes Next?\n3. The Journalists Rebuilding Local News from Scratch\n4. \'News Deserts\' Are Spreading — But So Is a Solution\n5. The Death and Quiet Rebirth of Local Journalism',
    summarize: '📋 Summary:\n\nLocal newspapers in the US have declined sharply since 2005, creating "news deserts" and weakening civic accountability. Despite this, independent journalists and nonprofit newsrooms are emerging with new, community-first models that are showing early signs of sustainability.',
    research:  '🔍 Found in Knowledge Base:\n• AP Style Guide: Attribution format for quotes\n• Source Library: Reuters Institute News Report 2024\n• Related docs: \'Media Consolidation Briefing\' (2025)'
  };

  function runAICommand(cmd) {
    const cmdLabels = { continue: '/ continue', improve: '/ improve', shorten: '/ shorten', headline: '/ headline', summarize: '/ summarize', research: '/ research' };
    const $chat = $('#aiChat');
    $chat.append('<div class="ai-msg user">' + (cmdLabels[cmd] || cmd) + '</div>');
    const $typing = $('<div class="ai-typing"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div>');
    $chat.append($typing);
    $chat.scrollTop($chat[0].scrollHeight);

    setTimeout(function () {
      $typing.remove();
      const $msg = $('<div class="ai-msg ai"></div>').text(aiResponses[cmd] || 'I\'ve analyzed your document and here are my suggestions...').css('white-space', 'pre-wrap');
      $chat.append($msg);
      $chat.scrollTop($chat[0].scrollHeight);
    }, 1200);

    openPanelTab('ai');
  }

  window.runAICommand = runAICommand;

  function sendAIMsg() {
    const $input = $('#aiMsgInput');
    const msg = $input.val().trim();
    if (!msg) return;
    const $chat = $('#aiChat');
    $chat.append('<div class="ai-msg user">' + $('<div>').text(msg).html() + '</div>');
    $input.val('');

    const $typing = $('<div class="ai-typing"><div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div></div>');
    $chat.append($typing);
    $chat.scrollTop($chat[0].scrollHeight);

    const rsp = [
      "Good question! Based on your draft, I'd suggest adding more specific data points in paragraph 2 to strengthen your argument.",
      "That's a great direction — want me to write a draft of that section?",
      "Looking at your document context, here's what I'd recommend...",
      "I can help with that. Your current structure is strong, but consider adding a transition sentence between sections 2 and 3."
    ];

    setTimeout(function () {
      $typing.remove();
      $chat.append('<div class="ai-msg ai">' + rsp[Math.floor(Math.random() * rsp.length)] + '</div>');
      $chat.scrollTop($chat[0].scrollHeight);
    }, 1000);
  }

  window.sendAIMsg = sendAIMsg;

  function triggerAI() {
    openPanelTab('ai');
    showToast('AI panel opened — try / commands!', '✦');
  }

  window.triggerAI = triggerAI;

  $('#aiMsgInput').on('keydown', function (e) {
    if (e.key === 'Enter') sendAIMsg();
  });

  /* ═══ RESEARCH ═══ */
  function doResearch() {
    const q = $('#researchInput').val().trim();
    if (!q) return;
    const $results = $('#researchResults');
    $results.html('<div style="font-size:12px;color:var(--text3);padding:8px 0">🔍 Searching...</div>');
    setTimeout(function () {
      $results.html(
        '<div style="font-size:12px;font-weight:600;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.07em">Results for "' + $('<div>').text(q).html() + '"</div>' +
        '<div class="source-card"><div class="source-domain">The Guardian</div><div class="source-title">' + $('<div>').text(q).html() + ': A Comprehensive Overview</div><div class="source-excerpt">An in-depth analysis featuring interviews with experts and primary source data.</div><div class="source-actions"><div class="source-action" onclick="showToast(\'Citation copied\',\'📎\')">Cite</div><div class="source-action">Copy</div><div class="source-action">View</div></div></div>' +
        '<div class="source-card"><div class="source-domain">Reuters</div><div class="source-title">Latest developments in ' + $('<div>').text(q).html() + '</div><div class="source-excerpt">Breaking updates and analysis on the topic from our global network of correspondents.</div><div class="source-actions"><div class="source-action" onclick="showToast(\'Citation copied\',\'📎\')">Cite</div><div class="source-action">Copy</div><div class="source-action">View</div></div></div>'
      );
    }, 800);
  }

  window.doResearch = doResearch;

  $('#researchInput').on('keydown', function (e) {
    if (e.key === 'Enter') doResearch();
  });

  /* ═══ WORKFLOW ═══ */
  const badgeMap = { Idea: '', Draft: 'badge-draft', 'In Review': 'badge-review', Revision: 'badge-revision', Approved: 'badge-approved', Published: 'badge-published' };

  function setWorkflowState(el, state) {
    $('.wf-state').removeClass('current').find('.wf-check').remove();
    $(el).addClass('current').append('<div class="wf-check">●</div>');
    showToast('Status set to "' + state + '"', '📋');
    if (badgeMap[state] !== undefined) {
      $('#docBadgeContainer').html(state ? '<span class="doc-badge ' + badgeMap[state] + '">' + state + '</span>' : '');
    }
  }

  function submitForReview() {
    showToast('Submitted for editorial review!', '✅');
    $('.wf-state').removeClass('current').find('.wf-check').remove();
    $('.wf-state').each(function () {
      if ($(this).find('.wf-state-name').text() === 'In Review') {
        $(this).addClass('current').append('<div class="wf-check">●</div>');
      }
    });
    $('#docBadgeContainer').html('<span class="doc-badge badge-review">In Review</span>');
  }

  window.setWorkflowState = setWorkflowState;
  window.submitForReview = submitForReview;

  /* ═══ COMMENTS ═══ */
  function resolveComment(el) {
    $(el).closest('.comment-item').css('opacity', '0.4');
    $(el).text('✓ Resolved').css({ color: 'var(--text3)', cursor: 'default' });
    showToast('Comment resolved', '✅');
  }

  window.resolveComment = resolveComment;

  /* ═══ MODAL ═══ */
  function openNewDocModal() {
    $('#newDocModal').css('display', 'flex');
    setTimeout(function () { $('#newDocTitle').focus(); }, 100);
  }

  function closeModal(e, id) {
    if (e.target === e.currentTarget) $('#' + id).css('display', 'none');
  }

  function createDoc() {
    const title = $('#newDocTitle').val().trim() || 'Untitled Document';
    $('#newDocModal').css('display', 'none');
    openDoc(title, 'draft');
    $('#docContent').html('<p></p>').focus();
  }

  window.openNewDocModal = openNewDocModal;
  window.closeModal = closeModal;
  window.createDoc = createDoc;

  $('#newDocTitle').on('keydown', function (e) {
    if (e.key === 'Enter') createDoc();
  });

  /* ═══ NOTIFICATIONS ═══ */
  function openNotifications() { $('#notifModal').css('display', 'flex'); }
  window.openNotifications = openNotifications;

  /* ═══ CMD PALETTE ═══ */
  const cmdItems = [
    { icon: '📝', text: 'New Document',         desc: 'Create a new blank document',              action: function () { openNewDocModal(); } },
    { icon: '🏠', text: 'Go to Dashboard',       desc: 'Back to your main workspace',              action: function () { showDashboard(); } },
    { icon: '📰', text: 'Open Cover Story',      desc: 'The Future of Local Journalism',           action: function () { openDoc('The Future of Local Journalism', 'draft'); } },
    { icon: '✦',  text: 'AI: Continue writing', desc: 'Let AI continue your current paragraph',   action: function () { runAICommand('continue'); } },
    { icon: '✦',  text: 'AI: Improve selection',desc: 'Rewrite for clarity and flow',             action: function () { runAICommand('improve'); } },
    { icon: '✦',  text: 'AI: Generate headlines',desc: '5 headline options for your story',       action: function () { runAICommand('headline'); } },
    { icon: '🔍', text: 'Open Research Panel',   desc: 'Search web and pin sources',              action: function () { openPanelTab('research'); } },
    { icon: '📋', text: 'View Review Queue',      desc: '3 documents pending review',              action: function () { showEditorWithReview(); } },
    { icon: '🌙', text: 'Toggle dark mode',       desc: 'Switch between light and dark theme',     action: function () { toggleTheme(); } },
    { icon: '🔔', text: 'Notifications',          desc: 'View your recent notifications',          action: function () { openNotifications(); } }
  ];

  let cmdIdx = 0;
  let filteredCmds = cmdItems;

  function openCmdPalette() {
    $('#cmdPalette').css('display', 'flex');
    filterCmd('');
    setTimeout(function () { $('#cmdInput').focus(); }, 50);
  }

  function closeCmdPalette() { $('#cmdPalette').css('display', 'none'); }

  function filterCmd(q) {
    filteredCmds = q
      ? cmdItems.filter(function (i) {
          return i.text.toLowerCase().includes(q.toLowerCase()) || i.desc.toLowerCase().includes(q.toLowerCase());
        })
      : cmdItems;
    cmdIdx = 0;
    const html = filteredCmds.map(function (item, i) {
      return '<div class="cmd-item' + (i === 0 ? ' selected' : '') + '" data-idx="' + i + '">' +
        '<div class="cmd-item-icon">' + item.icon + '</div>' +
        '<div><div class="cmd-item-text">' + item.text + '</div><div class="cmd-item-desc">' + item.desc + '</div></div>' +
        '</div>';
    }).join('');
    $('#cmdResults').html(html);
  }

  window.openCmdPalette = openCmdPalette;
  window.closeCmdPalette = closeCmdPalette;
  window.filterCmd = filterCmd;

  $(document).on('click', '#cmdResults .cmd-item', function () {
    const idx = parseInt($(this).data('idx'), 10);
    closeCmdPalette();
    if (filteredCmds[idx]) filteredCmds[idx].action();
  });

  $('#cmdPalette').on('click', function (e) {
    if (e.target === this) closeCmdPalette();
  });

  $('#cmdInput').on('input', function () { filterCmd($(this).val()); });

  $('#cmdInput').on('keydown', function (e) {
    const $items = $('#cmdResults .cmd-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      $items.eq(cmdIdx).removeClass('selected');
      cmdIdx = Math.min(cmdIdx + 1, $items.length - 1);
      $items.eq(cmdIdx).addClass('selected')[0].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      $items.eq(cmdIdx).removeClass('selected');
      cmdIdx = Math.max(cmdIdx - 1, 0);
      $items.eq(cmdIdx).addClass('selected')[0].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      $items.eq(cmdIdx).trigger('click');
    } else if (e.key === 'Escape') {
      closeCmdPalette();
    }
  });

  $(document).on('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openCmdPalette();
    }
    if (e.key === 'Escape') closeCmdPalette();
  });

  /* ═══ SEARCH BAR CLICK ═══ */
  $('#searchBarBtn').on('click', function () { openCmdPalette(); });

  /* ═══ TOAST ═══ */
  let toastTimeout;

  function showToast(msg, icon) {
    $('.toast').remove();
    const $toast = $('<div class="toast">' + (icon ? '<span>' + icon + '</span>' : '') + '<span>' + msg + '</span></div>');
    $('body').append($toast);
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      $toast.addClass('hiding');
      setTimeout(function () { $toast.remove(); }, 300);
    }, 2500);
  }

  window.showToast = showToast;

  /* ═══ INIT ═══ */
  updateWordCount();
  showToast('Welcome back, Julia! 🎉', '✦');

});

// ═══ DATA-ACTION DELEGATION ═══
// Handles elements in app.html that use data-action="..." 
.on('click', '[data-action]', function () {
  var action = .data('action');
  switch (action) {
    case 'toggleTheme':       toggleTheme(); break;
    case 'openNotifications': openNotifications(); break;
    case 'profileToast':      showToast('Profile settings coming soon!', '👤'); break;
    case 'wsSwitcher':        showToast('Workspace switcher', '🏢'); break;
    case 'showDashboard':     showDashboard(); break;
    case 'showEditorFromNav': showEditorFromNav(); break;
    case 'kbToast':           showToast('Knowledge Base', '📚'); break;
    case 'showEditorWithReview': showEditorWithReview(); break;
    case 'toggleSidebar':     toggleSidebar(); break;
    case 'openNewDocModal':   openNewDocModal(); break;
    case 'submitForReview':   submitForReview(); break;
    case 'toggleContextPanel': toggleContextPanel(); break;
  }
});
