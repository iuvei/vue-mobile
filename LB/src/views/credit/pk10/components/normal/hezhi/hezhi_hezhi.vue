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
import pk10Mixins from '../../../../mixins/pk10_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ pk10Mixins, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '冠亚和值',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 10, label: 3 },
            { isSelected: false, value: 15, label: 4 },
            { isSelected: false, value: 21, label: 5 },
            { isSelected: false, value: 28, label: 6 },
            { isSelected: false, value: 36, label: 7 },
            { isSelected: false, value: 45, label: 8 },
            { isSelected: false, value: 55, label: 9 },
            { isSelected: false, value: 63, label: 10 },
            { isSelected: false, value: 69, label: 11 },
            { isSelected: false, value: 73, label: 12 },
            { isSelected: false, value: 75, label: 13 },
            { isSelected: false, value: 75, label: 14 },
            { isSelected: false, value: 73, label: 15 },
            { isSelected: false, value: 69, label: 16 },
            { isSelected: false, value: 63, label: 17 },
            { isSelected: false, value: 55, label: 18 },
            { isSelected: false, value: 45, label: 19 }
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
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) count += 1
        })
      })
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
  /* @import "../../../statics/pk10-plate.css"; */
   @import '../../../../statics/css/plate.css';
  @import "../../../../statics/css/hezhi-type-repeat.css";
</style>
