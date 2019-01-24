<template>
  <div class="register">
    <div class="register-header">
      <div class="header-inner width">
        <a href="javascript:;" @click="$router.push('/index')">
          <img :src="logoImg" alt="logoImg">
        </a>
        <div class="btns">
          <router-link :to="{ name: 'download' }">下载中心</router-link>
          <a @click="openNewCustomerServiceWindow" href="javascript:;">在线客服</a>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="input-box">
        <h3>注册会员</h3>
        <el-form :model="registerInfo"
                 :ref="`registerForm`"
                 :rules="registerFormRules"
                 class="register-form"
                 label-position="left"
                 label-width="80px">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="registerInfo.username"
                      placeholder="6-16位字符，可使用字母或数字"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="registerInfo.password"
                      type="password"
                      placeholder="6-16位字符，可使用字母或数字"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="passwordPre">
            <el-input v-model="registerInfo.passwordPre"
                      type="password"
                      placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码"
                        prop="verificationCode">
            <el-input v-model="registerInfo.verificationCode"
                      class="verification-code"
                      type="text"
                      placeholder="验证码"></el-input>
            <span class="verification-code-wrapper"
                  @click="getVerificationCodeHTML">
               <img   :src="verificationCodeHTML"/>
            </span>
          </el-form-item>
        </el-form>
        <a class="register-now" href="javascript:;" @click="register">立即注册</a>
        <router-link to="/main/index">使用已有账号登录</router-link>
      </div>
      <p>本平台采不同于行业常见的软件随机数生成办法，所以本平台不存在暗箱操作， 无法操控最终开奖结果，实现与公彩相同，甚至更公平公正的开奖结果!</p>
    </div>
    <div class="platform-features">
      <ul class="width clear-fix">
        <li>
          <img :src="goodIcon" alt="goodIcon">
          <h4>购彩保障</h4>
          <p>本平台根据官方开奖号码进行开奖，奖金自动派发，用户可随时在本站对帐户中的资金进行提现</p>
        </li>
        <li>
          <img :src="safetyIcon" alt="safetyIcon">
          <h4>隐私安全</h4>
          <p>本平台正确处理用户提供的私人信息。我们是用户个人信息的唯一拥有者，不会奖资料提供给、遗弃或出信给任何第三方。</p>
        </li>
        <li>
          <img :src="computerIcon" alt="computerIcon">
          <h4>接口技术</h4>
          <p>HTML5及EWD技术已成熟被运用在本平台各项产品中，充分提升产品跨平台的浏览与操作流畅度，提供使用者更进阶的游戏体验。</p>
        </li>
      </ul>
    </div>
    <player-count></player-count>
    <main-footer></main-footer>
  </div>
</template>

<script>
import playerCount from '../../components/playerCount/playerCount'
import { doRegister, LinkCreateUser } from '@/api/register/register'
import { GetCaptcha } from '@/api/activity/activity'
import { openNewCustomerServiceWindow } from '../../util/common'
import { mapGetters } from 'vuex'

import mainFooter from '../../views/main/components/footer_18_8_29'
import logoImg from '../../statics/img/header_logo_18_8_29.png'
import goodIcon from '../../statics/img/good_icon_register.png'
import safetyIcon from '../../statics/img/safety_register_icon.png'
import computerIcon from '../../statics/img/computer_register_icon.png'

