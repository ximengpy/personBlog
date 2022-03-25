import request  from '../utils/request';

// 获取热门文章
export function getArticleHot(limit = 8) {
  return request('POST', '/article/getHot', {limit})
}