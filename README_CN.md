<div align="center">

<h1>Cloudflare 自定义页面</h1>

<p>一套 Cloudflare 风格的错误页面、验证页面和 CDN 信息 Worker，支持自托管部署。</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f48120.svg)](https://workers.cloudflare.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-0051c3.svg)](https://pages.cloudflare.com/)

[English](README.md) | [中文](README_CN.md)

</div>

---

## 功能特性

- **CDN 信息页面** - 基于 Worker，显示访客 IP、边缘节点、Ray ID、国家和城市信息
- **错误页面** - 100X（DNS 解析错误）、5XX（连接异常）页面
- **验证页面** - CAPTCHA 验证、Under Attack 检查、WAF 拦截页面
- **深色模式** - 基于时间和系统偏好自动切换主题
- **响应式布局** - 移动端友好，平滑过渡动画
- **独立部署** - CDN Info Worker 为单文件，开箱即用

## 页面列表

| 页面 | 说明 | 文件 |
|------|------|------|
| CDN Info | CDN 连接详情和访客信息 | `workers/cdn-info.js` |
| 100X | DNS 解析错误页面 | `100X.html` |
| 5XX | 服务器连接异常页面 | `5xx.html` |
| CAPTCHA | 机器人验证页面 | `captcha.html` |
| Under Attack | DDoS 防护检查页面 | `under_attack.html` |
| WAF Block | 防火墙拦截页面 | `waf_block.html` |

## 项目结构

```
cloudflare/
├── workers/
│   └── cdn-info.js        # CDN 信息 Worker（单文件，自包含）
├── assets/
│   ├── css/shared.css      # 公共样式
│   └── js/page.js          # 主题切换和页面渲染
├── images/                 # 页面背景图片
├── 100X.html               # DNS 错误页面
├── 5xx.html                # 连接异常页面
├── captcha.html            # CAPTCHA 验证页面
├── under_attack.html       # Under Attack 页面
└── waf_block.html          # WAF 拦截页面
```

## 部署方式

### 静态页面（Cloudflare Pages）

```bash
# 部署到 Cloudflare Pages
npx wrangler pages deploy . --project-name=your-project
```

或在 Cloudflare 控制台连接 GitHub 仓库实现自动部署。

### CDN Info Worker

```bash
# 部署 Worker
npx wrangler deploy workers/cdn-info.js --name=cdn-info
```

然后在 Cloudflare 控制台添加路由规则：

```
your-domain.com/cdn-info/* → cdn-info-worker
```

### 手动部署

1. 将静态 HTML 文件上传到任意 Web 服务器或 CDN
2. 将 `workers/cdn-info.js` 内容复制到 Cloudflare Workers 控制台
3. 设置 Worker 路由到你期望的路径

## CDN Info 页面

Worker 版本的 CDN 信息页面展示以下内容：

| 字段 | 说明 |
|------|------|
| 节点 | Cloudflare 边缘数据中心（如 SJC、NRT） |
| 状态 | CDN 是否启用 |
| 客户端 IP | 访客连接 IP |
| Ray ID | Cloudflare 请求标识符 |

### JSON API

在 URL 后添加 `?mode=json` 或设置 `Accept: application/json` 请求头：

```bash
curl -H "Accept: application/json" https://your-domain.com/cdn-info
```

返回示例：

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

## 常见问题

**Q: 这些页面可以在非 Cloudflare 主机上使用吗？**

A: 静态 HTML 页面可以在任何地方使用。CDN Info Worker 需要 Cloudflare Workers 运行时才能获取 `request.cf` 数据。

**Q: 深色模式是如何工作的？**

A: 主题会根据本地时间自动切换（晚 7 点至早 5 点 = 深色），同时通过 `prefers-color-scheme` 响应系统偏好设置。

## 许可证

[MIT](LICENSE)