let isGettingVerificationCode = false
export default {
  components: { playerCount, mainFooter },
  data () {
    const checkPasswordPre = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      const regPasswordIsSame2a = /([A-Za-z0-9])\1{2,}/g
      if (value === this.registerInfo.username) {
        callback(new Error('密码不能和账号一致'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
        callback(new Error('必须是6-16位数字与字母的组合'))
      } else if (regPasswordIsSame2a.test(value)) {
        callback(new Error('不能出现连续三位相同的字符'))
      } else {
        callback()
      }
    }
    return {
      logoImg,
      goodIcon,
      safetyIcon,
      computerIcon,

      registerInfo: {
        username: '',
        password: '',
        passwordPre: '',
        verificationCode: ''
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16位之间', trigger: 'blur' }
        ],
        passwordPre: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPasswordPre, trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '请输入5位数验证码', trigger: 'blur' }
        ]
      },
      verificationCodeHTML: ''
    }
  },
  computed: {
    ...mapGetters([
      'customerServiceInfo'
    ])
  },
  methods: {
    register () {
      this.$refs[`registerForm`].validate((valid) => {
        if (valid) {
          const { username, password, verificationCode } = this.registerInfo
          const confirmPassword = this.registerInfo.passwordPre
          const isProxyRegister = this.$route.query
          if (isProxyRegister && isProxyRegister.key) {
            LinkCreateUser(username, password, confirmPassword, isProxyRegister.key, verificationCode)
              .then(res => {
                if (res.errno === 0) {
                  this.$message_box('注册成功,3秒后跳转到首页', '提示').catch(() => {})
                  setTimeout(() => {
                    this.$message_box.close()
                    this.$router.push('index')
                  }, 3000)
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(function (error) {
                console.log(error)
              })
          } else {
            doRegister(username, password, confirmPassword, verificationCode)
              .then(res => {
                if (res.errno === 0) {
                  this.$message_box('注册成功,3秒后跳转到首页', '提示').catch(() => {})
                  setTimeout(() => {
                    this.$message_box.close()
                    this.$router.push('index')
                  }, 3000)
                } else {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(function (error) {
                console.log(error)
              })
          }
        }
      })
    },
    getVerificationCodeHTML () {
      if (isGettingVerificationCode) return
      isGettingVerificationCode = true
      GetCaptcha()
        .then(res => {
          if (res.errno === 0) this.verificationCodeHTML = res.data.src
          isGettingVerificationCode = false
        })
        .catch(err => {
          console.log(err)
          isGettingVerificationCode = false
        })
    },
    openNewCustomerServiceWindow () {
      openNewCustomerServiceWindow()
    }
  },
  created () {
    this.getVerificationCodeHTML()
    if (!this.customerServiceInfo) this.$store.dispatch('getCustomerServiceInfo')
  }
}
</script>

<style scoped>
  .verification-code-wrapper {
    float: left;
    height: 34px;
    margin-left: 10px;
  }
  .verification-code-wrapper > img {
    height: 100%;
  }
  .register-header {
    background-color: #262732;
  }
  .register-header .header-inner {
    height: 84px;
    line-height: 84px;
  }
  .register-header .header-inner > a {
    float: left;
    height: 84px;
    line-height: 84px;
  }
  .register-header .header-inner > .btns {
    float: right;
  }
  .register-header .header-inner > .btns a {
    font-size: 14px;
    color: #bfbfbf;
  }
  .register-header .header-inner > .btns a:nth-of-type(1) {
    font-size: 14px;
    padding-right: 12px;
    border-right: 1px solid #bfbfbf;
    margin-right: 12px;
    color: #bfbfbf;
  }
  .register-header .header-inner > a > img{
    vertical-align: middle;
    width: 100%;
  }
  /* ----------------------*/
  .content {
    height: 603px;
    background: url("../../statics/img/register_content_bg.jpg") no-repeat 0 0;
    padding-top: 45px;
  }
  .content .input-box {
    width: 460px;
    background-color: #efefef;
    margin: 0 auto;
    border-radius: 5px;
    padding: 25px;
  }
  .content .input-box h3 {
    font-size: 22px;
    color: #655f8b;
    font-weight: normal;
    padding-bottom: 21px;
    margin-bottom: 20px;
    border-bottom: 1px solid #d1d7dc;
  }
  .content .input-box .form-item {
    height: 34px;
    line-height: 34px;
    margin-bottom: 22px;
  }
  .content .input-box .form-item label {
    display: inline-block;
    width: 72px;
    text-align: left;
    color: #655f76;
    font-size: 13px;
  }
  .content .input-box .form-item input {
    width: 324px;
    height: 34px;
    line-height: 34px;
    padding-left: 12px;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
  .content .input-box > a.register-now {
    display: block;
    width: 100%;
    text-align: center;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #fff;
    background-color: #18889f;
    border-radius: 5px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .content .input-box > a:nth-of-type(2) {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 13px;
    text-decoration: underline;
    color: #484848;
  }
  .content > p {
    margin: 45px auto 0 auto;
    text-align: center;
    line-height: 38px;
    font-size: 24px;
    color: #fff;
    width: 850px;
  }
  /* -----------------------------*/
  .platform-features {
    background-color: #fff;
  }
  .platform-features > ul {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .platform-features > ul > li {
    position: relative;
    padding-left: 65px;
    width: 30%;
  }
  .platform-features > ul > li > img {
    position: absolute;
    left: 0;
    /*top: 28px;*/
  }
  .platform-features > ul > li > h4 {
    font-size: 18px;
    color: #000;
    margin-bottom: 5px;
  }
  .platform-features > ul > li > p {
    line-height: 20px;
    font-size: 14px;
    color: #858585;
  }
</style>
<style>
  .register-form input[type="text"],
  .register-form input[type="password"] {
    height: 34px;
    line-height: 34px;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
  .register-form .el-form-item__content,
  .register-form .el-form-item__label {
    line-height: 34px;
  }
  /* 验证码输入框样式调整 begin */
  .verification-code {
    float: left;
    width: 90px!important;
  }
  .verification-code > input[type="text"] {
    width: 100%;
  }
  /* 验证码输入框样式调整 end */

  @media screen and (min-width:768px) and (max-width:991px){
    .register .content > p{
      width: 80%;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 767px) {
    .register .content > p{
      width: 80%;
      font-size: 16px;
      line-height: 24px;
    }
    .register .platform-features > ul > li{
      width: 70%;
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }
  @media screen and (max-width: 520px){
    .register .content .input-box{
      width: 90%;
    }
    .register .content .input-box .el-form .el-form-item .el-form-item__content{
      margin-left: 0 !important;
    }
    .register-header .header-inner > a{
      width: 100px;
    }
  }
</style>
