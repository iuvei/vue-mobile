<template>
  <!--eslint-disable-->
  <div class="width">
    <p class="account-title">个人账户管理</p>
    <Dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <!-- list0绑定微信 -->
      <div class="textinput" v-if="listType == 0">
        暂未开放，敬请期待
      </div>
      <!-- list1个人资料 -->
      <div class="textinput" v-if="listType == 1">
        <div class="label">昵称</div>
        <div class="input">
          <el-input v-model="list1input" placeholder="我的昵称" maxlength="8" minlength="1"></el-input>
        </div>
        <div class="err">(请将昵称长度控制在1～8个字符以内)</div>
      </div>
      <!-- list2真实姓名 -->
      <div class="textinput" v-else-if="listType == 2">
        <div class="label">真实姓名</div>
        <div class="input">
          <el-input v-model="list2[0].input" :disabled="isName?true:false" placeholder="真实姓名" maxlength="8" minlength="1"></el-input>
        </div>
        <div class="err" style="color: #ff0000;" v-show="isName === true">用户名已设定过，无法再编辑。</div>
      </div>
      <!-- list3手机 -->
      <div class="textinput" v-else-if="listType == 3">
        <div class="err">请输入以13、14、15、17、18开头的11位手机号码</div>
        <div class="label">手机</div>
        <div class="input">
          <el-input v-model="list3input" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号" class="input-with-select">
            <template slot="prepend">+86</template>
            <!--<el-button slot="append" style="background: #4babbf;color: #fff;">获取验证码</el-button>-->
          </el-input>
        </div>
        <!--<div class="label">验证码</div>-->
        <!--<div class="input">-->
          <!--<el-input style="width: 200px" v-model="input1" placeholder="请输入验证码" maxlength="8" minlength="1"></el-input>-->
        <!--</div>-->
        <div class="err" style="color: red;" v-show="errMsg === 1">{{errMsg1}}</div>
        <div style="margin-top: 10px" v-html="verificationCode"></div>
      </div>
      <!-- list4资金密码 -->
      <div class="textinput" v-else-if="listType == 4">
        <div class="textinput" v-show="fundPwdSeted == 1">
          <div class="label">旧密码</div>
          <div class="input">
            <el-input type="password" v-model="list4input1" onkeyup="value=value.replace(/[\W]/g,'')" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
          <div class="err" style="color: red;" v-show="errMsg === 2">{{errMsg1}}</div>
        </div>
        <div class="textinput">
          <div class="label">新密码</div>
          <div class="input">
            <el-input type="password" onpaste="return false" onkeyup="value=value.replace(/[\W]/g,'')" v-model="list4input2" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
          <div class="err" style="color: red;" v-show="errMsg === 2">{{errMsg1}}</div>
        </div>
        <div class="textinput">
          <div class="label">确认新密码</div>
          <div class="input">
            <el-input type="password" onpaste="return false" onkeyup="value=value.replace(/[\W]/g,'')" v-model="list4input3" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
          <div class="err" style="color: red;" v-show="errMsg === 1">{{errMsg1}}</div>
        </div>
        <div class="err">
          <p>提醒您：</p>
          <p>1.资金密码乃重要个人信息！请勿告知他人。</p>
          <p>2.资金密码若未修改，与初始登录密码相同。</p>
          <p>3.若遗忘资金密码，烦请与客服联系。</p>
          <p>4.资金密码必须为6-16位的数字和字母的组合。</p>
          <p>5.尚未设定资金密码无法绑定银行卡，请先设定资金密码。</p>
        </div>
      </div>
      <!-- list5登录密码 -->
      <div class="textinput" v-else-if="listType == 5">
        <div class="textinput">
          <div class="label">旧密码</div>
          <div class="input">
            <el-input type="password" v-model="list5input1" onkeyup="value=value.replace(/[\W]/g,'')" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
          <div class="err" style="color: red;" v-show="errMsg === 2">{{errMsg1}}</div>
        </div>
        <div class="textinput">
          <div class="label">新密码</div>
          <div class="input">
            <el-input type="password" onpaste="return false" onkeyup="value=value.replace(/[\W]/g,'')" v-model="list5input2" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
        </div>
        <div class="textinput">
          <div class="label">确认新密码</div>
          <div class="input">
            <el-input type="password" onpaste="return false" onkeyup="value=value.replace(/[\W]/g,'')" v-model="list5input3" placeholder="" maxlength="16" minlength="6"></el-input>
          </div>
          <div class="err" style="color: red;" v-show="errMsg === 1">{{errMsg1}}</div>
        </div>
        <div class="err">
          <p>提醒您：</p>
          <p>1.登录密码乃重要个人信息！请勿告知他人。</p>
          <p>2.若遗忘登录密码，烦请与客服联系。</p>
          <p>3.登录密码必须为6-16位的数字和字母的组合。</p>
        </div>
      </div>
      <!-- list6电子邮箱 -->
      <div class="textinput" v-else-if="listType == 6">
        <div class="label">邮箱</div>
        <div class="input">
          <el-input type="email" v-model="list6input" placeholder="请输入邮箱地址"></el-input>
        </div>
        <div class="err" style="color: red;" v-show="errMsg === 2">{{errMsg1}}</div>
      </div>
      <!-- list8绑定谷歌登录器 -->
      <div class="textinput" v-if="listType == 8">
        暂未开放，敬请期待
      </div>
      <!-- 提示信息 -->
      <div class="textinput" v-else-if="listType == -1">
        <p style="font-size: 18px;line-height: 30px;color: #000;padding-bottom: 10px">操作成功</p>
        <p>如果系统未在3秒后自动跳转，请点击下面确认按钮</p>
      </div>
      <!-- 提示信息 -->
      <div class="textinput" v-else-if="listType == -2">
        <p style="font-size: 18px;line-height: 30px;color: #777;padding-bottom: 10px">{{errMsg2}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm(listType)">确 定</el-button>
      </span>
    </Dialog>
    <BankCard :isShow="bankCard" @onClose="onClose"></BankCard>
    <div class="account-content">
      <div class="account-left">
        <ul>
          <!-- list微信 -->
          <li class="account-left-li" v-for="item in list">
            <img :src="fd01" alt="fd01" class="G_img" />
            <div class="account-left-text">
              <h4 class="G_title">{{ item.title }}</h4>
              <p class="G_p">{{ item.p }}<span class="G_bte">{{item.bte}}</span>
              </p>
              <p class="G_text">{{ item.text }}</p>
              <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
            </div>
          </li>
          <!-- list1个人资料 -->
          <li class="account-left-li" v-for="item in list1">
            <img :src="fd06" alt="fd06" class="G_img" />
            <div class="account-left-text">
              <h4 class="G_title">{{ item.title }}</h4>
              <p class="G_p">{{ item.p }}：<span>{{nameData.username}}</span>
              </p>
              <p class="G_p">{{item.bte}}<span class="G_bte">{{list1[0].input == null? '未设定':list1[0].input}}</span>
              </p>
              <p class="G_text">{{ item.text }}</p>
              <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
            </div>
          </li>
            <!-- list2真实姓名 -->
            <li class="account-left-li" v-for="item in list2">
              <img :src="fd02" alt="fd02" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p">{{ item.p }}<span class="G_bte">{{list2[0].input == null? '未设定':list2[0].input}}</span></p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
            <!-- list3手机 -->
            <li class="account-left-li" v-for="item in list3">
              <img :src="fd07" alt="fd07" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p">{{ item.p }}<span class="G_bte">{{list3[0].input == null? '未设定':list3[0].input}}</span></p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
            <!-- list4资金密码 -->
            <li class="account-left-li" v-for="item in list4">
              <img :src="fd03" alt="fd03" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p"><span class="G_bte">{{fundPwdSeted == 1?'已设定资金密码':'未设定资金密码'}}</span>
                </p>
                <p class="G_text">{{ item.text }}</p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
            <!-- list5登录密码 -->
            <li class="account-left-li" v-for="item in list5">
              <img :src="fd08" alt="fd08" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <!--<p class="G_p">{{ item.p }}<span class="G_bte">{{item.bte}}</span></p>-->
                <p class="G_p"></p>
                <p class="G_text">{{ item.text }}</p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
            <!-- list6电子邮箱-->
            <li class="account-left-li" v-for="item in list6">
              <img :src="fd04" alt="fd04" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p">{{ item.p }}<span class="G_bte">{{list6[0].input == null? '未设定':list6[0].input}}</span>
                </p>
                <p class="G_text">{{ item.text }}</p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
            <!-- list7系统设置-->
            <li class="account-left-li" v-for="item in list7">
              <img :src="fd09" alt="fd09" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p">{{ item.p }}</p>
                <el-switch :class="{'switch_off': bet_confirm === false}"
                  style="display: block"
                  v-model="bet_confirm"
                  active-color="#fabb3d"
                  inactive-color="#f2f4f8"
                  @change="switchChange">
                </el-switch>
                <p class="G_text">{{ item.text }}</p>
                <el-switch :class="{'switch_off': open_prompt_voice === false}"
                  v-model="open_prompt_voice"
                  active-color="#fabb3d"
                  inactive-color="#f2f4f8"
                  @change="switchChange">
                </el-switch>
              </div>
            </li>
            <!-- list8谷歌登录器-->
            <li class="account-left-li" v-for="item in list8">
              <img :src ="fd05" alt="fd05" class="G_img" />
              <div class="account-left-text">
                <h4 class="G_title">{{ item.title }}</h4>
                <p class="G_p">{{ item.p }}<span class="G_bte">{{item.bte}}</span>
                </p>
                <p class="G_text">{{ item.text }}</p>
                <a class="G_a" @click="EnterGame(item.type)">{{item.a}}</a>
              </div>
            </li>
        </ul>
      </div>
      <div class="account-right">
        <ul>
          <li class="account-right-li" v-for="item in lisa">
            <img :src="codr" alt="codr" class="G_img" />
            <div class="account-right-text">
              <h4 class="G_title">{{ item.title }}</h4>
              <div class="banklist" v-for="(item, index) in bankCardList" :key="index">
                <span>{{item.bank}}</span>
                <span>{{item.account}}</span>
              </div>
              <a class="G_a" @click="EnterGame2(item.type)">{{item.a}}
                <p class="G_p">{{ item.p }}<img src="" alt="">
                </p>
              </a>
            </div>
          </li>
          <li class="account-right-li">
            <h3>注意事项</h3>
            <div class="separator"></div>
            <p>1.银行卡添加成功后，平台任何区域都不会出现您完整的银行账号，开户名等信息。</p>
            <p>2.每个平台账号最多可以添加五张银行卡。</p>
            <p>3.每个账号只能添加同一个持卡人姓名的银行卡。</p>
            <p>4.添加/修改银行卡信息后，需4小时后方可提现。</p>
            <p>5.必须绑定银行卡后方可提现。</p>
          </li>
          <li class="account-right-li" >
            <h3>最近登录日志</h3>
            <div class="separator"></div>
            <p v-if="index < 20" v-for="(item, index) in logonLog" class="rp" :key="index">时间：{{ item.created_at }}<span>IP地址：{{ item.ip }}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import codr from '../../../../statics/img/question_icon_1.png'
import fd01 from '../../../../statics/img/fd01.png'
import fd02 from '../../../../statics/img/fd02.png'
import fd03 from '../../../../statics/img/fd03.png'
import fd04 from '../../../../statics/img/fd04.png'
import fd05 from '../../../../statics/img/fd05.png'
import fd06 from '../../../../statics/img/fd06.png'
import fd07 from '../../../../statics/img/fd07.png'
import fd08 from '../../../../statics/img/fd08.png'
import fd09 from '../../../../statics/img/fd09.png'
import Dialog from '../../../../components/dialog/src/component'
import BankCard from '../../../../components/user-center/bankCard'
import { getCurrentUserInfo, setUserInfo, changeFundPwd, changeLoginPwd, setFundPwd, getBankCardList, GetCaptcha, GetUserLoginIPInfo } from '../../../../api/userCenter/personalCenter/personal-center'
import { mapGetters } from 'vuex'
export default {
  name: 'account-management',
  inject: ['reload'],
  data () {
    return {
      codr,
      fd01,
      fd02,
      fd03,
      fd04,
      fd05,
      fd06,
      fd07,
      fd08,
      fd09,
      list: [
        {
          type: '0',
          title: '微信绑定 ',
          p: '目前设定 : ',
          bte: '未设定',
          text: '绑定为微信后，在登录时可以直接使用手机微信进行扫一扫，快速登录本平台',
          a: '绑定微信设定>>'
        }
      ],
      list1: [
        {
          type: '1',
          title: '个人资料',
          p: '用户名',
          bte: '昵称：',
          text: '显示个人昵称，保护账号之隐密性',
          a: '昵称设定>>',
          input: '未设定'
        }
      ],
      list1input: '',
      list2: [
        {
          type: '2',
          title: '真实姓名',
          p: '真实姓名：',
          a: '真实姓名设定>>',
          input: '未设定'
        }
      ],
      list2input: '',
      list3: [
        {
          type: '3',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '手机号码',
          p: '手机 ： ',
          bte: '未设定',
          a: '手机设定>>',
          input: ''
        }
      ],
      list3input: '',
      verificationCode: '', // 验证码
      list4: [
        {
          type: '4',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '资金密码',
          bte: '请先绑定银行卡',
          text: '进行银行卡绑定、转账等资金操作时需要进行密码确认，以提高您的资金安全',
          a: '资金密码设定>>',
          input1: '',
          input2: '',
          input3: ''
        }
      ],
      list4input1: '',
      list4input2: '',
      list4input3: '',
      list5: [
        {
          type: '5',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '登录密码',
          p: '上次修改时间',
          bte: '2018-08-26 15:25',
          text: '6-16位字符，需包含数字与英文小写，不能和预设密码相同',
          a: '登录密码设定>>',
          input1: '',
          input2: '',
          input3: ''
        }
      ],
      list5input1: '',
      list5input2: '',
      list5input3: '',
      list6: [
        {
          type: '6',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '邮箱绑定',
          p: '电子邮箱：',
          bte: '未设定',
          text: '绑定邮箱可增加账号安全级别，也可确保邮箱正常情况下取回资金密码',
          a: '电子邮箱设定>>',
          input: '未设定'
        }
      ],
      list6input: '',
      list7: [
        {
          type: '7',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '系统设置',
          p: '立即投注后须弹框确认投注内容',
          text: '开奖与封单声音提示'
        }
      ],
      open_prompt_voice: true,
      open_prompt_voice_text: 'ON',
      bet_confirm: true,
      bet_confirm_text: 'ON',
      list8: [
        {
          type: '8',
          src: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '谷歌登录器',
          p: '登录器',
          bte: '未设定',
          text: '绑定登录器后，于登录时必须从手机的谷歌登录器获取验证码，输入后方可登录，以增加账号安全',
          a: '谷歌登录器设定>>'
        }
      ],
      lisa: [
        {
          type: '9',
          img: '/statics/img/header_logo_18_8_29.8f3aee2.png',
          title: '我的银行卡 ',
          a: '设定银行卡',
          input1: '', // 支行名称
          input2: '', // 银行卡号
          input3: '', // 确认银行卡号
          input4: ''  // 您设定的第一张银行卡号

        }
      ],
      logonLog: [],
      dialogVisible: false,
      listType: '', // 弹窗类型
      errMsg: '', // 是否显示输入框提示信息 1.确认密码 2.密码错误 3.绑定银行卡提示信息
      errMsg1: '', // 提示信息
      errMsg2: '', // 是否设置真实姓名
      isName: false, // 是否填写真实姓名
      input1: '',
      nameData: {},
      fundPwdSeted: 0, // 是否设置资金密码
      isBankCard: false, // 是否绑定银行卡
      bankCardList: [], // 已绑定银行卡列表
      bankCard: false,
      userInfo: ''
    }
  },
  components: {
    Dialog,
    BankCard
  },
  created () {
    this.$loadingShow()
    this.getUser()
    this.getBankList()
    if (this.$store.state.user.isLogin === false) {
      this.$router.push('/index')
      this.$message.error('请先登录')
    }
    this.$loadingHide()
  },
  methods: {
    handleClose () {
      this.dialogVisible = !this.dialogVisible
      this.list1input = ''
      this.list2input = ''
      this.list3input = ''
      this.list6input = ''
      this.list4input1 = ''
      this.list4input2 = ''
      this.list4input3 = ''
      this.list5input1 = ''
      this.list5input2 = ''
      this.list5input3 = ''
    },
    onClose (listType) {
      this.bankCard = false
      if (listType === -1) {
        this.dialogVisible = true
        this.listType = listType
        setTimeout( () =>{
          this.reload()
          this.dialogVisible = false
        },3000)
      }
    },
    EnterGame (e) {
      this.dialogVisible = !this.dialogVisible
      this.listType = e
    },
    EnterGame2 () {
      if (this.isName === false) {
        this.dialogVisible = !this.dialogVisible
        this.listType = -2
        this.errMsg2 = '绑定银行卡信息之前，请填写真实姓名'
        return
      } else if (this.fundPwdSeted === 0) {
        this.dialogVisible = !this.dialogVisible
        this.listType = -2
        this.errMsg2 = '绑定银行卡信息之前，请设置资金密码'
        return
      } else {
        this.bankCard = true
      }
    },
    confirm (type) {
      let n = Number(type)
      switch (n) {
        case 0: // 微信绑定
          this.dialogVisible = false
          break;
        case 1: // 设置昵称
          this.setUser()
          break;
        case 2: // 设置真实姓名
          if (this.isName === true) {
            this.listType = -2
            this.errMsg2 = '真实姓名已设定过'
            return
          }
          this.setUser()
          break;
        case 3: // 设置手机号
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.list3input))) {
            this.ErrMsgs(1, '输入的手机号有误')
            return
          }
          this.setUser()
          break;
        case 4: // 修改资金密码
          let reg2 = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$')
          if (this.fundPwdSeted === 1) {
            if (!reg2.test(this.list4input1)) {
              this.ErrMsgs(2, '请输入由数字和字母组成的6-16位字符')
              return
            }
          } else {
            if (!reg2.test(this.list4input2)) {
              this.ErrMsgs(2, '请输入由数字和字母组成的6-16位字符')
              return
            }
          }
          if (!reg2.test(this.list4input2)) {
            this.ErrMsgs(2, '请输入由数字和字母组成的6-16位字符')
            return
          }
          if (this.list4input2 !== this.list4input3) {
            this.ErrMsgs(1, '两次输入的密码不一致')
            return
          }
          this.setFundPwd()
          break;
        case 5: // 修改登录密码
          let reg3 = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$')
          if (!reg3.test(this.list5input1)) {
            this.ErrMsgs(2, '请输入由数字和字母组成的8-16位字符')
            return
          }
          if (!reg3.test(this.list5input2)) {
            this.ErrMsgs(2, '请输入由数字和字母组成的6-16位字符')
            return
          }
          if (this.list5input2 !== this.list5input3) {
            this.ErrMsgs(1, '两次输入的密码不一致')
            return
          }
          this.setLoginPwd()
          break;
        case 6: // 设置邮箱
          let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
          if(!reg.test(this.list6input)){ //正则验证不通过，格式不对
            this.ErrMsgs(2, '请输入正确的电子邮箱格式如：123456@xx.com')
            return false;
          }
          this.setUser()
          break;
        case 8: // 谷歌登录器
          this.dialogVisible = false
          break;
        default:
          this.dialogVisible = false
      }
      // this.reload()
    },
    // 获取用户信息
    getUser () {
      getCurrentUserInfo().then( res => {
        if (res.errno === 0) {
          this.nameData = res.data
          if (res.data.name != null) {
            this.isName = true
          }
          this.fundPwdSeted = res.data.fund_pwd_seted
          this.list1[0].input = res.data.nickname
          this.list2[0].input = res.data.name
          this.list3[0].input = res.data.mobile
          this.list6[0].input = res.data.email
          if (res.data.bet_confirm === 0) {
            this.bet_confirm = false
          }
          if (res.data.open_prompt_voice === 0) {
            this.open_prompt_voice = false
          }
        }
      })
      GetUserLoginIPInfo().then(res => {
        if (res.errno === 0) {
          this.logonLog = res.data.data
        }
      })
    },
    // 修改用户信息(用户真实姓名/用户昵称/邮箱/skype)
    setUser () {
      let betConfirm = 0
      let openPromptVoice = 0
      if (this.bet_confirm === true) {
        betConfirm =1
      } else {
        betConfirm =0
      }
      if (this.open_prompt_voice === true) {
        openPromptVoice =1
      } else {
        openPromptVoice =0
      }
      if (this.list1input === null) {
        this.list1input = ''
      }
      if (this.list2[0].input === null) {
        this.list2[0].input = ''
      }
      if (this.list3input === null) {
        this.list3input = ''
      }
      if (this.list6input === null) {
        this.list6input = ''
      }
      let data = {
        name: this.list2[0].input,
        nickname: this.list1input,
        email: this.list6input,
        skype: this.nameData.skype,
        mobile: this.list3input,
        betConfirm: betConfirm,
        openPromptVoice: openPromptVoice,
        qq: ''
      }
      setUserInfo(data).then( res => {
        if (res.errno === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.getUser()
        }
      })
    },
    // 修改资金密码
    setFundPwd () {
      if (this.fundPwdSeted === 0) {
        setFundPwd(this.list4input2, this.list4input3).then(res => {
          if (res.errno === 0) {
            this.listType = -1
            this.list4input1 = ''
            this.list4input2 = ''
            this.list4input3 = ''
            setTimeout( () =>{
              this.dialogVisible = false
            },3000)
            this.reload()
          }
        })
      } else {
        changeFundPwd(this.list4input1, this.list4input3).then( res => {
          if (res.errno === 0) {
            this.listType = -1
            this.list4input1 = ''
            this.list4input2 = ''
            this.list4input3 = ''
            setTimeout( () =>{
              this.dialogVisible = false
            },3000)
            this.reload()
          } else {
            this.ErrMsgs(2, res.message)
          }
        })
      }
    },
    // 修改登录密码
    setLoginPwd () {
      changeLoginPwd(this.list5input1, this.list5input3).then( res => {
        if (res.errno === 0) {
          this.listType = -1
          this.list5input1 = ''
          this.list5input2 = ''
          this.list5input3 = ''
          setTimeout( () =>{
            this.dialogVisible = false
          },3000)
        } else {
          this.errMsg = 2
          this.errMsg1 = res.message
          setTimeout( () =>{
            this.errMsg = ''
          },3000)
        }
      })
    },
    // 提示信息
    ErrMsgs (err, msg) {
      this.errMsg = err
      this.errMsg1 = msg
      setTimeout( () =>{
        this.errMsg = ''
      },3000)
    },
    // 获取已绑定银行卡列表
    getBankList () {
      getBankCardList().then(res => {
        if ( res.errno === 0) {
          this.bankCardList = res.data
        }
      })
    },
    // 获取验证码
    GetCaptcha () {
      GetCaptcha().then(res => {
        if (res.errno === 0) {
          this.verificationCode = res.data.src
        }
      })
    },
    // 系统设置
    switchChange () {
      this.setUser()
    }
  }
}
</script>

