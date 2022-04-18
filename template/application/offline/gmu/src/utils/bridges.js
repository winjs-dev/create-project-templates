/* eslint-disable */
// gmu 平台 jsapi
import lightSDK from 'light-sdk/dist/index.umd';
import { isLightOS } from '@winner-fed/native-bridge-methods';

// 获取状态栏高度
export function getStatusBarHeight() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.getStatusBarHeight({}, (res) => {
        resolve(res.data.height);
      });
    }
  });
}

/**
 * 获取终端信息 channel_name、client_version、client_type
 */
export function nativeGetSystemInfo() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.getSystemInfo({}, (res) => {
        if (res && res.info && res.info.error_code === '0') {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    } else {
      console.log('不在app内');
    }
  });
}

/**
 * 修改状态栏
 * @param {string} alpha 透明度
 * @param {string} statusBarStyle 字体颜色 black｜white
 */
export function nativeSetStatusBarStyle(color, alpha) {
  const params = {
    show: false, // 是否显示导航栏
    statusBarHidden: false, // 是否隐藏状态栏
    statusBarStyle: color, // 状态栏字体颜色
    statusBarOnly: true // ios只保留状态栏（必须）
  };
  if (String(alpha) !== 'undefined') {
    params.alpha = String(alpha); // 透明度
  }
  console.log('nativeSetStatusBarStyle', params);
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.setStatusBarStyle(params, (res) => {
        console.log(res);
      });
    } else {
      console.log('不在app内');
    }
  });
}

// 导航栏背景色 -- 沉浸到状态栏
export function nativeSetBackgroundColor(params) {
  // "color":"#123456"
  console.log('nativeSetBackgroundColor', params);
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.setBackgroundColor(params, (res) => {
        console.log(res);
      });
    } else {
      console.log('不在app内');
    }
  });
}

/**
 * 调用原生跳转功能
 * @param {string} targetId 页面id
 * @param {object} params 入参
 * @param {function} cb 回调
 */
export function nativeNavigate(event) {
  if (isLightOS()) {
    lightSDK.native.callNative('winner_route.forwardPage', { event }, () => {});
  } else {
    console.warn('请在APP内打开');
  }
}

/**
 * 唤起app手机号登录
 * 1、该方法无论用户是否登录过手机号，都会掉起手机号登录页面
 * 2、登录成功的信息，需要在onPageAppear里注册getPhoneFromApp方法，获取手机号，本方法没有回调函数
 * 3、登录测试账号：手机号任意，验证码：8888
 */
export function mobileLoginByApp() {
  nativeNavigate('winner://secUser/userLogin/userLogin');
}

/**
 * 资金账号登录
 * 1、如果手机号未登录，会先掉起手机号登录
 * 2、该方法无论用户是否登录过资金账号，都会掉起资金账号登录页面
 * 3、登录成功的信息，需要在onPageAppear里注册getAccountInfoFromApp方法获取，本方法没有回调函数
 * 4、测试账号如下：
 * 550000603， 111111
 */
export function fundAccountLoginByApp() {
  nativeNavigate('winner://secTrade/account/login');
}

/**
 * 跳转原生风险测评
 */
export function navigateRiskTest() {
  nativeNavigate('winner://secTrade/eligibility/question');
}

/**
 * 跳转银证转账
 * 1、该方法跳转银证转账之后，没有回调, 最新的可用余额，要在 onPageAppear 重新调用查询可用余额方法：getCanUseMoney 获取
 * 2、跳转银证转账如果用户手机号和资金账号未登录，会掉起登录，这里的登录场景我们先不用管
 */
export function goToTransfer() {
  nativeNavigate('winner://secTrade/bankTransfer/home');
}

/** 跳转个股详情 */
export function toStockDetails({ secuCode, secuType }) {
  nativeNavigate(`winner://secQuote/stock/stockDetail?stockCode=${secuCode}&stockType=${secuType}`);
}

