# 表单分页器组件

使用示例

```html
<template>
  <div class="example">
    <!-- 默认使用方式 -->
    <Pagination :pageInfo="pageInfo" @change="paginationChange" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index.vue';
import { usePageInfo } from '@/utils/hooks';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      pageInfo: usePageInfo()
    }
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    /**
     * 分页变动
     * @param {{ type: 'pageSize' | 'currentPage', value: number }} info
     */
    paginationChange(info) {
      this.getTableData();
    },
    // ==================================== 二、数据请求类 ================================
    /** 获取表格数据 */
    async getTableData() {
      const res = await getData({
        ...this.pageInfo
      })
      console.log('表格数据 >>', res);
      if (res.code === 1) {

      }
    }
  }
}
</script>
```