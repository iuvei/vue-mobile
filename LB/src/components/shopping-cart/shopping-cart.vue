<template>
  <div :style="choiceListBoxStyle" class="choice-list">
    <div class="choice-list-container">
      <div class="choice-list-content">
        <div v-for="(item, index) in shoppingCarList"
             :key="index"
             class="choice-list-item clear-fix">
          <span>{{item.lotteryName}}</span>
          <span>{{`${item.tabName}_${item.typeName}`}}</span>
          <span>{{item.awardInfo.issue}}</span>
          <span>
            <el-tooltip placement="top"
                        :enterable="false">
              <div slot="content">{{showNumberList(item)}}</div>
              <span class="show-choice-number">{{showNumberList(item)}}</span>
            </el-tooltip>
          </span>
          <span>{{item.bonusGroup ? item.bonusGroup : '无'}}</span>
          <span>[{{item.selectedCounts}}注]</span>
          <span>[{{item.multiple}}倍]</span>
          <span>[{{item.coefficientLabel}}]</span>
          <span>￥{{item.selectedMoney}}元</span>
          <a class="chasing-number"
             @click="chasingNumberInCar(item, index)"
             href="javascript:;">追号</a>
          <a class="delete"
             @click="$store.commit(DELETE_SHOPPING_ITEM, index)"
             href="javascript:;">
            <img :src="deleteIcon" alt="deleteIcon">
          </a>
        </div>
      </div>
    </div>
    <div class="btns clear-fix">
      <a @click="$store.commit(CLEAR_SHOPPING_CAR)" href="javascript:;">
        清空选号
        <img :src="cancelYellowIcon" alt="cancelYellowIcon">
      </a>
      <a @click="confirmBet" href="javascript:;">
        确认投注
        <img :src="rightIcon" alt="rightIcon">
      </a>
    </div>
  </div>
</template>

<script>
import deleteIcon from '../../statics/img/delete_qs_shop_car.png'
import cancelYellowIcon from '../../statics/img/clear_smp.png'
import rightIcon from '../../statics/img/right_icon_smp.png'

import { mapGetters } from 'vuex'
import { CLEAR_SHOPPING_CAR, DELETE_SHOPPING_ITEM } from '../../store/nameSpace'
import { showNumberList } from '../../util'
import { betInCommon } from '../game-alert/statics/js/util'

export default {
  data () {
    return {
      cancelYellowIcon,
      rightIcon,
      deleteIcon,
      showNumberList,
      CLEAR_SHOPPING_CAR,
      DELETE_SHOPPING_ITEM
    }
  },
  computed: {
    ...mapGetters([
      'isChoiceShow',
      'lotteryId',
      'szcpMenuList',
      'defaultSetting',
      'shoppingCarList'
    ]),
    choiceListBoxStyle () {
      return {
        height: this.shoppingCarList.length ? '297px' : '0',
        marginTop: this.shoppingCarList.length ? '13px' : '0px',
        padding: this.shoppingCarList.length ? '26px 33px 22px 31px' : '0'
      }
    }
  },
  methods: {
    chasingNumberInCar (betItem, deleteIndex) {
      this.$loadingShow()
      this.$store.dispatch('getBetSettings')
        .then(() => {
          this.$gameAlertKszh({
            betInfo: betItem,
            defaultSetting: this.defaultSetting,
            rootEl: this.$root.$el,
            shoppingCarDeleteIndex: deleteIndex
          })
          this.$loadingHide()
        })
        .catch(err => {
          console.log(err)
          this.$loadingHide()
        })
    },
    confirmBet () {
      const { bet_confirm: betConfirm } = this.defaultSetting
      if (!betConfirm) {
        this.$loadingShow()
        return betInCommon({
          lotteryId: this.lotteryId,
          isChasingNumber: false,
          shoppingCarList: this.shoppingCarList,
          mode: 'normal',
          chasingInfo: null
        })
          .then(res => {
            if (res.errno === 0) {
              this.$message({
                message: '投注成功',
                type: 'success'
              })
            }
            this.$store.dispatch('getUserBalance')
            this.$store.commit(CLEAR_SHOPPING_CAR)
            this.shoppingCarList = []
            this.$loadingHide()
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: '服务器错误',
              type: 'error'
            })
            this.$loadingHide()
          })
      }
      this.$gameAlertQrzdxx({
        shoppingCarList: this.shoppingCarList,
        lotteryId: this.lotteryId,
        rootEl: this.$root.$el,
        isClearShoppingCar: true
      })
    }
  },
  created () {
  }
}
</script>

<style>
  /*choice-list begin*/
  .choice-list {
    overflow: hidden;
    transition: height .2s linear;
    height: 297px;
    background-color: #eeeeee;
    margin-top: 13px;
    padding: 26px 33px 22px 31px;
  }
  .choice-list .choice-list-container {}
  .choice-list .choice-list-content {
    padding: 2px 24px 0 5px;
    border: 1px solid #9a9a9a;
    height: 185px;
    overflow-y: scroll;
  }
  .choice-list .choice-list-content .choice-list-item {
    font-size: 12px;
    color: #6f6f6f;
    margin-top: 5px;
    line-height: 20px;
  }
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(1),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(2),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(4),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(3) {
    float: left;
    width: 100px;
    text-align: left;
  }
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(4) .show-choice-number {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: red;
    text-decoration: underline;
    cursor:pointer;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 100%;
  }
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(5),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(6),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(9) {
    float: left;
    width: 60px;
    text-align: left;
  }

  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(4) {
    padding-right: 5px;
  }
  .choice-list .choice-list-content .choice-list-item > span {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    height: 20px;
  }
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(7),
  .choice-list .choice-list-content .choice-list-item > span:nth-of-type(8) {
    float: left;
    width: 40px;
    text-align: left;
  }
  .choice-list .choice-list-content .choice-list-item > img {
    float: right;
  }
  .choice-list .choice-list-content .choice-list-item > .delete {
    float: right;
  }
  .choice-list .choice-list-content .choice-list-item > .chasing-number {
    float: right;
    width: 46px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    border: 1px solid #f6c27e;
    background-color: #ff9100;
    margin-left: 8px;
    border-radius: 3px;
  }
  .choice-list .btns {
    width: 336px;
    margin: 14px auto 0 auto;
    height: 50px;
  }
  .choice-list .btns > a:nth-of-type(1) {
    float: left;
    width: 163px;
    line-height: 50px;
    font-size: 18px;
    border: 1px solid #b8b292;
    border-left: 2px solid #b5a37e;
    box-shadow: 0 3px 3px rgba(0, 0, 0, .4);
    text-align: center;
    color: #7c6626;
    background-color: #d8d5c0;
    border-radius: 4px;
  }
  .choice-list .btns > a:nth-of-type(2) {
    float: left;
    width: 163px;
    line-height: 50px;
    font-size: 18px;
    border: 1px solid #f17e2e;
    border-left: 2px solid #b5a37e;
    box-shadow: 0 3px 3px rgba(0, 0, 0, .4);
    text-align: center;
    color: #fff;
    margin-left: 10px;
    background-color: #f28437;
    border-radius: 4px;
  }
  /*choice-list end*/
</style>
