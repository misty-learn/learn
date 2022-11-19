# loaders专题文档

* 什么是loader

webpack的本质是一个模块打包工具，所以webpack默认处理JS文件，不能处理其他文件，
因为其他文件中没有模块的概念，但是在企业开发中我们除了需要对JS进行打包以外，
还有可能需要对图片/CSS进行打包，所以为了能够让webpack对其他文件类型打包，
在打包之前就必须将其他类型文件转换为webpack能够识别处理的模块，
用于将其他类型文件转换为webpack能够识别处理模块的工具我们就称之为loader

::: tip loader特点

* 单一原则,一个loader只做一件事情
* 多个loader会按照从右至左（从下至上）的顺序执行，所以需要先执行style-loader再执行css-loader

:::



## css-loader

### 介绍

和图片一样webpack默认不能处理CSS文件，所以也需要借助loader将CSS文件转成webpack能处理的类型

### 安装

```shell
npm install --save-dev css-loader
npm install style-loader --save-dev
```

### 用法

```js
import 'file.css';
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 解析css中的@import依赖关系
        // style-loader 将webpack处理之后的内容插入到HTML的HEAD当中
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

### 模块化

导入的css只想在当前的模块使用，需要设置相应的规则

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 解析css中的@import依赖关系
        // style-loader 将webpack处理之后的内容插入到HTML的HEAD当中
        use: [ 
          {
            loader:"style-loader"
          },{
            loader:"css-loader",
            options:{
              modules:true
            }
          }
        ]
      }
    ]
  }
}
```

## url-loader

### 安装
```shell
npm install --save-dev url-loader
```
### 使用

会将图片转成base64

```js

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              /* 指定图片限制的大小
              // 如果被打包的图片超过了限制，会打包成为一个文件
              // 如果未超过限制大小，就会将图片转成base64
              // 100k = 1024 * 100
              比较小的图片转成base64可以提升网页性能，对于比较大的文件，转成base64不会提升网页的性能，
              因为图片比较大，转换的字符串也比较多，网页体积变大，访问的速度变大
              */
              limit: 8192,
              // 配置扩展名称
              name:'[name].[ext]',
              // 配置输出路径
              outputPath:"images/"
            }
          }
        ]
      }
    ]
  }
}

```


## file-loader

### 如何使用loader

webpack中的loader都是用NodeJS编写的，但是在企业开发中我们完全没必要自己编写，
因为已经存在大神编写好的loader

* 先安装 file-loader

```shell
    npm install --save-dev file-loader
```

```js
module.exports = {
  "module":{
    rules:[
      {
        // 正则表达式
        test:/\.(png|jpg|gif)$/,
        use:[
          {
            loader:'file-loader',
            options:{}
          }
        ]
      }
    ]
  }
}
```

* 默认情况下默认通过MD5加密

### file_loader配置项

在options进行配置

```js
module.exports={
  "module":{
    // 省略其他不重要的信息
    use:[
          {
              loader:"file-loader",
              options:{
                // 配置扩展名称
                name:'[name].[ext]',
                // 配置输出路径
                outputPath:"images/",
                // 指定图片的路径http://oss.aibayanyu.cn/images/图片名称
                publicPath:"http://oss.aibayanyu.cn/images/"
              }
          }
    ]  
  }
}
```

## less-loader

> 自动将less转换为css

### 安装

`npm install --save-dev less-loader less`

### 使用

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // 3.creates style nodes from JS strings
            }, {
                loader: "css-loader" // 2.translates CSS into CommonJS
            }, {
                loader: "less-loader" // 1.compiles Less to CSS
            }]
        }]
    }
}
```

## scss-loader

> 将scss-loader转换为css

### 安装

```shell
npm install sass-loader node-sass webpack --save-dev
```

### 使用

```js

// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // 3. 将 JS 字符串生成为 style 节点
      }, {
          loader: "css-loader" // 2. 将 CSS 转化成 CommonJS 模块
      }, {
          loader: "sass-loader" // 1.将 Sass 编译成 CSS
      }]
    }]
  }
};
```

## postcss-loader

### 什么是postcss

* 与less和scss不同，他不是CSS预处理器
* postCSS是一款使用插件去转换CSS的工具
* postCSS有许多非常好用的插件

例如：
* autoprefixer（自动补全浏览器前缀）
* postcss-pxtorem（将px转为rem）
### 安装

```shell
npm i -D postcss-loader
```

### 使用

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader','css-loader', 'postcss-loader' ]
      }
    ]
  }
}
```

#### 安装插件

```shell
npm i -D autoprefixer
```

#### 配置postcss-loader

在css-loader or less-loader or sass-loader之前添加postcss-loader

#### 创建postcss.config.js

```js
module.exports = {
  plugins:{
    "autoprefixer":{
      // 兼容浏览器
      overrideBrowserslist:[
      "ie8 >= 8",
        "Firefox >= 3.5",
      "Chrome >= 35",
      "opera >= 11.5"
      ]
    }   
  }
}
```

#### 安装插件

```shell
npm install postcss-pxtorem -D
```

#### 配置

```js
module.exports = {
  plugins:{
    "autoprefixer":{
      // 兼容浏览器
      overrideBrowserslist:[
      "ie8 >= 8",
        "Firefox >= 3.5",
      "Chrome >= 35",
      "opera >= 11.5"
      ]
    },
    "postcss-pxtorem":{
      rootValue:100,//元素字体大小
      // 可以从px更改到rem的属性
      // propList:["height"]
      propList:['*']//默认所有的属性都需要打包
    }
  }
}
```

## 打包iconfont

### 使用

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(eot|json|svg|ttf|woff|woff2)$/,
        use: [
           { 
            loader:'file-loader',
            options:{
              // 指定打包后文件名称
              name:"[name].[ext]",
              // 指定宝宝后文件存放目录
              outputPath:'font/'
            }   
           }
        ]
      }
    ]
  }
}
```
