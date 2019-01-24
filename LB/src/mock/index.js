import mockJs from 'mockjs'

import loginApi from './login'

mockJs.mock(/\/login\/loginByUsername/, 'post', loginApi.loginByUsername)

export default mockJs
