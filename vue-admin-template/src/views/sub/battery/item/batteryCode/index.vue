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
    </el-form>

    <div class="box-main">

      <div class="box-content">
        <div v-for="item in list" :key="item" class="box-item" :style="`width:${itemWidth}%;`">
            <span class="box-num">
              {{item}}
            </span>

        </div>

      </div>


    </div>
  </div>
</template>

<script>



export default {
  name: 'BatteryCode',
  data() {
    return {
      deviceType: '换电柜荣天',
      deviceCode: '0000000000011138',
      factoryName: '荣天',
      productNum: '00',
      hwVersion: 'v0.0.1',
      list: [1, 2, 3, 4, 5, 6, 7, 8],
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

</style>
