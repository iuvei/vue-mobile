<template>
  <div class="width">
    <p class="title">团队帐变明细</p>
    <div class="team-change centerBox">
      <div class="condition">
        <!--<div class="selects">-->
          <!--<div class="label">产品类型</div>-->
          <!--<el-select v-model="oderList" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
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
        <!--<div class="selects">-->
          <!--<div class="label">用戶名</div>-->
          <!--<el-cascader-->
            <!--:options="accountList"-->
            <!--placeholder="请选择下级代理"-->
            <!--@change="changeName"-->
            <!--:show-all-levels="false"-->
            <!--change-on-select-->
            <!--expand-trigger="click"-->
          <!--&gt;</el-cascader>-->
        <!--</div>-->
        <div class="selects">
          <div class="fuzzySearch">
            <span class="label">用戶名</span>
            <div class="form-contrl after">
              <input type="text" v-model="account" placeholder="会员账号查找" @click.stop.self="choice()">
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
        <!--<div class="selects">-->
          <!--<div class="label">范围</div>-->
          <!--<el-select v-model="changeList" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>
        <el-button class="active" @click="query">查询</el-button>
      </div>
      <div class="content">
        <UserTable class="table1" :tablehade="tableHade">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.username}}</p></div>
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
            <div></div>
            <div><p>本页小计</p></div>
            <div><p class="green">{{getTotalNum(tableMsg, 'add_amount', 4)}}</p></div>
            <div><p class="red">{{getTotalNum(tableMsg, 'deduct_amount', 4)}}</p></div>
            <div></div>
            <div></div>
          </li>
          <!--<li v-show="tableMsg.length !== 0" style="background: #dddddd">-->
            <!--<div></div>-->
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
import { GetChild } from '../../../../api/userCenter/teamCenter/team-center'
import { getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'team-change',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      oderList: '', // 产品类型
      changeList: [{value: '', label: '全部'}], // 账变类型
      changeValue: '',
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
      tableHade: [
        {title: '用戶名'},
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
  mounted () {
  },
  created () {
    if (this.$route.query.userId !== undefined) {
      this.account = JSON.parse(this.$route.query.username)
    }
    this.$loadingShow()
    this.begin_date = this.getTime(0) + ' 00:00:00'
    this.end_date = this.getTime(0) + ' 23:59:59'
    this.getTransactionTypeList()
    this.getTeamUsers()
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
    // 获取用户名
    getTeamUsers () {
      GetChild('', '').then(res => {
        if (res.errno === 0) {
          this.accountList = res.data
          // let accountList = []
          // res.data.forEach((item, index) => {
          //   accountList.push({
          //     in: index,
          //     value: item.id,
          //     label: item.username,
          //     children: []
          //   })
          //   GetChild(item.id, '').then(res => {
          //     if (res.errno === 0) {
          //       let accountList1 = []
          //       res.data.forEach((item1, index) => {
          //         accountList1.push({
          //           value: item1.id,
          //           label: item1.username,
          //           children: []
          //         })
          //       })
          //       console.log(accountList)
          //     }
          //   })
          // })
          // this.$set(this, 'accountList', accountList)
          // console.log(this.accountList)
        }
      })
    },
    // handleItemChange (val, index) {
    //   console.log(val)
    //   GetChild(val[0], '').then(res => {
    //     if (res.errno === 0) {
    //       let accountList = []
    //       res.data.forEach((item, index) => {
    //         accountList.push({
    //           value: item.id,
    //           label: item.username,
    //           children: []
    //         })
    //       })
    //       console.log(accountList)
    //     }
    //   })
    // },
    // changeName (e) {
    //   console.log(e)
    // },
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
      this.account = item.username
      this.accountListShow = false
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
        searchTeam: 1,
        userName: this.account
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
        }
        this.$loadingHide()
      })
    },
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
