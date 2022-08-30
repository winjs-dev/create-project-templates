import { isObject, isString, isNumber } from '@/utils/common';

class MinRouter {
  constructor(options = {}) {
    this._router = options.routes;
  }

  go(options) {
    let name = '';
    let path = '';
    let type = '';
    let query = {};
    let hasRoute = false;
    switch (true) {
      case isObject(options):
        ({ name, query = {}, type } = options);
        break;
      case isString(options):
        name = options;
        break;
      default:
        this.$showMessage();
        throw new Error('参数必须是对象或者字符串');
    }
    for (let i = 0, len = this.$minRoutes.length - 1; i <= len; i++) {
      if (this.$minRoutes[i].name === name) {
        ({ path } = this.$minRoutes[i]);
        type = type || this.$minRoutes[i].type || 'navigateTo';
        hasRoute = true;
        break;
      }
    }
    if (!hasRoute) {
      this.$showMessage();
      throw new Error(`没有 ${name} 页面'`);
    }
    if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
      this.$showMessage();
      throw new Error(
        `路由 ${name} 配置里面的type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`
      );
    }
    return new Promise((resolve, reject) => {
      uni[type]({
        url: `/${path}`,
        success: () => {
          getApp().globalData.query = query;
          resolve();
        },
        fail: (err = {}) => {
          this.$showMessage();
          throw new Error(JSON.stringify(err));
          reject();
        }
      });
    });
  }

  getQueryData() {
    let query = getApp().globalData.query || {};
    getApp().globalData.query = {};
    return query;
  }

  back(options) {
    let delta = 1;
    let backData = '';
    let button = 0;
    switch (true) {
      case isObject(options):
        ({ delta = 1, backData = '', button = 0 } = options);
        break;
      case isNumber(options):
        delta = options;
        break;
      case isDefault(options):
        break;
      default:
        this.$showToast();
        throw new Error('参数不传或者类型必须是 Object 或者 Number');
    }
    let readllyDelta = button ? delta : delta - 1;
    getApp().globalData.backData = backData;
    readllyDelta > 0 &&
      uni.navigateBack({
        delta: readllyDelta
      });
  }

  getBackData() {
    let backData = getApp().globalData.backData || '';
    getApp().globalData.backData = '';
    return backData;
  }

  showMessage(title = '敬请期待', duration = 2000) {
    uni.showToast({
      title,
      duration,
      icon: 'none'
    });
  }
}

export default MinRouter;
