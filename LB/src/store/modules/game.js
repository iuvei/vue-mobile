import { GetAvailablePrizeGroups, getWnNumberList, getFavoritesLottery,
  getGameDetail, getBetSettings } from '@/api/game/game'
import {
  SET_LOTTERY_ID, SET_PRIZE_GROUPS, SWITCH_CHOICE_SHOW, ADD_NEW_SHOPPING_CAR_ITEM,
  SET_YL_PLAY, SET_LR_PLAY, CLEAR_SHOPPING_CAR, DELETE_SHOPPING_ITEM, SET_RECENT_WN_NUMBER_LIST,
  SET_DEFAULT_SETTING, SET_OFTEN_PLAY_TYPES, SET_LIKE_GAMES_IN_ALL_GAME, SET_GAME_DETAIL_INFO,
  SET_PK10_SHOW_STATUS, SET_LAST_WN_NUMBER, SET_IM_LOTTERY_NUMBER, SET_IM_LOTTERY_BOX_SHOW,
  SET_IM_SHOW_BOX_HEIGHT, SET_IM_GAME_OPENING_STATUS, SET_IM_NOW_GAME_TYPE, SET_IM_NOW_OPEN_COUNTS,
  SET_PRIZE_PATH, SET_STOP_VOICE_END, SET_STOP_VOICE_END_TWO, SET_COEFFICIENT_IN_GAME, SET_MULTIPLE_IN_GAME,
  SET_BONUS_GROUP_IN_GAME
} from '../nameSpace'
import { saveLotteryId } from '../../util/menu'
import { showWnNumberCount } from '../../config/game-default-config'
import { prizeVoice } from '../../config/audio-config'
let likeGameTimeBegin = {}
let getLastWnNumberTimer
export default {
  state: {
    lotteryId: '',
    availablePrizeGroups: [],
    isChoiceShow: false,
    shoppingCarList: [],
    showYlPlay: true,
    showLrPlay: true,
    recentWnNumberList: [],
    defaultSetting: null,
    oftenPlayTypes: [],
    gameDetail: {},
    // 0 待开奖 1 马上开奖 2 已开奖
    pk10ShowStatus: null,
    lotteryNumberLastImInfo: '',
    isImShowBox: false,
    imLastShowHeight: '',
    imGameIsOpening: false,
    imNowGameTypeName: '',
    imNowOpenCounts: 0,
    prizeVoicePath: prizeVoice[12].path,
    stopVoiceEnd: false,
    stopVoiceEndTwo: false,
    getBonusGroupInGame: '',
    getMultipleInGame: 1,
    getCoefficientInGame: ''
  },
  mutations: {
    [ SET_PK10_SHOW_STATUS ] (state, pk10ShowStatus) {
      state.pk10ShowStatus = pk10ShowStatus
    },
    [ SET_LOTTERY_ID ] (state, lotteryId) {
      state.lotteryId = lotteryId
      saveLotteryId(lotteryId)
    },
    [ SET_PRIZE_GROUPS ] (state, availablePrizeGroups) {
      availablePrizeGroups.groups = availablePrizeGroups.groups.map(item => +item)
      state.availablePrizeGroups = availablePrizeGroups
    },
    [ SWITCH_CHOICE_SHOW ] (state) {
      state.isChoiceShow = true
    },
    [ ADD_NEW_SHOPPING_CAR_ITEM ] (state, shoppingItem) {
      state.shoppingCarList.unshift(shoppingItem)
    },
    [ SET_YL_PLAY ] (state) {
      state.showYlPlay = !state.showYlPlay
    },
    [ SET_LR_PLAY ] (state) {
      state.showLrPlay = !state.showLrPlay
    },
    [ CLEAR_SHOPPING_CAR ] (state) {
      state.shoppingCarList = []
    },
    [ DELETE_SHOPPING_ITEM ] (state, index) {
      state.shoppingCarList.splice(index, 1)
    },
    [ SET_RECENT_WN_NUMBER_LIST ] (state, recentWnNumberList) {
      state.recentWnNumberList = recentWnNumberList
    },
    [ SET_DEFAULT_SETTING ] (state, defaultSetting) {
      state.defaultSetting = defaultSetting
    },
    [ SET_OFTEN_PLAY_TYPES ] (state, oftenPlayTypeList) {
      state.oftenPlayTypes = oftenPlayTypeList
    },
    [ SET_GAME_DETAIL_INFO ] (state, gameDetail) {
      state.gameDetail = gameDetail
    },
    [ SET_IM_LOTTERY_NUMBER ] (state, wnNumberInfo) {
      state.lotteryNumberLastImInfo = wnNumberInfo
    },
    [ SET_IM_LOTTERY_BOX_SHOW ] (state, isImShowBox) {
      state.isImShowBox = isImShowBox
    },
    [ SET_IM_SHOW_BOX_HEIGHT ] (state, height) {
      state.imLastShowHeight = height
    },
    [ SET_IM_GAME_OPENING_STATUS ] (state, imGameIsOpening) {
      state.imGameIsOpening = imGameIsOpening
    },
    [ SET_IM_NOW_GAME_TYPE ] (state, imNowGameTypeName) {
      state.imNowGameTypeName = imNowGameTypeName
    },
    [ SET_IM_NOW_OPEN_COUNTS ] (state, imNowOpenCounts) {
      state.imNowOpenCounts = imNowOpenCounts
    },
    [ SET_PRIZE_PATH ] (state, prizeVoicePath) {
      state.prizeVoicePath = prizeVoicePath
    },
    [ SET_STOP_VOICE_END ] (state, stopVoiceEnd) {
      state.stopVoiceEnd = stopVoiceEnd
    },
    [ SET_STOP_VOICE_END_TWO ] (state, stopVoiceEndTwo) {
      state.stopVoiceEndTwo = stopVoiceEndTwo
    },
    [ SET_COEFFICIENT_IN_GAME ] (state, getCoefficientInGame) {
      state.getCoefficientInGame = getCoefficientInGame
    },
    [ SET_MULTIPLE_IN_GAME ] (state, getMultipleInGame) {
      state.getMultipleInGame = getMultipleInGame
    },
    [ SET_BONUS_GROUP_IN_GAME ] (state, getBonusGroupInGame) {
      state.getBonusGroupInGame = getBonusGroupInGame
    }
  },
  actions: {
    getBetSettings ({ commit, getters }) {
      console.log('获取设置信息请求执行了一次')
      return new Promise((resolve, reject) => {
        getBetSettings(getters.lotteryId)
          .then(res => {
            const { errno, data } = res
            console.log(res)
            if (errno === 0) {
              commit(SET_DEFAULT_SETTING, data)
              resolve(res)
            } else {
              reject(new Error(res))
            }
          })
          .catch(err => reject(err))
      })
    },
    getAvailablePrizeGroups ({ commit, getters }) {
      return new Promise((resolve, reject) => {
        GetAvailablePrizeGroups(+getters.lotteryId)
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              const arr = []
              const { max, min, step } = data
              for (let i = +max; i >= min; i -= step) {
                arr.push(i)
              }
              data.groups = arr
              commit(SET_PRIZE_GROUPS, data)
              resolve(res)
            } else {
              reject(new Error(res))
            }
          })
          .catch(err => reject(err))
      })
    },
    getLastWnNumberList ({ commit, getters, dispatch }, params = {}) {
      const { firstEnter } = params
      return new Promise((resolve, reject) => {
        getWnNumberList(getters.lotteryId, showWnNumberCount)
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              if (!data[0]['wn_number']) {
                if (getLastWnNumberTimer) clearTimeout(getLastWnNumberTimer)
                getLastWnNumberTimer = setTimeout(() => {
                  dispatch('getLastWnNumberList', { firstEnter })
                }, 1000)
                // 封单声音
                commit(SET_STOP_VOICE_END_TWO, true)
              } else {
                // console.log(getters.lotteryId)
                if (getters.lotteryId !== '19' && getters.lotteryId !== 19 && getters.lotteryId !== 10 && getters.lotteryId !== '10') {
                  console.log('line165 拿到数据 ' + data[0]['wn_number'])
                  commit(SET_LAST_WN_NUMBER, data[0])
                  commit(SET_STOP_VOICE_END_TWO, false)
                }
              }
              if (typeof getters.pk10ShowStatus === 'number' && firstEnter && data[0]['wn_number']) {
                commit(SET_RECENT_WN_NUMBER_LIST, data)
                commit(SET_LAST_WN_NUMBER, data[0])
                commit(SET_PK10_SHOW_STATUS, 2)
                return resolve(data)
              }
              if (typeof getters.pk10ShowStatus === 'number' && !firstEnter && !data[0]['wn_number']) {
                commit(SET_RECENT_WN_NUMBER_LIST, data)
                commit(SET_LAST_WN_NUMBER, data[0])
                commit(SET_PK10_SHOW_STATUS, 0)
                return resolve(data)
              }
              if (typeof getters.pk10ShowStatus === 'number' && !firstEnter && data[0]['wn_number']) {
                commit(SET_PK10_SHOW_STATUS, 1)
                commit(SET_LAST_WN_NUMBER, { issue: data[0].issue })
                setTimeout(() => {
                  commit(SET_PK10_SHOW_STATUS, 2)
                  commit(SET_LAST_WN_NUMBER, data[0])
                  commit(SET_RECENT_WN_NUMBER_LIST, data)
                  if (getters.pk10ShowStatus === 2) {
                    if (getters.lotteryId === '19' || getters.lotteryId === 19 || getters.lotteryId === '10' || getters.lotteryId === 10) {
                      console.log(getters.sscLastWnNumber)
                      commit(SET_STOP_VOICE_END_TWO, false)
                      console.log('設置pk10播音状态为false line 190')
                    }
                  }
                }, 5000)
                return resolve(data)
              }
              commit(SET_RECENT_WN_NUMBER_LIST, data)
              commit(SET_LAST_WN_NUMBER, data[0])
              resolve(data)
            } else {
              reject(new Error())
            }
          })
          .catch(err => reject(err))
      })
    },
    getOftenPlayTypeList ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getFavoritesLottery()
          .then(res => {
            if (typeof likeGameTimeBegin === 'object') {
              for (let key in likeGameTimeBegin) {
                clearInterval(likeGameTimeBegin[key])
              }
            }
            const { errno, data } = res
            if (errno === 0) {
              likeGameTimeBegin = {}
              data.map((item, index) => {
                if (item.other instanceof Array) {
                  return
                }
                const timerName = `time${index}`
                likeGameTimeBegin[timerName] = ''
                item.other.server_time = new Date(item.other.server_time).getTime()
                item.other.end_time = new Date(item.other.end_time).getTime()
                likeGameTimeBegin[ timerName ] = setInterval(() => {
                  item.other.server_time += 1000
                  let interval = item.other.end_time - item.other.server_time
                  if ((interval >= 0 && interval < 1000) || interval < 0) {
                    interval = 0
                    dispatch('getOftenPlayTypeList')
                    return
                  }
                  const hour = parseInt(interval / 1000 / 60 / 60 % 24)
                  const min = parseInt(interval / 1000 / 60 % 60)
                  const sec = parseInt(interval / 1000 % 60)
                  item.gameBeginTime = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
                  commit(SET_OFTEN_PLAY_TYPES, data)
                }, 1000)
              })
              commit(SET_LIKE_GAMES_IN_ALL_GAME, data)
              resolve(data)
              return
            }
            reject(new Error(res))
          })
      })
    },
    getNowGameDetail ({ commit, getters }, lotteryId) {
      return new Promise((resolve, reject) => {
        getGameDetail(lotteryId)
          .then(res => {
            if (res.errno === 0) {
              commit(SET_GAME_DETAIL_INFO, res.data)
              resolve(res)
            } else {
              reject(new Error(res))
            }
          })
          .catch(err => reject(err))
      })
    },
    closeOftenGameList ({ commit }) {
      if (typeof likeGameTimeBegin === 'object') {
        for (let key in likeGameTimeBegin) {
          clearInterval(likeGameTimeBegin[key])
        }
      }
      commit(SET_OFTEN_PLAY_TYPES, [])
    }
  }
}
