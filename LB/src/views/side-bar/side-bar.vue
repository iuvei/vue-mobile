<template>
  <div class="side-bar-box">
    <transition name="myside">
      <div class="right-box" v-show="sideBarFlag">
        <ul>
          <li class="float-window">
            <router-link :to="{name: 'activity-center'}">
            <span class="icon-24">
                <p>活动</p>
            </span>
            </router-link>
          </li>
          <li class="float-window">
            <a href="javascript:;" @click="openHongBao">
            <span class="icon-27">
                <p>红包</p>
            </span>
            </a>
          </li>
          <li class="float-window">
            <a href="javascript:;" @click="kefuOpen">
            <span class="icon-13">
                <p>客服</p>
            </span>
            </a>
          </li>
          <!--<li class="float-window">
            <a href="http://phdtestc.goodgaming.com/index.php?s=/WebPublic/download/" target="_blank">
              <span class="icon-4">
                  <p>{{$t('sideBar.download')}}</p>
              </span>
            </a>
          </li>-->
          <li class="float-window">
            <router-link to="/circuit">
            <span class="icon-34">
                <p>线路</p>
            </span>
            </router-link>
          </li>
          <li class="float-window">
            <a href="javascript:;" @click="openFeedback">
            <span class="yi-jian">
                <p>意见反馈</p>
            </span>
            </a>
          </li>
          <!--<li class="float-window">
            <a href="javascript:;" onclick="">
              <span class="icon-9">
                  <p>{{$t('sideBar.task')}}</p>
              </span>
            </a>
          </li>-->
        </ul>
      </div>
    </transition>
    <a href="javascript:;" class="right-box-btn active" @click="sideBarSwitch">
    <span class="icon-29 icon-open" :class="{'icon-close':sideBarFlag}">
        <p v-show="sideBarFlag">收起</p>
        <p v-show="!sideBarFlag">展开</p>
    </span>
    </a>
    <Dialog
      class="side-dialog-header"
      title="意见反馈"
      :visible.sync="dialogVisible">
      <div class="content yijian-box">
        <div class="tips-box clear-fix">
          <i class="smile-icon"></i>
          <span class="tips-word">立博为了让客户得到更好的体验，每位客户的意见都是宝贵的。在此您可以留下意见反馈 让我们能更进步及改进。（即时问题请直接联系客服）</span>
        </div>
        <span class="content-title">反馈内容:</span>
        <el-select ref="elSelect" class="el-select-slide" v-model="SuggestionTypeValue" placeholder="请选择意见分类" @change="isSelect=true">
          <el-option
            v-for="item in SuggestionTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <textarea class="comment" v-model="commentContent"></textarea>
        <div class="yzm-box">
          <span class="content-title">验证码:</span>
          <input type="text" v-model="yzmValue" class="yzm-input">
          <span class="yzm-img-box" title="看不清换一张" @click="getCaptchaFn()">
             <img :src="yanzhenM"/>
          </span>
        </div>
        <el-button type="primary" name="footer" @click="createSuggestion()">提交</el-button>
      </div>
      <img class="yijianfk-bg" src="../../statics/img/yijianfk-bg.png" alt="">
    </Dialog>
    <!--红包弹窗开始-->
    <transition name="fade-in-linear">
      <div class="hongbao-bg" v-show="dialogVisible2">
        <i class="colse-icon icon-8" @click="closeHongBaoPop"></i>
        <div class="hongbao-content">
          <div class="step-box step-1" v-show="step1Show">
            <span class="step-title">任务一：填写真实姓名</span>
            <div class="input-box">
              <input type="text" v-model="inputName" v-focus placeholder="请填写你的真实姓名" maxlength="10" @keyup="specialCharacters"/>
            </div>
          </div>
          <div class="step-box step-2" v-show="step2Show">
            <span class="step-title">任务二：填写微信号</span>
            <div class="input-box">
              <input type="text" v-model="inputWeixin" v-focus placeholder="请填写你的真实微信号"/>
            </div>
          </div>
          <div class="step-box step-3" v-show="step3Show">
            <span class="step-title">任务三：填写手机号码</span>
            <div class="input-box">
              <span class="num-select">+0086 <i class="icon-29"></i></span>
              <input type="text" v-model="inputPhone" v-focus placeholder="请填写你的手机号码"  maxlength="11" @blur="phoneFilter"/>
            </div>
            <div class="input-box input-yzm">
              <span class="num-select">验证码 <i class="icon-29"></i></span>
              <input type="text" placeholder=""/>
              <button class="input-yzm-btn">获取验证码</button>
            </div>
          </div>
          <div class="step-box step-4" v-show="step4Show">
            <div class="money">8<ins>元</ins></div>
            <p>找活动客服</p>
            <p>领取红包吧</p>
          </div>
          <div class="next-btn" v-if="!step4Show">
            <button @click="hongBaoNext()">下一步</button>
          </div>
       </div>
      </div>
    </transition>

    <transition name="fade-in-linear">
      <div class="hongbaoMask" v-show="dialogVisible2"></div>
    </transition>
    <!--红包弹窗结束-->
  </div>
