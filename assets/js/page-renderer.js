(function () {
  var root = document.getElementById('page-root');
  var configEl = document.getElementById('page-config');

  if (!root || !configEl) {
    return;
  }

  var config = JSON.parse(configEl.textContent || '{}');
  var title = config.title || 'Cloudflare Page';
  var hero = config.hero || '';
  var messageHtml = config.messageHtml || '<h1 class="oops"></h1>';
  var contentHtml = config.contentHtml || '';
  var footerHtml = config.footerHtml || [
    '<div class="sub-footer">',
    '  <div class="w-full h-2 bg-grey-light my-3 md:my-6"></div>',
    '  <ul>',
    '    <li>Cloudflare事件ID: ::RAY_ID::</li>',
    '    <li>你的IP: ::CLIENT_IP::</li>',
    '    <li>Performance &amp; Security by Cloudflare</li>',
    '  </ul>',
    '</div>'
  ].join('');

  document.title = title;

  if (config.image) {
    var style = document.createElement('style');
    style.textContent = '.right-sec { background-image: url("' + config.image + '"); background-size: 100% 100%; }';
    document.head.appendChild(style);
  }

  root.innerHTML = [
    '<div class="md:flex min-h-screen main-body">',
    '  <div class="w-full md:w-1/2 flex items-center justify-center left-sec">',
    '    <div class="max-w-sm m-8 content-body">',
    '      <div class="text-5xl md:text-15xl font-black">' + hero + '</div>',
    '      <p class="text-grey-darker text-2xl md:text-3xl mb-7 leading-normal"></p>',
    '      <div class="sub-header">' + messageHtml + '</div>',
    '      <br><br>',
    '      ' + contentHtml,
    '      ' + footerHtml,
    '    </div>',
    '  </div>',
    '  <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2 right-sec"></div>',
    '</div>'
  ].join('');
})();
