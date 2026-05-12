# 部落格 - 水土曜來了

在日語當中，水曜日和土曜日分別代表星期三和星期六的意思，另外也分別代表水星和土星之意，在占星學當中水星象徵個人的心智活動及邏輯思維，土星則有隱含著 困難、壓力、磨練等等的意思，而這個技術部落格呼應的就是邏輯思考，筆記這些過程也間接表示遇到程式上面的 BUG。

## Screenshot
![App Screenshot](https://res.cloudinary.com/deqqrzo3t/image/upload/v1678352745/my-blog/Portfolio/FrontEnd/blog.jpg)

## Demo

[水土曜來了部落格網址](https://wedsatcoming.com/tech-page/)

## Folder Structure

src 資料夾結構

```bash
├─components
│  ├─album
│  ├─banner
│  ├─circularPercentProgress
│  ├─footer
│  ├─header
│  ├─layout
│  ├─navbar
│  ├─pager
│  ├─portfolio
│  ├─seo
│  └─slider
├─images
│  ├─portfolio
│  └─slider
├─json
├─pages
│  └─markdown-article
├─styles
│  ├─pages-styles
│  └─templates-styles
└─templates
```
## Deployment

node 與 npm 版本參考

```javascript
"node": "16.15.1",
"npm": "9.1.2"
```

```bash
npm run start
```

## Features

- 引入 Prismjs 使語法高亮
- 配置 Gatsby 套件使 markdown 轉譯 html 
- 部落格攝影集部分加入 spinner 和進度百分比以避免 CLS
- 手刻 ham 選單和展開動畫
- 引入 MUI 並部署至 Netlify 
- 使用 CloudFlare 域名註冊

## Tech Stack

**Front-end:** React, Gatsby.js, MUI , SCSS 

**Service:** Netlify , Cloudfare Domain Registration ,cloudinary

## Color Reference

| Color           | Hex       |
| --------------- | --------- |
| main_color      | #4296d1   |
| secondary_color | #1d5a85   |
| body_color      | #4296d11f |
