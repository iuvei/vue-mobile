import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张三'
  }
];

const Users = [];
const GameList = [];
const GameStatistics = [];
const UserList = [];

const type = ['棋牌','电子游戏','街机游戏'];
const gameName = ['二人麻将','德州扑克','奔驰宝马','财神连线','百家乐'];
const money = ['1423123','-200000','0','12','-123'];
const equipment = ['PC','IOS','安卓'];
const status = [0,1];
const player = [1,2,6,12,34,235,244];


for (let i = 0; i < 2086; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));

  UserList.push(Mock.mock({
    account: 'LGfenix01',
    sh: 'fenix',
    bizhong: '人名币',
    ip: Mock.Random.ip(),
    status: status[Math.round(Math.random()*(status.length - 1))],
    loginTime: '12',
    endTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    profitMoney: money[Math.round(Math.random()*(money.length - 1))],
  }));

  GameList.push(Mock.mock({
    account: 'LGfenix001',
    sh: 'LGfenix',
    gameOddNo: Mock.Random.guid(),
    ip: Mock.Random.ip(),
    gNo: 'LGA12321hb2j3k21',
    endTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    type: type[Math.round(Math.random()*(type.length - 1))],
    gameName: gameName[Math.round(Math.random()*(gameName.length - 1))],
    oddMoney: money[Math.round(Math.random()*(money.length - 1))],
    profitMoney: money[Math.round(Math.random()*(money.length - 1))],
    equipment: equipment[Math.round(Math.random()*(equipment.length - 1))]
  }));

  GameStatistics.push(Mock.mock({
    gameName: gameName[Math.round(Math.random()*(gameName.length - 1))],
    gamePlayers: player[Math.round(Math.random()*(player.length - 1))],
    money1: money[Math.round(Math.random()*(money.length - 1))],
    money2: money[Math.round(Math.random()*(money.length - 1))],
    money3: money[Math.round(Math.random()*(money.length - 1))],
    money4: money[Math.round(Math.random()*(money.length - 1))],
  }));

}

GameStatistics.splice(0,GameStatistics.length - 10)

export { LoginUsers, Users,UserList,GameList,GameStatistics };
