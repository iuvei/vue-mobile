<template>
  <div class="width">
    <p class="title">个人游戏记录</p>
    <div class="account-gamerecord centerBox">
      <div class="condition">
        <div class="selects">
          <div class="label">游戏种类</div>
          <el-select v-model="gameType" placeholder="请选择" @change="changeGameType">
            <el-option
              v-for="(item,index) in gameTypes"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--<div class="selects">
          <div class="label">注单种类</div>
          <el-select v-model="changeList" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>-->
        <div class="selects" v-if="gameType === 1"> <!--第三方游戏记录无彩种选项-->
          <div class="label">彩种</div>
          <el-select v-model="gameValue" placeholder="请选择" @change="changeGame">
            <el-option
              v-for="(gameItem,index) in allGames"
              :key="index"
              :label="gameItem.label"
              :value="gameItem.id">
            </el-option>
          </el-select>
        </div>
        <!--<div class="selects">
          <div class="label">注单模式</div>
          <el-select v-model="changeList" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>-->
        <DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>
        <el-button class="active" @click="getRecord(1)">查询</el-button>
      </div>
      <div class="content">
        <UserTable class="table1" :tablehade="tableHade" :userActive="userActive" v-if="gameType === 1">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.serial_number}}</p></div> <!-- 注单编号-->
            <!--<div><p></p></div> &lt;!&ndash; 种类&ndash;&gt;-->
            <div><p>{{item.is_traced === 0?'否':'是'}}</p></div> <!-- 是否追号-->
            <div><p>{{item.lottery_name}}</p><p>{{item.way}}</p></div> <!-- 彩种玩法-->
            <div><p>{{item.issue}}</p></div> <!-- 期号-->
            <div style="width: 160px;"><p>{{item.bought_at}}</p></div> <!-- 投注时间-->
            <div><p class="actions" @click="detailsNotes(item.id, item.series)">投注详情</p></div> <!-- 投注内容-->
            <div><p>{{item.multiple}}</p></div> <!-- 倍数-->
            <div><p>{{item.single_count}}</p></div> <!-- 注数-->
            <div><p>{{item.amount}}</p></div> <!-- 投注金额-->
            <div> <!-- 中奖金额-->
              <p v-if="item.prize !== '--'">{{item.prize}}</p>
              <p v-if="item.prize === '--'">0</p>
            </div>
            <div> <!-- 注单状态-->
              <p v-if="item.status === 0">待开奖</p>
              <p v-if="item.status === 1">用户已撤销</p>
              <p v-if="item.status === 2">未中奖</p>
              <p v-if="item.status === 3">已中奖</p>
              <p v-if="item.status === 4">已派奖</p>
              <p v-if="item.status === 5">系统撤销</p>
            </div>
            <div><p v-if="item.can_drop !== 0" class="actions" @click="cancelOrder(item.id)">撤单</p></div> <!-- 操作-->
          </li>
          <li v-show="tableMsg.length !== 0" style="background: #d8eaf6">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div style="width: 160px;"></div>
            <div></div>
            <div></div>
            <div><p>本页小计</p></div>
            <div><p>{{getTotalNum(tableMsg, 'amount', 4)}}</p></div>
            <div><p>{{getTotalNum(tableMsg, 'prize', 4)}}</p></div>
            <div></div>
            <div></div>
          </li>
          <!--<li v-show="tableMsg.length !== 0" style="background: #dddddd">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div style="width: 160px;"></div>
            <div></div>
            <div></div>
            <div><p>全页总计</p></div>
            <div><p>{{tzPageMoney}}</p></div>
            <div><p>{{zjPageMoney}}</p></div>
            <div></div>
            <div></div>
          </li>-->
          <li class="nomsg" v-show="tableMsg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
        <UserTable class="table1 tableHade2" :tablehade="tableHade2" :userActive="userActive" v-if="gameType !== 1">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.id}}</p></div> <!-- 注单编号-->
            <div><p>{{item.date}}</p></div> <!-- 投注日期-->
            <div><p>{{item.turnover}}</p></div> <!--投注金额-->
            <div><p>{{item.prize}}</p></div> <!-- 派奖-->
            <div><p>{{item.profit}}</p></div> <!-- 盈亏-->
            <div><p>{{item.commission_status}}</p></div> <!-- 返水状态-->
          </li>
          <li class="nomsg" v-show="tableMsg.length === 0"><span>暂时没有数据</span></li>
        </UserTable>
        <Pagination :pageDate="pageDate" @jump="jump"></Pagination>
      </div>
    </div>
    <Dialog
      title="系统提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <div class="err">{{errMsg}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm(canDrop)">确 定</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { getProjectList } from '@/api/game/game'
