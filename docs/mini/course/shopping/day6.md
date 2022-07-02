# 开发工具函数

> 这节课我们先分析一下，开发定位这一部分，首先我们需要自定义头部部分，会用到一些工具函数。像获取小程序的基本信息的函数。所以这节我们先来开发一下这些工具函数。

## 组合式API`systemInfo`创建

> 首先我们先创建在`composables`目录下`systemInfo`文件夹，然后我们再创建一个`index.ts`文件。我们开一下在`taro`中是如何获取小程序的基本信息的。[文档地址](https://taro-docs.jd.com/taro/docs/apis/base/system/getSystemInfoSync)


> 这里我们看到会有三个可以获取系统信息的函数，分别是`getSystemInfoSync`、`getSystemInfoAsync`、`getSystemInfo`。这三者之间的区别就是异步和同步的区别，异步的函数会返回一个promise，同步的函数会返回一个对象。这里呢我们使用的是同步获取的钩子`getSystemInfoSync`钩子。


## 创建类型定义

> 接下来我们创建定义类型。我们再`systemInfo`创建`typing.ts`文件，用来存放我们的类型定义部分。定义一个`SystemInfoResult`类型，通过`getSystemInfoSync`这是一个函数，所以我们直接通过`ReturnType`获取一下返回值的类型。然后我们在定义`SystemInfo`接口类型，然后我们先定义一个`systemInfo`的属性，返回的是`SystemInfoResult`这个类型

```ts
import type { getSystemInfoSync } from '@tarojs/taro'

export type SystemInfoResult = ReturnType<typeof getSystemInfoSync>

export interface SystemInfo{
  systemInfo: SystemInfoResult
}
```

## 开发`useSystemInfo`函数

```ts
import { getSystemInfoSync } from '@tarojs/taro'
import type { SystemInfo } from './typing'

export const useSystemInfo = (): SystemInfo => {
  // 获取系统信息
  const systemInfo = getSystemInfoSync()
  return {
    systemInfo,
  }
}
```

## `navHeight`的高度

> 我们发现我们在`systemInfo`中获取不到头部导航栏的高度，所以我们需要自己去计算一下顶部的高度。在微信小程序中有一个方法`getMenuButtonBoundingClientRect`，通过这个参数我们可以获取到胶囊按钮的大小和高度等参数。

> 我们可以通过胶囊按钮的上边框的定位高度`top`和状态栏(`statusBarHeight`)的高度,计算出，上边距的高度，同样，上边距的高度和下边距是一致的，所以我们再加上胶囊按钮的高度，就能计算出整个导航栏的高度了。


```ts
const boundingClientRect = getMenuButtonBoundingClientRect()
const windowInfo = getWindowInfo()
const navHeight = (boundingClientRect.top - (windowInfo.statusBarHeight || 0)) * 2 + boundingClientRect.height
```

* 同时我们也把我们定义的这些数据，统一从这里抛出去，给外界。

```ts
import { getMenuButtonBoundingClientRect, getSystemInfoSync, getWindowInfo } from '@tarojs/taro'
import type { SystemInfo } from './typing'

export const useSystemInfo = (): SystemInfo => {
  // 获取系统信息
  const systemInfo = getSystemInfoSync()
  const boundingClientRect = getMenuButtonBoundingClientRect()
  const windowInfo = getWindowInfo()
  // navHeight 是标题栏的高度
  const navHeight = (boundingClientRect.top - (windowInfo.statusBarHeight || 0)) * 2 + boundingClientRect.height
  return {
    systemInfo,
    navHeight,
    boundingClientRect,
    windowInfo,
  }
}

```

* 补全我们的`typing.ts`的部分

```ts

import type { getMenuButtonBoundingClientRect, getSystemInfoSync, getWindowInfo } from '@tarojs/taro'

export type SystemInfoResult = ReturnType<typeof getSystemInfoSync>
export type BoundingClientRectResult = ReturnType<typeof getMenuButtonBoundingClientRect>
export type WindowInfoResult = ReturnType<typeof getWindowInfo>
export interface SystemInfo{
  systemInfo: SystemInfoResult
  boundingClientRect: BoundingClientRectResult
  navHeight: number
  windowInfo: WindowInfoResult
}

```
