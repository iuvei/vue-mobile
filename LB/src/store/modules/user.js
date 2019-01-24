import { SET_USERINFO, SET_TOKEN, SET_LOGIN_STATUS, SET_ACCOUNT_INFO } from '../nameSpace'

import { loginByUsername, logout, getCurrentUserInfo } from '../../api/login/login'

import { getAccount } from '@/api/user/user'

import { saveToken, logOut } from '../../util/auth'

import { encryptionPassword } from '../../util/encryption'

export default {
  state: {
    userInfo: {
      username: '获取中',
      abalance: '获取中'
    },
    token: '',
    isLogin: false,
    accountInfo: {
      userBalance: '获取中',
      allBalance: '获取中',
      frozenAccount: '获取中',
      prohibitAmount: '获取中'
    }
  },
  mutations: {
    [SET_USERINFO] (state, userInfo) {
      state.userInfo = userInfo
    },
    [SET_TOKEN] (state, token) {
      state.token = token
      saveToken(token)
    },
    [ SET_LOGIN_STATUS ] (state, isLogin) {
      state.isLogin = isLogin
    },
    [ SET_ACCOUNT_INFO ] (state, accountInfo) {
      state.accountInfo = accountInfo
    }
  },
  actions: {
    loginByUsername ({commit}, userInfo) {
      const { username } = userInfo
      return new Promise((resolve, reject) => {
        loginByUsername(username, encryptionPassword(userInfo))
          .then(res => {
            if (res.errno === 0) {
              commit(SET_USERINFO, res.data)
              commit(SET_TOKEN, res.data.token)
              commit(SET_LOGIN_STATUS, true)
              resolve(res)
            } else {
              resolve(res)
            }
          })
          .catch(err => reject(err))
      })
    },
    loginOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit(SET_TOKEN, '')
          commit(SET_LOGIN_STATUS, false)
          logOut()
          setTimeout(() => {
            resolve(res)
          }, 0)
        }).catch(err => {
          commit(SET_TOKEN, '')
          commit(SET_LOGIN_STATUS, false)
          logOut()
          setTimeout(() => {
            reject(err)
          })
        })
      })
    },
    updateUserInfo ({commit}) {
      return new Promise((resolve, reject) => {
        getCurrentUserInfo()
          .then(res => {
            const { errno, data } = res
            if (errno === 0) {
              commit(SET_USERINFO, data)
              commit(SET_LOGIN_STATUS, true)
              resolve(data)
            }
          })
          .catch(err => reject(err))
      })
    },
    getUserBalance ({ commit }) {
      return new Promise((resolve, reject) => {
        getAccount()
          .then(res => {
            if (res.errno === 0) {
              const {
                balance: allBalance,
                frozen: frozenAccount,
                available: userBalance,
                prohibit_amount: prohibitAmount
              } = res.data
              commit(SET_ACCOUNT_INFO, { allBalance, frozenAccount, userBalance, prohibitAmount })
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
