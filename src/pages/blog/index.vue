<template>
  <div class="blog common">
    <div class="blog-container">
        <el-container >
        <el-main v-loading="loading">
          <ArticleLeft :list="articleList" :pages="pages" @change="_getArticleList"/>
        </el-main>
        <el-aside class="mgl_40">
          <div class="my-info">
            <div class="info-img fcc">
              <img src="../../assets/images/home/2.jpg" alt="ge" class="img-icon">
            </div>
            <span class="info-name">Peng_star_ty</span>
            <span class="info-address">广东-广州</span>
            <span class="info-address">前端工程师</span>
            <div class="info-footer">
              <span class="footer-title">社交账号</span>
              <el-popover
                placement="top-start"
                width="80"
                trigger="hover"
                class="info-com"
                >
                  <img src="../../assets/images/qq.png" alt="qq" class="qq" width="100%">
                <el-button slot="reference">QQ</el-button>
              </el-popover>
              <el-popover
                placement="top-start"
                width="80"
                trigger="hover"
                class="info-com"
                >
                  <img src="../../assets/images/core.png" alt="qq" class="wx" width="100%">
              <el-button slot="reference">微信</el-button>
              </el-popover>
            </div>
          </div>
          <div :class="['search',{'fixed':ifSearchFixed}]">
            <div class="search-main">
              <input
                @input="handleInput"
                v-model="searchInput"
                placeholder="请输入内容">
              <i class="el-icon-search"></i>
              <ul v-if="!!searchList.length" class="search-list">
                <li
                  v-for="(item,index) in searchList"
                  :key="index"
                  class="search-item"
                >
                  <!-- <router-link :to="'/Article/'+item._id">{{item.title}}</router-link> -->
                </li>
              </ul>
            </div>
            <div class="search-aricle">
              <ul class="search-list" @mouseleave="handleMouseLeave">
                <li
                  class="search-item"
                  v-for="(item,index) in articleTags"
                  :key="index"
                  @mouseenter="handleMouseEnter(index)"
                  @click="_getArticleList(item)"
                > {{ item.tag}}</li>
              </ul>
              <!-- <div class="cover" :style="{top:coverTop*40+'px'}"></div> -->
            </div>
          </div>
          <div class="hot">
            <h3 class="hot-art">热门文章</h3>
            <ul class="hot-list">
              <li v-for="(item,index) in articleHot" :key="index" class="hot-item">
                <i>{{index+1}}</i>
                <router-link class="hot-a"  :to="/article/+item._id">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
          <div class="visitor">
              <h3 class="visitor-title">最近访客</h3>
            <ul class="visitor-list">
              <li v-for="(item,index) in visitors " :key="index" class="visitor-item" >
                <img  class="visitor-img" :src="item.photo" alt="">
                <p class="visitor-name">{{item.user}}</p>
              </li>
            </ul>
          </div>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>
