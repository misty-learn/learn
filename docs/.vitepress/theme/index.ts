import type { Theme } from 'vitepress'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import { DefaultTheme } from 'vitepress-dumi-theme/theme'
import MonacoEditor from '../components/monaco/index.vue'
import BlogItem from '../components/BlogItem.vue'
import 'uno.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('MonacoEditor', MonacoEditor)
    app.component('BlogItem', BlogItem)
    app.component('Demo', AntdTheme)
  },
} as Theme
