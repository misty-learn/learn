# JSX学习

## 什么是JSX

- JSX === JavaScript + X === （XML）=== （eXtension）
- JSX 是一个看起来很像XML的JavaScript扩展

## 为什么学习JSX

- 使用JSX使得我们在React中编写页面结构更为简单、灵活
- JSX是类型安全的，在编译过程中就能发现错误
- JSX执行更快，因为他在编译为JavaScript代码后进行了优化
- 防止XSS注入攻击

- 示例：
```jsx

let oRoot = (
    <div>
        <div>{message}</div>
        <button onClick={myFun}>按钮</button>
    </div>
)
ReactDOM.render(oRoot, document.getElementById("app"), () => {
    console.log("渲染成功");
})

```

## JSX注释

在JSX中不能使用`<!-- 注释内容 -->`因为JSX会把它当做一个元素来处理

也不能使用JS的`// 单行注释`因为元素中是有内容的，所以JSX是会把单行注释当做元素来处理的

也不能使用JS的`/**  多行注释 */ `因为元素中是有内容的，所以JSX也会把多行注释当做元素来处理的

如何使用注释

```jsx

render(){
    return(
        {
        // 单行注释
        /**
            多行注释
        */
        }
    )
}

```

## JSX绑定属性

### 原生html
```html
<p id="box" class="info" style="color: red;font-size: 100px">你好测试</p>

```

### JSX

对于普通的属性而言，过去怎么绑定现在就怎么绑定

```jsx

class Home extends React.Component{
    constructor() {
        super()
        this.state.attr = "test"
    }

    render(){
        return(
            <div>
                {/* 按最普通的元素绑定属性*/}
                <p id="box">测试</p>
                {/* 动态绑定 */}
                <p title={this.state.attr}>测试</p>
                {/** 如果使用JSX绑定类名,不能直接通过class来绑定，JSX的本质是转换成JS代码
                 而在JS代码中class是一个关键字，所以不能使用class，需要使用className
                 */}
                <p className="info">测试</p>
                {/** 所以以后但凡是JS关键字的属性，都不能直接绑定*/}
                {/** 使用JSX绑定样式,那么不能像过去一样编写，必须通过对象的形式来绑定*/}
                {/** 在绑定样式的时候，如果过去在原生是通过横线连接的就必须转换为驼峰命名*/}
                <p style={{color:'red',fontSize:'100px'}}>测试</p>
            </div>
        )
    }

}
ReactDOM.render(<Home/>,document.getElementById("app"))

```


## JSX嵌入内容

```jsx

    class Home extends React.Component{
        constructor() {
            super()
            this.state.attr = "test"
        }

        render(){
            return(
                <div>
                    {/** 任何合法的JS表达式,都可以嵌入到{}中*/}
                    <p>{this.state.attr === 'test'?'是的':'不是'}</p>
                    {/** 以下嵌入的内容不会被显示出来 [] true false null undefined*/}
                    <p>{[]}</p>
                    <p>{true}</p>
                    <p>{false}</p>
                    <p>{null}</p>
                    <p>{undefined}</p>
                    {/** 如果想显示上面的内容，就必须先转换成字符串
                     但是对于空数组来说，哪怕转换成了字符串也不能显示
                     */}
                    <p>{[]+''}</p>
                    <p>{true+''}</p>
                    <p>{false+''}</p>
                    <p>{null+''}</p>
                    <p>{undefined+''}</p>
                    
                    {/**
                     除了上述内容以外，其他的内容都能正常显示
                     */}
                     <p>{this.state.attr}</p>
                </div>
            )
        }

    }
    ReactDOM.render(<Home/>,document.getElementById("app"))

```

## JSX的灵活性

* JSX使我们在JS中拥有了直接编写XML代码的能力
* 所以在JS中能干的事，在JSX中都能干

示例：通过按钮控制界面上的p标签的显示和隐藏

### 实现vue中的`v-show`

```jsx

class Home extends React.Component{
        constructor() {
            super()
            this.state = {
                flag:true
            }
        }

        render(){
            return(
                <div>
                    <p style={{display:this.state.flag?'block':'none'}}>我是段落</p>
                    <button onClick={this.myFn}>按钮</button>
                </div>
            )
        }

        myFn =()=>{
            this.setState({
                flag:!this.state.flag
            })
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))

```

