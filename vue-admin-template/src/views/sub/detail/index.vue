<template>
  <div class="navbar">
    <el-container style="height: 100%">
      <el-aside style="width: 180px;height:100%;padding-top: 5px;">
        <el-scrollbar style="height: 100%">
          <el-menu
            :default-active="index"
            :collapse="isCollapse"
            @select="clickItem"
            router
          >
            <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
          </el-menu>

        </el-scrollbar>
      </el-aside>
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
import Maintance from '@/views/sub/maintenance'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem'

export default {
  name: 'Detail',
  components: { DiTest, DoTest, Info, Battery, Setting, Warning, AutoControl, Command, Maintance, SidebarItem },
  data() {
    return {
      tabPosition: 'left',
      tabName: '1',
      title: '返回设备列表',
      isCollapse: false,
      index: '/info/index',
      routes: this.$router.options.routes
    }
  },
  created() {
    sessionStorage.setItem('menu_state', '2')
    let menu = sessionStorage.getItem('sub_menu')
    this.index = menu !== null ? menu : '/info/index'
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {

    rememberPage() {
      sessionStorage.setItem('device_name', this.$route.query.deviceName)
      sessionStorage.setItem('device_id', this.$route.query.deviceId)
      if (sessionStorage.getItem('detail_tab')) {
        this.tabName = sessionStorage.getItem('detail_tab')
      }

    },
    handleClick(tab, event) {
      this.tabName = tab.name
      sessionStorage.removeItem('detail_tab')
      sessionStorage.setItem('detail_tab', tab.name)
    },
    clickItem(index) {
      this.index = index
      sessionStorage.setItem('sub_menu', index)
      console.log('====' + index)
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

.el-aside {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
}

.el-main {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 180px;
}


</style>
