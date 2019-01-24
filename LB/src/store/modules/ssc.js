import {
  SET_SSC_SELECTED_COUNTS, SET_AWARD_INFO, COUNTDOWN_END_TIME,
  SET_LAST_WN_NUMBER, SET_PK10_SHOW_STATUS, RESET_NUMBERS
} from '../nameSpace'
import { getCurrentIssue, getWnNumberList } from '@/api/game/game'

let timer
let getLastWnNumberTimer
export default {
  state: {
    selectedCounts: 0,
    awardInfo: {
      end_time: '',
      server_time: '',
      issue: 'loading...'
    },
    lastWnNumber: {
      'issue': 'loading...'
    },
    clearFlag: 0
  },
  mutations: {
    [ SET_SSC_SELECTED_COUNTS ] (state, counts) {
      state.selectedCounts = counts
    },
    [ SET_AWARD_INFO ] (state, awardInfo) {
      state.awardInfo.end_time = new Date(awardInfo.end_time).getTime()
      state.awardInfo.server_time = new Date(awardInfo.server_time).getTime()
      state.awardInfo.issue = awardInfo.issue
    },
    [ COUNTDOWN_END_TIME ] (state) {
      state.awardInfo.server_time += 1000
    },
    [ SET_LAST_WN_NUMBER ] (state, lastWnNumber) {
      state.lastWnNumber = lastWnNumber
    },
    [ RESET_NUMBERS ] (state) {
      state.clearFlag++
    }
  },
  actions: {
    clearSelectedBalls ({ commit }) {
      // 清除当前已选注数
      commit(SET_SSC_SELECTED_COUNTS, 0)
      // 重置投注盘
      commit(RESET_NUMBERS)
    },
    countdownEndTime ({ commit }) {
      if (timer) {
        clearInterval(timer)
        console.log('清理循环定时器timer ssc.js')
      }
      timer = setInterval(() => {
        commit(COUNTDOWN_END_TIME)
      }, 1000)
    },
    clearCurrentIssue ({ commit }) {
      if (timer) clearInterval(timer)
      commit(SET_AWARD_INFO, {
        end_time: '',
        server_time: '',
        issue: 'loading...'
      })
    },
    getCurrentIssue ({ state, getters, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        console.log('获取最新的奖期信息接口被调用了一次')
        getCurrentIssue(getters.lotteryId)
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              commit(SET_AWARD_INFO, data)
              dispatch('countdownEndTime')
              resolve()
            }
          })
          .catch(err => reject(err))
      })
    },
    getLastWnNumber ({ commit, getters, dispatch }, params = {}) {
      const { firstEnter } = params
      return new Promise((resolve, reject) => {
        getWnNumberList(getters.lotteryId, 1)
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              if (!data[0]['wn_number']) {
                if (getLastWnNumberTimer) clearTimeout(getLastWnNumberTimer)
                getLastWnNumberTimer = setTimeout(() => {
                  dispatch('getLastWnNumber', { firstEnter })
                }, 1000)
              }
              if (typeof getters.pk10ShowStatus === 'number' && firstEnter && data[0]['wn_number']) {
                commit(SET_LAST_WN_NUMBER, data[0])
                commit(SET_PK10_SHOW_STATUS, 2)
                return resolve(data)
              }
              if (typeof getters.pk10ShowStatus === 'number' && !firstEnter && !data[0]['wn_number']) {
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
                }, 5000)
                return resolve(data)
              }
              commit(SET_LAST_WN_NUMBER, data[0])
              resolve(data)
            } else {
              reject(new Error(res))
            }
          })
          .catch(err => reject(err))
      })
    }
  }
}
