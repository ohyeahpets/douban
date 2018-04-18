<template>
    <div v-show="data.length===0" class="loading"><img src="./loading_green.gif" alt=""/></div>
</template>

<script>
    export default {
        name: "loading",
        props: {
            data: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style  lang="scss" scoped>
.loading{
    width: 100%;
    z-index: 100;
    text-align: center;
    img{
        height: 50px;
        margin: 5px 0;
    }
}
</style>