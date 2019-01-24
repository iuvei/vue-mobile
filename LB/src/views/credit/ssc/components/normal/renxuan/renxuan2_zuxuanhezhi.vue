<template>
  <ul class="choice-number-list clear-fix">
    <li v-for="(item, index) in numberList"
        class="clear-fix"
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
import checkboxMixin from './checkbox_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  props: [ 'flagCount', 'getShoppingCarList' ],
  mixins: [ checkboxMixin, resetBalls ],
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
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 1, label: 2 },
            { isSelected: false, value: 2, label: 3 },
            { isSelected: false, value: 2, label: 4 },
            { isSelected: false, value: 3, label: 5 },
            { isSelected: false, value: 3, label: 6 },
            { isSelected: false, value: 4, label: 7 },
            { isSelected: false, value: 4, label: 8 },
            { isSelected: false, value: 5, label: 9 },
            { isSelected: false, value: 4, label: 10 },
            { isSelected: false, value: 4, label: 11 },
            { isSelected: false, value: 3, label: 12 },
            { isSelected: false, value: 3, label: 13 },
            { isSelected: false, value: 2, label: 14 },
            { isSelected: false, value: 2, label: 15 },
            { isSelected: false, value: 1, label: 16 },
            { isSelected: false, value: 1, label: 17 }
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
      'showLrPlay',
      'sscSelectedCounts'
    ])
  },
  methods: {
    clickBall (ball) {
      ball.isSelected = !ball.isSelected
      this.calculateBetCounts(ball)
    },
    calculateBetCounts () {
      let trueCount = 0
      let allCount = 0
      let count = 0
      for (let key in this.checkboxType) {
        if (this.checkboxType[key]) {
          trueCount += 1
        }
      }
      for (let i = 0; i < trueCount; i++) {
        allCount += i
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.isSelected) count += itemInner.value
        })
      })
      this.selectedCounts = count * allCount
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
      this.getShoppingCarList(numberList, 'B', this.selectedCounts, this.getExtraStr())
    },
    checkboxType: {
      deep: true,
      handler () {
        this.calculateBetCounts()
      }
    },
    sscSelectedCounts (val) {
      this.selectedCounts = val
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
  @import "../../../../statics/css/label-repeat.css";
</style>
