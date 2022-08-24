import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';
import { checkIsQiankunMicroService } from '@/utils';
const pkg = require('../../package.json');

const router = new Router({
  base: checkIsQiankunMicroService() ? `/${pkg.name}` : '/',
  mode: 'hash',
  routes
});

Vue.use(Router);

export default router;
