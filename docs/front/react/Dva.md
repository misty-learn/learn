# Dva

轻量级的应用框架

dva是一个基于redux和redux-saga的数据流方案，内置了react、react-dom、react-router、redux、redux-saga

官方地址： <https://dvajs.com/guide/>

## 安装dva

```shell script

npm install dva

```

## 使用

```jsx

import dva from 'dva'

// 创实例对象

let app = dva()

// 定义组件

function App(){
    return(
        <div>
            App
        </div>
    )
}

// 注册路由表，告诉dva需要渲染哪个组件
// 回调函数返回的值，就是需要渲染的组件
app.router(()=><App/>)

// 4. 启动dva

app.start('#root')

```

## 数据管理

通过model来管理数据，可以同时创建多个model但是要保证每个model的命名空间都要不相同

```jsx

import dva,{connect} from 'dva'
import React from "react";


// 创实例对象

let app = dva()

// 定义一个model

let homeModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'home',
    // 指定当前命名空间保存的数据
    state: {
        num: 0
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {num: state.num + action.num}
        },
        sub: (state, action) => {
            return {num: state.num - action.num}
        }
    }
}

let aboutModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'about',
    // 指定当前命名空间保存的数据
    state: {
        count: 0
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {count: state.count + action.count}
        },
        sub: (state, action) => {
            return {count: state.count - action.count}
        }
    }
}
// 告诉dva需要使用哪个model
app.model(homeModel);
app.model(aboutModel)

// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) =>{
    return{
        // 需要从传入的命名空间中拿到对应的数据
        num:state.home.num
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps = (dispatch)=>{
    return{
        // 也需要指定命名空间
        increment(){
            dispatch({type:'home/add',num:1})
        },
        decrement(){
            dispatch({type:'home/sub',num:1})
        }
    }
}

const AdvHome = connect(mapStateToProps,mapDispatchToProps)(Home)

// 定义组件

function Home(props) {
    return (
        <div>
            <p>{props.num}</p>
            <button onClick={()=>{props.increment()}}>增加</button>
            <button onClick={()=>{props.decrement()}}>减少</button>
        </div>
    )
}

function App() {
    return (
        <div>
            <AdvHome/>
        </div>
    )
}

// 注册路由表，告诉dva需要渲染哪个组件
// 回调函数返回的值，就是需要渲染的组件
app.router(() => <App/>)

// 4. 启动dva

app.start('#root')

```

### dva异步处理

在dva中添加一个effects来对异步的数据进项相应的处理

```jsx

import dva, {connect} from 'dva'
import React from "react";


// 创实例对象

let app = dva()

// 定义一个model

let homeModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'home',
    // 指定当前命名空间保存的数据
    state: {
        num: 0,
        info: {}
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {...state, num: state.num + action.num}
        },
        sub: (state, action) => {
            return {...state, num: state.num - action.num}
        },
        changeInfo: (state, action) => {
            return {...state, info: action.info}
        }
    },
    // 异步数据处理
    effects: {
        * asyncUserInfo(state, {put}) {
            const data = yield fetch('https://getman.cn/mock/yanyu/test')
                .then((response) => {
                    console.log(response.json());
                    return  response.json()
                }).catch((error) => {
                    console.log(error);
                })
            yield put({type:'changeInfo',info:data})
        }
    }
}

let aboutModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'about',
    // 指定当前命名空间保存的数据
    state: {
        count: 0
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {count: state.count + action.count}
        },
        sub: (state, action) => {
            return {count: state.count - action.count}
        }
    }
}
// 告诉dva需要使用哪个model
app.model(homeModel);
app.model(aboutModel)

// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps = (state) => {
    return {
        // 需要从传入的命名空间中拿到对应的数据
        num: state.home.num,
        info:state.home.info
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps = (dispatch) => {
    return {
        // 也需要指定命名空间
        increment() {
            dispatch({type: 'home/add', num: 1})
        },
        decrement() {
            dispatch({type: 'home/sub', num: 1})
        },
        getUserInfo(){
            dispatch({type:'home/asyncUserInfo'})
        }
    }
}

const AdvHome = connect(mapStateToProps, mapDispatchToProps)(Home)

// 定义组件

function Home(props) {
    return (
        <div>
            <p>{props.num}</p>
            <button onClick={() => {
                props.increment()
            }}>增加
            </button>
            <button onClick={() => {
                props.decrement()
            }}>减少
            </button>
            <hr/>
            <p>{props.info.name}</p>
            <p>{props.info.age}</p>
            <button onClick={()=>{props.getUserInfo()}}>获取</button>
        </div>
    )
}

function App() {
    return (
        <div>
            <AdvHome/>
        </div>
    )
}

// 注册路由表，告诉dva需要渲染哪个组件
// 回调函数返回的值，就是需要渲染的组件
app.router(() => <App/>)

// 4. 启动dva

app.start('#root')

```


## Dva项目示例

