<template>
  <div class="lottery-record">
    <div class="lottery-record-top">
      <img src="/static/img/header_logo_18_8_29.8f3aee2.png" alt="logo">
    </div>
    <div class="lottery-record-main">
      <div class="record-top-switch clear-fix">
        <div class="game-type-logo"><img :src="gameDetail.logo" alt=""></div>
        <div class="btn-box">
          <a href="javascript:;" @click='goBettingPage()' class="go-back-btn">返回投注页</a>
          <router-link to="/trendChart" class="zoushi-btn">走势图</router-link>
          <router-link to="/lhChart" class="lhh-btn">龙虎和</router-link>
        </div>
        <div class="form-group lottery-date">
          <!--<label class="group-label">开奖日期</label>-->
          <!--<DateTimePicker :begin_date.sync="begin_date" :end_date.sync="end_date"></DateTimePicker>-->
          <label class="group-label">至</label>
          <el-date-picker
            v-model="endDate"
            @change="changeEndDate"
            type="datetime"
            prefix-icon="el-icon-date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="form-group lottery-date">
            <label  class="group-label">日期</label>
            <el-date-picker
              v-model="beginDate"
              @change="changebeginDate"
              type="datetime"
              prefix-icon="el-icon-date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div class="form-group lottery-name">
          <label class="group-label">彩种</label>
          <el-select v-model="selectLottery" value-key="key" placeholder="选择彩种" @change="gameChange">
            <el-option
              v-for="item in allGameList"
              :key="item.key"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="record-main-table">
        <table class="ssc" v-if="tableShow === 'SSC'">
          <thead>
            <tr><th rowspan="3" class="qishu" width="15%">期数</th><th colspan="13" class="cq-num">彩球号码</th></tr>
            <tr>
              <th rowspan="2">万</th>
              <th rowspan="2">千</th>
              <th rowspan="2">百</th>
              <th rowspan="2">十</th>
              <th rowspan="2">个</th>
              <th colspan="3" class="he-zhi">
                <i class="icon-11" @click="activeHz = !activeHz"></i>
                <span v-if="activeHz">三星和值</span>
                <span v-if="!activeHz">其他和值</span>
                <i class="icon-37" @click="activeHz = !activeHz"></i>
              </th>
              <th class="dx-ds">
                <i class="icon-11" @click="activeDxds === 4 ? activeDxds = 0 : activeDxds++"></i>
                <span v-if="activeDxds == 0">万</span>
                <span v-if="activeDxds == 4">千</span>
                <span v-if="activeDxds == 3">百</span>
                <span v-if="activeDxds == 2">十</span>
                <span v-if="activeDxds == 1">个</span>
                <i class="icon-37" @click="activeDxds === 0 ? activeDxds = 4 : activeDxds--"></i>
              </th>
              <th colspan="4">棋牌</th>
            </tr>
            <tr>
              <th width="6%" v-if="activeHz">前三</th>
              <th width="6%" v-if="activeHz">中三</th>
              <th width="6%" v-if="activeHz">后三</th>
              <th width="6%" v-if="!activeHz">五星和值</th>
              <th width="6%" v-if="!activeHz">二星前二</th>
              <th width="6%" v-if="!activeHz">二星后二</th>
              <th>大小单双</th><th>百家乐</th><th>三公</th><th>斗牛</th><th>德州</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs">{{item}}</td>
            <td v-if="activeHz">{{parseInt(recordItem.wn_number[0])+parseInt(recordItem.wn_number[1])+parseInt(recordItem.wn_number[2])}}</td>
            <td v-if="activeHz">{{parseInt(recordItem.wn_number[1])+parseInt(recordItem.wn_number[2])+parseInt(recordItem.wn_number[3])}}</td>
            <td v-if="activeHz">{{parseInt(recordItem.wn_number[2])+parseInt(recordItem.wn_number[3])+parseInt(recordItem.wn_number[4])}}</td>
            <td v-if="!activeHz">{{parseInt(recordItem.wn_number[0])+parseInt(recordItem.wn_number[1])+parseInt(recordItem.wn_number[2])+parseInt(recordItem.wn_number[3])+parseInt(recordItem.wn_number[4])}}</td>
            <td v-if="!activeHz">{{parseInt(recordItem.wn_number[0])+parseInt(recordItem.wn_number[1])}}</td>
            <td v-if="!activeHz">{{parseInt(recordItem.wn_number[3])+parseInt(recordItem.wn_number[4])}}</td>
            <td v-if="activeDxds == 0" :class="[recordItem.wn_number[0]>5 ? 'font-red': 'font-blue']">{{recordItem.wn_number[0]|dxdsFilter}}</td>
            <td v-if="activeDxds == 4" :class="[recordItem.wn_number[1]>5 ? 'font-red': 'font-blue']">{{recordItem.wn_number[1]|dxdsFilter}}</td>
            <td v-if="activeDxds == 3" :class="[recordItem.wn_number[2]>5 ? 'font-red': 'font-blue']">{{recordItem.wn_number[2]|dxdsFilter}}</td>
            <td v-if="activeDxds == 2" :class="[recordItem.wn_number[3]>5 ? 'font-red': 'font-blue']">{{recordItem.wn_number[3]|dxdsFilter}}</td>
            <td v-if="activeDxds == 1" :class="[recordItem.wn_number[4]>5 ? 'font-red': 'font-blue']">{{recordItem.wn_number[4]|dxdsFilter}}</td>
            <td :class="[recordItem.baijiale === '闲' ? 'font-blue': recordItem.baijiale === '庄' ? 'font-red' : 'font-green']">{{recordItem.baijiale}}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="l115" v-if="tableShow === 'L115'">
          <thead>
          <tr>
            <th class="qishu" width="15%">期数</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th colspan="4">总和</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs">{{item}}</td>
            <td>{{recordItem.wn_number | recordTotal}}</td>
            <td>大小单双</td>
            <td>尾大小</td>
            <td>龙虎</td>
          </tr>
          </tbody>
        </table>
        <table class="kl12" v-if="tableShow === 'KL12'">
          <thead>
          <tr>
            <th class="qishu" width="15%">期数</th>
            <th>一</th>
            <th>二</th>
            <th>三</th>
            <th>四</th>
            <th>五</th>
            <th colspan="4">总和</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs">{{item}}</td>
            <td>{{recordItem.wn_number | recordTotal}}</td>
            <td>大小单双</td>
            <td>尾大小</td>
            <td>龙虎</td>
          </tr>
          </tbody>
        </table>
        <table class="k3" v-if="tableShow === 'K3'">
          <thead>
          <tr>
            <th rowspan="2" class="qishu" width="15%">期数</th>
            <th colspan="6">彩球号码</th>
          </tr>
          <tr>
            <th colspan="3">开奖号码</th>
            <th>和值</th>
            <th>大小单双</th>
            <th>号码形态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index" class="ks-tr">
            <td>{{recordItem.issue}}</td>
            <td><i :class="{ ['dice-' + +recordItem.wn_number[0]] :true}"></i></td>
            <td><i :class="{ ['dice-' + +recordItem.wn_number[1]] :true}"></i></td>
            <td><i :class="{ ['dice-' + +recordItem.wn_number[2]] :true}"></i></td>
            <td>{{parseInt(recordItem.wn_number[0])+parseInt(recordItem.wn_number[1])+parseInt(recordItem.wn_number[2])}}</td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="keno" v-if="tableShow === 'KENO'">
          <thead>
          <tr>
            <th class="qishu" width="15%">期数</th>
            <th colspan="20">彩球号码</th>
            <th>总和</th>
            <th>大小单双</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs">{{item}}</td>
            <td>{{recordItem.wn_number | recordTotal}}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="KLSF" v-if="tableShow === 'KLSF'" >
          <thead>
          <tr><th rowspan="3" class="qishu" width="15%">期数</th><th colspan="13" class="cq-num">彩球号码</th></tr>
          <tr>
            <th rowspan="2">一</th>
            <th rowspan="2">二</th>
            <th rowspan="2">三</th>
            <th rowspan="2">四</th>
            <th rowspan="2">五</th>
            <th rowspan="2">六</th>
            <th rowspan="2">七</th>
            <th rowspan="2">八</th>
            <th class="he-zhi">
              一vs二
            </th>
            <th colspan="3" width="9%" class="klsf-np">
              <i class="icon-11 left-np" @click="activeDxds === 7 ? activeDxds = 0 : activeDxds++"></i>
              <span v-if="activeDxds == 0">第一球</span>
              <span v-if="activeDxds == 7">第二球</span>
              <span v-if="activeDxds == 6">第三球</span>
              <span v-if="activeDxds == 5">第四球</span>
              <span v-if="activeDxds == 4">第五球</span>
              <span v-if="activeDxds == 3">第六球</span>
              <span v-if="activeDxds == 2">第七球</span>
              <span v-if="activeDxds == 1">第八球</span>
              <i class="icon-37 right-np" @click="activeDxds === 0 ? activeDxds = 7 : activeDxds--"></i>
            </th>
          </tr>
          <tr>
            <th width="9%">龙虎</th>
            <th width="9%">中发白</th>
            <th width="9%">五行</th>
            <th width="9%">方位</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs">{{item}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="pk10" v-if="tableShow === 'PK10'" >
          <thead>
          <tr><th rowspan="3" class="qishu" width="15%">期数</th><th colspan="14" class="cq-num">彩球号码</th></tr>
          <tr>
            <th rowspan="2">冠</th>
            <th rowspan="2">亚</th>
            <th rowspan="2">季</th>
            <th rowspan="2">四</th>
            <th rowspan="2">五</th>
            <th rowspan="2">六</th>
            <th rowspan="2">七</th>
            <th rowspan="2">八</th>
            <th rowspan="2">九</th>
            <th rowspan="2">十</th>
            <th colspan="2" class="he-zhi">
              冠亚和
            </th>
            <th colspan="2" width="9%" class="klsf-np">
              <i class="icon-11 left-np" @click="activeDxds === 4 ? activeDxds = 0 : activeDxds++"></i>
              <span v-if="activeDxds == 0">冠</span>
              <span v-if="activeDxds == 4">亚</span>
              <span v-if="activeDxds == 3">季</span>
              <span v-if="activeDxds == 2">四</span>
              <span v-if="activeDxds == 1">五</span>
              <i class="icon-37 right-np" @click="activeDxds === 0 ? activeDxds = 4 : activeDxds--"></i>
            </th>
          </tr>
          <tr>
            <th width="9%">和值</th>
            <th width="9%">大小单双</th>
            <th width="9%">大小单双</th>
            <th width="9%">龙虎</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[0]]:true}">{{recordItem.wn_number[0]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[1]]:true}">{{recordItem.wn_number[1]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[2]]:true}">{{recordItem.wn_number[2]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[3]]:true}">{{recordItem.wn_number[3]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[4]]:true}">{{recordItem.wn_number[4]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[5]]:true}">{{recordItem.wn_number[5]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[6]]:true}">{{recordItem.wn_number[6]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[7]]:true}">{{recordItem.wn_number[7]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[8]]:true}">{{recordItem.wn_number[8]}}</i></td>
            <td><i :class="{['pk-'+ +recordItem.wn_number[9]]:true}">{{recordItem.wn_number[9]}}</i></td>
            <td>{{+recordItem.wn_number[0] + +recordItem.wn_number[1]}}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="LHC" v-if="tableShow === 'LHC'">
          <thead>
          <tr>
            <th rowspan="2" class="qishu" width="10%">期数</th>
            <th rowspan="2" width="15%">开奖时间</th>
            <th colspan="7">开奖号码</th>
            <th colspan="3">总和</th>
            <th colspan="5">特码</th>
          </tr>
          <tr>
            <th>正码一</th>
            <th>正码二</th>
            <th>正码三</th>
            <th>正码四</th>
            <th>正码五</th>
            <th>正码六</th>
            <th>特码</th>
            <th>总数</th>
            <th>单双</th>
            <th>大小</th>
            <th>单双</th>
            <th>大小</th>
            <th>合单双</th>
            <th>合大小</th>
            <th>尾大小</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td>{{recordItem.end_time}}</td>
            <td v-for="(item, indexs) in recordItem.wn_number" :key="indexs" class="hk6-ball"><i :class="{['ball-'+ +item] : true}">{{item}}</i></td>
            <td>{{recordItem.wn_number | recordTotal}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table class="d3d" v-if="tableShow === '3D'">
          <thead>
          <tr><th rowspan="3" class="qishu" width="15%">期数</th><th colspan="6" class="cq-num">彩球号码</th></tr>
          <tr>
            <th colspan="3" rowspan="2" width="22%">开奖号码</th>
            <th colspan="2">和值</th>
            <th rowspan="2" width="8%">组三组六</th>
          </tr>
          <tr>
            <th width="8%">和值</th>
            <th width="8%">大小单双</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(recordItem, index) in recordList" :key="index">
            <td>{{recordItem.issue}}</td>
            <td>{{recordItem.wn_number[0]}}</td>
            <td>{{recordItem.wn_number[1]}}</td>
            <td>{{recordItem.wn_number[2]}}</td>
            <td>{{parseInt(recordItem.wn_number[0])+parseInt(recordItem.wn_number[1])+parseInt(recordItem.wn_number[2])}}</td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
      <el-pagination
        background
        :current-page="currentPage"
        @current-change = 'handleCurrentChange'
        layout="prev, pager, jumper,total, next"
        :total="pageCount"
        :page-size='20'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetGameMenu } from '@/api/game/game'
