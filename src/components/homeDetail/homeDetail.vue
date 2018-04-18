<template>
    <div class="homeDetail">
        <mHeader></mHeader>
        <div class="banner">
            <div class="banner-bg"><img src="./promotion_bg.b7abee9.jpg" alt=""></div>
            <div class="content">
                <span class="title">每天看点好内容</span>
                <div class="button-wrapper">
                    <div class="download">极速下载</div>
                    <span class="open">打开</span>
                </div>
            </div>
        </div>
        <div class="info">
            <h2>{{homeDetail.title}}<span class="badge">{{homeDetail.loc_name}}</span></h2>
            <div class="poster"><img
                    :src="homeDetail.image_lmobile" alt=""></div>
            <div class="detail">
                <span>时间:&nbsp;&nbsp;</span>
                <ul>
                    <li>{{homeDetail.begin_time}}</li>
                    <li>{{homeDetail.end_time}}</li>
                </ul>
            </div>
            <div class="detail">
                <span>地点:&nbsp;&nbsp;</span>
                <ul>
                    <li>{{homeDetail.address}}</li>
                </ul>
            </div>
            <div class="detail">
                <span>费用:&nbsp;&nbsp;</span>
                <ul>
                    <li>{{homeDetail.fee_str}}</li>
                </ul>
            </div>
            <div class="detail">
                <span>类型:&nbsp;&nbsp;</span>
                <ul>
                    <li>{{homeDetail.category_name}}</li>
                </ul>
            </div>
            <div class="detail">
                <span>起始时间:&nbsp;&nbsp;</span>
                <ul>
                    <li>{{homeDetail.time_str}}</li>
                </ul>
            </div>
            <div class="tags" v-show="homeDetail&&homeDetail.tags">
                <ul>
                    <li v-for="item in tagsArray">
                        <router-link to="">{{item}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="describe">
                <h2>活动详情</h2>
                <div class="content" v-html="homeDetail.content"></div>
            </div>
            <div class="download-app">
                <div class="info">
                    <img src="./douban_download.png" alt="">
                    <div class="info-content">
                        <strong>豆瓣</strong>
                        <div>我们的精神角落</div>
                    </div>
                </div>
                <a href="#">去 App Store 免费下载 iOS 客户端</a>
            </div>
        </div>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader/mHeader'
    import {mapGetters} from 'vuex'

    export default {
        name: "home-detail",
        data() {
            return {
                homeDetail: {}
            }
        },
        components: {
            mHeader
        },
        created() {
            this.homeDetail = this.detailData
            // 判断homeDetail的id是否存在，如果不存在，则路由返回
            if (!this.homeDetail.id) {
                // console.log(this.homeDetail.id)
                this.$router.go(-1)
            }
        },
        computed: {
            ...mapGetters(['detailData']),
            // tags以逗号分割成数组
            tagsArray() {
                let arr = null;
                // arr = this.homeDetail.tags.split(',');
                return arr;
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .homeDetail {
        height: 100%;
        overflow-x: hidden;
        padding-top: 3.625rem;
    }

    .banner {
        position: relative;
        height: 96px;
    }

    .banner-bg {
        position: absolute;
    }

    .banner img {
        max-width: 100%;
    }

    .banner  .content {
        position: absolute;
        right: 1rem;
        left: 1.8rem;
        display: -ms-flexbox;
        display: flex;
        height: 96px;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-align: center;
        align-items: center;
    }

    .content .title {
        padding-left: 21.6px;
        font-size: 14px;
        font-weight: 400;
        line-height: 26px;
        color: #2ca532;
    }

    .content .download, .content .open {
        display: inline-block;
        width: auto;
        padding: 0 10px;
        font-size: 14px;
        font-weight: 700;
        line-height: 2;
        border: 1.2px solid #42bd56;
        border-radius: 3px;
    }

    .content .download {
        color: #fff;
        background: #42bd56;
    }

    .content .open {
        color: #42bd56;
    }

    .info {
        margin: 12px;
    }

    .info h2 {
        margin: 24px 0;
        font-weight: 700;
        color: #494949;
        font-size: 17px;
    }

    .info .badge {
        display: inline-block;
        padding: 1.2px 6px;
        margin-bottom: 3.6px;
        vertical-align: middle;
        font-size: 14px;
        color: #fff;
        background-color: #ff8263;
        border-radius: 3px;
    }

    .info .poster {
        margin: 24px auto;
        text-align: center;
    }

    .info .poster img {
        width: 100%;
        max-width: 264px;
        height: auto;
    }

    .detail {
        margin-left: 39.6px;
        margin-bottom: 12px;
        min-height: 32px;
        font-size: 14px;
        clear: left;
    }

    .detail span {
        float: left;
        margin-left: -39.6px;
        line-height: 150%;
        color: #666;
    }

    .detail ul {
        list-style-position: outside;
        margin-left: 0;
    }

    .tags li {
        display: inline-block;
        margin: 12px 12px 0 0;
        font-size: 15px;
    }

    .tags a {
        display: block;
        padding: 0 14.4px;
        line-height: 33px;
        font-size: 15px;
        border-radius: 20px;
        text-align: center;
        color: #494949;
        background: #f5f5f5;
    }

    .describe h2 {
        color: #072;
    }

    .download-app {
        padding: 0 0 24px;
        margin-top: 60px;
        margin-bottom: 36px;
        text-align: center;
        font-size: 15px;
    }

    .download-app .info {
        margin: 0 auto 18px;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
        display: inline-block;
        color: #111;
    }

    .download-app .info img {
        float: left;
        width: 57.5px;
        height: 57.5px;
        margin-right: 14.4px;
    }

    .info-content {
        overflow: hidden;
    }

    .info-content strong {
        font-size: 24px;
        font-weight: 400;
        line-height: 33.6px;
    }

    .download-app a:last-child {
        display: block;
        color: #42bd56;
        text-decoration: none;
    }
</style>