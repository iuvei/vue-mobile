import request from '@/util/request'
import terminalId from '../terminalId'

/**
 * 获取公告列表
 */
export function getNoticeList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Notice',
      action: 'getNoticeList',
      terminal_id: terminalId
    }
  })
}
