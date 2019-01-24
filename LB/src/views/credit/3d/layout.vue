<template>
  <div>
    <div class="choice-number-box">
      <div class="choice-number-box-container">
        <div v-for="item in childPlayList"
             :key="item.id"
             class="choice-type clear-fix">
          <span class="type-title">{{item['name_cn']}}:</span>
          <router-link :class="{ 'now-hov': itemInner.isSelected }"
                       v-for="itemInner in item.children"
                       :key="itemInner.id"
                       :to="{ name: `3d_${$route.matched[3].meta.sub_path}_${item['name_en']}_${itemInner['name_en']}` }"
                       href="javascript:;">{{itemInner['name_cn']}}</router-link>
        </div>
        <div class="play-description clear-fix">
          <div class="btns clear-fix">
            <a @click="$store.commit(SET_LR_PLAY)"
               :class="{ 'now-hov': !showLrPlay }"
               href="javascript:;">冷热</a>
            <a @click="$store.commit(SET_YL_PLAY)"
               :class="{ 'now-hov': !showYlPlay }"
               href="javascript:;">遗漏</a>
          </div>
          <el-tooltip placement="top"
                      :enterable="false">
            <div class="tool-tip-game-rule" slot="content">{{gameRuleTxtBet}}</div>
            <a class="game-rule-text"
               href="javascript:;">{{gameRuleTxtBet}}</a>
          </el-tooltip>
          <el-tooltip placement="top"
                      :enterable="false">
            <div class="tool-tip-game-rule" slot="content">{{gameRuleTxtBonus}}</div>
            <a class="example" href="javascript:;">
              <img :src="exampleIcon" alt="exampleIcon">
              示例
            </a>
          </el-tooltip>
        </div>
        <router-view :flag-count="flagCount"
                     :get-shopping-car-list="getShoppingCarList"></router-view>
        <div class="confirmation-amount clear-fix">
          <div class="bonus-group clear-fix">
            <span>奖金组</span>
            <div>
              <el-select size="mini" v-model="bonusGroup" placeholder="">
                <el-option v-for="(item, index) in availablePrizeGroups.groups"
                           :key="index"
                           :value="item">
                  <span>{{item}}-{{(userInfo['prize_group'] - item) * 100 / maxPrizeGroupOddCount}}%</span>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="multiple clear-fix">
            <span>倍数</span>
            <div>
              <el-input-number v-model="multiple"
                               size="mini"
                               :min="minMultiple"
                               :max="maxMultiple"
                               label=""></el-input-number>
            </div>
          </div>
          <div class="mode clear-fix">
            <span>模式</span>
            <div>
              <el-select size="mini" v-model="coefficient" placeholder="">
                <el-option v-for="(value, key) in coefficientList"
                           :key="value"
                           :label="value"
                           :value="key"></el-option>
              </el-select>
            </div>
          </div>
          <div class="selected clear-fix">
            已选 <span>{{selectedCounts}}</span> 注
          </div>
          <div class="total clear-fix">
            共 <span>{{selectedMoney}}</span> 元
          </div>
        </div>
        <div class="btns clear-fix">
          <a @click="betNow"
             href="javascript:;">
            立即投注
            <img :src="rightIcon"
                 alt="rightIcon">
          </a>
          <a @click="addShoppingCar"
             href="javascript:;">
            加入购物篮
            <img :src="downloadIcon" alt="downloadIcon">
          </a>
          <a @click="chasingNumber" href="javascript:;">
            立即追号
            <img :src="addIcon" alt="addIcon">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import layoutMixins from '../minxins'
export default {
  mixins: [ layoutMixins ]
}
</script>

