# 暗黑模式

## `prefers-color-scheme`

> 媒体查询特性用于检测用户是否有将系统的主题色设置为亮色或者暗色

[prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)

我们在`vueuse`中可以通过`usePreferredColorScheme`这个函数可以拿到这个对应的属性。

还有一个函数`usePreferredDark`这个函数呢，会给我们返回当前是不是深色主题。

我们拿到系统的颜色以后呢，我们可以根据，当前系统的颜色去切换我们的深色主题和浅色主题。

那么如何做深浅主题切换这一部分呢，我么可以一起来看一下，我们用到的是`useDark`函数。

实现切换深色主题的原理就是我们在标签中配置一个属性或者一个类名称，例如默认情况下`useDark`是修改`html`标签中的`class`如果是深色模式，就会在`class`中添加一个`dark`类名。然后我们在定义样式的时候的时候，我们需要自定义支持`dark`模式，比如我们在开发一个组件的时候，我么可以定一些常用的变量：

```css

--primary-color: #000;

html.dark{
  --primary-color: #fff;
}

.bg{
  color: var(--primary-color)
}


```


同时我们也可以自己去定义。



