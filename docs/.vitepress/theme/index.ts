import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MonacoEditor from '../components/monaco/index.vue'
import 'uno.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('MonacoEditor', MonacoEditor)
  },
} as Theme
