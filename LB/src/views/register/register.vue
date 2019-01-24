<template>
  <div class="register">
    <h4>
      <a href="javascript:;">
        <img :src="homeLogo" alt="homeLogo">
      </a>
    </h4>
    <a class="register-text" href="javascript:;">
      <img :src="registerText" alt="registerText">
    </a>
    <div class="register-box">
      <h4>
        <img :src="teamIcon" alt="teamIcon">
        会员注册
      </h4>
      <div class="container">
        <input type="text" class="username" placeholder="用户名">
        <div class="tip username">6-16字符，可使用字母和数字</div>
        <input type="password" class="pwd" placeholder="密码">
        <div class="tip pwd">6-16字符，可使用字母和数字</div>
        <input type="password" class="rePwd" placeholder="确认密码">
        <div class="tip rePwd">请再次确认密码</div>
        <a class="register-now" href="javascript:;">立即注册</a>
      </div>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import homeFooter from '../home/components/footer'
import homeLogo from '../../statics/img/home_logo.png'
import registerText from '../../statics/img/reigster_text.png'
import teamIcon from '../../statics/img/team-icon.png'
export default {
  components: { homeFooter },
  data () {
    return {
      homeLogo,
      registerText,
      teamIcon
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .register {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url("../../statics/img/home_bg.jpg") no-repeat 0 0;
    background-size: 100% 100%;
  }
  .register h4 {
    text-align: center;
    margin: 20px 0 10px 0;
  }
  .register-text {
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  /*todo：闪烁问题优化*/
  .register-box {
    margin: 150px auto 0 auto;
    width: 484px;
    height: 500px;
    background-color: #ffffff;
    border: 1px solid #232323;
    border-radius: 10px;
    overflow: hidden;
  }
  .register-box > h4 {
    height: 84px;
    line-height: 84px;
    background-color: #eef3f6;
    text-align: left;
    padding-left: 28px;
    margin: 0;
    font-size: 27px;
    color: #505153;
    font-weight: normal;
    border-bottom: 1px solid #dcdedd;
  }
  .register-box > h4 > img {
    vertical-align: middle;
    margin-right: 12px;
  }
  .register-box .container {
    padding: 35px 33px 0 29px;
  }
  .register-box .container input {
    width: 100%;
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: #f7f7f7;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding-left: 40px;
    font-size: 15px;
  }
  .tip {
    position: relative;
    font-size: 16px;
    color: #b6b6b6;
    margin: 17px 0;
    padding-left: 5px;
  }
  .tip.username::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    top: -48px;
    left: 17px;
    background: url("../../statics/img/user_icon.png");
  }
  .tip.pwd::after, .tip.rePwd::after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    top: -48px;
    left: 17px;
    background: url("../../statics/img/lock_icon.png");
  }
  .register-now {
    display: inline-block;
    width: 100%;
    border-radius: 5px;
    background: url("../../statics/img/register_now_bg.png") no-repeat;
    height: 57px;
    line-height: 57px;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
  }
</style>
