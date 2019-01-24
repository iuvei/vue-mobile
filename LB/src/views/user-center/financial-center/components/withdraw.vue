<template>
  <div class="withdraw financial-box">
    <router-link :to="{name: 'financial-withdraw'}" style="position: relative;top: -90px;left: 60px;width: 40px; display: inline-block;height: 10px">提现</router-link>
    <div class="content">
      <item icon="icon-tishixinxi-">
        <p style="color: red" v-if="fundPwdState">当前未绑定资金密码，即将在{{timeNum}}秒后跳转到资金密码绑定页面</p>
        <p>每日限制提款 <span>{{$store.state.user.userInfo.withdraw_limit_times}}</span> 次,
          您已提款 <span>{{$store.state.user.userInfo.withdraw_times}}</span> 次,
          每日提现额度： <span>{{$store.state.user.userInfo.withdraw_limit_times * $store.state.user.userInfo.withdraw_max_amount}}</span> </p>
        <p>每日提现服务时间为{{withdrawTime}}</p>
      </item>
      <item icon="icon-rmb">
        <div class="select">
          <div class="text">当前余额:<span>{{availableBalance}}</span>元</div>
          <div class="text">可提现余额:<span>{{withdrawalBalance}}</span>元</div>
        </div>
      </item>
      <item icon="icon-card">
        <el-form label-position="top">
          <el-form-item label="选择银行">
            <el-select v-model="bankID" style="min-width: 180px; width: 100%; max-width: 400px">
              <el-option
                v-for="(item, index) in bankS"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提现金额">
            <el-input style="min-width: 180px; width: 100%; max-width: 400px"
                      v-model="amount" type="number"
                      :min="$store.state.user.userInfo.withdraw_min_amount"
                      :max="$store.state.user.userInfo.withdraw_max_amount"
                      :placeholder="`提现区间：${$store.state.user.userInfo.withdraw_min_amount}元-${$store.state.user.userInfo.withdraw_max_amount}元  ${withdrawFeeText()}`"></el-input>
          </el-form-item>

          <el-form-item label="资金密码">
            <el-input style="min-width: 180px; width: 100%; max-width: 400px" v-model="fundPwd" type="password"></el-input>
          </el-form-item>
          <!--后面可能会添加验证码功能-->
          <!--<el-form-item label="验证码">-->
            <!--<el-input style="width: 300px" type="text"></el-input>-->
            <!--<img :src="VerificationCode"-->
                 <!--alt="验证码"-->
                 <!--@click="getVerificationCode"-->
                 <!--style="height: 40px;cursor: pointer;margin-left: 20px;transform: translateY(15px)">-->
          <!--</el-form-item>-->
        </el-form>
        <el-button @click.native="pushWithdraw" type="warning">确定送出</el-button>
        <p style="color: #777777;margin-top: 10px;padding: 0">提现服务时间为{{withdrawTime}}</p>
      </item>
    </div>
    <div class="help">
      <div class="title">提现注意事项</div>
      <div class="text">
        <p>1. 提现服务时间为{{withdrawTime}}。</p>
        <p>2. 同姓名同卡号等同帐号每日提现单笔最高 {{$store.state.user.userInfo.withdraw_max_amount}} 元整，提领次数上限为 {{$store.state.user.userInfo.withdraw_limit_times}} 次。 </p>
        <p>3. 提现需进行充值金额满30%的投注，若未满足消费流水将<a>无法成功提现</a>。(例：充值100元需投注30元才能进行提现)</p>
        <p>4. <a>银行卡</a>请务必正确填写开户银行和银行卡号码、持卡人姓名。</p>
        <p>5. 新设定好的银行卡，需要于设定完成的0.01小时后才可以进行提现申请。</p>
        <p>6. 当您提现申请完成后，系统作业时间约3-5分钟，故请您前往<router-link :to="{name:'wallet-progress', query: {type: 1}}">充提进度</router-link>以完成出款后，再至您的银行账户进行查看。</p>
      </div>
      <div class="link">
        <ul>
          <li>为什么提现未到账?</li>
          <li>如何提现?</li>
          <li>提现进度查询</li>
        </ul>
        <div>
          <router-link :to="{name: 'help-center'}" href="javascript:;">
            <i class="el-icon-question"></i>
            帮助中心</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './item'
