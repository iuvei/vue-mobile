<template>
  <div class="qs clear-fix">
    <div class="qs-left">
      <div class="choice-number-box-tabs clear-fix">
        <router-link v-for="link in menuList"
                     :key="link.id"
                     :to="link.to"
                     href="javascript:;">{{link.label}}</router-link>
      </div>
      <router-view></router-view>
      <road-list></road-list>
      <betting-record-table></betting-record-table>
    </div>
    <div class="qs-right" >
      <often-play-type></often-play-type>
      <ranking-data></ranking-data>
    </div>
  </div>
</template>

<script>
import shoppingCart from '../../../shopping-cart/shopping-cart'
import rankingDocumentary from '../../../ranking-documentary/ranking-documentary'
import oftenPlayType from '../../../often-play-type/often-play-types'
import bettingRecordTable from '../../../betting-record-table/betting-record-table'
import rankingData from '../../../ranking-data/ranking-data'
import roadList from '../../../road-list/road-list'
import menuListMixins from './menuListConfigMixins'
export default {
  mixins: [ menuListMixins ],
  components: { shoppingCart, rankingDocumentary, oftenPlayType, bettingRecordTable, rankingData, roadList }
}
</script>

<style scoped>
  @import "../../../../statics/css/media/width-767/game-layout.css";
  @import "../../../../statics/css/media/width-992/game-layout.css";
  @import "../../../../statics/css/media/width-1200/game-layout.css";
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
  /*qs-left end*/
  /*choice-number-box-tabs end*/
  .choice-number-box-tabs {
    background: rgb(203, 203, 203);
  }
  .choice-number-box-tabs a {
    float: left;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
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
  .choice-number-box-tabs a:hover {
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
  .choice-number-box-tabs a:hover::after {
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
  /*qs-right end*/
</style>
