// @ts-expect-error is not a valid tsconfig option
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
          text: '类型挑战',
          link: '/type-challenges/',
        },
      ],
    },
  ]
}
