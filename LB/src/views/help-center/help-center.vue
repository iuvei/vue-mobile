<template>
  <div>
    <top></top>
    <main-header></main-header>
    <div class="help-center">
      <div class="help-center-content width">
        <h3 class="help-center-title">
          帮助中心
        </h3>
        <div class="help-center-container">
          <ul class="help-center-types clear-fix">
            <li>
              <img :src="questionIcon1" alt="questionIcon1">
              <h4>充值问题</h4>
              <div class="questions">
                <a href="javascript:;">为什么充值未到账？</a>
                <a href="javascript:;">如何使用网银充值？</a>
                <a href="javascript:;">如何使用微信充值？</a>
                <a href="javascript:;">如何使用支付宝充值？</a>
              </div>
            </li>
            <li>
              <img :src="questionIcon2" alt="questionIcon2">
              <h4>提现问题</h4>
              <div class="questions">
                <a href="javascript:;">为什么提现未到账？</a>
                <a href="javascript:;">如何提现？</a>
                <a href="javascript:;">流水（销量）是什么？</a>
              </div>
            </li>
            <li>
              <img :src="questionIcon3" alt="questionIcon3">
              <h4>彩票问题</h4>
              <div class="questions">
                <a href="javascript:;">彩种介绍？</a>
                <a href="javascript:;">玩法介绍？</a>
                <a href="javascript:;">下注介绍？</a>
                <a href="javascript:;">中奖查询？</a>
              </div>
            </li>
            <li>
              <img :src="questionIcon4" alt="questionIcon4">
              <h4>彩票以外产品</h4>
              <div class="questions">
                <a href="javascript:;">如何开始游戏？</a>
                <a href="javascript:;">产品介绍？</a>
                <a href="javascript:;">相关问题</a>
              </div>
            </li>
            <li>
              <img :src="questionIcon5" alt="questionIcon5">
              <h4>新手专区</h4>
              <div class="questions">
                <a href="javascript:;">平台使用教学</a>
                <a href="javascript:;">如何修改密码、银行卡？</a>
                <a href="javascript:;">报表记录介绍</a>
                <a href="javascript:;">彩票投注分析介绍</a>
              </div>
            </li>
            <li>
              <img :src="questionIcon6" alt="questionIcon6">
              <h4>代理专区</h4>
              <div class="questions">
                <a href="javascript:;">如何推广</a>
                <a href="javascript:;">团队报表</a>
                <a href="javascript:;">用户设置</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <player-count></player-count>
    <main-footer></main-footer>
  </div>
</template>

<script>
import top from '../main/components/top_2018_8_29'
import mainHeader from '../main/components/header_18_8_29'
import mainFooter from '../main/components/footer_18_8_29'
import playerCount from '../../components/playerCount/playerCount'

import questionIcon1 from '../../statics/img/question_icon_1.png'
import questionIcon2 from '../../statics/img/question_icon_2.png'
import questionIcon3 from '../../statics/img/question_icon_3.png'
import questionIcon4 from '../../statics/img/question_icon_4.png'
import questionIcon5 from '../../statics/img/question_icon_5.png'
import questionIcon6 from '../../statics/img/question_icon_6.png'

export default {
  components: { top, mainHeader, mainFooter, playerCount },
  data () {
    return {
      questionIcon1,
      questionIcon2,
      questionIcon3,
      questionIcon4,
      questionIcon5,
      questionIcon6
    }
  }
}
</script>

<style scoped>
  .help-center {
    background-color: #38384a;
  }
  .help-center-content {}
  .help-center-content > h3.help-center-title {
    height: 90px;
    line-height: 90px;
    font-size: 24px;
    padding-left: 59px;
    background: url("../../statics/img/help_center_title_bg.jpg") no-repeat 0 0;
    background-size: 100% auto;
  }
  .help-center-container {
    height: 685px;
    padding: 56px 41px 29px 73px;
    background-color: #fff;
  }
  .help-center-container .help-center-types { }
  .help-center-container .help-center-types > li {
    float: left;
    width: 343px;
    position: relative;
    padding: 40px 78px 0 90px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .5);
    height: 269px;
    margin-bottom: 31px;
  }
  .help-center-container .help-center-types > li:nth-of-type(3n-1) {
    margin: 0 30px;
  }
  .help-center-container .help-center-types > li > img {
    position: absolute;
    top: 25px;
    left: 14px;
  }
  .help-center-container .help-center-types > li > h4 {
    font-size: 24px;
    font-weight: normal;
    padding-bottom: 11px;
    border-bottom: 1px solid #dddddd;
  }
  .help-center-container .help-center-types > li .questions > a {
    display: block;
    font-size: 15px;
    color: #939393;
    border-bottom: 1px solid #ececec;
    height: 43px;
    line-height: 43px;
  }
</style>
