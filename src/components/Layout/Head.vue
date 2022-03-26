<template>
  <div class="layout-header clearfix">
    <div class="logo">py's blog</div>
    <div class="nav clearfix">
      <ul :class="'nav-list'+ whichActive">
        <li v-for="(item, index) of navList" :key="index">
          <router-link :to='item.to'>{{ item.title }}</router-link>
        </li>
      </ul>
<!-- 
      <el-popover
          btn-group
          v-if="ifLogin"
          placement="top"
          width="150px"
          trigger="hover"
          popper-class = 'login-hov'>
        <p class="wel-login">欢迎登陆：{{login.user}}</p>
        <el-button
            type="primary"
            @click="ifShowAvatar = true"
            plain
            size="mini"
            class="btn"
        >
          修改头像
        </el-button>
            <el-button
          type="danger"
          @click="handleLogout"
          plain size="mini"
          class="btn"

        >退出登录
        </el-button>
        <br>

            <a href="javascript:;" slot="reference" class="img"
              :style="{
                overflow: 'hidden',
                position: 'absolute',
                display:'block',
                top: '9px',
                right: '232px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor:'pointer'
              }"
            ><img :src="login.photo" alt="" width="100%" height="100%"></a>
      </el-popover> -->

      <div class="btn-group" >
        <el-button  type="primary" @click="$router.push('/login')">登录</el-button>
        <el-button  type="success" @click="$router.push('/register')">注册</el-button>
      </div>

    </div>

      <!-- <el-dropdown trigger="click" @command="handleCommand" >
        <span class="el-dropdown-link">
          <img src="../../assets/images/icon-menu.png" class="el-icon-arrow-down el-icon--right">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in navList"
            :key="index"
            :command= item.to
            >
            {{item.title}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    <!-- <Avatar :dialogVisible="ifShowAvatar" @handleClose="closeAvatar" /> -->
  </div>
</template>
<script>
export default {
  components:{},
  data() {
    return {
      navList: [
        {
          to: '/',
          title: '首页'
        },
        {
          to: '/blog/0',
          title: '博客'
        },
        {
          to: '/message',
          title: '留言'
        },
        {
          to: '/dialy',
          title: '日记'
        },
        {
          to: '/work',
          title: '个人作品'
        },
        // {
        //   to: '/links',
        //   title: '友链'
        // },
        {
          to: '/about',
          title: '关于'
        }
      ],
    }
  },
  mounted() {
    
  },
  methods: {
    // ==================================== 一、逻辑类 ====================================

    // ==================================== 二、数据请求类 ================================

    // ==================================== 三、跳转类 ====================================

    // ==================================== 四、小工具类 ==================================
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme.scss";
.layout-header {
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 50px;
  height: $layoutHeaderHeight;
  background: $layoutHeaderBj;
  border-bottom: 1px solid #e8e9e7;
  z-index: 1000;
  .logo {
    width: 52%;
    height: $layoutHeaderHeight;
    line-height: $layoutHeaderHeight;
    color: #777;
    text-align: left;
    font-size: 40px;
    font-family: BarbaraHand;
  }
  .nav {
    display: flex;
    padding-right: 150px;
    ul{
      flex: 1;
      display: flex;
      width: 576px;
      margin-right: 75px;

      li {
        flex: 1;

        a {
          position: relative;
          display: block;
          height: $layoutHeaderHeight;
          line-height: $layoutHeaderHeight;
          color: #212220;
          font-weight: 400;
          font-size: 15px;
          transition: 0.3s;
          box-sizing: border-box;
          text-align: center;
          border-bottom: 2px solid #fff;
          transition: color .3s;

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            content: "";
            width: 0;
            height: 2px;
            margin: 0 auto;
            background-color: #cbc30d;
            transition:width .3s;
          }

          &:hover {
            color: #cbc30d;
            &::after{width: 100%}
          }
        }
      }
    }

    .btn-group {
      height: $layoutHeaderHeight;
      line-height: $layoutHeaderHeight;
      .el-button {
        padding: 9px 13px;
      }
    }
  }
  .nav-list0 li:nth-child(1),
  .nav-list1 li:nth-child(2),
  .nav-list2 li:nth-child(3),
  .nav-list3 li:nth-child(4),
  .nav-list4 li:nth-child(5),
  a {
    color: #6bc30d;
    a::after{
      width: 100%;
    }
  }
}
.login-hov {
  p,.btn{
    display: block;
    text-align: center;
    margin: 10px auto;
  }
}
@media screen and (min-width: 966px) {
  .layout-header {
    .el-dropdown {
      display: none;
    }
  }
}
@media screen and (max-width: 966px)  {
  .layout-header {
    & .logo {
      width: 37%;
    }
    & .nav {
      padding-right: 0;
    }
    & .nav > ul {
    display: none;
    }

    & .el-dropdown {
      position: absolute;
      top: -4px;
      right: 116px;
      margin-top: 17px;
      // line-height: 80px;
      ul {
        top: 40px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
}
</style>