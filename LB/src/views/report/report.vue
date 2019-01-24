<template>
  <div class="report-content">
    <div class="report-width">
      <div class="condition clear-fix">
        <el-select class="select" v-model="count" placeholder="游戏种类" @change = "changeGameType">
          <el-option :label="gameItem.name" :value="gameItem.name" v-for="(gameItem, index) in gameType" :key="index">{{gameItem.name}}</el-option>
        </el-select>
        <el-select class="select" v-model="count2" placeholder="彩种" @change = "changeGame">
          <el-option label="全部彩种" :value="'0'" ></el-option>
          <el-option :label="gameItem.name" :value="gameItem.key" v-for="(gameItem, index) in gameList" :key="index"></el-option>
        </el-select>
        <el-date-picker
          class="dataPicker"
          v-model="timeModel1"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-date-picker
          class="dataPicker"
          v-model="timeModel2"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
        <a class="btnQuery" href="javascript:;" @click="searchRecord">查询 》</a>
      </div>
      <div class="report-table">
        <table>
          <tr>
            <th v-for="(column, index) in columnData" :key="index">
              <div class="column-inner">{{column.label}}</div>
            </th>
          </tr>
          <template v-if="dataList.length">
            <tr class="border-bottom" v-for="(item, index) in dataList" :key="index">
              <!--<td v-for="(itemInner, indexInner) in columnData" :key="indexInner">
                <div>{{item[itemInner.value]}}</div>
              </td>-->
              <td><div>{{item.lottery_name}}</div></td>
              <td><div>{{item.way}}</div></td>
              <td><div>{{item.issue}}</div></td>
              <td><a class="tzxq-btn changeColor" href="javascript:;" @click="showTzxqPop(item.id)" >投注详情</a></td>
              <td><div>{{item.multiple}}</div></td>
              <td><div>{{item.single_count}}</div></td>
              <td><div>{{item.amount | PrizeFilter}}</div></td>
              <td><div>{{item.prize | PrizeFilter}}</div></td>
              <td>
                <div v-if="item.status === 0">待开奖</div>
                <div v-if="item.status === 1">用户已撤销</div>
                <div v-if="item.status === 2">未中奖</div>
                <div v-if="item.status === 3">已中奖</div>
                <div v-if="item.status === 4">已派奖</div>
                <div v-if="item.status === 5">系统撤销</div>
              </td>
              <td><a class="tzxq-btn changeColor" href="javascript:;" @click="showDropPop(item.id)"  v-if="item.can_drop === 1">撤单</a></td>
            </tr>
          </template>
        </table>
        <div class="byxj">
          本页小计:
          <i>{{zdPageMoney}}</i>
          <i>{{zjPageMoney}}</i>
        </div>
      </div>
      <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="pageCount"
      :page-size="20">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import {getProjectList, GetGameMenu, getProjectDetail, dropProject} from '@/api/game/game'
