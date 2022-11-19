# JS新特性

## H5新增存储方案

### SessionStorage、LocalStorage和Cookie的区别

Cookie生命周期：默认是关闭浏览器后失效，但是也可以设置过期时间

SessionStorage生命周期：在当前界面有效，如果关闭当前的窗口或浏览器后被清除，不能设置过期时间

LocalStorage生命周期：除非手动清除，否则永不过期

### 容量区别

Cookie：有大小（4KB）和个数(20~50)

SessionStorage: 大小限制(5M左右)

LocalStorage: 大小限制(5M左右)


### 网络请求

Cookie：每次发送HTTP请求中，如果使用cookie保存过多数据带来性能问题

SessionStorage和LocalStorage：仅在浏览器中保存，不参与和服务器的铜线


### 应用场景

Cookie：判断用户是否登录

SessionStorage：表单数据

LocalStorage：购物车


::: warning 注意点：

无论通过以上哪种方式存储的数据，切记不能将敏感数据直接存储到本地

:::

## 同源策略

同源策略是一种约定，它是浏览器最核心也是最基本的安全功能

所谓同源是指：协议、域名、端口都相同，就是同源，否则就是跨域

**同源策略带来的影响：**

在同源策略下，浏览器只允许Ajax请求同源，不允许请求不同源的数据，
但是在企业开发中，一般情况下为了提升网页性能，网页和数据都是单独存在不同服务器上的，
这时如果再通过Ajax请求数据就会拿不到跨域数据

**跨域请求解决方案：**
jsonp

### JSONP

JSONP让网页从别的地址（跨域的地址）那获取资料，即跨域读取数据

JSONP实现跨域访问的原理：

1. 在同一界面中可以定义多个script标签
2. 同一个界面中多个script标签中的数据可以相互访问
3. 可以通过script的src属性导入其他资源
4. 通过src属性导入其他资源的本质就是将资源拷贝到script标签中
5. script的src属性不仅能导入本地资源，还能导入远程资源
6. 由于script的src属性没有同源限制，所以可以通过script的src属性来请求跨域数据

### 优化方案一

在企业开发中通过JSONP来获取跨域的数据，
一般情况下服务器返回的都不会是变量，而是一个函数的调用

```php
<?
$info = $_GET['info']
echo "{$info}('www')";

```

```html
<script>
    function demo(name) {
        console.log(name);
    }
    // 采用异步加载的方式，不会去等待请求完成后再执行代码
    let oS = document.createElement('script')
    oS.src = "demo.php?info=demo"
    document.body.appendChild(oS);
</script>

<!--<script src="demo.php?info=demo"></script>-->

```

### 在jquery中获取跨域数据

```php
<?

// 1. 拿到回调函数的名称
$cb = $_GET['callback'];
// 2. 返回数据
echo "{$cb}('ssss')"; 

```

```js
$.ajax({
    url:"demo.php",
    // 告诉jquery需要请求跨域的数据
    dataType:"jsonp",
    // 指定我们自己的key
    jsonp:"cb",
    // 指定我们自己的函数名称
    jsonpCallback:"test",
    success:function (data) {
        console.log(data);
    }
})

```


### JSONP封装

```php
$t = $_GET['teacher'];
$age = $_GET['age'];

$arr = ['name'=>$t,'age'=>$age];


```

```js

function objToStr(obj){
    // 生成随机因子
    obj.t = (Math.random() +'').replace('.','')
    let arr = [];
    for (let key in obj){
        arr.push(key + '=' +encodeURI(obj[key]))
    }
    let str = arr.join('&')
    return str
}

function myJSONP(options){
    options = options || {}
    // 生成url地址
    let url = options.url;
    if (options.jsonp){
        url+="?"+options.jsonp+'='
    }else {
        url+="?callback"
    }
    if (options.jsonpCallback){
        url+=options.jsonpCallback
        callbackName = options.jsonpCallback;
    }else {
        let callbackName = ("jQuery"+ Math.random()).replace('.','');
        url += callbackName
    }
    if (options.data){
        let str = objToStr(options.data)
        url +='&' + str;
    }
    
    // 2.获取跨域数据
    let oS = document.createElement('script')
    oS.src = url;
    document.body.appendChild(oS)
    
    // 定义一个函数
    window[callbackName] = function (data) {
        // 删除已经获取了数据的script标签
        document.body.removeChild(oS);
        options.success(data);
    }
    
}

```

