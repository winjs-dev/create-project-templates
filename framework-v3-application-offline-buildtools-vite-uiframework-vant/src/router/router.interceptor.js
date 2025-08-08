import router from './index';
import { ismPaaSOS, nativeNavigate } from '@winner-fed/mpaas-jsapi';  

const params = {};

router.beforeEach((to, from, next) => {
  if (from.name && ismPaaSOS()) {
   nativeNavigate({ url: `${window.location.href.split('#')[0]}#${to.fullPath}`, params });
  } else {
    next();
  }
});
