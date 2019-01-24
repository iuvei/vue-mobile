import { amountSelectData } from '../config/game-default-config'
import store from '../store'
import { SET_SELECT_DEFAULT_DATA } from '../store/nameSpace'

const __USER_KEY__ = 'userInfo'
const __AMOUNT_DATA_KEY__ = 'amount-select-data-default'

export function getUserInfo () {
  return JSON.parse(window.sessionStorage.getItem(__USER_KEY__))
}

export function saveUserInfo (userInfo) {
  return window.sessionStorage.setItem(__USER_KEY__, JSON.stringify(userInfo))
}
export function delUserInfo () {
  return window.sessionStorage.removeItem(__USER_KEY__)
}
export function getSelectAmountData () {
  const amountData = JSON.parse(window.localStorage.getItem(__AMOUNT_DATA_KEY__)) || amountSelectData
  store.commit(SET_SELECT_DEFAULT_DATA, amountData)
  return amountData
}
export function saveSelectAmountData (data) {
  return window.localStorage.setItem(__AMOUNT_DATA_KEY__, JSON.stringify(data))
}