## 进程和线程

### 进程

进程是指在操作系统中的一次执行的过程，是系统进行资源分配和调度的基本单位。

程序和进程是一对多的关系，一个程序可以有多个进程。多个进程之间是相互独立的。

### 线程

线程是指进程中的一个执行实例，是程序执行的最小单元，它是比进程更小的能独立运行的基本单位

在一个进程中至少有一个线程这个线程我们称之为主线程

一个进程中除了主线程以外，我们可以创建和销毁多个线程

### 串行

串行是按顺序执行，同一时刻，只能有一条指令，在一个CPU上执行，后面的指令必须等到前面的任务执行完成以后后面的才能执行

* JS串行

JS是单线程的，所以JS中的代码都是串行的，前面没有执行完毕，后面的代码不能执行

```js

console.log("1");

setTimeout(()=>{
    console.log("2");
})

console.log("3");

```

* 同步代码和异步代码

除了"事件绑定的函数"和"回调函数"以外的都是同步代码

1. 程序运行会从上至下依次执行所以的同步代码
2. 在执行的过程中如果遇到异步代码会将异步代码放到事件循环中
3. 当所有同步代码都执行完成后，JS会不断检测事件循环中的异步代码是否满足条件
4. 一旦满足条件就执行满足条件的异步代码

```js
// 解析事件循环
let arr = [setTimeout(()=>{
    console.log("2");
})];
// 事件循环
let len = arr.length;
while (true){
    let item = arr[index];
    if(item.xxx === xxx){
        // 执行异步代码
    }
    index ++
    if (index === len){
        index = 0
    }
}
```

* 为什么JS是单线程的？

```js

setTimeout(()=>{
    console.log("test");
},100)
// 先执行当前的弹出框，如果弹出框一直不关闭，JS是不会往下执行代码的
alert("ssss");


```


### 并行

并行就是同时执行，同一时刻，有多条指令，在多个CPU上执行，就是并行


## fetch网络请求

和Ajax一样都是用于网络请求数据的

fetch是ES6中新增的，基于Promise的网络请求方法

使用方法：

`fetch(url,{options}).then().catch()`

```js

fetch('',{
    method:'post',
    body:JSON.stringify({name:'test',age:12})
}).then(function (res) {
    // 如果是字符串直接text()
    console.log(res.text());
    console.log(res.json());
    // 如果是json
    // return res.json();
    return res.text()
}).then(function (value) {
    console.log(value); // 拿到返回值
})
    .catch(function (reason) {
    console.log(reason);
})

```

## Symbol类型

Symbol是ES6中新增的一种数据类型，被划分到了基本数据类型中

基本数据类型：字符串、数值、布尔、undefined、null、Symbol

引用数据类型：Object

Symbol的作用：生成一个独一无二的值

```js

let s = Symbol();

let y = Symbol();

console.log(s === y) // fasle

```

**为什么要新增一个独一无二的值？**

在企业开发中如果需要对一些第三方的插件、框架进行自定义的时候

可能会因为添加了同名的属性或方法，将框架中原有的属性或方法覆盖掉

为了避免这种情况的发生，框架的作者或者我们就可以使用Symbol作为属性或者方法的名称

**如何区分Symbol？**

在通过Symbol生成独一无二的值的时候可以设置一个标记

这个标记仅仅用于区分，没有任何意义


