<template>
  <div class="width">
    <p class="title">团队用户管理</p>
    <div class="team-management centerBox">
      <div class="condition">
        <div class="selects">
          <div class="label">会员账号</div>
          <el-autocomplete
            class="inline-input"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="会员账号查找"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <el-button class="active" @click="query">查询</el-button>
        <div class="agent">
          <router-link  class="btn new-agent" :to="{name: 'team-addagent'}">
            <span style="margin-right: 10px">新增代理</span>
            <span><i class="el-icon-plus"></i></span>
          </router-link>
          <router-link  class="btn agent-promotion" :to="{name: 'team-agentpromotion'}">
            <span style="margin-right: 10px">代理推广</span>
            <span><i class="el-icon-share" style="border: none;"></i></span>
          </router-link>
        </div>
      </div>
      <div class="content">
        <UserTable class="table1" :tablehade="tableHade">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.username}}</p></div>
            <div><p>{{item.prize_group}}</p></div>
            <div><p>{{item.children_num}}</p></div>
            <div><p>{{item.balance}}</p></div>
            <div><p>{{item.group_account_sum}}</p></div>
            <div><p>{{item.register_at}}</p></div>
            <div><p>{{item.signin_at}}</p></div>
            <div>
              <p>
                <router-link  class="actions" :to="{path:'/main/user-center/account-bonus',query: {userId: JSON.stringify(item.id)}}">
                  <span>奖金</span>
                </router-link>
                <span class="actions" @click="returnPoint(item.id)">返点</span>
                <router-link  class="actions" :to="{path:'/main/user-center/team-change',query: {userId: JSON.stringify(item.id),username: JSON.stringify(item.username)}}">
                  <span>账变</span>
                </router-link>
              </p>
            </div>
          </li>
          <li v-show="tableMsg.length !== 0" style="background: #dddddd">
            <div><p>合计</p></div>
            <div><p></p></div>
            <div><p></p></div>
            <div><p>{{getTotalNum(tableMsg, 'balance', 4)}}</p></div>
            <div><p>{{getTotalNum(tableMsg, 'group_account_sum', 4)}}</p></div>
            <div><p></p></div>
            <div><p></p></div>
            <div><p></p></div>
          </li>
          <li class="nomsg" v-show="tableMsg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
        <Pagination :pageDate="pageDate" @jump="jump"></Pagination>
      </div>
    </div>
    <Dialog
      title="返点设置"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
        <el-form-item label="彩票返点" prop="prize_group" style="padding-left: 10px;color: #777;">
          <el-select class="input" v-model="ruleForm.prize_group" filterable placeholder="请选择">
            <el-option
              v-for="item in a_prize_data"
              :key="item.id"
              :label="parseFloat(item.name).toLocaleString() +'-'+ accMul(item.water, 100) +'%'"
              :value="JSON.stringify(item)">
              <span>{{item.classic_prize.toLocaleString()}}</span>
              -
              <span>{{accMul(item.water, 100)}}%</span>
            </el-option>
          </el-select>
          <span v-if="a_prize_data.length > 0">（可用范围：{{a_prize_data[0].water | accMul}}%~{{a_prize_data[a_prize_data.length - 1].water | accMul}}%）</span>
        </el-form-item>
        <el-form-item :label="item.name"  style="padding-left: 10px;color: #777;" v-for="(item, index) in percent_list" :key="index">
          <el-input-number v-model="percent_list[index].value" controls-position="right" :precision="1" :step="0.1" :min="item.percent_min_value" :max="item.percent_max_value"></el-input-number>
          <span class="percentage">%</span>
          <el-checkbox v-model="percent_list[index].checked"></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import UserTable from '../../../../components/user-center/user-table'