<style>
.account-title{
  margin-top: -24px;
  margin-left: 60px;
  color: #777;
}
.account-content{
  padding: 40px 0 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}
.account-left{
  width: 760px;
}
.account-left ul{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
}
.account-left-li{
  padding: 10px 0px 30px 10px;
  width: 357px;
  height: 200px;
  float: left;
  margin-bottom: 30px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow:0 20px 20px -20px #333;
  transition: all 0.5s;
  overflow: hidden;
}
.account-left-text{
  margin: 12px 0 0 70px;
  overflow: hidden;
}
.account-left-li:hover{
  cursor: pointer;
  box-shadow:0 12px 20px -20px #333;
}
.account-left-li .G_title {
  line-height: 25px;
  font-weight: 700;
  font-size: 16px;
  color: #333;
}
.account-content .G_text {
  line-height: 20px;
  overflow: visible;
  word-break: normal;
  margin: 10px 0 20px 0;
  padding-right: 20px;
  color: #a2a2a2;
}
.account-content .G_img {
    float: left;
    margin: 24px -5px 0px 13px;
}
.account-content .G_p {
  margin: 10px 0 10px 0;
}
.account-content .G_bte {
  color: #4babbf;
  margin: 0 5px 0 5px;
}
.account-content .G_bte:hover{
  color: #18889f;
}
.account-content .G_a{
  color: #4babbf;
  cursor:pointer;
}
.account-content .G_a:hover{
  color: #18889f;
}
.account-content .account-right{
  width: 400px;
  padding: 0 20px;
}
.account-right ul{
  overflow: hidden;
}
.account-right-li{
  width: 100%;
  line-height: 20px;
  float: left;
  color: #777;
  padding-bottom: 25px;
  margin-bottom: 27px;
}
.account-right-li:nth-child(1){
  width: 100%;
  line-height: 20px;
  float: left;
  color: #777;
  padding-bottom: 25px;
  margin-bottom: 27px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow:0 20px 20px -20px #333;
  transition: all 0.5s;
  overflow: hidden;
}
.account-right-li:nth-child(1):hover{
  cursor: pointer;
  box-shadow:0 12px 20px -20px #333;
}
.account-right-text{
  margin-left: 75px;
  padding: 10px 2px 0px 0px;
  overflow: hidden;
}
.account-right-text h4{
  margin-bottom: 6px;
}
.account-right-text .banklist{
  line-height: 28px;
  color: #fff;
}
.account-right-li:first-child{
  background: #4babbf;
  border: 1px solid #4babbf;
}

