<template>
  <div class="game-main width">
    <div class="game-info width pk10-game_info">
      <ul class="clear-fix">
        <li>
          <a href="javascript:;">
            <img :src="gameDetail.logo" alt="gameLogo">
          </a>
        </li>
        <li>
         <div class="second-list-one clear-fix">
           <div class="second-list-one-text">
             <div>第 <i>{{sscAwardInfo['issue']}}</i> 期</div>
             <p>开奖时间</p>
           </div>
           <div class="time">
             <span class="hour">{{endTimeInfo.hour}}</span>
             <i>:</i>
             <span class="minute">{{endTimeInfo.min}}</span>
             <i>:</i>
             <span class="second">{{endTimeInfo.sec}}</span>
           </div>
           <div class="links">
             <a href="javascript:;" @click="$router.push({ name: 'lotteryRecord'})">
               开奖记录
               <img :src="trendIcon" alt="trendIcon">
             </a>
             <a @mouseenter="showRecentPeriodDetail"
                @mouseleave="hideRecentPeriodDetail"
                href="javascript:;">
               最近期数
               <img :src="nextIcon" alt="nextIcon">
             </a>
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
                   <tr v-for="(item, index) in recentWnNumberList"
                       :key="index">
                     <td>{{item.issue}}</td>
                     <td>
                    <span v-for="(itemInner, indexInner) in item['wn_number'].split(' ')"
                          :key="indexInner">{{itemInner}}</span>
                     </td>
                   </tr>
                 </table>
               </div>
             </div>
           </div>
         </div>
          <div class="second-list-two clear-fix">
            <div class="second-list-two-text">
              <div>第 <i>{{sscLastWnNumber['issue']}}</i> 期</div>
              <p>开奖号码</p>
            </div>
            <div class="balls">
              <span v-for="(item, index) in wnNumberList"
                    :key="index"
                    :class="{ [ 'number-' + +item ]: true }"
                    class="number-ball">{{item}}</span>
            </div>
          </div>
        </li>
        <li>
          <div v-if="pk10ShowStatus === 0"
               class="get-lottery-info">
            <p>
              第 <i>{{sscLastWnNumber['issue']}}</i> 准备开奖中
            </p>
          </div>
          <div v-else-if="pk10ShowStatus === 1"
               class="ready-to-lottery">
            <img :src="readyLottery" alt="readyLottery">
          </div>
          <div v-else-if="pk10ShowStatus === 2"
               class="wrapper">
            <p>
              第<i>{{sscLastWnNumber['issue']}}</i>期开奖结果
            </p>
            <ul>
              <li v-for="(item, index) in rankData"
                  :style="{ left: 29 + 140 * index + 'px' }"
                  :key="index">
                <p>{{item}}</p>
                <div>
                  <img :src="imgArr[index]" alt="car">
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!--<box-tabs :link-list="linkList_SSC"></box-tabs>-->
    <div class="tabs">
    <router-link v-for="(link, index) in playTypeList"
                 :key="index"
                 :to="{ name: link.toName }">{{link.label}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import trendIcon from '../../../statics/img/trend_icon.png'
import nextIcon from '../../../statics/img/next_icon.png'
import car1 from '../../../statics/img/car01.png'
import car2 from '../../../statics/img/car02.png'
import car3 from '../../../statics/img/car03.png'
import car4 from '../../../statics/img/car04.png'
import car5 from '../../../statics/img/car05.png'
import car6 from '../../../statics/img/car06.png'
import car7 from '../../../statics/img/car07.png'
import car8 from '../../../statics/img/car08.png'
import car9 from '../../../statics/img/car09.png'
import car10 from '../../../statics/img/car10.png'
import readyLottery from '../../../statics/img/pk10.gif'

import boxTabs from '../../box-tabs/box-tabs'
import { mapGetters } from 'vuex'
import {lotteryMixin} from '../../../common/js/mixin'
import { SET_PK10_SHOW_STATUS } from '../../../store/nameSpace'
import { getAjaxMixins } from '../../../common/js/getAjaxMixins'

export default {
  mixins: [ lotteryMixin, getAjaxMixins ],
  components: { boxTabs },
  data () {
    return {
      readyLottery,
      car1,
      car2,
      car3,
      car4,
      car5,
      car6,
      car7,
      car8,
      car9,
      car10,
      nextIcon,
      trendIcon,
      recentPeriodDetailShow: false,
      rankData: ['第一名', '第二名', '第三名']
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
      'szcpMenuList',
      'lotteryId',
      'sscAwardInfo',
      'playTypeList',
      'sscLastWnNumber',
      'recentWnNumberList',
      'userInfo',
      'gameDetail',
      'pk10ShowStatus'
    ]),
    wnNumberList () {
      const wnNumber = this.sscLastWnNumber['wn_number']
      return wnNumber ? wnNumber.split(' ').map(a => +a) : [ '?', '?', '?', '?', '?', '?', '?', '?', '?', '?' ]
    },
    imgArr () {
      const arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(this['car' + this.wnNumberList[i]])
      }
      return arr
    },
    endTimeInfo () {
      if (!this.sscAwardInfo['server_time']) {
        return {
          hour: `00`,
          min: `00`,
          sec: `00`
        }
      }
      const NOW_TIME = this.sscAwardInfo['server_time']
      const END_TIME = this.sscAwardInfo['end_time']
      let interval = END_TIME - NOW_TIME
      let hour = parseInt(interval / 1000 / 60 / 60 % 24)
      let min = parseInt(interval / 1000 / 60 % 60)
      let sec = parseInt(interval / 1000 % 60)
      if (sec < 0) sec = 0
      return {
        hour: hour < 10 ? `0${hour}` : hour,
        min: min < 10 ? `0${min}` : min,
        sec: sec < 10 ? `0${sec}` : sec
      }
    }
  },
  watch: {
    sscAwardInfo: {
      deep: true,
      handler (val, oldVal) {
        if (val['end_time'] - oldVal['server_time'] <= 0) {
          this.$store.dispatch('getCurrentIssue')
            .then(() => {
              this.$nextTick(() => {
                this.$store.dispatch('getLastWnNumberList')
              })
            })
        }
      }
    }
  },
  created () {
    this.$store.commit(SET_PK10_SHOW_STATUS, 0)
  },
  beforeRouteLeave (to, from, next) {
    next()
    this.$nextTick(() => {
      this.$store.commit(SET_PK10_SHOW_STATUS, 0)
    })
  }
}
</script>

