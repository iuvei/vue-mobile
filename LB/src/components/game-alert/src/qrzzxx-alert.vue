<template>
  <transition name="fade-in-linear">
    <div v-if="show" class="wrapper">
      <div class="container">
        <a @click="closeAlertBox"
           href="javascript:;">
          <img :src="closeIcon"
               alt="closeIcon">
        </a>
        <div class="title">系统提示－请确认以下注单内容</div>
        <div class="content">
          <div class="table">
            <table v-if="mode === 'normal'">
              <tr>
                <th>游戏</th>
                <th>玩法</th>
                <th>下注内容</th>
                <th>倍数(模式)</th>
                <th>金额</th>
              </tr>
              <tr v-for="(item, index) in shoppingCarList"
                  :key="index">
                <td><div>{{item.lotteryName}}</div></td>
                <td><div>{{`${item.tabName}_${item.typeName}`}}</div></td>
                <td>
                  <el-tooltip placement="top"
                              :enterable="false">
                    <div slot="content">{{showNumberList(item)}}</div>
                    <div class="choice-number-show">{{showNumberList(item)}}</div>
                  </el-tooltip>
                </td>
                <td><div>{{item.multiple}}({{item.coefficientLabel}})</div></td>
                <td><div>￥{{item.selectedMoney}}元</div></td>
              </tr>
            </table>
            <table v-else-if="mode === 'handicap'">
              <tr>
                <th>游戏</th>
                <th><div>玩法</div></th>
                <th><div>下注内容</div></th>
                <th><div>金额</div></th>
              </tr>
              <tr v-for="(item, index) in shoppingCarList"
                  :key="index">
                <td><div>{{item.lotteryName}}</div></td>
                <td><div>{{`${item.showOwnLabel ? item.ownLabel: item.tabName}`}}</div></td>
                <td><div>{{item.label}}</div> </td>
                <td><div>￥{{item.betCount}}元</div></td>
              </tr>
            </table>
          </div>
          <p>投注总金额:￥{{allCountMoney}}元</p>
          <div v-if="singlePickList.length"
               class="tips">
            温馨提示：当前注单[{{singlePickList | getCount}}]为单挑注单,中奖率低于{{defaultSetting['challenge_rate'] * 100}}%的单挑最高派奖[{{defaultSetting['challenge_profit_limit']}}]元
          </div>
          <div class="btns clear-fix">
            <a @click="submitBetList"
               href="javascript:;">提交</a>
            <a @click="closeAlertBox"
               href="javascript:;">取消</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'

import { showNumberList } from '../../../util'
import { alertMixin } from '../mixin'
import { mapGetters } from 'vuex'
import { CLEAR_SHOPPING_CAR, CLOSE_CHASING_BOX, CLOSE_CREATE_NUMBER_BOX,
  DELETE_SHOPPING_ITEM } from '../../../store/nameSpace'
import { betInCommon } from '../statics/js/util'

