# SASS

SASS是一套利用`Ruby`实现的最早最成熟的CSS预处理器，诞生于2007年，
它扩展了CSS语言，增加了变量、Mixin（混合）、嵌套、函数和运算等特性，使CSS更易于维护和扩展

如果需要使用`考拉`编译sass文件，项目目录结构中（包含文件名）不能出现中文和特殊字符

sass有两种不同的文件后缀：

* `.sass`结尾以缩进代替`{}`表示层级结构，语句后面不用编写分号
* `.scss`以`{}`表示层级结构，语句后面需要些分号（企业开发中推荐使用`.scss`结尾）

## 注释

```scss
// 单行注释(不会被编译到文件)
/**
  多行注释（会被编译到文件中）
 */

```

## 变量

`$变量名称:值`

* 后定义的会覆盖先定义的属性
* 可以把一个变量赋值给其他变量
* 区分局部变量和全局变量(采用)
* 和Less变量不同的是：
    * Less中变量是延迟加载，我采用是延迟加载，可以使先定义
```scss

$color:red;

$commonColor:$color;

.center{
  // 局部变量
  $w:111px;
  color:$color;
  width: $w;
}

```

## 变量插值

如果是属性的取值可以直接使用变量，
但是如果是属性名称或者选择器名称并不能直接使用变量，必须使用变量差值的格式

SASS变量差值格式:`#{$变量名称}`

```scss

$d:div;
$w:width;
$size:200px;
#{$d}{
  #{$w}:$size
}

```

## 运算

无论是LESS中的运算还是SASS中的运算都需要加上`()`

```scss

div{
  width: 200px;
  height: 200px;
  background: rebeccapurple;
  position: absolute;
  left: 50%;
  margin-left: (-200px / 2);
}

```

## 混合

混合的定义：`@mixin 混合名称{};`或者`@mixin 混合名称(){};`

使用一个混合：`@include 混合名称` 或者`@include 混合名称()`

### 混合带参

```scss

@mixin whc($w:100px,$h:100px,$c:#000){
  width: $w;
  height: $h;
  background: $c;
}
.box1{
  @include whc(300px,300px,red)
}
.box2{
  // 带默认参数且，给指定的属性传参
  @include whc($c:blue)
}


```

## 可变参数

在SASS中必须通过`$args...`的格式来定义可变参数，然后通过`$args`来使用

```scss

//@mixin animate($n,$t,$m,$d){
//  transition: $n $t $m $d;
//}

//@mixin animate($args...){
//  transition:$args;
//}

@mixin animate($n,$t,$args...){
  transition: $n $t $args;
}

div{
  width: 200px;
  height: 200px;
  background: red;
  @include ainmate(all,4s,linear,0s);
}

div:hover{
  width: 400px;
  height: 400px;
  background: blue;
}

```

## 在sass中引入其他sass

其实原生的css也支持通过`@import`导入其他的css文件，只不过不常用

不常用的原因在于原生的`@import`导入其他的css文件，只有执行到`@import`时，浏览器才会去下载对应的css文件，
这导致请求次数变多，页面加载起来特别慢

而less和sass中的`@import`是直接将导入的文件拷贝到当前文件中生成一份css，所以只会请求一次，速度更快

```scss

@import "文件名称.scss";

```

## 内置函数

具体的可以查看官方文档：[官方函数文档](https://sass-lang.com/documentation/modules)

简单的使用样例
```scss
@function square($num){
  @return $num * $num + px;
}

div{
  // 自定义函数
  width: square(2);
  height: 200px;
  // 颜色混合
  background: mix(red,blue);
}

```

## 层级结构

和LESS是一样的

```html
<div class="father">
    <div class="son">
        
    </div>
</div>

```

```scss

.father{
  width: 300px;
  height: 300px;
  background: red;
  &:hover{
    width: 200px;
    height: 200px;
  }
  .son{
    width: 100px;
    height: 100px;
    background: rebeccapurple;
  }
}

```

## 继承

less和sass都是通过并集选择器实现的

```scss

@mixin center(){
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%,-50%);
}

.father{
  width: 300px;
  height: 300px;
  background: red;
  @include center
  .son{
    width: 200px;
    height: 200px;
    background: rebeccapurple;
    @include center
  }
}

```

上面的写法会拷贝代码，会造成代码冗余,使用sass实现继承

```scss
.center{
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%,-50%);
}

.father{
  width: 300px;
  height: 300px;
  background: red;
  @extend center
  .son{
    width: 200px;
    height: 200px;
    background: rebeccapurple;
    @extend center
  }
}
```

## 条件判断

```
@if(条件语句){}

@else if(条件语句){}

@else{}

```

实现一个三角形

```scss

@mixin triangle($dir,$w,$c){
  width: 0;
  height: 0;
  border-width: $w;
  @if($dir == Up) {
    border-color: transparent transparent $c transparent;
  }@else if($dir == Down){
    border-color: $c transparent transparent transparent;
  }@else if($dir == Left){
    border-color: transparent $c transparent transparent;
  }@else if($dir == Right){
    border-color: transparent transparent transparent $c;
  }
}

div{
  @include triangle(Up,100,red)
}

```

## 循环

sass中直接支持循环语句，而LESS中需要通过混合+条件判断自己实现

SASS中支持两种循环，分别是for循环和while循环

```html
<ul>
<li>第1个li</li>
<li>第2个li</li>
<li>第3个li</li>
<li>第4个li</li>
<li>第5个li</li>
<li>第6个li</li>
<li>第7个li</li>
<li>第8个li</li>
<li>第9个li</li>
</ul>

```

实现第5-8个位蓝色，其他为红色


### for循环

结构格式如下：
* 包括头和尾
`@for $i from 起始整数 through 结束整数{}`

* 包括头部，不包括尾部
`@for $i from 起始整数 to 结束整数{}`


```scss

ul{
  li{
    width: 100%;
    height: 100px;
    font-size: 20px;
    background: red;
    @for $i from 5 through 8{
      &:nth-child(#{$i}){
        background: blue;
      }
    }
  }
}

```

### while循环实现

结构格式如下:

`@while(){}`

```scss

$i:5

ul{
li{
  width: 100%;
  height: 100px;
  font-size: 20px;
  background: red;
  @while($i<=8){
    &:nth-child(#{$i}){
      background: blue;
    }
    $i:$i+1
  }
}
}


```
