<template>
  <ul class="choice-number-list">
    <li v-for="(item, index) in numberList"
        :key="index">
      <div class="top top_1">
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
          type: '包胆',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 54, label: 0 },
            { isSelected: false, value: 54, label: 1 },
            { isSelected: false, value: 54, label: 2 },
            { isSelected: false, value: 54, label: 3 },
            { isSelected: false, value: 54, label: 4 },
            { isSelected: false, value: 54, label: 5 },
            { isSelected: false, value: 54, label: 6 },
            { isSelected: false, value: 54, label: 7 },
            { isSelected: false, value: 54, label: 8 },
            { isSelected: false, value: 54, label: 9 }
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
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner === ball) return
          itemInner.isSelected = false
        })
      })
      ball.isSelected = !ball.isSelected
      this.calculateBetCounts(ball)
    },
    calculateBetCounts (ball) {
      this.selectedCounts = ball.value
      if (!ball.isSelected) this.selectedCounts = 0
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
        const innerList = []
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) {
            innerList.push(itemInner.label)
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
</style>
