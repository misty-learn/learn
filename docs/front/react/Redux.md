# 深入Redux

## 原理

* 什么是Redux
Redux是一个管理状态的容器，提供了一个可预测的状态管理

* 什么是可预测状态管理

数据再什么时候，因为什么，发生了什么改变，都是可以控制和追踪的，我们就称之为预测的状态管理

* 为什么要使用Redux
    * React是通过数据驱动界面更新的，React负责更新界面，而我们负责管理数据
    * 默认情况下我们可以在每个组件中管理自己的状态，但是现在前端应用程序已经变得越来越复杂，状态之间可能存在依赖关系（父子、共享等），
    一个状态的变化会引起另一个状态的变化
    * 所以当应用程序复杂的时候，状态什么时候改变，因为什么改变，发生了什么改变，就会变得非常难以控制和追踪
    * 所以当应用程序复杂的时候，我们想很好的管理、维护、追踪、控制状态时，我们就需要使用Redux
    
* Redux核心概念
    * 通过store来保存数据
    * 通过action来修改数据
    * 通过reducer将store和action串联起来

## 三大原则

### 单一数据源

* 整个应用程序的state只存储在一个store中
* Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护
* 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改

### State是只读的

* 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改state
* 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state
* 这样可以保证所有的修改都被集中化处理，并按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

### 使用纯函数来执行修改

* 通过reducer将旧state和action联系在一起，并且返回一个新的state
* 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同的state tree的一部分
* 但是所有的reducer都应该是纯函数，不能产生任何的副作用

**什么是纯函数？**

返回结果只依赖于它的参数，并且在执行过程里面没有副作用

示例：

```js

// 纯函数
function sum(num1, num2){
    return num1 + num2;
}

// 非纯函数
let num1 = 10;
function sum(num2){
    return num1 + num2;
}

// 纯函数
const num1 = 10;
function sum(num2){
    return num1 + num2;
}
```

## 基本使用

因为Redux是可以不基于React使用的，作为一个独立的库可以单独拿出来使用，如下使用

```js

const redux = require("redux")

// 定义一个状态

let initState = {
    count:0
}

// 利用store来保存状态
const store = redux.createStore(reducer)


// 利用action来修改状态

const addAction = {type:'ADD_COUNT',num:1};
const subAction = {type:'SUB_COUNT',num:1};

// 利用reducer将store和action串联起来

function reducer(state = initState,action) {
    switch (action.type) {
        case'ADD_COUNT':
            return {count: state.count + action.num}
        case 'SUB_COUNT':
            return {count: state.count - action.num}
        default:
            return state
    }
}

// 在组件中如何从store获取存储的状态
// console.log(store.getState());


// 在组件中如何监听状态的改变(需要在修改数据之前先监听变化)
store.subscribe(()=>{
    console.log(store.getState())
})


// 在组件中如何修改store中存储的状态

store.dispatch(addAction)

// console.log(store.getState());

```

上面的为基本使用的方式，但是还是存在一定的规范的问题：

1. store、action、reducer代码都写在一个文件中，不利于代码的维护
2. action和reducer中都是使用字符串来指定和判断操作类型，写错不报错
3. action中的操作写死了，不够灵活等等

完整规范项目流程，在react项目中取提现

在src目录下创建一个store的文件夹

在store文件件下创建四个js文件

store.js

```js

import { createStore } from 'redux'

import reducer from "./reducer";

const store = createStore(reducer)

export default store;

```

reducer.js

```js

import { ADD_COUNT,SUB_COUNT } from './constants'

let initState = {
    count:1
}

function reducer(state = initState,action) {
    switch (action.type) {
        case'ADD_COUNT':
            return {count: state.count + action.num}
        case 'SUB_COUNT':
            return {count: state.count - action.num}
        default:
            return state
    }
}

export default reducer;

```

常量js文件

constants.js

```js

export const ADD_COUNT ='ADD_COUNT'
export const SUB_COUNT ='SUB_COUNT'

```

action.js

```js

import {ADD_COUNT,SUB_COUNT} from './constants'

export const addAction = (num) => {
    return {type:ADD_COUNT,num}
}

export const subAction = (num) => {
    return {type:SUB_COUNT,num}
}

```

在App.js中的使用

