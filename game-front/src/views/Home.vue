<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col class="logo logo-width">
        <img src="../assets/img/global/logo.png" alt="完美系统">
            </el-col>
        <el-col style="width: 30px;margin-left: 10px;cursor: pointer;">
          <div @click.prevent="collapse">
            <i class="iconfont icon-moreclass" style="font-size: 32px"></i>
          </div>
        </el-col>
        <el-col :span="6" class="quick-search">
          <el-input placeholder="请输入玩家账号查询游戏记录" v-model="topAccountNo" class="input-with-select" @keyup.enter.native="searchGame" clearable>
            <el-button slot="append" icon="el-icon-search" @click.native="searchGame"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" class="userinfo">
          <span class="el-dropdown-link userinfo-inner">欢迎您： {{sysUserName}}</span>
          <i class="iconfont icon-app_icons--" @click="changePassword"></i>
          <i class="iconfont icon-dengchu" @click="logout"></i>
        </el-col>
      </el-col>
      <el-col :span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'" ref="aside">
          <!--导航菜单-->
          <el-menu :default-active="$route.path" :unique-opened="true" class="el-menu-vertical-demo" :collapse="collapsed" router>
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span></el-menu-item>
            </template>
          </el-menu>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <!-- 面包屑 -->
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <!-- <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                    {{ item.name }}
                                </el-breadcrumb-item> -->
                <el-breadcrumb-item :to="{ path: '/Main' }">
                                    <i class="iconfont icon-home"></i> 首页
                                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="$route.name != '首页'">

                  {{ $route.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <!-- 主体区域 -->
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
        <!--修改密码界面-->
        <el-dialog title="修改密码" :visible.sync="changePasswordWrap" width="650px">
          <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="changePasswordRules" label-width="100px">
            <el-form-item label="原密码" prop="oldPwd">
              <el-col :span="11">
                <el-input v-model="ruleForm.oldPwd" type="password" placeholder="请输入原密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-col :span="11">
                <el-input v-model="ruleForm.newPwd" type="password" placeholder="请输入新密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
              <el-col :span="11">
                <el-input v-model="ruleForm.confirmPwd" type="password" placeholder="请确认密码"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button @click.native="resetPassword('ruleForm')">重置</el-button>
              <el-button type="primary" @click.native="changePassworSubmit('ruleForm')" :loading="editLoading">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      changePasswordRules: {
        oldPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      changePasswordWrap: false,
      editLoading: false,
      topAccountNo: "" //顶部玩家搜索的账号
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    searchGame() {
      if (this.topAccountNo === "") {
        this.$message.error('请输入玩家账号');
        return;
      }

      this.$router.push({ path: '/GameRecord', query: { accountNo: this.topAccountNo } });

    },
    handleclose() {
      console.log(this.$refs)
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user');
        _this.$router.push('/login');
      }).catch(() => {

      });
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
      console.log(this.$refs.aside.clientWidth)
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },
    changePassword() {
      this.changePasswordWrap = true;
    },
    changePassworSubmit(formName) {
      debugger
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetPassword(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    // var user = sessionStorage.getItem('user');
    // if (user) {
    //     user = JSON.parse(user);
    //     this.sysUserName = user.name || '';
    // }

  }
}

</script>
<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: #1a1a1a;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .icon-dengchu,
      .icon-app_icons-- {
        font-size: 30px;
        margin-left: 20px;
        cursor: pointer;
        vertical-align: middle;

        &:hover {
          color: #ddd
        }
      }

      .userinfo-inner {
        color: #FF6C60;
      }
    }

    .quick-search {
      height: 60px;
      margin-left: 20px
    }

    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        height: 70%;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: 150px;
    }

    .logo-collapse-width {
      width: 60px
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    background: #fff;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;


    aside {

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 150px;
        min-height: 400px;
      }

      .el-menu {
        height: 100%;
        background: #2a3542;
        border-radius: 0;

        .el-menu-item,
        .el-submenu {
          color: #aeb2b7;
          margin-top: 5px;
          min-width: 0;

          &:hover {
            i {
              color: #FF6C60;
            }

            background:#35404d !important;
            color:#FF6C60;
          }
        }

        .is-active {
          color: #FF6C60 !important;

          i {
            color: #FF6C60;
          }

          background: none;
        }




      }

      .collapsed {
        width: 60px;

        .item {
          position: relative;
        }

        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }

    .content-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px;

      .breadcrumb-container {
        margin-bottom: 15px;

        .title {
          width: 200px;
          float: left;
          color: #475669;
          font-size: 20px;
        }

        // .breadcrumb-inner {
        //  float: right;
        // }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }


  }


}

</style>
