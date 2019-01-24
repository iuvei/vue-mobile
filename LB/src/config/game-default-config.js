// 查看奖期列表展示的最近奖期数
export const showWnNumberCount = 20

// 追号相关的默认值
export const chasingNumberDefault = {
  profitRateInfo: {
    startMultiple: 1,
    lowestIncomeRate: 50,
    chasingPeriodsCounts: 10
  },
  sameMultipleInfo: {
    startMultiple: 1,
    chasingPeriodsCounts: 10
  },
  doubleMultipleInfo: {
    chasingPeriodsCounts: 10,
    interval: 1,
    incrementMultiple: 2
  },
  periodsNumber: 10,
  stopChasingWn: true
}

// 通信时候相关label value的映射关系表
export const labelValueMap = {
  '豹子': 0,
  '顺子': 1,
  '对子': 2,
  '半顺': 3,
  '杂六': 4,
  '小': 0,
  '大': 1,
  '单': 2,
  '双': 3,
  '虎': 0,
  '和': 1,
  '龙': 2,
  '5单0双': 5,
  '4单1双': 4,
  '3单2双': 3,
  '2单3双': 2,
  '1单4双': 1,
  '0单5双': 0
}

// 任选中 对应的通信value
export const checkboxTypeLabelValue = {
  'ge': 0,
  'shi': 1,
  'bai': 2,
  'qian': 3,
  'wan': 4
}

// 查看对应投注记录中显示的每页条数
export const bettingRecordTablePageSize = {
  pageSize: 5
}

// 注单记录中status对应的状态显示码
export const bettingRecordLabel = {
  '0': '待开奖',
  '1': '已撤销',
  '2': '未中奖',
  '3': '已中奖',
  '4': '已派奖',
  '5': '系统撤销'
}

// 追号记录中status对应的状态显示码
export const bettingRecordChasingNumberLabel = {
  '0': '进行',
  '1': '已完成',
  '2': '用户终止',
  '3': '管理员终止',
  '4': '系统终止'
}

// 默认的快选金额列表
export const amountSelectData = [
  '1',
  '10',
  '25',
  '50',
  '200'
]

// 在参与计算中奖组时除以的最大金额
export const maxPrizeGroupOddCount = 2000

// 在盘口选号盘中对应的label通信中的value映射关系表
export const handicapLabelValueMap = {
  '小': 0,
  '大': 1,
  '单': 2,
  '双': 3,
  '豹子': 0,
  '顺子': 1,
  '对子': 2,
  '半顺': 3,
  '杂六': 4,
  '总和大': 1,
  '总和小': 0,
  '总和单': 1,
  '总和双': 0,
  '虎': 0,
  '和': 1,
  '龙': 2
}

// 在通信过程中 已选注数 模式的value配置表
export const handicapAjaxValueConfig = {
  singleCount: 1,
  coefficient: '1.000',
  // 偶数的投注模式
  coefficientEven: '1.000',
  // 奇数的投注模式
  coefficientOdd: '0.500'
}
// 盘口玩法中 默认的投注金额
export const handicapDefaultBetCount = {
  // 默认投注金额
  betCount: 2,
  // 最小投注金额
  minBetCount: 1,
  // 数字输入框的加减量
  betCountStep: 1
}
// 做号投注时 注单的相关信息的label值映射关系
export const createNumberMap = {
  '0': 'renxuan renxuan2 zhixuandanshi',
  '1': 'renxuan renxuan3 zhixuandanshi',
  '2': 'renxuan renxuan4 zhixuandanshi',
  '3': 'wuxing zhixuan danshi'
}

// 即开型彩种的相关默认设置
export const lotteryImDefault = {
  // 投注次数的默认档位显示
  betCountsData: [
    {
      label: '1次',
      value: 1
    },
    {
      label: '5次',
      value: 5
    },
    {
      label: '10次',
      value: 10
    },
    {
      label: '20次',
      value: 20
    }
  ],
  // 是否中奖后停止开奖
  isStopWin: true,
  // 默认选择开奖次数
  betCount: 1
}

// 更新用户余额及相关信息的更新时间间隔配置
// 毫秒为单位 1s = 1000ms
export const internalUpdateTime = 5000

// 头部菜单颜色
export const topMenulistColor = ['#b0b4cc', '#EB8787', '#86BED3', '#D0A9D2']

// 头部菜单加载样式定义
export const loaddingOptions = {
  body: false,
  fullscreen: false,
  background: 'rgba(0, 0, 0, 0.6)',
  text: '数据加载中...'
}

// 即开型彩种连续开奖的间隔时间 ms(毫秒)为单位 1s = 1000ms
export const intervalOpenLotteryIm = 500

export const msgType = {
  user: '用户私信',
  system: '站内消息'
}
// todo : 首页页面底部当前访问人数  和 当前 在线人数

// 点击客服新开窗口的配置对象
export const openNewCustomerServiceWindowConfig = {
  toolbar: 0,
  scrollbars: 0,
  location: 0,
  statusbar: 0,
  menubar: 0,
  resizable: 1,
  width: 930,
  height: 624
}

export const openNewCustomerServiceWindowName = 'kefutalk'
// 首页页面底部当前访问人数  和 当前 在线人数
export const homePagePeople = {
  OnlineNumber: 100603, /* 在线人数 */
  gameNumber: 100305, /* 游戏人数 */
  Min: -300, /* 最小值 */
  Max: 300 /* 最大值 */
}

// 排行数据中期数的选项
export const canSelectPeriodsNumber = [
  { name: '一期', value: 1 },
  { name: '二期', value: 2 },
  { name: '三期', value: 3 },
  { name: '四期', value: 4 },
  { name: '五期', value: 5 },
  { name: '六期', value: 6 }
]

// 响应式屏幕宽度判定界定值
export const screenShowMap = {
  'first': 1200,
  'second': 992,
  'third': 767
}

// 走势图中奖号码及线色
export const canvasLineColors = [ '#4c7195', '#c9a856' ]
