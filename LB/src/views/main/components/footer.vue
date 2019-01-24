<template>
  <div class="footer">
    <div class="footer-wrapper width">
      <div class="description clear-fix">
        <a href="javascript:;">
          <img :src="logoZh" alt="logoZh">
        </a>
        <span>本平台的经营理念是创造顶尖的游戏体验，配备最优质的游艺环境、最严谨的金流控管，向顾客呈现最佳的网上娱乐。</span>
      </div>
      <div class="menus clear-fix">
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">平台公告</a>
        <a href="javascript:;">消息管理</a>
        <a href="javascript:;">线上客服</a>
      </div>
      <div class="icons">
        <a href="javascript:;">
          <img :src="qqIcon" alt="qqIcon">
        </a>
        <a href="javascript:;">
          <img :src="wxIcon" alt="wxIcon">
        </a>
        <a href="javascript:;">
          <img :src="txIcon" alt="txIcon">
        </a>
        <a href="javascript:;">
          <img :src="wbIcon" alt="txIcon">
        </a>
      </div>
      <div class="home-footer">
        <a href="javascript:;">
          <img :src="logoZh" alt="logoZh">
        </a>
        <p>Copyright ⓒ 2013-2018 System All Rights Reserved</p>
        <a href="javascript:;">
          <img :src="logoEn" alt="logoEn">
        </a>
        <p>The best online gaming system provider in the world !</p>
      </div>
    </div>
  </div>
</template>

<script>
import logoZh from '../../../statics/img/footer_logo.png'
import logoEn from '../../../statics/img/home_logo_EN.png'
import qqIcon from '../../../statics/img/ic_QQ_footer.png'
import txIcon from '../../../statics/img/ic_tx_footer.png'
import wbIcon from '../../../statics/img/ic_wb_footer.png'
import wxIcon from '../../../statics/img/ic_wx_footer.png'
export default {
  data () {
    return {
      logoZh,
      logoEn,
      qqIcon,
      txIcon,
      wbIcon,
      wxIcon
    }
  }
}
</script>

<style scoped>
  .footer {
    width: 100%;
    height: 222px;
    background-color: #262732;
  }
  .footer-wrapper {
    position: relative;
  }
  .description {
    height: 57px;
    padding-left: 8px;
    line-height: 57px;
  }
  .description a {
    display: inline-block;
    line-height: 57px;
  }
  .description a img{
    vertical-align: middle;
  }
  .description span {
    font-size: 12px;
    letter-spacing: .5px;
    color: #8d8d8e;
    vertical-align: sub;
    margin-left: 9px;
  }
  .menus {
    height: 55px;
    line-height: 55px;
  }
  .menus a {
    color: #939393;
    float: left;
    position: relative;
    margin-left: 15px;
    padding-right: 9px;
  }
  .menus a::after {
    content: '';
    display: block;
    position: absolute;
    width: 1px;
    height: 13px;
    right: 0;
    top: 50%;
    background-color: #939393;
    transform: translateY(-50%);
  }
  .menus a:nth-last-of-type(1)::after {
    content: '';
    display: none;
  }
  .icons {
    padding-left: 13px;
  }
  .home-footer {
    margin-top: 19px;
    padding-left: 8px;
  }
  .home-footer p {
    margin: 0 20px 0 9px;
    color: #939393;
  }
  .home-footer img {
    vertical-align: middle;
  }
  .home-footer > * {
    display: inline-block;
  }
</style>
