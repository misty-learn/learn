# TS基础学习

1. 什么是TS

TS和JS之间的关系其实就是Less/Sass和CSS之间的关系，
则TS是对JS的扩展，编写好的TS代码最终也会转换成JS

2. 为什么需要TS

因为JS是弱类型，很多错误只有在运行的时候才会发现，
而TS是强类型，他提供了一套静态检测机制，可以帮助我们在编译时就发现错误

3. 特点
* 支持最新的JS新特性
* 支持代码静态检查
* 支持诸如C,C++,JAVA,GO等后端语言中的特性
（枚举，泛型，类型转换，命名空间，声明文件，类，接口等）

## 基础类型

### 数值类型

`number`

```ts

let val:number; // 定义了一个名称叫做val1的变量，这个变量中将来只能存储数值类型

val = 12;

```

::: warning 注意点

其他的用法和JS一样，可以存储16进制，8进制，12进制

:::

### 布尔类型

`boolean`

```ts

let bool:boolean;

bool = true;

```

### 字符串类型

`string`

```ts

let str:string;

str = "nihao";

// 支持字符串模板

let str1:string;

str1 = `你好:${str}`;

```

### 数组和元祖类型

#### 数组类型
```ts

// 第一种方式,定义一个数组，这个数组中将来只能存储数值类型的数据
let arr1:Array<number>;// 表示定义了一个名称为arr1的数组，这个数组中只能存储数值类型的数据
arr1 = [1,2,3,4,5];
// 方式二：定义一个数组，将来只能存储字符串类型
let arr2:string[];
arr2 = ['a','b','c'];
// 联合类型

let arr3:(number|string)[];//这个数组中既可以存储数值类型的数据，也可以存储字符串类型的数据

arr3 = [1,'a',3];

// 任意类型

let arr4:any[]; // 存储任意类型的数据

arr4 = [1,'a',false];
```

#### 元祖类型

TS中的元祖类型其实就是数组类型的扩展

元祖用于保存定长定数据类型的数据

```ts

let arr:[string,number,boolean];//定义一个arr数组，第一个参数必须是字符串，第二个参数必须是数值，第三个参数必须是布尔类型
arr = ['nihao',1,true]; // 超过指定的长度会报错

```

### 枚举类型

是TS为JS扩展的类型，表示固定的几个取值

```ts

enum Gender{ //定义了一个名称叫做Gender的枚举类型，这个枚举类型有两个值，分别是Male和Female
    Male,
    Female
}

let val:Gender;

val = Gender.Male; // 不会报错
val = 0; // 不会报错
val = Gender.Female; // 不报错
val = 1;// 不会报错
val = "Sss";//报错

```

::: warning 注意点：

* 枚举类型的底层是数值类型吗，所以赋值一个数值不会报错
* 枚举类型的取值默认是从0开始递增，虽然默认是从0开始递增，也可以手动指定，枚举取值的值
```ts
enum Gender{
    Male = 8,
    Female
}

console.log(Gender.Male) // 8

console.log(Gender.Female) // 9

```
* 如果修改了指定的值，那么会根据前面的值来进行递增
```ts
enum Gender{
    Male,
    Female = 9
}
console.log(Gender.Male) // 0

console.log(Gender.Female) // 9

```
* 如果修改了后面了值，前面的值不会影响

```ts
enum Gender{
    Male = 8,
    Female = 10
}
console.log(Gender.Male) // 8

console.log(Gender.Female) // 10

```

:::

### any类型

any表示任意类型，当我们不清楚某个值的具体类型的时候，我们就可以使用any

一般用于定义一些通用性比较强的变量，或者用于保存从其他框架中获取的不确定类型的值

在TS中任何类型的值都可以赋值给any类型

```ts

let val:any;

val = 1;
val = '1';
val = false;

```

### void类型

表示没有任何类型，一般用于函数返回值

```ts

function test():void{
    console.log("ssss");
}

test();

```

::: warning 注意点

如果定义的是变量

```ts

let val:void;

```
如果取消了严格模式，可以定义的值为`null`和`undefined`
:::

### Never类型

表示的是那些用不存在的值的类型

一般用于抛出异常或根本不可能返回值的函数

```ts
// 抛出异常
function demo1():never{

throw new Error("报错了");
}
demo1();
// 如果是一个死循环
function demo():never{
    while(true){}
}

demo()
```

### Object类型

```ts

let obj:object;

obj = {name:'www'}

```

### 类型断言

TS中的类型断言和其他编程语言的类型转换很像，可以将一种类型强制转换成另一种类型，
类型断言就是告诉编译器，你不要帮我们检查了，相信我，我知道我自己在干什么

例如：我们拿到了一个any类型的变量，但是我们明确知道这个变量中保存的是字符串类型
此时我们就可以通过类型断言告诉编译器，这个变量是一个字符串类型

