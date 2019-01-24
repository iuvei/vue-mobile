<template>
  <div class="lottery-trend">
    <div class="road-menu">
      <el-select v-model="roadType"
                 class="road-select"
                 placeholder="请选择">
        <el-option v-for="(item, index) in dataList ? dataList.position : []"
                   :key="index"
                   :label="item.label"
                   :value="index"></el-option>
      </el-select>
      <a v-for="(item, index) in showTableTabType"
         @click="nowShowTableTabType = item.value"
         :key="index"
         class="road-menu-link"
         :class="{ 'now-hov': nowShowTableTabType === item.value }"
         href="javascript:;">{{item.label}}</a>
    </div>
    <div class="da-road table-wrapper">
      <h4 class="road-title">大路</h4>
      <div class="table clear-fix">
        <div :style="{ width: bigRoadList.length * 20 + 'px' }"
             class="table-container clear-fix">
          <div v-for="(item, index) in bigRoadList"
               :key="index">
            <div v-for="numberInner in bigRoadListShowEveryRow"
                 :key="numberInner">
              <span v-if="(item.numbers ? item.numbers[numberInner - 1] : false) && !item.isBottom"
                    :class="{ [ item.color ]: true }">{{item.numbers[numberInner - 1]}}</span>
              <span v-if="item.isBottom && numberInner === bigRoadListShowEveryRow"
                    :class="{ [ item.color ]: true }">{{item.numbers[numberInner - 6]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="other-roads clear-fix">
      <div class="zhupan-road table-wrapper">
        <h4 class="road-title">珠盘路</h4>
        <div class="table clear-fix">
          <div :style="{ width: zhupanRoadList.length * 20 + 'px' }"
               class="table-container clear-fix">
            <div v-for="(item, index) in zhupanRoadList"
                 :key="index">
              <div v-for="numberInner in bigRoadListShowEveryRow"
                   :key="numberInner">
              <span v-if="item[numberInner - 1]"
                    :class="{ [ item[numberInner - 1].color ]: true }">{{item[numberInner - 1].number}}</span>
              <span v-else></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dayan-road table-wrapper">
        <h4 class="road-title">大眼路</h4>
        <div class="table clear-fix">
          <div :style="{ width: dayanRoadList.length * 20 + 'px' }"
               class="table-container clear-fix">
            <div v-for="(item, index) in dayanRoadList"
                 :key="index">
              <div v-for="numberInner in bigRoadListShowEveryRow"
                   :key="numberInner">
              <span v-if="item[numberInner - 1] && !item[numberInner - 1].isBottom"
                    :class="{ [ item[numberInner - 1].color ]: true }"></span>
              <span v-if="item[ bigRoadListShowEveryRow - numberInner ] && item[ bigRoadListShowEveryRow - numberInner ].isBottom && numberInner === bigRoadListShowEveryRow"
                    :class="{ [ item[ bigRoadListShowEveryRow - numberInner ].color ]: true }"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xiao-road table-wrapper">
        <h4 class="road-title">小路</h4>
        <div class="table clear-fix">
          <div :style="{ width: smallRoadList.length * 20 + 'px' }"
               class="table-container clear-fix">
            <div v-for="(item, index) in smallRoadList"
                 :key="index">
              <div v-for="numberInner in bigRoadListShowEveryRow"
                   :key="numberInner">
              <span v-if="item[numberInner - 1] && !item[numberInner - 1].isBottom"
                    :class="{ [ item[numberInner - 1].color ]: true }"></span>
              <span v-if="item[ bigRoadListShowEveryRow - numberInner ] && item[ bigRoadListShowEveryRow - numberInner ].isBottom && numberInner === bigRoadListShowEveryRow"
                    :class="{ [ item[ bigRoadListShowEveryRow - numberInner ].color ]: true }"></span>
              </div>
            </div>
          </div>
        </div>
    </div>
      <div class="yueyou-road table-wrapper">
        <h4 class="road-title">曱甴路</h4>
        <div class="table clear-fix">
          <div :style="{ width: yueyouRoadList.length * 20 + 'px' }"
               class="table-container clear-fix">
            <div v-for="(item, index) in yueyouRoadList"
                 :key="index">
              <div v-for="numberInner in bigRoadListShowEveryRow"
                   :key="numberInner">
              <span v-if="item[numberInner - 1] && !item[numberInner - 1].isBottom"
                    :class="{ [ item[numberInner - 1].color ]: true }"></span>
                <span v-if="item[ bigRoadListShowEveryRow - numberInner ] && item[ bigRoadListShowEveryRow - numberInner ].isBottom && numberInner === bigRoadListShowEveryRow"
                      :class="{ [ item[ bigRoadListShowEveryRow - numberInner ].color ]: true }"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetBigWayData } from '@/api/game/game'
import { mapGetters } from 'vuex'

export default {
  name: 'lottery-trend',
  data () {
    return {
      roadType: '',
      dataList: [],
      bigRoadListShowEveryRow: 6,
      showTableTabType: [
        {
          label: '单双',
          isDefault: true,
          value: 0
        },
        {
          label: '大小',
          isDefault: false,
          value: 1
        }
      ],
      nowShowTableTabType: 0
    }
  },
  computed: {
    ...mapGetters([
      'lotteryId'
    ]),
    computedListBigRoad () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) {
        return []
      }
      let data
      const tableArr = []
      this.dataList.position.map((item, index) => {
        if (index === this.roadType) {
          data = item
        }
      })
      data.numbers.map((item, index) => {
        //  小 -> 红 大 -> 蓝 中 -> 绿
        //  单 -> 红 双 -> 蓝 中 -> 绿let color
        let color
        if (this.nowShowTableTabType === 0) { // 当前tab为单双的时候
          color = +item % 2 === 0 ? 'blue' : 'red'
        } else if (this.nowShowTableTabType === 1) { // 当前tab为大小的时候
          color = +item === data['tie'] ? 'green' : +item <= data.small ? 'red' : 'blue'
        }
        if (index === 0) {
          tableArr.push({
            color: color,
            numbers: [ item ],
            isBottom: false
          })
          return true
        }
        if (this.nowShowTableTabType === 0) {
          if ((+item % 2 === 0 && +data.numbers[index - 1] % 2 === 0) || // 相邻的两个数字都为双
            (+item % 2 !== 0 && +data.numbers[index - 1] % 2 !== 0)) { //  相邻的两个数字都为单
            tableArr[tableArr.length - 1].numbers.push(item)
          } else {
            tableArr.push({
              color: color,
              numbers: [ item ],
              isBottom: false
            })
          }
        } else if (this.nowShowTableTabType === 1) {
          if ((+item >= data.big && +data.numbers[index - 1] >= data.big) || // 相邻的两个数字都为大
            (+item <= data.small && +data.numbers[index - 1] <= data.small) || // 相邻两个数字都为小
            (+item === data['tie'] && +data.numbers[index - 1] === data['tie'])) { // 相邻两个数字都是中间值
            tableArr[tableArr.length - 1].numbers.push(item)
          } else {
            tableArr.push({
              color: color,
              numbers: [ item ],
              isBottom: false
            })
          }
        }
      })
      return tableArr
    },
    bigRoadList () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) return []
      let data
      const tableArr = []
      this.dataList.position.map((item, index) => {
        if (index === this.roadType) {
          data = item
        }
      })
      data.numbers.map((item, index) => {
        //  小 -> 红 大 -> 蓝 中 -> 绿
        //  单 -> 红 双 -> 蓝 中 -> 绿
        let color
        if (this.nowShowTableTabType === 0) { // 当前tab为单双的时候
          color = +item % 2 === 0 ? 'blue' : 'red'
        } else if (this.nowShowTableTabType === 1) { // 当前tab为大小的时候
          color = +item === data['tie'] ? 'green' : +item <= data.small ? 'red' : 'blue'
        }
        if (index === 0) {
          tableArr.push({
            color: color,
            numbers: [ item ],
            isBottom: false
          })
          return true
        }
        if (this.nowShowTableTabType === 0) { // 当前tab为单双的时候
          if ((+item % 2 === 0 && +data.numbers[index - 1] % 2 === 0) || // 相邻的两个数字都为双
            (+item % 2 !== 0 && +data.numbers[index - 1] % 2 !== 0)) { //  相邻的两个数字都为单
            if (tableArr[tableArr.length - 1].numbers.length < 6 &&
              !tableArr[tableArr.length - 1].isBottom) { // 当为六个的时候
              tableArr[tableArr.length - 1].numbers.push(item)
            } else {
              tableArr.push({
                color: color,
                numbers: [ item ],
                isBottom: true
              })
            }
          } else {
            tableArr.push({
              color: color,
              numbers: [ item ],
              isBottom: false
            })
          }
        } else if (this.nowShowTableTabType === 1) { // 当前tab为大小的时候
          if ((+item >= data.big && +data.numbers[index - 1] >= data.big) || // 相邻的两个数字都为大
            (+item <= data.small && +data.numbers[index - 1] <= data.small) || // 相邻两个数字都为小
            (+item === data['tie'] && +data.numbers[index - 1] === data['tie'])) { // 相邻两个数字都是中间值
            if (tableArr[tableArr.length - 1].numbers.length < 6 &&
              !tableArr[tableArr.length - 1].isBottom) { // 当为六个的时候
              tableArr[tableArr.length - 1].numbers.push(item)
            } else {
              tableArr.push({
                color: color,
                numbers: [ item ],
                isBottom: true
              })
            }
          } else {
            tableArr.push({
              color: color,
              numbers: [ item ],
              isBottom: false
            })
          }
        }
      })
      return tableArr
    },
    zhupanRoadList () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) return []
      let data
      const tableArr = []
      this.dataList.position.map((item, index) => {
        if (index === this.roadType) {
          data = item
        }
      })
      data.numbers.map((item, index) => {
        let color
        if (this.nowShowTableTabType === 0) { // 当前tab为单双的时候
          color = +item % 2 === 0 ? 'blue' : 'red'
        } else if (this.nowShowTableTabType === 1) { // 当前tab为大小的时候
          color = +item === data['tie'] ? 'green' : +item <= data.small ? 'red' : 'blue'
        }
        if (index === 0) {
          tableArr.push([{
            color,
            number: item
          }])
          return true
        }
        if (tableArr[tableArr.length - 1].length < 6) {
          tableArr[tableArr.length - 1].push({
            color,
            number: item
          })
        } else {
          tableArr.push([{
            color,
            number: item
          }])
        }
      })
      return tableArr
    },
    dayanRoadList () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) return []
      const tableArr = []
      const bigRoadList = this.computedListBigRoad
      let secondIsTrueFlag = false
      let isFirstBlue = false
      // 不同给蓝
      // 相同给红
      bigRoadList.map((item, index) => {
        if (index === 0) return
        item.numbers.map((itemInner, indexInner) => {
          if (index === 1 && indexInner === 0) return
          //  小 -> 红 大 -> 蓝 中 -> 绿
          //  单 -> 红 双 -> 蓝 中 -> 绿
          if (index === 1 && indexInner === 1 && itemInner) { // 当第二行第二个值为正确值时
            let color
            if (bigRoadList[0].numbers[1]) {
              // isFirstBlue = true
              color = 'red'
            } else {
              isFirstBlue = true
              color = 'blue'
            }
            secondIsTrueFlag = true
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          if (index === 2 && indexInner === 0 && !secondIsTrueFlag) { // 当第三行第一个值为正确值时
            let color = bigRoadList[0].numbers.length === bigRoadList[1].numbers.length ? 'red' : 'blue'
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          // 不为下吊的第一位数字情况
          if (indexInner === 0) {
            if (bigRoadList[index - 1].numbers.length === bigRoadList[index - 2].numbers.length) { // 齐脚的情况 齐脚给红
              if (tableArr[tableArr.length - 1][0].color === 'red') { // 前两列齐脚且当前前一位为红
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else { // 当前一列中的红未满的情况下
                  // 其他情况下 向前列红中正常插入当前红
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else { // 当前两列齐脚单当前前一位为蓝时
                // 正常新起一行红
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当前两列不齐脚时
              if (tableArr[tableArr.length - 1][0].color === 'blue') { // 前两列不齐脚时 且前一列为蓝时
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                  tableArr.push([{
                    color: 'blue',
                    isBottom: true
                  }])
                } else { // 当前两列不齐脚 当前前一位为蓝时
                  tableArr[tableArr.length - 1].push({
                    color: 'blue',
                    isBottom: false
                  })
                }
              } else { // 前两列不齐脚时 且前一列为红时
                tableArr.push([{
                  color: 'blue',
                  isBottom: false
                }])
              }
            }
            // 将第一次空的flag值重置为false
            isFirstBlue = false
          }
          // 当当前号码不是第一位数字的情况
          if (indexInner !== 0) {
            let color
            if (bigRoadList[index - 1].numbers[indexInner]) { // 当基准向左移有值时 即当前颜色为红
              color = 'red'
              if (color === tableArr[tableArr.length - 1][0].color) {
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else {
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else {
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当基准向左移一个单位没有值时
              // 左移一个单位没有值时 第一次空为蓝 第二次空为红 第三次空也为红
              if (isFirstBlue) { // 不是第一次空 则下一个颜色为红
                color = 'red' // 修改当前颜色为红
                if (color === tableArr[tableArr.length - 1][0].color) {
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                    tableArr.push([{
                      color: 'red',
                      isBottom: true
                    }])
                  } else {
                    tableArr[tableArr.length - 1].push({
                      color: 'red',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'red',
                    isBottom: false
                  }])
                }
              } else { // 当当前是第一个为空 那么下一个颜色为蓝
                color = 'blue'
                if (color === tableArr[tableArr.length - 1][0].color) {
                  // 当为第一次空的时候
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                    tableArr.push([{
                      color: 'blue',
                      isBottom: true
                    }])
                  } else { // 当前两列不齐脚 当前前一位为蓝时
                    tableArr[tableArr.length - 1].push({
                      color: 'blue',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'blue',
                    isBottom: false
                  }])
                }
                isFirstBlue = true
              }
            }
          }
        })
      })
      return tableArr
    },
    smallRoadList () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) return []
      const tableArr = []
      const bigRoadList = this.computedListBigRoad
      let secondIsTrueFlag = false
      let isFirstBlue = false
      // 不同给蓝
      // 相同给红
      bigRoadList.map((item, index) => {
        if (index <= 1) return
        item.numbers.map((itemInner, indexInner) => {
          if (index === 2 && indexInner === 0) return
          //  小 -> 红 大 -> 蓝 中 -> 绿
          //  单 -> 红 双 -> 蓝 中 -> 绿
          if (index === 2 && indexInner === 1 && itemInner) { // 当第二行第二个值为正确值时
            let color
            if (bigRoadList[0].numbers[1]) {
              // isFirstBlue = true
              color = 'red'
            } else {
              isFirstBlue = true
              color = 'blue'
            }
            secondIsTrueFlag = true
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          if (index === 3 && indexInner === 0 && !secondIsTrueFlag) { // 当第四行第一个值为正确值时
            let color = bigRoadList[0].numbers.length === bigRoadList[2].numbers.length ? 'red' : 'blue'
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          // 不为下吊的第一位数字情况
          if (indexInner === 0) {
            if (bigRoadList[index - 1].numbers.length === bigRoadList[index - 3].numbers.length) { // 齐脚的情况 齐脚给红
              if (tableArr[tableArr.length - 1][0].color === 'red') { // 前两列齐脚且当前前一位为红
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else { // 当前一列中的红未满的情况下
                  // 其他情况下 向前列红中正常插入当前红
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else { // 当前两列齐脚单当前前一位为蓝时
                // 正常新起一行红
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当前两列不齐脚时
              if (tableArr[tableArr.length - 1][0].color === 'blue') { // 前两列不齐脚时 且前一列为蓝时
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                  tableArr.push([{
                    color: 'blue',
                    isBottom: true
                  }])
                } else { // 当前两列不齐脚 当前前一位为蓝时
                  tableArr[tableArr.length - 1].push({
                    color: 'blue',
                    isBottom: false
                  })
                }
              } else { // 前两列不齐脚时 且前一列为红时
                tableArr.push([{
                  color: 'blue',
                  isBottom: false
                }])
              }
            }
            // 将第一次空的flag值重置为false
            isFirstBlue = false
          }
          // 当当前号码不是第一位数字的情况
          if (indexInner !== 0) {
            let color
            if (bigRoadList[index - 2].numbers[indexInner]) { // 当基准向左移两格有值时 即当前颜色为红
              color = 'red'
              if (color === tableArr[tableArr.length - 1][0].color) {
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else {
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else {
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当基准向左移两个单位没有值时
              // 左移两个单位没有值时 第一次空为蓝 第二次空为红 第三次空也为红
              if (isFirstBlue) { // 不是第一次空 则下一个颜色为红
                color = 'red' // 修改当前颜色为红
                if (color === tableArr[tableArr.length - 1][0].color) {
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                    tableArr.push([{
                      color: 'red',
                      isBottom: true
                    }])
                  } else {
                    tableArr[tableArr.length - 1].push({
                      color: 'red',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'red',
                    isBottom: false
                  }])
                }
              } else { // 当当前是第一个为空 那么下一个颜色为蓝
                color = 'blue'
                if (color === tableArr[tableArr.length - 1][0].color) {
                  // 当为第一次空的时候
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                    tableArr.push([{
                      color: 'blue',
                      isBottom: true
                    }])
                  } else { // 当前两列不齐脚 当前前一位为蓝时
                    tableArr[tableArr.length - 1].push({
                      color: 'blue',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'blue',
                    isBottom: false
                  }])
                }
                isFirstBlue = true
              }
            }
          }
        })
      })
      return tableArr
    },
    yueyouRoadList () {
      if ((!this.roadType && this.roadType !== 0) ||
        (!this.dataList.position && !this.dataList.position.length)) return []
      const tableArr = []
      const bigRoadList = this.computedListBigRoad
      let secondIsTrueFlag = false
      let isFirstBlue = false
      // 不同给蓝
      // 相同给红
      bigRoadList.map((item, index) => {
        if (index <= 2) return
        item.numbers.map((itemInner, indexInner) => {
          if (index === 3 && indexInner === 0) return // 判定如果是第四行第一个那么直接驳回
          //  小 -> 红 大 -> 蓝 中 -> 绿
          //  单 -> 红 双 -> 蓝 中 -> 绿
          if (index === 3 && indexInner === 1 && itemInner) { // 当第四行第二个值为正确值时
            let color
            if (bigRoadList[0].numbers[1]) {
              // isFirstBlue = true
              color = 'red'
            } else {
              isFirstBlue = true
              color = 'blue'
            }
            secondIsTrueFlag = true
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          if (index === 4 && indexInner === 0 && !secondIsTrueFlag) { // 当第五行第一个值为正确值时
            let color = bigRoadList[0].numbers.length === bigRoadList[3].numbers.length ? 'red' : 'blue'
            tableArr.push([{
              color: color,
              isBottom: false
            }])
            return
          }
          // 不为下吊的第一位数字情况
          if (indexInner === 0) {
            if (bigRoadList[index - 1].numbers.length === bigRoadList[index - 3].numbers.length) { // 齐脚的情况 齐脚给红
              if (tableArr[tableArr.length - 1][0].color === 'red') { // 前两列齐脚且当前前一位为红
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else { // 当前一列中的红未满的情况下
                  // 其他情况下 向前列红中正常插入当前红
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else { // 当前两列齐脚单当前前一位为蓝时
                // 正常新起一行红
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当前两列不齐脚时
              if (tableArr[tableArr.length - 1][0].color === 'blue') { // 前两列不齐脚时 且前一列为蓝时
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                  tableArr.push([{
                    color: 'blue',
                    isBottom: true
                  }])
                } else { // 当前两列不齐脚 当前前一位为蓝时
                  tableArr[tableArr.length - 1].push({
                    color: 'blue',
                    isBottom: false
                  })
                }
              } else { // 前两列不齐脚时 且前一列为红时
                tableArr.push([{
                  color: 'blue',
                  isBottom: false
                }])
              }
            }
            // 将第一次空的flag值重置为false
            isFirstBlue = false
          }
          // 当当前号码不是第一位数字的情况
          if (indexInner !== 0) {
            let color
            if (bigRoadList[index - 3].numbers[indexInner]) { // 当基准向左移有值时 即当前颜色为红
              color = 'red'
              if (color === tableArr[tableArr.length - 1][0].color) {
                if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                  tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                  tableArr.push([{
                    color: 'red',
                    isBottom: true
                  }])
                } else {
                  tableArr[tableArr.length - 1].push({
                    color: 'red',
                    isBottom: false
                  })
                }
              } else {
                tableArr.push([{
                  color: 'red',
                  isBottom: false
                }])
              }
            } else { // 当基准向左移三个单位没有值时
              // 左移三个单位没有值时 第一次空为蓝 第二次空为红 第三次空也为红
              if (isFirstBlue) { // 不是第一次空 则下一个颜色为红
                color = 'red' // 修改当前颜色为红
                if (color === tableArr[tableArr.length - 1][0].color) {
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的红已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的红
                    tableArr.push([{
                      color: 'red',
                      isBottom: true
                    }])
                  } else {
                    tableArr[tableArr.length - 1].push({
                      color: 'red',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'red',
                    isBottom: false
                  }])
                }
              } else { // 当当前是第一个为空 那么下一个颜色为蓝
                color = 'blue'
                if (color === tableArr[tableArr.length - 1][0].color) {
                  // 当为第一次空的时候
                  if (tableArr[tableArr.length - 1].length >= 6 ||// 当前一列中的蓝已满的情况下
                    tableArr[tableArr.length - 1][0].isBottom) { // 当前一列是下吊的蓝
                    tableArr.push([{
                      color: 'blue',
                      isBottom: true
                    }])
                  } else { // 当前两列不齐脚 当前前一位为蓝时
                    tableArr[tableArr.length - 1].push({
                      color: 'blue',
                      isBottom: false
                    })
                  }
                } else {
                  tableArr.push([{
                    color: 'blue',
                    isBottom: false
                  }])
                }
                isFirstBlue = true
              }
            }
          }
        })
      })
      return tableArr
    }
  },
  methods: {
    getDataList () {
      GetBigWayData(this.lotteryId)
        .then(res => {
          if (res.errno === 0) {
            this.dataList = res.data
            const positionData = this.dataList ? this.dataList.position : []
            if (positionData && positionData.length) {
              positionData.find((item, index) => {
                if (item['is_default']) {
                  // 重置当前的默认值路单type
                  this.roadType = index
                  return true
                }
              })
            }
          }
        })
    }
  },
  created () {
    this.getDataList()
  }
}
</script>

<style scoped>
  /* .lottery-trend begin */
  .lottery-trend {
    position: relative;
    padding: 24px 36px 33px 28px;
    background-color: #eeeeee;
    margin-top: 15px;
  }
  .road-menu {
    margin-bottom: 17px;
  }
  .road-menu > .road-menu-link.now-hov {
    background-color: #ff9100;
  }
  .road-menu > .road-menu-link {
    display: inline-block;
    font-size: 15px;
    padding: 5px 10px;
    margin: 0 5px;
    color: #ffffff;
    background-color: #7b7b7b;
    border-radius: 5px;
  }
  .road-menu .road-select {
    width: 90px;
    margin-right: 5px;
  }
  .table-wrapper {
    height: 140px;
    padding-left: 40px;
    position: relative;
  }
  .table-wrapper.da-road {
    margin-bottom: 15px;
  }
  .other-roads .table-wrapper {
    float: left;
    width: 50%;
  }
  .table-wrapper .road-title {
    position: absolute;
    left: 0;
    width: 40px;
    top: 0;
    bottom: 0;
    background-color: #4a4a4a;
    writing-mode: vertical-lr;
    font-size: 19px;
    font-weight: normal;
    margin: 0;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    letter-spacing: 4px;
  }
  .table-wrapper .table {
    width: 100%;
    overflow-x: scroll;
    height: 100%;
    border: 2px solid #4a4a4a;
  }
  .table-wrapper .table .table-container {
    border-bottom: 1px solid #999;
  }
  .table-wrapper .table > .table-container > div {
    float: left;
    width: 20px;
  }
  .table-wrapper .table > .table-container > div > div > span {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    line-height: 18px;
  }
  .table-wrapper .table > .table-container > div > div > span.red {
    background-color: #ff6c6c;
  }
  .table-wrapper .table > .table-container > div > div > span.blue {
    background-color: #5b70d8;
  }
  .table-wrapper .table > .table-container > div > div > span.green {
    background-color: rgb(0, 154, 97);
  }
  .table-wrapper .table > .table-container > div > div {
    height: 19.74px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
  }
  /* .lottery-trend end */
</style>
