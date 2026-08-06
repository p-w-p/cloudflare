const ASSET_BASE = 'https://cdn.jsdelivr.net/gh/p-w-p/cloudflare@master';
const SHARED_CSS = `${ASSET_BASE}/assets/css/shared.css`;
const RIGHT_IMAGE = `${ASSET_BASE}/assets/images/cdn_page.png`;

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, match => HTML_ESCAPES[match]);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const headers = request.headers;
    const accept = headers.get('accept') || '';
    
    const wantsJson = url.searchParams.get('mode') === 'json' || accept.includes('application/json');

    const host = headers.get('host') || url.hostname || 'unknown-host';
    const clientIp = headers.get('cf-connecting-ip') || headers.get('x-real-ip') || 'unknown';
    const rayId = headers.get('cf-ray') || 'unknown';
    
    const colo = request.cf?.colo || 'unknown';
    const country = request.cf?.country || 'unknown';
    const city = request.cf?.city || 'unknown';
    const status = 'CDN启用';

    if (wantsJson) {
      return new Response(JSON.stringify({
        status,
        cdnip: clientIp,
        rayId,
        colo,
        country,
        city,
        host
      }), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*'
        }
      });
    }

    const hostText = escapeHtml(host);
    const heroText = '欢迎来访吖(づ￣ 3￣)づ';
    const infoText = `欢迎来到 ${hostText} 的 CDN 信息显示页面吖ˋ( ° ▽、° )`;

    const html = `<!DOCTYPE html>
<html lang="zh">
<head>
    <title>CDN Info | ${hostText}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${SHARED_CSS}">
    <style>
      :root {
        color-scheme: light dark;
        
        --bg-main: #f8fafc;
        --bg-grad-1: rgba(255, 255, 255, 0.95);
        --bg-grad-2: rgba(241, 245, 249, 0.85);
        --blob-1: rgba(56, 189, 248, 0.18);
        --blob-2: rgba(99, 102, 241, 0.14);
        
        --card-bg: rgba(255, 255, 255, 0.88);
        --card-border: rgba(203, 213, 225, 0.6);
        --card-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
        
        --eyebrow-bg: rgba(56, 189, 248, 0.12);
        --eyebrow-text: #0284c7;
        --eyebrow-dot: #0ea5e9;
        --eyebrow-dot-shadow: rgba(14, 165, 233, 0.3);
        
        --text-main: #0f172a;
        --text-muted: #64748b;
        
        --highlight-bg-1: rgba(14, 165, 233, 0.06);
        --highlight-bg-2: rgba(99, 102, 241, 0.04);
        --highlight-border: rgba(14, 165, 233, 0.2);
        
        --metric-bg: rgba(255, 255, 255, 0.7);
        --metric-border: rgba(226, 232, 240, 0.8);
        --metric-hover-border: rgba(14, 165, 233, 0.3);
        
        --img-overlay-1: rgba(255, 255, 255, 0.05);
        --img-overlay-2: rgba(15, 23, 42, 0.25);
        --img-filter: none;
      }

      @media (prefers-color-scheme: dark) {
        :root:not(.light-mode) {
          --bg-main: #0b0f19;
          --bg-grad-1: rgba(15, 23, 42, 0.95);
          --bg-grad-2: rgba(11, 15, 25, 0.88);
          --blob-1: rgba(56, 189, 248, 0.15);
          --blob-2: rgba(129, 140, 248, 0.12);
          
          --card-bg: rgba(22, 30, 46, 0.75);
          --card-border: rgba(255, 255, 255, 0.08);
          --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          
          --eyebrow-bg: rgba(56, 189, 248, 0.14);
          --eyebrow-text: #38bdf8;
          --eyebrow-dot: #38bdf8;
          --eyebrow-dot-shadow: rgba(56, 189, 248, 0.5);
          
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          
          --highlight-bg-1: rgba(56, 189, 248, 0.08);
          --highlight-bg-2: rgba(99, 102, 241, 0.08);
          --highlight-border: rgba(56, 189, 248, 0.25);
          
          --metric-bg: rgba(15, 23, 42, 0.55);
          --metric-border: rgba(255, 255, 255, 0.06);
          --metric-hover-border: rgba(56, 189, 248, 0.4);
          
          --img-overlay-1: rgba(11, 15, 25, 0.4);
          --img-overlay-2: rgba(11, 15, 25, 0.85);
          --img-filter: brightness(0.85) contrast(1.05);
        }
      }

      html.dark-mode, body.dark-mode, html.dark, body.dark {
        --bg-main: #0b0f19;
        --bg-grad-1: rgba(15, 23, 42, 0.95);
        --bg-grad-2: rgba(11, 15, 25, 0.88);
        --blob-1: rgba(56, 189, 248, 0.15);
        --blob-2: rgba(129, 140, 248, 0.12);
        
        --card-bg: rgba(22, 30, 46, 0.75);
        --card-border: rgba(255, 255, 255, 0.08);
        --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        
        --eyebrow-bg: rgba(56, 189, 248, 0.14);
        --eyebrow-text: #38bdf8;
        --eyebrow-dot: #38bdf8;
        --eyebrow-dot-shadow: rgba(56, 189, 248, 0.5);
        
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        
        --highlight-bg-1: rgba(56, 189, 248, 0.08);
        --highlight-bg-2: rgba(99, 102, 241, 0.08);
        --highlight-border: rgba(56, 189, 248, 0.25);
        
        --metric-bg: rgba(15, 23, 42, 0.55);
        --metric-border: rgba(255, 255, 255, 0.06);
        --metric-hover-border: rgba(56, 189, 248, 0.4);
        
        --img-overlay-1: rgba(11, 15, 25, 0.4);
        --img-overlay-2: rgba(11, 15, 25, 0.85);
        --img-filter: brightness(0.85) contrast(1.05);
      }

      body {
        background:
          radial-gradient(circle at top left, var(--bg-grad-1), var(--bg-grad-2) 45%, var(--bg-main) 100%),
          var(--bg-main);
        color: var(--text-main);
        transition: background-color 0.35s ease, color 0.35s ease;
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
        filter: blur(40px);
        opacity: 0.7;
        transition: background 0.35s ease;
      }

      .page-shell::before {
        width: 22rem;
        height: 22rem;
        top: -8rem;
        left: -6rem;
        background: var(--blob-1);
      }

      .page-shell::after {
        width: 26rem;
        height: 26rem;
        right: -10rem;
        bottom: -10rem;
        background: var(--blob-2);
      }

      .content-panel {
        position: relative;
        z-index: 1;
        padding: clamp(0.9rem, 2.2vw, 1.5rem);
      }

      .info-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 28px;
        padding: clamp(1.2rem, 2.5vw, 1.8rem);
        box-shadow: var(--card-shadow);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        transition: background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.85rem;
        border-radius: 999px;
        background: var(--eyebrow-bg);
        color: var(--eyebrow-text);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        transition: background-color 0.35s ease, color 0.35s ease;
      }

      .eyebrow::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: var(--eyebrow-dot);
        box-shadow: 0 0 10px var(--eyebrow-dot-shadow);
        transition: background-color 0.35s ease, box-shadow 0.35s ease;
      }

      .hero-title {
        margin: 0.8rem 0 0.5rem;
        font-size: clamp(1.65rem, 3.2vw, 2.8rem);
        line-height: 1.05;
        letter-spacing: -0.03em;
        color: var(--text-main);
        font-weight: 800;
      }

      .domain-highlight {
        margin-top: 0.75rem;
        padding: 0.8rem 1rem;
        border-radius: 18px;
        background: linear-gradient(135deg, var(--highlight-bg-1), var(--highlight-bg-2));
        border: 1px solid var(--highlight-border);
        color: var(--text-main);
        font-size: 0.93rem;
        line-height: 1.55;
        transition: background 0.35s ease, border-color 0.35s ease;
      }

      .domain-highlight .oops {
        color: var(--text-main) !important;
      }

      .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .metric {
        padding: 0.85rem 1rem;
        border-radius: 18px;
        background: var(--metric-bg);
        border: 1px solid var(--metric-border);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: border-color 0.25s ease, transform 0.2s ease, background-color 0.35s ease;
      }

      .metric:hover {
        border-color: var(--metric-hover-border);
        transform: translateY(-2px);
      }

      .metric-label {
        display: block;
        color: var(--text-muted);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 0.3rem;
      }

      .metric-value {
        display: block;
        color: var(--text-main);
        font-size: 0.95rem;
        font-weight: 700;
        line-height: 1.3;
        word-break: break-word;
      }

      .footer-stack {
        margin-top: 1rem;
        display: grid;
        gap: 0.55rem;
      }
      
      #footer_data {
        color: var(--text-muted);
        font-size: 0.78rem;
        line-height: 1.55;
      }

      .sub-footer {
        margin-top: 0;
      }

      .right-sec {
        position: relative;
        min-height: 34vh;
        overflow: hidden;
        filter: var(--img-filter);
        transition: filter 0.35s ease;
      }

      .right-sec::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, var(--img-overlay-1), var(--img-overlay-2));
        pointer-events: none;
        transition: background 0.35s ease;
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
          min-height: 28vh;
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
                      <div class="w-full h-2 my-3 md:my-6" style="background-color: var(--card-border); border-radius: 4px;"></div>
                      <p id="footer_data">${escapeHtml(status)} • 回源节点：${escapeHtml(colo)} • 您的 IP：${escapeHtml(clientIp)} • Performance &amp; Security by Cloudflare</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2 right-sec" style="background-image: url('${RIGHT_IMAGE}'); background-size: cover; background-position: center center;">
      </div>
  </div>
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
};
