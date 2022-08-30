/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description 定义过滤器模块
 */

import Vue from 'vue';
import { filters } from './filters';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
