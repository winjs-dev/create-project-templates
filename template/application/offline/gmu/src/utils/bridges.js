/* eslint-disable */
// gmu 平台 jsapi
import { nativeJSBridgeSync } from '@winner-fed/native-bridge-methods';

// 获取状态栏高度
export function getStatusBarHeight(cb) {
  try {
    nativeJSBridgeSync({
      method: 'getStatusBarHeight',
      params: {},
      complete(res) {
        cb && cb(res.height);
      }
    });
  } catch (error) {
    console.log('getStatusBarHeight error: ', error);
  }
}

/**
 * 获取终端信息 channel_name、client_version、client_type
 */
export function nativeGetSystemInfo(cb) {
  try {
    nativeJSBridgeSync({
      method: 'getSystemInfo',
      params: {},
      complete(res) {
        cb && cb(res);
      }
    });
  } catch (error) {
    console.log('getSystemInfo error: ', error);
  }
}

/**
 * 修改状态栏
 *
 * @param {string} color 字体颜色 black｜white
 * @param {string} alpha 透明度
 * @param cb
 */
export function nativeSetStatusBarStyle(color, alpha, cb) {
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

  try {
    nativeJSBridgeSync({
      method: 'setStatusBarStyle',
      params,
      complete(res) {
        cb && cb(res);
      }
    });
  } catch (error) {
    console.log('setStatusBarStyle error: ', error);
  }
}

// 导航栏背景色 -- 沉浸到状态栏
export function nativeSetBackgroundColor(params, cb) {
  // "color":"#123456"
  console.log('nativeSetBackgroundColor', params);
  try {
    nativeJSBridgeSync({
      method: 'setBackgroundColor',
      params,
      complete(res) {
        cb && cb(res);
      }
    });
  } catch (error) {
    console.log('setBackgroundColor error: ', error);
  }
}
