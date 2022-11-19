# plugins使用

plugin用于扩展webpack的功能，当然loader也是变相的扩展了webpack，但是它只专注于转化文件这一个领域，而plugin的功能更加的丰富，而不仅局限于资源的加载

## html-plugin

### 安装

```shell script
npm install --save-dev html-webpack-plugin
```

### 使用

在webpack.config.js文件中增加plugins配置项

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  // 告诉webpack需要新增一些什么样的功能
  plugins:[new HtmlWebpackPlugin()]
}
```

### 配置项

如果有自己的index.html文件需要单独进行配置模板

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
new HtmlWebpackPlugin({
//  填写自己的html模板地址
template: "./index.html",
// 代码压缩
minify:{
  // 删除不需要的空格和换行符号
  collapseWhitespace:true
}
})
```

## clean-plugins

打包之前清空原来的安装包，不会产生冗余的资源

### 安装

```shell script
npm install --save-dev clean-webpack-plugin
```

### 使用

在webpack.config.js中再引入并使用插件

```js
const  CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  plugins:[new CleanWebpackPlugin()]
}
``` 

## copy-plugin

在打包项目的时候除了JS/CSS/图片/字体图标等需要打包以外，可能还有其他资源需要打包，文档内容是固定不变的，我们只需要将对应的文件拷贝至打包目录中即可
那么这个时候就需要我们使用copy-plugin来实现文件的拷贝

### 使用

```shell script
npm install --save-dev copy-webpack-plugin
```

### 使用

```js
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
//在数组中填写需要拷贝的文件
  plugins:[new CopyWebpackPlugin([
  {
// 从哪里拷贝
  from:'./doc',
// 拷贝到哪里
to:'doc'  
}  

])]
}
```

## 项目层级结构调整

一般项目中的有对应的结构目录,例如project的项目中的目录结构，我们需要更改几个webpack的默认配置项

```js
module.exports = {
// 入口方向
entry: "./src/js/index.js",
// 出方向
 output: {
    /**
     * 指定打包之后的JS文件的名称
     */
    filename: "bundle.js",
    /**
     * 指定存放打包文件的存放文件夹地址
     */
    path: path.resolve(__dirname, "bundle")
  },
// 如果存在模板
// 需要对模板的地址也要修改
plugins:[
new HtmlWebpackPlugin({
// 需要打包的文件路径
  template: "./src/index.html"
})
]
}
```

## css-plugin

是将css内容提取到单独的文件中
> 之前打包的内容全部都是放到head里面的

### 安装

```shell script
npm install --save-dev mini-css-extract-plugin
```

### 使用

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin({
  filename:'css/[name].css'
})],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

## 压缩css代码

> css在正式打包的时候，需要将css代码进行压缩，减少包的体积

### 安装

```shell script
npm install --save-dev optimize-css-assets-webpack-plugin
``` 

### 使用

```js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
/**
* 配置webpack的优化项，
*/
optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({})],
  }
};
```

::: warning 注意点 

使用了上面的css压缩代码之后，原来的js代码压缩就会失效，需要单独安装一个js的代码压缩插件

:::

### 安装js代码压缩

```shell script

npm install --save-dev terser-webpack-plugin

```

### 结合使用

```js

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

```

## webpack-watch

可以监听打包文件的变化，当修改后会重新编译。

### 使用

```js
module.exports = {
// 默认是false
  watch:true,
  watchOptions:{
    aggregateTimeout:300, // 防抖 如果我正在修改文件，需要等修改完后多少毫秒后才能打包
    poll:1000, //每隔多少秒检查一次文件变动
  ignored:/node_modules/ //排除一些巨大文件夹，不需要进行监控的文件夹
  }
};
```

## webpack-dev-server

* 可以实时监听文件的变化
* 可以将我们打包好的程序运行在一个服务器环境下
* 可以解决企业开发中“开发阶段”的跨域问题

### 安装

```shell script

npm install webpack-dev-server --save-dev

```

### 使用

```js

module.exports = {
devServer : {
  contentBase:"./bundle",//运行目录
  open:true,// 编译打包之后是否自动打开
  port:9090 // 端口
}
}

```

::: warning 注意
    watch和dev-server不能同时开启
:::

* 在package.json 中的scripts中配置一下

