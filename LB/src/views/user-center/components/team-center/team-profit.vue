<template>
  <div class="width">
    <p class="title">团队盈亏报表</p>
    <div class="team-profit centerBox">
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
        <!--<div class="selects">-->
          <!--<div class="label">会员账号</div>-->
          <!--<el-autocomplete-->
            <!--class="inline-input"-->
            <!--v-model="accountNumber"-->
            <!--:fetch-suggestions="querySearch"-->
            <!--placeholder="会员账号查找"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
        <!--</div>-->
        <div class="selects">
          <div class="fuzzySearch">
            <span class="label">用戶名</span>
            <div class="form-contrl after">
              <input type="text" v-model="account" placeholder="会员账号查找" @click.stop.self="choice()" @change="accountChange">
              <div class="listbox" v-show="accountListShow">
                <div class="userlist">
                  <ul>
                    <li v-for="(item,index) in accountList" @click.stop.self="select(item, 1)" :key="index">
                      {{item.username}}
                      <span class="success" @click="confirmSelect(item)"><i class="el-icon-success"></i></span>
                    </li>
                  </ul>
                </div>
                <div class="userlist" v-show="isShow1">
                  <ul>
                    <li v-for="(item,index) in accountList1" @click.stop.self="select(item, 2)" :key="index">
                      {{item.username}}
                      <span class="success" @click="confirmSelect(item)"><i class="el-icon-success"></i></span>
                    </li>
                    <li style="text-align: center;color: #777;" v-show="accountList1.length === 0">没有下级账户</li>
                  </ul>
                </div>
                <div class="userlist" v-show="isShow2">
                  <ul>
                    <li v-for="(item,index) in accountList2" @click.stop.self="select(item, 3)" :key="index">
                      {{item.username}}
                      <span class="success" @click="confirmSelect(item)"><i class="el-icon-success"></i></span>
                    </li>
                    <li style="text-align: center;color: #777;" v-show="accountList2.length === 0">没有下级账户</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="selects">
          <div class="label">奖金</div>
          <el-select class="input" v-model="prize_group" filterable placeholder="请选择">
            <el-option
              v-for="item in a_prize_data"
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
          <li>
            <div><p>{{table1Msg.username}}</p></div>
            <div><p>{{table1Msg.prize_group}}</p></div>
            <div><p>{{table1Msg.deposit}}</p></div>
            <div><p>{{table1Msg.withdraw}}</p></div>
            <div><p>{{table1Msg.sales}}</p></div>
            <!--<div><p></p></div>-->
            <div><p>{{table1Msg.prize}}</p></div>
            <!--<div><p>{{item.commission}}</p></div>-->
            <!--<div><p>{{item.commission}}</p></div>-->
            <div><p>{{table1Msg.bonus}}</p></div>
            <div><p>{{table1Msg.lose_commission}}</p></div>
            <div><p>{{table1Msg.profit}}</p></div>
          </li>
        </UserTable>
        <UserTable style="margin-top: 30px" class="table1" :tablehade="tableHade2">
          <li v-for="(item, index) in table2Msg" :key="index">
            <div><p class="username" @click="querySuborDinate(item.user_id)">{{item.username}}</p></div>
            <div><p>{{item.prize_group}}</p></div>
            <div><p>{{item.deposit}}</p></div>
            <div><p>{{item.withdraw}}</p></div>
            <div><p>{{item.sales}}</p></div>
            <!--<div><p></p></div>-->
            <div><p>{{item.prize}}</p></div>
            <!--<div><p></p></div>-->
            <!--<div><p></p></div>-->
            <div><p>{{item.bonus}}</p></div>
            <div><p>{{item.lose_commission}}</p></div>
            <div><p>{{item.profit}}</p></div>
          </li>
          <li style="background: #d8eaf6" v-show="table2Msg.length !== 0">
            <div><p></p></div>
            <div><p>本页小计</p></div>
            <div><p>{{getTotalNum(table2Msg, 'deposit', 4)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'withdraw', 4)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'sales', 4)}}</p></div>
            <!--<div><p></p></div>-->
            <!--<div><p>{{totalData.prize}}</p></div>-->
            <div><p>{{getTotalNum(table2Msg, 'prize', 6)}}</p></div>
            <!--<div><p>{{totalData.commission}}</p></div>-->
            <div><p>{{getTotalNum(table2Msg, 'bonus', 4)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'lose_commission', 0)}}</p></div>
            <div><p>{{getTotalNum(table2Msg, 'profit', 6)}}</p></div>
          </li>
          <li style="background: #dddddd" v-show="table2Msg.length !== 0">
            <div><p></p></div>
            <div><p>全页总计</p></div>
            <div><p>{{teamSummary.deposit}}</p></div>
            <div><p>{{teamSummary.withdraw}}</p></div>
            <div><p>{{teamSummary.sales}}</p></div>
            <!--<div><p></p></div>-->
            <!--<div><p>{{totalData.prize}}</p></div>-->
            <div><p>{{teamSummary.prize}}</p></div>
            <!--<div><p>{{totalData.commission}}</p></div>-->
            <div><p>{{teamSummary.bonus}}</p></div>
            <div><p>{{teamSummary.lose_commission}}</p></div>
            <div><p>{{teamSummary.profit}}</p></div>
          </li>
          <li class="nomsg" v-show="table2Msg.length === 0"><span>暂时没有数据</span></li>
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
import { getGameTypeList } from '../../../../api/userCenter/personalCenter/personal-center'
import { GetPrizeGroupForCreate, GetChild, getTeamSummary } from '../../../../api/userCenter/teamCenter/team-center'
import { getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'team-profit',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      gameTypes: [{value: '', label: '全部'}], // 游戏类型
      gameType: 1,
      a_prize_data: [{value: '', label: '全部'}], // 奖金组
      prize_group: '',
      accountListShow: false,
      accountList: [], // 用户名list
      accountList1: [], // 用户名list
      accountList2: [], // 用户名list
      isShow1: false,
      isShow2: false,
      props: {
        label: 'username',
        value: 'id',
        children: 'children'
      },
      account: '', // 用户名
      tableHade1: [
        {title: '用戶名'},
        {title: '奖金'},
        {title: '个人充值'},
        {title: '个人提现'},
        {title: '个人销量'},
        // {title: '个人实际销量'},
        {title: '个人派奖 '},
        // {title: '个人返点/返水'},
        // {title: '个人自身返点'},
        {title: '个人促销'},
        {title: '个人佣金'},
        {title: '个人盈亏'}
      ],
      table1Msg: '', // 个人盈亏
      tableHade2: [
        {title: '下级账号'},
        {title: '奖金'},
        {title: '团队充值'},
        {title: '团队提现'},
        {title: '团队销量'},
        // {title: '团队实际销量'},
        {title: '团队派奖'},
        // {title: '团队返点/返水'},
        // {title: '团队自身返点'},
        {title: '团队促销'},
        {title: '团队佣金'},
        {title: '团队盈亏'}
      ],
      table2Msg: [], // 团队盈亏
      totalData: {}, // 团队合计
      pageDate: { // 分页参数
        page: 1, // 当前页
        pageSize: 20, // 页尺寸
        pageCount: 0, // 总页数
        totalCount: 0 // 总数量
      },
      userInfo: '', // 个人信息
      parentId: '', // 查询直属下级的时候传入上级ID
      teamSummary: '' // 全页总计
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
    this.getInformation()
    this.getGamelist()
    this.getTeamUsers()
    this.getIntervalStatistics(1)
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
    // 获取奖金组
    getInformation () {
      GetPrizeGroupForCreate().then(res => {
        if (res.errno === 0) {
          res.data.a_prize_data.forEach((item, index) => {
            this.a_prize_data.push({
              value: item.id,
              label: item.name
            })
          })
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
    // 获取用户名
    getTeamUsers () {
      GetChild('', '').then(res => {
        if (res.errno === 0) {
          this.accountList = res.data
        }
      })
    },
    choice () {
      this.accountListShow = !this.accountListShow
    },
    select (e, n) {
      if (n === 1) {
        this.isShow1 = true
        this.isShow2 = false
        GetChild(e.id, '').then(res => {
          if (res.errno === 0) {
            this.accountList1 = res.data
          }
        })
      }
      if (n === 2) {
        this.isShow2 = true
        GetChild(e.id, '').then(res => {
          if (res.errno === 0) {
            this.accountList2 = res.data
          }
        })
      }
    },
    confirmSelect (item) {
      this.parentId = item.id
      this.account = item.username
      this.accountListShow = false
    },
    accountChange () {
      this.parentId = this.account
    },
    // 团队区间统计数据
    getIntervalStatistics (page) {
      this.$loadingShow()
      let data = {
        beginDate: this.begin_date,
        endDate: this.end_date,
        gtId: this.gameType,
        isGetChild: 1,
        parentId: this.parentId,
        page: page,
        pagesize: 20
      }
      getTeamSummary(data).then(res => {
        if (res.errno === 0) {
          this.table2Msg = res.data.child_summary.data
          this.table1Msg = res.data.self_summary
          this.teamSummary = res.data.team_summary
          this.pageDate.page = res.data.child_summary.page
          this.pageDate.pageSize = res.data.child_summary.pagesize
          this.pageDate.totalCount = res.data.child_summary.total_count
          if (res.data.child_summary.page_count === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = res.data.child_summary.page_count
          }
        }
        this.$loadingHide()
      })
    },
    query () {
      this.getIntervalStatistics(1)
    },
    querySuborDinate (ID) {
      this.parentId = ID
      this.getIntervalStatistics(1)
    },
    // 点击跳转页数
    jump (pageNum) {
      this.getIntervalStatistics(pageNum)
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
  .username{
    cursor: pointer;
  }
  .username:hover{
    color: #EC6300;
  }
</style>
