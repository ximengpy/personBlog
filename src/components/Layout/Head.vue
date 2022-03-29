<template>
  <div :class="['web-nav-top', { 'web-nav-top-dark': activeItem.navDark }, {'web-nav-top-scroll': isScroll}]" @mouseleave="onLeave()">
    <div class="web-nav-top-wrap">
      <div class="web-content fvertical">
        <router-link to="/" class="nav-logo">
          <!-- <img class="type-1" src="@/assets/logo-opacity.png" alt="">
          <img class="type-2" src="@/assets/logo-default.png" alt=""> -->
        </router-link>
        <div class="web-nav-list f1 fwrap">
          <div class="web-nav-item" v-for="item in navList" :key="item.key" @mouseenter="onEnter(item)">
            <a class="fvertical" v-if="item.link" :href="item.link" :target="item.target || '_blank'">{{ item.title }}</a>
            <router-link :class="['fvertical', {'link-active': checkLinkActive(item)}]" v-else-if="item.path" :to="item.path">{{ item.title }}</router-link>
            <a class="fvertical" href="javascript:void(0)" v-else>{{ item.title }}</a>
          </div>
        </div>
        <div class="flex mgr_40">
          <!-- <a class="nav-option-text fcc" :href="doctorCloud" target="_blank">博士云</a> -->
          <router-link class="nav-option-btn fcc" to="/platform" v-show="isLogin">进入后台</router-link>
          <router-link class="nav-option-text fcc" to="/login" v-show="!isLogin">登录</router-link>
          <!-- <router-link class="nav-option-btn fcc mgl_20" to="/login?type=register" v-show="!isLogin">免费注册</router-link> -->
        </div>
      </div>
    </div>
    
    <transition name="slideY">
      <div class="web-nav-menu" v-show="showChildMenu">

        <div class="flex" v-if="hoverChild.childrenType === 'gird'">
          <div class="web-nav-menu-left fright">
            <div class="product fbetween fvertical">
              <span>{{ hoverChild.childrenTitle }}</span>
              <!-- <img class="icon" src="@/assets/web/icon-cloud.png" alt=""> -->
            </div>
          </div>
          <div class="web-nav-menu-right">
            <div class="web-nav-menu-item mgb_40" v-for="item in hoverChild.children" :key="item.key">
              <a v-if="item.link" :href="item.link" :target="item.target || '_blank'">
                <p class="web-nav-menu-item-title">{{ item.title }}</p>
                <p class="web-nav-menu-item-desc">{{ item.desc }}</p>
              </a>
              <router-link v-else :to="item.path">
                <p class="web-nav-menu-item-title">{{ item.title }}</p>
                <p class="web-nav-menu-item-desc">{{ item.desc }}</p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="web-content flex" v-if="hoverChild.childrenType === 'list'" style="padding-left: 142px">
          <div class="web-nav-menu-list" v-for="item in hoverChildList" :key="item.key">
            <div class="web-nav-menu-name">{{ item.title }}</div>
            <div class="web-nav-menu-item mgb_20" v-for="child in item.list" :key="child.key">
              <a v-if="child.link" :href="child.link" :target="child.target || '_blank'">
                <p class="web-nav-menu-item-title">{{ child.title }}</p>
                <p class="web-nav-menu-item-desc">{{ child.desc }}</p>
              </a>
              <router-link v-else :to="child.path">
                <p class="web-nav-menu-item-title">{{ child.title }}</p>
                <p class="web-nav-menu-item-desc">{{ child.desc }}</p>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </transition>

  </div>
</template>
<script>
import { useNavList } from '../../utils/hook';
// import { getToken } from '@/utils/authorization';
import config from '@/utils/config';

/**
 * 官网-导航组件
 */
