<template>
  <div class="financial-center">
    <div class="width">
      <div class="nav">
        <router-link
          tag="div"
          :to="{name: `financial-${item.type}`}"
          v-for="(item, index) in typeList"
          @click.native="typeIndex = index"
          :class="{active:typeIndex === index}"
          :key="index">{{item.text}}</router-link>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="list" v-if="typeIndex === 0">
        <div class="listHead">充值进度</div>
        <div class="listContent">
           <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                prop="realname"
                label="真实姓名">
              </el-table-column>
              <el-table-column
                prop="platform"
                label="充值渠道">
              </el-table-column>
              <!-- <el-table-column
                prop="account"
                label="充值账户">
              </el-table-column> -->
              <el-table-column
                prop="amount"
                label="充值金额"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="充值时间"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="status"
                label="充值状态"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <div class="list" v-if="typeIndex === 1">
        <div class="listHead">提现进度</div>
        <div class="listContent">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="username"
              label="会员昵称">
            </el-table-column>
            <el-table-column
              prop="account_name"
              label="真实姓名">
            </el-table-column>
            <el-table-column
              prop="account"
              label="提现账户">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="提现金额"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="提现时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="提现状态"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="list" v-if="typeIndex === 2">
        <div class="listHead">转账进度</div>
        <div class="listContent">
          <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                prop="username"
                label="转账用户">
              </el-table-column>
              <el-table-column
              prop="amount"
              label="转账金额">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="转账时间">
              </el-table-column>
              <el-table-column
                prop="origin_platform_name"
                label="转出平台">
              </el-table-column>
              <el-table-column
                prop="target_platform_name"
                label="转入平台"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="status"
                label="转账状态"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <div class="more">
        <router-link tag="span" :to="{name: 'wallet-progress', query: {type: typeIndex}}"><i class="el-icon-circle-plus"></i>更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {getWithdrawalList} from '../../../api/userCenter/financialCenter/withdraw'
import {GetTransferList} from '../../../api/userCenter/financialCenter/transfer.js'
import {getDepositList} from '../../../api/userCenter/financialCenter/recharge.js'
export default {
  name: 'financial-center',
  data () {
    return {
      typeList: [
        {text: '充值', type: 'recharge'},
        {text: '提现', type: 'withdraw'},
        {text: '转账', type: 'transfer'}
      ],
      typeIndex: 0,
      status: null, // 充值，转账，提现记录状态
      tableData: []
    }
  },
  methods: {
    typeShow (e) {
      switch (e.name) {
        case 'financial-recharge':
          this.typeIndex = 0
          this.getRechargeList()
          break
        case 'financial-transfer':
          this.typeIndex = 2
          this.getTransferList()
          break
        case 'financial-withdraw':
          this.typeIndex = 1
          this.getWalList()
          break
      }
    },
    getRechargeList () {
      // 获取充值记录
      getDepositList(1, 5)
        .then(data => {
          // console.log(data)
          this.status = data.data.status
          this.tableData = data.data.data
        })
        .catch(err => console.error(err))
      // this.tableData = []
    },
    getWalList () {
      // 获取提现记录
      getWithdrawalList(1, 5)
        .then(data => {
          this.status = data.data.status
          this.tableData = data.data.data
        })
        .catch(err => console.error(err))
    },
    getTransferList () {
      // 获取第三方转账记录
      GetTransferList(1, 5)
        .then(data => {
          this.status = data.data.status
          this.tableData = data.data.data
        })
        .catch(err => console.error(err))
    }
  },
  mounted () {
    this.typeShow(this.$route)
    this.$eventHub.$on('wallet', data => {
      this.typeShow(data)
    })
  },
  watch: {
    '$route': function (e) {
      this.typeShow(e)
    }
  }
}
</script>

<style>
  /* @import "../../../statics/css/common.js.css"; */
  .financial-center{
    width: 100%;
    min-height: calc(100vh - 293px);
  }
  .financial-center .width .nav {
    display: flex;
    border-bottom: 1px solid #eb7e00;
  }
  .financial-center .width .nav div{
    cursor: pointer;
    text-align: center;
    margin-right: 5px;
    border: 1px solid #ffffff;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100px;
    height: 35px;
    line-height: 35px;
    font-size: 15px;
  }
  .financial-center .width .nav .active{
    background: #eb7e00;
    color: #ffffff;
    border-color: #eb7e00;
  }
  .financial-center .width .nav div:hover{
    background: #eb7e00;
    color: #ffffff;
    border-color: #eb7e00;
  }
  .financial-center>.width>.content{
    padding-top: 30px;
    min-height: 600px;
  }
  .financial-center .width .list{
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 20px;
  }
  .financial-center .width .list .listHead{
    width: 100%;
    border-top: 2px solid #dcdcdc;
    background: #f8f8f8;
    height: 42px;
    line-height: 42px;
    font-size: 19px;
    color: #333333;
    padding: 0 15px;
    margin-bottom: 30px;
    margin-top: 50px;
  }
  .financial-center .width .list .listContent .has-gutter th{
    background: #eb7e00;
    color: #ffffff;
    text-align: center;
  }
  .financial-center .width .list .listContent .el-table__row td{
    text-align: center;
  }
  .financial-center .width .more{
    text-align: right;
    padding-right: 20px;
    margin-bottom: 50px;
  }
  .financial-center .width .more span{
    cursor: pointer;
    font-size: 15px;
  }
</style>
