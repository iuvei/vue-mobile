import request from '@/util/request'
import terminalId from '../../terminalId'

/**
 * 获取游用户信息
 */
export function getCurrentUserInfo () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getCurrentUserInfo',
      terminal_id: terminalId
    }
  })
}

/**
 * 获取用户登陆ip信息接口
 */
export function GetUserLoginIPInfo () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'GetUserLoginIPInfo',
      terminal_id: terminalId
    }
  })
}
/**
 * 设置用户信息
 * @params name 用户真实姓名
 * @params nickname 用户昵称
 * @params email 邮箱
 * @params skype skype
 * @params mobile 手机号码
 * @params bet_confirm 是否投注弹框：0-不弹出1-弹出
 * @params open_prompt_voice 是否开启开奖与封单提示音：0-否 1-是
 * @params qq
 */
export function setUserInfo (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'setUserInfo',
      terminal_id: terminalId,
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      skype: data.skype,
      mobile: data.mobile,
      bet_confirm: data.betConfirm,
      open_prompt_voice: data.openPromptVoice,
      qq: data.qq
    }
  })
}
/**
 * 获取游戏列表
 */
export function GetCaptcha () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'GetCaptcha',
      terminal_id: terminalId
    }
  })
}
/**
 * 设置资金密码
 * @params fund_pwd 资金密码
 * @params confirm_fund_pwd 确认资金密码
 */
export function setFundPwd (fundPwd, confirmFundPwd) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'setFundPwd',
      terminal_id: terminalId,
      fund_pwd: fundPwd,
      confirm_fund_pwd: confirmFundPwd
    }
  })
}
/**
 * 修改资金密码
 * @params current_password 当前登录密码
 * @params newPassword 新登录密码
 */
export function changeFundPwd (currentPassword, newPassword) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'changeFundPwd',
      terminal_id: terminalId,
      current_password: currentPassword,
      new_password: newPassword
    }
  })
}
/**
 * 修改登陆密码
 * @params current_password 当前登录密码
 * @params newPassword 新登录密码
 */
export function changeLoginPwd (currentPassword, newPassword) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'changeLoginPwd',
      terminal_id: terminalId,
      current_password: currentPassword,
      new_password: newPassword
    }
  })
}
/**
 * 获取游戏列表
 *
 */
export function getAllGames () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getAllGames',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取游戏类别列表
 *
 */
export function getGameTypeList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getGameTypeList',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取个人游戏列表
 * @params lottery_id 彩票ID
 * @params status 注单状态
 * @params begin_time 时间范围开始时间
 * @params end_time 时间范围结束时间
 * @params search_team 是否用于搜索团队
 * @params username 指定人搜索
 * @params page 分页索引
 * @params pagesize 分页长度
 */
export function getProjectList (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getProjectList',
      terminal_id: terminalId,
      lottery_id: data.lotteryId,
      status: data.status,
      begin_time: data.beginTime,
      end_time: data.endTime,
      search_team: data.searchTeam,
      username: data.username,
      page: data.page,
      pagesize: data.pageSize
    }
  })
}
/**
 *  获得用户在第三方游戏平台日流水记录
 * @params game_type GetGameTypeList接口返回的类别ID
 * @params search_item 查询方式：0-当前登录用户 1-下级用户 默认0
 * @params start_time 时间范围开始时间
 * @params end_time 时间范围结束时间
 * @params username 指定人搜索
 * @params page 分页索引
 * @params pagesize 分页长度
 */
export function GetThirdGameRecordList (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGameRecordList',
      terminal_id: terminalId,
      game_type: data.gameType,
      search_item: data.searchItem,
      start_time: data.beginTime,
      end_time: data.endTime,
      username: data.username,
      page: data.page,
      pagesize: data.pageSize
    }
  })
}
/**
 * 获得注单详情
 * @params id 注单ID
 */
export function getProjectDetail (id) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getProjectDetail',
      terminal_id: terminalId,
      id: id
    }
  })
}
/**
 *  撤销注单
 * @params id 注单ID
 */
export function dropProject (id) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Game',
      action: 'dropProject',
      terminal_id: terminalId,
      id: id
    }
  })
}
/**
 * 获取支持的银行列表
 */
export function getBankList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Basic',
      action: 'getBankList',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取地区接口
 */
export function getDistricts () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Basic',
      action: 'getDistricts',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取已绑定的银行卡信息列表
 */
export function getBankCardList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getBankCardList',
      terminal_id: terminalId
    }
  })
}

