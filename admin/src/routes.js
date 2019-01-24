const Login = () => import(/* webpackChunkName: "group-foo" */ './views/Login.vue')
const NotFound = () => import(/* webpackChunkName: "group-foo" */ './views/404.vue')
const Home = () => import(/* webpackChunkName: "group-foo" */ './views/Home.vue')
const Form = () => import(/* webpackChunkName: "group-foo" */ './views/user/Form.vue')
const user = () => import(/* webpackChunkName: "group-foo" */ './views/user/user.vue')
const Main = () => import(/* webpackChunkName: "group-foo" */ './views/home/Main.vue')
const Charts = () => import(/* webpackChunkName: "group-foo" */ './views/charts/echarts.vue')
/*玩家管理*/
const UserList = () => import(/* webpackChunkName: "group-foo" */ './views/user/UserList.vue')
const GameRecord = () => import(/* webpackChunkName: "group-foo" */ './views/user/GameRecord.vue')
const AccountchangeRecord = () => import(/* webpackChunkName: "group-foo" */ './views/user/AccountchangeRecord.vue')
const LargeMonitor = () => import(/* webpackChunkName: "group-foo" */ './views/user/LargeMonitor.vue')
const UserLog = () => import(/* webpackChunkName: "group-foo" */ './views/user/UserLog.vue')
const Demo = () => import(/* webpackChunkName: "group-foo" */ './views/user/Demo.vue')
/*报表管理*/
const MerchantBill = () => import(/* webpackChunkName: "group-foo" */ './views/report/MerchantBill.vue')
const UserBill = () => import(/* webpackChunkName: "group-foo" */ './views/report/UserBill.vue')
/*游戏管理*/
const GameHistory = () => import(/* webpackChunkName: "group-foo" */ './views/game/GameHistory.vue')
const GameStatistics = () => import(/* webpackChunkName: "group-foo" */ './views/game/GameStatistics.vue')
const LargeParameter = () => import(/* webpackChunkName: "group-foo" */ './views/game/LargeParameter.vue')


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa iconfont icon-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/Main', component: Main, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '玩家管理',
        iconCls: 'fa iconfont icon-people',//图标样式class
        children: [
            { path: '/UserList', component: UserList, name: '玩家列表' },
            { path: '/GameRecord', component: GameRecord, name: '游戏记录' },
            { path: '/AccountchangeRecord', component: AccountchangeRecord, name: '账变记录' },
            { path: '/LargeMonitor', component: LargeMonitor, name: '大额监控' },
            { path: '/UserLog', component: UserLog, name: '玩家日志' },
            { path: '/demo', component: Demo, name: 'Demo' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '报表管理',
        iconCls: 'fa iconfont icon-baobiao',
        children: [
            { path: '/MerchantBill', component: MerchantBill, name: '商户对账单' },
            { path: '/UserBill', component: UserBill, name: '玩家对账单' }
        ]
    },
    
    {
        path: '/',
        component: Home,
        name: '游戏管理',
        iconCls: 'fa iconfont icon-game-ware',
        children: [
            { path: '/GameHistory', component: GameHistory, name: '游戏历史' },
            { path: '/GameStatistics', component: GameStatistics, name: '游戏数据统计' },
            { path: '/LargeParameter', component: LargeParameter, name: '大额参数配置' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa iconfont icon-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/Charts', component: Charts, name: '可视化报表' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;