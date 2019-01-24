<template>
  <div class="width">
    <p class="title">个人账变明细</p>
    <div class="account-change centerBox">
      <div class="condition">
        <!--<div class="selects">-->
          <!--<div class="label">产品类型</div>-->
          <!--<el-select v-model="gameType" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in gameTypes"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <div class="selects">
          <div class="label">账变类型</div>
          <el-select v-model="changeValue" placeholder="请选择">
            <el-option
              v-for="item in changeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>
        <el-button class="active" @click="query">查询</el-button>
      </div>
      <div class="content">
        <UserTable class="table1" :tablehade="tableHade">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.serial_number}}</p></div>
            <div><p>{{item.description}}</p></div>
            <div><p>{{item.created_at}}</p></div>
            <div><p class="green">{{item.add_amount}}</p></div>
            <div><p class="red">{{item.deduct_amount}}</p></div>
            <div><p>{{item.previous_balance}}</p></div>
            <div><p>{{item.ablance}}</p></div>
          </li>
          <li v-show="tableMsg.length !== 0" style="background: #d8eaf6">
            <div></div>
            <div></div>
            <div><p>本页小计</p></div>
            <div><p class="green">{{getTotalNum(tableMsg, 'add_amount', 6)}}</p></div>
            <div><p class="red">{{getTotalNum(tableMsg, 'deduct_amount', 6)}}</p></div>
            <div></div>
            <div></div>
          </li>
          <!--<li v-show="tableMsg.length !== 0" style="background: #dddddd">-->
            <!--<div></div>-->
            <!--<div></div>-->
            <!--<div><p>全页总计</p></div>-->
            <!--<div><p class="green">{{totalMoney1 | numFilter}}</p></div>-->
            <!--<div><p class="red">{{totalMoney2 | numFilter}}</p></div>-->
            <!--<div></div>-->
            <!--<div></div>-->
          <!--</li>-->
          <li class="nomsg" v-show="tableMsg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
        <Pagination :pageDate="pageDate" @jump="jump"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import UserTable from '../../../../components/user-center/user-table'
import Pagination from '../../../../components/user-center/pagination'
import { getTransactionTypeList, getTransactionList } from '../../../../api/userCenter/personalCenter/personal-center'
import { getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'account-change',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      gameTypes: [{value: '', label: '全部'}], // 产品类型
      gameType: '',
      changeList: [{value: '', label: '全部'}], // 账变类型
      changeValue: '',
      tableHade: [
        {title: '账变编号'},
        {title: '账变类型'},
        {title: '账变时间'},
        {title: '加款金额'},
        {title: '扣款金额'},
        {title: '账变前金额'},
        {title: '账变后金额'}
      ],
      tableMsg: [],
      pageDate: { // 分页参数
        page: 1, // 当前页
        pageSize: 20, // 页尺寸
        pageCount: 0, // 总页数
        totalCount: 0 // 总数量
      }
    }
  },
  components: {
    DateTimePicker,
    UserTable,
    Pagination
  },
  created () {
    this.$loadingShow()
    this.begin_date = this.getTime(0) + ' 00:00:00'
    this.end_date = this.getTime(0) + ' 23:59:59'
    // this.getGamelist()
    this.getTransactionTypeList()
    this.getTransactionList(1)
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.$loadingHide()
  },
  methods: {
    getTime (e) {
      return (function (e) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * e)
        return date.Format('yyyy-MM-dd')
      })(e)
    },
    // // 获取游戏类型数据
    // getGamelist () {
    //   getGameTypeList().then(res => {
    //     if (res.errno === 0) {
    //       let gameTypes = [{value: '0', label: '全部'}]
    //       res.data.forEach((item, index) => {
    //         gameTypes.push({
    //           value: item.id,
    //           label: item.name
    //         })
    //         this.gameTypes = gameTypes
    //       })
    //     }
    //     // console.log(res)
    //   })
    // },
    // 获取账变类型
    getTransactionTypeList () {
      getTransactionTypeList().then(res => {
        if (res.errno === 0) {
          res.data.forEach((item, index) => {
            this.changeList.push({
              value: item.id,
              label: item.description
            })
          })
        }
      })
    },
    // 获取账变明细列表
    getTransactionList (page) {
      this.$loadingShow()
      let data = {
        typeId: this.changeValue,
        beginTime: this.begin_date,
        endTime: this.end_date,
        page: page,
        pageSize: 20,
        searchTeam: 0,
        userName: ''
      }
      getTransactionList(data).then(res => {
        if (res.errno === 0) {
          this.tableMsg = res.data.data
          this.pageDate.page = res.data.page
          this.pageDate.pageSize = res.data.pagesize
          this.pageDate.totalCount = res.data.total_count
          if (res.data.page_count === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = res.data.page_count
          }
          this.$loadingHide()
        }
      })
    },
    // 点击查询
    query () {
      this.getTransactionList(1)
    },
    // 点击跳转页数
    jump (pageNum) {
      this.getTransactionList(pageNum)
    },
    // 本页小结
    getTotalNum (data, str, num) {
      return getTotalNum(data, str, num)
    }
  }
}
</script>

<style scoped>
  @import "../../statics/css/userCenterCommon.css";
</style>
