<template>
  <ul class="choice-number-list clear-fix">
    <li v-for="(item, index) in numberList"
        class="clear-fix"
        :key="index">
      <div class="top top_1 clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
                <span v-for="(ball, innerIndex) in item.numberList"
                      :class="{ 'selected': ball.isSelected }"
                      @click="clickBall(ball)"
                      :key="innerIndex"><a href="javascript:;">{{ball.label}}</a></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import sscMixins from '../../../../mixins/ssc_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ sscMixins, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '和值',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 0 },
            { isSelected: false, value: 5, label: 1 },
            { isSelected: false, value: 15, label: 2 },
            { isSelected: false, value: 35, label: 3 },
            { isSelected: false, value: 70, label: 4 },
            { isSelected: false, value: 126, label: 5 },
            { isSelected: false, value: 210, label: 6 },
            { isSelected: false, value: 330, label: 7 },
            { isSelected: false, value: 495, label: 8 },
            { isSelected: false, value: 715, label: 9 },
            { isSelected: false, value: 996, label: 10 },
            { isSelected: false, value: 1340, label: 11 },
            { isSelected: false, value: 1745, label: 12 },
            { isSelected: false, value: 2205, label: 13 },
            { isSelected: false, value: 2710, label: 14 },
            { isSelected: false, value: 3246, label: 15 },
            { isSelected: false, value: 3795, label: 16 },
            { isSelected: false, value: 4335, label: 17 },
            { isSelected: false, value: 4840, label: 18 },
            { isSelected: false, value: 5280, label: 19 },
            { isSelected: false, value: 5631, label: 20 },
            { isSelected: false, value: 5875, label: 21 },
            { isSelected: false, value: 6000, label: 22 },
            { isSelected: false, value: 6000, label: 23 },
            { isSelected: false, value: 5875, label: 24 },
            { isSelected: false, value: 5631, label: 25 },
            { isSelected: false, value: 5280, label: 26 },
            { isSelected: false, value: 4840, label: 27 },
            { isSelected: false, value: 4335, label: 28 },
            { isSelected: false, value: 3795, label: 29 },
            { isSelected: false, value: 3246, label: 30 },
            { isSelected: false, value: 2710, label: 31 },
            { isSelected: false, value: 2205, label: 32 },
            { isSelected: false, value: 1745, label: 33 },
            { isSelected: false, value: 1340, label: 34 },
            { isSelected: false, value: 996, label: 35 },
            { isSelected: false, value: 715, label: 36 },
            { isSelected: false, value: 495, label: 37 },
            { isSelected: false, value: 330, label: 38 },
            { isSelected: false, value: 210, label: 39 },
            { isSelected: false, value: 126, label: 40 },
            { isSelected: false, value: 70, label: 41 },
            { isSelected: false, value: 35, label: 42 },
            { isSelected: false, value: 15, label: 43 },
            { isSelected: false, value: 5, label: 44 },
            { isSelected: false, value: 1, label: 45 }
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
      if (ball.isSelected) {
        this.selectedCounts += ball.value
      } else {
        this.selectedCounts -= ball.value
      }
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
    },
    calculateBetCounts () {
      const countArr = []
      this.numberList.map(item => {
        let count = 0
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) count++
        })
        countArr.push(count)
      })
      this.selectedCounts = countArr.reduce((accumulator, currentValue) => accumulator * currentValue)
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
      this.getShoppingCarList(numberList, 'B', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/ssc-plate.css"; */
  @import '../../../../statics/css/plate.css';
  @import "../../../../statics/css/hezhi-type-repeat.css";
</style>
