import { request, showToast } from '@tarojs/taro';
import { CODE_MESSAGE } from '@/constants/status';
import autoMatchBaseUrl from './autoMatchBaseUrl';

// 检测请求状态
const checkStatusAndFilter = (response) => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    if (response.statusCode === 200 || response.statusCode === 304) {
      return response.data;
    }
    return response;
  }
  // 除此之外的错所有遍历上面的错误信息抛出异常
  const errorText = CODE_MESSAGE[response.statusCode] || response.errMsg;

  showToast({
    title: errorText,
    mask: true,
    icon: 'none',
    duration: 2000
  });

  return Promise.reject(response);
};

const safeRequest = async (url, options) => {
  const newURL =
    url.indexOf('http') !== -1 || url.indexOf('https') !== -1 ? url : autoMatchBaseUrl(url);

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      ...options,
      header: {
        'Content-Type': 'application/json',
        ...options?.header
      },
      url: newURL
    }).then(
      (response) => {
        const data = checkStatusAndFilter(response);
        resolve(data.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

/**
 * get
 * @param url
 * @param opts
 * @returns {Promise}
 */
const get = async (url, opts) => {
  return safeRequest(url, opts);
};

/**
 * post
 * @param url
 * @param opts
 * @returns {Promise}
 */
const post = async (url, opts) => {
  return safeRequest(url, {
    ...opts,
    method: 'POST'
  });
};

/**
 * put
 * @param url
 * @param opts
 * @returns {Promise}
 */
const put = async (url, opts) => {
  return safeRequest(url, {
    ...opts,
    method: 'PUT'
  });
};

export default {
  get,
  post,
  put,
  safeRequest
};
