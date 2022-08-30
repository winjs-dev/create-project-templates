// 检测是否是财富中台外框架
export function checkIsHwsContainer() {
  return window.fetch && typeof window.fetch.post === 'function';
}

// 检查是否是乾坤微应用
export function checkIsQiankunMicroService() {
  return window.__POWERED_BY_QIANKUN__;
}
