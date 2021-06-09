<template>
  <div class="navbar">
    <el-page-header class="pageHeader" :title="title" @back="goBack" content="设备详情"/>

    <el-container class="content">
      <el-aside style="width: auto">
        <el-tabs style="height: 100%;padding-left: 18px" class="tabs" :tab-position="tabPosition" :value="tabName"
                 @tab-click="handleClick"
        >
          <el-tab-pane label="设备基本信息" name="1"/>
          <el-tab-pane label="设备指令" name="2"/>
          <el-tab-pane label="设备维护" name="3"/>
          <el-tab-pane label="电池包数据" name="4"/>
          <el-tab-pane label="DO测试" name="5"/>
          <el-tab-pane label="DI测试" name="6"/>
          <el-tab-pane label="自动控制" name="7"/>
          <el-tab-pane label="换电柜设置" name="8"/>
          <el-tab-pane label="换电柜告警" name="9"/>

        </el-tabs>
      </el-aside>

      <el-main>
        <Info v-if="tabName === '1'"/>
        <Command v-else-if="tabName === '2'"/>
        <Maintance v-else-if="tabName === '3'"/>
        <Battery v-else-if="tabName === '4'"/>
        <DoTest v-else-if="tabName === '5'"/>
        <DiTest v-else-if="tabName === '6'"/>
        <AutoControl v-else-if="tabName === '7'"/>
        <Setting v-else-if="tabName === '8'"/>
        <Warning v-else/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import DoTest from '@/views/sub/doTest'
import DiTest from '@/views/sub/diTest'
import Info from '@/views/sub/info'
import Battery from '@/views/sub/battery'
import Setting from '@/views/sub/setting'
import Warning from '@/views/sub/warning'
import AutoControl from '@/views/sub/autoControl'
import Command from '@/views/sub/command'
import Maintance from '@/views/sub/maintance'

export default {
  name: 'Detail',
  components: { DiTest, DoTest,Info,Battery,Setting,Warning,AutoControl ,Command,Maintance},
  data() {
    return {
      tabPosition: 'left',
      tabName: '1',
      title: '返回设备列表'
    }
  },
  created() {
    this.rememberPage()
  },
  methods: {
    goBack() {
      let path = sessionStorage.getItem('path')
      this.$router.push({ path: path })
    },
    rememberPage(){
      sessionStorage.setItem('device_name',this.$route.query.deviceName)
      sessionStorage.setItem('device_id',this.$route.query.deviceId)
      if (sessionStorage.getItem('detail_tab')){
        this.tabName = sessionStorage.getItem('detail_tab')
      }

    },
    handleClick(tab, event) {
      this.tabName = tab.name
      sessionStorage.removeItem('detail_tab')
      sessionStorage.setItem('detail_tab',tab.name)
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  display: flex;
  flex-direction: column;
  height: 100%;

}
.pageHeader {
  justify-content: left;
  align-items: center;
  height: 50px;
  padding: 0 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}

el-tabs {
  height: 100%;
}

</style>