.account-right-text .G_a{
  width: 169px;
  height: 45px;
  line-height: 45px;
  background: #fff;
  margin-top: 15px;
  display: block;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  display: block;
}
.account-right-li .G_title{
  color: #fff;
  font-size: 18px;
  font-weight: 100;
}
.account-right-li h3{
  height: 30px;
  line-height: 30px;
  color: #333;
}
.account-right-li .separator{
  width: 100%;
  margin-bottom: 15px;
  position: relative;
  height: 1px;
}
.account-right-li .separator:after{
  height: 1px;
  background: #d1d1d1;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.12) 35%, rgba(0, 0, 0, 0.05) 70%, rgba(0, 0, 0, 0) 100%);
  position: absolute;
  bottom: -1px;
  left: 0px;
  content: "";
  width: 100%;
}
.account-right-li .rp{
  font-weight: 600;
  color: #777;
}
.account-right-li .rp span{
  margin-left: 20px;
  font-weight: 100;
}
.account-left-li:nth-child(8) .G_text{
  margin: 10px 0 0px 0;
}
.account-left-li:nth-child(8) .G_p{
  color: #a2a2a2;
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
.textinput .el-input{
  width: 450px;
  padding: 8px;
  height: 56px;
}
.textinput .el-select{
  width: 450px;
  padding: 8px;
  height: 56px;
}
.textinput .err{
  line-height: 22px;
  padding: 8px 8px 8px 118px;
  font-size: 15px;
  color: #777;
}
.account-content .account-left-li .account-left-text .el-switch .el-switch__core{
  width: 56px !important;
  border-radius: 2px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
}
.account-content .account-left-li .account-left-text .el-switch .el-switch__core:after{
  width: 17px;
  height: 17px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #ffffff 40%, #f0f0f0);
  border-radius: 2px;
}
.account-content .account-left-li .account-left-text .is-checked .el-switch__core:before{
  content: "ON";
  width: 38px;
  line-height: 20px;
  font-weight: 600;
  display: inline-block;
  color: #fff;
  text-align: center;
}
.account-content .account-left-li .account-left-text .switch_off .el-switch__core:before{
  content: "OFF";
  width: 38px;
  line-height: 20px;
  font-weight: 600;
  margin-left: 16px;
  display: inline-block;
  color: #c0cadd;
  text-align: center;
}
@media screen and (min-width:990px) and (max-width:1241px){
  .account-content{
    width: 970px;
    margin: 0 auto;
  }
  .account-left{
    width: 600px;
  }
  .account-left-li{
    width: 291px;
  }
  .account-right{
    width: 330px;
    padding: 0 15px;
  }
}
@media screen and (min-width:768px) and (max-width:991px){
  .account-right{
    padding: 0;
  }
}
@media screen and (max-width: 767px){
  .account-left-li{
    width: 100%;
  }
  .account-right{
    width: 100%;
    padding: 0;
  }
}
</style>
