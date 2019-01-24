import request from '@/util/request'
import terminalId from '../terminalId'

/**
 *
 *  获取活动详情列表
 */
export function getEventDetail () {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'Event',
      action: 'getEventDetail',
      terminal_id: terminalId
    }
  })
}

export function GetCaptcha () {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'User',
      action: 'GetCaptcha',
      terminal_id: terminalId
    }
  })
}

export function GetSuggestionType () {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'User',
      action: 'GetSuggestionType',
      terminal_id: terminalId
    }
  })
}

export function CreateSuggestion (type, content, captcha) {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'User',
      action: 'CreateSuggestion',
      terminal_id: terminalId,
      type: type,
      content: content,
      captcha: captcha
    }
  })
}
