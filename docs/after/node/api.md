# Node核心API

> 文档地址：<http://nodejs.cn/api/>

## Buffer

### 什么是Buffer

计算机只能识别二进制数据，数据越大二进制文件越大

* Buffer是NodeJS全局对象上的一个类，是一个专门用于存储字节数据的类
* NodeJS提供了操作计算机底层API、而计算机底层只能识别二进制数据
* 所以就提供了一个专门用于存储二进制数据的类

### 如何创建

* new创建Buffer已被废弃，在new的时候会存一些垃圾数据

#### Buffer.alloc(size[,fill[,enccoding]])

* 使用`Buffer.alloc(size[,fill[,enccoding]])`创建一个Buffer encoding默认是utf-8不需要修改

```js
let buf = Buffer.alloc(5);
// 输出<Buffer 00 00 00 00 00>
// 填充数据1
buf = Buffer.alloc(5,1);
// 输出 <Buffer 01 01 01 01 01>
```

::: warning

* 通过console.log输出的Buffer，会自动将存储的内容转成16进制再输出
:::

#### Buffer.from(data)

* 将字符串内容转成16进制
* 可以将数组转成16进制
* Buffer本质就是一个数组，可以通过数组的方式操作数据

#### toString

> toString() 将数据转成字符串

#### Buffer.write()

* 在对象中写入数据，多出的字节会被截断
* string `string` 要写入 buf 的字符串。
* offset `integer` 开始写入 string 之前要跳过的字节数。默认值: 0。
* length `integer` 要写入的字节数。默认值: buf.length - offset。
* encoding `string` string 的字符编码。默认值: 'utf8'。
* 返回: `integer` 已写入的字节数。
* `buf.write(string[, offset[, length]][, encoding])`

#### Buffer.slice(start[,end])

> 从制定的位置截取Buffer数据

#### Buffer.isEncoding()

> 判断是否支持某种编码格式 返回bool

#### Buffer.isBuffer

> 判断是否是一个Buffer对象 返回bool

#### Buffer.byteLength()

> 一共占了多少个字节 返回Number,中文占三个字节

#### Buffer.concat()

> 拼接一个或多个Buffer对象

## path

需要手动导入path模块：

```js
let path = require('path');
```

### path.basename(path[,ext])

用户获取路径的最后一个组成部分如:
`/a/b/c/d`获取出来的就是`d`
可选参数是排除字段

### path.dirname(path)

用于获取路径中的目录，除了最后一个部分以外的内容

### path.extname(path)

获取路径中最后一个组成部分的扩展名

### path.isAbsolute(path)

判断是否为绝对路径返回为 bool
区分操作系统：
在linux操作系统中/开头是绝对路径`/a/b`
在win操作系统中盘符就是绝对路径`c:\\a\\b`

### path.sep

用于获取当前操作系统中路径的分隔符
如果是在Linux操作系统中运行那么获取到的是左斜杠 `/`
如果是在Win操作系统中运行那么获取到的就是右斜杠 `\`

### path.delimiter

用户获取操作系统环境变量的分隔符
如果是Linux那么获取到的是 `:`
如果是win获取到的是`;`

### path.parse(path)

用于将路径转换成对象

```js
{
    root:'/',
    dir:'/a/b/c',
    base:'index.html',
    ext:'.html',
    name:'index'
}
```

### path.format(obj)

用于将对象转换成路径（只能转换上面的json格式的对象）

### path.join([...paths])

用于拼接路径`path.join('/a/b','c');` /a/b/c

::: warning 注意点

* 如果参数中没有添加 `/`,那么该方法会自动添加
* 如果参数中有`..`,那么会自动根据前面的参数生成的路径，去到上一级路径
:::

### path.normalize(path)

用于规范化路径，将不正规的路径转化成正常的路径 例如：`/a///b/c`转化成`/a/b/c`

### path.relative(from,to)

用于计算相对路径：根据第一个路径找到相对于第一个路径的第二个路径的地址

### path.resolve([...paths])

用于解析路径

## fs(文件系统)

使用前需要先导入fs

```js
let fs = require('fs')
```

### fs.stat和fs.statSync

```js
// 异步方法
fs.stat(__filename,function(err,stats){
    console.log("异步执行")
    if(stats.isFile()){
        console.log("当前路径对应的是一个文件");
    }else if(state.isDirectory()){
        console.log("当前是否为一个文件夹")
    }
})

// 同步执行
let stats = fs.statSync(__filename);
// 返回信息和上面的异步方法是一样的
```

### fs.readFile和fs.readFileSync

没有指定文件的类型默认存储到Buffer中
指定第二个参数为utf8，返回的数据是字符串

```js
// js文件读取
fs.readFile(str,function(err,data){
    if(err){
        throw new Error("读取文件失败")
    }
    // 默认为Buffer
    console.log(data);
    // 传入第二个参数utf8，自动转成字符串
});

fs.readFileSync(str,'utf8');
```

### fs.writeFile和fs.writeFileSync

第一个参数：路径

第二个参数：写入的内容

第三个参数为编码：utf8

第四个为回调方法

### fs.appendFile和fs.appendFileSync

向文件中追加内容

第一个参数：路径

第二个参数：追加的内容

第三个参数为编码：utf8

