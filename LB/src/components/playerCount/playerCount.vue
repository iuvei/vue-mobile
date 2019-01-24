<template>
    <div class="player-count">
      <div class="width">
        <a href="javascript:;">
          <img :src="logo" alt="logo">
        </a>
        <ul class="now-player-info clear-fix">
          <li>
            <img :src="userIcon" alt="userIcon">
            当前访问人数：
            <span>{{OnlineNumber | toThousandslsFilter}}</span>
          </li>
          <li>
            <img :src="watcherIcon" alt="watcherIcon">
            当前游戏人数：
            <span>{{gameNumber | toThousandslsFilter}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { homePagePeople } from '../../../src/config/game-default-config'
import logo from '../../statics/img/logo_small.png'
import userIcon from '../../statics/img/user_icon.png'
import watcherIcon from '../../statics/img/watcher_icon.png'
export default {
  name: 'playerCount',
  data () {
    return {
      logo,
      userIcon,
      watcherIcon,
      OnlineNumber: homePagePeople.OnlineNumber, /* 在线人数 */
      gameNumber: homePagePeople.gameNumber, /* 游戏人数 */
      Min: homePagePeople.Min, /* 游戏人数 */
      Max: homePagePeople.Max /* 游戏人数 */
    }
  },
  methods: {
    RandomNumBoth (Min, Max) {
      var Range = Max - Min
      var Rand = Math.random()
      var num = Min + Math.round(Rand * Range)
      this.OnlineNumber += num
      if (num > 0) {
        this.gameNumber = this.OnlineNumber - num
      } else {
        this.gameNumber = this.OnlineNumber + num
      }
    }
  },
  created () {
    var _this = this
    setInterval(function () {
      _this.RandomNumBoth(_this.Min, _this.Max)
    }, 5000)
  }

}
</script>

<style scoped>
  .player-count {
    height: 56px;
    position: relative;
    background-color: #20222e;
  }
  .player-count a {
    display: inline-block;
    height: 56px;
    line-height: 56px;
  }
  .player-count a img {
    vertical-align: middle;
  }
  .now-player-info {
    float: right;
  }
  .now-player-info li {
    float: left;
    font-size: 14px;
    color: #919191;
    height: 100%;
    line-height: 56px;
  }
  .now-player-info li:nth-of-type(1) {
    margin-right: 40px;
  }
  .now-player-info li img {
    vertical-align: middle;
  }
  .now-player-info li span {
    font-size: 24px;
    color: #a68f4c;
  }
</style>
