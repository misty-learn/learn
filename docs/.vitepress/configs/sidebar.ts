import type { DefaultTheme } from 'vitepress/types/default-theme'

export default function sidebar(): DefaultTheme.Sidebar {
  return {
    '/type-challenges/': [
      {
        text: '类型体操',
        items: [
          {
            text: 'Hello World',
            link: '/type-challenges/hello-word',
          },
          {
            text: '实现Pick',
            link: '/type-challenges/simple/pick',
          },
        ],
      },
    ],
  }
}
