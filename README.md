# Cloudflare Custom Pages

This repository contains a small set of Cloudflare-style error and challenge pages plus one Workers-based page entry. 

## Overview
- Static pages in the repository root: 100X.html, 5xx.html, captcha.html, under_attack.html, and waf_block.html
- Shared styles in assets/css/shared.css
- Shared behavior in assets/js/theme.js and assets/js/page-utils.js
- Shared page shell rendering in assets/js/page-renderer.js
- Worker entry for the CDN page in workers/cdn-info.js

## What the Worker does
The Worker returns the full CDN page directly, so there is no separate HTML file for that page anymore.

It uses Cloudflare runtime data to show:
- the request IP
- the colo / edge node
- the ray ID
- country and city metadata when available

## Deployment
1. Deploy the static pages to Cloudflare Pages or any static host.
2. Deploy workers/cdn-info.js to Cloudflare Workers.
3. Bind the Worker route to the path you want to serve as the CDN page.
