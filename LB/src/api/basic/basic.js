import request from '@/util/request'
import terminalId from '../terminalId'

/**
 * 用户登录
 */
export function GetClientServices () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Basic',
      action: 'GetClientServices',
      terminal_id: terminalId
    }
  })
}
