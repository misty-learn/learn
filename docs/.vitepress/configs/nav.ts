import type { DefaultTheme } from 'vitepress/types/default-theme'
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
          text: '类型挑战',
          link: '/type-challenges/',
        },
      ],
    },
  ]
}
