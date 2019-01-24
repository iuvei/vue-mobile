import request from '@/util/request'
import terminalId from '../../terminalId'

/**
 * 获取活动列表
 * */
export function getValidEvents (page, pageSize) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Notice',
      action: 'GetValidEvents',
      terminal_id: terminalId,
      page: page,
      pagesize: pageSize
    }
  })
}
