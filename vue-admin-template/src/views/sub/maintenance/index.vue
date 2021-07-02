<template>
  <div style="display: flex;flex-direction: column;">

    <el-form :inline="true" size="small" style="padding-left: 10%">
      <el-form-item label="数据采集时间">
        <el-input style="width: 300px"
                  class="filter-item"
                  disabled
        ></el-input>
      </el-form-item>

      <el-button type="primary" @click="handleRefresh" icon="el-icon-refresh" size="small">刷新</el-button>
      <el-tooltip class="item" effect="dark" content="勾选柜子编号进行OTA" placement="top">
        <el-button type="primary" @click="handleOta" icon="el-icon-thumb" size="small">电池包OTA</el-button>
      </el-tooltip>
    </el-form>
    <div style="position: relative">
      <el-checkbox :indeterminate="isIndeterminate" v-model="allChecked" @change="handleCheckAllChange"
                   style="position: absolute;right: 20%">选择所有格口
      </el-checkbox>
    </div>
    <div class="box-main">

      <div class="box-content">
        <div v-for="item in list" class="box-item" :style="`width:${itemWidth}%;`">
          <el-checkbox-group v-model="checkList" @change="handleCheckedBox">
            <el-checkbox :label="item" :key="item" class="check-list"></el-checkbox>
          </el-checkbox-group>

        </div>
      </div>



    </div>
    <!--ota-->
    <el-dialog
      title="选择要升级的设备信息和升级包"
      :visible.sync="otaDialogVisible"
      width="60%"
    >
      <el-form ref="otaRef" :rules="otaRules" :model="otaTemp" class="demo-form-inline"
               :label-position="labelPosition"
               label-width="100px"
      >
        <el-form-item label="软件版本" prop="packageId">
          <el-select v-model="otaTemp.packageId" placeholder="请选择软件版本" style="width: 80%" class="filter-item">
            <el-option
              v-for="item in softVersion"
              :key="item.index"
              :label="item.softVersion"
              :value="item.objectId"
            >
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item>
          <el-select v-model="otaTemp.updateType" placeholder="请选择升级方式" style="width: 80%" class="filter-item">
            <el-option
              v-for="item in updateType"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="otaDialogVisible = false">取消</el-button>
        <el-button type="primary" @click=ota()>开始OTA</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import Comm from '@/views/sub/comm'
import {otaSend, queryHardVersion} from "@/api/operation";
import {global} from "@/common";

export default {
  name: 'Maintenance',
  components: {Comm},
  data() {
    return {
      deviceName : this.$route.query.deviceName,
      factoryName : this.$route.query.factoryName,
      hardVersion : this.$route.query.hardVersion,
      productModel : this.$route.query.productModel,
      deviceType : this.$route.query.deviceType,
      labelPosition: 'right',
      drawer: false,
      otaDialogVisible:false,
      direction: 'rtl',
      itemWidth: 0,
      formInline: {},
      isIndeterminate: true,
      list: [1, 2, 3, 4, 5, 6, 7, 8], //全部list
      checkList: [], //选中的list
      allChecked: false, //是否全选
      updateType:global.updateType,
      otaTemp: {
        deviceNames: [],
        packageId: '',
        updateType: 0
      },
      softVersion:[],
      otaRules: { packageId: [{ required: true, message: '请选择软件版本', trigger: 'blur' }] },

    }
  },
  created() {
    this.itemWidth = 100 / (Math.ceil(this.list.length / 4))
    console.log(this.$route.query.deviceName)
  },
  methods: {
    handleClose(done) {
      done()
    },
    //刷新数据
    handleRefresh() {

    },
    //OTA
    handleOta() {
      if (this.checkList.length > 0) {
        this.otaDialogVisible = true
        const query = {
          // factoryName: this.listQuery.factoryName,
          // hardVersion: this.listQuery.hardVersion,
          // productModel: this.listQuery.productModel
        }
        this.softVersion = []
        queryHardVersion(query).then(res => {
            if (res.data.success) {
              if (res.data.data.length !== 0) {
                var data = res.data.data
                data.forEach((item, value) => {
                  this.softVersion.push({softVersion: item.softVersion, objectId: item.objectId})
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          }
        )
        this.$nextTick(() => {
          this.$refs['otaRef'].clearValidate()
        })
      } else {
        this.$notify({
          title: '警告',
          message: 'q',
          type: 'warning'
        });
      }
    },

    ota() {
      this.$refs['otaRef'].validate((valid) => {
        if (valid) {
          otaSend(this.otaTemp).then(res => {
            if (res.data.success) {
              this.$message({
                showClose: true,
                message: 'OTA下发成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
          this.softVersion = []
        }
      })

    },
    //全选
    handleCheckAllChange(val) {
      console.log(val)
      this.checkList = val ? this.list : []
      this.isIndeterminate = false
    },
    //单选
    handleCheckedBox(val) {
      console.log(val)
      let count = val.length
      this.allChecked = count === this.list.length
    },

  }

}
</script>

<style scoped>

.fix-checkbox {
  position: absolute;
  right: 4px;
  bottom: 4px;
}


</style>
