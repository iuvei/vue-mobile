import { mapGetters } from 'vuex'

export default {
  props: [
    'clearCount',
    'getCountFlag',
    'getBetDataList'
  ],
  data () {
    return {
      dropDownShow: true
    }
  },
  computed: {
    ...mapGetters([
      'handicapQuickAmount',
      'handicapChoiceWay',
      'quickSelectAmountData',
      'creditMenu'
    ])
  },
  watch: {
    handicapQuickAmount (val) {
      if (this.handicapChoiceWay !== 1) return
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.betCount !== '') {
            itemInner.betCount = val
            this.checkIsMoreThanMaxCount(itemInner)
          }
        })
      })
    },
    handicapChoiceWay (val) {
      this.dropDownShow = val !== 1
    },
    clearCount () {
      this.clearChoiceCount()
    },
    getCountFlag () {
      this.getBettingData()
    }
  },
  methods: {
    getWayInfo () {
      this.creditMenu[0].children.map(item => {
        this.numberList.map(itemInner => {
          if (itemInner.labelMap === item['name_en']) {
            item.children.map(item => {
              itemInner.numberList.map(itemInner => {
                if (item['name_en'] === itemInner.labelMap) {
                  const odd = item.odds.split(',')[0]
                  const maxCount = item['max_multiple'] * 2
                  const wayId = item['series_way_id']
                  const price = item['price']
                  const prize = item['prize']
                  itemInner.odd = odd
                  itemInner.maxCount = maxCount
                  itemInner.wayId = wayId
                  itemInner.price = price
                  itemInner.prize = prize
                  itemInner.maxMultiple = maxCount / 2
                  return true
                }
              })
            })
          }
        })
      })
    },
    getBettingData () {
      const arr = []
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          if (itemInner.betCount !== '') {
            arr.push(itemInner)
          }
        })
      })
      this.getBetDataList(arr)
    },
    clearChoiceCount () {
      this.numberList.map(item => {
        item.numberList.map(itemInner => {
          itemInner.betCount = ''
        })
      })
    },
    clickChoiceItem (event, item) {
      if (item.betCount === '') {
        item.betCount = this.handicapQuickAmount
      } else {
        if (event.target.tagName.toLowerCase() === 'input') return
        item.betCount = ''
      }
      this.checkIsMoreThanMaxCount(item)
    },
    clickQuickSelect () {
      const choiceCount = arguments[0][0]
      const choiceItem = arguments[1]
      choiceItem.betCount = choiceCount
      this.checkIsMoreThanMaxCount(choiceItem)
    },
    checkInputCount (item) {
      item.betCount = item.betCount.replace(/[^(\d|.)]/g, '')
    },
    checkIsMoreThanMaxCount (item) {
      if (item.betCount === '') return
      if (isNaN(Number(item.betCount))) {
        item.betCount = this.handicapQuickAmount
        return
      }
      if (Number(item.betCount) > item.maxCount) {
        item.betCount = item.maxCount
      }
      if (Number(item.betCount) === 0) {
        item.betCount = this.handicapQuickAmount
      }
      if (!Number.isInteger(+item.betCount)) {
        this.$message({
          message: '投注金额必须是整数',
          type: 'error'
        })
        item.betCount = Math.ceil(item.betCount)
      }
    }
  },
  created () {
    this.getWayInfo()
  }
}
