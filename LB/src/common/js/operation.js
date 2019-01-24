export function accMul (arg1, arg2) { // 乘法
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 加法运算
export function accAdd (arg1, arg2) {
  let str = arg2.toString()
  let num = str.split(',')
  arg2 = parseFloat(num.join(''))
  let r1
  let r2
  let m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 本页小计
export function getTotalNum (data, str, num) {
  let totalNum = 0
  data.forEach((item, index) => {
    if (parseFloat(item[str]).toString() !== 'NaN') {
      totalNum = accAdd(totalNum, item[str])
    }
  })
  return totalNum.toFixed(num)
}
