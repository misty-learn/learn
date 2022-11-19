# react基础学习
## React核心思想
* 数据驱动界面更新(声明式渲染)
    只要数据发生了改变,界面就会自动改变
* 组件化开发
    将网页拆分成一个个独立的组件来编写,然后再将编写号的组件拼接成一个完整的网页

## 什么是虚拟DOM
* 虚拟DOM是相对于浏览器所渲染出来的真实DOM
* 虚拟DOM就是使用JS对象来表示页面上真实的DOM
案例：

```
<div id="name" title="name"></div> //真实的dom

let obj = {
    tagName:"div",
    attrs:{
        id:"name",
        title:"name"
    }
}

```

## React基本使用

### 自行配置

* 地址：https://react.docschina.org/docs/add-react-to-a-website.html

* react.js和react-dom.js
    - react.js包含了React和React-Native所共同拥有的核心代码，主要用于生成虚拟Dom
    - read-dom.js包含了针对不同平台渲染不同的核心代码，主要用于将"虚拟DOM转变成真实的DOM"
* 如何通过React创建DOM元素
    - 在React中，我们不能通过HTML标签直接创建DOM元素
    - 在React中，我们必须先通过react.js创建一个虚拟DOM，在通过react-dom.js渲染元素（创建真实DOM）
* 如何通过react.js创建虚拟DOM?
    - 通过React.createElement()方法创建
        * 第一个参数：需要创建的元素类型或组件
        * 第二个参数：被创建出来的元素拥有的属性
        * 第三个参数：被创建出来的元素拥有的内容（可以是多个）
* 如何渲染虚拟DOM
    - 通过react-dom.js中的ReactDOM.render()方法
        * 第一个参数：被渲染的虚拟DOM
        * 第二个参数：要渲染到哪个元素中
        * 第三个参数：渲染或更新完成后的回调函数
* 示例：
```html
<div id="app"></div>
    <script>
        let message = "测试"
        let oDiv = React.createElement('div',null,message)
        ReactDOM.render(oDiv,document.getElementById("app"),()=>{
            console.log("渲染成功");
        })
</script>
```
::: warning 注意事项
* 如果多次调用render方法，后渲染的，会覆盖掉之前渲染的数据
* render方法最多只能够接收三个参数，不能同时渲染多个元素
* 默认createElement方法只能接收3个参数，但是我们也可以传递3个以上的参数，从第三个参数开始，都当做第三个参数使用
    ```
        createElement(type,[props],[...children])
    ```
* 如果想通过React绑定事件，事件名称必须为驼峰命名
* 默认情况下React中，修改完数据之后，是不会自动更新界面的
:::

### 在React中定义组件

#### 使用构造函数定义组件

```jsx
let message = "你好"
    function Home(){
        return(
            <div>
                <div>{message}</div>
                <button onClick={myFun}>按钮</button>
            </div>

        )
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))
    function myFun(){
        message = "hello"
        ReactDOM.render(<Home/>,document.getElementById("app"))
    }

```

#### 使用类来定义组件

```jsx

class Home extends React.Component{
        render(){
            return(
                <div>
                    <div>{message}</div>
                    <button onClick={myFun}>按钮</button>
                </div>
            )
        }
    }
    let message = "你好"
    ReactDOM.render(<Home/>,document.getElementById("app"))
    function myFun(){
        message = "hello"
        ReactDOM.render(<Home/>,document.getElementById("app"))
    }

```

### 有状态组件和无状态组件

* 首先需要明确的是，组件中的状态(state)指的其实就是数据
    * 有状态组件指的是有自己的数据的组件（逻辑组件）
    * 无状态组件指的是没有自己数据的组件（展示组件）
    
#### 如何定义有状态组件
* 凡是继承于React.Component的组件，默认都会从父类继承过来一个state属性，这个state属性就是专门用来保存当前数据的
* 所以但凡是继承于React.Component的组件，都是有状态的组件
* 不继承React.Component的组件，都是无状态组件
* 所以所有的类组件就是有状态的组件
* 所有的函数组件就是无状态的组件

#### React-this的注意点

React在调用方法的时候，会通过apply修改监听方法的this，所以在普通的方法中，我们拿到的this是undefined，导致我们无法在普通的方法中通过this
拿到当前组件的state

解决办法：
使用箭头函数的方式，可以拿到当前类中的this，因为箭头函数只能传参不能修改内部的this的指向

```jsx

class Home extends React.Component{
        constructor() {
            super();
            this.state = {
                message:'你好'
            }

        }

        render(){
            return(
                <div>
                    <div>{this.state.message}</div>
                    <button onClick={this.myFun}>按钮</button>
                </div>
            )
        }

        myFun = () =>{
            this.state.message = "hello"
            ReactDOM.render(<Home/>,document.getElementById("app"))
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))

```

::: warning 注意点

如果要修改state中的数据，那么永远不要直接修改，需要通过setState方法来修改

:::

对上面的代码进行调整

```jsx

myFun = () =>{
    this.setState({
        message : "hello"
    })
}

```

**数据驱动界面更新原理：**

`setState()`方法是通过React.Component继承过来的

实现原理：

```jsx

class MyComponent extends React.Component{
        constructor() {
            super();
            this.state = null
        }
        
        setState(val){
            this.state = val
            ReactDOM.render(this.render(),document.getElementById("app"))
        }

    }

```
