<template>
    <div>
      <top></top>
      <main-header></main-header>
      <div class="game_1_main">
        <div class="game_1_main-info main-width">
          <ul class="clear-fix">
            <li>
              <a href="javascript:;">
                <img :src="cqsscLogo" alt="cqsscLogo">
              </a>
            </li>
            <li class="lottery-info clear-fix">
              <div class="lottery-info-left">
                <div>第 <i>20180608058</i> 期</div>
                <span>开奖时间</span>
              </div>
              <div class="lottery-info-right">
                00 : 00 : 00
              </div>
            </li>
            <li class="clear-fix">
              <div><i>20180608058</i>期</div>
              <div class="lottery-number clear-fix">
                <i class="lottery-number-item">8</i>
                <i class="lottery-number-item">7</i>
                <i class="lottery-number-item">7</i>
                <i class="lottery-number-item">7</i>
                <i class="lottery-number-item">4</i>
              </div>
              <div class="btns">
                <a href="javascript:;">开奖记录</a>
                <a href="javascript:;">最近五期</a>
              </div>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
      <main-footer></main-footer>
    </div>
</template>

<script>
import top from '../main/components/top_2018_8_29'
import mainHeader from '../main/components/header_18_8_29'
import mainFooter from '../main/components/footer_18_8_29'
import cqsscLogo from '../../statics/img/cqssc_logo.png'
export default {
  components: { top, mainHeader, mainFooter },
  data () {
    return {
      cqsscLogo
    }
  }
}
</script>

<style scoped>
  .lottery-number-item {
    float: left;
    width: 49px;
    font-style: normal;
    font-size: 32px;
    margin-top: 3px;
    color: #57576b;
    margin-right: 1px;
    height: 49px;
    line-height: 49px;
    text-align: center;
    background: url("../../statics/img/lottery-number-item-bg.png") no-repeat 0 0;
  }
  /*-----------------*/
  .game_1_main {
    background: url("../../statics/img/game_1_main_bg.jpg") no-repeat 0 -100px;
    padding-top: 17px;
    padding-bottom: 34px;
  }
  .game_1_main-info {}
  .game_1_main-info > ul {}
  .game_1_main-info > ul > li {
    float: left;
  }
  .game_1_main-info > ul > li:nth-of-type(1) {
    margin-right: 27px;
  }
  .game_1_main-info > ul > li:nth-of-type(2) {
    width: 342px;
    height: 60px;
    padding-top: 15px;
    padding-left: 8px;
    background-color: #23222d;
    border-radius: 5px;
    margin-top: 3px;
    color: #ffffff;
  }
  .game_1_main-info > ul > li:nth-of-type(2) .lottery-info-left {
    float: left;
    font-size: 12px;
    margin-right: 15px;
  }
  .game_1_main-info > ul > li:nth-of-type(2) .lottery-info-left i {
    font-style: normal;
    color: #b5a681;
  }
  .game_1_main-info > ul > li:nth-of-type(2) .lottery-info-left span {
    display: inline-block;
    margin-top: 6px;
  }
  .game_1_main-info > ul > li:nth-of-type(2) .lottery-info-right {
    float: left;
    letter-spacing: .75px;
    font-size: 36.15px;
  }
  .game_1_main-info > ul > li:nth-of-type(3) {
    float: right;
  }
  .game_1_main-info > ul > li:nth-of-type(3) > div {
    float: left;
  }
  .game_1_main-info > ul > li:nth-of-type(3) .btns {
    width: 70px;
  }
  .game_1_main-info > ul > li:nth-of-type(3) .btns a {
    display: inline-block;
    width: 100%;
    color: #ffffff;
    height: 25px;
    line-height: 25px;
    text-align: center;
    /*todo: 替换为带透明度的背景颜色*/
    background-color: #262732;
  }
  .game_1_main-info > ul > li:nth-of-type(3) .btns a:nth-last-of-type(1) {
    margin-top: 7px;
    border-radius: 2px;
  }
  .game_1_main-info > ul > li:nth-of-type(3) .lottery-number {
    margin-right: 14px;
  }
  .game_1_main-info > ul > li:nth-of-type(3) > div:nth-of-type(1) {
    display: inline-block;
    height: 24px;
    background-color: #24242e;
    color: #fff;
    line-height: 24px;
    text-align: center;
    border-radius: 2px;
    margin-top: 13px;
    margin-right: 11px;
    width: 97px;
  }
  .game_1_main-info > ul > li:nth-of-type(3) > div:nth-of-type(1) i {
    font-size: 12px;
    font-style: normal;
    color: #b5a681;
  }
</style>
