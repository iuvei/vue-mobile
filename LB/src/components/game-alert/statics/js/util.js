import { Message } from 'element-ui'
import { sortNumber, sortHandicapValue, setHandicapValue } from '../../../../util/sort'
import { handicapAjaxValueConfig } from '../../../../config/game-default-config'
import { bet, betIm } from '@/api/game/game'
import store from '../../../../store'
import { getCompressData } from '../../../../util/compress'

export function betInCommon (betInfo, specimen, optionsValue) {
  return new Promise((resolve, reject) => {
    const {
      lotteryId,
      isChasingNumber,
      shoppingCarList,
      mode,
      chasingInfo
    } = betInfo
    if (!lotteryId) {
      return Message({
        message: '没有获取到对应的彩种ID',
        type: 'error'
      })
    }
    let orders = {}
    let numbers
    let allCountMoney = 0
    if (!isChasingNumber) {
      shoppingCarList.map(item => {
        allCountMoney += item.selectedMoney
        orders[ item.awardInfo.issue ] = 1
      })
      if (mode === 'normal') {
        numbers = shoppingCarList.map((item, index) => {
          return {
            js_id: index,
            way_id: item.playTypeItemId,
            number: sortNumber(item.sortType, item.numberList),
            // single_count: item.selectedCounts,
            // 修正传入参数为投注盘的参数作为通信值
            single_count: item.betNoteCounts,
            coefficient: item.coefficient,
            multiple: item.multiple,
            prize_group: item.bonusGroup,
            position: item.extra ? item.extra : ''
          }
        })
      } else if (mode === 'handicap') {
        numbers = shoppingCarList.map((item, index) => {
          return {
            js_id: index,
            way_id: item.wayId,
            number: setHandicapValue(item),
            single_count: handicapAjaxValueConfig.singleCount,
            coefficient: item.coefficient,
            multiple: item.coefficient === handicapAjaxValueConfig.coefficientEven ? item.betCount / 2 : item.betCount,
            prize_group: item.bonusGroup,
            position: item.extra ? item.extra : ''
          }
        })
      } else if (mode === 'clickRank') {
        numbers = shoppingCarList.map((item, index) => {
          return {
            js_id: index,
            way_id: item.wayId,
            number: item.number,
            single_count: handicapAjaxValueConfig.singleCount,
            coefficient: item.coefficient,
            multiple: item.coefficient === handicapAjaxValueConfig.coefficientEven ? item.selectedMoney / 2 : item.selectedMoney,
            prize_group: item.bonusGroup,
            position: ''
          }
        })
      }
    } else {
      orders = chasingInfo.order
      numbers = [
        {
          js_id: 0,
          way_id: chasingInfo.playTypeItemId,
          number: sortNumber(chasingInfo.sortType, chasingInfo.numberList),
          single_count: chasingInfo.selectedCounts,
          coefficient: chasingInfo.coefficient,
          multiple: 1,
          prize_group: chasingInfo.bonusGroup,
          extra: chasingInfo.extra ? chasingInfo.extra : ''
        }
      ]
    }
    let dataObject
    // console.log(store.getters.defaultSetting['can_compress'])
    if (store.getters.defaultSetting['can_compress']) {
      // 对通信参数进行压缩处理
      let binaryString = getCompressData({
        lottery_id: lotteryId,
        is_trace: +isChasingNumber,
        stop_on_win: isChasingNumber ? +chasingInfo.stopChasingWn : 0,
        numbers,
        orders,
        amount: allCountMoney,
        is_specimen: specimen,
        specimen_rate: optionsValue
      })
      dataObject = {
        compressedBetData: binaryString
      }
    } else {
      dataObject = {
        lottery_id: lotteryId,
        is_trace: +isChasingNumber,
        stop_on_win: isChasingNumber ? +chasingInfo.stopChasingWn : 0,
        numbers,
        orders,
        amount: allCountMoney,
        is_specimen: specimen,
        specimen_rate: optionsValue
      }
    }
    bet(JSON.stringify(dataObject))
      .then(res => {
        store.dispatch('getBettingRecordList', {isClick: false})
        resolve(res)
      })
      .catch(err => reject(err))
  })
}

export function betImInCommon (betInfo) {
  return new Promise((resolve, reject) => {
    const {
      lotteryId,
      isChasingNumber,
      shoppingCarList,
      mode,
      chasingInfo
    } = betInfo
    if (!lotteryId) {
      return Message({
        message: '没有获取到对应的彩种ID',
        type: 'error'
      })
    }
    let orders = {}
    let numbers
    let allCountMoney = 0
    if (!isChasingNumber) {
      /* shoppingCarList.map(item => {
        allCountMoney += item.selectedMoney
        orders[ item.awardInfo.issue ] = 1
      }) */
      if (mode === 'normal') {
        numbers = shoppingCarList.map((item, index) => {
          return {
            js_id: index,
            way_id: item.playTypeItemId,
            number: sortNumber(item.sortType, item.numberList),
            single_count: item.selectedCounts,
            coefficient: item.coefficient,
            multiple: item.multiple,
            prize_group: item.bonusGroup,
            position: item.extra ? item.extra : ''
          }
        })
      } else if (mode === 'handicap') {
        numbers = shoppingCarList.map((item, index) => {
          return {
            js_id: index,
            way_id: item.wayId,
            number: sortHandicapValue(item.label),
            single_count: handicapAjaxValueConfig.singleCount,
            coefficient: item.coefficient,
            multiple: item.coefficient === handicapAjaxValueConfig.coefficientEven ? item.betCount / 2 : item.betCount,
            prize_group: item.bonusGroup,
            position: item.extra ? item.extra : ''
          }
        })
      }
    } else {
      orders = chasingInfo.order
      numbers = [
        {
          js_id: 0,
          way_id: chasingInfo.playTypeItemId,
          number: sortNumber(chasingInfo.sortType, chasingInfo.numberList),
          single_count: chasingInfo.selectedCounts,
          coefficient: chasingInfo.coefficient,
          multiple: 1,
          prize_group: chasingInfo.bonusGroup,
          extra: chasingInfo.extra ? chasingInfo.extra : ''
        }
      ]
    }
    let dataObject
    if (store.getters.defaultSetting['can_compress']) {
      // 对通信参数进行压缩处理
      let binaryString = getCompressData({
        lottery_id: lotteryId,
        is_trace: +isChasingNumber,
        stop_on_win: isChasingNumber ? +chasingInfo.stopChasingWn : 0,
        numbers,
        orders,
        amount: allCountMoney
      })
      dataObject = {
        compressedBetData: binaryString
      }
    } else {
      dataObject = {
        lottery_id: lotteryId,
        is_trace: +isChasingNumber,
        stop_on_win: isChasingNumber ? +chasingInfo.stopChasingWn : 0,
        numbers,
        orders,
        amount: allCountMoney
      }
    }
    betIm(JSON.stringify(dataObject))
      .then(res => {
        store.dispatch('getBettingRecordList', {isClick: false})
        resolve(res)
      })
      .catch(err => reject(err))
  })
}
