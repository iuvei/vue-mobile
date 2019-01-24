
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[ i ] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[ prop ]
        if (value !== undefined) {
          target[ prop ] = value
        }
      }
    }
  }
  return target
}

export function getRound (num, len) {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
}

export function showNumberList (item) {
  return item.numberList.map(item => {
    if (typeof item === 'object' && item.find(itemInner => typeof itemInner === 'object' && itemInner.label)) return item.map(itemInner => itemInner.label)
    if (typeof item === 'object' && item.length) return item.join(' ')
    return item
  }).join(',')
}

export function shallowCopy (src) {
  const dst = {}
  for (const prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop]
    }
  }
  return dst
}
export function getAllCountOfArr (arr) {
  if (!arr || !arr.length) return 0
  if (typeof arr[0] === 'object' && arr[0].length !== undefined) {
    return arr.map(item => {
      return item.length
    }).reduce((a, b) => a * b)
  } else {
    return arr.length
  }
}

export function isPrimeNum (num) {
  if (!isNum(num)) {
    return false
  }
  if (!isInteger(num)) {
    return false
  }
  if (num === 1) {
    return false
  }
  if (num === 2 || num === 3 || num === 5) {
    return true
  }
  if (!isDual(num)) {
    return false
  }
  if (!isThree(num)) {
    return false
  }
  for (let i = 2; i < num / 5 + 1; i++) {
    if (num % i === 0) {
      return false
    }
  };
  return true
}
export function isInteger (num) {
  return Number.isInteger(num)
}

export function isNum (num) {
  return num === +num
}

export function isDual (num) {
  let lastNum = num.toString().substring(num.length - 1, num.length)
  return !(lastNum % 2 === 0 || lastNum % 5 === 0)
}

export function isThree (num) {
  let str = num.toString()
  let sum = 0
  for (let i = 0; i < str.length; i++) {
    sum += +str.substring(i, i + 1)
  };
  return !(sum % 3 === 0)
}

export function getElementHeight (element) {
  if (!window.getComputedStyle) return NaN
  // element.style.transition = 'none'
  element.style.height = 'auto'
  return window.getComputedStyle(element).height
}
