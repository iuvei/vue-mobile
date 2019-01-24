<template>
  <div class="input-wrapper">
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
    <textarea name="userInputBet"
              id="userInputBet"
              @input="checkUserInputBet"
              v-model="userInputBet"
              cols="30"
              rows="5"></textarea>
    <div class="clear-fix">
      <p>
        注单间请使用[,] [ ]或[;]隔开。
      </p>
      <a @click="clearUserInputBet"
         href="javascript:;">
        清空
      </a>
    </div>
  </div>
</template>

<script>
import { SET_SSC_SELECTED_COUNTS } from '../../../../../../store/nameSpace'
import resetInput from '../../../../mixins/input-reset'
import checkboxType from './checkbox_mixin'

export default {
  props: [ 'flagCount', 'getShoppingCarList' ],
  mixins: [ checkboxType, resetInput ],
  data () {
    return {
      userInputBet: '',
      selectedCounts: 0
    }
  },
  methods: {
    checkUserInputBet () {
      const regExp = /(\s|\b|\D)(\d{4})(,|\s|;|\b|\D)/g
      let strArr = this.userInputBet.match(regExp) || []
      strArr = Array.from(new Set(
        strArr.map(item => {
          return item.replace(/[^\d]/g, '')
        })
      ))
      if (!strArr || !strArr.length) {
        this.selectedCounts = 0
        return this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
      }
      if (this.checkboxChoiceCount < 4) {
        this.selectedCounts = 0
      } else {
        let count = 0
        for (let i = 0; i < this.checkboxChoiceCount; i++) {
          for (let j = 0; j < i; j++) {
            for (let a = 0; a < j; a++) {
              count += a
            }
          }
        }
        this.selectedCounts = strArr.length * count
      }
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
      this.selectedCounts = strArr.length
    }
  },
  computed: {
    checkboxChoiceCount () {
      let count = 0
      for (let key in this.checkboxType) {
        if (this.checkboxType[key]) count += 1
      }
      return count
    }
  },
  watch: {
    flagCount () {
      const regExp = /(\s|\b|\D)(\d{4})(,|\s|;|\b|\D)/g
      let strArr = this.userInputBet.match(regExp)
      if (!strArr || !strArr.length) {
        return this.$message({
          message: '未检测可投注的号码, 请正确输入后重试',
          type: 'error'
        })
      }
      strArr = Array.from(new Set(
        strArr.map(item => {
          return item.replace(/[^\d]/g, '')
        })
      ))
      strArr = strArr.map(item => {
        return [ item.replace(/[^\d]/g, '') ]
      })
      this.getShoppingCarList(strArr, 'F', this.selectedCounts, this.getExtraStr())
    },
    checkboxType: {
      deep: true,
      handler () {
        this.checkUserInputBet()
      }
    }
  }
}
</script>

<style scoped>
  /* @import "../../../statics/ssc-plate.css"; */
  @import '../../../../statics/css/plate.css';
  @import '../../../../statics/css/label-repeat.css';
</style>
