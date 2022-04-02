// 类型提示用（运行时不会引用）
import axios from 'axios';
import {ElMessage} from 'element-plus';
import config from './config';
import { getToken } from './authorization';
// import { restUserLoginInfo } from '@/api/login';
import { checkType } from './index';
import Global from '../store/Global'

const service = axios.create({
  baseURL: config.apiUrl,
  timeout: config.requestOvertime
})

const postMode = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 请求拦截处理
service.interceptors.request.use(async options => {
  // 判断一下是`json`或者是表单传参
  // 因为当前`java`后台用的框架是比较老的`spring boot`，有很多接口传参都是以前`jsp`搬过来用的，所以才会有表单`post`这种操作
  // if (options.method.toUpperCase() === 'POST') {
  //   const key = options.headers['codeMode'];
  //   if (key && postMode[key]) {
  //     options.headers['Content-Type'] = postMode[key];
  //   }
  // }
  // 设置请求`token`
  const token = getToken() || '';
  
  if (token) {
    options.headers['Authorization'] =token;
  } else {
    /** 拦截必须要设置token标识接口路径列表 */
    // const proxyList = [
    //   '/auth/token/currentUser',
    // ]
    // // console.log('options >>', options);
    // if (proxyList.includes(options.url)) {
    //   options.headers['Authorization'] = 'Bearer ';
    // }
  }

  // 没有在接口设置到`token`时，添加`token`
  // if (!options.headers['Authorization']) {
  //   options.headers['Authorization'] = 'Bearer ' + token;
  // }
  return options;
}, error => {
  return Promise.reject(error)
})

/**
 * 响应提示
 * @param {number} status 状态码
 * @param {{ msg: string, code: number }} info 
 * @param {boolean|string} showTip 
 */
function responseTip(status, info, showTip) {
  switch (status) {
    case 404:
      ElMessage.error(`接口不存在`);
      break;
  
    case 401:
      ElMessage.error(`登陆已过期，请重新登陆`);
      break;

    case 400:
      ElMessage.error(`请求的参数有误`);
      break;

    case 301:
    case 302:
      ElMessage.info(`请求已被重定向`);
      break;

    case 200:
      if (info.code !== 0) {
        ElMessage.warning(info.msg || "操作失败")
      }
      if(info.code === 5) {
        //未登录
        Global.resetUser()
      }
      break;
  }

  if (status >= 500) {
    ElMessage.error(`服务器出错了`);
  }
}

// 响应拦截器异常处理
service.interceptors.response.use(res => {
  // console.log('response >>', res);
  let result = res.data;
  // 特殊处理一下数据流
  if (res.config.responseType === 'blob') {
    result = {
      code: 1,
      data: res.data
    }
  }
  responseTip(res.status, result, res.config.showTip);
  return result;
}, error => {
  const tip = `${error}`;
  const sign = 'Request failed with status code';
  if (tip.includes(sign)) {
    const tips = tip.split(sign);
    responseTip(parseInt(tips[1]), { code: -1 });
  } else if (tip.includes('timeout')) {
    ElMessage.warning(`网络响应超时了`);
  } else if (tip.includes('Network Error')) {
    ElMessage.warning(`网络出错了`);
  } else {
    ElMessage.warning(`${error}`);
    console.warn('--------------------------------');
    console.warn('响应拦截器异常处理 >>', error);
    console.warn('--------------------------------');
  }
  // 这样其他地方调用时，就一定会有返回值，就不用写多一个`catch`来捕获失败状态了
  return {
    code: -1,
    msg: `${error}`,
    data: {}
  }
  // return Promise.reject(error)
})

/**
 * 基础接口请求
 * @param {'GET' | 'POST' | 'DELETE' | 'PUT'} method 请求方法
 * @param {string} path 请求路径
 * @param {object} data 请求数据
 * @param {object} options `axios`请求配置，优先级最高
 * @param {{codeMode: 'json'|'form'} & {[k: string]: string}} options.headers 请求头配置，会覆盖默认设置
 * - 默认`headers: { 'codeMode': 'json' }`;
 * - 需要表单形式就`headers: { 'codeMode': 'form' }`;
 * - 两者都不要就`headers: { 'codeMode': '' }`;
 * - 其他头部设置自行定义
 * @param {'json'|'text'|''|null} options.dataType 请求数据类型
 * @param {'json'|'arraybuffer'|'blob'|'stream'|'document'|'text'} options.responseType 接口数据响应类型
 * @param {boolean|string} options.showTip 是否在`res.code !== 1`的时候显示提示，默认`false`，传入`true`则用`res.msg`作为提示，也可以传入字符串作为提示内容
 * @returns {Promise<ApiResult>}
 */
export default function request(method, path, data = {}, options = {}) {
  // 默认设置`json`传参
  const header = (!options || !options.headers) ? {
    'codeMode': 'json',
  } : {};
  return service({
    method: method,
    url: path,
    params: method === 'GET' ? data : {},
    data: method !== 'GET' ? data : {},
    // dataType: 'json', 默认就是，可写可不写，根据情况定
    headers: header,
    ...options,
  })
}
