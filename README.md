<div align="center">

<h1>Cloudflare Custom Pages</h1>

<p>A collection of Cloudflare-style error pages, challenge pages, and CDN info worker for self-hosted deployments.</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f48120.svg)](https://workers.cloudflare.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-0051c3.svg)](https://pages.cloudflare.com/)

[English](README.md) | [中文](README_CN.md)

</div>

---

## Features

- **CDN Info Page** - Worker-based page showing visitor IP, edge node, Ray ID, country, and city
- **Error Pages** - 100X (DNS error), 5XX (connection error) pages
- **Challenge Pages** - CAPTCHA verification, Under Attack mode, WAF block pages
- **Dark Mode** - Automatic theme switching based on time and system preference
- **Responsive** - Mobile-friendly layouts with smooth transitions
- **Self-contained** - CDN Info worker is a single file, ready to deploy

## Pages

| Page | Description | Source |
|------|-------------|--------|
| CDN Info | CDN connection details & visitor info | `workers/cdn-info.js` |
| 100X | DNS resolution error | `100X.html` |
| 5XX | Server connection error | `5xx.html` |
| CAPTCHA | Bot verification challenge | `captcha.html` |
| Under Attack | DDoS protection check | `under_attack.html` |
| WAF Block | Firewall access denied | `waf_block.html` |

## Project Structure

```
cloudflare/
├── workers/
│   └── cdn-info.js        # CDN Info Worker (single file, self-contained)
├── assets/
│   ├── css/shared.css      # Shared styles
│   └── js/page.js          # Theme switching & page rendering
├── images/                 # Page background images
├── 100X.html               # DNS error page
├── 5xx.html                # Connection error page
├── captcha.html            # CAPTCHA verification page
├── under_attack.html       # Under Attack page
└── waf_block.html          # WAF block page
```

## Deployment

### Static Pages (Cloudflare Pages)

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy . --project-name=your-project
```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

### CDN Info Worker

```bash
# Deploy the Worker
npx wrangler deploy workers/cdn-info.js --name=cdn-info
```

Then add a route in the Cloudflare dashboard:

```
your-domain.com/cdn-info/* → cdn-info-worker
```

### Manual Deployment

1. Upload static HTML files to any web server or CDN
2. Copy `workers/cdn-info.js` content to Cloudflare Workers dashboard
3. Set the Worker route to your desired path

## CDN Info Page

The Worker-based CDN Info page displays:

| Field | Description |
|-------|-------------|
| Node | Cloudflare edge data center (e.g., SJC, NRT) |
| Status | CDN enabled/disabled |
| Client IP | Visitor's connecting IP |
| Ray ID | Cloudflare request identifier |

### JSON API

Append `?mode=json` or set `Accept: application/json` header:

```bash
curl -H "Accept: application/json" https://your-domain.com/cdn-info
```

Response:

```json
{
  "status": "CDN\u542f\u7528",
  "cdnip": "1.2.3.4",
  "rayId": "abc123",
  "colo": "SJC",
  "country": "US",
  "city": "San Jose",
  "host": "your-domain.com"
}
```

## FAQ

**Q: Can I use these pages with non-Cloudflare hosts?**

A: The static HTML pages work anywhere. The CDN Info Worker requires Cloudflare Workers runtime for `request.cf` data.

**Q: How does dark mode work?**

A: Theme switches automatically based on local time (7PM-5AM = dark) and respects system preference via `prefers-color-scheme`.

## License

[MIT](LICENSE)
