
import Cookies from 'js-cookie';

/**
 * 获取`cookie`
 * @param {string} key 目标对象`key`值
 * @param {CookieAttributes} params 参数
 * @returns {string}
 */
export function getCookie(key, params) {
  if (params) {
    return Cookies.get(key, params);
  } else {
    return Cookies.get(key);
  }
}

/**
* 设置`cookie`
* @param {string} key 目标对象`key`值
* @param {string} value 对应键值
* @param {CookieAttributes} options 配置项
*/
export function setCookie(key, value, options) {
  if (options) {
    Cookies.set(key, value, options);
  } else {
    Cookies.set(key, value);
  }
}

/**
* 移除指定`cookie`
* @param {string} key 目标对象`key`值
* @param {CookieAttributes} options 
*/
export function removeCookie(key, options) {
  if (options) {
    Cookies.remove(key, options);
  } else {
    Cookies.remove(key);
  }
}

/**
 * 获取到期时间
 * @param {string} name `localStorage`缓存字段
 */
export function getExpireTime(name) {
  return localStorage.getItem(name);
}

/**
 * 设置到期时间
 * @param {string} name `localStorage`缓存字段
 * @param {number} value 时间（应该是秒）
 */
export function setExpireTime(name, value) {
  const current = value * 1000 + Date.now();
  return localStorage.setItem(name, current);
}

/**
 * 移除到期时间
 * @param {string} name `localStorage`缓存字段
 */
export function removeExpireTime(name) {
  return localStorage.removeItem(name);
}