/** 获取`cookie`中的`token` */
import { getCookie } from './cookie';
export function getToken() {
  return getCookie('token');
}