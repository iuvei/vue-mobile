<template>
  <transition name="fade-in-linear">
    <div v-if="show" class="wrapper">
      <div class="container">
        <a @click="show = false" href="javascript:;">
          <img :src="closeIcon" alt="closeIcon">
        </a>
        <div class="popup-title title">{{titleName}}</div>
        <div v-if="titleName === '注单详情'" class="popup-content content">
          <div class="popup-info">
            <h4>注单编号:{{dataList.id}}</h4>
            <hr>
            <div class="row">
              <div class="row-l">用戶名：</div>
              <div class="row-r">{{dataList.username}}</div>
            </div>
            <div class="row">
              <div class="row-l">期号：</div>
              <div class="row-r">{{dataList.issue}}</div>
            </div>
            <div class="row">
              <div class="row-l">彩种：</div>
              <div class="row-r">{{dataList.lottery_name}}</div>
            </div>
            <div class="row">
              <div class="row-l">彩种玩法：</div>
              <div class="row-r">{{dataList.way}}</div>
            </div>
            <div class="row">
              <div class="row-l">投注时间：</div>
              <div class="row-r">{{dataList.bought_at}}</div>
            </div>
            <div class="row">
              <div class="row-l">开奖号码：</div>
              <div class="row-r">
                <ul v-if="gameMenuType !== '3D'">
                  <li v-for="(item, index) in windNum" :key="index">{{item}}</li>
                </ul>
                <ul v-if="gameMenuType === '3D' && dataList.winning_number !== null">
                  <li>{{windNum0}}</li>+ <li>{{windNum1}}</li>+ <li>{{windNum2}}</li>= <li>{{sumNum}}</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="row-l">倍数：</div>
              <div class="row-r">{{dataList.multiple}} 倍<i style="font-size: 13px;">({{dataList.coefficient}})</i></div>
            </div>
            <div class="row">
              <div class="row-l">注数：</div>
              <div class="row-r">{{dataList.bet_count}} 注</div>
            </div>
            <div class="row">
              <div class="row-l">注单金额：</div>
              <div class="row-r">{{amount}} 元</div>
            </div>
            <div class="row">
              <div class="row-l">注单状态：</div>
              <div class="row-r" style="color: green;">{{dataList.formatted_status}}</div>
            </div>
            <div class="row">
              <div class="row-l">中奖金额：</div>
              <div class="row-r" v-if="dataList.prize != null" >{{dataList.prize}} 元</div>
              <div class="row-r" v-else>0 元</div>
            </div>
          </div>
          <div class="popup-number">
            <h4>投注内容</h4>
            <hr>
            <div style="display:block;word-break: break-all;word-wrap: break-word;" class="bet-info" contenteditable="false">{{betNumber}}</div>
          </div>
        </div>
        <div v-if="titleName === '追号详情'" class="popup-content content">
          <div class="popup-info">
            <h4>注单编号:{{dataList.id}}</h4>
            <hr>
            <div class="row">
              <div class="row-l">用戶名：</div>
              <div class="row-r">{{dataList.username}}</div>
            </div>
            <div class="row">
              <div class="row-l">彩种：</div>
              <div class="row-r">{{dataList.lottery_name}}</div>
            </div>
            <div class="row">
              <div class="row-l">彩种玩法：</div>
              <div class="row-r">{{dataList.way}}</div>
            </div>
            <div class="row">
              <div class="row-l">投注时间：</div>
              <div class="row-r">{{dataList.bought_at}}</div>
            </div>
            <div class="row">
              <div class="row-l">注数：</div>
              <div class="row-r">{{dataList.bet_count}} 注</div>
            </div>
            <div class="row">
              <div class="row-l">注单金额：</div>
              <div class="row-r">{{dataList.amount}} 元</div>
            </div>
            <div class="row">
              <div class="row-l">追号期数：</div>
              <div class="row-r">{{dataList.finished_issues}} 期</div>
            </div>
            <div class="row">
              <div class="row-l">剩余期数：</div>
              <div class="row-r">{{dataList.total_issues - dataList.finished_issues}} 期</div>
            </div>
            <div class="row">
              <div class="row-l">注单状态：</div>
              <div class="row-r" style="color: green;">{{dataList.status}}</div>
            </div>
            <div class="row">
              <div class="row-l">累积中奖：</div>
              <div class="row-r" v-if="dataList.prize != null" >{{dataList.prize | PrizeFilter}} 元</div>
            </div>
            <div class="row">
              <div class="row-l">注单奖金：</div>
              <div class="row-r">{{dataList.prize | PrizeFilter}}</div>
            </div>
            <div class="row">
              <div class="row-l">自动停止：</div>
              <div class="row-r">{{dataList.stop_on_won}}</div>
            </div>
          </div>
          <div class="popup-number">
            <h4>投注内容</h4>
            <hr>
            <div style="display:block;word-break: break-all;word-wrap: break-word;" class="bet-info" contenteditable="false">{{betNumber}}</div>
          </div>
        </div>
        <div v-if="titleName === '追号详情'" class="popup-list dialog-seek-log-list">
          <div class="tab-content">
            <div class="tab-pane fade active in">
              <div class="limitwidth">
                <table class="table table-colored dialog-seek-order-table">
                  <thead>
                  <tr>
                    <th>注单编号</th>
                    <th class="seek-cycle">期号</th>
                    <th class="seek-multiple">倍數</th>
                    <th class="seek-openball">开奖号码</th>
                    <th class="seek-money">中奖金额</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in issuesData.data" :key="index">
                      <td>{{item.id}}</td>
                      <td class="seek-cycle">第 {{item.issue}} 期</td>
                      <td class="seek-multiple">{{item.multiple}} 倍</td>
                      <td class="seek-openball">
                        <div v-if="gameMenuType === 'L115' || gameMenuType === 'KENO' || gameMenuType === 'KL12' || gameMenuType === 'PK10' || gameMenuType === 'KLSF'"  v-for="(items, index) in item.wn_number.split(' ')" :key="index" class="result-ball">
                          <span>{{items}}</span>
                        </div>
                        <div v-if="gameMenuType === 'SSC' || gameMenuType === 'K3'"  v-for="(items, index) in item.wn_number" :key="index" class="result-ball">
                          <span>{{items}}</span>
                        </div>
                        <div v-if="gameMenuType === '3D' && item.wn_number !== '--'" v-for="(items, index) in item.wn_number" :key="index" class="result-ball result-3D">
                          <span>{{items}}</span>&nbsp;&nbsp;
                        </div>
                        <div class="numSum" style="display: inline-block;" v-if="gameMenuType === '3D' && item.wn_number !== '--'">{{item.wn_number | totalFilter}}</div>
                      </td>
                      <td class="seek-money" v-if="item.prize !== '--'">{{item.prize | PrizeFilter}} 元</td>
                      <td class="seek-money" v-if="item.prize === '--'">0元</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import { alertMixin } from '../mixin'

