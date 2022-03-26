<template>
  <div class="login-box">
    <div class="login ">
      <h2 class="login-title"> {{type === 1? '登录': '注册'}}</h2>
      <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" show-password></el-input>
        </el-form-item>

      </el-form>
        <el-button
          type="primary"
          @click="handleClick(1)"
          :disabled="submitDisabled"
          class="login-btn">登录</el-button>
          <el-button
          @click="handleClick(2)"
          :disabled="submitDisabled"
          class="login-btn">注册</el-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { ElMessage } from 'element-plus'
  export default {
    name: "Login",
    inject:['reload'] ,
    data(){
      return {
        /**1: 登录 2: 注册 */
        type: 1,
        //表单数据
        form :{
          user : "",
          pwd : "",
          // checkPwd : "",
          svgCode : ""
        },
        submitDisabled:false,
        //表单验证
      
      }
    },

    methods : {
      handleClick(type) {
        this.type = type
        this.type === 1? this.isLogin(): this.isRegister()
      },
      async isLogin() {
        const res = await login(this.form)
        if( !res.code) {
          ElMessage.success('登录成功')
        }
      },
      isRegister() {
        ElMessage.warning('敬请期待')
      }
    },

    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style lang="scss">

  .login-box {
    width: 100%;
    height: 900px;
    background: darkcyan;
    // background: url("../../assets/images/5.png") no-repeat;
    background-position: 100%   100%;
    background-size: 100% 100%;
    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 350px;
      padding: 40px 20px;
      text-align: center;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, .53);
      & .login-title {
        text-align: center;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #aaa;

      }
      .el-form{
        user-select: none;
        padding-right: 30px;

        .vcode{
          .el-input{
            float: left;
            width: 35%;
          }
          div.svg{
            float: left;
            width: 35%;
            height: 40px;
            // /deep/ svg{
            //   width: 100% !important;
            //   height: 100% !important;
            // }
          }
          .el-link{
            font-size: 12px;
          }
        }
      }
      & .login-btn {
        // width: 240px;
        
        // text-align: center;
      }
    }
  }
  @media screen and (max-width: 966px)  {
    .login-box {
      height: 600px;
      .login {
        .dialog-login {
          width: 100%;
        }
      }
    }
  }
</style>