此时我们就可以通过类型断言将any类型转换成string类型，使用字符串类型中相关的方法了

```ts
let str:any = 'it6666';
// 没有提示
str.length;
// 类型断言
// 方式1：
let len = (<string>str).length;

// 方式2：(在企业开发中推荐使用as来进行类型转换)，
// 因为第一种方式有兼容性问题，在使用到了JSX的时候兼容性不是很好
let len1 = (str as string).length;

```

## 声明变量和解构

其中的声明方式和解构方式和JS基本一致

## 接口

和number,string,boolean,enum这些数据类型一样，
接口也是一种类型，也是用来约束使用者的

```ts

let obj = {
    firstName:'aiba',
    lastName:'yanyu'

}

// 需求：定义一个函数输出一个人完整的姓名，这个人的姓必须是字符串，这个人的名字也必须是字符串

function say({firstName,lastName}):void{
    console.log(`我的姓${firstName}_${lastName}`);
}

say(obj);

// 默认是弱类型的，定义一个接口类型

interface FullName{
    firstName:string,
    lastName:string
}

function say1({firstName,lastName}:FullName):void{
    console.log(`我的姓${firstName}_${lastName}`);
}
say1(obj);

```

### 可选属性和索引签名

如果使用接口来限定了变量或者形参，那么在给变量或者形参赋值的时候，
赋予的值就必须和接口限定的一样，
多一个或者捎一个都会报错

但是在企业开发中可能多一个，也可能少一个。
少一个或多个该怎么去处理。

```ts
interface FullName{
    firstName:string,
    lastName:string,
    middleName?:string, //给参数加个?表示可选参数
    [propName:string]:any
}
let obj = {
    firstName:'aiba',
    lastName:'yanyu'
}
function say1({firstName,lastName,middleName}:FullName):void{
    if (middleName){
        console.log(`我的姓${firstName}_${lastName}_${middleName}`);
    }else {
    console.log(`我的姓${firstName}_${lastName}`);
    }
}
// 少一个或者少多个
say1(obj);

// 多一个或者多多个，第一种方式类型断言
say1({
         firstName:'aiba',
         lastName:'yanyu',
         middleName:'sss',
         middleName1:'sss'
     } as FullName);

// 第二种方式，使用变量(不推荐)
let obj1 = {
    firstName:'aiba',
    lastName:'yanyu',
    middleName:'sss',
    middleName1:'sss'
}
say1(obj1);

// 第三种方式，索引签名
say1({
         firstName:'aiba',
         lastName:'yanyu',
         middleName:'sss',
         middleName1:'sss',
         def:'def'
     })

```

### 索引签名

索引签名用于描述那些"通过索引得到"的类型

```ts

interface FullName{
    [propName:string]:string
}

// 在对象中，无论可以是什么类型都会转成字符串类型

// 其中他的key必须是string，值也必须是string

```

#### 只读属性

让对象属性只能在对象创建的时候修改其值

```ts
interface FullName{
    firstName:string
    readonly lastName:string
}

let obj:FullName ={
    firstName:'sss',
    lastName:'Lsss'
}

obj.lastName = "ssssss"; // 报错

// TS内部对只读属性进行了扩展，扩展出来了一个只读数组

let arr2:Array<string> = ['a','b','c'];
console.log(arr2[0]); // a
arr2[0] = '666';
console.log(arr2[0]); // 666

// 设置只读数组
let arr3:ReadonlyArray<string> = ['a','b','c'];
console.log(arr3[0]); // a
arr3[0] = '666';//报错

```

### 函数接口

我们除了可以通过接口来限定对象以外，我们还可以使用接口来限定函数

```ts
interface SumInterface{
    (a:number,b:number):number
}
let sum:SumInterface = function(x:number,y:number):number{
    return x+y;
}
console.log(sum(11,11))

```

### 混合类型接口

约定的内容中既有对象属性，又有函数。
要求定义一个函数实现变量累加。

```ts

interface CountInterface{
    ():void
    count:number
}

let getCounter = (function():CountInterface{
    // 要求数据既要是一个没有参数没有返回值的函数，
    // 又要是一个拥有count属性的对象
    // fn作为函数的时候符合接口中函数接口的限定():void
    // fn作为对象的时候复合接口中对象属性的限定 count:number
    let fn = <CountInterface>function(){
        fn.count ++;
        console.log(fn.count);
    }
    fn.count = 0;
    return fn;
})();

```

### 接口继承

TS中的接口和JS中的类一样是可以继承的

```ts

interface LengthInterface{
    length:number
}

interface HeightInterface{
    height:number
}
interface WidthInterface{
    width:number
}

interface RectInterface extends LengthInterface,HeightInterface,WidthInterface{
    color:string
}

let rect:RectInterface = {
    length:1,
    height:2,
    width:3,
    color:'sss'
}

```

