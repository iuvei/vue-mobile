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
          <p>开奖号码</p>
          <div class="balls">
            <span v-for="(item, index) in wnNumberList"
                  :class="{ [ 'scroll-' + index ]: true }"
                  :style="{ backgroundPositionY: `${item.backgroundPositionY}px` }"
                  @transitionend="showBetResult(index)"
                  :key="index"
                  class="number-ball"></span>
          </div>
        </li>
        <li>
          <p>最近开奖</p>
          <div class="record-im-game-table-wrapper">
            <table>
              <tr>
                <th>期号</th>
                <th>开奖号码</th>
              </tr>
              <tr v-if="index < 3" v-for="(item, index) in instantWnNumberList" :key="index">
                <td>{{item.issue}}</td>
                <td>
                    <span v-for="(num, index) in item.wn_numberList" :key="index">{{num}}</span>
                </td>
              </tr>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <div class="im-now-game-info"
         :class="{ 'height-hide': !isImShowBox }">
      <h4>{{imNowGameTypeName}}</h4>
    </div>
    <div class="im-show-box-wrapper"
         :ref="`imShowBox`"
         :style="{ height: imLastShowHeight }"
         :class="{ 'height-hide': isImShowBox }">
      <div class="choice-number-box-tabs clear-fix">
        <router-link v-for="link in showMenuList"
                     :key="link.id"
                     :to="{ name: `ssc-im_${link['name_en']}` }">{{link['name_cn']}}</router-link>
      </div>
      <router-view :ref="`betContent`"></router-view>
    </div>
    <betting-record-table :show-column="false" :isOpenType="true"></betting-record-table>
  </div>
</template>

<script>
import trendIcon from '../../../statics/img/trend_icon.png'
import nextIcon from '../../../statics/img/next_icon.png'

import { mapGetters } from 'vuex'
import { SET_IM_SHOW_BOX_HEIGHT, SET_IM_NOW_OPEN_COUNTS } from '../../../store/nameSpace'
import { showMenuListMixins } from '../../../common/js/menu-show-list-mixins'
import bettingRecordTable from '../../betting-record-table/betting-record-table'
import { intervalOpenLotteryIm } from '../../../config/game-default-config'
import { getElementHeight } from '../../../util'
import { GetInstantWnNumberList } from '../../../api/game/game'

export default {
  mixins: [ showMenuListMixins ],
  components: { bettingRecordTable },
  data () {
    return {
      nextIcon,
      trendIcon,
      recentPeriodDetailShow: false,
      wnNumberList: [
        { backgroundPositionY: 0 },
        { backgroundPositionY: 0 },
        { backgroundPositionY: 0 },
        { backgroundPositionY: 0 },
        { backgroundPositionY: 0 }
      ],
      instantWnNumberList: []
    }
  },
  methods: {
    resetShowBoxHeight () {
      this.$store.commit(SET_IM_SHOW_BOX_HEIGHT, getElementHeight(this.$refs['imShowBox']))
    },
    showBetResult (index) {
      if (index === 4) {
        this.GetInstantWnNumberList()
      }
      if (index === this.wnNumberList.length - 1) {
        if (this.lotteryNumberLastImInfo['winNum'] === 0) {
          // 未中奖的情况下 继续未完成的中奖投注
          this.$message({
            message: `第${this.imNowOpenCounts + 1}次开奖, 很遗憾, 你没有中奖, 请再接再厉`,
            type: 'error'
          })
          setTimeout(() => {
            this.$store.commit(SET_IM_NOW_OPEN_COUNTS, this.imNowOpenCounts + 1)
          }, intervalOpenLotteryIm)
        } else {
          this.$message({
            message: `第${this.imNowOpenCounts + 1}次开奖, 恭喜您中奖, 中奖金额为${this.lotteryNumberLastImInfo['winMoney']}元`,
            type: 'success'
          })
          setTimeout(() => {
            if (this.$refs['betContent'].isStopWin) {
              this.$store.commit(SET_IM_NOW_OPEN_COUNTS, 'stopAndWin')
            } else {
              this.$store.commit(SET_IM_NOW_OPEN_COUNTS, this.imNowOpenCounts + 1)
            }
          }, intervalOpenLotteryIm)
        }
      }
    },
    GetInstantWnNumberList () {
      GetInstantWnNumberList(this.lotteryId).then(res => {
        if (res.errno === 0) {
          this.instantWnNumberList = res.data
          res.data.forEach((item, index) => {
            this.instantWnNumberList[index].wn_numberList = item.wn_number.split('')
          })
        }
      })
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
      'playTypeList',
      'isImShowBox',
      'imLastShowHeight',
      'imNowGameTypeName',
      'imNowOpenCounts',
      'lotteryNumberLastImInfo'
    ])
  },
  watch: {
    $route () {
      this.$nextTick(() => {
        this.resetShowBoxHeight()
      })
    },
    lotteryNumberLastImInfo (val, oldVal) {
      // 当当前值与之前值都有值得情况
      if (val && val.result && oldVal) {
        const returnArr = []
        const oldStrArr = oldVal.result.split('')
        const nowStrArr = val.result.split('')
        oldStrArr.map((item, index) => {
          nowStrArr.find((itemInner, indexInner) => {
            if (index === indexInner) {
              let interval = (+item - +itemInner) * 67
              returnArr.push({
                backgroundPositionY: this.wnNumberList[index].backgroundPositionY - 3340 + interval
              })
              return true
            }
          })
        })
        this.wnNumberList = returnArr
      }
      // 当之前值无值 当前值有值时  即初始化winNumberList
      if (val && val.result && !oldVal) {
        const nowStrArr = val.result.split('')
        this.wnNumberList = nowStrArr.map(item => {
          return {
            backgroundPositionY: -3340 + +item * -67
          }
        })
      }
    }
  },
  created () {
    if (!this.menuList) return this.$router.push('/index')
    this.$loadingShow()
    this.GetInstantWnNumberList()
    Promise.all([
      // todo : 获取用户信息不是走当前接口 需调整 将获取用户信息加载完成后在关闭loading
      this.$store.dispatch('getAvailablePrizeGroups'),
      // this.$store.dispatch('getLastWnNumberList', { firstEnter: true }),
      this.$store.dispatch('getBetSettings'),
      this.$store.dispatch('getNowGameDetail', this.lotteryId)
    ])
      .then(() => {
        console.log(this.sscLastWnNumber)
        this.$loadingHide()
      })
  },
  mounted () {
    this.resetShowBoxHeight()
    const $wrapperRef = this.$refs[`imShowBox`]
    // 在获取高度的函数中改变的高度的值再重新进行一个绑定
    if ($wrapperRef.style.height === 'auto') {
      $wrapperRef.style.height = this.imLastShowHeight
    }
  }
}
</script>

