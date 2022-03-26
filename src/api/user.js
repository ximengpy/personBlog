import request  from '../utils/request';

// 登录
export function login(options) {
  return request('POST', '/login', options, {showTip: true})
}