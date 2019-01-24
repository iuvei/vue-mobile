import request from '@/util/request'
import terminalId from '../../terminalId'

/**
 * 获取开户基础信息
 * @params type 0精准开户1链接开户,默认是0
 * @params user_id 用户ID
 */
export function GetPrizeGroupForCreate (type, userId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Agent',
      action: 'GetPrizeGroupForCreate',
      terminal_id: terminalId,
      type: type,
      user_id: userId
    }
  })
}
/**
 * 精准开户
 * @params username 用户名：6～16为数字或字母组成的字符串
 * @params password 密码：6～16位数字和字母组成的，并且不能和用户名相同
 * @params nickname 昵称
 * @params prize_group_id 奖金组ID
 * @params series_prize_group_json 奖金组配额数据
 * @params is_agent 是否代理
 * @params percent_sets 第三方平台返点设置
 */
export function AccurateCreateUser (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'AccurateCreateUser',
      terminal_id: terminalId,
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      prize_group_id: data.prizeGroupId,
      series_prize_group_json: data.seriesPrizeGroupJson,
      is_agent: data.isAgent,
      percent_sets: data.percentSets
    }
  })
}
/**
 * 设置返点
 * @params user_id  用户id
 * @params series_prize_group_json 奖金组配额数据
 */
export function SetUserPrizeGroup (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'SetUserPlatPercent',
      terminal_id: terminalId,
      user_id: data.userId,
      series_prize_group_json: data.seriesPrizeGroupJson,
      percent_sets: data.percentSets
    }
  })
}
/**
 * 获得团队账户列表
 * @params parent_id 上级ID
 * @params username 用户名
 * @params is_agent 是否代理
 * @params page 页码，默认为1
 * @params pagesize 页尺寸，默认为20
 */
export function GetTeamUsers (parentId, username, isAgent, page, pageSize) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Agent',
      action: 'GetTeamUsers',
      terminal_id: terminalId,
      parent_id: parentId,
      username: username,
      is_agent: isAgent,
      page: page,
      pagesize: pageSize
    }
  })
}
/**
 * 获得团队日统计数据
 * @params date 日期
 */
export function getTeamDateSummary (date) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'getTeamDateSummary',
      terminal_id: terminalId,
      date: date
    }
  })
}
/**
 * 获得团队区间统计数据
 * @params begin_date 开始日期
 * @params end_date 结束日期（含）
 * @params gt_id 游戏类别，不传则获取所有数据
 * @params is_get_child 是否查询直属统计数据
 * @params parent_id 查询直属下级的时候传入上级ID
 */
export function getTeamSummary (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'getTeamSummary',
      terminal_id: terminalId,
      begin_date: data.beginDate,
      end_date: data.endDate,
      gt_id: data.gtId,
      is_get_child: data.isGetChild,
      parent_id: data.parentId
    }
  })
}

/**
 * 获得团队资金报表
 * @params begin_date 开始日期
 * @params end_date 结束日期（含）
 * @params gt_id 游戏类别，不传则获取所有数据
 * @params is_get_child 是否查询直属统计数据
 * @params parent_id 查询直属下级的时候传入上级ID
 */
export function GetTeamFundSummary (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'GetTeamFundSummary ',
      terminal_id: terminalId,
      begin_date: data.beginDate,
      end_date: data.endDate,
      gt_id: data.gtId,
      is_get_child: data.isGetChild,
      parent_id: data.parentId
    }
  })
}
/**
 * 获得团队用户数据
 * @params begin_date 开始日期
 * @params end_date 结束日期（含）
 */
export function GetTeamPandect (beginDate, endDate) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'GetTeamPandect',
      terminal_id: terminalId,
      begin_date: beginDate,
      end_date: endDate
    }
  })
}
/**
 * 获得图表
 * @params begin_date 开始日期
 * @params end_date 结束日期（含）
 * @param is_self 默认不传值获取团队数据，传值1则获取个人数据
 */
export function GetSummaryTrend (beginDate, endDate, isSelf) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'GetSummaryTrend',
      terminal_id: terminalId,
      begin_date: beginDate,
      end_date: endDate,
      is_self: isSelf
    }
  })
}
/**
 * 创建开户链接
 * @params agent_qqs qq数据
 * @params valid_days 有效期,0表示永久
 * @params prize_group_type 固定传2
 * @params channel 渠道
 * @params series_prize_group_json 奖金组配额数据
 * @params is_agent 是否代理
 */
export function CreateRegisterLink (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'CreateRegisterLink',
      terminal_id: terminalId,
      agent_qqs: data.agent_qqs,
      valid_days: data.valid_days,
      prize_group_type: data.prize_group_type,
      channel: data.channel,
      series_prize_group_json: data.seriesPrizeGroupJson,
      is_agent: data.isAgent,
      percent_sets: data.percentSets
    }
  })
}
/**
 * 删除开户链接
 * @params link_id  链接ID
 */
export function DeleteRegisterLink (linkId) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'DeleteRegisterLink',
      terminal_id: terminalId,
      link_id: linkId
    }
  })
}
/**
 * 获取下级接口
 * @params user_id  不传的时候获取登陆用户下级，传则获取登陆用户非直属下级
 * @params type 1只获取玩家 2只获取代理 3获取全部 默认不传获取全部
 */
export function GetChild (userId, type) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Report',
      action: 'GetChild',
      terminal_id: terminalId,
      user_id: userId,
      type: type
    }
  })
}
/**
 *  获取开户链接
 */
export function GetRegisterLinks () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Agent',
      action: 'GetRegisterLinks',
      terminal_id: terminalId
    }
  })
}
/**
 *  获取开户链接详情
 *  @params link_id 开户链接ID
 */
export function GetRegisterLinkDetail (linkId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Agent',
      action: 'GetRegisterLinkDetail',
      terminal_id: terminalId,
      link_id: linkId
    }
  })
}
/**
 *  获取下级代理第三方返点设置
 *  @params user_id 开户链接ID
 */
export function GetUserPlatPercents (userId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Agent',
      action: 'GetUserPlatPercents',
      terminal_id: terminalId,
      user_id: userId
    }
  })
}

/**
 *  设置下级代理第三方返点设置
 *  @params user_id 开户链接ID
 *  @params percent_sets 第三方返点设置
 *  @params series_prize_group_json 奖金组设置
 */
export function SetUserPlatPercent (userId, percentSets, seriesPrizeGroupJson) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Agent',
      action: 'SetUserPlatPercent',
      terminal_id: terminalId,
      user_id: userId,
      percent_sets: percentSets,
      series_prize_group_json: seriesPrizeGroupJson
    }
  })
}
