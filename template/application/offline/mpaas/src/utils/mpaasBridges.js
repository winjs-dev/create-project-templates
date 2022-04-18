/* eslint-disable */
// mPaaS 平台 jsapi

// 是否运行在 mPaaS 容器
export function ismPaaSOS() {
  return window.navigator.userAgent.toLowerCase().indexOf('mpaasclient') !== -1;
}

/**
 * 当 H5 页面完全展示之前需要和 native 先进行交互，此用来控制时序。只有 App 调用了 ready(AlipayJSBridgeReady) 方法后，表示 App 端已经准备完毕，已注入了相关 js 对象。防止 App 还没注入 js 对象方法，H5 过早调用 App 提供的方法
 * @returns
 */
export function nativeReady(callback) {
  if (ismPaaSOS()) {
    // 如果 jsbridge 已经注入则直接调用    `
    if (window.AlipayJSBridge) {
      typeof callback === 'function' && callback();
    } else {
      // 如果没有注入则监听注入的事件
      document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
  } else {
    // 其他处理，比如兼容浏览器处理
    typeof callback === 'function' && callback();
  }
}

/**
 * 调用原生跳转功能
 * pushWindow 用于在同一个离线包内打开一个新的页面，打开时自带系统转场动画。若您需要跨 appId 打开其他离线应用页面，请使用 startApp(https://help.aliyun.com/document_detail/85079.htm?spm=a2c4g.11186623.0.0.1cd821c3M9WZGF#h2-startapp-1) 接口。
 * pushWindow 与前端 location.href 的区别，类同于 PC 浏览器的新开标签页，每个 window 都是一个新的标签页，因此原页面仅仅是被压到后台，状态始终保持，JS 也会继续运行。
 *
 * @param url 要打开的 URL。
 * @param param 打开页面的配置参数
 * @param passData（仅适用于 iOS） 用于给新开的页面传递参数，在新开的页面使用 AlipayJSBridge.startupParams 可以获取到 passData
 * @link https://help.aliyun.com/document_detail/85055.html
 */
export function nativeNavigate({ url, param, passData }) {
  if (ismPaaSOS()) {
    AlipayJSBridge.call('pushWindow', {
      // 要打开页面的 URL
      url,
      param,
      passData
    });
  } else {
    console.warn('请在APP内打开');
  }
}

/**
 * 获取用户资金账号登录信息
 * 1、如果用户资金账号未登录，不会掉起资金账号登录
 * 2、这个方法要注册在onPageAppear里使用，因为回调参数要在onPageAppear才能拿到
 * 3、返回结果示例
 * app内返回结果：
 * {
 *  info: {
 *    error_code: '0',
 *    error_message: 'success'
 *  },
 *  data: {
 *    appInfo,
 *    fundInfos:{},
 *    loginResult,
 *    userInfo
 *  }
 * }
 * 4、本函数返回结果：获取不到都会走reject
 * 4.1、成功：
 * 4.2、失败：reject();
 */
export function getAccountInfoFromApp() {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'winner_account.getFundAccountInfo',
      {
        type: 'stock' // 普通登录
      },
      (res) => {
        console.log('获取用户资金账号登录信息', res);
        if (res && res.info && res.info.error_code === '0') {
          if (res.data && res.data.fundInfos && Object.keys(res.data.fundInfos).length) {
            resolve(res.data);
          } else {
            reject('获取信息为空');
          }
        } else {
          reject(res);
        }
      }
    );
  });
}

/**
 * 关闭当前webview
 */
export function closeWebview() {
  if (ismPaaSOS()) {
    AlipayJSBridge.call('popWindow');
  } else {
    window.history.back();
  }
}

/**
 * 通过 rpc 请求服务接口
 * @param url
 * @param data
 * @param header
 */
