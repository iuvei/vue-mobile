<template>
  <ul class="choice-number-list">
    <li v-for="(item, index) in numberList"
        :key="index">
      <div class="top clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
          <span class="span" v-for="(ball, innerIndex) in item.numberList"
                :class="{ 'selected': ball.isSelected }"
                @click="clickBall(ball, index)"
                :key="innerIndex"><a href="javascript:;">{{ball.label}}</a></span>
        </div>
        <div v-if="item.showMenu" class="types clear-fix">
          <span :class="{ 'now-hov': item.isSelectAll }">
            <a @click="selectAllBalls(item.numberList, 'isSelected', item, 'isSelectAll', numberAttrNameList, calculateBetCounts, tuoMaSelectedNumbers)"
               href="javascript:;">全</a>
          </span>
          <span :class="{ 'now-hov': item.isSelectBig }">
                  <a @click="selectBigBalls(item.numberList, 'isSelected', item, 'isSelectBig', numberAttrNameList, calculateBetCounts, tuoMaSelectedNumbers)"
                     href="javascript:;">大</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectSmall }">
                  <a @click="selectSmallBalls(item.numberList, 'isSelected', item, 'isSelectSmall', numberAttrNameList, calculateBetCounts, tuoMaSelectedNumbers)"
                     href="javascript:;">小</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectOdd }">
                  <a @click="selectOddBalls(item.numberList, 'isSelected', item, 'isSelectOdd', numberAttrNameList, calculateBetCounts, tuoMaSelectedNumbers)"
                     href="javascript:;">奇</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectEven }">
                  <a @click="selectEvenBalls(item.numberList, 'isSelected', item, 'isSelectEven', numberAttrNameList, calculateBetCounts, tuoMaSelectedNumbers)"
                     href="javascript:;">偶</a>
                </span>
          <span>
                  <a @click="clearAllBallsSelect(item.numberList, 'isSelected', item,  numberAttrNameList, calculateBetCounts)"
                     href="javascript:;">清</a>
                </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import klsfMixins from '../../../../mixins/klsf_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ klsfMixins, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '胆码',
          showMenu: false,
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: '01' },
            { isSelected: false, value: 2, label: '02' },
            { isSelected: false, value: 3, label: '03' },
            { isSelected: false, value: 4, label: '04' },
            { isSelected: false, value: 5, label: '05' },
            { isSelected: false, value: 6, label: '06' },
            { isSelected: false, value: 7, label: '07' },
            { isSelected: false, value: 8, label: '08' },
            { isSelected: false, value: 9, label: '09' },
            { isSelected: false, value: 10, label: '10' },
            { isSelected: false, value: 11, label: '11' },
            { isSelected: false, value: 12, label: '12' },
            { isSelected: false, value: 13, label: '13' },
            { isSelected: false, value: 14, label: '14' },
            { isSelected: false, value: 15, label: '15' },
            { isSelected: false, value: 16, label: '16' },
            { isSelected: false, value: 17, label: '17' },
            { isSelected: false, value: 18, label: '18' },
            { isSelected: false, value: 19, label: '19' },
            { isSelected: false, value: 20, label: '20' }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6, 22],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15, 32]
        },
        {
          type: '拖码',
          showMenu: true,
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: '01' },
            { isSelected: false, value: 2, label: '02' },
            { isSelected: false, value: 3, label: '03' },
            { isSelected: false, value: 4, label: '04' },
            { isSelected: false, value: 5, label: '05' },
            { isSelected: false, value: 6, label: '06' },
            { isSelected: false, value: 7, label: '07' },
            { isSelected: false, value: 8, label: '08' },
            { isSelected: false, value: 9, label: '09' },
            { isSelected: false, value: 10, label: '10' },
            { isSelected: false, value: 11, label: '11' },
            { isSelected: false, value: 12, label: '12' },
            { isSelected: false, value: 13, label: '13' },
            { isSelected: false, value: 14, label: '14' },
            { isSelected: false, value: 15, label: '15' },
            { isSelected: false, value: 16, label: '16' },
            { isSelected: false, value: 17, label: '17' },
            { isSelected: false, value: 18, label: '18' },
            { isSelected: false, value: 19, label: '19' },
            { isSelected: false, value: 20, label: '20' }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6, 22],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15, 32]
        }
      ],
      numberAttrNameList: [ 'isSelectAll', 'isSelectBig', 'isSelectSmall', 'isSelectOdd', 'isSelectEven' ],
      selectedCounts: 0,
      ballStack: [],
      tuoMaSelectedNumbers: []
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    clickBall (ball, index) {
      if (index === 0) this.ballStack.push(ball)
      this.ballStack = Array.from(new Set(this.ballStack))
      ball.isSelected = !ball.isSelected
      this.calculateBetCounts('click', ball, index)
    },
    calculateBetCounts (type, ball, index) {
      if (this.ballStack.length > 6) {
        this.ballStack.shift().isSelected = false
      }
      if (type === 'click') {
        if (ball.isSelected) {
          this.numberList.map((item, indexEvery) => {
            if (indexEvery === index) return true
            item.numberList.find(item => item.value === ball.value).isSelected = false
          })
        }
      }
      const danMaList = []
      const tuoMaList = []
      let count = 0
      this.numberList.map((item, index) => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected && index === 0) danMaList.push(itemInner)
          if (itemInner.isSelected && index === 1) tuoMaList.push(itemInner)
        })
      })
      if (danMaList.length === 1) {
        for (let i = 0; i < tuoMaList.length; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              for (let b = 0; b < a; b++) {
                for (let c = 0; c < b; c++) {
                  count += c
                }
              }
            }
          }
        }
      }
      if (danMaList.length === 2) {
        for (let i = 0; i < tuoMaList.length; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              for (let b = 0; b < a; b++) {
                count += b
              }
            }
          }
        }
      }
      if (danMaList.length === 3) {
        for (let i = 0; i < tuoMaList.length; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              count += a
            }
          }
        }
      }
      if (danMaList.length === 4) {
        for (let i = 0; i < tuoMaList.length; i++) {
          for (let j = 0; j < i; j++) {
            count += j
          }
        }
      }
      if (danMaList.length === 5) {
        for (let i = 0; i < tuoMaList.length; i++) {
          count += i
        }
      }
      if (danMaList.length === 6) {
        count = tuoMaList.length
      }
      this.selectedCounts = count
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
    },
    resetNumberList () {
      this.numberList.map(item => {
        item.isSelectAll = false
        item.isSelectBig = false
        item.isSelectSmall = false
        item.isSelectOdd = false
        item.isSelectEven = false
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
    }
  },
  watch: {
    numberList: {
      deep: true,
      handler (val) {
        const arr = []
        val[0].numberList.map(item => {
          if (item.isSelected) {
            arr.push(item)
          }
        })
        this.tuoMaSelectedNumbers = arr
      }
    },
    flagCount () {
      const numberList = []
      let flag = false
      this.numberList.map(item => {
        const innerList = []
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) {
            innerList.push([ itemInner.label ])
          }
        })
        if (!innerList.length) {
          flag = true
        }
        numberList.push(innerList)
      })
      if (flag) {
        return this.getShoppingCarList(false, false, 0)
      }
      this.getShoppingCarList(numberList, 'D', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/klsf-plate.css"; */
  @import "../../../../statics/css/plate.css";
  .balls {
    width: 490px;
  }
</style>
