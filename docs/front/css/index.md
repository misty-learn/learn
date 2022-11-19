# CSS基础

::: tip

这里主要记录CSS和CSS3的新特性、CSS中常用的基本知识库以及经常需要用到的语法

:::

## 选择器

### id选择器

通过id属性设置标签的样式，id在整个网页中是唯一的

```html
  <div>
    <p id="myP">我是段落</p>
  <div>
  <style>
    #id{
      color:red
    }
  </style>
```

### 类选择器

通过class属性设置一个或多个标签的样式,class在整个网页中可以有一个或多个

```html
<div>
  <p class="classP">我是段落1</p>
  <p class="classP">我是段落2</p>
</div>
<style>
    .classP{
      color:red
    }
</style>
```

### 后代选择器

后代选择器必须用空格隔开

后代选择器不一定是儿子，还可以是孙子，重孙子等等，只要在父标签内部的都可以设置样式

后代选择器可以无限的往下延伸

```html
<div>
  <p>
    我是段落1
  </p>
  <p>
    我是段落2
  </p>
  <div>
    <p>
      我是段落3
    </p>
  </div>
</div>
<style>
    div p{
      color:red
    }
</style>
```

### 子元素选择器

找到指定标签中所有特定的直接子元素，然后设置属性

```html
<div>
    <p>
        我是段落1
    </p>
    <p>
        我是段落2
    </p>
    <div>
        <p>
            我是段落3
        </p>
    </div>
</div>
<style>
  div>p{
    color: red;
  }
</style>
```

### 交集选择器

给所有选择器中的标签中，相交的部分设置属性

::: warning 注意点：

选择器之间没有任何连接符，需要紧紧挨在一起

:::

```html
<p class="myColor">
  我是段落1
</p>
<p>
  我是段落2
</p>
```

### 并集选择器

给所有选择器选中的标签设置属性

需要使用`,`连接起来

```html
<style>
  .myColor,.myColor1{
    color: red;
  }
</style>
<div>
    <p class="myColor">
        我是段落1
    </p>
    <p>
        我是段落2
    </p>
    <div>
        <p class="myColor1">
            我是段落3
        </p>
    </div>
</div>
```

### 兄弟选择器

 #### 相邻兄弟选择器(CSS2)

给指定选择器后面紧跟的哪个选择器选中的标签设置属性`+`

```html
<div>
   <h1>我是标题</h1>
    <p>我是段落1</p>
    <p>我是段落2</p>
    <p>我是段落3</p>
   <h1>我是标题</h1>
    <p>我是段落1</p>
    <p>我是段落2</p>
    <p>我是段落3</p>
</div>
<style>
  h1+p{
    color: red;
  }
</style>
```



#### 通用兄弟选择器（CSS3）

给指定选择器后面的兄弟标签设置属性`~`

```html
<div>
   <h1>我是标题</h1>
    <a href="#">我是超链接</a>
    <p>我是段落1</p>
    <p>我是段落2</p>
    <p>我是段落3</p>
   <h1>我是标题</h1>
    <a href="#">我是超链接</a>
    <p>我是段落1</p>
    <p>我是段落2</p>
    <p>我是段落3</p>
</div>
<style>
  h1~p{
    color: red;
  }
</style>
```

### 序选择器

#### 同级别的第几个

```html

<style>
    p:first-child{
        color: red;
    }
</style>

<p>1</p> <!-- 红-->
<p>2</p>
<div>
    <p>3</p> <!-- 红 -->
    <p>4</p>
</div>

```

**`:first-child`**

与`:last-child`正好相反

选中同级别的第一个标签

::: warning 注意点

不区分类型：

```html

<h1>标题</h1>
<p>1</p>
<p>2</p>
<div>
    <p>3</p> <!-- 红 -->
    <p>4</p>
</div>

```
因为同类型中的第一个标签不是p标签所以只有div>p标签飘红

:::

```html

<style>
    p:first-of-type{
        color: red;
    }
</style>
<h1>标题</h1>
<p>1</p> <!-- 红-->
<p>2</p>
<div>
    <p>3</p> <!-- 红 -->
    <p>4</p>
</div>

```
**`:first-of-type`**

选中同级别中同类型的第一个标签

