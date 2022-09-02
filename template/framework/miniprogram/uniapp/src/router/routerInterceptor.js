import routes from './index';
import MinRouter from './router';
import Vue from 'vue';
import { debounce } from 'lodash-es';

// 实例化 MinRouter
const routerInterceptor = new MinRouter({
  routes
});

// 自定义插件，给 Vue 添加全局功能
const MyPlugin = function () {};
MyPlugin.install = function (Vue, options) {
  // 添加 Vue 属性 $routes 此属性为路由配置信息
  Vue.prototype.$minRoutes = options._router;
  // 添加 Vue 实例方法 $go 此方法为跳转页面统一方法
  Vue.prototype.$go = debounce(options.go, 100);
  // 添加 Vue 实例方法 $getQueryData 此方法为获取跳转页面时传递的数据
  Vue.prototype.$getQueryData = options.getQueryData;
  // 添加 Vue 实例方法 $back 此方法为页面返回的统一方法
  //  添加防抖的目的是解决同一个页面中，先调一次$back，然后在onUnload生命周期又调一次出现重复返回导致返回错乱
  Vue.prototype.$back = debounce(options.back, 100);
  // 添加 Vue 实例方法 $getBackData 此方法为获取页面返回时传递的数据
  Vue.prototype.$getBackData = options.getBackData;
  // 添加 Vue 实例方法 $getBackData 此方法为获取页面返回时传递的数据
  Vue.prototype.$showMessage = options.showMessage;
};

Vue.use(MyPlugin, routerInterceptor);

export default routerInterceptor;