## 函数

TS中的函数大部分都是和JS相同的

1. 命名函数
js:
```js

function say1(name){
    console.log(name)
}

```
ts:
```ts

function say1(name:string):void{
    console.log(name)
}
```

2. 匿名函数
js:
```js

let say2 = function (name){
    console.log(name)
}

```
ts:
```ts
let say2 = function (name:string):void{
    console.log(name)
}

```

3. 箭头函数
js:
```js

let say3 = (name)=>{
    console.log(name)
}

```

ts:

```ts
let say3 = (name:string):void=>{
    console.log(name)
}
```

### 函数完整格式

在TS中函数的完整格式应该是由函数的定义和实现两个部分组成的

```ts
// 定义一个函数
let AddFun:(a:number,b:number)=>number;
// 实现定义的函数
AddFun = function(x:number,y:number):number{
    return x+y;
}

```
一步到位写法：
```ts
// 根据函数的定义自动推导函数的数据类型
let AddFun:(a:number,b:number)=>number = function(x,y){
    return x+y;
}

```

### 函数的声明

声明一个函数

```ts
// 先声明一个函数
type AddFun = (a:number,b:number)=>number;
// 再根据声明实现一个函数
let add:AddFun = function(x:number,y:number):number{
   return x+y;
}

console.log(add(1,1))

// 简写
let add1:AddFun = function(x,y){
   return x+y;
}

```

### 函数重载

函数的重载就是同名的函数可以根据不同的参数实现不同的功能

```ts

function getArray(x:number):number[]{
    let arr = [];
    for(let i = 0;i<=x;i++){
        arr.push(i)
    }
    return arr;
}

function getArray(str:string):string[]{
    return str.split('');
}

```
上面的默认是报错的，并且下面的方法会覆盖掉上面的方法，所以需要通过函数重载来实现

```ts

function getArray(x:number):number[];
function getArray(str:string):string[];
// 实现函数重载
function getArray(val:any):any[]{
    if(typeof value === 'string'){
        return val.split('');
    }else{
        let arr = [];
        for(let i = 0;i<=val;i++){
            arr.push(i)
        }
        return arr;
    }
}

```

### 可选参数

要求定义一个函数，既可以实现2个数或者3个数相加

```ts

function sum(x:number,y:number,z?:number):number{
    return x+y+(z?z:0);
}
// 只需要在可选的参数后面加个?即可

```
可以配合函数重载一起使用
```ts
function sum(x:number,y:number):number;
function sum(x:number,y:number,z:number):number;

function sum(x:number,y:number,z?:number):number{
    return x+y+(z?z:0);
}

```
可选参数可以配置一个或者多个，
但是如果前面定义了一个可选参数，
后面的参数必须定义可选

### 默认参数

和JS中的ES6一样

```ts
function sum(x:number,y:number = 10,z?:number):number{
    return x+y+(z?z:0);
}

```

### 剩余参数

```ts

function sum(x:number,...ags:number[]):void{
    console.log(x);
    console.log(ags);
}

```

## 泛型

在编写代码的时候我们既要考虑代码的健壮性，又要考虑代码的灵活性和可重用性

案例：定义一个创建数组的方法，可以创建出指定长度的数组，并且可以用任务指定的内容填充这个数组

```ts

let getArray = (value:number,items:number = 5):number[] =>{
    return new Array(items).fill(value);
}

let arr = getArray(6,3);

console.log(arr)

```

以上代码并不能使用任意值来填充，需要对代码进行修改

```ts

let getArray = (value:any,items:number = 5):any[] =>{
    return new Array(items).fill(value);
}

let arr = getArray('sss',3);

console.log(arr)

```

如果使用any出现的问题：
1. 没有代码提示，因为TS的静态检测不知道具体是什么类型
2. 如果代码写错了，也不会报错，因为TS的静态检测不知道具体是什么类型

需求：

需要有代码提示，
在编译的时候出现错误可以报错

```ts

let getArray = <T>(value:T,items:number = 5):T[] =>{
    return new Array(items).fill(value);
}

let arr = getArray<string>('sss',3);
// 泛型具体的类型可以不指定，如果没有指定，那么就会根据传递的数据类型自动推导出来如下
let arr1 = getArray(1);
// arr1就会自动推导出来是number类型

console.log(arr.map(v=>v.length))

```
### 泛型的约束

默认情况下我们可以指定泛型为任意类型
但是有些情况下我们需要指定的类型满足某些条件后才能指定
那么这个时候我们就可以使用泛型约束

需求：要求指定的泛型类型必须有length属性才可以
```ts
interface LenthInterface{
    length:number
}
let getArray = <T extends LenthInterface>(value:T,items:number = 5):T[] =>{
    return new Array(items).fill(value);
}
let arr1 = getArray(1); // 报错，因为number类型中没有length属性
let arr2 = getArray('2222'); // 不报错，string中有length属性

```