import {getBankCardList, getAvailable, getWithdrawable, withdraw} from '../../../../api/userCenter/financialCenter/withdraw'
export default {
  name: 'withdraw',
  components: {Item},
  data () {
    return {
      bankS: [
        {
          value: '123123',
          label: '全部'
        }
      ],
      bankID: '',
      amount: '', // 提现金额
      fundPwd: '', // 资金密码
      availableBalance: '0', // 可用余额
      withdrawalBalance: '0', // 可提现余额
      timeNum: 5,
      fundPwdState: false,
      withdrawTime: ''
    }
  },
  methods: {
    getVerificationCode () {
      // 更新验证码
    },
    initialization () {
      // 初始化信息
      this.amount = ''
      this.fundPwd = ''
      this.bankID = ''
    },
    pushWithdraw () {
      // 提交提现申请
      // console.log(JSON.parse(this.bankID))
      // console.log(this.bankID)
      if (this.bankID === '') {
        this.$message({
          message: '请选择提现收款银行',
          type: 'warning'
        })
        return false
      }
      if (this.fundPwd === '') {
        this.$message({
          message: '请输入资金密码',
          type: 'warning'
        })
        return false
      }
      withdraw(JSON.parse(this.bankID).id, this.amount, this.fundPwd)
        .then(data => {
          if (data.errno === 0) {
            this.$message({
              message: '提现成功!',
              type: 'success'
            })
            this.$eventHub.$emit('wallet', {name: 'financial-withdraw'})
            this.$store.dispatch('updateUserInfo')
          }
          this.initialization()
        })
        .catch(err => {
          console.log(err)
          this.initialization()
        })
    },
    getUserBalance () {
      // 获取用户余额详情

      // 获取当前余额
      getAvailable()
        .then(data => {
          let num = parseInt(data.data.available).toFixed(2).toLocaleString()
          this.availableBalance = num
        })
        .catch(err => console.error(err))

      // 获取可提现余额
      getWithdrawable()
        .then(data => {
          let num = data.data.withdrawable.toFixed(2).toLocaleString()
          this.withdrawalBalance = num
        })
        .catch(err => console.error(err))
    },

    getUserBackCardList () {
      // 获取用户绑定的银行卡列表
      getBankCardList()
        .then(data => {
          let arr = []
          data.data.forEach((item, index) => {
            arr.push({
              label: `${item.bank}: ${item.account}`,
              value: JSON.stringify(item)
            })
          })
          this.bankS = arr
        })
        .catch(err => console.error(err))
    },
    fundPasswordState () {
      // 判断用户是否绑定资金密码
      const userData = this.$store.state.user.userInfo
      if (userData.fund_pwd_seted === 0) {
        this.fundPwdState = true
        const time = setInterval(() => {
          this.timeNum--
        }, 1000)
        setTimeout(() => {
          clearInterval(time)
          this.fundPwdState = false
          this.$router.push({name: 'account-management'})
        }, this.timeNum + '000')
      }
    },
    withdrawFeeText () {
      // 是否需要手续费
      const n = this.$store.state.user.userInfo
      let text = ''
      if (parseInt(n.need_withdraw_fee) === 0) {
        text = '免手续费'
      } else {
        text = `手续费: ${n.withdraw_fee}元`
      }

      return text
    }
  },
  created () {
    this.$store.dispatch('updateUserInfo')
  },
  mounted () {
    this.fundPasswordState()
    this.getUserBalance()
    this.getUserBackCardList()
  },
  watch: {
    '$store.state.user.userInfo': function (e) {
      // console.log(e)
      let time = e.withdraw_allowed_time.replace('-', '~次日')
      this.withdrawTime = time
    }
  }
}
</script>

<style scoped>
  @import "../statics/common.css";
 </style>
