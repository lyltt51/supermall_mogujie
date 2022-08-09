<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 内容 -->
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <!-- 右边 -->
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick"/>
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import TabMenu from './childComps/TabMenu.vue'
import TabContentCategory from './childComps/TabContentCategory.vue'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category.js'
import {POP, SELL, NEW} from "common/const";
import {tabControlMixin} from "@/common/mixin";

export default {
  name: 'Category',
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    }
  },
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList
  },
  created() {
    this._getCategory()

    // 2.监听图片加载完成
    this.$bus.$on('imgLoad', () => {
      this.$refs.scroll.refresh()
    })
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.data.category.list

        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
          this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData);
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res.data
        this.categoryData = {...this.categoryData}
      })
    },
    selectItem(index) {
      this._getSubcategories(index)
    }
  },
}
</script>

<style scoped>
  .category {
    height: 100vh;
    background-color: #fff;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: none;
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>