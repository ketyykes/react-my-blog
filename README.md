readme.so logo

light
Download
SectionsReset

Delete
Click on a section below to edit the contents









Draggable item screenshots was dropped over droppable area demo
Click on a section below to add it to your readme

Custom Section

Acknowledgements

API Reference

Appendix

Authors

Badges

Contributing

Documentation

Environment Variables

FAQ

Feedback

Github Profile - About Me

Github Profile - Introduction

Github Profile - Links

Github Profile - Other

Github Profile - Skills

Installation

Lessons

License

Optimizations

Related

Roadmap

Run Locally

Support

Running Tests

Usage/Examples

Used By
Editor
| secondary_color| ![#1d5a85](https://via.placeholder.com/10/1d5a85?text=+) #1d5a85 |
| body_color | ![#4296d11f](https://via.placeholder.com/10/4296d11f?text=+)#4296d11f |


Preview
Raw


# 部落格-水土曜來了

在日語當中，水曜日和土曜日分別代表星期三和星期六的意思，另外也分別代表水星和土星之意，在占星學當中水星象徵個人的心智活動及邏輯思維，土星則有隱含著 困難、壓力、磨練等等的意思，而這個技術部落格呼應的就是邏輯思考，筆記這些過程也間接表示遇到程式上面的BUG。


## 螢幕截圖
![App Screenshot](https://res.cloudinary.com/deqqrzo3t/image/upload/v1678352745/my-blog/Portfolio/FrontEnd/blog.jpg)


## Demo

[水土曜來了部落格網址](https://wedsatcoming.com/tech-page/)






## Folder Structure

src資料夾結構

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

node與npm版本參考

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
- 部落格攝影集部分加入spinner和進度百分比以避免 CLS
- 手刻 ham 選單和展開動畫
- 引入 MUI 並部署至 Netlify 
- 使用 CloudFlare 域名註冊


## Tech Stack

**Front-end:** React, Gatsby.js, MUI , SCSS 

**Service:** Netlify , Cloudfare Domain Registration ,cloudinary

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| main_color | ![#4296d1](https://via.placeholder.com/10/4296d1?text=+) #4296d1 |
| secondary_color| ![#1d5a85](https://via.placeholder.com/10/1d5a85?text=+) #1d5a85 |
| body_color | ![#4296d11f](https://via.placeholder.com/10/4296d11f?text=+)#4296d11f |