/**
 * 获取用户手机号登录信息
 * 1、如果手机号没有登录，不会掉起手机号登录
 * 2、这个方法要注册在onPageAppear里使用，因为回调参数要在onPageAppear才能拿到
 * 3、返回结果示例：
 * app内返回结果：
 * {
 *  info: {
 *    error_code: '0',
 *    error_message: 'success'
 *  },
 *  data: {
 *    phone: '15263403729' // 手机号
 *  }
 * }
 * 4、本函数返回结果：(获取不到都会走reject)
 * 4.1、成功：resolve(phone);
 * 4.2、失败：reject();
 */
export function getPhoneFromApp() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.callNative('winner_account.getPhone', {}, (res) => {
        if (res && res.info && res.info.error_code === '0') {
          if (res.data && res.data.phone) {
            resolve(res.data.phone);
          } else {
            reject('获取信息为空');
          }
        } else {
          reject(res);
        }
      });
    } else {
      reject('不在储宝宝app内');
    }
  });
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
    if (isLightOS()) {
      lightSDK.native.callNative(
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
    } else {
      reject('不在app内');
    }
  });
}

/**
 * 关闭当前webview
 */
export function closeWebview() {
  if (isLightOS()) {
    lightSDK.native.close(null, () => {});
  } else {
    window.history.back();
  }
}

/**
 * 获取用户手机号登录信息
 */
export function getUserInfoFromApp() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.callNative('winner_account.getUserInfo', {}, (res) => {
        // console.log('获取user_id:', res)
        // res.data.userInfo = {
        //   user_id: '363328352980836352'
        // } // 暂时
        if (res && res.data && res.data.userInfo) {
          resolve(res.data.userInfo);
        } else {
          reject('用户未登录');
        }
      });
    } else {
      reject('不在app内');
    }
  });
}

/**
 * 页面回显方式注释
 * 是容器事件，仅在原生运行下有效，如离线包 <br>
 * 页面启动，或从后台进入前台显示时触发 <br>
 * 当A视图以打开新容器的方式打开B时，A视图如果监听了 viewAppear 事件，并且B视图关闭重新回到A视图时，此时的A视图的 viewAppear 监听代码会执行 <br>
 * 参考 https://document.lightyy.com/zh-cn/docs/develop/olight-event.html#viewappear
 * @param cb
 */
export function onPageAppear(cb) {
  if (!isLightOS()) {
    return;
  }
  typeof cb === 'function' && (window.LightJSBridge.onPageAppear = cb);
}

/**
 * 打开思迪业务办理
 * @param {string} url 业务办理地址
 * @param {Object|string} reservedFiled 保留传参字段
 */
export function jumpThinkive(url = '', reservedFiled = '') {
  if (isLightOS()) {
    lightSDK.native.callNative(
      'winner_route.startThinkivePalmHall',
      {
        params: {
          url: url,
          reservedFiled:
            typeof reservedFiled === 'object' ? JSON.stringify(reservedFiled) : reservedFiled
        }
      },
      () => {}
    );
  }
}

/**
 * 跳转app当日申请查询
 */
export function goToAppTodayEntrustList() {
  if (isLightOS()) {
    lightSDK.native.callNative(
      'winner_route.navigate',
      {
        target: {
          id: '1-21-5-7'
        },
        params: {}
      },
      (res) => {}
    );
  }
}

// 跳转基金转换
export function goToFundExchange() {
  if (isLightOS()) {
    lightSDK.native.callNative(
      'winner_route.forwardPage',
      {
        event: 'native://1-21-5-12?login_flag=2'
      },
      () => {}
    );
  }
}

// 跳转掌厅-业务办理相关功能
export function goToBusinessHanding(business) {
  if (isLightOS()) {
    lightSDK.native.callNative(
      'winner_route.forwardPage',
      {
        event: `native://1-62?trade_type=stock&login_flag=2&business=${business}`
      },
      () => {}
    );
  }
}

// 获取IFAToken
export function getIFAToken() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.callNative('winner_rxzq.getIFAToken', {}, (res) => {
        resolve(res);
      });
    }
  });
}

// 重新获取token
export function getIFATokenInvalid() {
  return new Promise((resolve, reject) => {
    if (isLightOS()) {
      lightSDK.native.callNative('winner_rxzq.IFATokenInvalid', {}, (res) => {
        resolve(res);
      });
    }
  });
}