同级别同类型的最后一个`:last-of-type`

#### 同类别的第几个

## 三大特性

### 继承性

给父元素设置一些属性，子元素也可以使用，这就是继承性

::: warning 注意点:

1. 并不是所有的都可以继承：只有以color/font/text/line开头的属性才会被继承

2. 在CSS的继承中，不仅仅是儿子可以继承，只要是后代就可以被继承

3. CSS继承的特殊性
    * a标签的文字颜色和下划线不能继承的
    * h标签的文字大小是不能继承的
    
4. 应用场景
    一般用户网页上的一些共性信息。例如网页的文字颜色，字体，文字大小
:::

### 层叠性

CSS处理冲突的一种能力


::: warning 注意点

层叠性只有在多个选择器中"同一个标签"，然后有设置了"相同的属性"，才会发生层叠性

:::

### 优先级

当多个选择器选中同一个标签，并且给同一个标签设置相同的属性，如何层叠就由优先级来确定

判断优先级的三种方式

* 是否直接选中（间接选中就是继承）

如果是间接选中那么谁里目标标签鼻尖近就听谁的

* 相同选择器

如果都是直接选中，并且都是相同类型的选择器，那么就是谁卸载后面就听谁的

* 不同选择器

如果都是直接选中，并且不是相同类型的选择器，那么就会按照选择器的优先级来层叠

id > 类 > 通配符 > 继承 > 浏览器默认

* important

用于提升某个直接选中标签的选择器中的某个属性的优先级的，可以将被指定的属性的优先级提升为最高

::: warning 注意点

* important只能用于直接选中，不能用于间接选中

* 通配符选择器选中的标签也是直接选中的

* important只能提升被指定的属性的优先级，其他的属性的优先级是不能被提升的

:::

* 优先级的权重

当多个选择器混合在一起使用的时候，我们可以通过计算权重来判断睡的优先级高


## 背景相关

### 背景尺寸相关

`background-size`

1. 默认

2. 像素

`background-size: 宽度 高度`

3. 百分比

以当前父级元素为基础

`background-size:50% 50% `

4. 宽度等比拉伸

`background-size:auto 100px`

5. 高度等比拉伸

`background-size:100px auto`

6. cover

告诉系统图片需要等比拉伸且拉伸到宽度和高度都填满父级元素

`background-size:cover`

7. contain

告诉图片等比拉伸，只要宽度或高度一个填满父级元素，就不再拉伸

`background-size:contain`

### 背景图片的定位区域

1. 默认 `padding-box`

`background-origin:padding-box`

默认情况下背景图片从内边距开始显示

2. border-box

从边框开始显示

3. content-box

从内容区域开始显示

### 背景绘制区域的属性

`background-clip`

1. padding-box

从内边距开始绘制背景

2. border-box (默认)

从border区域开始绘制背景

3. content-box

从内容区域开始绘制背景

### 多重背景绘制

多张背景图片直接用`,`隔开即可

`background-image:第一张图片,第二张图片`

编写多重背景的时候可以拆开写：

```
background-image:图片1,图片2;

background-repeat:no-repeat,no-repeat;

background-position:left top,right top;

```

## 边框图片

如果只通过source指定了那张图片作为边框的图片，默认情况下会将图片放到边框的四个顶点

如果设置了边框图片，那么就不会消失边框颜色，边框图片的优先级高于边框颜色

border-image-source:url()

告诉浏览器如何对指定的边框图片进行切割

border-image-slice:70 70 70 70

70 70 70 70 fill
如果给定的后面有一个fill ，会把裁切掉中间的一块填满整个盒子


告诉浏览器边框图片显示的宽度，并不是指定边框的宽度

如果指定了边框图片的宽度，那么默认的边框宽度就会失效

border-image-width:10px

告诉浏览器除了边框图片四个角以外的图片如何填充，默认是拉伸

border-image-repeat:stretch

如果取值为 repeat 除了四个角以外的其他部分会被重复显示，不够显示一张图片的会被裁切掉

如果取值为 round 除了四个角以外的其他部分会被重复显示，不够显示一张图片的则会被拉伸


告诉浏览器边框图片需要向外移动多少

border-image-outset: 上 右 下 左

**连写：**

