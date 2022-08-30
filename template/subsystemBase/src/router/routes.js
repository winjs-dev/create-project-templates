// 路由需采用平铺，不要使用嵌套路由
export const routes = [
  {
    component: () => import(/* webpackChunkName: "views/hello" */ `@/views/hello/index.vue`),
    name: 'hello',
    path: '/hello',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/',
    redirect: '/hello'
  }
];
