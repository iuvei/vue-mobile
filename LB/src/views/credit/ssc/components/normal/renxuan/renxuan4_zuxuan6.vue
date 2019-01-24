<template>
  <ul class="choice-number-list">
    <li v-for="(item, index) in numberList"
        :key="index">
      <div class="labels">
        <input type="checkbox"
               v-model="checkboxType.wan"
               id="wan">
        <label for="wan">万位</label>
        <input type="checkbox"
               v-model="checkboxType.qian"
               id="qian">
        <label for="qian">千位</label>
        <input type="checkbox"
               v-model="checkboxType.bai"
               id="bai">
        <label for="bai">百位</label>
        <input type="checkbox"
               v-model="checkboxType.shi"
               id="shi">
        <label for="shi">十位</label>
        <input type="checkbox"
               v-model="checkboxType.ge"
               id="ge">
        <label for="ge">个位</label>
      </div>
      <div class="top top_1">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
                <span v-for="(ball, innerIndex) in item.numberList"
                      :class="{ 'selected': ball.isSelected }"
                      @click="clickBall(ball)"
                      :key="innerIndex"><a href="javascript:;">{{ball.label}}</a></span>
        </div>
        <div class="types clear-fix">
                <span :class="{ 'now-hov': item.isSelectAll }">
                  <a @click="selectAllBalls(item.numberList, 'isSelected', item, 'isSelectAll', numberAttrNameList, calculateBetCounts)"
                     href="javascript:;">全</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectBig }">
                  <a @click="selectBigBalls(item.numberList, 'isSelected', item, 'isSelectBig', numberAttrNameList, calculateBetCounts)"
                     href="javascript:;">大</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectSmall }">
                  <a @click="selectSmallBalls(item.numberList, 'isSelected', item, 'isSelectSmall', numberAttrNameList, calculateBetCounts)"
                     href="javascript:;">小</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectOdd }">
                  <a @click="selectOddBalls(item.numberList, 'isSelected', item, 'isSelectOdd', numberAttrNameList, calculateBetCounts)"
                     href="javascript:;">奇</a>
                </span>
          <span :class="{ 'now-hov': item.isSelectEven }">
                  <a @click="selectEvenBalls(item.numberList, 'isSelected', item, 'isSelectEven', numberAttrNameList, calculateBetCounts)"
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
import checkboxMixin from './checkbox_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import sscMixins from '../../../../mixins/ssc_mixin'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
import { sscRxRx4Zx6 } from '../../../../../../config/count-map-number'

export default {
  mixins: [ sscMixins, checkboxMixin, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '二重号',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 0, label: 0 },
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 }
          ]
        }
      ],
      numberAttrNameList: [ 'isSelectAll', 'isSelectBig', 'isSelectSmall', 'isSelectOdd', 'isSelectEven' ],
      selectedCounts: 0
    }
  },
  computed: {
    ...mapGetters([
      'showYlPlay',
      'showLrPlay'
    ])
  },
  methods: {
    clickBall (ball) {
      ball.isSelected = !ball.isSelected
      this.calculateBetCounts()
    },
    calculateBetCounts () {
      let count = 0
      let flagCount = 0
      let trueCount = 0
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) {
            count += 1
          }
        })
      })
      for (let key in this.checkboxType) {
        if (this.checkboxType[key]) {
          trueCount += 1
        }
      }
      if (trueCount === 4) flagCount = 1
      if (trueCount === 5) flagCount = 5
      this.selectedCounts = sscRxRx4Zx6[`${count}`] * flagCount
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
    flagCount () {
      const numberList = []
      let flag = false
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) {
            numberList.push([itemInner.label])
          }
        })
        if (!numberList.length) {
          flag = true
        }
      })
      if (flag) {
        return this.getShoppingCarList(false, false, 0)
      }
      this.getShoppingCarList(numberList, 'A', this.selectedCounts, this.getExtraStr())
    },
    checkboxType: {
      deep: true,
      handler () {
        this.calculateBetCounts()
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/ssc-plate.css"; */
  @import '../../../../statics/css/plate.css';
  @import '../../../../statics/css/label-repeat.css';
</style>
