<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <!-- //轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐模块 -->
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'

import { getHomeMultidata } from 'network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff
  }
</style>