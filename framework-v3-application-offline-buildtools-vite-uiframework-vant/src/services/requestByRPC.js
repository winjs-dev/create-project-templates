// @ts-nocheck
/**
 * 站内请求
 * 即在 APP 内发送请求
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2022/5/6 下午16:43
 */
import { requestByRPC } from '@winner-fed/mpaas-jsapi';

/**
 * 基于 mpaas 的 rpc 请求
 * 这里可以统一做接口拦截的处理
 * 比如 请求前 requestParams 的处理，
 * 接收到响应后针对 response 的数据处理
 *
 * @param url
 * @param method
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @returns {Promise.<T>}
 */
export function request(url, { method, prefix = '', data = {}, headers = {} }) {
  // 举个例子
  // mpass 移动网关格式示例
  // fq/recommend/getRecommendExt => com.hundsun.hspf.fq.recommend.getRecommendExt
  const formatUrl = `com.hundsun.hspf.${url.replaceAll('/', '.')}`;

  return new Promise((resolve, reject) => {
    const defaultConfig = {
      formatUrl,
      method,
      data,
      headers,
      callback(res) {
        resolve(res);
      }
    };

    try {
      requestByRPC(defaultConfig);
    } catch (err) {
      reject(err);
    }
  });
}
