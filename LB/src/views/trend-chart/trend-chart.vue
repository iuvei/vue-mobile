<template>
 <div class="trend-chart-box">
   <div class="trend-header">
     <div class="form-group lottery-name ds-inline">
       <label class="group-label">彩种</label>
       <el-select v-model="gameType"
                  placeholder="请选择彩种"
                  @change="gameTypeChsnge">
         <el-option v-for="item in allGames"
                    :key="item.value"
                    :label="item.label"
                    :value="item"></el-option>
       </el-select>
     </div>
     <!--<div class="form-group lottery-name ds-inline">-->
       <!--<label class="group-label">玩法</label>-->
       <!--<el-select v-model="wayType" placeholder="请选择玩法" @change="wayTypeChsnge">-->
         <!--<el-option-->
           <!--v-for="item in waysList"-->
           <!--:key="item.id"-->
           <!--:label="item.name"-->
           <!--:value="item.id">-->
         <!--</el-option>-->
       <!--</el-select>-->
     <!--</div>-->
     <span class="check-box">
       <el-checkbox v-model="lineChecked">显示折线</el-checkbox>
     </span>
     <span class="check-box">
       <el-checkbox v-model="omissionChecked">不带遗漏</el-checkbox>
     </span>
     <div class="btn-box ds-inline">
       <a href="javascript:;" class="go-back-btn" @click="setCount(30)">最近30期</a>
       <a href="javascript:;" class="zoushi-btn" @click="setCount(50)">最近50期</a>
       <a href="javascript:;" class="lhh-btn" @click="setCount(100)">最近100期</a>
       <router-link to="/lhChart" class="lhh-btn">龙虎和</router-link>
       <router-link to="/lotteryRecord" class="kjjl-btn">开奖记录</router-link>
     </div>
   </div>
   <div class="trend-chart-tb" v-if="isInitData === true">
     <table>
       <thead>
        <tr>
          <th v-for="(item, index) in tableHadeMsg.columnData"
              :key="index"
              :rowspan="item.rows"
              :colspan="item.cols">{{item.label}}</th>
        </tr>
        <tr>
          <th v-for="(item, index) in bottoms" :key="index">{{item}}</th>
        </tr>
       </thead>
       <tbody>
          <tr v-for="(item, index) in dataList"
              :key="index">
            <td>{{item.issue}}</td><!-- 数组第一层为奖期号 -->
            <td v-for="(wnNumber, index1) in item.wnNumber" :key="index1 + '-'">
              <div class="ball_base">{{wnNumber}}</div>
            </td>
            <td v-for="(num, index2) in item.data" :key="index2 + '--'">
              <div v-if="num.isShow" class="ans" :style="{backgroundColor: canvasLineColors[num.index % canvasLineColors.length]}">
              {{num.value}}
                <canvas class="red canvas-line"
                v-if="index !== dataList.length - 1"
                :class="num.value > dataList[index + 1].wnNumber[num.index] ? 'left' : num.value < dataList[index + 1].wnNumber[num.index] ? 'right' : 'center'"
                :data-color="canvasLineColors[(num.index) % canvasLineColors.length]"
                height="32"
                :width="`${Math.abs(dataList[index + 1].wnNumber[num.index] - num.value) * 31 + 2}`">
                </canvas>
              </div>
              <div v-else>{{omissionChecked === true ? '' : num}}</div>
            </td>
          </tr>
          <tr v-if="dataList.length === 0"><td :colspan="showTypeConfig[nowGameType].showCountsEveryRow">暂时没有数据</td></tr>
          <tr v-if="tableHadeMsg.type !== 7">
            <td style="color:#404447">出现总次数</td>
            <td :colspan="tableHadeMsg.columnData[1].cols"></td>
            <td v-if="index < showTypeConfig[nowGameType].showCountsEveryRow - tableHadeMsg.columnData[1].cols -1"
                v-for="(item, index) in statistics[0]" :key="index">{{item}}</td>
          </tr>
          <tr v-if="tableHadeMsg.type !== 7">
            <td style="color:#404447">平均遗漏值</td>
            <td :colspan="tableHadeMsg.columnData[1].cols"></td>
            <td v-if="index < showTypeConfig[nowGameType].showCountsEveryRow - tableHadeMsg.columnData[1].cols -1"
                v-for="(item, index) in statistics[1]" :key="index">{{item}}</td>
          </tr>
          <tr v-if="tableHadeMsg.type !== 7">
            <td style="color:#404447">最大遗漏值</td>
            <td :colspan="tableHadeMsg.columnData[1].cols"></td>
            <td v-if="index < showTypeConfig[nowGameType].showCountsEveryRow - tableHadeMsg.columnData[1].cols -1"
                v-for="(item, index) in statistics[2]" :key="index">{{item}}</td>
          </tr>
          <tr v-if="tableHadeMsg.type !== 7">
            <td style="color:#404447">最大连出值</td>
            <td :colspan="tableHadeMsg.columnData[1].cols"></td>
            <td v-if="index < showTypeConfig[nowGameType].showCountsEveryRow - tableHadeMsg.columnData[1].cols -1"
                v-for="(item, index) in statistics[3]" :key="index">{{item}}</td>
          </tr>
       </tbody>
       <thead>
       <tr>
         <th rowspan="2">期号</th>
         <th :colspan="tableHadeMsg.columnData[1].cols" :rowspan="tableHadeMsg.columnData[1].rows">开奖号码</th>
         <th v-for="(item, index) in bottoms" :key="index">{{item}}</th>
       </tr>
       <tr>
         <th v-if="item.bottoms !== false" v-for="(item, index) in tableHadeMsg.columnData" :key="index" :rowspan="item.rows" :colspan="item.cols">{{item.label}}</th>
       </tr>
       </thead>
     </table>
   </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../../common/js/line'
