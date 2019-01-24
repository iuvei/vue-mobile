import { mapGetters } from 'vuex'

export default {
  props: [
    'clearCount',
    'getCountFlag',
    'getBetDataList'
  ],
  data () {
    return {
      dropDownShow: true,
      nowWayInfo: null
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
    nowWayInfo (val) {
      if (val && val.children) {
        val.children.map(item => {
          this.numberList.map(list => {
            list.nodeList.map(listInner => {
              listInner.numberList.map(itemInner => {
                if (item['name_en'] === itemInner.labelMap) {
                  const odd = item.odds.split(',')[0]
                  const maxCount = item['max_multiple'] * 2
                  const wayId = item['series_way_id']
                  const price = item['price']
                  const prize = item['prize,']
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
          })
        })
      }
    },
    clearCount () {
      this.clearChoiceCount()
    },
    getCountFlag () {
      this.getBettingData()
    }
  },
  methods: {
    getBettingData () {
      const arr = []
      this.numberList.map(item => {
        item.nodeList.map(list => {
          list.numberList.map(itemInner => {
            if (itemInner.betCount !== '') {
              arr.push(itemInner)
            }
          })
        })
      })
      this.getBetDataList(arr)
    },
    clearChoiceCount () {
      this.numberList.map(item => {
        item.nodeList.map(list => {
          list.numberList.map(itemInner => {
            if (itemInner.betCount !== '') {
              itemInner.betCount = ''
            }
          })
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
    const wayName = this.$route.meta['sub_path']
    this.creditMenu.find(item => {
      return item.children.find(itemInner => {
        if (itemInner['name_en'] === wayName) {
          this.nowWayInfo = itemInner
          return true
        }
      })
    })
  }
}
