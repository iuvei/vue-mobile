import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
import store from '../store'
import router from '../router'
import noShowMessageErr from '../config/no-show-message-errno'
import { Base64 } from 'js-base64'

// todo : 需要按照打包时候的命令行进行变动而不是定义在文件内
const isTest = true

const request = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: '/api',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // responseType: 'json',
  transformRequest: [function (data) {
    /*eslint-disable*/
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

request.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params.token = getToken() || ''
  } else {
    config.data.token = getToken() || ''
  }
  return config
}, err => console.log(err))

request.interceptors.response.use(response => {
  if (process.env.NODE_ENV === 'production' && !isTest) { // 线上环境下需要对后台返回参数进行处理
    response.data = JSON.parse(Base64.decode(response.data))
  }
  const { errno, message } = response.data
  if (errno === 3004 && store.getters.isLogin) {
    store.dispatch('loginOut')
      .then(() => {
        router.push('/index')
      })
    return
  }
  if (errno !== 0 && store.getters.isLogin) {
    if (noShowMessageErr.find(noShowErr => noShowErr === errno)) return response.data
    Message({ message, type: 'error' })
  }
  return response.data
}, err => console.log(err))

export default request
