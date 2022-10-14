# TS学习

:::tip TS学习小目标
常用基本类型学习，小`demo`练习
:::

## 前言

由于`javascript`的灵活性，
我们在开发中不需要确定一个变量的类型，
就能直接访问可能并不存在的属性。
在小型项目中这种灵活性可以帮助我们提高开发效率。
但是在大型项目中，随着变量的不断扩充和增加，
这种灵活性就可能成为一颗埋在项目中的定时炸弹。
一旦它们被触发，这可能就会导致整个项目出现白屏、卡死，甚至崩溃得问题。
我们要解决这些隐患，就需要知道如何确定变量的类型。
那么这就衍生出来了`typescript`。

### 什么是`typescript`、与`javascript`的区别是什么

`typescript`是`javascript`的超集，`typescript`扩展了`javaScript`的语法，
因此现有的`javaScript`代码可与`typeScript`一起工作无需任何修改，
`typeScript`可以通过类型注解提供编译时的静态类型检查。

### 特点

* 在开发阶段我们就可以很好的定位问题。
* 可以自动做类型推断。
* 提高了我们代码的健壮性以及可维护性。
* `typescript`全面拥抱了`ES6+`规范。

## 内置类型

### 基本类型

在`javascript`中最常见的基本类型有：`string`, `number`, `boolean`, `undefined`, `null`。引用类型则包含：`object`, `function`, `array`等。

在`ES6`和`ES11`中分别又新增了：`symbol`, `bigint`。

例子：
```ts
const a = 'hello'
const b = 1
const c = true
const d = undefined
const e = null
const f: object = {}
const g: Function = () => {}
const h: Array<number> = [1, 2, 3]
const i = Symbol('Test')
const j = BigInt(991889888866688112n)
const k = 991889888866688112n
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
void (function iife() {
  console.log('hello')
}())
```
它会将我们的函数声明转换成一个，表达式：`void((function iife(){})())`
