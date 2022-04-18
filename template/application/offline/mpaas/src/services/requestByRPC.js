// @ts-nocheck
/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2022/4/13 上午10:43
 */

import { DEFAULT_PREFIX } from '@/constant';
import { requestByRPC } from '@/utils/mpaasBridges';

/**
 * 基于 mpaas 的 rpc 请求
 * 这里统一做接口拦截的处理
 * 比如 请求前 requestParams 的处理，
 * 接收到响应后针对 response 的数据处理
 * @param url
 * @param method
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @returns {Promise.<T>}
 */
export function request(url, { method, prefix = DEFAULT_PREFIX, data = {}, headers = {} }) {
  const defaultConfig = {
    method,
    data
  };

  return requestByRPC(url, defaultConfig).then((res) => {
    return res;
  });
}
