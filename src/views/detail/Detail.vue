<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comments" :comment-info="commentInfo"/>
        <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isBackShow"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

import {mapActions} from 'vuex'

export default {
    name: 'HomeDetail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0
        }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    created() {
        this.iid = this.$route.params.iid

        getDetail(this.iid).then(res => {
            console.log(res);
            const data = res.data.result
            this.topImages = data.itemInfo.topImages

            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            this.shop = new Shop(data.shopInfo)

            this.detailInfo = data.detailInfo

            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            if (data.rate.cRate !== 0) {
              this.commentInfo = data.rate.list[0]
            }
        })

        getRecommend().then(res => {
          this.recommends = res.data.data.list
        })

        this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)

          console.log(this.themeTopYs);
        },100)
    },
    mounted() {
      
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
          this.$refs.scroll.refresh()
          this.getThemeTopY()
        },
        titleClick(index) {
          console.log(index);
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
        },
        contentScroll(position) {
          const positionY = -position.y

          let length = this.themeTopYs.length
          for (let i = 0; i < length-1; i++) {
            if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }
          this.listenerShowBackTop(position)
        },
        addToCart() {
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          product.iid = this.iid

          // this.$store.dispatch('addCart',product)
          this.addCart(product).then(res => {
            this.$toast({
              message: res,
              duration: 1500
            })
            console.log(res);
          })
        }
    },
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>