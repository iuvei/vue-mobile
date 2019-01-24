<template>
  <div class="activity-bg">
    <top></top>
    <side-bar></side-bar>
    <main-header></main-header>
    <div class="activity-box">
      <p class="activity-title">优惠活动</p>
      <ul class="activity-list-box">
        <li class="activity-list" v-for="(index, listItem) in 5" :key="index">
          <img src="../../statics/img/huodong.png" alt="">
          {{listItem}}
          <a href="javascript:;" class="look-details">查看详情 <i class="look-icon"></i></a>
        </li>
      </ul>
    </div>
    <player-count></player-count>
    <main-footer></main-footer>
  </div>
</template>

<script>
import top from '../main/components/top_2018_8_29'
import mainHeader from '../main/components/header_18_8_29'
import mainFooter from '../main/components/footer_18_8_29'
import playerCount from '../../components/playerCount/playerCount'
import sideBar from '../side-bar/side-bar'
import { getEventDetail } from '@/api/activity/activity'
export default {
  name: 'activity',
  components: { top, mainHeader, mainFooter, sideBar, playerCount },
  methods: {
    getEventData () {
      getEventDetail()
        .then((res) => {
          console.log(res)
        })
    }
  },
  created () {
    this.getEventData()
  }
}
</script>

<style scoped>
.activity-bg {
  background: #fff;
}
.activity-box {
  width: 1109px;
  margin: 0 auto;
  padding-top: 47px;
}
.activity-title {
  color: #272733;
  font-size: 24px;
}
.activity-list-box {
  margin-top: 15px;
  margin-bottom: 300px;
}
.activity-list-box li {
  position: relative;
}
.look-details {
  font-size: 14px;
  color: #fff;
  width: 150px;
  padding-left: 30px;
  line-height: 28px;
  background: url("../../statics/img/look-details-bg.png") no-repeat left center;
  position: absolute;
  left: 0;
  bottom: 13px;
}
.look-icon {
  background: url("../../statics/img/arrow.png") no-repeat center center;
  width: 16px;
  height: 16px;
  position: absolute;
  left: 100px;
  bottom: 6px;
}
</style>
