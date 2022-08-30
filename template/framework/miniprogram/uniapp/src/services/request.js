import axios from 'axios';
import qs from 'qs';
import { combineURLs } from '@winner-fed/cloud-utils/dist/cloud-utils.esm';
import autoMatchBaseUrl from './autoMatchBaseUrl';

export const requestInstance = axios.create({});

// adapter 允许自定义处理请求，使用 uni.request 适配小程序端
// 返回一个 promise 并应用一个有效的响应
requestInstance.defaults.adapter = (config) => {
  return new Promise((resolve, reject) => {
    // settle：根据 HTTP 响应状态，改变 Promise 的状态，引入省去自己处理
    const settle = require('axios/lib/core/settle');
    // buildURL：在 get 请求时，会使用这个把请求的数据以指定序列化方式拼接到 URL 上
    const buildURL = require('axios/lib/helpers/buildURL');

    uni.request({
      method: config.method.toUpperCase(),
      url: combineURLs(
        config.baseURL,
        buildURL(config.url, config.params, config.paramsSerializer)
      ),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType, // 支付宝小程序不支持
      withCredentials: config.withCredentials, // 仅 H5 支持
      complete: (response) => {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        settle(resolve, reject, response);
      }
    });
  });
};

// request 拦截器，在请求之前做一些处理
requestInstance.interceptors.request.use(
  // 请求的一些配置信息
  (config) => {
    console.log('请求拦截成功');
    // 检查 responseType 是否合法
    if (!['text', 'arraybuffer'].includes(config.responseType)) {
      return Promise.reject(
        `设置的响应类型 responseType:${config.responseType} 不合法，合法值：text、arraybuffer`
      );
    }

    // 支付宝、快手、京东小程序不支持 POST、GET 以外的请求方式
    // #ifdef MP-ALIPAY || MP-KUAISHOU || MP-JD
    if (!['POST', 'GET'].includes(config.method.toUpperCase())) {
      return Promise.reject(`请求方式 method:${config.method} 不合法，合法值：POST、GET`);
    }
    // #endif
    return config;
  },
  // 请求错误时的处理
  (error) => {
    console.log('请求拦截到错误: ', error);
    return Promise.reject(error);
  }
);

// 配置 response 拦截器，对返回的数据进行处理
requestInstance.interceptors.response.use(
  // 对响应成功进行统一处理
  (response) => {
    console.log('响应成功: ', response);
    return checkStatus(response);
  },
  // 对响应错误进行统一处理
  (error) => {
    console.log('响应失败: ', error);
    return Promise.reject(checkStatus(error));
  }
);

// 检查响应状态，做相应处理
function checkStatus(response) {
  if (response) {
    const status = response.status || -1000;
    let errorInfo = '';
    let responseData = {};
    switch (status) {
      case 200:
      case 201:
      case 304:
      case 400:
        responseData = response.data;
        break;
      case -1:
        errorInfo = '远程服务响应失败，请稍后重试';
        break;
      case 401:
        errorInfo = '401：访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403：拒绝访问';
        break;
      case 404:
        errorInfo = '404：资源不存在';
        break;
      case 405:
        errorInfo = '405：请求方法未允许';
        break;
      case 408:
        errorInfo = '408：请求超时';
        break;
      case 500:
        errorInfo = '500：访问服务失败';
        break;
      case 501:
        errorInfo = '501：未实现';
        break;
      case 502:
        errorInfo = '502：无效网关';
        break;
      case 503:
        errorInfo = '503：服务不可用';
        break;
      default:
        errorInfo = `连接错误${status}`;
        break;
    }
    return {
      status,
      msg: errorInfo,
      ...responseData
    };
  }
  return {
    status: -404,
    msg: '网络异常'
  };
}

/**
 * 基于 axios uni.request 请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @param responseType
 * @param extraUrl
 * @returns {Promise.<T>}
 * @private
 */
export default function request(
  url,
  {
    method = 'post',
    timeout = 60000,
    prefix = getApp().globalData.SERVER.PREFIX,
    data = {},
    headers = {},
    dataType = 'json',
    responseType = 'text',
    extraUrl = ''
  }
) {
  // 获取基础 url
  let baseURL = autoMatchBaseUrl(prefix);

  // 拼接 url
  url = combineURLs(url, extraUrl);

  // 合并完整的 headers
  headers = Object.assign(
    {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    headers
  );

  // 设置默认配置
  let defaultConfig = {
    baseURL,
    url,
    method,
    timeout,
    headers,
    responseType,
    dataType
  };

  // 根据请求方式选择上送的参数，如果没有这个 get 请求会没有拼接参数，post 请求会不上送参数
  if (method.toUpperCase() === 'GET') {
    defaultConfig.params = data;
  } else {
    defaultConfig.data = data;
  }

  // 根据 Content-Type 处理上送数据
  const contentType = headers['Content-Type'] || '';
  if (~contentType.indexOf('application/x-www-form-urlencoded')) {
    defaultConfig.data = qs.stringify(data);
  }

  // #ifdef H5
  // 跨域时是否携带凭证，仅支持 H5
  defaultConfig.withCredentials = true;
  // #endif

  return requestInstance(defaultConfig);
}
