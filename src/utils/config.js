

function moduleConfig() {
  const env = import.meta.env.MODE || 'prod'
  const api = {
    'development': 'http://localhost:80/api',
    'production': '/api'
  }
  return {
    env,
    /** 请求超时毫秒 */
    get requestOvertime() {
      return 80000;
    },

    /**请求地址 */
    get apiUrl() {
      return api[env]
    }
  }
}
/** 配置模块 */
const config = moduleConfig();
export default config;