<template>
  <div>
    <h1>Hello World!</h1>
    <h4>{{ userStore.$state.user }}</h4>
    <h4>{{ userStore.$state.tokenList }}</h4>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/stores/user/login";

// import { ref, reactive } from "vue";
const userStore = useUserStore();
</script>

<style scoped></style>
