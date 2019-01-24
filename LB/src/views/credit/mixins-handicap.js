import clearIcon from '../../statics/img/clear_handicap.png'
import rightIcon from '../../statics/img/right_icon_smp.png'

import { mapGetters } from 'vuex'
import { SET_QUICK_SELECT_AMOUNT, SET_HANDICAP_CHOICE_WAY, SET_HANDICAP_CHOICE_BONUS } from '../../store/nameSpace'
import { maxPrizeGroupOddCount, handicapDefaultBetCount } from '../../config/game-default-config'
import { shallowCopy } from '../../util'
import { betInCommon } from '../../components/game-alert/statics/js/util'

export default {
  data () {
    return {
      clearIcon,
      rightIcon,
      SET_HANDICAP_CHOICE_WAY,
      rebate: 0,
      quickAmount: handicapDefaultBetCount.betCount,
      minAmount: handicapDefaultBetCount.minBetCount,
      betCountStep: handicapDefaultBetCount.betCountStep,
      clearCount: 0,
      getCountFlag: 0,
      betDataList: []
    }
  },
  methods: {
    checkQuickAmount () {
      if (!Number.isInteger(+this.quickAmount)) {
        this.$set(this, 'quickAmount', Math.ceil(+this.quickAmount))
        this.$nextTick(() => {
          this.$refs['quick-amount'].currentValue = this.quickAmount
        })
        return false
      }
    },
    getBetDataList (data) {
      this.$set(this, 'betDataList', data)
    },
    getBetNumberList () {
      return new Promise((resolve, reject) => {
        this.getCountFlag++
        this.$nextTick(() => {
          if (!this.betDataList.length) {
            this.$message({
              message: '未检测到有效的投注号码',
              type: 'error'
            })
            return reject(new Error('未检测到有效的投注号码'))
          }
          const gameTypeName = this.$route.params['gameTypeName']
          const szcpMenuList = this.szcpMenuList
          let lotteryName
          let tabName
          let flag = false
          for (let key in szcpMenuList) {
            if (flag) break
            for (let innerKey in szcpMenuList[key]['lotteries']) {
              if (szcpMenuList[key]['lotteries'][innerKey]['identifier'] === gameTypeName) {
                lotteryName = szcpMenuList[key]['lotteries'][innerKey]['name']
                flag = true
                break
              }
            }
          }
          const arr = this.betDataList.map(item => {
            this.creditMenu[0].children.find(itemInner => {
              if (itemInner['name_en'] === item.upperLabel) {
                tabName = itemInner['name_cn']
                return true
              }
            })
            return {
              lotteryName,
              awardInfo: shallowCopy(this.sscAwardInfo),
              tabName,
              bonusGroup: this.userInfo['prize_group'] - this.rebate * maxPrizeGroupOddCount / 100,
              lotteryId: this.lotteryId,
              ...item
            }
          })
          resolve(arr)
        })
      })
    },
    showOrderInAlert () {
      this.getBetNumberList()
        .then(data => {
          const { bet_confirm: betConfirm } = this.defaultSetting
          if (!betConfirm) {
            this.$loadingShow()
            return betInCommon({
              lotteryId: this.lotteryId,
              isChasingNumber: false,
              shoppingCarList: data,
              mode: 'handicap',
              chasingInfo: null
            })
              .then(res => {
                if (res.errno === 0) {
                  this.$message({
                    message: '投注成功',
                    type: 'success'
                  })
                } else if (res.errno === 4063) {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
                this.$store.dispatch('getUserBalance')
                this.clearCount++
                this.$loadingHide()
              })
              .catch(err => {
                console.log(err)
                this.$message({
                  message: '服务器错误',
                  type: 'error'
                })
                this.$loadingHide()
              })
          }
          this.$gameAlertQrzdxx({
            mode: 'handicap',
            shoppingCarList: data,
            lotteryId: this.lotteryId,
            rootEl: this.$root.$el,
            isClearShoppingCar: false
          })
        })
    },
    formatRebate (val) {
      return `${val}%`
    },
    setQuickSelectAmountArr () {
      this.$store.commit(SET_HANDICAP_CHOICE_WAY, 2)
      this.$gameAlertKxje()
    }
  },
  computed: {
    ...mapGetters([
      'handicapQuickAmount',
      'defaultSetting',
      'handicapChoiceWay',
      'availablePrizeGroups',
      'userInfo',
      'szcpMenuList',
      'creditMenu',
      'lotteryId',
      'sscAwardInfo'
    ]),
    minRebate () {
      if (this.availablePrizeGroups instanceof Array && this.availablePrizeGroups.length === 0) return 0
      if (!this.userInfo['prize_group']) return 0
      return (this.userInfo['prize_group'] - Math.max.apply(this, this.availablePrizeGroups.groups)) * 100 / maxPrizeGroupOddCount
    },
    maxRebate () {
      if (this.availablePrizeGroups instanceof Array && this.availablePrizeGroups.length === 0) return 100
      return (this.userInfo['prize_group'] - Math.min.apply(this, this.availablePrizeGroups.groups)) * 100 / maxPrizeGroupOddCount
    },
    rebateStep () {
      if (this.availablePrizeGroups instanceof Array && this.availablePrizeGroups.length === 0) return 1
      const groups = this.availablePrizeGroups.groups
      return (Math.max.apply(this, groups) - Math.min.apply(this, groups)) / (groups.length - 1) * 100 / maxPrizeGroupOddCount
    }
  },
  watch: {
    handicapQuickAmount (val) {
      this.quickAmount = val
    },
    quickAmount (val) {
      this.$store.commit(SET_QUICK_SELECT_AMOUNT, val)
    },
    availablePrizeGroups: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          this.rebate = this.minRebate
        })
      }
    },
    rebate (val) {
      this.$store.commit(SET_HANDICAP_CHOICE_BONUS, this.userInfo['prize_group'] - val * maxPrizeGroupOddCount / 100)
    }
  },
  created () {
  }
}
