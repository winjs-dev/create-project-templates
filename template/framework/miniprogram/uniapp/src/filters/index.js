/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description 定义过滤器模块
 */

import Vue from 'vue';
import { formatDate, formatMoney } from '@winner-fed/cloud-utils/dist/cloud-utils.esm';

/**
 * 格式化数字金额
 * @param val
 * @returns {*}
 */
export function formatCnMoney(val) {
  return val ? formatMoney(String(val)) : '--';
}

// register global utility filters.
const filters = {
  formatDate,
  formatCnMoney
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
