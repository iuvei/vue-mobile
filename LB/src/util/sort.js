import sortInfo from '../config/sort-type'
import { labelValueMap, handicapLabelValueMap } from '../config/game-default-config'

export function sortNumber (sortType, numberList) {
  if (!sortType || !numberList || !numberList.length) return ''
  if (sortType === 'F') {
    // todo : 待完善
    return JSON.stringify(numberList.map(item => `${item}`))
  }
  return numberList.map(item => {
    if (typeof item === 'object' && item.length) {
      item.map((itemInner, index) => {
        if (typeof itemInner === 'object' && itemInner.hasOwnProperty('value')) {
          item[index] = itemInner.value
          return
        }
        if (labelValueMap[itemInner] || labelValueMap[itemInner] === 0) {
          item[index] = labelValueMap[itemInner]
        }
      })
    }
    return item.join(sortInfo[sortType].numCountSymbol)
  }).join(sortInfo[sortType].isAreaSymbol)
}

export function sortHandicapValue (label) {
  if (handicapLabelValueMap[label] !== undefined) return handicapLabelValueMap[label]
  return label
}
export function setHandicapValue (item) {
  if (item.value !== undefined) return item.value
  return item.label
}
