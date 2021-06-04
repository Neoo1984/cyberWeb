<template>
  <div class="navbar">
    <el-page-header class="pageHeader" @back="goBack" content="详情页面"/>

    <el-container class="content">
      <el-aside style="width: auto">
        <el-tabs style="height: 100%;padding-left: 18px" class="tabs" :tab-position="tabPosition" :value="tabName"
                 @tab-click="handleClick"
        >
          <el-tab-pane label="设备维护" name="1">

          </el-tab-pane>
          <el-tab-pane label="DI测试" name="2">
          </el-tab-pane>
          <el-tab-pane label="DO测试" name="3">

          </el-tab-pane>
          <el-tab-pane label="自动控制" name="4">
          </el-tab-pane>
          <el-tab-pane label="换电柜设置" name="5">
          </el-tab-pane>

        </el-tabs>
      </el-aside>

      <el-main>
        <DiTest v-if="tabName === '2'"/>
        <DoTest v-else-if="tabName === '3'"/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import DoTest from '@/views/sub/doTest'
import DiTest from '@/views/sub/diTest'

export default {
  name: 'Detail',
  components: { DiTest, DoTest },
  data() {
    return {
      tabPosition: 'left',
      tabName: '1'
    }
  },
  created() {

    console.log(this.$route.query)
  },
  methods: {
    goBack() {
      console.log('go back')
      let path = sessionStorage.getItem('path')
      this.$router.push({ path: path })
    },
    handleClick(tab, event) {

      this.tabName = tab.name
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

.el-menu-vertical-demo {
  height: 100%;

}

.tabs {
  flex: 1;
}

el-tabs {
  height: 100%;
}

</style>