import { Message } from 'element-ui'
export default {
  name: 'report',
  data () {
    return {
      gameType: [], /* 游戏种类 */
      gameList: [],
      newGameList: [],
      newDataList: [],
      zdPageMoney: 0,
      zjPageMoney: 0,
      count: '',
      count2: '',
      pageCount: 0,
      currentPage: 1,
      gameId: '',
      timeModel1: '',
      timeModel2: '',
      startTime: '',
      endTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      columnData: [
        {
          key: 'cz',
          label: '彩种',
          value: 'lottery_name'
        },
        {
          key: 'wf',
          label: '玩法',
          value: 'way'
        },
        {
          key: 'qh',
          label: '期号',
          value: 'issue'
        },
        {
          key: 'tznr',
          label: '投注内容',
          value: 'bet_number'
        },
        {
          key: 'bs',
          label: '倍数',
          value: 'multiple'
        },
        {
          key: 'zs',
          label: '注数',
          value: 'single_count'
        },
        {
          key: 'zdje',
          label: '注单金额',
          value: 'amount'
        },
        {
          key: 'zjje',
          label: '中奖金额',
          value: 'prize'
        },
        {
          key: 'zdzt',
          label: '注单状态',
          value: 'status'
        },
        {
          key: 'action',
          label: '操作',
          value: 'action'
        }
      ],
      dataList: [
        {
          cz: '彩票娱乐场',
          wf: '活动:8',
          qh: '活动奖金',
          tznr: '2O16-O9-26 O4:OO:OO',
          bs: 5,
          zs: 6,
          zdje: 7,
          zjje: 8,
          zdzt: 9
        }
      ]
    }
  },
  methods: {
    showTzxqPop (id) {
      this.getPopList(id)
    },
    showDropPop (id) {
      dropProject(id)
        .then((res) => {
          Message({message: '撤单成功', type: 'success'})
          this.searchRecord(id)
        })
    },
    getPopList (id) {
      getProjectDetail(id)
        .then(res => {
          this.$gameAlertZdxq({
            dataList: res.data,
            titleName: '注单详情'
          })
        })
    },
    format (timer) {
      var date = new Date(timer)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    /* 查询 */
    searchRecord () {
      let time = new Date()
      this.startTime = time.setTime(this.timeModel1)
      this.endTime = time.setTime(this.timeModel2)
      getProjectList(this.gameId, 0, 20, null, this.format(this.startTime), this.format(this.endTime))
        .then(res => {
          this.dataList = res.data.data
          this.pageCount = res.data.total_count
          this.seacrhOrderList(this.dataList)
        })
    },
    handleCurrentChange (value) {
      this.currentPage = value
      let time = new Date()
      this.startTime = time.setTime(this.timeModel1)
      this.endTime = time.setTime(this.timeModel2)
      getProjectList(this.gameId, value, 20, null, this.format(this.startTime), this.format(this.endTime))
        .then(res => {
          this.dataList = res.data.data
          this.seacrhOrderList(this.dataList)
        })
    },
    changeGame (value) {
      this.gameId = value
    },
    changeGameType (value) {
      this.gameList = []
      for (var i = 0; i < this.newGameList.length; i++) {
        if (this.newGameList[i].lotterType === value) {
          this.gameList.push(this.newGameList[i])
        }
      }
      this.count2 = this.gameList[0].name
      this.gameId = this.gameList[0].key
    },
    GetGameList () {
      GetGameMenu() /* 获取游戏列表 */
        .then(res => {
          for (let key in res.data) {
            this.gameType.push(res.data[key])
            for (let keyInner in res.data[key]['lotteries']) {
              res.data[key]['lotteries'][keyInner]['key'] = keyInner
              res.data[key]['lotteries'][keyInner]['lotterType'] = res.data[key].name
              this.gameList.push(res.data[key]['lotteries'][keyInner])
              this.newGameList.push(res.data[key]['lotteries'][keyInner])
            }
          }
        })
    },
    // 获得注单记录
    getOrderList (id) {
      getProjectList(id, 1, 20)
        .then(res => {
          this.pageCount = res.data.total_count
          this.dataList = res.data.data
          this.seacrhOrderList(this.dataList)
        })
    },
    seacrhOrderList (dataList) {
      this.zdPageMoney = 0
      this.zjPageMoney = 0
      for (let i = 0; i < dataList.length; i++) {
        // 计算每页20条的注单金额总和，中奖金额总和
        this.zdPageMoney += parseFloat(dataList[i].amount)
        if (dataList[i].prize != null && dataList[i].prize !== '--') {
          this.zjPageMoney += parseInt(dataList[i].prize)
        }
      }
    }
  },
  filters: {
    PrizeFilter: function (val) {
      if (val === '--') {
        return '0'
      } else {
        return parseInt(val).toFixed(2)
      }
    }
  },
  created () {
    this.getOrderList(undefined)
    this.GetGameList()
    let time = new Date()
    let timeStamp = time.getTime()
    this.timeModel2 = timeStamp // 获取当前时间,点查询按钮默认查询截止时间为当前时间
  }
}
</script>

<style scoped>
  .el-pagination{
    text-align: center;
    margin-top: 10px;
  }
  .report-width {
    width: 1169px;
    margin: 0 auto;
  }
  .report-content {
    min-height: 700px;
    padding-top: 42px;
    padding-bottom: 20px;
    background-size: 100% 100%;
    background: url("../../statics/img/home_bg.jpg") no-repeat 0 -100px;
    background-color: #000;
  }
  .condition {
    height: 95px;
    line-height: 53px;
    background-color: rgba(5, 5, 5, .8);
    border-radius: 9px;
    border: 1px solid #19191f;
    padding: 21px 52px;
  }
  .select {
    width: 134px;
    float: left;
    height: 100%;
  }
  .select{
    margin-right: 5px;
  }
  .dataPicker {
    float: left;
    margin-right: 5px;
    width: 200px;
  }
  .btnQuery {
    display: inline-block;
    width: 85px;
    line-height: 37px;
    text-align: center;
    font-size: 16px;
    height: 37px;
    background-color: #ffc000;
    margin-top: 9px;
    margin-left: 11px;
    color: #4c3626;
    border-radius: 2px;
  }
  .changeColor.tzxq-btn:hover{
    color: #f27f2f;
  }
  .report-table {
    border-radius: 9px;
    border: 1px solid #19191f;
    padding: 12px 46px 20px 42px;
    background-color: rgba(0, 0, 0, .8);
    margin-top: 12px;
  }
  .report-table table {
    position: relative;
  }
  .report-table table tr:nth-of-type(1)::after {
    content: '';
    display: block;
    width: 1115px;
    height: 10px;
    position: absolute;
    top: 50px;
    background: url("../../statics/img/report_table_tr_border.png") no-repeat 0 0;
    left: -18px;
  }
  .report-table tr th .column-inner {
    width: 107px;
  }
  .report-table tr:nth-of-type(1){
    display: table;
  }
  .report-table table tr th,
  .report-table table tr td {
    line-height: 60px;
    height: 60px;
  }
  .report-table table tr td > div {
    overflow: hidden;
    padding: 0 5px;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .report-table table .tzxq-btn,
  .report-table table tr th > div,
  .report-table table tr td > div {
    height: 20px;
    width: 107px;
    display: inline-block;
    font-size: 16px;
    color: #fefefe;
    border-right: 1px solid #ffffff;
    line-height: 20px;
    text-align: center;
  }
  .report-table table tr th:nth-last-of-type(1) > div,
  .report-table table tr td:nth-last-of-type(1) > div {
    border-right: none;
  }
  .border-bottom {
    display: block;
    position: relative;
  }
  .border-bottom::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("../../statics/img/border_bottom_1px_bg.png") no-repeat 0 0;
    width: 1110px;
    height: 1px;
  }
  .byxj,
  .qyzj{
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    color: #fefefe;
    position: relative;
  }
  .byxj i,
  .qyzj i{
    position: absolute;
    font-style: normal;
  }
  .byxj i:nth-of-type(1),
  .qyzj i:nth-of-type(1) {
    right: 360px;
  }
  .byxj i:nth-of-type(2),
  .qyzj i:nth-of-type(2) {
    right: 250px;
  }
</style>
