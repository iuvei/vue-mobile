import request from '@/util/request'
import terminalId from '../terminalId'

export function GetWnNumberHistories (lotteryId, startTime, endTime, page) {
  return request({
    url: '',
    method: 'GET',
    params: {
      packet: 'Game',
      action: 'GetWnNumberHistories',
      terminal_id: terminalId,
      lottery_id: lotteryId,
      start_time: startTime,
      end_time: endTime,
      page: page
    }
  })
}
