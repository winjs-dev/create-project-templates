import 'amfe-flexible';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
import setupGlobalComponent from '@/components/global';
import { setApp } from './useApp';
import setupVendor from './vendor/vant';
import { ismPaaSOS, nativeReady } from '@winner-fed/mpaas-jsapi';
import './assets/style/app.less';

async function bootstrap() {
  const app = createApp(App);

  setupGlobalComponent(app);
  setGlobalProperties(app);
  setupVendor(app);
  setupRouter(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
  if (ismPaaSOS()) {
    nativeReady(() => {
      app.mount('#frameworkV3ApplicationOfflineBuildtoolsViteUiframeworkVanttfrw8szmvk');
    ));
  } else {
    app.mount('#frameworkV3ApplicationOfflineBuildtoolsViteUiframeworkVanttfrw8szmvk', true);
  }

  setApp(app);
}

bootstrap();

