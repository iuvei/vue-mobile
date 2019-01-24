<template>
  <div class="top">
    <div class="width clear-fix">
      <div class="top-left">
        <img :src="speakerIcon" alt="speakerIcon">
        <ul class="marq-box" :class="{marq_top:animate}">
          <li v-for="(noticeItem, index) in headerNoticeList" :key="index"><span>{{noticeItem.title}}</span></li>
        </ul>
      </div>
      <div v-if="isLogin" class="top-right clear-fix">
        <ul class="clear-fix">
          <li class="info-messages">
            <router-link :to="{name: 'account-management'}" href="javascript:;">
              <el-badge :value="messageCount" class="item">
                <img :src="userIcon" alt="userIcon">
              </el-badge>
              <span class="username">{{userAccountInfo.nickname}}</span>
            </router-link>
          </li>
          <li class="balance">
            <router-link :to="{name: 'account-balance'}" href="javascript:;">
              彩票余额：<span v-if="!balanceFlag">{{parseFloat(accountInfo.userBalance).toFixed(3)}}</span>
            </router-link>
            <span class="balance-flag" @click="balanceFlanFn">
                <i class="flag-show" v-if="balanceFlag">显示</i>
                <i class="flag-hide" v-if="!balanceFlag">隐藏</i>
            </span>
          </li>
          <li>
            <router-link :to="{name: 'financial-recharge'}" href="javascript:;">
              <img :src="rechargeIcon" alt="rechargeIcon">
              充值
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'financial-withdraw'}" href="javascript:;">
              <img :src="getMoneyIcon" alt="getMoneyIcon">
              提现
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'financial-transfer'}" href="javascript:;">
              <img :src="shareIcon" alt="shareIcon">
              转账
            </router-link>
          </li>
          <li>
            <a @click="changLang" href="javascript:;">
              <img :src="shareIcon" alt="shareIcon">
              {{lang.toUpperCase()}}
            </a>
          </li>
        </ul>
        <a @mouseenter="showMenuDetail"
           @mouseleave="hideMenuDetail"
           href="javascript:;"
           class="menu">
          <img :src="menuIcon" alt="menuIcon">
          <span>菜单</span>
        </a>
        <div v-show="menuShow"
             @mouseenter="showMenuDetail"
             @mouseleave="hideMenuDetail"
             class="menu_detail">
          <div class="menu_list_item">
            <div class="title">
              个人中心
            </div>
            <div class="links clear-fix">
              <router-link :to="{name: 'account-management'}">{{$t('top.userAccountManagement')}}</router-link>
              <router-link :to="{name: 'account-statistics'}">{{$t('top.userStatisticalAnalysis')}}</router-link>
              <router-link :to="{name: 'account-profit'}">{{$t('top.userProfitLossStatement')}}</router-link>
              <router-link :to="{name: 'account-change'}">{{$t('top.userAccountChangeDetails')}}</router-link>
              <router-link :to="{name: 'account-gamerecord'}">{{$t('top.userGameRecord')}}</router-link>
              <router-link :to="{name: 'account-bonus'}">{{$t('top.userBonusOverview')}}</router-link>
            </div>
          </div>
          <div class="menu_list_item">
            <div class="title">
              团队中心
            </div>
            <div class="links clear-fix">
              <router-link :to="{name: 'team-management'}">{{$t('top.teamUserManagement')}}</router-link>
              <router-link :to="{name: 'team-statistics'}">{{$t('top.teamStatisticalAnalysis')}}</router-link>
              <router-link :to="{name: 'team-profit'}">{{$t('top.teamProfitLossStatement')}}</router-link>
              <router-link :to="{name: 'team-change'}">{{$t('top.teamAccountChangeDetails')}}</router-link>
              <router-link :to="{name: 'team-gamerecord'}">{{$t('top.teamGameRecord')}}</router-link>
              <router-link :to="{name: 'team-financial'}">{{$t('top.teamFinancial')}}</router-link>
            </div>
          </div>
          <div class="menu_list_item">
            <div class="title">
              {{$t('top.financialCenter')}}
            </div>
            <div class="links clear-fix">
              <router-link :to="{name: 'financial-recharge'}" href="javascript:;">{{$t('top.financialCenterRecharge')}}</router-link>
              <router-link :to="{name: 'financial-withdraw'}" href="javascript:;">{{$t('top.financialWithdraw')}}</router-link>
              <router-link :to="{name: 'financial-transfer'}" href="javascript:;">{{$t('top.financialTransfer')}}</router-link>
              <router-link :to="{name: 'wallet-progress'}" href="javascript:;">{{$t('top.financialFundingProgress')}}</router-link>
            </div>
          </div>
          <div class="menu_list_item">
            <div class="title">
              {{$t('top.systemCenter')}}
            </div>
            <div class="links clear-fix">
              <router-link :to="{name: 'activity-center'}" href="javascript:;">{{$t('top.activityCenter')}}</router-link>
              <a href="javascript:;" @click="openNewCustomerServiceWindow">{{$t('top.customerService')}}</a>
              <router-link :to="{ name: 'announcement' }" href="javascript:;">{{$t('top.announcementCenter')}}</router-link>
              <router-link :to="{ name: 'stationLetter' }" href="javascript:;">{{$t('top.stationLetter')}}</router-link>
              <router-link :to="{ name: 'help-center' }" href="javascript:;">{{$t('top.helpCenter')}}</router-link>
              <router-link :to="{ name: 'download' }" href="javascript:;">{{$t('top.downCenter')}}</router-link>
              <a href="javascript:;">{{$t('top.toolbox')}}</a>
              <a @click="loginOut" href="javascript:;">{{$t('top.logout')}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="loginForm clear-fix" v-else>
        <input v-model="userInfo.username"
               placeholder="用户名称"
               type="text">
        <input placeholder="会员密码"
               @keyup.enter="loginByUsername"
               v-model="userInfo.password"
               type="password">
        <a @click="loginByUsername"
           class="login"
           href="javascript:;">登录</a>
        <a @click="$router.push('/register')"
           class="register"
           href="javascript:;">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import speakerIcon from '../../../statics/img/top_speaker_icon.png'
import userIcon from '../../../statics/img/top_user_icon.png'
import codeImg from '../../../statics/img/code_example.png'
import shareIcon from '../../../statics/img/top_share_icon.png'
import getMoneyIcon from '../../../statics/img/top_get_money_icon.png'
import rechargeIcon from '../../../statics/img/recharge_icon.png'
import menuIcon from '../../../statics/img/top_menu_icon.png'

import { mapGetters } from 'vuex'
import { SET_LOGIN_STATUS, SET_LANG } from '../../../store/nameSpace'
import { getNoticeList } from '@/api/notice/notice'
import { internalUpdateTime } from '../../../config/game-default-config'
import { openNewCustomerServiceWindow } from '../../../util/common'
import { getToken } from '../../../util/auth'
import { getMessageCount } from '../../../api/userCenter/systemCenter/station-letter.js'
let timer
export default {
  data () {
    return {
      speakerIcon,
      codeImg,
      shareIcon,
      menuIcon,
      getMoneyIcon,
      rechargeIcon,
      userIcon,
      messageCount: 2, // top栏未读消息
      userInfo: {
        username: '',
        password: ''
      },
      menuShow: false,
      dialogVisible: false,
      headerNoticeList: [],
      animate: false,
      balanceFlag: true
    }
  },
  computed: {
    ...mapGetters({
      userAccountInfo: 'userInfo'
    }),
    ...mapGetters([
      'customerServiceInfo',
      'accountInfo',
      'token',
      'isLogin',
      'lang'
    ])
  },
  methods: {
    openNewCustomerServiceWindow () {
      openNewCustomerServiceWindow()
    },
    balanceFlanFn () {
      this.balanceFlag = !this.balanceFlag
    },
    topScroll () {
      this.animate = true
      var _this = this
      setTimeout(() => {
        _this.headerNoticeList.push(_this.headerNoticeList[0])
        _this.headerNoticeList.shift()
        this.animate = false
      }, 500)
    },
    handleClose (done) {
      done()
    },
    changLang () {
      if (this.lang === 'zh') {
        this.$store.commit(SET_LANG, 'en')
      } else {
        this.$store.commit(SET_LANG, 'zh')
      }
    },
    loginByUsername () {
      if (!this.userInfo.username) {
        this.$message({
          message: '请输入您的会员账号',
          type: 'error'
        })
        return
      }
      if (!this.userInfo.password) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return
      }
      this.$store.dispatch('loginByUsername', this.userInfo)
        .then((res) => {
          if (res.errno === 0) {
            this.userInfo.username = ''
            this.userInfo.password = ''
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
        .then(() => {
          this.$store.dispatch('updateUserInfo')
          this.$store.dispatch('getUserBalance')
          this.getMessageCount()
        })
    },
    showMenuDetail () {
      if (this.menuShow) return
      this.menuShow = true
    },
    hideMenuDetail () {
      if (!this.menuShow) return
      this.menuShow = false
    },
    loginOut () {
      this.$store.dispatch('loginOut')
        .then(() => {
          this.$router.push('/index')
          this.$message({
            message: '成功登出',
            type: 'success'
          })
        })
    },
    getNoticeList () {
      getNoticeList()
        .then(res => {
          this.headerNoticeList = res.data
        })
    },
    updateUserAccountInfoByTimer () {
      if (this.token && this.isLogin) {
        timer = setTimeout(() => {
          this.$store.dispatch('getUserBalance')
            .then(() => {
              this.updateUserAccountInfoByTimer()
            })
            .catch(err => {
              console.log(err)
              this.$store.dispatch('loginOut')
            })
        }, internalUpdateTime)
      } else {
        if (timer) clearTimeout(timer)
      }
    },
    getMessageCount () {
      // 获取未读消息数量
      getMessageCount()
        .then(res => {
          if (res.errno === 0) {
            if (res.data.count > 99) {
              this.messageCount = 99
            } else {
              this.messageCount = res.data.count
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created () {
    /* if (this.token) {
      this.$store.commit(SET_LOGIN_STATUS, true)
      this.updateUserAccountInfoByTimer()
    } */
    if (this.token && getToken()) {
      // console.log(3)
      this.$store.dispatch('updateUserInfo')
      this.$store.commit(SET_LOGIN_STATUS, true)
      this.updateUserAccountInfoByTimer()
      this.$store.dispatch('getUserBalance')
    }
    this.getNoticeList()
    setInterval(this.topScroll, 2000)
    if (!this.customerServiceInfo) this.$store.dispatch('getCustomerServiceInfo')
    this.getMessageCount()
  },
  destroyed () {
    if (timer) {
      clearInterval(timer)
    }
  },
  mounted () {
    this.$eventHub.$on('unreadUpdate', e => {
      if (e === 1) {
        this.getMessageCount()
      }
    })
  }
}
</script>

<style scoped>
@media screen and (max-width: 991px){
  .top-left{
    display: none;
  }
}
@media screen and (max-width: 771px){
  .menu{
    display: none;
  }
  .top-right>ul li{
    display: none;
  }
}
@media screen and (max-width: 441px){
  .loginForm input{
    width: 100px !important;
  }
}
@media screen and (max-width: 390px){
  .loginForm input{
    width: 75px !important;
    padding: 0 10px !important;
  }
  /*.loginForm a{*/
    /*min-width: 50px !important;*/
  /*}*/
}
  .top-right>ul .info-messages{
    display: block;
  }
  .top-right>ul .balance{
    display: block;
  }
  /*loginForm begin*/
  .loginForm {
    float: right;
    height: 100%;
    line-height: 37px;
  }
  .loginForm input {
    padding: 0 15px;
  }
  .loginForm a.login {
    display: inline-block;
    min-width: 60px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    padding: 0 7px;
    margin-left: 5px;
    color: #ffffff;
    background-color: #ff6682;
    border-radius: 5px;
  }
  .loginForm a.register {
    display: inline-block;
    min-width: 60px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    padding: 0 7px;
    margin-left: 5px;
    color: #ffffff;
    background-color: #118ee5;
    border-radius: 5px;
  }
  .loginForm input:nth-of-type(1) {
    width: 120px;
    height: 26px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .loginForm input:nth-of-type(2) {
    width: 120px;
    height: 26px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .loginForm input:nth-of-type(1) {
    width: 120px;
    height: 26px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  .loginForm input:nth-of-type(3) {
    width: 70px;
    padding: 0 7px;
    height: 26px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  /*loginForm end*/
  .top {
    background-color: #2a303c;
    height: 37px;
    line-height: 37px;
  }
  .top-left {
    float: left;
    height: 37px;
    /* width: 390px; */
    width: 30%;
    position:relative;
    overflow: hidden;
    transition: all 0.5s;
  }
  .top-left > img {
    vertical-align: sub;
    margin-right: 7px;
  }
  .top-left > span {
    font-size: 14px;
    color: #fff;
    letter-spacing: .37px;
  }
  .marq-box {
    position: absolute;
    left: 25px;
    top: 0;
    width: 100%;
  }
  .marq-box span {
    color: #fff
  }
  .marq-box li {
    width:90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
  }
  .marq_top {
   transition: all 0.5s;
   margin-top: -37px;
  }
  /* --- top - right*/
  .top-right {
    float: right;
    position: relative;
    height: 37px;
    line-height: 37px;
  }
  .menu_detail {
    position: absolute;
    /*todo: padding-bottom*/
    padding: 22px 14px 0 14px;
    border-top: 1px solid #ff9d25;
    /*height: 406px;*/
    top: 100%;
    z-index: 999;
    width: 359px;
    right: 0;
    background-color: #272733;
  }
  .menu_detail .menu_list_item  {
    line-height: 1;
    padding-bottom: 15px;
    border-bottom: 1px solid #38383c;
    padding-left: 9px;
    margin-bottom: 14px;
  }
  .menu_detail .menu_list_item .title {
    font-size: 16px;
    color: #ff9d25;
    margin-bottom: 7px;
    height: 16px;
  }
  .menu_detail .menu_list_item .links {}
  .menu_detail .menu_list_item .links a {
    float: left;
    line-height: 22px;
    font-size: 12px;
    position: relative;
    color: #b6b6be;
    padding-right: 11px;
    margin-right: 11px;
  }
  .menu_detail .menu_list_item .links a:nth-of-type(3n-1) {
    /*padding: 0 11px;
    position: relative;
    margin: 0 11px 0 11px;*/
  }
  /*.menu_detail .menu_list_item .links a:nth-of-type(3n-1)::after {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    background-color: #565656;
    position: absolute;
    left:0;
    top: 54%;
    transform: translateY(-50%);
  }*/
  .menu_detail .menu_list_item .links a:nth-of-type(1)::before,
  .menu_detail .menu_list_item .links a:nth-of-type(3n-1)::before,
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(3)::after,
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(6)::after,
  .menu_detail .menu_list_item:nth-of-type(3) .links a:nth-of-type(3)::after {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    background-color: #565656;
    position: absolute;
    right:0;
    top: 50%;
    transform: translateY(-50%);
  }
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(8)::before {
    display: none;
  }
  .menu_detail::after {
    content: '';
    display: block;
    position: absolute;
    width: 15px;
    height: 8px;
    background: url("../../../statics/img/arrow_top_menu.png") no-repeat 0 0;
    top: -8px;
    right: 31px;
  }
  .menu_detail .menu_list_item:nth-of-type(3) .links a:nth-of-type(3),
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(6),
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(3) {
    padding-right: 11px;
    margin-right: 11px;
    position: relative;
  }
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(5) {
    padding-left: 0;
    margin-left: 0;
  }
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(5)::after {
    display: none;
  }
  .menu_detail .menu_list_item:nth-of-type(4) .links a:nth-of-type(4) {
    padding-right: 11px;
    margin-right: 11px;
  }
  .top-right .info-messages img {
    vertical-align: sub;
  }
  .top-right .info-messages {
    cursor:pointer;
  }
.top-right .info-messages>a{
  display: flex;
}
.top-right .info-messages>a>.item{
  flex: 1;
}
.top-right .info-messages>a>.username{
  flex: 3;
}
  .top-right .username {
    float: left;
    font-size: 12px;
    color: #b6b6be;
    margin-left: 4px;
    width: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .top-right .item {
    float: left;
  }
  .top-right > ul {
    float: left;
  }
  .top-right > ul > li {
    float: left;
    border-right: 1px solid #000000;
  }
  .top-right > ul > li,
  .top-right > ul > li > a {
    float: left;
    font-size: 12px;
    color: #b6b6be;
  }
  .top-right > ul > li:nth-of-type(3) a,
  .top-right > ul > li:nth-of-type(4) a,
  .top-right > ul > li:nth-of-type(5) a,
  .top-right > ul > li:nth-of-type(6) a {
    display: inline-block;
    padding: 0 11px;
    width: 100%;
    height: 100%;
  }
  .top-right > ul > li:nth-of-type(6) {
    min-width: 62px;
  }
  .top-right > ul > li:nth-of-type(3) img {
    vertical-align: sub;
  }
  .top-right > ul > li:nth-of-type(4) img,
  .top-right > ul > li:nth-of-type(5) img {
    vertical-align: baseline;
  }
  .balance {
    min-width: 134px;
    padding: 0 10px;
    text-align: center;
  }
  .top-right > a {
    float: right;
  }
  .menu {
    float: right;
    margin-right: 11px;
    font-size: 16px;
    position: relative;
    color: #f17e2e;
    margin-left: 11px;
  }

/*余额显示隐藏样式*/
  .balance-flag {
    margin-left: 5px;
  }
  .balance-flag .flag-show, .balance-flag .flag-hide{
    padding-left: 16px;
    display: inline-block;
    font-style: normal;
    cursor: pointer;
    background-size: 12px 12px !important;
  }
  .balance-flag .flag-show {
    background: url('../../../statics/img/balance-show-white.png') no-repeat left center;
  }
  .balance-flag .flag-show:hover {
    color: #ffd3d3;
    background: url('../../../statics/img/balance-show-pink.png') no-repeat left center;
  }
  .balance-flag .flag-hide {
    background: url('../../../statics/img/balance-hide-white.png') no-repeat left center;
  }
  .balance-flag .flag-hide:hover {
    color: #ffd3d3;
    background: url('../../../statics/img/balance-hide-pink.png') no-repeat left center;
  }
 </style>

<style>
  .item .el-badge__content {
    width: 11px;
    height: 11px;
    text-align: center;
    line-height: 11px;
    background-color: #ff4c39;
    border: none;
    font-size: 10px;
    padding: 0;
    top: 7px;
    left: 2px;
  }
</style>
