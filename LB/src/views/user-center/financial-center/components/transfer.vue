<template>
  <div class="transfer financial-box">
    <router-link :to="{name: 'financial-transfer'}" style="position: relative;top: -90px;left: 60px;width: 40px; display: inline-block;height: 10px">转账</router-link>
    <div class="content">
      <item icon="icon-zhuanhuan">
        <div style="color: red;font-size: 15px" v-show="promptShow">
          <span>用户当前未激活第三方游戏平台，是否激活：</span>
          <a href="javascript:;" @click="openGame"> 激活</a>
          <a href="javascript:;" @click="promptShow = false">  忽略</a>
        </div>
        <el-form label-position="top">
          <el-form-item label="转出" label-width="400">
            <el-select v-model="transferOut" @change="getGameBalance" style="min-width: 180px; width: 100%; max-width: 400px">
              <el-option
                v-for="(item, index) in transferChannel"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="promptShow"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>当前平台余额：{{thirdPartyBalance}}</div>

          <el-form-item label="转入" label-width="400">
            <el-select v-model="transfer" @change="getGameID" style="min-width: 180px; width: 100%; max-width: 400px">
              <el-option
                v-for="(item, index) in transferToChannel"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="转账金额" label-width="400">
            <el-input type="text" v-model="amount" style="min-width: 180px; width: 100%; max-width: 400px"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" @click="submit">确定送出</el-button>
      </item>
    </div>
    <div class="help">
      <div class="title">转账注意事项</div>
      <div class="text">
        <p>1. 转账服务时间为24H。</p>
        <p>2. 平台钱包对应该平台内所有游戏，例：彩票娱乐场对应所有彩种，以此类推。 </p>
        <p>3. 领取平台开业活动后需达到首充25％流水才能转帐。</p>
        <p>4. 转账流程 : </p>
        <p>(1) 选择转出、转入的平台钱包，并确认转出钱包资金充足。</p>
        <p>(2) 输入正确的转账金额后送出 。</p>
        <p>(3) 转账后请实时查看转账进度，若有问题请联系<a @click="openNewCustomerServiceWindow">在线客服</a> 。</p>
        <p>5. 网络通讯可能存在延迟，如果遇到短暂的无法额度转换的情况时，请耐心等待或者咨询<a @click="openNewCustomerServiceWindow">在线客服</a>。</p>
      </div>
      <!--<div class="link">-->
        <!--<ul>-->
          <!--<li>为什么充值未到账?</li>-->
          <!--<li>如何使用网银充值?</li>-->
          <!--<li>充提进度查询</li>-->
        <!--</ul>-->
        <!--<div>-->
          <!--<a href="javascript:;">-->
            <!--<i class="el-icon-question"></i>-->
            <!--帮助中心</a>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import Item from './item'
import {openNewCustomerServiceWindow} from '../../../../util/common'
import {GetThirdGamePlatformList, GetPlatformBalance, ThirdGameUserInit, TransferThirdGame} from '../../../../api/userCenter/financialCenter/transfer'
export default {
  name: 'transfer',
  components: {Item},
  data () {
    return {
      transferChannel: [ // 转出渠道
      ],
      transferToChannel: [ // 转入渠道
      ],
      promptShow: false, // 第三方平台激活状态提示
      amount: '', // 转账金额
      transferOutID: '', // 转出标识
      transferID: '', // 转入标识
      thirdPartyBalance: null, // 第三方余额
      transferOut: '', // 转出
      transfer: '' // 转入
    }
  },
  methods: {
    openNewCustomerServiceWindow () {
      // 联系客服
      openNewCustomerServiceWindow()()
    },
    initialization () {
      // 初始化信息
      this.amount = ''
      this.transferOutID = ''
      this.transferOut = ''
      this.transferID = ''
      this.transfer = ''
      this.thirdPartyBalance = null
    },
    openGame () {
      ThirdGameUserInit()
        .then(data => {
          if (data.errno === 0) {
            this.promptShow = false
          }
        })
        .catch(err => console.error(err))
    },
    getGameList () {
      // 获取第三方平台
      GetThirdGamePlatformList()
        .then(data => {
          let arr = []
          data.data.forEach((item, index) => {
            arr.push({
              label: item.name,
              value: item.identify
            })
          })
          this.transferChannel = arr
          this.transferToChannel = arr
        })
        .catch(err => console.error(err))
    },
    getGameBalance (platform) {
      // 获取第三方平台余额
      this.transferOutID = platform
      if (platform === 'merchant_site') {
        // 判断如果是本站钱包，不用重新获取余额，直接使用userInfo中的钱包余额
        this.$store.dispatch('updateUserInfo')
        const userInfo = this.$store.state.user.userInfo
        this.thirdPartyBalance = userInfo.abalance
        return false
      }
      GetPlatformBalance(platform)
        .then(data => {
          console.log(data.data.balance)
          this.thirdPartyBalance = data.data.balance
        })
        .catch(err => console.error(err))
    },
    getGameID (platform) {
      this.transferID = platform
    },
    submit () {
      // 发起转账
      TransferThirdGame(this.transferOutID, this.transferID, this.amount)
        .then(data => {
          console.log(data.errno)
          if (data.errno === 0) {
            this.$message({
              message: '转账成功!',
              type: 'success'
            })
            this.$eventHub.$emit('wallet', {name: 'financial-transfer'})
            this.initialization()
          }
        })
        .catch(err => {
          console.error(err)
          this.initialization()
        })
    }
  },
  mounted () {
    this.getGameList()
    this.$store.dispatch('updateUserInfo')
    const userInfo = this.$store.state.user.userInfo
    if (parseInt(userInfo.active_third_game) === 0) {
      // console.log(1)
      this.promptShow = true
    }
  }
}
</script>

<style scoped>
  @import "../statics/common.css";
</style>
