import request  from '../utils/request';

// 获取热门文章
export function getWork() {
  return request('GET', '/work')
}