```jsx

import React from "react";
import "./App.css"
import { withRouter } from 'react-router-dom'
import store from "./store/store";
import { addAction,subAction } from './store/action'

class App extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            count:store.getState().count
        }
    }
    // 这里要监听改变的内容
    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                count:store.getState().count
            })
        })
    }
    
    // 如果页面销毁一定要清除监听事件
    componentWillUnmount() {
        store.unsubscribe()
    }

    render() {
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={()=>{this.addClick()}}>增加</button>
                <button onClick={()=>{this.subClick()}}>减少</button>
            </div>
        )
    }

    addClick(){
        store.dispatch(addAction(5))
    }

    subClick(){
        store.dispatch(subAction(6))
    }
}

export default withRouter(App)

```

### 其他组件中使用

和正常在App.js的组件使用的组件是一样的

App.js

```jsx

import React from "react";
import store from "./store/store";
import { withRouter } from 'react-router-dom'
import Test from "./components/Test";
import About from "./components/About";

class App extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            count:store.getState().count
        }
    }

    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                count:store.getState().count
            })
        })
    }

    componentWillUnmount() {
        store.unsubscribe()
    }

    render() {
        return(
            <div>
                <p>{this.state.count}</p>
                <Test/>
                <About/>
            </div>
        )
    }
}

export default withRouter(App)

```

Test.js

```jsx

import React from "react";
import store from "../store/store";
import { addAction } from '../store/action'

class Test extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            count:store.getState().count
        }
    }

    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                count:store.getState().count
            })
        })
    }

    componentWillUnmount() {
        store.unsubscribe()
    }

    render() {
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={()=>{this.addClick()}}>增加</button>
            </div>
        )
    }

    addClick(){
        store.dispatch(addAction(5))
    }
}

export default Test

```

About.js

```jsx

import React from "react";
import store from "../store/store";
import { subAction } from '../store/action'

class About extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            count:store.getState().count
        }
    }

    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                count:store.getState().count
            })
        })
    }

    componentWillUnmount() {
        store.unsubscribe()
    }

    render() {
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={()=>{this.subClick()}}>减少</button>
            </div>
        )
    }

    subClick(){
        store.dispatch(subAction(6))
    }
}

export default About

```

当前使用Redux存在的问题：

1. 代码冗余太多
2. 使用store过于分散

通过一个插件`redux-react`来进行简化所有的操作

官方地址：<https://react-redux.js.org/introduction/quick-start>

首先安装`redux-react`

```shell script

npm i redux-react

```

在index.js做一个注入

```jsx

import ReactDom from "react-dom"
import React from "react";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import  { Provider } from 'react-redux'
import store from "./store/store";
ReactDom.render(
    // 只要利用Provider将祖先组件包裹起来，并且通过Provider的store属性将Redux的store传递给Provider
    // 那么就可以在所有后代中直接使用Redux了
    <Provider store={store}>
    <BrowserRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </BrowserRouter>
    </Provider>
    ,document.getElementById("root"));

```

在组件中使用

Test.js

```jsx

import React from "react";
import {addAction} from "../store/action";
import { connect } from 'react-redux'

class Test extends React.PureComponent{
    render() {
        return(
            <div>
                {/*通过props来使用redux中保存数据*/}
                <p>{this.props.count}</p>
                <button onClick={()=>{this.props.increment()}}>增加</button>
            </div>
        )
    }
}

// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) =>{
    return{
        count:state.count
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps = (dispatch)=>{
    return{
        increment(){
            dispatch(addAction(10))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Test)

```

### React-Redux实现原理

connect.js的实现原理
```jsx

import React from "react";
import StoreContext from "./context";
function connect(mapStateToProps,mapDispatchToProps){
    return function enhanceComponent(WrappedComponent){
        class AdvComponent extends React.PureComponent{
            constructor(props,context) {
                super(props,context);
                this.state = {
                    storeState :{...mapStateToProps(this.context.getState())}
                }
            }
            componentDidMount() {
                this.context.subscribe(()=>{
                    this.setState({
                        storeState:{...mapStateToProps(this.context.getState())}
                    },()=>{
                        console.log(this.state.storeState);
                    })
                })
            }

            componentWillUnmount() {
                this.context.unsubscribe()
            }

            render() {
                return(<WrappedComponent {...this.props}
                                         {...mapStateToProps(this.context.getState())}
                                         {...mapDispatchToProps(this.context.dispatch)}
                />)
            }
        }
        AdvComponent.contextType = StoreContext
        return AdvComponent;
    }
}

export default connect;

```

注入函数的实现原理

context.js
```jsx

import React from "react";

const StoreContext = React.createContext({})

export default StoreContext;

```

