<template>
<div class="stationLetter">
  <div class="width">
    <router-link class="title" :to="{name: ''}">站内信列表</router-link>
    <div class="head">
      <div>
        <!--<div>发送用户名</div>-->
        <el-tooltip content="下级代理列表" placement="top-start" effect="light" :visible-arrow="false">
          <!--<el-select v-model="childrenName" @change="getChildrenID" placeholder="请选择下级代理">-->
            <!--<el-option-->
              <!--v-for="(item, index) in children"-->
              <!--:key="index"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <el-cascader
            :options="children"
            @change="getChildrenID"
            placeholder="请选择下级代理"
            :show-all-levels="false"
            expand-trigger="hover"
          ></el-cascader>
        </el-tooltip>
      </div>
      <div>
        <el-button size="medium" @click="openSubordinate">发消息</el-button>
      </div>
      <div>
        <el-button size="medium" @click="openSuperior">联络上级</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          prop="type"
          label="消息类别">
        </el-table-column>
        <el-table-column
          prop="msg_title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="is_readed_text"
          label="消息状态">
        </el-table-column>
        <el-table-column
          prop="sender"
          label="发信人">
        </el-table-column>
        <el-table-column
          prop="username"
          label="收信人">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="发信时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="dialogue(scope.row,scope.$index)"
              type="text"
              style="color: #f17e2e"
              size="small">
              查看消息
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deletList(scope.row,scope.$index)"
              type="text"
              style="color: #f17e2e"
              size="small">
              删除消息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="btn">
      <el-button style="color: #ffffff;" @click.native="deletList">删除选中的消息</el-button>
    </div> -->
    <div class="page">
      <pagination :pageDate="pageDate" @jump="pageChenge"></pagination>
    </div>
  </div>

  <Dialog
    title="发送站内信"
    :visible.sync="msgModelShow"
    width="30%"
    :before-close="closeModel">
    <div class="modelMsg">
      <p class="msgTitle">发送给:  {{sendUserData.username}}</p>
      <el-input type="text" placeholder="请输入消息标题" v-model="textTitle"></el-input>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入要发送的内容"
        v-model="textarea">
      </el-input>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="sendUserMsg(0)">取 消</el-button>
    <el-button type="primary" @click="sendUserMsg(1)">发 送</el-button>
  </span>
  </Dialog>

  <Dialog
    title="站内信详情"
    :visible.sync="msgDetailsShow"
    width="30%">
    <div class="msgDetails">
      <p class="time">发信时间:{{msgDetails.created_at}}</p>
      <p class="msgDetailsTitle">
        <span>发信人:  {{msgDetails.sender}}</span>
        <span>收信人:  {{msgDetails.username}}</span>
      </p>
      <p>标题:&nbsp;{{msgDetails.msg_title}}</p>
      <p>消息内容:</p>
      <p v-if="msgDetails.type === msgType.system" class="msgDetailsContent" v-html="changeWordSymbol(msgDetails.content)"></p>
      <p v-else>{{msgDetails.content}}</p>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="msgDetailsShow = false">确定</el-button>
  </span>
  </Dialog>
</div>
</template>

<script>
import { getMessageList, GetSendInfo, SendMessage, setMessageToRead, DeleteMessage } from '../../../api/userCenter/systemCenter/station-letter'
import Pagination from '../../../components/user-center/pagination'
import Dialog from '../../../components/dialog'
import { changeWordSymbol } from '../../../filters'
import {msgType} from '../../../config/game-default-config'