export default {
  name: 'WebNav',
  components: {},
  data() {
    return {
      doctorCloud: config.doctorCloud,
      navList: useNavList(),
      isLogin: false,
      showChildMenu: false,
      /**
       * `hover`状态`item`信息
       * @type {NavItem}
       */
      hoverChild: {},
      /** 是否滚动超过顶部高度 */
      isScroll: false,
    }
  },
  computed: {
    activeItem() {
      const currentPath = this.$route.path;
      let info = {};
      for (let i = 0; i < this.navList.length; i++) {
        const item = this.navList[i];
        if (item.children && item.children.length > 0) {
          for (let j = 0; j < item.children.length; j++) {
            const child = item.children[j];
            if (child.path === currentPath) {
              info = child;
              break;
            }
          }
        } else {
          if (item.path === currentPath) {
            info = item;
            break;
          }
        }
      }
      return info;
    },
    hoverChildList() {
      let result = [];
      /** @type {NavItem} */
      const child = this.hoverChild;
      if (child.childrenType === 'list') {
        result = child.childrenTitle.map((title, index) => {
          return {
            key: `${child.key}-${index}`,
            title: title,
            list: child.children.filter(item => item.listGroup === index)
          }
        })
      }
      // console.log('hoverChildList >>', result);
      return result;
    }
  },
  mounted() {
    this.isLogin = false
    const THAT = this;
    function onScroll() {
      const rootNode = document.body.scrollTop === 0 ? document.documentElement : document.body;
      THAT.isScroll = rootNode.scrollTop > 70 + 17; // 17为滚动条的厚度
    }
    onScroll(); // 一开始要先执行，因为有可能一开始就处于页面非顶部
    window.addEventListener('scroll', onScroll);
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================
    /**
     * @param {NavItem} item
     */
    checkLinkActive(item) {
      const currentPath = this.$route.path;
      const path = item.path;
      if (item.children && item.children.length > 0) {
        return item.children.some(child => child.path === currentPath);
      } else {
        return path === currentPath;
      }
    },
    /**
     * @param {NavItem} item
     */
    onEnter(item) {
      if (item.childrenType && item.children && item.children.length > 0) {
        this.hoverChild = item;
        this.showChildMenu = true;
      } else {
        this.hoverChild = {};
        this.showChildMenu = false;
      }
    },
    onLeave() {
      this.showChildMenu = false;
    }
    // ==================================== 二、数据请求类 ================================

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
  beforeDestroy() {
    window.removeEventListener('scroll', onScroll);
  },
}
</script>
<style lang="scss">
@import "@/styles/theme.scss";

// 导航高亮状态
@mixin topActive {
  .nav-logo {
    display: block;
    .type-1 {
      display: none;
    }
    .type-2 {
      display: block;
    }
  }
  .web-nav-list {
    .web-nav-item {
      color: #262626;
      a {
        color: #262626;
      }
    }
  }
  .nav-option-text {
    color: #262626;
  }
  .nav-option-btn {
    color: #fff;
    background-color: $basecolor;
  }
}

// 鼠标移入状态
@mixin topHover {
  background-color: #fff;
  .web-nav-top-wrap {
    box-shadow: 0px 10px 20px 0px rgba(76,76,76,0.10);
  }
  @include topActive();
}

@mixin linkActive {
  color: $basecolor;
  &::after {
    width: 100%;
    left: 0%;
  }
}

.web-nav-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  z-index: 100;
  @include moveTime();
  &:hover {
    @include topHover();
  }
  .web-nav-top-wrap {
    width: 100%;
    height: 70px;
    position: relative;
    z-index: 99;
    @include moveTime();
  }
  .web-content {
    width: 100%;
    max-width: 1200px;
    min-width: 880px;
    height: 100%;
  }
  .nav-logo {
    width: 95px;
    margin-right: 50px;
    .type-1 {
      display: block;
    }
    .type-2 {
      display: none;
    }
  }
  
  .web-nav-list {
    height: 70px;
    font-size: 0;
    .web-nav-item {
      height: 100%;
      // @include moveTime();
      a {
        position: relative;
        height: 100%;
        font-size: 15px;
        color: #3a595e;
        @include moveTime();
        &::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          left: 50%;
          bottom: 0px;
          background-color: $basecolor;
          @include moveTime();
        }
        &:hover {
          @include linkActive();
        }
      }
      .link-active {
        @include linkActive();
      }
    }
    .web-nav-item + .web-nav-item {
      margin-left: 40px;
    }
  }
  
  .web-nav-menu {
    width: 100%;
    min-height: 214px;
    // padding-bottom: 20px;
    position: absolute;
    top: 70px;
    left: 0;
    z-index: 98;
    overflow: hidden;
    background: #fefefe;
    box-shadow: 0px 4px 10px 0px rgba(76,76,76,0.10);
    .web-nav-menu-left {
      position: relative;
      z-index: 2;
      background: #ffffff;
      width: calc(50% - 400px);
      min-width: 200px;
      box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.03);
      padding: 50px 30px 0 0;
      .product {
        width: 130px;
        height: 50px;
        background: linear-gradient(91deg,#256aff 1%, #45a3ff 99%);
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        padding: 0 16px;
        .icon {
          width: 22px;
          height: 22px;
        }
      }
    }
    .web-nav-menu-right {
      padding: 50px 0 0 70px;
      width: 700px;
      .web-nav-menu-item {
        display: inline-block;
        width: 310px;
      }
    }
    .web-nav-menu-list {
      padding: 30px 0 20px;
      width: 280px;
    }
    .web-nav-menu-list + .web-nav-menu-list {
      margin-left: 40px;
    }
    .web-nav-menu-name {
      color: #18181A;
      font-size: 16px;
      line-height: 1;
      padding-bottom: 10px;
      width: 100%;
      border-bottom: solid 1px #eee;
      margin-bottom: 20px;
    }
    .web-nav-menu-item {
      width: 100%;
      // position: relative;
      // &::before {
      //   content: "";
      //   position: absolute;
      //   top: -5px;
      //   left: -5px;
      //   width: calc(100% + 10px);
      //   height: calc(100% + 10px);;
      //   background-color: rgba(0,0,0,0.1);
      //   opacity: 0;
      //   border-radius: 2px;
      //   z-index: -1;
      //   @include moveTime();
      // }
      // &:hover {
      //   &::before {
      //     opacity: 1;
      //   }
      // }
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .web-nav-menu-item-title {
        font-size: 14px;
        color: #18181A;
        line-height: 18px;
        margin-bottom: 10px;
      }
      .web-nav-menu-item-desc {
        font-size: 12px;
        line-height: 14px;
        color: #7A8BA6;
      }
    }
  }

  .nav-option-btn, .nav-option-text {
    font-size: 14px;
    line-height: 1;
    height: 32px;
    color: #fff;
    padding: 0 10px;
    @include moveTime();
  }
  .nav-option-btn {
    width: 94px;
    height: 32px;
    border-radius: 2px;
    color: $basecolor;
    background-color: #fff;
  }
}
.web-nav-top-dark {
  @include topActive();
}
.web-nav-top-scroll {
  @include topHover();
}
</style>