<style scoped>
  @import "../../../statics/css/media/width-767/game-info.css";
  @import "../../../statics/css/media/width-992/game-info.css";
  @import "../../../statics/css/media/width-1200/game-info.css";
  /* tabs begin */
  .tabs {
    position: absolute;
    left: 0;
    top: 229px;
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
  .tabs > a.router-link-active {
    background-color: #f17e2e;
    color: #FFFFFF;
  }
  /* tabs end */
  .game-main {
    position: relative;
  }
  /*game-info begin*/
  .game-info {
    height: 229px;
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
    top: 42%;
    right: -110px;
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
    background: url("../../../statics/img/arrow_top_menu_header.png") no-repeat 0 0;
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
  .game-info > ul > li:nth-of-type(1)::after{
    content: '';
    display: block;
    position: absolute;
    height: 200px;
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
  }
  .game-info > ul > li:nth-of-type(1) a{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-51%);
  }
  .game-info > ul > li:nth-of-type(2){
    padding-top: 39px;
    width: 491px;
    padding-left: 6px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one > div:nth-of-type(1){
    font-size: 12px;
    font-weight: bold;
    padding-top: 16px;
    color: #fff;
    margin-bottom: 3px;
  }
  .second-list-two > .second-list-two-text,
  .game-info > ul > li:nth-of-type(2) > .second-list-one > .second-list-one-text{
    float: left;
    width: 120px;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one > div:nth-of-type(1) i{
    font-style: normal;
    color: #efe99c;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one > p{
    font-size: 12px;
    margin-bottom: 14px;
    color: #fff;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one .time{
    float: left;
    font-size: 30px;
    color: #ffffff;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one .time i{
    font-style: normal;
  }
  .game-info > ul > li:nth-of-type(2) > .second-list-one .time span{
    display: inline-block;
    width: 62px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: url("../../../statics/img/timer_bg.png") no-repeat 0 0;
  }
  .second-list-two{
    margin-top: 52px;
    text-align: center;
  }
  .second-list-two > .second-list-two-text > div{
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 3px;
  }
  .second-list-two >.second-list-two-text >  div >i{
    font-style: normal;
    color: #f9f2a1;
  }
  .second-list-two >.second-list-two-text >  p{
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .second-list-two > .balls {
    float: left;
    width: 360px;
  }
  .second-list-two > .balls span{
    display: inline-block;
    /*-webkit-text-stroke: 2px rgba(0, 0, 0, .3);*/
    color: #fff;
    font-weight: bold;
    margin-right: 2px;
    width: 34px;
    height: 35px;
    border: 2px solid #fff;
    border-radius: 5px;
    line-height: 32px;
    text-align: center;
    font-size: 22px;
  }
  .second-list-two > .balls span.number-1{
    background-color: #d0d10a;
  }
  .second-list-two > .balls span.number-2{
    background-color: #0062b5;
  }
  .second-list-two > .balls span.number-3{
    background-color: #2b2b2b;
  }
  .second-list-two > .balls span.number-4{
    background-color: #b55300;
  }
  .second-list-two > .balls span.number-5{
    background-color: #7ceeec;
  }
  .second-list-two > .balls span.number-6{
    background-color: #3a06c0;
  }
  .second-list-two > .balls span.number-7{
    background-color: #a1a1a1;
  }
  .second-list-two > .balls span.number-8{
    background-color: #b70203;
  }
  .second-list-two > .balls span.number-9{
    background-color: #540100;
  }
  .second-list-two > .balls span.number-10{
    background-color: #208b0c;
  }
  .second-list-two > .balls span.number-NaN{
    background-color: #262732;
  }
  .links{
    float: left;
    padding-top: 4px;
    margin-left: 27px;
    width: 85px;
  }
  .links a{
    float: right;
    width: 85px;
    font-size: 14px;
    color: #fff;
    /* padding-right: 19px;
    padding-left: 18px; */
  }
  .links a:nth-of-type(1){
    margin-bottom: 14px;
  }
  .links a img{
    float: right;
    margin-top: 1px;
  }
  .links::after{
    display: none;
  }
  .game-info > ul > li:nth-of-type(3) {
    padding-top: 16px;
    margin-left: 24px;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper {
    background: url("../../../statics/img/bjpk10_race_bg.jpg");
  }
  .game-info > ul > li:nth-of-type(3) .get-lottery-info {
    position: relative;
    background: url("../../../statics/img/bjpk10_race_ready.jpg") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3) .get-lottery-info p {
    position: absolute;
    left: 0;
    font-size: 17px;
    color: #FFFFFF;
    right: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  .game-info > ul > li:nth-of-type(3) .get-lottery-info p i {
    color: #eb7e00;
    font-style: normal;
  }
  .game-info > ul > li:nth-of-type(3) > div {
    width: 474px;
    padding-top: 10px;
    height: 197px;
  }
  .game-info > ul > li:nth-of-type(3) .ready-to-lottery img {
    width: 100%;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper > ul {
    position: relative;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper > ul > li {
    position: absolute;
    width: 158px;
    height: 158px;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper > ul > li > p {
    text-align: center;
    padding-left: 25px;
    color: #ffffff;
    font-size: 13px;
    margin-bottom: 11px;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper > p {
    color: #fff;
    margin-bottom: 16px;
    font-size: 13px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper > p > i {
    font-style: normal;
    color: #d71a11;
  }
  .game-info > ul > li:nth-of-type(3) .wrapper {}
  /*game-info end*/
</style>
