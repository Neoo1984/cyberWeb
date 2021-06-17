<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-main>
        <div class="content">
          <div v-for="item in list" class="item-div">
            <div>
              {{ item }}
            </div>

          </div>

        </div>

      </el-main>
      <el-aside>
        <comm :device-type="deviceType"
              :device-code="deviceCode"
              :factory-name="factoryName"
              :product-num="productNum"
              :hw-version="hwVersion"
        ></comm>
      </el-aside>


    </el-container>
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
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
  }
}
</script>

<style scoped>
.content {
  display: grid;
  grid-template: 100px 100px 100px / 100px 100px 100px;
  grid-gap: 10px 10px;
  justify-items: center;
  align-items: center;
}

.item-div {
  background-color: #99a9bf;
}


</style>
