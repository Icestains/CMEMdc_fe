<template>
  <div class="login-container">
    <el-form
      ref="signUpForm"
      :model="newUser"
      :rules="signUpRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">注册账号</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="newUser.name"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="newUser.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="newUser.repeatPassword"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="email"
          v-model="newUser.email"
          type="email"
          placeholder="Email"
          name="email"
          tabindex="2"
          auto-complete="on"
        />
        <!--        <span-->
        <!--          class="show-pwd"-->
        <!--          @click="showPwd">-->
        <!--          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>-->
        <!--        </span>-->
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin:0 0 30px 0;"
        @click.native.prevent="handleSignUp"
      >
        注册
      </el-button>

      <el-button
        type="primary"
        style="width:100%;margin:0 0 30px 0;"
        @click.native.prevent="handleLogin"
      >
        已有账号？立即登录
      </el-button>

      <!--      <div class="tips">-->
      <!--        <span style="margin-right:20px;">username: admin</span>-->
      <!--        <span> password: any</span>-->
      <!--      </div>-->

    </el-form>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import { Message } from 'element-ui'
  import { SignUp } from '@/api/user'

  export default {
    name: 'SignUp',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('至少六位密码'))
        } else {
          callback()
        }
      }
      return {
        newUser: {
          name: 'icestains',
          password: 'Masquerade',
          repeatPassword: 'Masquerade',
          email: 'ilichi@qq.com'
        },
        signUpRules: {
          name: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          repeatPassword: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          email: [{
            required: true,
            trigger: 'blur'
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      // $route: {
      //   handler: function(route) {
      //     this.redirect = route.query && route.query.redirect
      //   },
      //   immediate: true
      // }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$router.push({ path: this.redirect || '/' })
      },
      handleSignUp() {
        console.log('sign up')

        this.$refs.signUpForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log(this.newUser)
            const { name, password, repeatPassword, email } = this.newUser
            if (password !== repeatPassword) {
              Message({
                message: '两次密码不一致',
                type: 'error',
                duration: 5 * 1000
              })
            } else {
              console.log(name, password, repeatPassword, email)
              SignUp({
                name: name,
                password: password,
                email: email
              }).then(res => {
                console.log(res)
                Message({
                  message: '注册成功,五秒后跳转登录页面',
                  type: 'success',
                  duration: 5 * 1000
                })
                setTimeout(this.handleLogin, 5000)
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style
  lang="scss"
  scoped
>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
