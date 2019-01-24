import request from '@/util/request'
import terminalId from '../terminalId'

/**
 *
 *  获取线路列表数据
 */
export function getCircuitList () {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'Basic',
      action: 'GetDomain',
      terminal_id: terminalId
    }
  })
}
