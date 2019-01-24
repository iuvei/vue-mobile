import { Message, Loading } from 'element-ui'
import Vm from '../../main'
import router from '../../router'
import {
  SET_BETTING_RECORD_COUNT, SET_RECORD_DATA_LIST, SET_RANKING_DATA_SHOW,
  SET_QUICK_SELECT_AMOUNT, SET_HANDICAP_CHOICE_WAY, SET_SELECT_DEFAULT_DATA,
  SET_PLAY_TYPE_LIST, SET_LANG, SET_LAST_WN_NUMBER, SET_PK10_SHOW_STATUS,
  SET_GETTING_DATA_STATUS, SET_HANDICAP_CHOICE_BONUS, SET_CUSTOMER_SERVICE_INFO,
  SET_DEVICE, SET_IS_FIRST_ENTER, SET_SCREEN_STATUS
} from '../nameSpace'
import { getProjectList, getTraceList } from '@/api/game/game'
import { GetClientServices } from '@/api/basic/basic'
import { bettingRecordTablePageSize, loaddingOptions } from '../../config/game-default-config'
import { saveSelectAmountData } from '../../util/user'
import { getLang, saveLang } from '../../util/lang'
import i18n from '../../lang'

let isGettingCustomerServiceInfo = false
export default {
  state: {
    lang: getLang() || 'zh',
    nowShowTab: 0,
    recordTableDataList: [],
    rankingDataShow: 0,
    handicapQuickAmount: 2,
    handicapChoiceWay: 0,
    quickSelectAmountData: null,
    isGettingData: false,
    handicapChoiceBonus: 0,
    customerServiceInfo: null,
    // 当前的屏幕状态尺寸控制变量
    // 0 - > 最大尺寸 即大于 1200
    // 1 - > 二号尺寸 即大于 992 且 小于 1200
    // 2 - > 三号尺寸 即大于 767 且 小于 992
    // 3 - > 四号尺寸 即小于 767
    nowScreenStatus: 0,
    device: 'PC',
    isFirstEnter: true
  },
  mutations: {
    [ SET_LANG ] (state, lang) {
      state.lang = lang
      saveLang(lang)
      i18n.locale = lang
    },
    [ SET_BETTING_RECORD_COUNT ] (state, nowShowTab) {
      state.nowShowTab = nowShowTab
    },
    [ SET_RECORD_DATA_LIST ] (state, recordTableDataList) {
      state.recordTableDataList = recordTableDataList
    },
    [ SET_RANKING_DATA_SHOW ] (state, rankingDataShow) {
      state.rankingDataShow = rankingDataShow
    },
    [ SET_QUICK_SELECT_AMOUNT ] (state, handicapQuickAmount) {
      state.handicapQuickAmount = handicapQuickAmount
    },
    [ SET_HANDICAP_CHOICE_WAY ] (state, handicapChoiceWay) {
      state.handicapChoiceWay = handicapChoiceWay
    },
    [ SET_SELECT_DEFAULT_DATA ] (state, quickSelectAmountData) {
      saveSelectAmountData(quickSelectAmountData)
      state.quickSelectAmountData = quickSelectAmountData
    },
    [ SET_GETTING_DATA_STATUS ] (state, isGettingData) {
      state.isGettingData = isGettingData
    },
    [ SET_HANDICAP_CHOICE_BONUS ] (state, handicapChoiceBonus) {
      state.handicapChoiceBonus = handicapChoiceBonus
    },
    [ SET_CUSTOMER_SERVICE_INFO ] (state, customerServiceInfo) {
      state.customerServiceInfo = customerServiceInfo
    },
    [SET_DEVICE] (state, deviceInfo) {
      state.device = deviceInfo
    },
    [ SET_IS_FIRST_ENTER ] (state, isFirstEnter) {
      state.isFirstEnter = isFirstEnter
    },
    [ SET_SCREEN_STATUS ] (state, nowScreenStatus) {
      state.nowScreenStatus = nowScreenStatus
    }
  },
  actions: {
    getCustomerServiceInfo ({ commit }) {
      if (isGettingCustomerServiceInfo) return
      isGettingCustomerServiceInfo = true
      //  设置当前的客服列表
      GetClientServices()
        .then(res => {
          if (res.errno === 0) {
            console.log(res)
            commit(SET_CUSTOMER_SERVICE_INFO, res.data)
          }
          isGettingCustomerServiceInfo = false
        })
        .catch(err => {
          console.log(err)
          isGettingCustomerServiceInfo = false
        })
    },
    playTypeGame ({ commit, dispatch, getters }, paramsObj) {
      const lotteryBeforeId = getters.lotteryId || false
      Vm.$loadingShow()
      if (paramsObj && paramsObj.isJump) {
        commit(SET_GETTING_DATA_STATUS, true)
        const { lotteryId } = paramsObj
        let menuLink
        let upperName
        let flag
        for (let key in getters.szcpMenuList) {
          if (flag) break
          for (let keyInner in getters.szcpMenuList[key]['lotteries']) {
            if (flag) break
            if (+lotteryId === +keyInner) {
              menuLink = getters.szcpMenuList[key]['lotteries'][keyInner]
              upperName = key
              flag = true
            }
          }
        }
        if (!getters.isLogin) {
          Vm.$loadingHide()
          router.push('/index')
          return Message({ message: '请先登录!', type: 'error' })
        }
        // 获取当前彩种的详细信息
        // 放开相同彩种的跳转限制
        /* if (+lotteryId === +getters.lotteryId) {
          Vm.$loadingHide()
          commit(SET_GETTING_DATA_STATUS, false)
          return
        } */
        if (upperName === 'PK10') commit(SET_PK10_SHOW_STATUS, 0)
        Promise.all([
          dispatch('getWaySettings', lotteryId),
          // 获取信用玩法的菜单列表
          dispatch('getCreditWaySettings', lotteryId)
        ])
          .then((menus) => {
            const typeArr = []
            const creditMenuInfo = menus[1]
            const menuInfo = menus[0]
            /* if (menuInfo.errno !== 0 && creditMenuInfo.errno !== 0) {
              Message({
                message: '所选游戏已关闭',
                type: 'error'
              })
              return Promise.reject(new Error())
            } */
            // 取消双必需判定 如果后台未返回官方玩法菜单则判定当前彩种为非可玩彩种
            if (menuInfo.errno !== 0) {
              Message({
                message: '所选游戏已关闭',
                type: 'error'
              })
              return Promise.reject(new Error())
            }
            typeArr.push({ label: '标准', value: 'normal', toName: `${upperName}Normal` })
            if (creditMenuInfo.errno === 0) {
              typeArr.push({ label: '盘口', value: 'normal', toName: `${upperName}Handicap` })
            }
            commit(SET_PLAY_TYPE_LIST, typeArr)
          })
          .then(() => {
            return dispatch('getNowGameDetail', lotteryId)
          })
          .then(() => {
            const { status } = getters.gameDetail
            dispatch('clearCurrentIssue')
            const { is_tester: isTester } = getters.userInfo
            if (status === 3 || (status === 1 && isTester)) {
              if (getters.gameDetail['is_instant']) {
                Vm.$nextTick(() => {
                  commit(SET_LAST_WN_NUMBER, {
                    'issue': 'loading...',
                    'wn_number': ''
                  })
                  commit(SET_GETTING_DATA_STATUS, false)
                  // dispatch('clearCurrentIssue')
                  router.push({ name: upperName + '-IM', params: { gameTypeName: menuLink.identifier } })
                })
                return Promise.resolve('即开型彩种')
              }
              Vm.$nextTick(() => {
                commit(SET_LAST_WN_NUMBER, {
                  'issue': 'loading...',
                  'wn_number': ''
                })
                commit(SET_GETTING_DATA_STATUS, false)
                router.push({ name: upperName, params: { gameTypeName: paramsObj.menuLink.identifier } })
              })
              Promise.resolve()
            } else {
              Message({
                message: `该游戏当前不可用`,
                type: 'error'
              })
              commit(SET_GETTING_DATA_STATUS, false)
              return Promise.reject(new Error())
            }
          })
          .catch(err => {
            Promise.reject(err)
            commit(SET_GETTING_DATA_STATUS, false)
            if (lotteryBeforeId) {
              return dispatch('playTypeGame', { lotteryId: lotteryBeforeId, isJump: true })
            }
          })
          .then((isIm) => {
            if (isIm) return Promise.resolve()
            if (isIm) {
              return dispatch('getBetSettings')
            }
            return Promise.all([
              dispatch('getCurrentIssue'),
              dispatch('getBetSettings'),
              dispatch('getLastWnNumberList', { firstEnter: true })
            ])
          })
          .then(() => {
            commit(SET_GETTING_DATA_STATUS, false)
            Vm.$loadingHide()
          })
      } else {
        Promise.all([
          dispatch('getCurrentIssue'),
          dispatch('getLastWnNumberList', { firstEnter: true }),
          dispatch('getAvailablePrizeGroups'),
          dispatch('getNowGameDetail', getters.lotteryId)
        ])
          .then(() => {
            Vm.$loadingHide()
          })
      }
    },
    getBettingRecordList ({ commit, getters, dispatch }, {isClick, isOpenType}) {
      // commit(SET_RECORD_DATA_LIST, [])
      loaddingOptions.background = 'rgba(255,255,255,0.8)'
      switch (getters.bettingRecordShow) {
        case 0:
          dispatch('getNoteRecordList', {isClick, isOpenType})
          break
        case 1:
          dispatch('getChasingNumberList', {isClick})
          break
        case 2:
          dispatch('getUnopenedRecordList', {isClick})
          break
      }
    },
    getNoteRecordList ({ commit, getters }, {isClick, isOpenType}) {
      loaddingOptions.target = document.querySelector('.record-table')
      if (isClick) var loadingInstance = Loading.service(loaddingOptions)
      return new Promise((resolve, reject) => {
        let lotteryId
        if (isOpenType === true) {
          lotteryId = getters.lotteryId
        } else {
          lotteryId = undefined
        }
        getProjectList(lotteryId, 1, bettingRecordTablePageSize.pageSize)
          .then(res => {
            if (isClick) loadingInstance.close()
            if (res.errno === 0) {
              commit(SET_RECORD_DATA_LIST, res.data)
              resolve(res)
            } else {
              reject(new Error())
            }
          })
          .catch(err => reject(err))
      })
    },
    getUnopenedRecordList ({ commit }, {isClick}) {
      loaddingOptions.target = document.querySelector('.record-table')
      if (isClick) var loadingInstance = Loading.service(loaddingOptions)
      return new Promise((resolve, reject) => {
        getProjectList(undefined, 1, bettingRecordTablePageSize.pageSize, 0)
          .then(res => {
            if (isClick) loadingInstance.close()
            if (res.errno === 0) {
              commit(SET_RECORD_DATA_LIST, res.data)
              resolve(res)
            } else {
              reject(new Error())
            }
          })
          .catch(err => reject(err))
      })
    },
    getChasingNumberList ({ commit }, {isClick}) {
      loaddingOptions.target = document.querySelector('.record-table')
      if (isClick) var loadingInstance = Loading.service(loaddingOptions)
      return new Promise((resolve, reject) => {
        getTraceList(undefined, 1, bettingRecordTablePageSize.pageSize)
          .then(res => {
            if (isClick) loadingInstance.close()
            if (res.errno === 0) {
              commit(SET_RECORD_DATA_LIST, res.data)
              resolve(res)
            } else {
              reject(new Error())
            }
          })
          .catch(err => reject(err))
      })
    }
  }
}
