<template>
  <template v-for="model in menus" :key="model.id.toString()">
    <el-sub-menu
      v-if="model?.children && model?.children?.length > 1"
      :index="model.id"
      :disable="model.status"
    >
      <template #title>
        <el-icon>
          <component :is="model?.icon" />
        </el-icon>
        <span>{{ model.title }}</span>
      </template>
      <menuItem :menus="model.children"></menuItem>
      <menuItem></menuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="model.id" :disable="model.status">
      <el-icon>
        <component :is="model?.icon" />
      </el-icon>
      <span>{{ model.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps(["menus"]);
</script>

<style scoped></style>
