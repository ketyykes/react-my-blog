---
title: Material UI更名為MUI、基本介紹、加載字體、import方式—Typography元件
slug: 2022-12-03T13:31:00.000Z
date: 2022-12-03T13:31:00.000Z
tags: ["React","UI Framework"]
---

本篇文章提及以下部分
- Material Design
- 更名MUI
- Material UI優點
- 加載字體方法
- import元件的方法
- Typography-排版組件
## Material Design

google早期在2014年開發了一種設計語言—**material design**，在web和mobile當中非常的流行，
透過設計可以呈現如同實體般的光線與陰影，透過來自實體世界的紋理重新設計了紙張和墨水的媒介作為設計理念。

## 更名MUI

Material UI library是實現了google公司**Material design**的react UI library。

為了避免**Material Design**和Material UI混淆，公司近年來改名成了MUI，而且很多人也已經將**Material UI**縮寫稱為MUI，因此MUI也替公司提供了一個良好的識別性

## Material UI優點

根據官方的建議**Material UI**具有以下的優點

- 交付快速
- 預設美感
- 可客製化
- 跨團隊合作
- 數以千計的組織信任

根據官方文件上定義大致可以解釋為具備簡單快速不必重複造輪子，而且擁有基本美感，對於像是後端開發者也是十分值覺得可以使用，另外也可以客製化一些元件，也因為開發得早，則是擁有龐大的社群支持。

安裝方式使用npm輸入以下語法

```bash
npm install @mui/material @emotion/react @emotion/styled
```

預設的樣式引擎是**emotion**，但是如果想要使用**styled-component**的話也是可以，改成輸入以下指令

```bash
npm install @mui/material @mui/styled-engine-sc styled-components
```

比較需要注意的地方是如果網站是SSR(server side render)的專案，例如next.js，則強烈建議使用emotion，否則可能會遇到一些babel轉譯的問題詳細可以觀看官方的[How to switch to styled-components](https://mui.com/material-ui/guides/styled-engine/#how-to-switch-to-styled-components)的部分

## 加載字體方法

Material UI預設不會加載任何字體，但預設Material UI是使用 Roboto的字體選項，因此如果想要加載字體可以透過兩種方式實現

### 第一種方式—CDN引入字體

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

我們在public的資料夾底下的html檔案添加CDN

![](https://i.imgur.com/LB3G9Sp.png)

```html
<!DOCTYPE html>

<!-- 中間省略 -->

    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
<!-- 添加在這裡 -->
    <title>React App</title>
  </head>

<!-- Body省略 -->

</html>

```

### 第二種方式—npm安裝字體資源檔
在npm輸入以下
```bash
npm install @fontsource/roboto
```

之後加載在程式進入點

在index.js檔案撰寫如下

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## import元件的方法

可以使用兩種方式，分為直接import和大括號的方式
範例如下

### 直接import

```javascript
import Typography from '@mui/material/Typography';
```

### 使用大括號的方式

```javascript
import { Typography } from '@mui/material';
```

使用大括號的方式會讓效能降低一點點(備註)，但可以簡潔程式碼，尤其是當有許多元件要載入的時候就不必撰寫如下import許多不同的行數

> 備註：更多說明可以參考[Bundle size matters
](https://mui.com/material-ui/guides/minimizing-bundle-size/)章節

```javascript
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
```

## Typography-排版組件

- 用途：自定義後顯示成h1或h3或段落標籤等等
- 官方文件：[MaterialUI-Typography](https://mui.com/zh/material-ui/react-typography/)
- 可用API：[Typography API](https://mui.com/zh/material-ui/api/typography/)

## 創建一個基本的Typography組件

接下來的範例僅撰寫jsx的部分，將會省略import和return的程式碼

```jsx
<div>
  <Typography>
    測試
  </Typography>
</div>
```

在未帶入任何屬性的情況下，預設是一個p標籤如下圖

![](https://i.imgur.com/bSuaY0Q.png)

### variant屬性
在Typography的屬性帶入variant，值設定為h1的話可以讓最後顯示的標籤變成h1標籤

```jsx
<div>
  <Typography variant="h1">
    Create page
  </Typography>
</div>
```

### noWrap、color、align

其他比較常見的css屬性都可以找到相對應的props傳入值到component裡面如下

- noWrap可以自動加入刪節號並且不斷行
- color可以設定顏色
- align可以設定文字位置，例如加入center可以置中

```html=
<div>
  <Typography
    align="center"
    noWrap="true"
    color="primary"
  >
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique aliquam iure accusantium tenetur maxime harum provident, facilis voluptatibus quaerat architecto exercitationem animi quia ut ex distinctio vel error nihil recusandae.
  </Typography>
</div>
```

### 掛載標籤、調整樣貌、邊界


- component：如果compoeont和variant一起使用的時候，我們最後實際顯示的標籤是來自component，而外觀是variant
- gutterBottom可以給予下方一個marginBottom的空間。
- noWrap設定true或false記得使用{}的形式來設值例如`noWrap={true}`

```html=
<Typography
  variant="h6"
  component="h2" //最後是h2標籤，但外觀是material h6的樣貌
  align="center"
  gutterBottom
  noWrap={true}
  color="primary"
>
  測試
</Typography>
```

如下圖外觀是h6大小，但實際標籤是h2

![](https://i.imgur.com/lnmQHul.png)

## 小結

Material UI(更名為MUI)提供了一個良好的開發體驗，程式的複用性要點使我們不必自己造輪子，希望透過本篇介紹能夠讓大家初步認識Material UI。![/images/emoticon/emoticon41.gif](/images/emoticon/emoticon41.gif)

##### 參考資料

- [Material UI is now MUI!](https://mui.com/blog/material-ui-is-now-mui/)
- [Material Design](https://material.io/design/introduction#principles)
- [Material UI - Overview](https://mui.com/base/getting-started/overview/)