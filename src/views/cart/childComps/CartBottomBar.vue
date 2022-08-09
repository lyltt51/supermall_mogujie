<template>
  <div class="bottom-bar">
    <div class="check-content">
        <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
        <span>全选</span>
    </div>

    <div class="price">
        合计： {{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
        去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + (item.count * item.price)
            },0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if (this.cartList.length == 0) return false
            // return !(this.cartList.filter(item => !item.checked).length)
            return !this.cartList.find(item => !item.checked)
        },
        isSelected() {
          return this.cartList.find(item => item.checked)
        }
    },
    methods: {
        checkClick() {
            // if (this.isSelectAll) {
            //     this.cartList.forEach(item => item.checked = false)
            // } else {
            //     this.cartList.forEach(item => item.checked = true)
            // }
            this.isSelectAll ? this.cartList.forEach(item => item.checked = false) : this.cartList.forEach(item => item.checked = true)
        },
        calClick() {
          if (this.checkLength == 0) {
            this.$toast({
              message: '请先选择商品!'
            })
          } else {
            console.log(this.isSelected);
          }
        }
    },
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .check-button {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>