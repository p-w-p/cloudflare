(function () {
  function getDisplayDomain() {
    return window.location.hostname || window.location.host || 'localhost';
  }

  function applyDomainText() {
    var domain = getDisplayDomain();

    document.querySelectorAll('[data-domain-text]').forEach(function (element) {
      var template = element.getAttribute('data-domain-text') || '';
      element.textContent = template
        .replace(/\$\{hostText\}/gi, domain);
    });

    document.querySelectorAll('[data-domain-host]').forEach(function (element) {
      element.textContent = domain;
    });

    var domainName = document.getElementById('domainName');
    if (domainName) {
      domainName.textContent = domain;
    }

    if (document.title) {
      document.title = document.title
        .replace(/\$\{hostText\}/gi, domain);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDomainText, { once: true });
  } else {
    applyDomainText();
  }
})();
