<template>
  <div class="often-play-type">
    <div class="often-play-type-title box-title">
      <h4>常玩彩种</h4>
      <a @click="showAllGameType" href="javascript:;">
        <img :src="addIconYellow" alt="addIconYellow">
      </a>
    </div>
    <div class="often-play-type-content">
      <a v-for="(item, index) in oftenPlayTypes"
         :key="index"
         @click="playOneLikeGame(item)"
         href="javascript:;">
        <div>{{item.name}}</div>
        <span>{{item.gameBeginTime ? item.gameBeginTime : '暂未开放'}}</span>
      </a>
    </div>
  </div>
</template>

<script>
import addIconYellow from '../../statics/img/add_icon_+.png'

import { mapGetters } from 'vuex'

export default {
  name: 'often-play-types',
  data () {
    return {
      addIconYellow
    }
  },
  methods: {
    showAllGameType () {
      this.$gameAlertSyyx()
    },
    playOneLikeGame (item) {
      let upperName = ''
      const lotteryId = item.lottery_id
      for (let key in this.szcpMenuList) {
        for (let keyInner in this.szcpMenuList[key]['lotteries']) {
          if (
            this.szcpMenuList[key]['lotteries'][keyInner].identifier === item.identifier
          ) {
            upperName = key
            break
          }
        }
      }
      this.$store.dispatch('playTypeGame', { upperName, menuLink: item, lotteryId, isJump: true })
    }
  },
  computed: {
    ...mapGetters([
      'oftenPlayTypes',
      'szcpMenuList',
      'gameDetail',
      'userInfo'
    ])
  },
  created () {
    this.$store.dispatch('getOftenPlayTypeList')
  },
  destroyed () {
    this.$store.dispatch('closeOftenGameList')
  }
}
</script>

<style scoped>
  /*often-play-type begin*/
  .box-title {
    height: 42px;
    position: relative;
    background-color: #cbcbcb;
    padding-left: 18px;
  }
  .box-title > h4 {
    line-height: 42px;
    color: #545454;
    font-size: 15px;
  }
  .qs-right {
    float: left;
    width: 278px;
  }
  .qs-right .often-play-type {
    margin-bottom: 12px;
    position: relative;
  }
  .qs-right .often-play-type .often-play-type-title {
  }
  .qs-right .often-play-type .often-play-type-title > a {
    position: absolute;
    right: 14px;
    top: 8px;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: #f17e2e;
    line-height: 19px;
    text-align: center;
  }
  .qs-right .often-play-type .often-play-type-title > h4 {
    float: left;
    line-height: 42px;
    color: #545454;
    font-size: 15px;
  }
  .qs-right .often-play-type .often-play-type-content {
    background-color: #eeeeee;
    overflow-y: scroll;
    height: 212px;
    padding: 8px 10px 0 10px;
  }
  .qs-right .often-play-type .often-play-type-content > a {
    float: left;
    width: 117px;
    height: 59px;
    background-color: #ffffff;
    border: 1px solid #c3c3c3;
    text-align: center;
    padding-top: 12px;
    margin-bottom: 6px;
    border-radius: 5px;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov {
    background-color: #f17e2e;
    border: 1px solid #f17e2e;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov > div {
    color: #fff;
  }
  .qs-right .often-play-type .often-play-type-content > a:hover {
    background-color: #f17e2e;
    border: 1px solid #f17e2e;
  }
  .qs-right .often-play-type .often-play-type-content > a:hover div {
    color: #fff;
  }
  .qs-right .often-play-type .often-play-type-content > a:hover span {
    color: #fff;
  }
  .qs-right .often-play-type .often-play-type-content > a.now-hov > span {
    color: #FFFFFF;
  }
  .qs-right .often-play-type .often-play-type-content > a:nth-of-type(2n-1) {
    margin-right: 6px;
  }
  .qs-right .often-play-type .often-play-type-content > a > div {
    color: #545454;
    font-size: 15px;
    margin-bottom: 7px;
  }
  .qs-right .often-play-type .often-play-type-content > a > span {
    color: #545454;
    font-size: 12px;
    letter-spacing: 2px;
  }
  /*often-play-type end*/
</style>
