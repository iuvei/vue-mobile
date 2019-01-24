<template>
  <div>
    <div class="game-info width">
      <ul class="clear-fix">
        <li>
          <a href="javascript:;">
            <img :src="klsfLogo" alt="klsfLogo">
          </a>
        </li>
        <li>
          <div>第 <i>20180822012</i> 期</div>
          <p>开奖时间</p>
          <div class="time">
            <span class="hour">00</span>
            <i>:</i>
            <span class="minute">05</span>
            <i>:</i>
            <span class="second">28</span>
          </div>
        </li>
        <li>
          <div>第 <i>20180822012</i> 期</div>
          <p>开奖号码</p>
          <span class="number-ball">5</span>
          <span class="number-ball">6</span>
          <span class="number-ball">0</span>
          <span class="number-ball">4</span>
          <span class="number-ball">8</span>
        </li>
        <!--todo : 宽度待调整-->
        <li>
          <a href="javascript:;" @click="$router.push('/lotteryRecord')">
            开奖记录
            <img :src="trendIcon" alt="trendIcon">
          </a>
          <a @mouseenter="showRecentPeriodDetail"
             @mouseleave="hideRecentPeriodDetail"
             href="javascript:;">
            最近期数
            <img :src="nextIcon" alt="nextIcon">
          </a>
          <!--todo : 添加鼠标移入显示显示框的事件-->
          <div @mouseenter="showRecentPeriodDetail"
               @mouseleave="hideRecentPeriodDetail"
               v-show="recentPeriodDetailShow"
               class="recent_period_detail">
            <h4>最近期数</h4>
            <div class="recent_period_detail_container">
              <table>
                <tr>
                  <th>期号</th>
                  <th>开奖号码</th>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
                <tr>
                  <td>20180828031</td>
                  <td>
                    <span>6</span>
                    <span>8</span>
                    <span>7</span>
                    <span>0</span>
                    <span>2</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="qs clear-fix">
      <box-tabs :link-list="linkList_qs"></box-tabs>
      <div class="qs-left">
        <div class="choice-number-box-tabs clear-fix">
          <router-link v-for="link in menuList"
                       :style="{ 'width': ( 1/menuList.length ) * 100 + '%' }"
                       :key="link.id"
                       :to="link['name_en']"
                       href="javascript:;">{{link['name_cn']}}</router-link>
        </div>
        <router-view></router-view>
        <shopping-cart></shopping-cart>
        <div class="betting-record">
          <div class="betting-record-tabs clear-fix">
            <a class="now-hov" href="javascript:;">我的注单</a>
            <a href="javascript:;">追号方案</a>
            <a href="javascript:;">未开奖</a>
          </div>
          <table>
            <tr>
              <th style="width: 67px;">彩种</th>
              <th style="width: 80px;">玩法</th>
              <th style="width: 100px;">期号</th>
              <th style="width: 150px;">投注内容</th>
              <th style="width: 54px;">倍数</th>
              <th style="width: 46px;">注数</th>
              <th style="width: 110px;">注单金额</th>
              <th style="width: 95px;">中间金额</th>
              <th style="width: 70px;">注单状态</th>
              <th style="width: 74px;">操作</th>
            </tr>
            <tr>
              <td>重庆彩</td>
              <td>前三组选</td>
              <td>20180820032</td>
              <td><span>4567,4567,2121211111111111111111111111</span></td>
              <td>2</td>
              <td>15</td>
              <td>26,300.00</td>
              <td>300.00</td>
              <td>已结案</td>
              <td><a href="javascript:;">查看</a></td>
            </tr>
            <tr>
              <td>重庆彩</td>
              <td>前三组选</td>
              <td>20180820032</td>
              <td><span>4567,4567,2121211111111111111111111111</span></td>
              <td>2</td>
              <td>15</td>
              <td>26,300.00</td>
              <td>300.00</td>
              <td>已结案</td>
              <td><a href="javascript:;">查看</a></td>
            </tr>
            <tr>
              <td>重庆彩</td>
              <td>前三组选</td>
              <td>20180820032</td>
              <td><span>4567,4567,2121211111111111111111111111</span></td>
              <td>2</td>
              <td>15</td>
              <td>26,300.00</td>
              <td>300.00</td>
              <td>已结案</td>
              <td><a href="javascript:;">查看</a></td>
            </tr>
            <tr>
              <td>重庆彩</td>
              <td>前三组选</td>
              <td>20180820032</td>
              <td><span>4567,4567,2121211111111111111111111111</span></td>
              <td>2</td>
              <td>15</td>
              <td>26,300.00</td>
              <td>300.00</td>
              <td>已结案</td>
              <td><a href="javascript:;">查看</a></td>
            </tr>
          </table>
          <div class="border-bottom"></div>
        </div>
      </div>
      <div class="qs-right">
        <!--todo: often-play-type 多处应用 应将其封装成组件-->
        <div class="often-play-type">
          <div class="often-play-type-title box-title">
            <h4>常玩彩种</h4>
            <a href="javascript:;">
              <img :src="addIconYellow" alt="addIconYellow">
            </a>
          </div>
          <div class="often-play-type-content">
            <a class="now-hov" href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
            <a href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
            <a href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
            <a href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
            <a href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
            <a href="javascript:;">
              <div>新疆时时彩</div>
              <span>00:14</span>
            </a>
          </div>
          <a class="create-number-bet" href="javascript:;">
            <img :src="pencilIcon" alt="pencil">
            做号投注
          </a>
        </div>
        <div class="ranking-data">
          <div class="ranking-data-title box-title">
            <h4>排行数据</h4>
          </div>
          <div class="ranking-data-container">
            <div class="ranking-data-tabs clear-fix">
              <a class="now-hov" href="javascript:;">出码排行</a>
              <a href="javascript:;">遗漏排行</a>
            </div>
            <div class="period-list clear-fix">
              <span>期数选择</span>
              <div>
                <el-select size="mini" v-model="periodsCount" placeholder="">
                  <el-option label="2元" :value="2"></el-option>
                  <el-option label="5元" :value="5"></el-option>
                  <el-option label="10元" :value="10"></el-option>
                </el-select>
              </div>
            </div>
            <ul class="period-record clear-fix">
              <li>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
              </li>
              <li>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
                <span>1.总和 <i>@小</i></span>
              </li>
            </ul>
          </div>
        </div>
        <ranking-documentary></ranking-documentary>
      </div>
    </div>
  </div>
