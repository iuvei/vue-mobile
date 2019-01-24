<template>
    <div class="list">
      <div class="width">
        <a href="javascript:;" style="position: relative;left: 60px;top: -24px;">资金进度查询</a>
        <div class="head">
          <div class="type-chenge">
            <el-select v-model="value" @change="typeChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="type-chenge dateChange_1">
            <el-select v-model="typeData" @change="dateChenge">
              <el-option
                v-for="item in dateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-radio-group class="dateChange" @change="dateChenge" v-model="typeData">
              <!--<el-radio-button label="0">今日</el-radio-button>-->
              <!--<el-radio-button label="1">昨日</el-radio-button>-->
              <!--<el-radio-button label="7">最近七天</el-radio-button>-->
              <el-radio-button v-for="(item, index) in dateList" :key="index" :label="item.value">{{item.label}}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="start-date">
            <el-date-picker
              v-model="startData"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="end-date">
            <el-date-picker
              v-model="endData"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div>
            <el-button @click.native="getDatas">查询</el-button>
          </div>
        </div>
        <div class="content">
          <div v-show="typeIndex == 0">
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
          <div v-show="typeIndex == 1">
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
              <!-- <el-table-column
                prop="account"
                label="提现账户">
              </el-table-column> -->
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
           <div v-show="typeIndex == 2">
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
        <div class="page">
          <pagination :pageDate="pageDate" @jump="pages"></pagination>
        </div>
      </div>
    </div>
</template>

<script>
import {getWithdrawalList} from '../../../../api/userCenter/financialCenter/withdraw'
import {getDepositList} from '../../../../api/userCenter/financialCenter/recharge'
import {GetTransferList} from '../../../../api/userCenter/financialCenter/transfer.js'
import Pagination from '../../../../components/user-center/pagination'
export default {
  name: 'wallet-progress',
  components: {Pagination},
  data () {
    return {
      dateList: [
        {value: 0, label: '今日'},
        {value: 1, label: '昨日'},
        {value: 7, label: '最近七天'}
      ],
      typeIndex: null,
      typeData: 0,
      options: [
        {
          value: '0',
          label: '充值进度'
        },
        {
          value: '1',
          label: '提现进度'
        },
        {
          value: '2',
          label: '转账进度'
        }
      ],
      value: '充值进度',
      startData: null,
      startDataOptions: null,
      endData: null,
      endDataOptions: null,
      tableData: [],
      page: 1,
      pageSize: 10,
      pageDate: {
        page: '1',
        pageCount: 1,
        pagesize: '1',
        totalCount: 1
      }
    }
  },
  methods: {
    getDatas () {
      this.typeChange(this.typeIndex)
    },
    dateChenge (e) {
      let num = parseInt(e)
      switch (num) {
        case 0:
          this.startData = this.getTime(num) + ' 00:00:00'
          this.endData = this.getTime(num) + ' 23:59:59'
          break
        case 1:
          this.startData = this.getTime(num) + ' 00:00:00'
          this.endData = this.getTime(num) + ' 23:59:59'
          break
        case 7:
          this.startData = this.getTime(num) + ' 00:00:00'
          this.endData = this.getTime(0) + ' 23:59:59'
          break
      }
      this.typeChange(this.typeIndex)
      clearInterval()
    },
    getTime (e) {
      return (function (e) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * e)
        return date.Format('yyyy-MM-dd')
      })(e)
    },
    typeChange (e) {
      // 列表类别切换
      this.typeIndex = e
      switch (parseInt(e)) {
        case 0:
          this.value = '充值进度'
          this.getRechargeList()
          break
        case 1:
          this.value = '提现进度'
          this.getWithdraList()
          break
        case 2:
          this.value = '转账进度'
          this.getTransferList()
          break
      }
    },
    getWithdraList () {
      // 提现记录
      getWithdrawalList(this.page, this.pageSize, this.startData, this.endData)
        .then(data => {
          this.$loadingHide()
          if (data.data.data.length === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = data.data.page_count
          }
          this.pageDate.page = data.data.page
          this.pageDate.pagesize = data.data.pagesize
          this.pageDate.totalCount = data.data.total_count
          this.tableData = data.data.data
        })
        .catch(err => console.error(err))
    },
    getRechargeList () {
      // 充值记录
      getDepositList(this.page, this.pageSize, this.startData, this.endData)
        .then(data => {
          this.$loadingHide()
          this.tableData = data.data.data
          if (data.data.data.length === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = data.data.page_count
          }
          this.pageDate.page = data.data.page
          this.pageDate.pagesize = data.data.pagesize
          this.pageDate.totalCount = data.data.total_count
          // console.log(data)
        })
        .catch(err => console.error(err))
    },
    getTransferList () {
      // 获取第三方转账记录
      GetTransferList(this.page, this.pageSize, this.startData, this.endData)
        .then(data => {
          this.$loadingHide()
          this.tableData = data.data.data
          if (data.data.data.length === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = data.data.page_count
          }
          this.pageDate.page = data.data.page
          this.pageDate.pagesize = data.data.pagesize
          this.pageDate.totalCount = data.data.total_count
        })
        .catch(err => console.error(err))
    },
    pages (e) {
      this.page = e
      this.typeChange(this.typeIndex)
    }
  },
  mounted () {
    this.$loadingShow()
    this.typeIndex = this.$route.query.type || 0
    this.dateChenge(this.typeIndex)
  },
  watch: {
    typeIndex: function (e) {
      this.page = 1
    }
  }
}
</script>

<style>
  @media (max-width: 981px) {
    .dateChange{
      display: none;
    }
    .dateChange_1{
      display: block !important;
    }
  }
  .dateChange_1{
    display: none;
  }
  .list>.width{
    min-height: calc(100vh - 294px);
  }
  .list .width .head{
    display: flex;
    padding-top: 30px;
    margin-bottom: 50px;
  }
  .list .width .head>div{
    margin-right: 10px;
  }
  .list .width .head .el-button{
    background: #eb7e00;
    color: #ffffff;
  }
  .list .width .head .el-radio-group .is-active .el-radio-button__inner{
    background: #eb7e00;
    border-color: #eb7e00;
  }
  .list .width .head .el-radio-group .el-radio-button__inner:hover .el-radio-button__inner{
    color: #eb7e00;
  }
  .list .width .head .el-radio-group .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background: #eb7e00;
    border-color: #eb7e00;
    box-shadow: -1px 0 0 0 #eb7e00;
  }
  .list .width .head .type-chenge>div{
    width: 120px;
  }
  .list .width .content{
    margin-bottom: 50px;
  }
  .list .width .content .has-gutter th{
    background: #eb7e00;
    color: #ffffff;
    text-align: center;
  }
  .list .width .content .el-table__body-wrapper .el-table__row td div{
    text-align: center;
  }
</style>
