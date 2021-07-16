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
          <el-checkbox-group v-model="checkList" @change="handleCheckedBox">
            <el-checkbox :label="item" :key="item" class="check-list"></el-checkbox>
          </el-checkbox-group>

        </div>

      </div>

    </div>
  </div>
</template>

<script>



import {refreshDevice} from "@/api/operation";

export default {
  name: 'FactoryVersion',
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      itemWidth: 0,
      formInline: {},
      deviceInfo:JSON.parse(sessionStorage.getItem('infoQuery')),
      checkList: [], //选中的list
    }
  },
  created() {
    this.itemWidth = 100 / (Math.ceil(this.list.length / 4))

  },
  methods: {
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
    handleRefresh() {
      refreshDevice(this.deviceInfo.deviceName).then((res) => {
        if (res.data !== null){
          if (res.data.data.messageId !== null){
            this.messageId = res.data.data.messageId
          }
        }else {
          this.$message({
            showClose: true,
            message: '获取失败',
            type: 'error'
          })
        }

      })
    },
  }

}
</script>

<style scoped>

</style>
