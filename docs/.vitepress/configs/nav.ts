import type { DefaultTheme } from 'vitepress'
type NavItem = DefaultTheme.NavItem
export default function nav(): NavItem[] {
  return [
    {
      text: '首页',
      link: '/',
    },
    {
      text: '博客',
      link: '/blog/',
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
    {
      text: '杂项',
      items: [
        {
          text: 'git',
          link: '/git/',
        },
        {
          text: 'macbook',
          link: '/mac/',
        },
      ],
    },
    {
      text: '前端学习',
      items: [
        {
          text: '基础知识',
          items: [
            {
              text: 'CSS',
              link: '/front/css/',
            },
            {
              text: 'JS',
              link: '/front/javascript/',
            },
          ],
        },

        {
          text: 'webpack',
          link: '/front/webpack/',
        },
        {
          text: 'TypeScript',
          link: '/front/typescript/',
        },
        {
          text: 'vue2',
          link: '/front/vue2/',
        },
        {
          text: 'uni-app',
          link: '/front/uniApp/',
        },
        {
          text: 'react',
          link: '/front/react/',
        },
      ],
    },
    {
      text: '后端学习',
      items: [
        {
          text: 'C语言',
          link: '/after/c/',
        },
        {
          text: 'PHP',
          link: '/after/php/',
        },
        {
          text: 'NodeJs',
          link: '/after/node/',
        },
        {
          text: 'Python',
          link: '/after/python/',
        },
        {
          text: '算法题目',
          link: '/after/leetcode/',
        },
      ],
    },
    {
      text: '数据库',
      items: [{
        text: 'Mysql',
        link: '/sql/mysql/',
      },
      {
        text: 'Oracle',
        link: '/sql/orcale/',
      },
      {
        text: 'nosql',
        items: [{
          text: 'redis',
          link: '/sql/redis/',
        },
        {
          text: 'mongoDB',
          link: '/sql/mongodb/',
        },
        ],
      },
      ],
    },
  ]
}