```json

{
  "scripts": {
    "test": "npx webpack-dev-server --config webpack.config.js" 
  }
}

```

## 前端跨域

* 同源策略是一种约定，它是浏览器最核心也是最基本的安全功能
* 所谓同源是指：协议，域名，端口都是相同的，否则就是跨域

### 利用dev-server解决跨域

```js
module.exports = {
  devServer:{
    contentBase:"./bundle",
    open:true,
    port:9090,
    proxy:{
      // 当我们在代码中发送请求/user的时候，devServer就会将请求的地址替换为http://127.0.0.1:3000/user
      "/user":{
      //  跨域地址为ip地址 
          target:"http://127.0.0.1:3000",
      // 如果为域名请求需要配置
          changeOrigin:true,
      // 跨域地址为https需要配置
          secure:false
      } 
    }
  }

};
```

::: warning 注意点
 只能解决开发阶段的痛点，线上还需要修改
:::

### 其他配置项

```js
module.exports = {
  devServer:{
    contentBase:"./bundle",
    open:true,
    port:9090,
    proxy:[
      {
        context:["/user","/login"],
        //  跨域地址为ip地址 
        target:"http://127.0.0.1:3000",
        // 如果为域名请求需要配置
        changeOrigin:true,
        // 跨域地址为https需要配置
        secure:false,
        pathRewrite:{"":"/api"} //路径重写，将路径中的api替换为空
      } 
    ] 
  }
};
```

## 热更新

### 什么是HMR？

* 通过webpack-dev-server自动打包并没有真正的放到指定的目录中，因为读写磁盘是非常耗时和性能的，所以为了提升性能dev-server直接将转换号的内容放到了内存中
* 通过webpack-dev-server可以实现实时监听打包内容的变化，每次打包之后都会自动刷新网页，但是正是因为每当内容改变时都会自动刷新网页，所以给我们带来了很多不便，这时就需要通过HMR插件来优化调试开发
* HRM（热更新插件）会在内容发生改变的时候实时的更新修改网页内容，但是不会重新刷新页面

### 使用

热更新插件为内部插件不需要npm 引入

```js
const Webpack = require("webpack")

module.exports = {
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ],
devServer:{
    contentBase:"./bundle",
    open:true,
    port:8080,
    proxy:[
          {
            context:["/user","/login"],
            //  跨域地址为ip地址 
            target:"http://127.0.0.1:3000",
            // 如果为域名请求需要配置
            changeOrigin:true,
            // 跨域地址为https需要配置
            secure:false,
            pathRewrite:{"":"/api"} //路径重写，将路径中的api替换为空
          } 
        ],
    hot:true, //开启热更新，只要开启热更新就不会自动刷新网页了
    hotOnly:true // 哪怕不支持热更新也不需要刷新网页
}
};
```

::: warning 注意点

 如果是通过压缩css代码文件引入的方式，热更新不生效，需要单独配置一下需要热更新的css插件
 
:::

```js
const Webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ],
rules: [
      {
        test: /\.css$/,
        use: [{loader: MiniCssExtractPlugin.loader,
        options:{
          //热更新开启
          hmr:true
        }}, 
        {loader:'css-loader'}],
      },
    ],
devServer:{
    contentBase:"./bundle",
    open:true,
    port:8080,
    proxy:[
          {
            context:["/user","/login"],
            //  跨域地址为ip地址 
            target:"http://127.0.0.1:3000",
            // 如果为域名请求需要配置
            changeOrigin:true,
            // 跨域地址为https需要配置
            secure:false,
            pathRewrite:{"":"/api"} //路径重写，将路径中的api替换为空
          } 
        ],
    hot:true, //开启热更新，只要开启热更新就不会自动刷新网页了
    hotOnly:true // 哪怕不支持热更新也不需要刷新网页
}
};
```

### Js热更新

* 对于CSS而言，在css-loader已经实现了热更新，只要css代码发生变化，就会立即被更新
* 而对于JS模块而言，系统默认并没有给我们实现热更新，所以修改了js模块代码并不会立即生效

#### 实现JS热更新

1. 手动实现热更新

```js
// 判断当前是否有热更新
if(module.hot){
// 告诉热更新,需要监听那个JS模块的变化
  module.hot.accept("./test.js",function(){
    let oSpan = document.querySelector("span");
    document.body.removeChild("span");
    addSpan()
  })
}
```

