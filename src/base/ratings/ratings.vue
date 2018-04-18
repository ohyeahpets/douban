<template>
    <div class="ratings">
        <span v-for="item in starCondition" :class="item"></span>
    </div>
</template>

<script>
    export default {
        name: "ratings",
        props:{
            score:{
                type:Number,
                defalut:0
            }
        },
        data() {
            return {
                starCondition:[]
            }
        },
        created() {
            let iStar =this.score/2;
            for(var i=0;i<5;i++){
                if(i<parseInt(iStar)){
                    this.starCondition.push('star-full')
                }else if(i>iStar-1&&i<iStar){
                    this.starCondition.push('star-half')
                }else {
                    this.starCondition.push('star-gray')
                }
            }
        }
    }
</script>

<style scoped>
    .star-full{background: url("./star-full.png") no-repeat;width: 16px;height: 16px;display: inline-block;background-size: cover}
    .star-half{background: url("./star-half.png") no-repeat;width: 16px;height: 16px;display: inline-block;background-size: cover}
    .star-gray{background: url("./star-gray.png") no-repeat;width: 16px;height: 16px;display: inline-block;background-size: cover}
</style>