# 图标库引入

> 这节课我们来一起来对我们的图标库进行引入。这里我们使用的图标库的地址是[iconfont](https://www.iconfont.cn/)


## 选图标

1. 我们打开iconfont的官网，然后我们通过搜索的方式去查找我们需要的图标库

2. 我们添加图标到购物车。

3. 选完图标后我们点击购物车的图标

4. 然后我们选择添加至项目，如果没有项目的话，可以看到在`加入项目`的右边会有一个`+`号的图标我们点击可以创建一个项目，我这里有这个项目我就不需要再创建了，我们选中【社区平台】的项目，点击确定，就可以添加到我们的项目中去了。

5. 然后我们点击【下载至本地】本地按钮，我们会得到一个文件夹，这个文件中包含了一个`iconfont.css`和`iconfont.woff`以及`iconfont.woff2`的文件，我们需要将这个文件复制到我们的项目中去。

6. 我们在项目目录中创建一个文件夹`assets/iconfont`我们文件放到这个文件夹下，然后修改后缀`.css`为`.less`。

```less
// 我们只需要保留 font-face中的iconfont.woff2以及iconfont.woff即可
@font-face {
  font-family: "iconfont"; /* Project id 3487756 */
  src: url('iconfont.woff2?t=1656417460989') format('woff2'),
  url('iconfont.woff?t=1656417460989') format('woff');
}
```


7. 最后我们在`app.less`中引入。

```less
// 引入图标库
@import "./assets/iconfont/iconfont.less";

```


## 测试图标


我们在`pages/index/index.vue`中进行测试我们的图标是否可以正常展示

```vue
<template>
  <view>
    <text class="iconfont icon-gouwuche" />
  </view>
</template>
```

图标能在页面中正常显示就说明我们引入成功啦



