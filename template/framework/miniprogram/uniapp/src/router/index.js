/*
 * name：路由跳转时的简称，可以使用这个直接跳转页面，省去长的路由
 * path：要跳转的路由
 * type：路由跳转方式，默认navigateTo，
 *  只能是以下的值["navigateTo", "switchTab", "reLaunch", "redirectTo"]
 */
const routes = [
  {
    name: 'index',
    path: 'pages/index/index',
    type: 'navigateTo'
  },
  {
    name: 'test',
    path: 'pages/test/test'
  }
];

export default routes;
