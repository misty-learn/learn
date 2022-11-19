# antdPro的使用

## 安装

本次项目使用的是antdPro5来实现的整个项目的构建，所以整个的命令全部采用的也是antdPro5实现

可以先全局安装一下`create-umi`

```shell

npm i -g create-umi

# 初始化antd项目

create-umi 项目名称

cd 项目目录

yarn

# 安装完成启动项目

yarn start

```

### 安装区块管理工具

在antdPro中提供了页面模板和区块，需要安装[umi ui](https://umijs.org/zh-CN/docs/use-umi-ui)

```shell

yarn add @umijs/preset-ui -D

# 重新启动项目

yarn start

```

## 配置

### 配置文件说明

[umi配置](https://umijs.org/zh-CN/config)

在antPro中`config/config.ts`是`umijs`的配置文件

### layout高级布局

[layout高级布局地址](https://procomponents.ant.design/components/layout/)

部分的布局配置一般在`defaultSettings.ts`中进行配置



* 导航栏配置，官方文档中有说明动态配置需要在app.ts中动态添加的，所以部分配置，如果找不到可以去`app.tsx`中找一下并进行相应的配置

[查看所属文档](https://umijs.org/zh-CN/plugins/plugin-layout)

* 在配置logo的时候可能会出现报错的问题
```
import logo from "logo.png"

{
...,
logo:logo
}

```

不能够通过静态配置的方式来配置logo

所以需要通过动态的方式来配置logo

[issue地址](https://github.com/ant-design/ant-design-pro/issues/7842)

```tsx
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    return {
        logo:()=><img src={logo} alt="我的logo" />,
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== '/user/login') {
                history.push('/user/login');
            }
        },
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        ...initialState?.settings,
    };
};

```

### 路由菜单配置


```ts

export default [

    {
        path: '/user', // 路由地址
        layout: false, // 告诉antdPro当前路由对应的组件，是否需要渲染到layout布局中
        routes: [ // 定义嵌套路由
            {
                path: '/user',
                routes: [
                    {
                        name: 'login', // 指定当前路由的名称
                        path: '/user/login', // 路由地址
                        component: './User/login', // 路由对应的组件
                    },
                ],
            },
        ],
    },
    // 只要当前的路由组件是渲染到layout布局中的
    // 只要当前的路由配置了name和icon
    // 那么将name和icon就会自动作为左侧菜单的内容来显示
    {
        path: '/welcome',
        name: 'welcome', // 会自动获取国际化里面的数据
        icon: 'smile', // antdPro会自动根据icon指定的key，到antd图标库中获取
        component: './Welcome',
    }
]

```

### 登录跳转权限控制

如果当前用户在未登录的状态下是不允许跳转到一些界面的，所以我们需要当前的部分界面做一些权限的控制

在`app.tsx`

当程序刚启动的时候，首先会判断当前的路由地址，当前是否是登录界面，如果不是登录界面，就请求用户信息，如果是登录界面，直接跳转到登录界面

```tsx

// 程序启动的时候初始化获取数据的方法
// 会在应用程序启动的时候判断
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  // if (history.location.pathname !== '/user/login') {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: {},
  //   };
  // }
  return {
    fetchUserInfo,
    settings: {},
  };
}

```

页面切换的时候，判断当前是否登录，如果没有登录跳转至登录界面

```tsx

// plugin-layout 运行时候的配置
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo:()=><img src={logo} alt="我的logo" />,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 页面发生变化，会判断当前是否登录，如果没有登录就跳转到指定的界面
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== '/user/login') {
      //   history.push('/user/login');
      // }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

```
