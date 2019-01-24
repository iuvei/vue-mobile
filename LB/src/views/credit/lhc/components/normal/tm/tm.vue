<template>
  <ul class="choice-number-list clear-fix">
    <li v-for="(item, index) in numberList"
        class="clear-fix"
        :key="index">
      <div class="top clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
                <span class="span" v-for="(ball, innerIndex) in item.numberList"
                      :class="{ 'selected': ball.isSelected, [ ball.className ]: true }"
                      @click="clickBall(ball)"
                      :key="innerIndex"><a href="javascript:;">{{ball.label}}</a></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '特码',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, className: 'red', value: 1, label: '01' },
            { isSelected: false, className: 'red', value: 2, label: '02' },
            { isSelected: false, className: 'blue', value: 3, label: '03' },
            { isSelected: false, className: 'blue', value: 4, label: '04' },
            { isSelected: false, className: 'green', value: 5, label: '05' },
            { isSelected: false, className: 'green', value: 6, label: '06' },
            { isSelected: false, className: 'red', value: 7, label: '07' },
            { isSelected: false, className: 'red', value: 8, label: '08' },
            { isSelected: false, className: 'blue', value: 9, label: '09' },
            { isSelected: false, className: 'blue', value: 10, label: '10' },
            { isSelected: false, className: 'green', value: 11, label: '11' },
            { isSelected: false, className: 'red', value: 12, label: '12' },
            { isSelected: false, className: 'red', value: 13, label: '13' },
            { isSelected: false, className: 'blue', value: 14, label: '14' },
            { isSelected: false, className: 'blue', value: 15, label: '15' },
            { isSelected: false, className: 'green', value: 16, label: '16' },
            { isSelected: false, className: 'green', value: 17, label: '17' },
            { isSelected: false, className: 'red', value: 18, label: '18' },
            { isSelected: false, className: 'red', value: 19, label: '19' },
            { isSelected: false, className: 'blue', value: 20, label: '20' },
            { isSelected: false, className: 'green', value: 21, label: '21' },
            { isSelected: false, className: 'green', value: 22, label: '22' },
            { isSelected: false, className: 'red', value: 23, label: '23' },
            { isSelected: false, className: 'red', value: 24, label: '24' },
            { isSelected: false, className: 'blue', value: 25, label: '25' },
            { isSelected: false, className: 'blue', value: 26, label: '26' },
            { isSelected: false, className: 'green', value: 27, label: '27' },
            { isSelected: false, className: 'green', value: 28, label: '28' },
            { isSelected: false, className: 'red', value: 29, label: '29' },
            { isSelected: false, className: 'red', value: 30, label: '30' },
            { isSelected: false, className: 'blue', value: 31, label: '31' },
            { isSelected: false, className: 'green', value: 32, label: '32' },
            { isSelected: false, className: 'green', value: 33, label: '33' },
            { isSelected: false, className: 'red', value: 34, label: '34' },
            { isSelected: false, className: 'red', value: 35, label: '35' },
            { isSelected: false, className: 'blue', value: 36, label: '36' },
            { isSelected: false, className: 'blue', value: 37, label: '37' },
            { isSelected: false, className: 'green', value: 38, label: '38' },
            { isSelected: false, className: 'green', value: 39, label: '39' },
            { isSelected: false, className: 'red', value: 40, label: '40' },
            { isSelected: false, className: 'blue', value: 41, label: '41' },
            { isSelected: false, className: 'blue', value: 42, label: '42' },
            { isSelected: false, className: 'green', value: 43, label: '43' },
            { isSelected: false, className: 'green', value: 44, label: '44' },
            { isSelected: false, className: 'red', value: 45, label: '45' },
            { isSelected: false, className: 'red', value: 46, label: '46' },
            { isSelected: false, className: 'blue', value: 47, label: '47' },
            { isSelected: false, className: 'blue', value: 48, label: '48' },
            { isSelected: false, className: 'green', value: 49, label: '49' }
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
            numberList.push([ itemInner ])
          }
        })
        if (!numberList.length) {
          flag = true
        }
      })
      if (flag) {
        return this.getShoppingCarList(false, false, 0)
      }
      this.getShoppingCarList(numberList, 'E', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/lhc-plate.css"; */
  @import "../../../../statics/css/plate.css";
  @import "../../../../statics/css/hezhi-type-repeat.css";
</style>