/**
 * 校验银行卡
 * @params card_id 银行卡ID
 * @params fund_pwd 资金密码
 * @params account_name 开户人姓名
 * @params account 银行卡号
 * @params type 校验类型,1再绑卡2:修改卡3:删除卡
 */
export function checkBankCard (bankData) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'checkBankCard',
      terminal_id: terminalId,
      card_id: bankData.cardId,
      fund_pwd: bankData.fundPwd,
      account_name: bankData.accountName,
      account: bankData.account,
      type: bankData.type
    }
  })
}
/**
 * 绑定银行卡
 * @params bank_id 银行ID
 * @params province_id 省份ID
 * @params city_id 市ID
 * @params account_name 开户人姓名
 * @params account 银行卡号
 * @params branch 开户行
 * @params checked_token 已拥有银行卡用户增加绑定银行卡必须携带
 */
export function bindBankCard (bankData) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'bindBankCard',
      terminal_id: terminalId,
      bank_id: bankData.bankId,
      province_id: bankData.provinceId,
      city_id: bankData.cityId,
      account_name: bankData.accountName,
      account: bankData.account,
      branch: bankData.branch,
      checked_token: bankData.checkedToken
    }
  })
}
/**
 * 修改银行卡
 * @params card_id 玩家银行卡ID
 * @params bank_id 银行ID
 * @params province_id 省份ID
 * @params city_id 市ID
 * @params account_name 开户人姓名
 * @params account 银行卡号
 * @params branch 开户行
 * @params checked_token 检验后的令牌
 */
export function changeBankCard (bankData) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'changeBankCard',
      terminal_id: terminalId,
      card_id: bankData.cardId,
      bank_id: bankData.bankId,
      province_id: bankData.provinceId,
      city_id: bankData.cityId,
      account_name: bankData.accountName,
      account: bankData.account,
      branch: bankData.branch,
      checked_token: bankData.checkedToken
    }
  })
}
/**
 * 删除银行卡
 * @params card_id 玩家银行卡ID
 * @params checked_token 检验后的令牌
 */
export function deleteBankCard (cardId, checkedToken) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'User',
      action: 'deleteBankCard',
      terminal_id: terminalId,
      card_id: cardId,
      checked_token: checkedToken
    }
  })
}
/**
 * 获得个人日统计数据
 * @params date 日期
 */
export function getDateSummary (date) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'getDateSummary',
      terminal_id: terminalId,
      date: date
    }
  })
}
/**
 * 获得个人区间统计数据
 * @params begin_date 开始日期
 * @params end_date 结束日期（含）
 * @params gt_id 游戏类别ID
 */
export function getSummary (beginDate, endDate, gtId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'getSummary',
      terminal_id: terminalId,
      begin_date: beginDate,
      end_date: endDate,
      gt_id: gtId
    }
  })
}
/**
 * 获得资金明细类型列表
 */
export function getTransactionTypeList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getTransactionTypeList',
      terminal_id: terminalId
    }
  })
}
/**
 * 获得区间统计数据
 * @params type_id 类型ID
 * @params begin_time 开始时间，默认为一天前
 * @params end_time 结束时间
 * @params page 页码，默认为1
 * @params pagesize 页尺寸，默认为20
 * @params search_team 是否查询团队账变
 * @params username 查询团队的时候，指定用户名搜索
 */
export function getTransactionList (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'getTransactionList',
      terminal_id: terminalId,
      type_id: data.typeId,
      begin_time: data.beginTime,
      end_time: data.endTime,
      page: data.page,
      pagesize: data.pageSize,
      search_team: data.searchTeam,
      username: data.userName
    }
  })
}
/**
 * 返回当前用户可用的奖金组列表
 * @params type_id 类型ID
 */
export function getAvailablePrizeGroups (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getAvailablePrizeGroups',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 *  获取用户彩种玩法奖金标准
 * @params lottery_id 彩种id
 * @params is_double_side 是否两面盘1是0否
 * @params user_id 账号ID
 */
export function GetUserLotteryPrizeLimit (lotteryId, isDoubleSide, userId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetUserLotteryPrizeLimit',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      is_double_side: isDoubleSide,
      user_id: userId
    }
  })
}
/**
 *  获取用户第三方游戏返点列表
 *  @params user_id
 */
export function GetUserGameTypePercentList (userId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Fund',
      action: 'GetUserGameTypePercentList',
      terminal_id: terminalId,
      user_id: userId
    }
  })
}
/**
 *  获得用户在第三方游戏余额
 *  @params gameIdentifier 游戏类型标识符
 */
export function GetThirdGameBalance (gameIdentifier) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGameBalance',
      terminal_id: terminalId,
      game_identifier: gameIdentifier
    }
  })
}
