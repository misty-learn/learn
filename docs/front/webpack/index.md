# webpack基础学习

## 什么是webpack
是一套基于NodeJS的“模块打包工具”
在webpack刚推出的时候就是一个单纯的JS模块打包工具，可以将很多个模块的JS文件合并打包到一个文件中，但是随着时间的推移、众多开发者的追捧和贡献，现在的webpack不仅仅能够打包JS模块，还可以打包CSS/LESS/SCSS/图片等其他文件

## 为什么要分模块
如果将所有的JS代码都写到一个文件中，十分不利于代码的维护和复用
所以我们可以将不同的功能写到不同的模块中，这样就提升了代码的维护性和复用性
但是当将代码写到不同模块时新的问题又出现了
导入资源变多，请求次数增多，网页性能变差了

## 如何解决上述问题
项目上线时将用到的所有模块都合并到一个文件中
在html中只导入主文件、再主文件中再导入依赖模块

## 如何通过webpack来打包模块
安装webpack
```shell
npm init -y
npm i -D webpack
npm i -D webpack-cli
```
在终端中输入打包的指令
npx webpack index.js

> 利用webpack将index.js和它依赖的模块打包到一个文件中
>其实webpack指令中除了可以通过命令行的方式告诉webpack需要打包哪个文件以外，还可以通过配置文件的方式告诉webpack需要打包哪个文件

::: warning 注意点
index.js就是需要打包的文件
打包之后的文件会放到dist目录中，名称叫做main.js
:::

## webpack常见配置

`entry`:需要打包的文件
`output`:打包之后输出路径和文件名称
`mode`:打包模式 development/production
`development`:不会压缩打包后的js代码

::: warning 注意点
* 配置文件的名称必须叫做:webpack.config.js 否则直接输入 npx webpack 会报错
* 如果要只用其他的名称，那么输入打包命令的时候必须通过`--config`指定配置文件
* 指令过长，可以通过package.json的scripts来定义指令后再执行npm test 或npm run 指令名称操作即可完成
:::

## sourcemap

### 什么是sourcemap
webpack打包后的文件自动添加很多代码，在开发过程中非常不利于我们调试
因为如果运行webpack打包后的代码，错误提示的内容也是打包后文件的内容
所以为了降低调试的难度，提高错误代码的阅读星，我们就需要知道打包后代码和打包之前代码的关系
只要有了这个映射关系我们就能很好的显示错误提示的内容，存储这个映射关系的文件我们就称为sourcemap

### 如何开启sourcemap

#### eval（不推荐）:
* 不会单独生成sourcemap文件，会将映射关系存储到打包文件中，并通过eval存储
* 优势：性能最好
* 缺点：业务逻辑比较复杂时候提示信息可能不全面不正确

#### source-map:
* 会单独生成sourcemap文件，通过单独文件来存储映射关系
* 优势：提示信息全面，可以直接定位到错误代码的行和列
* 缺点：打包速度慢

#### inline:
* 不会单独生成sourcemap文件，会将映射关系存储到打包的文件中，并且通过base64字符串形式存储

#### cheap：
* 生成的映射信息只能定位到错误行不能定位到错误列

#### module:
* 不仅希望存储我们代码的映射关系，还希望存储第三方模块映射关系，以便于第三方模块出错时也能更好的排错

### 企业开发中的配置

#### dev开发

* cheap-module-eval-source-map
* 只需要行错误信息，并且包含第三方模块错误信息，并且不会生成单独sourcemap文件

#### pro生产

* cheap-module-source-map
* 只需要行错误信息，并且包含第三方模块错误信息，并且会生成单独sourcemap文件

### 配置sourcemap

在webpack.config.json中添加如下代码

```js
module.exports =
{
  devtool:"cheap-module-eval-source-map"
}
```

## ES6模块化

* 在ES6出现之前，JS不像其他语言一样拥有“模块化”这一概念，于是为了支持模块化
* 我们使用类、立即执行函数或者第三方插件(RequireJs、seaJS)来实现模块化
* 但是ES6出现之后，上述的解决方案已被废弃，因为ES6中正式引入了模块化概念

* ES6模块化和NodeJS中一样，一个文件就是一个模块，模块中的数据都是私有的
* 可以通过对应的关键字暴露模块中的数据
* 可以通过对应的关键字导入模块，使用模块中暴露的数据

### ES6 导出导入

#### 第一种方式

`a.js`文件
```js
let name = "test"
export {name}
```
`index.js`文件
```js
import {name} from "./a.js"
console.log(name);
```

::: warning 注意点
1. 如果是通过 `export{xxx}`方式导出数据，那么在导入接收的变量名称必须和导出的名称一致。
**因为在导入的时候本质上是ES6的解构赋值！**
2. 如果是通过 `export{xxx}`方式导出数据，又想在导入数据的时候修改接收的变量名称，那么可以使用as来修改变量名称。
**那么原有的名称就会失效！**
:::

#### 第二种方式

`b.js文件`
```js
let name = "test"
export default name;
```

`index.js文件`
```js
import name from "./b.js"
console.log(name);
```

::: warning 注意点

1. 如果是通过`export default xxx` 导出数据，那么在接收导出数据的时候变量名称可以和导出的名称不一致
2. 如果是通过`export default xxx` 导出数据，那么在模块中只能导出一次`export default`
* 在企业开发中，第一种和第二种使用方式是可以混合使用的
:::