### 在泛型中使用类型参数

一个泛型被另一个泛型约束，就叫做泛型约束中使用类型参数

需求：定义一个函数用于根据指定的key获取对象的value

```ts

let getProps = (obj:object,key:string):any=>{
    return obj[key];
}

let obj = {
    a:'a',
    b:'b'
}
// 代码不够健壮，不存在的key不报错
let res = getProps(obj,'c');

let getProps1 = <T,K extends keyof T>(obj:T,key:K):any=>{
    return obj[key];
}
// 出现不存在的key会报错
let res1 = getProps1(obj,'c');

```
## 类

TS中的类和JS中类基本上是一样的

和ES6的区别，需要先定义示例属性才能够使用

```ts

class Person{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }

    say():void{
        console.log(`名字:${this.name}_年龄：${this.age}`)
    }
    
    static food:string;//静态属性
    static eat():void{ // 静态方法
        console.log(`我正在吃${this.food}`);
    }
}

let p = new Person('nihao',12);
p.say();
Person.food = '蛋挞';
Person.eat();

// 继承
class Student extends Person{
    constructor(name:string,age:number){
       super(name,age);
    }
}

let stu = new Student('xm',17);
stu.say();
Student.food = "饭";
Student.eat();

```

### 类的属性修饰符

* public(公开)        ：使用public来修饰，那么表示这个属性是公开的，可以在内部、子类、外部使用（默认
* protected(受保护的)  ：只能在子类和内部中使用
* private(私有的)      ：只能在内部使用
* readonly(只读)       ：只能在外面读取不能修改数据（不能用在静态属性中）

### 类的方法修饰符

* public(公开)
* protected(受保护的)
* private(私有的)

只有这三种修饰符

### 类的可选属性和方法

#### 可选属性

和接口中的可选属性一样，可传可不穿的属性

在TS中如果定义了示例属性，那么就必须在构造函数中使用，否则会报错

```ts

class Person {
    name:string
    age:number
    setNameAndAge(name:string,age:number){
        //这样定义就会报错，不在构造函数中定义
    }
}

```

```ts

class Person{
    name?:string
    age?:number
    setNameAndAge(name:string,age:number){
        this.name = name
        this.age = age
    }
}

```

#### 参数属性

```ts

class Person {
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
}

```

相当于,简化代码

```ts

class Person {
    constructor(public name:string,public age:number){
        
    }
}

```

### 类存取器

通过getters/setters来截取对象成员的访问

```ts

class Person{
   private _age:number = 0;
   set age(val:number){
       console.log("进入了set age方法");
       if(val < 0){
           throw new Error('人的年龄不能小于零');
       }
       this._age = val;
   }

   get age():number{
       console.log("进入了get age方法");
       return this._age;
   }
}

```

### 抽象类

抽象类是专门用于定义那些不希望被外界直接创建的类的，
抽象类一般用于定于积累，
抽象类和接口一样用于约束子类。

```ts

abstract class Person{
    abstract name:string
    abstract say():void
}

class Stdudent extends Person(){
    name:string = ""
    say():void{
        console.log(`我的名字是${this.name}`)
    }
}

```

抽象类和接口的区别？

接口中指定定义约束，不能定义具体实现

抽象类中既可以定义约束，又可以定义具体的实现

### 类实现接口

```ts

interface PersonInterface{
    name:string
    say():void;
}

class Person implements PersonInterface{
    name:string = ""
    say():void{
        
    }
}

```

接口继承类

```ts

class Person {
    name:string = 'ss';
    age:number = 12;
    say():void{
        
    }
}

// 注意点：只要一个接口继承了某个类，那么就会继承这个类中所有的属性和方法
//        但是只会继承竖向和方法的声明，不会继承属性和方法的实现
// 如果接口继承的类中包含了protected的属性和方法，那么只有这个类的子类才能实现这个接口
interface PersonInterface extends Person{
    gender:string
}

class Student implements PersonInterface{
    gender:string = "Ss";
    name:string = "Ssss";
    age:number = 12;
    say():void{
        
    }
}

```

### 泛型类

```ts

class Chache<T>{
    arr:T[] = [];
    add(val:T):T{
        this.arr.push(val)
        return val;
    }
    all():T[]{
        return this.arr;
    }
}

let chache = new Chache<number>();
chache.add('1');// 报错
chache.add(1);//不报错

```

### 接口合并现象

当我们定义了多个同名的接口是，多个接口的内容会自动合并
```ts
interface TestInterface{
    name:string
}

interface TestInterface{
    age:number
}

class info implements TestInterface{ 
    age: number 
    name: string
}
```

## 数字和字符串枚举

### 数字枚举

默认情况下枚举是数字枚举。

