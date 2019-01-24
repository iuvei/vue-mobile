<template>
  <div class="top">
    <div class="width clear-fix">
      <div class="top-left">
        <img :src="speakerIcon" alt="speakerIcon">
        <span>亲爱的贵宾您好,谢谢您的配合。</span>
      </div>
      <div class="top-right">
        <div class="username">
          <input type="text" placeholder="用户名">
        </div>
        <div class="pwd">
          <input type="password" placeholder="密码">
        </div>
        <div class="code">
          <input type="text" placeholder="验证码">
        </div>
        <div class="code-img">
          <img :src="codeImg" alt="codeImg">
        </div>
        <div class="login">
          <a href="javascript:;">登陆</a>
        </div>
        <div class="register">
          <a href="javascript:;">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import speakerIcon from '../../../statics/img/speaker_icon.png'
import codeImg from '../../../statics/img/code_example.png'
export default {
  data () {
    return {
      speakerIcon,
      codeImg
    }
  }
}
</script>

<style scoped>
  .top {
    background-color: #ffd100;
    height: 37px;
    line-height: 37px;
  }
  .top-left {
    float: left;
    height: 37px;
  }
  .top-left > img {
    vertical-align: sub;
    margin-right: 7px;
  }
  .top-left > span {
    font-size: 14px;
    color: #8d856c;
    letter-spacing: .37px;
  }
  .top .top-right {
    float: right;
    height: 37px;
  }
  .top-right > div {
    float: left;
    height: 100%;
    border-left: 1px solid #b79605;
  }
  .top-right input {
    background-color: #ffd100;
    border: 1px solid #d6b624;
    font-size: 12px;
    text-align: center;
    height: 21px;
    color: #8d856c;
  }
  .top-right .username {
    padding: 0 4px 0 3px;
  }
  .top-right .username input {
    width: 89px;
  }
  .top-right .pwd {
    padding: 0 3px 0 4px;
  }
  .top-right .pwd input {
    width: 89px;
  }
  .top-right .code {
    padding: 0 5px;
  }
  .top-right .code input {
    width: 64px;
  }
  .top-right .code-img {
    padding: 0 6px;
  }
  .top-right .code-img img {
    vertical-align: middle;
    position: relative;
    top: -2px;
  }
  .top-right .login, .top-right .register {
    width: 60px;
    text-align: center;
  }
  .top-right .register {
    border-right: 1px solid #b79605;
  }
  .top-right .login > a, .top-right .register > a {
    font-size: 12px;
    color: #988c66;
  }
</style>
