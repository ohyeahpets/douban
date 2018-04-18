<template>
    <div class="douban_index">
        <mHeader></mHeader>
        <Scroll ref="scroll" class="douban_main" :data="data" :pullup="pullup" :pulldown="pulldown"
                :listenScroll="listenScroll" @scrollToEnd="scrollEnd" @scroll="scrollWhere"
                @scrollToStart="scrollStart">
            <div class="article">
                <div v-show="loadingTop" class="loading"><img style="margin-top: 1.25rem;margin-bottom: 0;"
                                                              src="./loading_green.gif" alt=""/></div>
                <section class="login_view clearfix">
                    <div class="login_view_item">
                        <router-link to="/page/movie">影院热映</router-link>
                    </div>
                    <div class="login_view_item">
                        <router-link to="">欧美新碟榜</router-link>
                    </div>
                    <div class="login_view_item">
                        <router-link to="/page/register">注册帐号</router-link>
                    </div>
                    <div class="login_view_item">
                        <router-link to="">登录豆瓣</router-link>
                    </div>
                </section>
                <ul>
                    <li class="article-item" v-for="item in data" @click="toHomeDetail(item.id)">
                        <div class="content">
                            <div class="con_left">
                                <h3 class="title">{{item.title}}</h3>
                                <p class="text">{{contentTo(item)}}</p>
                            </div>
                            <img v-lazy="item.image" alt=""/>
                        </div>
                        <div class="author">
                            <span class="name">{{item.category_name}}</span>
                            <span class="label" v-if="item.tags">本活动来自栏目   {{item.tags}} </span>
                        </div>
                    </li>
                </ul>
                <div v-show="loading" class="loading"><img src="./loading_green.gif" alt=""/></div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader/mHeader'
    import Scroll from 'base/scroll/scroll'
    import {mapMutations} from 'vuex'
    import axios from 'axios'

    export default {
        name: 'index',
        data() {
            return {
                data: [],
                loading: true,
                loadingTop: false,
                start: 0,
                total: 0,
                pullup: true,
                pulldown: true,
                listenScroll: true
            }
        },
        components: {
            mHeader,
            Scroll
        },
        created() {
            axios.get('/api/event/list', {
                params: {
                    loc: 108296,
                    day_type: 'today',
                    type: 'all'
                }
            }).then((res) => {
                console.log(res.data)
                this.data = res.data.events;
                this.loading = false;
                this.start = res.data.start;
                this.total = res.data.total;
            }).catch((err) => {
                console.log(err)
            })
        },
        methods: {
            ...mapMutations({setDetailData: 'SET_DETAIL_DATA'}),
            toHomeDetail(id) {
                this.$router.push({path: '/page/detail/' + id})
                // 判断id相同，传入对应的数据给mutation
                this.data.forEach((item,index)=>{
                    if(item.id===id){
                        this.setDetailData(item)
                    }
                })
            },
            contentTo(item) {
                let str = item.content.replace(/<[^>]+>/g, "");
                return str;
            },
            // 滚动的位置
            scrollWhere(pos) {
                console.log(pos);
            },
            // 上拉刷新
            scrollStart() {
                this.loadingTop = true;
                let start = Math.floor(Math.random() * (this.total));
                axios.get('/api/event/list', {
                    params: {
                        loc: 108296,
                        type: 'all',
                        start: start
                    }
                }).then((res) => {
                    this.data = res.data.events;
                    this.loadingTop = false;
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 下拉加载
            scrollEnd() {
                if (this.start >= this.total) {
                    return false;
                }
                let start = this.start + 20;
                this.loading = true;
                this.$refs.scroll.refresh();
                axios.get('/api/event/list', {
                    params: {
                        loc: 108296,
                        day_type: 'today',
                        type: 'all',
                        start: start
                    }
                }).then((res) => {
                    this.data = this.data.concat(res.data.events);
                    console.log(this.data.length)
                    this.start = res.data.start;
                    this.loading = false;
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../SCSS/rem.scss';

    .douban_index {
        height: 100%;
        overflow-x: hidden;
        padding-top: pxTorem(58px);
    }

    .douban_main {
        height: 100%;
        box-sizing: border-box;
        .login_view {
            box-sizing: border-box;
            padding-top: pxTorem(19.2px);
            .login_view_item {
                width: 50%;
                float: left;
                padding: pxTorem(3.6px);
                box-sizing: border-box;
                text-align: center;
                a {
                    display: block;
                    padding: pxTorem(14.4px) 0;
                    background: #f6f6f6;
                    color: #494949;
                }
            }
        }
        .article {
            padding: 0 1.35rem;
            .article-item {
                padding: pxTorem(30px) 0;
                display: flex;
                flex-direction: column;
                border-bottom: pxTorem(1px) solid #ccc;
                a {
                    color: #333;
                }
                &:last-child {
                    border: none;
                }
                .content {
                    align-items: top;
                    justify-content: space-between;
                    display: flex;
                    .con_left {
                        padding-right: 1.5rem;
                        width: 76%;
                    }
                    img {
                        width: 25%;
                        height: pxTorem(104.13px);
                    }
                    .title {
                        font-size: pxTorem(18px);
                        font-weight: normal;
                    }
                    .text {
                        font-size: pxTorem(12px);
                        color: #aaa;
                        line-height: 1.5;
                        margin-top: pxTorem(12px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
                }
                .author {
                    display: flex;
                    justify-content: space-between;
                    margin-top: pxTorem(12px);
                    .name {
                        font-size: pxTorem(12px);
                        color: #ccc;
                        line-height: 1.5;
                        flex: pxTorem(35px) 0 0;
                    }
                    .label {
                        font-size: pxTorem(12px);
                        color: #ccc;
                        line-height: 1.5;
                    }
                }
            }
        }
    }

    .loading {
        text-align: center;
        img {
            width: pxTorem(50px);
            margin: pxTorem(20px) 0;
        }
    }
</style>