<template>
  <div class="home">
    <div class="bg" :style="'height: '+ bgHeight+'px'">
      <div class="bg-content loading waiting">
        <h1 class="title"> PY's Blog</h1>
        <h3 class="sub-title">welcome to my blog</h3>
        <el-button class="btn" type="primary" @click="handleClickToblog">Enter blog</el-button>
      </div>
      <i @click="handletoHot" class="el-icon-arrow-down bg-icon"></i>
    </div>

    <!-- 右上角菜单栏 -->
    <div  :class="['menu',{'click':ifclick}]">
      <div  @click="handleClick" class="btn">
        <span class="line" v-for="item in 3" :key="item" />
      </div>
      <div class="cover">
        <div class="point basepoint">
          <router-link to="/">首页</router-link>
          <router-link to="/blog/0">博客</router-link>
          <router-link to="/message">留言</router-link>
        </div>
        <div class="github basepoint">
          <a class="github-link" href="https://github.com/ximengpy">
            <p> github地址: </p>
            <span>https://github.com/ximengpy</span>
          </a>
        </div>
        <div class="cover-logo basepoint">py's blog</div>

      </div>

    </div>

    <!-- 热门文章 -->
    <div class="hot">
      <div class=" hot-main">
        <div class="loading waiting text">
          <h2 class="title">热门文章</h2>
          <p class="text">很想给你写封信，告诉你这里的天气</p>
          <p class="text">昨夜的那场电影，还有你的心情</p>
        </div>
      </div>
      <ul class="list loading waiting">
        <li
          v-for="(item,index) in articleHotList"
          :key="index"
        >

          <div class="detail">
            <div class="title"><router-link :to="'article/'+item._id">{{item.title}}</router-link></div>
            <div class="time">{{item.date}}</div>
            <router-link :to="'article/'+item._id" class="link">阅读更多>></router-link>
          </div>
        </li>
      </ul>
    </div>

    <!--关于  个人作品  -->
    <div class="home-box">
      <div class="home-box-about loading waiting">
        <router-link class="box-about" to="/about">关于</router-link>
        <router-link class="box-about" to="/daily">个人作品</router-link>
      </div>
    </div>

    <!-- intro介绍 -->
    <div class="intro">
      <h2>记录技术上的点点滴滴~~</h2>
    </div>
  </div>
