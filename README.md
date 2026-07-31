# Digital Garden Landing Page 🪴

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.3.2-green.svg)](https://github.com/pesericog6/sitoApp)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://pesericog6.github.io/sitoApp/)
[![Build Status](https://github.com/pesericog6/sitoApp/actions/workflows/update-stats.yml/badge.svg)](https://github.com/pesericog6/sitoApp/actions/workflows/update-stats.yml)

The official high-performance landing page for **Digital Garden**, a smart botanical companion app for Android. Engineered with a focus on core web vitals, accessibility, and automated data synchronization.

[**Live Demo**](https://pesericog6.github.io/sitoApp/)

## 🚀 Key Features

- **Full Localization**: Support for English, Italian, French, German, and Spanish with dynamically loaded localized screenshots.
- **Progressive Web App (PWA)**: Fully installable with offline support, custom manifest, and advanced Service Worker caching (v1.3.2).
- **Automated Stats Sync**: Integrated CI/CD pipeline that automatically synchronizes Play Store ratings and download counts daily.
- **Advanced SEO**: Implements JSON-LD structured data, `hreflang` internationalization tags, and self-referencing canonical URLs for global indexing.
- **Modern UX**: Reveal-on-scroll animations using Intersection Observer and an accessible, keyboard-friendly screenshot slider.
- **Security Hardened**: Strict Content Security Policy (CSP), no inline JavaScript, and zero third-party tracking.

## 🛠️ Technical Stack

- **HTML5**: Semantic structure for WCAG AA accessibility compliance.
- **CSS3**: Grouped logical properties, Material Design timing (cubic-bezier), and system-level Dark Mode support.
- **ES6+ JavaScript**: Clean, documented code following the Google JavaScript Style Guide, wrapped in strict mode.
- **GitHub Actions**: Automated Node.js scripts for metadata maintenance and repository integrity.

## 📁 Directory Structure

```text
.
├── .github/workflows/ # CI/CD Automation (Stats Updater)
├── css/               # Main stylesheets & Dark Mode tokens
├── data/              # Dynamic application data (JSON)
├── js/                # Documented ES6 logic & Translations
├── images/            # Localized assets & Maskable PWA icons
├── scripts/           # Maintenance & Scraping utilities
├── index.html         # SEO-optimized landing page
├── privacy.html       # Shared-asset Privacy Policy
├── manifest.json      # PWA Configuration
└── sw.js              # Offline-first Service Worker
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Engineered by the Digital Garden Team.**
