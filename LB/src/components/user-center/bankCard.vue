<template>
  <div class="messageBox">
    <div class="dialog-modal"> <!-- 根元素，z-index 需要高于父容器其他元素 -->
      <div class="dialog-wrapper" @click.stop.self="onClose" v-show="isShow">
        <transition name="drop">
          <div class="dialog-container" v-show="isShow">  <!-- 模态框容器，z-index 需要高于背景 -->
            <div class="title">
              系统提示
              <span class="close-btn" @click="onClose"><i class="el-icon-close"></i></span>
            </div>
            <div class="mid">
              <!-- 绑定银行卡 -->
              <div v-show="listType === 1">
                <div class="title">您已绑定过银行卡</div>
                <div class="btns">
                  <div class="btn" @click="add">增加银行卡</div>
                  <div class="btn" @click="modify">修改银行卡</div>
                  <div class="btn" @click="del">删除银行卡</div>
                </div>
              </div>
              <div class="check" v-show="listType === 2">
                <div class="title">安全起见，请先验证银行卡</div>
                <div class="textinput">
                  <div class="label">验证银行卡</div>
                  <el-select v-model="bankCardId" placeholder="请选择">
                    <el-option
                      v-for="item in bankCardList"
                      :key="item.id"
                      :label="item.account"
                      :value="item.id">
                      <p style="line-height: 34px;"><span style="margin-right: 10px">{{item.bank}}</span><span style="margin-right: 10px">{{item.branch_address}}</span><span>{{item.account}}</span></p>
                    </el-option>
                  </el-select>
                </div>
                <div class="textinput">
                  <div class="label">资金密码</div>
                  <div class="input">
                    <el-input type="password" onpaste="return false" v-model="fundPwd" placeholder="请输入资金密码" maxlength="16" minlength="8"></el-input>
                  </div>
                </div>
                <div class="textinput">
                  <div class="label">开户人姓名</div>
                  <div class="input">
                    <el-input type="text" v-model="userInfo.name" :disabled="isName?true:false" placeholder="请输入开户人姓名"></el-input>
                  </div>
                </div>
                <div class="textinput">
                  <div class="label">银行卡号</div>
                  <div class="input">
                    <el-input type="text" onpaste="return false" onKeyUp="value=value.replace(/[^\d]/g,'')" v-model="checkAccount" placeholder="请输入银行卡号"></el-input>
                  </div>
                  <div class="err">银行卡号由16位、18位或19位数字组成</div>
                </div>
              </div>
              <!--绑定银行卡-->
              <div class="bindingbank" v-show="listType === 3">
                <div class="textinput">
                  <div class="label">开户银行</div>
                  <el-select v-model="bankName" placeholder="请选择">
                    <el-option
                      v-for="item in bankList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <span style="display: inline-block;float: left;width: 24px;height: 24px;margin: 5px"><img style="width: 100%;height: 100%" :src="item.logo" alt=""></span>
                      <p style="line-height: 34px;float: left">{{item.name}}</p>
                    </el-option>
                  </el-select>
                </div>
                <div class="textinput">
                  <div class="label">地区</div>
                  <el-cascader
                    :options="regionList"
                    :props="props"
                    @change="reginoChange">
                  </el-cascader>
                </div>
                <div class="textinput">
                  <div class="label">支行名称</div>
                  <div class="input">
                    <el-input type="text" v-model="input1" placeholder="请输入支行名称"></el-input>
                  </div>
                  <div class="err">由1至20个字符或汉字组成, 不能使用特殊字符</div>
                </div>
                <div class="textinput">
                  <div class="label">持卡人姓名</div>
                  <div class="input">
                    <el-input v-model="userInfo.name" :disabled="isName?true:false"  placeholder="持卡人姓名" maxlength="8" minlength="1"></el-input>
                  </div>
                </div>
                <div class="textinput">
                  <div class="label">银行卡号</div>
                  <div class="input">
                    <el-input type="text" onpaste="return false" onKeyUp="value=value.replace(/[^\d]/g,'')" v-model="input2" placeholder="请输入银行卡号"></el-input>
                  </div>
                  <div class="err">银行卡号由16位、18位或19位数字组成</div>
                </div>
                <div class="textinput">
                  <div class="label">确认银行卡号</div>
                  <div class="input">
                    <el-input type="text" onpaste="return false" onKeyUp="value=value.replace(/[^\d]/g,'')" v-model="input3" placeholder="请输入银行卡号"></el-input>
                  </div>
                  <div class="err">银行账号只能手动输入, 不能粘贴</div>
                </div>
                <div class="err" style="color: red;" v-show="errMsg === 3">{{errMsg1}}</div>
              </div>
              <!-- 确认删除银行卡 -->
              <div class="textinput" v-show="listType === 4">
                <p style="color: red">是否确认删除此张银行卡</p>
              </div>
              <!-- 提示信息 -->
              <div class="textinput" v-show="listType === -1">
                <p style="font-size: 18px;line-height: 30px;color: #000;padding-bottom: 10px">操作成功</p>
                <p>如果系统未在3秒后自动跳转，请点击下面确认按钮</p>
              </div>
            </div>
            <div class="bottom">
              <div class="confirm" @click="confirm(listType)">确认</div>
              <div class="close" @click="onClose">取消</div>
            </div>
          </div>
        </transition>
      </div> <!-- 加载一个具有透明度的背景，使根元素透明，子元素会继承该透明度 -->
    </div>
  </div>
