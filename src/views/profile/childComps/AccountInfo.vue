<template>
  <div class="account">
    <account-item class="account-i" :key="index" v-for="(item,index) in accounts" :account="item"/>
  </div>
</template>

<script>
import AccountItem from 'components/common/account/AccountItem.vue'

export default {
    name: 'AccountInfo',
    components: {
        AccountItem
    },
    data() {
        return {
            accounts: [
                {
                    price: '0.00',
                    number: '元',
                    info: '我的余额'
                },
                {
                    price: '0',
                    number: '个',
                    info: '我的优惠'
                },
                {
                    price: '1',
                    number: '分',
                    info: '我的积分'
                }
            ]
        }
    },
}
</script>

<style scoped>
  .account {
    display: flex;
  }

  .account-i {
    margin-right: 1px;
  }

  .account-i:last-child {
    margin-right: 0;
  }
</style>