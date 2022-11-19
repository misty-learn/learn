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
          {
            text: '实现Includes',
            link: '/type-challenges/simple/includes',
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
    '/after/': [
      {
        text: 'Node学习',
        collapsible: true,
        items: [
          {
            text: '安装',
            link: '/after/node/install',
          },
          {
            text: '使用',
            link: '/after/node/use',
          },
          {
            text: '学习',
            link: '/after/node/study',
          },
          {
            text: 'node核心',
            link: '/after/node/node核心',
          },
          {
            text: '部署',
            link: '/after/node/部署1',
          },
          {
            text: 'egg',
            link: '/after/node/egg',
          },
          {
            text: '直播',
            link: '/after/node/直播',
          },
        ],
      },
      {
        text: 'PHP学习',
        collapsible: true,
        items: [
          {
            text: '扩展',
            link: '/after/php/php扩展',
          },
          {
            text: 'PHPspreadsheet专项',
            link: '/after/php/PHPspreadsheet专项',
          },
        ],
      },
      {
        text: 'Python学习',
        collapsible: true,
        items: [
          {
            text: 'flask',
            link: '/after/python/flask',
          },
        ],
      },
      {
        text: 'C学习',
        collapsible: true,
        items: [],
      },
      {
        text: 'leetcode',
        collapsible: true,
        items: [
          {
            text: 'MySQL',
            link: '/after/leetcode/MySQL',
          },
        ],
      },
    ],
    '/front/': [
      {
        text: 'css基础知识',
        collapsible: true,
        items: [
          {
            text: 'css基础知识',
            link: '/front/css/',
          },
          {
            text: '常用知识',
            link: '/front/css/常用知识',
          },
          {
            text: '动画',
            link: '/front/css/动画',
          },
          {
            text: '盒子',
            link: '/front/css/盒子',
          },
          {
            text: 'less',
            link: '/front/css/less',
          },
          {
            text: 'sass',
            link: '/front/css/sass',
          },
        ],
      },
      {
        text: 'js基础知识',
        collapsible: true,
        items: [
          {
            text: '面向对象',
            link: '/front/javascript/面向对象',
          },
          {
            text: '类和对象',
            link: '/front/javascript/类和对象',
          },
          {
            text: '数组',
            link: '/front/javascript/数组',
          },
          {
            text: 'DOM',
            link: '/front/javascript/DOM',
          },
          {
            text: 'BOM',
            link: '/front/javascript/BOM',
          },
          {
            text: 'JS新特性',
            link: '/front/javascript/JS新特性',
          },
          {
            text: 'Promise异步',
            link: '/front/javascript/Promise异步',
          },
          {
            text: '手写Promise',
            link: '/front/javascript/手写Promise',
          },
        ],
      },
      {
        text: 'TypeScript学习',
        collapsible: true,
        items: [
          {
            text: '基础',
            link: '/front/typescript/',
          },
        ],
      },
      {
        text: 'vue2学习',
        collapsible: true,
        items: [
          {
            text: '基础',
            link: '/front/vue2/基础',
          },
          {
            text: '使用TS',
            link: '/front/vue2/使用TS',
          },
          {
            text: '常见问题',
            link: '/front/vue2/常见问题',
          },
        ],
      },
      {
        text: 'vue3学习',
        collapsible: true,
        items: [],
      },
      {
        text: 'react学习',
        collapsible: true,
        items: [
          {
            text: 'jsx',
            link: '/front/react/jsx',
          },
          {
            text: 'React脚手架',
            link: '/front/react/React脚手架',
          },
          {
            text: '组件深入',
            link: '/front/react/组件深入',
          },
          {
            text: '样式深入',
            link: '/front/react/样式深入',
          },
          {
            text: '深入动画',
            link: '/front/react/深入动画',
          },
          {
            text: '深入路由',
            link: '/front/react/深入路由',
          },
          {
            text: 'Redux',
            link: '/front/react/Redux',
          },
          {
            text: 'Hooks',
            link: '/front/react/Hooks',
          },
          {
            text: 'antd',
            link: '/front/react/antd',
          },
          {
            text: '接口文档',
            link: '/front/react/接口文档',
          },
          {
            text: '项目部署',
            link: '/front/react/项目部署',
          },
        ],
      },
      {
        text: 'webpack基础学习',
        collapsible: true,
        items: [
          {
            text: 'loaders',
            link: '/front/webpack/loaders',
          },
          {
            text: 'plugins',
            link: '/front/webpack/plugins',
          },
        ],
      },
    ],
    '/sql/': [
      {
        text: 'MySQL数据库',
        collapsible: true,
        items: [
          {
            text: '增删改查',
            link: '/sql/mysql/crud',
          },
          {
            text: '数据类型',
            link: '/sql/mysql/class',
          },
          {
            text: '数据完整性',
            link: '/sql/mysql/数据完整性',
          },
          {
            text: '高级查询',
            link: '/sql/mysql/高级查询',
          },
          {
            text: '事务',
            link: '/sql/mysql/事务',
          },
          {
            text: '视图',
            link: '/sql/mysql/视图',
          },
          {
            text: '存储过程和函数',
            link: '/sql/mysql/存储过程和函数',
          },
          {
            text: '索引',
            link: '/sql/mysql/索引',
          },
        ],
      },
      {
        text: 'MongoDB数据库',
        collapsible: true,
        items: [
          {
            text: '基础',
            link: '/sql/mongodb/基础',
          },
          {
            text: '聚合操作',
            link: '/sql/mongodb/聚合操作',
          },
          {
            text: '索引',
            link: '/sql/mongodb/索引',
          },
          {
            text: '数据模型',
            link: '/sql/mongodb/数据模型',
          },
          {
            text: '复制集',
            link: '/sql/mongodb/复制集',
          },
          {
            text: '分片',
            link: '/sql/mongodb/分片',
          },
        ],
      },
      {
        text: 'Redis数据库',
        collapsible: true,
        items: [
          {
            text: 'API操作',
            link: '/sql/redis/API操作',
          },
          {
            text: '持久化',
            link: '/sql/redis/持久化',
          },
        ],
      },
    ],
    '/git/': [
      {
        text: 'git学习',
        items: [
          {
            text: '使用',
            link: '/git/use',
          },
          {
            text: 'gitflow工作流',
            link: '/git/gitflow',
          },
        ],
      },
    ],
    '/mac/': [
      {
        text: 'mac学习',
        items: [],
      },
    ],
  }
}
