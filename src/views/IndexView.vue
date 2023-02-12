<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <LogoBar :collapsed="collapsed" />
        <MenuBar :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <!-- 侧边栏按钮 展开折叠 -->
            <el-icon
              style="font-size: 26px"
              @click="() => (collapsed = !collapsed)"
            >
              <component :is="collapsed ? Expand : Fold" />
            </el-icon>
          </el-row>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import LogoBar from "@/components/LogoBar/LogoBar.vue";
import MenuBar from "@/components/MenuBar/MenuBar.vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { isMobile } from "@/utils/isMobile";
const collapsed = ref<boolean>(false);

//侧边栏动态收纳  手机端和PC端不同
const autoWidth = computed(() => {
  if (collapsed.value && isMobile()) {
    return "0px";
  } else if (collapsed.value) {
    return "64px";
  } else {
    return "200px";
  }
});

// console.log(isMobile());
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100%;
  .el-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    line-height: 60px;
  }
  .el-aside {
    background-color: $menuBg;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
    // width: auto;
    width: v-bind("autoWidth");
    height: 100%;
    overflow: hidden;
  }
  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px;
  }
}
</style>
