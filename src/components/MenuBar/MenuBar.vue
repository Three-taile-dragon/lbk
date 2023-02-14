<template>
  <el-menu
    active-text-color="#409EFF"
    text-color="#fff"
    class="el-menu"
    :collapse="collapsed"
  >
    <menuItem :menus="menus"></menuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import menuItem from "@/components/MenuBar/MenuItem.vue";
import useHomeStore from "@/stores/home/home";
const homeStore = useHomeStore();
const menus = homeStore.menus;
//从父类接收到的值
defineProps({
  collapsed: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
.el-menu {
  //   width: 200px;
  //   min-height: 400px;
  //   height: 100vh;
  background-color: $menuBg;
  border: none;
}
</style>
