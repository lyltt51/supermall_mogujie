<template>
  <div class="profile-container">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <!-- 用户信息 -->
    <user-info/>
    <!-- 账户信息 -->
    <account-info/>
    <!-- 基本信息列表1 -->
    <normal-list :list-data="orderList"/>
    <!-- 基本信息列表2 -->
    <normal-list :list-data="serviceList"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import UserInfo from './childComps/UserInfo.vue'
import AccountInfo from './childComps/AccountInfo.vue'
import NormalList from './childComps/NormalListView.vue'

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalList
  },
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  },
}
</script>

<style scoped>
  .profile-container {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>