export default {
  name: 'zdxq-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      closeIcon,
      name: 'zdxq-alert',
      dataList: '',
      titleName: '',
      gameMenuType: '', /* 彩种系列 */
      issuesData: '',
      issuesDataList: [],
      windNum: '',
      windNum0: 0,
      windNum1: 0,
      windNum2: 0,
      sumNum: 0,
      betNumber: '',
      amount: 0,
      aa: 0,
      bb: 0,
      cc: 0

    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      // for (let key in this.issuesData) {
      //   for (let keyInner in this.issuesData[key]) {
      //     this.issuesWinNumber = this.issuesData[key][keyInner].wn_number.split('')
      //   }
      // }
      /* 非追号 */
      if (this.dataList.amount !== null) {
        var amount = this.dataList.amount.split('.')
      }
      if (amount[1] === '0000') {
        this.amount = amount[0]
      } else {
        this.amount = Number(this.dataList.amount)
      }
      if (this.dataList.bet_number !== null) {
        var number = this.dataList.bet_number.split('|')
      }
      this.betNumber = number.join()
      let num = this.dataList.winning_number
      if (this.titleName && num !== null && num !== undefined) {
        switch (this.gameMenuType) {
          case 'L115':
          case 'KLSF':
          case 'KL12':
          case 'KENO':
            this.windNum = num.split(' ')
            break
          case 'LHC':
            this.windNum = num.split(' ')
            break
          case 'SSC':
          case 'K3':
            this.windNum = num.split('')
            break
          case '3D':
            this.windNum = num.split('')
            for (let key in this.windNum) {
              this.windNum0 = Number(this.windNum[0])
              this.windNum1 = Number(this.windNum[1])
              this.windNum2 = Number(this.windNum[2])
              this.sumNum += Number(this.windNum[key])
            }
            break
          case 'PK10':
            this.windNum = num.split(' ')
            for (let key in this.windNum) {
              if (this.windNum[key] < 10) {
                this.windNum[key] = this.windNum[key].split('')[1]
              }
            }
            break
          default:
        }
        // if (this.gameMenuType === 'L115' || this.gameMenuType === 'KLSF' || this.gameMenuType === 'KL12' || this.gameMenuType === 'KENO') {
        //   this.windNum = num.split(' ')
        // } else if (this.gameMenuType === 'LHC') { /* 返回开奖号码为空 */
        //   this.windNum = num.split(' ')
        // } else if (this.gameMenuType === 'SSC' || this.gameMenuType === 'K3') {
        //   this.windNum = num.split('')
        // } else if (this.gameMenuType === '3D') {
        //   this.windNum = num.split('')
        //   for (let key in this.windNum) {
        //     this.windNum0 = Number(this.windNum[0])
        //     this.windNum1 = Number(this.windNum[1])
        //     this.windNum2 = Number(this.windNum[2])
        //     this.sumNum += Number(this.windNum[key])
        //   }
        // } else if (this.gameMenuType === 'PK10') {
        //   this.windNum = num.split(' ')
        //   for (let key in this.windNum) {
        //     if (this.windNum[key] < 10) {
        //       this.windNum[key] = this.windNum[key].split('')[1]
        //     }
        //   }
        // }
      }
    })
  },
  filters: {
    PrizeFilter: function (val) {
      if (val === '--' || val === 0.000000) {
        return '0'
      } else {
        return parseInt(val).toFixed(2)
      }
    },
    totalFilter: function (val) {
      if (val === '--') return false
      var nono = val
      var coco = 0
      nono.split('')
      for (var i = 0; i < nono.length; i++) {
        coco += parseInt(nono[i])
      }
      return coco
    }
  },
  created () {
    /* this.$nextTick(() => {
      for (let key in this.issuesData) {
        for (let keyInner in this.issuesData[key]) {
          // this.issuesDataList = this.issuesData[key][keyInner]
          this.issuesWinNumber = this.issuesData[key][keyInner].wn_number.split(' ')
          for (let i in this.issuesWinNumber) {
            if (this.issuesWinNumber[i] < 10) {
              this.issuesWinNumber[i] = this.issuesWinNumber[i][1]
            }
          }
        }
      }
    }) */
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99;
    left: 0;
    right: 0;
    background: url("../../../statics/img/game_alert_wrapper_bg.png");
    background-size: 100% 100%;
    /*filter: blur(10px)*/
  }
  .container {
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, .4);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 598px;
    background-color: #ffffff;
  }
  .container > a:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .container .title {
    height: 56px;
    line-height: 56px;
    padding-left: 27px;
    font-size: 18px;
    color: #fff;
    background-color: #616078;
  }
  .container .content {
    padding: 32px 16px 20px 14px;
    overflow: hidden;
  }
  .container .popup-content {
    padding: 30px 16px 20px 14px;
    overflow: hidden;
  }
  .popup-content h4{
    font-size: 19px;
    font-weight: 500;
    margin: 10px;
  }
  .popup-content hr{
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .popup-content .popup-info{
    width: 60%;
    padding: 0 15px;
    float: left;
  }
  .popup-content .popup-info .row{
    overflow: hidden;
  }
  .popup-content .popup-info .row .row-l{
    font-size: 15px;
    padding-bottom: 10px;
    width: 25%;
    text-align: right;
  }
  .popup-content .popup-info .row .row-r{
    font-size: 15px;
    padding-bottom: 10px;
    font-weight: 300;
  }
  .popup-content .row .row-r li{
    display: inline-block;
    color: #fff;
    background: #f17e2e;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    margin-right: 5px;
  }
  .popup-content .row div{
    float: left;
    line-height: 1.5;
  }
  .popup-content .popup-number{
    width: 40%;
    padding: 0 15px;
    float: left;
  }
  .popup-content .popup-number .bet-info{
    border: 1px solid #DDDDDD;
    padding: 7px;
    height: 380px;
    overflow-y: auto;
    font-weight: 300;
    font-size: 15px;
  }
  /*.popup-list{*/
    /*margin-right: -15px;*/
    /*margin-left: -15px;*/
  /*}*/
  .tab-content > .active {
    display: block;
  }
  .fade.in {
    opacity: 1;
  }
  .limitwidth {
    overflow: auto;
  }
  .table.table-colored {
    border-bottom-color: #eb7e00;
  }
  .table:not(.table-bordered) {
    border-bottom: 2px solid #f3f3f3;
  }
  .table {
    font-size: 12px;
  }
  .dialog-seek-order-table > thead, .dialog-seek-order-table > tbody, .dialog-seek-order-table > thead > tr, .dialog-seek-order-table > tbody > tr {
    display: block;
    width: 598px;
  }
  .dialog-seek-order-table > thead > tr > th, .dialog-seek-order-table > tbody > tr > td {
    width: 120px;
    padding: 6px;
  }
  .table-colored > thead > tr > th {
    border-color: #eb7e00;
    background-color: #eb7e00;
    color: #fff;
  }
  .table > thead > tr > th {
    /* vertical-align: bottom; */
    border-bottom: 1px solid #eaeaea;
    background-color: #eaeaea;
    color: #333333;
    font-weight: 400;
  }
  .dialog-seek-order-table .seek-money, .dialog-seek-order-table .seek-cycle {
    width: 140px;
  }
  .dialog-seek-order-table > thead > tr > th, .dialog-seek-order-table > tbody > tr > td {
    width: 120px;
    padding: 6px;
  }
  .dialog-seek-order-table .seek-multiple {
    width: 68px;
  }
  .dialog-seek-order-table .seek-openball {
    width: 188px;
  }
  .result-ball {
    display: inline-block;
    vertical-align: middle;
  }
  .numSum{
    display: inline-block;
    float: unset !important;
  }
  .numSum,
  .result-ball span {
    float: left;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    border: #EA9B40 solid 1px;
    border-radius: 14px;
    background: #EA9B40;
    margin: 0 5px 5px 0;
    color: #FFFFFF;
    position: relative;
  }
  .result-ball.result-3D span::after{
    content: '+';
    color: black;
    position: absolute;
    left: 25px;
  }
  .result-ball.result-3D:nth-of-type(3) > span::after{
    content: '='!important;
  }
  .dialog-seek-order-table .seek-money, .dialog-seek-order-table .seek-cycle {
    width: 140px;
  }
  .dialog-seek-order-table > tbody {
    height: 210px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 8px 15px;
    border-top: 1px solid #f3f3f3;
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: middle;
    border-top: 1px solid #ddd;
    text-align: center;
  }
  .dialog-seek-order-table > tbody {
    height: 139px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

<style>
</style>
