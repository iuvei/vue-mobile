import recharge from './datas/recharge'
import withdraw from './datas/withdraw'
import LotteryIssue from './datas/LotteryIssue'
import gameIssue from './datas/gameIssue'
import Novice from './datas/Novice'
import proxy from './datas/proxy'
export default[
  {
    title: '充值问题',
    icon: 'icon-card',
    content: recharge,
    list: [
      {title: '为什么充值未到账？', type: 'not_arrived'},
      {title: '如何使用网银充值？', type: 'online_banking'},
      {title: '如何使用微信充值？', type: 'WeChatPay'},
      {title: '如何使用支付宝充值？', type: 'Alipay'}
    ]
  },
  {
    title: '提现问题',
    content: withdraw,
    icon: 'icon-tixian',
    list: [
      {title: '为什么提现未到账？', type: 'notArrived'},
      {title: '如何提现？', type: 'HowToWithdraw'},
      {title: '流水(销量)是什么？', type: 'SalesVolume'}
    ]
  },
  {
    title: '彩票问题',
    icon: 'icon-jiugongge',
    content: LotteryIssue,
    list: [
      {title: '彩种介绍', type: 'kind'},
      {title: '玩法介绍', type: 'play'},
      {title: '下注介绍', type: 'bet'},
      {title: '中奖查询', type: 'Winning'}
    ]
  },
  {
    title: '彩票以外产品',
    icon: 'icon-iconfontyouxihudong',
    content: gameIssue,
    list: [
      {title: '如何开始游戏？', type: 'playGame'},
      {title: '产品介绍', type: 'product'},
      {title: '相关问题', type: 'related'}
    ]
  },
  {
    title: '新手专区',
    icon: 'icon-user',
    content: Novice,
    list: [
      {title: '平台使用教学', type: 'Tutorial'},
      {title: '如何修改密码、银行卡？', type: 'change'},
      {title: '报表记录介绍', type: 'Report'},
      {title: '彩票投注分析介绍', type: 'LotteryAnalysis'}
    ]
  },
  {
    title: '代理专区',
    icon: 'icon-tuandui2',
    content: proxy,
    list: [
      {title: '如何推广？', type: 'Promotion'},
      {title: '团队报表', type: 'Report'},
      {title: '用户设置', type: 'Setting'}
    ]
  }
]
