<script setup>
import { getCategory } from "@/apis/testAPI";
getCategory();
</script>

<template>
  <!-- 路由出口组件 -->
  <router-view></router-view>
</template>

<style scoped></style>
