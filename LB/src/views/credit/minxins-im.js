import exampleIcon from '../../statics/img/example_icon.png'
import rightIcon from '../../statics/img/right_icon_smp.png'
import downloadIcon from '../../statics/img/download_icon_yellow.png'
import addIcon from '../../statics/img/add_icon_yellow.png'

import { mapGetters } from 'vuex'
import { SWITCH_CHOICE_SHOW, SET_LR_PLAY, SET_YL_PLAY, SET_SSC_SELECTED_COUNTS,
  SET_IM_LOTTERY_NUMBER, SET_IM_LOTTERY_BOX_SHOW, SET_IM_GAME_OPENING_STATUS,
  SET_IM_NOW_GAME_TYPE, SET_IM_NOW_OPEN_COUNTS } from '../../store/nameSpace'
import { maxPrizeGroupOddCount } from '../../config/game-default-config'
import { getRound, shallowCopy } from '../../util'
import { betImInCommon } from '../../components/game-alert/statics/js/util'

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
      maxMultiple: 1
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
      'imGameIsOpening',
      'showLrPlay',
      'showYlPlay',
      'sscAwardInfo',
      'lotteryId',
      'imNowOpenCounts',
      'defaultSetting'
    ]),
    selectedMoney () {
      return getRound(this.selectedCounts * this.coefficient * 2 * this.multiple, 5)
    }
  },
  methods: {
    choiceNumberReset () {
      if (this.imGameIsOpening) return
      this.$store.dispatch('clearSelectedBalls')
      this.$store.commit(SET_IM_LOTTERY_BOX_SHOW, false)
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
    betNow (isFirst) {
      // 投注驳回的条件是当前正在处于开奖阶段且是用户点击的立即投注按钮
      if (this.imGameIsOpening && isFirst) return
      this.getNumberListInView()
        .then(data => {
          if (isFirst) {
            this.$loadingShow()
          }
          return betImInCommon({
            lotteryId: this.lotteryId,
            isChasingNumber: false,
            shoppingCarList: [ data ],
            mode: 'normal',
            chasingInfo: null
          })
            .then(res => {
              if (res.errno === 0) {
                if (isFirst) {
                  // 重置当前的开奖次数 必须是点击了立即投注的按钮
                  this.$store.commit(SET_IM_NOW_OPEN_COUNTS, 0)
                  // 设置当前开奖状态为true
                  this.$store.commit(SET_IM_GAME_OPENING_STATUS, true)
                  // 设置动画开关模型属性
                  this.$store.commit(SET_IM_LOTTERY_BOX_SHOW, true)
                }
                // 更新投注结果信息
                this.$store.commit(SET_IM_LOTTERY_NUMBER, res.data)
                this.$store.dispatch('getUserBalance')
                if (isFirst) {
                  this.$loadingHide()
                }
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '服务器错误',
                type: 'error'
              })
              if (isFirst) {
                this.$loadingHide()
              }
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
      let nowGameType = ''
      const nowData = this.$route.matched.find(item => {
        return new RegExp(item.regex).test(this.$route.path)
      }).name.split('_')
      const nowTypeName = nowData[2]
      const nowLinkName = nowData[3]
      const nowMenuName = nowData[1]
      this.childPlayList = this.menuList.find(item => {
        if (item['name_en'] === nowMenuName) {
          nowGameType += item['name_cn']
          return true
        }
      }).children
      this.childPlayList.map((item, index) => {
        item.children.map((itemInner, indexInner) => {
          if (nowTypeName === item['name_en'] && nowLinkName === itemInner['name_en']) {
            nowGameType += item['name_cn']
            nowGameType += `-${itemInner['name_cn']}`
            this.gameRuleTxtBet = itemInner['bet_note']
            this.gameRuleTxtBonus = itemInner['bonus_note']
            this.maxMultiple = itemInner['max_multiple']
            return this.$set(this.childPlayList[index].children[indexInner], 'isSelected', true)
          }
          this.$set(this.childPlayList[index].children[indexInner], 'isSelected', false)
        })
      })
      this.$store.commit(SET_IM_NOW_GAME_TYPE, nowGameType)
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
    imNowOpenCounts (val) {
      if (val === 0) return
      if (val >= this.lotteryCount || (typeof val === 'string' && val === 'stopAndWin')) {
        return this.$store.commit(SET_IM_GAME_OPENING_STATUS, false)
      }
      this.betNow()
    },
    userInfo () {
      this.getBonusGroup()
    },
    availablePrizeGroups () {
      this.getBonusGroup()
    },
    defaultSetting () {
      this.getBetSettings()
    }
  },
  created () {
    this.getBetSettings()
    this.getBonusGroup()
    if (!this.isGettingData) this.getChildrenMenuList()
  }
}