<script>
import { getArticleHot } from '@/api/home'
import { usePageInfo } from '@/utils/hook'
import { getArticleList, getArticleTag, getVisitor } from '../../api/blog' 
import ArticleLeft from './components/ArticleLeft.vue'
export default {
  components:{ArticleLeft},
  data() {
    return {
      searchList: [],
      loading: false,
      visitors: [],
      articleHot: [],
      articleTags: [],
      articleList: [],
      ifSearchFixed: false,
      searchInput: '',
      pages: usePageInfo()
    }
  },
  mounted() {
    this._articleHot()
    this._getTags()
    this._getVisitor()
    this._getArticleList()
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    handleMouseEnter() {

    },
    // ==================================== 二、数据请求类 ================================
    async _articleHot() {
      const res = await getArticleHot()
      if( !res.code) {
        this.articleHot = res.data
      }
    },
    async _getTags() {
      const res = await getArticleTag()
      if (!res.code) {
        this.articleTags = res.data
      }
    },
    async _getVisitor() {
      const res = await getVisitor()
      if (!res.code) {
        this.visitors = res.data
      }
    },
    async _getArticleList(item) {
      const data = {
        tag: item?._id || '',
        ...this.pages
      }
      this.loading = true
      const res =await getArticleList(data)
      this.loading = false
      if( !res.code) {
        this.articleList = res.data.list || []
        this.pages.total = res.data.total
      }
    }

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>

<style lang="scss" scoped>
@import "../../styles/index.scss";
.blog {
  .blog-container {
    padding: 80px;
    width: 100%;
    user-select:none;
    box-sizing: border-box;
    > .el-container {
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      height: 100%;
      margin: 0 auto;
      padding: 0 50px;
      .el-main {
        padding-top: 0;
        padding-left: 0;
      }
      .el-aside {
        width: 300px;
        .my-info {
          background-color: #fff;
          padding-bottom: 15px;
          margin-bottom: 20px;
          .info-img {
            width: 100%;
            height: 100px;
            text-align: center;
            padding: 20px 0 10px;
            transform: rotate(0);

            & img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              &:hover {
              animation: mylint 0.5s linear both infinite;
              }
            }
          }
          @keyframes mylint {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .info-name {
            display: block;
            font-size: 18px;
            text-align: center;
            color: darkgoldenrod;
            margin: 10px;
          }

          .info-address {
            display: block;
            text-align: center;
            font-size: 16px;
            margin:8px;
            color: #aaa;
          }

          .info-footer {
            .footer-title {
              display: block;
              text-align: center;
              color: #ccc;
              margin-bottom: 10px;
            }
          }

          .info-com {
            margin:20px 0px 10px 50px;
            & img{
              width: 100px;
            }
          }
        }
        >.search {
          width: 100%;
          background: #fff;
          padding-bottom: 10px;
          &.fixed {
            position: fixed;
            width: 300px;
            animation: searchMove .5s;
            animation-fill-mode: forwards;
          }
          @keyframes searchMove {
            0% {
              top:-500px;
            }
            40% {
              top: 110px;
            }
            70%{
              top: 100px;
            }
            100% {
              top: 121px;
            }
          }
          >.search-main {
            position:relative;
            box-sizing: border-box;
            width:100%;
            height: 80px;
            padding: 20px;
            background-color: grey;
            input {
              position: relative;
              width: 100%;
              height: 40px;
              border-radius: 20px;
              border: 0;
              outline: 0;
              background: #fff;
              text-indent: 2em;
              z-index: 4;
            }
            i {
                position: absolute;
                z-index: 4;
                right: 35px;
                top: 29px;
                width: 22px;
                height: 22px;
                font-size: 18px;
                line-height: 22px;
                text-align: right;
                font-weight: bolder;
                color: rgb(120, 121, 119);
                cursor: pointer;
              }
              .search-list {
                position: absolute;
                width: 260px;
                background-color: #fff;
                top: 44px;
                padding-top: 23px;
                border-radius:0 0 10px 10px;
                box-shadow: 0 0 2px #999;
                z-index: 3;
              }
              .search-item {
                overflow: hidden;
                box-sizing: border-box;
                width: 100%;
                height: 40px;
                line-height: 30px;
                padding: 5px;
              }
              a {
                display: block;
                width: 100%;
                height: 100%;
                &:hover{
                  background-color: #ddd;
                }
              }
          }
          .search-aricle {
            position:relative;
            width: 100%;
            margin-top: 20px;
            z-index: 2;
            .search-list {
              width: 100%;
              .search-item {
                position: relative;
                box-sizing: border-box;
                z-index: 1;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                color: #787977;
                border-bottom: 1px #eee dotted;
                &::after {
                  position: absolute;
                  right: 0;
                  width: 10px;
                  height: 40px;
                  border-right: 5px solid #000;
                  background-color: rgba(0,0,0,.05);
                  transition:top .2s;
                }
              }
            }
            .cover {
              
              left: 0;
              top: 0;
              box-sizing: border-box;
             
            }
          }
        }
        .hot{
          box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background:#fff;
          padding:15px 20px;
          .hot-art{
            padding:0 5px 8px;
            line-height: 30px;
            font-weight: 30px;
            border-bottom: 1px solid #e8e9e7;
            position: relative;
            font-size: 18px;
          }
          .hot-list {
            margin-top: 5px;
            .hot-item{
              display: flex;
              height: 30px;
              line-height: 30px;
              margin: 8px 0;
              .hot-a{
                display: inline-block;
                width: 220px;
                color: #787977;
                font-size: 14px;
                text-overflow:ellipsis;
                overflow:hidden;
                white-space:nowrap;
                &:hover{
                  color:#6bc30d;
                  text-decoration: underline;
                }
              }
              i{
                display: inline-block;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                margin-top: 5px;
                line-height: 22px;
                text-align: center;
                border-radius: 10px;
                background-color: #edefee;
                font-style: normal;
                font-size: 12px;
                text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
              }
              &:nth-child(1) i{
                background-color: darkorange;
                color: #fff;
              }
              &:nth-child(2) i{
                background-color: darkcyan;
                color: #fff;

              }
              &:nth-child(3) i{
                background-color: #6bc30d;
                color: #fff;

              }
            }
          }
        }
        .visitor{
           box-sizing: border-box;
          width: 100%;
          margin-top: 20px;
          background:#fff;
          padding:15px 20px;
          .visitor-title{
            padding:0 5px 8px;
            line-height: 30px;
            font-weight: 30px;
            border-bottom: 1px solid #e8e9e7;
            position: relative;
            font-size: 18px;
          }
          .visitor-list {
            margin-top: 15px;
            display: flex;
            flex-wrap: wrap;

            .visitor-item {
              width: 25%;
              height: 50%;
              .visitor-img{
                width: 58px;
                height: 58px;
              }
              .visitor-name   {
                text-align: center;
              }
              }
            }
          }
        }
      }
    }
}
</style>