:::warning 注意点：

数字枚举的取值默认从0开始递增
数字枚举的取值可以是字面量，也可以是常量，也可以是计算结果
* 字面量：直接赋值
```ts
enum Gender{
    Male = 6,
    Female
}
```
* 常量：定义一个常量
```ts
const num = 666
enum Gender{
    Male = num,//如果使用常量给前面的枚举值赋值，后面的枚举值也需要手动赋值
    Female = 7
}
```

* 计算结果
```ts
function getNum(){
    return 11;
}

enum Gender{
    Male = getNum(),//如果使用计算结果给前面的枚举值赋值，后面的枚举值也需要手动赋值
    Female = 7
}

```
:::

### 枚举反向映射

根据枚举值获取到原始值，
也可以根据原始值获取到枚举值

```ts

enum Gender{
    Male = 6,
    Female
}
console.log(Gender.Male);// 6
console.log(Gender[6]);// Male

```

### 字符串枚举

```ts

enum Gender{
    Male = "nan",// 如果使用字符串给前面的值赋值，后面的也必须手动赋值
    Female = "nv"
}

```

::: warning 注意点：

* 如果使用字符串给前面的值赋值，后面的也必须手动赋值
* 和数字枚举不一样，字符串枚举不能使用常量或计算结果给枚举赋值
* 虽然字符串枚举不能够使用常量或计算结果给枚举值赋值，可以是使用内部其他枚举来赋值

```ts
enum Gender{
    Male = "nan",// 如果使用字符串给前面的值赋值，后面的也必须手动赋值
    Female = "nv",
    Yao = Male
}

```

:::

### 异构枚举

枚举中既包含数字又包含字符串，我们就称为异构枚举

```ts

enum Gender{
    Male = 6,
    Female = "nv"
}

```

如果是字符串枚举，无法通过原始值获取到枚举值

### 枚举成员类型

我们就可以把枚举成员当做类型来使用

```ts

enum Gender{
    Male,
    Female,
    STR = "sss"
}

interface TestInterface{
    age:Gender.Male
    str1:Gender.STR
}

class Person implements TestInterface{
    age:Gender.Male //不报错
    age:Gender.Female //报错，由于类型不匹配
    age:122 // 由于数字枚举的本质就是数值，所以这里写一个数值也不会报错
    str1:Gender.STR // 如果是字符串枚举，那么只能是枚举成员的值，不能是其他的值
}

```

### 联合枚举类型

联合类型就是将多个数据类型通过`|`链接起来

我们可以把枚举类型当做一个联合类型来使用

```ts
enum Gender{
    Male,
    Female
}

interface TestInterface{
    age:Gender // age:(Gender.Male | Gender.Female)
}

class Person implements TestInterface{
    age:Gender.Male
    age:Gender.Female
}

```

### 运行时枚举

枚举在编译之后是一个真实存储的对象，所以可以在运行时使用

而像接口这种只是用来做约束静态检查的代码，编译之后是不存在的

### 常量枚举

```ts

enum Gender{
    Male,
    Female
}

const enum Gender2{
    Male,
    Female
}

```

普通枚举和常量枚举的区别

* 普通枚举会生成真实存在的对象
* 常量枚举不会生成真实存在的对象，而是利用常量枚举的值直接替换使用到的地方

## 类型推论和兼容性

### 自动类型推断

不用告诉编译器具体是什么类型，编译器就知道是什么类型

1. 根据初始化值自动推断

```ts

// 如果是先定义，再初始化，无法自动推断
let value;
value = 123;
value = false;

// 如果是定义的同时初始化，那么TS就会自动进行类型推断

let info = 234;

info = 122;//不报错
info = false;//报错
info = "Sss"; //报错

let arr = [1,'a'];// 自动转化成 let arr:(number|string) = [1,'a'];

arr = [1,'a','b',3]; //不报错

arr = [false,1]; // 报错

```

2. 根据上下文类型自动推断

```ts

window.onmousedown = (event) =>{
// 有代码提示，可以自动推断出是哪个类型的数据
    console.log(event.target)
}

```

### 类型兼容

```ts

interface TestInterface{
    name:string;
}

let p1 = {name:'ss'}

let p2 = {age:11};

let p3 = {name:'ssss',age:111}

let t:TestInterface;

t = p1 //不报错

t = p2 //报错

t = p3 //不报错，可多不可少


```

```ts
interface TestInterface{
    name:string
    children:{
        age:number
    }
}

let p1 = {name:'ssss',children:{age:122}} //不报错

let p2 = {name:'ssss',children:{age:'as'}} // 报错，ts会对接口进行递归深层次的检查，需要保证所有类型都一致，才不会报错

```

### 函数兼容性

#### 参数个数

