import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import {hide} from '../../src/util/loading'
// import { createGameRoutes } from '../util/auth' */

Vue.use(Router)

export const _import = require('./_import.' + process.env.NODE_ENV)

// createGameRoutes(store['getters'].menu)

const routes = [
  {
    path: '/',
    redirect: '/main/index'
  },
  {
    path: '/index',
    redirect: '/main/index'
  },
  {
    path: '/circuit',
    component: _import('home/circuit'),
    meta: {
      title: '线路检测'
    }
  },
  {
    path: '/register',
    component: _import('register/register_8_30'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/login',
    component: _import('login/login')
  },
  {
    path: '/main',
    component: _import('main/index'),
    children: [
      {
        path: 'user-center',
        name: 'user-center',
        component: _import('user-center/index'),
        children: [
          // 个人中心首页
          {
            path: 'account-management',
            name: 'account-management',
            component: _import('user-center/components/personal-center/account-management')
          },
          // 个人中心账号余额页面
          {
            path: 'account-balance',
            name: 'account-balance',
            component: _import('user-center/components/account-balance')
          },
          // 系统中心活动中心
          {
            path: 'activity-center',
            name: 'activity-center',
            component: _import('user-center/activity-center')
          },
          // 平台公告
          {
            path: 'announcement',
            name: 'announcement',
            component: _import('user-center/announcement')
          },
          // 站内信
          {
            path: 'stationLetter',
            name: 'stationLetter',
            component: _import('user-center/station-letter/index')
          },
          // 帮助中心
          {
            path: 'help-center',
            name: 'help-center',
            component: _import('user-center/help-center')
          },
          // 帮助中心详情
          {
            path: 'help-center-details',
            name: 'help-center-details',
            component: _import('user-center/help-center-datas')
          },
          // 财务中心
          {
            path: 'financial-center',
            name: 'financial-center',
            component: _import('user-center/financial-center/index'),
            children: [
              // 充值
              {
                path: 'financial-recharge',
                name: 'financial-recharge',
                component: _import('user-center/financial-center/components/recharge')
              },
              // 转账
              {
                path: 'financial-transfer',
                name: 'financial-transfer',
                component: _import('user-center/financial-center/components/transfer')
              },
              // 提现
              {
                path: 'financial-withdraw',
                name: 'financial-withdraw',
                component: _import('user-center/financial-center/components/withdraw')
              }
            ]
          },
          // 钱包进度
          {
            path: 'wallet-progress',
            name: 'wallet-progress',
            component: _import('user-center/financial-center/components/wallet-progress')
          },
          // 个人统计分析
          {
            path: 'account-statistics',
            name: 'account-statistics',
            component: _import('user-center/components/personal-center/account-statistics')
          },
          // 个人中心盈亏报表
          {
            path: 'account-profit',
            name: 'account-profit',
            component: _import('user-center/components/personal-center/account-profit')
          },
          // 个人账变明细
          {
            path: 'account-change',
            name: 'account-change',
            component: _import('user-center/components/personal-center/account-change')
          },
          // 个人游戏记录
          {
            path: 'account-gamerecord',
            name: 'account-gamerecord',
            component: _import('user-center/components/personal-center/account-gamerecord')
          },
          // 个人奖金总览
          {
            path: 'account-bonus',
            name: 'account-bonus',
            component: _import('user-center/components/personal-center/account-bonus')
          },
          // 团队用户管理
          {
            path: 'team-management',
            name: 'team-management',
            component: _import('user-center/components/team-center/team-management')
          },
          // 团队统计分析
          {
            path: 'team-statistics',
            name: 'team-statistics',
            component: _import('user-center/components/team-center/team-statistics')
          },
          // 团队盈亏报表
          {
            path: 'team-profit',
            name: 'team-profit',
            component: _import('user-center/components/team-center/team-profit')
          },
          // 团队账变明细
          {
            path: 'team-change',
            name: 'team-change',
            component: _import('user-center/components/team-center/team-change')
          },
          // 团队游戏记录
          {
            path: 'team-gamerecord',
            name: 'team-gamerecord',
            component: _import('user-center/components/team-center/team-gamerecord')
          },
          // 团队新增代理
          {
            path: 'team-addagent',
            name: 'team-addagent',
            component: _import('user-center/components/team-center/team-addagent')
          },
          // 团队代理推广
          {
            path: 'team-agentpromotion',
            name: 'team-agentpromotion',
            component: _import('user-center/components/team-center/team-agentpromotion')
          },
          // 团队资金报表
          {
            path: 'team-financial',
            name: 'team-financial',
            component: _import('user-center/components/team-center/team-financial')
          }
        ]
      },
      {
        path: 'index',
        component: _import('index/index'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'antiHijack',
        name: 'antiHijack',
        component: _import('about/anti_hijack'),
        meta: {
          title: '防劫持教程'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: _import('about/about'),
        meta: {
          title: '关于我们'
        }
      },
      {
        path: 'game',
        component: _import('game/game_8_30'),
        children: [
          {
            path: 'SSC/:gameTypeName',
            name: 'SSC',
            component: () => import('@/components/games/ssc/ssc'),
            redirect: { name: 'SSCNormal' },
            children: [
              {
                path: 'normal',
                name: 'SSCNormal',
                meta: {},
                component: () => import('@/components/games/ssc/normal/ssc-normal'),
                redirect: { name: 'ssc_qiansan' },
                children: [
                  {
                    path: 'qiansan',
                    name: 'ssc_qiansan',
                    meta: { sub_path: 'qiansan' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'ssc_qiansan_zhixuan_fushi' },
                    children: [
                      { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_fushi'), name: 'ssc_qiansan_zhixuan_fushi' },
                      { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_danshi'), name: 'ssc_qiansan_zhixuan_danshi' },
                      { path: 'zhixuan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_hezhi'), name: 'ssc_qiansan_zhixuan_hezhi' },
                      { path: 'zhixuan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/qiansan/zhixuan_kuadu'), name: 'ssc_qiansan_zhixuan_kuadu' },
                      { path: 'zuxuan_zuxuan_zusan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zusan'), name: 'ssc_qiansan_zuxuan_zusan' },
                      { path: 'zuxuan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zuliu'), name: 'ssc_qiansan_zuxuan_zuliu' },
                      { path: 'zuxuan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_hunhezuxuan'), name: 'ssc_qiansan_zuxuan_hunhezuxuan' },
                      { path: 'zuxuan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_hezhi'), name: 'ssc_qiansan_zuxuan_hezhi' },
                      { path: 'zuxuan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zusandanshi'), name: 'ssc_qiansan_zuxuan_zusandanshi' },
                      { path: 'zuxuan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zuliudanshi'), name: 'ssc_qiansan_zuxuan_zuliudanshi' },
                      { path: 'zuxuan_zuxuan_baodan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_baodan'), name: 'ssc_qiansan_zuxuan_baodan' },
                      { path: 'qita_qita_hezhiweishu', component: _import('credit/ssc/components/normal/qiansan/qita_hezhiweishu'), name: 'ssc_qiansan_qita_hezhiweishu' },
                      { path: 'qita_qita_teshuhaoma', component: _import('credit/ssc/components/normal/qiansan/qita_teshuhaoma'), name: 'ssc_qiansan_qita_teshuhaoma' },
                      { path: 'qita_qita_baozi', component: _import('credit/ssc/components/normal/qiansan/qita_baozi'), name: 'ssc_qiansan_qita_baozi' },
                      { path: 'qita_qita_shunzi', component: _import('credit/ssc/components/normal/qiansan/qita_shunzi'), name: 'ssc_qiansan_qita_shunzi' },
                      { path: 'qita_qita_duizi', component: _import('credit/ssc/components/normal/qiansan/qita_duizi'), name: 'ssc_qiansan_qita_duizi' },
                      { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/qiansan/qita_banshun'), name: 'ssc_qiansan_qita_banshun' },
                      { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/qiansan/qita_zaliu'), name: 'ssc_qiansan_qita_zaliu' }
                    ]
                  },
                  {
                    path: 'wuxing',
                    name: 'ssc_wuxing',
                    meta: { sub_path: 'wuxing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { path: 'zhixuan_zhixuan_fushi', name: 'ssc_wuxing_zhixuan_fushi' },
                    children: [
                      { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_fushi'), name: 'ssc_wuxing_zhixuan_fushi' },
                      { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_danshi'), name: 'ssc_wuxing_zhixuan_danshi' },
                      { path: 'zhixuan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_hezhi'), name: 'ssc_wuxing_zhixuan_hezhi' },
                      { path: 'zuxuan_zuxuan_zuxuan120', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan120'), name: 'ssc_wuxing_zuxuan_zuxuan120' },
                      { path: 'zuxuan_zuxuan_zuxuan60', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan60'), name: 'ssc_wuxing_zuxuan_zuxuan60' },
                      { path: 'zuxuan_zuxuan_zuxuan30', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan30'), name: 'ssc_wuxing_zuxuan_zuxuan30' },
                      { path: 'zuxuan_zuxuan_zuxuan20', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan20'), name: 'ssc_wuxing_zuxuan_zuxuan20' },
                      { path: 'zuxuan_zuxuan_zuxuan10', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan10'), name: 'ssc_wuxing_zuxuan_zuxuan10' },
                      { path: 'zuxuan_zuxuan_zuxuan5', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan5'), name: 'ssc_wuxing_zuxuan_zuxuan5' }
                    ]
                  },
                  {
                    path: 'qiansi',
                    name: 'ssc_qiansi',
                    meta: { sub_path: 'qiansi' },
                    redirect: { path: 'zhixuan_zhixuan_fushi', name: 'ssc_qiansi_zhixuan_fushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/qiansi/zhixuan_fushi'), name: 'ssc_qiansi_zhixuan_fushi' },
                      { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/qiansi/zhixuan_danshi'), name: 'ssc_qiansi_zhixuan_danshi' },
                      { path: 'zuxuan_zuxuan_zuxuan24', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan24'), name: 'ssc_qiansi_zuxuan_zuxuan24' },
                      { path: 'zuxuan_zuxuan_zuxuan12', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan12'), name: 'ssc_qiansi_zuxuan_zuxuan12' },
                      { path: 'zuxuan_zuxuan_zuxuan6', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan6'), name: 'ssc_qiansi_zuxuan_zuxuan6' },
                      { path: 'zuxuan_zuxuan_zuxuan4', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan4'), name: 'ssc_qiansi_zuxuan_zuxuan4' }
                    ]
                  },
                  {
                    path: 'sixing',
                    name: 'ssc_sixing',
                    meta: { sub_path: 'sixing' },
                    redirect: { path: 'sixing_zhixuan_fushi', name: 'ssc_sixing_zhixuan_fushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'sixing_zhixuan_fushi', component: _import('credit/ssc/components/normal/sixing/zhixuan_fushi'), name: 'ssc_sixing_zhixuan_fushi' },
                      { path: 'sixing_zhixuan_danshi', component: _import('credit/ssc/components/normal/sixing/zhixuan_danshi'), name: 'ssc_sixing_zhixuan_danshi' },
                      { path: 'sixing_zuxuan_zuxuan24', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan24'), name: 'ssc_sixing_zuxuan_zuxuan24' },
                      { path: 'sixing_zuxuan_zuxuan12', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan12'), name: 'ssc_sixing_zuxuan_zuxuan12' },
                      { path: 'sixing_zuxuan_zuxuan6', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan6'), name: 'ssc_sixing_zuxuan_zuxuan6' },
                      { path: 'sixing_zuxuan_zuxuan4', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan4'), name: 'ssc_sixing_zuxuan_zuxuan4' }
                    ]
                  },
                  {
                    path: 'zhongsan',
                    name: 'ssc_zhongsan',
                    meta: { sub_path: 'zhongsan' },
                    redirect: { path: 'zhongsan_zhixuan_fushi', name: 'ssc_zhongsan_zhixuan_fushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'zhongsan_zhixuan_fushi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_fushi'), name: 'ssc_zhongsan_zhixuan_fushi' },
                      { path: 'zhongsan_zhixuan_danshi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_danshi'), name: 'ssc_zhongsan_zhixuan_danshi' },
                      { path: 'zhongsan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_hezhi'), name: 'ssc_zhongsan_zhixuan_hezhi' },
                      { path: 'zhongsan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_kuadu'), name: 'ssc_zhongsan_zhixuan_kuadu' },
                      { path: 'zhongsan_zuxuan_zusan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zusan'), name: 'ssc_zhongsan_zuxuan_zusan' },
                      { path: 'zhongsan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zuliu'), name: 'ssc_zhongsan_zuxuan_zuliu' },
                      { path: 'zhongsan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_hunhezuxuan'), name: 'ssc_zhongsan_zuxuan_hunhezuxuan' },
                      { path: 'zhongsan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_hezhi'), name: 'ssc_zhongsan_zuxuan_hezhi' },
                      { path: 'zhongsan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zusandanshi'), name: 'ssc_zhongsan_zuxuan_zusandanshi' },
                      { path: 'zhongsan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zuliudanshi'), name: 'ssc_zhongsan_zuxuan_zuliudanshi' },
                      { path: 'zhongsan_zuxuan_baodan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_baodan'), name: 'ssc_zhongsan_zuxuan_baodan' },
                      { path: 'qita_qita_hezhiweishu', component: _import('credit/ssc/components/normal/zhongsan/qita_hezhiweishu'), name: 'ssc_zhongsan_qita_hezhiweishu' },
                      { path: 'qita_qita_teshuhaoma', component: _import('credit/ssc/components/normal/zhongsan/qita_teshuhaoma'), name: 'ssc_zhongsan_qita_teshuhaoma' },
                      { path: 'qita_qita_baozi', component: _import('credit/ssc/components/normal/zhongsan/qita_baozi'), name: 'ssc_zhongsan_qita_baozi' },
                      { path: 'qita_qita_shunzi', component: _import('credit/ssc/components/normal/zhongsan/qita_shunzi'), name: 'ssc_zhongsan_qita_shunzi' },
                      { path: 'qita_qita_duizi', component: _import('credit/ssc/components/normal/zhongsan/qita_duizi'), name: 'ssc_zhongsan_qita_duizi' },
                      { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/zhongsan/qita_banshun'), name: 'ssc_zhongsan_qita_banshun' },
                      { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/zhongsan/qita_zaliu'), name: 'ssc_zhongsan_qita_zaliu' }
                    ]
                  },
                  {
                    path: 'housan',
                    name: 'ssc_housan',
                    meta: { sub_path: 'housan' },
                    redirect: { path: 'housan_zhixuan_fushi', name: 'ssc_housan_zhixuan_fushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'housan_zhixuan_fushi', component: _import('credit/ssc/components/normal/housan/zhixuan_fushi'), name: 'ssc_housan_zhixuan_fushi' },
                      { path: 'housan_zhixuan_danshi', component: _import('credit/ssc/components/normal/housan/zhixuan_danshi'), name: 'ssc_housan_zhixuan_danshi' },
                      { path: 'housan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/housan/zhixuan_hezhi'), name: 'ssc_housan_zhixuan_hezhi' },
                      { path: 'housan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/housan/zhixuan_kuadu'), name: 'ssc_housan_zhixuan_kuadu' },
                      { path: 'housan_zuxuan_zusan', component: _import('credit/ssc/components/normal/housan/zuxuan_zusan'), name: 'ssc_housan_zuxuan_zusan' },
                      { path: 'housan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/housan/zuxuan_zuliu'), name: 'ssc_housan_zuxuan_zuliu' },
                      { path: 'housan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/housan/zuxuan_hunhezuxuan'), name: 'ssc_housan_zuxuan_hunhezuxuan' },
                      { path: 'housan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/housan/zuxuan_hezhi'), name: 'ssc_housan_zuxuan_hezhi' },
                      { path: 'housan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/housan/zuxuan_zusandanshi'), name: 'ssc_housan_zuxuan_zusandanshi' },
                      { path: 'housan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/housan/zuxuan_zuliudanshi'), name: 'ssc_housan_zuxuan_zuliudanshi' },
                      { path: 'housan_zuxuan_baodan', component: _import('credit/ssc/components/normal/housan/zuxuan_baodan'), name: 'ssc_housan_zuxuan_baodan' },
                      { path: 'housan_qita_hezhiweishu', component: _import('credit/ssc/components/normal/housan/qita_hezhiweishu'), name: 'ssc_housan_qita_hezhiweishu' },
                      { path: 'housan_qita_teshuhaoma', component: _import('credit/ssc/components/normal/housan/qita_teshuhaoma'), name: 'ssc_housan_qita_teshuhaoma' },
                      { path: 'housan_qita_baozi', component: _import('credit/ssc/components/normal/housan/qita_baozi'), name: 'ssc_housan_qita_baozi' },
                      { path: 'housan_qita_shunzi', component: _import('credit/ssc/components/normal/housan/qita_shunzi'), name: 'ssc_housan_qita_shunzi' },
                      { path: 'housan_qita_duizi', component: _import('credit/ssc/components/normal/housan/qita_duizi'), name: 'ssc_housan_qita_duizi' },
                      { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/housan/qita_banshun'), name: 'ssc_housan_qita_banshun' },
                      { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/housan/qita_zaliu'), name: 'ssc_housan_qita_zaliu' }
                    ]
                  },
                  {
                    path: 'erxing',
                    name: 'ssc_erxing',
                    meta: { sub_path: 'erxing' },
                    redirect: { path: 'erxing_zhixuan_houerfushi', name: 'ssc_erxing_zhixuan_houerfushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'erxing_zhixuan_houerfushi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerfushi'), name: 'ssc_erxing_zhixuan_houerfushi' },
                      { path: 'erxing_zhixuan_houerdanshi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerdanshi'), name: 'ssc_erxing_zhixuan_houerdanshi' },
                      { path: 'erxing_zhixuan_houerhezhi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerhezhi'), name: 'ssc_erxing_zhixuan_houerhezhi' },
                      { path: 'erxing_zhixuan_houerkuadu', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerkuadu'), name: 'ssc_erxing_zhixuan_houerkuadu' },
                      { path: 'erxing_zhixuan_qianerfushi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerfushi'), name: 'ssc_erxing_zhixuan_qianerfushi' },
                      { path: 'erxing_zhixuan_qianerdanshi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerdanshi'), name: 'ssc_erxing_zhixuan_qianerdanshi' },
                      { path: 'erxing_zhixuan_qianerhezhi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerhezhi'), name: 'ssc_erxing_zhixuan_qianerhezhi' },
                      { path: 'erxing_zhixuan_qianerkuadu', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerkuadu'), name: 'ssc_erxing_zhixuan_qianerkuadu' },
                      { path: 'erxing_zuxuan_houerfushi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerfushi'), name: 'ssc_erxing_zuxuan_houerfushi' },
                      { path: 'erxing_zuxuan_houerdanshi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerdanshi'), name: 'ssc_erxing_zuxuan_houerdanshi' },
                      { path: 'erxing_zuxuan_houerhezhi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerhezhi'), name: 'ssc_erxing_zuxuan_houerhezhi' },
                      { path: 'erxing_zuxuan_houerbaodan', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerbaodan'), name: 'ssc_erxing_zuxuan_houerbaodan' },
                      { path: 'erxing_zuxuan_qianerfushi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerfushi'), name: 'ssc_erxing_zuxuan_qianerfushi' },
                      { path: 'erxing_zuxuan_qianerdanshi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerdanshi'), name: 'ssc_erxing_zuxuan_qianerdanshi' },
                      { path: 'erxing_zuxuan_qianerbaodan', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerbaodan'), name: 'ssc_erxing_zuxuan_qianerbaodan' },
                      { path: 'erxing_zuxuan_qianerhezhi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerhezhi'), name: 'ssc_erxing_zuxuan_qianerhezhi' }
                    ]
                  },
                  {
                    path: 'yixing',
                    name: 'ssc_yixing',
                    meta: { sub_path: 'yixing' },
                    redirect: { path: 'yixing_dingweidan_fushi', name: 'ssc_yixing_dingweidan_fushi' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'yixing_dingweidan_fushi', component: _import('credit/ssc/components/normal/yixing/dingweidan_fushi'), name: 'ssc_yixing_dingweidan_fushi' }
                    ]
                  },
                  {
                    path: 'budingwei',
                    name: 'ssc_budingwei',
                    redirect: { path: 'budingwei_sanxingbudingwei_housanyimabudingwei', name: 'ssc_budingwei_sanxingbudingwei_housanyimabudingwei' },
                    meta: { sub_path: 'budingwei' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'budingwei_sanxingbudingwei_housanyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_housanyimabudingwei'), name: 'ssc_budingwei_sanxingbudingwei_housanyimabudingwei' },
                      { path: 'budingwei_sanxingbudingwei_housanermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_housanermabudingwei'), name: 'ssc_budingwei_sanxingbudingwei_housanermabudingwei' },
                      { path: 'budingwei_sanxingbudingwei_qiansanyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_qiansanyimabudingwei'), name: 'ssc_budingwei_sanxingbudingwei_qiansanyimabudingwei' },
                      { path: 'budingwei_sanxingbudingwei_qiansanermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_qiansanermabudingwei'), name: 'ssc_budingwei_sanxingbudingwei_qiansanermabudingwei' },
                      { path: 'budingwei_sixingbudingwei_sixingyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sixingbudingwei_sixingyimabudingwei'), name: 'ssc_budingwei_sixingbudingwei_sixingyimabudingwei' },
                      { path: 'budingwei_sixingbudingwei_sixingermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sixingbudingwei_sixingermabudingwei'), name: 'ssc_budingwei_sixingbudingwei_sixingermabudingwei' },
                      { path: 'budingwei_wuxingbudingwei_wuxingermabudingwei', component: _import('credit/ssc/components/normal/budingwei/wuxingbudingwei_wuxingermabudingwei'), name: 'ssc_budingwei_wuxingbudingwei_wuxingermabudingwei' },
                      { path: 'budingwei_wuxingbudingwei_wuxingsanmabudingwei', component: _import('credit/ssc/components/normal/budingwei/wuxingbudingwei_wuxingsanmabudingwei'), name: 'ssc_budingwei_wuxingbudingwei_wuxingsanmabudingwei' }
                    ]
                  },
                  {
                    path: 'daxiaodanshuang',
                    name: 'ssc_daxiaodanshuang',
                    meta: { sub_path: 'daxiaodanshuang' },
                    redirect: { path: 'daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang', name: 'ssc_daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang' },
                    component: _import('credit/ssc/layout'),
                    children: [
                      { path: 'daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_houerdaxiaodanshuang'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang' },
                      { path: 'daxiaodanshuang_daxiaodanshuang_housandaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_housandaxiaodanshuang'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_housandaxiaodanshuang' },
                      { path: 'daxiaodanshuang_daxiaodanshuang_qianerdaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_qianerdaxiaodanshuang'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_qianerdaxiaodanshuang' },
                      { path: 'daxiaodanshuang_daxiaodanshuang_qiansandaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_qiansandaxiaodanshuang'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_qiansandaxiaodanshuang' },
                      { path: 'daxiaodanshuang_daxiaodanshuang_wxhzdxds', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_wxhzdxds'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_wxhzdxds' },
                      { path: 'daxiaodanshuang_daxiaodanshuang_danshuangzuhe', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_danshuangzuhe'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_danshuangzuhe' },
                      { path: 'daxiaodanshuang_daxiaozuhe', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_daxiaozuhe'), name: 'ssc_daxiaodanshuang_daxiaodanshuang_daxiaozuhe' }
                    ]
                  },
                  {
                    path: 'quwei',
                    name: 'ssc_quwei',
                    meta: { sub_path: 'quwei' },
                    component: _import('credit/ssc/layout'),
                    redirect: { path: 'quwei_quwei_wumaquweisanxing', name: 'ssc_quwei_quwei_wumaquweisanxing' },
                    children: [
                      { path: 'quwei_quwei_wumaquweisanxing', component: _import('credit/ssc/components/normal/quwei/quwei_wumaquweisanxing'), name: 'ssc_quwei_quwei_wumaquweisanxing' },
                      { path: 'quwei_quwei_simaquweisanxing', component: _import('credit/ssc/components/normal/quwei/quwei_simaquweisanxing'), name: 'ssc_quwei_quwei_simaquweisanxing' },
                      { path: 'quwei_quwei_housanquweierxing', component: _import('credit/ssc/components/normal/quwei/quwei_housanquweierxing'), name: 'ssc_quwei_quwei_housanquweierxing' },
                      { path: 'quwei_quwei_qiansanquweierxing', component: _import('credit/ssc/components/normal/quwei/quwei_qiansanquweierxing'), name: 'ssc_quwei_quwei_qiansanquweierxing' },
                      { path: 'quwei_qujian_wumaqujiansanxing', component: _import('credit/ssc/components/normal/quwei/qujian_wumaqujiansanxing'), name: 'ssc_quwei_qujian_wumaqujiansanxing' },
                      { path: 'quwei_qujian_simaqujiansanxing', component: _import('credit/ssc/components/normal/quwei/qujian_simaqujiansanxing'), name: 'ssc_quwei_qujian_simaqujiansanxing' },
                      { path: 'quwei_qujian_housanqujianerxing', component: _import('credit/ssc/components/normal/quwei/qujian_housanqujianerxing'), name: 'ssc_quwei_qujian_housanqujianerxing' },
                      { path: 'quwei_qujian_qiansanqujianerxing', component: _import('credit/ssc/components/normal/quwei/qujian_qiansanqujianerxing'), name: 'ssc_quwei_qujian_qiansanqujianerxing' },
                      { path: 'quwei_teshu_yifanfengshun', component: _import('credit/ssc/components/normal/quwei/teshu_yifanfengshun'), name: 'ssc_quwei_teshu_yifanfengshun' },
                      { path: 'quwei_teshu_haoshichengshuang', component: _import('credit/ssc/components/normal/quwei/teshu_haoshichengshuang'), name: 'ssc_quwei_teshu_haoshichengshuang' },
                      { path: 'quwei_teshu_sanxingbaoxi', component: _import('credit/ssc/components/normal/quwei/teshu_sanxingbaoxi'), name: 'ssc_quwei_teshu_sanxingbaoxi' },
                      { path: 'quwei_teshu_sijifacai', component: _import('credit/ssc/components/normal/quwei/teshu_sijifacai'), name: 'ssc_quwei_teshu_sijifacai' }
                    ]
                  },
                  {
                    path: 'renxuan',
                    name: 'ssc_renxuan',
                    meta: { sub_path: 'renxuan' },
                    component: _import('credit/ssc/layout'),
                    redirect: { path: 'renxuan_renxuan2_zhixuanfushi', name: 'ssc_renxuan_renxuan2_zhixuanfushi' },
                    children: [
                      { path: 'renxuan_renxuan2_zhixuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuanfushi'), name: 'ssc_renxuan_renxuan2_zhixuanfushi' },
                      { path: 'renxuan_renxuan2_zhixuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuandanshi'), name: 'ssc_renxuan_renxuan2_zhixuandanshi' },
                      { path: 'renxuan_renxuan2_zhixuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuanhezhi'), name: 'ssc_renxuan_renxuan2_zhixuanhezhi' },
                      { path: 'renxuan_renxuan2_zhixuankuadu', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuankuadu'), name: 'ssc_renxuan_renxuan2_zhixuankuadu' },
                      { path: 'renxuan_renxuan2_zuxuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuanfushi'), name: 'ssc_renxuan_renxuan2_zuxuanfushi' },
                      { path: 'renxuan_renxuan2_zuxuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuandanshi'), name: 'ssc_renxuan_renxuan2_zuxuandanshi' },
                      { path: 'renxuan_renxuan2_zuxuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuanhezhi'), name: 'ssc_renxuan_renxuan2_zuxuanhezhi' },
                      { path: 'renxuan_renxuan3_zhixuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuanfushi'), name: 'ssc_renxuan_renxuan3_zhixuanfushi' },
                      { path: 'renxuan_renxuan3_zhixuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuandanshi'), name: 'ssc_renxuan_renxuan3_zhixuandanshi' },
                      { path: 'renxuan_renxuan3_zhixuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuanhezhi'), name: 'ssc_renxuan_renxuan3_zhixuanhezhi' },
                      { path: 'renxuan_renxuan3_zhixuankuadu', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuankuadu'), name: 'ssc_renxuan_renxuan3_zhixuankuadu' },
                      { path: 'renxuan_renxuan3_zu3fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu3fushi'), name: 'ssc_renxuan_renxuan3_zu3fushi' },
                      { path: 'renxuan_renxuan3_zu3danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu3danshi'), name: 'ssc_renxuan_renxuan3_zu3danshi' },
                      { path: 'renxuan_renxuan3_zu6fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu6fushi'), name: 'ssc_renxuan_renxuan3_zu6fushi' },
                      { path: 'renxuan_renxuan3_zu6danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu6danshi'), name: 'ssc_renxuan_renxuan3_zu6danshi' },
                      { path: 'renxuan_renxuan3_hunhezuxuan', component: _import('credit/ssc/components/normal/renxuan/renxuan3_hunhezuxuan'), name: 'ssc_renxuan_renxuan3_hunhezuxuan' },
                      { path: 'renxuan_renxuan3_zuxuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zuxuanhezhi'), name: 'ssc_renxuan_renxuan3_zuxuanhezhi' },
                      { path: 'renxuan_renxuan4_fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan4_fushi'), name: 'ssc_renxuan_renxuan4_fushi' },
                      { path: 'renxuan_renxuan4_danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan4_danshi'), name: 'ssc_renxuan_renxuan4_danshi' },
                      { path: 'renxuan_renxuan4_zuxuan24', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan24'), name: 'ssc_renxuan_renxuan4_zuxuan24' },
                      { path: 'renxuan_renxuan4_zuxuan12', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan12'), name: 'ssc_renxuan_renxuan4_zuxuan12' },
                      { path: 'renxuan_renxuan4_zuxuan6', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan6'), name: 'ssc_renxuan_renxuan4_zuxuan6' },
                      { path: 'renxuan_renxuan4_zuxuan4', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan4'), name: 'ssc_renxuan_renxuan4_zuxuan4' }
                    ]
                  },
                  {
                    path: 'longhu',
                    name: 'ssc_longhu',
                    meta: { sub_path: 'longhu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { path: 'longhu_longhu_wq', name: 'ssc_longhu_longhu_wq' },
                    children: [
                      { path: 'longhu_longhu_wq', component: _import('credit/ssc/components/normal/longhu/longhu_wq'), name: 'ssc_longhu_longhu_wq' },
                      { path: 'longhu_longhu_wb', component: _import('credit/ssc/components/normal/longhu/longhu_wb'), name: 'ssc_longhu_longhu_wb' },
                      { path: 'longhu_longhu_ws', component: _import('credit/ssc/components/normal/longhu/longhu_ws'), name: 'ssc_longhu_longhu_ws' },
                      { path: 'longhu_longhu_wg', component: _import('credit/ssc/components/normal/longhu/longhu_wg'), name: 'ssc_longhu_longhu_wg' },
                      { path: 'longhu_longhu_qb', component: _import('credit/ssc/components/normal/longhu/longhu_qb'), name: 'ssc_longhu_longhu_qb' },
                      { path: 'longhu_longhu_qs', component: _import('credit/ssc/components/normal/longhu/longhu_qs'), name: 'ssc_longhu_longhu_qs' },
                      { path: 'longhu_longhu_qg', component: _import('credit/ssc/components/normal/longhu/longhu_qg'), name: 'ssc_longhu_longhu_qg' },
                      { path: 'longhu_longhu_bs', component: _import('credit/ssc/components/normal/longhu/longhu_bs'), name: 'ssc_longhu_longhu_bs' },
                      { path: 'longhu_longhu_bg', component: _import('credit/ssc/components/normal/longhu/longhu_bg'), name: 'ssc_longhu_longhu_bg' },
                      { path: 'longhu_longhu_sg', component: _import('credit/ssc/components/normal/longhu/longhu_sg'), name: 'ssc_longhu_longhu_sg' },
                      { path: 'longhu_he_wq', component: _import('credit/ssc/components/normal/longhu/he_wq'), name: 'ssc_longhu_he_wq' },
                      { path: 'longhu_he_ws', component: _import('credit/ssc/components/normal/longhu/he_ws'), name: 'ssc_longhu_he_ws' },
                      { path: 'longhu_he_wg', component: _import('credit/ssc/components/normal/longhu/he_wg'), name: 'ssc_longhu_he_wg' },
                      { path: 'longhu_he_qb', component: _import('credit/ssc/components/normal/longhu/he_qb'), name: 'ssc_longhu_he_qb' },
                      { path: 'longhu_he_qs', component: _import('credit/ssc/components/normal/longhu/he_qs'), name: 'ssc_longhu_he_qs' },
                      { path: 'longhu_he_qg', component: _import('credit/ssc/components/normal/longhu/he_qg'), name: 'ssc_longhu_he_qg' },
                      { path: 'longhu_he_bs', component: _import('credit/ssc/components/normal/longhu/he_bs'), name: 'ssc_longhu_he_bs' },
                      { path: 'longhu_he_bg', component: _import('credit/ssc/components/normal/longhu/he_bg'), name: 'ssc_longhu_he_bg' },
                      { path: 'longhu_he_sg', component: _import('credit/ssc/components/normal/longhu/he_sg'), name: 'ssc_longhu_he_sg' },
                      { path: 'longhu_he_wb', component: _import('credit/ssc/components/normal/longhu/he_wb'), name: 'ssc_longhu_he_wb' }
                    ]
                  },
                  {
                    path: 'caibuchu',
                    name: 'ssc_caibuchu',
                    meta: { sub_path: 'caibuchu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { path: 'caibuchu_caibuchu_cbc1', name: 'ssc_caibuchu_caibuchu_cbc1' },
                    children: [
                      { path: 'caibuchu_caibuchu_cbc1', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc1'), name: 'ssc_caibuchu_caibuchu_cbc1' },
                      { path: 'caibuchu_caibuchu_cbc2', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc2'), name: 'ssc_caibuchu_caibuchu_cbc2' },
                      { path: 'caibuchu_caibuchu_cbc3', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc3'), name: 'ssc_caibuchu_caibuchu_cbc3' },
                      { path: 'caibuchu_caibuchu_cbc4', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc4'), name: 'ssc_caibuchu_caibuchu_cbc4' },
                      { path: 'caibuchu_caibuchu_cbc5', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc5'), name: 'ssc_caibuchu_caibuchu_cbc5' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'SSCHandicap',
                component: () => import('@/components/games/ssc/handicap/ssc-handicap'),
                redirect: { name: 'ssc_handicap_integrate' },
                children: [
                  {
                    path: 'integrate',
                    name: 'ssc_handicap_integrate',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_integrate_integrate' },
                    children: [
                      { path: 'integrate', component: _import('credit/ssc/components/handicap/integrate/integrate'), name: 'ssc_handicap_integrate_integrate' }
                    ]
                  },
                  {
                    path: 'first',
                    name: 'ssc_handicap_first',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_first_first_ball' },
                    children: [
                      { path: 'first_ball', component: _import('credit/ssc/components/handicap/first/first_ball'), name: 'ssc_handicap_first_first_ball' }
                    ]
                  },
                  { path: 'second',
                    name: 'ssc_handicap_second',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_second_second_ball' },
                    children: [
                      { path: 'second_ball', component: _import('credit/ssc/components/handicap/second/second_ball'), name: 'ssc_handicap_second_second_ball' }
                    ]
                  },
                  { path: 'third',
                    name: 'ssc_handicap_third',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_third_third_ball' },
                    children: [
                      { path: 'third_ball', component: _import('credit/ssc/components/handicap/third/third_ball'), name: 'ssc_handicap_third_third_ball' }
                    ]
                  },
                  { path: 'fourth',
                    name: 'ssc_handicap_fourth',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_fourth_fourth_ball' },
                    children: [
                      { path: 'fourth_ball', component: _import('credit/ssc/components/handicap/fourth/fourth_ball'), name: 'ssc_handicap_fourth_fourth_ball' }
                    ]
                  },
                  { path: 'fifth',
                    name: 'ssc_handicap_fifth',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_fifth_fifth_ball' },
                    children: [
                      { path: 'fifth_ball', component: _import('credit/ssc/components/handicap/fifth/fifth_ball'), name: 'ssc_handicap_fifth_fifth_ball' }
                    ]
                  },
                  { path: 'longhu',
                    name: 'ssc_handicap_longhu',
                    meta: { sub_path: 'longhu' },
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'ssc_handicap_longhu_longhu' },
                    children: [
                      { path: 'longhu', meta: { sub_path: 'longhu' }, component: _import('credit/ssc/components/handicap/longhuhe/longhuhe'), name: 'ssc_handicap_longhu_longhu' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'SSC-IM/:gameTypeName',
            name: 'SSC-IM',
            component: () => import('@/components/games/ssc/ssc-immediately'),
            redirect: { name: 'ssc-im_qiansan' },
            children: [
              {
                path: 'qiansan',
                name: 'ssc-im_qiansan',
                meta: { sub_path: 'qiansan' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_qiansan_zhixuan_fushi' },
                children: [
                  { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_fushi'), name: 'ssc-im_qiansan_zhixuan_fushi' },
                  { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_danshi'), name: 'ssc-im_qiansan_zhixuan_danshi' },
                  { path: 'zhixuan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/qiansan/zhixuan_hezhi'), name: 'ssc-im_qiansan_zhixuan_hezhi' },
                  { path: 'zhixuan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/qiansan/zhixuan_kuadu'), name: 'ssc-im_qiansan_zhixuan_kuadu' },
                  { path: 'zuxuan_zuxuan_zusan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zusan'), name: 'ssc-im_qiansan_zuxuan_zusan' },
                  { path: 'zuxuan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zuliu'), name: 'ssc-im_qiansan_zuxuan_zuliu' },
                  { path: 'zuxuan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_hunhezuxuan'), name: 'ssc-im_qiansan_zuxuan_hunhezuxuan' },
                  { path: 'zuxuan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_hezhi'), name: 'ssc-im_qiansan_zuxuan_hezhi' },
                  { path: 'zuxuan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zusandanshi'), name: 'ssc-im_qiansan_zuxuan_zusandanshi' },
                  { path: 'zuxuan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/qiansan/zuxuan_zuliudanshi'), name: 'ssc-im_qiansan_zuxuan_zuliudanshi' },
                  { path: 'zuxuan_zuxuan_baodan', component: _import('credit/ssc/components/normal/qiansan/zuxuan_baodan'), name: 'ssc-im_qiansan_zuxuan_baodan' },
                  { path: 'qita_qita_hezhiweishu', component: _import('credit/ssc/components/normal/qiansan/qita_hezhiweishu'), name: 'ssc-im_qiansan_qita_hezhiweishu' },
                  { path: 'qita_qita_teshuhaoma', component: _import('credit/ssc/components/normal/qiansan/qita_teshuhaoma'), name: 'ssc-im_qiansan_qita_teshuhaoma' },
                  { path: 'qita_qita_baozi', component: _import('credit/ssc/components/normal/qiansan/qita_baozi'), name: 'ssc-im_qiansan_qita_baozi' },
                  { path: 'qita_qita_shunzi', component: _import('credit/ssc/components/normal/qiansan/qita_shunzi'), name: 'ssc-im_qiansan_qita_shunzi' },
                  { path: 'qita_qita_duizi', component: _import('credit/ssc/components/normal/qiansan/qita_duizi'), name: 'ssc-im_qiansan_qita_duizi' },
                  { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/qiansan/qita_banshun'), name: 'ssc-im_qiansan_qita_banshun' },
                  { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/qiansan/qita_zaliu'), name: 'ssc-im_qiansan_qita_zaliu' }
                ]
              },
              {
                path: 'wuxing',
                name: 'ssc-im_wuxing',
                meta: { sub_path: 'wuxing' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_wuxing_zhixuan_fushi' },
                children: [
                  { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_fushi'), name: 'ssc-im_wuxing_zhixuan_fushi' },
                  { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_danshi'), name: 'ssc-im_wuxing_zhixuan_danshi' },
                  { path: 'zhixuan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/wuxing/zhixuan_hezhi'), name: 'ssc-im_wuxing_zhixuan_hezhi' },
                  { path: 'zuxuan_zuxuan_zuxuan120', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan120'), name: 'ssc-im_wuxing_zuxuan_zuxuan120' },
                  { path: 'zuxuan_zuxuan_zuxuan60', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan60'), name: 'ssc-im_wuxing_zuxuan_zuxuan60' },
                  { path: 'zuxuan_zuxuan_zuxuan30', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan30'), name: 'ssc-im_wuxing_zuxuan_zuxuan30' },
                  { path: 'zuxuan_zuxuan_zuxuan20', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan20'), name: 'ssc-im_wuxing_zuxuan_zuxuan20' },
                  { path: 'zuxuan_zuxuan_zuxuan10', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan10'), name: 'ssc-im_wuxing_zuxuan_zuxuan10' },
                  { path: 'zuxuan_zuxuan_zuxuan5', component: _import('credit/ssc/components/normal/wuxing/zuxuan_zuxuan5'), name: 'ssc-im_wuxing_zuxuan_zuxuan5' }
                ]
              },
              {
                path: 'qiansi',
                name: 'ssc-im_qiansi',
                meta: { sub_path: 'qiansi' },
                redirect: { name: 'ssc-im_qiansi_zhixuan_fushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'zhixuan_zhixuan_fushi', component: _import('credit/ssc/components/normal/qiansi/zhixuan_fushi'), name: 'ssc-im_qiansi_zhixuan_fushi' },
                  { path: 'zhixuan_zhixuan_danshi', component: _import('credit/ssc/components/normal/qiansi/zhixuan_danshi'), name: 'ssc-im_qiansi_zhixuan_danshi' },
                  { path: 'zuxuan_zuxuan_zuxuan24', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan24'), name: 'ssc-im_qiansi_zuxuan_zuxuan24' },
                  { path: 'zuxuan_zuxuan_zuxuan12', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan12'), name: 'ssc-im_qiansi_zuxuan_zuxuan12' },
                  { path: 'zuxuan_zuxuan_zuxuan6', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan6'), name: 'ssc-im_qiansi_zuxuan_zuxuan6' },
                  { path: 'zuxuan_zuxuan_zuxuan4', component: _import('credit/ssc/components/normal/qiansi/zuxuan_zuxuan4'), name: 'ssc-im_qiansi_zuxuan_zuxuan4' }
                ]
              },
              {
                path: 'sixing',
                name: 'ssc-im_sixing',
                meta: { sub_path: 'sixing' },
                redirect: { name: 'ssc-im_sixing_zhixuan_fushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'sixing_zhixuan_fushi', component: _import('credit/ssc/components/normal/sixing/zhixuan_fushi'), name: 'ssc-im_sixing_zhixuan_fushi' },
                  { path: 'sixing_zhixuan_danshi', component: _import('credit/ssc/components/normal/sixing/zhixuan_danshi'), name: 'ssc-im_sixing_zhixuan_danshi' },
                  { path: 'sixing_zuxuan_zuxuan24', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan24'), name: 'ssc-im_sixing_zuxuan_zuxuan24' },
                  { path: 'sixing_zuxuan_zuxuan12', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan12'), name: 'ssc-im_sixing_zuxuan_zuxuan12' },
                  { path: 'sixing_zuxuan_zuxuan6', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan6'), name: 'ssc-im_sixing_zuxuan_zuxuan6' },
                  { path: 'sixing_zuxuan_zuxuan4', component: _import('credit/ssc/components/normal/sixing/zuxuan_zuxuan4'), name: 'ssc-im_sixing_zuxuan_zuxuan4' }
                ]
              },
              {
                path: 'zhongsan',
                name: 'ssc-im_zhongsan',
                meta: { sub_path: 'zhongsan' },
                redirect: { name: 'ssc-im_zhongsan_zhixuan_fushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'zhongsan_zhixuan_fushi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_fushi'), name: 'ssc-im_zhongsan_zhixuan_fushi' },
                  { path: 'zhongsan_zhixuan_danshi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_danshi'), name: 'ssc-im_zhongsan_zhixuan_danshi' },
                  { path: 'zhongsan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_hezhi'), name: 'ssc-im_zhongsan_zhixuan_hezhi' },
                  { path: 'zhongsan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/zhongsan/zhixuan_kuadu'), name: 'ssc-im_zhongsan_zhixuan_kuadu' },
                  { path: 'zhongsan_zuxuan_zusan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zusan'), name: 'ssc-im_zhongsan_zuxuan_zusan' },
                  { path: 'zhongsan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zuliu'), name: 'ssc-im_zhongsan_zuxuan_zuliu' },
                  { path: 'zhongsan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_hunhezuxuan'), name: 'ssc-im_zhongsan_zuxuan_hunhezuxuan' },
                  { path: 'zhongsan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_hezhi'), name: 'ssc-im_zhongsan_zuxuan_hezhi' },
                  { path: 'zhongsan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zusandanshi'), name: 'ssc-im_zhongsan_zuxuan_zusandanshi' },
                  { path: 'zhongsan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_zuliudanshi'), name: 'ssc-im_zhongsan_zuxuan_zuliudanshi' },
                  { path: 'zhongsan_zuxuan_baodan', component: _import('credit/ssc/components/normal/zhongsan/zuxuan_baodan'), name: 'ssc-im_zhongsan_zuxuan_baodan' },
                  { path: 'qita_qita_hezhiweishu', component: _import('credit/ssc/components/normal/zhongsan/qita_hezhiweishu'), name: 'ssc-im_zhongsan_qita_hezhiweishu' },
                  { path: 'qita_qita_teshuhaoma', component: _import('credit/ssc/components/normal/zhongsan/qita_teshuhaoma'), name: 'ssc-im_zhongsan_qita_teshuhaoma' },
                  { path: 'qita_qita_baozi', component: _import('credit/ssc/components/normal/zhongsan/qita_baozi'), name: 'ssc-im_zhongsan_qita_baozi' },
                  { path: 'qita_qita_shunzi', component: _import('credit/ssc/components/normal/zhongsan/qita_shunzi'), name: 'ssc-im_zhongsan_qita_shunzi' },
                  { path: 'qita_qita_duizi', component: _import('credit/ssc/components/normal/zhongsan/qita_duizi'), name: 'ssc-im_zhongsan_qita_duizi' },
                  { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/zhongsan/qita_banshun'), name: 'ssc-im_zhongsan_qita_banshun' },
                  { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/zhongsan/qita_zaliu'), name: 'ssc-im_zhongsan_qita_zaliu' }
                ]
              },
              {
                path: 'housan',
                name: 'ssc-im_housan',
                meta: { sub_path: 'housan' },
                redirect: { name: 'ssc-im_housan_zhixuan_fushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'housan_zhixuan_fushi', component: _import('credit/ssc/components/normal/housan/zhixuan_fushi'), name: 'ssc-im_housan_zhixuan_fushi' },
                  { path: 'housan_zhixuan_danshi', component: _import('credit/ssc/components/normal/housan/zhixuan_danshi'), name: 'ssc-im_housan_zhixuan_danshi' },
                  { path: 'housan_zhixuan_hezhi', component: _import('credit/ssc/components/normal/housan/zhixuan_hezhi'), name: 'ssc-im_housan_zhixuan_hezhi' },
                  { path: 'housan_zhixuan_kuadu', component: _import('credit/ssc/components/normal/housan/zhixuan_kuadu'), name: 'ssc-im_housan_zhixuan_kuadu' },
                  { path: 'housan_zuxuan_zusan', component: _import('credit/ssc/components/normal/housan/zuxuan_zusan'), name: 'ssc-im_housan_zuxuan_zusan' },
                  { path: 'housan_zuxuan_zuliu', component: _import('credit/ssc/components/normal/housan/zuxuan_zuliu'), name: 'ssc-im_housan_zuxuan_zuliu' },
                  { path: 'housan_zuxuan_hunhezuxuan', component: _import('credit/ssc/components/normal/housan/zuxuan_hunhezuxuan'), name: 'ssc-im_housan_zuxuan_hunhezuxuan' },
                  { path: 'housan_zuxuan_hezhi', component: _import('credit/ssc/components/normal/housan/zuxuan_hezhi'), name: 'ssc-im_housan_zuxuan_hezhi' },
                  { path: 'housan_zuxuan_zusandanshi', component: _import('credit/ssc/components/normal/housan/zuxuan_zusandanshi'), name: 'ssc-im_housan_zuxuan_zusandanshi' },
                  { path: 'housan_zuxuan_zuliudanshi', component: _import('credit/ssc/components/normal/housan/zuxuan_zuliudanshi'), name: 'ssc-im_housan_zuxuan_zuliudanshi' },
                  { path: 'housan_zuxuan_baodan', component: _import('credit/ssc/components/normal/housan/zuxuan_baodan'), name: 'ssc-im_housan_zuxuan_baodan' },
                  { path: 'housan_qita_hezhiweishu', component: _import('credit/ssc/components/normal/housan/qita_hezhiweishu'), name: 'ssc-im_housan_qita_hezhiweishu' },
                  { path: 'housan_qita_teshuhaoma', component: _import('credit/ssc/components/normal/housan/qita_teshuhaoma'), name: 'ssc-im_housan_qita_teshuhaoma' },
                  { path: 'housan_qita_baozi', component: _import('credit/ssc/components/normal/housan/qita_baozi'), name: 'ssc-im_housan_qita_baozi' },
                  { path: 'housan_qita_shunzi', component: _import('credit/ssc/components/normal/housan/qita_shunzi'), name: 'ssc-im_housan_qita_shunzi' },
                  { path: 'housan_qita_duizi', component: _import('credit/ssc/components/normal/housan/qita_duizi'), name: 'ssc-im_housan_qita_duizi' },
                  { path: 'qita_qita_banshun', component: _import('credit/ssc/components/normal/housan/qita_banshun'), name: 'ssc-im_housan_qita_banshun' },
                  { path: 'qita_qita_zaliu', component: _import('credit/ssc/components/normal/housan/qita_zaliu'), name: 'ssc-im_housan_qita_zaliu' }
                ]
              },
              {
                path: 'erxing',
                name: 'ssc-im_erxing',
                meta: { sub_path: 'erxing' },
                redirect: { name: 'ssc-im_erxing_zhixuan_houerfushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'erxing_zhixuan_houerfushi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerfushi'), name: 'ssc-im_erxing_zhixuan_houerfushi' },
                  { path: 'erxing_zhixuan_houerdanshi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerdanshi'), name: 'ssc-im_erxing_zhixuan_houerdanshi' },
                  { path: 'erxing_zhixuan_houerhezhi', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerhezhi'), name: 'ssc-im_erxing_zhixuan_houerhezhi' },
                  { path: 'erxing_zhixuan_houerkuadu', component: _import('credit/ssc/components/normal/erxing/zhixuan_houerkuadu'), name: 'ssc-im_erxing_zhixuan_houerkuadu' },
                  { path: 'erxing_zhixuan_qianerfushi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerfushi'), name: 'ssc-im_erxing_zhixuan_qianerfushi' },
                  { path: 'erxing_zhixuan_qianerdanshi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerdanshi'), name: 'ssc-im_erxing_zhixuan_qianerdanshi' },
                  { path: 'erxing_zhixuan_qianerhezhi', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerhezhi'), name: 'ssc-im_erxing_zhixuan_qianerhezhi' },
                  { path: 'erxing_zhixuan_qianerkuadu', component: _import('credit/ssc/components/normal/erxing/zhixuan_qianerkuadu'), name: 'ssc-im_erxing_zhixuan_qianerkuadu' },
                  { path: 'erxing_zuxuan_houerfushi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerfushi'), name: 'ssc-im_erxing_zuxuan_houerfushi' },
                  { path: 'erxing_zuxuan_houerdanshi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerdanshi'), name: 'ssc-im_erxing_zuxuan_houerdanshi' },
                  { path: 'erxing_zuxuan_houerhezhi', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerhezhi'), name: 'ssc-im_erxing_zuxuan_houerhezhi' },
                  { path: 'erxing_zuxuan_houerbaodan', component: _import('credit/ssc/components/normal/erxing/zuxuan_houerbaodan'), name: 'ssc-im_erxing_zuxuan_houerbaodan' },
                  { path: 'erxing_zuxuan_qianerfushi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerfushi'), name: 'ssc-im_erxing_zuxuan_qianerfushi' },
                  { path: 'erxing_zuxuan_qianerdanshi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerdanshi'), name: 'ssc-im_erxing_zuxuan_qianerdanshi' },
                  { path: 'erxing_zuxuan_qianerbaodan', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerbaodan'), name: 'ssc-im_erxing_zuxuan_qianerbaodan' },
                  { path: 'erxing_zuxuan_qianerhezhi', component: _import('credit/ssc/components/normal/erxing/zuxuan_qianerhezhi'), name: 'ssc-im_erxing_zuxuan_qianerhezhi' }
                ]
              },
              {
                path: 'yixing',
                name: 'ssc-im_yixing',
                meta: { sub_path: 'yixing' },
                redirect: { name: 'ssc-im_yixing_dingweidan_fushi' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'yixing_dingweidan_fushi', component: _import('credit/ssc/components/normal/yixing/dingweidan_fushi'), name: 'ssc-im_yixing_dingweidan_fushi' }
                ]
              },
              {
                path: 'budingwei',
                name: 'ssc-im_budingwei',
                redirect: { name: 'ssc-im_budingwei_sanxingbudingwei_housanyimabudingwei' },
                meta: { sub_path: 'budingwei' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'budingwei_sanxingbudingwei_housanyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_housanyimabudingwei'), name: 'ssc-im_budingwei_sanxingbudingwei_housanyimabudingwei' },
                  { path: 'budingwei_sanxingbudingwei_housanermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_housanermabudingwei'), name: 'ssc-im_budingwei_sanxingbudingwei_housanermabudingwei' },
                  { path: 'budingwei_sanxingbudingwei_qiansanyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_qiansanyimabudingwei'), name: 'ssc-im_budingwei_sanxingbudingwei_qiansanyimabudingwei' },
                  { path: 'budingwei_sanxingbudingwei_qiansanermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sanxingbudingwei_qiansanermabudingwei'), name: 'ssc-im_budingwei_sanxingbudingwei_qiansanermabudingwei' },
                  { path: 'budingwei_sixingbudingwei_sixingyimabudingwei', component: _import('credit/ssc/components/normal/budingwei/sixingbudingwei_sixingyimabudingwei'), name: 'ssc-im_budingwei_sixingbudingwei_sixingyimabudingwei' },
                  { path: 'budingwei_sixingbudingwei_sixingermabudingwei', component: _import('credit/ssc/components/normal/budingwei/sixingbudingwei_sixingermabudingwei'), name: 'ssc-im_budingwei_sixingbudingwei_sixingermabudingwei' },
                  { path: 'budingwei_wuxingbudingwei_wuxingermabudingwei', component: _import('credit/ssc/components/normal/budingwei/wuxingbudingwei_wuxingermabudingwei'), name: 'ssc-im_budingwei_wuxingbudingwei_wuxingermabudingwei' },
                  { path: 'budingwei_wuxingbudingwei_wuxingsanmabudingwei', component: _import('credit/ssc/components/normal/budingwei/wuxingbudingwei_wuxingsanmabudingwei'), name: 'ssc-im_budingwei_wuxingbudingwei_wuxingsanmabudingwei' }
                ]
              },
              {
                path: 'daxiaodanshuang',
                name: 'ssc-im_daxiaodanshuang',
                meta: { sub_path: 'daxiaodanshuang' },
                redirect: { name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang' },
                component: _import('credit/ssc/layout-im'),
                children: [
                  { path: 'daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_houerdaxiaodanshuang'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_houerdaxiaodanshuang' },
                  { path: 'daxiaodanshuang_daxiaodanshuang_housandaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_housandaxiaodanshuang'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_housandaxiaodanshuang' },
                  { path: 'daxiaodanshuang_daxiaodanshuang_qianerdaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_qianerdaxiaodanshuang'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_qianerdaxiaodanshuang' },
                  { path: 'daxiaodanshuang_daxiaodanshuang_qiansandaxiaodanshuang', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_qiansandaxiaodanshuang'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_qiansandaxiaodanshuang' },
                  { path: 'daxiaodanshuang_daxiaodanshuang_wxhzdxds', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_wxhzdxds'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_wxhzdxds' },
                  { path: 'daxiaodanshuang_daxiaodanshuang_danshuangzuhe', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_danshuangzuhe'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_danshuangzuhe' },
                  { path: 'daxiaodanshuang_daxiaozuhe', component: _import('credit/ssc/components/normal/daxiaodanshuang/daxiaodanshuang_daxiaozuhe'), name: 'ssc-im_daxiaodanshuang_daxiaodanshuang_daxiaozuhe' }
                ]
              },
              {
                path: 'quwei',
                name: 'ssc-im_quwei',
                meta: { sub_path: 'quwei' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_quwei_quwei_wumaquweisanxing' },
                children: [
                  { path: 'quwei_quwei_wumaquweisanxing', component: _import('credit/ssc/components/normal/quwei/quwei_wumaquweisanxing'), name: 'ssc-im_quwei_quwei_wumaquweisanxing' },
                  { path: 'quwei_quwei_simaquweisanxing', component: _import('credit/ssc/components/normal/quwei/quwei_simaquweisanxing'), name: 'ssc-im_quwei_quwei_simaquweisanxing' },
                  { path: 'quwei_quwei_housanquweierxing', component: _import('credit/ssc/components/normal/quwei/quwei_housanquweierxing'), name: 'ssc-im_quwei_quwei_housanquweierxing' },
                  { path: 'quwei_quwei_qiansanquweierxing', component: _import('credit/ssc/components/normal/quwei/quwei_qiansanquweierxing'), name: 'ssc-im_quwei_quwei_qiansanquweierxing' },
                  { path: 'quwei_qujian_wumaqujiansanxing', component: _import('credit/ssc/components/normal/quwei/qujian_wumaqujiansanxing'), name: 'ssc-im_quwei_qujian_wumaqujiansanxing' },
                  { path: 'quwei_qujian_simaqujiansanxing', component: _import('credit/ssc/components/normal/quwei/qujian_simaqujiansanxing'), name: 'ssc-im_quwei_qujian_simaqujiansanxing' },
                  { path: 'quwei_qujian_housanqujianerxing', component: _import('credit/ssc/components/normal/quwei/qujian_housanqujianerxing'), name: 'ssc-im_quwei_qujian_housanqujianerxing' },
                  { path: 'quwei_qujian_qiansanqujianerxing', component: _import('credit/ssc/components/normal/quwei/qujian_qiansanqujianerxing'), name: 'ssc-im_quwei_qujian_qiansanqujianerxing' },
                  { path: 'quwei_teshu_yifanfengshun', component: _import('credit/ssc/components/normal/quwei/teshu_yifanfengshun'), name: 'ssc-im_quwei_teshu_yifanfengshun' },
                  { path: 'quwei_teshu_haoshichengshuang', component: _import('credit/ssc/components/normal/quwei/teshu_haoshichengshuang'), name: 'ssc-im_quwei_teshu_haoshichengshuang' },
                  { path: 'quwei_teshu_sanxingbaoxi', component: _import('credit/ssc/components/normal/quwei/teshu_sanxingbaoxi'), name: 'ssc-im_quwei_teshu_sanxingbaoxi' },
                  { path: 'quwei_teshu_sijifacai', component: _import('credit/ssc/components/normal/quwei/teshu_sijifacai'), name: 'ssc-im_quwei_teshu_sijifacai' }
                ]
              },
              {
                path: 'renxuan',
                name: 'ssc-im_renxuan',
                meta: { sub_path: 'renxuan' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_renxuan_renxuan2_zhixuanfushi' },
                children: [
                  { path: 'renxuan_renxuan2_zhixuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuanfushi'), name: 'ssc-im_renxuan_renxuan2_zhixuanfushi' },
                  { path: 'renxuan_renxuan2_zhixuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuandanshi'), name: 'ssc-im_renxuan_renxuan2_zhixuandanshi' },
                  { path: 'renxuan_renxuan2_zhixuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuanhezhi'), name: 'ssc-im_renxuan_renxuan2_zhixuanhezhi' },
                  { path: 'renxuan_renxuan2_zhixuankuadu', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zhixuankuadu'), name: 'ssc-im_renxuan_renxuan2_zhixuankuadu' },
                  { path: 'renxuan_renxuan2_zuxuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuanfushi'), name: 'ssc-im_renxuan_renxuan2_zuxuanfushi' },
                  { path: 'renxuan_renxuan2_zuxuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuandanshi'), name: 'ssc-im_renxuan_renxuan2_zuxuandanshi' },
                  { path: 'renxuan_renxuan2_zuxuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan2_zuxuanhezhi'), name: 'ssc-im_renxuan_renxuan2_zuxuanhezhi' },
                  { path: 'renxuan_renxuan3_zhixuanfushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuanfushi'), name: 'ssc-im_renxuan_renxuan3_zhixuanfushi' },
                  { path: 'renxuan_renxuan3_zhixuandanshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuandanshi'), name: 'ssc-im_renxuan_renxuan3_zhixuandanshi' },
                  { path: 'renxuan_renxuan3_zhixuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuanhezhi'), name: 'ssc-im_renxuan_renxuan3_zhixuanhezhi' },
                  { path: 'renxuan_renxuan3_zhixuankuadu', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zhixuankuadu'), name: 'ssc-im_renxuan_renxuan3_zhixuankuadu' },
                  { path: 'renxuan_renxuan3_zu3fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu3fushi'), name: 'ssc-im_renxuan_renxuan3_zu3fushi' },
                  { path: 'renxuan_renxuan3_zu3danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu3danshi'), name: 'ssc-im_renxuan_renxuan3_zu3danshi' },
                  { path: 'renxuan_renxuan3_zu6fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu6fushi'), name: 'ssc-im_renxuan_renxuan3_zu6fushi' },
                  { path: 'renxuan_renxuan3_zu6danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zu6danshi'), name: 'ssc-im_renxuan_renxuan3_zu6danshi' },
                  { path: 'renxuan_renxuan3_hunhezuxuan', component: _import('credit/ssc/components/normal/renxuan/renxuan3_hunhezuxuan'), name: 'ssc-im_renxuan_renxuan3_hunhezuxuan' },
                  { path: 'renxuan_renxuan3_zuxuanhezhi', component: _import('credit/ssc/components/normal/renxuan/renxuan3_zuxuanhezhi'), name: 'ssc-im_renxuan_renxuan3_zuxuanhezhi' },
                  { path: 'renxuan_renxuan4_fushi', component: _import('credit/ssc/components/normal/renxuan/renxuan4_fushi'), name: 'ssc-im_renxuan_renxuan4_fushi' },
                  { path: 'renxuan_renxuan4_danshi', component: _import('credit/ssc/components/normal/renxuan/renxuan4_danshi'), name: 'ssc-im_renxuan_renxuan4_danshi' },
                  { path: 'renxuan_renxuan4_zuxuan24', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan24'), name: 'ssc-im_renxuan_renxuan4_zuxuan24' },
                  { path: 'renxuan_renxuan4_zuxuan12', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan12'), name: 'ssc-im_renxuan_renxuan4_zuxuan12' },
                  { path: 'renxuan_renxuan4_zuxuan6', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan6'), name: 'ssc-im_renxuan_renxuan4_zuxuan6' },
                  { path: 'renxuan_renxuan4_zuxuan4', component: _import('credit/ssc/components/normal/renxuan/renxuan4_zuxuan4'), name: 'ssc-im_renxuan_renxuan4_zuxuan4' }
                ]
              },
              {
                path: 'longhu',
                name: 'ssc-im_longhu',
                meta: { sub_path: 'longhu' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_longhu_longhu_wq' },
                children: [
                  { path: 'longhu_longhu_wq', component: _import('credit/ssc/components/normal/longhu/longhu_wq'), name: 'ssc-im_longhu_longhu_wq' },
                  { path: 'longhu_longhu_wb', component: _import('credit/ssc/components/normal/longhu/longhu_wb'), name: 'ssc-im_longhu_longhu_wb' },
                  { path: 'longhu_longhu_ws', component: _import('credit/ssc/components/normal/longhu/longhu_ws'), name: 'ssc-im_longhu_longhu_ws' },
                  { path: 'longhu_longhu_wg', component: _import('credit/ssc/components/normal/longhu/longhu_wg'), name: 'ssc-im_longhu_longhu_wg' },
                  { path: 'longhu_longhu_qb', component: _import('credit/ssc/components/normal/longhu/longhu_qb'), name: 'ssc-im_longhu_longhu_qb' },
                  { path: 'longhu_longhu_qs', component: _import('credit/ssc/components/normal/longhu/longhu_qs'), name: 'ssc-im_longhu_longhu_qs' },
                  { path: 'longhu_longhu_qg', component: _import('credit/ssc/components/normal/longhu/longhu_qg'), name: 'ssc-im_longhu_longhu_qg' },
                  { path: 'longhu_longhu_bs', component: _import('credit/ssc/components/normal/longhu/longhu_bs'), name: 'ssc-im_longhu_longhu_bs' },
                  { path: 'longhu_longhu_bg', component: _import('credit/ssc/components/normal/longhu/longhu_bg'), name: 'ssc-im_longhu_longhu_bg' },
                  { path: 'longhu_longhu_sg', component: _import('credit/ssc/components/normal/longhu/longhu_sg'), name: 'ssc-im_longhu_longhu_sg' },
                  { path: 'longhu_he_wq', component: _import('credit/ssc/components/normal/longhu/he_wq'), name: 'ssc-im_longhu_he_wq' },
                  { path: 'longhu_he_ws', component: _import('credit/ssc/components/normal/longhu/he_ws'), name: 'ssc-im_longhu_he_ws' },
                  { path: 'longhu_he_wg', component: _import('credit/ssc/components/normal/longhu/he_wg'), name: 'ssc-im_longhu_he_wg' },
                  { path: 'longhu_he_qb', component: _import('credit/ssc/components/normal/longhu/he_qb'), name: 'ssc-im_longhu_he_qb' },
                  { path: 'longhu_he_qs', component: _import('credit/ssc/components/normal/longhu/he_qs'), name: 'ssc-im_longhu_he_qs' },
                  { path: 'longhu_he_qg', component: _import('credit/ssc/components/normal/longhu/he_qg'), name: 'ssc-im_longhu_he_qg' },
                  { path: 'longhu_he_bs', component: _import('credit/ssc/components/normal/longhu/he_bs'), name: 'ssc-im_longhu_he_bs' },
                  { path: 'longhu_he_bg', component: _import('credit/ssc/components/normal/longhu/he_bg'), name: 'ssc-im_longhu_he_bg' },
                  { path: 'longhu_he_sg', component: _import('credit/ssc/components/normal/longhu/he_sg'), name: 'ssc-im_longhu_he_sg' },
                  { path: 'longhu_he_wb', component: _import('credit/ssc/components/normal/longhu/he_wb'), name: 'ssc-im_longhu_he_wb' }
                ]
              },
              {
                path: 'caibuchu',
                name: 'ssc-im_caibuchu',
                meta: { sub_path: 'caibuchu' },
                component: _import('credit/ssc/layout-im'),
                redirect: { name: 'ssc-im_caibuchu_caibuchu_cbc1' },
                children: [
                  { path: 'caibuchu_caibuchu_cbc1', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc1'), name: 'ssc-im_caibuchu_caibuchu_cbc1' },
                  { path: 'caibuchu_caibuchu_cbc2', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc2'), name: 'ssc-im_caibuchu_caibuchu_cbc2' },
                  { path: 'caibuchu_caibuchu_cbc3', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc3'), name: 'ssc-im_caibuchu_caibuchu_cbc3' },
                  { path: 'caibuchu_caibuchu_cbc4', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc4'), name: 'ssc-im_caibuchu_caibuchu_cbc4' },
                  { path: 'caibuchu_caibuchu_cbc5', component: _import('credit/ssc/components/normal/caibuchu/caibuchu_cbc5'), name: 'ssc-im_caibuchu_caibuchu_cbc5' }
                ]
              }
            ]
          },
          {
            path: 'L115/:gameTypeName',
            name: 'L115',
            component: () => import('@/components/games/11x5/11x5'),
            redirect: { name: 'L115Normal' },
            children: [
              {
                path: 'normal',
                name: 'L115Normal',
                meta: {},
                component: () => import('@/components/games/11x5/normal/11x5-normal'),
                redirect: { name: '11x5_sanma' },
                children: [
                  {
                    path: 'sanma',
                    name: '11x5_sanma',
                    meta: { sub_path: 'sanma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_sanma_zhixuan_fushi' },
                    children: [
                      { path: 'zhixuan_zhixuan_fushi', component: _import('credit/11x5/components/normal/sanma/zhixuan_fushi'), name: '11x5_sanma_zhixuan_fushi' },
                      { path: 'zhixuan_zhixuan_danshi', component: _import('credit/11x5/components/normal/sanma/zhixuan_danshi'), name: '11x5_sanma_zhixuan_danshi' },
                      { path: 'zuxuan_zuxuan_fushi', component: _import('credit/11x5/components/normal/sanma/zuxuan_fushi'), name: '11x5_sanma_zuxuan_fushi' },
                      { path: 'zuxuan_zuxuan_danshi', component: _import('credit/11x5/components/normal/sanma/zuxuan_danshi'), name: '11x5_sanma_zuxuan_danshi' },
                      { path: 'zuxuan_zuxuan_dantuo', component: _import('credit/11x5/components/normal/sanma/zuxuan_dantuo'), name: '11x5_sanma_zuxuan_dantuo' }
                    ]
                  },
                  {
                    path: 'erma',
                    name: '11x5_erma',
                    meta: { sub_path: 'erma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_erma_zhixuan_fushi' },
                    children: [
                      { path: 'zhixuan_zhixuan_fushi', component: _import('credit/11x5/components/normal/erma/zhixuan_fushi'), name: '11x5_erma_zhixuan_fushi' },
                      { path: 'zhixuan_zhixuan_danshi', component: _import('credit/11x5/components/normal/erma/zhixuan_danshi'), name: '11x5_erma_zhixuan_danshi' },
                      { path: 'zuxuan_zuxuan_fushi', component: _import('credit/11x5/components/normal/erma/zuxuan_fushi'), name: '11x5_erma_zuxuan_fushi' },
                      { path: 'zuxuan_zuxuan_danshi', component: _import('credit/11x5/components/normal/erma/zuxuan_danshi'), name: '11x5_erma_zuxuan_danshi' },
                      { path: 'zuxuan_zuxuan_dantuo', component: _import('credit/11x5/components/normal/erma/zuxuan_dantuo'), name: '11x5_erma_zuxuan_dantuo' }
                    ]
                  },
                  {
                    path: 'budingwei',
                    name: '11x5_budingwei',
                    meta: { sub_path: 'budingwei' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_budingwei_budingwei_budingwei' },
                    children: [
                      { path: 'budingwei_budingwei', component: _import('credit/11x5/components/normal/budingwei/budingwei'), name: '11x5_budingwei_budingwei_budingwei' }
                    ]
                  },
                  {
                    path: 'quweixing',
                    name: '11x5_quweixing',
                    meta: { sub_path: 'quweixing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_quweixing_quweixing_dingdanshuang' },
                    children: [
                      { path: 'quweixing_dingdanshuang', component: _import('credit/11x5/components/normal/quweixing/quweixing_dingdanshuang'), name: '11x5_quweixing_quweixing_dingdanshuang' },
                      { path: 'quweixing_caizhongwei', component: _import('credit/11x5/components/normal/quweixing/quweixing_caizhongwei'), name: '11x5_quweixing_quweixing_caizhongwei' }
                    ]
                  },
                  {
                    path: 'dingweidan',
                    name: '11x5_dingweidan',
                    meta: { sub_path: 'dingweidan' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_dingweidan_dingweidan_dingweidan' },
                    children: [
                      { path: 'dingweidan_dingweidan', component: _import('credit/11x5/components/normal/dingweidan/dingweidan_dingweidan'), name: '11x5_dingweidan_dingweidan_dingweidan' }
                    ]
                  },
                  {
                    path: 'renxuanfushi',
                    name: '11x5_renxuanfushi',
                    meta: { sub_path: 'renxuanfushi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_renxuanfushi_renxuanfushi_renxuanyi' },
                    children: [
                      { path: 'renxuanfushi_renxuanyi', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuanyi'), name: '11x5_renxuanfushi_renxuanfushi_renxuanyi' },
                      { path: 'renxuanfushi_renxuaner', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuaner'), name: '11x5_renxuanfushi_renxuanfushi_renxuaner' },
                      { path: 'renxuanfushi_renxuansan', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuansan'), name: '11x5_renxuanfushi_renxuanfushi_renxuansan' },
                      { path: 'renxuanfushi_renxuansi', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuansi'), name: '11x5_renxuanfushi_renxuanfushi_renxuansi' },
                      { path: 'renxuanfushi_renxuanwu', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuanwu'), name: '11x5_renxuanfushi_renxuanfushi_renxuanwu' },
                      { path: 'renxuanfushi_renxuanliu', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuanliu'), name: '11x5_renxuanfushi_renxuanfushi_renxuanliu' },
                      { path: 'renxuanfushi_renxuanqi', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuanqi'), name: '11x5_renxuanfushi_renxuanfushi_renxuanqi' },
                      { path: 'renxuanfushi_renxuanba', component: _import('credit/11x5/components/normal/renxuanfushi/renxuanfushi_renxuanba'), name: '11x5_renxuanfushi_renxuanfushi_renxuanba' }
                    ]
                  },
                  {
                    path: 'renxuandanshi',
                    name: '11x5_renxuandanshi',
                    meta: { sub_path: 'renxuandanshi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_renxuandanshi_renxuandanshi_renxuaner' },
                    children: [
                      { path: 'renxuandanshi_renxuanyi', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuanyi'), name: '11x5_renxuandanshi_renxuandanshi_renxuanyi' },
                      { path: 'renxuandanshi_renxuaner', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuaner'), name: '11x5_renxuandanshi_renxuandanshi_renxuaner' },
                      { path: 'renxuandanshi_renxuansan', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuansan'), name: '11x5_renxuandanshi_renxuandanshi_renxuansan' },
                      { path: 'renxuandanshi_renxuansi', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuansi'), name: '11x5_renxuandanshi_renxuandanshi_renxuansi' },
                      { path: 'renxuandanshi_renxuanwu', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuanwu'), name: '11x5_renxuandanshi_renxuandanshi_renxuanwu' },
                      { path: 'renxuandanshi_renxuanliu', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuanliu'), name: '11x5_renxuandanshi_renxuandanshi_renxuanliu' },
                      { path: 'renxuandanshi_renxuanqi', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuanqi'), name: '11x5_renxuandanshi_renxuandanshi_renxuanqi' },
                      { path: 'renxuandanshi_renxuanba', component: _import('credit/11x5/components/normal/renxuandanshi/renxuandanshi_renxuanba'), name: '11x5_renxuandanshi_renxuandanshi_renxuanba' }
                    ]
                  },
                  {
                    path: 'renxuandantuo',
                    name: '11x5_renxuandantuo',
                    meta: { sub_path: 'renxuandantuo' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_renxuandantuo_renxuandantuo_renxuaner' },
                    children: [
                      { path: 'renxuandantuo_renxuaner', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuaner'), name: '11x5_renxuandantuo_renxuandantuo_renxuaner' },
                      { path: 'renxuandantuo_renxuansan', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuansan'), name: '11x5_renxuandantuo_renxuandantuo_renxuansan' },
                      { path: 'renxuandantuo_renxuansi', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuansi'), name: '11x5_renxuandantuo_renxuandantuo_renxuansi' },
                      { path: 'renxuandantuo_renxuanwu', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuanwu'), name: '11x5_renxuandantuo_renxuandantuo_renxuanwu' },
                      { path: 'renxuandantuo_renxuanliu', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuanliu'), name: '11x5_renxuandantuo_renxuandantuo_renxuanliu' },
                      { path: 'renxuandantuo_renxuanqi', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuanqi'), name: '11x5_renxuandantuo_renxuandantuo_renxuanqi' },
                      { path: 'renxuandantuo_renxuanba', component: _import('credit/11x5/components/normal/renxuandantuo/renxuandantuo_renxuanba'), name: '11x5_renxuandantuo_renxuandantuo_renxuanba' }
                    ]
                  },
                  {
                    path: 'caibuchu',
                    name: '11x5_caibuchu',
                    meta: { sub_path: 'caibuchu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '11x5_caibuchu_caibuchu_cbc1' },
                    children: [
                      { path: 'caibuchu_cbc1', component: _import('credit/11x5/components/normal/caibuchu/caibuchu_cbc1'), name: '11x5_caibuchu_caibuchu_cbc1' },
                      { path: 'caibuchu_cbc2', component: _import('credit/11x5/components/normal/caibuchu/caibuchu_cbc2'), name: '11x5_caibuchu_caibuchu_cbc2' },
                      { path: 'caibuchu_cbc3', component: _import('credit/11x5/components/normal/caibuchu/caibuchu_cbc3'), name: '11x5_caibuchu_caibuchu_cbc3' },
                      { path: 'caibuchu_cbc4', component: _import('credit/11x5/components/normal/caibuchu/caibuchu_cbc4'), name: '11x5_caibuchu_caibuchu_cbc4' },
                      { path: 'caibuchu_cbc5', component: _import('credit/11x5/components/normal/caibuchu/caibuchu_cbc5'), name: '11x5_caibuchu_caibuchu_cbc5' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'L115Handicap',
                component: () => import('@/components/games/11x5/handicap/11x5-handicap'),
                redirect: { name: '11x5_handicap_lm' },
                children: [
                  {
                    path: 'lm',
                    name: '11x5_handicap_lm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: '11x5_handicap_lm_lm' },
                    children: [
                      { path: 'lm', component: _import('credit/11x5/components/handicap/lm/lm'), name: '11x5_handicap_lm_lm' }
                    ]
                  },
                  {
                    path: 'dh',
                    name: '11x5_handicap_dh',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: '11x5_handicap_dh_dh' },
                    children: [
                      { path: 'dh', component: _import('credit/11x5/components/handicap/dh/dh'), name: '11x5_handicap_dh_dh' }
                    ]
                  },
                  {
                    path: 'lh',
                    name: '11x5_handicap_lh',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: '11x5_handicap_lh_lhh' },
                    children: [
                      { path: 'lhh', component: _import('credit/11x5/components/handicap/lh/lhh'), name: '11x5_handicap_lh_lhh' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'K3/:gameTypeName',
            name: 'K3',
            component: () => import('@/components/games/k3/ks'),
            redirect: { name: 'K3Normal' },
            children: [
              {
                path: 'normal',
                name: 'K3Normal',
                meta: {},
                component: () => import('@/components/games/k3/normal/ks-normal'),
                redirect: { name: 'k3_hz' },
                children: [
                  {
                    path: 'hz',
                    name: 'k3_hz',
                    meta: { sub_path: 'hz' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_hz_hz_fs' },
                    children: [
                      { path: 'hz_fs', component: _import('credit/ks/components/normal/hz/hz_fs'), name: 'k3_hz_hz_fs' }
                    ]
                  },
                  {
                    path: 'sth',
                    name: 'k3_sth',
                    meta: { sub_path: 'sth' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_sth_sth_dx' },
                    children: [
                      { path: 'sth_dx', component: _import('credit/ks/components/normal/sth/sth_dx'), name: 'k3_sth_sth_dx' },
                      { path: 'sth_tx', component: _import('credit/ks/components/normal/sth/sth_tx'), name: 'k3_sth_sth_tx' }
                    ]
                  },
                  {
                    path: 'eth',
                    name: 'k3_eth',
                    meta: { sub_path: 'eth' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_eth_eth_dx' },
                    children: [
                      { path: 'eth_dx', component: _import('credit/ks/components/normal/eth/eth_dx'), name: 'k3_eth_eth_dx' },
                      { path: 'eth_fx', component: _import('credit/ks/components/normal/eth/eth_fx'), name: 'k3_eth_eth_fx' }
                    ]
                  },
                  {
                    path: 'sbth',
                    name: 'k3_sbth',
                    meta: { sub_path: 'sbth' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_sbth_sbth_fs' },
                    children: [
                      { path: 'sbth_fs', component: _import('credit/ks/components/normal/sbth/sbth_fs'), name: 'k3_sbth_sbth_fs' }
                    ]
                  },
                  {
                    path: 'ebth',
                    name: 'k3_ebth',
                    meta: { sub_path: 'ebth' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_ebth_ebth_fs' },
                    children: [
                      { path: 'ebth_fs', component: _import('credit/ks/components/normal/ebth/ebth_fs'), name: 'k3_ebth_ebth_fs' }
                    ]
                  },
                  {
                    path: 'slh',
                    name: 'k3_slh',
                    meta: { sub_path: 'slh' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_slh_slh_fs' },
                    children: [
                      { path: 'slh_fs', component: _import('credit/ks/components/normal/slh/slh_fs'), name: 'k3_slh_slh_fs' }
                    ]
                  },
                  {
                    path: 'dx',
                    name: 'k3_dx',
                    meta: { sub_path: 'dx' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_dx_dx_fs' },
                    children: [
                      { path: 'dx_fs', component: _import('credit/ks/components/normal/dx/dx_fs'), name: 'k3_dx_dx_fs' }
                    ]
                  },
                  {
                    path: 'ds',
                    name: 'k3_ds',
                    meta: { sub_path: 'ds' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_ds_ds_fs' },
                    children: [
                      { path: 'ds_fs', component: _import('credit/ks/components/normal/ds/ds_fs'), name: 'k3_ds_ds_fs' }
                    ]
                  },
                  {
                    path: 'bdw',
                    name: 'k3_bdw',
                    meta: { sub_path: 'bdw' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_bdw_bdw_fs' },
                    children: [
                      { path: 'bdw_fs', component: _import('credit/ks/components/normal/bdw/bdw_fs'), name: 'k3_bdw_bdw_fs' }
                    ]
                  },
                  {
                    path: 'caibuchu',
                    name: 'k3_caibuchu',
                    meta: { sub_path: 'caibuchu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_caibuchu_caibuchu_cbc1' },
                    children: [
                      { path: 'caibuchu_cbc1', component: _import('credit/ks/components/normal/caibuchu/caibuchu_cbc1'), name: 'k3_caibuchu_caibuchu_cbc1' },
                      { path: 'caibuchu_cbc2', component: _import('credit/ks/components/normal/caibuchu/caibuchu_cbc2'), name: 'k3_caibuchu_caibuchu_cbc2' },
                      { path: 'caibuchu_cbc3', component: _import('credit/ks/components/normal/caibuchu/caibuchu_cbc3'), name: 'k3_caibuchu_caibuchu_cbc3' }
                    ]
                  },
                  {
                    path: 'color',
                    name: 'k3_color',
                    meta: { sub_path: 'color' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'k3_color_color_red' },
                    children: [
                      { path: 'color_red', component: _import('credit/ks/components/normal/color/color_red'), name: 'k3_color_color_red' },
                      { path: 'color_black', component: _import('credit/ks/components/normal/color/color_black'), name: 'k3_color_color_black' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'K3Handicap',
                component: () => import('@/components/games/k3/handicap/k3-handicap'),
                redirect: { name: 'k3_handicap_dxsb' },
                children: [
                  {
                    path: 'dxsb',
                    name: 'k3_handicap_dxsb',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'k3_handicap_dxsb_dxsb' },
                    children: [
                      { path: 'dxsb', component: _import('credit/ks/components/handicap/dxsb/dxsb'), name: 'k3_handicap_dxsb_dxsb' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: '3D/:gameTypeName',
            name: '3D',
            component: () => import('@/components/games/3d/3d'),
            redirect: { name: '3DNormal' },
            children: [
              {
                path: 'normal',
                name: '3DNormal',
                component: () => import('@/components/games/3d/normal/3d-normal'),
                redirect: { name: '3d_housan' },
                children: [
                  {
                    path: 'housan',
                    name: '3d_housan',
                    meta: { sub_path: 'housan' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_housan_zhixuan_fushi' },
                    children: [
                      { path: 'zhixuan_fushi', component: _import('credit/3d/components/normal/housan/zhixuan_fushi'), name: '3d_housan_zhixuan_fushi' },
                      { path: 'zhixuan_danshi', component: _import('credit/3d/components/normal/housan/zhixuan_danshi'), name: '3d_housan_zhixuan_danshi' },
                      { path: 'zhixuan_hezhi', component: _import('credit/3d/components/normal/housan/zhixuan_hezhi'), name: '3d_housan_zhixuan_hezhi' },
                      { path: 'zuxuan_zusan', component: _import('credit/3d/components/normal/housan/zuxuan_zusan'), name: '3d_housan_zuxuan_zusan' },
                      { path: 'zuxuan_zuliu', component: _import('credit/3d/components/normal/housan/zuxuan_zuliu'), name: '3d_housan_zuxuan_zuliu' },
                      { path: 'zuxuan_hunhezuxuan', component: _import('credit/3d/components/normal/housan/zuxuan_hunhezuxuan'), name: '3d_housan_zuxuan_hunhezuxuan' },
                      { path: 'zuxuan_hezhi', component: _import('credit/3d/components/normal/housan/zuxuan_hezhi'), name: '3d_housan_zuxuan_hezhi' },
                      { path: 'zuxuan_zusandanshi', component: _import('credit/3d/components/normal/housan/zuxuan_zusandanshi'), name: '3d_housan_zuxuan_zusandanshi' },
                      { path: 'zuxuan_zuliudanshi', component: _import('credit/3d/components/normal/housan/zuxuan_zuliudanshi'), name: '3d_housan_zuxuan_zuliudanshi' }
                    ]
                  },
                  {
                    path: 'erxing',
                    name: '3d_erxing',
                    meta: { sub_path: 'erxing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_erxing_zhixuan_houerfushi' },
                    children: [
                      { path: 'zhixuan_houerfushi', component: _import('credit/3d/components/normal/erxing/zhixuan_houerfushi'), name: '3d_erxing_zhixuan_houerfushi' },
                      { path: 'zhixuan_houerdanshi', component: _import('credit/3d/components/normal/erxing/zhixuan_houerdanshi'), name: '3d_erxing_zhixuan_houerdanshi' },
                      { path: 'zhixuan_qianerfushi', component: _import('credit/3d/components/normal/erxing/zhixuan_qianerfushi'), name: '3d_erxing_zhixuan_qianerfushi' },
                      { path: 'zhixuan_qianerdanshi', component: _import('credit/3d/components/normal/erxing/zhixuan_qianerdanshi'), name: '3d_erxing_zhixuan_qianerdanshi' },
                      { path: 'zuxuan_houerfushi', component: _import('credit/3d/components/normal/erxing/zuxuan_houerfushi'), name: '3d_erxing_zuxuan_houerfushi' },
                      { path: 'zuxuan_houerdanshi', component: _import('credit/3d/components/normal/erxing/zuxuan_houerdanshi'), name: '3d_erxing_zuxuan_houerdanshi' },
                      { path: 'zuxuan_qianerfushi', component: _import('credit/3d/components/normal/erxing/zuxuan_qianerfushi'), name: '3d_erxing_zuxuan_qianerfushi' },
                      { path: 'zuxuan_qianerdanshi', component: _import('credit/3d/components/normal/erxing/zuxuan_qianerdanshi'), name: '3d_erxing_zuxuan_qianerdanshi' }
                    ]
                  },
                  {
                    path: 'yixing',
                    name: '3d_yixing',
                    meta: { sub_path: 'yixing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_yixing_dingweidan_sanxingdingweidan' },
                    children: [
                      { path: 'dingweidan_sanxingdingweidan', component: _import('credit/3d/components/normal/yixing/dingweidan_sanxingdingweidan'), name: '3d_yixing_dingweidan_sanxingdingweidan' }
                    ]
                  },
                  {
                    path: 'budingwei',
                    name: '3d_budingwei',
                    meta: { sub_path: 'budingwei' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_budingwei_sanxingbudingwei_qiansanyimabudingwei' },
                    children: [
                      { path: 'sanxingbudingwei_qiansanyimabudingwei', component: _import('credit/3d/components/normal/budingwei/sanxingbudingwei_qiansanyimabudingwei'), name: '3d_budingwei_sanxingbudingwei_qiansanyimabudingwei' },
                      { path: 'sanxingbudingwei_erma', component: _import('credit/3d/components/normal/budingwei/sanxingbudingwei_erma'), name: '3d_budingwei_sanxingbudingwei_erma' }
                    ]
                  },
                  {
                    path: 'longhu',
                    name: '3d_longhu',
                    meta: { sub_path: 'longhu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_longhu_longhu_bs' },
                    children: [
                      { path: 'longhu_bs', component: _import('credit/3d/components/normal/longhu/longhu_bs'), name: '3d_longhu_longhu_bs' },
                      { path: 'longhu_bg', component: _import('credit/3d/components/normal/longhu/longhu_bg'), name: '3d_longhu_longhu_bg' },
                      { path: 'longhu_sg', component: _import('credit/3d/components/normal/longhu/longhu_sg'), name: '3d_longhu_longhu_sg' },
                      { path: 'he_bs', component: _import('credit/3d/components/normal/longhu/he_bs'), name: '3d_longhu_he_bs' },
                      { path: 'he_bg', component: _import('credit/3d/components/normal/longhu/he_bg'), name: '3d_longhu_he_bg' },
                      { path: 'he_sg', component: _import('credit/3d/components/normal/longhu/he_sg'), name: '3d_longhu_he_sg' }
                    ]
                  },
                  {
                    path: 'caibuchu',
                    name: '3d_caibuchu',
                    meta: { sub_path: 'caibuchu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_caibuchu_caibuchu_cbc1' },
                    children: [
                      { path: 'caibuchu_cbc1', component: _import('credit/3d/components/normal/caibuchu/caibuchu_cbc1'), name: '3d_caibuchu_caibuchu_cbc1' },
                      { path: 'caibuchu_cbc2', component: _import('credit/3d/components/normal/caibuchu/caibuchu_cbc2'), name: '3d_caibuchu_caibuchu_cbc2' },
                      { path: 'caibuchu_cbc3', component: _import('credit/3d/components/normal/caibuchu/caibuchu_cbc3'), name: '3d_caibuchu_caibuchu_cbc3' },
                      { path: 'caibuchu_cbc4', component: _import('credit/3d/components/normal/caibuchu/caibuchu_cbc4'), name: '3d_caibuchu_caibuchu_cbc4' },
                      { path: 'caibuchu_cbc5', component: _import('credit/3d/components/normal/caibuchu/caibuchu_cbc5'), name: '3d_caibuchu_caibuchu_cbc5' }
                    ]
                  },
                  {
                    path: 'xingtai',
                    name: '3d_xingtai',
                    meta: { sub_path: 'xingtai' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: '3d_xingtai_sanxing_baozi' },
                    children: [
                      { path: 'sanxing_duizi', component: _import('credit/3d/components/normal/xingtai/sanxing_duizi'), name: '3d_xingtai_sanxing_duizi' },
                      { path: 'sanxing_zuizi', component: _import('credit/3d/components/normal/xingtai/sanxing_duizi'), name: '3d_xingtai_sanxing_zuizi' },
                      { path: 'sanxing_baozi', component: _import('credit/3d/components/normal/xingtai/sanxing_baozi'), name: '3d_xingtai_sanxing_baozi' },
                      { path: 'sanxing_shunzi', component: _import('credit/3d/components/normal/xingtai/sanxing_shunzi'), name: '3d_xingtai_sanxing_shunzi' },
                      { path: 'sanxing_banshun', component: _import('credit/3d/components/normal/xingtai/sanxing_banshun'), name: '3d_xingtai_sanxing_banshun' },
                      { path: 'sanxing_zaliu', component: _import('credit/3d/components/normal/xingtai/sanxing_zaliu'), name: '3d_xingtai_sanxing_zaliu' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: '3DHandicap',
                component: () => import('@/components/games/3d/handicap/3d-handicap'),
                redirect: { name: '3d_handicap_integrate' },
                children: [
                  {
                    path: 'integrate',
                    name: '3d_handicap_integrate',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: '3d_handicap_integrate_integrate' },
                    children: [
                      { path: 'integrate', component: _import('credit/3d/components/handicap/integrate/integrate'), name: '3d_handicap_integrate_integrate' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'PK10/:gameTypeName',
            name: 'PK10',
            component: () => import('@/components/games/pk10/pk10'),
            redirect: { name: 'PK10Normal' },
            children: [
              {
                path: 'normal',
                name: 'PK10Normal',
                component: () => import('@/components/games/pk10/normal/pk10-normal'),
                redirect: { name: 'pk10_hezhi' },
                children: [
                  {
                    path: 'hezhi',
                    name: 'pk10_hezhi',
                    meta: { sub_path: 'hezhi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_hezhi_hezhi_hezhi' },
                    children: [
                      { path: 'hezhi_hezhi', component: _import('credit/pk10/components/normal/hezhi/hezhi_hezhi'), name: 'pk10_hezhi_hezhi_hezhi' },
                      { path: 'hezhi_dxds', component: _import('credit/pk10/components/normal/hezhi/hezhi_dxds'), name: 'pk10_hezhi_hezhi_dxds' }
                    ]
                  },
                  {
                    path: 'cmc',
                    name: 'pk10_cmc',
                    meta: { sub_path: 'cmc' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_cmc_cmc_cmc' },
                    children: [
                      { path: 'cmc_cmc', component: _import('credit/pk10/components/normal/cmc/cmc_cmc'), name: 'pk10_cmc_cmc_cmc' }
                    ]
                  },
                  {
                    path: 'longhu',
                    name: 'pk10_longhu',
                    meta: { sub_path: 'longhu' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_longhu_longhu_longhu' },
                    children: [
                      { path: 'longhu_longhu', component: _import('credit/pk10/components/normal/longhu/longhu_longhu'), name: 'pk10_longhu_longhu_longhu' }
                    ]
                  },
                  {
                    path: 'erxing',
                    name: 'pk10_erxing',
                    meta: { sub_path: 'erxing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_erxing_jqqianer_ds' },
                    children: [
                      { path: 'jqqianer_ds', component: _import('credit/pk10/components/normal/erxing/jqqianer_ds'), name: 'pk10_erxing_jqqianer_ds' },
                      { path: 'jqqianer_fs', component: _import('credit/pk10/components/normal/erxing/jqqianer_fs'), name: 'pk10_erxing_jqqianer_fs' },
                      { path: 'jqhouer_ds', component: _import('credit/pk10/components/normal/erxing/jqhouer_ds'), name: 'pk10_erxing_jqhouer_ds' },
                      { path: 'jqhouer_fs', component: _import('credit/pk10/components/normal/erxing/jqhouer_fs'), name: 'pk10_erxing_jqhouer_fs' }
                    ]
                  },
                  {
                    path: 'sanxing',
                    name: 'pk10_sanxing',
                    meta: { sub_path: 'sanxing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_sanxing_jqqiansan_fs' },
                    children: [
                      { path: 'jqqiansan_ds', component: _import('credit/pk10/components/normal/sanxing/jqqiansan_ds'), name: 'pk10_sanxing_jqqiansan_ds' },
                      { path: 'jqqiansan_fs', component: _import('credit/pk10/components/normal/sanxing/jqqiansan_fs'), name: 'pk10_sanxing_jqqiansan_fs' },
                      { path: 'jqhousan_ds', component: _import('credit/pk10/components/normal/sanxing/jqhousan_ds'), name: 'pk10_sanxing_jqhousan_ds' },
                      { path: 'jqhousan_fs', component: _import('credit/pk10/components/normal/sanxing/jqhousan_fs'), name: 'pk10_sanxing_jqhousan_fs' }
                    ]
                  },
                  {
                    path: 'sixing',
                    name: 'pk10_sixing',
                    meta: { sub_path: 'sixing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_sixing_jqqiansi_fs' },
                    children: [
                      { path: 'jqqiansi_ds', component: _import('credit/pk10/components/normal/sixing/jqqiansi_ds'), name: 'pk10_sixing_jqqiansi_ds' },
                      { path: 'jqqiansi_fs', component: _import('credit/pk10/components/normal/sixing/jqqiansi_fs'), name: 'pk10_sixing_jqqiansi_fs' },
                      { path: 'jqhousi_ds', component: _import('credit/pk10/components/normal/sixing/jqhousi_ds'), name: 'pk10_sixing_jqhousi_ds' },
                      { path: 'jqhousi_fs', component: _import('credit/pk10/components/normal/sixing/jqhousi_fs'), name: 'pk10_sixing_jqhousi_fs' }
                    ]
                  },
                  {
                    path: 'wuxing',
                    name: 'pk10_wuxing',
                    meta: { sub_path: 'wuxing' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'pk10_wuxing_jqqianwu_fs' },
                    children: [
                      { path: 'jqqianwu_ds', component: _import('credit/pk10/components/normal/wuxing/jqqianwu_ds'), name: 'pk10_wuxing_jqqianwu_ds' },
                      { path: 'jqqianwu_fs', component: _import('credit/pk10/components/normal/wuxing/jqqianwu_fs'), name: 'pk10_wuxing_jqqianwu_fs' },
                      { path: 'jqhouwu_ds', component: _import('credit/pk10/components/normal/wuxing/jqhouwu_ds'), name: 'pk10_wuxing_jqhouwu_ds' },
                      { path: 'jqhouwu_fs', component: _import('credit/pk10/components/normal/wuxing/jqhouwu_fs'), name: 'pk10_wuxing_jqhouwu_fs' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'PK10Handicap',
                component: () => import('@/components/games/pk10/handicap/pk10-handicap'),
                redirect: { name: 'pk10_handicap_lm' },
                children: [
                  {
                    path: 'lm',
                    name: 'pk10_handicap_lm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'pk10_handicap_lm_lm' },
                    children: [
                      { path: 'lm', component: _import('credit/pk10/components/handicap/lm/lm'), name: 'pk10_handicap_lm_lm' }
                    ]
                  },
                  {
                    path: 'dh',
                    name: 'pk10_handicap_dh',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'pk10_handicap_dh_dh' },
                    children: [
                      { path: 'dh', component: _import('credit/pk10/components/handicap/dh/dh'), name: 'pk10_handicap_dh_dh' }
                    ]
                  },
                  {
                    path: 'gyh',
                    name: 'pk10_handicap_gyh',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'pk10_handicap_gyh_gyh' },
                    children: [
                      { path: 'gyh', component: _import('credit/pk10/components/handicap/gyh/gyh'), name: 'pk10_handicap_gyh_gyh' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'KENO/:gameTypeName',
            name: 'KENO',
            component: () => import('@/components/games/keno/keno'),
            redirect: { name: 'KENONormal' },
            children: [
              {
                path: 'normal',
                name: 'KENONormal',
                component: () => import('@/components/games/keno/normal/keno-normal'),
                redirect: { name: 'keno_hezhi' },
                children: [
                  {
                    path: 'hezhi',
                    name: 'keno_hezhi',
                    meta: { sub_path: 'hezhi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_hezhi_hezhi_danshuang' },
                    children: [
                      { path: 'hezhi_danshuang', component: _import('credit/keno/components/normal/hezhi/hezhi_danshuang'), name: 'keno_hezhi_hezhi_danshuang' },
                      { path: 'hezhi_daxiao810', component: _import('credit/keno/components/normal/hezhi/hezhi_daxiao810'), name: 'keno_hezhi_hezhi_daxiao810' },
                      { path: 'hezhi_wuxing', component: _import('credit/keno/components/normal/hezhi/hezhi_wuxing'), name: 'keno_hezhi_hezhi_wuxing' }
                    ]
                  },
                  {
                    path: 'jiouhe',
                    name: 'keno_jiouhe',
                    meta: { sub_path: 'jiouhe' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_jiouhe_jiouhe_fs' },
                    children: [
                      { path: 'jiouhe_fs', component: _import('credit/keno/components/normal/jiouhe/jiouhe_fs'), name: 'keno_jiouhe_jiouhe_fs' }
                    ]
                  },
                  {
                    path: 'shangzhongxia',
                    name: 'keno_shangzhongxia',
                    meta: { sub_path: 'shangzhongxia' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_shangzhongxia_shangzhongxia_fs' },
                    children: [
                      { path: 'shangzhongxia_fs', component: _import('credit/keno/components/normal/shangzhongxia/shangzhongxia_fs'), name: 'keno_shangzhongxia_shangzhongxia_fs' }
                    ]
                  },
                  {
                    path: 'renxuan1',
                    name: 'keno_renxuan1',
                    meta: { sub_path: 'renxuan1' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan1_renxuan1_fs' },
                    children: [
                      { path: 'renxuan1_fs', component: _import('credit/keno/components/normal/renxuan1/renxuan1_fs'), name: 'keno_renxuan1_renxuan1_fs' }
                    ]
                  },
                  {
                    path: 'renxuan2',
                    name: 'keno_renxuan2',
                    meta: { sub_path: 'renxuan2' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan2_renxuan2_fs' },
                    children: [
                      { path: 'renxuan2_fs', component: _import('credit/keno/components/normal/renxuan2/renxuan2_fs'), name: 'keno_renxuan2_renxuan2_fs' }
                    ]
                  },
                  {
                    path: 'renxuan3',
                    name: 'keno_renxuan3',
                    meta: { sub_path: 'renxuan3' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan3_renxuan3_fs' },
                    children: [
                      { path: 'renxuan3_fs', component: _import('credit/keno/components/normal/renxuan3/renxuan3_fs'), name: 'keno_renxuan3_renxuan3_fs' }
                    ]
                  },
                  {
                    path: 'renxuan4',
                    name: 'keno_renxuan4',
                    meta: { sub_path: 'renxuan4' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan4_renxuan4_fs' },
                    children: [
                      { path: 'renxuan4_fs', component: _import('credit/keno/components/normal/renxuan4/renxuan4_fs'), name: 'keno_renxuan4_renxuan4_fs' }
                    ]
                  },
                  {
                    path: 'renxuan5',
                    name: 'keno_renxuan5',
                    meta: { sub_path: 'renxuan5' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan5_renxuan5_fs' },
                    children: [
                      { path: 'renxuan5_fs', component: _import('credit/keno/components/normal/renxuan5/renxuan5_fs'), name: 'keno_renxuan5_renxuan5_fs' }
                    ]
                  },
                  {
                    path: 'renxuan6',
                    name: 'keno_renxuan6',
                    meta: { sub_path: 'renxuan6' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan6_renxuan6_fs' },
                    children: [
                      { path: 'renxuan6_fs', component: _import('credit/keno/components/normal/renxuan6/renxuan6_fs'), name: 'keno_renxuan6_renxuan6_fs' }
                    ]
                  },
                  {
                    path: 'renxuan7',
                    name: 'keno_renxuan7',
                    meta: { sub_path: 'renxuan7' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'keno_renxuan7_renxuan7_fs' },
                    children: [
                      { path: 'renxuan7_fs', component: _import('credit/keno/components/normal/renxuan7/renxuan7_fs'), name: 'keno_renxuan7_renxuan7_fs' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'KENOHandicap',
                component: () => import('@/components/games/keno/handicap/keno-handicap'),
                redirect: { name: 'keno_handicap_zh-bs' },
                children: [
                  {
                    path: 'zh-bs',
                    name: 'keno_handicap_zh-bs',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'keno_handicap_zh-bs_zh-bs' },
                    children: [
                      { path: 'zh-bs', component: _import('credit/keno/components/handicap/zh-bs/zh-bs'), name: 'keno_handicap_zh-bs_zh-bs' }
                    ]
                  },
                  {
                    path: 'zm',
                    name: 'keno_handicap_zm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'keno_handicap_zm_zm' },
                    children: [
                      { path: 'zm', component: _import('credit/keno/components/handicap/zm/zm'), name: 'keno_handicap_zm_zm' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'KLSF/:gameTypeName',
            name: 'KLSF',
            component: () => import('@/components/games/klsf/klsf'),
            redirect: { name: 'KLSFNormal' },
            children: [
              {
                path: 'normal',
                name: 'KLSFNormal',
                component: () => import('@/components/games/klsf/normal/klsf-normal'),
                redirect: { name: 'klsf_renxuanfushi' },
                children: [
                  {
                    path: 'renxuanfushi',
                    name: 'klsf_renxuanfushi',
                    meta: { sub_path: 'renxuanfushi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'klsf_renxuanfushi_renxuanfushi_rx2' },
                    children: [
                      { path: 'renxuanfushi_rx2', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx2'), name: 'klsf_renxuanfushi_renxuanfushi_rx2' },
                      { path: 'renxuanfushi_rx3', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx3'), name: 'klsf_renxuanfushi_renxuanfushi_rx3' },
                      { path: 'renxuanfushi_rx4', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx4'), name: 'klsf_renxuanfushi_renxuanfushi_rx4' },
                      { path: 'renxuanfushi_rx5', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx5'), name: 'klsf_renxuanfushi_renxuanfushi_rx5' },
                      { path: 'renxuanfushi_rx6', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx6'), name: 'klsf_renxuanfushi_renxuanfushi_rx6' },
                      { path: 'renxuanfushi_rx7', component: _import('credit/klsf/components/normal/renxuanfushi/renxuanfushi_rx7'), name: 'klsf_renxuanfushi_renxuanfushi_rx7' }
                    ]
                  },
                  {
                    path: 'renxuandanshi',
                    name: 'klsf_renxuandanshi',
                    meta: { sub_path: 'renxuandanshi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'klsf_renxuandanshi_renxuandanshi_rx2' },
                    children: [
                      { path: 'renxuandanshi_rx2', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx2'), name: 'klsf_renxuandanshi_renxuandanshi_rx2' },
                      { path: 'renxuandanshi_rx3', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx3'), name: 'klsf_renxuandanshi_renxuandanshi_rx3' },
                      { path: 'renxuandanshi_rx4', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx4'), name: 'klsf_renxuandanshi_renxuandanshi_rx4' },
                      { path: 'renxuandanshi_rx5', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx5'), name: 'klsf_renxuandanshi_renxuandanshi_rx5' },
                      { path: 'renxuandanshi_rx6', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx6'), name: 'klsf_renxuandanshi_renxuandanshi_rx6' },
                      { path: 'renxuandanshi_rx7', component: _import('credit/klsf/components/normal/renxuandanshi/renxuandanshi_rx7'), name: 'klsf_renxuandanshi_renxuandanshi_rx7' }
                    ]
                  },
                  {
                    path: 'renxuandantuo',
                    name: 'klsf_renxuandantuo',
                    meta: { sub_path: 'renxuandantuo' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'klsf_renxuandantuo_renxuandantuo_rx2' },
                    children: [
                      { path: 'renxuandantuo_rx2', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx2'), name: 'klsf_renxuandantuo_renxuandantuo_rx2' },
                      { path: 'renxuandantuo_rx3', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx3'), name: 'klsf_renxuandantuo_renxuandantuo_rx3' },
                      { path: 'renxuandantuo_rx4', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx4'), name: 'klsf_renxuandantuo_renxuandantuo_rx4' },
                      { path: 'renxuandantuo_rx5', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx5'), name: 'klsf_renxuandantuo_renxuandantuo_rx5' },
                      { path: 'renxuandantuo_rx6', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx6'), name: 'klsf_renxuandantuo_renxuandantuo_rx6' },
                      { path: 'renxuandantuo_rx7', component: _import('credit/klsf/components/normal/renxuandantuo/renxuandantuo_rx7'), name: 'klsf_renxuandantuo_renxuandantuo_rx7' }
                    ]
                  },
                  {
                    path: 'erma',
                    name: 'klsf_erma',
                    meta: { sub_path: 'erma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'klsf_erma_zhixuan_fs' },
                    children: [
                      { path: 'zhixuan_fs', component: _import('credit/klsf/components/normal/erma/zhixuan_fs'), name: 'klsf_erma_zhixuan_fs' },
                      { path: 'zhixuan_ds', component: _import('credit/klsf/components/normal/erma/zhixuan_ds'), name: 'klsf_erma_zhixuan_ds' },
                      { path: 'zuxuan_fs', component: _import('credit/klsf/components/normal/erma/zuxuan_fs'), name: 'klsf_erma_zuxuan_fs' },
                      { path: 'zuxuan_ds', component: _import('credit/klsf/components/normal/erma/zuxuan_ds'), name: 'klsf_erma_zuxuan_ds' },
                      { path: 'zuxuan_dt', component: _import('credit/klsf/components/normal/erma/zuxuan_dt'), name: 'klsf_erma_zuxuan_dt' }
                    ]
                  },
                  {
                    path: 'sanma',
                    name: 'klsf_sanma',
                    meta: { sub_path: 'sanma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'klsf_sanma_zhixuan_fs' },
                    children: [
                      { path: 'zhixuan_fs', component: _import('credit/klsf/components/normal/sanma/zhixuan_fs'), name: 'klsf_sanma_zhixuan_fs' },
                      { path: 'zhixuan_ds', component: _import('credit/klsf/components/normal/sanma/zhixuan_ds'), name: 'klsf_sanma_zhixuan_ds' },
                      { path: 'zuxuan_fs', component: _import('credit/klsf/components/normal/sanma/zuxuan_fs'), name: 'klsf_sanma_zuxuan_fs' },
                      { path: 'zuxuan_ds', component: _import('credit/klsf/components/normal/sanma/zuxuan_ds'), name: 'klsf_sanma_zuxuan_ds' },
                      { path: 'zuxuan_dt', component: _import('credit/klsf/components/normal/sanma/zuxuan_dt'), name: 'klsf_sanma_zuxuan_dt' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'KL12/:gameTypeName',
            name: 'KL12',
            component: () => import('@/components/games/kl12/kl12'),
            redirect: { name: 'KL12Normal' },
            children: [
              {
                path: 'normal',
                name: 'KL12Normal',
                component: () => import('@/components/games/kl12/normal/kl12-normal'),
                redirect: { name: 'kl12_renxuanfushi' },
                children: [
                  {
                    path: 'renxuanfushi',
                    name: 'kl12_renxuanfushi',
                    meta: { sub_path: 'renxuanfushi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_renxuanfushi_renxuanfushi_rx1' },
                    children: [
                      { path: 'renxuanfushi_rx1', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx1'), name: 'kl12_renxuanfushi_renxuanfushi_rx1' },
                      { path: 'renxuanfushi_rx2', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx2'), name: 'kl12_renxuanfushi_renxuanfushi_rx2' },
                      { path: 'renxuanfushi_rx3', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx3'), name: 'kl12_renxuanfushi_renxuanfushi_rx3' },
                      { path: 'renxuanfushi_rx4', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx4'), name: 'kl12_renxuanfushi_renxuanfushi_rx4' },
                      { path: 'renxuanfushi_rx5', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx5'), name: 'kl12_renxuanfushi_renxuanfushi_rx5' },
                      { path: 'renxuanfushi_rx6', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx6'), name: 'kl12_renxuanfushi_renxuanfushi_rx6' },
                      { path: 'renxuanfushi_rx7', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx7'), name: 'kl12_renxuanfushi_renxuanfushi_rx7' },
                      { path: 'renxuanfushi_rx8', component: _import('credit/kl12/components/normal/renxuanfushi/renxuanfushi_rx8'), name: 'kl12_renxuanfushi_renxuanfushi_rx8' }
                    ]
                  },
                  {
                    path: 'renxuandanshi',
                    name: 'kl12_renxuandanshi',
                    meta: { sub_path: 'renxuandanshi' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_renxuandanshi_renxuandanshi_rx2' },
                    children: [
                      { path: 'renxuandanshi_rx2', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx2'), name: 'kl12_renxuandanshi_renxuandanshi_rx2' },
                      { path: 'renxuandanshi_rx3', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx3'), name: 'kl12_renxuandanshi_renxuandanshi_rx3' },
                      { path: 'renxuandanshi_rx4', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx4'), name: 'kl12_renxuandanshi_renxuandanshi_rx4' },
                      { path: 'renxuandanshi_rx5', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx5'), name: 'kl12_renxuandanshi_renxuandanshi_rx5' },
                      { path: 'renxuandanshi_rx6', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx6'), name: 'kl12_renxuandanshi_renxuandanshi_rx6' },
                      { path: 'renxuandanshi_rx7', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx7'), name: 'kl12_renxuandanshi_renxuandanshi_rx7' },
                      { path: 'renxuandanshi_rx8', component: _import('credit/kl12/components/normal/renxuandanshi/renxuandanshi_rx8'), name: 'kl12_renxuandanshi_renxuandanshi_rx8' }
                    ]
                  },
                  {
                    path: 'renxuandantuo',
                    name: 'kl12_renxuandantuo',
                    meta: { sub_path: 'renxuandantuo' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_renxuandantuo_renxuandantuo_rx2' },
                    children: [
                      { path: 'renxuandantuo_rx2', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx2'), name: 'kl12_renxuandantuo_renxuandantuo_rx2' },
                      { path: 'renxuandantuo_rx3', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx3'), name: 'kl12_renxuandantuo_renxuandantuo_rx3' },
                      { path: 'renxuandantuo_rx4', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx4'), name: 'kl12_renxuandantuo_renxuandantuo_rx4' },
                      { path: 'renxuandantuo_rx5', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx5'), name: 'kl12_renxuandantuo_renxuandantuo_rx5' },
                      { path: 'renxuandantuo_rx6', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx6'), name: 'kl12_renxuandantuo_renxuandantuo_rx6' },
                      { path: 'renxuandantuo_rx7', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx7'), name: 'kl12_renxuandantuo_renxuandantuo_rx7' },
                      { path: 'renxuandantuo_rx8', component: _import('credit/kl12/components/normal/renxuandantuo/renxuandantuo_rx8'), name: 'kl12_renxuandantuo_renxuandantuo_rx8' }
                    ]
                  },
                  {
                    path: 'dingweidan',
                    name: 'kl12_dingweidan',
                    meta: { sub_path: 'dingweidan' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_dingweidan_dingweidan_fs' },
                    children: [
                      { path: 'dingweidan_fs', component: _import('credit/kl12/components/normal/dingweidan/dingweidan_fs'), name: 'kl12_dingweidan_dingweidan_fs' }
                    ]
                  },
                  {
                    path: 'erma',
                    name: 'kl12_erma',
                    meta: { sub_path: 'erma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_erma_zhixuan_fs' },
                    children: [
                      { path: 'zhixuan_fs', component: _import('credit/kl12/components/normal/erma/zhixuan_fs'), name: 'kl12_erma_zhixuan_fs' },
                      { path: 'zhixuan_ds', component: _import('credit/kl12/components/normal/erma/zhixuan_ds'), name: 'kl12_erma_zhixuan_ds' },
                      { path: 'zuxuan_fs', component: _import('credit/kl12/components/normal/erma/zuxuan_fs'), name: 'kl12_erma_zuxuan_fs' },
                      { path: 'zuxuan_ds', component: _import('credit/kl12/components/normal/erma/zuxuan_ds'), name: 'kl12_erma_zuxuan_ds' },
                      { path: 'zuxuan_dt', component: _import('credit/kl12/components/normal/erma/zuxuan_dt'), name: 'kl12_erma_zuxuan_dt' }
                    ]
                  },
                  {
                    path: 'sanma',
                    name: 'kl12_sanma',
                    meta: { sub_path: 'sanma' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'kl12_sanma_zhixuan_fs' },
                    children: [
                      { path: 'zhixuan_fs', component: _import('credit/kl12/components/normal/sanma/zhixuan_fs'), name: 'kl12_sanma_zhixuan_fs' },
                      { path: 'zhixuan_ds', component: _import('credit/kl12/components/normal/sanma/zhixuan_ds'), name: 'kl12_sanma_zhixuan_ds' },
                      { path: 'zuxuan_fs', component: _import('credit/kl12/components/normal/sanma/zuxuan_fs'), name: 'kl12_sanma_zuxuan_fs' },
                      { path: 'zuxuan_ds', component: _import('credit/kl12/components/normal/sanma/zuxuan_ds'), name: 'kl12_sanma_zuxuan_ds' },
                      { path: 'zuxuan_dt', component: _import('credit/kl12/components/normal/sanma/zuxuan_dt'), name: 'kl12_sanma_zuxuan_dt' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            // LHC
            path: 'LHC/:gameTypeName',
            name: 'LHC',
            component: () => import('@/components/games/lhc/lhc'),
            redirect: { name: 'LHCNormal' },
            children: [
              {
                path: 'normal',
                name: 'LHCNormal',
                component: () => import('@/components/games/lhc/normal/lhc-normal'),
                redirect: { name: 'lhc_tm' },
                children: [
                  {
                    path: 'tm',
                    name: 'lhc_tm',
                    meta: { sub_path: 'tm' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'lhc_tm_tm_tm' },
                    children: [
                      { path: 'tm_tm', component: _import('credit/lhc/components/normal/tm/tm'), name: 'lhc_tm_tm_tm' }
                    ]
                  },
                  {
                    path: 'tmdxds',
                    name: 'lhc_tmdxds',
                    meta: { sub_path: 'tmdxds' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'lhc_tmdxds_tmdxds_tmdx' },
                    children: [
                      { path: 'tmdxds_tmdxds_tmdx', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_tmdx'), name: 'lhc_tmdxds_tmdxds_tmdx' },
                      { path: 'tmdxds_tmdxds_tmds', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_tmds'), name: 'lhc_tmdxds_tmdxds_tmds' },
                      { path: 'tmdxds_tmdxds_tmdxds', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_tmdxds'), name: 'lhc_tmdxds_tmdxds_tmdxds' },
                      { path: 'tmdxds_tmdxds_thdx', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_thdx'), name: 'lhc_tmdxds_tmdxds_thdx' },
                      { path: 'tmdxds_tmdxds_thds', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_thds'), name: 'lhc_tmdxds_tmdxds_thds' },
                      { path: 'tmdxds_tmdxds_twdx', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_twdx'), name: 'lhc_tmdxds_tmdxds_twdx' },
                      { path: 'tmdxds_tmdxds_twds', component: _import('credit/lhc/components/normal/tmdxds/tmdxds_twds'), name: 'lhc_tmdxds_tmdxds_twds' }
                    ]
                  },
                  {
                    path: 'tmsx',
                    name: 'lhc_tmsx',
                    meta: { sub_path: 'tmsx' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'lhc_tmsx_tmsx_tmsx' },
                    children: [
                      { path: 'tmsx_tmsx_tmsx', component: _import('credit/lhc/components/normal/tmsx/tmsx_tmsx'), name: 'lhc_tmsx_tmsx_tmsx' }
                    ]
                  },
                  {
                    path: 'tmbs',
                    name: 'lhc_tmbs',
                    meta: { sub_path: 'tmbs' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'lhc_tmbs_tmbs_tmbs' },
                    children: [
                      { path: 'tmbs_tmbs_tmbs', component: _import('credit/lhc/components/normal/tmbs/tmbs_tmbs'), name: 'lhc_tmbs_tmbs_tmbs' },
                      { path: 'tmbs_tmbs_tbdx', component: _import('credit/lhc/components/normal/tmbs/tmbs_tbdx'), name: 'lhc_tmbs_tmbs_tbdx' },
                      { path: 'tmbs_tmbs_tbds', component: _import('credit/lhc/components/normal/tmbs/tmbs_tbds'), name: 'lhc_tmbs_tmbs_tbds' },
                      { path: 'tmbs_tmbs_tbdxds', component: _import('credit/lhc/components/normal/tmbs/tmbs_tbdxds'), name: 'lhc_tmbs_tmbs_tbdxds' }
                    ]
                  },
                  {
                    path: 'zm',
                    name: 'lhc_zm',
                    meta: { sub_path: 'zm' },
                    component: _import('credit/ssc/layout'),
                    redirect: { name: 'lhc_zm_zm_zm' },
                    children: [
                      { path: 'zm_zm_zm', component: _import('credit/lhc/components/normal/zm/zm_zm'), name: 'lhc_zm_zm_zm' }
                    ]
                  }
                ]
              },
              {
                path: 'handicap',
                name: 'LHCHandicap',
                component: () => import('@/components/games/lhc/handicap/lhc-handicap'),
                redirect: { name: 'lhc_handicap_tm' },
                children: [
                  {
                    path: 'tm',
                    name: 'lhc_handicap_tm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'lhc_handicap_tm_tm' },
                    children: [
                      { path: 'tm', component: _import('credit/lhc/components/handicap/tm/tm'), name: 'lhc_handicap_tm_tm' }
                    ]
                  },
                  {
                    path: 'tmlm',
                    name: 'lhc_handicap_tmlm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'lhc_handicap_tmlm_tmlm' },
                    children: [
                      { path: 'tmlm', component: _import('credit/lhc/components/handicap/tmlm/tmlm'), name: 'lhc_handicap_tmlm_tmlm' }
                    ]
                  },
                  { path: 'tmbs',
                    name: 'lhc_handicap_tmbs',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'lhc_handicap_tmbs_tmbs' },
                    children: [
                      { path: 'tmbs', component: _import('credit/lhc/components/handicap/tmbs/tmbs'), name: 'lhc_handicap_tmbs_tmbs' }
                    ]
                  },
                  { path: 'zm',
                    name: 'lhc_handicap_zm',
                    component: _import('credit/ssc/layout-handicap'),
                    redirect: { name: 'lhc_handicap_zm_zm' },
                    children: [
                      { path: 'zm', component: _import('credit/lhc/components/handicap/zm/zm'), name: 'lhc_handicap_zm_zm' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'OTHER',
            name: 'OTHER',
            component: () => import('@/components/games/other/other-game')
          },
          {
            path: 'ssc_2',
            name: 'ssc_2',
            component: () => import('@/components/games/ssc_2')
          },
          {
            path: 'smp',
            name: 'smp',
            component: () => import('@/components/games/smp_8_30')
          },
          {
            path: 'tzjh',
            name: 'tzjh',
            component: () => import('@/components/games/tzjh_9_2.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/download',
    name: 'download',
    component: _import('download/index'),
    mate: {
      title: '软件下载'
    }
  },
  {
    path: '/help',
    component: _import('help-center/help-center')
  },
  {
    path: '/activity',
    component: _import('activity/activity')
  },
  {
    path: '/lotteryRecord',
    name: 'lotteryRecord',
    component: _import('lottery-record/lottery-record')
  },
  {
    path: '/trendChart',
    name: 'trendChart',
    component: _import('trend-chart/trend-chart')
  },
  {
    path: '/trendChart-2',
    component: _import('trend-chart/trend-chart-2')
  },
  {
    path: '/lhChart',
    component: _import('trend-chart/lh-chart')
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  hide()
  if (store.state.user.isLogin) {
    next()
    // hide()
  } else {
    next()
    // hide()
  }
})

export default router
