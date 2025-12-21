# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個使用 Gatsby.js 建置的技術部落格「水土曜來了」，部署於 Netlify，使用 CloudFlare 進行域名註冊。部落格內容以 Markdown 撰寫，透過 Gatsby 轉換為靜態頁面。

## 常用指令

```bash
# 開發伺服器
npm run start          # 開啟開發伺服器 (0.0.0.0)
npm run develop        # 開啟開發伺服器 (localhost)

# 建置與部署
npm run build          # 建置正式版本
npm run serve          # 本地預覽建置結果
npm run clean          # 清除 .cache 與 public 資料夾
```

## 核心架構

### 頁面生成流程

`gatsby-node.js` 負責動態生成頁面：
1. **文章頁面**：從 `src/pages/markdown-article/*.md` 讀取 Markdown，生成路徑為 `/tech-page/YYYY-MM-DD ddd`
2. **文章列表分頁**：每 10 篇一頁，路徑為 `/tech-page/` 或 `/tech-page/{page}`
3. **標籤頁面**：依據 frontmatter 的 tags 生成 `/tags/{tag-name}/`

### 頁面模板

- `src/templates/article-template.js` - 單篇文章頁面，整合 Giscus 留言系統
- `src/templates/tech-page-template.js` - 文章列表頁面，含搜尋與分頁功能
- `src/templates/tags-template.js` - 標籤分類頁面

### Layout 機制

使用 `gatsby-browser.js` 和 `gatsby-ssr.jsx` 的 `wrapPageElement` API，自動為所有頁面包裹 Layout 元件。特定路徑 (`/`, `/photo/`, `/tags/`) 會顯示 Banner。

### 資料來源

透過 `gatsby-source-filesystem` 設定三個資料來源：
- `markdownArticle`：`src/pages/markdown-article/` - Markdown 文章
- `slider`：`src/images/slider/` - 輪播圖片
- `portfolioCard`：`src/json/` - 作品集 JSON 資料

### 元件結構

`src/components/index.js` 統一匯出所有元件，使用具名匯出方便引入。主要元件包含：
- `Layout`：頁面佈局（Header/Navbar/Banner/Footer）
- `Seo`：SEO meta 標籤
- `Pager`：分頁器
- `ArticleCard`：文章卡片
- `PortfolioTab`：作品集 Tab 介面
- `Album` / `PhotoSlider`：相簿與輪播

### 樣式系統

- 全域樣式：`src/styles/global.scss`
- 顏色變數：`src/styles/_color.scss`（$main_color: #4296d1, $secondary_color: #1d5a85）
- Mixin：`src/styles/_mixin.scss`
- 頁面樣式使用 CSS Modules（`.module.scss`）
- 程式碼高亮：Prism.js（okaidia 主題），自訂樣式於根目錄 `pre.css`

### 文章 Frontmatter 格式

```yaml
---
title: "文章標題"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
---
```

## 重要設定檔

- `gatsby-config.js`：Gatsby 外掛與 siteMetadata 設定
- `gatsby-node.js`：動態頁面生成邏輯
- `gatsby-browser.js` / `gatsby-ssr.jsx`：Layout 包裹與全域樣式載入

## 注意事項

- Node 版本：18.19.1（透過 Volta 管理）
- 新增文章：在 `src/pages/markdown-article/` 建立 `.md` 檔案
- 圖片託管：使用 Cloudinary
- 留言系統：Giscus（連結至 GitHub Discussions）
