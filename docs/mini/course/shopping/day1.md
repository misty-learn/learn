# 项目基础配置

> 上节课我们一块儿创建了一个项目，这节课我们一起去配置一下关于我们项目的一些基础配置。

> 这一节课我们会一起去开发一下欢迎页面。

## 颜色配置

首先我们需要定义一些基础的颜色，这些颜色我们会在项目中进行使用。

```less
// 主色配置
@primary-color: #40AE36;
@primary-color-active: #288723;
// 主要文字颜色
@text-color: #333;
// 次要文字颜色
@secondary-text-color: #999;

.primary-bg-color{
  background-color: @primary-color;
}
.btn-primary{
  background-color: @primary-color;
}
.btn-primary:active{
  background-color:@primary-color-active;
}

.main-text-color{
  color: @text-color;
}

.main-secondary-text-color{
  color: @secondary-text-color;
}


```
