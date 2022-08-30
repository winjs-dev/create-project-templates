import Vue from 'vue';
import FUNS from './services';

// 将services挂载到vue的原型上
// views引用的方法：this.$services.接口名（小驼峰）
// 防止被篡改
Object.defineProperty(Vue.prototype, '$services', {
  get() {
    return FUNS;
  }
});

export default FUNS;
