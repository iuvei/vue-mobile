<template>
  <div class="width">
    <p class="title">团队统计分析</p>
    <div class="team-statistics centerBox">
      <div class="condition">
        <el-button @click="select(1)" :class="{active:isActive === 1}">今日</el-button>
        <el-button @click="select(2)" :class="{active:isActive === 2}">昨日</el-button>
        <el-button @click="select(3)" :class="{active:isActive === 3}">最近七天</el-button>
        <DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>
        <el-button class="active" @click="query">查询</el-button>
      </div>
      <div class="content">
        <section>
          <div class="titles">团队统计</div>
          <ul>
            <li v-for="(item, index) in sectionList1" :key="index">
              <span><i :class="item.icon" class="iconfont"></i></span>
              <div class="text">
                <p>{{item.title}}</p>
                <p>{{item.msg}}元</p>
              </div>
            </li>
          </ul>
          <div class="titles">用户统计</div>
          <ul>
            <li v-for="(item, index) in sectionList2" :key="index">
              <span><i :class="item.icon" class="iconfont"></i></span>
              <div class="text">
                <p>{{item.title}}</p>
                <p>{{item.msg}}人</p>
              </div>
            </li>
          </ul>
        </section>
        <div class="chartbox" v-if="isCart === true">
          <Chart :options="options" :styles="styles" ref="simpleChart"></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from '../../../../components/user-center/date-time-picker'
import Chart from '../../../../components/user-center/chart'
import { GetTeamPandect, GetSummaryTrend } from '../../../../api/userCenter/teamCenter/team-center'
export default {
  name: 'team-statistics',
  data () {
    return {
      begin_date: '', // 开始时间
      end_date: '', // 结束时间
      isActive: 0,
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
            name: '总盈亏',
            data: [] // 数据
          }
        ]
      },
      isCart: false, // 图表显示
      styles: '',
      sectionList1: [
        {
          icon: 'icon-zhuanshi',
          title: '团队佣金',
          msg: '0'
        },
        {
          icon: 'icon-xinhao',
          title: '团队充值',
          msg: '0'
        },
        {
          icon: 'icon-meiyuan-copy',
          title: '团队提现',
          msg: '0'
        },
        {
          icon: 'icon-dianchi-',
          title: '团队余额',
          msg: '0'
        },
        {
          icon: 'icon-xiaoliang',
          title: '团队销量',
          msg: '0'
        },
        {
          icon: 'icon-wanjiantoukaobei',
          title: '团队派奖',
          msg: '0'
        },
        {
          icon: 'icon-xuanzhuan',
          title: '团队返点',
          msg: '0'
        },
        {
          icon: 'icon-lifangti',
          title: '团队盈亏',
          msg: '0'
        }
      ],
      sectionList2: [
        {
          icon: 'icon-tuandui1',
          title: '团队人数',
          msg: '0'
        },
        {
          icon: 'icon-tuandui',
          title: '在线人数',
          msg: '0'
        },
        {
          icon: 'icon-xinzengrenyuan',
          title: '新增人员',
          msg: '0'
        },
        {
          icon: 'icon-denglu',
          title: '今日登录',
          msg: '0'
        },
        {
          icon: 'icon-dianchi--',
          title: '余额小于10',
          msg: '0'
        },
        {
          icon: 'icon-dianchi--1',
          title: '余额大于10',
          msg: '0'
        },
        {
          icon: 'icon-suo',
          title: '30日未登录',
          msg: '0'
        },
        {
          icon: 'icon-multilayer',
          title: '日投注大于1000',
          msg: '0'
        }
      ],
      userData: '' // 账户信息
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
    this.getTeamUsers()
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
          this.getTeamUsers()
          break
        case 2: // 昨天
          this.begin_date = this.getTime(1) + ' 00:00:00'
          this.getTeamUsers()
          break
        case 3: // 一周内
          this.begin_date = this.getTime(7) + ' 00:00:00'
          this.getTeamUsers()
          break
        default:
      }
    },
    // 获取团队成员信息
    getTeamUsers () {
      this.$loadingShow()
      GetTeamPandect(this.begin_date, this.end_date).then(res => {
        if (res.errno === 0) {
          this.sectionList1[0].msg = res.data.lose_commission
          this.sectionList1[1].msg = res.data.deposit
          this.sectionList1[2].msg = res.data.withdraw
          this.sectionList1[3].msg = res.data.balance
          this.sectionList1[4].msg = res.data.sales
          this.sectionList1[5].msg = res.data.prize
          this.sectionList1[6].msg = res.data.commission
          this.sectionList1[7].msg = res.data.profit
          this.sectionList2[0].msg = res.data.persons
          this.sectionList2[1].msg = res.data.online_count
          this.sectionList2[2].msg = res.data.registered_count
          this.sectionList2[3].msg = res.data.login_count
          this.sectionList2[4].msg = res.data.available_less_count
          this.sectionList2[5].msg = res.data.available_greater_count
          this.sectionList2[6].msg = res.data.inactive_count
          this.sectionList2[7].msg = res.data.bet_count
        }
        this.$loadingHide()
      })
    },
    // 获取图表信息
    GetTeamTrend () {
      let beginDate = this.getTime(14) + ' 00:00:00'
      let endDate = this.getTime(0) + ' 00:00:00'
      GetSummaryTrend(beginDate, endDate, 0).then(res => {
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
      this.getTeamUsers()
    }
  }
}
</script>

<style scoped>
  @import "../../statics/css/userCenterCommon.css";
</style>
