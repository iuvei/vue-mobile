<template>
  <transition name="fade-in-linear">
    <div v-if="show" class="wrapper">
      <div class="container">
        <a @click="closeAlertBox"
           href="javascript:;">
          <img :src="closeIcon" alt="closeIcon">
        </a>
        <div class="title">立即追号</div>
        <div class="content">
          <div class="tabs clear-fix">
            <a v-for="(tab, index) in tabList"
               @click="showWhichTab = index + 1"
               :key="index"
               :class="{ 'now-hov': index === showWhichTab - 1 }"
               href="javascript:;">{{tab}}</a>
          </div>
          <div class="chasing-number-counts">
            <span>追号期数</span>
            <el-select class="chasing-number-counts-select"
                       size="mini"
                       v-model="periodsNumber"
                       placeholder="">
              <el-option v-for="(value, key) in defaultSetting ? defaultSetting['issue_trace_gear'] : []"
                         :key="key"
                         :label="value"
                         :value="+key"></el-option>
            </el-select>
          </div>
          <div v-show="showWhichTab === 1" class="chasing-number-setting lrxzh">
            追号计划：起始倍数
            <input class="multiple-start"
                   v-model="profitRateInfo.startMultiple"
                   @input="checkInputToNumber('profitRateInfo', 'startMultiple')"
                   type="text">
            最低收益率
            <input class="min-date-return"
                   v-model="profitRateInfo.lowestIncomeRate"
                   @input="checkInputToNumber('profitRateInfo', 'lowestIncomeRate')"
                   type="text">
            <i>%</i>
            追号期数
            <input class="chasing-number"
                   v-model="profitRateInfo.chasingPeriodsCounts"
                   @input="checkInputToNumber('profitRateInfo', 'chasingPeriodsCounts')"
                   type="text">
            <a href="javascript:;"
               @click="profitRateCheckList">
              生成追号单
              <img :src="nextIcon" alt="nextIcon">
            </a>
          </div>
          <div v-show="showWhichTab === 2"
               class="chasing-number-setting tbzh">
            追号计划：起始倍数
            <input class="multiple-start"
                   v-model="sameMultipleInfo.startMultiple"
                   @input="checkInputToNumber('sameMultipleInfo', 'startMultiple')"
                   type="text">
            追号期数
            <input class="chasing-number"
                   v-model="sameMultipleInfo.chasingPeriodsCounts"
                   @input="checkInputToNumber('sameMultipleInfo', 'chasingPeriodsCounts')"
                   type="text">
            <a href="javascript:;"
               @click="sameMultipleCheckList">
              生成追号单
              <img :src="nextIcon" alt="nextIcon">
            </a>
          </div>
          <div v-show="showWhichTab === 3" class="chasing-number-setting fbzh">
            追号计划：隔
            <input class="interval-count"
                   v-model="doubleMultipleInfo.interval"
                   @input="checkInputToNumber('doubleMultipleInfo', 'interval')"
                   type="text">期
            ×
            <input class="multiple"
                   v-model="doubleMultipleInfo.incrementMultiple"
                   @input="checkInputToNumber('doubleMultipleInfo', 'incrementMultiple')"
                   type="text">
            倍
            追号期数
            <input class="chasing-number-count"
                   v-model="doubleMultipleInfo.chasingPeriodsCounts"
                   @input="checkInputToNumber('doubleMultipleInfo', 'chasingPeriodsCounts')"
                   type="text">
            <a href="javascript:;"
               @click="doubleMultipleCheckList">
              生成追号单
              <img :src="nextIcon" alt="nextIcon">
            </a>
          </div>
          <p class="chasing-number-description">总期数: <i> {{allPeriods}} </i> 期 总金额: <i> {{allCountMoney | formatPrice}} </i> 元</p>
          <div class="table">
            <table>
              <tr v-for="(issues, index) in issuesList"
                  :key="index">
                <td><input v-model="issues.isSelected"
                           type="checkbox"></td>
                <td>{{index + 1}}</td>
                <td>{{issues.issue}}</td>
                <td><input :disabled="!issues.isSelected"
                           @input="checkMultipleInput(issues)"
                           v-model="issues.multiple"
                           type="text">倍</td>
                <td><span>￥{{times(betInfo.betNoteCounts * betInfo.coefficient * issues.multiple * betInfo.price, 1) | formatPrice}}</span></td>
                <td>{{issues.endTime}}</td>
              </tr>
            </table>
          </div>
          <p class="tips">温馨提示：中奖率低于{{defaultSetting['challenge_rate'] * 100}}％的单挑最高派奖{{defaultSetting['challenge_profit_limit']}}元</p>
          <div class="action">
            <a href="javascript:;"
               @click="submitChasingNumber">
              立即投注
              <img :src="rightIcon" alt="rightIcon">
            </a>
            <div>
              <input type="checkbox"
                     v-model="stopChasingWn"
                     id="is-win-stop">
              <label for="is-win-stop">中奖后停止追号</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import nextIcon from '../../../statics/img/next_icon.png'
