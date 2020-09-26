<template> </template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            authorized: 'auth.authorized'
        })
    },
    created() {
        if (!this.authorized) {
            this.$router.push({ name: 'index'})
        }
    }
}
</script>

<style lang="stylus" scoped></style>
