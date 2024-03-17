---
title: Gatsby - 建立 siteMetadata 並在頁面執行 graphQL 的 Query
slug: 2022-01-27T12:00:00.000Z
date: 2022-01-27T12:00:00.000Z
tags: ["React","Gatsby.js"]
---



## 建立站點資訊 (siteMetadata)

我們可以在 `gatsby-config.js` 這個檔案中設定站點的資料 (siteMetadata)，值得一提的地方是在使用 Query 時，需注意命名衝突的問題。如果有多個 Query，命名必須不相同。。

```javascript
module.exports = {
  siteMetadata: {
    title: `react-my-blog`,
    siteUrl: `https://www.yourdomain.tld`,
    description: `This is my first siteMetadata`
  },
  plugins: [
    `gatsby-plugin-sass`
  ]
}
```

## 使用 Gatsby 的 Playground GUI 進行 GraphQL 查詢

在執行 `npm run start` 後，我們可以打開 `http://localhost:8000/___graphql` 來使用 Gatsby 提供的 GUI 介面進行查詢資料。

![](https://i.imgur.com/ygJ1l5p.png)

我們嘗試點選 **site** → **siteMetadata** → **description**、**siteUrl**、**title**

中間的畫面應該會自動產生如下的語法

```graphql
query MyQuery {
  site {
    siteMetadata {
      description
      siteUrl
      title
    }
  }
}
```

之後點選上方的三角形**執行**按鈕，應該可以獲取資料

如下所示：

```javascript
{
  "data": {
    "site": {
      "siteMetadata": {
        "description": null,
        "siteUrl": "https://www.yourdomain.tld",
        "title": "react-my-blog"
      }
    }
  },
  "extensions": {}
}
```

## 在某個頁面查詢

我們可以將剛剛使用的查詢語法加入到任何一個頁面的 JavaScript 檔案中，並增加以下語法。剛剛命名為 `MyQuery` 的查詢可以更換成 `SiteQuery`，或者使用自己想要的名稱。

```javascript
export const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
  }
`
```

首先，我們需要從 Gatsby 引入 `graphql` 並解構出來：

```javascript
import { graphql } from 'gatsby'
```

然後，在頁面元件中，我們可以解構出從 `data` prop 傳入的資料：

```javascript
const IndexPage = ({ data }) => {
  console.log(data);
  const { title, description } = data.site.siteMetadata;

  return (
    <div>
      <p>{title}:{description}</p>
    </div>
  )
}
```

剛剛在 `http://localhost:8000/___graphql` 的 Playground 中，我們可以看到 `data` 物件的結構，因此我們可以像在 React 中解構 props 一樣，解構出所需的資料。

`console.log(data)` 應該會輸出類似下圖的結果：

![](https://i.imgur.com/bCgdtdk.png)

## 完整程式碼

```javascript
import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  console.log(data);
  const { title, description } = data.site.siteMetadata;

  return (
    <div>
      <p>{title}:{description}</p>
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
  }
`
```

##### 參考資料

[Gatsby 官方文件 - Querying Data in Pages with GraphQL](https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/)