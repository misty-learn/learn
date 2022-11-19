# React脚手架

## 什么是脚手架
脚手架是一种快速帮助我们生成项目结构和依赖的工具

* 每个项目完成的效果不同，但是基本的结构都是相似的
* 既然相似，就没有必须要每次都从零开始搭建，完全可以使用一些工具，帮助我们生成基本的项目模板
* 那么这个帮助我们生成项目模板的工具我们称之为"脚手架"

## create-react-app

它会帮助我们快速创建一套利用webpack管理React的项目模板

### 安装

全局安装

```shell script

npm i -g create-react-app

```

### 创建项目

```shell script

create-react-app 项目名称

cd 项目名称

npm start

```

::: warning 注意点

* 如果我们是通过`create-react-app`来创建React项目，那么在指定项目名称的时候，项目的名称只能是英文，并且只能是小写字母
如果出现了多个单词，那么我们需要通过`_-`来连接。`myName->my_name->my-name`。
* 第一次运行的时候大概率会出现一个错误，会出现本地webpack的版本和项目依赖版本的webpack版本不同的错误，
如果遇到了这个错误，我们需要先卸载本地的webpack版本`npm unistall webpack`，再通过`npm i -g webpack@xx.xx.xx`安装和项目相同版本的webpack即可

:::

### 暴露webpack配置
```shell script

npm run eject

```
## 项目结构

```
- public ---- 静态资源存放
    - index.html
- src ---- 主应用目录
    - App.css ---- App应用的css文件
    - App.js ----  App应用的js文件
    - App.test.js ---- App应用的测试文件
    - index.css ---- 全局样式文件
    - index.js ---- 全局的入口文件
    - setupTests.js ---- 测试入口文件
```


## React组件使用

### 类组件

```jsx

import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default App;

```

### 函数声明组件

```jsx

import React from "react";
import "./Footer.css"
function Footer() {
    return(
        <div className={'footer'}>
            我是底部
        </div>
    )
}

export default Footer

```

## 父子组件通讯

### 函数式组件

示例：

父组件：

```jsx

import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
class App extends React.Component{
    render() {
        return(
            <div>
                <Header name={'test'} age={19} />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default App;

```

子组件：react会通过参数的方式传递给函数式组件

```jsx

import React from "react";
import "./Header.css"

function Header(props) {
    console.log(props);
    return(
        <div className={'header'}>
            我是头部2
        </div>
    )
}
export default Header

```

* 在函数式子组件中定义数据的默认值：

```jsx

import React from "react";
import "./Header.css"

function Header(props) {
    console.log(props);
    return(
        <div className={'header'}>
            我是头部2
        </div>
    )
}
Header.defaultProps ={
    name:'默认',
    age:18
}
export default Header

```

* 如何在子组件校验中校验参数的类型

需要安装一个propTypes

```shell script

npm install prop-types

```

使用校验参数

```jsx

import React from "react";
import "./Header.css"

import ReactTypes from 'prop-types'

function Header(props) {
    console.log(props);
    return(
        <div className={'header'}>
            我是头部2
        </div>
    )
}
Header.defaultProps ={
    name:'默认',
    age:18
}
Header.propTypes = {
    name:ReactTypes.string,
    age:ReactTypes.number
}
export default Header

```

### 类声明组件

```jsx

import React from "react";
import "./Main.css"
import ReactTypes from "prop-types"

class Main extends React.Component{
    constructor(props) {
        super();
        this.props = props
    }

    render() {
        console.log(this.props);
        return(
            <div className={'main'}>
                我是中间
            </div>
        )
    }

    static defaultProps = {
        name:"moren",
        age:888
    }

    static propTypes = {
        name:ReactTypes.string,
        age:ReactTypes.number
    }
}

export default Main

```

::: warning 注意点

* 在父子组件传值定义构造方法的时候，因为已经继承了父类，父类中已经对props进行了this.props = props的指向，所以，我们只需要通过super(props)将值传给父组件即可
，在当前的类中即可拿到this.props

:::

示例:

