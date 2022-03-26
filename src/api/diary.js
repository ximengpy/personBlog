import request  from '../utils/request';

// 获取日记
export function getDiary() {
  return request('GET', '/diary')
}
