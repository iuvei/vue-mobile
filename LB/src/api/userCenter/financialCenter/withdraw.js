import request from '@/util/request'
/**
 * 提现
 * @param bankcardId 绑定的银行卡ID Int
 * @param amount 金额，精度为2 Double
 * @param fundPassword 资金密码加密串 String
 * 加密方法:
 * 将username转换为小写字符，然后与密码连接，再取三次md5
 * */
export function withdraw (bankcardId, amount, fundPassword) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Fund',
      action: 'withdraw',
      bankcard_id: bankcardId,
      amount: amount,
      fund_password: fundPassword
    }
  })
}

/**
 *获取当前用户的可用余额
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
 * 获取用户可提现余额
 * */
export function getWithdrawable () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getWithdrawable'
    }
  })
}

/**
 * 提现记录列表
 *  @param page 页码，默认为1 Int
 *  @param pageSize 页尺寸，默认为20 Int
 *  @param beginTime 开始时间，默认为一天前 Datetime
 *  @param endTime 结束时间 Datetime
 * */
export function getWithdrawalList (page, pageSize, beginTime, endTime) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getWithdrawalList',
      page: page,
      pagesize: pageSize,
      begin_time: beginTime,
      end_time: endTime
    }
  })
}

/**
 * 获取已绑定银行卡信息
 * */
export function getBankCardList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getBankCardList'
    }
  })
}