```jsx

import React from "react";
import "./Main.css"
import ReactTypes from "prop-types"

class Main extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            <div className={'main'}>
                我是中间
            </div>
        )
    }

    static defaultProps = {
        name:"moren",
        age:888
    }

    static propTypes = {
        name:ReactTypes.string,
        age:ReactTypes.number
    }
}

export default Main

```

### 子父组件通讯

子组件与父组件通讯是通过回调函数实现通讯的

示例：

```jsx

import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
class App extends React.Component{
    render() {
        return(
            <div>
                <Header />
                <Main age={19} />
                <Footer fatherFn={this.myFn.bind(this)} />
            </div>
        )
    }

    myFn(name,age){
        console.log(name, age);
    }
}

export default App;

```

子组件调用

```jsx

import React from "react";
import "./Footer.css"

class Footer extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return(
            <div className={'footer'}>
                我是底部
                <button onClick={()=>{this.btnClick()}}>子组件按钮</button>
            </div>
        )
    }
    btnClick(){
        this.props.fatherFn('test',18)
    }
}

export default Footer

```

## 跨组件通讯

### 爷爷给孙子传值通讯

* 第一种方式是一层层传递

```jsx

import React from "react";

class Children extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>我是孙子</p>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

class Son extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <p>我是儿子</p>
                <Children name={this.props.name} />
            </div>
        )
    }
}

class App extends React.Component{
    render() {
        return(
            <div>
                <p>我是爸爸</p>
                <Son name={'test'} />
            </div>
        )
    }
}

export default App;


```


### 孙子给爷爷传值通讯

* 第一种方式是一层层的传递

```jsx

import React from "react";

class Children extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <p>我是孙子</p>
               <button onClick={()=>{this.btnClick()}}>孙子按钮</button>
            </div>
        )
    }
    
    btnClick(){
        this.props.appFun(19)
    }
}

class Son extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <p>我是儿子</p>
                <Children appFun={this.props.appFun} />
            </div>
        )
    }
}

class App extends React.Component{
    render() {
        return(
            <div>
                <p>我是爸爸</p>
                <Son appFun={this.myFn.bind(this)} />
            </div>
        )
    }
    myFn(age){
        console.log(age);
    }
}

export default App;

```

### 兄弟组件通讯

需要通过先传递给共同的父级组件，然后再传递给兄弟组件

```jsx

import React from "react";


class A extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button onClick={()=>{this.btnClick()}}>A按钮</button>
            </div>
        )
    }

    btnClick(){
        this.props.appFn("A")
    }
}


class B extends React.Component{
    render() {
        return(
            <div>
                <p>B组件拿到兄弟的值是：{this.props.name}</p>
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:''
        }
    }
    render() {
        return(
            <div>
                <A appFn={this.myFn.bind(this)} />
                <B name={this.state.name}/>
            </div>
        )
    }

    myFn(name){
        this.setState({
            name
        })
    }
}

export default App

```

## 跨组件通讯的其他方式

因为上面的组件通讯的方式过于复杂，如果嵌套层级过于深，比较麻烦，所以React还提供了其他的解决方案

1. 通过context上下文传递
2. 通过Redux传递（相当于vuex）
3. 通过Hooks传递（比较牛）


### 通过context来传递

* 爷孙之间通讯

```jsx

import React from "react";

// 1.创建一个上下文对象
const AppContext = React.createContext({})
// 从上下文对象中获取容器组件
const {Provider,Consumer} = AppContext
// Provider:生产者容器组件，专门用于负责生产数据
// Consumer:消费者容器组件，专门用于消费生产者容器组件生产的数据
// 容器组件 : 专门用于包裹其他的组件，我们就称之为容器组件
class Children extends React.Component{
   render() {
       return(
           <Consumer>
               {
                   (value)=>{
                       return(
                           <div>
                               <p>{value.name}</p>
                               <p>{value.age}</p>
                           </div>
                       )
                   }
               }
           </Consumer>
       )
   }
}


class Son extends React.Component{
    render() {
        return(
            <div>
                <Children />
            </div>
        )
    }
}

class App extends React.Component{
    render() {
        return(
            /**
             * 我们可以通过生产者容器生产数据
             * */
            <Provider value={{name:'test',age:19}}>
                <Son/>
            </Provider>
        )
    }
}

export default App


```


