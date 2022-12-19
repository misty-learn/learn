import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'

export default defineConfig({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '学习笔记',
      description: '个人学习笔记',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Learn docs',
      description: 'Learn study docs',
    },
  },
  lastUpdated: true,
  vue: {
    reactivityTransform: true,
  },
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Yanyu',
    },
    algolia: {
      appId: 'A5ETFK6GX8',
      apiKey: '424091d0670577ac07a12502c14a5c1a',
      indexName: 'docs-search',
      placeholder: '请输入搜索关键词',
      buttonText: '搜索',
    },
  },
})
