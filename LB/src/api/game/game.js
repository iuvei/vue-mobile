import request from '@/util/request'
import terminalId from '../terminalId'

/**
 * 获取游戏列表
 */
export function GetGameMenu () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetGameMenu',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取路单的结果数据
 * @params lotteryId 彩种ID
 */
export function GetBigWayData (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetBigWayData',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获取玩法列表
 * @params lotteryId 当前游戏ID
 */
export function getWaySettings (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getWaySettings',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获取奖金组接口
 * @params lotteryId 彩票ID
 */
export function GetAvailablePrizeGroups (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetAvailablePrizeGroups',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 提交投注信息
 * @params betdata 投注信息
 */
export function bet (betdata) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Game',
      action: 'bet',
      terminal_id: terminalId,
      betdata: betdata
    }
  })
}
/**
 * 即开型彩种提交投注信息
 * @params betdata 投注信息
 */
export function betIm (betdata) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Game',
      action: 'InstantBet',
      terminal_id: terminalId,
      betdata: betdata
    }
  })
}
/**
 * 获得当前销售奖期信息
 * @params lotteryId 游戏ID
 */
export function getCurrentIssue (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getCurrentIssue',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获得指定游戏最近的中奖号码列表
 * @params lotteryId 游戏ID
 * @params count 获取条数
 */
export function getWnNumberList (lotteryId, count) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getWnNumberList',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      count
    }
  })
}
/**
 * 获取价格设置的默认值列表
 * @params lotteryId 游戏ID
 */
export function getBetSettings (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetBetSettings',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获取收藏彩种列表
 * @params lotteryId 游戏ID
 */
export function getFavoritesLottery () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getFavoriteLotteries',
      terminal_id: terminalId
    }
  })
}
/**
 * 设置收藏彩种
 * @params lotteryId 游戏ID
 */
export function setFavoritesLottery (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'setFavoriteLotteries',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获得指定游戏的设置
 * @params id 游戏ID
 */
export function getGameDetail (id) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'User',
      action: 'getGameDetail',
      terminal_id: terminalId,
      id: id
    }
  })
}
/**
 * 获得注单记录
 * @params lotteryId 彩种Id
 * @params page 页码
 * @params pageSize 每页显示条数
 */
export function getProjectList (lotteryId, page, pageSize, status, beginTime, endTime) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getProjectList',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      page,
      status,
      pagesize: pageSize,
      begin_time: beginTime,
      end_time: endTime
    }
  })
}
/**
 * 获得追号列表
 * @params lotteryId 彩种Id
 * @params page 页码
 * @params pageSize 每页显示条数
 * @params status 获取数据的对应状态
 */
export function getTraceList (lotteryId, page, pageSize) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getTraceList',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      page,
      pagesize: pageSize
    }
  })
}
/**
 * 获得追号详情G
 * @params id    追号任务ID
 * @params status 获取数据的对应状态
 */
export function getTraceDetail (Id) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getTraceDetail',
      terminal_id: terminalId,
      id: Id
    }
  })
}
/**
 * 获得追号详情明细
 * @params id    追号任务ID
 * @params status 获取数据的对应状态
 */
export function GetTraceProjectDetail (Id) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetTraceProjectDetail',
      terminal_id: terminalId,
      trace_id: Id
    }
  })
}

/**
 * 获取彩种对应的信用玩法列表
 * @params lotteryId 彩种Id
 */
export function getCreditWaySettings (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getCreditWaySettings',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获取注单详情
 */
export function getProjectDetail (serialId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getProjectDetail',
      terminal_id: terminalId,
      id: serialId
    }
  })
}
/**
 * 获取排行数据
 * lotteryId 彩种id
 * type 数据类型
 */
export function getLotteryAnData (lotteryId, type) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'getLotteryAnData',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      type: type
    }
  })
}

/**
 * 撤单
 * dropId 注单id
 */
export function dropProject (dropId) {
  return request({
    url: '',
    method: 'post',
    data: {
      packet: 'Game',
      action: 'dropProject',
      terminal_id: terminalId,
      id: dropId
    }
  })
}
/**
 * 获取游戏中心游戏类别列表
 */
export function GetThirdGameTypeList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGameTypeList',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取游戏中心接入平台列表
 */
export function GetThirdGamePlatformList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGamePlatformList',
      terminal_id: terminalId
    }
  })
}
/**
 * 获取游戏中心游戏列表
 * gameType 游戏类别标识符
 */
export function GetThirdGameList (gameType) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGameList',
      terminal_id: terminalId,
      game_type: gameType,
      platform: ''
    }
  })
}
/**
 * 获取进入游戏的地址
 * gameId 游戏id
 */
export function GetThirdGameUrl (gameId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdGameUrl',
      terminal_id: terminalId,
      game_id: gameId
    }
  })
}
/**
 * 用户激活第三方游戏账户
 */
export function ThirdGameUserInit () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'ThirdGameUserInit',
      terminal_id: terminalId
    }
  })
}

export function GetThirdFocusGameList () {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetThirdFocusGameList',
      terminal_id: terminalId
    }
  })
}

/**
 * 获取即开型彩票的记录
 * @params lotteryId 当前游戏ID
 */
export function GetInstantWnNumberList (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'ThirdGame',
      action: 'GetInstantWnNumberList',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
