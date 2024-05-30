<script>
import { useUserStore } from './stores/userStore';
import { useCartStore } from './stores/cartStore';
export default {
  beforeCreate() {
    const userStore = useUserStore()
    // 是否登录 同步购物车信息
    if (userStore.isLogin) {
      const cartStore = useCartStore()
      cartStore.updateNewList()
    }
  }
}
</script>

<template>
  <!-- 路由出口组件 -->
  <router-view></router-view>
</template>

<style></style>
