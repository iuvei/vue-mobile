<template>
  <div class="width">
    <p class="title">个人奖金总览</p>
    <div class="account-bonus centerBox">
      <div class="top">
        <div class="selects">
          <el-select v-model="gameValue" @change="gameChang" placeholder="请选择">
            <el-option
              v-for="item in allGames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="text">
          <p>单期高频彩利润最大值为<span>{{high_frequency_issue_profit_limit}}</span>元，单期低频彩利润最大值为<span>{{low_frequency_issue_profit_limit}}</span>元</p>
          <p>中奖概率低于<span>{{challenge_rate}}%</span>的投注均为单挑模式，单期利润最大值为<span>{{challenge_profit_limit}}</span>元</p>
        </div>
        <ul class="proportion">
          <li v-for="(item, index) in platformList" :key="index">
            <div>
              <span>{{item.game_name}}：</span>
              <span>{{item.percent_value}}%</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <UserTable class="table1" :tablehade="tableHade">
          <li v-for="(item, index) in tableMsg" :key="index">
            <div><p>{{item.way}}</p></div> <!-- 玩法组-->
            <div><p>{{item.sub_way}}</p></div> <!-- 玩法分类-->
            <div><p style="padding: 0 10px">{{item.bet_note}}</p></div>
            <div><p style="padding: 0 10px">{{item.bonus_note}}</p></div>
            <div><p v-for="(subitem, index) in item.prizes" :key="index">{{subitem.level}}：{{subitem.prize}}</p></div> <!-- 奖金模式奖金-->
          </li>
        </UserTable>
        <Pagination :pageDate="pageDate" @jump="jump"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import UserTable from '../../../../components/user-center/user-table'
import Pagination from '../../../../components/user-center/pagination'
import { getAllGames, GetUserLotteryPrizeLimit, GetUserGameTypePercentList } from '../../../../api/userCenter/personalCenter/personal-center'
export default {
  name: 'account-bonus',
  data () {
    return {
      allGames: [], // 彩种
      gameValue: 1,
      tableHade: [
        {title: '玩法组'},
        {title: '玩法分类'},
        {title: '玩法规则'},
        {title: '例子'},
        {title: '奖金模式奖金'}
      ],
      high_frequency_issue_profit_limit: '', // 高频彩最高奖金
      low_frequency_issue_profit_limit: '', // 低频彩最高奖金
      challenge_rate: '', // 中奖概率
      challenge_profit_limit: '', // 单期奖金最大值
      prizeDetails: [], // 返回数据
      tableMsg: [], // 列表数据
      platformList: [],
      pageDate: { // 分页参数
        page: 1, // 当前页
        pageSize: 20, // 页尺寸
        pageCount: 0, // 总页数
        totalCount: 0 // 总数量
      },
      userId: ''
    }
  },
  components: {
    UserTable,
    Pagination
  },
  created () {
    if (this.$route.query.userId !== undefined) {
      this.userId = this.$route.query.userId
    }
    this.$loadingShow()
    this.getGamelist()
    this.GetUserLottery()
    this.getGameList()
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.$loadingHide()
  },
  methods: {
    // 获取彩种数据
    getGamelist () {
      getAllGames().then(res => {
        if (res.errno === 0) {
          res.data.forEach((item, index) => {
            if (item.status === 3) {
              this.allGames.push({
                value: item.id,
                label: item.name
              })
            }
          })
        }
      })
    },
    //  获取用户彩种玩法奖金标准
    GetUserLottery () {
      this.$loadingShow()
      GetUserLotteryPrizeLimit(this.gameValue, 1, this.userId).then(res => {
        if (res.errno === 0) {
          this.high_frequency_issue_profit_limit = res.data.high_frequency_issue_profit_limit
          this.low_frequency_issue_profit_limit = res.data.low_frequency_issue_profit_limit
          this.challenge_rate = res.data.challenge_rate
          this.challenge_profit_limit = res.data.challenge_profit_limit
          this.prizeDetails = res.data.prize_details
          this.pageDate.totalCount = this.prizeDetails.length
          this.pageDate.pageCount = Math.ceil(this.prizeDetails.length / 20)
          this.tableMsg = this.prizeDetails.slice(0, 20)
          this.$loadingHide()
        }
      })
    },
    getGameList () {
      // 获取第三方平台
      GetUserGameTypePercentList(this.userId).then(res => {
        this.platformList = res.data
        console.log(res)
      })
    },
    // 选择游戏
    gameChang () {
      this.GetUserLottery()
    },
    // 点击跳转页数
    jump (pageNum) {
      this.slice(pageNum)
    },
    slice (page) {
      this.pageDate.page = page
      this.pageDate.totalCount = this.prizeDetails.length
      this.pageDate.pageCount = Math.ceil(this.prizeDetails.length / 20)
      this.tableMsg = this.prizeDetails.slice((page - 1) * 20, page * 20)
    }
  }
}
</script>

<style scoped>
  @import "../../statics/css/userCenterCommon.css";
  .account-bonus .top{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .account-bonus .top .selects{
    margin: 10px 0;
  }
  .account-bonus .top .text{
    width: 500px;
    padding: 0 15px;
    font-size: 12px;
    color: #777;
    line-height: 20px;
    font-weight: 300;
    margin: 10px 0;
  }
  .account-bonus .top .text span{
    color: #eb7e00;
  }
  .account-bonus .top .proportion{
    width: 440px;
    background: linear-gradient(#fbf7f7, #e6e4e4);
    border: 1px solid #dcdcdc;
    font-size: 12px;
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .account-bonus .top .proportion li{
    width: 45%;
    color: #777;
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 767px){
    .account-bonus .top{
      padding: 0 15px;
    }
    .account-bonus .top .selects{
      width: 100%;
    }
    .account-bonus .top .selects .el-select{
      width: 100%;
    }
    .account-bonus .top .text{
      padding: 0;
    }
    .account-bonus .top .proportion{
      width: 100%;
    }
  }
</style>