* 第二种方式

默认情况下在创建上下文对象的时候是可以进行赋值操作的，所以可以不借助生产者和消费者容器进行跨组件之间的通讯

```jsx
import React from "react";

// 1.创建一个上下文对象并给定初始值
const AppContext = React.createContext({
    name:'test1',
    age:199
})
class Children extends React.Component{
   render() {
       return(
           <div>
               <p>{this.context.name}</p>
               <p>{this.context.age}</p>
           </div>
       )
   }
}
// 必须要给定当前对应的静态上下文是哪一个才可以
Children.contextType = AppContext

class Son extends React.Component{
    render() {
        return(
            <div>
                <Children />
            </div>
        )
    }
}

class App extends React.Component{
    render() {
        return(
            <div >
                <Son/>
            </div>
        )
    }
}

export default App

```

**上下文中支持多个生产者，多个消费者**

```jsx

import React from "react";

// 1.创建一个上下文对象
const AppContext1 = React.createContext({})
const AppContext2 = React.createContext({})
class Children extends React.Component{
   render() {
       return(
           <AppContext1.Consumer>
               {
                   (value)=>{
                       return(
                           <AppContext2.Consumer>
                               {
                                   (value2)=>{
                                       return(
                                           <div>
                                               <p>{value.name}</p>
                                               <p>{value.age}</p>
                                               <p>{value2.name}</p>
                                               <p>{value2.age}</p>
                                           </div>
                                       )
                                   }
                               }
                           </AppContext2.Consumer>
                       )
                   }
               }
           </AppContext1.Consumer>
       )
   }
}


class Son extends React.Component{
    render() {
        return(
            <div>
                <Children />
            </div>
        )
    }
}

class App extends React.Component{
    render() {
        return(
            <AppContext1.Provider value={{name:'test1',age:199}} >
                <AppContext2.Provider value={{name:'test2',age:200}}>
                    <Son/>
                </AppContext2.Provider>
            </AppContext1.Provider>
        )
    }
}

export default App

```

::: warning 注意点：

多个生产者的情况下不能使用`Children.contextType = AppContext`的方式进行赋值操作的，
因为如果同时使用两个`contextType`后面的会把前面的覆盖掉

:::

## 跨组件通讯-events

前面所讲的跨组件通讯所存在的问题：

* 通过context我们已经能够实现跨组件通讯，但是通过context我们只能实现从上往下传递，不能实现从下往上传递或者同级之前传递

* 经过前面的学习我们知道，子父组件之间通讯，是通过回调函数的方式，兄弟组件之间通讯，也是通过父组件，通过回调函数的方式

* 但是如果通过回调函数，传统的方式我们需要一层层的传递，比较复杂，所以我们可以借助一个第三方库(events)来实现跨组件事件通讯

### 安装

```shell script

npm install events

```

### 使用

```jsx

import React from "react";
import { EventEmitter } from "events"
// 1. 全局创建一个事件管理器对象

const eventBus = new EventEmitter();

class A extends React.Component{
    // 是React组件的一个生命周期的方法，这个方法不用我们手动调用，React会自动帮助我们调用
    // 当组件被渲染到界面上的时候，React就会自动调用
    componentDidMount() {
        eventBus.addListener('say',this.aFn.bind(this))
    }

    aFn(name,age){
        console.log(name, age);
    }

    render() {
        return(
            <div>A</div>
        )
    }
}

class B extends React.Component{
    render() {
        return(
            <div>
                <p>B</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }

    btnClick(){
        eventBus.emit('say','test',19)
    }
}

class App extends React.Component{
    render() {
        return(
           <div>
               <A />
               <B />
           </div>
        )
    }
}

export default App

```

* 父子组件之间的通讯

