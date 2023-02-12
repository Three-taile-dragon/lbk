<template>
  <div class="logo">
    <img src="@/assets/logo.svg" alt="" />
    <h2 v-show="!collapsed" class="title">中医药平台</h2>
  </div>
</template>

<script setup lang="ts">
//从父类接收到的值
defineProps({
  collapsed: {
    type: Boolean,
  },
});
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  // justify-content: center;
  height: 64px;
  overflow: hidden;
  padding-left: 14px;
  white-space: nowrap;
  img {
    height: 48px;
    margin-right: 8px;
  }
  .title {
    font-size: 16px;
    color: white;
    // margin-bottom: 10px;
  }
}
</style>
