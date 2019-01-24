export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return { msg: 'mock模拟数据测试', status: 0, username }
  }
}