```ts

let fn1 = (x:number,y:number) =>{
}

let fn2 = (x:number)=>{
}

fn1 = fn2; //不报错

fn2 = fn1; //报错，可以多不可以少参数

```

#### 参数类型

```ts

let fn1 = (x:number)=>{
}

let fn2 = (x:string)=>{
}

fn1 = fn2 //报错，参数类型不一致

```

#### 返回值类型

```ts

let fn1 = ():number=>123;

let fn2 = ():string=>'sss';

fn1 = fn2 //报错，参数返回值类型不一致

```


#### 函数双向协变

```ts

let fn1 = (x:(number|string))=>{};

let fn2 = (x:number) =>{};

fn1 = fn2 //不报错

fn2 = fn1 //不报错

```

#### 返回值双向协变

```ts

let fn1 = (x:boolean):(numbe|string)=>x?123:'ss';

let fn2 = (x:boolean):(number) => x?222:12;

fn1 = fn2 ;//不报错 可以将返回值是具体类型的赋值给联合类型的

fn2 = fn1;//报错，不能讲返回值是联合类型的赋值给具体类型的

```

#### 函数重载

```ts

function add(x:number,y:number):number;
function add(x:string,y:string):string;
function add(x,y){
    return x+y;
}

function sub(x:number,y:number):number;

function sub(x,y){
    return x-y;
}

let fn = add;
fn = sub //报错不能将重载少的赋值给重载多的

let fn1 = sub;
fn1 = add //可以将重载多的赋值给重载少的

```

### 枚举兼容性

* 数字枚举与数值兼容

```ts

enum Gender{
    Male,
    Female
}

let value:Gender;
value = Gender.Male;//不报错
value = Gender.Female // 不报错
value = 1; //不报错

```

* 数字枚举与数字枚举不兼容

```ts

enum Gender{
    Male,
    Female
}

enum Animal{
     Dog,
     Cat
}

let value:Gender

value = Gender.Male//不报错

value = Animal.Cat //报错

```

* 字符串枚举与字符串不兼容

```ts
enum Gender{
    Male = 'abc',
    Female = 'def'
}

let value:Gender

value = Gender.Male; //不报错

value = "abc" //报错

```

### 类兼容性

* 只比较实例成员，不会比较类的构造函数和静态成员

```ts

class Person{
    public name:string
    public age:number //p = a会报错 
    public static age1:number 
    constructor(name:string,age:number){
        
    }
}

class Animal{
    public name:string
    constructor(name:string){
        
    }
}

let p:Person;

let a:Animal;

p = a;
a = p;


```

* 类的私有属性和受保护的会影响兼容性

```ts

class Person{
    private name:string
}

class Animal{
    private name:string
}

let p:Person;

let a:Animal;

p = a;//报错

```

### 泛型兼容性

泛型只影响使用的部分，不会影响声明的部分

```ts

interface TestInterface<T>{
}

let t1:TestInterface<number>; 

let t2:TestInterface<string>;

t1 = t2 //不报错，如果只是声明，就不会报错

```

如果是使用，就会报错

```ts

interface TestInterface<T>{
    age:T
}

let t1:TestInterface<number>; // age:number

let t2:TestInterface<string>;// age:string

t1 = t2 //报错类型不一样

```

## 高级类型

### 交叉类型

格式：type1 & type2 & ...

交叉类型是将多个类型合并为一个类型

```ts
let mergeFn = <T,U>(arg1:T,arg2:U):(T&U)=>{
    let res = {} as (T&U);
    res = Object.assign(arg1,arg2);
    return res;
}

let res = mergeFn({name:'sss'},{age:19});

cosole.log(res);

```

### 联合类型

格式：type1 | type2 | ...

联合类型是多个类型中的任意一个类型

```ts

let value:(string|number);
value = 'abc';
value = 123;
```


### 类型保护

对于联合类型的变量，在使用时候如何确切告诉编译器他是哪一种类型

通过类型断言或者类型保护

```ts

let getRandomValue= ():(string|number)=>{
    let num = Math.random();
    reurn (num >= 0.5)?'abc':123.123;
}

let value = getRandomValue();
// 类型断言：虽说可以告诉编译器当前的变量是什么类型，
// 但是每一次使用的时候都需，手动告诉编译器，比较麻烦，代码冗余也过多

if((value as string).length){
    console.log((value as string).length)
}else{
    console.log((value as number).toFixed())
}

// 类型保护的方式
// 定义一个类型保护的函数，这个函数的返回类型是一个布尔类型
// 这个函数的返回值类型是，传入的参数 + is 具体类型
function isString(value:(string|number)):value is string{
    return typeof value === 'string';
}

if(isString(value)){
    console.log(value.length)
}else{
    console.log(value.toFixed())
}

// 简化方式
// 除了可以定义类型保护函数的方式来告诉编译器使用时联合类型具体是什么类型以外
// 我们还可以使用typeof来实现类型保护
// 如果使用typeof来实现类型保护，那么只能使用 === / !==
// 如果使用typeof来实现类型保护,那么只能保护 number/string/boolean/symbol类型
if(typeof value === 'string'){
    console.log(value.length)
}else{
    console.log(value.toFixed())
}

// 除了可以通过typeof类实现类型保护以外，我们还可以通过instanceof来实现类型保护

class Person{
    name:string = 'zzl'
}

class Animal{
    age:number = 18
}

let getRandomObject = () :(Person | Animal)=>{
    let num = Math.random();
    reurn (num >= 0.5)?new Peron():new Animal();
}

let obj = getRandomObject();

if (obj instanceof Person){
    obj.name
}else{
    obj.age
}


```