```jsx

import dva, {connect} from 'dva'
import React from "react";
import {Router,Route,Link,routerRedux} from 'dva/router'
import createHistory from 'history/createBrowserHistory';
// 创实例对象

/**
 * 在通过Dva方法创建Dva实例的时候，这个方法是可以接受一个对象的
 * 我们可以在这个对象指定dva路由的模式，
 * 如果在创建dva示例的时候，没有指定路由的模式，默认就是hash模式
 */
let app = dva({
    // 指定路由模式
    history:createHistory(),
    // 指定state默认值// 如果同时在initialState和model中都指定了初始值，initialState的优先级高于model
    initialState:{
        // 指定模型名称
        home:{
            num:676,
            info:{
                name:'test12',
                age:1212
            }
        }
    },
    onError:(error)=>{
        // 如果effects中发生了错误，并且在effects中没有捕获到错误，那么就会在onError中捕获
        // 如果在subscriptions中通过done传递了错误，也会在onError中捕获
        alert(error.message)
    },
    // 注册中间件
    // onAction:middlware
})

// 定义一个model

let homeModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'home',
    // 指定当前命名空间保存的数据
    state: {
        num: 0,
        info: {}
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {...state, num: state.num + action.num}
        },
        sub: (state, action) => {
            return {...state, num: state.num - action.num}
        },
        changeInfo: (state, action) => {
            return {...state, info: action.info}
        }
    },
    // 异步数据处理
    effects: {
        * asyncUserInfo(state, {put}) {
            const data = yield fetch('https://getman.cn/mock/yanyu/test')
                .then((response) => {
                    console.log(response.json());
                    return  response.json()
                }).catch((error) => {
                    console.log(error);
                })
            yield put({type:'changeInfo',info:data})
        }
    },
    // 订阅
    subscriptions: {
        setup({ history, dispatch }) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
                document.title = pathname
            });
        },
    }
}

let aboutModel = {
    // 指定当前model的命名空间的名称，用来区分 不同的model
    namespace: 'about',
    // 指定当前命名空间保存的数据
    state: {
        count: 0
    },
    // 指定当前命名空间保存的reducers
    reducers: {
        // reducers中key的作用，类型
        // {type:add,payload:xxx}
        add: (state, action) => {
            return {count: state.count + action.count}
        },
        sub: (state, action) => {
            return {count: state.count - action.count}
        }
    }
}
// 告诉dva需要使用哪个model
app.model(homeModel);
app.model(aboutModel)

// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps1 = (state) => {
    return {
        // 需要从传入的命名空间中拿到对应的数据
        num: state.home.num,
        info:state.home.info
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps1 = (dispatch) => {
    return {
        // 也需要指定命名空间
        increment() {
            dispatch({type: 'home/add', num: 1})
        },
        decrement() {
            dispatch({type: 'home/sub', num: 1})
        },
        getUserInfo(){
            dispatch({type:'home/asyncUserInfo'})
        },
        go2About(){
            dispatch(routerRedux.push("/about"))
        }
    }
}

const AdvHome = connect(mapStateToProps1, mapDispatchToProps1)(Home)

// 定义组件

function About(props) {
    return (
        <div>
            <p>{props.count}</p>
            <button onClick={() => {
                props.increment()
            }}>增加
            </button>
            <button onClick={() => {
                props.decrement()
            }}>减少
            </button>
            <button onClick={()=>{props.go2Home()}}>返回上一页</button>
        </div>
    )
}// 在mapStateToProps方法中告诉React-Redux,需要将store中保存的哪些数据映射到当前组件的props上
const mapStateToProps2 = (state) => {
    return {
        // 需要从传入的命名空间中拿到对应的数据
        count:state.about.count
    }
}
// mapDispatchToProps方法中告诉React-Redux，需要将哪些派发的任务映射到当前的组件上的props
const mapDispatchToProps2 = (dispatch) => {
    return {
        // 也需要指定命名空间
        increment() {
            dispatch({type: 'about/add', count: 2})
        },
        decrement() {
            dispatch({type: 'about/sub', count: 2})
        },
        go2Home(){
            dispatch(routerRedux.goBack())
        }
    }
}

const AdvAbout = connect(mapStateToProps2, mapDispatchToProps2)(About)

// 定义组件

function Home(props) {
    return (
        <div>
            <p>{props.num}</p>
            <button onClick={() => {
                props.increment()
            }}>增加
            </button>
            <button onClick={() => {
                props.decrement()
            }}>减少
            </button>
            <hr/>
            <p>{props.info.name}</p>
            <p>{props.info.age}</p>
            <button onClick={()=>{props.getUserInfo()}}>获取</button>
            <hr/>
            <button onClick={()=>{props.go2About()}}>跳转About</button>
        </div>
    )
}


function App(props) {
    return (
        <Router history={props.history}>
            <>
                <Link to={'/home'}>Home</Link>
                <Link to={'/about'}>about</Link>
                <Route path={'/about'} component={AdvAbout}/>
                <Route path={'/home'} component={AdvHome}/>
            </>
        </Router>

    )
}

// 注册路由表，告诉dva需要渲染哪个组件
// 回调函数返回的值，就是需要渲染的组件
// dva的router方法在执行回调函数的时候，会传递一个对象给我们，我们可以从这个对象中结构出当前路由的模式
// 如果在创建dva实例的时候没有指定模式，那么得到的就是hash模式
// 如果在创建dva实例的时候指定了模式，那么得到的就是我们指定的模式
app.router(({history}) => {
    return(
        <App history={history} />
    )
})

// 4. 启动dva

app.start('#root')

```
