<template>
  <el-row align="middle">
    <el-page-header class="pageHeader" :title="title" @back="goBack" content="设备详情"/>

    <el-container>
      <el-aside width="180px">
        <detail />
      </el-aside>
        <el-main >
          <router-view :key="key" />
        </el-main>
    </el-container>

  </el-row>

</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/layout/components/'
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import Detail from '@/views/sub/detail'

export default {
  name: 'SubLayout',
  components: {
    Detail,
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      title: '返回设备列表'
    }
  },
  mixins: [ResizeMixin],
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    goBack() {
      sessionStorage.setItem('menu_state', '1')
      sessionStorage.removeItem('sub_menu')
      let path = sessionStorage.getItem('path')
      this.$router.push({ path: path })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.main{

}

.pageHeader {
  justify-content: left;
  align-items: center;
  height: 50px;
  padding: 0 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}

</style>
