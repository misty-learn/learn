import type { DefaultTheme } from 'vitepress'

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
          {
            text: '元祖转对象',
            link: '/type-challenges/simple/tuple-to-object',
          },
          {
            text: '数组中第一个元素',
            link: '/type-challenges/simple/first-of-array',
          },
          {
            text: '获取元祖长度',
            link: '/type-challenges/simple/tuple-length',
          },
          {
            text: '实现Exclude',
            link: '/type-challenges/simple/exclude',
          },
          {
            text: '实现Awaited',
            link: '/type-challenges/simple/awaited',
          },
          {
            text: '实现If',
            link: '/type-challenges/simple/if',
          },
          {
            text: '实现Concat',
            link: '/type-challenges/simple/concat',
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
