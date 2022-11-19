# 使用

## 命令行方式

1. 打开终端界面，输入`node`回车

2. 编写js代码即可执行

    ```shell
    $ let a = 1
    $ let b = 2
    $ let c = a+b
    console.log(c)
    ```

## 执行js文件

直接编写js文件执行代码

```js
let a = 1;
let b = 2;
let c = a+b;
console.log(c);
```

* 执行js文件
* 打开命令行工具
* 输入`node js文件名称`

## node和浏览器的区别

1. 内置对象不同
    * nodejs中提供的全局变量为global
    * 浏览器提供的全局变量为window

2. this的默认指向不同
    * 浏览器中全局this指向window
    * nodejs的this是一个空对象

3. API不同
    * 浏览器提供了操作节点的DOM和操作操作浏览器BOM相关的API
    * nodejs中没有HTML节点所以不存在DOM和BOM的相关API