</template>
<script>
import { getArticleHot } from '../../api/home'
export default {
  components:{},
  data() {
    return {
      bgHeight: 0,
      ifclick: false,
      articleHotList: [],

    }
  },
  mounted() {
    this._getArticleHot()
    this.getwindowHeight()
    window.addEventListener('resize', this.getwindowHeight)

      // 页面动画效果监听  滚动监听
    window.addEventListener('scroll',this.handleScroll)
    this.handleScroll()
  },
  methods: {
    // 设置bg的高度
    getwindowHeight() {
      this.bgHeight = window.innerHeight
    },
    // 点击右侧菜单
    handleClick() {
      this.ifclick = !this.ifclick
    },
    // 滚轮滚动事件
    handleScroll() {
      let waitingDom = document.querySelectorAll(".waiting")
      waitingDom.forEach(node => {
        const offset =  node.getBoundingClientRect()
        const offsetTop = offset.top
        const offsetBottem = offset.bottom
        if(offsetTop <= window.innerHeight-50 && offsetBottem >= 0) {
          node.classList.remove('loading')
        } else {
          node.classList.add('loading')
        }
      })
    },
    handletoHot() {
      document.documentElement.scrollTop = 1000
    },
    handleClickToblog() {
      this.$router.push('/blog/0')
    },
    /**获取热门文章 */
    async _getArticleHot() {
      const res = await getArticleHot(3)
    }
  },
  destroyed() {
    removeEventListener('resize', this.getwindowHeight)
    removeEventListener('scroll',this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
@import "/src/styles/index.scss";
@import "/src/styles/theme.scss";
.home{
  width: 100%;
  height: 100%;
  user-select: none;
  .bg {
    position: relative;
    width: 100%;
    background: url("@/assets/images/7.jpg") center center/cover no-repeat;
    &::after {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
    }
      .bg-content {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 154px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        z-index: 1;
        transform: scale(1);
        transform: translate(-50%, -50%);
        transition: all .5s;
        .title {
          font-weight: 400;
          font-size: 2em;
        }
        .sub-title {
          font-weight: 400;
          letter-spacing: 10px;
          margin: 20px 0
        }
        .btn {
          a{
            color: #fff;
          }
        }
      }
       .loading {
        transform: scale(0.5);
      }
        .bg-icon {
        position: absolute;
        left: 50%;
        bottom: 30px;
        width: 50px;
        height: 50px;
        margin-left: -25px;
        color: #fff;
        border-radius: 50%;
        font-weight: 700;
        font-size: 40px;
        transition: background-color .7s;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        z-index: 111;
         :hover {
          background-color: #6bc30d ;
        }
      }
    }
  .menu {
    .btn {
      position: fixed;
      top: 65px;
      right: 45px;
      width: 40px;
      height: 40px;
      padding-top: 10px;
      border-radius: 50%;
      background: rgba(0,0,0,0.1);
      transition: background-color .3s;
      cursor: pointer;
      z-index: 999;
      &:hover {
        background-color: #6bc30d ;
      }
         .line {
        position: relative;
        top: 0;
        overflow: hidden;
        display: block;
        margin: 5px auto 0;
        width: 26px;
        height: 2px ;
        background-color: #fff;
        transition: .5s;
        transform: rotate(0deg);
        opacity: 1;
      }
    }
       .cover {
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      z-index: -1;
      transition:  .4s;
      &::before {
        position: absolute;
        top: 0;
        left: 109%;
        content: '';
        width: 5000px;
        height: 100%;
        background-color: #f9f9f8;
        transform: skew(-12deg);
        transition: .6s;
      }
      .point {
        top: 200px;
           a {
          position: relative;
          display: block;
          text-align: right;
          color: #696867;
          line-height: 46px;
          padding: 10px 40px;
          margin-right: 10px;
          font-size: 20px;
          transition: color .6s linear;
          &::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 0%;
            opacity: 0;
            height: 1px;
            background-color: #6bc30d;
            content: '';
            transition: .6s;
          }
          &:hover{
            color: #6bc30d;
          }
          &:hover::before {
            width: 100%;
            opacity: 1;
          }
        }
      }
      .github {
          bottom: 20%;
             a {
            display: block;
            text-align: center;
            color: #666;
            font-size: 16px;
            > p {
              margin-bottom: 10px;
            }
            > span {
              color: $objectcolor;
              transition: color .6s;
              &:hover{
                color: #999;
              }
            }
          }

      }
      .cover-logo {
        bottom: 50px;
        margin-right: 20px;
        height: $layoutHeaderHeight;
        line-height: $layoutHeaderHeight;
        color: #777;
        text-align: left;
        font-size: 40px;
        font-family: BarbaraHand;
      }
    }
  }
  .click {
       .btn {
      background-color: rgba(0,0,0,0.1);
         .line:nth-child(1) {
        top: 8px;
        transform: rotate(45deg);
      }
         .line:nth-child(2) {
        top: 1px;
        transform: rotate(-45deg);

      }
         .line:nth-child(3) {
        display: none;
      }
    }
       .cover {
      opacity: 1;
      z-index: 10;
      &::before {
        left: 65%;
      }
    }
  }

     .hot {
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: 100px 0;
    background-color: #fff;
       .hot-main {
      // position: relative;
      max-width: 1170px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
      & > .text {
        position: relative;
        top: 0;
        opacity: 1;
        transition: opacity .3s,top .5s;
          .title {
          position: relative;
          font-size: 32px;
          padding-bottom: 30px;
          font-weight: 500;
          margin-bottom: 20px;

          &::before {
            position: absolute;
            width: 50px;
            height: 2px;
            content: '';
            left: 50%;
            margin-left: -25px;
            bottom: -1px;
            background-color: $basecolor;
          }
        }
        & > .text {
          color: #888;
          line-height: 22px;
        }
      }
      & > .loading {
        position: relative;
        top: -100px;
        opacity: 0;
      }
    }
      .list {
      display: flex;
      width: 80%;
      margin: 25px auto 0;
      & >li {
        position: relative;
        top: 0px;
        overflow: hidden;
        flex: 1;
        height: 450px;
        margin: 0 10px;
        box-sizing: border-box;
        opacity: 1;
        & > .img{
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 250px;
          > img {
            width: 100%;
            height: 250px;
            transition: .5s;
          }
        & >.to-detail {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,.3);
          transition: top .4s;
          opacity: 0;
          & > a {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -20px;
            margin-top: -20px;
            width: 40px;
            height: 40px;
            background-color: #333;
            color: #fff;
            line-height: 40px;
            text-align: center;
            & i {
              font-size: 16px;
            }
          }
        }
        &:hover .to-detail {
          top: 0;
          opacity: 1;
        }
        &:hover img {
          transform: scale(1.5);
        }
        }
          .detail {
          padding: 20px 12px 8px;
          background-color: rgba(246,243,249,.8);
          & > .title {
            font-size: 20px;
            margin-bottom: 5px;
            > a {
              transition: .3S;
            }
            &:hover a {
              color: #777;
            }
          }
          & > .time {
            margin-bottom: 10px;
            color: #606266;
          }
            .content{
            height: 60px;
            line-height: 19px;
            color: rgba(0,0,0,.5);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            text-indent: 20px;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
            .link {
            display: block;
            padding-top: 9px;
            margin: auto;
            color: $basecolor;
            font-size: 18px;
            &:hover {
              color: $objectcolor;
            }
          }
        }
        &:nth-child(1){
        transition: .5s 0;
      }
        &:nth-child(2){
          transition: .5s .25s;
        }
        &:nth-child(3){
          transition: .5s .45s;
        }
      }
    }
      .loading {
      & li {
      position: relative;
      top: 100px;
      opacity: 0;
      }
    }
  }
    .home-box {
    position: relative;
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    background:fixed url('../../assets/images/home/10.jpg') no-repeat;
    background-size: 100% 530px;
    background-position: 100% 100%;
    .home-box-about {
        .box-about {
        position: relative;
        display: inline-block;
        width: 198px;
        height: 45px;
        margin-right: 30px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        border: 1px solid #fff;
        font-size: 18px;
        z-index: 9;
        background-color: rgba(23, 34, 26, 0.3);
        transition: .6s;
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          content: '';
          display: block;
          width: 0%;
          height: 46px;
          z-index: -1;
          background-color: $objectcolor;
          opacity: 1;
          transition: width .4s;
        }
        &:hover::after {
          width: 100%;
        }
      }
    }
    .loading >a {
      &:nth-child(1) {
        margin-right: 280px;
      }
      &:nth-child(2) {
        margin-left: 280px;
      }
    }

  }
    .intro{
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: 100px 0;
    background-color: #fff;
    text-align: center;
  }
}
@media screen and (max-width: 966px) {
  .home {
      .menu {
      display: none;
    }
      .hot {
        .list {
        display: block;
        width: 96%;
          li {
          height: 200px;
          margin-top: 10px;
        }
      }
    }

      .home-box {
      background: url('../../assets/images/home/10.jpg') no-repeat ;
      background-size: 100% ;
      background-position: 100% 100%;
        .home-box-about {
          .box-about {
          width: 100px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>