# Cloudflare 自定义页面

这个仓库包含一组 Cloudflare 风格的错误页、验证页，以及一个基于 Workers 的 CDN 页面入口。

## 项目结构
- 根目录页面：100X.html、5xx.html、captcha.html、under_attack.html、waf_block.html
- 公共样式：assets/css/shared.css
- 公共脚本：assets/js/theme.js、assets/js/page-utils.js
- 公共页面壳：assets/js/page-renderer.js
- Worker 页面入口：workers/cdn-info.js

## Worker 页面说明
CDN 页面已经不再使用单独的 HTML 文件，而是由 Worker 直接返回完整页面。

Worker 可以读取的 Cloudflare 信息包括：
- 请求 IP
- colo / 边缘节点
- Ray ID
- 国家和城市信息（可用时）

## 部署方式
1. 将静态文件部署到 Cloudflare Pages 或其他静态托管服务。
2. 将 workers/cdn-info.js 部署到 Cloudflare Workers。
3. 把 Worker 路由绑定到你希望作为 CDN 页面的路径。