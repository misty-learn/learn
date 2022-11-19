# Promise

`promise`是ES6中新增的异步编程解决方案，在代码中的表现是一个对象

* 需求：从网络上加载3个资源，要求加载完资源1才能加载资源2，加载完资源2才能加载资源3
  前面任何一个资源加载失败，后续资源都不加载

```js

function request(fn) {
    setTimeout(()=>{
        fn("拿到的数据")
    },1000)
}

request(function (data) {
    console.log(data,1);
    request(function (data) {
        console.log(data,2);
        request(function (data) {
            console.log(data,3);
        })
    })
})
```
* promise的作用

企业开发中为了保存异步代码的执行顺序，那么就会出现回调函数层层嵌套，
如果回调函数嵌套层数太多，就会导致代码的阅读性，可维护性大大降低，
promise对象可以将异步操作以同步流程来表示，避免了回调函数层层嵌套（回调地狱）


```js

function request() {
    return new Promise(function (resolve, reject) {
        setTimeout(()=>{
            resolve("拿到的数据")
        },1000)
    })
}

request().then(function (value) {
    console.log(value,1)
    return request();
}).then(function (value) { 
    console.log(value,2)
    return request();
}).then(function (value) { 
    console.log(value,3)
})

```

## 基本使用

* 如何创建一个Promise

```js

new Promise(function(resolve, reject){
    
}

```

promise对象不是异步的，只要创建promise对象就会立即执行存放的代码

```js

console.log(1)

let promise = new Promise(function (resolve, reject) { 
    console.log(2);
})

console.log(3)

// 输出 1 2 3

```

* promise是如何实现通过同步的流程来表示异步的操作？

promise对象是通过状态的改变来实现的，只要状态发生改变就会自动触发对应的函数

* promise对象三种状态

pending: 默认状态，只要没有告诉promise任务是成功还是失败就是pending状态

```js
let p = new Promise(function (resolve, reject) { 
    console.log(1)
})
console.log(p) // Promise<pending>
```

fulfilled(resolved) : 只要调用resolve函数，状态就会变成fulfilled，表示操作成功

```js
let p = new Promise(function (resolve, reject) { 
    console.log(1)
    resolve()
})
console.log(p) // Promise<resolved>
```

rejected: 只要调用rejected函数，状态就会变成rejected，表示操作失败
```js
let p = new Promise(function (resolve, reject) { 
    console.log(1)
    reject()
})
console.log(p) // Promise<rejected>
```

注意点：状态一旦改变即不可逆，即从pending变为fulfilled，那么永远都是fulfilled

从pending变为rejected，那么永远都是rejected

* 监听Promise状态改变

我们还可以通过函数来监听状态的变化

```
resolved => then()
```

```
rejected => catch()
```

## then方法

then方法接收两个参数，

第一个参数是状态切换成功时的回调，
第二个参数是状态切换失败时的回调

```js

let promise = new Promise(function (resolve, reject) { 
    console.log(2)
    // resolve()
    reject()
})

promise.then(function () {
    // resolve 要走
    console.log("成功");
},function () {
    // reject 要走
    console.log("失败");
})

```

* 在修改promise状态时，是可以传递参数的

```js

let promise = new Promise(function (resolve, reject) {
    console.log(2)
    // resolve('成功')
    reject('失败')
})
promise.then(function (value) {
    console.log(value); // 成功
},function (reason) {
    console.log(reason); // 失败
})

```

* 同一个promise对象可以多次调用then方法，当该promise对象的状态发生改变时，所以的then方法都会被执行

```js

let promise = new Promise(function (resolve, reject) {
    console.log(2)
    // resolve('成功')
    reject('失败')
})

promise.then(function () {
    console.log('成功1');
},function () {
    console.log('失败1'); 
})

promise.then(function () {
    console.log('成功2'); 
},function () {
    console.log('失败2');
})

```

* then方法每次执行完毕以后会返回一个新的promise对象

