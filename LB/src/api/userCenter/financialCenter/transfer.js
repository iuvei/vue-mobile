import request from '@/util/request'
/**
 * 转账
 * */

/**
 * 获取用户可用余额
 * */
export function getAvailable () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getAvailable'
    }
  })
}
/**
 * 资金明细列表
 *  @param page 页码，默认为1 Int
 *  @param pageSize 页尺寸，默认为20 Int
 *  @param beginTime 开始时间，默认为一天前 Datetime
 *  @param endTime 结束时间 Datetime
 * */
export function getTransactionList (page, pageSize, beginTime, endTime) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getTransactionList',
      page: page,
      pagesize: pageSize,
      begin_time: beginTime,
      end_time: endTime
    }
  })
}
/**
 * 第三方平台激活
 * */
export function ThirdGameUserInit () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'ThirdGameUserInit'
    }
  })
}
/**
 * 获取第三方平台列表
 * */
export function GetThirdGamePlatformList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGamePlatformList'
    }
  })
}
/**
 * 获取第三方平台余额
 * @param platform 第三方平台标识
 * */
export function GetPlatformBalance (platform) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetPlatformBalance',
      platform: platform
    }
  })
}
/**
 * 第三方平台转账
 * @param outPlatform   转出平台标识符号
 * @param inPlatform 转入平台标识符号
 * @param amount 金额，必须大于等于1元
 * */
export function TransferThirdGame (outPlatform, inPlatform, amount) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'ThirdGame',
      action: 'TransferThirdGame',
      out_platform: outPlatform,
      in_platform: inPlatform,
      amount: amount
    }
  })
}
/**
 * 第三方平台转账记录
 * @param page 获取第几页：默认第一页
 * @param pageSize 页大小-每页条数：默认20
 * @param startTime 转账操作时间范围开始，默认当天开始时间
 * @param endTime 转账操作时间范围结束：默认查询当前的时间
 * @param status 转账状态：0-处理中 1-成功 2-失败
 * @param platform 第三方游戏平台标识符
 * */
export function GetTransferList (page, pageSize, startTime, endTime, status, platform) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetTransferList',
      page: page,
      pagesize: pageSize,
      start_time: startTime,
      end_time: endTime,
      status: status,
      platform: platform
    }
  })
}
