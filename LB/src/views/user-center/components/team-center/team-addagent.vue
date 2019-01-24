<template>
  <div class="width">
    <p class="title"><span class="superior" @click="toSuperior">团队用户管理</span><i class="el-icon-d-arrow-right"></i><span>新增代理</span></p>
    <div class="team-addagent centerBox">
      <div class="left">
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
          <div class="from">
            <div class="titles">
              账户设置
            </div>
            <div class="content">
              <el-form-item label="用户名" prop="name" style="padding-left: 10px;color: #777;">
                <el-input type="text" v-model="ruleForm.name"></el-input>
                <span>6-16位的数字和字母</span>
              </el-form-item>
              <el-form-item label="密码" prop="pass" style="padding-left: 10px;color: #777;">
                <el-input type="password" v-model="ruleForm.pass"></el-input>
                <span>6-16位的数字和字母</span>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" style="padding-left: 10px;color: #777;">
                <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                <span>请再次输入密码</span>
              </el-form-item>
            </div>
          </div>
          <div class="from">
            <div class="titles">
              返点设置
            </div>
            <div class="content">
              <p>注：如果不想给下级设置第三方平台游戏，可以把勾选去掉</p>
              <el-form-item label="彩票返点" prop="prize_group" style="padding-left: 10px;color: #777;">
                <el-select class="input" v-model="ruleForm.prize_group" filterable placeholder="请选择">
                  <el-option
                    v-for="item in a_prize_data"
                    :key="item.id"
                    :label="parseFloat(item.name).toLocaleString() +'-'+ accMul(item.water, 100) +'%'"
                    :value="JSON.stringify(item)">
                    <span>{{item.classic_prize.toLocaleString()}}</span>
                    -
                    <span>{{accMul(item.water, 100)}}%</span>
                  </el-option>
                </el-select>
                <span>输入数字快速查找</span>
              </el-form-item>
              <el-form-item :label="item.name"  style="padding-left: 10px;color: #777;" v-for="(item, index) in percent_list" :key="index">
                <el-input-number v-model="percent_list[index].value" controls-position="right" :precision="1" :step="0.1" :min="item.percent_min_value" :max="item.percent_max_value"></el-input-number>
                <span class="percentage">%</span>
                <el-checkbox v-model="percent_list[index].checked"></el-checkbox>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="add" @click="addUser('ruleForm')">
          确认送出
        </div>
      </div>
      <Considerations :considerationsMsg="considerationsMsg"></Considerations>
    </div>
    <Dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <!-- 提示信息 -->
      <div class="textinput">
        <p style="font-size: 18px;line-height: 30px;color: #000;padding-bottom: 10px">操作成功</p>
        <p>如果系统未在3秒后自动跳转，请点击下面确认按钮</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '../../../../components/dialog/src/component'
import Considerations from '../../../../components/user-center/considerations'
import { GetPrizeGroupForCreate, AccurateCreateUser } from '../../../../api/userCenter/teamCenter/team-center'
export default {
  name: 'team-addagent',
  inject: ['reload'],
  data () {
    const checkPassword = (rule, value, callback) => {
      const regPasswordIsSame2a = /([A-Za-z0-9])\1{2,}/g
      if (value === this.ruleForm.name) {
        callback(new Error('密码不能和账号一致'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
        callback(new Error('必须是6-16位数字与字母的组合'))
      } else if (regPasswordIsSame2a.test(value)) {
        callback(new Error('不能出现连续三位相同的字符'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      considerationsMsg: {
        one: '1. 请输入注册用户的用户名、密码。',
        two: '2. 注册会员的奖金及返水可由上级个别指定。',
        three: '3. 新注册用户资金密码为初始设定之登录密码,请新用户登录时更改资金密码。'
      },
      dialogVisible: false,
      a_prize_data: [],
      prize_group: '',
      ruleForm: { // 需要验证的字段
        name: '',
        pass: '',
        checkPass: '',
        prize_group: ''
      },
      rules: { // 验证规则
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        prize_group: [
          { required: true, message: '请选择返点', trigger: 'change' }
        ]
      },
      percent_list: [] // 第三方平台返点
    }
  },
  components: {
    Dialog,
    Considerations
  },
  computed: {
    percentage: () => {}
  },
  created () {
    this.$loadingShow()
    this.getInformation()
    this.$store.dispatch('updateUserInfo')
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.$loadingHide()
  },
  methods: {
    handleClose () {
      this.dialogVisible = !this.dialogVisible
    },
    confirm () {
      this.reload()
      this.$router.push('/main/user-center/team-management')
    },
    // 获取奖金组数据
    getInformation () {
      GetPrizeGroupForCreate().then(res => {
        if (res.errno === 0) {
          this.a_prize_data = res.data.a_prize_data
          for (let i in res.data.percent_list) {
            this.percent_list.push({
              name: res.data.percent_list[i].name,
              percent_identity: res.data.percent_list[i].percent_identity,
              percent_max_value: parseFloat(res.data.percent_list[i].percent_max_value),
              percent_min_value: parseFloat(res.data.percent_list[i].percent_min_value),
              value: '',
              checked: true
            })
          }
        }
      })
    },
    // 增加代理
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.prize_group === '') {
            return
          }
          let prizeGroup = this.ruleForm.prize_group
          let prize = JSON.parse(prizeGroup)
          let percentList = []
          this.percent_list.forEach((item, index) => {
            if (item.checked === true) {
              percentList.push({
                percent_identity: item.percent_identity,
                percent_value: item.value
              })
            } else {
              percentList.push({
                percent_identity: item.percent_identity,
                percent_value: 0
              })
            }
          })
          let data = {
            username: this.ruleForm.name,
            password: this.ruleForm.pass,
            nickname: this.ruleForm.name,
            prizeGroupId: prize.id,
            seriesPrizeGroupJson: JSON.stringify({1: prize.classic_prize.toString()}),
            isAgent: 1,
            percentSets: JSON.stringify(percentList)
          }
          AccurateCreateUser(data)
            .then(res => {
              if (res.errno === 0) {
                this.dialogVisible = true
                this.ruleForm = Object.assign(this.ruleForm, {
                  name: '',
                  pass: '',
                  checkPass: '',
                  prize_group: ''
                })
                setTimeout(() => {
                  this.reload()
                  this.$router.push('/main/user-center/team-management')
                }, 3000)
              }
              console.log(res)
            })
        } else {
          return false
        }
      })
    },
    toSuperior () {
      this.$router.push('/main/user-center/team-management')
    },
    accMul (arg1, arg2) { // 乘法
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
  }
}
</script>

<style scoped>
  @import "../../statics/css/userCenterCommon.css";
  .centerBox{
    display: flex;
  }
  @media screen and (max-width: 650px){
    .centerBox{
      display: block;
    }
    .centerBox .left{
      width: 100%;
    }
  }
</style>
