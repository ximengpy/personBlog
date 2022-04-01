import request  from '../utils/request';

// 获取项目列表
export function getWork() {
  return request('GET', '/work')
}

// 获取项目详情
export function workDetail(_id) {
  return request('POST', '/work/detail', {_id})
}

