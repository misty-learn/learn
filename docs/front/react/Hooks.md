# ReactHooks

1. 什么是Hook？

Hook是React16.8的新特性，他可以让函数组件拥有类组件的特性

2. 为什么需要Hook?

* 在Hook出现之前，如果我们想在组件中保存自己的状态，或者想在组件的某个生命周期中做一些事情，那么我们必须使用类组件
    * 但是类组件的学习成本是比较高的，你必须懂得ES6的class，你必须懂得箭头含少数
    * 但是在类组件的同一个生命周期方法中，我们可能会编写很多不同的业务逻辑代码
        这样就导致了大量不同的业务逻辑代码混杂到一个方法中，导致代码变得很难以维护
        （例如：在组件被挂载的生命周期中，节能主要注册监听，可能需要发送网络请求等）
    * 但是在类组件中共享数据是非常繁琐的，需要借助Context或者Redux等
    
* 所以当应用程序变得复杂时，类组件就会变得非常复杂，非常难以维护
* 所以Hook就是为了解决以上问题而生的

3. 如何使用Hook？
* Hook的使用我们无需额外安装任何第三方库，因为它就是React的一部分
* Hook只能在函数组件中使用，不能再类组件或者函数组件之外的地方使用
* Hook只能在函数最外层调用，不要在循环，条件判断或者子函数中调用

## useState

```jsx

import React,{useState} from 'react'

/**
 * 1. 什么是Hook
 * 是一个特殊的函数
 *
 * 2. 什么是useState Hook？
 * 可以让函数式组件保存自己的状态
 *
 * 3. useState Hook如何使用？
 * Hook只能在函数式组件中使用，并且只能在函数体的最外层使用
 */

function App() {
  /**
   * useState
   * 参数：保存状态的初始值
   * 返回值：是一个数组，这个数组中有两个元素
   * 第一个元素：保存的状态
   * 第二个元素：修改保存状态的方法
   */
  const  arr = useState(0)
  const [state,setState] = arr
  return (
    <div>
      <p>{state}</p>
      <button onClick={()=>{setState(state + 1)}}>增加</button>
      <button onClick={()=>{setState(state - 1)}}>减少</button>
    </div>
  );
}

export default App;

```


使用useState保存多个参数

```jsx

 const [ageState,setAgeState] = useState(0)
  const [nameState,setNameState] = useState('test')
  return (
    <div>
      <p>{ageState}</p>
      <p>{nameState}</p>
      <button onClick={()=>{setAgeState(ageState + 1)}}>增加</button>
      <button onClick={()=>{setAgeState(ageState - 1)}}>减少</button>
      <button onClick={()=>{setNameState('name')}}>修改</button>
    </div>)

```

::: warning 注意点：

其中的setAgeState和setNameState和类组件中的setState相同，都是异步执行的方法，所以如果在同步状态下使用，只会更改一次值
```jsx

setAgeState(ageState + 1)
setAgeState(ageState + 1)
setAgeState(ageState + 1)

```

得到的结果就是1，如果需要同时进行多次修改，需要使用箭头函数，拿到上一次的值

```jsx

setAgeState((preAgeState)=>preAgeState +1)
setAgeState((preAgeState)=>preAgeState +1)
setAgeState((preAgeState)=>preAgeState +1)

```
上面得到的结果便是：3

同样如果是修改对象：

```jsx

const [objState,setObjState] = useState({name:'test',age:19})
setObjState({...objState,name:'test1'})

```
:::


## useEffect

```jsx

import React,{useState,useEffect} from 'react'

/**
 * 1. 什么是useEffect Hook?
 * 可以把useEffect Hook看做
 * componentDidMount,componentDidUpdate和componentWillUnmount
 * 这三个生命周期函数的组合
 * 2. 特点
 * 可以设置依赖，只有依赖发生变化的时候才执行
 *
 */

function Home(){
  const [nameState,setNameState] = useState("test")
  const [ageState,setAgeState] = useState(0)
  // 默认情况下，只要数据发生改变就会调用
  useEffect(()=>{
    console.log('组件被挂载，组件更新完成');
    return ()=>{
      console.log("组件即将被卸载的时候调用");
    }
  },[nameState])
  // 第二个参数为哪个状态在改变的时候需要被调用
  return(<div>
    <p>{nameState}</p>
    <button onClick={()=>{setNameState("test1")}}>修改</button>
    <p>{ageState}</p>
    <button onClick={()=>{setAgeState(ageState + 1)}}>增加</button>
  </div>)
}

function App() {
  const [isShowState,setIsShowState] = useState(true)
  return (
    <div>
      { isShowState && <Home/> }
     <button onClick={()=>{setIsShowState(!isShowState)}}>切换</button>
    </div>
  );
}

export default App;

```

## useContext

```jsx

import React, {useContext, createContext} from 'react'

const ColorContext = createContext({});
const UserContext = createContext({})

function Home() {
    const user = useContext(UserContext)
    const color = useContext(ColorContext)
    return (
        // 使用消费者的标签的方式消费
        // <UserContext.Consumer>
        //     {
        //         value1 =>{
        //             return(
        //                 <ColorContext.Consumer>
        //                     {
        //                         value2 =>{
        //                             return (
        //                                 <div>
        //                                     <p>{value1.name}</p>
        //                                     <p>{value1.age}</p>
        //                                     <p>{value2.color}</p>
        //                                 </div>
        //                             )
        //                         }
        //                     }
        //                 </ColorContext.Consumer>
        //             )
        //         }
        //     }
        // </UserContext.Consumer>
        // 使用useContext消费
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{color.color}</p>
        </div>
    )
}

function App() {
    return (
        <UserContext.Provider value={{name: 'test', age: 19}}>
            <ColorContext.Provider value={{color: 'red'}}>
                <div>
                    <Home/>
                </div>
            </ColorContext.Provider>
        </UserContext.Provider>
    )
}

export default App;

```
## 案例：

```jsx

import React, {useContext, createContext} from 'react'

const InfoContext = createContext({});
const UserContext = createContext({})

// 在企业开发中国，但凡抽取代码，但凡被抽取的代码中用到了其他的Hook
// 那么就必须把这些代码抽取到自定义的Hook中
function useGetContext(){
    const user = useContext(UserContext)
    const info = useContext(InfoContext)
    return[user,info]
}

function Home() {
    let [user,info] = useGetContext()
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{info.gender}</p>
        </div>
    )
}

function About(){
    let [user,info] = useGetContext()
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{info.gender}</p>
        </div>
    )
}

function App() {
    return (
        <UserContext.Provider value={{name:'test',age:19}}>
            <InfoContext.Provider value={{gender:'man'}}>
                <Home/>
                <About/>
            </InfoContext.Provider>
        </UserContext.Provider>
    )
}

export default App;

```
