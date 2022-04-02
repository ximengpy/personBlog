<template>
  <div class="login-box">
    <div class="login ">
      <h2 class="login-title"> {{type === 1? '登录': '注册'}}</h2>
      <el-form
          ref="form"
          :model="login"
          label-width="80px"
          :rules="rules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="login.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="login.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item v-show="type === 2" label="验证码" prop="svgCode" class="vcode" >
          <div class="fcc">
            <el-input class="w_100" v-model="login.svgCode"></el-input>
            <p   @click="getVCode" :disabled="login.disabled" v-html="login.svgText"></p>
          </div>
          <!-- <el-link type="primary" @click="getVCode" :disabled="login.disabled">{{login.refreshText}}</el-link> -->
        </el-form-item>

      </el-form>
        <div>
          <el-button
          type="primary"
          @click="handleClick(1)"
          :disabled="submitDisabled"
          class="login-btn">登录</el-button>
          <el-button
          v-if="type === 1"
          @click="handleClick(2)"
          :disabled="submitDisabled"
          class="login-btn">注册</el-button>
          <el-button
          v-else
          @click="handleClick(3)"
          :disabled="submitDisabled"
          class="login-btn">确定注册</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import { login, getRegisterVcode ,postRegister } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { setCookie} from '@/utils/cookie'
import Global from '@/store/Global'
  export default {
    name: "Login",
    inject:['reload'] ,
    data(){
      return {
        /**1: 登录 2: 注册 */
        type: 1,
        //表单数据
        login :{
          user : "",
          pwd : "",
          // checkPwd : "",
          svgCode : "",
          svgText: '',
          refreshText: '刷新',
          disabled: false
        },
        submitDisabled:false,
        //表单验证
        rules: []
      
      }
    },
    methods : {
      handleClick(type) {
        
        switch(type) {
          case 1: this.isLogin(); break;
          case 2: this.isResiger(); break;
          case 3: this.toRegister(); break;
        }
      },
      async isLogin() {
        this.type = 1
        const res = await login(this.login)
        if( !res.code) {
          ElMessage.success('登录成功')
          setCookie('token', res.data.token)
          Global.updateUser()
        }
      },
      async toRegister() {
        const res = await postRegister(this.login)
        if( !res.code ) {
          ElMessage.success('注册成功')
          
        }
      },
      getVCode(){
        getRegisterVcode().then(res=>{
          clearTimeout(this.login.timer);
          let t = 0;
          let fn = ()=>{
            t += 1000;
            if (t > res.time){
              clearTimeout(this.login.timer);
              this.login.refreshText = "刷新";
            }else{
              this.login.refreshText = (((res.time - t)/1000)|0) + "s后可以刷新";
            }
          };
          this.login.timer = setInterval(fn,1000);
          fn();
          //更新图片
          this.login.svgText = res.data;
        });
      },
      isResiger() {
        this.type = 2
        this.getVCode()
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
    .w_100 {
      width: 100px !important;
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
