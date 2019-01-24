import request from '@/util/request'
import terminalId from '../terminalId'

/**
 * 用户登录
 * @param username 用户账号
 * @param password 用户密码
 */
export function loginByUsername (username, password) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'Login',
      username: username,
      password: password,
      terminal_id: terminalId
    }
  })
}
/**
 * 用户登出
 */
export function logout () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'logout',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取当前当前用户信息
 */
export function getCurrentUserInfo () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getCurrentUserInfo',
      terminal_id: terminalId
    }
  })
}
