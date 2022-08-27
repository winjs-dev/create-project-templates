export const themeData = {
  logo: '/images/hero.png',
  docsDir: 'docs',
  navbar: [
    {
      text: '指南',
      link: '/handbook/guide/README.md'
    },
    {
      text: 'Github',
      link: 'https://github.com/cloud-templates/create-project'
    },
    {
      text: 'Gitee',
      link: 'https://gitee.com/cloud-templates/create-project'
    }
  ],
  editLinks: true,
  lastUpdated: true,
  smoothScroll: true,
  editLinkText: '在 GitHub 上编辑此页',
  lastUpdatedText: '上次更新',
  contributorsText: '贡献者',
  tip: '提示',
  warning: '注意',
  danger: '警告',
  notFound: [
    '这里什么都没有',
    '我们怎么到这来了？',
    '这是一个 404 页面',
    '看起来我们进入了错误的链接'
  ],
  backToHome: '返回首页',
  sidebar: {
    '/': [
      {
        text: '指南',
        children: [
          '/handbook/guide/README.md',
          '/handbook/guide/quickstart.md',
          '/handbook/guide/environment.md',
          '/handbook/guide/deploy.md',
          '/handbook/guide/structure.md'
        ]
      },
      {
        text: '进阶',
        children: [
          '/handbook/advanced/general.md',
          '/handbook/advanced/build-tools.md',
          '/handbook/advanced/env-and-mode.md',
          '/handbook/advanced/assets.md',
          '/handbook/advanced/request.md',
          '/handbook/advanced/specification.md'
        ]
      }
    ]
  },
  locales: {
    '/': {
      selectLanguageName: 'English'
    }
  },
  darkMode: true,
  repo: null,
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',
  sidebarDepth: 2,
  editLink: true,
  contributors: true,
  openInNewWindow: 'open in new window',
  toggleDarkMode: 'toggle dark mode',
  toggleSidebar: 'toggle sidebar'
};
