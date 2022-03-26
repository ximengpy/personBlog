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

export function useNavList() {
  const list = [
    {
      path: '/',
      title: '首页'
    },
    {
      path: '/blog',
      title: '博客'
    },
    {
      path: '/message',
      title: '留言'
    },
    {
      path: '/diary',
      title: '日记'
    },
    {
      path: '/works',
      title: '个人作品'
    },
    // {
    //   path: '/links',
    //   title: '友链'
    // },
    {
      path: '/about',
      title: '关于'
    }
  ]
  return list
}