export function requestByRPC(url, { data = {}, headers = {}, method = 'get' }) {
  const requestData = [];

  if (method.toLowerCase() === 'get') {
    requestData.push(data);
  } else {
    // post
    requestData.push({
      requestData: [
        {
          _requestBody: data
        }
      ]
    });
  }
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'rpc',
      {
        operationType: url,
        requestData,
        headers
      },
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('rpc 请求失败！'));
        }
      }
    );
  });
}

/**
 * 设置 AP 数据
 * setAPDataStorage 接口用于保存一个字符串到客户端统一存储，字符串长度不得超过 200×1024。
 * @param key 自定义数据的 key
 * @param value 需要存储的值，仅支持字符串类型。JSON 数据需要先字符串化。
 * @returns {Promise<boolean>}
 * @link https://help.aliyun.com/document_detail/85104.html
 */
export function setStorage({ key, value }) {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'setAPDataStorage',
      {
        key,
        value
      },
      (result) => {
        if (result?.success) {
          resolve(result);
        } else {
          reject(new Error('setAPDataStorage 执行失败！'));
        }
      }
    );
  });
}

/**
 * 获取 AP 数据
 * @param key 自定义数据的 key
 * @returns {Promise<string}>}
 * @link https://help.aliyun.com/document_detail/85105.html
 */
export function getStorage({ key }) {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'getAPDataStorage',
      {
        key
      },
      (result) => {
        if (result?.success) {
          resolve(result?.data);
        } else {
          reject(new Error('getAPDataStorage 执行失败！'));
        }
      }
    );
  });
}

/**
 * 移除 AP 数据
 * 此接口用于从统一存储中删除数据。
 * @param key 自定义数据的 key
 * @returns {Promise<boolean}>}
 * @link https://help.aliyun.com/document_detail/85106.html
 */
export function clearStorage({ key }) {
  return new Promise((resolve, reject) => {
    AlipayJSBridge.call(
      'removeAPDataStorage',
      {
        key
      },
      (result) => {
        if (result?.success) {
          resolve(result);
        } else {
          reject(new Error('removeAPDataStorage 执行失败！'));
        }
      }
    );
  });
}

/**
 * 页面已恢复至前台
 * @param callback
 */
export function onPageAppear(callback) {
  document.addEventListener('resume', () => {
    console.log('页面已恢复至前台');
    typeof callback === 'function' && callback();
  });
}

/**
 * 页面已压至后台
 * @param callback
 */
export function onPageDisappear(callback) {
  document.addEventListener('pause', () => {
    console.log('页面已压至后台');
    typeof callback === 'function' && callback();
  });
}

/**
 * 上报埋点
 * 如果您需要添加自定义埋点参数，可以通过 key:"value" 的格式添加至上述代码的 param4 中，例如：key1:"value1"。
 * 添加多个自定义埋点参数时，在 param4 中添加的内容格式如下：param4: "key1:"value1",key2:"value2",key3:"value3"。
 * @param type 埋点类型
 * monitor：监控类型。
 * monitorWithLocation：监控类型，自动在 param4 里带上经纬度。
 * behavior：行为类型。
 * behaviorAuto：自动行为类型。
 * performance：性能类型。
 * error：异常类型，9.6.8 版本开始支持。
 * 135：135 业务相关，9.9 版本开始支持。
 *
 * @param bizType  业务类型
 * @param logLevel 1 - high, 2 - medium, 3 - low
 * @param seedId  埋点唯一标识
 * @param param1
 * @param param2
 * @param param3
 * @param param4
 * @link https://help.aliyun.com/document_detail/85103.html
 */
export function buriedReport({
  type = 'monitor',
  bizType,
  logLevel,
  seedId,
  param1 = '',
  param2 = '',
  param3 = '',
  param4 = ''
}) {
  AlipayJSBridge.call('remoteLog', {
    type,
    bizType,
    logLevel: 1,
    // 埋点类型，固定为 "event"
    actionId: 'event',
    seedId,
    param1,
    param2,
    param3,
    param4: { key1: 'value1', key2: 'value2' } // 自定义参数
  });
}