</template>

<script>
import Dialog from '../../components/dialog/src/component'
import {GetCaptcha, CreateSuggestion, GetSuggestionType} from '@/api/activity/activity'
import { openNewCustomerServiceWindow } from '../../util/common'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { setStyleWhenMask, cancelStyleWhenMask } from '../../util/loading'

export default {
  name: 'side-bar',
  components: { Dialog },
  data () {
    return {
      name: 'side-bar',
      sideBarFlag: true,
      dialogVisible: false,
      dialogVisible2: false,
      step1Show: true,
      step2Show: false,
      step3Show: false,
      step4Show: false,
      mode: 'name',
      inputName: '',
      inputWeixin: '',
      inputPhone: '',
      hongBaoMsg: '',
      yanzhenM: '',
      commentContent: '',
      SuggestionTypeOptions: [],
      SuggestionTypeValue: '',
      yzmValue: '',
      isSelect: false
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'customerServiceInfo'
    ])
  },
  methods: {
    getSuggestionType () {
      GetSuggestionType()
        .then((res) => {
          this.SuggestionTypeOptions = res.data
        })
    },
    createSuggestion () {
      if (!this.isSelect) {
        this.$refs.elSelect.$el.querySelector('.el-input__inner').focus()
        if (this.$refs.elSelect.$el.querySelector('.el-input').className.indexOf('is-focus') === -1) {
          this.$refs.elSelect.$el.querySelector('.el-input').className += ' is-focus'
        }
        return this.$message({type: 'error', message: '请选择意见分类'})
      } else if (this.commentContent === '') {
        return this.$message({type: 'error', message: '意见内容不能为空'})
      } else if (this.yzmValue === '') {
        return this.$message({type: 'error', message: '请输入验证码'})
      } else {
        CreateSuggestion(parseInt(this.SuggestionTypeValue), this.commentContent, this.yzmValue)
          .then((res) => {
            if (res.errno === 0) {
              this.dialogVisible = false
              this.$router.push('/index')
              this.commentContent = ''
              this.SuggestionTypeValue = ''
              this.yzmValue = ''
              return Message({message: '意见发表成功', type: 'success'})
            }
          })
          .catch((err) => {
            return Message({message: err, type: 'error'})
          })
      }
    },
    getCaptchaFn () {
      GetCaptcha()
        .then((res) => {
          this.yanzhenM = res.data.src
        })
    },
    specialCharacters () {
      this.inputName = this.inputName.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    nameFilter () {
      if (this.inputName === '') {
        this.$message({
          message: '您的真实姓名不能为空',
          type: 'error'
        })
        return false
      } else {
        this.nextFn()
      }
    },
    weixinFilter () {
      let reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
      if (this.inputWeixin === '') {
        this.$message({
          message: '微信号不能为空',
          type: 'error'
        })
        return false
      } else if (!reg.test(this.inputWeixin)) {
        this.$message({
          message: '请输入正确的微信号',
          type: 'error'
        })
        return false
      } else {
        this.nextFn()
      }
    },
    phoneFilter () {
      let reg2 = /^1[34578]{1}[0-9]{9}$/
      if (this.inputPhone === '') {
        this.$message({
          message: '手机号码不能为空',
          type: 'error'
        })
        return false
      } else if (!reg2.test(this.inputPhone)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        })
        return false
      } else {
        this.nextFn()
      }
    },
    sideBarSwitch () {
      this.sideBarFlag = !this.sideBarFlag
    },
    kefuOpen () {
      openNewCustomerServiceWindow()
      /* let newWindow = window.open('about:blank', 'kefutalk', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=930,height=624')
      newWindow.location.href = 'http://www.ace918.com'
      newWindow.focus()
      newWindow.opener = window */
    },
    openFeedback () {
      if (!this.isLogin) {
        return Message({ message: '请先登录!', type: 'error' })
      } else {
        this.dialogVisible = true
        this.getSuggestionType()
      }
    },
    openHongBao () {
      this.dialogVisible2 = true
      setStyleWhenMask()
      this.step1Show = true
    },
    closeHongBaoPop () {
      this.dialogVisible2 = false
      setTimeout(() => {
        cancelStyleWhenMask()
      }, 300)
      this.mode = 'name'
      this.step1Show = false
      this.step2Show = false
      this.step3Show = false
      this.step4Show = false
    },
    hongBaoNext () {
      // this.nextFn()
      if (this.mode === 'name') {
        this.nameFilter()
        return false
      } else if (this.mode === 'weixin') {
        this.weixinFilter()
        return false
      } else {
        this.phoneFilter()
      }
    },
    nextFn () {
      console.log(this.mode)
      if (this.mode === 'name') {
        this.step1Show = false
        this.step2Show = true
        this.mode = 'weixin'
      } else if (this.mode === 'weixin') {
        this.step2Show = false
        this.step3Show = true
        this.mode = 'phone'
      } else {
        this.step3Show = false
        this.step4Show = true
        this.mode = 'money'
      }
    }
  },
  directives: {
    focus: function (el) {
      el.focus()
    }
  },
  mounted () {
  },
  created () {
    this.getCaptchaFn()
    if (!this.customerServiceInfo) this.$store.dispatch('getCustomerServiceInfo')
  }
}
</script>

