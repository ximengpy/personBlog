<template>
  <div class="work-detail">
    <div class="detail-center">
      <h4 class="detail-title"><span class="title-content">{{detail.title}}</span></h4>
      <p class="create-time"><span class="time-text">时间:</span> <span class="time-content">{{formatDate(detail.createTime, 'Y年M月D日')}}</span></p>
      <p class="link"><span class="link-text">预览地址</span> <a class="link-look" :href="detail.link">{{detail.link}}</a></p>
      <p class="detail-intro">{{detail.intro}}</p>
      <div class="detail-account">
        <div
          v-for="(item, index) in detail.account"
          :key="index"
          class="account-content">
          <span class="account-number">测试账号{{index+1}}:</span>
          <span class="account-text">账号</span><span class="account-act">{{item.act}}</span>
          <span class="account-text">密码</span><span class="account-act">{{item.pwd}}</span>
          <p class="info">备注：{{item.info}}</p>
        </div>
      </div>
      <div class="img-wrap">
        <img :src="detail.img" alt="">
      </div>

    </div>
  </div>
</template>
<script>
import { workDetail } from '../../api/works'
import { formatDate } from '@/utils/index' 
export default {
  components:{},
  data() {
    return {
      id: '',
      detail: {}
    }
  },
  mounted() {
    this._workDetail()
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    formatDate,
    async _workDetail() {
      this.id = this.$route.params.id
      const res = await workDetail(this.id)
      if(!res.code) {
        this.detail = res.data
      }
    },


    // ==================================== 二、数据请求类 ================================

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
.work-detail {
  padding-top: 70px;
  // .public-page();
    .detail-center {
      overflow: hidden;
      width: 60%;
      margin: 0 auto ;
      padding: 20px;
      min-height: 600px;
      background-color: #fff;
      animation: showin 2s;
      animation-fill-mode: forwards;
      @keyframes showin {
            from{
              opacity: 0;
            }
            to{
              opacity: 1;
            }
          }
    }
  & .detail-title {
    text-align: center;
    margin: 20px;
    font-size: 20px;
    font-weight: 700;
  }
  & .create-time {
    text-align: center;
    color: #999;
    & .time-text {
      margin-right: 10px;
    }
  }
  & .link {
    margin: 20px;
    & .link-text {
      margin-right: 10px;
    }
    & .link-look {
      color:darkgoldenrod;
      font-size: 18px;
      font-weight: 500;
    }
  }
  & .img-wrap {
    & img {
      width: 100%;
    }
  }
  & .detail-intro {
    margin: 20px;
  }
  & .detail-account {
    margin: 20px;
    & .account-text {
      width: 50px;
      margin: 10px;
    }
    & .account-act {
      font-weight: 500;
      font-size: 18px;
      color:rgb(84, 197, 112);
    }
    & .info {
      margin-top: 5px;
    }
  }
  & .account-content {
    margin: 20px;
  }
}
</style>