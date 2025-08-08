export default defineAppConfig({
  pages: ['pages/index/index', 'pages/detail/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'HolaTemplate',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/detail/index',
        text: '详细'
      }
    ]
  }
});
