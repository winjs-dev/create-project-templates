import ES6Promise from 'es6-promise';
import Vue from 'vue';
import App from './App';
import './services';
import './filters';
import './router/routerInterceptor';
import store from './store';

ES6Promise.polyfill();

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
