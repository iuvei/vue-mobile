import request from '@/util/request'
import terminalId from '../terminalId'
/**
 * 获取彩种玩法
 * @params lottery_id 彩票id
 * */
export function GetTrendWays (lotteryId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetTrendWays',
      terminal_id: terminalId,
      lottery_id: lotteryId
    }
  })
}
/**
 * 获取开奖走势图
 * @params lottery_id 彩票id
 * @params start_time 开始时间
 * @params end_time 结束时间
 * @params way 彩种玩法
 * @params count 条数
 * */
export function GetLotteryTrend (data) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Game',
      action: 'GetLotteryTrend',
      terminal_id: terminalId,
      lottery_id: data.lotteryId,
      start_time: '',
      end_time: '',
      count: data.count
    }
  })
}
