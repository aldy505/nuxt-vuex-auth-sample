<template>
<div>
    <div v-if="authorized">
    <h1 class="text-4xl">You're logged in!</h1>
    <pre>{{userData}}</pre>
    </div>
    <div v-else>
        <h1 class="text-4xl">You're not logged in</h1>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    layout: 'default',
    computed: {
        ...mapState({
            authorized: 'auth.authorized',
            userData: 'auth.userData'
        })
    },
    created() {
        console.log('Are you authorized? ' + this.authorized)
    }
}
</script>

<style lang="stylus" scoped></style>
