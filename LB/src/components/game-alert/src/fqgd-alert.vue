<template>
  <transition name="fade-in-linear">
    <div v-if="show" class="wrapper">
      <div class="container">
        <a @click="closeAlertBox" href="javascript:;"> <img :src="closeIcon" alt="closeIcon"></a>
        <div class="title">发起跟单</div>
        <div class="modal-body">
          <fieldset>
            <legend>注单內容</legend>
            <table class="table table-hover table-striped">
              <tbody>
                <tr>
                  <th>游戏</th>
                  <th>玩法</th>
                  <th>下注内容</th>
                  <th>倍数（模式）</th>
                </tr>
                <tr id="seek_" v-for="(item, index) in shoppingCarList" :key="index">
                  <td><span>{{item.lotteryName}}</span></td>
                  <td><span>{{item.tabName}}_{{item.typeName}}</span></td>
                  <td class = "gdNumber">
                    <el-tooltip placement="top"
                                :enterable="false">
                      <div slot="content">{{showNumberList(item)}}</div>
                      <div class="choice-number-show">{{showNumberList(item)}}</div>
                    </el-tooltip>
                  </td>
                  <td><span>{{item.multiple}}({{item.coefficientLabel}})</span></td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <fieldset>
            <legend>发起跟单设定</legend>
            佣金费率：
            <el-select id="follow_commission_percent" class="selectMoney" v-model="optionsValue" @change="changeYJ">
              <el-option
                v-for="item in Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </fieldset>
          <table class="table table-hover table-striped">
            <tfoot>
              <tr v-for="(item, index) in shoppingCarList" :key="index">
                <td class="text-center">投注总金额:￥{{item.selectedMoney}}</td>
              </tr>
              <tr class="Tips">
                <td>温馨提示：中奖率低于10％的单挑最高派奖10000元</td>
              </tr>
              <tr class="rule">
                <td>
                  <br>
                  <b>发起跟单规则</b><br>
                  <ul>
                    <li>成功发起之跟单将无法撤单</li>
                    <li>发起跟单方案要求源订单费用不能低于10元</li>
                    <li>只有发起跟单方案中奖，且中奖金额大于方案金额时，发起人才能得到佣金</li>
                    <li>每名用户同时最多可发起五笔跟单</li>
                    <li>没有盈利可能的注单不可发起跟单。例如个位直选全包,，这种注单不允许发起跟单方案坑害他人。</li>
                  </ul>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="modal-footer">
            <button class="btn btn-sm submit" type="button" @click="submitBetList">提 交</button>
            <button class="btn btn-sm cancel" type="button" @click="closeAlertBox" data-dismiss="modal">取 消</button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import closeIcon from '../../../statics/img/close_icon_game_alert_zhtz.png'
