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
    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress',
    // },
  },
})
