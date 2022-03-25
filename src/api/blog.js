import request  from '../utils/request';

// 获取标签
export function getArticleTag() {
  return request('POST', '/article/getInfo')
}

//获取最近访客
export function getVisitor() {
  return request('POST', '/visitor')
}

//获取文章列表
export function getArticleList(data) {
  return request('POST', '/article/getshow', data)
}