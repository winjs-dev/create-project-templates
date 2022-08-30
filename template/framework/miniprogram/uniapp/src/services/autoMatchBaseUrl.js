/**
 * @description: 根据上传前缀，自动匹配基础的 url
 * @param {*} prefix 前缀
 * @return {*}
 */
export default function autoMatchBaseUrl(prefix) {
  let baseUrl = '';
  switch (prefix) {
    default:
      baseUrl = getApp().globalData.SERVER.API_HOME;
      break;
  }
  return baseUrl;
}
