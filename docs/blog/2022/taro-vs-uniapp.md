# Taro和uniapp对比

近期公司项目需要开发H5端的组件库，考虑到以后还有小程序的需求，所以我们准备选择使用跨端框架来开发，经过前期的调研，我们选择了Taro和uniapp两个多端框架，准备从两个框架中拿出一个来作为公司多端开发的框架。

下面我们从以下几个方面来对比这两个框架：

## 语法

### 样式

Taro在小程序中是不支持使用scoped语法的，官方推荐使用cssModules来代替。[详见](https://github.com/NervJS/taro/issues/6662)
这是一个风险点，因为cssModules的语法和scoped语法不一样，如果我们的团队成员之前没有使用过cssModules，那么在开发过程中就会出现一些问题。

在Uniapp中除了百度小程序不支持scoped语法，其他小程序都支持。


### 构建工具

Taro在3.5.x中使用的webpack + esbuild进行构建，在3.5.6版本开始中提供了预构建的功能，进一步提升了热更新的速度。

Uniapp在vue3中使用vite进行构建项目。


### 语法兼容

Taro和Uniapp均都可以使用部分html的方式进行编写。

例如：div span img等

Taro提供了useRouter的hook，可以获取到路由的参数和实现路由跳转，但是在uniapp中没有提供类似的hook。

Taro提供了宏函数开发模式，可以通过宏函数实现定义子组件的功能和配置，uniapp没有提供类似的功能。

> Taro预计在3.6版本中支持继承的react-router和vue-router的跳转功能[详见](https://taro-docs.jd.com/docs/router-extend)

## 性能

### 体积

在体积方面，Taro开发模式下体积要比uniapp大很多，差距大概在40%左右，但是在生产模式下，Taro的体积也是比uniapp大一些，差距大概在10%左右。

### 编译速度

在编译速度上目前还是无法和vite进行比较，热更新和编译速度上uniapp要比Taro快很多。

## 平台支持

在小程序支持上Taro和uniapp基本上没有太大的差别。

原生支持上，uniapp有单独的壳实现桥接原生api。Taro没有原生支持，预计在3.5.x版本支持原生的鸿蒙JS应用的开发。uniapp因为套用的安卓壳子，所以也是没什么问题的。但是包体积会比较大。

## 开发体验

Taro是基于px2rem和px2rpx的方式实现的，所以在开发H5的体验上可能会更好一些。更容易上手一些。能友好的兼容各种开发工具，比如vscode，webstorm等。
[Taro-demo](https://github.com/mistjs/taro-vue3-starter)


uniapp是在H5端是基于小程序的rpx2rem的方式实现的，所以在开发H5的体验上可能会比较差一些。对于开发工具来说，目前大部分的开发工具没有对rpx有友好的支持，所以除了HBuliderX，其他的开发工具都不是很友好。

[uniapp-demo](https://github.com/dcloudio/uni-preset-vue)
