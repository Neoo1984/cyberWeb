<template>

  <div class="app-container">
    <div class="filter-container">
      <!--表单-->
      <el-row>
        <el-col :span="8">
          <el-form ref="mainDataForm" :rules="rules" :model="mainTemp" size="small" class="demo-form-inline"
                   :label-position="labelPosition"
                   label-width="100px"
          >
            <el-form-item label="设备编码" prop="mainDeviceName">
              <el-input v-model="mainTemp.mainDeviceName" disabled style="width: 80%"
                        class="filter-item"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备状态" prop="mainDeviceName">
              <el-input v-model="mainTemp.mainDeviceName" disabled style="width: 80%"
                        class="filter-item"
              ></el-input>
            </el-form-item>
            <el-form-item label="最后心跳时间" prop="mainDeviceName">
              <el-input v-model="mainTemp.mainDeviceName" disabled style="width: 80%"
                        class="filter-item"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="mainTemp.deviceType" placeholder="请选择设备类型" style="width: 80%" class="filter-item">
                <el-option
                  v-for="item in deviceType"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="8">
          <el-form ref="mainDataForm" :rules="rules" :model="mainTemp" size="small" class="demo-form-inline"
                   :label-position="labelPosition"
                   label-width="100px"
          >
            <el-form-item label="厂商名称" prop="factoryName">
              <el-select v-model="mainTemp.factoryName" placeholder="请选择厂商名称" style="width: 200px" class="filter-item">
                <el-option
                  v-for="item in factoryName"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品型号" prop="productModel">
              <el-select v-model="mainTemp.productModel" placeholder="请选择产品型号" style="width: 200px" class="filter-item">
                <el-option
                  v-for="item in productModel"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="硬件版本" prop="hardVersion">
              <el-select v-model="mainTemp.hardVersion" placeholder="请选择产品型号" style="width: 200px" class="filter-item">
                <el-option
                  v-for="item in hardVersion"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form>
              <el-button>取消</el-button>
            </el-form>
          </el-form>

        </el-col>
      </el-row>

      <el-table
        :data="statusData"
        v-loading="statusLoading"
      >
        <el-table-column label="设备编号" align="center" width="150">
          <template slot-scope="scope">
            {{ scope.row.deviceName }}
          </template>
        </el-table-column>
        <el-table-column label="是否在线" align="center" width="100" :formatter="renderIsOnline">
        </el-table-column>
        <el-table-column label="最后在线时间" align="center" width="150" :formatter="renderOnlineTime">
        </el-table-column>
        <el-table-column label="最后离线时间" align="center" width="150" :formatter="renderOfflineTime">
        </el-table-column>
        <el-table-column label="OTA版本" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.otaSoftVersion }}
          </template>
        </el-table-column>
        <el-table-column label="OTA状态" align="center" width="100" :formatter="renderOtaStatus">
        </el-table-column>
        <el-table-column label="刷新时间" align="center" width="150" :formatter="renderRefreshTime">
        </el-table-column>
        <el-table-column label="安装进度" align="center" width="100" :formatter="renderUpdateProgress">

        </el-table-column>
        <el-table-column label="下载进度" align="center" width="100" :formatter="renderDownloadProgress">

        </el-table-column>

      </el-table>
    </div>
  </div>

</template>

<script>

import {renderTime, renderIsOnline, renderOtaStatus, renderProgress} from "@/utils";
import {queryDeviceStatus} from "@/api/operation";
import {global} from "@/common";
export default {
  name: 'Info',
  data() {
    return {
      statusData: null,
      statusLoading: false,
      labelPosition: 'right',
      renderIsOnline:renderIsOnline,
      renderOtaStatus:renderOtaStatus,
      deviceType:global.deviceType,
      productModel:[],
      mainTemp: {
        mainDeviceName: '',
        deviceName: '',
        deviceType: '',
        factoryName: '',
        productKey: '',
        productModel: '',
        hardVersion: '',
        softVersion: undefined,
      },
      factoryName: [],
      hardVersion: [],
      rules: {
        deviceName: [{required: true, message: '请输入设备编号', trigger: 'blur'}],
        deviceType: [{required: true, message: '请选择设备类型', trigger: 'blur'}],
        factoryName: [{required: true, message: '请选择厂商名称', trigger: 'blur'}],
        productModel: [{required: true, message: '请选择产品型号', trigger: 'blur'}],
        hardVersion: [{required: true, message: '请选择硬件版本', trigger: 'blur'}],
      },
    }
  },
  created() {
    this.handleStatus()
    console.log(this.$route.query.deviceName +'111')

  },
  methods: {
    // 状态
    handleStatus() {
      const query = {deviceName: sessionStorage.getItem('device_name')}
      console.log(query)
      this.statusData = []
      this.statusLoading = true

      queryDeviceStatus(query).then(res => {
        if (res.data.success) {
          this.statusLoading = false
          if (res.data.data.length !== 0) {
            this.statusData.push(res.data.data)
            this.statusLoading = false
          }
        } else {
          this.statusLoading = false
          this.$message({
            showClose: true,
            message: '无此设备或此设备未曾上线过',
            type: 'error',
            duration: 5000
          })
        }
      })

    },

    renderOnlineTime(row) {
      return renderTime(row.onlineTime)
    },
    renderOfflineTime(row) {
      return renderTime(row.offlineTime)
    },
    renderRefreshTime(row) {
      return renderTime(row.refreshTime)
    },
    renderUpdateProgress(row) {
      return renderProgress(row.updateProgress)
    },
    renderDownloadProgress(row) {
      return renderProgress(row.downloadProgress)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
