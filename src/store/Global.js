
import { modifyData } from '@/utils/index'
import { removeCookie, setCookie, getCookie } from '../utils/cookie'
const cacheName = 'blog-user'
function userInfo() {
  return {
    user: '',
    phone: ''
  }
}
class ModulesStore {
  constructor() {
    const value = getCookie(cacheName);
    if (value) {
      modifyData(this.info, JSON.parse(value));
    }
  }
  //用户信息
  info = userInfo()

    /**
   * 更新用户信息字段
   * @param {UserInfo} value 
   */
    updateUser(value) {
      modifyData(this.info, value);
      // sessionStorage.setItem(cacheName, JSON.stringify(this.info));
      setCookie(cacheName, JSON.stringify(this.info));
    }

    /**
   * 重置用户信息，移除对应缓存
   */
  resetUser() {
    modifyData(this.info, userInfo());
    // sessionStorage.removeItem(cacheName);
    removeCookie(cacheName, { domain: config.domain })
  }
}


const Global = new ModulesStore();

export default Global;