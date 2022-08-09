<template>
  <div class="cart-container">
    <!-- 导航 -->
    <nav-bar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list/>
    <!-- 底部 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.cart-container {
  height: 100vh;
}

.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>