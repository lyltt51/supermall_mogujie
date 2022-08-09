<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg">
        </div>
        <div class="title" slot="center">
            <div class="title-item" :key="index" v-for="(item,index) in titles" :class="{active: currentIndex === index}" @click="titleClick(index)">
                {{item}}
            </div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        backClick() {
            this.$router.back()
        },
        titleClick(index) {
            this.currentIndex = index
            this.$emit('titleClick',this.currentIndex)
        }
    },
}
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 13px;
    }

    .title-item {
        flex: 1
    }

    .active {
        color: var(--color-tint)
    }

    .back img{
        margin-top: 12px;
    }
</style>