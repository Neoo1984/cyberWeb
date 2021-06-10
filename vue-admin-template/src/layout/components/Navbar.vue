<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <div class="user-avatar">账户管理</div>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!--          <router-link to="/">-->
          <!--            <el-dropdown-item>-->
          <!--              首页-->
          <!--            </el-dropdown-item>-->
          <!--          </router-link>-->
          <el-dropdown-item divided @click.native="handlePwd()">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="restPwdDialogVisible"
      width="40%">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" class="demo-form-inline"
               :label-position="labelPosition"
               label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入原密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="请确认密码" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click='restPwdDialogVisible = false'>取 消</el-button>
        <el-button type="primary" @click=confirmPwd()>确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {changePassword} from "@/api/user"
import {MessageBox} from "element-ui";
import store from "@/store";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
    ])

  },
  data() {
    var checkMobile = (rule, value, callback) => {
      const phone = /^1[3456789]\d{9}$/
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else if (!phone.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      textMap: {
        resetPwd: '修改密码',
      },
      dialogStatus: '',
      restPwdDialogVisible: false,
      labelPosition: 'right',
      rules: {
        mobile: [{required: true, validator: checkMobile, trigger: 'blur'}],
        oldPassword: [{required: true, message: '请输入原密码', trigger: 'blur'}],
        pass: [{required: true, validator: validatePass, trigger: 'blur'}],
        checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}],
      },
      ruleForm: {
        mobile: '',
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      MessageBox.confirm(
        '是否退出登录？',
        "确认登出", {
          confirmButtonText: '退出登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })

    },
    handlePwd() {
      this.clearPwd()
      this.dialogStatus = 'resetPwd'
      this.restPwdDialogVisible = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    confirmPwd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const query = {
            mobile: this.ruleForm.mobile,
            changeType: 1,
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword
          }
          changePassword(query).then(res => {
            const message = res.data.message
            if (res.data.success) {
              this.restPwdDialogVisible = false
              this.$notify({
                title: '成功',
                message: message,
                type: 'success',
                duration: 5000
              })
            } else {
              this.$notify({
                title: '失败',
                message: message,
                type: 'error',
                duration: 5000
              })
            }
          })
        }
      })
    },
    clearPwd() {
      this.ruleForm.newPassword = ''
      this.ruleForm.mobile = ''
      this.ruleForm.oldPassword = ''
      this.ruleForm.checkPass = ''
    }

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 80px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