export default {
  name: 'qrzdxx-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      closeIcon,
      name: 'qrzdxx-alert',
      bonusGroup: '',
      multiple: 0,
      showNumberList,
      shoppingCarList: [],
      singlePickList: [],
      lotteryId: '',
      isClearShoppingCar: false,
      isChasingNumber: false,
      isCreateNumber: false,
      chasingInfo: null,
      mode: 'normal',
      isSecondAlert: false,
      // 是否是追号弹窗中的追号item 如果是那么该值为要删除的shoppingCar中的删除item下标
      shoppingCarDeleteIndex: ''
    }
  },
  computed: {
    ...mapGetters([
      'defaultSetting'
    ]),
    allCountMoney () {
      if (!this.shoppingCarList) return 0
      let count = 0
      if (this.mode === 'normal') {
        this.shoppingCarList.map(item => {
          count += item.selectedMoney
        })
      } else if (this.mode === 'handicap') {
        this.shoppingCarList.map(item => {
          count += Number(item.betCount)
        })
      }
      return count
    }
  },
  watch: {
    shoppingCarList (val) {
      if (val && val.length) {
        // 系统最高奖金组
        const sysMaxGroup = this.defaultSetting['sys_max_prize_group']
        // 单挑最高中奖金额
        const challengePrizeLimit = this.defaultSetting['challenge_profit_limit']
        // 单挑判定比例
        const challengeRate = this.defaultSetting['challenge_rate']
        this.singlePickList = []
        val.map((item, index) => {
          // 投注金额
          const betMoney = item.selectedMoney
          // 当前奖金组
          const bonusGroup = item.bonusGroup
          // 当前奖金组的奖金标准
          const prize = item.prize
          // 奖金
          const bonus = +sysMaxGroup / +bonusGroup * +prize
          // 判定比例
          const singlePickRebate = betMoney / bonus
          if (singlePickRebate < challengeRate) {
            this.singlePickList.push({
              bonus: challengePrizeLimit,
              count: index + 1
            })
          }
        })
      }
    }
  },
  methods: {
    submitBetList () {
      betInCommon({
        lotteryId: this.lotteryId,
        isChasingNumber: this.isChasingNumber,
        shoppingCarList: this.shoppingCarList,
        mode: this.mode,
        chasingInfo: this.chasingInfo
      })
        .then(res => {
          const { errno } = res
          if (errno === 0) {
            this.$message({
              message: '投注成功',
              type: 'success'
            })
          } else if (res.errno === 4063) {
            // 对玩法关闭的错误码进行单独的流程处理
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
          this.$store.dispatch('getUserBalance')
          if (this.isClearShoppingCar) this.$store.commit(CLEAR_SHOPPING_CAR)
          this.$store.dispatch('clearSelectedBalls')
          if (this.isChasingNumber) {
            this.$store.commit(CLOSE_CHASING_BOX, false)
          }
          if (this.isCreateNumber) {
            this.$store.commit(CLOSE_CREATE_NUMBER_BOX, false)
          }
          if (this.shoppingCarDeleteIndex !== '') {
            this.$store.commit(DELETE_SHOPPING_ITEM, this.shoppingCarDeleteIndex)
          }
          this.show = false
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '服务器错误, 请稍后重试',
            type: 'error'
          })
          this.$store.dispatch('getUserBalance')
          if (this.isClearShoppingCar) this.$store.commit(CLEAR_SHOPPING_CAR)
          // this.$store.commit(SET_SSC_SELECTED_COUNTS, 0)
          if (this.isChasingNumber) {
            this.$store.commit(CLOSE_CHASING_BOX, false)
          }
          if (this.isCreateNumber) {
            this.$store.commit(CLOSE_CREATE_NUMBER_BOX, false)
          }
          this.show = false
        })
    }
  },
  created () {
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .choice-number-show {
    cursor: pointer;
    color: red;
    text-decoration: underline;
  }
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
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
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
  .container .content {
    padding: 32px 16px 20px 14px;
  }
  /*table begin*/
  .container .content .table {
    padding: 10px;
    height: 227px;
    overflow: auto;
    border: 1px solid #eeeeee;
    margin-bottom: 15px;
  }
  .container .content .table table {
    width: 100%;
  }
  .container .content .table table tr:nth-of-type(1) {
    background-color: #eaeaea;
    height: 36px;
    line-height: 36px;
  }
  .container .content .table table tr th:nth-of-type(1),
  .container .content .table table tr td:nth-of-type(1) div {
    width: 80px;
    text-align: left;
  }
  .container .content .table table tr:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  .container .content .table table tr:nth-of-type(even) {
    background-color: #fff;
  }
  .container .content .table table tr th:nth-of-type(2),
  .container .content .table table tr th:nth-of-type(2) div,
  .container .content .table table tr td:nth-of-type(2) div {
    width: 115px;
  }

  .container .content .table table tr td {
    text-align: center;
  }
  .container .content .table table tr th:nth-of-type(3),
  .container .content .table table tr th:nth-of-type(3) div,
  .container .content .table table tr td:nth-of-type(3) div {
    width: 105px;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: center;
    white-space: nowrap;
  }
  .container .content .table table tr th:nth-of-type(4),
  .container .content .table table tr th:nth-of-type(4) div,
  .container .content .table table tr td:nth-of-type(4) div {
    width: 115px;
  }
  .container .content .table table tr th:nth-of-type(5),
  .container .content .table table tr td:nth-of-type(5) div {
    width: 115px;
  }
  .container .content .table table tr th,
  .container .content .table table tr td div {
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: center;
    white-space: nowrap;
  }
  .container .content .table table tr {
    height: 34px;
    line-height: 34px;
  }
  .container .content .table table tr th:nth-of-type(1),
  .container .content .table table tr td:nth-of-type(1) {
    padding-left: 15px;
  }
  /*table begin*/
  .container .content > p {
    padding-top: 10px;
    border-top: 1px solid #f3f3f3;
    font-size: 13px;
    color: #777777;
    text-align: center;
    margin-bottom: 14px;
  }
  .container .content > .tips {
    text-align: center;
    color: #f17e2e;
    word-break: break-word;
    font-size: 12px;
  }
  .container .content > .btns {
    width: 124px;
    margin: 36px auto 0 auto;
  }
  .container .content > .btns a {
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    width: 60px;
    border-radius: 4px;
  }
  .container .content > .btns a:nth-of-type(1) {
    background-color: #4babbf;
  }
  .container .content > .btns a:nth-of-type(2) {
    background-color: #959595;
    margin-left: 4px;
  }
</style>

<style>
</style>
