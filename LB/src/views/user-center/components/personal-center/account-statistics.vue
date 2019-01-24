<template>
  <div class="width">
    <p class="title">个人统计分析</p>
    <div class="account-statistics centerBox">
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
        <el-button @click="select(1)" :class="{active:isActive === 1}">今日</el-button>
        <el-button @click="select(2)" :class="{active:isActive === 2}">昨日</el-button>
        <el-button @click="select(3)" :class="{active:isActive === 3}">最近七天</el-button>
        <DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>
        <el-button class="active" @click="query">查询</el-button>
      </div>
      <div class="content">
        <section>
          <ul>
            <li v-for="(item, index) in sectionList" :key="index">
              <span><i :class="item.icon" class="iconfont"></i></span>
              <div class="text">
                <p>{{item.title}}</p>
                <p>{{item.msg === null ? '0':item.msg}}元</p>
              </div>
            </li>
          </ul>
        </section>
        <div class="chartbox"  v-if="isCart === true">
          <Chart :options="options" :styles="styles" ref="simpleChart"></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import Chart from '../../../../components/user-center/chart'
import { getSummary, getDateSummary, getGameTypeList } from '../../../../api/userCenter/personalCenter/personal-center'
import { GetSummaryTrend } from '../../../../api/userCenter/teamCenter/team-center'
export default {
  name: 'account-statistics',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      isActive: 0,
      gameTypes: [{value: '', label: '全部'}], // 游戏种类
      gameType: '',
      options: {
        chart: {
          type: 'areaspline' // 指定图表的类型，默认是折线图（line）
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        title: {
          text: '最近15天数据', // 标题
          style: {
            color: '#333',
            fontSize: '26px'
          }
        },
        xAxis: {
          reversed: false,
          type: 'datetime',
          categories: [] // x 轴分类
        },
        yAxis: {
          allowDecimals: false,
          lineWidth: 1,
          tickAmount: 10,
          title: {
            text: '' // y 轴标题
          }
        },
        series: [
          { // 数据列
            name: '总充值', // 数据列名
            data: [] // 数据

          },
          {
            name: '总提现',
            data: [] // 数据
          },
          {
            name: '总促销',
            data: [] // 数据
          },
          {
            name: '总佣金',
            data: [] // 数据
          },
          {
            name: '实际销量',
            data: [] // 数据
          },
          {
            name: '总派奖',
            data: [] // 数据
          },
          {
            name: '返点',
            data: [] // 数据
          },
          {
            name: '自身返点',
            data: [] // 数据
          },
          {
            name: '总盈亏',
            data: [] // 数据
          }
        ]
      },
      styles: '',
      sectionList: [
        {
          icon: 'icon-xinhao',
          title: '总充值',
          msg: '0'
        },
        {
          icon: 'icon-meiyuan-copy',
          title: '总提现',
          msg: '0'
        },
        {
          icon: 'icon-xiaoliang',
          title: '总销量',
          msg: '0'
        },
        {
          icon: 'icon-wanjiantoukaobei',
          title: '总派奖',
          msg: '0'
        },
        {
          icon: 'icon-xuanzhuan',
          title: '总返点',
          msg: '0'
        },
        {
          icon: 'icon-dianchi--1',
          title: '总促销',
          msg: '0'
        },
        {
          icon: 'icon-zhuanshi',
          title: '总佣金',
          msg: '0'
        },
        {
          icon: 'icon-lifangti',
          title: '总盈亏',
          msg: '0'
        }
      ],
      isCart: false // 图表数据是否已就绪
    }
  },
  components: {
    DateTimePicker,
    Chart
  },
  created () {
    this.$loadingShow()
    this.begin_date = this.getTime(0) + ' 00:00:00'
    this.end_date = this.getTime(0) + ' 23:59:59'
    this.getStatistics('')
    this.getGamelist()
    this.GetTeamTrend()
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
    select (e) {
      this.isActive = e
      switch (e) {
        case 1: // 今天
          this.begin_date = this.getTime(0) + ' 00:00:00'
          this.getStatistics(this.begin_date)
          break
        case 2: // 昨天
          this.begin_date = this.getTime(1) + ' 00:00:00'
          this.getStatistics(this.begin_date)
          break
        case 3: // 一周内
          this.begin_date = this.getTime(7) + ' 00:00:00'
          this.getIntervalStatistics(this.begin_date, this.end_date, this.gameType)
          break
        default:
      }
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
    getIntervalStatistics (beginDate, endDate, gtId) {
      this.$loadingShow()
      getSummary(beginDate, endDate, gtId).then(res => {
        if (res.errno === 0) {
          this.sectionList[0].msg = res.data.totally[0].deposit
          this.sectionList[1].msg = res.data.totally[0].withdraw
          this.sectionList[2].msg = res.data.totally[0].sales
          this.sectionList[3].msg = res.data.totally[0].prize
          this.sectionList[4].msg = res.data.totally[0].commission
          this.sectionList[5].msg = res.data.totally[0].bonus
          this.sectionList[6].msg = res.data.totally[0].lose_commission
          this.sectionList[7].msg = res.data.totally[0].profit
        }
      })
      this.$loadingHide()
    },
    // 个人日统计数据
    getStatistics (data) {
      if (data === '') {
        data = this.getTime(0) + ' 00:00:00'
      }
      this.$loadingShow()
      getDateSummary(data).then(res => {
        if (res.errno === 0) {
          this.sectionList[0].msg = res.data.deposit
          this.sectionList[1].msg = res.data.withdraw
          this.sectionList[2].msg = res.data.sales
          this.sectionList[3].msg = res.data.prize
          this.sectionList[4].msg = res.data.commission
          this.sectionList[5].msg = res.data.bonus
          this.sectionList[6].msg = res.data.lose_commission
          this.sectionList[7].msg = res.data.profit
        }
      })
      this.$loadingHide()
    },
    // 获取图表信息
    GetTeamTrend () {
      let beginDate = this.getTime(14) + ' 00:00:00'
      let endDate = this.getTime(0) + ' 00:00:00'
      GetSummaryTrend(beginDate, endDate, 1).then(res => {
        if (res.errno === 0) {
          this.options.xAxis.categories = res.data.date
          this.optionsForEach(res.data.deposit, 0)
          this.optionsForEach(res.data.withdraw, 1)
          this.optionsForEach(res.data.bonus, 2)
          this.optionsForEach(res.data.lose_commission, 3)
          this.optionsForEach(res.data.sales, 4)
          this.optionsForEach(res.data.prize, 5)
          this.optionsForEach(res.data.commission, 6)
          this.optionsForEach(res.data.profit, 7)
          this.isCart = true
        }
      })
    },
    optionsForEach (data, num) {
      data.forEach((item, index) => {
        this.options.series[num].data.push(Number(item))
      })
    },
    query () {
      this.getIntervalStatistics(this.begin_date, this.end_date, this.gameType)
    }
  }
}
</script>

<style scoped>
  @import "../../statics/css/userCenterCommon.css";
</style>
