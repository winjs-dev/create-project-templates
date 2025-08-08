//配置文件的定义
module.exports = {
  res: {
    logo: '/native/res/icon.png',
    launch: '/native/res/launch.png'
  },
  menuBar: {
    menus: [
      {
        view: 'index'
      }
    ]
  },
  navBar: {
    backgroundColor: '#de302f',
    titleColor: '#ffffff',
    buttonColor: '#ffffff'
  },
  views: {
    index: {
      url: 'index.html'
    }
  },
  plugins: {
    permission: {
      config: {}
    },
    miniapp: {}
  }
};