import { GetWnNumberHistories } from '@/api/lotteryRecord/lotteryRecord'
import DateTimePicker from '../../components/user-center/date-time-picker'
import { getBJLResultByLotteryNumber } from '../../util/calculation'
import { SET_LOTTERY_ID } from '../../store/nameSpace'
export default {
  name: 'lottery-record',
  data () {
    return {
      recordList: [],
      activeHz: true,
      activeDxds: 0,
      pageCount: 0,
      currentPage: 1,
      selectDate: '',
      allGameList: [],
      tableShow: '',
      selectLottery: '',
      beginDate: '', // 开始时间
      endDate: '', // 结束时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7 + 3600 * 1000 * 24
        }
      },
      page: 1,
      gameId: ''
    }
  },
  components: {
    DateTimePicker
  },
  computed: {
    ...mapGetters({
      menuList: 'menu'
    }),
    ...mapGetters([
      'gameDetail',
      'lotteryId',
      'isLogin'
    ])
  },
  filters: {
    dxdsFilter: function (val) {
      if (val < 5) {
        if (val % 2 !== 0) {
          return '小单'
        } else {
          return '小双'
        }
      } else {
        if (val % 2 !== 0) {
          return '大单'
        } else {
          return '大双'
        }
      }
    },
    heZhiFilter: function (val) {
      if (val === 'NaN') {
        return ''
      }
    },
    recordTotal: function (val) {
      if (val === '' || val === undefined) return
      let total = 0
      for (var x = 0; x < val.length; x++) {
        total += val[x]
      }
      return total
    }
  },
  methods: {
    getActiceDxds () {
      this.activeDxds++
      if (this.activeDxds === 5) {
        this.activeDxds = 0
      }
    },
    goBettingPage () {
      this.$store.dispatch('playTypeGame', { lotteryId: this.lotteryId, isJump: true })
    },
    GetGameMenuFn () {
      GetGameMenu()
        .then((res) => {
          if (res.errno === 0) {
            for (let key in res.data) {
              for (let keyInner in res.data[key]['lotteries']) {
                res.data[key]['lotteries'][keyInner]['key'] = keyInner
                res.data[key]['lotteries'][keyInner]['gameType'] = key
                this.allGameList.push(res.data[key]['lotteries'][keyInner])
              }
            }
          }
        })
    },
    gameChange (val) {
      this.tableShow = val.gameType
      this.gameId = val.key
      this.$store.dispatch('getNowGameDetail', val.key)
      this.GetWnNumberHistoriesFn()
    },
    GetWnNumberHistoriesFn () {
      this.$loadingShow()
      GetWnNumberHistories(this.gameId, this.beginDate, this.endDate, this.page)
        .then((res) => {
          this.$loadingHide()
          this.$store.commit(SET_LOTTERY_ID, this.gameId)
          this.recordList = res.data.data
          this.pageCount = res.data.total_count
          for (let key in res.data.data) {
            if (this.recordList[key].wn_number !== '') {
              if (this.recordList[key].wn_number.indexOf('+') !== -1) {
                this.recordList[key].wn_number = this.recordList[key].wn_number.replace('+', ' ')
              }
              if (this.recordList[key].wn_number.indexOf(' ') !== -1) {
                this.recordList[key].wn_number = res.data.data[key].wn_number.split(' ')
                for (var i = 0; i < this.recordList[key].wn_number.length; i++) {
                  this.recordList[key].wn_number[i] = +this.recordList[key].wn_number[i]
                }
              } else {
                this.recordList[key].wn_number = res.data.data[key].wn_number.split('')
              }
              if (this.gameDetail.identifier.indexOf('SSC') !== -1 || this.gameDetail.identifier === 'PLW') {
                this.recordList[key].baijiale = getBJLResultByLotteryNumber(this.recordList[key].wn_number)
              }
            }
          }
        })
    },
    getTime (e) {
      return (function (e) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * e)
        return date.Format('yyyy-MM-dd')
      })(e)
    },
    changeEndDate (val) {
      this.endDate = val
      this.GetWnNumberHistoriesFn(this.beginDate, this.endDate)
    },
    changebeginDate (val) {
      this.beginDate = val
      this.GetWnNumberHistoriesFn(this.beginDate, this.endDate)
    },
    handleCurrentChange (val) {
      this.page = val
      this.GetWnNumberHistoriesFn()
    }
  },
  watch: {
    beginDate (value) {
      this.beginDate = value
    },
    endDate (value) {
      this.endDate = value
    }
  },
  created () {
    this.beginDate = this.getTime(0) + ' 00:00:00'
    this.endDate = this.getTime(0) + ' 23:59:59'
    this.GetGameMenuFn()
    this.gameId = this.lotteryId
    this.GetWnNumberHistoriesFn()
    this.$loadingShow()
    // /* todo : 判定如果没有传入gameTypeName时的逻辑 */
    Promise.all([
      this.$store.dispatch('getNowGameDetail', this.lotteryId)
    ])
      .then(() => {
        this.$loadingHide()
        this.selectLottery = this.gameDetail.name
        this.tableShow = this.gameDetail['group_name']
      })
  }
}
</script>

