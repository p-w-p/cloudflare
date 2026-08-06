addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const ASSET_BASE = 'https://cdn.jsdelivr.net/gh/p-w-p/cloudflare@master';
const SHARED_CSS = ASSET_BASE + '/assets/css/shared.css';
const THEME_JS = ASSET_BASE + '/assets/js/theme.js';
const PAGE_UTILS_JS = ASSET_BASE + '/assets/js/page-utils.js';
const RIGHT_IMAGE = ASSET_BASE + '/assets/images/cdn_page.png';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const wantsJson = url.searchParams.get('mode') === 'json' || (request.headers.get('accept') || '').includes('application/json');

  const host = request.headers.get('host') || url.hostname || 'unknown-host';
  const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
  const rayId = request.headers.get('cf-ray') || 'unknown';
  const colo = (request.cf && request.cf.colo) || 'unknown';
  const country = (request.cf && request.cf.country) || 'unknown';
  const city = (request.cf && request.cf.city) || 'unknown';
  const cdnEnabled = true;
  const status = cdnEnabled ? 'CDN启用' : '未启用CDN';

  if (wantsJson) {
    const body = JSON.stringify({
      status,
      cdnip: clientIp,
      rayId,
      colo,
      country,
      city,
      host
    }, null, 0);

    return new Response(body, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*'
      }
    });
  }

  const hostText = escapeHtml(host);
  const heroText = '欢迎来访吖(づ￣ 3￣)づ';
  const infoText = `欢迎来到${hostText}的CDN信息显示页面吖ˋ( ° ▽、° )`;

  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
    <title>CDN PAGE | ${hostText}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,900" rel="stylesheet">
    <link rel="stylesheet" href="${SHARED_CSS}">
    <style>
      :root {
        color-scheme: light;
      }

      body {
        background:
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.78) 40%, rgba(248, 250, 252, 1) 100%),
          #f8fafc;
      }

      .page-shell {
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }

      .page-shell::before,
      .page-shell::after {
        content: '';
        position: absolute;
        inset: auto;
        border-radius: 999px;
        pointer-events: none;
        filter: blur(10px);
        opacity: 0.55;
      }

      .page-shell::before {
        width: 18rem;
        height: 18rem;
        top: -6rem;
        left: -5rem;
        background: rgba(56, 189, 248, 0.18);
      }

      .page-shell::after {
        width: 22rem;
        height: 22rem;
        right: -8rem;
        bottom: -8rem;
        background: rgba(59, 130, 246, 0.14);
      }

      .content-panel {
        position: relative;
        z-index: 1;
        padding: clamp(0.9rem, 2.2vw, 1.5rem);
      }

      .info-card {
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(148, 163, 184, 0.28);
        border-radius: 28px;
        padding: clamp(1.1rem, 2.4vw, 1.7rem);
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
        backdrop-filter: blur(14px);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: rgba(56, 189, 248, 0.12);
        color: #075985;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .eyebrow::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: #0ea5e9;
        box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.16);
      }

      .hero-title {
        margin: 0.7rem 0 0.5rem;
        font-size: clamp(1.65rem, 3.2vw, 2.8rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
        color: #0f172a;
      }

      .domain-highlight {
        margin-top: 0.65rem;
        padding: 0.7rem 0.85rem;
        border-radius: 16px;
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.06));
        border: 1px solid rgba(14, 165, 233, 0.16);
        color: #0f172a;
        font-size: 0.93rem;
        line-height: 1.55;
      }

      .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.65rem;
        margin-top: 0.85rem;
      }

      .metric {
        padding: 0.75rem 0.85rem;
        border-radius: 16px;
        background: #ffffff;
        border: 1px solid rgba(148, 163, 184, 0.22);
      }

      .metric-label {
        display: block;
        color: #64748b;
        font-size: 0.72rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 0.25rem;
      }

      .metric-value {
        display: block;
        color: #0f172a;
        font-size: 0.92rem;
        font-weight: 700;
        line-height: 1.3;
        word-break: break-word;
      }

      .footer-stack {
        margin-top: 0.85rem;
        display: grid;
        gap: 0.55rem;
      }

      .sub-footer {
        margin-top: 0;
      }

      .sub-footer ul {
        margin: 0;
      }

      .right-sec {
        position: relative;
        min-height: 34vh;
        overflow: hidden;
      }

      .right-sec::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.06), rgba(15, 23, 42, 0.28));
        pointer-events: none;
      }

      @media (max-width: 767px) {
        .page-shell {
          display: flex;
          flex-direction: column;
        }

        .content-panel {
          order: 2;
        }

        .right-sec {
          order: 1;
          min-height: 30vh;
        }

        .metric-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
</head>
<body class="antialiased font-sans">
    <div class="md:flex min-h-screen main-body page-shell">
        <div class="w-full md:w-1/2 flex items-center justify-center left-sec content-panel">
            <div class="max-w-sm m-8 content-body info-card">
                <span class="eyebrow">Cloudflare Edge Page</span>
                <div class="hero-title">${heroText}</div>
                <div class="domain-highlight">
                    <h1 class="oops" data-domain-text="${infoText}">${infoText}</h1>
                </div>
                <div class="metric-grid">
                    <div class="metric">
                        <span class="metric-label">节点</span>
                        <span class="metric-value" id="cdn">${escapeHtml(colo)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">状态</span>
                        <span class="metric-value">${escapeHtml(status)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">客户端 IP</span>
                        <span class="metric-value">${escapeHtml(clientIp)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Ray ID</span>
                        <span class="metric-value">${escapeHtml(rayId)}</span>
                    </div>
                </div>
                <div class="footer-stack">
                    <div class="sub-footer">
                        <div class="w-full h-2 bg-grey-light my-3 md:my-6"></div>
                        <p id="footer_data">${escapeHtml(status)} • 回源节点：${escapeHtml(colo)} • 您的 IP：${escapeHtml(clientIp)} • Performance &amp; Security by Cloudflare</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2 right-sec" style="background-image: url('${RIGHT_IMAGE}'); background-size: cover; background-position: center center;">
        </div>
    </div>
    <script defer src="${THEME_JS}"></script>
    <script defer src="${PAGE_UTILS_JS}"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'no-store'
    }
  });
}
