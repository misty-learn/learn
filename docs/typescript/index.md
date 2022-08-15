# TS学习

:::tip TS学习小目标
常用基本类型学习，小`demo`练习
:::

## 介绍

下面我们通过几个问题来反向了解一下`typescript`。

### 什么是`typescript`、与`javascript`的区别是什么

`typescript`是由微软开发的一款开源的编程语言，可以在`javascript`的基础上添加一些静态的类型定义。官方的定义就是`typescript`是`javascript`的超集。通俗的来讲，`typescript`包含了`javascript`，使`javascript`编程了强类型语言。

### 特点

* 在开发阶段我们就可以很好的定位问题。
* 可以自动做类型推断。
* `typescript`拥抱`ES6+`规范。

## 内置类型

### 基本类型

在`javascript`中最常见的基本类型有：`string`, `number`, `boolean`, `undefined`, `null`。引用类型则包含：`object`, `function`, `array`等。

在`ES6`和`ES11`中分别又新增了：`symbol`, `bigint`。

例子：
```ts
const a: string = 'hello';
const b: number = 1;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: object = {};
const g: Function = () => {};
const h: Array<number> = [1, 2, 3];
const i: symbol = Symbol();
const j: bigint = BigInt(991889888866688112);
const k: bigint = 991889888866688112n;
```
:::tip `null`和`undefined`区别

`null`表示定义了一个变量，这个变量的值为`null`。

`undefined`则表示定义了一个变量，这个变量没有赋值。

这两个在没有开启`strictNullChecks `检查的情况下，会被当做其他类型的子类型，像`string`类型，默认就包含了`null`和`undefined`。
:::

### void类型

`void`操作符指定要计算一个表达式但是不返回值。

用法: `void expression`

其中，`expression`表示要计算的表达式。

比如我们可以使用`void`来执行一个立即执行函数(IIFE)：
```ts
void function iife(){
    console.log('hello');
}();
```
它会将我们的函数声明转换成一个，表达式：`void((function iife(){})())`
