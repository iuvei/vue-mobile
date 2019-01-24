import request from '@/util/request'

/**
 * 获取公告列表
 * */

export function getNoticeList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Notice',
      action: 'getNoticeList'
    }
  })
}

/**
 * 获取公告详情
 * @param id  公告ID  Int
 * */
export function getNoticeDetail (id) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Notice',
      action: 'getNoticeDetail',
      id: id
    }
  })
}
