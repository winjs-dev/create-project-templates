import { Vuepress } from '@vuepress/client/lib/components/Vuepress';

const routeItems = [
  ['v-8daa1a0e', '/', { title: '首页' }, ['/index.html', '/README.md']],
  [
    'v-0920a247',
    '/handbook/advanced/assets.html',
    { title: '样式和资源' },
    ['/handbook/advanced/assets', '/handbook/advanced/assets.md']
  ],
  [
    'v-5800842c',
    '/handbook/advanced/build-tools.html',
    { title: '构建工具' },
    ['/handbook/advanced/build-tools', '/handbook/advanced/build-tools.md']
  ],
  [
    'v-cd8e1bde',
    '/handbook/advanced/env-and-mode.html',
    { title: '环境变量与模式' },
    ['/handbook/advanced/env-and-mode', '/handbook/advanced/env-and-mode.md']
  ],
  [
    'v-3dcfd000',
    '/handbook/advanced/general.html',
    { title: '内置功能' },
    ['/handbook/advanced/general', '/handbook/advanced/general.md']
  ],
  [
    'v-32fcd6b9',
    '/handbook/advanced/request.html',
    { title: '接口请求' },
    ['/handbook/advanced/request', '/handbook/advanced/request.md']
  ],
  [
    'v-06a0a985',
    '/handbook/advanced/specification.html',
    { title: '规范' },
    ['/handbook/advanced/specification', '/handbook/advanced/specification.md']
  ],
  [
    'v-78e9f2b1',
    '/handbook/guide/',
    { title: '介绍' },
    ['/handbook/guide/index.html', '/handbook/guide/README.md']
  ],
  [
    'v-47e46d01',
    '/handbook/guide/deploy.html',
    { title: '构建生产版本' },
    ['/handbook/guide/deploy', '/handbook/guide/deploy.md']
  ],
  [
    'v-01285952',
    '/handbook/guide/environment.html',
    { title: '环境配置' },
    ['/handbook/guide/environment', '/handbook/guide/environment.md']
  ],
  [
    'v-435efeda',
    '/handbook/guide/quickstart.html',
    { title: '快速上手' },
    ['/handbook/guide/quickstart', '/handbook/guide/quickstart.md']
  ],
  [
    'v-1adc6c37',
    '/handbook/guide/structure.html',
    { title: '目录及约定' },
    ['/handbook/guide/structure', '/handbook/guide/structure.md']
  ],
  ['v-3706649a', '/404.html', { title: '' }, ['/404']]
];

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress
    }
  ]
);
