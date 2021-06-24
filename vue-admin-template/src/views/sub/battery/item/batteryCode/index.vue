<template>


  <div class="main">

      <div class="right" @click="drawer = true" type="primary" >
        查看设备信息
      </div>
    <div class="content">
      <div v-for="item in list" class="item-div">
        <div>
          {{ item }}
        </div>

      </div>

    </div>


    <!--        <el-scrollbar >-->
    <!--          <comm :device-type="deviceType"-->
    <!--                :device-code="deviceCode"-->
    <!--                :factory-name="factoryName"-->
    <!--                :product-num="productNum"-->
    <!--                :hw-version="hwVersion"-->
    <!--          ></comm>-->
    <!--        </el-scrollbar>-->

    <!--    <el-drawer-->
    <!--      title="我是标题"-->
    <!--      :visible.sync="drawer"-->
    <!--      :direction="direction"-->
    <!--      :before-close="handleClose"-->
    <!--    >-->
    <!--      <span>我来啦!</span>-->
    <!--    </el-drawer>-->


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
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      drawer: false,
      direction: 'rtl',
      itemClass : ''
    }
  },
  created() {
    this.itemClass = ``
  },
  methods(){

  }

}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column-reverse;
  justify-items: center;
  align-items: center;
  height: 670px;
  width: 100%;
  flex-wrap: wrap;
  padding: 30px;
  margin-right: 15%;
  margin-left: 15%;

}


.item-div {
  height: 150px;
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
