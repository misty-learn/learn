# egg基础

## 介绍

* Express是基于ES5的web开发框架
* Koa1.x是Express原班人马打造的基于ES6的web开发框架基于Generator实现的异步
* koa2.x也是Express原班人马打造的基于ES6的web开发框架基于的是async await
* Egg是阿里巴巴基于Koa的'有约束和规范'的'企业级web框架'
- 三个框架之间的关系其实是一部编程界的进化论

* 为什么使用egg不使用express和koa

1. Express和Koa没有约束和规范，会导致团队的沟通成本和项目的维护成本变高
    Egg有约束和规范，会大大降低团队的沟通成本和项目的维护成本
2. 阿里内部大量企业级项目使用egg开发，实践出真知
3. Node社区5位国人核心贡献者4人在阿里，有技术保障
4. 阿里前端安全专家，负责egg-security等类库，安全有保障

* 什么是有约束和规范
和ESLint检查JS代码一样，有一套标准，必须严格的遵守这套标准，否则会报错

* 什么是MVC

- M(Model): 处理应用程序数据逻辑的部分
- V(View): 处理数据显示的部分
- C(Controller): 处理应用程序业务逻辑，数据和页面的桥梁

## 使用

### 手动安装

1. 创建一个Egg项目
```shell
npm init -y
npm i egg -s
npm i egg-bin -D
```

## 在egg中自定义提示

### 定义多数据源无提示的解决办法

在egg中自己创建的文件夹可能不会被编译，主要体现在，如果使用数据库的多数据源的时候创建的如下的目录

```
--- model
    ---- mysql
    ---- mongo
    ---- ...

```

这时候egg不能自动编译并且出现提示信息，所以这时候需要我们手动做如下的处理方式即可生效

在`config/config.default.ts`或`config.default.js`中进行设置如下

```js

config.customLoader = {
    model: {
        directory: 'app/model', // 需要编译的文件
        inject: 'app', // 注入到哪里
        caseStyle: 'upper', // 首字母大写
    }
}

```

### 在使用插件`egg-validate-plus`无提示或报错


```js

config.customLoader = {
    rules: {
      directory: 'app/rules',
      inject: 'app',
    },
};

```
