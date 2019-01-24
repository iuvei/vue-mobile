<template>
  <div class="game-main width">
    <div class="game-info width">
      <ul class="clear-fix">
        <li>
          <a href="javascript:;">
            <img :src="gameDetail.logo" alt="cqsscLogo">
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
          <span v-for="(item, index) in wnNumberList"
                :class="{ [ item.className ]: true }"
                :key="index"
                class="number-ball">{{item.label}}</span>
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
                    <span v-for="(itemInner, indexInner) in item['wn_number'].split(' ')"
                          :key="indexInner">{{itemInner}}</span>
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
import exampleIcon from '../../../statics/img/example_icon.png'
import downloadIcon from '../../../statics/img/download_icon_yellow.png'
import addIcon from '../../../statics/img/add_icon_yellow.png'
import trendIcon from '../../../statics/img/trend_icon.png'
import nextIcon from '../../../statics/img/next_icon.png'

import boxTabs from '../../box-tabs/box-tabs'
import { mapGetters } from 'vuex'
import {lotteryMixin} from '../../../common/js/mixin'
import { getAjaxMixins } from '../../../common/js/getAjaxMixins'
import { redData, blueData, greenData } from '../../../config/lhc-number-color'

export default {
  mixins: [ lotteryMixin, getAjaxMixins ],
  components: { boxTabs },
  data () {
    return {
      exampleIcon,
      addIcon,
      nextIcon,
      trendIcon,
      downloadIcon,
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
      'playTypeList',
      'gameDetail'
    ]),
    wnNumberList () {
      let wnNumber = this.sscLastWnNumber['wn_number']
      let TM
      if (wnNumber && wnNumber.length) {
        wnNumber = wnNumber.split(' ').map(item => {
          if (!item.split('+').length === 1) {
            let isBlue = blueData.find(blueNumber => blueNumber === item)
            let isRed = redData.find(redNumber => redNumber === item)
            let isGreen = greenData.find(greenNumber => greenNumber === item)
            return {
              label: item,
              className: isBlue ? 'blue' : isRed ? 'red' : isGreen ? 'green' : 'yellow'
            }
          }
          let lastNumber = item.split('+')[ 0 ]
          TM = item.split('+')[ 1 ]
          let isBlue = blueData.find(blueNumber => blueNumber === lastNumber)
          let isRed = redData.find(redNumber => redNumber === lastNumber)
          let isGreen = greenData.find(greenNumber => greenNumber === lastNumber)
          return {
            label: lastNumber,
            className: isBlue ? 'blue' : isRed ? 'red' : isGreen ? 'green' : 'yellow'
          }
        })
        let isBlue = blueData.find(blueNumber => blueNumber === TM)
        let isRed = redData.find(redNumber => redNumber === TM)
        let isGreen = greenData.find(greenNumber => greenNumber === TM)
        wnNumber.push({
          label: TM,
          className: isBlue ? 'blue' : isRed ? 'red' : isGreen ? 'green' : 'yellow'
        })
      } else {
        wnNumber = []
        for (let i = 0; i < 6; i++) {
          wnNumber.push({
            label: '??',
            className: 'yellow'
          })
        }
      }
      return wnNumber
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
  .game-info > ul > li:nth-of-type(3) > span{
    width: 41px;
    height: 41px;
    display: inline-block;
    border-radius: 50%;
    line-height: 41px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    margin-right: 2px;
  }
  .game-info > ul > li:nth-of-type(3) > span.green{
    background: url("../../../statics/img/lottery-number-lhc-green.png") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3) > span.blue{
    background: url("../../../statics/img/lottery-number-lhc-blue.png") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3) > span.red{
    background: url("../../../statics/img/lottery-number-lhc-red.png") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3) > span.yellow{
    background-size: 41px 41px;
    color: #555555;
    background: url("../../../statics/img/ball_bg_small.png") no-repeat 0 0;
  }
  .game-info > ul > li:nth-of-type(3) > span:nth-last-of-type(1){
    margin-left: 26px;
    position: relative;
  }
  .game-info > ul > li:nth-of-type(3) > span:nth-last-of-type(1)::after{
    content: '+';
    display: block;
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: #f9f2a1;
    top: 0;
    left: -23px;
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
</style>
