<template>
  <!-- todo : 添加对不同表格切换时候的动画 -->
  <div class="betting-record">
    <div class="betting-record-tabs clear-fix"
         v-if="showColumn">
      <a :class="{ 'now-hov': nowShowTab === 0 }"
         @click="$store.commit(SET_BETTING_RECORD_COUNT, 0)"
         href="javascript:;">我的注单</a>
      <a :class="{ 'now-hov': nowShowTab === 1 }"
         @click="$store.commit(SET_BETTING_RECORD_COUNT, 1)"
         href="javascript:;">追号方案</a>
      <a :class="{ 'now-hov': nowShowTab === 2 }"
         @click="$store.commit(SET_BETTING_RECORD_COUNT, 2)"
         href="javascript:;">未开奖</a>
    </div>
    <table class="record-table" v-if="nowShowTab === 0">
      <tr>
        <th style="width: 107px;">彩种</th>
        <th style="width: 120px;">玩法</th>
        <th style="width: 90px;">期号</th>
        <th style="width: 80px;">投注内容</th>
        <th style="width: 54px;">倍数</th>
        <th style="width: 46px;">注数</th>
        <th style="width: 110px;">注单金额</th>
        <th style="width: 95px;">中奖金额</th>
        <th style="width: 70px;">注单状态</th>
        <th style="width: 74px;">操作</th>
      </tr>
      <tr v-for="item in recordTableDataList.data"
          :key="item.id">
        <td>{{item['lottery_name']}}</td>
        <td>{{item['way']}}</td>
        <td>{{item['issue']}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showTzxqPop(item.id, 0, item)">注单详情</a></td>
        <!--<td>
          <el-tooltip placement="top" :enterable="false">
            <div slot="content">{{item['bet_number'] | formatBettingRecordBetNumber}}</div>
            <span>{{item['bet_number'] | formatBettingRecordBetNumber}}</span>
          </el-tooltip>
        </td>-->
        <td>{{item['multiple']}}</td>
        <td>{{item['single_count']}}</td>
        <td>{{item['amount'] | PrizeFilter}}</td>
        <td>{{item['prize'] | PrizeFilter}}</td>
        <td style="color: green;">{{bettingRecordLabel[item['status']]}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showDropPop(item.id)"  v-if="item.can_drop === 1">撤单</a></td>
      </tr>
    </table>
    <table class="record-table" v-if="nowShowTab === 1">
      <tr>
        <th style="width: 78px;">方案编号</th>
        <th style="width: 90px;">彩种</th>
        <th style="width: 85px;">玩法</th>
        <th style="width: 155px;">发起时间</th>
        <th style="width: 111px;">投注内容</th>
        <th style="width: 95px;">追号金额</th>
        <th style="width: 85px;">中奖金额</th>
        <th style="width: 70px;">状态</th>
        <th style="width: 74px;">操作</th>
      </tr>
      <tr v-for="item in recordTableDataList.data"
          :key="item.id">
        <td>{{item['serial_number'] | formatBettingSerialNumber}}</td>
        <td>{{item['lottery_name']}}</td>
        <td>{{item['way']}}</td>
        <td>{{item['bought_at']}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showTzxqPop(item.id, 1, item)">追号详情</a></td>
        <!--<td>
          <el-tooltip placement="top"
                      :enterable="false">
            <div slot="content">{{item['bet_number'] | formatBettingRecordBetNumber}}</div>
            <span>{{item['bet_number'] | formatBettingRecordBetNumber}}</span>
          </el-tooltip>
        </td>-->
        <td>{{item['amount'] | PrizeFilter}}</td>
        <td>{{item['prize'] | PrizeFilter}}</td>
        <td style="color:green;">{{bettingRecordChasingNumberLabel[item['status']]}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showDropPop(item.id)"  v-if="item.can_drop === 1">撤单</a></td>
      </tr>
    </table>
    <table class="record-table" v-if="nowShowTab === 2">
      <tr>
        <th style="width: 107px;">彩种</th>
        <th style="width: 120px;">玩法</th>
        <th style="width: 90px;">期号</th>
        <th style="width: 80px;">投注内容</th>
        <th style="width: 54px;">倍数</th>
        <th style="width: 46px;">注数</th>
        <th style="width: 110px;">注单金额</th>
        <th style="width: 95px;">中奖金额</th>
        <th style="width: 70px;">注单状态</th>
        <th style="width: 74px;">操作</th>
      </tr>
      <tr v-for="item in recordTableDataList.data"
          :key="item.id">
        <td>{{item['lottery_name']}}</td>
        <td>{{item['way']}}</td>
        <td>{{item['issue']}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showTzxqPop(item.id, 2, item)">投注详情</a></td>
        <!--<td>
          <el-tooltip placement="top"
                      :enterable="false">
            <div slot="content">{{item['bet_number'] | formatBettingRecordBetNumber}}</div>
            <span>{{item['bet_number'] | formatBettingRecordBetNumber}}</span>
          </el-tooltip>
        </td>-->
        <td>{{item['multiple']}}</td>
        <td>{{item['single_count']}}</td>
        <td>{{item['amount'] | PrizeFilter}}</td>
        <td>{{item['prize'] | PrizeFilter}}</td>
        <td style="color: green;">{{bettingRecordLabel[item['status']]}}</td>
        <td><a class="changeColor" href="javascript:;" @click="showDropPop(item.id)"  v-if="item.can_drop === 1">撤单</a></td>
      </tr>
    </table>
    <router-link :to="{ path:'/main/user-center/account-gamerecord' }" v-if="isShowTable" class="look-more-record">点击查看更多记录</router-link>
    <div v-else class="no-data">
      暂无数据
    </div>
    <div class="border-bottom"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_BETTING_RECORD_COUNT } from '../../store/nameSpace'
import {getProjectDetail, getTraceDetail, dropProject, GetTraceProjectDetail} from '@/api/game/game'
import { bettingRecordLabel, bettingRecordChasingNumberLabel } from '../../config/game-default-config'
import { Message } from 'element-ui'
export default {
  props: {
    showColumn: {
      required: false,
      default: true
    },
    isOpenType: {
      required: false,
      default: false
    }
  },
  data () {
    return {
      SET_BETTING_RECORD_COUNT,
      bettingRecordChasingNumberLabel,
      bettingRecordLabel,
      gameMenuType: [] /* 彩种系列名 */
    }
  },
  computed: {
    ...mapGetters({
      nowShowTab: 'bettingRecordShow'
    }),
    ...mapGetters([
      'recordTableDataList',
      'szcpMenuList'
    ]),
    isShowTable () {
      if (this.nowShowTab === 0 || this.nowShowTab === 1) return this.recordTableDataList.data ? this.recordTableDataList.data.length : false
      if (this.nowShowTab === 2) return !!this.recordTableDataList.data.length
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
  methods: {
    /* 获取追号彩种名 */
    getGameInfoById (szcpList, id) {
      let flag = false
      let typeName = ''
      if (!szcpList || !id) return null
      for (let key in szcpList) {
        if (flag) break
        for (let keyInner in szcpList[key]['lotteries']) {
          if (+keyInner === +id) {
            typeName = key
            flag = true
            break
          }
        }
      }
      if (!flag) return null
      return typeName
    },
    /* 详情弹窗 */
    showTzxqPop (id, number, item) {
      this.$loadingShow()
      switch (number) {
        case 0:
          getProjectDetail(id)
            .then(res => {
              this.$loadingHide()
              this.$gameAlertZdxq({
                dataList: res.data,
                titleName: '注单详情',
                gameMenuType: this.getGameInfoById(this.szcpMenuList, item['lottery_id'])
              })
            })
          break
        case 1:
          var issuesData = []
          GetTraceProjectDetail(id)
            .then((res) => {
              if (res.data) {
                issuesData = res.data
              }
            })
            .then(() => {
              getTraceDetail(id)
                .then(res => {
                  this.$loadingHide()
                  if (res.data) {
                    this.$gameAlertZdxq({
                      dataList: res.data,
                      issuesData: issuesData,
                      titleName: '追号详情',
                      gameMenuType: this.getGameInfoById(this.szcpMenuList, item['lottery_id'])
                    })
                  }
                })
            })
          break
        case 2:
          getProjectDetail(id)
            .then(res => {
              this.$loadingHide()
              this.$gameAlertZdxq({
                dataList: res.data,
                titleName: '注单详情',
                gameMenuType: this.getGameInfoById(this.szcpMenuList, item['lottery_id'])
              })
            })
          break
      }
    },
    showDropPop (id) {
      this.$loadingShow()
      dropProject(id)
        .then((res) => {
          this.$loadingHide()
          Message({message: '撤单成功', type: 'success'})
          this.$store.dispatch('getBettingRecordList', {isClick: false, isOpenType: this.isOpenType})
        })
    }
  },
  watch: {
    nowShowTab () {
      this.$store.dispatch('getBettingRecordList', {isClick: true, isOpenType: this.isOpenType})
    }
  },
  created () {
    this.$store.dispatch('getBettingRecordList', {isClick: false, isOpenType: this.isOpenType})
  }
}
</script>

<style scoped>
  .no-data {
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .betting-record:hover .look-more-record {
    height: 20px;
  }
  .look-more-record {
    display: block;
    width: 107px;
    line-height: 20px;
    overflow: hidden;
    transition: height linear .3s;
    height: 0;
    margin: 0 auto;
    color: darkred;
  }
  /*betting-record begin*/
  .betting-record {
    min-height: 258px;
    position: relative;
    padding: 24px 18px 26px 19px;
    background-color: #eeeeee;
    margin-top: 15px;
  }
  .betting-record .betting-record-tabs {
    border-bottom: 1px solid #e4e0d8;
  }
  .betting-record .betting-record-tabs a {
    float: left;
    width: 92px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #eeeeee;
    font-size: 14px;
    color: #a68f4c;
  }
  .betting-record .betting-record-tabs a.now-hov {
    font-weight: bold;
    background-color: #fff;
    position: relative;
    color: #a68f4c;
  }
  .betting-record .betting-record-tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 3px;
    background-color: #b7ab81;
  }
  .betting-record .betting-record-tabs a.now-hov::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background-color: #fff;
  }
  .betting-record table {
    width: 100%;
  }
  .betting-record table tr th {
    height: 36px;
    font-weight: normal;
    font-size: 12px;
    color: #545454;
    line-height: 36px;
    border-bottom: 1px solid #e4e0d8;
    background-color: #ffffff;
  }
  .betting-record table tr td {
    text-align: center;
    font-size: 12px;
    color: #545454;
    line-height: 24px;
  }
  .betting-record table:nth-of-type(1) tr td:nth-of-type(4) span,
  .betting-record table tr td:nth-of-type(5) span {
    padding: 0 6px;
    display: block;
    width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .betting-record table tr td:nth-of-type(5) span {
    width: 95px;
  }
  .betting-record table:nth-of-type(1) tr td:nth-of-type(10) a,
  .betting-record table:nth-of-type(1) tr td:nth-of-type(9) a {
    transition: color linear .2s;
  }
  .changeColor:hover,
  .betting-record table:nth-of-type(1) tr td:nth-of-type(9) a:hover,
  .betting-record table:nth-of-type(1) tr td:nth-of-type(10) a:hover {
    color: red;
  }
  .betting-record .border-bottom {
    margin-top: 8px;
    height: 2px;
    background-color: #b7ab81;
    position: absolute;
    left: 19px;
    right: 18px;
    bottom: 20px;
  }
  /*betting-record end*/
</style>
<style>
  .record-table .el-loading-text {
    color:darkred !important;
  }
</style>