### null和undefined

在TypeScript中具有两种特殊的类型，null和undefined

默认情况下我们可以将null和undefined赋值给任意类型

默认情况下null和undefined可以互相赋值

```ts

let value:null;

let value1:undefined;

value = value1

value1 = value

let value3:number;

value3 = value;

value3 = value1;

```
如果不想让null和undefined互相赋值，那么我们就可以开启配置文件中的
strictNullChecks选项即可

如果开启了strictNullChecks，还想把null和undefined赋值给其他类型

那么我们就必须使用联合类型

```ts
let value:(number|null|undefined);

```

对于可选属性和可选参数而言，如果开启了strictNullChecks，那么默认情况下数据类型就是联合类型

就是当前的类+undefined类型

```ts

class Person{
    name?:string
}

```

* 取出null和undefined的检测

```ts

function getLength(value:(string|null|undefined)){
    value = 'abc';
    return ()=>{
        // 传统方式
        return (value || '').length
        // 类型断言
        return (value as string).length
        // 类型断言的简写用!=> 含义就是这个变量一定不是null和undefined
        return value!.length
    }
}

let fn = getLength('ssss');
let res = fn();
console.log(res);

```

### 类型别名

类型别名就是给一个类型起个新的名字，但是它们都是代表同一个类型

```ts
// 给String类型取别名为Mystring，那么将来无论是MyString还是string都表示string
type MyString = string;

type MyType<T> = {x:T,y:T};
let value:MyType<number>;
value = {x:12,y:12};

value = {x:'ss',y:12}//报错

// 可以在类型别名类型中的属性中使用自己

type myType1 = {
    name:string,
// 一般用于定义一些树状的结构或者嵌套的结构
    children?:myType1
}

let value1:myType1 = {
    name:'one',
    children:{
        name:'two',
        children:{
            name:'three'
        }
    }
}


```

接口和类型别名是互相兼容的

```ts

type MyType = {
    name:string
}

interface MyInterface{
    name:string
}

let val:MyType = {name:'ll'}

let val1:MyInterface = {name:'zss'}

val = val1

val1 = val


```

### 类型别名和接口异同

* 都可以描述属性或方法

```ts

type myType = {
    name:string;
    say():void;
}

interface MyInterface{
    name:string
    say():void
}

```

* 都允许拓展

```ts

// 接口拓展
interface MyInterface{
    name:string;
    say():void;
}

interface MyInterface2 extends MyInterface{
    age:number
}

let val:MyInterface2 = {
    name:'sss',
    age:18,
    say():void{}
}

// 类型拓展

type MyType = {
    name:string;
    say():void;
}

type MyType2 = MyType & {
    age:number
}

let value:MyType2 = {
    name:'sss',
    age:18,
    say():void{}
}

```

* type 可以声明基本类型别名，联合类型，元组等类型 interface不能

```ts

type MyType = string;

type MyType1 = number |string;

type MyType2 = [string,boolean,number];

```

* type不会自动合并

```ts

interface MyInterface {
    name:string
}

interface MyInterface{
    age:number
}

let val:MyInterface = {
    name:'sss',
    age:12
}

// 出现同名的类型别名会报错

type MyType = {
    name:string
}

type MyType = {
    age:number
}

```

### 字面量

字面量就是源代码中一个固定的值

在TS中我们可以把字面量作为具体的类型来使用
当时用字面量作为具体类型时，该类型的取值就必须是该字面量的值

```ts

type MyNum = 1;

let val1:MyNum = 1;//不报错

let val2:MyNum = 2;//报错

```

### 可辨识联合

具有共同的可辨识特征

一个类型别名，包含了具有共同的可辨识特征的类型的联合。

```ts
interface Square{
    kind : 'square'
    size:number
}

interface Rectangle{
    kind:'rectangle'
    width:number
    height:number
}

interface Circle{
    kind:'circle'
    radius:number
}

type Shape = (Square|Rectangle|Circle)

function area(s:Shape){
    switch(s.kind){
        case 'square':return s.size * s.size;
        case 'rectangle':return s.width * s.height;
        case 'circle':return Math.PI * s.radius ** 2 
    }
}

```

