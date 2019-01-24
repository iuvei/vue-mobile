import request from '@/util/request'

/**
 * 站内信列表
 * */
export function getMessageList (page, pageSize, isMySend) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Message',
      action: 'getMessageList',
      page: page,
      is_my_send: isMySend,
      page_size: pageSize
    }
  })
}
/**
 * 获取未读消息数量
 */
export function getMessageCount () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Message',
      action: 'getMessageCount'
    }
  })
}

/**
 * 阅读消息
 * @param id 消息ID
 */
export function setMessageToRead (id) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Message',
      action: 'setMessageToRead',
      id: id
    }
  })
}

/**
 * 删除消息
 * @param msgID 消息ID
 */
export function DeleteMessage (msgID) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Message',
      action: 'DeleteMessage',
      msg_id: msgID
    }
  })
}

/**
 * 获取发信加载数据
 */
export function GetSendInfo () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Message',
      action: 'GetSendInfo'
    }
  })
}

/**
 * 发信
 * @param sendType 发送类型
 * @param title 标题
 * @param content 内容
 * @param receiver 当发给下级的时候必选 收信方ID
 */
export function SendMessage (sendType, title, content, receiver) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Message',
      action: 'SendMessage',
      send_type: sendType,
      title: title,
      content: content,
      receiver: receiver
    }
  })
}