## webpack-babel-转ES678语法

在企业开发中为了兼容低级版本的浏览器，需要将ES678高级语法转换为ES5低级语法，否则在低级版本浏览器中我们的程序无法正确执行，
默认情况下webpack是不会将我们的代码转换成ES5低级语法的，如果需要转换我们需要使用babel来转换

### 安装

```shell script
npm install --save-dev babel-loader @babel/core
```

### 使用

```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.js$/,
        // 不处理那个文件夹 
        exclude: /node_modules/, 
        loader: "babel-loader" }
    ]
  }
}
```

**以上配置还不能将ES678转成ES5还需要进行相应的配置如下：**

1. 安装配置项插件

```shell script

npm install @babel/preset-env --save-dev

```

2. 使用配置项

```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.js$/,
        // 不处理那个文件夹 
        exclude: /node_modules/, 
        loader: "babel-loader",
        options :{
          "presets": [["@babel/preset-env",{
          "targets": {
              "chrome": "58",
              "ie": "11"
            }          
        }]]
        }
 }
    ]
  }
}
```
3. 优化presets

在实际企业开中默认情况下babel会将所有高于ES5版本的代码全部转换为ES5代码，
但是有时候可能需要我们兼容的浏览器已经支持ES678的代码，那么就不需要再次进行转换，因为会影响网页的性能问题，
所以我们需要通过presets的方式告诉webpack需要兼容那些浏览器，
然后babel就会根据我们的配置自动调整转换方案，如果需要兼容的浏览器已经实现了，就不需要转换了

### 利用babel实现低级语法

对于有对应关系的语法而言，还不能够实现自动转换。
* 什么是对应关系

let 对应 var 这样
箭头函数 对应 普通函数

* 没有对应关系

Promise 和 includes等ES678自有的语法

#### 实现无对应关系的语法转换

1. 安装

```shell script
npm install --save @babel/polyfill
```

2. 使用

在无对应关系的语法中导入

```js
import "@babel/polyfill"
Promise.resolve().then(function() {
  console.log("test");
})
```

* 这样引入会将全部的代码都打包到文件中

3. 按需加载

```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.js$/,
        // 不处理那个文件夹 
        exclude: /node_modules/, 
        loader: "babel-loader",
        options :{
          "presets": [["@babel/preset-env",{
          "targets": {
              "chrome": "58",
              "ie": "11"
            },
        // 按需进行打包方法
        useBuiltIns:"usage"       
        }]]
        }
 }
    ]
  }
}
```

::: warning 注意点：

* 直接在文件中导入polyfill模块的弊端
只适用于一般项目的开发，但是如果在编写一些第三方模块的时候会出现一些问题
，因为这种方式是通过全局变量的方式来注入代码，会污染全局环境。
* 如果在webpack中配置好`useBuiltIns:"usage"`不需要在页面再进行手动引入

:::

### 第二种配置方式

#### 安装

```shell script

npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime

# 不污染全局环境
npm install --save @babel/runtime-corejs2
```

#### 使用

```js
module.exports={
module: {
    rules: [
      { 
        test: /\.js$/,
        // 不处理那个文件夹 
        exclude: /node_modules/, 
        loader: "babel-loader",
        options :{
          "presets": [["@babel/preset-env",{
          "targets": {
              "chrome": "58",
              "ie": "11"
            },
            "plugins": [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "absoluteRuntime": false,
                    // 不要污染全局环境
                    "corejs": 2,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false,
                    "version": "7.0.0-beta.0"
                  }
                ]
              ],
        // 按需进行打包方法
        // useBuiltIns:"usage"       
        }]]
        }
 }
    ]
  }


}

```

::: warning 注意点：
 默认情况下第二种方式也会污染全局的环境需要将配置项`corejs:fasle`
 
 改成`corejs:2`不会污染全局的环境但是需要单独引入
 `npm install --save @babel/runtime-corejs2`
:::

## babel使用技巧

1. 查看错误提示
2. 根据错误信息查询文档
3. 根据文档缺什么安装什么配置什么

## html-withimg-loader

我们通过file-loader或url-loader只能打包css和js中用到的图片，但是无法打包在html中直接使用img标签中的图片到指定的目录
所以需要使用`html-withimg-loader`的在假期来实现HTML中图片的打包