```jsx

import ReactDom from "react-dom"
import React from "react";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import StoreContext from "./connect/context";
import store from "./store/store";
ReactDom.render(
    <StoreContext.Provider value={store}>
    <BrowserRouter>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </BrowserRouter>
    </StoreContext.Provider>
    ,document.getElementById("root"));

```

## redux-thunk中间件

* 默认情况下dispatch方法只能接收对象
* 如果想让dispatch方法接收对象以外，还要接收一个方法，我们可以使用redux-thunk中间件
* 作用：
    可以让dispatch方法可以接收一个函数，可以让我们在通过dispatch派发任务的时候去执行我们的方法

### 安装

```shell script

npm i redux-thunk

```

### 使用

现在store.js中使用thunk中间件

```jsx

import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from "./reducer";
// 创建store之前，通过applyMiddleware方法，告诉Redux需要应用哪些中间件
const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer,storeEnhancer)

export default store;

```

action.js中创建方法
```jsx

export const changeInfo = (info)=>{
    return{type:CHANGE_INFO,info}
}


export const getUserInfo = (dispatch,getState)=>{
    // 发送异步请求
    setTimeout(()=>{
        console.log("获取异步的网络数据请求");
        // 派发一个任务
        dispatch(changeInfo({name:'test',age:19}))
    },300)
}

```

Test.js中使用

```jsx

import React from "react";
import {getUserInfo} from "../store/action";
import { connect } from 'react-redux'

class Test extends React.PureComponent{
    componentDidMount() {
    //    在这里处理网络请求
        this.props.changeInfo()
        console.log("请求完成");
    }

    render() {
        return(
            <div>
                {/*通过props来使用redux中保存数据*/}
                 <p>{this.props.info.name || "暂无"}</p>
                 <p>{this.props.info.age || 0}</p>
            </div>
        )
    }
}

// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) =>{
    return{
        info:state.info
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps = (dispatch)=>{
    return{
        changeInfo(){
            // 默认情况下dispatch方法只能接收对象
            // 如果想让dispatch方法接收对象以外，还要接收一个方法，我们可以使用redux-thunk中间件
            dispatch(getUserInfo)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Test)

```

## Redux-Saga

redux-saga和redux-thunk一样，是一个Redux中获取存储异步数据的中间件

redux-saga可以直接拦截dispatch派发的action,从而实现在执行reducer之前执行一些其他的操作

区别：

redux-thunk通过派发方法，来实现异步数据的存储

redux-saga是通过派发的对象（默认官方的redux只支持派发对象）来拦截后实现异步数据的存储

### 安装

```shell script

npm i redux-saga

```

### 使用

store.js

```jsx

import { createStore,applyMiddleware } from 'redux'
/**
 * 如果导入的是redux-thunk返回的是一个中间件对象
 */
// import thunkMiddleware from 'redux-thunk'
/**
 * 如果导入的是redux-saga，返回的是一个用户创建中间件对象的方法
 */
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducer";
// 通过createSagaMiddleware方法创建saga中间件对象
const sagaMiddleware = createSagaMiddleware();
// 创建store之前，通过applyMiddleware方法，告诉Redux需要应用哪些中间件
const storeEnhancer = applyMiddleware(sagaMiddleware)
const store = createStore(reducer,storeEnhancer)

/**
 * 如果是redux-thunk，那么在创建store的时候指定完中间件即可
 *
 * 如果是redux-saga,那么除了在创建store的时候指定中间件以外，还需要手动调用中间件的run方法
 */
sagaMiddleware.run();
export default store;

```


创建一个saga.js拦截派发的任务
```jsx

import {takeEvery,put} from 'redux-saga/effects'
import { GET_USERINFO } from './constants'
import {changeInfo} from './action'


function *myHandler(){
    // 获取网络数据
    const data = yield setTimeout(()=>{
        return {name:'test',age:'info'}
    },1000)
    // 保存网络数据
    yield put(changeInfo({name:'test',age:'info'}))
}

function *mySaga() {
    // 指定要拦截的action类型
    // 指定拦截到这个类型的action之后来交给谁处理
    yield takeEvery(GET_USERINFO,myHandler)
}

export default mySaga;

```

如果需要保存或者操作多个action的时候需要对代码进行相应的调整

