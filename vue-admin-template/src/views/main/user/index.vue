<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-input
          v-model="listQuery.userName"
          placeholder="用户名/邮箱/手机"
          style="width: 200px"
          class="filter-item">
        </el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">新增用户</el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column label="商户" align="center">
        <template slot-scope="scope">
          {{ scope.row.tenantId }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.phoneNum }}
        </template>
      </el-table-column>
      <el-table-column label="电子邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" :formatter="renderDelete"></el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" :formatter="renderCreateTime"></el-table-column>
      <el-table-column label="更新人" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateUser }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" :formatter="renderUpdateTime"></el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDetail(scope.row.$index, scope.row)">详情
          </el-button>
          <el-popconfirm
            :confirm-button-text= "confirmButtonText"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            :title='confirmButtonTitle'
            @onConfirm="handleOperate(scope.$index, scope.row)"
          >
            <el-button
              style="margin-left: 10px"
              size="mini"
              type="text"
              slot="reference"
            >{{ scope.row.isDelete ==='0'?'注销':'恢复' }}
            </el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"/>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
        ref="temp"
        v-loading="submitLoading"
        :rules="rules"
        :model="temp"
        class="form-inline"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="用户名称：" prop="userName">
          <el-input v-model="temp.userName" placeholder="请输入用户名" style="width: 80%" class="filter-item"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phoneNum">
          <el-input v-model="temp.phoneNum" placeholder="请输入手机号" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址：" prop="email">
          <el-input v-model="temp.email" placeholder="请输入邮箱地址" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="用户角色：" prop="role">
          <el-select v-model="temp.userRole" placeholder="请选择用户角色" style="width:80%">
            <el-option
              v-for="item in userRole"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="temp.password" placeholder="请输入密码" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button :disabled="submitLoading" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getFactoryList, getStoreList} from '@/api/table'
import Pagination from '@/components/Pagination'
import {createStore, deleteStore, updateStore} from '@/api/operation'
import {renderDelete, renderTime} from '@/utils'
import {validatePhone} from "@/utils/validate";
export default {
  name: 'User',
  components: {Pagination},
  data() {
    return {
      list: null,
      listLoading: false,
      dialogVisible: false,
      submitLoading: false,
      total: 0,
      labelPosition: 'right',
      validatePhone:validatePhone,
      renderDelete: renderDelete,
      userRole: global.userRole,
      textMap: {
        creat: '新增',
        update: '编辑',
      },
      temp: {
        userName: undefined,
        phoneNum: undefined,
        email: undefined,
        userRole: undefined,
      },
      dialogStatus: '',
      listQuery: {
        current: 1,
        size: 20,
        userType:'1',
        keyword:undefined
      },
      confirmButtonText:'注销',
      confirmButtonTitle:'是否确认注销？',
      rules: {
        userName: [{required: true, message: '请输入用户名称', trigger: 'blur'}, {
          min: 1,
          max: 20,
          message: '用户名过长',
          trigger: 'blur'
        }],
        phoneNum : [{required: true, trigger: 'blur', validator: validatePhone}],
        email: [{required: true, message: '请输入电子邮箱', trigger: 'blur'}, {
          min: 1,
          max: 20,
          message: '邮箱地址错误',
          trigger: 'blur'
        }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getStoreList(this.listQuery).then(response => {
        this.list = response.data.data.records
        this.total = response.data.data.total
        this.listLoading = false
        this.confirmButtonText = this.list.isDelete === '1' ? '恢复' : '注销'
        this.confirmButtonTitle = this.list.isDelete === '1' ? '是否确认恢复？' : '是否确认注销？'
      })
    },
    renderCreateTime(row){
      return renderTime(row.createTime)
    },
    renderUpdateTime(row){
      return renderTime(row.updateTime)
    },
    handleDetail(index, row) {
      this.dialogVisible = true
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.disabled = true
      this.$nextTick(() => {
        this.$refs['temp'].clearValidate()
      })
    },
    handleOperate(index, row) {
      this.dialogVisible = true
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.disabled = true
      this.$nextTick(() => {
        this.$refs['temp'].clearValidate()
      })
    },
    handleCreate() {
      this.dialogVisible = true
      this.resetTemp()
      this.dialogStatus = 'create'
    },
    search() {
      this.getList()
    },
    resetTemp() {
      this.temp.userName = ""
      this.temp.phoneNum = ""
      this.temp.email = ""
    },
    //重置搜索
    clearSearch() {
      this.listQuery.userName = ""
      this.listQuery.phoneNum = ""
      this.listQuery.email = ""
    },
    createData() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          createStore(this.temp).then(res => {
            const message = res.data.message
            if (res.data.success) {
              this.submitLoading = false
              this.dialogVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: message,
                type: 'success',
                duration: 5000
              })
            } else {
              this.submitLoading = false
              this.$notify.error({
                title: '失败',
                message: message,
                duration: 5000
              })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.submitLoading = true
          updateStore(tempData).then(res => {
            const message = res.data.message
            if (res.data.success) {
              this.submitLoading = false
              this.dialogVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: message,
                type: 'success',
                duration: 5000
              })
            } else {
              this.$notify.error({
                title: '失败',
                message: message,
                duration: 5000
              })
            }
          })
        }
      })
    },
    handleDelete(index, row) {
      deleteStore(row.tenantId).then(res => {
        const message = res.data.message
        if (res.data.success) {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: message
          })
        }
      })
    },
  }

}

</script>
