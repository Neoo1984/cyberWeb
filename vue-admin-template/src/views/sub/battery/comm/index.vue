<template>
    <el-form :inline="true" class="demo-form-inline" size="medium">
      <el-form-item label="设备编码">
        <el-input v-model="deviceCode" disabled></el-input>
      </el-form-item>

      <el-form-item label="设备类型">
        <el-input  v-model="deviceType" disabled/>
      </el-form-item>

      <el-form-item label="厂家名称">
        <el-input v-model="factoryName" disabled/>
      </el-form-item>

      <el-form-item label="产品型号">
        <el-input v-model="productNum" disabled/>
      </el-form-item>

      <el-form-item label="硬件版本">
        <el-input v-model="hwVersion" disabled/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round>电池OTA</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'Comm',
  props:{
    deviceType : String,
    deviceCode : String,
    factoryName : String,
    productNum : String,
    hwVersion : String
  }
}
</script>

<style scoped>
.demo-form-inline{
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

</style>
