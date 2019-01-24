<template>
  <section style="width: 100%">
    <!--查询条件-->
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="玩家账号">
          <el-input placeholder="玩家账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox>模糊查询</el-checkbox>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="statusValue" placeholder="请选择" size="small" clearable>
            <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <div class="block">
            <el-date-picker size="small" v-model="time1" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="商户账号">
          <el-input placeholder="商户账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox>模糊查询</el-checkbox>
        </el-form-item>
        <el-form-item label="币 种">
          <el-select v-model="bizhongValue" placeholder="请选择" size="small" clearable>
            <el-option v-for="item in bizhongArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableList" size="small"><i class="el-icon-search"></i> 查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="lists" :border="isSmallWindow" v-loading="listLoading" style="width: 100%;" size="mini">
      <el-table-column align="center" label="玩家账号" min-width="60">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="text" size="small">{{scope.row.account}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sh" label="所属商户" min-width="50">
      </el-table-column>
      <el-table-column align="center" prop="sh" label="昵称" min-width="40">
      </el-table-column>
      <el-table-column align="center" prop="bizhong" label="币种" min-width="40">
      </el-table-column>
      <!-- <el-table-column align="center" prop="status" label="状态">
            </el-table-column> -->
      <!-- <el-table-column align="center" prop="status" label="标签">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === '禁用' ? 'primary' : 'success'" disable-transitions @click="alert()">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column> -->
      <el-table-column align="center" label="状态" prop="status" min-width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" active-text="启用" :inactive-value="0" inactive-text="禁用" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="注册时间" sortable min-width="113">
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="最近登陆时间" sortable min-width="113">
      </el-table-column>
      <el-table-column align="center" prop="ip" label="登陆IP" min-width="92">
      </el-table-column>
      <el-table-column align="center" prop="loginTime" label="登陆次数" min-width="30">
      </el-table-column>
      <el-table-column align="center" prop="profitMoney" label="账户余额" sortable min-width="62">
      </el-table-column>
      <el-table-column align="center" prop="profitMoney" label="总有效投注额" sortable min-width="62">
      </el-table-column>
      <el-table-column align="center" prop="profitMoney" label="总派彩额" sortable min-width="62">
      </el-table-column>
      <el-table-column align="center" prop="profitMoney" label="总输赢值" sortable min-width="62">
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" style="margin-top: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 500]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog title="玩家信息" :visible.sync="editFormVisible" width="650px">
      <el-form :model="editForm" label-width="100px" :inline="true" ref="editForm" class="clearfix">
        <el-col :span="12">
          <el-form-item label="别名/昵称" prop="name">
            <el-input v-model="editForm.account" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="币种" prop="name">
            <el-input v-model="editForm.sh" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册时间" prop="name">
            <el-input v-model="editForm.account" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最近登陆时间" prop="name">
            <el-input v-model="editForm.sh" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总登陆次数" prop="name">
            <el-input v-model="editForm.account" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最近登陆IP" prop="name">
            <el-input v-model="editForm.sh" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户余额" prop="name">
            <el-input v-model="editForm.account" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总有效投注额" prop="name">
            <el-input v-model="editForm.sh" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总派彩额" prop="name">
            <el-input v-model="editForm.account" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总输赢值" prop="name">
            <el-input v-model="editForm.sh" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="user-edit-wrap">
          <el-col :span="12">
            <el-form-item label="账号状态">
              <el-switch v-model="editForm.status" :active-value="1" active-text="启用" :inactive-value="0" inactive-text="禁用" @change="changeSwitch(editForm)">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理操作">
              <el-button-group>
                <el-button type="primary" size="small" @click="kickOff">踢下线</el-button>
                <el-button type="primary" size="small" @click="resetPassword">重置密码</el-button>
              </el-button-group>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
import { getUserList } from '../../api/api';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      lists: [],
      total: 0,
      page: 1,
      size: 20,
      listLoading: false,
      statusArr: [{
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '禁用'
        }
      ],
      statusValue: '',
      bizhongArr: [{
          value: 0,
          label: '人名币'
        },
        {
          value: 1,
          label: '美金'
        }
      ],
      bizhongValue: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      time1: '',
      //编辑界面数据
      editForm: {},
      editFormVisible: false
    }
  },
  computed: {
    ...mapState('common', ['isSmallWindow']),
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableList();
    },
    //获取用户列表
    getTableList() {
      // let para = {
      //     page: this.page,
      //     size: this.size,
      //     url: '${base}/user/userlist'
      // };
      let para = {};
      this.listLoading = true;
      // getUserList(para).then((res) => {
      //   this.total = res.data.total;
      //   this.lists = res.data.lists;
      //   this.listLoading = false;
      // });
      this.axios.post('gamehall/query.do', {
        qt: 2
      }).then((data) => {
        this.listLoading = false;
      })
    },
    changeSwitch(data) {
      if (data.status == 0) {
        this.$confirm('您正在进行 <i class="important">账号禁用</i> 操作，请确认?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          data.status = 1;
        });
      } else {
        this.$confirm('您正在进行 <i class="important">账号启用</i> 操作，请确认?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
        }).catch(() => {
          data.status = 0;
        });
      }

    },
    editUser(data) {
      console.log(data)
      this.editFormVisible = true;
      this.editForm = data;
    },
    kickOff() {
      this.$confirm('您正在对在线玩家进行 <i class="important">踢出游戏</i> 操作，请确认?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '您已成功将玩家从游戏中<i class="important">踢出</i>',
          dangerouslyUseHTMLString: true,
        });
      }).catch(() => {

      });
    },
    resetPassword() {
      const ele = this.$createElement;
      this.$confirm('您正在对玩家进行 <i class="important">重置密码</i> 操作，请确认?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        var m = this.$message({
          type: 'success',
          // message: '您正在成功对玩家的密码进行了重置，新的密码为:<i class="important" style="margin-right:10px" onClick="clickBtn">DGHBJSWKQG</i>',
          message: ele('p', null, [
            ele('span', {
              style: {
                color: '#67c23a'
              }
            }, '您正在成功对玩家的密码进行了重置，新的密码为:'),
            ele('i', {
              style: {
                color: 'red',
                fontSize: '14px'
              },
            }, "DGHBJSWKQG"),
            ele('el-button', {
              on: {
                click: this.copy
              },
              attrs: {
                size: 'small',
                'v-clipboard': 'DGHBJSWKQG'
              },
              style: {
                margin: '0 30px 0 10px'
              }
            }, "复制")
          ]),
          dangerouslyUseHTMLString: true,
          showClose: true,
          duration: 0
        });
      }).catch(() => {

      });
    },
    copy() {
      this.$message.closeAll();
      this.$message({
        type: 'success',
        message: '密码复制成功',
        dangerouslyUseHTMLString: true,
      });
    },

  },
  created() {
    this.getTableList();
  },
  mounted() {}
}

</script>
<style scoped>
.user-edit-wrap {
  background-color: #fdf6ec;
  padding: 10px 0;
  color: #e6a23c;
  margin: 10px 0;
}

.bbb {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

</style>
