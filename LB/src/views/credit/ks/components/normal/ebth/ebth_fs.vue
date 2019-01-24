<template>
  <ul class="choice-number-list">
    <li v-for="(item, index) in numberList"
        :key="index">
      <div class="top clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
          <i v-for="(ball, innerIndex) in item.numberList"
             class="dice"
             :class="{ 'selected': ball.isSelected, [ 'dice-' + ball.value ]: true }"
             @click="clickBall(ball)"
             :key="innerIndex">
            <a href="javascript:;"></a>
          </i>
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
import k3Mixins from '../../../../mixins/k3_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ k3Mixins, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '不同号',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: '1' },
            { isSelected: false, value: 2, label: '2' },
            { isSelected: false, value: 3, label: '3' },
            { isSelected: false, value: 4, label: '4' },
            { isSelected: false, value: 5, label: '5' },
            { isSelected: false, value: 6, label: '6' }
          ]
        }
      ],
      numberAttrNameList: [ 'isSelectAll', 'isSelectBig', 'isSelectSmall', 'isSelectOdd', 'isSelectEven' ],
      selectedCounts: 0
    }
  },
  computed: {
    ...mapGetters([
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
      this.numberList.map((item) => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) flagCount++
        })
      })
      for (let i = 0; i < flagCount; i++) {
        count += i
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
    flagCount () {
      const numberList = []
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) {
            numberList.push([ itemInner ])
          }
        })
      })
      if (!numberList.length) {
        return this.getShoppingCarList(false, false, 0)
      }
      this.getShoppingCarList(numberList, 'B', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/ks-plate.css"; */
  @import "../../../../statics/css/plate.css";
  /*@import "../../../../statics/css/text-bg-repeat.css";*/
  @import "../../../../statics/css/text-bg-repeat-1.css";
  .balls {
    width: 490px;
  }
  .choice-number-list > li .top > .balls span {
    width: 129px;
  }
</style>
