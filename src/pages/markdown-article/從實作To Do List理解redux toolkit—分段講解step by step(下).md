---
title: 從實作To Do List理解redux toolkit—分段講解step by step(下)
slug: 2022-11-19T13:31:00.000Z
date: 2022-11-19T13:31:00.000Z
tags: ["React"]
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
background-color:#d3d3d3;
}
</style>

本文內容將提及以下內容
- 前言
- 資料夾結構
- 具體程式碼
    - todoSlice檔案-分段講解
    - store資料夾底下的index.js檔案
    - 最上層的index.js檔案
    - AddToDo檔案
    - ListToDo檔案
    - ToDoItem檔案
- 小結

## 前言

先前的文章[解決propDrilling問題—簡化consumer的useContext](./2022-11-05%20Sat)提及useContext將會有效能隱憂，因此在第三方套件庫當中發展了許多狀態管理的library，其中以redux最為大宗，我們透過useReducer和useContext來製作reducer和context環境，接下來將來演示如果使用redux的解決方案又是如何設定。
以下將以目前redux react推薦的toolkit版本實作to do list

## 資料夾結構
在src底下的資料夾結構，store資料夾包含toDoSlice用來產生reducer、action等等，而index.js撰寫store的設定。

```bash
│  App.js
│  index.js
│
├─components
│  └─Todo
│          AddToDo.jsx
│          index.jsx
│          ListToDo.jsx
│          ToDoItem.jsx
│
└─store
        index.js
        todoSlice.js
```

## 具體程式碼

### <span class="green">todoSlice檔案-分段講解</span>

使用redux的createSlice可以方便產出actions和reducer，我們只要在<span class="red">createSlice</span>裡面<span class="red">撰寫name、initialState</span>和<span class="red">reducers物件</span>，而reducers物件裡面包含reducer的function，就可以輕易產出了。

我們將分段講解toDOSlice檔案

#### <span class="rem25">Step1：建立initialState物件</span>

這裡先從redux的toolkit <span class="green">引入createSlice</span>
建立一個inistialState稍後將帶入createSlice物件
```javascript
import { createSlice } from '@reduxjs/toolkit';

//宣告一個物件叫做initialState裡面，裡面包含state，這裡的state是一個陣列叫做listDate
const initialState = {
    listData: [
        {
            content: "測試",
            id: 409823109843,
            done: false
        },
        {
            content: "測試二",
            id: 543098209,
            done: false
        }
    ]
}
```

#### <span class="rem25">Step2：設定createSlice</span>
<span class="green">createSlcie為一個函式</span>，其參數要帶入物件，將剛剛建立的initialState作為key和value帶入，另外也需要給一個name和reducers物件其撰寫方式如下

```javascript
export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,//簡化的寫法其值是key和value
    reducers: {
        addToDo: (state, action) => {
            const toDo = {
                content: action.payload,
                id: Date.now(),
                done: false
            }
            state.listData.push(toDo);
        },
        deleteToDo: (state, action) => {
            state.listData = state.listData.filter(
                toDoItem => toDoItem.id !== action.payload
            );
        },
        completeToDo: (state, action) => {
            const index = state.listData.findIndex((todo) => (todo.id === action.payload));
            state.listData[index].done = !state.listData[index].done
        }
    },
})
```
#### <span class="rem25">Step3：匯出toDoSlice建立的reducer和actionCreator</span>
將addToDo和deleteToDo和completeToDo匯出稍後的useDispatch將會用到。
另外也會將toDoSlice.reducer設為default匯出，等等configureStore將會使用。

```javascript
export const { addToDo, deleteToDo, completeToDo } = toDoSlice.actions;
//將toDoSlice.reducer設為default匯出，等等configureStore將會使用
export default toDoSlice.reducer
```

我們可以<span class="red">console.log(toDoSlice)</span>觀看createSlice幫我們產出的內容如下圖