<style scoped>
  /*tip-text begin*/
  .tip-text {
    width: 387px;
  }
  /*tip-text end*/
  /*choice-number-box begin*/
  .choice-number-box {}
  .choice-number-box-container {
    background-color: #eeeeee;
    padding: 16px 26px 40px 25px;
  }
  .choice-number-box-container .choice-type {
    /*height: 27px;*/
    line-height: 27px;
    padding-left: 75px;
    position: relative;
  }
  .choice-number-box-container .choice-type > span {
    float: left;
    font-size: 14px;
    position: absolute;
    left: 0;
    min-width: 62px;
    color: #545454;
    /*margin-right: 13px;*/
  }
  .choice-number-box-container .choice-type > a {
    float: left;
    line-height: 27px;
    margin-bottom: 8px;
    height: 27px;
    font-size: 12px;
    min-width: 94px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    color: #545454;
    margin-right: 9px;
  }
  .choice-number-box-container .choice-type > a.router-link-active {
    background-color: #f17e2e;
    color: #fff;
  }
  .choice-number-box-container .choice-type > a:hover {
    background-color: #f17e2e;
    color: #fff;
  }
  .choice-number-box-container .play-description {
    margin-top: 20px;
    height: 40px;
    position: relative;
    line-height: 26px;
    padding-bottom: 13px;
  }
  .choice-number-box-container .play-description::after {
    content: '';
    display: block;
    position: absolute;
    width: 1020px;
    height: 1px;
    bottom: 0;
    left: 0;
    background: url("../../../statics/img/line_1px_bottom.png") no-repeat 0 0;
  }
  .choice-number-box-container .play-description .btns {
    float: left;
  }
  .choice-number-box-container .play-description .btns a {
    float: left;
    height: 26px;
    line-height: 26px;
    text-align: center;
    width: 43px;
    background-color: #f0a12e;
    font-weight: bold;
    border-radius: 15px 0 0 15px;
    border: 1px solid #f09454;
    border-right: none;
    font-size: 12px;
    color: #ffffff;
  }
  .choice-number-box-container .play-description .btns a:nth-of-type(2) {
    border-radius: 0 15px 15px 0;
    border: 1px solid #f09454;
    border-left: none;
  }
  .choice-number-box-container .play-description .btns a.now-hov {
    background-color: #ffffff;
    color: #545454;
  }
  .choice-number-box-container .play-description .game-rule-text {
    float: left;
    margin-left: 7px;
    max-width: 610px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #545454;
  }
  .choice-number-box-container .play-description .example {
    float: left;
    margin-left: 10px;
    color: #f17e2e;
  }
  .choice-number-box-container .play-description .example img {
    position: relative;
    top: 3px;
    left: 2px;
  }
  .confirmation-amount {
    margin-top: 30px;
    height: 35px;
    margin-bottom: 24px;
    line-height: 35px;
    font-size: 14px;
    color: #545454;
    padding-left: 18px;
  }
  .confirmation-amount .bonus-group {
    float: left;
    margin-right: 13px;
  }
  .confirmation-amount .bonus-group span {
    float: left;
    margin-right: 7px;
  }
  .confirmation-amount .bonus-group > div {
    float: left;
    width: 166px;
  }
  .confirmation-amount .multiple {
    float: left;
    margin-right: 9px;
  }
  .confirmation-amount .multiple span {
    float: left;
    margin-right: 5px;
  }
  .confirmation-amount .multiple > div {
    float: left;
  }
  .confirmation-amount .mode {
    float: left;
  }
  .confirmation-amount .mode span {
    float: left;
    margin-right: 5px;
  }
  .confirmation-amount .mode > div {
    float: left;
    width: 86px;
  }
  .confirmation-amount .selected {
    float: left;
    margin-left: 38px;
  }
  .confirmation-amount .selected span {
    color: #a68f4c;
    font-weight: bold;
  }
  .confirmation-amount .total {
    float: right;
  }
  .confirmation-amount .total span {
    color: #a68f4c;
    font-weight: bold;
  }
  .choice-number-box-container > .btns {
    width: 507px;
    margin: 0 auto;
  }
  .choice-number-box-container .btns > a {
    float: left;
    text-align: center;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }
  .choice-number-box-container .btns > a img {
    vertical-align: middle;
  }
  .choice-number-box-container > .btns > a:nth-of-type(1) {
    width: 162px;
    color: #fff;
    background-color: #f79a59;
    border: 1px solid #f17e2e;
    border-radius: 3px;
    box-shadow: 0 3px 3px 1px rgba(243, 135, 61, .4);
  }
  .choice-number-box-container > .btns > a:nth-of-type(2) {
    width: 162px;
    color: #7c6626;
    background-color: #eae7d2;
    border: 1px solid #b8b292;
    border-radius: 3px;
    margin: 0 11px 0 10px;
    box-shadow: 0 3px 3px 1px rgba(0, 0, 0, .2);
  }
  .choice-number-box-container > .btns > a:nth-of-type(3) {
    width: 162px;
    color: #f17e2e;
    background-color: #fafafa;
    border: 1px solid #f17e2e;
    border-radius: 3px;
    box-shadow: 0 3px 3px 1px rgba(0, 0, 0, .2);
  }
  .choice-number-box-container > .btns > a:nth-of-type(3):hover {
    background-color: #f9ecdb;
    box-shadow: 0 3px 13px 3px rgba(0, 0, 0, .2);
  }
</style>

<style>
  .tool-tip-game-rule {
    max-width: 800px;
  }
</style>
