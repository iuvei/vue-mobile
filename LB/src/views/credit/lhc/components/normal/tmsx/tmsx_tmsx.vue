<template>
  <ul class="choice-number-list clear-fix">
    <li v-for="(item, index) in numberList"
        class="clear-fix"
        :key="index">
      <div class="top clear-fix">
        <h4>{{item.type}}</h4>
        <div class="balls clear-fix">
                <span class="span" v-for="(ball, innerIndex) in item.numberList"
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
            { isSelected: false, value: 0, label: '鼠' },
            { isSelected: false, value: 1, label: '牛' },
            { isSelected: false, value: 2, label: '虎' },
            { isSelected: false, value: 3, label: '兔' },
            { isSelected: false, value: 4, label: '龙' },
            { isSelected: false, value: 5, label: '蛇' },
            { isSelected: false, value: 6, label: '马' },
            { isSelected: false, value: 7, label: '羊' },
            { isSelected: false, value: 8, label: '猴' },
            { isSelected: false, value: 9, label: '鸡' },
            { isSelected: false, value: 10, label: '狗' },
            { isSelected: false, value: 11, label: '猪' }
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
   @import '../../../../statics/css/plate.css';
  @import "../../../../statics/css/hezhi-type-repeat.css";
  .choice-number-list > li .top > .balls span > a {
    color: #555555;
  }
</style>