export default {
  name: 'stationLetter',
  components: { Pagination, Dialog },
  data () {
    return {
      page: 1,
      pageSize: 20,
      pageDate: {
        page: '1',
        pageCount: 1,
        pagesize: '1',
        totalCount: 1
      },
      text: '',
      tableData: [],
      children: [], // 下级代理列表
      childrenName: '',
      childrenID: {}, // 选中的下级代理
      msgModelShow: false,
      textarea: '', // 要发送的信息
      textTitle: '', // 要发送消息的标题
      sendType: null,
      sendTypeID: null,
      SuperiorID: '', // 上级代理信息
      sendUserData: {}, // 准备提交的用户参数
      msgDetailsShow: false, // 消息详情显示控制
      msgDetails: {},
      msgType: {}
    }
  },
  methods: {
    changeWordSymbol (value) {
      return changeWordSymbol.call(this, value)
    },
    pageChenge (e) {
      // 分页
      this.page = e
      this.$loadingShow()
      this.getStationLetter()
    },
    handleSelectionChange (e) {
      console.log(e)
    },
    deletList (e) {
      // 删除选中消息
      DeleteMessage(e.id)
        .then(data => {
          if (data.errno === 0) {
            this.$message({
              message: '删除消息成功',
              type: 'success'
            })
          }
          this.$loadingShow()
          this.getStationLetter()
        })
        .catch(err => {
          console.error(err)
        })
    },
    getStationLetter () {
      // 获取信息列表
      getMessageList(this.page, this.pageSize, 0)
        .then(data => {
          if (data.errno === 0) {
            this.$loadingHide()
            console.log('站内信列表:', data)
            this.tableData = data.data.data
            data.data.data.forEach((item, index) => {
              if (item.is_readed === 0) {
                this.tableData[index].is_readed_text = '未读'
              } else {
                this.tableData[index].is_readed_text = '已读'
              }
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    getChildrenID (e) {
      // 获取下级代理ID
      console.log(e)
      let children = JSON.parse(e[1])
      this.childrenID = children
    },

    getMsgFront () {
      // 发送消息前的准备
      GetSendInfo()
        .then(data => {
          let arr = []
          if (data.errno === 0) {
            this.sendType = data.data.send_type
            // this.children = data.data.children.n
            this.SuperiorID = data.data.parent
            data.data.children.forEach((item, index) => {
              // console.log(item)
              arr.push({
                label: item.line,
                // value: '',
                value: index,
                children: []
              })
              item.users.forEach((items) => {
                arr[index].children.push({
                  value: JSON.stringify(items),
                  label: items.username
                })
              })
            })
            this.$set(this, 'children', arr)
          }
        })
        .catch(err => console.error(err))
    },

    sendUserMsg (e) {
      // 发送消息
      this.msgModelShow = false
      if (e === 0) {
        this.$message('取消发送消息')
        this.textarea = ''
      } else if (e === 1) {
        // SendMessage(this.sendTypeID, this.textTitle, this.textarea, this.childrenID.id)
        SendMessage(this.sendTypeID, this.textTitle, this.textarea, this.sendUserData.id)
          .then(data => {
            console.log(data)
            if (data.errno === 0) {
              this.$message({
                message: `给${this.childrenID.username}发送消息成功`,
                type: 'success'
              })
            }
            this.textarea = ''
            this.textTitle = ''
            this.sendUserData = {}
          })
          .catch(err => {
            console.error(err)
            this.sendUserData = {}
          })
      }
    },

    openSuperior () {
      // 上级代理发信
      this.ifSendType('上级')
      if (JSON.stringify(this.SuperiorID) === JSON.stringify({})) {
        this.$message({
          message: '当前没有上级代理',
          type: 'warning'
        })
        return false
      } else {
        this.sendUserData = this.SuperiorID
        this.openModel()
      }
      this.openModel()
    },

    ifSendType (condition) {
      this.sendType.forEach((item, index) => {
        if (item.name === condition) {
          this.sendTypeID = item.id
        }
      })
    },

    openSubordinate () {
      // 下级代理发信
      this.ifSendType('单一下级')
      if (JSON.stringify(this.childrenID) === JSON.stringify({})) {
        this.$message({
          message: '请选择下级代理',
          type: 'warning'
        })
        return false
      } else {
        this.sendUserData = this.childrenID
        this.openModel()
      }
    },

    openModel () {
      // 打开发信窗口
      this.msgModelShow = true
    },

    closeModel () {
      // 关闭发信窗口
      this.msgModelShow = false
    },
    dialogue (e) {
      // 阅读消息详情
      const useId = this.$store.state.user.userInfo.id
      this.msgDetailsShow = true
      this.msgDetails = e
      console.log(e.username, useId)
      if (e.user_id === useId && e.is_readed === 0) {
        console.log(e.username, useId)
        setMessageToRead(e.id)
          .then(data => {
            if (data.errno === 0) {
              this.$eventHub.$emit('unreadUpdate', 1)
            }
            this.$loadingShow()
            this.getStationLetter()
          })
          .catch(err => {
            console.error(err)
          })
      }
      console.log(e)
    }
  },
  mounted () {
    this.getStationLetter()
    this.$loadingShow()
  },
  created () {
    this.msgType = msgType
    this.getMsgFront()
  }
}
</script>

<style>
  @import "../../../statics/css/common.js.css";
  .stationLetter{
    width: 100%;
  }
  .stationLetter .width{
    min-height: calc(100vh - 394px);
  }
  .stationLetter .head{
    padding-top: 20px;
    color: #777777;
    display: flex;
    justify-content: center;
  }
  .stationLetter .head div{
    margin-right: 5px;
  }
  .stationLetter .head>div:nth-child(1){
    width: 178px;
  }
  .stationLetter .head div:nth-child(2){
    width: 84px;
  }
  .stationLetter .head div:nth-child(3){
    width: 98px;
  }
  .stationLetter .head div button{
    background: #eb7e00;
    border: 1px solid #EC6300;
    color: #ffffff;
  }
  .stationLetter .head div button:hover{
    background: #eb7e00;
  }
  .stationLetter .head div button:active{
    background: #EC6300;
  }
  .stationLetter .content{
    padding-top: 50px;
  }
  .stationLetter .content .has-gutter th{
    background: #eb7e00;
    color: #ffffff;
    text-align: center;
  }
  .stationLetter .content .el-table__row td{
    text-align: center;
  }
  .stationLetter .btn{
    margin-top: 50px;
    margin-bottom: 100px;
  }
  .stationLetter .btn button{
    text-align: center;
    font-size: 14px;
    background: #eb7e00;
    border: 1px solid #EC6300;
  }
  .stationLetter .btn button:active{
    background: #EC6300;
  }
  .el-select-dropdown .el-select-dropdown__item.selected{
    color: #eb7e00 !important;
  }
</style>

<style>
  .stationLetter .title{
    position: relative;
    left: 60px;
    top: -24px;
  }
.stationLetter .msgDetails p{
  margin-bottom: 10px;
}
  .stationLetter .msgDetails .msgDetailsTitle{
    display: flex;
    justify-content: space-between;
  }
  .stationLetter .msgDetails .msgDetailsContent{
    line-height: 20px;
  }
  .stationLetter .modelMsg{}
  .stationLetter .modelMsg .msgTitle{
    margin-bottom: 10px;
  }
  .stationLetter .modelMsg .el-input input{
    margin-bottom: 20px;
  }
  .stationLetter .modelMsg .el-input input:focus{
    border-color: #eb7e00 !important;
  }.stationLetter .modelMsg .el-textarea textarea:focus{
    border-color: #eb7e00 !important;
  }
  .stationLetter .width .el-select .is-focus input{
    border-color: #eb7e00 !important;
  }
  .stationLetter .width .el-select .el-input__inner:focus{
    border-color: #eb7e00 !important;
  }
  .stationLetter .el-dialog__wrapper .el-dialog__footer .el-button--primary{
    background-color: #eb7e00 !important;
    border-color: #eb7e00 !important;
  }
  .stationLetter .el-dialog__wrapper .el-dialog__footer .el-button--primary:active{
    background-color: #d56b00 !important;
    border-color: #d56b00 !important;
  }
  .stationLetter .is-checked .el-checkbox__inner{
    background-color: #eb7e00 !important;
    border-color: #eb7e00 !important;
  }
  .el-cascader-menus .el-cascader-menu .is-active{
    color: #eb7e00 !important;
  }
  .stationLetter .content .el-table__row .cell{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
