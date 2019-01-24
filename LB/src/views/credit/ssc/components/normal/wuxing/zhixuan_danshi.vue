<template>
  <div class="input-wrapper">
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
import inputReset from '../../../../mixins/input-reset'

export default {
  mixins: [ inputReset ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      userInputBet: '',
      selectedCounts: 0
    }
  },
  methods: {
    checkUserInputBet () {
      const regExp = /(\s|\b|\D)(\d{5})(,|\s|;|\b|\D)/g
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
      this.selectedCounts = strArr.length
      this.$store.commit(SET_SSC_SELECTED_COUNTS, this.selectedCounts)
    }
  },
  watch: {
    flagCount () {
      const regExp = /(\s|\b|\D)(\d{5})(,|\s|;|\b|\D)/g
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
        return item.replace(/[^\d]/g, '')
      })
      this.getShoppingCarList(strArr, 'F', this.selectedCounts)
    }
  }
}
</script>

<style scoped>
/* @import "../../../statics/ssc-plate.css"; */
@import '../../../../statics/css/plate.css';
</style>