```js

let obj = {
    name:'tt',
    say:function () {
        console.log("sss");
    }
}
obj.name = "sssssa";
obj.say = function () {
    console.log("ssssssss");
}
console.log(obj.name);
obj.say()
// 上面的全部被覆盖掉了

```

```js


// 如何不覆盖掉
// 这个标记仅仅用于区分，没有任何意义
let name = Symbol('name');
let say = Symbol('say');

let obj = {
    // 如果想使用变量作为变量属性的名称必须加上[]
    [name]:'tt',
    [say]:function () {
        console.log("sss");
    }
}
obj.name = "sssssa";
obj[Symbol('name')] = "sssss"
obj.say = function () {
    console.log("ssssssss");
}
console.log(obj);// 不会被覆盖掉
```

### 使用Symbol需要注意的点

1. 通过Symbol生成独一无二的值时候需要在后面加上`()`,但是前面不能加`new`，因为它不是引用类型

```js
let a = Symbol() // 正确

let b = new Symbol() // 错误

```

2. 通过Symbol生成独一无二值时传入的字符串仅仅是一个标记，为的是方便我们阅读代码，没有任何实际的意义

```js

let c = Symbol('name'); // 其中的name不存在任何意义

```

3. 做类型转换的时候不能转换成数值

```js

let d = Symbol('name');

String(d) // 可以转换

Boolean(d) // 可以转换

Number(d) // 报错

```

4. 不能做任何的运算

```js
let e = Symbol('name');

console.log(e + 10); // 报错

```

5. Symbol生成的值作为属性或方法时，一定要保存下来，否则后续无法使用

```js

let f = Symbol('name')

let obj = {
    [f]:'test'
}

console.log(obj[f]) // test

```

6. for循环无法遍历出Symbol的属性和方法

```js
let name = Symbol('name')
let say = Symbol('say')
let obj = {
    [name]:'test',
    [say]:function () {
        console.log("say");
    },
    age:10
}

for (let key in obj){
    //只能拿到age
}

// 如何拿到Sybmol的属性和方法呢

console.log(Object.getOwnPropertySymbols(obj));

```

## Iterator

Iterator又称为迭代器，是一种接口

这里的接口和现实中的接口一样，是一种标准和规范

它规定了不同数据类型统一访问的机制，这里的访问机制主要指数据的遍历，
在ES6中Iterator接口主要供for...of消费

默认情况下一下数据类型都实现了Iterator接口：

Array、Map、Set、String、TypedArray/函数的 arguments对象 / NodeList 对象

```js

let arr = [1,3,5];
// 只要数据类型实现了Iterator，数据类型中一定包含一个下面的属性
console.log(arr[Symbol.iterator]);// 是一个函数
let it = arr[Symbol.iterator]() // 执行这个方法
console.log(it);//拿到的是一个可迭代的对象
console.log(it.next()); // {value:1,done:false}
console.log(it.next()); // {value:3,done:false}
console.log(it.next()); // {value:5,done:false}
console.log(it.next()); // {value:underfined,done:true}
for (let key of value){
    console.log(key);
}

// 对象就不是Iterator实现的

let obj = {
    name:'sss',
    age:12
}

for (let val of obj){
    console.log(val);// 报错
}

```
### 实现Iterator

```js

class MyArray{
    constructor() {
        for (let i = 0; i < arguments.length; i++) {
            // 动态添加属性
            this[i] = arguments[i]
        }
        this.length = arguments.length;
    }
    // 实现迭代器
    [Symbol.iterator](){
        let index = 0
        let that = this
        return{
            next(){
                if(index < that.length){
                    return {value:that[index++],done:false}
                }else {
                    return {value:that[index],done:true}
                }
            }
        }
    }

}

let arr = new MyArray(1,3,5);
// arr[0] = 121;
// console.log(arr);
// let it = [Symbol.iterator]()
for (let val of arr){
    console.log(val);
}
```

### 应用场景

* 结构赋值

```js

// let arr = [1,3]
// 自己写的类
let arr = new MyArray(1,3);

let [x,y,z] = arr

console.log(x, y, z);
// 使用的就是next

```

