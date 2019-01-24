<template>
  <div class="handicap">
    <div class="setting clear-fix">
      <div class="rebate clear-fix">
        返点:
        <span>{{rebate}}%</span>
        <div>
          <el-slider v-model="rebate"
                     :min="minRebate"
                     :step="rebateStep"
                     :max="maxRebate"
                     :format-tooltip="formatRebate"></el-slider>
        </div>
      </div>
      <div class="btns clear-fix">
        <a :class="{ 'now-hov': handicapChoiceWay === 0 }"
           @click="$store.commit(SET_HANDICAP_CHOICE_WAY, 0)"
           href="javascript:;">一般</a>
        <a :class="{ 'now-hov': handicapChoiceWay === 1 }"
           @click="$store.commit(SET_HANDICAP_CHOICE_WAY, 1)"
           href="javascript:;">快选</a>
        <a :class="{ 'now-hov': handicapChoiceWay === 2 }"
           @click="setQuickSelectAmountArr"
           href="javascript:;">快选金额</a>
      </div>
      <div class="amount clear-fix">
        金额:
        <div>
          <el-input-number v-model="quickAmount"
                           size="mini"
                           :ref="`quick-amount`"
                           :step="betCountStep"
                           @change="checkQuickAmount"
                           @blur="checkQuickAmount"
                           :min="minAmount"
                           label=""></el-input-number>
        </div>
      </div>
    </div>
    <router-view :clear-count="clearCount"
                 :get-bet-data-list="getBetDataList"
                 :get-count-flag="getCountFlag"></router-view>
    <div class="betting-btns-wrapper">
      <div class="betting-btns clear-fix">
        <a href="javascript:;"
           @click="clearCount++">
          清空选号
          <img :src="clearIcon" alt="clearIcon">
        </a>
        <a href="javascript:;" @click="showOrderInAlert">
          立即投注
          <img :src="rightIcon"
               alt="rightIcon">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import lotteryMixinsHandicap from '../mixins-handicap'
export default {
  mixins: [ lotteryMixinsHandicap ]
}
</script>

<style scoped>
  /* handicap begin */
  .handicap {
    background-color: #eee;
    padding: 12px 17px 28px 17px;
  }
  /* setting begin */
  .setting {
    position: relative;
  }
  .setting .rebate {
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #545454;
  }
  .setting .rebate > span {
    display: inline-block;
    width: 38px;
  }
  .setting .rebate > div {
    float: right;
    margin-left: 12px;
    width: 140px;
  }
  .setting .btns {
    float: right;
    line-height: 38px;
    height: 38px;
    padding-top: 5px;
  }
  .setting .btns a {
    float: left;
    padding: 0 11px;
    height: 27px;
    line-height: 27px;
    border-radius: 4px;
    color: #ff9100;
    border: 1px solid #f17e2e;
    margin-left: 4px;
  }
  .setting .btns a.now-hov {
    background-color: #f17e2e;
    color: #fff;
  }
  .setting .amount {
    position: absolute;
    font-size: 14px;
    left: 50%;
    color: #545454;
    height: 35px;
    line-height: 35px;
    transform: translateX(-50%);
  }
  .setting .amount > div {
    float: right;
    width: 126px;
    height: 100%;
    margin-left: 8px;
  }
  /* setting end */
  /* betting-btns-wrapper begin */
  .betting-btns-wrapper {
    border-top: 1px solid #b2b2b2;
  }
  .betting-btns-wrapper .betting-btns {
    width: 335px;
    padding-top: 15px;
    margin: 0 auto;
  }
  .betting-btns-wrapper .betting-btns a {
    float: left;
    width: 162px;
    height: 50px;
    border-radius: 4px;
    line-height: 50px;
    text-align: center;
  }
  .betting-btns-wrapper .betting-btns a:nth-of-type(1) {
    background-color: #ece9d4;
    border: 1px solid #b8b292;
    font-size: 18px;
    color: #7c6626;
    box-shadow: 0 3px 7px 1px rgba(0, 0, 0, .2);
  }
  .betting-btns-wrapper .betting-btns a:nth-of-type(2) {
    background-color: #f79c5b;
    border: 1px solid #f17e2e;
    font-size: 18px;
    color: #fff;
    margin-left: 11px;
    box-shadow: 0 3px 7px 1px rgba(0, 0, 0, .2);
  }
  /* betting-btns-wrapper end */
  /* handicap end */
</style>