import { alertMixin } from '../mixin'
import { showNumberList } from '../../../util'
import { mapGetters } from 'vuex'
import { betInCommon } from '../statics/js/util'
export default {
  name: 'fqgd-alert',
  mixins: [ alertMixin ],
  data () {
    return {
      closeIcon,
      showNumberList,
      isCreateNumber: false,
      chasingInfo: null,
      mode: 'normal',
      name: 'fqgd-alert',
      shoppingCarList: [],
      lotteryId: '',
      Options: [],
      optionsValue: '0',
      enAbled: 0,
      maxRate: 0,
      minRate: 0,
      stepRate: 0
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu',
      selectedCounts: 'sscSelectedCounts',
      myLotteryId: 'lotteryId'
    }),
    ...mapGetters([
      'defaultSetting'
    ])
  },
  methods: {
    changeYJ (val) {
      this.optionsValue = val
    },
    submitBetList () {
      betInCommon({
        lotteryId: this.myLotteryId,
        shoppingCarList: this.shoppingCarList,
        mode: this.mode,
        chasingInfo: this.chasingInfo
      }, 1, this.optionsValue)
        .then(res => {
          const { errno } = res
          if (errno === 0) {
            this.$message({
              message: '发起跟单成功',
              type: 'success'
            })
          }
          this.$store.dispatch('getUserBalance')
          this.$store.dispatch('clearSelectedBalls')
          this.show = false
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '服务器错误, 请稍后重试',
            type: 'error'
          })
          this.$store.dispatch('getUserBalance')
          this.show = false
        })
    },
    getOptions () {
      let map = []
      this.$nextTick(() => {
        this.enAbled = this.defaultSetting['fp_enabled']
        this.maxRate = parseFloat(this.defaultSetting['fp_max_rate'])
        this.minRate = parseFloat(this.defaultSetting['fp_min_rate'])
        this.stepRate = parseFloat(this.defaultSetting['fp_rate_step'])
        for (let i = this.minRate; i <= this.maxRate; i += this.stepRate) {
          map.push({
            value: i,
            label: Math.floor(i * 100) + '%'
          })
        }
      })
      this.Options = map
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style scoped>
  @import "../statics/css/transition.css";
  .choice-number-show {
    cursor: pointer;
    color: red;
    text-decoration: underline;
  }
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
  .selectMoney{
    width: 70px;
    height: 35px;
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
  .text-center{
    text-align: center;
  }
  .container > a:nth-of-type(1) {
    position: absolute;
    right: 20px;
    top: 22px;
  }
  .gdNumber>div{
    width: 105px;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: center;
    white-space: nowrap;
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
  }
  .container .modal-body {
    position: relative;
    padding: 15px;
  }
  .table-striped.table > tbody > tr > td {
    border-color: #e8e8e8;
    text-align: center;
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    padding: 8px 15px;
    border-top: 1px solid #f3f3f3;
  }
  .container .modal-body fieldset:nth-of-type(1){
    padding:10px;
    border:1px solid #eee;
    margin: 16px 0px;
  }
  .container .modal-body fieldset:nth-of-type(2){
    padding:10px;
    border:1px solid #eee;
    font-size: 14px;
    margin: 20px 0px;
  }
  .container .modal-body legend{
    font-size:15px;
    border:0;
    width:auto;
    padding:0 10px;
    margin:0;
    height: 20px;
  }
  .container .modal-body .table-striped{
    width:100%;
    border-bottom:0;
    margin:0;
    font-size:12px
  }
  .container .modal-body .table-striped tr:nth-of-type(1) th{
    padding: 8px 15px;
    border-top: 1px solid #f3f3f3;
    background-color: #f5f5f5;
  }
  .container .modal-body .table-striped .gdNumber{
    overflow:hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    white-space: nowrap;
  }
  .container .modal-body .table-striped .Tips td{
    text-align:center;
    border-top:0;
    padding:0;
    color: red
  }
  .container .modal-body .table-striped .rule td{
    /*color:red;*/
    border-top:0;
    text-align: center;
    padding:0;
  }
  .container .modal-body .table-striped .rule ul{
    padding-left:20px;
    text-align: left;
    display: inline-block;
    list-style: square;
    font-weight: 300;
  }
  .container .modal-footer{
    padding: 15px;
    text-align: center;
  }
  .modal-footer .submit {
    color: #ffffff;
    background-color: #4babbf;
    border-color: #4babbf;
  }
  .modal-footer .btn.cancel {
    color: #ffffff;
    background: #959595;
    border: 1px solid #959595;
  }
  .btn-sm {
    padding: 5px 15px;
    font-size: 12px;
    line-height: 1.1;
    border-radius: 3px;
    margin: 5px 0;
  }
  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .modal-footer .submit:hover, .submit:focus, .submit:focus, .submit:active{
    color: #ffffff;
    background-color: #0c9ec7;
    border-color: #0c9ec7;
  }
  .modal-footer .btn.cancel:hover,.btn.cancel:active {
    background: #878787;
    border: 1px solid #878787;
  }
</style>

<style>
</style>
