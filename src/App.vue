<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss" scoped>
    @import './SCSS/rem.scss';

    #app {
        max-width: pxTorem(750px);
        margin: 0 auto;
        height: 100%;
    }
</style>
