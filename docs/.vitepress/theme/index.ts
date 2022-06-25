import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MonacoEditor from '../components/monaco/monaco.vue'
import 'uno.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // TODO: enhanceApp
    app.component('MonacoEditor', MonacoEditor)
  },
} as Theme
