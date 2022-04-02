import request  from '../utils/request';

// 登录
export function login(options) {
  return request('POST', '/login', options, {showTip: true})
}

//获取验证码
export function getRegisterVcode(options) {
  return request('POST', '/register/vcode', options, {showTip: true})
}
//注册
export function postRegister(options) {
  return request('POST', '/register', options, {showTip: true})
}

export function loginOut() {
  return request('POST', '/login/logout', {}, {showTip: true})
}