```js

let promise = new Promise(function (resolve, reject) {
    // console.log(2)
    resolve('成功')
    // reject('失败')
})

let p = promise.then(function (value) {
    console.log(value);
})

console.log(p); // Promise<pending>

```

* then方法

可以通过上一个promise对象的then方法给下一个promise对象的then方法传递参数

::: warning 注意点：

无论是在上一个promise对象成功的回调还是失败的回调传递的参数，
都会传递给下一个promise对象成功的回调

:::

```js

let promise = new Promise(function (resolve, reject) {
    // console.log(2)
    resolve('成功')
    // reject('失败')
})

let p = promise.then(function (value) {
    console.log(value);
    return "222";
},function (reason) {
    console.log(reason);
    return 'bbb'
})

p.then(function (value) {
    console.log(value); // 222 // bbb 
},function (reason) { 
    console.log(reason) // 不会走到这
})
```

* 如果then方法返回的是一个promise对象，那么会将返回的promise对象的执行结果中的值传递给下一个then方法

```js

let promise = new Promise(function (resolve, reject) {
    // console.log(2)
    resolve('成功')
    // reject('失败')
})

let p1 = new Promise(function (resolve, reject) { 
    // resolve("saa");
    reject("sss");
})
let p = promise.then(function (value) {
    console.log(value); // 成功
    return p1;
})

p.then(function (value) {
    console.log(value); // saa
},function (reason) {
    console.log(reason); // sss
})

```

## catch方法

catch其实是
```
   then(undefined,()=>{// 失败})
```
的语法糖

```js

let p = new Promise(function (resolve, reject) { 
    reject("sss")
})

p.catch(function (reason) {
    console.log(reason);
})
```

::: warning 注意点：

```js

p.then(function (value) {
    console.log(value);
}).catch(function (reason) { 
    console.log(reason)
})

```
如果需要分开监听，需要使用链式操作，如果不使用链式操作会报错

```js
p.then(function (value) {
    console.log(value);
})

p.catch(function (reason) {
    console.log(reason); // sss
})
// 报错

```
不使用链式编程的原因是：
1. 如果promise的状态失败，但是没有对应的监听就会报错
2. then方法会返回一个新的promise，新的promise会继承原有promise的状态
3. 如果新的promise状态是失败，但是没有对应失败的监听也会报错

```js

let p2 = p.then(function (value) { 
    console.log(value)
})

p.catch(function (reason) {
    console.log(reason);
})
console.log(p2); // 如果返回的是失败，也会继承以前的失败Promise<rejected>

// 所以需要进行监听新返回的promise的失败信息
p2.catch(function (reason) {
    console.log(reason);
})
// 这样写就不会再出现报错

```

*所以尽量在写的时候使用链式编程*

:::

* 和then一样，在修改promise状态时，可以传递参数给catch方法中的回调函数

```js

let p = new Promise(function (resolve, reject) { 
    reject("失败")
})

p.catch(function (reason) {
    console.log(reason);
})

```

* 和then方法一样，同一个promise对象可以多次调用catch方法，当该Pro米色对象的状态所以catch方法都会被执行

```js
let promise = new Promise(function (resolve, reject) { 
    reject()
})

promise.catch(function (reason) {
    console.log(reason);
})

promise.catch(function (reason) {
    console.log(reason);
})

```

* 和then一样，也会返回一个新的promise对象

```js

let promise = new Promise(function (resolve, reject) { 
    reject()
})

let p = promise.catch(function (reason) {
    console.log(reason);
})
console.log(p) // Promise<pending>

console.log(promise === p) // false
```

* 和then方法一样，上一个promise对象也可以给下一个promise对象传递参数

::: warning 注意点：

无论是在上一个promise对象成功的回调还是失败的回调传递的参数，
都会传递给下一个promise对象成功的回调

:::

```js
let promise = new Promise(function (resolve, reject) { 
    reject()
})

let p = promise.catch(function (reason) {
    console.log(reason);
    return "ssss";
})

p.then(function (value) {
    console.log(value); // ssss
},function (reason) {
    console.log(reason);
})
```

