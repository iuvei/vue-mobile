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
                      :key="innerIndex"><a href="javascript:;">{{ball.value}}</a></span>
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
      <div v-show="showYlPlay" class="center clear-fix">
        <h4>当前遗漏</h4>
        <div class="numbers clear-fix">
          <span v-for="(ball, innerIndex) in item.ylList" :key="innerIndex">{{ball}}</span>
        </div>
      </div>
      <div v-show="showLrPlay" class="bottom clear-fix">
        <h4>120期冷热</h4>
        <div class="numbers clear-fix">
          <span v-for="(ball, innerIndex) in item.lrList" :key="innerIndex">{{ball}}</span>
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
          type: '第十名',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 },
            { isSelected: false, value: 10, label: 10 }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15]
        },
        {
          type: '第九名',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 },
            { isSelected: false, value: 10, label: 10 }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15]
        },
        {
          type: '第八名',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 },
            { isSelected: false, value: 10, label: 10 }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15]
        },
        {
          type: '第七名',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 },
            { isSelected: false, value: 10, label: 10 }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15]
        },
        {
          type: '第六名',
          isSelectAll: false,
          isSelectBig: false,
          isSelectSmall: false,
          isSelectOdd: false,
          isSelectEven: false,
          numberList: [
            { isSelected: false, value: 1, label: 1 },
            { isSelected: false, value: 2, label: 2 },
            { isSelected: false, value: 3, label: 3 },
            { isSelected: false, value: 4, label: 4 },
            { isSelected: false, value: 5, label: 5 },
            { isSelected: false, value: 6, label: 6 },
            { isSelected: false, value: 7, label: 7 },
            { isSelected: false, value: 8, label: 8 },
            { isSelected: false, value: 9, label: 9 },
            { isSelected: false, value: 10, label: 10 }
          ],
          ylList: [5, 5, 17, 11, 14, 13, 0, 2, 20, 6],
          lrList: [14, 11, 10, 16, 18, 9, 10, 14, 5, 15]
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
      const firstArr = []
      const secondArr = []
      const thirdArr = []
      const fourthArr = []
      const fifthArr = []
      let count = 0
      this.numberList.map((item, index) => {
        item.numberList.map((itemInner) => {
          if (itemInner.isSelected && index === 0) firstArr.push(itemInner)
          if (itemInner.isSelected && index === 1) secondArr.push(itemInner)
          if (itemInner.isSelected && index === 2) thirdArr.push(itemInner)
          if (itemInner.isSelected && index === 3) fourthArr.push(itemInner)
          if (itemInner.isSelected && index === 4) fifthArr.push(itemInner)
        })
      })
      for (let i = 0; i < firstArr.length; i++) {
        for (let j = 0; j < secondArr.length; j++) {
          if (firstArr[i].value === secondArr[j].value) continue
          for (let k = 0; k < thirdArr.length; k++) {
            if (
              thirdArr[k].value === firstArr[i].value ||
              thirdArr[k].value === secondArr[j].value
            ) continue
            for (let l = 0; l < fourthArr.length; l++) {
              if (
                fourthArr[l].value === firstArr[i].value ||
                fourthArr[l].value === secondArr[j].value ||
                fourthArr[l].value === thirdArr[k].value
              ) continue
              for (let m = 0; m < fifthArr.length; m++) {
                if (
                  fifthArr[m].value === firstArr[i].value ||
                  fifthArr[m].value === secondArr[j].value ||
                  fifthArr[m].value === thirdArr[k].value ||
                  fifthArr[m].value === fourthArr[l].value
                ) continue
                count += 1
              }
            }
          }
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
            innerList.push(itemInner.value)
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
      this.getShoppingCarList(numberList, 'D', this.selectedCounts)
    }
  },
  created () {
  }
}
</script>

<style scoped>
  /* @import "../../../statics/pk10-plate.css"; */
   @import '../../../../statics/css/plate.css';
</style>
