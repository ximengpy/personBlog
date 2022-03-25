<template>
  <div class="pagion-wrap" :style="{ 'text-align': position }">
    <!-- element-分页器 -->
    <el-pagination
      v-show="pageInfo.total"
      :layout="layout"
      :total="Number(pageInfo.total)"
      :current-page="page"
      :page-size="Number(pageInfo.pageSize)"
      :page-sizes="pageSizes"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    ></el-pagination>

  </div>
</template>
<script>
import { inputOnlyNumber } from '@/utils';

/**
 * 分页器组件
 */
export default {
  name: 'Pagination',
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {
          pageSize: 10,
          total: 0,
          currentPage: 1,
        }
      }
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 100, 200, 300]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    /**
     * @type {'left' | 'right' | 'center'}
     */
    position: {
      type: String,
      default: 'right'
    },
    path: {
      type: String,
      default: '/'
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      inputPageSize: 1,
      /** 最大条数（包括当前页就5条），必需为偶数，因为左右对称 */
      limit: 4,
    }
  },
  computed: {
    pageSizesList() {
      return this.pageSizes.map(size => ({
        value: size,
        label: `${size}条/页`
      }))
    },
    lastPage() {
      let value = Math.ceil(Number(this.pageInfo.total) / Number(this.pageInfo.pageSize));
      if (isNaN(value) || value < 0) {
        value = 1;
      }
      return value;
    },
    /** 当前页 */
    page() {
      let value = Number(this.pageInfo.currentPage);
      if (isNaN(value) || value < 0) {
        value = 1;
      }
      return value;
    },
    pageBtnList() {
      /** 最大显示条数 */
      let count = this.limit;
      /** 加或者减操作 */
      let plus = true;
      const list = [this.page];
      const total = this.lastPage;
      while (count > 0) {
        if (plus) {
          if (list[list.length - 1] < total) {
            list.push(list[list.length - 1] + 1);
          } else if (list[0] > 1) {
            list.unshift(list[0] - 1);
          }
        } else {
          if (list[0] > 1) {
            list.unshift(list[0] - 1);
          } else if (list[list.length - 1] < total) {
            list.push(list[list.length - 1] + 1);
          }
        }
        count--;
        plus = !plus;
      }
      return list;
    },
    v2PagerBtnList() {
      const totalPager = Math.ceil(this.pageInfo.total / this.pageInfo.pageSize)
      if (totalPager <= 10) return Array.from({length: totalPager}, (_, index) => index + 1)
      // 页码开始标志
      const start = this.pageInfo.currentPage - 5 <=0 ? 1 : this.pageInfo.currentPage - 5
      return Array.from({length: 10}, (_, index) => start + index)
    }
  },
  watch: {
    'pageInfo.currentPage': {
      immediate: true,
      handler(val) {
        this.inputPageSize = val;
      }
    }
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    /**
     * @param {'pageSize'|'currentPage'|'jump'} type
     * @param {number} value
     */
    onClick(type, value) {
      this.$emit('change', {
        type,
        value
      })
    },
    onJump() {
      const value = Number(this.inputPageSize);
      // this.onClick('jump', value);
      this.$router.push({
        path: this.path,
        query: this.getQuery(null, value)
      })
    },
    /**
     * 输入过滤操作
     * @param {string} val
     */
    onFilterInput(val) {
      this.inputPageSize = inputOnlyNumber(val || '') || 1;
      if (Number(this.inputPageSize) > this.lastPage) {
        this.inputPageSize = this.lastPage;
      }
    },
    /**
     * 获取参数路径
     * @param {number} size 页码
     * @param {number} page 当前页
     */
    getQuery(size, page) {
      const pageInfo = JSON.parse(JSON.stringify(this.pageInfo));
      const params = JSON.parse(JSON.stringify(this.params));
      // 总数不需要在链接上
      delete pageInfo.total;
      if (size) {
        pageInfo.pageSize = size;
      }
      if (page) {
        pageInfo.currentPage = page;
      }
      const query = {
        ...params,
        ...pageInfo
      }
      // console.log('params >>', params);
      // console.log('pageInfo >>', pageInfo);
      // console.log('---------------------------');
      return query;
    },
    /**
     * @param {number} n
     */
    onSizeChange(n) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = n;
      this.$emit('change', { type: 'pageSize', value: n });
    },
    /**
     * @param {number} n
     */
    onCurrentChange(n) {
      this.pageInfo.currentPage = n;
      this.$emit('change', { type: 'currentPage', value: n });
    }
    // ==================================== 二、数据请求类 ================================
    // ==================================== 三、跳转类 ====================================
    // ==================================== 四、小工具类 ==================================
  },
};
</script>
<style lang="scss">
.pagion-wrap {
  // background: #fff;
}
.el-pagination {
  justify-content: right;
}
</style>