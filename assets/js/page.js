(function () {
  // Theme handling
  function isDarkMode() {
    var hour = new Date().getHours();
    return hour < 5 || hour > 19 || window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme() {
    document.body.classList.toggle('dark-mode', isDarkMode());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    applyTheme();
  }

  // Domain text replacement
  function getDisplayDomain() {
    return window.location.hostname || window.location.host || 'localhost';
  }

  function applyDomainText() {
    var domain = getDisplayDomain();

    document.querySelectorAll('[data-domain-text]').forEach(function (element) {
      var template = element.getAttribute('data-domain-text') || '';
      element.textContent = template.replace(/\$\{hostText\}/gi, domain);
    });

    document.querySelectorAll('[data-domain-host]').forEach(function (element) {
      element.textContent = domain;
    });

    var domainName = document.getElementById('domainName');
    if (domainName) {
      domainName.textContent = domain;
    }

    if (document.title) {
      document.title = document.title.replace(/\$\{hostText\}/gi, domain);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDomainText, { once: true });
  } else {
    applyDomainText();
  }

  // Page rendering
  var root = document.getElementById('page-root');
  var configEl = document.getElementById('page-config');

  if (!root || !configEl) {
    return;
  }

  var config = JSON.parse(configEl.textContent || '{}');
  var title = config.title || 'Cloudflare Page';
  var hero = config.hero || '';
  var accent = config.accent || 'blue';
  var messageHtml = config.messageHtml || '<p class="page-summary">页面内容暂时不可用。</p>';
  var contentHtml = config.contentHtml || '';
  var footerHtml = config.footerHtml || [
    '<div class="sub-footer">',
    '  <div class="footer-divider"></div>',
    '  <div class="footer-chips">',
    '    <span>Cloudflare事件ID: ::RAY_ID::</span>',
    '    <span>你的IP: ::CLIENT_IP::</span>',
    '    <span>Performance & Security by Cloudflare</span>',
    '  </div>',
    '</div>'
  ].join('');

  document.title = title;

  if (config.image) {
    var style = document.createElement('style');
    style.textContent = '.right-sec { background-image: url("' + config.image + '"); background-size: cover; background-position: center center; }';
    document.head.appendChild(style);
  }

  root.innerHTML = [
    '<div class="md:flex min-h-screen main-body page-shell accent-' + accent + '">',
    '  <div class="w-full md:w-1/2 flex items-center justify-center left-sec content-panel">',
    '    <div class="max-w-sm m-8 content-body info-card">',
    '      <span class="eyebrow">Cloudflare Edge</span>',
    '      <div class="hero-title">' + hero + '</div>',
    '      <div class="domain-highlight">',
    '        <div class="sub-header">' + messageHtml + '</div>',
    '      </div>',
    '      <div class="page-body">',
    '        ' + contentHtml,
    '      </div>',
    '      <div class="footer-stack">',
    '        ' + footerHtml,
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2 right-sec">',
    '    <div class="right-overlay"></div>',
    '  </div>',
    '</div>'
  ].join('');
})();