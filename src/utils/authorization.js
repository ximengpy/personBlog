/** 获取`cookie`中的`token` */
import { getCookie } from './cookie';
export function getToken() {
  return getCookie('token');
}


/**
 * 检测是否登陆
 * @param {string | () => void} action 已登录时，执行的操作：`string`类型时就执行跳转，`function`类型就执行对应的函数
 * @param {object} option 配置项
 * @param {'_blank'|'_self'|'_parent'|'_top'} option.target 第一个参数为`string`时可设置标签属性，实际作用为`<a target="xxx"></a>`中的`target`
 * @param {() => void} option.cancel 未登录时，点击取消登录的回调
 */
 export function checkLogin(action = '', option = {}) {
  const isLogin = !!getToken();
  if (!isLogin) {
    MessageBox.confirm('此操作需要登录, 是否继续?', '提示', {
      confirmButtonText: '登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      // openLink(`${config.doctorCloud}/login?backUrl=${encodeURIComponent(location.href)}`, '_self');
      $nuxt.$router.push({
        path: '/login',
        query: $nuxt.$route.query
      });
    }).catch(() => {
      if (option.cancel && checkType(option.cancel) === 'function') {
        option.cancel();
      }
    });
  } else {
    const type = checkType(action);
    // 是连接就跳转
    if (action && type === 'string') {
      openLink(action, option.target || '_blank');
    }
    // 是函数就执行
    if (type === 'function') {
      action();
    }
  }
  return isLogin;
}