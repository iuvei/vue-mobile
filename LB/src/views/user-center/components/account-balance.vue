<template>
  <!--eslint-disable-->
  <div class="width">
    <p class="title">账户总览</p>
    <div class="account-balance">
      <ul>
        <li class="account-balance-li">
          <div class="account-balance-box">
            <div class="account-balance-game" >
              <div class="G_img" :style="{ background:'url('+ iconBg01 +')',backgroundSize:'cover'}"></div>
              <span>数字彩票</span>
            </div>
            <div class="account-balance-line"></div>
            <div class="account-balance-Rebate">
              <p>返点： <span>{{userInfo.userInfo.prize_group}}</span> </p>
            </div>
            <div class="account-balance-money">
              <p>余额： <span>{{ userInfo.userInfo.abalance | numFilter}}</span> </p>
            </div>
            <div class="account-balance-Refresh">
              <span @click.stop="getGameBalance('merchant_site')">刷新</span>
            </div>
          </div>
        </li>
        <li class="account-balance-li" v-for="(item, index) in platformList" :key="index">
          <div class="account-balance-box">
            <div class="account-balance-game" >
              <div class="G_img" :style="{ background:'url('+item.icon+')',backgroundSize:'cover'}"></div>
              <span>{{ item.game_name }}</span>
            </div>
            <div class="account-balance-line"></div>
            <div class="account-balance-Rebate">
              <p>返点： <span>{{item.percent_value}}%</span> </p>
            </div>
            <div class="account-balance-money">
              <p>余额： <span>{{ item.balance | numFilter}}</span> </p>
            </div>
            <div class="account-balance-Refresh">
              <span @click.stop="getGameBalance(item.game_identifier, index)">刷新</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import iconBg01 from '../../../statics/img/header_logo_18_8_29.png'
import AGGAME from '../../../statics/img/transfer_icon02.png'
import PTGAME from '../../../statics/img/transfer_icon03.png'
import GGCARD from '../../../statics/img/transfer_icon04.png'
import EBETGAME from '../../../statics/img/transfer_icon05.png'
import BBINGAME from '../../../statics/img/transfer_icon06.png'
import UGGAME from '../../../statics/img/transfer_icon09.png'
import BBINLIVE from '../../../statics/img/transfer_icon06.png'
import SUNCITYGAME from '../../../statics/img/transfer_icon104.png'
import HCGAME from '../../../statics/img/transfer_icon108.png'
import LVGAME from '../../../statics/img/transfer_icon111.png'
import { GetUserGameTypePercentList, GetThirdGameBalance } from '../../../api/userCenter/personalCenter/personal-center'
let vm;
export default {
  name: 'account-management',
  data () {

    return {
      iconBg01,
      iconList: [
        {
          name: 'AGGAME',
          icon: AGGAME
        },
        {
          name: 'PTGAME',
          icon: PTGAME
        },
        {
          name: 'GGCARD',
          icon: EBETGAME
        },
        {
          name: 'BBINGAME',
          icon: BBINGAME
        },
        {
          name: 'UGGAME',
          icon: UGGAME
        },
        {
          name: 'SUNCITYGAME',
          icon: SUNCITYGAME
        },
        {
          name: 'HCGAME',
          icon: HCGAME
        },
        {
          name: 'LVGAME',
          icon: LVGAME
        },
        {
          name: 'BBINLIVE',
          icon: BBINLIVE
        }
      ],
      userInfo: {},
      platformList: [], // 平台
      balanceList: [], // 余额
    }
  },
  created () {
    this.$loadingShow()
    this.getGameList()
    // this.getGameBalance()
    this.$store.dispatch('updateUserInfo')
    const userInfo = this.$store.state.user
    this.userInfo = userInfo
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.$loadingHide()
  },
  methods: {
    getGameList () {
      // 获取第三方平台
      GetUserGameTypePercentList().then(res => {
        let list = res.data
        list.forEach((item, index) => {
          GetThirdGameBalance(item.game_identifier).then(res => {
            if (res.errno === 0) {
              this.iconList.forEach((icon, index) => {
                if (item.game_identifier === icon.name) {
                  this.platformList.push({
                    game_id: item.game_id,
                    game_identifier: item.game_identifier,
                    game_name: item.game_name,
                    percent_value: item.percent_value,
                    balance: res.data.balance,
                    icon: icon.icon
                  })
                }
              })
            }
          })
        })
      })
    },
    getGameBalance (identify, index) {
      this.$loadingShow()
      // 获取第三方平台余额
      if (identify === 'merchant_site') {
        // 判断如果是本站钱包，不用重新获取余额，直接使用userInfo中的钱包余额
        this.$store.dispatch('updateUserInfo')
        const userInfo = this.$store.state.user
        this.userInfo = userInfo
        this.$loadingHide()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        return false
      }
      GetThirdGameBalance(identify).then(data => {
        if (data.errno === 0) {
          this.platformList[index].balance = data.data.balance
          this.$loadingHide()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.title{
  margin-top: -24px;
  margin-left: 60px;
  color: #777;
}
.account-balance{
  padding: 40px 15px;
  width: 100%;
  position: relative;
}
.account-balance-li{
  width: 100%;
  height: 67px;
  line-height: 67px;
  text-align: center;
  background: #f1f1f1;
  border: 1px solid #dcdcdc;
  margin-bottom: 20px;
  position: relative;
}
.account-balance-box{
  height: 67px;
  line-height: 67px;
  overflow: hidden;
}
.account-balance-line{
  width: 1px;
  background: #bfbfbf;
  height: 30px;
  float: left;
  margin: 18px 0;
}
.account-balance-game{
  width: 20%;
  height: 67px;
  line-height: 67px;
  float: left;
}
.account-balance-Rebate{
  width: 35%;
  display: inline-block;
  float: left;
}
.account-balance-money{
  width: 35%;
  display: inline-block;
  float: left;
}
.account-balance-Refresh{
  width: 9%;
  display: inline-block;
  float: left;
}
.account-balance-Refresh span{
  cursor: pointer;
}
.account-balance-Refresh span:hover{
  opacity: 0.8;
}
.account-balance-box span{
  color: #4babbf
}
.account-balance-game span{
  color: #777;
  text-align: left;
  display: inline-block;
  float: left;
  margin-left: 100px;
  font-size: 13px;
}
.account-balance-game .G_img{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 30px;
  top: 8px;
}
@media screen and (max-width: 992px){
  .account-balance-box .account-balance-game{
    width: 30%;
  }
  .account-balance-box .account-balance-Rebate{
    width: 25%;
  }
}
@media screen and (max-width: 767px){
  .account-balance-box .account-balance-game .G_img{
    display: none;
  }
  .account-balance-box .account-balance-game span{
    margin-left: 30px;
  }
}
</style>
