---
title: Rereact club Note + 前言 — Describing the UI - all
slug: 2023-05-13T13:31:00.000Z
date: 2023-05-13T13:31:00.000Z
tags: ["React","Rereact club"]
---

<style> 
.rem25{
font-size:2.5rem;
}
.rem40{
font-size:4.0rem;
}
.rem50{
  font-size:5.0rem;
}
@media (max-width: 576px) {
  .rem25{
    font-size:2rem;
  }
  .rem40{
    font-size:3.0rem;
  }
  .rem50{
    font-size:3.5rem;
  }
}
.red {
color:red;
}
.blue{
color:blue;
}
.code{
background-color:#f7f7f7;
padding :4px;
font-size:0.9rem;
font-weight:700;
}
</style>

## 前言

根據[React官方Twitter](https://twitter.com/reactjs/status/1636441676506906626)在今年的2023年三月已經正式發布了，官方在新版的文件內容。將以Function component和 Hooks 介紹現代 React，並包含了插圖、互動式範例、個人挑戰等等項目。另外也包含了Next.js和Remix的SSR框架建議，談及到React歷史可以回歸由 Facebook 的 Jordan Walke 在 2012 年創立的，並在 2013 年的一個美國會議上開源，在 2023 年 5 月，React 將慶祝其十週年。React 在前端網頁開發中佔有主導地位。JavaScript 的State調查顯示，自 2016 年以來，React 的使用率一直在穩定上升，目前超過 80%，而 Angular 的使用率已經下降到不到 50%。

[舊版React官方文件](https://legacy.reactjs.org/)的網址已經變成legacy狀態了，為了重新理解官方正式以Hook為導向的新版文件以及希望能夠對於新版文件的重新閱讀可以擁有新的理解，因此舉辦了Rereact club讀書會，以下的筆記為我導讀該週並且參照React官方文件和其他網路資源加上自身理解所構成的筆記。也希望這些筆記能對你有所幫助😆。

## 參考資料
> [React官方Twitter](https://twitter.com/reactjs/status/1636441676506906626)
> [Everything You Need to Know About the Updated React Docs](https://dev.to/kathryngrayson/whats-new-in-the-updated-react-docs-on2)
> [Ten years of React, and new documentation site has framework opinions to share](https://devclass.com/2023/03/21/ten-years-of-react-and-new-documentation-site-has-framework-opinions-to-share/)

## 定義Component

React component是一個函式，你可以放入標記語言在Javascript當中

遵循以下步驟

1. 匯出component
2. 定義function(必須大寫開頭)
3. 添加標記語言
4. 若多行注意Return得加小括號

```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

> [Defining a component ](https://zh-hant.react.dev/learn/your-first-component#defining-a-component)

## 定義Component為大寫開頭

React可以很容易的辨認小寫開頭的是HTMLtag、大寫開頭的是React Component，另外React元件是一般的JavaScript函式，但它們的名稱必須以大寫字母開頭，否則它們將無法運作！

```jsx
export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

例如`<Profile />`以大寫字母P開頭，這樣React就知道我們想使用名為Profile的元件。

## Top-level的Component

切勿巢狀式定義Component，如下方，我們在Gallery Component又定義了Profile Component。換句話說會造成某些效能問題可以參考[Different components at the same position reset state ](https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)

```jsx
export default function Gallery() {
  // 🔴 不要在某個Component內定義其他Component
  function Profile() {
    // ...
  }
  // ...
}
```

## JSX本質不是HTML，具有更多規則

jsx並不完全是html，根據[Converting HTML to JSX](https://react.dev/learn/writing-markup-with-jsx#converting-html-to-jsx)的內容提及，由於JSX比HTML有更多的規則。

### 必須單一root element

空的tag被稱之為Fragment，它可以讓你群組化多個tag，而不會造成多餘的DOM 樹。

```jsx
<Fragment><Fragment/>

//但通常是撰寫<>...</>
```

[react-Fragment](https://react.dev/reference/react/Fragment)

### 關閉所有的標籤

在JSX中，標籤需要明確地進行關閉，被稱為**self-closing tags**如`<img>`必須寫成`<img />`，而**wrapping tags**如`<li>oranges`則需要寫成`<li>oranges</li>`

### 大多數的屬性小駝峰

例如class是javascript的屬性，因此在React的jsx必須使用className，另外Javascript對於變數命名有限制，所以不包含破折號。這也是為什麼在SVG是

若你不確定哪個屬性需要小駝峰可以觀看[相對應的DOM屬性](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)

需要注意的地方是由於歷史原因，aria-和data需要用破折號撰寫。

### 常見component

- dangerouslySetInnerHTML：一個以 `{ __html: '<p>一些HTML</p>' }`形式的物件，內部包含原始的HTML字串。覆蓋了DOM節點的innerHTML屬性並顯示傳遞的HTML內容。這應該要非常謹慎地使用！如果內部的HTML不受信任（例如，如果它基於使用者資料），您有可能引入跨站腳本攻擊（XSS）的風險。詳細了解有關使用dangerouslySetInnerHTML的更多資訊。
- htmlFor：一個字串。對於`<label>`和`<output>`標籤，它允許您將標籤與某個input相關聯。與HTML屬性相同。React使用標準的DOM屬性名稱（htmlFor）而不是HTML屬性名稱

[Common components](https://react.dev/reference/react-dom/components/common)

### HTML轉換JSX-轉換器

若不確定哪些HTML和JSX撰寫有哪些差別的話可以使用[轉換器](https://transform.tools/html-to-jsx)

## 在JSX中使用變數

### 使用大括號表示變數

基本上JSX是一種特殊的Javascript撰寫模式，我們可以利用花括號回傳資料來顯示畫面
如下

```jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

### 使用inline style-駝峰式的樣式

另外撰寫inline style也是使用花括號用來傳遞變數，而傳遞給style的也是一個物件，因此你可能會看到以下雙花括號程式碼

```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

當你這樣寫時，你真的可以看到大括號內的 JavaScript 物件，像是物件的背景顏色。

## 特別的變數props

### 從父組件定義並傳遞props

在react中我們可以從父組件傳遞變數給子組件，我們將傳遞給子組件的變數稱為props

而父組件中透過props傳遞值到Component中，其方式就是在tag當中添加自定義的attribute。
程式碼如下

```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

> 參考資料[Passing props to a component](https://react.dev/learn/passing-props-to-a-component#passing-props-to-a-component)

### 從子組件接收變數

在子組件中可以接收到一個物件，通常我們會命名為props，裡面包含父層所傳遞給子元件的內容

如下

```javascript
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### 子組件解構存取變數

通常我們會在子層直接解構方便存取變數，如下

```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

### 子組件定義預設值

當然如果沒有接收到props，我們也可以給予預設值，與一Javascript設定function預設值的方式一樣。如下

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

### 轉發props

有時候我們在傳遞props的時候必須重複解構再傳遞給子層，這些過程過於繁瑣，當傳遞過程中的元件並未實際使用其props的內容的話，我們可以善用spread語法來轉發如下

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

> 參考資料[Forwarding props with the JSX spread syntax](https://react.dev/learn/passing-props-to-a-component#forwarding-props-with-the-jsx-spread-syntax)

## 特別的變數-chiildren

### 巢狀的Component

有時候我們會希望撰寫像是html的巢狀形式如下

```jsx
<Card>
  <Avatar />
</Card>
```

這時候當撰寫在Component中間時，我們會將其內容傳遞給Card元件，其內容會附屬在children變數上面，可以透過解構的方式將值取出如下

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

藉由使用children的方式，我們可以更好閱讀傳遞的內容。

參考資料[Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-props-to-a-component)

### immutable的props

傳遞一個新的props而不要改變原先的props的值。換句話說，父層傳遞給子層的props永遠都是新的值，而非改變原先的值，這牽扯到物件所儲存的方式是reference的機制更多可以參考[Immutable object](https://en.wikipedia.org/wiki/Immutable_object)

## 條件渲染

### 使用if else決定渲染內容

在定義component的函式，我們會回傳一個jsx，我們可以透過不同的if else方式回傳不同的jsx

如下

```jsx
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

### null、false、undefined不渲染

若我們希望某些條件下不要進行渲染的話，我們可以return null

```jsx
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

### 三元運算子決定渲染內容

某些情形我們希望當條件是true的時候渲染A，false的時候渲染B我們可以改用三元運算子(ternary operator)

如下

```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

當然也可以應用在渲染jsx上面

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked
        ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}
```

### 使用邏輯運算子決定渲染

邏輯運算子 AND 常見用來選擇性的當前面的內容為true時才渲染jsx

如下

```jsx
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

> 參考資料[Logical AND operator (&&)](https://react.dev/learn/conditional-rendering#logical-and-operator-)

## 注意事項-false、undefined、null將不渲染

如上內容一個JavaScript的&&表達式，如果左側（我們的條件）為true，則回傳右側的值（在我們的例子中，為勾選標記）。但是如果條件為false，整個表達式則為false。在JSX樹中，React將false視為一個"hole"，就像null或undefined一樣，在其位置上不渲染任何內容。

雖然左側如果是undefined或者null或者false將不會渲染任何東西，對於數字如果左側是0，那麼整個表達式將取得該值（0），並且React將渲染0而不是空值。

為了避免渲染非預期的零，請將左側變成布林值，例如

```jsx
number > 0 && <p>新訊息</p>
```

## 使用map或是filter渲染list

與vue的v-for一樣必須放入key，用來告訴React每個元件對應到陣列中的哪個item，以便稍後可以對應它們。這在陣列item可以移動（例如排序）、插入或刪除時變得重要。一個精心選擇的key可以幫助React推斷發生了什麼，並對DOM樹進行正確的更新。

當item並非單一root elelment時，無法使用`<></>`，在這樣的情況就得使用Fragment
如下

```jsx
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

## 使用唯一且不會變動的key

### 設置的key為何?

- 從資料庫中獲取的資料：如果您的資料來自資料庫，您可以使用資料庫的key/ID，這些key本質上是唯一的。
- 本地生成的資料：如果您的資料是在本地生成並持久化（例如筆記應用中的筆記），在建立項目時使用遞增的計數器、crypto.randomUUID()或像uuid這樣的套件。

### key的規則

- key在sinblings中必須是唯一的。但是在不同的陣列中的JSX節點中使用相同的key是可以的。
- key不應該在渲染過程中更改，否則就失去了它們的目的！不要在渲染時生成key。

### 為什麼React需要key？

想像一下，如果桌面上的文件沒有名稱，而是根據它們的順序來引用 **第一個文件，第二個文件，以此類推**。

您可能會適應這種方式，不過一旦刪除一個文件，情況就會變得十分複雜。**第二個文件將成為第一個文件，第三個文件將成為第二個文件，以此類推**。

資料夾中的文件名和陣列中的JSX key具有類似的用途。它們讓我們可以在兄弟元素之間唯一識別一個item。一個精心選擇的key提供的訊息比陣列中的位置更多。即使由於重新排序而改變位置，key也可以讓React在整個生命週期中識別該item。

> 參考資料[Rules of keys](https://react.dev/learn/rendering-lists#rules-of-keys)

## 使用pure funciton作為component

在React的撰寫當中Component的定義必須是純function，以下使用side effect 作為範例會導致非預期結果。

### 副作用：（非）預期的後果

以下為side effect示範，side effect

```jsx
let guest = 0;

function Cup() {
  //糟糕的作法對於修改一個已存在的變數
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

最後實際畫面如下(備註)

![](https://hackmd.io/_uploads/BJ21IEjrn.png)

> 由於我們使用<span class="code red">StrictMode</span>以至於會重複選染一次，導致畫面的數字是2、4、6，嘗試著將StrictMode註解後，數字就會是1、2、3

### 使用純函式

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

如果cups變數或`[]`陣列在TeaGathering函式之外建立，這將是一個巨大的問題！您將通過向該陣列添加項目來更改一個已存在的物件。

但是，這並沒有問題，因為您在同一次渲染中，在TeaGathering內部建立了它們。TeaGathering之外的程式碼永遠不會知道發生了什麼。這被稱為local mutation，就像您組件的小秘密一樣。

程式碼如下
```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}

```

### 有些時候需要副作用

雖然functional program非常依賴純函式，但在某個地方，某些東西必須發生變化。

諸如以下變化被稱為副作用。它們是"在一邊"發生的事情，而不是在渲染過程中。

- 更新屏幕
- 開始動畫
- 更改數據

在React中，副作用通常屬於**事件處理器**。事件處理器是在執行某些操作時（例如點擊按鈕）React運行的函式。儘管事件處理器在組件內部定義，但它們不在渲染期間運行！

因此，<span class="red">事件處理器不需要是純函式</span>。

如果您已經嘗試了所有其他選項，找不到合適的事件處理器來處理副作用，仍然可以使用在組件中的回傳的JSX中的useEffect呼叫來附加它。這告訴React在渲染後、在允許副作用時執行它。然而，這種方法應該是最後的選擇。

## 不用等待數據變化而是每次藉由純函式運算結果表示渲染結果

撰寫純函式需要一些習慣和紀律。

純函式的優點如下

- 您的元件可以在不同的環境中運行，例如在伺服器上！由於它們針對相同的輸入回傳相同的結果，一個元件可以滿足多個使用者的請求。
- 通過**跳過那些輸入未更改的元件的渲染**，您以提高性能。這是安全的，因為純函式始終回傳相同的結果，因此它們可以被安全地快取。備註1
- 如果在渲染深層元件樹時，某些數據發生變化，React 可以重新開始渲染，而不浪費時間完成過時的渲染。純凈性使得在任何時候停止計算都是安全的。

> 使用 memo 可以在組件的 props 沒有變化時跳過重新渲染（re-render）該組件。[參考官方文件-memo](https://react.dev/reference/react/memo)

我們正在開發的每個新的 React 功能都充分利用Pure的特性。從數據提取到動畫再到性能，保持元件的Pure的特性能夠發揮 React 程式模型的威力。

一個元件必須是純函式，意思是

- 它只關心自身的事務。它不應該改變在渲染之前存在的任何物件或變數。
- 相同的輸入，相同的輸出。給定相同的輸入，元件應該始終回傳相同的 JSX。
- 渲染可以在任何時間發生，因此元件不應該依賴於彼此的渲染順序。
- 您不應該修改元件用於渲染的任何輸入。這包括 props、state 和 context。為了更新畫面，應該使用 "設定" state 而不是修改現有的物件。

### 更改事物的時機

在一個function 藉由return JSX 表達元件的邏輯。

- 當您需要 "更改事物" 時，通常希望在事件處理函式中執行。
- 最後的選擇，您可以使用 useEffect。

