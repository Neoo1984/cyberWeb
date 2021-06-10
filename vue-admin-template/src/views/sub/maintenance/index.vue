<template>
  <div>
    <h1>maintenance</h1>
    <img :src="renderBattery" alt="加载失败">
  </div>
</template>

<script>
export default {
  name: 'maintenance',
  data(){
    return {
      icon_battery:''
    }
  },
  created() {
    this.renderBattery(100)

  },
  methods:{
    renderBattery(val){
      switch (val) {
        case 100:
          return require('@/icons/svg/battery100.svg')
      }
    }
  }
}
</script>

<style scoped>

</style>
