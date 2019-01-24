import exampleIcon from '../../statics/img/example_icon.png'
import rightIcon from '../../statics/img/right_icon_smp.png'
import downloadIcon from '../../statics/img/download_icon_yellow.png'
import addIcon from '../../statics/img/add_icon_yellow.png'

import { mapGetters } from 'vuex'
import { SWITCH_CHOICE_SHOW, ADD_NEW_SHOPPING_CAR_ITEM, SET_LR_PLAY, SET_YL_PLAY,
  SET_SSC_SELECTED_COUNTS, SET_COEFFICIENT_IN_GAME, SET_MULTIPLE_IN_GAME,
  SET_BONUS_GROUP_IN_GAME } from '../../store/nameSpace'
import { maxPrizeGroupOddCount } from '../../config/game-default-config'
import { getRound, shallowCopy } from '../../util'
import { betInCommon } from '../../components/game-alert/statics/js/util'

export default {
  data () {
    return {
      exampleIcon,
      rightIcon,
      addIcon,
      downloadIcon,
      maxPrizeGroupOddCount,
      SWITCH_CHOICE_SHOW,
      SET_LR_PLAY,
      SET_YL_PLAY,
      childPlayList: [],
      flagCount: 0,
      getListShoppingCar: [],
      betNoteCounts: 0,
      sortType: false,
      gameRuleTxtBet: '',
      gameRuleTxtBonus: '',
      bonusGroup: '',
      multiple: 1,
      minMultiple: 1,
      coefficient: '',
      coefficientList: {},
      extra: '',
      maxMultiple: 1,
      routeName: '',
      enAbled: 0
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu',
      selectedCounts: 'sscSelectedCounts'
    }),
    ...mapGetters([
      'availablePrizeGroups',
      'isGettingData',
      'userInfo',
      'szcpMenuList',
      'showLrPlay',
      'showYlPlay',
      'sscAwardInfo',
      'lotteryId',
      'defaultSetting'
    ]),
    selectedMoney () {
      return getRound(this.selectedCounts * this.coefficient * 2 * this.multiple, 5)
    }
  },
  methods: {
    doDocumentary () {
      this.getNumberListInView()
        .then((data) => {
          this.$gameAlertFqgd({
            shoppingCarList: [ data ]
          })
        })
    },
    getBonusGroup () {
      const prizeGroup = +this.userInfo['prize_group']
      const groups = this.availablePrizeGroups.groups
      if (prizeGroup && groups) {
        const maxGroup = Math.max.apply(this, groups)
        this.bonusGroup = maxGroup < prizeGroup ? maxGroup : prizeGroup
        return
      }
      this.bonusGroup = 'loading...'
    },
    chasingNumber () {
      this.$loadingShow()
      this.getNumberListInView()
        .then(data => {
          if (!data) return
          return this.$store.dispatch('getBetSettings')
            .then(() => Promise.resolve(data))
            .catch(err => Promise.reject(err))
        })
        .catch(err => {
          console.log(err)
          this.$loadingHide()
        })
        .then(data => {
          if (!data) return
          this.$gameAlertKszh({
            betInfo: data,
            defaultSetting: this.defaultSetting,
            rootEl: this.$root.$el
          })
          this.$loadingHide()
        })
    },
    betNow () {
      this.getNumberListInView()
        .then(data => {
          const { bet_confirm: betConfirm } = this.defaultSetting
          if (!betConfirm) {
            this.$loadingShow()
            return betInCommon({
              lotteryId: this.lotteryId,
              isChasingNumber: false,
              shoppingCarList: [ data ],
              mode: 'normal',
              chasingInfo: null
            })
              .then(res => {
                if (res.errno === 0) {
                  this.$message({
                    message: '投注成功',
                    type: 'success'
                  })
                }
                this.$store.dispatch('getUserBalance')
                this.$store.dispatch('clearSelectedBalls')
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
            shoppingCarList: [ data ],
            lotteryId: this.lotteryId,
            rootEl: this.$root.$el,
            isClearShoppingCar: false
          })
        })
    },
    getNumberListInView () {
      return new Promise((resolve, reject) => {
        this.flagCount++
        this.$nextTick(() => {
          if (!this.getListShoppingCar || !this.getListShoppingCar.length) {
            this.$message({
              message: '请选择正确的号码后重试',
              type: 'error'
            })
            return reject(new Error())
          }
          if (!this.selectedCounts) {
            this.$message({
              message: '请选择正确的号码后重试',
              type: 'error'
            })
            return reject(new Error())
          }
          const szcpMenuList = this.szcpMenuList
          const gameTypeName = this.$route.params['gameTypeName']
          let lotteryName
          let tabName
          let typeName
          let playTypeItemId
          let price
          let prize
          let maxMultiple
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
          this.menuList.find(item => {
            if (item['name_en'] === this.$route.matched[4].meta.sub_path) {
              tabName = item['name_cn']
              return true
            }
          })
          this.childPlayList.find(item => {
            return item.children.find(itemInner => {
              if (itemInner.isSelected) {
                typeName = itemInner['name_cn']
                playTypeItemId = itemInner.id
                price = itemInner['price']
                prize = itemInner['prize']
                maxMultiple = itemInner['max_multiple']
                return true
              }
            })
          })
          resolve({
            lotteryName,
            lotteryId: this.lotteryId,
            tabName,
            typeName,
            price,
            prize,
            playTypeItemId,
            maxMultiple,
            sortType: this.sortType,
            extra: this.extra,
            maxPrizeGroupKey: Math.max.apply(this, this.availablePrizeGroups.groups),
            awardInfo: shallowCopy(this.sscAwardInfo),
            numberList: this.getListShoppingCar.slice(),
            betNoteCounts: this.betNoteCounts,
            bonusGroup: this.bonusGroup,
            selectedCounts: this.selectedCounts,
            multiple: this.multiple,
            coefficient: this.coefficient,
            coefficientLabel: this.coefficientList[this.coefficient],
            selectedMoney: this.selectedMoney
          })
          this.getListShoppingCar = []
        })
      })
    },
    getChildrenMenuList () {
      const nowData = this.$route.matched.find(item => {
        return new RegExp(item.regex).test(this.$route.path)
      }).name.split('_')
      const nowTypeName = nowData[2]
      const nowLinkName = nowData[3]
      const nowMenuName = nowData[1]
      this.childPlayList = this.menuList.find(item => {
        // return item['name_en'] === this.$route.matched[4].meta.sub_path
        return item['name_en'] === nowMenuName
      }).children
      this.childPlayList.map((item, index) => {
        item.children.map((itemInner, indexInner) => {
          if (nowTypeName === item['name_en'] && nowLinkName === itemInner['name_en']) {
            this.gameRuleTxtBet = itemInner['bet_note']
            this.gameRuleTxtBonus = itemInner['bonus_note']
            this.maxMultiple = itemInner['max_multiple']
            return this.$set(this.childPlayList[index].children[indexInner], 'isSelected', true)
          }
          this.$set(this.childPlayList[index].children[indexInner], 'isSelected', false)
        })
      })
    },
    getShoppingCarList (carData, sortType, betNoteCounts, extra) {
      return new Promise(resolve => {
        this.getListShoppingCar = carData
        this.sortType = sortType
        this.betNoteCounts = betNoteCounts
        if (extra) {
          this.extra = extra
        } else {
          this.extra = ''
        }
        setTimeout(() => {
          resolve()
        }, 0)
      })
    },
    addShoppingCar () {
      this.getNumberListInView()
        .then(data => {
          this.$store.commit(ADD_NEW_SHOPPING_CAR_ITEM, data)
          this.$store.commit(SWITCH_CHOICE_SHOW)
          this.$store.dispatch('clearSelectedBalls')
        })
    },
    choiceGameType (item) {
      this.childPlayList.map(item => {
        item.children.map(itemInner => {
          itemInner.isSelected = false
        })
      })
      item.isSelected = true
    },
    getBetSettings () {
      if (this.defaultSetting) {
        this.enAbled = this.defaultSetting['fp_enabled']
        this.coefficientList = this.defaultSetting['coefficients']
        this.multiple = this.defaultSetting['default_multiple']
        this.coefficient = this.defaultSetting['default_coefficient']
      }
    }
  },
  watch: {
    $route () {
      this.getChildrenMenuList()
      this.$store.commit(SET_SSC_SELECTED_COUNTS, 0)
    },
    userInfo () {
      this.getBonusGroup()
    },
    availablePrizeGroups () {
      this.getBonusGroup()
    },
    defaultSetting () {
      this.getBetSettings()
    },
    bonusGroup (val) {
      this.$store.commit(SET_BONUS_GROUP_IN_GAME, val)
    },
    multiple (val) {
      this.$store.commit(SET_MULTIPLE_IN_GAME, val)
    },
    coefficient (val) {
      this.$store.commit(SET_COEFFICIENT_IN_GAME, val)
    }
  },
  created () {
    this.routeName = this.$route.name.split('_')[0]
    this.getBetSettings()
    this.getBonusGroup()
    if (!this.isGettingData) this.getChildrenMenuList()
  }
}
