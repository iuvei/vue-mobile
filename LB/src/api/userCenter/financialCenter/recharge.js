import request from '@/util/request'
/**
 * 账户充值
 * */

/**
 * 取得充值渠道列表
 * */
export function getDepositPlatformList (e) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getDepositPlatformList',
      payment_type_id: e
    }
  })
}

/**
 * 取得渠道支持银行列表
 * @param platformId 渠道id  Int
 * */
export function getPlatformBankList (platformId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getPlatformBankList',
      platform_id: platformId
    }
  })
}

/**
 *  充值记录列表
 *  @param page 页码，默认为1 Int
 *  @param pageSize 页尺寸，默认为20 Int
 *  @param beginTime 开始时间，默认为一天前 Datetime
 *  @param endTime 结束时间 Datetime
 * */
export function getDepositList (page, pageSize, beginTime, endTime) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getDepositList',
      page: page,
      pagesize: pageSize,
      begin_time: beginTime,
      end_time: endTime
    }
  })
}

/**
 *  充值接口
 * @param platformId 绑定的银行卡ID
 * @param amount 金额，精度为2
 * @param bankId 银行ID
*/
export function deposit (amount, bankId, platformId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'deposit',
      platform_id: platformId,
      amount: amount,
      bank_id: bankId
    }
  })
}