</template>

<script>
import exampleIcon from '../../statics/img/example_icon.png'
import downloadIcon from '../../statics/img/download_icon_yellow.png'
import addIcon from '../../statics/img/add_icon_yellow.png'
import klsfLogo from '../../statics/img/klsf.png'
import trendIcon from '../../statics/img/trend_icon.png'
import nextIcon from '../../statics/img/next_icon.png'
import addIconYellow from '../../statics/img/add_icon_+.png'
import pencilIcon from '../../statics/img/pencil_icon.png'

import { mapGetters } from 'vuex'
import {lotteryMixin} from '../../common/js/mixin'
import boxTabs from '../../components/box-tabs/box-tabs'
import rankingDocumentary from '../../components/ranking-documentary/ranking-documentary'
import shoppingCart from '../../components/shopping-cart/shopping-cart'

export default {
  mixins: [ lotteryMixin ],
  components: { boxTabs, rankingDocumentary, shoppingCart },
  data () {
    return {
      exampleIcon,
      addIcon,
      klsfLogo,
      nextIcon,
      trendIcon,
      pencilIcon,
      addIconYellow,
      downloadIcon,

      recentPeriodDetailShow: false,
      periodsCount: ''
    }
  },
  methods: {
    showRecentPeriodDetail () {
      if (this.recentPeriodDetailShow) return
      this.recentPeriodDetailShow = true
    },
    hideRecentPeriodDetail () {
      if (!this.recentPeriodDetailShow) return
      this.recentPeriodDetailShow = false
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu'
    }),
    ...mapGetters([
      'isChoiceShow',
      'szcpMenuList'
    ])
  },
  created () {
    /* todo : 判定如果没有传入gameTypeName时的逻辑 */
    if (!this.menuList) return this.$router.push('/index')
    this.$store.dispatch('getAvailablePrizeGroups')
  }
}
</script>

