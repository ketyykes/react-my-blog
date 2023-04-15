---
title: 從實作To Do List理解useState搭配useReducer運作模型—(附圖)(中)
slug: 2022-11-16T10:37:54.000Z
date: 2022-11-16T10:37:54.000Z
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

本文將以實作To Do List理解Listing State Up
包含以下部分
-  useContext運作模型—圖解
-  useReducer運作模型—圖解
-  資料夾結構
-  具體程式碼

為了解決需要透過層層元件傳遞，因此可以使用context將status統一管理，透過訂閱的方式將所需的status取出，就可以避免僅是為了父傳遞給子元件的子元件而必須在第一層的子元件的props當中接棒傳給第二層子元件。

## useContext運作模型—圖解
大致可以理解成下圖的方式
![](https://i.imgur.com/JlgZfLk.jpg)

## useReducer運作模型—圖解

另外將處理的邏輯抽離出來到reducer，component僅做派送action物件給reducer最後回傳給訂閱的component status大致如下圖

* action creator僅製作action物件
* dispatch負責派送action物件
* reducer接收action物件和status
* status依據所訂閱的component渲染

![](https://i.imgur.com/ognnXCG.jpg)

## 資料夾結構

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
        toDoActionCreator.js
        toDoContext.js
        toDoReducer.js
```

我們將創建一個<span class="green">store資料夾</span>用來<span class="green">儲存handler的邏輯以及listData的state</span>，其中包含三個檔案<span class="blue">**toDoActionCreator**、**toDoContext**、**toDoReducer**</span>

## 程式碼部分

### toDoContext檔案

這個檔案僅用來創建一個context，稍後將會引入至App的檔案裡
```javascript
import { createContext } from "react";
//用來創建一個context
const toDoContext = createContext();
export default toDoContext;
```

### toDoActionCreator檔案

這邊的function是<span class="green">用來製造action物件</span>，其物件裡面包含要做的<span class="red">動作類型(type)和輸入值(payload)</span>
```javascript
export function addToDo(input) {
    return {
        type: 'ADD_TO_DO',
        payload: input
    }
}
export function deleteToDo(id) {
    return {
        type: "DELETE_TO_DO",
        payload: id
    }
}
export function completeToDo(id) {
    return {
        type: "COMPLETE_TO_DO",
        payload: id
    }
}
```

### toDoReducer檔案

reducer函式的參數<span class="green">接收原先的state和要執行的action需要注意的是如果沒有對應的action的時候應當回傳原先的state</span>。

程式部分可以看到這邊使用switch case來分門別類action物件。使用default用來作為當傳進來的action沒有對應的時候回傳原先的state，

```javascript
function toDoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_DO':
            if (action.payload === "") { return state; }
            return [
                ...state,
                {
                    content: action.payload,
                    id: Date.now(),
                    done: false
                }
            ];
        case 'DELETE_TO_DO':
            return state.filter(
                toDoItem => toDoItem.id !== action.payload
            )
        case 'COMPLETE_TO_DO':
            return state.map(item => {
                if (item.id === action.payload) {
                    item.done = !item.done;
                }
                return item;
            })
        default:
            return state;
    }
}
export default toDoReducer;
```

### App檔案
最後我們在app檔案引入toDoContext和toDoReducer，接下來將宣告listData state並將<span class="green">透過context發布至底下的component</span>

```javascript
import React, { useReducer } from 'react'
import { AddToDo, ListToDo } from './components/Todo';
import toDoContext from './store/toDoContext';
import toDoReducer from './store/toDoReducer';
const App = () => {
  //這邊給定了初始狀態將其發布
  const initialState = [
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
  ];
  // 透過Provider將listData和dispatch發佈
  const [listData, listDispatch] = useReducer(toDoReducer, initialState);
  return (
    <div >
      <toDoContext.Provider value={{ listData, listDispatch }}>
        <AddToDo />
        <ListToDo />
      </toDoContext.Provider>
    </div>
  )
}
export default App
```

### AddToDo檔案
這裡先引入useContext，將toDoContext所建立的<span class="green">context給放入到useContext的參數中，就能簡單的提取出裡面的值</span>，這邊我們提取listDispatch，另外也要引入ActionCreator，其預計用來製造action的物件，將listDispatch放到onClick事件函式當中，當按下add的時候就會使用listDispatch派發action，其透過接收input參數給actionCreator作為payload的用途。

```javascript
import { useState, useContext } from 'react';
import toDoContext from '../../store/toDoContext';
import { addToDo } from '../../store/toDoActionCreator';
const AddToDo = () => {
  //in-line style的部分
  const margin0Auto = { width: "300px", margin: "0 auto" };
  const textAlign = { textAlign: "center" };

  //使用Controlled component
  const [input, setInput] = useState("");
  const inputChange = (e) => {
    setInput(e.target.value);
  }

  //提取listDistpatch以便稍後用來發送事件
  const { listDispatch } = useContext(toDoContext);

  return (
    <div style={{ ...textAlign, ...margin0Auto }}>
      <input type="text" value={input} onChange={inputChange} />
      <button onClick={() => {
        listDispatch(
          addToDo(input)
        )
        setInput('');
      }}>add</button>
    </div>
  )
}

export default AddToDo
```

### ListToDo檔案

同樣引入toDoContext為了提取儲存在store的status，另外也引入useContext的hook來簡化寫法，這時候我們就能得到listData。

```javascript
import React, { useContext } from 'react'
import ToDoItem from './ToDoItem';
import toDoContext from '../../store/toDoContext';
const ListToDo = () => {
  //in-line style的部分
  const margin0Auto = { width: "300px", margin: "0 auto" };
  
  //使用useContext提取listData
  const { listData } = useContext(toDoContext);
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

### ToDoItem檔案
引入toDoContext將其放入useContext提取出listDispatch，同樣<span class="green">引入actionCreator來製造完成和刪除的action物件</span>，其參數最後會變成action物件的payload

```javascript
import React, { useContext } from 'react'
import toDoContext from '../../store/toDoContext';
import { deleteToDo, completeToDo } from '../../store/toDoActionCreator';
const ToDoItem = ({ id, content, done }) => {
  const margin10 = { margin: "10px" };
  const displayFlex = { display: "flex", justifyContent: "center", alignItems: "center" };
  const displayBlock = { display: "block" };
  const { listDispatch } = useContext(toDoContext);

  return (
    <li style={{ ...margin10, ...displayFlex }}>
      <input type="checkbox"
        checked={done}
        onChange={
          () => listDispatch(completeToDo(id))
        } />
      <p style={
        { textDecoration: done ? 'line-through' : 'none' }
      }
      >
        {content}
      </p>
      <button style={{ ...margin10, ...displayBlock }}
        onClick={
          () => listDispatch(deleteToDo(id))
        } >
        delete
      </button>
    </li >
  )
}
export default ToDoItem
```
最後應當可以看到畫面如下，其中會先出現兩個toDo是因為我們先前在App那支檔案有宣告過initialState
![](https://i.imgur.com/tsX2tJ1.png)