import { getAllGames } from '../../api/userCenter/personalCenter/personal-center'
import { GetLotteryTrend } from '../../api/trendChart/trend-chart'
import { SET_LOTTERY_ID } from '../../store/nameSpace'
import { canvasLineColors } from '../../config/game-default-config'

export default {
  name: 'trend-chart',
  data () {
    return {
      canvasLineColors,
      allGames: [], // 彩种
      gameType: {},
      // waysList: [], // 玩法
      // wayType: '',
      gameSeriesId: 1,
      count: 100, // 查询条数
      lineChecked: true,
      omissionChecked: false,
      color1: true,
      color2: false,
      columnData: [
      ],
      dataList: [],
      showTypeConfig: {
        SSC: {
          type: 1,
          isSpace: false,
          name: 'SSC',
          showCountsEveryRow: 56,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 5,
              valueMap: 'wnNumber'
            },
            {
              label: '万',
              value: 'wan',
              bottoms: this.Initialization(0, 9),
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '千',
              value: 'qian',
              bottoms: this.Initialization(0, 9),
              rows: 1,
              cols: 10,
              valueMap: 'qian'
            },
            {
              label: '百',
              value: 'bai',
              bottoms: this.Initialization(0, 9),
              rows: 1,
              cols: 10,
              valueMap: 'bai'
            },
            {
              label: '十',
              value: 'shi',
              bottoms: this.Initialization(0, 9),
              rows: 1,
              cols: 10,
              valueMap: 'shi'
            },
            {
              label: '个',
              value: 'ge',
              bottoms: this.Initialization(0, 9),
              rows: 1,
              cols: 10,
              valueMap: 'ge'
            }
          ]
        },
        L115: {
          type: 2,
          isSpace: true,
          name: 'L115',
          showCountsEveryRow: 61,
          columnData: [
            {
              abel: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 5,
              valueMap: 'wnNumber'
            },
            {
              label: '万',
              value: 'wan',
              bottoms: this.Initialization(1, 11),
              rows: 1,
              cols: 11,
              valueMap: 'wan'
            },
            {
              label: '千',
              value: 'qian',
              bottoms: this.Initialization(1, 11),
              rows: 1,
              cols: 11,
              valueMap: 'qian'
            },
            {
              label: '百',
              value: 'bai',
              bottoms: this.Initialization(1, 11),
              rows: 1,
              cols: 11,
              valueMap: 'bai'
            },
            {
              label: '十',
              value: 'shi',
              bottoms: this.Initialization(1, 11),
              rows: 1,
              cols: 11,
              valueMap: 'shi'
            },
            {
              label: '个',
              value: 'ge',
              bottoms: this.Initialization(1, 11),
              rows: 1,
              cols: 11,
              valueMap: 'ge'
            }
          ]
        },
        '3D': {
          type: 3,
          isSpace: false,
          name: '3D',
          showCountsEveryRow: 34,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 3,
              valueMap: 'wnNumber'
            },
            {
              label: '百',
              value: 'bai',
              bottoms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              rows: 1,
              cols: 10,
              valueMap: 'bai'
            },
            {
              label: '十',
              value: 'shi',
              bottoms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              rows: 1,
              cols: 10,
              valueMap: 'shi'
            },
            {
              label: '个',
              value: 'ge',
              bottoms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              rows: 1,
              cols: 10,
              valueMap: 'ge'
            }
          ]
        },
        K3: {
          type: 4,
          isSpace: false,
          name: 'K3',
          showCountsEveryRow: 22,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 3,
              valueMap: 'wnNumber'
            },
            {
              label: '百',
              value: 'bai',
              bottoms: this.Initialization(1, 6),
              rows: 1,
              cols: 6,
              valueMap: 'bai'
            },
            {
              label: '十',
              value: 'shi',
              bottoms: this.Initialization(1, 6),
              rows: 1,
              cols: 6,
              valueMap: 'shi'
            },
            {
              label: '个',
              value: 'ge',
              bottoms: this.Initialization(1, 6),
              rows: 1,
              cols: 6,
              valueMap: 'ge'
            }
          ]
        },
        PK10: {
          type: 5,
          isSpace: true,
          name: 'PK10',
          showCountsEveryRow: 111,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 10,
              valueMap: 'wnNumber'
            },
            {
              label: '1',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '2',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '3',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '4',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '5',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '6',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '7',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '8',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '9',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            },
            {
              label: '10',
              value: 'wan',
              bottoms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              rows: 1,
              cols: 10,
              valueMap: 'wan'
            }
          ]
        },
        LHC: {
          type: 6,
          isSpace: true,
          name: 'LHC',
          showCountsEveryRow: 352,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 8,
              valueMap: 'wnNumber'
            },
            {
              label: '1',
              value: '1',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '1'
            },
            {
              label: '2',
              value: '2',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '2'
            },
            {
              label: '3',
              value: '3',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '3'
            },
            {
              label: '4',
              value: '4',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '4'
            },
            {
              label: '5',
              value: '5',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '5'
            },
            {
              label: '6',
              value: '6',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '6'
            },
            {
              label: '7',
              value: '7',
              bottoms: this.Initialization(1, 49),
              rows: 1,
              cols: 49,
              valueMap: '7'
            }
          ]
        },
        KENO: {
          type: 7,
          isSpace: true,
          name: 'KENO',
          showCountsEveryRow: 21,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 20,
              valueMap: 'wnNumber'
            }
          ]
        },
        KL12: {
          type: 8,
          isSpace: true,
          name: 'KL12',
          showCountsEveryRow: 66,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 5,
              valueMap: 'wnNumber'
            },
            {
              label: '万',
              value: 'wan',
              bottoms: this.Initialization(1, 12),
              rows: 1,
              cols: 12,
              valueMap: 'wan'
            },
            {
              label: '千',
              value: 'qian',
              bottoms: this.Initialization(1, 12),
              rows: 1,
              cols: 12,
              valueMap: 'qian'
            },
            {
              label: '百',
              value: 'bai',
              bottoms: this.Initialization(1, 12),
              rows: 1,
              cols: 12,
              valueMap: 'bai'
            },
            {
              label: '十',
              value: 'shi',
              bottoms: this.Initialization(1, 12),
              rows: 1,
              cols: 12,
              valueMap: 'shi'
            },
            {
              label: '个',
              value: 'ge',
              bottoms: this.Initialization(1, 12),
              rows: 1,
              cols: 12,
              valueMap: 'ge'
            }
          ]
        },
        KLSF: {
          type: 9,
          isSpace: true,
          name: 'KLSF',
          showCountsEveryRow: 169,
          columnData: [
            {
              label: '期号',
              value: 'issue',
              bottoms: false,
              rows: 2,
              cols: 1,
              valueMap: 'issue'
            },
            {
              label: '开奖号码',
              value: 'wnNumber',
              bottoms: false,
              rows: 2,
              cols: 8,
              valueMap: 'wnNumber'
            },
            {
              label: '1',
              value: '1',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '1'
            },
            {
              label: '2',
              value: '2',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '2'
            },
            {
              label: '3',
              value: '4',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '5'
            },
            {
              label: '4',
              value: '4',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '4'
            },
            {
              label: '5',
              value: '5',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '5'
            },
            {
              label: '6',
              value: '6',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '6'
            },
            {
              label: '7',
              value: '7',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '7'
            },
            {
              label: '8',
              value: '8',
              bottoms: this.Initialization(1, 20),
              rows: 1,
              cols: 20,
              valueMap: '8'
            }
          ]
        }
      },
      nowGameType: '',
      isInitData: false,
      tableHadeMsg: {},
      bottoms: [],
      statistics: [],
      resetKey: 0
    }
  },
  computed: {
    ballColor: function () {
      return {
        'ball01': this.color1 === true,
        'ball02': this.color2 === true
      }
    },
    ...mapGetters([
      'lotteryId'
    ])
  },
  methods: {
    getNextNumber (item, index) {
      if (!this.dataList || !this.dataList.length) return
      item.wnNumber.forEach((num, subIndex) => {
        console.log(+item.wnNumber[subIndex], +this.dataList[index + 1].wnNumber[subIndex])
      })
      // console.log(+this.dataList[index].wnNumber[0])
      // console.log(+this.dataList[index + 1].wnNumber[0])
    },
    setCanvasInfo (index, indexInner) {
      // setCanvasInfo(item[2], indexInner2, num2)
      // index 是 dataList的index
      // item 是当前第一位开奖数字的arr
      console.log(index, indexInner)
      // this.dataList[index][2][0][1] 当前的中奖数字
      // this.dataList[index + 1][2][0][1] 当前的中奖数字
      return {
        'left': this.dataList[index][indexInner][0][1] > this.dataList[index + 1][indexInner][0][1],
        'right': this.dataList[index][indexInner][0][1] < this.dataList[index + 1][indexInner][0][1],
        'center': this.dataList[index][indexInner][0][1] === this.dataList[index + 1][indexInner][0][1]
      }
    },
    test () {
      // 防止safari 滾動時 自動觸發窗口resize
      /* var oldwidth = $(window).width()
      fw.onReady(function(){
        Chart.init()
        DrawLine.bind("ans_table","has_line") // 绑定当前渲染节点以及开关节点
        DrawLine.color('#4c7195'); // 第一次设定颜色
        DrawLine.add((parseInt(0)*10+5+1),2,10,0);    // 6
        DrawLine.color('#c9a856');
        DrawLine.add((parseInt(1)*10+5+1),2,10,0); // 16
        DrawLine.color('#4c7195');
        DrawLine.add((parseInt(2)*10+5+1),2,10,0); // 26
        DrawLine.color('#c9a856');
        DrawLine.add((parseInt(3)*10+5+1),2,10,0); // 36
        DrawLine.color('#4c7195');
        DrawLine.add((parseInt(4)*10+5+1),2,10,0); // 46
        DrawLine.draw(Chart.ini.default_has_line);
        resize();

        var nols = $("div[class^='ball_base miss']");
        $("#no_miss").click(function(){
          var checked = $(this).prop("checked");
          $.each(nols,function(i,n){
            if(checked==true){
              //n.style.display='none';
              n.style.opacity='0';
            }else{
              //n.style.display='block';
              n.style.opacity='1';
            }
          });

        });
      });
      function resize(){
        window.onresize = func;
        function func(){
          if(oldwidth != $(window).width()) {
            location.reload();
            oldwidth = $(window).width();
          }
        }
      }
      function cycleNumSubmit(num){
        $("#cycle_num").val(num);
        document.form1.submit();
      } */
    },
    // 获取彩种数据
    getGamelist () {
      getAllGames().then(res => {
        if (res.errno === 0) {
          res.data.forEach((item, index) => {
            if (item.status === 3) {
              this.allGames.push({
                value: item.id,
                label: item.name,
                series_id: item.series_id
              })
            }
            if (item.id === Number(this.lotteryId)) {
              this.gameSeriesId = item.series_id
            }
          })
          this.gameType.value = +this.lotteryId
          // this.GetTrendWays()
          this.GetLotteryTrend()
          this.initData()
        }
        console.log(res)
      })
    },
    // 选择彩种
    gameTypeChsnge (e) {
      this.$loadingShow()
      console.log(e)
      this.gameSeriesId = e.series_id
      // this.GetTrendWays()
      this.GetLotteryTrend()
      this.initData()
      this.$store.commit(SET_LOTTERY_ID, e.value)
      this.$loadingHide()
    },
    // // 获取玩法数据
    // GetTrendWays () {
    //   GetTrendWays(this.gameType.value).then(res => {
    //     if (res.errno === 0) {
    //       this.waysList = res.data.ways
    //       if (res.data.ways.length !== 0) {
    //         this.wayType = res.data.ways[0].id
    //         this.GetLotteryTrend()
    //       } else {
    //         this.wayType = ''
    //       }
    //     }
    //   })
    // },
    // // 选择玩法
    // wayTypeChsnge (e) {
    //   this.wayType = e
    //   this.GetLotteryTrend()
    // },
    // 根据彩系初始化列表头数据
    initData () {
      for (let i in this.showTypeConfig) {
        if (this.showTypeConfig[i].type === this.gameSeriesId) {
          this.tableHadeMsg = this.showTypeConfig[i]
          this.nowGameType = this.showTypeConfig[i].name
        }
      }
      let bottoms = []
      this.tableHadeMsg.columnData.forEach((item, index) => {
        if (item.bottoms !== false) {
          bottoms = bottoms.concat(item.bottoms)
        }
      })
      this.bottoms = bottoms
      this.isInitData = true
    },
    Initialization (num1, num2) {
      let numArr = []
      for (let i = num1; i <= num2; i++) {
        numArr.push(i)
      }
      return numArr
    },
    //
    getNumber (num) {
      if (this.showTypeConfig[ this.nowGameType ].isSpace) {
        return num.split(' ')
      } else {
        return num.split('')
      }
    },
    // 设置请求条数
    setCount (e) {
      this.$loadingShow()
      this.count = e
      this.GetLotteryTrend()
      this.$loadingHide()
    },
    // 获取数据
    GetLotteryTrend () {
      this.$loadingShow()
      let data = {
        lotteryId: this.gameType.value,
        count: this.count
      }
      GetLotteryTrend(data).then(res => {
        if (res.errno === 0) {
          // console.log(this.showTypeConfig[this.nowGameType])
          // let dataList = []
          this.dataList = res.data.data.map(item => {
            const splitDataArr = this.getNumber(item[1])
            let columnData = []
            // this.showTypeConfig[this.nowGameType].columnData.forEach((subItem, index) => {
            //   if (subItem.bottoms) {
            //     item[index].forEach((itemItem, itemIndex) => {
            //       if (itemItem[0] === 0) {
            //         columnData[subItem.value] = itemItem[1]
            //       } else {
            //         subData.push({
            //           [subItem.value]: itemItem[0]
            //         })
            //       }
            //     })
            //   }
            // })
            item.forEach((num, index) => {
              if (index > 1 && index < splitDataArr.length + 2) {
                num.forEach((subNum, subIndex) => {
                  if (subNum[0] === 0) {
                    columnData.push({
                      isShow: true,
                      value: subNum[1],
                      index: index - 2
                    })
                  } else {
                    columnData.push(subNum[0])
                  }
                })
              }
            })
            return {
              issue: item[0],
              wnNumber: splitDataArr,
              data: columnData
            }
          })
          console.log(this.dataList)
          // this.$set(this, 'dataList', res.data.data)
          this.$set(this, 'statistics', res.data.statistics)
          this.$nextTick(() => {
            this.initLine()
          })
        } else {
          this.$set(this, 'dataList', '')
          this.$set(this, 'statistics', '')
        }
        this.$loadingHide()
      })
    },
    initLine () {
      const canvasLines = document.querySelectorAll('.canvas-line')
      canvasLines.forEach(item => {
        const canvasPen = item.getContext('2d')
        const xWidth = item.width
        const isLeft = item.className.indexOf('left') !== -1
        const isRight = item.className.indexOf('right') !== -1
        canvasPen.save()
        canvasPen.strokeStyle = item.dataset['color']
        canvasPen.lineWidth = 1.5
        canvasPen.globalAlpha = 1
        canvasPen.beginPath()
        if (isLeft) {
          canvasPen.moveTo(xWidth, 0)
          canvasPen.lineTo(0, 32)
        } else if (isRight) {
          canvasPen.moveTo(0, 0)
          canvasPen.lineTo(xWidth, 32)
        } else {
          canvasPen.moveTo(xWidth / 2, 0)
          canvasPen.lineTo(xWidth / 2, 32)
        }
        /* canvasPen.moveTo(xWidth, 0)
        canvasPen.lineTo(0, 32) */
        canvasPen.closePath()
        canvasPen.stroke()
        canvasPen.restore()
      })
      // console.log(canvasLines)
    }
  },
  created () {
    console.log(this.canvasLineColors)
    this.dataList = this.dataList.map(item => {
      const splitDataArr = item.wnNumber.split(' ')
      return {
        issue: item.issue,
        wnNumber: item.wnNumber,
        wan: splitDataArr[0],
        qian: splitDataArr[1],
        bai: splitDataArr[2],
        shi: splitDataArr[3],
        ge: splitDataArr[4]
      }
    })
    console.log(this.dataList)
    this.getGamelist()
  },
  watch: {
    lineChecked (val) {
      const canvasLines = document.querySelectorAll('.canvas-line')
      if (val === false) {
        canvasLines.forEach(item => {
          item.style.display = 'none'
        })
      } else {
        canvasLines.forEach(item => {
          item.style.display = 'block'
        })
      }
    }
  }
}
</script>

