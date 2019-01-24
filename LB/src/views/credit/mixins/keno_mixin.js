import { mapActions, mapMutations, mapGetters } from 'vuex'
import { isPrimeNum } from '../../../util'

export default {
  data () {
    return {
      renxuanMenuInfo: {
        isSelectAll: false,
        isSelectBig: false,
        isSelectSmall: false,
        isSelectOdd: false,
        isSelectEven: false,
        isSelectQuality: false,
        isSelectComposite: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'lotteryId'
    ])
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([]),
    selectAllNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectAll = !this.renxuanMenuInfo.isSelectAll
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectAll') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (this.renxuanMenuInfo.isSelectAll && flagCount >= max) return true
          itemInner.isSelected = this.renxuanMenuInfo.isSelectAll
          if (itemInner.isSelected) {
            flagCount++
          }
        })
      })
      if (cb) cb()
    },
    selectBigNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectBig = !this.renxuanMenuInfo.isSelectBig
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectBig') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map((item, index) => {
        if (index < Math.ceil(this.numberList.length / 2)) {
          item.numberList.map(itemInner => {
            itemInner.isSelected = false
          })
          return
        }
        item.numberList.map(itemInner => {
          if (this.renxuanMenuInfo.isSelectBig && flagCount >= max) return true
          itemInner.isSelected = this.renxuanMenuInfo.isSelectBig
          if (itemInner.isSelected) {
            flagCount++
          }
        })
      })
      if (cb) cb()
    },
    selectSmallNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectSmall = !this.renxuanMenuInfo.isSelectSmall
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectSmall') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map((item, index) => {
        if (index >= Math.ceil(this.numberList.length / 2)) {
          item.numberList.map(itemInner => {
            itemInner.isSelected = false
          })
          return
        }
        item.numberList.map(itemInner => {
          if (this.renxuanMenuInfo.isSelectSmall && flagCount >= max) return true
          itemInner.isSelected = this.renxuanMenuInfo.isSelectSmall
          if (itemInner.isSelected) flagCount++
        })
      })
      if (cb) cb()
    },
    selectOddNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectOdd = !this.renxuanMenuInfo.isSelectOdd
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectOdd') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.value % 2 !== 0) {
            if (this.renxuanMenuInfo.isSelectOdd && flagCount >= max) return true
            itemInner.isSelected = this.renxuanMenuInfo.isSelectOdd
            if (itemInner.isSelected) flagCount++
            return true
          }
          itemInner.isSelected = false
        })
      })
      if (cb) cb()
    },
    selectEvenNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectEven = !this.renxuanMenuInfo.isSelectEven
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectEven') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.value % 2 === 0) {
            if (this.renxuanMenuInfo.isSelectEven && flagCount >= max) return true
            itemInner.isSelected = this.renxuanMenuInfo.isSelectEven
            if (itemInner.isSelected) flagCount++
            return true
          }
          itemInner.isSelected = false
        })
      })
      if (cb) cb()
    },
    selectQualityNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectQuality = !this.renxuanMenuInfo.isSelectQuality
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectQuality') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (isPrimeNum(itemInner.value)) {
            if (this.renxuanMenuInfo.isSelectQuality && flagCount >= max) return true
            itemInner.isSelected = this.renxuanMenuInfo.isSelectQuality
            if (itemInner.isSelected) flagCount++
            return true
          }
          itemInner.isSelected = false
        })
      })
      if (cb) cb()
    },
    selectCompositeNumber (cb, max) {
      let flagCount = 0
      this.renxuanMenuInfo.isSelectComposite = !this.renxuanMenuInfo.isSelectComposite
      for (let key in this.renxuanMenuInfo) {
        if (key === 'isSelectComposite') continue
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (!isPrimeNum(itemInner.value) && itemInner.value !== 1) {
            if (this.renxuanMenuInfo.isSelectComposite && flagCount >= max) return true
            itemInner.isSelected = this.renxuanMenuInfo.isSelectComposite
            if (itemInner.isSelected) flagCount++
            return true
          }
          itemInner.isSelected = false
        })
      })
      if (cb) cb()
    },
    clearNumber (cb) {
      for (let key in this.renxuanMenuInfo) {
        this.renxuanMenuInfo[key] = false
      }
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      if (cb) cb()
    }
  },
  created () {
  }
}
