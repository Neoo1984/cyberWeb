<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item label="设备类型">
          <el-select @change="getList" v-model="listQuery.deviceType" placeholder="请选择设备类型">
            <el-option
              v-for="item in deviceType"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商">
          <el-select filterable @focus="getFactoryName" @change="getList" v-model="listQuery.factoryName" placeholder="请选择厂商名称"
                     style="width: 200px" class="filter-item">
            <el-option
              v-for="item in listFactoryName"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-select @focus="getProduct" @change="getList" v-model="listQuery.productModel" placeholder="请选择产品型号"
                     style="width: 200px" class="filter-item">
            <el-option
              v-for="item in listProductModel"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-select v-model="listQuery.hardVersion" @focus="getHard" @change="getList" placeholder="请选择产品型号"
                     style="width: 200px"
                     class="filter-item">
            <el-option
              v-for="item in listHardVersion"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务编号">
          <el-input v-model="listQuery.taskId" placeholder="设备编码" style="width: 200px"
                    class="filter-item"></el-input>
        </el-form-item>

        <el-button type="primary" @click="getList" icon="el-icon-search" size="small">查询</el-button>
        <el-button type="primary" @click="reSearch" icon="el-icon-refresh-left" size="small">重置查询</el-button>
        <el-button type="primary" @click="handleOtaCreate" icon="el-icon-plus" size="small">新建OTA任务</el-button>

      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="index" align="center" label="序号" width="50" fixed="left"></el-table-column>

      <el-table-column label="任务编号" align="center" width="150" fixed="left">
        <template slot-scope="scope">
          <span>{{ scope.row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="厂商名称" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.factoryName }}
        </template>
      </el-table-column>
      <el-table-column label="升级设备类型" align="center" width="150" :formatter="renderType">
      </el-table-column>

      <el-table-column label="产品型号" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.productModel }}
        </template>
      </el-table-column>

      <el-table-column label="硬件版本" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.hardVersion }}
        </template>
      </el-table-column>
      <el-table-column label="升级软件版本" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.upSoftVersion }}
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center" width="150" :formatter="renderTaskStatus">
      </el-table-column>
      <el-table-column label="任务开始时间" align="center" width="150" :formatter="renderBeginTime">
      </el-table-column>
      <el-table-column label="任务结束时间" align="center" width="150" :formatter="renderEndTime">
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="150" :formatter="renderCreateTime">
      </el-table-column>
      <el-table-column label="创建者" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="150" :formatter="renderUpdateTime">
      </el-table-column>
      <el-table-column label="更新者" align="center" width="150">
        <template slot-scope="scope">
          {{ scope.row.updateUser }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDetail(scope.$index, scope.row)">详情
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size"
                @pagination="getList"/>
    <!--    新建OTA任务-->
    <el-drawer
      :with-header="true"
      title="请选择要升级的设备信息和升级包"
      :before-close="handleClose"
      :visible.sync="otaDialogVisible"
      direction="rtl"
      ref="drawer"
      :destroy-on-close="true"
      custom-class="demo-drawer"
      :size="drawerSize"
    >
      <div class="drawer-content">
        <el-form :model="taskForm" style="flex: 1" size="small">
          <el-form-item label="厂商" :label-width="formLabelWidth">
            <el-select @focus="getFactoryName" v-model="taskForm.factoryName" placeholder="请选择厂商名称" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in tempFactoryName"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型" :label-width="formLabelWidth">
            <el-select v-model="taskForm.deviceType" placeholder="请选择设备类型" style="width: 80%" class="filter-item">
              <el-option
                v-for="item in taskDeviceType"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号" :label-width="formLabelWidth">
            <el-select v-model="taskForm.productModel" @focus="getProduct" placeholder="请选择产品型号" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in taskProductModel"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="硬件版本" :label-width="formLabelWidth">
            <el-select v-model="taskForm.hardVersion" placeholder="请选择硬件版本" style="width: 80%" class="filter-item">
              <el-option
                v-for="item in taskHardVersion"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="软件版本" :label-width="formLabelWidth">
            <el-select v-model="taskForm.softVersion" placeholder="请选择软件版本" style="width: 80%" class="filter-item">
              <el-option
                v-for="item in taskSoftVersion"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: center">
            <span class="ota-task-title">主设备信息选择</span>
          </el-form-item>
          <el-form-item label="主设备厂商名称" :label-width="formLabelWidth">
            <el-select v-model="taskForm.mainFactoryName" placeholder="请选择主设备厂商名称" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in taskMainFactory"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主设备类型" :label-width="formLabelWidth">
            <el-select v-model="taskForm.mainDeviceType" placeholder="请选择主设备类型" style="width: 80%" class="filter-item">
              <el-option
                v-for="item in taskMainDeviceType"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主设备产品型号" :label-width="formLabelWidth">
            <el-select v-model="taskForm.mainProductModel" placeholder="请选择主设备产品型号" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in taskMainProductType"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主设备硬件版本" :label-width="formLabelWidth">
            <el-select v-model="taskForm.mainHardVersion" placeholder="请选择主设备硬件版本" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in taskMainHard"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主设备编码" :label-width="formLabelWidth">
            <el-select v-model="taskForm.mainDeviceNames" placeholder="请选择主设备编码" style="width: 80%" class="filter-item">
              <el-option
                v-for="item in taskMainDeviceNames"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div class="drawer-footer">
          <div style="text-align: right;padding-right: 8px">
            <el-button style="width: 50%" @click="cancelOta" size="small">取 消</el-button>
          </div>
          <div style="text-align: left;padding-left: 8px">
            <el-button style="width: 50%" type="primary" size="small" @click="$refs.drawer.closeDrawer()"
                       :loading="otaLoading">{{ otaLoading ? '提交中 ...' : '确 定' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
    <!--    查看任务详情-->
    <el-drawer
      :with-header="true"
      title="设备信息和升级包"
      :visible.sync="taskDetailVisible"
      direction="rtl"
      ref="drawer"
      :destroyOnClose="true"
      custom-class="demo-drawer"
      :size="drawerSize"
    >
      <div class="drawer-content">
        <el-form :model="detailForm" style="flex: 1" size="small">
          <el-form-item label="厂商" :label-width="formLabelWidth">
            <el-input v-model="detailForm.factoryName" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备类型" :label-width="formLabelWidth">
            <el-select v-model="detailForm.deviceType" :disabled="detailDisabled"
                       style="width: 80%"
                       class="filter-item"
            >
              <el-option
                v-for="item in deviceType"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号" :label-width="formLabelWidth">
            <el-input v-model="detailForm.productModel" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="硬件版本" :label-width="formLabelWidth">
            <el-input v-model="detailForm.hardVersion" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="软件版本" :label-width="formLabelWidth">
            <el-input v-model="detailForm.upSoftVersion" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <span class="ota-task-title">主设备信息</span>
          </el-form-item>
          <el-form-item label="主设备厂商" :label-width="formLabelWidth">
            <el-input v-model="detailForm.mainFactoryName" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="主设备类型" :label-width="formLabelWidth">
            <el-select v-model="detailForm.mainDeviceType" :disabled="detailDisabled" style="width: 80%"
                       class="filter-item">
              <el-option
                v-for="item in deviceType"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主设备产品型号" :label-width="formLabelWidth">
            <el-input v-model="detailForm.mainProductModel" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="主设备硬件版本" :label-width="formLabelWidth">
            <el-input v-model="detailForm.mainHardVersion" :disabled="detailDisabled"
                      style="width: 80%"
                      class="filter-item"
            ></el-input>

          </el-form-item>
          <el-form-item label="主设备编码" :label-width="formLabelWidth">
            <el-link type="success" @click="handleDetailTable">已选择{{ detailForm.mainDeviceCount }}个主设备，查看升级详情...
            </el-link>
          </el-form-item>

        </el-form>
        <div class="drawer-footer">
          <div style="text-align: right;padding-right: 8px">
            <el-button style="width: 50%" @click="cancelDetail()" size="small">关 闭</el-button>
          </div>
          <div style="text-align: left;padding-left: 8px">
            <el-button style="width: 50%" type="primary" size="small" v-if="canOperate">
              {{ canOperateText }}
            </el-button>
          </div>
        </div>
      </div>
      <!--      嵌套drawer-->

      <el-drawer
        :title="subDrawerTitle"
        :visible.sync="subDetailVisible"
        direction="rtl"
        :append-to-body="true"
        ref="subDrawer"
        :before-close="handleSubClose"
        :size="subDrawerSize"
      >

        <el-form :inline="true" size="small" class="detail-form">
          <el-form-item label="主设备编码">
            <el-select v-model="detailQuery.mainDeviceName" placeholder="请选择主设备编码">
              <el-option
                v-for="item in mainDeviceName"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="从设备编码">
            <el-input v-model="detailQuery.subDeviceName" placeholder="从设备编码" style="width: 200px"
                      class="filter-item"></el-input>

          </el-form-item>
          <el-form-item label="升级状态">
            <el-select v-model="detailQuery.otaStatus" placeholder="请选择升级状态" style="width: 200px" class="filter-item">
              <el-option
                v-for="item in otaStatus"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary" @click="detailSearch" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" @click="reDetailSearch" icon="el-icon-refresh-left" size="small">重置查询</el-button>
          <el-button type="primary" @click="handleExcel" icon="el-icon-plus" size="small">导出表格</el-button>

        </el-form>
        <el-table
          v-loading="detailLoading"
          :data="detailData"
          element-loading-text="加载中..."
          border
          fit
          highlight-current-row
          class="detail-table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>

          <el-table-column label="从设备编号" align="center">
            <template slot-scope="scope">
              {{ scope.row.subDeviceName }}
            </template>
          </el-table-column>
          <el-table-column label="主设备编号" align="center">
            <template slot-scope="scope">
              {{ scope.row.mainDeviceName }}
            </template>
          </el-table-column>
          <el-table-column label="升级状态" align="center" :formatter="renderOtaStatus">
          </el-table-column>

          <el-table-column label="下载进度" align="center" :formatter="renderProgress">
          </el-table-column>
          <el-table-column label="更新结束时间" align="center" :formatter="renderOtaEndTime">
          </el-table-column>
          <el-table-column align="center" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleItemDetail(scope.$index, scope.row)">详情
              </el-button>

            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="detailTotal>0" :total="detailTotal" :page.sync="detailQuery.current"
                    :limit.sync="detailQuery.size"
                    @pagination="detailSearch"/>

        <!--        详情，第三层drawer-->
        <el-drawer
          :title="itemDrawerTitle"
          :visible.sync="itemDetailVisible"
          direction="rtl"
          :append-to-body="true"
          ref="itemDrawer"
          :before-close="handleSubClose"
          :size="drawerSize"
        >
          <div class="drawer-content">
            <el-form :model="itemForm" style="flex: 1" size="small">

              <el-form-item label="厂商" :label-width="formLabelWidth">
                <el-input v-model="itemForm.factoryName" :disabled="itemDetailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="设备类型" :label-width="formLabelWidth">
                <el-input v-model="itemForm.deviceType" :disabled="detailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="产品型号" :label-width="formLabelWidth">
                <el-input v-model="itemForm.productModel" :disabled="detailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="硬件版本" :label-width="formLabelWidth">
                <el-input v-model="itemForm.hardVersion" :disabled="detailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="软件版本" :label-width="formLabelWidth">
                <el-input v-model="itemForm.softVersion" :disabled="detailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>
              <el-form-item label="主设备编码" :label-width="formLabelWidth">
                <el-input v-model="itemForm.mainDeviceName" :disabled="detailDisabled"
                          style="width: 80%"
                          class="filter-item"
                ></el-input>
              </el-form-item>

            </el-form>
            <div class="drawer-footer">
              <div style="text-align: center">
                <el-button style="width: 40%" @click="cancelItem()" size="small" type="primary">退 出</el-button>
              </div>

            </div>
          </div>
        </el-drawer>
      </el-drawer>


    </el-drawer>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {getOtaDetail, getFactoryList, getOtaList, getSubDetailList} from "@/api/table";
import {
  createDevice,
  massSave,
  getFactoryNameList,
  queryProductModelList,
  queryDeviceStatus,
  cmdPage, queryHardVersion, otaSend, updateDevice, deleteDevice, downloadFile, exportExcel
} from "@/api/operation";
import {
  renderTaskStatus,
  renderTime,
  renderType,
  renderOtaStatus,
  renderProgress,
  renderTaskOperate,
  renderSubType
} from '@/utils'
import {global} from "@/common";
import {tempDeviceType} from "@/common/global";


export default {
  name: 'Ota',
  components: {Pagination},
  data() {
    return {
      //全局
      labelPosition: "right",
      formLabelWidth: '110px',
      drawerSize: '50%',
      tempFactoryName: [],
      //list
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        current: 1,
        size: 20,
        deviceType: undefined,
        factoryName: undefined,
        hardVersion: undefined,
        productModel: undefined,
        deviceCode: undefined
      },
      listFactoryName: [
        {
          label: '全部',
          value: undefined
        }
      ],
      listProductModel: [
        {
          label: '全部',
          value: undefined
        }
      ],
      listHardVersion: [
        {
          label: '全部',
          value: undefined
        }
      ],
      hard: [],
      renderType: renderType,
      renderOtaStatus: renderOtaStatus,
      renderProgress: renderProgress,
      //OTA任务
      otaLoading: false, //新建OTA任务
      otaDialogVisible: false,
      taskMainDeviceNames: [], //主设备
      taskProductModel: [],
      taskDeviceType: global.tempDeviceType,
      taskHardVersion: [],
      taskSoftVersion: [],
      taskMainFactory: [],
      taskMainDeviceType: [],
      taskMainProductType: [],
      taskMainHard: [],
      taskForm: {
        deviceType: "",
        factoryName: "",
        productModel: "",
        hardVersion: "",
        softVersion: undefined,
        mainDeviceNames: '',
        mainHardVersion: '',
        mainProductModel: '',
        mainDeviceType: '',
        mainFactoryName: '',
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      },
      //第一层drawer表单
      detailDisabled: true,
      canOperate: false,
      taskDetailVisible: false,
      mainDeviceName: [],
      canOperateText: '中止',
      deviceType: global.deviceType,
      detailForm: {
        deviceType: '',
        factoryName: "",
        productModel: "",
        hardVersion: "",
        upSoftVersion: undefined,
        mainDeviceNames: '',
        mainHardVersion: '',
        mainProductModel: '',
        mainDeviceType: '',
        mainFactoryName: '',
        mainDeviceCount: '--',
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      },
      //第二层
      detailData: null,
      subDetailVisible: false,
      detailTotal: 0,
      detailLoading: false,
      subDrawerSize: '86%',
      subDrawerTitle: '已升级设备详情',
      otaStatus: global.otaStatus,
      detailQuery: {
        current: 1,
        size: 20,
        mainDeviceName: undefined,
        subDeviceName: undefined,
        otaStatus: undefined,
        taskId: undefined
      },
      //第三层
      itemDetailDisabled: true,
      itemDrawerTitle: '从设备详情',
      itemDetailVisible: false,
      itemForm: {
        deviceType: undefined,
        factoryName: undefined,
        productModel: undefined,
        hardVersion: undefined,
        softVersion: undefined,
        mainDeviceName: undefined,
      },
      updateType: global.updateType,
      rules: {
        deviceName: [{required: true, message: '请输入设备编号', trigger: 'blur'}],
        deviceType: [{required: true, message: '请选择设备类型', trigger: 'blur'}],
        factoryName: [{required: true, message: '请选择厂商名称', trigger: 'blur'}],
        productModel: [{required: true, message: '请选择产品型号', trigger: 'blur'}],
        hardVersion: [{required: true, message: '请选择硬件版本', trigger: 'blur'}],
        mainDeviceName: [{required: true, message: '请输入主设备编码', trigger: 'blur'}],
        excelFile: [{required: true, message: '请选择上传文件', trigger: 'blur'}],
      },
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      if (this.listQuery.productModel === undefined){
        this.listQuery.hardVersion = undefined
      }
      getOtaList(this.listQuery).then(response => {
        if (response.data.data !== null) {
          const data = response.data.data
          this.list = data.records
          this.total = data.total
        }
      })
      this.listLoading = false
    },
    //获取厂商
    getFactoryName() {
      getFactoryNameList().then(res => {
        if (res.data.success) {
          if (res.data.data.length !== 0) {
            var data = res.data.data
            if (this.otaDialogVisible) {
              this.tempFactoryName = []
              data.forEach((item, index) => {
                this.tempFactoryName.push({value: item, label: item})
              })
            } else {
              this.listFactoryName = [
                {
                  label: '全部',
                  value: undefined
                }
              ]
              data.forEach((item, index) => {
                this.listFactoryName.push({value: item, label: item})
              })
            }

          } else {
            console.error(res.data.message)
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })

    },
    //获取产品型号硬件版本
    queryProduct(product){
      let data = []
      queryProductModelList(product).then(res => {
        if (res.data.data.length !== 0) {
          if (res.data.data.infoList.length !== 0) {
             data = res.data.data.infoList
          }
        }
      })
      return data
    },
    //下拉获取产品型号productModel 和硬件版本
    getProduct() {
      this.listProductModel = [
        {
          label: '全部',
          value: undefined
        }
      ]
      if (this.listQuery.factoryName !== undefined && this.listQuery.deviceType !== undefined) {
        const product = {
          factoryName: this.listQuery.factoryName,
          productType: this.listQuery.deviceType
        }
        let productData = this.queryProduct(product)
        productData.forEach((item, index) => {
          if (item.hardVersions.length !== 0) {
            this.hard.push(item.hardVersions)
          }
          this.listProductModel.push({value: item.productModel, label: item.productModel})
        })

      }else {
        this.$notify({
          title: '警告',
          message: '请先选择设备类型和厂商！',
          type: 'warning',
          duration: 2000
        });
      }
    },
    getFormProduct(){
      if (this.taskForm.factoryName !== undefined && this.taskForm.deviceType !== undefined) {

      }
    },
    getHard(){
      this.listHardVersion.length = 0
      if (this.listQuery.productModel !== undefined) {
        this.listHardVersion = [
          {
            label: '全部',
            value: undefined
          }
        ]
        let modelIndex = ''
        this.listProductModel.forEach((item, index) => {
          if (this.listQuery.productModel === item.value) {
            modelIndex = index - 1
          }
        })
        if (this.hard.length !== 0 && this.hard[modelIndex].length !== 0) {
          this.hard[modelIndex].forEach((item, index) => {
            this.listHardVersion.push({value: item, label: item})
          })
        }
      }else {
        console.log(this.listHardVersion)
        this.listHardVersion = [
          {
            label: '全部',
            value: undefined
          }
        ]
        this.hard = []
      }
    },
    //第一个drawer表单详情
    handleDetail(index, row) {
      this.taskDetailVisible = true
      this.detailQuery.taskId = row.taskId
      this.detailForm = Object.assign({}, row)
      console.log(this.detailForm)
      switch (renderTaskStatus(this.detailForm.taskStatus)) {
        case '3':
          this.canOperate = true
          this.canOperateText = '中止'
          break
        case '4':
          this.canOperate = true
          this.canOperateText = '恢复'
          break
        default:
          this.canOperate = false
      }
    },
    //第二个drawer
    handleDetailTable() {
      this.subDetailVisible = true
      this.detailLoading = true
      this.detailSearch()
    },
    // OTA索索第二层
    detailSearch() {
      getOtaDetail(this.detailQuery).then(response => {
        if (response.data.data !== null) {
          if (response.data.data.records.length !== 0){
            this.detailData = response.data.data.records
            this.detailTotal = response.data.data.total
          }
        } else {
          this.detailLoading = false
          this.$message({
            showClose: true,
            message: '获取失败!',
            type: 'error'
          })
        }
      })
      this.detailLoading = false
    },

    handleSubClose(done) {
      done()
    },

    cancelDetail() {
      this.taskDetailVisible = false
    },

    //新建OTA任务
    handleOtaCreate() {
      this.otaDialogVisible = true

      // this.$nextTick(() => {
      //   this.$refs['mainDataForm'].clearValidate()
      // })
    },
    handleClose(done) {
      this.otaDialogVisible = false
    },
    cancelOta() {
      this.otaDialogVisible = false
    },
    //第三个drawer
    handleItemDetail() {
      this.itemDetailVisible = true
    },
    //关闭第三个drawer
    cancelItem() {
      this.itemDetailVisible = false
    },
//清除OTA 表单
    resetMainTemp() {
      this.taskForm.deviceType = ''
      this.taskForm.factoryName = ''
      this.taskForm.hardVersion = ''
      this.taskForm.softVersion = ''
      this.taskForm.productModel = ''
    },


    //渲染
    renderTaskStatus(row) {
      return renderTaskStatus(row.taskStatus)
    },
    renderBeginTime(row) {
      return renderTime(row.beginTime)
    },
    renderEndTime(row) {
      return renderTime(row.endTime)
    },
    renderCreateTime(row) {
      return renderTime(row.createTime)
    },
    renderUpdateTime(row) {
      return renderTime(row.updateTime)
    },
    renderOtaEndTime(row) {
      return renderTime(row.endTime)
    },

//重置搜索
    reSearch() {
      this.listQuery.factoryName = undefined
      this.listQuery.deviceType = undefined
      this.listQuery.productModel = undefined
      this.listQuery.hardVersion = undefined
      this.listQuery.taskId = undefined
      this.getList()
    },
    reDetailSearch() {

    },
    //Excel
    handleExcel() {
      const query = {taskId: this.detailQuery.taskId}
      exportExcel(query).then(res => {
        const blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
        const fileName = this.fileName
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })

    },
  }
}
</script>
<style scoped>

.drawer-content {
  display: flex;
  flex-direction: column;
  padding: 16px 40px 8px 40px;
  height: 100%;
}

.drawer-footer {
  display: flex;
}

.drawer-footer div {
  flex: 1;
}

.ota-task-title {
  padding: 16px;
  color: #409EFF;
}

.detail-form {
  padding: 20px;
}

.detail-table {
  margin: 1%;
  width: 98%;
}
</style>
