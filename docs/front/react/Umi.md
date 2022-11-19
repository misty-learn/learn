# Umi

* 什么是Umi?
    * Umi是蚂蚁金服底层前端框架（经蚂蚁内部3000+项目验证）
    * Umi是以'路由'为基础的企业级React框架（同时支持配置式路由和约定式路由）
    * Umi是一个'可插拔'的企业级React框架（内部功能完全使用插件化完成）
    * 所以Umi是一个蚂蚁金服底层的，以'路由'为基础的，内部功能完全使用插件化完成的React框架

* 如何使用Umi？

```shell script

npm install umi

npx umi g page index

npx umi dev

```

* 什么是约定式路由？
    * 约定式路由也叫文件路由，就是不需要手写配置路由，通过目录和文件及其命名分析出路由配置
    * 在Umi中pages目录下面的react组件文件名称即是路由名称

例如：

```

pages       ---->       文件夹对应的就是/
index.js    ---->       对应的就是/渲染的地址即为/
home.js     ---->       /home
about       ---->       /about

```
    
官网地址:<https://umijs.org/>

## 配置式路由

* 在项目根目录创建`.umirc.js`配置文件
* 在配置文件中通过`routes:[]`对路由进行配置

```js

export default {
    routes:[
        {exact:true,path:'/',component:'home'},
        {exact:true,path:'/index',component:'about'},
        {exact:true,path:'/home',component:'index'},
    ]
}
// 如果通过`.umirc.js`手动配置路由，默认的约定式路由就失效了，最终的效果是配置完成的路由呈现的效果

```

### 全局布局文件

需要在目录中创建一个`layouts`目录，并在下面编写全局的布局文件即可。
约定式路由下不需要配置任何路由的项目，如果在配置式路由侠需要进行额外的配置才能使全局布局文件生效

```jsx

import React from 'react'
import Style from './index.css'
export default (props)=>{
    return(
        <>
            <div className={Style.header}>头部</div>
            <div className={Style.main}>{props.children}</div>
            <div className={Style.footer}>底部</div>
        </>
    )
}

```

### 路由跳转

* 可以通过Link跳转（声明式）

```jsx

import React from 'react'
import Style from './index.css'
import {Link} from 'umi'
export default (props)=>{
    return(
        <>
            <div className={Style.header}>
                <Link to={'/home'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/'}>Index</Link>

            </div>
            <div className={Style.main}>{props.children}</div>
            <div className={Style.footer}>底部</div>
        </>
    )
}

```

* 命令式跳转

```jsx

import React from 'react'
import Style from './index.css'
import {history} from 'umi'
export default (props)=>{
    return(
        <>
            <div className={Style.header}>
                <button onClick={()=>{history.push('/about')}}>About</button>
            </div>
            <div className={Style.main}>{props.children}</div>
            <div className={Style.footer}>底部</div>
        </>
    )
}

```

```jsx

import React from 'react';
import styles from './about.css';

export default (props) => {
  return (
    <div>
      <h1 className={styles.title}>Page about</h1>
        <button onClick={()=>{props.history.goBack()}}>返回上一页</button>
    </div>
  );
}

```

## 动态路由

约定`[]`包裹的文件或文件夹为动态路由。

例如：

`src/pages/users/[id].js` 会成为 `/users/:id`

`src/pages/users/[id]/settings.js` 会成为 `/users/:id/settings`

创建一个user.js
```jsx

import React from 'react';
import styles from './user.css';
import {Link} from 'umi'

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page user</h1>
        <Link to={'/detail/1'}>张三</Link>
        <Link to={'/detail/2'}>李四</Link>
    </div>
  );
}

```

在pages目录中创建一个detail目录并在当前的目录下创建一个`[id].js`的文件

`[id].js`

```jsx

import React from 'react'
export default (props)=>{
    console.log(props.match.params);
    return(
        <div>
            {props.match.params.id}
        </div>
    )
}

```

#### 多个参数路由

大概的结构为
```
pages --- 文件夹
     info --- 文件夹
         [id] --- 文件夹
            [name].js  --- 文件

```

```jsx

 <Link to={'/info/2/test'}>多个参数传值</Link>

```

`pages/info/[id]/[name].js`

```jsx

import React from 'react'

export default (props)=>{
    console.log(props.match.params.id);
    console.log(props.match.params.name);
    return(
        <div>
            <p>{props.match.params.id}</p>
            <p>{props.match.params.name}</p>
        </div>
    )
}

```

#### 可选的路由参数

```
pages
     info
         [id$]
              [name].js
```

路由的地址：
```

/info/:id?/:name
/info/4/test id=4,name=test
/info/test   name=test

```

## 嵌套路由

在umi里约定目录下有 `_layout.js` 时会生成嵌套路由，以 _layout.js 为该目录的 layout。layout 文件需要返回一个 React 组件，并通过 props.children 渲染子组件。
比如以下目录结构，

```
.
└── pages
    └── users
        ├── _layout.js
        ├── index.js
        └── list.js

```

会生成路由的格式为

```

[
  { exact: false, path: '/users', component: '@/pages/users/_layout',
    routes: [
      { exact: true, path: '/users', component: '@/pages/users/index' },
      { exact: true, path: '/users/list', component: '@/pages/users/list' },
    ]
  }
]

```

## 权限路由

通过指定高阶组件 `wrappers` 达成效果。


```jsx

import React from 'react'
function User() {
  return <>user profile</>
}
User.wrappers = ['@/wrappers/auth']
export default User

```

然后在 `src/wrappers/auth` 中，

```jsx

import { Redirect } from 'umi'
export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}

```

这样，访问 /user，就通过 useAuth 做权限校验，如果通过，渲染 src/pages/user，否则跳转到 /login，由 src/pages/login 进行渲染。

## 全局样式和模板

### 全局样式

Umi 中约定 src/global.css 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。

### 模板

新建 src/pages/document.ejs，umi 约定如果这个文件存在，会作为默认模板

在umi中配置title需要动态渲染

需要在`.umirc.js`中配置标题内容

```js

export default {
    title:"我是标题"
}

```

## Dva

### 安装

```shell script

npm install --save-dev @umijs/plugin-dva

```