### 实现vue中的`v-if`

```jsx
 <div>
    {this.state.flag && <p>我是段落</p>}
    <button onClick={this.myFn}>按钮</button>
</div>
```


### 实现vue中的`v-for`

```jsx

class Home extends React.Component{
        constructor() {
            super()
            this.state = {
                names:['鲁班','虞姬','黄忠']
            }
        }

        render(){
            const { names } = this.state
            const nameList = names.map(v=>{
                return <li>{v}</li>
            })
            return(
                <div>
                    {/**
                     <ul>
                     {nameList}
                     </ul>
                     */}
                    <ul>
                        {
                            names.map(v=>{
                                return <li>{v}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))

```

## JSX编码规范

### 在编写JSX代码的时候建议使用`()`将JSX代码包裹起来

* 推荐
```jsx
return (
        <div>ssss</div>)

```

* 不推荐
```jsx

return <div>ssss</div>

```

### 在JSX中只能有一个根元素

* 错误
```jsx

return (
<div></div>
<div></div>)

```

* 正确

```jsx

return (
    <div>
        <div></div>
        <div></div>
    </div>
)

```

### 单双标签规范

* 在JSX中可以编写单标签，也可以编写双标签，但是如果编写的是单标签，那么就必须加上闭合的符号

```jsx

<img />

```

### 组件使用规范

*  在使用组件的时候，可以使用单标签，也可以使用双标签，但是如果使用的是单标签，必须为闭合的符号

```jsx

<Home></Home>
<Home />

```

> 如果组件中没有内容，那么建议使用单标签


## JSX事件绑定

### 事件处理

* 事件监听方法中的this：默认情况下React在调用事件监听方法的时候，
是通过apply来调用的，
并且在调用的时候将监听方法中的this修改为undefined，
所以默认情况下我们是无法监听方法中使用的this的

* 解决监听方法中默认undefined的问题：
    * 使用箭头函数来解决，因为箭头函数没有自己的this
    * 通过bind方法来进行绑定this
    ```jsx
      class Home extends React.Component{
        constructor() {
            super()
        }

        render() {

            return (
                <div>
                    <button onClick={this.myFn.bind(this)}>按钮</button>
                </div>
            )
        }

        myFn(){
            console.log(this)
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))
    ```
  * 第二种的变种
  ```jsx
    class Home extends React.Component{
        constructor() {
            super()
            this.myClick = this.myFn.bind(this) 
        }

        render() {

            return (
                <div>
                    <button onClick={this.myClick}>按钮</button>
                </div>
            )
        }

        myFn(){
            console.log(this)
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))
   ```
  * 箭头函数的变种，手动你绑定一个箭头函数，然后在箭头函数中手动调用监听方法
  > 因为箭头函数中的this，就是当前的示例对象，因为监听方法并不是React调用的，而是我们在箭头函数中手动调用的，
    并且普通的方法，默认情况下谁调用就是谁
    ```jsx
    class Home extends React.Component{
        constructor() {
            super()
            this.myClick = this.myFn.bind(this)
        }

        render() {

            return (
                <div>
                    <button onClick={()=>{this.myFn()}}>按钮</button>
                </div>
            )
        }

        myFn (){
            console.log(this)
        }
    }
    ReactDOM.render(<Home/>,document.getElementById("app"))
    ```
::: waring 注意点

在企业开发中，最为推荐的是第四种方式

因为前面的三种方式，都是React帮我们调用的方法，只有第四种方式是我们自己调用的，并且传参比较方便

:::

### 事件对象

* 在React中，监听方法被触发时候，React也会传递一个时间对象给我们
但是React传递给我们的这个事件对象并不是原生的事件对象，
而是React根据原生的事件对象合成自己的一个时间对象

> 虽然传递给我们的是React的事件对象，但是提供的API和原生的几乎一致
如果用到了一个没有提供的API，那么也可以通过合成事件拿到原生的事件对象

```jsx

class Home extends React.Component{
    constructor() {
        super()
    }

    render() {

        return (
            <div>
                <button onClick={(e)=>{
                    console.log(e);
                }}>按钮</button>
                <button onClick={(e)=>{
                    console.log(e.nativeEvent);
                }}>原生事件</button>
            </div>
        )
    }
}
ReactDOM.render(<Home/>,document.getElementById("app"))

```
