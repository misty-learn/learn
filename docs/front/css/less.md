# LESS学习

1. 什么是CSS预处理器

CSS预处理器就是某一种语言用来为CSS增加一些动态语言的特性（变量、函数、继承）

CSS预处理器可以让你的CSS更加简洁，适应性更强，代码更直观等诸多好处

简言之： CSS预处理器就是升级版CSS

2. 为什么需要LESS

* CSS的语法虽然简单，但它同时也带来一些问题

* CSS需要书写大量看似没有逻辑的代码，不方便维护以及扩展，也不利于复用

* 造成这些原因的本质源于CSS是一门非程序式的语言，没有变量/函数/作用域等概念

3. 什么是LESS

* Less是一门CSS预处理语言，为CSS赋予了动态语言的特征

* 它扩展了CSS语言，增加了变量、Mixin（混合）、嵌套、函数、运算等特性，使CSS更易维护和扩展

* 类似于JS语法写法的CSS

## 注释

```less

// 单行注释 --- 单行注释不会参数预处理

/**
  多行注释 ---- 会被编译到css文件中
*/ 

```

## 变量

@变量名称:值

两个变量之间可以互相赋值

```less

@a:red;

@b:@a;

```

### 局部变量

```less

@b:green;

.box1{
// 局部变量
  @a:red;
}

```

在定义变量的时候，如果两个变量名称相同后定义的会覆盖先定义的变量

### 变量插值

@w:width;

.box{
    @{w}:200px;
}

## 运算

less中的运算和CSS3中新增的calc函数一样都支持`+ - * /` 运算

## 混合

重复的代码可以重复使用，减少代码的冗余

```less

.center(){
  position:absolute;
  left:50%;
  right:50%;
}

.father{
  width:200px;
  height:200px;
  .center();
  .son{
    width:100px;
    height:100px;
    .center();
  }
}

```

如果封装的时候没有给center加上`()`编译完成后center的代码还存在，如果想要不存在，需要加上一个`()`；
对应下面引入的时候也是一样的

### 带参数混合

```less

// 带参数混合
.wch(@w,@h,@c){
  width:@w;
  height:@h;
  background:@c;
}

// 带默认值混合

.wch(@w:100px,@h:100px,@c:red){
  width:@w;
  height:@h;
  background:@c;
}

// 给混合的指定形参传递数据

.box{
  .wch(@c:green)
}
```

### 可变参数

```less

.animate(@name,@time,@mode,@delay){
    transition:@arguments;
}

// 可变参数
.animate(...){
    transition:@arguments;
}

// 至少需要两个参数
.animate(@name,@time,...){
    transition:@arguments;
}

```

### 匹配模式

通过边框实现一个三角形

```less

// @_表示通用的匹配模式，只要调用不同的匹配模式，都会先调用这个方法，在执行其他的方法

.triangle(@_,@width,@color){
  width: 0;
  height: 0;
  border-width: @width;
  border-style: solid solid solid solid;
}

// 向下的三角
.triangle(Down,@width,@color){
  border-color: @color transparent transparent transparent;
}

// 向上的三角
.triangle(Top,@width,@color){
  border-color: transparent transparent @color transparent;
}

// 向左的三角
.triangle(Left,@width,@color){
  border-color: transparent @color transparent transparent;
}
// 向右的三角
.triangle(Right,@width,@color){
  border-color: transparent transparent transparent @color;
}

div{
  // 使用匹配模式
  .triangle(Right,80px,green)
}

```

### less中导入其他less文件

```
// 后缀是可以省略的
@import "单独的less文件的路径";
div{
  .triangle(Top,800px,red)
}
```

### less中的内置函数

由于less的底层就是用JS实现的，所以JS中常用的一些函数在less中都是支持的

查看地址：http://lesscss.cn/functions/

```less
@str:"images/1.png";
@str2:replace(@str,"1","2");

```

* 混杂方法
    * `image-size("file.jpg");` // => 100px 50px
    * `image-width("file.jpg");` // => 100px
    * `image-height("file.jpg");` // => 50px

* 单位转换
    * `convert(9s, "ms");` // => 9000ms
    * `convert(14cm, mm);` // => 140mm
    * `convert(8, mm);` // => 8 
      
* 列表
    * `@list: "A", "B", C, "D";`
    * `length(@list);` // => 4
    * `extract(@list, 3);` // => C
    