### 安装

```shell script
npm i -D html-withimg-loader
```

### 使用

```js
module.exports = {
rules:[
{
  loader:"html-withimg-loader",
  test:/\.(htm|html)$/i  
}
]
}
```

## 图片压缩和合并

在企业开发中为了提升网页的访问速度，除了对HTML、CSS、JS以外
还会对网页上的拖进行压缩和合并，压缩可以减少网页体积，合并可以减少请求次数

### 压缩安装

```shell script
npm i -D image-webpack-loader
```

### 压缩使用

```js
module.exports={
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
{
loader: "file-loader",
options:{
  name:"[name].[ext]",
  outputPath:"images/",
  // 访问路径（临时解决）
  publicPath:"http://loacalhost/"
}
},
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
}
```

::: warning 注意点：
压缩之后会有图片无法正常显示，是因为路径问题导致，后面解决此问题
:::

### 合并安装（CSS中使用）

为了减少网页的请求次数，使用webpack可以自动生成“精灵图”并且还不用手动设置图片的位置

```shell script
npm i -D postcss-sprites postcss
```

### 合并使用

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
    "postcss-sprites":{
      // 告诉webpack合并之后的图片保存到什么地方
      spritePath:"./bundle/images",
      // 告诉webpack合并图片的时候如何分组
      groupBy: function(image) {
        // image.url 为对象
        let path = image.url.substr(0,image.url.lastIndexOf("/"));
        let name = path.substr(path.lastIndexOf("/")+1);
        return Promise.resolve(name);
      },
      // 哪些是不需要合并的
      filterBy:function(image) {
        let path = image.url;
        if(!/\.png$/.test(path)){
            return Promise.reject();
        }
        return Promise.resolve();
      }
    }   
  }
}
```

## 解决图片路径问题

webpack打包之后给我们的都是相对路径，会导致报错信息

* 在开发阶段将publicPath设置为dev-server服务器地址
* 在上线阶段需要将publicPath设置为线上的服务器地址就可以解决

## webpack-eslint

* ESLint是一个插件化的JavaScript代码检测工具。
* 用于检查常见的JavaScript代码错误，也可以进行“代码规范”检查
* 在企业开发中项目负责人会定制一套ESLint规则，然后应用到所编写的项目中
* 从而实现辅助编码规范的执行，有效控制项目代码的质量
* 在编译打包时如果语法有错误或者不符合规范的语法就会报错，并且会提示相关错误信息

### 使用

```shell script

npm install eslint-loader --save-dev
npm install eslint --save-dev

```

### 使用

```js
module.exports = {
  // ...
  module: {
    rules: [
      // 检查代码规范的规则
      {
        // 让当前的loader在其他loader之前执行
        enforce:"pre",
        test: /\.js$/,
        exclude: /node_modules/,
        // 需要检查的文件
        include: path.resolve(__dirname,'src'),
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
          // 发现错误代码自动修复错误代码
          fix:true
        },
      },
    ],
  },
  // ...
};
```

* webstorm自动修复代码

## 优化webpack配置文件

1. 区分开发环境和线上环境

* 在开发阶段我们为了提升运行效率以及调试效率，一般会通过`dev-server`来打包，在开发阶段我们为了提升打包效率，不会对打包内容进行压缩

* 在线上阶段我们需要拿到真实的打包文件，所以不会通过`dev-server`来打包，在线上阶段我们为了提升访问的效率，所以在打包时需要对打包的内容进行压缩

* 但是当前我们将“开发和线上”的配置都写到了一个文件中，这样非常不利于我们去维护配置文件，
所以我们需要针对不同的环境将不同的配置文件写到不同的文件中

2. 优化开发和线上环境

* 区分完不同环境配置文件之后发现两个文件之前存在大量重复配置
* 我们可以利用`webpack-merge`模块来实现代码的抽离和合并进一步优化配置文件
* 将代码冗余抽离至`webpack.config.prod.js`和`webpack.config.dev.js`

```js
const Merge = require("webpack-merge");
const CommonConfig = require("./webapck.config.common.js");

const config = {
  // webpack独立的配置文件
}

module.exports = Merge(CommonConfig,config);

```

* 在webpack中配置一下启动时候需要的配置文件
