<template>
    <div class="ssc_2_content main-width">
      <div class="ssc_2_tabs clear-fix">
        <ul class="clear-fix">
          <li>
            <a href="javascript:;">五星</a>
          </li>
          <li>
            <a href="javascript:;">四星</a>
          </li>
          <li>
            <a href="javascript:;">前三</a>
          </li>
          <li>
            <a href="javascript:;">中三</a>
          </li>
          <li class="now-hov">
            <a href="javascript:;">后三</a>
          </li>
          <li>
            <a href="javascript:;">二星</a>
          </li>
          <li>
            <a href="javascript:;">定位胆</a>
          </li>
          <li>
            <a href="javascript:;">大小单双</a>
          </li>
          <li>
            <a href="javascript:;">任选</a>
          </li>
          <li>
            <a href="javascript:;">龙虎</a>
          </li>
          <li>
            <a href="javascript:;">棋牌</a>
          </li>
        </ul>
        <div class="is-pankou">
          <a href="javascript:;">
            盘口
            <span class="ball"></span>
          </a>
        </div>
      </div>
      <div class="ssc-container">
        <div class="tabs clear-fix">
          <span class="label">直选</span>
          <ul class="clear-fix">
            <li class="tab-item now-hov">
              <a href="javascript:;">直选复式</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选单式</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">后三组合</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选跨度</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选和值</a>
            </li>
          </ul>
        </div>
        <div class="tabs clear-fix">
          <span class="label">组选</span>
          <ul class="clear-fix">
            <li class="tab-item">
              <a href="javascript:;">直选复式</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选单式</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">后三组合</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选跨度</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选和值</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选跨度</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选和值</a>
            </li>
          </ul>
        </div>
        <div class="tabs clear-fix">
          <span class="label">特殊</span>
          <ul class="clear-fix">
            <li class="tab-item">
              <a href="javascript:;">直选复式</a>
            </li>
            <li class="tab-item">
              <a href="javascript:;">直选单式</a>
            </li>
          </ul>
        </div>
        <p class="description">从百位、十位、个位各选一个号码组成一注。投注方案：345，开奖号码：345，即中后三直选。</p>
        <ul class="number-show">
          <li class="clear-fix">
            <span>百位</span>
            <ul class="number-list clear-fix">
              <li v-for="item in 10" :key="item">
                <a href="javascript:;">{{item - 1}}</a>
              </li>
            </ul>
            <ul class="type-list clear-fix">
              <li>
                <a href="javascript:;">全</a>
              </li>
              <li>
                <a href="javascript:;">大</a>
              </li>
              <li>
                <a href="javascript:;">小</a>
              </li>
              <li>
                <a href="javascript:;">奇</a>
              </li>
              <li>
                <a href="javascript:;">偶</a>
              </li>
              <li>
                <a href="javascript:;">清</a>
              </li>
            </ul>
          </li>
          <li class="clear-fix">
            <span>十位</span>
            <ul class="number-list clear-fix">
              <li v-for="item in 10" :key="item">
                <a href="javascript:;">{{item - 1}}</a>
              </li>
            </ul>
            <ul class="type-list clear-fix">
              <li>
                <a href="javascript:;">全</a>
              </li>
              <li>
                <a href="javascript:;">大</a>
              </li>
              <li>
                <a href="javascript:;">小</a>
              </li>
              <li>
                <a href="javascript:;">奇</a>
              </li>
              <li>
                <a href="javascript:;">偶</a>
              </li>
              <li>
                <a href="javascript:;">清</a>
              </li>
            </ul>
          </li>
          <li class="clear-fix">
            <span>个位</span>
            <ul class="number-list clear-fix">
              <li v-for="item in 10" :key="item">
                <a href="javascript:;">{{item - 1}}</a>
              </li>
            </ul>
            <ul class="type-list clear-fix">
              <li>
                <a href="javascript:;">全</a>
              </li>
              <li>
                <a href="javascript:;">大</a>
              </li>
              <li>
                <a href="javascript:;">小</a>
              </li>
              <li>
                <a href="javascript:;">奇</a>
              </li>
              <li>
                <a href="javascript:;">偶</a>
              </li>
              <li>
                <a href="javascript:;">清</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="betting-adjustment">
          <div class="multiple">
            <span>倍</span>
            <el-input-number style="width: 104px;" size="mini" v-model="count" :min="1" :max="10"></el-input-number>
          </div>
          <div class="count">
            <el-select size="mini" v-model="count" placeholder="">
              <el-option label="2元" :value="2"></el-option>
              <el-option label="5元" :value="5"></el-option>
              <el-option label="10元" :value="10"></el-option>
            </el-select>
          </div>
          <div class="detail-show">
            <span class="choice-count">已选 <i>0</i> 注</span>
            <span class="betting-count">共 <i>0.00</i> 元</span>
          </div>
          <div class="odds-choice">
            <el-select size="mini" v-model="odds" placeholder="">
              <el-option label="2元" :value="2"></el-option>
              <el-option label="5元" :value="5"></el-option>
              <el-option label="10元" :value="10"></el-option>
            </el-select>
          </div>
          <div class="chasing-number">
            <a href="javascript:;">立即追号
              <img :src="chasingIcon" alt="chasingIcon">
            </a>
          </div>
        </div>
        <div class="btns">
          <a href="javascript:;">立即投注
            <img :src="determineBet" alt="determineBet">
          </a>
          <a href="javascript:;">加入购物篮
            <img :src="shopCarIcon" alt="shopCarIcon">
          </a>
        </div>
      </div>
      <betting-record></betting-record>
    </div>