* 可辨识联合完整性检查

```ts
interface Square{
    kind : 'square'
    size:number
}

interface Rectangle{
    kind:'rectangle'
    width:number
    height:number
}

interface Circle{
    kind:'circle'
    radius:number
}

type Shape = (Square|Rectangle|Circle)

function area(s:Shape){
    switch(s.kind){
        case 'square':return s.size * s.size;
        // case 'rectangle':return s.width * s.height; // 如果出现不完整的情况，需要进行报错
        case 'circle':return Math.PI * s.radius ** 2 
    }
}

// 第一种方式加返回值
function area(s:Shape):number{
    switch(s.kind){
        case 'square':return s.size * s.size;
        // 不完整就报错，需要开启strictNullChecks
        // case 'rectangle':return s.width * s.height; // 如果出现不完整的情况，需要进行报错
        case 'circle':return Math.PI * s.radius ** 2 
    }
}

// 第二种方式 default +nerver
function MyNever(x:never):never{
    throw new Error("可辨识联合处理不完整")
}

function area(s:Shape):number{
    switch(s.kind){
        case 'square':return s.size * s.size;
        // 不完整就报错，需要开启strictNullChecks
        // case 'rectangle':return s.width * s.height; // 如果出现不完整的情况，需要进行报错
        case 'circle':return Math.PI * s.radius ** 2 ;
        default:return MyNever(s)
    }
}

```

### 索引访问操作符

通过`[]`索引访问操作符，我们就能得到某个索引的类型

```ts
class Person{
    name:string
    age:string
}
type myType = Person['name'];

```

应用场景：

需求获取指定对象，部分属性的值，放到数组中返回

```ts

let obj = {
    name:'sss',
    age:18,
    gender:true
}

function getValues<T,K extends keyof T>(obj:T,keys:K[]):T[K][]{
    /**
        
    */
    let arr = [] as T[K][];
    keys.forEach(key=>{
        arr.push(obj[key]);
    })
    return arr;
}

let res = getValues(obj,['name','age'])

```

::: warning 注意点：

不会返回null/undefined/never类型

:::

### 映射类型

根据旧的类型创建出新的类型，我们称之为映射类型
```ts

interface TestInterface1{
    name:string
    age:number
}
interface TestInterface2{
    readonly name?:string
    readonly age?:number
}
type ReadonlyTestInterface<T> = {
    // readonly [P in keyof T ]:T[P]
    // readonly [P in keyof T ]?:T[P] // 可选
    -readonly [P in keyof T ]-?:T[P]
}

type MyType = ReadonlyTestInterface<TestInterface1> //编程只读类型


```

由于生成只读属性和可选属性比较常用，所以TS内部已经提供了现有的实现

```ts

interface TestInterface1{
    name:string
    age:number
}
interface TestInterface2{
    readonly name?:string
    readonly age?:number
}

// 只读
type MyType1 = Readonly<TestInterface1>
// 可选
type MyType2 = Partial<TestInterface1>
//可选只读
type MyType2 = Partial<Readonly<TestInterface1>>

```
#### Pick映射类型

将原有类型中的部分内容映射到新的类型中

```ts

interface TestInterface{
    name:string
    age:number
}

type MyType = Pick<TestInterface,'name'>

```

#### Record映射类型

他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型
```ts


type Animal = 'person'|'dog'|'cat';

interface TestInterface{
    name:string
    age:number
}
type MyType = Record<Animal,TestInterface>

ket res:MyType = {
    person:{
        name:'ss',
        age:11
    },
    dog:{
        name:'sss',
        age:33
    },
    cat:{
        name:'aa',
        age:34
    }
}

```

由映射类型进行推断

对于Readonly Partial 和Pick的映射类型，我们可以对映射之后的类型进行拆包
还原映射之前的类型，这种操作我们称之为拆包

### 条件类型（三目运算）

判断前面一个类型是否后面一个类型或者继承于后面一个类型
如果是就返回第一个结果，如果不是就返回第二个结果

```ts

type MyType<T> = T extends string ? string:any;

```

#### 分布式条件类型

被检测类型是一个联合类型的时候，就为分布式类型
```ts

type MyType<T> = T extends any ? T:never;

type res = MyType<string|number|boolean>

```

应用场景

* 从T从剔除可以复制给U的类型 Exclude

```ts

type MyType<T,U> = T extends U ? never : T;

let res1 = MyType<string|number|boolean,number>

let res = Exclude<string|number|boolean,number>

```

* 从T中可以复制给U的类型。Extract

```ts
let res = Extract<string|number|boolean,number|string>

```


### defineProperty

可以直接在一个对象上定义一个新的属性，或者修改一个对象的现有属性，并返回此对象

```ts
// 定义一个新的属性




```
