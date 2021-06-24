<template>

  <div style="display: flex;flex-direction: column">

    <el-form :inline="true" size="small">
      <el-form-item label="数据采集时间">
        <el-input style="width: 300px"
                  class="filter-item"
                  disabled
        ></el-input>
      </el-form-item>

      <el-button type="primary" @click="handleRefresh" icon="el-icon-refresh" size="small">刷新</el-button>
      <el-button type="primary" @click="handleOta" icon="el-icon-plus" size="small">电池包OTA</el-button>
    </el-form>


  <div class="main">

    <div class="right" @click="drawer = true" type="primary">
      查看设备信息
    </div>

    <div class="content">
      <div v-for="item in list" class="item-div" :style="`width:${itemWidth}%;`">
        <div>
          {{ item }}
        </div>

      </div>

    </div>

    <el-drawer
      title=""
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <comm :device-type="deviceType"
            :device-code="deviceCode"
            :factory-name="factoryName"
            :product-num="productNum"
            :hw-version="hwVersion"
      ></comm>
    </el-drawer>


  </div>
  </div>
</template>

<script>

import Comm from '@/views/sub/battery/comm'

export default {
  name: 'BatteryCode',
  components: { Comm },
  data() {
    return {
      deviceType: '换电柜荣天',
      deviceCode: '0000000000011138',
      factoryName: '荣天',
      productNum: '00',
      hwVersion: 'v0.0.1',
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      drawer: false,
      direction: 'rtl',
      itemWidth: 0,
      formInline: {}
    }
  },
  created() {
    this.itemWidth = 100 / (Math.ceil(this.list.length / 4))

  },
  methods: {
    handleClose(done) {
      done()
    },
    handleRefresh() {

    },
    handleOta() {

    }
  }

}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column-reverse;
  justify-items: center;
  align-items: center;
  height: 730px;
  width: 100%;
  flex-wrap: wrap;
  margin-right: 15%;
  margin-left: 10%;
  margin-top: 20px;

}


.item-div {
  height: 180px;
  width: 33%;
  border: #333 solid 1px;
  margin-bottom: 1px;
}

.main {
  display: flex;
  flex-direction: row;
}

.right {
  position: fixed;
  background-color: #fff;
  color: #20a0ff;
  width: 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  right: 20px;
  z-index: 5;
  line-height: 18px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  margin-top: 17%;
  border-bottom: #20a0ff solid 1px;
  border-top: #20a0ff solid 1px;
  border-left: #20a0ff solid 1px;
  padding: 7px;
}

</style>
