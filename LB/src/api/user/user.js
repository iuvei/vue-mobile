import request from '@/util/request'
import terminalId from '../terminalId'

/**
 * 获取账户信息
 */
export function getAccount () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getAccount',
      terminal_id: terminalId
    }
  })
}
