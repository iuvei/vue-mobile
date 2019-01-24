import request from '@/util/request'
import terminalId from '../terminalId'

/**
 *
 * 获取banner图片列表
 */
export function getBannerList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Notice',
      action: 'getBannerList',
      terminal_id: terminalId
    }
  })
}
