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


//获取文章详情
export function getArticle(_id) {
  return request('POST', '/article', {_id})
}

//获取延伸阅读
export function getArticleExtend() {
  return request('POST', '/article/extend')
}

//给文章点赞
export function articleLike(_id) {
  return request('POST', '/article/like', {_id})
}