* 扩展运算符

```js

// let arr1 = [1,3]
let arr1 = new MyArray(1,3);

// let arr2 = [2,4]

let arr2 = new MyArray(2,4);

let arr3 = [...arr1,...arr2]
console.log(arr3)

```

## Generator函数

Generator函数是ES6中提供的一种异步编程的解决方案

Generator函数内部可以封装多个状态，因此又可以理解为是一个状态机

### 定义一个Generator函数

只需要在普通函数的function后面加上*即可

1. 调用了Generator函数后，无论函数中有没有返回值，都会返回一个迭代对象
2. 调用Generator函数后，函数中封装的代码不会立即被执行
```js

function* x() {
    console.log("233")
}

let it = x() // 不会输出123
console.log(it); // x对象

```

### yield关键字

真正让Generator具有价值的是yield关键字

* 在Generator函数内部使用yield关键字定义状态
* 并且yield关键字可以让Generator内部的逻辑能够切割成多个部分
* 通过调用迭代器对象的next方法执行一个部分代码，执行那个部分就会返回哪个部分定义的状态
* 在调用next方法的时候可以传递一个参数，这个参数会传递给上一个yield

```js
// yield关键字只能在Generator中使用，不能再普通函数中使用
function* gen() {
    console.log('1212')
    let res = yield 'aaa'
    console.log(res);
    console.log(12121)
    yield 'aaa3'
    console.log('43')
    yield 1+1;
    console.log('121')
    yield true
}

let it = gen()
// 第一次调用不能传参
console.log(it.next()); // 1212 {value:'aaa',done:false}
// 第二次是可以传参的
console.log(it.next('啊啊啊啊')); // 啊啊啊啊 12121 {value:'aaa3',done:false}
console.log(it.next()); // 43 {value:2,done:false}
console.log(it.next()); // 121 {value:true,done:false}
console.log(it.next()); // {value:underfined,done:true}


```

### 应用场景1

* 可以让函数返回多个值

```js

function* calculate(a,b){
    yield a+b;
    yield a-b;
} 

let it = calculate(10,5);
console.log(it.next().value); // 15
console.log(it.next().value); // 5
```

### 应用场景2

利用Generator函数，可以在任意对象上快速部署Iterator接口

Generator函数特点：

1. Generator函数也是一个函数
2. Generator函数会返回一个迭代器对象
3. 迭代器对象有next方法
4. next方法每次执行都会返回一个对象`{value:xxx,done:false}`

快速实现在对象上部署Iterator接口

```js

let obj = {
    name:'test',
    age:12,
    gender:'man'
}

function* gen() {
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        yield obj[keys]
    }
}
obj[Symbol.iterator] = gen
let it = obj[Symbol.iterator]()
console.log(it);
console.log(it.next());// {value:'test',done:false}
console.log(it.next());// {value:12',done:false}
console.log(it.next()); // {value:'man',done:false}
console.log(it.next()); // {value:underfined,done:true}
```

### 应用场景3

用同步流程来表示异步的操作

```js

function request(){
    return new Promise(function (resolve) { 
        setTimeout(()=>{
            resolve("拿到数据")
        })
    })
} 


function* gen(){
    yield request();
    yield request();
    yield request();
} 
let it = gen()
console.log(it.next());//{value:Proimse,done:false}

// 这种写法不常用
// it.next().value.then(function (value) {
//     console.log(value);
//     return it.next().value
// }).then(function (value) { 
//     console.log(value)
//     return it.next().value
// }).then(function (value) {
//     console.log(value);
// })

```

### async和await

ES8中新增的函数

```js

async function gen(){
    let res1 = await request();
    console.log(res1);
    let res2 = await request();
    console.log(res2);
    let res3 = await request();
    console.log(res3);
}
// 自动执行当前的方法
gen()
```
这种方式为第三种应用场景的终极解决方案
