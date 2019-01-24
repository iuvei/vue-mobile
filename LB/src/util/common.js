import { openNewCustomerServiceWindowConfig } from '../config/game-default-config'
import { Message } from 'element-ui'
import store from '../store'
import route from '../router'
import {hide} from './loading'

export function openNewCustomerServiceWindow () {
  const urlInfo = store['getters'].customerServiceInfo
  if (!urlInfo) {
    Message({
      message: '没有获取到正确的客服URL',
      type: 'error'
    })
    return
  }
  const openUrl = urlInfo.find(item => item['is_default'])
  let newWindowConfigStr = ''
  for (let key in openNewCustomerServiceWindowConfig) {
    newWindowConfigStr += `${key}=${openNewCustomerServiceWindowConfig[key]}`
  }
  let newWindow = window.open('about:blank', openUrl['cn_name'], newWindowConfigStr)
  newWindow.location.href = openUrl['script']
  newWindow.focus()
  newWindow.opener = window
}
export function isLogin () {
  const loginState = store.state.user.isLogin
  if (!loginState) {
    route.push('/index')
    hide()
    // console.log(route)
  }
}