<style scoped>
.lottery-record-top {
  width: 100%;
  height: 70px;
  background-color: #272733;
  border-bottom: 1px solid #000000;
  text-align: center;
  position: relative;
}
.lottery-record-top img {
  display: inline-block
}
.lottery-record-main {
  padding: 0 20px 20px 20px;
  background: #39384a;
  min-height: 100vh;
}
.record-top-switch {
  width: 100%;
  padding: 10px 10px 0 10px;
}
.game-type-logo {
  width: 110px;
  float: left;
  height: 90px;
}
.game-type-logo img {
  width: 100%;
  height: 100%;
}
.btn-box {
  float: left;
  margin-top: 10px;
}
.lottery-record .btn-box a {
  display: inline-block;
  padding: 10px 20px;
  margin-left: 10px;
  margin-top: 32px;
  text-align: center;
  color: #ffffff;
  background-color: #f17e2e;
  border: 1px solid #f17e2e;
  border-radius: 3px;
  font-size: 15px;
}
.lottery-record .form-group {
  float: right;
  margin-right: 10px;
  margin-top: 20px;
}
.lottery-record .form-group label {
  display: block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 300;
  color: #777;
  font-size: 15px;
}
@media (min-width: 768px) {
  .form-inline .group-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.record-main-table {
  width: 100%;
  text-align: center;
}
.record-main-table table {
  width: 100%;
}
.record-main-table table td,.record-main-table table th {
  border:1px solid #fff;
  font-size: 15px;
  font-weight: 200;
}
.record-main-table table th {
  color: #fff;
  vertical-align: middle;
  background: #939292;
}
.record-main-table table td {
  color: #777;
  padding: 10px;
  background: #fff;
  border-color: #ddd;
}
.record-main-table .ssc .qishu,.record-main-table .KLSF .qishu,.record-main-table .pk10 .qishu,.record-main-table .d3d .qishu {
  line-height: 104px;
}
.record-main-table .l115 .qishu,.record-main-table .keno .qishu,.record-main-table .kl12 .qishu {
  line-height: 35px;
}
.record-main-table .k3 .qishu,.record-main-table .LHC .qishu {
  line-height: 70px;
}
.record-main-table table .cq-num,.record-main-table table .qishu {
  background: #707070;
}
.record-main-table .he-zhi,.record-main-table .dx-ds {
  position: relative;
}
.record-main-table .he-zhi .icon-11,.record-main-table .he-zhi .icon-37,
.record-main-table .dx-ds .icon-11,.record-main-table .dx-ds .icon-37
{
  position: absolute;
  width: 40px;
  line-height: 35px;
  top: 0;
  cursor: pointer;
}
.he-zhi .icon-11,.dx-ds .icon-11{
  left:0px;
}
.he-zhi .icon-37,.dx-ds .icon-37{
  right:0px;
}
.font-red {
  color: red !important;
}
.font-blue {
  color: blue !important;
}
.font-green {
  color: green !important;
}
.lottery-record-main .el-pagination {
  text-align: center;
  margin:20px 0;
}
.record-main-table .klsf-np {
  position: relative;
}
.klsf-np > i{
  position: absolute;
  top: 0;
  width: 35px;
  line-height: 35px;
}
.klsf-np > i.left-np {
  left: 0;
}
.klsf-np > i.right-np {
  right: 0;
}
.ks-tr i,.pk10 tr td>i{
  width: 28px;
  height: 28px;
  display: block;
  margin: 0 auto;
}
.ks-tr i {
  background-size: 100% 100% !important;
}
.pk10 tr td>i {
  border: 1px solid #666;
  line-height: 27px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  font-style: normal;
  border-radius: 4px;
  text-shadow: 1px 1px 0px #000;
}
.ks-tr i.dice-1 {
background: url('../../statics/img/dice-result-1-normal.png') no-repeat center center;
}
.ks-tr i.dice-2 {
  background: url('../../statics/img/dice-result-2-normal.png') no-repeat center center;
}
.ks-tr i.dice-3 {
  background: url('../../statics/img/dice-result-3-normal.png') no-repeat center center;
}
.ks-tr i.dice-4 {
  background: url('../../statics/img/dice-result-4-normal.png') no-repeat center center;
}
.ks-tr i.dice-5 {
  background: url('../../statics/img/dice-result-5-normal.png') no-repeat center center;
}
.ks-tr i.dice-6 {
  background: url('../../statics/img/dice-result-6-normal.png') no-repeat center center;
}
.pk10 tr td>i.pk-1 {
  background: #FDFE0C;
}
.pk10 tr td>i.pk-2 {
  background: #0088FC;
}
.pk10 tr td>i.pk-3 {
  background: #3C3C3C;
}
.pk10 tr td>i.pk-4 {
  background: #FF7500;
}
.pk10 tr td>i.pk-5 {
  background: #85FFFD;
}
.pk10 tr td>i.pk-6 {
  background: #4D08FF;
}
.pk10 tr td>i.pk-7 {
  background: #DEDEDE;
}
.pk10 tr td>i.pk-8 {
  background: #FF0305;
}
.pk10 tr td>i.pk-9 {
  background: #760100;
}
.pk10 tr td>i.pk-10 {
  background: #2DC211;
}
.hk6-ball>i {
  font-style: normal;
  display: block;
  background-position: 50% 50% !important;
  background-repeat: no-repeat;
  line-height: 44px;
}
.ball-1, .ball-2,
.ball-7, .ball-8,
.ball-12, .ball-13,
.ball-18, .ball-19,
.ball-23, .ball-24,
.ball-29, .ball-30,
.ball-34, .ball-35,
.ball-40, .ball-45, .ball-46 {
  background-image: url("../../statics/img/lr_red.png"); }

.ball-3, .ball-4,
.ball-9, .ball-10,
.ball-14, .ball-15,
.ball-20, .ball-25, .ball-26,
.ball-31, .ball-36, .ball-37,
.ball-41, .ball-42,
.ball-47, .ball-48 {
  background-image: url("../../statics/img/lr_blue.png"); }

.ball-5, .ball-6,
.ball-11, .ball-16, .ball-17,
.ball-21, .ball-22,
.ball-27, .ball-28,
.ball-32, .ball-33,
.ball-38, .ball-39,
.ball-43, .ball-44,
.ball-49 {
  background-image: url("../../statics/img/lr_green.png"); }
</style>
<style>
.form-group.lottery-name .el-select {
  width: 150px !important;
}
</style>
