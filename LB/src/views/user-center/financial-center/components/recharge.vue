<template>
    <div class="recharge financial-box">
      <router-link :to="{name: 'financial-recharge'}" style="position: relative;top: -90px;left: 60px;width: 40px; display: inline-block;height: 10px">充值</router-link>
      <div class="content">
        <item icon="icon-rmb">
          <div class="select">
            <el-form ref="form" label-width="80px">
              <el-form-item label="请选择支付方式">
                <el-select class="pay-type-select" v-model="type">
                  <el-option
                    v-for="item in payTypeList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.label">
                  </el-option>
                </el-select>
                <el-radio-group class="pay-type-radio" v-model="type">
                  <!-- <el-radio-button label="1">网银</el-radio-button>
                  <el-radio-button label="2">微信</el-radio-button>
                  <el-radio-button label="3">支付宝</el-radio-button>
                  <el-radio-button label="4">银行卡</el-radio-button> -->
                  <el-radio-button v-for="(item, index) in payTypeList" :key="index" :label="item.label">{{item.value}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </item>
        <item  icon="icon-rmb" v-if="paymentMethod.length !== 0">
          <div class="pay-type">
            <div v-for="(item, index) in paymentMethod" :class="{active:payIndex === index}" :key="index" @click="getPayDatas(index, item)">{{item.type_name}}</div>
          </div>
          <div class="bank-list">
            <el-radio-group v-model="bank">
              <el-radio v-for="(item, index) in bankList" :key="index" :label="JSON.stringify(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </item>
        <item icon="icon-card">
          <el-form>
            <el-form-item v-if="userBankCardShow" label="请选择你要支付的银行卡">
              <el-select v-model="bankCard" style="min-width: 180px; width: 100%; max-width: 300px">
                <el-option
                  v-for="(item, index) in bankCardList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="充值金额" label-position="left">
              <el-input style="min-width: 180px; width: 100%; max-width: 300px"
                        v-model="amount"
                        :placeholder="`充值区间: ${min_amount}元~${max_amount}元 (手续费: ${fee}元)`"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="warning" @click.native="subPay">充值</el-button>
            </el-form-item>
          </el-form>
        </item>
      </div>
      <div class="help">
        <div class="title">充值使用需知</div>
        <div class="text">
          <p>1. 充值成功后请即时查看充提进度，若有问题请即时联系<a @click="openNewCustomerServiceWindow">在线客服</a>。</p>
          <p>2. 充值服务时间为24H。</p>
          <p>3. 如充值遇到银行充值页无法显示问题, 请尝试使用<a>网银推荐的浏览器</a>。</p>
          <p>4. 如网银充值因作业系统与浏览器版本问题, 建议您使用支付宝或微信充值。</p>
        </div>
        <div class="link">
          <ul>
            <li>为什么充值未到账?</li>
            <li>如何使用网银充值?</li>
            <li>充提进度查询</li>
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
import {
  getDepositPlatformList,
  getPlatformBankList,
  deposit
} from '../../../../api/userCenter/financialCenter/recharge'
import {openNewCustomerServiceWindow} from '../../../../util/common'
import {getBankCardList} from '../../../../api/userCenter/financialCenter/withdraw'
import Item from './item'
export default {
  name: 'recharge',
  components: { Item },
  data () {
    return {
      page: 1,
      pageSize: 20,
      startDate: null,
      type: '',
      endDate: null,
      value3: '黄金糕',
      payTypeList: [
        {label: 1, value: '网银'},
        {label: 2, value: '微信'},
        {label: 3, value: '支付宝'},
        {label: 4, value: '银行卡'}
      ],
      paymentMethod: [],
      userBankCardShow: true,
      payIndex: null,
      bank: '', // 支付方信息
      bankCard: null,
      bankList: null,
      amount: '',
      bankCardList: null,
      max_amount: 0,
      min_amount: 0,
      fee: 0 // 手续费
    }
  },
  methods: {
    openNewCustomerServiceWindow () {
      // 联系客服
      openNewCustomerServiceWindow()()
    },
    initialization () {
      // 初始化信息
      this.amount = null
      this.bank = ''
      this.bankCard = null
      this.payIndex = ''
      this.min_amount = 0
      this.max_amount = 0
      this.fee = 0
    },
    getPayDatas (index, item) {
      this.min_amount = item.min_amount
      this.max_amount = item.max_amount
      this.fee = item.fee || 0
      this.payIndex = index
      if (item.need_bank === 0) {
        this.bank = JSON.stringify(item)
        this.userBankCardShow = false
        this.bankCard = null
        return false
      } else {
        this.userBankCardShow = true
      }
      // 获取银行列表
      getPlatformBankList(item.id)
        .then(data => {
          // console.log(data)
          this.bankList = data.data
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
          this.bankCardList = arr
        })
        .catch(err => console.error(err))
    },
    subPay () {
      // 提交充值请求
      if (this.bank === '') {
        this.$message({
          message: '未选择支付方信息',
          type: 'warning'
        })
        return false
      }
      let bankCardID = null
      if (this.bankCard === null) {
        bankCardID = null
      } else {
        bankCardID = JSON.parse(this.bankCard).id
      }
      let amount = this.amount
      let bankID = JSON.parse(this.bank).id
      deposit(amount, bankCardID, bankID)
        .then(data => {
          if (data.errno === 0) {
            // console.log(data)
            window.open(data.data.recharge_url, '', 'channelmode=yes,width=900,height=700')
          }
          this.initialization()
        })
        .catch(err => {
          console.error(err)
          this.initialization()
        })
    }
  },
  created () {
    this.getUserBackCardList()
  },
  watch: {
    bankID: function (e) {
    },
    type: function (e) {
      // 监听支付方式切换
      getDepositPlatformList(e)
        .then(data => {
          this.payIndex = null
          this.bankList = null
          this.paymentMethod = data.data
          console.log(this.paymentMethod)
        })
        .catch(err => console.error(err))
    }
  }
}
</script>

<style>
@import "../statics/common.css";

</style>
<style>
@media screen and (max-width: 1200px){
  .pay-type-radio{
    display: none;
  }
  .pay-type-select{
    display: block !important;
  }
}
.pay-type-select{
  display: none;
}
.el-radio .el-radio__label {
  width: 126px;
  height: 36px;
  display: inline-block;
  text-align: center;
  line-height: 36px;
  background: #ffffff;
  border: 1px solid #cdcdcd;
}
.is-checked .el-radio__label {
}
.el-radio {
  margin-left: 30px;
  margin-bottom: 10px;
}
.el-radio.is-checked .el-radio__inner {
  background-color: #eb7e00;
  border-color: #eb7e00;
}
.el-radio.is-checked .el-radio__label {
  color: #eb7e00;
}
</style>
