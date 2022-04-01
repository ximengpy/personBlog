<template>
  <div class="diary common">
    <el-timeline>
      <el-timeline-item
        class="mgb_40"
        :timestamp="formatDate(item.date)" 
        placement="top"
        v-for="(item) in diaryList"
        :key="item._id"
      >
        <el-card>
          <p class="mgb_20">{{item.txt}}</p>
          <div class="img-wrap" v-if="item.img"> 
            <img
              
              :src="item.img"
              :alt="item.txt"
              width="100%">
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { formatDate } from '@/utils/index'
import { getDiary } from '@/api/diary.js'
export default {
  components:{},
  data() {
    return {
      diaryList: []
    }
  },
  mounted() {
    this._getDiary()
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    formatDate,

    // ==================================== 二、数据请求类 ================================
    async _getDiary() {
      const res = await getDiary()
      if( !res.code) {
        this.diaryList = res.data
      }
    }

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
.diary {
  padding: 90px 0;
  width: 60%;
  margin: 0 auto;

}
@media screen and (max-width: 966px)  {
  .diary {
    width: 100%;
  }
}
</style>