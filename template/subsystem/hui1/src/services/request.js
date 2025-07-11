// @ts-nocheck
/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2021/12/24 上午10:43
 * @description https://github.com/axios/axios
 */

import Qs from 'qs';
import axios from 'axios';
import Cookies from 'js-cookie';
import { checkIsHwsContainer } from '@/utils';
import autoMatchBaseUrl from './autoMatchBaseUrl';
import { TIMEOUT } from '@/constant';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 判断接口为401状态踢出，重新登录
function kickOut(key) {
  if (!Cookies.get('user_token')) return;
  const params = { key: key };
  if (Cookies.get('user_token')) {
    Cookies.remove('user_token');
  }
  if (Cookies.get('operator_code')) {
    Cookies.remove('operator_code');
  }
  return window.fetch.post('/kickout', params);
}

function responseLog(response) {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`;
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    );
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求参数：', Qs.parse(response.config.data));
    console.log('| 返回数据：', response.data);
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    );
  } else {
    console.log('| 请求地址：', response.config.url);
    console.log('| 请求参数：', Qs.parse(response.config.data));
    console.log('| 返回数据：', response.data);
  }
}

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    }
    return {
      status,
      msg: codeMessage[status] || statusText
    };
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

/**
 * 全局请求扩展配置
 * 添加一个请求拦截器 （于transformRequest之前处理）
 */
const axiosRequest = {
  success: (config) => {
    // 以下代码，鉴权token,可根据具体业务增删。
    // demo示例:
    if (config['url'].indexOf('operatorQry') !== -1) {
      config.headers['accessToken'] =
        'de4738c67e1bb450be71b660f0716aa4675860cec1ff9bc23d800efb40519cf3';
    }
    return config;
  },
  error: (error) => Promise.reject(error)
};

/**
 * 全局请求响应处理
 * 添加一个返回拦截器 （于transformResponse之后处理）
 * 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
 */
const axiosResponse = {
  success: (response) => {
    responseLog(response);
    return checkStatus(response);
  },
  error: (error) => {
    const { response, code } = error;

    // 针对 401 统一用财富中台外框架做处理
    if (checkIsHwsContainer()) {
      if (response.status === 401) {
        const tmpKey = Cookies.get('user_token') + '#' + Cookies.get('operator_code');
        kickOut(tmpKey);
        return;
      }
    }

    // 接口请求异常统一处理
    if (code === 'ECONNABORTED') {
      // Timeout error
      console.log('Timeout error', code);
    }
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 对返回的错误进行一些处理
      return Promise.reject(checkStatus(response));
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.log('断网了~');
    }
  }
};

axios.interceptors.request.use(axiosRequest.success, axiosRequest.error);
axios.interceptors.response.use(axiosResponse.success, axiosResponse.error);

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default function request(
  url,
  { method = 'post', timeout = TIMEOUT, prefix = '', data = {}, headers = {}, dataType = 'json' }
) {
  const baseURL = autoMatchBaseUrl(prefix);

  const formatHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...headers
  };

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data,
    timeout,
    headers: formatHeaders,
    responseType: dataType,
    // 这里将 response.data 为 string 做了 JSON.parse 的转换处理
    transformResponse: axios.defaults.transformResponse.concat(function (data) {
      let copyData = data;
      if (typeof data === 'string' && data.length) {
        try {
          copyData = JSON.parse(data);
        } catch (e) {
          console.error(e);
        }
      }
      return copyData;
    })
  };

  if (method === 'get') {
    defaultConfig.data = {};
  } else {
    defaultConfig.params = {};

    const contentType = formatHeaders['Content-Type'];

    if (typeof contentType !== 'undefined') {
      if (contentType.indexOf('multipart') !== -1) {
        // 类型 `multipart/form-data;`
        defaultConfig.data = data;
      } else if (contentType.indexOf('json') !== -1) {
        // 类型 `application/json`
        // 服务器收到的raw body(原始数据) '{name:'jhon',sex:'man'}'（普通字符串）
        defaultConfig.data = JSON.stringify(data);
      } else {
        // 类型 `application/x-www-form-urlencoded`
        // 服务器收到的raw body(原始数据) name=homeway&key=nokey
        defaultConfig.data = Qs.stringify(data);
      }
    }
  }

  return axios(defaultConfig);
}

// 上传文件封装
export const uploadFile = (url, formData) => {
  return request(url, {
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
