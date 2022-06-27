# 配置TabBar和首页的基本配置

> 这节课我们一起配置一下项目中的tabbar和首页的配置

## 配置tabBar

1. 首先我们找到`taro`文档中的[全局配置](https://taro-docs.jd.com/taro/docs/app-config)

2. 然后首先我们看到一个关于`defineAppConfig`宏函数的配置，我们先配置一下这个宏函数。需要注意的是，如果要使用宏函数，请确保我们的`taro`版本大于等于`3.4.x`

我们只需要将我们现在的`app.config.ts`中的用法：

```ts
export default {
  pages: [
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '社区团购',
    navigationBarTextStyle: 'black',
  },
}
```

修改成：

```ts
export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '社区团购',
    navigationBarTextStyle: 'black',
  },
})
```

我们这样配置完成以后，有可能会出现代码并不会进行提示，还会报错的问题，那么我们需要在`tsconfig.json`中，增加一行配置：

```json
{
  "types":[
    "@tarojs/taro/types"
  ]
}
```

如果还不生效可以尝试重启编辑器。

3. 接下来我们配置一下tabBar，我们继续往下看，点击通用配置项中的[tabBar](https://taro-docs.jd.com/taro/docs/app-config#tabbar),我们就可以看到，我们的菜单中都有哪些配置项了。接下来我们根据我们的设计稿来做一下我们底部的按钮。做底部按钮的同时，我们需要创建好对应的目录分别是`category`、`cart`、`profile`以及我们的`index`

```ts
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/profile/index',
    'pages/welcome/index',
  ],
  tabBar: {
    color: '#666',
    selectedColor: '#40AE36',
    list: [
      {
        selectedIconPath: '/assets/icons/home_selected.png',
        iconPath: '/assets/icons/home.png',
        text: '首页',
        pagePath: 'pages/index/index',
      },
      {
        selectedIconPath: '/assets/icons/category_selected.png',
        iconPath: '/assets/icons/category.png',
        text: '分类',
        pagePath: 'pages/category/index',
      },
      {
        selectedIconPath: '/assets/icons/cart_selected.png',
        iconPath: '/assets/icons/cart.png',
        text: '购物车',
        pagePath: 'pages/cart/index',
      },
      {
        selectedIconPath: '/assets/icons/profile_selected.png',
        iconPath: '/assets/icons/profile.png',
        text: '我的',
        pagePath: 'pages/profile/index',
      },
    ],
  },
})
```


4. 这样我们底部按钮部分的配置就完成了，那么我们的全局配置有宏函数，是不是我们的页面配置也存在相同的宏函数呢？接下来我们以`pages/index/index`为例，看一下，如何配置页面级别的宏函数。首先我们先找到`taro`文档中的[页面配置](https://taro-docs.jd.com/taro/docs/page-config)，我们可以看到，这里也给我们列出来如何使用宏函数`definePageConfig`。

我们将我们现在的代码：

```ts
export default {
  navigationBarTitleText: '首页',
}
```

改造成：

```ts
export default definePageConfig({
  navigationBarTitleText: '首页',
})
```

这样我们就完成了页面级别的宏函数的改造。
