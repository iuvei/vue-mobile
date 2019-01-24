<template>
  <div class="ranking-data">
    <div class="ranking-data-title box-title">
      <h4>排行数据</h4>
    </div>
    <div class="ranking-data-container">
      <div class="ranking-data-tabs clear-fix">
        <a :class="{ 'now-hov': rankingDataShow === 0 }"
           @click="changeTable(0,8)"
           href="javascript:;">出码排行</a>
        <a :class="{ 'now-hov': rankingDataShow === 1 }"
           @click="changeTable(1,4)"
           href="javascript:;">遗漏排行</a>
      </div>
      <div v-if="rankingDataShow === 0">
        <div class="period-list clear-fix">
          <span>期数选择</span>
          <div>
            <el-select size="mini"
                       v-model="periodsCount"
                       placeholder="请选择"
                       @change = "changeSelect(periodsCount, 1)">
              <el-option class="elOption"
                         v-for="(itemQS, index) in selectQS"
                         :key="index"
                         :label="itemQS.name"
                         :value="itemQS.value"></el-option>
            </el-select>
          </div>
        </div>
        <ul class="period-record clear-fix ">
          <li>
            <span v-for="(item,index) in nameRes" :key="index" style="overflow: hidden;" @click = "showPop(item)">
              {{parseInt(index+1)}} &nbsp;{{item.name}}&nbsp;
              <i>@{{item.display}}</i>
              <i style="float: right;">{{item.count}}期</i>
            </span>
          </li>
          <!--<li>
            <span v-for="(item,index) in nameRes" :key="index" v-if="nameRes.length / 2 <= index">{{parseInt(index+1)}}{{item.name}}<i>@{{item.result}}</i></span>
          </li>-->
        </ul>
      </div>
      <div v-if="rankingDataShow === 1">
        <div class="period-list clear-fix">
          <span>分类选择</span>
          <div class="">
            <el-select size="mini"
                       v-model="periodsCount"
                       placeholder="请选择"
                       @change = "changeSelect(periodsCount, 2)">
              <el-option class="elOption"
                         v-for="(itemType, index) in gameType"
                         :key="index" :label="itemType.name"
                         :value="itemType.value"></el-option>
            </el-select>
          </div>
        </div>
        <ul class="period-record clear-fix">
          <li>
            <span v-for="(item,index) in nameRes"
                  :key="index"
                  style="overflow: hidden;"
                  @click = "showPop(item)">
              {{parseInt(index+1)}} &nbsp;{{item.name}}&nbsp;
              <i>@{{item.display}}</i>
              <i style="float: right;">{{item.count}}期</i>
            </span>
          </li>
          <!--<li>
            <span v-for="(item,index) in nameRes" :key="index" v-if="nameRes.length / 2 <= index">{{parseInt(index+1)}}{{item.name}}<i>@{{item.result}}</i></span>
          </li>-->
        </ul>
      </div>
    </div>
    <Dialog
      title="系统提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <!--<div style="font-size: 14px;">第 {{sscLastWnNumber['issue']}} 期</div>-->
        <div style="font-size: 14px;">第 {{sscAwardInfo['issue']}} 期</div>
        <fieldset>
          <legend>一般注单</legend>
          <table class="table table-hover table-striped table-pk-order">
            <thead>
              <tr>
                <th>游戏</th>
                <th>下注玩法</th>
                <th class="text-right">金额</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{gameDetail['name']}}</td>
              <td>{{gameName}}@{{gameDisplay}}</td>
              <td class="text-right">
                <template>
                  <el-input-number size="mini"
                                   v-model="prizeNum"
                                   @change="handleChange"
                                   :min="1"
                                   label="描述文字"></el-input-number>
                </template>
              </td>
            </tr>
            </tbody>
          </table>
        </fieldset>
        <div style="text-align:center;color:red;border-top:0;padding:0; font-size: 12px;">
          温馨提示：中奖率低于{{(defaultSetting ? defaultSetting['challenge_rate'] : 0) * 100}}％的单挑最高派奖{{defaultSetting ? defaultSetting['challenge_profit_limit'] : 'loading'}}元
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '../../components/dialog/src/component'
import { mapGetters } from 'vuex'
import { SET_RANKING_DATA_SHOW } from '../../store/nameSpace'
import { getLotteryAnData } from '@/api/game/game'
import { canSelectPeriodsNumber, handicapAjaxValueConfig } from '../../config/game-default-config'
import { shallowCopy } from '../../util'
import { betInCommon } from '../game-alert/statics/js/util'