import Pagination from '../../../../components/user-center/pagination'
import Dialog from '../../../../components/dialog/src/component'
import { GetTeamUsers, SetUserPrizeGroup, GetUserPlatPercents, SetUserPlatPercent } from '../../../../api/userCenter/teamCenter/team-center'
import { accMul, getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'team-management',
  inject: ['reload'],
  data () {
    return {
      input: '',
      oderList: '', // 产品类型
      changeList: '', // 账变类型
      tableHade: [
        {title: '代理账号'},
        {title: '返点'},
        {title: '下线人数'},
        {title: '彩票余额'},
        {title: '团队彩票余额'},
        {title: '注册时间'},
        {title: '最后登录'},
        {title: '操作'}
      ],
      tableMsg: [], // 列表数据
      accountList: [], // 账户列表
      pageDate: { // 分页参数
        page: 1, // 当前页
        pageSize: 20, // 页尺寸
        pageCount: 0, // 总页数
        totalCount: 0 // 总数量
      },
      dialogVisible: false,
      a_prize_data: [], // 彩票返点奖金组
      percent_list: [], // 第三方平台返点
      ruleForm: { // 需要验证的字段
        channel: '',
        custom: '',
        prize_group: '',
        agent_qq: ''
      },
      rules: { // 验证规则
        channel: [
          { required: true, message: '请选择推广渠道', trigger: 'change' }
        ],
        custom: [
          { required: true, message: '请输入渠道', trigger: 'blur' }
        ],
        prize_group: [
          { required: true, message: '请选择返点', trigger: 'change' }
        ],
        agent_qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个数字', trigger: 'blur' }
        ]
      },
      userId: ''
    }
  },
  components: {
    DateTimePicker,
    UserTable,
    Pagination,
    Dialog
  },
  created () {
    this.$loadingShow()
    this.getTeamUsers('', '', '', 1, 20)
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    console.log(this.$store.state.user)
    this.$loadingHide()
  },
  methods: {
    getTeamUsers (parentId, username, isAgent, page, pageSize) {
      this.$loadingShow()
      GetTeamUsers(parentId, username, isAgent, page, pageSize).then(res => {
        if (res.errno === 0) {
          this.tableMsg = res.data.child.data
          this.pageDate.page = res.data.child.page
          this.pageDate.pageSize = res.data.child.pagesize
          this.pageDate.totalCount = res.data.child.total_count
          if (res.data.page_count === 0) {
            this.pageDate.pageCount = 1
          } else {
            this.pageDate.pageCount = res.data.child.page_count
          }
          res.data.child.data.forEach((item, index) => {
            this.accountList.push({
              value: item.username
            })
          })
        }
        this.$loadingHide()
      })
    },
    // 获取奖金组数据
    getInformation () {
      GetUserPlatPercents(this.userId).then(res => {
        if (res.errno === 0) {
          let percentList = []
          this.a_prize_data = res.data.prize_groups.details
          for (let i in res.data.percent_list) {
            if (parseFloat(res.data.percent_list[i].percent_value) !== 0) {
              percentList.push({
                name: res.data.percent_list[i].name,
                percent_identity: res.data.percent_list[i].percent_identity,
                percent_max_value: parseFloat(res.data.percent_list[i].percent_max_value),
                percent_min_value: parseFloat(res.data.percent_list[i].percent_min_value),
                value: parseFloat(res.data.percent_list[i].percent_value),
                checked: true
              })
            } else {
              percentList.push({
                name: res.data.percent_list[i].name,
                percent_identity: res.data.percent_list[i].percent_identity,
                percent_max_value: parseFloat(res.data.percent_list[i].percent_max_value),
                percent_min_value: parseFloat(res.data.percent_list[i].percent_min_value),
                value: parseFloat(res.data.percent_list[i].percent_value),
                checked: false
              })
            }
          }
          this.$set(this, 'percent_list', percentList)
        }
        console.log(res, this.percent_list)
      })
    },
    SetUserPlatPercent () {
      let percentList = []
      this.percent_list.forEach((item, index) => {
        if (item.checked === true) {
          percentList.push({
            percent_identity: item.percent_identity,
            percent_value: item.value
          })
        } else {
          percentList.push({
            percent_identity: item.percent_identity,
            percent_value: 0
          })
        }
      })
      let seriesPrizeGroupJson = ''
      let prizeGroup = this.ruleForm.prize_group
      let prize = JSON.parse(prizeGroup)
      seriesPrizeGroupJson = JSON.stringify({1: prize.classic_prize.toString()})
      SetUserPlatPercent(this.userId, JSON.stringify(percentList), seriesPrizeGroupJson).then(res => {
        if (res.errno === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getTeamUsers('', '', '', 1, 20)
        }
      })
    },
    querySearch (queryString, cb) {
      let accountList = this.accountList
      let accounts = queryString ? accountList.filter(this.createFilter(queryString)) : accountList
      // 调用 callback 返回建议列表的数据
      cb(accounts)
    },
    createFilter (queryString) {
      return (account) => {
        return (account.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
    },
    // 查询
    query () {
      this.getTeamUsers('', this.input, '', 1, 20)
    },
    // 跳转个人奖金总览
    toBonus (ID) {
      console.log(ID)
      this.reload()
      this.$router.push({
        path: '/main/user-center/account-bonus',
        name: 'account-bonus',
        params: {
          userId: ID
        }
      })
    },
    returnPoint (ID) {
      this.dialogVisible = true
      this.userId = ID
      this.getInformation()
    },
    confirm () {
      this.dialogVisible = false
      this.SetUserPlatPercent()
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 跳转团队账变明细
    toTeamChange () {
      this.reload()
      this.$router.push('/main/user-center/team-change')
    },
    SetUserPrizeGroup () {
      SetUserPrizeGroup().then(res => {
        console.log(res)
      })
    },
    // 点击跳转页数
    jump (pageNum) {
      this.getTeamUsers('', this.input, '', pageNum, 20)
    },
    accMul (arg1, arg2) { // 乘法
      return accMul(arg1, arg2)
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
  .team-management .condition .agent{
    margin-left: 50px;
    margin-top: 30px;
    overflow: hidden;
  }
  .condition .btn{
    width: 110px;
    height: 30px;
    padding: 0 15px;
    line-height: 28px;
    float: left;
    margin-left: 10px;
    color: #777;
    font-size: 12px;
    border: 1px solid #eb7e00;
    border-radius: 3px;
  }
  .condition .btn:hover{
    background: #EC6300;
    color: #fff;
    cursor: pointer;
  }
  .condition .btn:hover a{
    color: #fff;
  }
  .condition .btn:hover span i{
    transform: translateX(10px);
  }
  .condition .btn:hover span i{
    border: 1px solid #fff;
  }
  .condition .btn a{
    color: #777;
    margin-right: 10px;
    font-weight: 400;
  }
  .condition .btn span i{
    border: 1px solid #777;
    transition: transform  0.5s;
  }
  .team-management .content{
    padding-top: 40px;
  }
  @media screen and (max-width: 767px){
    .team-management .condition .agent{
      margin-left: 0;
    }
    .condition .btn{
      width: 47%;
      text-align: center;
    }
    .condition .btn span:nth-child(2){
      float: right;
    }
  }
</style>
