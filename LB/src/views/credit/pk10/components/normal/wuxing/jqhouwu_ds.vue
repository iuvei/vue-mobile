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
        号码间请使用空白隔开，注单间请使用[,]或[;]隔开。
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

export default {
  mixins: [ resetInput ],
  props: [ 'flagCount', 'getShoppingCarList' ],
  data () {
    return {
      userInputBet: '',
      selectedCounts: 0
    }
  },
  methods: {
    checkUserInputBet () {
      const regExp = /(\d{1,2}\s){4}\d{1,2}(?!\d)(,|;|)/g
      let strArr = this.userInputBet.match(regExp) || []
      strArr = strArr.filter(item => {
        const numberArr = item.replace(/[^\d|\s]/, '').split(' ')
        return !numberArr.find(itemInner => {
          return +itemInner <= 0 || +itemInner > 10
        }) && !numberArr.find((item, index) => {
          return numberArr.find((itemInner, indexInner) => +item === +itemInner && index !== indexInner)
        })
      })
      strArr = Array.from(new Set(
        strArr.map(item => {
          return item.replace(/[^\d|\s]/, '').split(' ').map(itemInner => {
            return Number(itemInner) < 10 ? `0${+itemInner}` : itemInner
          }).join(' ')
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
      const regExp = /(\d{1,2}\s){4}\d{1,2}(?!\d)(,|;|)/g
      let strArr = this.userInputBet.match(regExp) || []
      if (!strArr || !strArr.length) {
        return this.$message({
          message: '未检测可投注的号码, 请正确输入后重试',
          type: 'error'
        })
      }
      strArr = strArr.filter(item => {
        const numberArr = item.replace(/[^\d|\s]/, '').split(' ')
        return !numberArr.find(itemInner => {
          return +itemInner <= 0 || +itemInner > 10
        }) && !numberArr.find((item, index) => {
          return numberArr.find((itemInner, indexInner) => +item === +itemInner && index !== indexInner)
        })
      })
      strArr = Array.from(new Set(
        strArr.map(item => {
          return item.replace(/[^\d|\s]/, '').split(' ').map(itemInner => {
            return Number(itemInner) < 10 ? `0${+itemInner}` : itemInner
          }).join(' ')
        })
      ))
      strArr = strArr.map(item => {
        return item.split(' ').map(itemInner => {
          return itemInner
        })
      })
      this.getShoppingCarList(strArr, 'D', this.selectedCounts)
    }
  }
}
</script>

<style scoped>
  /* @import "../../../statics/pk10-plate.css"; */
   @import '../../../../statics/css/plate.css';
</style>