```jsx

import React from "react";
import { EventEmitter } from "events"
// 1. 全局创建一个事件管理器对象

const eventBus = new EventEmitter();

class Children extends React.Component{
    render() {
        return(
            <div>
                <p>Children</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }
    btnClick(){
        eventBus.emit("say",'test',19)
    }
}

class Son extends React.Component{
    render() {
        return(
            <div>
                <Children/>
            </div>
        )
    }

}

class App extends React.Component{
    componentDidMount() {
        eventBus.addListener("say",this.appFn.bind(this))
    }
    
    // 生命周期方法，这个生命周期方法不需要手动调用，当当前的这个组件被卸载的时候，React就会自动调用
    componentWillUnmount() {
        eventBus.removeListener('say',this.appFn.bind(this))
    }

    // 注意点：如果通过events实现跨组件的通讯，那么为了考虑到性能的问题，应该在组件卸载的时候移除掉对应的事件
    appFn(name,age){
        console.log(name, age);
    }

    render() {
        return(
           <div>
               <Son/>
           </div>
        )
    }
}

export default App

```

::: warning 注意点

如果通过events实现跨组件的通讯，那么为了考虑到性能的问题，应该在组件卸载的时候移除掉对应的事件

:::


## props和state的区别

* 都是用来存储数据的
    * props存储的是父组件传递过来的数据
    * state存储的是自己的数据
* props是只读的数据，不能在子组件修改数据
* state需要通过setState()方法来修改数据，并且是可读可写的数据

## State面试题

* setState是同步的方法还是异步的

默认情况下是异步的

* 为什么setState是异步的

主要是为了优化性能，如果短时间内多次修改UI会导致性能问题，所以setState会搜集一段时间内的所有内容，统一一次性更新数据

* 如何拿到更新之后的数据

setState可以接收两个参数,通过第二次参数的回调函数拿到数据

```jsx

this.setState({
           age:199
  },()=>{
   console.log(this.state.age);
})

```

* setState一定是异步的吗？

不一定:在定时器中，在原生事件中都是同步的

```jsx

setTimeout(()=>{
    this.setState({
        age:666
    })
    console.log(this.state.age);// 666
},0)


// 原生事件
let oBtn = document.getElementById("btn");
oBtn.onclick = ()=>{
    this.setState({
        age:666
    })
    console.log(this.state.age);// 666
}

```

## setState原理

* setState会不会用我们传入的对象直接覆盖原有的对象

不会，利用深拷贝的方式替换值

```jsx

let oldObj = {age:19,gender:'man'}
let newObj = {age:666}
// 利用深拷贝的方式
let obj = Object.assign({},oldObj,newObj);

```

* State的合并现象


为什么下面的结果是1，不是3

因为setState默认是一个异步的方法，默认会收集一段时间内的会更新，然后统一更新，就导致了更新数据为1不是3的结果
```jsx

render() {
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.state.age}</p>
                <button onClick={()=>{this.btnClick()}}>按钮</button>
            </div>
        )
    }

    btnClick(){
       this.setState({
           age:this.props.age+1
       })
        this.setState({
           age:this.props.age+1
       })
        this.setState({
           age:this.props.age+1
       })
    }

```

**合并现象原理解析：**

```jsx

let oldObj = {age:0}

let stateList = [
    {age:oldObj.age + 1}, //oldObj.age = 0 + 1
    {age:oldObj.age + 1}, //oldObj.age = 0 + 1
    {age:oldObj.age + 1}  //oldObj.age = 0 + 1
]
stateList.forEach((newObj)=>{
    // Object.assign({},{age:0},{age:1})
    oldObj = Object.assign({},oldObj,newObj)
})

```

* 如何解决合并现象

```jsx

this.setState((preState,props)=>{
    return {age:preState.age + 1}
})
this.setState((preState,props)=>{
    return {age:preState.age + 1}
})
this.setState((preState,props)=>{
    return {age:preState.age + 1}
})

```

**实现原理：**

```jsx

let oldObj = {age:0}

let stateList = [
    (preState)=>{return { age :preState.age + 1}},
    (preState)=>{return { age :preState.age + 1}},
    (preState)=>{return { age :preState.age + 1}}
]

stateList.forEach((fn)=>{
    // 第一次 {age:0 + 1}
    // 第二次 {age:1 + 1}
    // 第三次 {age:2 + 1}
    let newObj = fn(oldObj)
    oldObj = Object.assign({},oldObj,newObj);
    
})

```

