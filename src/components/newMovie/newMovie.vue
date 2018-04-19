<template>
    <div class="newMovie">
        <mHeader></mHeader>
        <section id="list" class="list">
            <loading :data="collection"></loading>
            <a herf="javascript:;" class="item" v-for="item in collection" @click="toItemDetail(item.id)">
                <div class="cover">
                    <div class="wp ratio1_1">
                        <img :src="item.cover.url"
                             alt="Invasion of Privacy" data-x="0" data-y="0" class="img-show">

                    </div>
                </div>

                <div class="info">
                    <h4></h4>
                    <h3>{{item.title}}</h3>
                    <p class="rank">
                        <!--<span class="rating-stars" data-rating="3.3"><span-->
                                <!--class="rating-star rating-star-small-full"></span><span-->
                                <!--class="rating-star rating-star-small-full"></span><span-->
                                <!--class="rating-star rating-star-small-full"></span><span-->
                                <!--class="rating-star rating-star-small-gray"></span><span-->
                                <!--class="rating-star rating-star-small-gray"></span></span>-->
                        <Ratings :score="parseFloat(item.rating.value)"></Ratings>
                        <span style="margin-left: 7px">{{ratingItem(item)}}</span>
                    </p>
                    <p class="meta">{{item.info}}</p>
                    <cite></cite>
                </div>
            </a>
        </section>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader/mHeader'
    import axios from 'axios'
    import loading from 'base/loading/loading'
    import Ratings from 'base/ratings/ratings'

    export default {
        name: "new-movie",
        components: {
            mHeader,
            loading,
            Ratings
        },
        data() {
            return {
                collection: []
            }
        },
        created() {
            axios.get('/nApi/subject_collection/music_occident/items').then((res) => {
                this.collection = res.data.subject_collection_items;
                console.log(this.collection)
            }).catch((err) => {
                console.log(err)
            })
        },
        computed:{
        },
        methods: {
            toItemDetail(id) {
                this.$router.push({path: `/page/itemDetail/${id}`})
            },
            ratingItem(item) {
                return Math.round(parseFloat(item.rating.value)*10)/10
            }
        }
    }
</script>

<style scoped>
    .newMovie {
        padding-left: 2%;
        padding-right: 2%;
        padding-top: 58px;
        margin: 0 auto;
        overflow-x: hidden;
    }

    #list .item {
        text-decoration: none;
        color: #9b9b9b;
    }

    .list .item {
        display: block;
        padding: 20px 4%;
        overflow: hidden;
        position: relative;
    }

    .list .item .cover {
        float: left;
        margin-right: 15px;
        width: 100px;
        min-height: 100px;
    }

    .list .item .info {
        overflow: hidden;
    }

    .list .item .cover img {
        width: 100%;
    }

    #list .item img {
        opacity: 0;
        -webkit-transition: opacity 0.3s ease-out;
        transition: opacity 0.3s ease-out;
    }

    #list .item .img-show {
        opacity: 1;
    }

    #list h3, #list h4, #list p {
        margin: 0;
    }

    .list .item h4 {
        font-size: 12px;
        padding-bottom: 5px;
    }

    .list .item h3 {
        font-size: 17px;
        padding: 0 0 5px;
        color: #494949;
    }

    .list .item .rank {
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    .list .item .meta, .list .item .star {
        font-size: 12px;
    }

    .list .item .meta {
        padding-top: 5px;
    }

    #list .item cite {
        font-style: normal;
    }

    .list .item cite {
        font-size: 13px;
        margin-top: 14px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .list .item::after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #ccc;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom;
    }
</style>