export default {
  name: 'ranking-data',
  data () {
    return {
      SET_RANKING_DATA_SHOW,
      periodsCount: '',
      selectQS: canSelectPeriodsNumber,
      nameRes: [],
      result: [],
      qiShu: 0,
      gameType: [],
      dialogVisible: false,
      errMsg: '',
      gameName: '',
      gameDisplay: '',
      prizeNum: 1,
      nowBetInfo: null
    }
  },
  components: {
    Dialog
  },
  computed: {
    ...mapGetters({
      menuList: 'menu'
    }),
    ...mapGetters([
      'gameDetail',
      'rankingDataShow',
      'lotteryId',
      'sscLastWnNumber',
      'sscAwardInfo',
      'getBonusGroupInGame',
      'getMultipleInGame',
      'getCoefficientInGame',
      'defaultSetting'
    ])
  },
  created () {
    this.serchDate(this.lotteryId, 4)
  },
  mounted () {
    // this.getNameCn()
  },
  watch: {
    prizeNum (val) {
      if (!Number.isInteger(val)) {
        this.$nextTick(() => {
          this.prizeNum = Math.ceil(val)
        })
      }
    }
  },
  methods: {
    handleChange () {
    },
    /* 确定投注 */
    confirm () {
      const betInfo = {
        wayId: this.nowBetInfo.id,
        number: this.nowBetInfo.result,
        // coefficient: this.getCoefficientInGame,
        awardInfo: shallowCopy(this.sscAwardInfo),
        multiple: this.getMultipleInGame,
        selectedMoney: this.prizeNum,
        bonusGroup: this.getBonusGroupInGame
      }
      if (this.prizeNum % 2 === 0) { // 当是偶数投注额的时候 模式为1.0000(2元每注)
        betInfo.coefficient = handicapAjaxValueConfig.coefficientEven
      } else { // 当投注额是奇数的时候
        betInfo.coefficient = handicapAjaxValueConfig.coefficientOdd
      }
      betInCommon({
        lotteryId: this.lotteryId,
        isChasingNumber: false,
        shoppingCarList: [ betInfo ],
        mode: 'clickRank',
        chasingInfo: null
      })
        .then(res => {
          if (res.errno === 0) {
            this.$message({
              message: '投注成功',
              type: 'success'
            })
          }
          this.dialogVisible = false
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '服务器错误, 请稍后重试',
            type: 'error'
          })
          this.dialogVisible = false
        })
    },
    /* 显示投注弹框 */
    showPop (item) {
      this.prizeNum = 1
      this.nowBetInfo = item
      this.gameDisplay = item.display
      this.gameName = item.name
      this.dialogVisible = true
    },
    /* 关闭投注弹框 */
    handleClose () {
      this.nowBetInfo = null
      this.dialogVisible = false
    },
    /* 期数选择 */
    changeSelect (value, val) {
      let newnameRes = []
      this.getNameCn()
      for (let key in this.nameRes) {
        let dataObj = {}
        if (val === 1) {
          if (value === this.nameRes[key].count) {
            dataObj.name = this.nameRes[key].name
            dataObj.id = this.nameRes[key].id
            dataObj.result = this.nameRes[key].result
            dataObj.display = this.nameRes[key].display
            dataObj.count = this.nameRes[key].count
            newnameRes.push(dataObj)
          }
        } else if (val === 2) {
          if (value === this.nameRes[key].firstName) {
            dataObj.name = this.nameRes[key].name
            dataObj.id = this.nameRes[key].id
            dataObj.result = this.nameRes[key].result
            dataObj.display = this.nameRes[key].display
            dataObj.count = this.nameRes[key].count
            newnameRes.push(dataObj)
          }
        }
      }
      this.nameRes = newnameRes
    },
    /* 获取彩种排行 或 遗漏数据 */
    serchDate (id, type) {
      getLotteryAnData(id, type)
        .then(res => {
          if (res.errno === 0) {
            this.result = res.data
            this.getNameCn()
          }
        })
    },
    /* 选择出码排行 和 遗漏排行 */
    changeTable (index, type) {
      this.$store.commit(SET_RANKING_DATA_SHOW, index)
      this.serchDate(this.lotteryId, type)
      this.periodsCount = ''
    },
    /* 获取玩法内容 */
    getNameCn () {
      this.nameRes = []
      this.gameType = []
      for (let key in this.menuList) {
        let obj = {}
        let n1 = this.menuList[key]['name_cn']
        obj.name = n1
        obj.value = n1
        this.gameType.push(obj)
        for (let keyInner in this.menuList[key]['children']) {
          // let n2 = this.menuList[key]['children'][keyInner].name_cn
          for (let keyInnerx in this.menuList[key]['children'][keyInner]['children']) {
            let n3 = this.menuList[key]['children'][keyInner]['children'][keyInnerx]['name_cn']
            let n4Id = this.menuList[key]['children'][keyInner]['children'][keyInnerx]['series_way_id']
            if (this.result) {
              for (let s = 0; s < this.result.length; s++) {
                let dataObj = {}
                if (this.result[s]['series_way_id'] === n4Id) {
                  dataObj.name = n1 + '-' + n3
                  dataObj.firstName = n1
                  dataObj.id = this.result[s]['series_way_id']
                  dataObj.result = this.result[s].result
                  dataObj.display = this.result[s].display
                  dataObj.count = this.result[s].count
                  this.nameRes.push(dataObj)
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  /*ranking-data begin*/
  .qs-right .ranking-data {
    margin-bottom: 15px;
  }
  .qs-right .ranking-data .ranking-data-container {
    /*padding: 6px 10px 9px 12px;*/
    background-color: #eeeeee;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs {}
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a {
    float: left;
    background-color: #f6f4f0;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-top: 1px solid #e4e0d8;
    border-bottom: 1px solid #e4e0d8;
    font-size: 14px;
    color: #a68f4c;
    width: 50%;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a.now-hov {
    background-color: #fff;
    position: relative;
    font-weight: bold;
    border-bottom: 1px solid #FFFFFF;
  }
  .qs-right .ranking-data .ranking-data-container .ranking-data-tabs a.now-hov::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    top: 0;
    left: 0;
    background-color: #b7ab81;
  }
  .qs-right .ranking-data .ranking-data-container .period-list {
    height: 33px;
    margin-bottom: 3px;
    background-color: #ffffff;
    padding:0 10px;
    line-height: 33px;
  }
  .qs-right .ranking-data .ranking-data-container .period-list span {
    float: left;
    color: #a68f4c;
    margin-right: 5px;
  }
  .qs-right .ranking-data .ranking-data-container .period-list div {
    float: left;
    width:125px;
  }
  .qs-right .ranking-data .ranking-data-container .period-record {
    height: 300px;
    overflow-y: auto;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li {
    float: left;
    width: 100%;
    padding:0 10px;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li span {
    display: block;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #b8b5b5;
    font-size: 12px;
    color: #545454;
  }
  .qs-right .ranking-data .ranking-data-container .period-record li span i {
    font-style: normal;
    color: #f17e2e;
  }
  .elOption{
    text-align: center;
  }
  .ranking-data-title.box-title{
    padding: 0 18px;
  }
  fieldset {
    padding: 10px 25px;
    margin: 15px 0px;
    border: 1px solid #dddddd;
    background-color: #fafafa;
  }
  fieldset legend {
    width: auto;
    padding: 3px 10px;
    margin-bottom: 0;
    font-size: 15px;
    line-height: inherit;
    color: #333;
    border: 1px solid #ddd;
    background-color: #ffffff;
  }
  .table:not(.table-bordered) {
    border-bottom: 2px solid #f3f3f3;
  }
  fieldset table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .table-pk-order > thead > tr > th,
  .table-pk-order > tbody > tr > td {
    width: 25%;
  }
  .table > thead > tr > th, .table > tbody > tr > th,
  .table > tfoot > tr > th, .table > thead > tr > td,
  .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 8px 15px;
    border-top: 1px solid #f3f3f3;
    text-align: center;
  }
  .table > thead > tr > th {
    vertical-align: bottom;
    border-bottom: 1px solid #eaeaea;
    background-color: #eaeaea;
    color: #333333;
    font-weight: 400;
  }
  legend {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: 20px;
    font-size: 21px;
    line-height: inherit;
    color: #333;
    border: 0;
    border-bottom: 1px solid #e5e5e5;
  }
</style>
<style>
  .el-input--mini .el-input__inner {
    text-align: center !important;
  }
</style>