<style scoped>
.right-box {
  position: fixed;
  top: 600px;
  padding-bottom: 1px;
  right: 0;
  z-index: 101;
  transform: translateY(-100%);
  overflow: hidden;
  height: 275px;
  transition:  all 1s ease;
}
.right-box ul {
  height: auto;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  font-size: 12px;
  transition:  all 1s ease;
}
.right-box li {
  width: 68px;
  height: 54px;
  margin-bottom: 1px;
  cursor: pointer;
  list-style: none;
  display: block;
}
.right-box li>a {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: #ffffff;
  background-color: #4f5065;
  font-size: 23px;
  transition: all .5s ease 0s;
}
.right-box li>a span {
  float: left;
  width: 100%;
  height: 100%;
  text-align: center;
}
.right-box li >a p {
  float: left;
  width: 100%;
  font-size: 12px;
  font-style: inherit;
  text-align: center;
  margin: 0;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
}
[class^="icon-"]:before, [class*=" icon-"]:before {
  display: inline-block;
  text-decoration: inherit;
  width:16px;
  text-align: center;
  height: 30px;
  color:#fff;
}
.right-box li>a span:before, .icon-close:before{
  font-style: normal;
  font-weight: normal;
  speak: none;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: .2em;
  margin-top: .2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.right-box-btn:hover ,.right-box li >a:hover {
  background-color: #ffd101;
}
.right-box-btn:hover p,.right-box li >a:hover p,
.right-box-btn:hover span:before,
.right-box li >a:hover span:before {
  color: #010004;
}
.right-box-btn {
  position: fixed;
  top: 600px;
  right: 0;
  width: 68px;
  height: 54px;
  text-align: center;
  color: #ffffff;
  background-color: #4f5065;
  border-radius: 5px;
}
.right-box-btn {
  font-size: 23px;
  z-index: 101;
}
.right-box-btn .icon-29:before {
  position: relative;
  transition: all 0.5s ease-in-out;
}
.right-box-btn .icon-open:before {
  transform: rotate(180deg);
}
.right-box-btn .icon-close:before {
  transform: rotate(0deg);
}
.right-box-btn span p {
  font-size: 12px;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
}

.myside-leave-active,.myside-enter-active{
  transition:  all .2s ease;
}
.myside-leave-active,.myside-enter{
  height:0px !important;
}
.myside-leave,.myside-enter-active{
  height: 275px;
}
.yi-jian {
  position: relative;
}
.yi-jian > p {
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 35px !important;
  position: absolute;
  top:50%;
  left:50%;
  width:100%;
  transform:translate(-50%,-50%);
  text-align: center;
  line-height: 14px;
}
/*意见反馈弹窗样式开始*/
.tips-box {
  margin-top: 45px;
}
.yijian-box .el-button {
  background: #4babbf;
  margin-top: 26px;
  border: none;
  width: 158px;
}
.content .tips-word {
  font-size: 14px;
  color: #575757;
  width: 503px;
  background: #f8f8f8;
  border-radius: 75px;
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  line-height: 25px;
  padding:20px 46px;
  float: right;
}
.content {
  width: 562px;
  margin: 0 auto;
}
.content .smile-icon {
  display: inline-block;
  width: 53px;
  height: 53px;
  background: url('../../statics/img/smile.png') no-repeat center center;
  margin-top: 23px
}
.content-title {
  color: #616078;
  font-size: 18px;
}
.comment {
  width: 560px;
  height: 242px;
  padding: 15px;
  border: 1px solid #dbdbdb;
  resize: none;
  margin: 15px 0 13px;
  background: #f9f9f9;
}
.yzm-input {
  background: #f9f9f9;
  border: 1px solid #dbdbdb;
  width: 80px;
  padding: 10px;
  margin: 0 8px;
}
.yzm-box img {
  vertical-align: middle;
}
.yzm-img-box {
  display: inline-block;
  vertical-align: middle;
  min-height: 38px;
  cursor: pointer;
}
.yijianfk-bg {
  position: absolute;
  right: -158px;
  top: -95px;
}
/*意见反馈弹窗样式结束*/

/*红包样式开始*/
.hongbao-bg {
  width: 747px;
  height: 650px;
  background:url("../../statics/img/hongbao-bg.png") no-repeat center center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -373px;
  margin-top: -325px;
  z-index: 105;
}
.hongbao-content {
  width: 384px;
  height: 275px;
  margin: 286px auto 0;
  text-align: center;
}
.step-box,.next-btn{
  margin-left:16px;
}
.step-box .step-title {
  font-size: 18px;
  color: #fff;
}
.step-box .input-box {
  margin: 33px 0 40px;
}
.input-box input {
  background: #fff;
  border-radius: 10px;
  padding: 14px 44px 14px 29px;
  color: #a1a0a0;
  font-size: 18px;
  border: none;
}
.next-btn button {
  background: none;
  border:1px solid #fdf158;
  border-radius: 30px;
  padding: 6px 35px;
  font-size: 18px;
  color: #fdf158;
  cursor: pointer;
}
.step-3 .input-box {
  position: relative;
}
.step-3 .input-box input{
  padding: 14px 0 14px 85px;
}
.input-box .num-select {
  position: absolute;
  top: 8px;
  background: #fff;
  padding: 0px 10px 0px 10px;
  line-height: 33px;
  border-radius: 10px 0 0 10px;
  border-right: 1px solid #cacaca;
  color: #a6a6a6;
}
.num-select .icon-29:before {
  height:0;
  color: #a6a6a6;
}
.step-3 .input-yzm-btn {
  background: #d41111;
  color: #fff;
  font-size: 16px;
  border: none;
  padding: 6px 9px;
  position: absolute;
  right: 42px;
  top: 7px;
  cursor: pointer;
}
.step-3 .input-box {
  margin-bottom: 0;
}
.step-3 .input-yzm {
  margin-top: 12px;
  margin-bottom: 35px;
}
.hongbaoMask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 104;
}
.colse-icon {
  position: absolute;
  width: 38px;
  border-radius: 50%;
  border:1px solid #fff;
  color: #fff;
  right: 45px;
  top: 30px;
  font-size: 26px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
}
.colse-icon:before {
  width: 100%;
  height: 100%;
}
.step-4 p {
  font-size: 30px;
  color: #fff;
  line-height: 43px;
}
.step-4 .money {
  color: #fdf365;
  font-size: 105px;
  margin-bottom: 28px;
}
.step-4 .money ins {
  font-size: 33px;
}
</style>
<style>
.side-dialog-header .dialog-header > a {
  right: 215px !important;
}
.el-select-slide .el-input.is-focus .el-input__inner {
  border-color: #f56c6c !important;
}
.side-dialog-header .dialog{
  min-width: 900px;
}
</style>
