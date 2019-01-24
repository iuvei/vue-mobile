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
    <li>
      <div class="renxuan-menu">
                <span :class="{ 'now-hov': renxuanMenuInfo.isSelectAll }">
                  <a @click="selectAllNumber(calculateBetCounts)"
                     href="javascript:;">全</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectBig }">
                  <a @click="selectBigNumber(calculateBetCounts)"
                     href="javascript:;">大</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectSmall }">
                  <a @click="selectSmallNumber(calculateBetCounts)"
                     href="javascript:;">小</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectOdd }">
                  <a @click="selectOddNumber(calculateBetCounts)"
                     href="javascript:;">奇</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectEven }">
                  <a @click="selectEvenNumber(calculateBetCounts)"
                     href="javascript:;">偶</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectQuality }">
                  <a @click="selectQualityNumber(calculateBetCounts)"
                     href="javascript:;">质</a>
                </span>
        <span :class="{ 'now-hov': renxuanMenuInfo.isSelectComposite }">
                  <a  @click="selectCompositeNumber(calculateBetCounts)" href="javascript:;">合</a>
                </span>
        <span>
                  <a @click="clearNumber((calculateBetCounts))" href="javascript:;">清</a>
                </span>
      </div>
    </li>
  </ul>
</template>

<script>
import kenoMixins from '../../../../mixins/keno_mixin'
import resetBalls from '../../../../mixins/balls-reset'
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import { mapGetters } from 'vuex'
export default {
  mixins: [ kenoMixins, resetBalls ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      numberList: [
        {
          type: '上',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: '01' },
            { isSelected: false, value: 2, label: '02' },
            { isSelected: false, value: 3, label: '03' },
            { isSelected: false, value: 4, label: '04' },
            { isSelected: false, value: 5, label: '05' },
            { isSelected: false, value: 6, label: '06' },
            { isSelected: false, value: 7, label: '07' },
            { isSelected: false, value: 8, label: '08' },
            { isSelected: false, value: 9, label: '09' },
            { isSelected: false, value: 10, label: '10' },
            { isSelected: false, value: 11, label: '11' },
            { isSelected: false, value: 12, label: '12' },
            { isSelected: false, value: 13, label: '13' },
            { isSelected: false, value: 14, label: '14' },
            { isSelected: false, value: 15, label: '15' },
            { isSelected: false, value: 16, label: '16' },
            { isSelected: false, value: 17, label: '17' },
            { isSelected: false, value: 18, label: '18' },
            { isSelected: false, value: 19, label: '19' },
            { isSelected: false, value: 20, label: '20' },
            { isSelected: false, value: 21, label: '21' },
            { isSelected: false, value: 22, label: '22' },
            { isSelected: false, value: 23, label: '23' },
            { isSelected: false, value: 24, label: '24' },
            { isSelected: false, value: 25, label: '25' },
            { isSelected: false, value: 26, label: '26' },
            { isSelected: false, value: 27, label: '27' },
            { isSelected: false, value: 28, label: '28' },
            { isSelected: false, value: 29, label: '29' },
            { isSelected: false, value: 30, label: '30' },
            { isSelected: false, value: 31, label: '31' },
            { isSelected: false, value: 32, label: '32' },
            { isSelected: false, value: 33, label: '33' },
            { isSelected: false, value: 34, label: '34' },
            { isSelected: false, value: 35, label: '35' },
            { isSelected: false, value: 36, label: '36' },
            { isSelected: false, value: 37, label: '37' },
            { isSelected: false, value: 38, label: '38' },
            { isSelected: false, value: 39, label: '39' },
            { isSelected: false, value: 40, label: '40' }
          ]
        },
        {
          type: '下',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 41, label: '41' },
            { isSelected: false, value: 42, label: '42' },
            { isSelected: false, value: 43, label: '43' },
            { isSelected: false, value: 44, label: '44' },
            { isSelected: false, value: 45, label: '45' },
            { isSelected: false, value: 46, label: '46' },
            { isSelected: false, value: 47, label: '47' },
            { isSelected: false, value: 48, label: '48' },
            { isSelected: false, value: 49, label: '49' },
            { isSelected: false, value: 50, label: '50' },
            { isSelected: false, value: 51, label: '51' },
            { isSelected: false, value: 52, label: '52' },
            { isSelected: false, value: 53, label: '53' },
            { isSelected: false, value: 54, label: '54' },
            { isSelected: false, value: 55, label: '55' },
            { isSelected: false, value: 56, label: '56' },
            { isSelected: false, value: 57, label: '57' },
            { isSelected: false, value: 58, label: '58' },
            { isSelected: false, value: 59, label: '59' },
            { isSelected: false, value: 60, label: '60' },
            { isSelected: false, value: 61, label: '61' },
            { isSelected: false, value: 62, label: '62' },
            { isSelected: false, value: 63, label: '63' },
            { isSelected: false, value: 64, label: '64' },
            { isSelected: false, value: 65, label: '65' },
            { isSelected: false, value: 66, label: '66' },
            { isSelected: false, value: 67, label: '67' },
            { isSelected: false, value: 68, label: '68' },
            { isSelected: false, value: 69, label: '69' },
            { isSelected: false, value: 70, label: '70' },
            { isSelected: false, value: 71, label: '71' },
            { isSelected: false, value: 72, label: '72' },
            { isSelected: false, value: 73, label: '73' },
            { isSelected: false, value: 74, label: '74' },
            { isSelected: false, value: 75, label: '75' },
            { isSelected: false, value: 76, label: '76' },
            { isSelected: false, value: 77, label: '77' },
            { isSelected: false, value: 78, label: '78' },
            { isSelected: false, value: 79, label: '79' },
            { isSelected: false, value: 80, label: '80' }
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
      this.renxuanMenuInfo.isSelectAll = false
      this.renxuanMenuInfo.isSelectBig = false
      this.renxuanMenuInfo.isSelectSmall = false
      this.renxuanMenuInfo.isSelectOdd = false
      this.renxuanMenuInfo.isSelectEven = false
      this.renxuanMenuInfo.isSelectQuality = false
      this.renxuanMenuInfo.isSelectComposite = false
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
      this.getShoppingCarList(numberList, 'E', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/keno-plate.css"; */
  @import "../../../../statics/css/plate.css";
  @import "../../../../statics/css/hezhi-type-repeat.css";
  @import "../../../../statics/css/renxuan-menu.css";
</style>
