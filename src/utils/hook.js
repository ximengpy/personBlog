/// <reference path='../../type.d.ts' />
/**
 * 页码数据
 * @param size 条数
 */
export function usePageInfo(size = 10) {
  return {
    /** 条数 */
    pageSize: size,
    /** 页码 */
    currentPage: 1,
    /** 总数 */
    total: 0
  }
}