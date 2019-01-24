import { mapGetters } from 'vuex'
import { handicapAjaxValueConfig } from '../../../../../../config/game-default-config'

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
      'creditMenu',
      'clearFlag',
      'availablePrizeGroups',
      'userInfo',
      'handicapChoiceBonus'
    ]),
    maxBonusGroup () {
      const prizeGroup = +this.userInfo['prize_group']
      const groups = this.availablePrizeGroups.groups
      if (prizeGroup && groups) {
        const maxGroup = Math.max.apply(this, groups)
        return maxGroup < prizeGroup ? maxGroup : prizeGroup
      }
      return 0
    }
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
                  const prize = item['prize']
                  itemInner.maxOdd = odd
                  if (this.handicapChoiceBonus && this.maxBonusGroup) {
                    itemInner.odd = this.handicapChoiceBonus / this.maxBonusGroup * odd
                  } else {
                    itemInner.odd = odd
                  }
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
    },
    handicapChoiceBonus () {
      this.changeOddsByBonus()
    },
    clearFlag () {
      this.clearChoiceCount()
    }
  },
  methods: {
    changeOddsByBonus () {
      this.numberList.map(item => {
        item.nodeList.map(itemInner => {
          itemInner.numberList.map(itemThree => {
            itemThree.odd = this.handicapChoiceBonus / this.maxBonusGroup * itemThree.maxOdd
          })
        })
      })
    },
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
      if (+item.betCount % 2 === 0) {
        // 当投注额是偶数的时候
        item.coefficient = handicapAjaxValueConfig.coefficientEven
      } else {
        // 当投注额是奇数的时候
        item.coefficient = handicapAjaxValueConfig.coefficientOdd
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