</template>

<script>
import chasingIcon from '../../statics/img/chasing_icon.png'
import determineBet from '../../statics/img/determine_bet_white.png'
import shopCarIcon from '../../statics/img/shopping_car_icon.png'
import bettingRecord from '../betting-record/betting-record'
export default {
  components: { bettingRecord },
  name: 'ssc_2',
  data () {
    return {
      chasingIcon,
      shopCarIcon,
      determineBet,
      count: 2,
      odds: 5
    }
  }
}
</script>

<style scoped>
  .ssc_2_content {
    margin-top: 10px;
  }
  .ssc_2_tabs {
    line-height: 40px;
    background-color: #cbcbcb;
  }
  .ssc_2_tabs > ul {
    float: left;
  }
  .ssc_2_tabs > ul > li {
    float: left;
    width: 73px;
  }
  .ssc_2_tabs > ul > li.now-hov {
    background-color: #ededed;
    position: relative;
  }
  .ssc_2_tabs > ul > li.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    width: 71px;
    height: 2px;
    top: -5px;
    background-color: #b8ad8c;
    border-top: 1px solid #ededed;
    border-right: 1px solid #e3e1db;
    border-bottom: 2px solid #ededed;
    border-left: 1px solid #d6d1c3;
  }
  .ssc_2_tabs > ul > li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: #3f3f3f;
  }
  .ssc_2_tabs .is-pankou {
    float: right;
    position: relative;
    margin-right: 23px;
    margin-top: 9px;
    width: 85px;
    height: 25px;
  }
  .ssc_2_tabs .is-pankou a {
    float: right;
    text-indent: 16px;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("../../statics/img/game_nav_is_official_bg.png") no-repeat 0 0;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    font-size: 12.5px;
    letter-spacing: 2px;
  }
  .ssc_2_tabs .is-pankou::after {
    content: '';
    display: block;
    position: absolute;
    background: url("../../statics/img/game_nav_is_official_ball.png") no-repeat 0 0;
    width: 24px;
    height: 26px;
    top: 0;
    left: 0;
  }
  .ssc-container {
    background-color: #ededed;
    padding: 21px 75px 17px 32px;
  }
  .ssc-container > .tabs .label {
    float: left;
    font-size: 13px;
    margin-right: 28px;
    line-height: 24px;
    color: #818181;
  }
  .ssc-container > .tabs > ul {
    float: left;
  }
  .ssc-container > .tabs {
    margin-top: 10px;
  }
  .ssc-container > .tabs:nth-of-type(1) {
    margin-top: 0;
  }
  .ssc-container > .tabs > ul > li {
    float: left;
    width: 78px;
    height: 24px;
    background-color: #ffffff;
    margin-right: 18px;
  }
  .ssc-container > .tabs > ul > li.now-hov {
    background-color: #aa9c73;
    border: 1px solid #e0ded6;
  }
  .ssc-container > div > ul > li.now-hov a {
    color: #faf9f7;
  }
  .ssc-container > .tabs > ul > li > a {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 13px;
    text-align: center;
    line-height: 22px;
    border: 1px solid #bebebe;
    border-radius: 1px;
    color: #777777;
  }
  .ssc-container > .description {
    font-size: 12px;
    color: #777777;
    margin-top: 13px;
  }
  .number-show {
    margin-top: 17px;
    padding-left: 30px;
  }
  .number-show > li {
    height: 73px;
    line-height: 73px;
  }
  .number-show > li:nth-of-type(1) {
    border-bottom: 1px dashed #e5e5e5;
  }
  .number-show > li:nth-of-type(2) {
    border-top: 1px dashed #d2d2d2;
    border-bottom: 1px dashed #d2d2d2;
  }
  .number-show > li:nth-of-type(3) {
    border-top: 1px dashed #e3e3e3;
  }
  .number-show > li > span {
    float: left;
    font-size: 13px;
    color: #342e2c;
    margin-right: 28px;
  }
  .number-show > li > .number-list {
    float: left;
  }
  .number-show > li > .number-list > li {
    float: left;
    margin-right: 22px;
  }
  .number-show > li > .number-list > li > a {
    display: inline-block;
    width: 35px;
    vertical-align: middle;
    height: 35px;
    background-color: #fefefe;
    box-shadow: 0 3px 4px #c8c8c8;
    border-radius: 50%;
    line-height: 35px;
    text-align: center;
    color: #342e2c;
    font-size: 25px;
    border: 1px solid #d8cdb6;
  }
  .number-show > li > .type-list {
    float: right;
  }
  .number-show > li > .type-list > li {
    float: left;
    margin-left: 8px;
  }
  .number-show > li > .type-list > li > a{
    display: inline-block;
    width: 27px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    vertical-align: middle;
    box-shadow: 0 3px 4px #c8c8c8;
    border: 1px solid #d8cdb6;
    font-weight: bold;
    font-size: 14px;
    color: #342e2c;
    border-radius: 50%;
  }
  .betting-adjustment {
    position: relative;
    margin-top: 28px;
    height: 30px;
    margin-bottom: 25px;
  }
  .betting-adjustment .multiple {
    position: absolute;
    width: 128px;
    height: 30px;
    left: 0;
    top: 0;
  }
  .betting-adjustment .multiple span {
    position: absolute;
    right: 4px;
    top: 50%;
    font-size: 14px;
    transform: translateY(-50%);
  }
  .betting-adjustment .count {
    position: absolute;
    width: 104px;
    height: 30px;
    left: 150px;
    top: 0;
  }
  .betting-adjustment .chasing-number {
    position: absolute;
    width: 103px;
    right: 0;
    top: 2px;
    height: 27px;
  }
  .betting-adjustment .chasing-number a {
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: #fff;
    line-height: 27px;
    padding-left: 16px;
    color: #777777;
    height: 100%;
  }
  .betting-adjustment .chasing-number img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 9px;
  }
  .betting-adjustment .odds-choice {
    width: 107px;
    height: 30px;
    position: absolute;
    top: 0;
    right: 109px;
  }
  .betting-adjustment .detail-show {
    width: 100%;
    font-size: 17.7px;
    color: #777777;
    line-height: 30px;
    text-align: center;
  }
  .betting-adjustment .detail-show i {
    font-size: 18px;
    font-style: normal;
    color: #a68f4c;
  }
  .betting-adjustment .betting-count i {
    font-size: 23px;
  }
  .ssc-container .btns{
    width: 363px;
    height: 42px;
    margin: 0 auto;
  }
  .ssc-container .btns a:nth-of-type(1){
    float: left;
    width: 165px;
    font-size: 18px;
    font-weight: bold;
    height: 100%;
    background-color: #c82727;
    line-height: 42px;
    text-align: center;
    color: #fff;
  }
  .ssc-container .btns a:nth-of-type(2){
    float: left;
    width: 165px;
    font-size: 18px;
    margin-left: 33px;
    height: 100%;
    background-color: #959595;
    line-height: 42px;
    text-align: center;
    color: #fff;
  }
</style>
