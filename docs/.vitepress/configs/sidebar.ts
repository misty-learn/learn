import type { DefaultTheme } from 'vitepress/types/default-theme'

export default function sidebar(): DefaultTheme.Sidebar {
  return {
    '/type-challenges/': [
      {
        text: '入门',
        collapsible: true,
        items: [
          {
            text: 'Hello World',
            link: '/type-challenges/hello-word',
          },
        ],
      },
      {
        text: '简单',
        collapsible: true,
        items: [
          {
            text: '实现Pick',
            link: '/type-challenges/simple/pick',
          },
          {
            text: '实现Readonly',
            link: '/type-challenges/simple/readonly',
          },
        ],
      },
      {
        text: '中等',
        collapsible: true,
        items: [
          {
            text: '实现Omit',
            link: '/type-challenges/medium/omit',
          },
        ],
      },
    ],
  }
}