</template>
<script>
import { getBankList, getDistricts, bindBankCard, getBankCardList, checkBankCard, changeBankCard, deleteBankCard } from '../../api/userCenter/personalCenter/personal-center'
export default {
  name: 'messageBox',
  data () {
    return {
      input1: '', // 支行名称
      input2: '', // 银行卡号
      input3: '', // 确认银行卡号
      errMsg: '', // 是否显示输入框提示信息
      errMsg1: '', // 提示信息
      listType: '',
      data: {},
      userInfo: {},
      isName: false,
      bankList: [], // 银行信息
      props: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      bankName: '', // 银行名称
      regionList: [], // 地区列表
      bankCardList: [], // 已绑定银行卡列表
      isBankCard: false, // 是否绑定银行卡
      bankCardId: '', // 银行卡ID
      fundPwd: '', // 资金密码
      checkAccount: '', // 验证银行卡卡号
      checkType: '', // 校验类型,1再绑卡2:修改卡3:删除卡
      checkedToken: '', // 校验成功的令牌
      check: false,
      province_id: '', // 省份ID
      city_id: '' // 市ID
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getBank()
    this.getRegion()
    this.getBankList()
  },
  updated () {
    let user = this.$store.state.user
    this.userInfo = user.userInfo
    if (this.userInfo.name !== null) {
      this.isName = true
    }
    if (this.userInfo.has_bank_card === 0) {
      this.listType = 3
    }
  },
  methods: {
    onClose (listType) {
      this.listType = ''
      this.input1 = ''
      this.input2 = ''
      this.input3 = ''
      this.bankCardId = ''
      this.fundPwd = ''
      this.checkAccount = ''
      this.getBankList()
      this.$emit('onClose', listType)
    },
    confirm (type) {
      let n = Number(type)
      switch (n) {
        case 1: // 已绑定银行卡
          break
        case 2: // 已绑定银行卡
          if (this.bankCardId === '') {
            this.$message({
              message: '请选择验证银行卡',
              type: 'error'
            })
            return
          }
          if (this.fundPwd === '') {
            this.$message({
              message: '请输入资金密码',
              type: 'error'
            })
            return
          }
          if (this.checkAccount === '') {
            this.$message({
              message: '请输入银行卡号',
              type: 'error'
            })
            return
          }
          this.checkBankCard()
          break
        case 3:
          if (this.bankName === null || this.bankName === '') {
            this.ErrMsgs(3, '请选择银行')
            return
          }
          if (this.province_id === '' || this.city_id === '') {
            this.ErrMsgs(3, '请输入地区')
            return
          }
          if (this.input1 === null || this.input1 === '') {
            this.ErrMsgs(3, '请输入支行名称')
            return
          }
          if (this.input2 === null || this.input2 === '') {
            this.ErrMsgs(3, '请输入银行卡号')
            return
          }
          if (this.input2 !== this.input3) {
            this.ErrMsgs(3, '两次输入的银行卡号不一致')
            return
          }
          if (this.checkType === 1 || this.checkType === '') {
            this.bindBankcard()
          }
          if (this.checkType === 2) {
            this.changeBankCard()
          }
          // this.bindBankcard()
          break
        case 4:
          this.deleteBankCard()
          break
        default:
      }
    },
    // 获取支持的银行列表
    getBank () {
      getBankList().then(res => {
        if (res.errno === 0) {
          this.bankList = res.data
        }
      })
    },
    // 获取地区列表
    getRegion () {
      getDistricts().then(res => {
        if (res.errno === 0) {
          let list = []
          for (let i in res.data) {
            list.push(res.data[i])
          }
          this.regionList = list
        }
      })
    },
    // 选择地区
    reginoChange (e) {
      this.province_id = e[0]
      this.city_id = e[1]
    },
    // 获取已绑定银行卡列表
    getBankList () {
      getBankCardList().then(res => {
        if (res.errno === 0) {
          this.bankCardList = res.data
          if (this.bankCardList.length > 0) {
            this.listType = 1
          }
        }
      })
    },
    // 绑定银行卡
    bindBankcard () {
      let bankData = {
        bankId: this.bankName,
        provinceId: this.province_id,
        cityId: this.city_id,
        accountName: this.userInfo.name,
        account: this.input2,
        branch: this.input1,
        checkedToken: this.checkedToken
      }
      bindBankCard(bankData).then(res => {
        if (res.errno === 0) {
          this.listType = -1
          this.onClose(this.listType)
        }
      })
    },
    // 修改银行卡
    changeBankCard () {
      let bankData = {
        cardId: this.bankCardId,
        bankId: this.bankName,
        provinceId: this.province_id,
        cityId: this.city_id,
        accountName: this.userInfo.name,
        account: this.input2,
        branch: this.input1,
        checkedToken: this.checkedToken
      }
      changeBankCard(bankData).then(res => {
        if (res.errno === 0) {
          this.listType = -1
          setTimeout(() => {
            this.onClose()
          }, 3000)
        }
      })
    },
    // 删除银行卡
    deleteBankCard () {
      deleteBankCard(this.bankCardId, this.checkedToken).then(res => {
        if (res.errno === 0) {
          this.listType = -1
          setTimeout(() => {
            this.onClose()
          }, 3000)
        }
      })
    },
    // 校验银行卡
    checkBankCard () {
      let data = {
        cardId: this.bankCardId,
        fundPwd: this.fundPwd,
        accountName: this.userInfo.name,
        account: this.checkAccount,
        type: this.checkType
      }
      checkBankCard(data).then(res => {
        if (res.errno === 0) {
          this.checkedToken = res.data.checked_token
          if (this.checkType === 3) {
            this.listType = 4
          } else {
            this.listType = 3
          }
        }
      })
    },
    // 提示信息
    ErrMsgs (err, msg) {
      this.errMsg = err
      this.errMsg1 = msg
      setTimeout(() => {
        this.errMsg = ''
      }, 3000)
    },
    add () {
      this.check = true
      this.listType = 2
      this.checkType = 1
    },
    modify () {
      this.check = true
      this.listType = 2
      this.checkType = 2
    },
    del () {
      this.check = true
      this.listType = 2
      this.checkType = 3
    }
  }
}
</script>
<style>
  .drop-enter-active {
    transition: all .5s;
  }
  .drop-leave-active {
    transition: all .3s;
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    transform: translateY(-500px);
  }

  .dialog-modal{
    position: absolute;
    z-index: 5;
  }
  .dialog-wrapper{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-container{
    position: fixed;
    z-index:80;
    width: 600px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  .dialog-container>.title{
    width: 600px;
    height: 58px;
    padding: 15px;
    background: #616078;
    font-size: 19px;
    color: #fff;
    line-height: 28px;
    font-weight: 500;
  }
  span.close-btn{
    padding: 0 5px;
    float: right;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  }
  .dialog-container .bottom{
    width: 600px;
    height: 70px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  .dialog-container .bottom>div{
    width: 60px;
    height: 30px;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    margin: 0 5px;
    cursor: pointer;
  }
  .dialog-container .bottom div:hover{
    opacity: 0.9;
  }
  .dialog-container .bottom .confirm{
    background-color: #4babbf;
    border-color: #4babbf;
  }
  .dialog-container .bottom .close{
    background: #959595;
    border: 1px solid #959595;
  }
  .dialog-container .mid{
    padding: 15px;
    overflow: hidden;
  }
  .dialog-container .mid .title{
    font-size: 18px;
  }
  .dialog-container .mid .btns{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .dialog-container .mid .btns .btn{
    height: 30px;
    line-height: 30px;
    color: #fff;
    margin: 0 10px;
    padding: 0 20px;
    background-color: #4babbf;
    border-color: #4babbf;
    border-radius: 4px;
    cursor: pointer;
  }
  .dialog-container .mid .btns .btn:hover{
    opacity: 0.9;
  }
  .bindingbank .textinput .el-cascader>span{
    line-height: 56px;
    padding-left: 26px;
  }
  .textinput{
    overflow: hidden;
  }
  .textinput>div{
    float: left;
  }
  .textinput .label{
    width: 110px;
    height: 56px;
    font-size: 15px;
    color: #777;
    text-align: center;
    line-height: 56px;
  }
  .textinput .el-select{
    padding: 0;
  }
  .textinput .el-input{
    width: 450px;
    padding: 8px;
    height: 56px;
  }
  .err{
    display: block;
    line-height: 22px;
    padding: 8px 8px 8px 118px;
    font-size: 15px;
    color: #777;
  }
</style>