<style scoped>
  /* canvas样式调整 begin */
  .canvas-line.left {
    right: 100%;
  }
  .canvas-line.center {
    right: 45%;
    top: 75%;
  }
  .canvas-line.right {
    left: 100%;
  }
  .canvas-line {
    position: absolute;
    /*background-color: #000;*/
    top: 50%;
  }
  /* canvas样式调整 end*/
  .trend-header {
    margin: 20px 0;
    padding:0 15px;
  }
  .trend-header .lottery-name {
    margin-right: 5px;
  }
  .ds-inline {
    display: inline-block;
  }
  .trend-header .btn-box a {
    display: inline-block;
    padding: 10px 20px;
    margin-left: 10px;
    margin-top: 10px;
    text-align: center;
    color: #777;
    background-color: #efefef;
    border: 1px solid #e1e1e1;
    border-radius: 3px;
    font-size: 15px;
  }
  .trend-header .group-label {
    color: #777;
    font-size:15px;
  }
  .trend-header .tabel_hade{
    width: 32px;
    border-right: 1px solid red;
    float: left;
  }
  .trend-chart-tb table {
    border: 1px solid #ddd;
    font-size:12px;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  .trend-chart-tb table thead th {
    padding: 5px;
    border:1px solid #ddd;
    line-height: 16px;
    text-align: center;
    background: #efefef;
    vertical-align: middle;
    color: #777;
  }
  .trend-chart-tb table td {
    padding: 5px;
    /*width: 21px;*/
    text-align: center;
    vertical-align: middle;
    background: #f9f9fa;
    line-height: 1.42857143;
    border: 1px solid #ddd;
    border-top-color: #f3f3f3;
    color: #777;
  }
  .trend-chart-tb table td div{
    width: 22px;
    height: 22px;
  }
  .ball_base {
    border: 2px solid #eb7e00;
    color: #ffffff;
    background-color: #eb7e00;
    border-radius: 100%;
    min-height: 20px;
    /* margin: 4px 3px; */
    min-width: 20px;
    text-align: center;
    float: left;
    /* line-height: 33px; */
    position: relative;
    text-decoration: none;
    /* font-size: 20px; */
  }
  .ans{
    color: #ffffff;
    border-radius: 100%;
    height: 22px;
    width: 22px;
    text-align: center;
    line-height: 22px;
    float: left;
    position: relative;
    text-decoration: none;
  }
  .ball_base.miss {
    border: 2px solid transparent;
    color: #777777;
    background-color: transparent;
    border-radius: 100%;
    min-height: 20px;
    /* margin: 4px 3px; */
    min-width: 20px;
    text-align: center;
    float: left;
    /* line-height: 33px; */
    position: relative;
    text-decoration: none;
    /* font-size: 20px; */
  }
  .ball_base.ball01 {
    border: 2px solid #c9a856;
    color: #ffffff;
    background-color: #c9a856;
    border-radius: 100%;
    min-height: 20px;
    /* margin: 4px 3px; */
    min-width: 20px;
    text-align: center;
    float: left;
    /* line-height: 33px; */
    position: relative;
    text-decoration: none;
    /* font-size: 20px; */
  }
  .ball_base.ball02 {
    border: 2px solid #4c7195;
    color: #ffffff;
    background-color: #4c7195;
    border-radius: 100%;
    min-height: 20px;
    /* margin: 4px 3px; */
    min-width: 20px;
    text-align: center;
    float: left;
    /* line-height: 33px; */
    position: relative;
    text-decoration: none;
    /* font-size: 20px; */
  }
</style>
