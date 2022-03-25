<template>
  <div class="blog-detail">
    <div class="message">
      <div class="main">
        <div v-if="detail">
          <section class="title">
            <h4 class="detail-title">{{detail.title}}</h4>
            <p class="detail-intro">
              <small>
                作者：<a href="javascript:void(0)">py</a>
              </small>
              <small class="mgl_10">围观群众：<i class="readcount">{{detail.pv}}</i></small>
              <small class="mgl_10">更新于 <label>{{formatDate(detail.updateDate, 'Y-M-D')}}</label> </small>
            </p>
          </section>
          <section class="time">
            <p class="date">{{sliceStr(detail.date, 0, 4)}}</p>
            <p class="month">{{sliceStr(detail.date, 5, 7)}}<span>月</span></p>
            <p class="year">{{sliceStr(detail.date, 8, 10)}}</p>
          </section>
          <!-- <section class="content" v-html='detail.content'  v-heghtjs>{{detail.content}}</section> -->
          <section class="content" >{{detail.content}}</section>
          <div class="content-like" @click="handleLike">
            <p class="like-text">点赞（{{detail.like}}）<i class="iconfont icon-dianzan"></i></p>
          </div>
          <section class="copyright">
            <p class="f-toe fc-black">
              非特殊说明，本文版权归 py所有，转载请注明出处.
            </p>
            <p class="f-toe">
              本文标题：
              <a href="javascript:void(0)" class="r-title">py</a>
            </p>
            <p class="f-toe">
              本文网址：
              <a href="javascript;">原网址已过期未续费了</a>
            </p>
          </section>
          <section class="extend">
            <h6 class="extend-title">延伸阅读</h6>
            <ol class="extend-list">
              <li class="f-toe extend-item" v-for="(item,index) in extendList" :key="index">
                <router-link class="item-link" :to="`/blog/${item._id}`">{{ item.title }}</router-link>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { articleLike, getArticle } from '../../api/blog'
import { formatDate, sliceStr } from '../../utils/index'
export default {
  components:{},
  data() {
    return {
      id: '',
      detail: {},
      extendList: []
    }
  },
  watch: {
    $route: {
      handler(){
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    formatDate,
    sliceStr,
    init() {
      this.id = this.$route.params.id
      this._getArticle()
    },

    // ==================================== 二、数据请求类 ================================
    async _getArticle() {
      const res = await getArticle(this.id)
      if( !res.code) {
        this.detail = res.data.result || []
        this.extendList = res.data.extendList || []
      }
    },

    //点赞
    async handleLike() {
      const res = await articleLike(this.id)
      if( !res.code) {
        ElMessage.success('点赞成功')
        this.detail.like++
      }
    }

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
.blog-detail {
    box-sizing: border-box;
    max-width: 1360px;
    padding: 70px 50px;
    margin: 0 auto;
    color: #515250;
    overflow: hidden;

    .main {
      position: relative;
      box-sizing: border-box;
      width: 70%;
      margin: 0 auto;
      padding: 30px 20px;
      color: #515250;
      background-color: #fff;

      section.title {
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-weight: 400;

        .detail-title {
          margin-top: 5px;
          font-size: 20px;
          font-weight: normal;
          color: #515250;
        }

        .detail-intro {
          color: #787977;
          margin-top: 10px;

          a {
            color: #3e8bc7 !important;
          }
        }
      }

      section.time {
        width: 110px;
        height: 70px;
        position: absolute;
        right: 10px;
        top: 15px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        line-height: 32px;

        .date {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          position: relative;
          top: 2px;
        }

        .month {
          display: inline-block;
          color: #989997;
          font-size: 18px;

          span {
            font-size: 14px;
          }
        }

        .year {
          display: inline-block;
          color: #989997;
          margin-left: 10px;
          font-size: 18px;
        }
      }

      section.content {
        padding-bottom: 20px;
        font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc", "Microsoft Yahei", sans-serif;
        margin: 20px 0 0 0;
        line-height: 28px;
        position: relative;
        min-height: 200px;

        .code {
          background-color: #fff5f5;
          color: #ff502c;
          font-size: .87em;
          padding: .065em .4em;
        }
      }
      .content-like {
        border-bottom: 1px solid #e1e2e0;
        text-align: center;
        margin-top: 20px;
        padding-bottom: 30px;

        & .like-text {
          width: 100px;
          height: 30px;
          line-height: 30px;
          margin: auto;
          background-color:#6bc30d;
          color: #fff;
          cursor: pointer;
        }
      }


      section.copyright {
        clear: both;
        background-color: #f8f9f7;
        padding: 15px 20px;
        line-height: 22px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
        font-size: 12px;
        color: #787977;



        a {
          color: #3e8bc7;
          text-decoration: none;

          &:hover {
            color: #6bc30d;
          }
        }
      }

      section.extend {
        .extend-title {
          margin: 20px 0;
          border-left: 3px solid #6bc30d;
          min-height: 26px;
          line-height: 26px;
          padding: 5px 20px;
          background-color: #f8f9f7;
          font-size: 16px;
          font-weight: 400;
          color: #585957;
          text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
          clear: both;
        }
        .extend-list{
          .extend-item::before{
            content: "◈";
            margin-right: 5px;
            color: #787977;
          }
          .item-link{
            color: #3e8bc7;
            &:hover{
              color: #6bc30d;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 966px) {
    .blog-detail {
      padding: 70px 10px;
      & .ml10 {
        display: block;
        margin-left: 0 !important;
      }
      .main {
        width: 100%;
        padding-top: 10px;
      }
      section.title {
        & h4 {
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
          margin-bottom: 10px;
        }
      }
      section.time {
        top: 50px !important;
      }
      img {
        width: 100%;
      }
    }
  }
</style>