```jsx

import {takeEvery,takeLatest,put,all} from 'redux-saga/effects'
import {ADD_COUNT, GET_USERINFO} from './constants'
import {changeInfo} from './action'

function *myHandler(){
    // 获取网络数据
    const data = yield setTimeout(()=>{
        return {name:'test',age:'info'}
    },1000)
    /***
     * 如果我们只需要保存一个数据，那么直接通过yield put即可
     * 如果我们需要同时保存多个数据，那么我们需要借助另外一个函数，all()
     * */
    yield all([
        yield put(changeInfo({name:'test',age:'info'})),
        // ...
    ])
}

function *mySaga() {
    // 指定要拦截的action类型
    // 指定拦截到这个类型的action之后来交给谁处理
    /***
     * takeEvery和takeLatest的区别
     * 是否能够完整的执行监听方法
     *
     * 对于takeEvery而言，每次拦截到对应类型的action，都会完整的执行监听方法
     * 例如：连续派发了3次GET_USERINFO的action，那么对于takeEvery而言，myHandler会被完整的执行三次
     *
     * 对于takeLatest而言，每次拦截到对应类型的action，都不能保证一定能够完整的执行监听方法
     * 例如：如果派发下一次同类型action的时候，上一次派发的action还没有处理完，也就是上一次监听方法还没有处理完
     * 那么takeLatest会放弃还没有处理完的代码，直接开始处理下一次的action
     *
     */
    // yield takeEvery(GET_USERINFO,myHandler)
    // yield takeLatest(GET_USERINFO,myHandler)
    /***
     * 如果我们只需要拦截一个类型的action，那么直接通过yield takeLatest/yield takeLatest
     * 如果我们需要拦截多个类型的action，那么我们需要借助另外一个函数，all()
     * */

    yield all([
        yield takeEvery(GET_USERINFO,myHandler),
        yield takeLatest(ADD_COUNT,myHandler)
    ])
}

export default mySaga;

```


## Redux-DevTools

Redux DevTools是一款官方提供的浏览器调试工具

可以让我们很方便的对Redux保存的状态进行跟踪调试

谷歌浏览器直接在应用商店安装即可，安装完成后，需要在store.js中进行一定的配置才可以正常使用

```js

import { createStore,applyMiddleware,compose } from 'redux'
/**
 * 如果导入的是redux-thunk返回的是一个中间件对象
 */
// import thunkMiddleware from 'redux-thunk'
/**
 * 如果导入的是redux-saga，返回的是一个用户创建中间件对象的方法
 */
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducer";
import mySaga from "./saga";
// 通过createSagaMiddleware方法创建saga中间件对象
const sagaMiddleware = createSagaMiddleware();
// 创建store之前，通过applyMiddleware方法，告诉Redux需要应用哪些中间件
const storeEnhancer = applyMiddleware(sagaMiddleware)
// 配置Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true}) || compose;

const store = createStore(reducer,composeEnhancers(storeEnhancer))

/**
 * 如果是redux-thunk，那么在创建store的时候指定完中间件即可
 *
 * 如果是redux-saga,那么除了在创建store的时候指定中间件以外，还需要手动调用中间件的run方法
 */
// 我们可以利用传入的生成器告诉redux-saga，需要拦截哪些dispatch派发的action
sagaMiddleware.run(mySaga);
export default store;

```

## 优化Redux

### reducer 优化
对reducer进行拆分，避免数据量过大导致数据混乱的问题

reducer.js
```jsx

import { ADD_COUNT,SUB_COUNT,CHANGE_INFO } from './constants'
let initialHomeState = {
    count:0
}

function homeReducer(homeState = initialHomeState,action){
    switch (action.type) {
        case ADD_COUNT:
            return {...homeState, count: homeState.count + action.num}
        case SUB_COUNT:
            return {...homeState, count: homeState.count - action.num}
        default:
            return homeState
    }
}

let initialAboutState = {
    info:{}
}

function aboutReducer(aboutState = initialAboutState,action){
    switch (action.type) {
        case CHANGE_INFO:
            return {...aboutState, info: action.info}
        default:
            return aboutState
    }
}

function reducer(state={},action) {
    return{
        countData:homeReducer(state.countData,action),
        infoData:aboutReducer(state.infoData,action)
    }
}
export default reducer;

```


为什么redux中的处理函数叫做reducer

因为数组中有一个叫做reducer函数，这个函数的特点是：会将上一次的结果返回结果作为下一次的参数，
同理在Redux中这个处理函数也会将上一次的返回结果作为下一次的参数，所以叫做reducer

如何合并拆分之后的reducer？
* 手动和合并
* 通过redux提供的合并函数合并

当前redux中存在的其他问题

如果把所有的文件都放到一个文件中，会导致代码过于复杂，
所以需要对每个操作的代码进行分割处理，分割为多个文件来进行处理