import rightIcon from '../../../statics/img/right_icon_smp.png'
import { alertMixin } from '../mixin'
import { mapGetters } from 'vuex'
import { chasingNumberDefault } from '../../../config/game-default-config'
import { shallowCopy } from '../../../util'
import { CLOSE_CHASING_BOX } from '../../../store/nameSpace'
import NP from 'number-precision'

export default {
  name: 'ljzh-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      closeIcon,
      rightIcon,
      nextIcon,
      name: 'ljzh-alert',
      showWhichTab: 1,
      bonusGroup: '',
      multiple: 0,
      defaultAmount01: 5,
      tabList: [ '利润率追号', '同倍追号', '翻倍追号' ],
      issuesList: [],
      stopChasingWn: chasingNumberDefault.stopChasingWn,
      periodsNumber: chasingNumberDefault.periodsNumber,
      profitRateInfo: {
        startMultiple: chasingNumberDefault.profitRateInfo.startMultiple,
        lowestIncomeRate: chasingNumberDefault.profitRateInfo.lowestIncomeRate,
        chasingPeriodsCounts: chasingNumberDefault.profitRateInfo.chasingPeriodsCounts
      },
      sameMultipleInfo: {
        startMultiple: chasingNumberDefault.sameMultipleInfo.startMultiple,
        chasingPeriodsCounts: chasingNumberDefault.sameMultipleInfo.chasingPeriodsCounts
      },
      doubleMultipleInfo: {
        chasingPeriodsCounts: chasingNumberDefault.doubleMultipleInfo.chasingPeriodsCounts,
        interval: chasingNumberDefault.doubleMultipleInfo.interval,
        incrementMultiple: chasingNumberDefault.doubleMultipleInfo.incrementMultiple
      },
      // defaultSetting: null,
      betInfo: {},
      // 追号后删除的下标购物篮item
      shoppingCarDeleteIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'lotteryId',
      'defaultSetting',
      'isChasingShow'
    ]),
    allPeriods () {
      return this.issuesList.filter(item => {
        return item.isSelected
      }).length
    },
    allCountMoney () {
      let betCount = 0
      this.issuesList.map(item => {
        if (!item.isSelected) return true
        betCount = NP.plus(betCount, NP.times(this.betInfo.betNoteCounts, this.betInfo.coefficient, item.multiple, this.betInfo.price))
      })
      return betCount
    }
  },
  methods: {
    times () {
      return NP.times.apply(this, arguments)
    },
    submitChasingNumber () {
      if (!this.issuesList.find(item => item.isSelected)) return this.$message({ message: '请生成对应的追号规则', type: 'error' })
      this.betInfo.isChasingNumber = true
      this.betInfo.stopChasingWn = this.stopChasingWn
      const dataArr = []
      const order = {}
      this.issuesList.map(item => {
        if (item.isSelected) {
          this.betInfo.awardInfo = { issue: item.issue }
          this.betInfo.multiple = item.multiple
          this.betInfo.selectedMoney = this.betInfo.multiple * this.betInfo.price * (+this.betInfo.coefficient) * this.betInfo.selectedCounts
          dataArr.push(shallowCopy(this.betInfo))
          order[item.issue] = item.multiple
        }
      })
      this.$gameAlertQrzdxx({
        shoppingCarList: dataArr,
        chasingInfo: Object.assign(this.betInfo, { order }),
        lotteryId: this.lotteryId,
        isChasingNumber: true,
        rootEl: this.$root.$el,
        isClearShoppingCar: false,
        shoppingCarDeleteIndex: this.shoppingCarDeleteIndex
      })
    },
    checkInputToNumber (tabName, attrName) {
      this[tabName][attrName] = this[tabName][attrName].replace(/[^\d]/g, '')
    },
    profitRateCheckList () {
      this.resetList()
      const {
        // 价格系数
        price,
        // 单倍单次最大中奖金额
        prize,
        // 已选注数
        selectedCounts,
        // 价格档位系数
        coefficient,
        // 最大倍数
        maxMultiple,
        // 用户奖金组中最大的key值
        maxPrizeGroupKey
      } = this.betInfo
      // 单倍单注最大中奖金额
      const maxPirizeGroup = this.defaultSetting['max_prize_group']
      // 追号期数
      const chasingPeriodsCounts = +this.profitRateInfo.chasingPeriodsCounts > this.issuesList.length ? this.issuesList.length : +this.profitRateInfo.chasingPeriodsCounts
      this.profitRateInfo.chasingPeriodsCounts = chasingPeriodsCounts
      // 起始倍数
      const startMultiple = this.profitRateInfo.startMultiple
      // 最低收益率
      const lowestIncomeRate = this.profitRateInfo.lowestIncomeRate
      let multiple = startMultiple
      this.issuesList.find((item, index) => {
        let i = 1
        // 当前投注数
        const allSelectedCounts = selectedCounts * (index + 1)
        // 当前总投注金额
        const allBetMoney = allSelectedCounts * coefficient * price
        while (i <= chasingPeriodsCounts) {
          // 奖金
          // const wnMoney = prize * price * coefficient * multiple
          const wnMoney = (maxPirizeGroup * prize / maxPrizeGroupKey) * price * coefficient * multiple
          if (maxMultiple <= multiple) {
            if (((wnMoney - allBetMoney) / allBetMoney) < lowestIncomeRate) {
              // todo: 对数组进组重置  重置为初始值
              this.$message({
                message: '您设置的参数无法达到预期的盈利, 请重试',
                type: 'error'
              })
              break
            }
          }
          if ((wnMoney - allBetMoney) / allBetMoney < lowestIncomeRate) {
            multiple += 1
            i++
          } else {
            break
          }
        }
        item.isSelected = true
        item.multiple = multiple
        if (index + 1 === chasingPeriodsCounts) {
          return true
        }
      })
    },
    resetList () {
      this.issuesList.forEach(item => {
        item.multiple = ''
        item.isSelected = false
      })
    },
    checkMultipleInput (issues) {
      issues.multiple = issues.multiple.replace(/[^\d]/g, '')
    },
    sameMultipleCheckList () {
      this.resetList()
      const { maxMultiple } = this.betInfo
      const chasingPeriodsCounts = +this.sameMultipleInfo.chasingPeriodsCounts > this.issuesList.length ? this.issuesList.length : +this.sameMultipleInfo.chasingPeriodsCounts
      this.sameMultipleInfo.chasingPeriodsCounts = chasingPeriodsCounts
      let startMultiple = this.sameMultipleInfo.startMultiple
      if (startMultiple > maxMultiple) startMultiple = maxMultiple
      this.issuesList.find((item, index) => {
        item.isSelected = true
        item.multiple = startMultiple
        if (index + 1 === chasingPeriodsCounts) {
          return true
        }
      })
    },
    doubleMultipleCheckList () {
      this.resetList()
      const { maxMultiple } = this.betInfo
      const chasingPeriodsCounts = +this.doubleMultipleInfo.chasingPeriodsCounts > this.issuesList.length ? this.issuesList.length : +this.doubleMultipleInfo.chasingPeriodsCounts
      this.doubleMultipleInfo.chasingPeriodsCounts = chasingPeriodsCounts
      const interval = this.doubleMultipleInfo.interval
      const incrementMultiple = this.doubleMultipleInfo.incrementMultiple
      this.issuesList.find((item, index) => {
        item.isSelected = true
        const countArea = Math.ceil((index + 1) / interval)
        item.multiple = Math.pow(incrementMultiple, (countArea - 1))
        if (item.multiple > maxMultiple) item.multiple = maxMultiple
        if (index + 1 === chasingPeriodsCounts) {
          return true
        }
      })
    },
    setIssuesList () {
      const dataArr = []
      if (!this.defaultSetting || !this.defaultSetting['issues']) return this.$set(this, 'issuesList', dataArr)
      for (let key in this.defaultSetting['issues']) {
        const issueInfo = this.defaultSetting['issues'][key]
        dataArr.push({
          issue: issueInfo.issue,
          endTime: issueInfo['end_time2'],
          multiple: '',
          isSelected: false
        })
      }
      this.$set(this, 'issuesList', dataArr)
    }
  },
  watch: {
    defaultSetting () {
      this.setIssuesList()
    },
    periodsNumber (val) {
      this.profitRateInfo.chasingPeriodsCounts = val
      this.sameMultipleInfo.chasingPeriodsCounts = val
      this.doubleMultipleInfo.chasingPeriodsCounts = val
    },
    isChasingShow (val) {
      this.show = val
    },
    show (val) {
      this.$store.commit(CLOSE_CHASING_BOX, val)
    }
  },
  mounted () {},
  created () {
    this.setIssuesList()
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99;
    left: 0;
    right: 0;
    background: url("../../../statics/img/game_alert_wrapper_bg.png");
    background-size: 100% 100%;
    /*filter: blur(10px)*/
  }
  .container {
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    width: 598px;
    background-color: #ffffff;
  }
  .container > a:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .container .title {
    height: 56px;
    line-height: 56px;
    padding-left: 27px;
    font-size: 18px;
    color: #fff;
    background-color: #616078;
  }
  /*content begin*/
  .content {
    padding: 6px 0 26px 17px;
  }
  .content .tabs {
    margin-bottom: 10px;
  }
  .content .tabs a {
    float: left;
    height: 41px;
    line-height: 41px;
    padding: 0 17px 0 18px;
    border-radius: 5px;
    font-size: 14px;
    color: #767676;
  }
  .content .tabs a.now-hov{
    background-color: #dddddd;
  }
  .content .chasing-number-counts {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .content .chasing-number-counts > span {
    color: #000000;
    margin-right: 10px;
    display: inline-block;
  }
  .content .chasing-number-setting {
    height: 35px;
    line-height: 35px;
  }
  .content .chasing-number-setting input {
    width: 45px;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    background-color: #ffffff;
    text-align: center;
    color: #777777;
  }
  .content .chasing-number-setting .multiple-start {
    margin-right: 10px;
  }
  .content .chasing-number-setting > i {
    font-style: normal;
    margin-right: 10px;
  }
  .content .chasing-number-setting.fbzh > .interval-count {
    margin-right: 5px;
  }
  .content .chasing-number-setting .min-date-return {}
  .content .chasing-number-setting .chasing-number {
    margin-right: 14px;
  }
  .content .chasing-number-setting > a {
    display: inline-block;
    width: 138px;
    margin-right: 11px;
    height: 100%;
    border-radius: 4px;
    background-color: #4babbf;
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
  .content .chasing-number-description {
    margin-top: 25px;
    padding-top: 16px;
    width: 570px;
    font-size: 13px;
    margin-bottom: 9px;
    border-top: 1px solid #eeeeee;
    text-align: center;
  }
  .content .chasing-number-description i {
    font-style: normal;
    color: #ff939c;
  }
  .content .table {
    height: 188px;
    overflow: auto;
  }
  .content .table table {
    color: #777777;
    width: 547px;
  }
  .content .table table tr {
    height: 37px;
    line-height: 37px;
    border-bottom: 1px solid #c5c5c5;
  }
  .content .table table tr td:nth-of-type(1) {
    line-height: 37px;
    width: 22px;
    text-align: center;
  }
  .content .table table tr td:nth-of-type(1) input {
    margin: 0;
    vertical-align: middle;
  }
  .content .table table tr td:nth-of-type(2) {
    width: 20px;
    text-align: left;
  }
  .content .table table tr td:nth-of-type(3) {
    width: 128px;
    text-align: center;
  }
  .content .table table tr td:nth-of-type(4) {
    width: 109px;
  }
  .content .table table tr td:nth-of-type(4) > input {
    width: 90px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    padding: 0 7px;
    border-radius: 5px;
    margin-right: 5px;
    text-align: center;
    color: #777;
  }
  .content .table table tr td:nth-of-type(4) > input[disabled] {
    cursor: not-allowed;
  }
  .content .table table tr td:nth-of-type(5) > span {
    display: block;
    width: 111px;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .content .table table tr td:nth-of-type(5) {
    width: 111px;
  }
  .content .table table tr td:nth-of-type(6) {
    text-align: center;
  }
  .content .table table tr:nth-of-type(odd) {
    background-color: #ececec;
  }
  .content .table table tr:nth-of-type(even) {}
  .content .tips {
    margin-top: 9px;
    font-size: 12px;
    text-align: center;
    margin-bottom: 20px;
    color: #f17e2e;
  }
  .content .action {
    width: 100%;
    text-align: center;
    position: relative;
  }
  .content .action a {
    display: inline-block;
    width: 159px;
    height: 49px;
    background-color: #4babbf;
    border-radius: 4px;
    line-height: 49px;
    font-size: 18px;
    color: #fff;
  }
  .content .action > div {
    position: absolute;
    right: 59px;
    top: 50%;
    line-height: 20px;
    transform: translateY(-50%);
  }
  .content .action > div > input {
    margin: 0;
    vertical-align: middle;
  }
  .content {}
  /*content end*/
</style>

<style>
  .chasing-number-counts-select {
    width: 80px;
    height: 40px;
  }
</style>
