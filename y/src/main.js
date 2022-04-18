import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'amfe-flexible';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import './components/global';
import './icons';
import './filters';
import './services';
import './vendor/wui';
import './plugins/composition.js';
import { isLightOS, nativeReady } from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
import './assets/style/app.less';

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

const initVue = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App)
  });
};
if (isLightOS()) {
  nativeReady().then(() => {
    initVue();
  });
} else {
  initVue();
}