import { Message } from 'element-ui'
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import UserTable from '../../../../components/user-center/user-table'
import Pagination from '../../../../components/user-center/pagination'
import Dialog from '../../../../components/dialog/src/component'
import { getAllGames, getGameTypeList, getProjectDetail, dropProject, GetThirdGameRecordList } from '../../../../api/userCenter/personalCenter/personal-center'
import { getTotalNum } from '../../../../common/js/operation'
export default {
  name: 'account-gamerecord',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      gameTypes: [], // 游戏种类
      gameType: 1,
      allGames: [{value: '', label: '全部'}], // 彩种
      gameValue: '',
      tableHade: [
        {title: '注单编号'},
        {title: '是否追号'},
        {title: '彩种玩法'},
        {title: '期号'},
        {title: '投注时间'},
        {title: '投注内容'},
        {title: '倍数'},
        {title: '注数'},
        {title: '投注金额'},
        {title: '中奖金额'},
        {title: '注单状态'},
        {title: '操作'}
      ],
      tableHade2: [
        {title: '注单编号'},
        {title: '投注日期'},
        {title: '投注金额'},
        {title: '派奖'},
        {title: '盈亏'},
        {title: '返水状态'}
      ],
      userActive: 4, // 宽度较宽的表头
      tableMsg: [], // 游戏列表数据
      pageDate: { // 分页参数
        page: 1, // 当前页
        pageSize: 20, // 页尺寸
        pageCount: 0, // 总页数
        totalCount: 0 // 总数量
      },
      notesDetails: {}, // 注单详情
      userData: {}, // 账户信息
      dialogVisible: false,
      canDrop: '', // 是否可以撤单
      noteId: '', // 注单ID
      errMsg: ''
    }
  },
  components: {
    DateTimePicker,
    UserTable,
    Pagination,
    Dialog
  },
  mounted () {
    this.begin_date = this.getTime(0) + ' 00:00:00'
    this.end_date = this.getTime(0) + ' 23:59:59'
    this.getGamelist1()
    this.getGamelist2()
    this.getRecord(1)
  },
  created () {
    let user = this.$store.state.user
    this.userData = user
  },
  methods: {
    changeGameType () {
      this.tableMsg = []
      this.gameValue = ''
      this.pageDate.pageCount = 1
    },
    changeGame (value) {
      this.gameValue = value
    },
    handleClose () {
      this.dialogVisible = false
    },
    getTime (e) {
      return (function (e) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * e)
        return date.Format('yyyy-MM-dd')
      })(e)
    },
    // 获取游戏记录数据
    getRecord (page) {
      this.$loadingShow()
      if (this.gameType === 1) { /* gameType=1 为数字彩   其他为第三方彩种   */
        getProjectList(this.gameValue, page, 20, '', this.begin_date, this.end_date).then(res => {
          this.$loadingHide()
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
        })
      } else {
        // 获取第三方游戏数据
        let data = {
          gameType: this.gameType,
          searchItem: 0,
          beginTime: this.begin_date,
          endTime: this.end_date,
          username: '',
          page: page,
          pageSize: 20
        }
        GetThirdGameRecordList(data).then(res => {
          this.$loadingHide()
          if (res.errno === 0) {
            this.tableMsg = res.data.data
            let tzPageMoney = 0
            let zjPageMoney = 0
            res.data.data.forEach((item, index) => {
              if (parseFloat(item.amount).toString() !== 'NaN') {
                tzPageMoney += parseFloat(item.amount)
              }
              if (parseFloat(item.prize).toString() !== 'NaN') {
                zjPageMoney += parseFloat(item.prize)
              }
            })
            this.tzPageMoney = tzPageMoney
            this.zjPageMoney = zjPageMoney
            this.pageDate.page = res.data.page
            this.pageDate.pageSize = res.data.pagesize
            this.pageDate.totalCount = res.data.total_count
            if (res.data.page_count === 0) {
              this.pageDate.pageCount = 1
            } else {
              this.pageDate.pageCount = res.data.page_count
            }
          }
        })
      }
    },
    // 获取注单详情
    getProjectDetail (e) {
      getProjectDetail(e).then(res => {
        if (res.errno === 0) {
          this.notesDetails = res.data
        }
      })
    },
    detailsNotes (e, type) {
      getProjectDetail(e).then(res => {
        if (res.errno === 0) {
          this.$gameAlertZdxq({
            dataList: res.data,
            titleName: '注单详情',
            gameMenuType: type
          })
        }
      })
    },
    // 撤单
    cancelOrder (e) {
      this.$loadingShow()
      getProjectDetail(e).then(res => {
        this.$loadingHide()
        if (res.errno === 0) {
          this.canDrop = res.data.can_drop
          this.noteId = res.data.id
          if (res.data.can_drop === 0) {
            this.dialogVisible = true
            this.errMsg = '此注单无法撤单'
          } else {
            this.dialogVisible = true
            this.errMsg = '确定要撤单吗'
          }
        }
      })
    },
    confirm (e) {
      if (e === 0) {
        this.dialogVisible = false
      } else {
        dropProject(this.noteId).then(res => {
          this.dialogVisible = false
          Message({message: '撤单成功', type: 'success'})
          this.getRecord()
        })
      }
    },
    // 获取所有彩种数据
    getGamelist1 () {
      getAllGames().then(res => {
        if (res.errno === 0) {
          res.data.forEach((item, index) => {
            if (item.status === 3) {
              this.allGames.push({
                value: item.game_type,
                label: item.name,
                id: item.id
              })
            }
          })
        }
      })
    },
    // 获取游戏种类数据
    getGamelist2 () {
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
    // 点击跳转页数
    jump (pageNum) {
      this.getRecord(pageNum)
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
  .condition .table1.tableHade2 li div{
    width: 16.5%;
  }
  .dialog-body{
    overflow: hidden;
  }
  .dialog-body .titles{
    font-size: 19px;
    font-weight: 500;
    color: #333;
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .dialog-body .left{
    width: 340px;
    padding: 0 20px;
    float: left;
  }
  .dialog-body .left .text{
    padding: 20px 0;
    color: #777;
    line-height: 30px;
    font-weight: 300;
  }
  .dialog-body .left .text div{
    overflow: hidden;
  }
  .dialog-body .left .text div p{
    float: left;
  }
  .dialog-body .left .text div p:nth-child(1){
    width: 80px;
    text-align: right;
  }
  .dialog-body .right{
    width: 220px;
    padding: 0 20px;
    float: left;
  }
  .dialog-body .right .text{
    width: 100%;
    height: 360px;
    margin-top: 20px;
    border: 1px solid #ddd;
    color: #777;
    text-align: center;
    line-height: 30px;
  }
</style>
