<template>
    <div class="works common" >
    <div class="show-center">
      <h1 class="show-big-title"> 项目列表</h1>
      <div class="show-wrap">
        <ul class="show-list">
          <li
            v-for="(item) in workList"
            :key="item._id"
            class="list-item"
            @click="toDetail(item)"
            >
              <div class="item-img">
                <img :src="defaultImg" alt="">
                <p class="item-detail" @click="toDetail(item)">点击查看详情</p>
                <div class="hover-item">
                  <h4 class="item-title">{{item.title}}</h4>
                  <p class="item-create-time">{{formatDate(item.createTime,'Y-M-D' )}}</p>
                </div>
              </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import { getWork} from '../../api/works'
import defaultImg from '../../assets/images/home/9.jpg'
import { formatDate }from '../../utils/index'
export default {
  components:{},
  data() {
    return {
      workList: [],
      defaultImg,
    }
  },
  mounted() {
    this._getWork()
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    formatDate,
    toDetail( item ) {
      this.$router.push(`/works/${item._id}`)
    },

    // ==================================== 二、数据请求类 ================================
    async _getWork() {
      const res = await getWork()
      if( !res.code) {
        this.workList = res.data
      }
    }

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme.scss";
.works{

    // .public-page();
    .show-center {
      overflow: hidden;
      width: 60%;
      margin: 0 auto ;
      padding: 80px 20px 20px;
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
      .show-big-title {
        margin-bottom: 10px;
      }
      .show-list {
        .list-item {
            background:#fff;
            padding: 20px 0;
            margin-bottom: 30px;
          .item-img {
            position: relative;
            cursor: pointer;
            & img {
              width: 100%;
              max-height: 300px;
            }
            .hover-item {
              position: absolute;
              display: flex;
              justify-content: space-between;
              bottom: 0;
              left: 0;
              right: 0;
              height: 0;
              line-height: 50px;
              padding: 0 40px;
              color: #fff;
              background-color: rgba(0,0,0,.7);
              transition: .4s;
            }
            .item-detail {
              position: absolute;
              overflow: hidden;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 90px;
              height: 0;
              line-height: 50px;
              text-align: center;
              color: #fff;
              border-radius: 5px;
              background-color:rgb(58, 209, 151);
            }
            &:hover {
              .hover-item {
                height: 50px;
              }
              .item-detail  {
                height: 50px;
              }
              & img {
              -webkit-filter: blur(9px);filter: blur(9px);
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 966px)  {
    .show {
      .show-center {
        width: 82%;
      }
    }
  }
</style>