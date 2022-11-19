# node基础与环境配置

## 全局对象的属性和方法

### __dirname

> 当前被执行的js文件所处的目录

### __filename

> 当前被只能怪的js文件的路径（包括被执行的文件名称）

### clearInterval和setInterval

> 这两个方法和普通的浏览器执行效果一致

```js
let timer = setInterval(()=>{
  console.log("asd");
},2000)
clearInterval(timer);
```

### setTimeout和clearTimeout

```js
let timer = setTimeout(()=>{
  console.log("we");
},2000)
clearTimeout(timer);
```

### console

> 和浏览器打印效果一致

## 自定义模块

### 什么是模块

* 浏览器中模块开发
  * 避免命名冲突，方便维护代码
::: tip
浏览器中的问题：
没有一个标准的规范
:::

* nodeJs中的模块开发
  * 采用CommonJs的规范实现模块系统
::: tip
CommonJs规范：
* 一个文件就是一个模块
* 每个文件的变量函数有事私有的，对其他文件不可见
* 暴露函数和变量必须通过exports(导出)才可以使用
* 其他js文件使用必须使用import引入才能使用被暴露的函数和变量
:::

### 暴露数据的几种方式

#### exports暴露

* 结合代码使用
  * 第一个js文件 require1.js

    ```js
      let name = "爱吧烟雨";
      function hello() {
        console.log("hello word");
      }
      exports.str = name;
    ```

    * 第二个js文件使用

    ```js
      let model1 = require("./code/require1.js");
      console.log(model1);
      console.log(model1.str);
      model1.hello();
    ```
  
#### module导出暴露

```js
let name = "str";
module.exports.str = name;
```

#### global暴露(不推荐)

```js
let name = "str";
global.str = name;
```

::: tip
无论哪种方式，使用的时候都需要先导入文件
不推荐使用第三种方式暴露不符合CommonJs的规范
:::

#### module.exports 和 exports 的区别（面试题）

* exports 导出数据不能直接给其赋值`exports = "sadsa"`输出`{}`空对象
* module.exports 导出数据能直接给其进行赋值`module.exports ="sads"`输出`sads`
::: tip
企业开发中不要出现这种的导出数据的方式，只会出现在面试题当中
:::

### 导入模块

#### require导入

::: warning 注意点：

* 导入文件可以不写后缀名称（查找顺序）
    1. 先找叫这个名字的.js的文件找到就加载文件
    2. 如果没有.js则优先找有没有叫.json的文件
    3. 如果没有.json文件则找有没有.node的文件
* 导入模块
  * 导入自定义模块必须指定路径
  * 导入系统模块和第三方模块不需要加路径地址
:::

### 包和包管理

一个模块尽量只完成一个特定的功能
一个模块是一个单独的文件，一个包中可以有一个或多个模块

#### 包的管理——NPM(Node Package Manager)

可以通过npm添加和删除对应的包工具，在安装完成nodejs的同时默认会安装好npm的包管理工具

##### 使用npm全局安装

* 一般用于安装全局的使用的工具，存储在全局的node_moudles中

```shell
  npm install -g packageName@version #@后面为版本号，不带则默认安装最新版本
  npm uninstall -g packageName #卸载安装包
  npm update -g packageName #更新安装包（更新失败也可使用install）
```

##### 使用npm局部安装

* 一般只用于当前的项目使用的包，存储在当前项目中的node_moudles中

```shell
  npm install packageName@version
  npm uninstall packageName
  npm update packageName
```

##### 其他命令

* `npm config list`查看npm配置信息

##### 初始化本地包

```shell
  npm init #可以自己配置package.json文件
  npm init -y # 本地直接生成一个package.json文件
  npm install packageName -s #安装至正式版本模式（正式环境需要的依赖）
  npm install packageName -D #安装到开发模式（只在开发环境使用的依赖）
```

::: tip
将项目上传至git或者发送给别人使用的时候不需要将node_moudles打包发送
当下载下来项目之后只需要通过以下的命令就可以自动安装

```shell
  npm install #开发和正式环境都安装
  npm install --development #同上
  npm install --production #只安装生产环境需要的包
```

:::

### nrm和cnpm

#### 什么是nrm

nrm是可以使用国内的镜像源，因为国外镜像比较慢，所以可以通过nrm使用国内的镜像

##### 命令

```shell
nrm ls #查看允许的切换的镜像
nrm use taobao #切换至国内taobao镜像地址
```

#### 什么是cnpm

cnpm和nrm解决都是相同的问题，但是安装cnpm后，以后的操作都需要使用cnpm进行包管理，所以推荐使用nrm切换镜像源，以后还是使用npm的指令进行安装卸载包

### yarn的使用

::: tip
yarn 是由Facebook、Google、Exponent 和 Tilde 联合推出的一款包管理工具
是为了弥补 npm5.0之前的一些缺陷而出现的

在npm5.0之前yarn的优势很明显，但是在npm升级至6.9*和7.*的时候基本上和yarn是差不多的性能，推荐还是使用npm
:::

**之前存在的缺陷：**

* npm install 的时候特别慢（安装包工具的时候是串行）

* 同一个项目，npm install 无法保证版本的一致性

::: tip 版本号的写法

* "5.0.3" 表示只安装5.0.3版本
* "~5.0.3" 表示只安装5.0.*版本（小版本的更新）
* "^5.0.4" 表示只安装5.*.*版本（大版本的更新）
:::

**yarn的优势:**

::: tip 优势

* 安装包工具速度快
* 安装过一次之后，yarn会做一个缓存，如果缓存中存在这个包，直接在缓存中取出
* 生成一个.lock文件会锁定包

:::

**yarn的命令：**

```shell
yarn add packageName@version #安装包
yarn remove packageName #卸载包
yarn upgrade packageName #更新包
yarn add packageName --dev #安装开发环境需要的包
yarn global add packageName #全局安装包工具
yarn global remove packageName #全局卸载包工具
yarn global upgrade packageName #全局更新包工具
```

**现在的npm版本已经解决了当前的问题！**
