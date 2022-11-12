---
title: 在github page部署react—簡述為何重新整理出現404 feat.解決方案
slug: 2022-10-12T07:49:37.000Z
date: 2022-10-12T07:49:37.000Z
---

<style> 
.rem25{
font-size:2.5rem;
}
.rem40{
font-size:4.0rem;
}
.red {
color:red;
}
.blue{
  color:blue;
}
.green{
  color:green;
}
.gray{
background-color:#D3D3D3;
}
.bdrs{
  border-radius: 4px;
}
</style>

本篇文章將會提及以下部分
- 如何部署react到github page？
- 為什麼react部署在github page上後重新整理會出現404
- github page重新整理404—解決方案

## 如何部署react到github page？
如果你是使用create-react-app的話(以下簡稱CRA)，官方說明在deployment章節有提到部署到github的方式([連結在此](https://create-react-app.dev/docs/deployment/#github-pages))

## Step1–添加homepage至package.json

首先我們先在<span class="red">package.json</span>添加key為homepage，value為你的github網址和repo的網址如下
```json
 "homepage": "https://你的github名字.github.io/你的repository名字",
```
## Step2-安裝gh-pages套件
在Terminal安裝gh-pages套件指令如下
```bash
npm install --save gh-pages
```

## Step3-添加script至package.json
接下來我們要添加script到package.json
```json
"scripts": {
+ "predeploy": "npm run build",
+ "deploy": "gh-pages -d build",
"start": "react-scripts start",
"build": "react-scripts build",
```
## Step4-github Page設定成gh-pages

記得在github Page要顯示的部分改為gh-pages為主要顯示的頁面

![](https://i.imgur.com/mEjZirM.png)

```json
"scripts": {
"predeploy": "npm run build",
-   "deploy": "gh-pages -d build",
+   "deploy": "gh-pages -b master -d build",
}
```

## 為什麼react部署在github page上重新整理會出現404
由於當我們重新整理的時候是在網址列對github page server發request，然而網址列某種層面(備註1、備註2)，反映了檔案路徑的指向，而實際SPA(single page application)的路由是透過History API所實現，因此github page server找不到該檔案。

> 備註1:更多資訊可以參考胡立大大所寫的文章 [淺談新手在學習 SPA 時的常見問題：以 Router 為例](https://blog.huli.tw/2019/09/18/spa-common-problem-about-router/)，內容介紹了SPA的route和後端route實現的方式。
> 備註2:在github上面有人實作解決方案網址如下
> [Single Page Apps for GitHub Pages
](https://github.com/rafgraph/spa-github-pages#how-it-works)，該github的readme提出解決方法前也有稍微提到SPA在github page的運作方式。

## github page重新整理404—解決方案

參考[Single Page Apps for GitHub Pages](https://github.com/rafgraph/spa-github-pages#how-it-works)的實際作法簡單說是在執行react的腳本前，我們透過**historyAPI**的pushState()方法，使網址列變化而不跳轉頁面。

### step1複製404.html

首先複製404的html檔案到我們的專案中，如果我們的專案不是使用自定義的domain的話，換句話說使用原本的<span class="red gray bdrs">username.github.io/repo-name</span>，然後就得將檔案內的變數改成1，如果使用reactRoute的化需要添加repo-name到BrowserRouter下，例如<span class="red gray bdrs">&lt;BrowserRouter basename="/repo-name"/&gt;.</span>

在404.html的程式碼內容如下
```javascript=
var pathSegmentsToKeep = 0;//如果是不是自定義的網域就把0改成1
var l = window.location;
l.replace(
  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
  l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
  l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
  (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
  l.hash
);
```

### step2複製重新導向的腳本至index.html
複製重新導向的腳本到index.html，添加到index.html，這樣就會在執行SPA腳本前，先執行重新導向的腳本。

> 更多說明可以參考[Single Page Apps for GitHub Pages-Usage instructions](https://github.com/rafgraph/spa-github-pages#usage-instructions)

##### 參考資料
 - [npm Library—gh-pages](https://www.npmjs.com/package/gh-pages)
 - [Create-React-App:GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
 - [spa-github-pages](https://github.com/rafgraph/spa-github-pages#usage-instructions)
 - [React app hosted as Github Project Page. How to display custom 404 page? #11938](https://github.com/facebook/create-react-app/discussions/11938)
 - [Single Page Apps for GitHub Pages](https://github.com/rafgraph/spa-github-pages)
 - [Creating a custom 404 page for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)