![](https://i.imgur.com/mUFxVhT.png)

### store資料夾底下的index.js檔案

以下檔案將透過configureStore設定store

#### combineReDucers函式

第一種方式可以將剛剛從toDoSlice建立的toDoReducer引入然後交給combineReDucers函式製作，<span class="green">其所回傳的值可以給configureStore使用</span>。
#### 自己撰寫reducer的物件

第二種方式是自己撰寫reducer的物件，其物件內容就是放入剛剛在toDoSlice所建立的toDoReducer
```javascript
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import toDoReducer from './toDoSlice';

// 方法一 如果有多個slice的話可以透過combineReducers將其結合
// const reducer = combineReducers({ toDoReducer })
// const store = configureStore({
//     reducer
// })

// 方法二 直接在物件裡面宣告一個key為reducer值為你所建立的reducer
//透過configureStore的方式設定store將
const store = configureStore({
    reducer: {
        toDoReducer
    }
})
export default store;
```

### 最上層的index.js檔案
如同useContext的用法，其store需要包含所有需要用到的元件，以便後續某個component需要使用，如下列程式碼

我們將剛剛store所建立的檔案放入作為Provider的value

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
### AddToDo檔案

<span class="green">引入useDispatch作為用來分派事件的函式</span>，其引入addToDo是從toDoSlice匯出的actionCreator函式，addToDo帶入的參數就是payload。

```jsx
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToDo } from '../../store/toDoSlice'
const AddToDo = () => {
  //in-line style的部分
  const margin0Auto = { width: "300px", margin: "0 auto" };
  const textAlign = { textAlign: "center" };

  //引入useDispach作為稍後分派事件使用
  const dispatch = useDispatch();

  //使用Controlled component
  const [input, setInput] = useState("");
  const inputChange = (e) => {
    setInput(e.target.value);
  }

  //透過從toDoSlice引入的addToDo函式，其函式為一個actionCreator
  //所以我們將input作為payload帶入即可。
  return (
    <div style={{ ...textAlign, ...margin0Auto }}>
      <input type="text" value={input} onChange={inputChange} />
      <button onClick={() => {
        dispatch(addToDo(input));
        setInput('');
      }}>add</button>
    </div>
  )
}

export default AddToDo
```

另外我們也可以嘗試著<span class="red">console.log(addToDo("test"))</span>看看。
如下圖，此函式的確回傳一個action物件
![](https://i.imgur.com/HoM6bes.png)

### ListToDo檔案
這邊引入<span class="green">useSelector將state提取出來</span>，我們需要的是listData，因此使用解構的方式將listDate提取後作為遍歷ToDoItem的array

```jsx
import React from 'react'
import ToDoItem from './ToDoItem';
import { useSelector } from "react-redux";
const ListToDo = () => {
  //in-line style的部分
  const margin0Auto = { width: "300px", margin: "0 auto" };

  //透過useSelector將store的state
  const {listData} = useSelector((state) => state.toDoReducer);
  return (
    <ul style={margin0Auto} >
      {listData.map((data) => {
        return <ToDoItem key={data.id} content={data.content} id={data.id} done={data.done} />
      })}
    </ul >
  )
}
export default ListToDo
```


當然我們也可以使用<span class="red">console.log(useSelector(state => state));</span>
其回傳如下圖

![](https://i.imgur.com/V8Xqqpj.png)

這邊的toDoReducer是來自於我們store的configureStore的key值，而state就是當初initialState的值

### ToDoItem檔案
最後同理引入deleteToDo和completeToDo這兩個acitonCreator函式透過useDispatch分派action

```jsx
import { deleteToDo, completeToDo } from '../../store/toDoSlice'
import { useDispatch } from "react-redux";

const ToDoItem = ({ id, content, done }) => {
  const margin10 = { margin: "10px" };
  const displayFlex = { display: "flex", justifyContent: "center", alignItems: "center" };
  const displayBlock = { display: "block" };

  const dispatch = useDispatch();
  return (
    <li style={{ ...margin10, ...displayFlex }}>
      <input type="checkbox"
        checked={done} onChange={() => { dispatch(completeToDo(id)) }}
      />
      <p style={
        { textDecoration: done ? 'line-through' : 'none' }
      }
      >
        {content}
      </p>
      <button style={{ ...margin10, ...displayBlock }} onClick={() => {
        dispatch(deleteToDo(id))
      }}
      >
        delete
      </button>
    </li >
  )
}
export default ToDoItem
```
## 小結
藉由實作to do list理解redux的運作方式，可以發現在實作上面需要許多步驟，有時候我們僅是要將狀態的邏輯部分抽離出來或是state的變更並不會時常操作時仍然可以使用useContext來解決狀態管理，當應用程式大到一定的數量級以上的時候就能考慮使用redux的做法。
本系列告一段落了，希望以上希望對大家有所幫助。