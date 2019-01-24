<!--suppress ALL -->
<template>
  <div class="H5head">
    <top></top>
    <header>
      <router-link tag="div" to="/index" class="logo">
        <img :src="logo" alt="">
      </router-link>
      <div class="menu" @click="menuListShow = !menuListShow">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="list">
        <elCollapseTransition>
          <ul v-show="menuListShow">
            <li class="list-item" @click="GetGameMenuList()">{{$t('header.digitalLottery')}}
              <el-collapse-transition>
                <div class="szcp" v-if="szcpShow">
                  <div class="szcp-item" v-for="(item, index) in szcpMenuItemList" :key="index">
                    <span>{{item.name}}</span>
                    <ul>
                      <li
                        v-for="(items, indexs) in item.lotteries"
                        @click="$store.dispatch('playTypeGame', { upperName: index, menuLink: items, lotteryId: indexs, isJump: true })"
                        :key="indexs">{{items.name}}</li>
                    </ul>
                  </div>
                </div>
              </el-collapse-transition>
            </li>
            <li class="list-item" @click="zrcpShow = !zrcpShow">{{$t('header.liveLottery')}}
              <el-collapse-transition>
                <ul v-if="zrcpShow">
                  <li>LG | 1.5分真人视频彩</li>
                  <li>LG | 3分真人视频彩</li>
                  <li>LG | 5分真人视频彩</li>
                </ul>
              </el-collapse-transition>
            </li>
            <li class="list-item" v-for="(item, index) in headNavList" :key="index" @click="GetHeadNavList(item.identify, index)">{{item.name}}
              <el-collapse-transition>
                <ul class="list-item-list" :class="{'game-item': item.identify === 'e-game'}" v-if="index === headNavListIndex">
                  <!--{{item.list}}-->
                  <li v-for="(items, indexs) in item.list" @click="getGameDetail(items)" :key="indexs">{{items.name}}</li>
                  <p class="game-more" v-show="gameMoreShow&&item.identify === 'e-game'" @click="gameMore(index)">显示更多</p>
                </ul>
              </el-collapse-transition>
            </li>
            <!--<li class="list-item">{{$t('header.electronicEntertainment')}}</li>-->
            <!--<li class="list-item">{{$t('header.liveVideo')}}</li>-->
            <!--<li class="list-item">{{$t('header.chessEntertainment')}}</li>-->
            <!--<li class="list-item">{{$t('header.sportsEvent')}}</li>-->
            <!--<li class="list-item">{{$t('header.eSports')}}</li>-->
            <!--<li class="list-item">{{$t('header.liveInteraction')}}</li>-->
            <li class="list-item" @click="userCenterOpen">
              {{$t('top.menu')}}
              <elCollapseTransition>
                <ul class="list-item-list" v-show="topMenuShow">
                  <!-- < -->
                  <li @click="userCenterItemOpen('userCenter')">
                    {{$t('top.userCenter')}}
                    <el-collapse-transition>
                      <div  class="user-center-list" v-show="userCenterShow">
                        <router-link tag="div" :to="{name: 'account-management'}">{{$t('top.userAccountManagement')}}</router-link>
                        <router-link tag="div" :to="{name: 'account-statistics'}">{{$t('top.userStatisticalAnalysis')}}</router-link>
                        <router-link tag="div" :to="{name: 'account-profit'}">{{$t('top.userProfitLossStatement')}}</router-link>
                        <router-link tag="div" :to="{name: 'account-change'}">{{$t('top.userAccountChangeDetails')}}</router-link>
                        <router-link tag="div" :to="{name: 'account-gamerecord'}">{{$t('top.userGameRecord')}}</router-link>
                        <router-link tag="div" :to="{name: 'account-bonus'}">{{$t('top.userBonusOverview')}}</router-link>
                      </div>
                    </el-collapse-transition>
                    </li>
                  <li @click="userCenterItemOpen('teamCenter')">{{$t('top.teamCenter')}}
                    <el-collapse-transition>
                      <div  class="user-center-list"  v-show="teamCenterShow">
                        <router-link tag="div" :to="{name: 'team-management'}">{{$t('top.teamUserManagement')}}</router-link>
                        <router-link tag="div" :to="{name: 'team-statistics'}">{{$t('top.teamStatisticalAnalysis')}}</router-link>
                        <router-link tag="div" :to="{name: 'team-profit'}">{{$t('top.teamProfitLossStatement')}}</router-link>
                        <router-link tag="div" :to="{name: 'team-change'}">{{$t('top.teamAccountChangeDetails')}}</router-link>
                        <router-link tag="div" :to="{name: 'team-gamerecord'}">{{$t('top.teamGameRecord')}}</router-link>
                        <router-link tag="div" :to="{name: 'team-financial'}">{{$t('top.teamFinancial')}}</router-link>
                      </div>
                    </el-collapse-transition>
                  </li>
                  <li @click="userCenterItemOpen('financialCenter')">{{$t('top.financialCenter')}}
                    <el-collapse-transition>
                      <div  class="user-center-list" v-show="financialCenterShow">
                        <router-link tag="div" :to="{name: 'financial-recharge'}" href="javascript:;">{{$t('top.financialCenterRecharge')}}</router-link>
                        <router-link tag="div" :to="{name: 'financial-withdraw'}" href="javascript:;">{{$t('top.financialWithdraw')}}</router-link>
                        <router-link tag="div" :to="{name: 'financial-transfer'}" href="javascript:;">{{$t('top.financialTransfer')}}</router-link>
                        <router-link tag="div" :to="{name: 'wallet-progress'}" href="javascript:;">{{$t('top.financialFundingProgress')}}</router-link>
                      </div>
                    </el-collapse-transition>
                  </li>
                  <li @click="userCenterItemOpen('systemCenter')">{{$t('top.systemCenter')}}
                    <el-collapse-transition>
                      <div class="user-center-list" v-show="systemCenterShow">
                        <router-link tag="div" :to="{name: 'activity-center'}" href="javascript:;">{{$t('top.activityCenter')}}</router-link>
                        <div @click="openNewCustomerServiceWindow">{{$t('top.customerService')}}</div>
                        <router-link tag="div" :to="{ name: 'announcement' }" href="javascript:;">{{$t('top.announcementCenter')}}</router-link>
                        <router-link tag="div" :to="{ name: 'stationLetter' }" href="javascript:;">{{$t('top.stationLetter')}}</router-link>
                        <router-link tag="div" :to="{ name: 'help-center' }" href="javascript:;">{{$t('top.helpCenter')}}</router-link>
                        <router-link tag="div" :to="{ name: 'download' }" href="javascript:;">{{$t('top.downCenter')}}</router-link>
                      </div>
                    </el-collapse-transition>
                  </li>
                </ul>
              </elCollapseTransition>

              </li>
            <li class="list-item" v-show="$store.state.user.isLogin" @click="loginOut">{{$t('top.logout')}}</li>
          </ul>
        </elCollapseTransition>
      </div>
      <div class="games-logo">
        <img :src="gameDetail.logo" alt="gameLogo">
      </div>
    </header>
  </div>
