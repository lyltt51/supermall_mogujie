<template>
  <div class="account-item">
    <div class="number">
        <span class="balance">{{account.price}}</span>{{account.number}}
    </div>
    <div class="account-info">{{account.info}}</div>
  </div>
</template>

<script>
export default {
    name: 'Account-item',
    props: {
        account: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
  .account-item {
    width: 100%;
    background-color: #fff;
    text-align: center;
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }
</style>