* 和then方法一样 catch方法如果返回的是一个Promise对象，那么会将返回的Promise对象的执行结果中的值传递给下一个catch方法

```js
let promise = new Promise(function (resolve, reject) {
    reject('ppp')
})
let p1 = new Promise(function (resolve, reject) { 
    // resolve('p222')
    reject('p1')
})

let p2 = promise.catch(function (reason) {
    console.log(reason);
    return p1
})

p2.then(function (value) {
    console.log(value); // p222
}).catch(function (reason) {
    console.log(reason); // p1
})

```

* 和then方法第二个参数的区别在于，catch方法可以捕获上一个promise对象then方法中的异常

```js
let promise = new Promise(function (resolve, reject) {
    resolve()
})
promise.then(function (value) {
    console.log(value);
    sasa // 使其报错
},function (reason) {
    console.log(reason);
    // 捕获不到上面的报错
})

```

```js

promise.then(function (value) {
    console.log(value);
    sss
}).catch(function (reason) {
    // 可以捕获到then的错误
    console.log(reason);
})

```

## 异常处理机制

简单粗暴就是有错误出现，由于JS是单线程的，编写代码都是串行的，一旦前面报错，后面的代码就不会被执行

```js
console.log(1)
sss // 报错 不会往下执行
console.log(2)
```

* JS中的异常处理

1. 自身代码问题 --> 手动修复bug
2. 外界原因问题 -->
```
try{} catch{}
```

对于一些可以预见的异常，我们可以使用try catch来处理异常

* JS中如何进行异常处理
  利用try catch来处理异常可以保证程序不被中断，也可以记录错误原因以便于后续优化迭代更新

```js
try {
    // 可能遇到的问题
}catch (e) {
//    捕获错误的代码块
}

```


## all方法

1. all方法接收一个数组
2. 如果数组中有多个Promise对象，只有都成功才会执行then方法，并且按照添加的顺序，将所有成功的结果重新打包到一个数组中返回给我们
3. 如果数组中不是Promise对象，那么会直接执行then方法

需求：

1. 无序加载图片，每加载成功一张就添加一张
```js

let arr = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
]

function loadImage(url) {
    return new Promise(function (resolve, reject) {
        let oImg = new Image();
        // 模拟网络请求慢
        let time = Math.random() * 1000;
        setTimeout(()=>{
            oImg.src = url
        })
        oImg.onload = function () {
            resolve(oImg)
        }
        oImg.onerror = function () {
            reject("图片加载失败")
        }
    })
}

for (let i = 0; i < arr.length; i++) {
    loadImage(arr[i])
}

```   

2. 无序加载图片,只有所有图片都加载成功才添加，有一张失败都不添加

```js

let arr = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
]

function loadImage(url) {
    return new Promise(function (resolve, reject) {
        let oImg = new Image();
        // 模拟网络请求慢
        let time = Math.random() * 1000;
        setTimeout(()=>{
            oImg.src = url
        })
        oImg.onload = function () {
            resolve(oImg)
        }
        oImg.onerror = function () {
            reject("图片加载失败")
        }
    })
}
let p = []
for (let i=0;i<arr.length;i++){
    p.push(loadImage(arr[i]))
}
// 要么一起成功，要么一起失败
Promise.all(p).then(function (oImgs) { 
    oImgs.forEach(v=>{
        document.body.append(v)
    })
}).catch(function (reason) {
    console.log(reason);
})

```

## race方法

1. race方法接收一个数组
2. 如果数组中有多个Promise对象，谁先返回听谁的，后返回的会被抛弃
3. 如果数组中不是Promise对象，那么直接执行then方法

应用场景：接口调试，超时处理

```js

let p1 = new Promise(function (resolve, reject) { 
    resolve('111')
})

let p2 = new Promise(function (resolve, reject) { 
    setTimeout(()=>{
        reject('232')
    },2000)
})

Promise.race([p1,p2]).then(function (value) {
    console.log(value); // 111
}).catch(function (reason) {
    // 因为第一个已经执行完成，所以不会再执行p2，也就是不会再输出232
    console.log(reason);
})

```