border-image:资源地址 切割方式 填充模式

## 线性渐变

background: linear-gradient(to top,red,green)

可以实现多方向的渐变

to top 向上渐变

to bottom 向下渐变

to left 向左渐变

to bottom 向右渐变

to top left 向左上渐变

使用度数渐变 45deg 向45°的方向渐变

度数渐变的方向为坐标轴的四个基本象限

::: warning 注意点

1. 渐变色至少传递两个颜色

2. 默认情况下系统会自动计算纯色和渐变色的返回，但是我们也可以手动指定纯色的范围

指定格式为：颜色 返回 如 background: linear-gradient(to top,red 50px,green 100px)

只有第一个50个像素为纯色，从第二个像素开始指定的是从50-100个像素是渐变色一次类推后面指定的全部都是渐变色的范围

:::

## 径向渐变

默认情况下径向渐变是从中心点向四周扩散

可以指定关键词，使其开始从某个方向渐变

background: radial-gradient(at top, red,green);

可以指定某个位置的方式使用渐变 

background: radial-gradient(at 100px 200px, red,green);

可以指定扩散的范围,从at前面指定扩散的范围

background: radial-gradient(100px at 100px 200px, red,green);

如果只需要指定渐变扩散的范围

background: radial-gradient(100px, red,green);

##  清除浮动的几种方法

在使用浮动布局的时候，默认会脱离标准流，不会自动撑起父元素的高度，所以需要我们手动去清除浮动

### 方式1

给父元素的盒子设置一个高度（不推荐）

### 方式2

使用css的clear属性

值：left 告诉浏览器不要找前面的左浮动元素
值：right 告诉浏览器不要找前面的右浮动元素
值：both 不要找左边和右边的浮动元素

::: warning 注意点：

当我们给某个盒子添加一个clear属性之后，会导致margin会失效

:::

### 方式3

隔墙法

* 外墙法

在第一个盒子和第二个盒子的之间添加一个额外的块级元素，给这个额外的块级元素设置一个clear:both


::: warning 注意点

可以让第二个盒子使用margin-top的属性

但是不能让第一个盒子使用margin-bottom的属性

一般来说我们可以设置额外的盒子的高度

:::

* 内墙法

在第一个盒子中所有子元素最后添加一个额外的块级元素

给这个块级元素设置一个clear:both的属性

::: warning 注意点

可以让第二个盒子使用margin-top的属性

也可以让第一个盒子使用margin-bottom的属性

也可以设置额外的高度

:::

**区别：**

内墙法可以撑起第一个盒子的高度，外墙法不能撑起盒子的高度


企业开发中不推荐使用这种方式来清除浮动

## 伪元素选择器

给指定标签的内容的前面（后面）添加一个子元素

```

# 给指定标签的内容的前面添加一个子元素

标签::before{
    content:"我是前面内容";
    display:block;
    width:50px;
    height:50px;
    background-color:red
}

# 给指定标签的内容的后面添加一个子元素

标签::after{
    // 指定添加子元素的内容
    content:"我是后面内容";
    // 指定添加子元素的显示模式
    display:block;
    // 指定添加的子元素的宽高
    width:50px;
    height:50px;
    background-color:green;
    // 隐藏添加的子元素
    visibility:hidden
}

```

### 清除浮动的方式4

伪元素选择器中清除浮动不支持IE6，需要给标签设置一个`*zoom:1;`来兼容IE6

```css

标签::after{
    /*设置添加的子元素的内容为空*/
    content: "";
    /*设置添加的子元素的显示模式为块级元素*/
    display: block;
    /*设置高度为0*/
    height: 0;
    /*设置隐藏*/
    visibility: hidden;
    /*清除浮动*/
    clear: both;
}

标签{
    *zoom:1;
}

```

### 清除浮动的方式5（推荐）

使用`overflow:hidden`

在第一个盒子中增加一个`overflow:hidden`就可以清除浮动

::: warning 注意点：

兼容问题，在IE6中无效，同样在第一个盒子中也要添加一个`*zoom:1`即可

如果两个盒子是嵌套关系，设置margin的时候外面的一个盒子也会被顶下来，第一种方式是设置border来实现，还有就是通过overflow:hidden来实现

:::
