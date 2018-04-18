<template>
    <div class="movieWrapper">
        <mHeader></mHeader>
        <div class="movie_item">
            <div class="m_nav">
                <h4 class="title">最受关注图书｜虚构类</h4>
                <a href="#" class="more">更多</a>
            </div>
            <div class="m_content">
                <ul>
                    <li v-for="item in hotMovie">
                        <router-link to="">
                            <img height="180" :src="item.images.large" alt="">
                            <div class="title">{{item.title}}</div>
                            <div class="rating">
                                <Ratings :score="parseFloat(item.rating.average)" v-if="item.rating.average"></Ratings>
                                <i class="average">{{item.rating.average?item.rating.average:'暂无评分'}}</i>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="movie_item">
            <div class="m_nav">
                <h4 class="title">最受关注图书｜非虚构类</h4>
                <a href="#" class="more">更多</a>
            </div>
            <div class="m_content">
                <ul>
                    <li v-for="item in newMovie">
                        <router-link to="">
                            <img height="180" :src="item.images.large" alt="">
                            <div class="title">{{item.title}}</div>
                            <div class="rating">
                                <Ratings :score="parseFloat(item.rating.average)" v-if="item.rating.average&&parseInt(item.rating.average)!==0"></Ratings>
                                <i class="average">{{item.rating.average&&parseInt(item.rating.average)!==0?item.rating.average:'暂无评分'}}</i>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader/mHeader'
    import Scroll from 'base/scroll/scroll'
    import Ratings from 'base/ratings/ratings'
    import axios from 'axios'

    export default {
        name: 'movie',
        data() {
            return {
                hotMovie: [],
                newMovie: []
            }
        },
        components: {
            mHeader,
            Scroll,
            Ratings
        },
        computed: {},
        created() {
            axios.get('/api/book/search?q=虚构类').then((res) => {
                this.hotMovie = res.data.books.splice(0, 8)
                console.log(res.data.books)
            }).catch((err) => {
                console.log(err)
            })
            axios.get('/api/book/search?q=非虚构类').then((res) => {
                this.newMovie = res.data.books.splice(0, 8)
                console.log(this.newMovie)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../SCSS/rem.scss';

    .movieWrapper {
        height: 100%;
        overflow-x: hidden;
        padding-top: pxTorem(58px);
        .movie_item {
            padding: 0 21.6px;
            .m_nav {
                padding: 15px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .more {
                    color: #42bd56;
                }
            }
            .m_content {
                height: 254px;
                .title {
                    color: #111;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    font-size: 15px;
                }
                .rating {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .average {
                        color: #aaa;
                        font-size: 14px;
                    }
                }
                ul {
                    overflow-x: auto;
                    white-space: nowrap;
                    text-align: center;
                    padding-bottom: 30px;
                }
                li {
                    display: inline-block;
                    margin-right: 12px;
                }
            }
        }
    }
</style>