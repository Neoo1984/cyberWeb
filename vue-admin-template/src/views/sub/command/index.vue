<template>
  <div>
    <div class="content">
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
    </div>
    <div class="content">
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
    </div>
    <div class="content">
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
      <img alt="90%" :src="imgUrl" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Command',
  data() {
    return {
      imgUrl:require('@/icons/svg/battery90.svg')
    }
  },
  created() {
  }
}

</script>

<style lang="scss" scoped>

</style>
