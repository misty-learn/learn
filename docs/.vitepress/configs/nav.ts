import type { DefaultTheme } from 'vitepress'
type NavItem = DefaultTheme.NavItem
export default function nav(): NavItem[] {
  return [
    {
      text: '首页',
      link: '/',
    },
    {
      text: '类型',
      items: [
        {
          text: '基础学习',
          link: '/typescript/',
        },
        {
          text: '类型挑战',
          link: '/type-challenges/',
        },
      ],
    },
  ]
}
