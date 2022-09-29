import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
import './icons';
import setupGlobalComponent from '@/components/global';
import { setApp } from './useApp';
import setupVendor from './vendor/element';
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
  app.mount('#frameworkV3ApplicationPcBuildtoolsBundleUiframeworkElementUi1fsjlm8tjmr', true);

  setApp(app);
}

bootstrap();

