# 手写node核心模块

## vm模块

主要解决在执行字符串代码的时候，会编译变量的信息，导致系统的安全性降低

如下：

```js
// 使用eval()的方式执行字符串代码
let name = "test";
let str = "console.log(name)";
eval(str);
// 输出test

// 使用new Function()的方法执行字符串代码
let fn = new Function(str);
fn();
//输出test

```

以上的两种方式都会调用外界定义的变量，也就是存在依赖关系，可以访问外界的数据，存在安全的隐患

**使用NodeJs的vm模块解决问题：**

```js
let vm = require("vm");
let name = "test";
let str = "console.log(name)"
vm.runInThisContext(str);
// 执行报错没有定义name
// 如果使用全局变量
global.name = "test";
let globalStr = "console.log(name)"
vm.runInThisContext(globalStr);
// 输出test
// 全局变量runInThisContext仍然可以解析成为变量
// 使用vm.runInNewContext解决此问题
vm.runInNewContext(globalStr);
// 执行后报错没有定义name

```

综上可以知道，vm模块解决的问题如下：

解决之前的依赖问题同时提供了两种解决方案。

runInThisContext : 无权访问外部定义的变量，但是可以访问global定义的全局变量

runInNewContext  : 无权访问外部定义的变量，也无权访问global定义的全局变量

## require解析

1. 内部实现了一个require方法
2. 通过Module对象的静态__load方法加载模块文件
3. 通过Module对象的静态_resolveFilename方法，得到绝对路径并添加后缀名
4. 根据路径查看是否有缓存，如果有缓存就创建一个新的Module对象
5. 如果没有缓存就创建一个Module对象
6. 将模块对象缓存
7. 利用tryModuleLoad方法尝试加载模块
    1. 取出模块的后缀
    2. 根据不同的后缀查找不同的方法并执行不同的方法加载模块
    3. 如果是JSON就转成对象
    4. 如果是JS就包裹一个函数
    5. 执行包裹函数之后的代码，拿到执行结果(String --Function)
    6. 利用call执行fn函数，修改module.xports的值
    7. 返回module.exports

## 宏任务和微任务

### 浏览器中

MacroTask：setTimeout，setInterval，setImmediate(IE独有)...

MicroTask：Promise，MutationObserver（专门用来监听节点）,process.nextTick(node独有)...

注意点：所有的宏任务和微任务都会放到自己的队列中，也就是有一个宏任务队列和一个微任务队列，所有放到队列中的任务都采用“先进先出原则”。

::: tip 注意点
在执行完一个宏任务的时候，会立即去检查微任务队列是否有新的微任务需要处理，有则先执行微任务
:::

### NodeJs中

* 在nodeJs中任务队列不同（6大队列）
* NodeJs中没有专门存储微任务的队列
* NodeJs事件环中只有同步代码执行完毕和其他队列切换的时候回去清空微任务队列
* NodeJs事件环中如果多个微任务同时满足执行条件，会按照优先级执行

Promise 和 process.nextTick(优先级高于Promise先执行);

### EventLoop面试注意

```js
setTimeout(function() {
  console.log("timeOut");
},0)
setImmediate(function() {
  console.log("immediate");
})
```

::: warning 注意点
如下代码输出的结果是随机的
在NodeJS中指定的延迟时间是有一定误差的，所以导致输出结果随机的问题
:::

**面试题：**
```js
const  path = require("path")
const  fs = require("fs")

fs.readFile(path.join(__dirname,'test.js'),function() {
  setTimeout(function() {
    console.log("timeOut");
  },0)
  setImmediate(function() {
    console.log("immediate");
  })
})
```

这一个的输出一直是immediate再输出timeout

限制性poll（I/O读取）队列然后再到check队列再到timer队列

## 自定义包

### 什么是包

包就是一个文件夹，用来管理模块和模块质检的各种关系

### 包使用

npm install xxx 安装包
const xxx = require(xxx) 使用包

* 自定义包流程
    * 新建一个包文件夹
    * 包的根目录创建一个package.js
    * 编写业务逻辑代码
    * 上传至npm官网

**注意：**
npm 中存在两个比较特殊的脚本key
test 和 start 这两个命令在执行的时候不需要加run

### 自定义全局包（工具包）

* 自定义指令

初始化包

需要在package.json中加入一个bin

```json
{ 
    "bin":{
        "test":"index.js"
    }
}
```

需要在被执行的js文件中指定要在哪里执行:`#! /usr/bin/env node`