* 数学
    * `ceil(2.1);` // => 3 向上取整
    * `floor(2.1);` // => 2 向下取整
    * `percentage(.3);` // => 30% 转百分比
    * `round(1.67, 1);` // => 1.7 四舍五入，保留一位小数点
    * `sqrt(25cm);` // => 5cm 取平方根
    * `abs(-5cm);` // => 5cm 取绝对值
    * `pi();` // => 3.141592653589793 圆周率π
    * `max(3px, 42px, 1px, 16px);` // => 42px
    * `min(3px, 42px, 1px, 16px);` // => 1px 
      
* 字符串
    * replace("Hi Tom?", "Tom", "Jack"); // => "Hi Jack"
    

* 判断类型
    * `isnumber(56px);` // => true 是否含数字
    * `isstring("string");` // => true
    * `iscolor(#ff0);`// => true
    * `iscolor(blue);` // => true
    * `iskeyword(keyword);` // => true
    * `isurl(url(...));` // => true
    * `ispixel(56px);` // => true
    * `isem(7.8em);` // => true
    * `ispercentage(7.8%);` // => true
    * `isunit(4rem, rem);` // => true 是否为指定单位
    * `isruleset(@rules);` // => true 是否为变量
    

* 颜色操作
    * 增加饱和度
    `saturate(color, 20%)`
    * 减少饱和度
    `desaturate(color, 20%)`
    * 增加亮度
    `lighten(color, 20%)`
    * 减少亮度
    `darken(color, 20%)`
    * 降低透明度
    `fadein(color, 10%)`
    * 增加透明度
    `fadeout(color, 10%)`
    * 设置绝对不透明度(覆盖原透明度)
    `fade(color, 20%)`
    * 旋转色调角度
    `spin(color, 10)`
    * 将两种颜色混合，不透明度包括在计算中。
    `mix(#f00, #00f, 50%)`
    * 与白色混合
    `tint(#007fff, 50%)`
    * 与黑色混合
    `shade(#007fff, 50%)`
    * 灰度，移除饱和度
    `greyscale(color)`
    * 返回对比度最大的颜色
    `contrast(color1, color2)`
  

* 颜色混合
    *每个RGB 通道相乘，然后除以255
    `multiply(color1, color2);`
    *与 multiply 相反
    `screen(color1, color2);`
    * 使之更浅或更暗
    `overlay(color1, color2)`
    * 避免太亮或太暗
    `softlight(color1, color2)`
    * 与overlay相同，但颜色互换
    `hardlight(color1, color2)`
    * 计算每个通道(RGB)基础上的两种颜色的平均值
    `average(color1, color2)`

### less中的层级结构

* 使用伪类

```html
<div class="father">
    <div class="son"></div>
</div>

```

```less

.father{
  width: 300px;
  height: 300px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  // 如果在某一个选择器的{}中写上了其他选择器，会自动转换成后代选择器
  // 例如以下代码:.father .son
  .son{
    // 这里的&的作用，告诉less在转换的时候不要用后代来转换，直接拼接当前选择器的后面即可
    &:hover{
      background-color: skyblue;
    }
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    background-color: blue;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

```

* 使用伪元素

```html
<div class="father"></div>
```

```less
.father{
  width: 300px;
  height: 300px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  &::before{
    content: "子元素";
    display: block;
    background: skyblue;
    width: 100px;
    height: 100px;
  }
}

```
### less中的继承

```html
<div class="father">
    <div class="son">
        
    </div>
</div>

```

这种方式转换之后就会出现冗余代码

这种方式是替换代码的方式来实现的

```less

.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.father{
  width: 300px;
  height: 300px;
  background-color: red;
  .center;
  .son{
    width: 200px;
    height: 200px;
    background-color: red;
    .center;
  }
}

```

使用继承方式

会通过并集选择器的方式来实现

```less

.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.father:extend(.center){
  width: 300px;
  height: 300px;
  background-color: red;
  .son:extend(.center){
    width: 200px;
    height: 200px;
    background-color: red;
  }
}

```

### 条件判断

在less中通过when给混合添加执行限定条件，只有条件满足的才会执行混合中的代码

when表达式中可以使用比较运算符(> < >= <= =)、逻辑运算符或检查函数来进行条件判断

```less

// 逻辑运算符
// when (@w = 100px),(@h = 100px) 只要宽度或者高度有一个是100就会混合进去，相当于js中的或者
// when (@w = 100px)and(@h = 100px) 只要宽度并且者高度都是100就会混合进去，相当于js中的与
// when (ispixel(@w)) 使用内置函数的方式来判断，只有给当前的宽度的单位为px的时候才会被混合进去
.size(@w,@h) when (@w = 100px){
  width: @w;
  height: @h;
}

div{
  .size(100px,100px)
  background: red;
}
```
