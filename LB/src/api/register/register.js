import request from '@/util/request'
import terminalId from '../terminalId'

/**
 *
 * 用户注册
 * @param username 用户名
 * @param password 密码
 * @param confirmPassword 确认密码
 * @param captcha 验证码
 */
export function doRegister (username, password, confirmPassword, captcha) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'CreateUser',
      username: username,
      password: password,
      confirm_password: confirmPassword,
      terminal_id: terminalId,
      captcha: captcha
    }
  })
}

/**
 *
 * 用户注册
 * @param username 用户名
 * @param password 密码
 * @param confirmPassword 确认密码
 * @param key 开户链接key
 * @param captcha 验证码
 */
export function LinkCreateUser (username, password, confirmPassword, key, captcha) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'LinkCreateUser',
      username: username,
      password: password,
      password_confirmation: confirmPassword,
      key: key,
      terminal_id: terminalId,
      captcha: captcha
    }
  })
}
