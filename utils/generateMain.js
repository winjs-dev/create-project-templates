import ejs from 'ejs';

const mainV2 = `<%_ if (needsQiankunMicroFrontend) { _%>import './publicPath';
import { checkIsQiankunMicroService } from '@/utils';
<%_ } _%>
<%_ if (buildTools === 'bundle') { _%>
import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ } _%>
<%_ if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import Vue from 'vue';
<%_ if (needsTypeScript) { _%>
import Component from 'vue-class-component';
<%_ } _%>
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import './components/global';
<%_ if (buildTools === 'bundle') { _%>
import './icons';
<%_ } _%>
import './filters';
import './services';
<%_ if (uiFramework === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import './vendor/ant';
<%_ } else if (uiFramework === 'hui') { _%>
import './vendor/hui';
<%_ } else if (uiFramework === 'vant') { _%>
import './vendor/vant';
<%_ } else if (uiFramework === 'wui') { _%>
import './vendor/wui';
<%_ } _%>
import './plugins/composition.js';
<%_ if (buildTools === 'bundleless') { _%>
import 'virtual:svg-icons-register';
<%_ } _%>
<%_ if (application === 'offline') { _%>
<%_ if (mobileDevPlatform === 'gmu') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
<%_ } else { _%>
import { ismPaaSOS, nativeReady } from '@winner-fed/mpaas-jsapi';
<%_ } _%>
<%_ } _%>
import './assets/style/app.less';
<%_ if (needsTypeScript) { _%>
// 注册钩子函数
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);
<%_ } _%>

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

<%_ if (!needsQiankunMicroFrontend) { _%>
<%_ if (application === 'offline') { _%>
const initVue = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App)
  });
};

<%_ if (mobileDevPlatform === 'gmu') { _%>
if (isLightOS()) {
  nativeReady().then(() => {
    initVue();
  });
<%_ } else { _%>
if (ismPaaSOS()) {
  nativeReady(initVue);
<%_ } _%> 
} else {
  initVue();
}
<%_ } else { _%>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // use Runtime-only
  // https://vuejs.org/v2/guide/installation.html
  render: (h) => h(App)
});
<%_ } _%>
<%_ } else { _%>
let instance = null;

/* eslint-disable no-new */
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App)
  }).$mount(container ? container.querySelector(\`#app\`) : '#app');
}

if (!checkIsQiankunMicroService()) {
  render();
}

//  qiankun 导出相关生命周期函数
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
<%_ } _%>
`;

const mainV3 = `<%_ if (buildTools === 'bundle') { _%>import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ } _%>
import 'vue-global-api';
<%_ if ((application === 'mobile' || application === 'offline') && layoutAdapter !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
<%_ if (buildTools === 'bundle') { _%>
import './icons';
<%_ } _%>
import setupGlobalComponent from '@/components/global';
import { setApp } from './useApp';
<%_ if (uiFramework === 'element-ui') { _%>
import setupVendor from './vendor/element';
<%_ } else if (uiFramework === 'ant') { _%>
import setupVendor from './vendor/ant';
<%_ } else if (uiFramework === 'vant') { _%>
import setupVendor from './vendor/vant';
<%_ } else if (uiFramework === 'wui') { _%>
import setupVendor from './vendor/wui';
<%_ } _%>
<%_ if (buildTools === 'bundleless') { _%>
import 'virtual:svg-icons-register';
<%_ } _%>
<%_ if (application === 'offline') { _%>
<%_ if (mobileDevPlatform === 'gmu') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
<%_ } else { _%>
import { ismPaaSOS, nativeReady } from '@winner-fed/mpaas-jsapi';
<%_ } _%>
<%_ } _%>
import './assets/style/app.less';

async function bootstrap() {
  const app = createApp(App);

  setupGlobalComponent(app);
  setGlobalProperties(app);
<%_ if (uiFramework === 'element-ui' || uiFramework === 'ant' || uiFramework === 'vant' || uiFramework === 'wui') { _%>
  setupVendor(app);
<%_ } _%>
  setupRouter(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
<%_ if (application === 'offline') { _%>
<%_ if (mobileDevPlatform === 'gmu') { _%>
  if (isLightOS()) {
    nativeReady().then(() => {
      app.mount('#app');
    });
<%_ } else { _%>
  if (ismPaaSOS()) {
    nativeReady(() => {
      app.mount('#app');
    ));
<%_ } _%>
  } else {
    app.mount('#app', true);
  }
<%_ } else { _%>
  app.mount('#app', true);
<%_ } _%>

  setApp(app);
}

bootstrap();

`;

export function generateMain({
  application,
  uiFramework,
  layoutAdapter,
  needsTypeScript,
  buildTools,
  mobileDevPlatform,
  needsQiankunMicroFrontend
}) {
  return ejs.render(mainV2, {
    application,
    layoutAdapter,
    uiFramework,
    needsTypeScript,
    buildTools,
    mobileDevPlatform,
    needsQiankunMicroFrontend
  });
}

export function generateMainV3({
  application,
  uiFramework,
  layoutAdapter,
  needsTypeScript,
  buildTools,
  mobileDevPlatform
}) {
  return ejs.render(mainV3, {
    application,
    layoutAdapter,
    uiFramework,
    needsTypeScript,
    buildTools,
    mobileDevPlatform
  });
}
