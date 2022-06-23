import type { DefaultTheme } from 'vitepress/types/default-theme'
type NavItem = DefaultTheme.NavItem
export default function nav(): NavItem[] {
  return [
    {
      text: '首页',
      link: '/',
    },
  ]
}
