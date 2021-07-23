<template>
  <div class="login-container">
    <!-- 登录标题 -->
    <div class="title-container">
      <h3 class="title">小巴酒店后台登录系统</h3>
    </div>
    <!-- 登录页面 -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="logo">
        <img src="../../assets/logo/logo.png" alt="" />
      </div>
      <!-- 选择登录的用户类型 -->
      <div class="userType">
        <el-select
          v-model="loginType"
          placeholder="请选择登录类型"
          @change="changeLoginType()"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 登录用户名输入框 -->
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model.number="loginForm.account"
          placeholder="请输入账号"
          name="account"
          type="text"
          clearable
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 登录密码输入框 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          clearable
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType == 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 商家登录时的短信验证码登录框 -->
      <el-form-item
        prop="verifyCode"
        style="width: 56%"
        v-if="showVerificationCode"
      >
        <span class="svg-container">
          <i class="el-icon-message"></i>
        </span>
        <el-input
          ref="verifyCode"
          v-model="loginForm.verifyCode"
          type="text"
          tabindex="3"
          class="VerificationCode"
          placeholder="请输入验证码"
        >
        </el-input>
        <el-button
          plain
          class="sendMessage"
          @click="sendMessage"
          :disabled="sendBtn"
        >
          <span v-if="!sendMsgDisabled">获取验证码</span>
          <span v-if="sendMsgDisabled">{{ codeTime + "秒后获取" }}</span>
        </el-button>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
    <!-- 员工登录时，如果有多家酒店关联时，需要选择 -->
    <div></div>
  </div>
</template>

<script>
import { bizLogin,passReset,userLogin} from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单数据
      loginForm: {
        account: "13122222222",   // 13122222222     //13353221241
        password: "123456",
        verifyCode: "00000",
      },
      // 登录验证规则
      loginRules: {
        // const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        account: [
          {
            required: true,
            trigger: "blur",
            message: "请输入要登录的手机号码！",
          },
          {
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            trigger: "blur",
            message: "请输入正确的手机号码！",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入登录密码" },
        ],
        verifyCode: [
          { required: true, trigger: "blur", message: "请输入验证码" },
          { pattern: /^[0-9]{6}$/,trigger: "blur",message: "请输入6位的数字验证码",},
        ],
      },
      // 验证码显示控制
      showVerificationCode: true,
      passwordType: "password",
      loginType: "商家登录",
      sendBtn: false,
      sendMsgDisabled: false,
      codeTime: 59,
      codeInterval: null,
      options: [
        {
          value: "商家登录",
          label: "商家登录",
        },
        {
          value: "员工登录",
          label: "员工登录",
        },
      ],
    };
  },
  methods: {
    changeLoginType() {
      if (this.loginType == "商家登录") {
        this.showVerificationCode = true;
        this.loginForm = {}
      } else if (this.loginType == "员工登录") {
        this.showVerificationCode = false;
        this.loginForm = {}
      }
    },
    showPwd() {
      if (this.passwordType == "password") {
        this.passwordType = " ";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    sendMessage() {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (this.loginForm.account != '' && this.loginForm.password != "" && reg.test(this.loginForm.account)){
        this.sendBtn = true;
        this.sendMsgDisabled = true;
        if (this.codeTime > 0) {
            this.codeInterval = setInterval(() => {
            this.codeTime--;
            if (this.codeTime <= 0) {
              clearInterval(this.codeInterval);
              this.codeInterval = null;
              this.sendBtn = false;
              this.sendMsgDisabled = false;
              this.codeTime = 59;
            }
          }, 1000);
        }
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          if(this.showVerificationCode){
        //  const data1 =  await passReset (this.loginForm)
           const res =  await bizLogin(this.loginForm);
          this.$message.success('登录成功~')
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push({ path: this.redirect || '/' })
          }
          if(!this.showVerificationCode){
         const data1 =  await passReset (this.loginForm)
          // const res = await userLogin(this.loginForm)
          //   this.$router.push({ path: this.redirect || '/' })
          }
        } else {
          console.log('error submit!!')
          return false
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
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // background-color: #fff !important;
  // background-image: "../../assets/logo/img_bg_l.png"!important;
  position: relative;
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
      color: black;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }
  .VerificationCode {
    width: 50%;
  }
  .el-form-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: $light_gray;
    border-radius: 5px;
    color: #454545;
    margin-bottom: 30px;
    .el-form-item__error {
      color: red;
      font-size: 17px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/logo/img_bg_l.png");
  background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center;
  background-size: 100%;
  overflow: hidden;
  .userType {
    position: absolute;
    top: 5%;
    right: 0%;
    width: 200px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    color: black;
    cursor: pointer;
    line-height: 50px;
  }
  .login-form {
    position: relative;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgb(0 0 0 / 10%);
    -webkit-box-shadow: 0px 0px 15px rgb(0 0 0 / 10%);
    max-width: 100%;
    padding: 90px 35px 0;
    margin: 0 auto;
    width: 37%;
    height: 100%;
    margin-top: 10%;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    margin-top: 5%;
    .title {
      font-size: 35px;
      color: black;
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
  .sendMessage {
    position: absolute;
    width: 110px;
    top: 6px;
    right: -172px;
    background-color: #2d3a4b;
    color: #fff;
  }
  .logo {
    position: absolute;
    top: 0%;
    left: 43%;
  }
}
</style>
