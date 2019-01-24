<template>
  <div class="game-main width">
    <div class="game-info width">
      <ul class="clear-fix">
        <li>
          <a href="javascript:;">
            <img :src="gameDetail.logo" alt="gameLogo">
          </a>
        </li>
        <li>
          <div>第 <i>{{sscAwardInfo['issue']}}</i> 期</div>
          <p>开奖时间</p>
          <div class="time">
            <span class="hour">{{endTimeInfo.hour}}</span>
            <i>:</i>
            <span class="minute">{{endTimeInfo.min}}</span>
            <i>:</i>
            <span class="second">{{endTimeInfo.sec}}</span>
          </div>
        </li>
        <li>
          <div>第 <i>{{sscLastWnNumber['issue']}}</i> 期</div>
          <p>开奖号码</p>
          <div class="balls">
            <span v-for="(item, index) in wnNumberList"
                  :key="index"
                  class="number-ball">{{item}}</span>
            <span class="number-ball">{{allAddCount}}</span>
          </div>
        </li>
        <!--todo : 宽度待调整-->
        <li>
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
                    <span v-for="(itemInner, indexInner) in item['wn_number'].split('')"
                          :key="indexInner">{{itemInner}}</span>
                    <span v-if="item['wn_number']">{{item['wn_number'] | sortWnNumber3D}}</span>
                  </td>
                </tr>
              </table>
            </div>
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

import boxTabs from '../../box-tabs/box-tabs'
import { mapGetters } from 'vuex'
import {lotteryMixin} from '../../../common/js/mixin'
import { getAjaxMixins } from '../../../common/js/getAjaxMixins'

export default {
  mixins: [ lotteryMixin, getAjaxMixins ],
  components: { boxTabs },
  data () {
    return {
      nextIcon,
      trendIcon,
      recentPeriodDetailShow: false
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
      'sscLastWnNumber',
      'recentWnNumberList',
      'userInfo',
      'gameDetail',
      'playTypeList'
    ]),
    allAddCount () {
      const wnNumber = this.sscLastWnNumber['wn_number']
      return wnNumber ? wnNumber.split('').reduce((a, b) => +a + +b) : '??'
    },
    wnNumberList () {
      const wnNumber = this.sscLastWnNumber['wn_number']
      return wnNumber ? wnNumber.split('') : [ '?', '?', '?' ]
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
        if (val['end_time'] - oldVal['server_time'] <= 1000) {
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
  }
}
</script>

<style scoped>
  @import "../../../statics/css/media/width-767/game-info.css";
  @import "../../../statics/css/media/width-992/game-info.css";
  @import "../../../statics/css/media/width-1200/game-info.css";
  @import "../statics/css/bettingTray.css";
  .game-info > ul > li:nth-of-type(3) .balls > span{
    width: 53px;
    height: 53px;
    position: relative;
    font-weight: normal;
    display: inline-block;
    background: url("../../../statics/img/ball_bg.png") no-repeat 0 0;
    line-height: 53px;
    text-align: center;
    font-size: 32px;
    color: #463b19;
    margin-right: 33px;
  }
  .game-info > ul > li:nth-of-type(3) .balls > span::after{
    content: '+';
    font-size: 40px;
    color: #f9f2a1;
    position: absolute;
    top: 46%;
    left: 55px;
    transform: translateY(-50%);
  }
  .game-info > ul > li:nth-of-type(3) .balls > span:nth-last-of-type(2)::after{
    content: '=';
    font-size: 40px;
    color: #f9f2a1;
    position: absolute;
    top: 46%;
    left: 56px;
    transform: translateY(-50%);
  }
  .game-info > ul > li:nth-of-type(3) .balls > span:nth-last-of-type(1)::after{
    content: '';
  }

  .game-info > ul > li .recent_period_detail table tr td:nth-of-type(2) span {
    display: inline-block;
    width: 21px;
    height: 21px;
    margin-right: 14px;
    position: relative;
    text-align: center;
    line-height: 21px;
    background-color: #f17e2e;
    border-radius: 50%;
    color: #fff;
  }
  .game-info > ul > li .recent_period_detail table tr td:nth-of-type(2) span::after {
    content: "+";
    display: inline-block;
    position: absolute;
    font-size: 20px;
    color: #f17e2e;
    right: -15px;
    transform: translateY(-1px);
  }
  .game-info > ul > li .recent_period_detail table tr td:nth-of-type(2) span:nth-last-of-type(2)::after {
    content: '=';
  }
  .game-info > ul > li .recent_period_detail table tr td:nth-of-type(2) span:nth-last-of-type(1)::after {
    content: '';
    display: none;
  }
</style>
