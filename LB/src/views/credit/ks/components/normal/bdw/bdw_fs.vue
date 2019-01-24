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
          type: '猜必出',
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
      let flagCount = 0
      this.numberList.map((item) => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) flagCount++
        })
      })
      this.selectedCounts = flagCount
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
      this.getShoppingCarList(numberList, 'A', this.selectedCounts)
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
