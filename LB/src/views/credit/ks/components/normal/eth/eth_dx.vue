<template>
  <ul class="choice-number-list">
    <li v-for="(item, index) in numberList"
        :key="index">
      <div class="top clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
          <span v-for="(ball, innerIndex) in item.numberList"
                v-if="ball.ballValue"
                @click="clickBall(ball)"
                :key="innerIndex">
            <a v-for="(number, indexInner) in ball.ballValue"
               class="dice"
               :class="{ [ 'dice-' + number ]: true, 'selected': ball.isSelected }"
               :key="indexInner"
               href="javascript:;"></a>
          </span>
          <i v-for="(ball, innerIndex) in item.numberList"
             class="dice"
             v-if="!ball.ballValue"
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
          type: '二同号',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: '11', ballValue: [1, 1] },
            { isSelected: false, value: 2, label: '22', ballValue: [2, 2] },
            { isSelected: false, value: 3, label: '33', ballValue: [3, 3] },
            { isSelected: false, value: 4, label: '44', ballValue: [4, 4] },
            { isSelected: false, value: 5, label: '55', ballValue: [5, 5] },
            { isSelected: false, value: 6, label: '66', ballValue: [6, 6] }
          ]
        },
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
      const doubleNum = []
      const oneNum = []
      this.numberList.map((item, index) => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected && index === 0) doubleNum.push(itemInner)
          if (itemInner.isSelected && index === 1) oneNum.push(itemInner)
        })
      })
      for (let i = 0; i < doubleNum.length; i++) {
        for (let j = 0; j < oneNum.length; j++) {
          if (doubleNum[i].value === oneNum[j].value) continue
          count += 1
        }
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
  /* @import "../../../statics/ks-plate.css"; */
  @import "../../../../statics/css/plate.css";
  /*@import "../../../../statics/css/text-bg-repeat.css";*/
  @import "../../../../statics/css/text-bg-repeat-1.css";
  .balls {
    width: 670px;
  }
  .choice-number-list > li .top > .balls span {
    width: 129px;
  }
</style>
