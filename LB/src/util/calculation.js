const xianGetMoreNumbers = [ 0, 1, 2, 3, 4, 5 ]
const zhuangGetMoreNumbers = [ 0, 1, 2 ]
const ZHUANGIs4NeedAdd = [ 0, 1, 8, 9 ]
const ZHUANGIs5NeedAdd = [ 0, 1, 2, 3, 8, 9 ]

export function getBJLResultByLotteryNumber (numbers) { // 根据时时彩开奖结果计算百家乐封装方法
  if (!numbers || !numbers.length || !numbers.length === 4) return 'ERROR' // 参数拦截
  if (numbers && numbers.length) numbers = numbers.map(item => +item)
  let zhuangResult = numbers.slice(0, 2).reduce((a, b) => +a + +b) % 10
  let xianResult = numbers.slice(-2).reduce((a, b) => +a + +b) % 10
  let xianNeedAddNumber = false
  let zhuangNeedAddNumber = false
  if (xianGetMoreNumbers.find(item => item === xianResult)) {
    xianNeedAddNumber = (+numbers[4] + +numbers[2]) % 10
    xianResult = (xianResult + xianNeedAddNumber) % 10
  }
  if (zhuangGetMoreNumbers.find(item => item === zhuangResult)) {
    zhuangNeedAddNumber = (+numbers[0] + +numbers[2]) % 10
    zhuangResult = (zhuangResult + zhuangNeedAddNumber) % 10
  } else {
    if (xianNeedAddNumber !== 8 && zhuangResult === 3) {
      zhuangNeedAddNumber = (+numbers[0] + +numbers[2]) % 10
      zhuangResult = (zhuangResult + zhuangNeedAddNumber) % 10
    } else if (zhuangResult === 4 &&
      !ZHUANGIs4NeedAdd.find(item => item === xianNeedAddNumber)) {
      zhuangNeedAddNumber = (+numbers[0] + +numbers[2]) % 10
      zhuangResult = (zhuangResult + zhuangNeedAddNumber) % 10
    } else if (zhuangResult === 5 &&
      !ZHUANGIs5NeedAdd.find(item => item === xianNeedAddNumber)) {
      zhuangNeedAddNumber = (+numbers[0] + +numbers[2]) % 10
      zhuangResult = (zhuangResult + zhuangNeedAddNumber) % 10
    } else if (zhuangResult === 6 &&
      (xianNeedAddNumber === 6 || xianNeedAddNumber === 7)) {
      zhuangNeedAddNumber = (+numbers[0] + +numbers[2]) % 10
      zhuangResult = (zhuangResult + zhuangNeedAddNumber) % 10
    }
  }
  return zhuangResult === xianResult ? '和' : (zhuangResult > xianResult ? '庄' : '闲')
}
