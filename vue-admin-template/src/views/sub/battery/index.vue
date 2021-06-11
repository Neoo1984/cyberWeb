<template>
  <div class="content">
    <el-tabs  :tab-position="tabPosition">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Battery',
  created() {
  },
  data(){
    return{
      tabPosition:'left'
    }
  }
}

</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}
.el-tabs{
  height: 100%;
}
</style>
