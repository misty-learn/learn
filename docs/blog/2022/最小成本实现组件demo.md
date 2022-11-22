# 最小成本实现组件demo展示

## 背景

在编写组件库的时候，我们一般会写一些文档，用以给其他开发者去查看和使用。但是仅仅只有文档还是不够的，我还需要提供演示的例子。

如果自己开发再去开发一个演示的插件，成本太高了，所以我就想着能不能直接使用`vitepress`配合一些插件来实现我们想要的效果。

下面我通过一个项目来展示如何实现。

## 创建一个新项目

创建一个新项目并进入到项目目录。
```bash

mkdir vitepress-demo && cd vitepress-demo

```

然后初始化项目
```bash
pnpm init
```

## 安装依赖

接下来我们安装一下环境所需要的依赖

```bash
pnpm add vite vue vitepress vite-plugin-vitepress-demo -D
```

:::details 关于peer deps的警告
当我们使用pnpm去安装依赖的时候会发现有一些警告，这是因为`@docsearch/js`中依赖了`peerDependencies`，但是我们没有安装，所以会有警告，但是不影响使用。
如果你想要去掉这个警告，可以在`package.json`添加如下配置：
```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```
:::

## 创建组件目录

接下来我们创建一个`docs`目录，用于存放我们的组件文档和示例。

```bash

mkdir docs

```

## 配置vitepress-demo插件

在`docs`目录下创建一个`vite.config.ts`文件，用于配置`vite-plugin-vitepress-demo`插件。

```ts
import { defineConfig } from 'vite'
import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo'

export default defineConfig({
    plugins: [
        VitePluginVitepressDemo(),
    ],
})
```

在`docs`下创建一个`.vitepress`的目录，用于存放`vitepress`的配置文件。

下面我们引用一下`vite-plugin-vitepress-demo`中的主题。

在`.vitepress`下创建`theme`文件夹，然后在`theme`下创建`index.ts`文件，配置如下：

```ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
  },
} as Theme

```


具体的配置项可以参考[vite-plugin-vitepress-demo](https://github.com/yanyu-fe/vite-plugin-vitepress-demo)

## 创建demos目录

在`docs`目录下创建一个`demos`目录，用于存放我们的组件示例。

```bash

mkdir demos

```

## 创建组件示例

在`demos`目录下创建一个`test.vue`文件，来编写我们的组件示例。

```vue
<template>
  <div>
    <h1>Counter</h1>
    <p>Counter demo</p>
    <p>{{ counter }}</p>
    <button @click="inc">
      inc
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const counter = ref(0)
const inc = () => counter.value++
</script>

```

## 创建组件文档

在`docs`目录下创建一个`index.md`文件，来编写我们的组件文档并引入我们的组件示例。

```md
## 组件展示示例

<demo src="./demos/basic.vue" title="Counter" desc="This is Counter demo"></demo>
```

## 配置package.json

在`package.json`中添加如下配置：

```json
{
  "type": "module",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress serve docs"
  }
}
```

## 启动项目

```bash

pnpm dev

```

## 效果展示

<demo src="./demos/test.vue" title="Counter" desc="This is Counter demo"></demo>
