import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
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
  vite: {
    plugins: [
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons(),
          presetTypography(),
        ],
        theme: {
          preflightBase: false,
        },
      }),
    ],
  },
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Yanyu',
    },
  },
})
