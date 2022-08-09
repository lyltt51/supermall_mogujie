<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item
          :key="index"
          v-for="(item,index) in cartList"
          :itemInfo="item"
        />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated() {
        this.$refs.scroll.refresh()
    },
}
</script>

<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 40px);
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>