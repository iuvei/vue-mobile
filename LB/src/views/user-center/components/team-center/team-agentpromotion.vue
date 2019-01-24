<template>
  <div class="width">
    <p class="title"><span class="superior" @click="toSuperior">团队用户管理</span><i class="el-icon-d-arrow-right"></i><span>代理推广</span></p>
    <div class="team-agentpromotion centerBox">
      <div class="formCenter" style="overflow: hidden">
        <div class="left">
          <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
            <div class="from">
              <div class="titles">
                推广渠道
              </div>
              <div class="content" style="padding-bottom: 0">
                <el-form-item label="推广渠道" prop="channel" style="padding-left: 10px;color: #777;">
                  <el-select v-model="ruleForm.channel" placeholder="请选择推广渠道">
                    <el-option
                      v-for="item in channelList"
                      :key="item.channelID"
                      :label="item.channelName"
                      :value="item.channelName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="ruleForm.channel === '自定义'" label="自定义渠道" prop="custom" style="padding-left: 10px;color: #777;">
                  <el-input placeholder="请输入推广渠道" type="text" v-model="ruleForm.custom"></el-input>
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
                </el-form-item>
                <el-form-item :label="item.name"  style="padding-left: 10px;color: #777;" v-for="(item, index) in percent_list" :key="index">
                  <el-input-number v-model="percent_list[index].value" controls-position="right" :precision="1" :step="0.1" :min="item.percent_min_value" :max="item.percent_max_value"></el-input-number>
                  <span class="percentage">%</span>
                  <el-checkbox v-model="percent_list[index].checked"></el-checkbox>
                </el-form-item>
              </div>
              <div class="qqnumber">
                <el-form-item label="QQ号" prop="agent_qq" style="padding-left: 10px;color: #777;">
                  <el-input v-model="ruleForm.agent_qq"></el-input>
                </el-form-item>
                <div class="add" @click="addUser('ruleForm')">
                  确认
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <Considerations :considerationsMsg="considerationsMsg"></Considerations>
      </div>
      <div class="user-table">
        <div class="table-head">
          <div>彩票返点</div>
          <div v-for="(item, index) in percent_sets[0]" :key="index">{{item.name}}</div>
          <div style="width: 150px;">QQ号</div>
          <div>推广平台</div>
          <div style="width: 150px;">建立时间</div>
          <div style="width: 180px;">操作</div>
        </div>
        <ul class="table-body">
          <li v-for="(item, index) in tableData" :key="index">
            <div><p>{{item.prize_group_value}}%</p></div>
            <div v-for="(items, index) in item.percent_sets" :key="index"><p>{{items.percent_value}}%</p></div>
            <div style="width: 150px;"><p v-for="(qq, index) in item.agent_qqs" :key="index">{{qq}}</p></div>
            <div><p>{{item.channel}}</p></div>
            <div style="width: 150px;"><p>{{item.created_at}}</p></div>
            <div style="width: 180px;">
              <p><span class="actions" @click="delLink(item.id)">删除</span><span class="actions" @click="handleCopy(item.url, $event)">复制注册链接</span></p>
              <p></p>
            </div>
          </li>
        </ul>
      </div>
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
import Considerations from '../../../../components/user-center/considerations'
import UserTable from '../../../../components/user-center/user-table'
import Dialog from '../../../../components/dialog/src/component'
import clip from '../../../../util/clipboard'
import { GetPrizeGroupForCreate, CreateRegisterLink, GetRegisterLinks, DeleteRegisterLink } from '../../../../api/userCenter/teamCenter/team-center'
export default {
  name: 'team-agentpromotion',
  inject: ['reload'],
  data () {
    return {
      considerationsMsg: {
        one: '1. 请选择推广代理用户注册时，指定注册会员的奖金及返水。',
        two: '2. 推广代理设置完成之后，页面下方将会显示自动注册链接地址。',
        three: '3. QQ号使用于代理推广页链接, 注册会员可于推广页直接透过QQ联系您。'
      },
      dialogVisible: false,
      a_prize_data: [],
      ruleForm: { // 需要验证的字段
        channel: '',
        custom: '',
        prize_group: '',
        agent_qq: ''
      },
      rules: { // 验证规则
        channel: [
          { required: true, message: '请选择推广渠道', trigger: 'change' }
        ],
        custom: [
          { required: true, message: '请输入渠道', trigger: 'blur' }
        ],
        prize_group: [
          { required: true, message: '请选择返点', trigger: 'change' }
        ],
        agent_qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个数字', trigger: 'blur' }
        ]
      },
      channelList: [ // 推广渠道
        {
          channelName: 'qq群',
          channelId: 1
        },
        {
          channelName: '论坛',
          channelID: 2
        },
        {
          channelName: '网站',
          channelID: 3
        },
        {
          channelName: '自定义',
          channelID: 4
        }
      ],
      channelName: '',
      customChannel: '', // 自定义推广渠道
      percent_list: [], // 第三方平台返点
      tableData: [], // 列表数据
      percent_sets: []
    }
  },
  components: {
    Considerations,
    UserTable,
    Dialog
  },
  created () {
    this.$loadingShow()
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.getInformation()
    this.GetRegisterLinks()
    this.$loadingHide()
  },
  methods: {
    handleClose () {
      this.dialogVisible = !this.dialogVisible
    },
    confirm () {
      this.dialogVisible = false
      // this.reload()
    },
    // 获取奖金组
    getInformation () {
      GetPrizeGroupForCreate(1).then(res => {
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
    // 增加开户链接
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.channel === '自定义') {
            this.channelName = this.ruleForm.custom
          } else {
            this.channelName = this.ruleForm.channel
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
          // console.log(Object.prototype.toString.call(JSON.stringify(seriesPrizeGroupJson)))
          let data = {
            agent_qqs: JSON.stringify({'qq1': this.ruleForm.agent_qq}),
            valid_days: 0,
            prize_group_type: 2,
            channel: this.channelName,
            seriesPrizeGroupJson: JSON.stringify({1: prize.classic_prize.toString()}),
            isAgent: 1,
            percentSets: JSON.stringify(percentList)
          }
          CreateRegisterLink(data).then(res => {
            if (res.errno === 0) {
              this.dialogVisible = true
              setTimeout(() => {
                this.reload()
              }, 3000)
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取开户链接
    GetRegisterLinks () {
      GetRegisterLinks().then(res => {
        if (res.errno === 0) {
          this.tableData = res.data.data
          this.tableData.forEach((item, index) => {
            this.tableData[index].percent_sets = JSON.parse(item.percent_sets)
            this.percent_sets.push(this.tableData[index].percent_sets)
          })
        }
      })
    },
    // 删除开户链接
    delLink (ID) {
      DeleteRegisterLink(ID).then(res => {
        if (res.errno === 0) {
          this.$message({
            message: '删除链接成功',
            type: 'success'
          })
          this.reload()
        }
      })
    },
    // 复制链接
    handleCopy (text, event) {
      clip(text, event)
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
  .centerBox .formCenter{
    display: flex;
  }
  @media screen and (max-width: 650px){
    .centerBox .formCenter{
      display: block;
    }
  }
  .team-agentpromotion .left .add{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #eb7e00;
    border: 1px solid #EC6300;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 20px;
    cursor: pointer;
  }
  .team-agentpromotion .left .add:hover{
    background: #EC6300;
  }
  .qqnumber{
    width: 100%;
    overflow: hidden;
  }
  .qqnumber>div{
    float: left;
  }
  .team-agentpromotion .left .qqnumber{
    margin: 20px 0;
  }
  .user-table{
    width: 100%;
    text-align: center;
  }
  .table-head{
    width: 100%;
    height: 33px;
    background-color: #eb7e00;
    display: flex;
  }
  .table-head div{
    width: 100px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    line-height: 33px;
    flex-grow: 1;
  }
  .table-head .userActive{
    width: 160px;
  }
  .table-body{
    width: 100%;
    border-bottom: 2px solid #eb7e00;
  }
  .table-body li{
    padding: 8px 0;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
  }
  .table-body li div{
    width: 100px;
    font-size: 12px;
    font-weight: 500;
    color: #777;
    flex-grow: 1;
  }
  .table-body li div p{
    width: 100%;
    /*height: 17px;*/
    line-height: 17px;
  }
  .table-body li:nth-of-type(odd){
    background-color: #f9f9f9;
  }
  .actions{
    color: #f17e2e;
    cursor: pointer;
    margin: 0 5px;
  }
  .green{
    color: green;
  }
</style>
