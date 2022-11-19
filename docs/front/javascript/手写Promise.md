## 手写Promise

特点：

1. 创建时必须传入一个函数，否则会报错
    1. then方法每次执行完毕以后都会返回一个新的Promise对象,并且返回的新的promise和旧的promise的状态相同
    2. 上一个promise的then可以给下一个promise传递数据
        1. 无论上一个是在成功的回调还是在失败的回调传递的参数都会传递给下一个成功的回调
        2. 如果上一个传递的是Promise对象，那么传给下一个的成功还是失败由传递的Promise状态决定
    3. 后一个then可以捕获前一个then的异常
    4. catch方法就是then方法的语法糖 `then(undefined,function(){})`
2. 会给传入的函数设置两个回调函数
3. 刚创建的Promise对象是pending状态
4. 状态一旦发生改变就不可在改变
5. 可以通过then来监听状态的改变
    1. 如果添加监听的时候状态已经改变了，立即执行回调函数
    2. 如果添加监听时状态还未改变，那么状态改变时候再执行监听回调
    3. 同一个Promise对象可以添加多个then监听，状态改变时所有的监听按序执行
```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise{
    
    constructor(handler) {
        // 初始化默认状态
        this.status = PENDING
        // 保存传入的参数
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        // 定义变量，保存监听的函数
        // 判断当前传入的是否为一个函数,如果没有传入就抛出一个异常
        if (!this._isFunction(handler)){
            throw new Error("当前传入的不是一个函数")
        }
        // 给传入的函数传递形参
        handler(this._resolve.bind(this),this._reject.bind(this));
    }
    _resolve(value){
        if (this.status === PENDING){
            // 成功的状态
            this.status = FULFILLED
            this.value = value
            this.onResolvedCallbacks.forEach((fn) => fn(this.value))
        }
        
    }
    _reject(reason){
        if (this.status === PENDING){
            this.status = REJECTED
            this.reason = reason
            this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
        }
    }
    
    then(onResolved,onRejected){
        return new MyPromise( (nextResolve,nextRejct) => {
            // 1. 判断有没有传入成功的回调
            if (this._isFunction(onResolved)){
                if (this.status === FULFILLED){
                    try {
                        // 拿到上一个promise成功回调执行结果
                        let result = onResolved(this.value)
                        // 判断执行的结果是否是一个promise对象
                        if (result instanceof  MyPromise){
                            result.then(nextResolve,nextRejct)
                        }else {
                            // 将上一个promise回调成功的结果传给下一个promise成功回调
                            nextResolve(result)
                        }
                    }catch (e) {
                        nextRejct(e)
                    }
                   
                }
            }

            // 1. 判断有没有传入失败的回调
            if (this.status === REJECTED){
                try {
                    let result = onRejected(this.reason)
                    // 上一个的失败的结果会传到下一个的成功回调中
                    if (result instanceof  MyPromise){
                        result.then(nextResolve,nextRejct)
                    }else if(result !== undefined){
                        // 将上一个promise回调成功的结果传给下一个promise成功回调
                        nextResolve(result)
                    }else {
                        nextRejct()
                    } 
                }catch (e) {
                    nextRejct(e)
                }
            }

            // 2. 判断当前的状态是否是默认状态
            if (this.status === PENDING) {
                if (this._isFunction(onResolved)) {
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let result = onResolved(this.value)
                            if (result instanceof  MyPromise){
                                result.then(nextResolve,nextRejct)
                            }else {
                                // 将上一个promise回调成功的结果传给下一个promise成功回调
                                nextResolve(result)
                            }
                        }catch (e) {
                            nextRejct(e)   
                        }
                    })
                }
                this.onRejectedCallbacks.push(()=> {
                    try {
                        let result = onRejected(this.reason)
                        if (result instanceof  MyPromise){
                            result.then(nextResolve,nextRejct)
                        }else if(result!==undefined){
                            // 将上一个promise回调成功的结果传给下一个promise成功回调
                            nextResolve(result)
                        }else {
                            nextRejct()
                        }
                    }catch (e) {
                        nextRejct(e)
                    }
                })
            }
        })
    }
    
    catch(onRejected){
        return this.then(undefined,onRejected)
    }
   
    // 判断当前传入的是不是一个函数
    _isFunction(fn){
        return typeof handler === 'function'
    }
    
    static all(list){
        return new MyPromise(function(resolve,reject){
            let arr = []
            let count = 0
            for (let i = 0; i <list.length ; i++) {
                let p = list[i];
                p.then(function (value) { 
                    arr.push(value)
                    count ++;
                    if(list.length === count){
                        resolve(arr)
                    }
                }).catch(function (reason) { 
                    reject(reason)
                })
            }
        })
    }
    
    static race(list){
        return new MyPromise(function(resolve,reject){
            for (let i = 0;i<list.length;i++){
                let p = list[i]
                p.then(function (value) { 
                    resolve(value)
                }).catch(function (reason) { 
                    reject(reason)
                })
            }
        })
    }
}

```

* 例子：一次加载一张图片添加到body中，前面图片加载失败后面的图片不加载

```js

let arr = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
]

function loadImage(url) {
    return new Promise(function (resolve, reject) { 
        let oImg = new Image();
        oImg.src = url
        oImg.onload = function () {
            resolve(oImg)
        }
        oImg.onerror = function () {
            reject("图片加载失败")
        }
    })
}

loadImage(arr[0]).then(function (oImg) {
    document.body.append(oImg);
    return loadImage(arr[1])
}).then(function (oImg) {
    document.body.append(oImg);
    return loadImage(arr[2])
}).then(function (oImg) {
    document.body.append(oImg)
}).catch(function (reason) {
    console.log(reason);
})
```
