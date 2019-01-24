<template>
  <div class="width">
    <p class="title">个人盈亏报表</p>
    <div class="account-profit centerBox">
      <div class="condition">
        <div class="selects">
          <div class="label">游戏种类</div>
          <el-select v-model="gameType" placeholder="请选择">
            <el-option
              v-for="item in gameTypes"
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
        <UserTable class="table1" :tablehade="tableHade1">
          <li v-show="table1Msg.length !== 0" v-for="(item, index) in table1Msg" :key="index">
            <div><p>{{item.username}}</p></div>
            <div><p>{{item.parent_user}}</p></div>
            <div><p>{{item.prize_group}}</p></div>
            <div><p>{{item.deposit}}</p></div>
            <div><p>{{item.withdraw}}</p></div>
            <div><p>{{item.sales}}</p></div>
            <div><p>{{item.commission}}</p></div>
          </li>
          <li class="nomsg" v-show="table1Msg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
        <UserTable class="table2" :tablehade="tableHade2">
          <li v-for="(item, index) in table2Msg" :key="index">
            <div><p>{{item.game_type}}</p></div>
            <div><p>{{item.deposit}}</p></div>
            <div><p>{{item.withdraw}}</p></div>
            <div><p>{{item.sales}}</p></div>
            <div><p>{{item.prize}}</p></div>
            <div><p>{{item.commission}}</p></div>
            <div><p>{{item.lose_commission}}</p></div>
            <div><p>{{item.profit}}</p></div>
          </li>
          <li v-show="table2Msg.length !== 0" style="background: #dddddd">
            <div><p>总计：</p></div>
            <div><p>{{getTotalNum(table2Msg, 'deposit', 2)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'withdraw', 2)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'sales', 4)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'prize', 6)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'commission', 6)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'lose_commission', 0)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'profit', 6)}}</p></div>
          </li>
          <li class="nomsg" v-show="table2Msg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import UserTable from '../../../../components/user-center/user-table'
import { getCurrentUserInfo, getSummary, getGameTypeList } from '../../../../api/userCenter/personalCenter/personal-center'
import { getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'account-profit',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      gameTypes: [{value: '', label: '全部'}], // 游戏种类
      gameType: '',
      tableHade1: [
        {title: '会员账号'},
        {title: '直属上级'},
        {title: '奖金'},
        {title: '个人充值'},
        {title: '个人提现'},
        {title: '个人促销'},
        {title: '个人佣金'}
      ],
      table1Msg: [],
      userInfo: '', // 账户信息
      tableHade2: [
        {title: '产品类型'},
        {title: '充值'},
        {title: '提现'},
        {title: '销量'},
        {title: '派奖'},
        {title: '返点/反水'},
        {title: '自身返点/反水'},
        {title: '盈亏'}
      ],
      table2Msg: []
    }
  },
  components: {
    DateTimePicker,
    UserTable
  },
  created () {
    this.$loadingShow()
    this.begin_date = this.getTime(0) + ' 00:00:00'
    this.end_date = this.getTime(0) + ' 23:59:59'
    this.getUser()
    this.getGamelist()
    this.getIntervalStatistics()
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
    // 获取用户信息
    getUser () {
      getCurrentUserInfo().then(res => {
        if (res.errno === 0) {
          this.userInfo = res.data
        }
      })
    },
    // 获取游戏类型数据
    getGamelist () {
      getGameTypeList().then(res => {
        if (res.errno === 0) {
          res.data.forEach((item, index) => {
            this.gameTypes.push({
              value: item.id,
              label: item.name
            })
          })
        }
      })
    },
    // 个人区间统计数据
    getIntervalStatistics () {
      this.$loadingShow()
      getSummary(this.begin_date, this.end_date, this.gameType).then(res => {
        if (res.errno === 0) {
          this.table1Msg = res.data.totally
          this.table2Msg = res.data.details
        }
        this.$loadingHide()
      })
    },
    query () {
      this.getIntervalStatistics()
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
  .table1{
    margin-bottom: 20px;
    border-bottom: 3px solid #eb7e00;
  }
</style>