第四个为回调方法

### fs.createReadStream

在读取大文件的时候不能一次性全部读取到内存，容易造成内存溢出的现象，所以对于大文件我们要分批进行读取和写入数据

第一个参数为文件路径

第二个参数为配置参数对象，参考官网配置参数

通过事件监听的方式进行回调

回调常用的四个事件

```js
let readStream = fs.createReadStream("文件地址",{encoding="utf8"})

readStream.on("open",function(){
    console.log("数据流和文件简历关系成功")
})

readStream.on("error",function(){
    console.log("数据流和文件建立关系失败")
})

readStream.on("data",function(data){
    console.log("通过读取流从文件中读取到了数据",data)
})

readStream.on("close",function(){
    console.log("表示与文件断开关系，并且数据读取完毕")
})
```

### fs.createWriteStream

分批写入到文件数据

```js

let writeStream = fs.createWriteStream("文件路径",{encoding:"utf8"})

writeStream.on("open",function(){
    console.log("数据流和文件简历关系成功")
})

writeStream.on("error",function(){
    console.log("数据流和文件建立关系失败")
})

writeStream.on("close",function(){
    console.log("表示与文件断开关系")
})

// 写入数据

writeStream.write("字符")

// 需要手动断开连接

writeStream.end()

```

* 利用读取流的管道方法快速实现文件拷贝

```js
readStream.pipe(writeStream);
```

### fs.mkdir和fs.mkdirSync

创建文件的目录

```js
fs.mkdir("文件目录地址",function(err){
    if(err){
        throw new Error("创建目录失败")
    }else{
        console.log("创建文件目录成功")
    }
})
```

### fs.rmdir和fs.rmdirSync

删除文件的目录

### fs.readdir和fs.readdirSync

读取目录
回调参数有两个

```js
fs.readdir("文件目录地址",function(err,files){
    if(err){
        throw new Error("读取目录失败")
    }else{
        files.forEach(function(obj){
            let filePath = path.join(__dirname,obj);
            let stats= fs.statSync(filePath);
            if(ststs.isFile()){
                //这是一个文件
            }else if(stats.isDireatory()){
                // 这是一个目录
            }
        })
    }
})
```

## http服务器

通过Nodejs提供的http模块，我们可以快速的构建一个web服务器
也就是快速实现一个过去PHP服务器的功能（接收浏览器请求、响应浏览器请求）

### 普通创建方式

```js
let http = require("http")

// 1.创建一个服务器实例对象
let server = http.createServer();

// 2.注册请求监听

server.on('request',function(request,res){

    // 返回中文可能出现乱码，需要进行设置浏览器的
    // 告诉浏览器返回的数据类型，返回的数据集用什么方式返回
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    })

    // end结束本地请求并返回数据
    res.end("返回数据");
});
// 指定监听端口
server.listen(3000);
```

### 快速创建方式

```js
let http = require("http");

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    })
    res.end()
}).listen(3000)

```

### 路径分发

根据不同的请求返回不同的请求

```js
let http = require("http");

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
    });
    if(req.url.startsWith("/index")){
        res.end("首页")
    }else if(req.url.startsWith("/login")){
        res.end("登录")
    }else{
        res.end("啥也不是")
    }
}).listen(3000)

```

::: tip

* request(req)对象其实就是http.IncomingMessage类的实例
* response(res)对象其实就是http.ServerResponse 类的实例

:::

::: warning 注意点

* 如果通过end返回数据，数据只会返回一次后结束本地的请求
* 如果通过write返回数据，可以返回多次，不具备结束本次请求的功能，需要手动结束调用`res.end()`

:::

### 返回html

查看server.js

### 返回静态资源

查看静态资源

::: warning 注意点

* 加载其他资源不能写utf8
* 如果不设置响应头在一些浏览器就会出现问题

:::

### get请求

在get请求中首先就是要引入url模块

```js
let url = require("url")

let str = "http://root:12345@www.28yanyu.cn/index.html?name=yanyu&age=12#banner";

let obj = url.parse(str)
console.log(obj);

```

* 返回值为一个对象数据

```js

let obj = {
  protocol: 'http:',
  slashes: true,
  auth: 'root:12345',
  host: 'www.28yanyu.cn',
  port: null,
  hostname: 'www.28yanyu.cn',
  hash: '#banner',
  search: '?name=yanyu&age=12',
  query: 'name=yanyu&age=12',
  pathname: '/index.html',
  path: '/index.html?name=yanyu&age=12',
  href: 'http://root:12345@www.28yanyu.cn/index.html?name=yanyu&age=12#banner'
}

```

### post请求

需要用到querystring
在Nodejs中不能一次性拿到，必须分多次拿到数据

```js

let http = require("http")

let server = http.createServer();

let queryString = require("querystring")
server.on("request",function (req,res) {
  // 1.定义变量保存传递过来的参数
  let params = "";
  // 在node中POST请求的数据不能一次性全部拿到，需要分批次获取
  req.on("data",function (chuck) {
    params+=chuck;
  });
  // 监听数据完成事件
  req.on("end",function () {
    let obj = queryString.parse(params);
    console.log(obj);
    res.end();
  })
})

```

### 获取请求类型

在sever中有一个`req.method`判断是get还是post请求

### 动态网站

