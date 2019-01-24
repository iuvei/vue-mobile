<template>
  <transition name="fade-in-linear">
    <div class="wrapper" v-if="show">
      <div class="container">
      <a @click="show = !show" href="javascript:;">
        <img :src="closeIcon" alt="closeIcon">
      </a>
      <div class="title">所有游戏列表</div>
      <div class="content">
        <ul>
          <li v-for="(menuItem, index) in szcpMenuItemList"
              :key="index">
            <h4>{{menuItem.name}}</h4>
            <div class="games clear-fix">
              <a v-for="(innerLink, innerIndex) in menuItem['lotteries']"
                 @click="choiceLikeGame(innerLink)"
                 :key="innerIndex"
                 :class="{ 'red': innerLink.hot === 1, 'blue': innerLink.new === 1, selected: innerLink.isLike }"
                 href="javascript:;">{{innerLink.name}}</a>
            </div>
          </li>
        </ul>
        <el-button class="btn"
                   @click="saveLikeGameList"
                   type="primary"
                   :loading="btnLoading">保存</el-button>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import cqsscLogoYellow from '../../../statics/img/cqssc_logo_yellow.png'
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import { alertMixin } from '../mixin'
import { mapGetters } from 'vuex'
import { setFavoritesLottery } from '@/api/game/game'
export default {
  name: 'syyx-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      cqsscLogoYellow,
      closeIcon,
      name: 'syyx-alert',
      bonusGroup: '',
      multiple: 0,
      btnLoading: false
    }
  },
  methods: {
    choiceLikeGame (game) {
      game.isLike = !game.isLike
    },
    saveLikeGameList () {
      this.btnLoading = true
      const likeList = []
      for (let key in this.szcpMenuItemList) {
        for (let keyInner in this.szcpMenuItemList[key]['lotteries']) {
          const item = this.szcpMenuItemList[key]['lotteries'][keyInner]
          if (item.isLike) likeList.push(keyInner)
        }
      }
      setFavoritesLottery(likeList.join(','))
        .then(res => {
          if (res.errno === 0) {
            return this.$store.dispatch('getOftenPlayTypeList')
          }
        })
        .then(() => {
          this.btnLoading = false
          this.show = false
        })
    }
  },
  computed: {
    ...mapGetters([
      'szcpMenuList'
    ]),
    szcpMenuItemList () {
      if (this.szcpMenuList) {
        return this.szcpMenuList
      }
      return []
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .btn:hover {
    background: rgb(111, 118, 210);
  }
  .btn {
    display: block;
    width: 110px;
    margin: 0 auto;
    text-align: center;
    border-radius: 5px;
    border: none;
    background: #4babbf;
    color: #fff;
    transition: all .3s linear;
  }
  /*content begin*/
  .content > ul:nth-of-type(1) > li {
    margin-bottom: 10px;
  }
  .content > ul:nth-of-type(1) > li > h4 {
    font-size: 18px;
    margin-bottom: 7px;
    font-weight: normal;
    font-family: "黑体";
  }
  .content > ul:nth-of-type(1) > li > .games {}
  /* .content > ul:nth-of-type(1) > li > .games a:hover {
    background: #f63e3e;
    color: #fff;
  } */
  /* .content > ul:nth-of-type(1) > li > .games a:active {
    border: 1px solid #f63e3e;
  } */
  .content > ul:nth-of-type(1) > li > .games a {
    float: left;
    transition: all .3s linear;
    width: 112px;
    height: 38px;
    position: relative;
    line-height: 38px;
    font-size: 12px;
    text-align: center;
    margin-bottom: 8px;
    margin-right: 8px;
    color: #545454;
    border: 1px solid #dcdcdc;
  }
  .content > ul:nth-of-type(1) > li > .games a.blue::after {
    content: '';
    display: block;
    position: absolute;
    right: -2px;
    top: -3px;
    width: 8px;
    height: 8px;
    background-color: #2ec1e0;
    border-radius: 50%;
  }
  .content > ul:nth-of-type(1) > li > .games a.selected {
    border: 1px solid #f63e3e;
  }
  .content > ul:nth-of-type(1) > li > .games a.red::after {
    content: '';
    display: block;
    position: absolute;
    right: -2px;
    top: -3px;
    width: 8px;
    height: 8px;
    background-color: #f63e3e;
    border-radius: 50%;
  }
  /*content end*/
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99;
    left: 0;
    overflow: auto;
    right: 0;
    background: url("../../../statics/img/game_alert_wrapper_bg.png");
    background-size: 100% 100%;
  }
  .container {
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    width: 990px;
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
    padding: 17px 14px 17px 16px;
  }
</style>

<style>
</style>
