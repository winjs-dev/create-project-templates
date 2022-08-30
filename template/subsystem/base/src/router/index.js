import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';

const router = new Router({ mode: 'hash', routes });

Vue.use(Router);

export default router;
