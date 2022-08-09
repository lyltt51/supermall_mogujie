import { debounce } from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'
import { TOP_DISTANCE } from 'common/const.js'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh =  debounce(this.$refs.scroll.refresh,200)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isBackShow: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0,0,500)
        },
        listenerShowBackTop(position) {
            this.isBackShow = -position.y > TOP_DISTANCE ? true : false
        }
    },
}