<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
     <!-- tab栏选择 -->
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"
        ></tab-control>
    <!-- 滚动插件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
      <!-- //轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐模块 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 热门模块 -->
      <home-feature></home-feature>
      <!-- tab栏选择 -->
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isBackShow"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'
import HomeFeature from './childComps/HomeFeature.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home.js'

import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY =  this.$refs.scroll.getScrollY()
  },
  methods: {
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      if (this.$refs.tabControl1 !== undefined) {
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      }
    },
    contentScroll(position) {
      this.listenerShowBackTop(position)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /*
     * 网络请求有关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}
</script>

<style scoped>
  .home-container {
    /* padding-top: 44px; */
    height: 100vh;
  }

  .home-nav {
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
    background-color: var(--color-tint);
    color: #fff;
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
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