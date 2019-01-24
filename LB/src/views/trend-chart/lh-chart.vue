<template>
    <div class="lottery-record-lh-chart">
      <div class="lh-chart-logo">
        <img src="/static/img/header_logo_18_8_29.8f3aee2.png" alt="">
      </div>
      <div class="lh-chart-main">
        <div class="lh-chart-title">
          <img src="../../statics/img/dt-logo.png" alt="">
          <h4>走势图</h4>
        </div>
        <div class="lh-chart-btn clear-fix">
          <div class="lh-chart-btn-left">
            <label class="group-label">彩种</label>
            <el-select v-model="selectLottery" value-key="key" placeholder="请选择彩种" @change="gameChange">
              <el-option
                v-for="item in allGameList"
                :key="item.key"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="lh-chart-btn-right">
            <a href="javascript:;" @click="$router.push({ name: 'lotteryRecord', params:{ lotteryName: gameDetail.name }})" class="btn-kj">开奖记录</a>
            <el-select v-model="selectModel2" class="lh-chart-now-type">
              <el-option
                v-for="item in nowType"
                :key="item.key"
                :label="item.key"
                :value="item.key">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="lh-chart-content">
          <div class="lh-chart-count">本页统计: <span>龙 <ins>5</ins></span> <span>虎 <ins>5</ins></span> <span>和 <ins>5</ins></span></div>
          <div class="lh-chart-in clear-fix">
            <div class="chart-in-col white-col">
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="red">龙</span>
              </el-tooltip>
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="blue">虎</span>
              </el-tooltip>
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="green">和</span>
              </el-tooltip>
            </div>
            <div class="chart-in-col gray-col">
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="red">龙</span>
              </el-tooltip>
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="blue">虎</span>
              </el-tooltip>
              <el-tooltip placement="bottom" :enterable="false">
                <div class="tool-tip-game-rule" slot="content">这是提示</div>
                <span class="green">和</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { GetGameMenu } from '@/api/game/game'
import { mapGetters } from 'vuex'
export default {
  name: 'lh-chart',
  data () {
    return {
      selectLottery: '',
      allGameList: [],
      selectModel2: '',
      nowType: [
        {
          key: '万千'
        },
        {
          key: '万百'
        },
        {
          key: '万十'
        },
        {
          key: '万个'
        },
        {
          key: '千百'
        },
        {
          key: '千十'
        },
        {
          key: '千个'
        },
        {
          key: '百十'
        },
        {
          key: '百个'
        },
        {
          key: '十个'
        }
      ]
    }
  },
  methods: {
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
          console.log(this.allGameList)
        })
    },
    gameChange (val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters([
      'gameDetail'
    ])
  },
  created () {
    this.GetGameMenuFn()
  }
}
</script>

<style scoped>
.lottery-record-lh-chart {
  background: #39384a;
  min-height: 100vh;
}
.lh-chart-main {
  width: 90%;
  background: #f7f7f7;
  padding:60px 50px 20px 50px;
  margin: 0 auto;
  box-shadow: 2px 2px 13px #5d5d5d;
  border-radius: 10px;
}
.lh-chart-logo {
  text-align: center;
}
.lh-chart-title {
  position: relative;
  text-align: center;
}
.lh-chart-title > h4 {
  font-size: 25px;
  font-weight: 600;
  vertical-align: middle;
  display: inline-block;
}
.lh-chart-title > img {
  vertical-align: middle;
}
.lh-chart-title::after,.lh-chart-title::before {
  content: "";
  height: 1px;
  width: 200px;
  position: absolute;
  top: 50%;
}
.lh-chart-title::after {
  right: 50%;
  margin-right: -300px;
  background: linear-gradient(to left, #e9e5da 0%, #afacac 100%);
}
.lh-chart-title::before {
  margin-left: -300px;
  background: linear-gradient(to right, #e9e5da 0%, #afacac 100%);
  left: 50%;
}
.lh-chart-btn-left {
  float: left;
}
.lh-chart-btn-right {
  float: right;
}
.group-label {
  font-size: 15px;
  color: #777;
  margin-right: 5px;
}
.btn-kj {
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  background-color: #efefef;
  color: #777777;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  font-size: 15px;
  margin-right: 15px;
}
.lh-chart-count {
  text-align: right;
  border-bottom:1px solid #ddd;
  background: #efefef;
  font-size: 15px;
  padding: 0px 3px;
  line-height: 33px;
}
.lh-chart-count span {
  color: red;
}
.lh-chart-content {
  border: 1px solid #dddddd;
  width: 1380px;
  margin: 10px auto 0;
}
.lh-chart-btn {
  width: 1380px;
  margin: 0 auto;
}
.lh-chart-content .lh-chart-in {
  height: 300px;
}
.chart-in-col {
  width: 23px;
  height: 100%;
  float: left;
  text-align: center;
  line-height: 21px;
  font-size: 15px;
}
.chart-in-col.white-col {
  background:#efefef;
}
.chart-in-col.gray-col {
  background:#e6e6e6;
}
.chart-in-col span.red {
  color:red;
}
.chart-in-col span.green {
  color:green;
}
.chart-in-col span.blue {
  color:blue;
}
.dt-tab-col > span:nth-of-type(5n) {
  border-bottom: 1px solid #a56503;
}
</style>
<style>
.lh-chart-btn-right .el-select {
  width: 100px !important;
}
.lh-chart-btn-right .el-select .el-select-dropdown__item {
  text-align: center;
}
</style>
