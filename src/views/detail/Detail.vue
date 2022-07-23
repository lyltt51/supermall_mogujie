<template>
  <div>{{iid}}</div>
</template>

<script>
export default {
    name: 'HomeDetail',
    data() {
        return {
            iid: null
        }
    },
    created() {
        this.iid = this.$route.params.iid
    },
}
</script>

<style>

</style>