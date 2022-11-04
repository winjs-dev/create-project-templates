/* eslint-disable */
import { formatDate } from '@winner-fed/cloud-utils/dist/cloud-utils.esm';

// 设置url挂载参数
export const setUrlQuery = (options) => {
  let { url, query } = options;
  if (!url) return '';
  if (query) {
    let queryArr = [];
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryArr.push(`${key}=${query[key]}`);
      }
    }
    if (url.indexOf('?') !== -1) {
      url = `${url}&${queryArr.join('&')}`;
    } else {
      url = `${url}?${queryArr.join('&')}`;
    }
  }
  return url;
};

/**
 * 获取url参数数据，返回obj对象
 */
export const getUrlToJson = (url) => {
  try {
    const strUrl = url || window?.location?.href || '';
    let temp1 = strUrl.split('?');
    let [_, pram] = temp1;
    if (pram === 'undefined' || !pram) {
      return {};
    }
    let keyValue = pram.split('&');
    let obj = {};
    for (let i = 0; i < keyValue.length; i++) {
      let item = keyValue[i].split('=');
      let [key, value] = item;
      obj[key] = value;
    }
    return obj;
  } catch (error) {
    return {};
  }
};

/**
 * 通用时间格式转换，将时间戳转换自己需要的格式
 *
 * [fmt] 第二参数类型字符串，注意指定
 * 年(y)、月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) ，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * customFormatDate(时间戳, "yyyy-MM-dd hh:mm:ss.S") 转换后 2016-07-02 08:09:04.423
 */
export const customFormatDate = (UnixTime, fmt) => {
  if (!UnixTime) return '';
  const dateTime = new Date(parseInt(`${UnixTime * 1000}`));
  const o = {
    'M+': dateTime.getMonth() + 1, //月份
    'd+': dateTime.getDate(), //日
    'h+': dateTime.getHours(), //小时
    'm+': dateTime.getMinutes(), //分
    's+': dateTime.getSeconds(), //秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), //季度
    S: dateTime.getMilliseconds() //毫秒
  };
  let newDataStrin = fmt || 'yyyy-MM-dd hh:mm:ss.S';
  if (/(y+)/.test(newDataStrin)) {
    newDataStrin = newDataStrin.replace(
      RegExp.$1,
      (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(newDataStrin)) {
      newDataStrin = newDataStrin.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return newDataStrin;
};

// 保留小数
export function digitNum(num, digit) {
  if (num === '--' || num === null || num === undefined) {
    return '--';
  }
  if (num === '0') {
    return '0';
  }
  return parseFloat(num).toFixed(digit);
}

export function comValueFunc(data, noFlag) {
  if (data === '' || data === null || data === undefined) {
    return '--';
  }
  if (data !== '--') {
    let result = '';
    let num = parseInt(data).toString();
    let len = parseInt(data) >= 0 ? num.length : num.length - 1;
    let n = typeof noFlag === 'undefined' ? 2 : noFlag;
    if (len >= 12) {
      num = parseFloat(data / 1000000000000).toFixed(n);
      result = num + '万亿';
    } else if (len >= 8 && len < 12) {
      num = parseFloat(data / 100000000).toFixed(n);
      result = num + '亿';
    } else if (len >= 4 && len < 8) {
      num = parseFloat(data / 10000).toFixed(n);
      result = num + '万';
    } else {
      num = parseFloat(data).toFixed(n);
      result = num;
    }
    return result;
  } else {
    return data;
  }
}