</template>
<script>
import top from './top_2018_8_29'
import elCollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import logo from '../../../statics/img/header_logo_18_8_29.png'
import { openNewCustomerServiceWindow } from '../../../util/common'
import { getTird, setHeaderNavList, getHeaderNavList } from '../../../util/third'
import { SET_SZCP_MENU_LIST } from '../../../store/nameSpace'
import {GetThirdGameTypeList, GetThirdGameList, GetThirdGameUrl, GetGameMenu} from '../../../api/game/game'
import { mapGetters } from 'vuex'
export default {
  name: 'H5head',
  components: {top, elCollapseTransition},
  data () {
    return {
      logo,
      menuListShow: false,
      topMenuShow: false,
      userCenterShow: false,
      teamCenterShow: false,
      financialCenterShow: false,
      systemCenterShow: false,
      zrcpShow: false,
      szcpShow: false,
      headNavList: [],
      headNavListIndex: null,
      szcpMenuItemList: [],
      gameEndList: [],
      gameMoreShow: true
    }
  },
  computed: {
    ...mapGetters([
      'gameDetail'
    ])
  },
  methods: {
    loginOut () {
      this.$store.dispatch('loginOut')
        .then(() => {
          this.$router.push('/index')
          this.menuListShow = false
          this.$message({
            message: '成功登出',
            type: 'success'
          })
        })
    },
    userCenterOpen () {
      if (this.userCenterShow || this.teamCenterShow || this.financialCenterShow || this.systemCenterShow) {
        return false
      } else {
        this.topMenuShow = !this.topMenuShow
      }
    },
    userCenterItemOpen (userCenterType) {
      // 用户中心菜单显示控制
      switch (userCenterType) {
        case 'userCenter':
          if (this.userCenterShow) {
            this.userCenterShow = false
            this.topMenuShow = true
            return false
          }
          this.userCenterShow = true
          this.teamCenterShow = this.financialCenterShow = this.systemCenterShow = false
          break
        case 'teamCenter':
          if (this.teamCenterShow) {
            this.teamCenterShow = false
            this.topMenuShow = true
            return false
          }
          this.teamCenterShow = true
          this.userCenterShow = this.financialCenterShow = this.systemCenterShow = false
          break
        case 'financialCenter':
          if (this.financialCenterShow) {
            this.financialCenterShow = false
            this.topMenuShow = true
            return false
          }
          this.financialCenterShow = true
          this.userCenterShow = this.teamCenterShow = this.systemCenterShow = false
          break
        case 'systemCenter':
          if (this.systemCenterShow) {
            this.systemCenterShow = false
            this.topMenuShow = true
            return false
          }
          this.systemCenterShow = true
          this.userCenterShow = this.teamCenterShow = this.financialCenterShow = false
      }
    },
    openNewCustomerServiceWindow () {
      // 联系客服
      openNewCustomerServiceWindow()
    },
    /**
     * @return {boolean}
     */
    GetHeadNavList (gameType, index) {
      this.topMenuShow = false
      if (this.headNavListIndex === index) {
        this.headNavListIndex = null
        if (this.headNavList[index].name === '电子游戏' && !this.gameMoreShow) {
          this.headNavListIndex = index
        }
        return false
      }
      console.log('游戏类别', gameType)
      // 获取导航菜单
      if (!window.sessionStorage[gameType]) {} else {
        this.headNavList[index].list = getTird(gameType)
        let listArr = []
        this.szcpShow = this.zrcpShow = false
        this.headNavListIndex = index
        if (gameType === 'card' || gameType === 'e-game') {
          let arr = []
          getTird(gameType).forEach(item => {
            arr.push(item.data)
          })
          this.headNavList[index].list = listArr = [].concat.apply([], arr)
        }
        if (this.headNavList[index].name === '直播互动') {
          this.headNavListIndex = null
          this.getGameDetail(getTird(gameType)[0])
        }
        if (this.headNavList[index].name === '电子游戏') {
          this.headNavListIndex = null
          this.headNavList[index].list = listArr.slice(0, 20)
          this.gameEndList = listArr.slice(20)
          this.headNavListIndex = index
          console.log(listArr.slice(20))
        }
        this.gameMoreShow = true
        return false
      }
      if (gameType === 'szcp' || gameType === 'zrcp') {
        return false
      } else {
        this.$loadingShow()
        GetThirdGameList(gameType)
          .then(res => {
            if (res.errno === 0) {
              this.$loadingHide()
              // console.log('菜单列表', res.data)
              // console.log(this.headNavList)
              this.headNavList[index].list = res.data
              this.szcpShow = this.zrcpShow = false
              this.headNavListIndex = index
              if (this.headNavList[index].name === '直播互动') {
                this.headNavListIndex = null
                this.getGameDetail(res.data[0])
              }
              if (this.headNavList[index].name === '电子游戏') {
                this.headNavListIndex = null
                this.headNavList[index].list = res.data.slice(0, 20)
                this.gameEndList = res.data.slice(20)
                this.headNavListIndex = index
                // console.log(res.data.slice(20))
              }
              this.gameMoreShow = true
            }
          })
      }
    },
    gameMore (index) {
      this.headNavListIndex = null
      this.gameEndList.forEach(item => {
        this.headNavList[index].list.push(item)
      })
      this.gameMoreShow = false
      this.headNavListIndex = index
    },
    getGameDetail (gameType) {
      // 获取游戏详情
      // console.log(gameType, 111)
      GetThirdGameUrl(gameType.id)
        .then(res => {
          console.log('url:', res.data)
          if (res.errno === 0) {
            // window.location.href = res.data.game_url
            window.open(res.data.game_url)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    GetThirdGameTypeList () {
      // 获取导航
      if (!getHeaderNavList()) {
        GetThirdGameTypeList()
          .then(res => {
            if (res.errno === 0) {
              console.log('游戏列表', res.data)
              this.headNavList = res.data
              setHeaderNavList(res.data)
            }
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        this.headNavList = getHeaderNavList()
        return false
      }
    },
    /**
     * @return { boolean }
     */
    GetGameMenuList () {
      // 获取数字彩票
      this.topMenuShow = this.zrcpShow = this.topMenuShow = false
      if (this.szcpShow) {
        this.szcpShow = false
        return false
      }
      GetGameMenu().then(res => {
        const { data, errno } = res
        if (errno === 0) {
          this.headNavListIndex = null
          // for (let key in data) {
          //   console.log(key, data[key])
          //   // for (let keyInner in data[key]['lotteries']) {
          //   //   data[key]['lotteries'][keyInner].isLike = false
          //   // }
          // }
          this.szcpMenuItemList = data
          this.szcpShow = true
          this.$store.commit(SET_SZCP_MENU_LIST, res.data)
        }
      })
    }
  },
  watch: {
    '$route': function () {
      this.menuListShow = false
      this.topMenuShow = false
      this.userCenterShow = false
      this.teamCenterShow = false
      this.financialCenterShow = false
      this.systemCenterShow = false
      this.szcpShow = false
      this.zrcpShow = false
      this.headNavListIndex = null
    }
  },
  mounted () {
    this.GetThirdGameTypeList()
  }
}
</script>
<style scoped>
.H5head{
  width: 100%;
}
.user-center-list>div{
  text-indent: 4em;
}
header{
  width: 100%;
  height: 45px;
  background: #272733;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
header .logo{
  padding-left: 20px;
}
header .logo img{
  height: 45px;
}
header .menu{
  width: 30px;
  height: 30px;
  margin-right: 10px;
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
}
header .menu div{
  width: 90%;
  height: 2px;
  border-radius: 5px;
  background: white;
}
.H5head header .list{
  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 11;
}
.H5head header .list .list-item{
  width: 100%;
  min-height: 45px;
  background: #f0efef;
  border-bottom: 1px solid #333333;
  padding: 0 10px;
  line-height: 45px;
  font-size: 16px;
  text-indent: 2em;
}
.list-item-list>li{
  min-height: 30px;
  line-height: 30px;
  font-size: 14px;
  background: rgb(136, 203, 235);
  border-bottom: 1px solid #c0bdbd;
}
.list-item-list>li:last-child{
  border-bottom: none;
}
@media screen and (min-width:486px) {
  .games-logo{
    display: none;
  }
}
.games-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 27%;
}
  .game-item{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .game-item li{
    width: 50%;
    padding: 0 5px;
  }
  .szcp{
    width: 100%;
  }
.szcp .szcp-item{
  padding: 0 20px;
  background: #cecece;
}
  .szcp .szcp-item span{
    font-size: 16px;
    font-weight: 600;
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #f17e2e;
    color: white;
  }
.szcp .szcp-item>ul{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.szcp .szcp-item>ul>li{
  width: 33.3%;
}
  .game-more{
    width: 100px;
    height: 30px;
    font-size: 14px;
    text-indent: 0;
    text-align: center;
    margin: 5px auto;
    border-radius: 3px;
    border: 1px solid #f17e2e;
    line-height: 30px;
  }
 @media screen and (max-width:500px ){
  .szcp-item ul li{
    font-size: 14px ;
  }
 }
@media screen and (max-width:430px ){
  .szcp-item ul li{
    font-size: 12px ;
    text-indent: 2em;
  }
 }
@media screen and (max-width:395px ){
  .szcp-item ul li{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media screen and (min-width:486px) {
  .games-logo{
    display: none;
  }
}
.games-logo {
  position: absolute;
  top: 0;
  left: 50%;
  width: 27%;
}
.games-logo img {
  width: 50px;
}
</style>
