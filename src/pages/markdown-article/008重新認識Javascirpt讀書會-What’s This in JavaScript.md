---
title: 008重新認識Javascirpt讀書會-What’s This in JavaScript
slug: 2022-03-13T03:19:00.000Z
date: 2022-03-13T03:19:00.000Z
tags: [008重新認識Javascript讀書會,"Javascript"]
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
.red {
color:red;
}
.gray{
background-color:#d3d3d3;
}
</style>


本篇為參與 0 陷阱！0 誤解！8 天重新認識 Javascript 讀書會的導讀內容加上自己所蒐尋的資料後所構成的文章。

## 關於 this

- JavaScript 的一個關鍵字。
- function 執行，自動生成的一個內部物件。
- 隨著 function 執行場合的不同，this 所指向的值，也會有所不同。
- 在大多數的情況下， this 代表的就是呼叫 function 的物件

## 箭頭函式對 this 的影響

**箭頭函式中 this 綁定的事定義時的物件，而非使用時的物件**

```javascript{numberLines: true}
const calculate = {
  array: [1, 2, 3],
  sum: () => {
    return this.array.reduce((result, item) => result + item)
  }
}

//TypeError: Cannot read property 'array' of undefined
calculate.sum()
```

參考資料

> [不可使用箭頭函式的情況](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/arrow_function.html#%E4%B8%8D%E5%8F%AF%E4%BD%BF%E7%94%A8%E7%AE%AD%E9%A0%AD%E5%87%BD%E5%BC%8F%E7%9A%84%E6%83%85%E6%B3%81)

## this 的筆記

```javascript{numberLines: true}
//1.全域下的this指的是window
var a = "全域";
function fn(b){
	console.log(this ===window);
}
fn('a');

//2.物件下的this指的是物件本身
var myName = '全域';
var obj ={
	myName: '小明',
	fn: function() {console.log(this.myName);},
	};
}

//3.物件下呼叫函式，如果是傳統函式，只看前面的那個物件(不看函式定義在哪和如何定義);
var myName = '全域';
function fn(){
	console.log(this.myName);
}
var obj ={
	myName: '小明',
	fn:fn
};
obj.fn();

//所以會印出小明

//4.物件下呼叫函式，如果是傳統函式，只看前面的那個物件(不看函式定義在哪和如何定義);

var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
			myName: '小明家',
			fn:fn
	}
};
obj.inner.fn();

//所以印出小明家
//5.立即函示下呼叫 所以還是看函式前面那個物件

var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
			myName: '小明家',
			fn:fn
	}
};
(function() {
	obj.inner.fn();
})();

//印出小明家
//6.在函式底下的函式做簡易呼叫
var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
		myName: '小明家',
		fn1:function(){
				fn();//這行就是simple call 因為這裡呼叫fn前面沒有物件，因此this表示全域
		}
	}
};
obj.inner.fn1(); //印出全域

//7.有setTimeout(也就是callback函式的話)

var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
		myName: '小明家',
		fn1:function() {
			setTimeout(
				function(){ //這是一個callback基本上屬於simple call所以他的this看前面那個沒東西就是全域了
				console.log(this.myName);
			});
		}
	}
}
obj.inner.fn1(); //印出全域


//8.箭頭函式 是看函式如何定義，因為他沒有自己的this 寫一個立即箭頭函式當範例  (待理解中)
var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
		myName: '小明家',
		fn1:function() {
			console.log(this.myName);
			(()=>{
				console.log(this.myName);
			})();
		}
	}
}
obj.inner.fn1();
//印出小明家

//9.物件下需要使用this的話，直接在最前面做定義。
var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
	inner:{
		myName: '小明家',
		fn1:function() {
			var vm =this;
			console.log(vm.myName);
			(function() {
			console.log(vm.myName);
			})();
			(()=>{
					console.log(vm.myName);
			})();
			//所以可以看到三個一樣的結果印出小明家
		}
	}
}
obj.inner.fn1();




//10.為什麼不使用obj變數去存取就好，反而要用this?? 因為obj可能會被串改而且也可能透過別的物件去存取到它，因此使用this才能確保選到當下自己的那個物件。

var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
		myName: '小明家',
		fn1:function() {
		console.log('obj',this);
		}
};
var obj2=obj;
obj={};
obj2.fn1();

//印出空的東西，因為obj被重新賦值成空的物件，這時印出obj就會是空的。若用this就可以確保指到當前的物件。

//simple call就是沒有透過某個物件去呼叫，例如寫hello();而不是寫obj.hello();
//傳統函式的simple call基本上都是指向全域除非this被串改例如使用call,bind,apply
//模組化的設計情況會常常用到this，因為要不斷地操作自己的這個物件，要選到他自己的話，寫this比較容易使用。
```

## this 的範例

```javascript{numberLines: true}
//範例一

var foo = function () {
	this.count++;
};
foo.count = 0;
for (var i = 0; i < 5; i++) {
	foo();
}
console.log(foo.count);




//範例二

var bar = function () {
	console.log(this.a);
};
var foo = function () {
	var a = 123;
	this.bar();
};
foo();


//範例三

var obj = {
	func1: function () {
		console.log(this === obj);
			console.log(this);
		var func2 = function () {
// console.log(this);
			console.log(this === obj);
		};

		func2();
	}
};


//範例四

var a = "全域";
function fn(b){
	console.log(this ===window);
}
fn();


//範例五

var myName = '全域';
function fn() {
	console.log(this.myName);
}
var obj = {
	myName: '小明',
		myName: '小明家',
		fn1:function() {
			console.log('obj',this);
		}
};
var obj2=obj;
obj={};
obj2.fn1();
// this是obj還是obj2
```

## new 關鍵字

使用 new 的時候會發生四件事情

建立一個空的簡單 JavaScript 物件（即{}）；
為步驟 1 新建立的物件添加屬性**proto**，將該屬性鏈接至建構子函式的原型對象 ；
將步驟 1 新建立的對象作為 this 的上下文 ；
如果該函式沒有回傳物件，則回傳 this。

> [new MDN 運算子](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 
> [new 關鍵字筆記](https://hackmd.io/k--nD40LRzGcnhU9jgSpAA?view)

## 思考 this 的步驟

1. new?→ 建構出來的物件
2. call()或 apply()?或是 bind()?→ 被指定的物件
3. 被呼叫時是否在某個物件?→ 某個物件
4. 如果沒有以上條件 this 就是全域物件，在嚴格模式下就是 undefined