<style scoped>
  /*game-info begin*/
  .game-info {
    height: 129px;
  }
  .game-info > ul{
    height: 100%;
  }
  .game-info > ul > li{
    float: left;
    height: 100%;
    position: relative;
  }
  .game-info > ul > li .recent_period_detail{
    position: absolute;
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    width: 318px;
    top: 83%;
    height: 262px;
    background-color: #f3f3f3;
    z-index: 5;
  }
  .game-info > ul > li .recent_period_detail .recent_period_detail_container{
    width: 100%;
    height: 208px;
    overflow: auto;
  }
  .game-info > ul > li .recent_period_detail::after{
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
    top: -8px;
    left: 40%;
  }
  .game-info > ul > li .recent_period_detail h4{
    line-height: 43px;
    height: 44px;
    border-bottom: 1px solid #dedede;
    text-align: center;
    font-size: 16px;
    color: #545454;
  }
  .game-info > ul > li .recent_period_detail table{
    width: 100%;
  }
  .game-info > ul > li .recent_period_detail table tr th,
  .game-info > ul > li .recent_period_detail table tr td {
    text-align: center;
  }
  .game-info > ul > li .recent_period_detail table tr th{
    width: 50%;
    line-height: 34px;
    font-weight: normal;
    font-size: 14px;
    color: #545454;
  }
  .game-info > ul > li .recent_period_detail table tr td {
    line-height: 27px;
    font-size: 14px;
    color: #545454;
  }
  .game-info > ul > li .recent_period_detail table tr td:nth-of-type(2) span {
    display: inline-block;
    width: 21px;
    height: 21px;
    text-align: center;
    line-height: 21px;
    background-color: #f17e2e;
    border-radius: 50%;
    color: #fff;
  }
  .game-info > ul > li::after{
    content: '';
    display: block;
    position: absolute;
    height: 114px;
    width: 1px;
    background-color: #464658;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .game-info > ul > li:nth-of-type(1){
    position: relative;
    height: 100%;
    width: 217px;
    text-align: center;
    padding-top: 27px;
  }
  .game-info > ul > li:nth-of-type(2){
    width: 357px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(2) > div:nth-of-type(1){
    font-size: 12px;
    font-weight: bold;
    padding-top: 16px;
    color: #fff;
    margin-bottom: 3px;
  }
  .game-info > ul > li:nth-of-type(2) > div:nth-of-type(1) i{
    font-style: normal;
    color: #efe99c;
  }
  .game-info > ul > li:nth-of-type(2)  > p{
    font-size: 12px;
    margin-bottom: 14px;
    color: #fff;
  }
  .game-info > ul > li:nth-of-type(2) > .time{
    font-size: 30px;
    color: #ffffff;
  }
  .game-info > ul > li:nth-of-type(2) > .time i{
    font-style: normal;
  }
  .game-info > ul > li:nth-of-type(2) > .time span{
    display: inline-block;
    width: 62px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: url("../../statics/img/timer_bg.png") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3){
    width: 412px;
    padding-top: 16px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(3) > div{
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 3px;
  }
  .game-info > ul > li:nth-of-type(3) > div >i{
    font-style: normal;
    color: #f9f2a1;
  }
  .game-info > ul > li:nth-of-type(3) > p{
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .game-info > ul > li:nth-of-type(3) > span{
    width: 53px;
    height: 53px;
    display: inline-block;
    background: url("../../statics/img/ball_bg.png") no-repeat 0 0;
    line-height: 53px;
    text-align: center;
    font-size: 32px;
    color: #463b19;
    margin-right: 2px;
  }
  .game-info > ul > li:nth-of-type(4){
    width: 254px;
    padding-top: 19px;
    padding-right: 10px;
    padding-left: 45px;
  }
  .game-info > ul > li:nth-of-type(4) a{
    float: right;
    width: 125px;
    line-height: 38px;
    font-size: 14px;
    color: #fff;
    border: 1px solid #242438;
    border-radius: 5px;
    margin-bottom: 8px;
    padding-right: 19px;
    background-color: #505065;
    padding-left: 18px;
  }
  .game-info > ul > li:nth-of-type(4) a img{
    float: right;
    margin-top: 12px;
  }
  .game-info > ul > li:nth-of-type(4)::after{
    display: none;
  }
  /*game-info end*/
  .game-info {
    height: 129px;
  }
  .qs {
    width: 1172px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 23px;
  }
  /*qs-left begin*/
  .qs-left {
    width: 881px;
    float: left;
  }
  /*betting-record begin*/
  .betting-record {
    padding: 24px 18px 26px 19px;
    background-color: #eeeeee;
    margin-top: 15px;
  }
  .betting-record .betting-record-tabs {
    border-bottom: 1px solid #e4e0d8;
  }
  .betting-record .betting-record-tabs a {
    float: left;
    width: 92px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #eeeeee;
    font-size: 14px;
    color: #a68f4c;
  }
  .betting-record .betting-record-tabs a.now-hov {
    font-weight: bold;
    background-color: #fff;
    position: relative;
    color: #a68f4c;
  }
  .betting-record .betting-record-tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 3px;
    background-color: #b7ab81;
  }
  .betting-record .betting-record-tabs a.now-hov::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background-color: #fff;
  }
  .betting-record table {
  }
  .betting-record table tr th {
    height: 36px;
    font-weight: normal;
    font-size: 12px;
    color: #545454;
    line-height: 36px;
    border-bottom: 1px solid #e4e0d8;
    background-color: #ffffff;
  }
  .betting-record table tr td {
    text-align: center;
    font-size: 12px;
    color: #545454;
    line-height: 24px;
    height: 24px;
  }
  .betting-record table tr td:nth-of-type(4) span {
    padding: 0 6px;
    display: block;
    width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .betting-record .border-bottom {
    margin-top: 8px;
    height: 2px;
    background-color: #b7ab81;
  }
  /*betting-record end*/
  /*qs-left end*/
  /*choice-number-box-tabs end*/
  .choice-number-box-tabs {
  }
  .choice-number-box-tabs a {
    float: left;
    height: 42px;
    line-height: 42px;
    background-color: #cbcbcb;
    text-align: center;
    font-size: 14px;
    border-right: 1px solid #b2b2b2;
    position: relative;
  }
  .choice-number-box-tabs a:nth-last-of-type(1) {
    border-right: none;
  }
  .choice-number-box-tabs a.router-link-active {
    background-color: #eeeeee;
  }
  .choice-number-box-tabs a.router-link-active::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #b7ab81;
    top: 0;
    left: 0;
  }
  /*choice-number-box-tabs end*/
  /*---------------tabs*/
  .tabs {
    position: absolute;
    left: -39px;
    top: 39px;
  }
  .tabs > a {
    display: block;
    margin-bottom: 9px;
    width: 27px;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    padding-top: 10px;
    color: #545454;
    border-radius: 2px;
    background-color: #eeeeee;
    height: 60px;
  }
  .tabs > a.hov {
    background-color: #f17e2e;
    color: #FFFFFF;
  }
  /*qs-right begin*/
  .qs-right {
    margin-left: 12px;
    float: left;
    width: 278px;
  }
  /*often-play-type begin*/
  .box-title {
    height: 42px;
    position: relative;
    background-color: #cbcbcb;
    padding-left: 18px;
  }
  .box-title > h4 {
    line-height: 42px;
    color: #545454;
    font-size: 15px;
  }
  .qs-right {
    float: left;
    width: 278px;
  }
  .qs-right .often-play-type {
    margin-bottom: 12px;
    position: relative;
  }
  .qs-right .often-play-type > .create-number-bet {
    position: absolute;
    width: 37px;
    height: 120px;
    background-color: #f17e2e;
    border-radius: 0 3px 3px 0;
    right: -37px;
    top: 101px;
    padding-top: 13px;
    color: #fff;
    line-height: 18px;
    font-size: 16px;
    padding-left: 11px;
  }
  .qs-right .often-play-type .often-play-type-title {
  }
  .qs-right .often-play-type .often-play-type-title > a {
    position: absolute;
    right: 14px;
    top: 8px;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: #f17e2e;
    line-height: 19px;
    text-align: center;
  }
  .qs-right .often-play-type .often-play-type-title > h4 {
    float: left;
    line-height: 42px;
    color: #545454;
    font-size: 15px;
  }
  .qs-right .often-play-type .often-play-type-content {
    background-color: #eeeeee;
    height: 212px;
    padding: 8px 10px 0 10px;
  }
  .qs-right .often-play-type .often-play-type-content > a {
    float: left;
    width: 125px;
    height: 59px;
    background-color: #ffffff;
    border: 1px solid #c3c3c3;
    text-align: center;
    padding-top: 12px;
    margin-bottom: 6px;
    border-radius: 5px;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov {
    background-color: #f17e2e;
    border: 1px solid #f17e2e;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov > div {
    color: #fff;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov > span {
    color: #FFFFFF;
  }
  .qs-right .often-play-type .often-play-type-content > a:nth-of-type(2n-1) {
    margin-right: 6px;
  }
  .qs-right .often-play-type .often-play-type-content > a > div {
    color: #545454;
    font-size: 15px;
    margin-bottom: 7px;
  }
  .qs-right .often-play-type .often-play-type-content > a > span {
    color: #545454;
    font-size: 12px;
    letter-spacing: 2px;
  }
  /*often-play-type end*/
  /*ranking-data begin*/
  .qs-right .ranking-data {}
  .qs-right .ranking-data .ranking-data-container {
    padding: 6px 10px 9px 12px;
    background-color: #eeeeee;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs {}
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a {
    float: left;
    background-color: #f6f4f0;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-top: 1px solid #e4e0d8;
    border-bottom: 1px solid #e4e0d8;
    font-size: 14px;
    color: #a68f4c;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a:nth-of-type(1) {
    width: 127px;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a:nth-of-type(2) {
    width: 129px;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a.now-hov {
    background-color: #fff;
    position: relative;
    font-weight: bold;
    border-bottom: 1px solid #FFFFFF;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    top: 0;
    left: 0;
    background-color: #b7ab81;
  }
  .qs-right .ranking-data .ranking-data-container .period-list {
    height: 33px;
    margin-bottom: 3px;
    background-color: #ffffff;
    padding-left: 12px;
    line-height: 33px;
  }
  .qs-right .ranking-data .ranking-data-container .period-list span {
    float: left;
    color: #a68f4c;
    margin-right: 5px;
  }
  .qs-right .ranking-data .ranking-data-container .period-list div {
    float: left;
    width: 86px;
  }
  .qs-right .ranking-data .ranking-data-container .period-record {}
  .qs-right .ranking-data .ranking-data-container .period-record li {
    float: left;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li:nth-of-type(1) {
    width: 142px;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li:nth-of-type(2) {
    width: 112px;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li span {
    display: block;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #b8b5b5;
    font-size: 12px;
    color: #545454;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li span i {
    font-style: normal;
    color: #f17e2e;
  }
  /*ranking-data end*/
  /*qs-right end*/
</style>
