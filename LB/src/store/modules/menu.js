import { SET_MENU, SET_LOTTERY_ID, SET_SZCP_MENU_LIST, CLOSE_CHASING_BOX,
  SET_LIKE_GAMES_IN_ALL_GAME, SET_CREDIT_MENU, SET_PLAY_TYPE_LIST,
  SET_SHOW_MENU_LIST, CLOSE_CREATE_NUMBER_BOX } from '../nameSpace'
import { saveMenu, saveCreditMenu, saveTypeList } from '../../util/menu'
import { getWaySettings, getCreditWaySettings } from '@/api/game/game'

export default {
  state: {
    menu: null,
    szcpMenuList: null,
    isChasingShow: false,
    creditMenu: null,
    playTypeList: null,
    showMenuList: [],
    isCreateNumber: false
  },
  mutations: {
    [ SET_MENU ] (state, menu) {
      state.menu = menu
      saveMenu(menu)
    },
    [ SET_SZCP_MENU_LIST ] (state, menuList) {
      state.szcpMenuList = menuList
    },
    [ CLOSE_CHASING_BOX ] (state, isChasingShow) {
      state.isChasingShow = isChasingShow
    },
    [ CLOSE_CREATE_NUMBER_BOX ] (state, isCreateNumber) {
      state.isCreateNumber = isCreateNumber
    },
    [ SET_LIKE_GAMES_IN_ALL_GAME ] (state, likeList) {
      if (likeList && likeList.length) {
        for (let key in state.szcpMenuList) {
          for (let keyInner in state.szcpMenuList[key]['lotteries']) {
            const gameItem = state.szcpMenuList[key]['lotteries'][keyInner]
            if (
              !likeList.find(item => {
                if (`${item.lottery_id}` === keyInner) {
                  gameItem.isLike = true
                  return true
                }
              })
            ) gameItem.isLike = false
          }
        }
      }
    },
    [ SET_CREDIT_MENU ] (state, creditMenu) {
      state.creditMenu = creditMenu
      saveCreditMenu(creditMenu)
    },
    [ SET_PLAY_TYPE_LIST ] (state, playTypeList) {
      state.playTypeList = playTypeList
      saveTypeList(playTypeList)
    },
    [ SET_SHOW_MENU_LIST ] (state, showMenuList) {
      state.showMenuList = showMenuList
    }
  },
  actions: {
    getWaySettings ({ commit }, lotteryId) {
      return new Promise((resolve, reject) => {
        getWaySettings(lotteryId)
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              commit(SET_MENU, data)
              commit(SET_LOTTERY_ID, +lotteryId)
              resolve(res)
            } else {
              resolve(res)
            }
          })
          .catch(err => reject(err))
      })
    },
    getCreditWaySettings ({ commit }, lotteryId) {
      return new Promise((resolve, reject) => {
        getCreditWaySettings(lotteryId)
          .then(res => {
            if (res.errno === 0) {
              commit(SET_CREDIT_MENU, res.data)
              resolve(res)
            } else {
              commit(SET_CREDIT_MENU, [])
              resolve(res)
            }
          })
          .catch(err => reject(err))
      })
    }
  }
}