<style scoped>
  @import "../statics/css/layout.css";
  /* 定义高度为0隐藏的类名 */
  .height-hide {
    height: 0!important;
    margin-bottom: 0!important;
  }
  /* 定义高度为0隐藏的类名 */
  /* im-now-game-info begin */
  .im-now-game-info {
    width: 100%;
    transition: height linear .5s, margin-bottom .5s linear;
    border-radius: 4px;
    overflow: hidden;
    height: 60px;
    background-color: #eee;
    margin-bottom: 20px;
  }
  .im-now-game-info h4 {
    text-align: center;
    position: relative;
    line-height: 46px;
    font-weight: normal;
    color: #eb7e00;
    font-size: 15px;
  }
  .im-now-game-info h4::after {
    content: '';
    display: block;
    position: absolute;
    width: 1020px;
    height: 1px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: url("../../../statics/img/line_1px_bottom.png") no-repeat 0 0;
  }
  /* im-now-game-info end */
  .im-show-box-wrapper {
    transition: height linear .5s;
    overflow: hidden;
    position: relative;
    box-sizing: content-box;
    padding-bottom: 169px;
    background-color: #eeeeee;
  }
  /* 开奖小球的动画配置样式 begin */
  .scroll-0 {
    transition: background-position cubic-bezier(0, .34, 1, 1) 2s;
  }
  .scroll-1 {
    transition: background-position cubic-bezier(0, .34, 1, 1) 2.5s;
  }
  .scroll-2 {
    transition: background-position cubic-bezier(0, .34, 1, 1) 3s;
  }
  .scroll-3 {
    transition: background-position cubic-bezier(0, .34, 1, 1) 3.5s;
  }
  .scroll-4 {
    transition: background-position cubic-bezier(0, .34, 1, 1) 4s;
  }
  /* 开奖小球的动画配置样式 end */
  /* tabs begin */
  .tabs {
    position: absolute;
    left: 0;
    top: 130px;
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
  .game-info > ul > li:nth-last-of-type(1)::after{
    content: '';
    display: none;
  }
  .game-info > ul > li:nth-of-type(1){
    position: relative;
    height: 100%;
    width: 217px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(2){
    width: 545px;
    text-align: center;
  }
  .game-info > ul > li:nth-of-type(2) > p,
  .game-info > ul > li:nth-of-type(3) > p{
    float: left;
    line-height: 129px;
    width: 158px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    letter-spacing: 3px;
    margin-bottom: 10px;
  }
  .game-info > ul > li:nth-of-type(2) .balls {
    line-height: 129px;
    float: left;
  }
  .game-info > ul > li:nth-of-type(2) .balls > span{
    width: 69px;
    height: 69px;
    vertical-align: middle;
    display: inline-block;
    background: url("../../../statics/img/0-9.png") repeat-y 0 0;
    line-height: 53px;
    text-align: center;
    font-size: 32px;
    color: #463b19;
    margin-right: 2px;
  }
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper{
    float: left;
    width: 295px;
  }
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper table{
    width: 100%;
  }
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper table tr{}
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper table tr th{
    width: 50%;
    line-height: 29px;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    color: #fff;
  }
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper table tr td{
    line-height: 29px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
  .game-info > ul > li:nth-of-type(3) .record-im-game-table-wrapper table tr td:nth-of-type(2) span{
    display: inline-block;
    width: 21px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    background-color: #f17e2e;
    border-radius: 50%;
  }
  /*game-info end*/
</style>
