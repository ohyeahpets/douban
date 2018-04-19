<template>
    <div class="itemDetail">
        <mHeader></mHeader>
        <section class="promo_top_banner" style="display: block !important">
            <div class="banner_bg">
                <img src="https://img3.doubanio.com/f/talion/fbcb08987a36258354c6037211d94286bef9716c/pics/card/promotion_bg.jpg"
                     class="img">
            </div>
            <div class="banner_wrapper">
                <div class="banner_inner">
                    <div class="promo_title">

                        <span class="promo_title_text">假如世上不曾有音乐</span><br>
                        <span class="promo_title_text"></span>
                    </div>

                    <div class="button_wrapper">
                        <a href="https://www.douban.com/doubanapp/app?model=B&amp;copy=1&amp;page=music&amp;channel=card_subject&amp;direct_dl=1"
                           rel="nofollow" onclick="ga('send', 'event', 'ios', 'click', 'subject banner download')"
                           class="promo_button download_app">极速下载</a>
                        <a href="https://www.douban.com/doubanapp/dispatch?from=mdouban&amp;download=0&amp;model=B&amp;copy=1&amp;page=music&amp;channel=card_subject&amp;uri=%2Fmusic%2F30168408"
                           rel="nofollow" onclick="ga('send', 'event', 'ios', 'click', 'card more link')"
                           class="promo_button open_app">打开</a>
                    </div>
                </div>
            </div>
        </section>
        <div class="card" v-if="musicDetail.id">
            <h1 class="title">{{musicDetail.title}}</h1>
            <section class="subject-info">
                <div class="right">
                    <a href="https://www.douban.com/doubanapp/dispatch?uri=/music/30168408&amp;from=mdouban&amp;channel=card_subject_cover&amp;download=1"
                       rel="nofollow" onclick="ga('send', 'event', 'ios', 'click', 'card more link')">
                        <img :src="musicDetail.image" :alt="musicDetail.title"
                             class="cover">
                    </a>
                </div>
                <div class="left">
                    <p class="rating" style="display: flex">
                        <Ratings :score="parseFloat(_SongRatings)"></Ratings>
                        <strong>{{_SongRatings}}</strong>
                        <span>{{musicDetail.id&&musicDetail.rating.numRaters}}人评价</span>
                    </p>
                    <p class="meta">
                        {{musicDetail.summary}}
                    </p>
                </div>
            </section>
            <!--<section class="subject-intro">-->
            <!--<h2>唱片简介</h2>-->
            <!--<div class="bd" style="position: static;">-->
            <!--<p data-clamp="10">{{musicDetail.attrs.tracks[0]}}</p>-->
            <!--</div>-->
            <!--</section>-->
            <section class="tags">
                <p>查看更多豆瓣高分专辑</p>
                <ul>
                    <li v-for="item in musicDetail.tags">
                        <a href="javascript:;">{{item.name}}</a>
                    </li>
                </ul>
            </section>
            <section class="subject-songlist">
                <h2>{{musicDetail.author[0].name}}的曲目列表</h2>
                <div class="bd">
                    <p v-for="item in musicList">{{item}}</p>
                    <!--<a href="javascript:;">(展开)</a>-->
                </div>
            </section>
            <section class="subject-comments">
                <h2>{{musicDetail.author[0].name}}的短评(460)</h2>
                <div class="bd" id="comment-list">
                    <ul data-reactroot="" class="list comment-list">
                        <li class="" v-for="item in ratingList">
                            <div class="desc"><a href="/people/2871839/"><img
                                    :src="item.user.avatar" alt="tata"></a>
                                <div class="user-info"><strong>{{item.user.name}}</strong><span class="rating-stars"
                                                                                  data-rating="3"><span
                                        class="rating-star rating-star-medium-full"></span><span
                                        class="rating-star rating-star-medium-full"></span><span
                                        class="rating-star rating-star-medium-full"></span><span
                                        class="rating-star rating-star-medium-gray"></span><span
                                        class="rating-star rating-star-medium-gray"></span></span>
                                    <div class="date">4周前</div>
                                </div>
                            </div>
                            <p>不算差，就一般，企宣里说“这张作品企图心旺盛”，企图什么？旺盛在哪？不懂，果断把票转卖了，还赚了50，xixi</p>
                            <div class="btn-info">
                                <div class="ic-btn ic-btn-like  left "><span class="text">9</span></div>
                                <div class="ic-btn ic-btn-more   right"></div>
                            </div>
                        </li>
                        <li class="go-comment-list"><router-link to="">查看全部短评</router-link>
                        </li><!-- react-empty: 76 --><!-- react-empty: 77 --></ul>
                </div>
            </section>
        </div>
        <div class="download-app">
            <div class="info">
                <img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png"
                     width="48">
                <div class="info-content">
                    <strong>豆瓣</strong>
                    <div></div>
                </div>
            </div>
            <a href="javascipt:;" rel="nofollow">去 App Store 免费下载 iOS 客户端</a>
        </div>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader/mHeader'
    import axios from 'axios'
    import Ratings from 'base/ratings/ratings'

    export default {
        name: "item-detail",
        components: {
            mHeader,
            Ratings
        },
        data() {
            return {
                musicDetail: {},
                musicList: [],
                ratingList: []
            }
        },
        created() {
            axios.get('/api/music/' + this.$route.params.id).then((res) => {
                this.musicDetail = res.data;
                this.musicList = this.musicDetail.id && this.musicDetail.attrs.tracks[0].split('\n');
            }).catch((err) => {
                console.log(err)
            })
            axios.get('/nApi/music/' + this.$route.params.id + '/interests').then((res) => {
                this.ratingList = res.data.interests;
                console.log(this.ratingList)
            }).catch((err) => {
                console.log(err)
            })
        },
        computed: {
            _SongRatings() {
                return this.musicDetail.id ? this.musicDetail.rating.average : 0
            }
        }
    }
</script>

<style scoped>
    .itemDetail {
        padding-top: 59px;
        height: 100%;
    }

    .rating_num, .rating-num {
        color: #df5001;
        margin: 0 10px
    }

    .rating-stars {
        display: inline-block;
        vertical-align: middle
    }

    .rating-stars .rating-star {
        display: inline-block;
        margin-right: 1px;
        background-color: transparent;
        background-repeat: no-repeat
    }

    .rating-star-max-full, .rating-star-max-gray {
        height: 38px;
        width: 38px;
        background-size: 38px
    }

    .rating-star-max-full {
        background-image: url(/f/talion/4e91b1ae895cdfb37d69f5c2eea33ecd2ab789e6/pics/card/ic_star_y.png)
    }

    .rating-star-max-gray {
        background-image: url(/f/talion/0eb3a627a2c8679d6a90aa5f567566b2ad659c9e/pics/card/ic_star_n.png)
    }

    .rating-star-big-full, .rating-star-big-half, .rating-star-big-gray {
        width: 15px;
        height: 15px;
        background-size: 15px 15px
    }

    .rating-star-big-full {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvVJREFUSA21lj1oFFEQx2d2jwTydXsRQUEw2BhiIcGgxkSwUbw7gkhCxCpJIXaCjWUKLQWxshbLgPEzZ2NhREGChSjY2BgMoiC3l3gazceO/3fHbi7Z9+7uncnC8ubNm5nf7Oy8t8vU4CXPUg+J+CCt5Y/wEP22DePYOih7edx5CNBzELvJ9UYaidEQmBIyHsGYJyLZQmAL25KpTJFLbZ0LxLSn7CtCf+QAny98toll/8QtqbMbUIVipiZn3AaqbO3BDschjowJMrCBW4FlqqMTrTUUB3AXPfVOxfVmjRWYWt2LqGyzNpxr12R2YNaUOcxCeFgeUXs4rTXWDS7tXaY+Y0CmFmpKjhrXtyywPOk4So7TjzbzKHCSaBEPd5IkHMWDT1lPnNjiv3kqsoJX8QO+i1hYwl0e1dwJNmSRVyy5VB7Gqc0RdngmMo9Sy+0dxujCzzqcKVyngC4hgTWdxfbrgls0509Emx4lT6PkUwC1bT8MEUXW0TtXOO3fUfEjsJpIzusldmYg7lXzbbyKiH4B0FwYcxNYKWXG2w94Din1hEb/OX6lIMhytvCuMk5sH8Ngnv4GAyjNbKVhQ7LIe5LlY1uhKlYMrJT4xBWo6J/B86t33uAlL2jVH+TM8oIugBasDHmUVtDtL3VOdemEPuEf5afJ1gguOTANmhxr6plPVrOpDiZuHIz/Mcm17TbBjWB54HWhs/eZHOvSc8KYuBFMTVS1VHWBA8cYwwzmGmVG8wD+vGoCbE7eDCZDc6ijj+QmFfOHOZ0/jcNhAnve1ycgvdiQ2iNYC5bp9l3E0h0LVjoQguM4+q5huy2rdRwOd0lW1Ck3HbNndqk12R/TQ6EFU7OLpsBva3ipD7wEk/TF7+Ps4ttQHY6c/fUNTz9MwfoIfgK+h/rSyK72PevBDg9EzkJviFZ78fm8wZdpNdJrBCR1n4prPSj9vYrlExVyJOrBgXxA5gt4yqs0lx/gTPFj5FFD4NGlPGf8MZx6acRQfq91Lv8AZLTfj0RLVbcAAAAASUVORK5CYII=")
    }

    .rating-star-big-half {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAyhJREFUSA29l89rE0EUx99siqZgm0YFC00KVXuwUSMUpGitBaFgi0VEhIqHWkHw4B+gCIognrz1ZrwKVVSqtYIn9SDVHkQFQSOEmkYqaNOkQjRt8vxuyK6TzUx+LLQDm3nzfsxn982b2Q2Ry8bP/JOJROLT3Nyc380UhpsgnvLvJhLDzLzDMIwzbuZwBSZDnLNgQvyXLV0tfd1gvkcbiNh+SoDDSHd3LTDZp24wbfINkxBb5Uk8Ho+dAVlfSa4fLAwV5HQ8Hm+sBHLa6gLzdGOAmAackyDdPlwnnfpK47rAxBtHkWZdjCoTWrZukrIAxv4B9GyZoajAE/ch3Tt1dqe+ZjBNtfQDvN05gTQGW4xJ44qi4Kf+ETxLEF4+9D7KF3trzNRSsBE1O9Oc2PMhCxi2l91WIf3EwZKGPo0+VeytsalLw+d7Aw6Du3aYKThzIEqs1QYNcGgFrNV0RF/wl3tLBoZfF6zr+7Ng0ELyCDFPrBcXqX4P1n4DdfqHBpMjgN9YazigT1KpVG9bW1u8sKJYCRaDyStE+VHcQHYtbgDQW5FI5HgoFPptzl9WOjzdchjqR6iMqu9ZRVWX3TOAK7guBIPBO7LRWcMkBpdeEq/2IAlfZUc3MoCLuAacUHOuMrCpFEPLXygDONOMOXbZvgHaA+gLVbwSbDqKE8u/8NTvVEG16ABNAxrV+WrBhQBBfbrAanocFKH5+fktOj8tmB82mUFdusAa9CKfzx/S+WnB5PUgqHjm6aKr6PEhqM2YHsz6oCo824x0Y2uqmx5sVFlfJrNwnquntbXhaDTabI8kQQnmSWrCCbZP8pNEXkG136Qfi3sDgcAxVO8pGBckB1n0eL3eXllhyUowNWw+iOX1WE52z/QG7+tucTR5uXDGwwD4/Ww2uwvibVz4UCltunVWgw0uLQqmZWTgIr1dPCCGkh9Lpybq6OhYwsF/PpfL9SMDn2U7xsp1VoOZpG3Aj4kyXXiJjItreN4Krb29/VUmkwljG10H0HrZdMdiMa8zzPxiULUZJG0bce6SGEo9UDnodJ2dnX9hu4p/FxP40B+HzLOzs6iL0vYPbfQF9yQ167cAAAAASUVORK5CYII=")
    }

    .rating-star-big-gray {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAtxJREFUSA21l01oE0EUgLv5wdBEGhUhkj9zW8xBAkFs2lIQFIsHDxVFEJocvApePHrQoyCePOUgHgNKL3oS/EHBQ0CopAZyCCFJiSDV1ICQmMRvJBs2252wu00Hhnnz3rz3vTeTnWnn5hy2ZrO5Sf9WLBbnnYRwOXGq1WpJ/K7S1VAodM1JDEdgl8uV1cFyOtmyaBtcKBTcgG9pBEVRVqvV6mltbnW0Dc5kMpcJHtIBFI/Hk9XNLYm2wUTdB2EHNtArloijRbYW1+v142ztDv2IETIcDi9EIpG3Rr1sbqtiKrtpBh0Ft/UjswUGkJVVQELr5XL5qMxu1FsGj77dtDGAbj7v9/uv6+ZTRYVzO8eKRbYxyDktIAfp/0eqWEAXFONI72GUNtZ2Mf5gfRt5zzC2me+hbw8Gg49Ko9HYRXFMGu1wDDUX0CeHE1selarfu8Lh8ANKv82yv/Kls7MAfZzP53Pj75izXuOcCyACs8NMROozu0OhT4V2DBYTnrkUGb1i+0+J+Qxbh129EY1GX2sxJz4nsvnS7XYXMW5rCw46UsgOfUUPFTEnKtYgvDZBr9e7SeWrms7JCHALvytcpQ2j/0TFmjGRSPxqt9uXcBRn7qjh+67T6SybQUVAU7AwJJPJLhV/ELKThm9FVdXfMl8pWDiQ9bLM0YJ+ZdqaqWAcDwJWK5XKSRlcChZ/zrBdEZmjFb3P55MmLgXzq566VVbAJC6NIQUTWJqtgHL+FfqbaQk4Ak9x6nMLPQJ6lk/lImOO/lOSQKpUKplewaYV81SeIJBqDAZgq9/vn+cWukf/I+zAn/V6vTPYXhrXM3cHAgFxE+5rpmAqEts8vtUI2qXfb7Va6VgsVjRG4cJpkcA6fuK/iu96u9vtNj1nUzDbvKQ5A/xMlSkCP0yn0z1NbzayCy+Ai+qf6+wZnTwWZeCvODfod3k7l+LxuOVHA/guSW6QwBqUbWJ8GtN0wj/otREARiWDTAAAAABJRU5ErkJggg==")
    }

    .rating-star-medium-full, .rating-star-medium-half, .rating-star-medium-gray {
        width: 13px;
        height: 13px;
        background-size: 13px 13px
    }

    .rating-star-medium-full {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAvVJREFUSA21lj1oFFEQx2d2jwTydXsRQUEw2BhiIcGgxkSwUbw7gkhCxCpJIXaCjWUKLQWxshbLgPEzZ2NhREGChSjY2BgMoiC3l3gazceO/3fHbi7Z9+7uncnC8ubNm5nf7Oy8t8vU4CXPUg+J+CCt5Y/wEP22DePYOih7edx5CNBzELvJ9UYaidEQmBIyHsGYJyLZQmAL25KpTJFLbZ0LxLSn7CtCf+QAny98toll/8QtqbMbUIVipiZn3AaqbO3BDschjowJMrCBW4FlqqMTrTUUB3AXPfVOxfVmjRWYWt2LqGyzNpxr12R2YNaUOcxCeFgeUXs4rTXWDS7tXaY+Y0CmFmpKjhrXtyywPOk4So7TjzbzKHCSaBEPd5IkHMWDT1lPnNjiv3kqsoJX8QO+i1hYwl0e1dwJNmSRVyy5VB7Gqc0RdngmMo9Sy+0dxujCzzqcKVyngC4hgTWdxfbrgls0509Emx4lT6PkUwC1bT8MEUXW0TtXOO3fUfEjsJpIzusldmYg7lXzbbyKiH4B0FwYcxNYKWXG2w94Din1hEb/OX6lIMhytvCuMk5sH8Ngnv4GAyjNbKVhQ7LIe5LlY1uhKlYMrJT4xBWo6J/B86t33uAlL2jVH+TM8oIugBasDHmUVtDtL3VOdemEPuEf5afJ1gguOTANmhxr6plPVrOpDiZuHIz/Mcm17TbBjWB54HWhs/eZHOvSc8KYuBFMTVS1VHWBA8cYwwzmGmVG8wD+vGoCbE7eDCZDc6ijj+QmFfOHOZ0/jcNhAnve1ycgvdiQ2iNYC5bp9l3E0h0LVjoQguM4+q5huy2rdRwOd0lW1Ck3HbNndqk12R/TQ6EFU7OLpsBva3ipD7wEk/TF7+Ps4ttQHY6c/fUNTz9MwfoIfgK+h/rSyK72PevBDg9EzkJviFZ78fm8wZdpNdJrBCR1n4prPSj9vYrlExVyJOrBgXxA5gt4yqs0lx/gTPFj5FFD4NGlPGf8MZx6acRQfq91Lv8AZLTfj0RLVbcAAAAASUVORK5CYII=")
    }

    .rating-star-medium-half {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAyhJREFUSA29l89rE0EUx99siqZgm0YFC00KVXuwUSMUpGitBaFgi0VEhIqHWkHw4B+gCIognrz1ZrwKVVSqtYIn9SDVHkQFQSOEmkYqaNOkQjRt8vxuyK6TzUx+LLQDm3nzfsxn982b2Q2Ry8bP/JOJROLT3Nyc380UhpsgnvLvJhLDzLzDMIwzbuZwBSZDnLNgQvyXLV0tfd1gvkcbiNh+SoDDSHd3LTDZp24wbfINkxBb5Uk8Ho+dAVlfSa4fLAwV5HQ8Hm+sBHLa6gLzdGOAmAackyDdPlwnnfpK47rAxBtHkWZdjCoTWrZukrIAxv4B9GyZoajAE/ch3Tt1dqe+ZjBNtfQDvN05gTQGW4xJ44qi4Kf+ETxLEF4+9D7KF3trzNRSsBE1O9Oc2PMhCxi2l91WIf3EwZKGPo0+VeytsalLw+d7Aw6Du3aYKThzIEqs1QYNcGgFrNV0RF/wl3tLBoZfF6zr+7Ng0ELyCDFPrBcXqX4P1n4DdfqHBpMjgN9YazigT1KpVG9bW1u8sKJYCRaDyStE+VHcQHYtbgDQW5FI5HgoFPptzl9WOjzdchjqR6iMqu9ZRVWX3TOAK7guBIPBO7LRWcMkBpdeEq/2IAlfZUc3MoCLuAacUHOuMrCpFEPLXygDONOMOXbZvgHaA+gLVbwSbDqKE8u/8NTvVEG16ABNAxrV+WrBhQBBfbrAanocFKH5+fktOj8tmB82mUFdusAa9CKfzx/S+WnB5PUgqHjm6aKr6PEhqM2YHsz6oCo824x0Y2uqmx5sVFlfJrNwnquntbXhaDTabI8kQQnmSWrCCbZP8pNEXkG136Qfi3sDgcAxVO8pGBckB1n0eL3eXllhyUowNWw+iOX1WE52z/QG7+tucTR5uXDGwwD4/Ww2uwvibVz4UCltunVWgw0uLQqmZWTgIr1dPCCGkh9Lpybq6OhYwsF/PpfL9SMDn2U7xsp1VoOZpG3Aj4kyXXiJjItreN4Krb29/VUmkwljG10H0HrZdMdiMa8zzPxiULUZJG0bce6SGEo9UDnodJ2dnX9hu4p/FxP40B+HzLOzs6iL0vYPbfQF9yQ167cAAAAASUVORK5CYII=")
    }

    .rating-star-medium-gray {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAtxJREFUSA21l01oE0EUgLv5wdBEGhUhkj9zW8xBAkFs2lIQFIsHDxVFEJocvApePHrQoyCePOUgHgNKL3oS/EHBQ0CopAZyCCFJiSDV1ICQmMRvJBs2252wu00Hhnnz3rz3vTeTnWnn5hy2ZrO5Sf9WLBbnnYRwOXGq1WpJ/K7S1VAodM1JDEdgl8uV1cFyOtmyaBtcKBTcgG9pBEVRVqvV6mltbnW0Dc5kMpcJHtIBFI/Hk9XNLYm2wUTdB2EHNtArloijRbYW1+v142ztDv2IETIcDi9EIpG3Rr1sbqtiKrtpBh0Ft/UjswUGkJVVQELr5XL5qMxu1FsGj77dtDGAbj7v9/uv6+ZTRYVzO8eKRbYxyDktIAfp/0eqWEAXFONI72GUNtZ2Mf5gfRt5zzC2me+hbw8Gg49Ko9HYRXFMGu1wDDUX0CeHE1selarfu8Lh8ANKv82yv/Kls7MAfZzP53Pj75izXuOcCyACs8NMROozu0OhT4V2DBYTnrkUGb1i+0+J+Qxbh129EY1GX2sxJz4nsvnS7XYXMW5rCw46UsgOfUUPFTEnKtYgvDZBr9e7SeWrms7JCHALvytcpQ2j/0TFmjGRSPxqt9uXcBRn7qjh+67T6SybQUVAU7AwJJPJLhV/ELKThm9FVdXfMl8pWDiQ9bLM0YJ+ZdqaqWAcDwJWK5XKSRlcChZ/zrBdEZmjFb3P55MmLgXzq566VVbAJC6NIQUTWJqtgHL+FfqbaQk4Ak9x6nMLPQJ6lk/lImOO/lOSQKpUKplewaYV81SeIJBqDAZgq9/vn+cWukf/I+zAn/V6vTPYXhrXM3cHAgFxE+5rpmAqEts8vtUI2qXfb7Va6VgsVjRG4cJpkcA6fuK/iu96u9vtNj1nUzDbvKQ5A/xMlSkCP0yn0z1NbzayCy+Ai+qf6+wZnTwWZeCvODfod3k7l+LxuOVHA/guSW6QwBqUbWJ8GtN0wj/otREARiWDTAAAAABJRU5ErkJggg==")
    }

    .rating-star-small-full, .rating-star-small-half, .rating-star-small-gray {
        width: 10px;
        height: 10px;
        background-size: 10px 10px
    }

    .rating-star-small-full {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==")
    }

    .rating-star-small-half {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAe9JREFUOBGllDtIA0EQhmdvTxBfUbERElBQsDLWPlFsfIGNWAg+Ki3SCha2FoK92NoIPrCwsBYECx+VldjkgSCoZxRR8e7W/zZ3yW0uJlEXwu7O/PNlZmcSojKWOG48SKVSB2VISSslEof1LSTEOGNsEtBwKX1JIFXSHDH5xY529l9AQUARm/NB5n3ngsfiGR7VDwDY6kWi7PZ4PN7j3QvtxYGcLeQH6boesPk1KCmzxDZVU6gqRFwLEdPqiPQGvNw+vNVEwrzrvNZd6atlWVPI9tk0zTTn/MUwjHQ0Gn1z/AwjcYEudhFj3A0osCnAAn5psoQQ5xpgl8VhP8UH7BzAS42NGouArqIsNPXPS9i2vRKJRGKyKYCukU0zYH7+FomsPvCZBmzdic12mY0ZO5i6YWT6+AvoA7RD4XB4z4vJAh0DGzFOyfrq85wldqfMbsDO/DoFKB1cq/ELipwxOQwjpa4g0NbLzRBPLgLaIJAFRWoOuRsyLANI1JsLcU5ynLaQzZZzUX35Wl+XZehRbQeGvCkbJOgG5340K4bHX0ITBgG+9fzIsDmZTLZ5d2dXS+YVbgnCRGLrdP8UlZ13IzBrJwB2ArwBkyUBmqaU7f3gMyFClnROlr3EJtJXLkfZAH2HYTmRSOzij2ETX6A8wzc5maj6k+W68AAAAABJRU5ErkJggg==")
    }

    .rating-star-small-gray {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=")
    }

    .rating-summary, .rating-detail {
        padding-left: 20px
    }

    .rating-summary {
        border-bottom: 1px solid #efefef;
        padding-top: 10px;
        padding-bottom: 20px;
        margin-bottom: 10px
    }

    .rating-level {
        vertical-align: middle
    }

    .rating-bar {
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px 0 10px;
        overflow: hidden;
        border-radius: 2px
    }

    .rating-bar-slice {
        float: right;
        height: 16px;
        background-color: #f2d5c3;
        background-image: -webkit-linear-gradient(top, #f2d5c3, #f0cab3);
        background-image: -moz-linear-gradient(top, #f2d5c3, #f0cab3);
        background-image: -ms-linear-gradient(top, #f2d5c3, #f0cab3);
        background-image: -o-linear-gradient(top, #f2d5c3, #f0cab3);
        background-image: linear-gradient(to top bottom, #f2d5c3, #f0cab3);
        width: 1px
    }

    .rating-bar-num {
        vertical-align: middle
    }

    .rating-item {
        text-align: center;
        margin-bottom: 7px
    }

    .tags {
        margin: 30px 0
    }

    .tags p {
        color: #aaa
    }

    .tags ul {
        font-size: 0
    }

    .tags ul li {
        display: inline-block;
        margin: 10px 10px 0 0;
        font-size: 15px
    }

    .tags ul li a {
        font-size: 15px;
        line-height: 28px;
        padding: 0 12px;
        border-radius: 28px;
        text-align: center;
        color: #494949;
        background: #f5f5f5;
        display: block
    }

    .pagination {
        width: 100%;
        vertical-align: middle;
        text-align: center
    }

    .pagination span.current {
        display: block;
        font-size: 16px;
        color: #494949
    }

    .pagination .button {
        padding: 1px;
        display: inline-block;
        background-color: #F2F2F2;
        color: #494949;
        margin-top: 20px;
        margin-left: 2%;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
        vertical-align: middle
    }

    .pagination .button.nonclick {
        color: #ccc
    }

    @media (min-width: 320px) and (max-width: 374px) {
        .pagination .button {
            font-size: 16px;
            width: 45%;
            height: 26px;
            line-height: 1.6
        }
    }

    @media (min-width: 375px) and (max-width: 413px) {
        .pagination .button {
            font-size: 18px;
            width: 45%;
            height: 32px;
            line-height: 1.8
        }
    }

    @media (min-width: 414px) {
        .pagination .button {
            font-size: 18px;
            width: 45%;
            height: 35px;
            line-height: 2
        }
    }

    .pagination .button:first-of-type {
        margin-left: 0
    }

    .promotion-app {
        z-index: 100;
        position: fixed;
        top: 0;
        width: 90%;
        max-width: 610px;
        border-bottom: 1px solid #f2f2f2;
        padding: 7px 20px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.96);
        color: #111;
        font-size: 18px;
        display: block;
        vertical-align: middle;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out
    }

    .promotion-app.affix {
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -ms-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0)
    }

    .promotion-app.hide {
        -webkit-transform: translateY(-46px);
        -moz-transform: translateY(-46px);
        -ms-transform: translateY(-46px);
        -o-transform: translateY(-46px);
        transform: translateY(-46px)
    }

    .promotion-app .douban {
        margin-right: 2px
    }

    .promotion-app .left {
        font-weight: normal;
        position: relative;
        top: 2px;
        color: #333
    }

    .promotion-app .right {
        position: absolute;
        right: 20px;
        top: 13px;
        color: #157dfb;
        font-size: 14px
    }

    .pointing {
        height: 155px;
        font-size: 14px;
        color: #8D8D8D;
        text-align: center
    }

    .pointing span {
        display: block;
        height: 18px;
        width: 18px;
        margin: 5px auto 0;
        text-indent: -999em;
        overflow: hidden;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjIyMUZGRDYyNjQxMUU0QkFDN0JDMDA0RUFERjJGNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjIyMUZGRTYyNjQxMUU0QkFDN0JDMDA0RUFERjJGNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyMjIxRkZCNjI2NDExRTRCQUM3QkMwMDRFQURGMkY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyMjIxRkZDNjI2NDExRTRCQUM3QkMwMDRFQURGMkY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+St+KwwAAADZQTFRF8vLy3d3d5eXl7e3t8fHx4+Pj6Ojo7u7u4uLi4ODg5OTk8PDw3t7e6+vr7Ozs39/f5ubm6urqNr3WHAAAAUZJREFUeNqMlOu2hCAIhckwzS5O7/+yRxAMm1xn/DGzpM/NjkAAs/BIPk5T9OlAeF+nn8zy5wsydwhj85Nx9cHqlrLcWnefDkGW2a9NA9u1s5ixhpGQpTOLC2HxjpHOGlRE5QIl9dZPO1I2ziYQXzPpKBPIimohac2abA+tElOL05FdEp4lusA7BEvZnSKEIwiLVCp/JXjBCGIphMMYfYG2sj0glVeDMQQr5fNSlxCeUI04er9Y301reEMSKaYi1AJwDZ2FuC1CdW4hohSqrbMJdKdjSiDdSjo1LuEK3Uw13kpQH8T2I83AJbiL6foWd6aY5rO4b0Y+C5nK+EUJg5k/cNcq7sG0VmGp0FPKhKxd3rWvs4xpX/j8MAiPkQrhdaTqkfwcztwPp4x5NmPOSDfm4uufC+PHq4eqmiySzsFdN7oO/wQYAAYjCPgLF1R5AAAAAElFTkSuQmCC") no-repeat;
        background-size: 18px 18px
    }

    footer {
        display: block;
        padding: 15px
    }

    footer .btn-app {
        display: block;
        padding: 0 10px;
        background: #21C522;
        border-radius: 4px;
        border-bottom: 1px solid #1fb11e;
        text-decoration: none;
        text-align: center;
        color: #fff;
        font-size: 16px;
        padding: 13px 0
    }

    .card-rec footer {
        padding: 15px 0
    }

    .footer-fix {
        border-top: 1px solid #ddd;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0
    }

    #toast {
        position: fixed;
        left: 0;
        top: 10px;
        width: 100%;
        text-align: center;
        pointer-events: none;
        z-index: 109999;
        opacity: 0;
        transform: translateY(-55px);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out
    }

    #toast.show {
        opacity: 0.96;
        transform: translateY(0)
    }

    #toast.red span {
        background-color: #ff4055
    }

    #toast.green span {
        background-color: #42bd56
    }

    #toast.gray span {
        background-color: #494949
    }

    #toast span {
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        padding: 12px 40px;
        display: inline-block;
        border-radius: 40px;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
        color: white
    }

    html.is-scrolling-disabled, html.is-scrolling-disabled .page, html.is-scrolling-disabled body {
        height: 100%;
        overflow: hidden
    }

    html.is-scrolling-disabled .page {
        padding: 0;
        margin: 0 auto
    }

    .TalionNav {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9999;
        background: #fff
    }

    .TalionNav.is-active {
        height: 100%;
        position: absolute;
        bottom: 0;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    .TalionNav li, .TalionNav ul {
        margin: 0;
        padding: 0;
        list-style: none
    }

    .TalionNav a {
        text-decoration: none
    }

    .TalionNav-primary {
        border-bottom: 1px solid #f3f3f3;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding: 0 18px;
        background: #fff;
        height: 47px;
        box-sizing: border-box;
        display: -webkit-box;
        display: flex
    }

    .TalionNav-primary > * {
        white-space: nowrap
    }

    .TalionNav-primary > a {
        font-size: 0
    }

    .TalionNav-primary h1 {
        margin: 0;
        padding: 0;
        color: #00b600;
        font-size: 0;
        background: url(data:image/png;base64,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) no-repeat;
        background-size: cover;
        height: 22px;
        width: 46px;
        display: inline-block
    }

    .TalionNav-primary nav > *, .TalionNav-primary nav li {
        display: inline-block
    }

    .TalionNav-primary nav > * {
        vertical-align: middle
    }

    .TalionNav-primary nav li {
        color: #42bd56;
        font-size: 15px;
        margin-right: 19px
    }

    .TalionNav-primary nav a {
        color: #494949
    }

    .TalionNav-primary nav span {
        font-size: 0;
        background: url(data:image/png;base64,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) no-repeat;
        background-size: cover;
        width: 24.57143px;
        height: 18.28571px;
        margin-top: 4px;
        position: relative
    }

    .TalionNav-primary nav span.has-noti:before {
        content: "";
        width: 5px;
        height: 5px;
        background-color: #ff3f51;
        border-radius: 50%;
        position: absolute;
        right: 1px;
        top: -3px
    }

    .TalionNav-secondary {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9999;
        background: #fff
    }

    .TalionNav.is-active .TalionNav-secondary {
        display: initial
    }

    .TalionNav-secondary a.close-nav {
        position: absolute;
        top: 20px;
        left: 18px;
        color: #42bd56;
        font-size: 16px
    }

    .TalionNav-secondary form {
        border-bottom: 1px solid #f3f3f3;
        padding: 15px 18px 15px 60px
    }

    .TalionNav-secondary input[type=search] {
        box-sizing: border-box;
        -webkit-appearance: none;
        border: 0;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAABUlJREFUaAXdWT1oHEcU1unHR8ih0lZEKsWVkSrLkFaVQIYkJ93JBBUp0hm7sdMJbOlAnR0ICDdJk4AL6++wi8PChXAXMG6CMSmSTpZlFy7EmWBLQvm+5c3ydrTam9nblXQeWM2bN/N+vntvZ2afuro+sVZoB0+9Xv9qd3f3W+i4WCgUBg8ODgZB82HbAm8LvC3Qz/v6+h6Wy+V/g5kc/3gDWltbO7u/v38Njpbh17Cnby8Ast7T07M4OTn51lPWabkzoKWlpRKcuQkgP0FzyUn70Yua0HUHuu5OT083j17mP+MEaHl5eRLG70H9OX8TiRJvAOxqtVpdS1zlMZkICCAKKysrt6DvNukYvR/B24BTj9C/RCpt7e3t8Z3p6u3tHURq8n26ANlv0I/hOYMn0iB7AMZ8pVKpCR2Z9x3EORnoQIp9BuIPPJUYpdvg1Uql0v2JiYmdmPlDrEaj0d9sNmcwwR9owF4AMMsA/gNS8D97zmccC4jRQJotQVEEDIx+AG+hv7//5/Hx8fc+hsza9fX1z3d2dm5gPAs7RcNnT1CI1JV2IhULCGBuw9icNgZ6GylVnpqa+tPipxqurq5+jZSsQzgSLYCZwzs1n0ophA4B4gYA/gqjZJTCyF/d3d2XAWbT8LLoAepLgGpA14jRJ9GppN0oQqepkFszun/w6N2MkbmUNRjaYxNQz0DqSL3B+HyaLb2bSk3Dr3MTdAgG4w+SZplGxthjzx+KNmhL8c+JL4rlRoaAeANAmvHQ1G0hq3dGK7VpsbGg+fSFPmmeCx0CQi5fh4C+AWxzN3NRksUascXjwLQSfLpmBq59CAi/yHeWUC3t1mzpcRqKrZpeDJ94X/RqASDemiE1rCQ/8tBU42MhxSZvH6YNi29m3LIPAMkngF684XoD0ELt0mJzQ+uJ8U1PH6JNyl3UM9hheDc7kRZjO+JbK6cCQFBiPsrM+peGOIE+YjvGt0SXAkB4+SKAcC4EN+ZEyZwmbdu2b63MmpSLADKfAK2E85iPsR3xrZVNk3L8JglbsViMXInCiWMgYmx7+WJS7rX2FQfaF3p8nHSMba/ag4lQ5J2BUq8wZwk4xjYvqs7NRCgCCNIXnDVkv9C2/crHRAAIAs+1EHYW1gBOpNm2sW0/9XEkAMQioCU0xhqAxct9KDbHtCEAeqLHregAkFQ0X6jFZ6SgoVj5k2IzrAwBzCZqDH/7WDYpxwIFv+91u8WChmbkSYstVoTChvT7NRw4EiEgnNCLkGkquQGpzihWfqTY0p/hrCrRJ68WAmKtGVG6Y0nPsjpj8TIfio1ZS/FvqCm8s3gthyEgrkSI76IL932MizgX6ixktNSUcoEUSeq0pVTwGKmpsTMZAcQqC6J0FY++Cg0AVCMPUAKGZSydanT+xzTRoWAEEBlSD5snrdoIQD2DA5mlH3VRJ2yENTmx9whgHivbXmTsxQ/hZ5H+Afqq1obI5VoKFlv76GcA6oG27UrHAqIwi/UA8LsNShRnXqy3HE4N6khANCCRyvXfKQKEn/yX8fTImF0qUImAjPIc/+HF3YwbwGNkxBXQrDS1BerQpmBA6F42ivNIwTnw9eGrl/nQPDR/wTNiNgB5Z2bAY2RMI7j7AtbwEnunCGkN7fzTGD/IJtKY15lFAIg9NNuNlDcgDS7h3/rUyy9NHtKvAOQpnieuF812QLUFSIPLmk4L6tQC4g+UBtSpBpQG1KkH5AuqIwD5gOoYQK6gOgqQCyinmwIVnZaWcKMIvgw6DhB/WBsUDu2HQ0ND33Ou41KOTpsm51SVYEZHR3cN/5Pq/wfEdlFyq1lD2AAAAABJRU5ErkJggg==) no-repeat 50% #f3f3f3;
        background-size: 17.33333px;
        border-radius: 3px;
        width: 100%;
        height: 31px;
        font-size: 14px
    }

    .TalionNav-secondary input[type=search]:focus {
        background-image: none
    }

    .TalionNav-secondary .noti {
        display: block;
        background-color: #fff;
        box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.1);
        font-size: 15px;
        text-align: center;
        height: 48px;
        line-height: 48px;
        color: #42bd56;
        cursor: pointer;
        padding: 0 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .TalionNav-secondary ul {
        padding-top: 25px;
        overflow: hidden;
        display: -webkit-box;
        display: flex;
        justify-content: space-around
    }

    .TalionNav-secondary li {
        width: 33.33%
    }

    .TalionNav-secondary li div {
        float: left;
        position: relative;
        left: 50%;
        top: 0
    }

    .TalionNav-secondary li a {
        display: block;
        text-align: center;
        margin-bottom: 25px;
        position: relative;
        left: -50%;
        top: 0
    }

    .TalionNav-secondary li strong {
        display: block;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px
    }

    .TalionNav-secondary li span {
        display: block;
        color: #999;
        height: 17px;
        font-size: 12px;
        letter-spacing: 1px
    }

    .TalionNav-secondary .navBottom {
        width: 100%;
        border-bottom: 1px solid #f3f3f3
    }

    .TalionNav-secondary .navBottom a {
        margin: 0 auto;
        text-align: center;
        text-decoration: none;
        font-size: 15px;
        color: #42bd56
    }

    .TalionNav-secondary .navBottom .nav-item {
        border-top: 1px solid #f3f3f3;
        padding: 13px 0
    }

    .TalionNav-secondary .navBottom .nav-item a {
        width: 50%;
        display: inline-block;
        box-sizing: border-box
    }

    .TalionNav-secondary .navBottom .nav-item a:first-child {
        border-right: 1px solid #e5e5e5
    }

    .TalionNav-layer {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%
    }

    .TalionNav, .TalionNav-secondary, .TalionNav.is-active {
        max-width: 650px;
        left: 50%;
        width: 100%;
        box-sizing: border-box;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%)
    }

    .login-promotion-dialog {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10009;
        display: none
    }

    .login-promotion-dialog .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4)
    }

    .login-promotion-dialog .dialog-wrapper {
        cursor: pointer;
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box
    }

    .login-promotion-dialog .dialog-wrapper.anim {
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        transition-property: transform;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;
        transition-duration: 0.5s;
        -webkit-transition-timing-function: ease-out;
        -moz-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transform: 100%;
        -moz-transform: 100%;
        -ms-transform: 100%;
        -o-transform: 100%;
        transform: 100%
    }

    .login-promotion-dialog .dialog {
        background-color: #FFFFFF;
        border-radius: 6px;
        padding: 20px;
        position: relative
    }

    .login-promotion-dialog .dialog .del {
        width: 13px;
        position: absolute;
        right: 10px;
        top: 10px;
        color: #8C8C8C
    }

    .login-promotion-dialog .dialog h2 {
        line-height: 26px;
        font-size: 19px;
        color: #111;
        margin: 0;
        margin-bottom: 25px;
        padding: 0;
        text-align: center
    }

    .login-promotion-dialog .dialog .button {
        line-height: 35px;
        border-color: #42bd56;
        border-width: 1px;
        border-style: solid;
        background-color: #42bd56;
        border-radius: 3px;
        font-size: 15px;
        color: #fff;
        margin-bottom: 10px;
        text-align: center;
        display: block
    }

    .login-promotion-dialog .dialog .button.reverse {
        background-color: #fff;
        color: #42bd56
    }

    .login-promotion-dialog .dialog .link {
        margin-top: 15px;
        line-height: 20px;
        font-size: 14px;
        color: #42bd56;
        text-align: center;
        display: block
    }

    body {
        margin: 0;
        color: #111;
        font-size: 12px;
        font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
        position: relative
    }

    * {
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0)
    }

    input, textarea, button, select, a {
        -webkit-tap-highlight-color: transparent
    }

    h1, h2, h3 {
        font-weight: normal
    }

    h1 {
        margin: 30px 0 5px;
        font-size: 24px;
        line-height: 32px;
        word-break: break-all
    }

    h2 {
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0
    }

    a {
        color: #42bd56;
        text-decoration: none
    }

    .page {
        padding-top: 47px;
        background: #fff;
        margin: 0 auto;
        overflow-x: hidden
    }

    body {
        background: #f6f6f6
    }

    body .msite-fixed-max-width {
        left: 50%;
        width: 100%;
        box-sizing: border-box;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%)
    }

    body .page, body #app, body .msite-max-width, body .msite-fixed-max-width {
        max-width: 650px
    }

    .card {
        margin: 0 18px;
        -webkit-text-size-adjust: 100%
    }

    .promo_top_banner.hide + .card {
        margin-top: 70px
    }

    .promo_top_banner + .card {
        margin-top: 0px
    }

    .ref-title {
        font-size: 15px;
        margin: 0 0 5px
    }

    .user-title {
        margin-bottom: 30px
    }

    .user-title .info {
        color: #aaa;
        font-size: 15px;
        line-height: normal
    }

    .user-title .info strong {
        color: #111
    }

    .user-title .info img {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        vertical-align: middle;
        margin-right: 6px
    }

    .user-title .desc {
        margin-top: 10px;
        font-size: 15px
    }

    section {
        margin-bottom: 30px
    }

    section p, section h3 {
        line-height: 22px;
        word-wrap: break-word;
        margin: 0;
        padding: 0
    }

    section p {
        font-size: 15px;
        color: #494949
    }

    section h3 {
        font-size: 19px;
        color: #111
    }

    .btn-more {
        display: block;
        padding: 20px 0 50px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 15px;
        color: #21C522;
        position: relative
    }

    .btn-more::after {
        content: '';
        display: inline-block;
        height: 8px;
        width: 8px;
        border-bottom: 1px solid #21C522;
        border-right: 1px solid #21C522;
        margin: -7px 0 0 8px;
        transform: rotate(45deg);
        vertical-align: middle
    }

    .card-rec {
        background: #F2F2F2;
        margin: 35px 0 0;
        padding: 0 15px
    }

    .card-rec section {
        margin: 0;
        padding-top: 15px
    }

    .flex {
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-flow: row wrap;
        -moz-flex-flow: row wrap;
        flex-flow: row wrap;
        -webkit-box-pack: justify;
        -moz-box-pack: justify;
        box-pack: justify;
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;
        -o-justify-content: space-between;
        justify-content: space-between;
        -ms-flex-pack: justify
    }

    .flex .item {
        float: left
    }

    .column-1 .item {
        width: 100%
    }

    .column-2 .item {
        width: 48%
    }

    .column-3:after {
        height: 0;
        width: 31%;
        -webkit-flex-basis: 31%;
        flex-basis: 31%;
        content: " "
    }

    .column-3 .item {
        width: 31%;
        -webkit-flex-basis: 31%;
        flex-basis: 31%;
        overflow: hidden
    }

    .download-app {
        padding: 0 0 20px 0;
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 15px
    }

    .download-app .info {
        margin: 0 auto 15px;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
        display: inline-block;
        color: #111
    }

    .download-app .info img {
        float: left;
        margin-right: 12px
    }

    .download-app .info strong {
        font-size: 24px;
        font-weight: normal;
        line-height: 48px
    }

    .download-app .info .info-content div {
        white-space: pre;
        line-height: 20px
    }

    .download-app .info + a {
        display: block
    }

    .download-app .info-content {
        overflow: hidden
    }

    .download-app .dl-link {
        display: block
    }

    .subscribe-app {
        margin: 25px auto 30px;
        width: 316px;
        height: 146px;
        overflow: hidden
    }

    .subscribe-app img {
        width: 316px;
        height: 146px
    }

    .celebrity-info, .author-info, .subject-info {
        overflow: hidden;
        position: relative;
        margin-bottom: 10px
    }

    .celebrity-info .rating, .author-info .rating, .subject-info .rating {
        line-height: 18px
    }

    .celebrity-info .rating strong, .author-info .rating strong, .subject-info .rating strong {
        font-weight: normal;
        color: #494949;
        padding-right: 8px
    }

    .celebrity-info .rating span, .author-info .rating span, .subject-info .rating span {
        color: #aaa
    }

    .celebrity-info .left, .author-info .left, .subject-info .left {
        margin-right: 100px
    }

    .celebrity-info .left .sales, .author-info .left .sales, .subject-info .left .sales {
        padding-top: 16px;
        padding-bottom: 16px
    }

    .celebrity-info .left .sales .buy, .author-info .left .sales .buy, .subject-info .left .sales .buy {
        color: #E76648;
        font-size: 13px;
        border: 1px solid #E76648;
        border-radius: 3px;
        height: 24px;
        padding: 0 6px;
        display: inline-block;
        text-align: center;
        line-height: 24px
    }

    .celebrity-info .right, .author-info .right, .subject-info .right {
        float: right
    }

    .celebrity-info .right img, .author-info .right img, .subject-info .right img {
        display: block
    }

    .celebrity-info .cover, .author-info .cover, .subject-info .cover {
        width: 100px
    }

    .celebrity-info .meta, .author-info .meta, .subject-info .meta {
        color: #494949;
        margin-top: 15px;
        padding-right: 24px;
        font-size: 14px;
        line-height: 1.6
    }

    .celebrity-info .open-app, .author-info .open-app, .subject-info .open-app {
        display: block;
        font-size: 14px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: -30px
    }

    .celebrity-info .right, .author-info .right, .subject-info .right {
        float: right
    }

    .list {
        margin-right: -18px
    }

    .list a {
        display: block;
        overflow: hidden;
        text-decoration: none;
        color: #494949
    }

    .list li {
        position: relative;
        padding: 15px 18px 15px 0;
        word-wrap: break-word;
        overflow: hidden
    }

    .list li::after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #E8E8E8;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .list li:first-child {
        padding-top: 0
    }

    .list li .desc > a {
        display: inline
    }

    .list li .info {
        font-size: 15px;
        margin-top: 10px;
        color: #ccc
    }

    .list li .cover {
        float: right;
        position: relative;
        margin-left: 10px;
        height: 50px;
        width: 50px
    }

    .list li .cover img {
        width: 100%
    }

    .list li .rating-stars {
        font-size: 15px;
        vertical-align: text-top
    }

    .list .go-app, .list .go-review-list, .list .go-comment-list, .list .go-annotation-list, .list .go-list {
        text-align: center;
        padding-bottom: 14px;
        margin-top: -15px;
        line-height: 18px
    }

    .list .go-app a, .list .go-review-list a, .list .go-comment-list a, .list .go-annotation-list a, .list .go-list a {
        font-size: 15px;
        color: #42bd56
    }

    .subject-rec .bd {
        position: relative;
        height: 160px;
        margin-left: -18px
    }

    .subject-rec ul {
        word-break: keep-all;
        white-space: nowrap;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        width: auto;
        position: absolute;
        left: 0;
        right: -18px
    }

    .subject-rec ul li {
        width: 80px;
        overflow: hidden;
        background: #fff;
        display: inline-block;
        margin: 0 8px 8px 0;
        vertical-align: top
    }

    .subject-rec ul li:last-child {
        margin: 0
    }

    .subject-rec ul li:first-child {
        margin-left: 18px
    }

    .subject-rec ul .wp {
        text-align: center
    }

    .subject-rec img {
        width: 100%;
        height: 112px
    }

    .subject-rec h3 {
        font-size: 15px;
        line-height: 18pt;
        white-space: normal;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-align: center;
        color: #494949;
        margin-top: 8px
    }

    .subject-rec .rating {
        line-height: 0;
        margin-top: 5px
    }

    .subject-rec .rating span {
        color: #aaa;
        font-size: 12px
    }

    .interests ul {
        white-space: nowrap;
        overflow-x: auto;
        padding: 0px 15px 5px 15px;
        font-size: 0;
        margin-left: -5px;
        -webkit-overflow-scrolling: touch
    }

    .interests li {
        margin: 0 0 8px 8px;
        font-size: .94rem;
        display: inline-block;
        border-radius: .25rem;
        border: solid 1px #42bd56;
        vertical-align: middle
    }

    .interests li.line {
        width: 100%;
        display: block;
        height: 1px;
        border: 0;
        margin: 0
    }

    .interests a {
        height: 50px;
        line-height: 50px;
        padding: 0 1.55rem;
        letter-spacing: .1em;
        overflow: auto;
        display: block;
        text-align: center
    }

    .interests span {
        display: block;
        line-height: 25px
    }

    .ic-btn {
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer
    }

    .ic-btn.left {
        float: left
    }

    .ic-btn.right {
        float: right
    }

    .ic-btn::before {
        content: '';
        width: 20px;
        height: 20px;
        background-position: center center;
        background-repeat: no-repeat;
        display: inline-block;
        margin-bottom: -2px
    }

    .ic-btn .text {
        color: #ccc;
        margin-left: 3px;
        position: relative;
        left: 0;
        top: -3px
    }

    .ic-btn-comment::before {
        background-image: url(/f/talion/ac8a7e0d5f471480549c7abf45fc0fa4c3b4184f/pics/card/ic_comment.svg)
    }

    .ic-btn-more::before {
        background-image: url(./more.svg)
    }

    .ic-btn-like::before {
        background-image: url(./ic_like_gray.svg)
    }

    .ic-btn-like.active .text {
        color: #42bd56
    }

    .ic-btn-like.active::before {
        background-image: url(/f/talion/2d3be3ae95f65d9e4e6620cc3c524e79a2edf2ad/pics/card/ic_like_green.svg)
    }

    .ic-btn-heart::before {
        background-image: url(/pics/card/ic_heart_gray.svg)
    }

    .ic-btn-heart.active .text {
        color: #42bd56
    }

    .ic-btn-heart.active::before {
        background-image: url(/f/talion/0129352875382ff0544020161709c2ae9b00c737/pics/card/ic_heart_red.svg)
    }

    .ic-btn-retweet::before {
        background-image: url(/f/talion/8604ef3950b947d55406e2a6f5cf6ca7f0b934e3/pics/card/ic_retweet_gray.svg)
    }

    .ic-btn-retweet.active .text {
        color: #42bd56
    }

    .ic-btn-retweet.active::before {
        background-image: url(/f/talion/e8ec58db5bf1dbd82eb7965dfc51ffb7f0f5b79f/pics/card/ic_retweet_green.svg)
    }

    .more-menu {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 4px;
        background-color: #fcfcfc;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
        border: solid 1px #ccc;
        white-space: nowrap
    }

    .more-menu-item {
        position: relative;
        padding: 15px 40px 15px;
        background-color: #fcfcfc;
        color: #42bd56;
        font-size: 15px;
        font-weight: 500;
        display: inline-block;
        border-radius: 4px;
        white-space: nowrap
    }

    .more-menu-item:after {
        content: '';
        width: 1px;
        height: 24px;
        background: #cccccc;
        display: block;
        position: absolute;
        right: 0;
        top: 12px
    }

    .more-menu-item:last-child:after {
        content: none
    }

    #report-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5)
    }

    #report-box ul {
        height: 224px;
        margin: 162px 18px 0;
        border-radius: 8px;
        background-color: #fcfcfc;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
        border: solid 0.5px #ccc
    }

    #report-box ul li {
        position: relative;
        line-height: 56px;
        color: #42bd56;
        font-size: 17px;
        text-align: center
    }

    #report-box ul li:after {
        content: '';
        width: 100%;
        height: 1px;
        display: block;
        position: absolute;
        background: #cccccc
    }

    #report-box ul li:last-child:after {
        content: none
    }

    .pop-menu-wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: -100;
        visibility: hidden
    }

    .pop-menu-wrapper.show {
        z-index: auto;
        visibility: visible
    }

    .pop-menu-wrapper .pop-menu {
        position: absolute;
        display: inline-block;
        border-radius: 4px;
        background-color: #fcfcfc;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
        border: solid 0.5px #ccc;
        box-sizing: border-box;
        -webkit-box-sizing: border-box
    }

    .pop-menu-wrapper .pop-menu .item {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        outline: none;
        color: #42bd56;
        position: relative;
        font-size: 15px;
        padding: 0 40px;
        line-height: 48px
    }

    .pop-menu-wrapper .pop-menu .item::after {
        content: '';
        position: absolute;
        top: 16px;
        right: 0;
        height: 16px;
        width: 1px;
        background-color: #E8E8E8
    }

    .pop-menu-wrapper .pop-menu .item:active {
        background-color: #F2F2F2
    }

    .pop-menu-wrapper .pop-menu .item:last-of-type::after {
        width: 0
    }

    #toast {
        position: fixed;
        left: 0;
        top: 10px;
        width: 100%;
        text-align: center;
        pointer-events: none;
        z-index: 109999;
        opacity: 0;
        transform: translateY(-55px);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out
    }

    #toast.show {
        opacity: 0.96;
        transform: translateY(0)
    }

    #toast.red span {
        background-color: #ff4055
    }

    #toast.green span {
        background-color: #42bd56
    }

    #toast.gray span {
        background-color: #494949
    }

    #toast span {
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        padding: 12px 40px;
        display: inline-block;
        border-radius: 40px;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
        color: white
    }

    .dialog-container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10009;
        display: none;
        overflow: visible
    }

    .dialog-container.transparent {
        z-index: 9998
    }

    .dialog-container.transparent .dialog-overlay {
        background-color: transparent
    }

    .dialog-container .dialog-overlay {
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4)
    }

    .dialog-container.show {
        display: block
    }

    .dialog-container .dialog-wrapper {
        position: relative;
        margin: 0 auto;
        top: 24%;
        width: 100%;
        max-width: 650px;
        padding: 0 18px;
        box-sizing: border-box
    }

    .dialog-container .dialog-wrapper .dialog {
        height: auto;
        border-radius: 8px;
        background-color: #FCFCFC;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.3);
        overflow: hidden;
        position: relative
    }

    .dialog-container.list .item {
        height: 56px;
        line-height: 56px;
        font-size: 17px;
        cursor: pointer;
        text-align: center;
        color: #42bd56;
        position: relative
    }

    .dialog-container.list .item::after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #E8E8E8;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .dialog-container.alert .dialog-wrapper {
        padding: 0 50px
    }

    .dialog-container.alert .dialog {
        padding: 25px 35px 0
    }

    .dialog-container.alert .dialog .title {
        font-size: 17px;
        font-weight: 500;
        letter-spacing: -0.4px;
        text-align: center;
        color: #494949
    }

    .dialog-container.alert .dialog .content {
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
        color: #494949;
        margin-top: 10px
    }

    .dialog-container.alert .dialog .input {
        border: solid 0.5px #ccc;
        margin: 15px -18px 0;
        padding: 8px;
        font-size: 12px;
        line-height: 1.3;
        color: #494949;
        min-height: 15px;
        outline-style: none
    }

    .dialog-container.alert .dialog .btn-group {
        margin: 15px -50px 0;
        overflow: hidden;
        position: relative
    }

    .dialog-container.alert .dialog .btn-group::before {
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background: #E8E8E8;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .dialog-container.alert .dialog .btn-group .btn {
        cursor: pointer;
        display: block;
        font-size: 17px;
        letter-spacing: -0.4px;
        text-align: center;
        color: #42bd56;
        width: 100%;
        height: 44px;
        line-height: 44px;
        box-sizing: border-box;
        position: relative
    }

    .dialog-container.alert .dialog .btn-group .btn::after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #E8E8E8;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .dialog-container.alert .dialog .btn-group .btn.btn-2x {
        width: 50%;
        float: left;
        position: relative
    }

    .dialog-container.alert .dialog .btn-group .btn.btn-2x::after {
        right: 0;
        bottom: 0;
        width: 1px;
        height: 100%;
        background: #E8E8E8;
        -webkit-transform: scaleX(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .dialog-container.alert .dialog .btn-group .btn.bold {
        font-weight: 500
    }

    .dialog-container.alert .dialog .btn-group .btn.cancel {
        color: #aaa
    }

    .report-dialog .dialog-wrapper {
        top: 162px
    }

    .report-dialog .reason-item {
        cursor: pointer;
        color: #42bd56;
        font-size: 17px;
        text-align: center;
        height: 55px;
        line-height: 55px;
        position: relative
    }

    .report-dialog .reason-item::after {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: #E8E8E8;
        -webkit-transform: scaleY(0.5);
        content: '';
        position: absolute;
        -webkit-transform-origin: 0 bottom
    }

    .report-dialog .reason-item:active {
        background-color: #F2F2F2
    }

    .comment-list li::after {
        height: 0;
        left: 34px;
        right: 0
    }

    .comment-list li:nth-last-child(2)::after, .comment-list li:last-child::after {
        left: 0;
        width: 100%
    }

    .comment-list li .desc {
        font-size: 0;
        line-height: normal;
        margin: 0 0 11px;
        color: #494949;
        position: relative
    }

    .comment-list li .desc img, .comment-list li .desc .avatar {
        width: 36px;
        border-radius: 50%;
        vertical-align: text-top;
        margin-right: 10px;
        float: left
    }

    .comment-list li .desc .user-info {
        margin-left: 40px
    }

    .comment-list li .desc .date {
        margin-top: 6px;
        font-size: 12px;
        color: #aaa
    }

    .comment-list li .desc strong {
        font-size: 15px;
        display: inline-block;
        vertical-align: text-top;
        margin-right: 6px
    }

    .comment-list li .desc .comment-vote {
        color: #aaa;
        font-size: 14px;
        position: absolute;
        top: 2px;
        right: 0
    }

    .comment-list li .btn-info {
        height: 22px;
        margin: 10px 0 0 40px
    }

    .comment-list li cite {
        display: block;
        border-left: 1px solid #aaa;
        padding-left: 5px;
        font-style: normal;
        margin: 0 0 10px 34px;
        color: #aaa
    }

    .comment-list li p {
        padding: 0 0 0 40px;
        line-height: 22px;
        color: #494949
    }

    .types {
        margin-right: -25px
    }

    .types .section-content {
        margin-bottom: 0
    }

    .type-list {
        padding: 0 0 1.88rem;
        color: #eee;
        font-size: .9rem;
        overflow: hidden
    }

    .type-list li {
        width: 41.5%;
        border-right: solid 1px #eee;
        float: left;
        padding-right: 1.12rem;
        height: 2.64rem
    }

    .type-list li:last-child, .type-list li:nth-last-child(2) {
        border-top: solid 1px #eee
    }

    .type-list li:nth-child(even) {
        border-right: none;
        padding-left: 1.12rem
    }

    .type-list a {
        float: left;
        display: inline-block;
        width: 100%;
        line-height: 2.64rem
    }

    .type-list span {
        color: #ccc;
        float: right;
        font-weight: bold;
        display: inline-block;
        border-right: solid 1px #ccc;
        border-bottom: solid 1px #ccc;
        width: .5rem;
        height: .5rem;
        transform: rotate(-45deg);
        margin-top: 1rem
    }

    @media (min-width: 320px) and (max-width: 359px) {
        .type-list li {
            width: 39.5%
        }
    }

    @media (min-width: 360px) and (max-width: 399px) {
        .type-list li {
            width: 40.5%
        }
    }

    @media (min-width: 471px) and (max-width: 585px) {
        .type-list li {
            width: 43%
        }
    }

    @media (min-width: 586px) {
        .type-list li {
            width: 44%
        }
    }

    .douban-dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding-top: 44px;
        overflow: auto;
        background: #fff;
        z-index: 10000
    }

    .douban-dialog.hide {
        display: none
    }

    .douban-dialog .hd {
        height: 44px;
        width: 100%;
        color: #333;
        border-bottom: 1px solid #efefef;
        font-size: 20px;
        line-height: 44px;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        position: fixed;
        top: 0;
        z-index: 10;
        background: #fff
    }

    .douban-dialog .hd .title {
        display: inline-block;
        width: 70%;
        margin: 0 15%;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden
    }

    .douban-dialog .hd a {
        color: #42bd56;
        font-size: 15px;
        position: absolute;
        top: 0;
        z-index: 10001
    }

    .douban-dialog .hd a.btn-cancel {
        left: 18px
    }

    .douban-dialog .hd a.btn-ok {
        right: 18px
    }

    .douban-dialog .hd a.disable {
        color: #ccc
    }

    .douban-dialog .bd {
        max-width: 650px;
        margin: 0 auto
    }

    .douban-dialog .bd .tit {
        padding-bottom: 10px;
        color: #aaa;
        font-size: 15px
    }

    .douban-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: rgba(0, 0, 0, 0.3);
        z-index: 10001
    }

    a, input {
        outline: 0
    }

    .hide {
        display: none
    }

    .douban-dialog .star {
        padding: 40px 0;
        text-align: center;
        position: relative
    }

    .douban-dialog .star span {
        margin: 0 6px
    }

    .douban-dialog .star .rating-star-max-full, .douban-dialog .star .rating-star-max-gray {
        height: 0;
        width: 12%;
        padding-top: 12%;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100%;
        -webkit-tap-highlight-color: transparent
    }

    .douban-dialog .star:after {
        content: '';
        height: 1px;
        width: 100%;
        position: absolute;
        bottom: 10px;
        left: 0;
        background: #e8e8e8;
        -webkit-transform: scaleY(0.5);
        -webkit-transform-origin: 0 bottom
    }

    .douban-dialog .interest-bd {
        padding: 0 18px;
        position: relative
    }

    .douban-dialog .interest-bd .tit {
        margin-top: 40px
    }

    .douban-dialog .interest-bd .remark {
        font-size: 0
    }

    .douban-dialog .interest-bd .remark a {
        height: 34px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 34px;
        padding: 0 15px;
        margin: 0 5px 10px;
        color: #aaa;
        font-size: 17px;
        line-height: 34px;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-tap-highlight-color: transparent;
        background: #fff
    }

    .douban-dialog .interest-bd .remark a.selected {
        border: 1px solid #42bd56;
        color: #fff;
        background: #42bd56
    }

    .douban-dialog .interest-bd .remark a.add-tag {
        font-size: 20px;
        line-height: 30px
    }

    .douban-dialog .interest-bd .remark #input-tag {
        height: 34px;
        min-width: 80px;
        max-width: 200px;
        border: 0;
        border-radius: 28px;
        padding: 0 15px 2px;
        margin-bottom: 10px;
        font-size: 17px;
        line-height: 34px;
        vertical-align: top;
        color: #fff;
        text-align: center;
        background: #42bd56
    }

    .douban-dialog .interest-bd .remark.error #input-tag {
        color: #FF3F51;
        border: 1px solid #FF3F51;
        background: #fff
    }

    .douban-dialog .interest-bd textarea {
        height: 130px;
        width: 100%;
        font-size: 17px;
        color: #494949;
        line-height: 1.5;
        border-radius: 2px;
        padding: 15px;
        background-color: #fff;
        box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.05), inset -1px -1px 2px 0 rgba(0, 0, 0, 0.05);
        border: solid 0.5px #ccc;
        box-sizing: border-box;
        -webkit-appearance: none
    }

    .douban-dialog .interest-bd .max-length {
        float: right
    }

    .douban-dialog .interest-bd .max-length.error {
        color: #FF3F51
    }

    .douban-dialog .share {
        max-width: 614px;
        margin: 10px auto 40px;
        padding: 0 18px 20px
    }

    .douban-dialog .share span {
        margin-right: 20px
    }

    .douban-dialog .share span input {
        display: none
    }

    .douban-dialog .share span input + label {
        position: relative;
        padding-left: 20px;
        color: #ccc;
        font-size: 15px
    }

    .douban-dialog .share span input + label:after {
        content: '';
        height: 13px;
        width: 13px;
        border: 1px solid #ccc;
        position: absolute;
        top: 1px;
        left: 0px;
        color: #ccc;
        font-size: 17px;
        line-height: 10px;
        text-align: center
    }

    .douban-dialog .share span input:checked + label {
        color: #494949
    }

    .douban-dialog .share span input:checked + label:after {
        content: '\2713';
        border: 1px solid #494949;
        color: #494949
    }

    .celebrity-mark, .author-mark {
        width: 35%
    }

    .celebrity-mark .mark-item, .author-mark .mark-item {
        margin-bottom: 30px;
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center
    }

    .celebrity-mark .mark-item a, .author-mark .mark-item a {
        height: 30px;
        line-height: 30px;
        display: block;
        border: 1px solid #ffb712;
        border-radius: 3px;
        margin-right: 10px;
        color: #ffb712;
        font-size: 15px;
        text-align: center;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        box-flex: 1;
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .celebrity-mark .mark-item a:last-child, .author-mark .mark-item a:last-child {
        margin: 0
    }

    .celebrity-mark .mark-item a.disable, .author-mark .mark-item a.disable {
        color: #aaa;
        border: 1px solid #aaa
    }

    .subject-mark .mark-item {
        margin-bottom: 30px;
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center
    }

    .subject-mark .mark-item a {
        height: 30px;
        line-height: 30px;
        display: block;
        border: 1px solid #ffb712;
        border-radius: 3px;
        margin-right: 10px;
        color: #ffb712;
        font-size: 15px;
        text-align: center;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        box-flex: 1;
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        flex: 1
    }

    .subject-mark .mark-item a:last-child {
        margin: 0
    }

    .subject-mark .mark-item a.disable {
        color: #aaa;
        border: 1px solid #aaa
    }

    .subject-mark .bd {
        margin-top: 10px;
        font-size: 15px;
        color: #494949
    }

    .subject-mark .bd .self-tags {
        margin-bottom: 20px
    }

    .subject-mark .bd .self-star span {
        color: #ccc
    }

    .subject-mark .bd .self-star span.selected {
        color: #efc
    }

    .subject-mark .collect_btn {
        color: #4f946e
    }

    .loading {
        background: url(/f/talion/326df52f00a7dd43b9d23e2bbc7b7d3de5b9fd9e/pics/card/loading_green.gif) center/24px no-repeat #fff;
        width: 100%;
        height: 50px;
        z-index: 100
    }

    .loading-gray {
        background-image: url(/f/talion/bf2ef8c5c1a8c84dddfd1135656857e73582c5d8/pics/card/loading_grey.gif)
    }

    .loading-full {
        height: 100%;
        position: fixed;
        left: 0;
        top: 0
    }

    .loading-full-gray {
        background-image: url(/f/talion/bf2ef8c5c1a8c84dddfd1135656857e73582c5d8/pics/card/loading_grey.gif)
    }

    .subject-reviews .list li, .review-list .list li {
        padding-top: 10px
    }

    .subject-reviews .list li h3, .review-list .list li h3 {
        color: #494949;
        font-weight: 500;
        font-size: 17px;
        line-height: 1.41
    }

    .subject-reviews .list li:first-child, .review-list .list li:first-child {
        padding-top: 0
    }

    .subject-reviews .list li:after, .review-list .list li:after {
        content: none
    }

    .subject-reviews .list li h3, .review-list .list li h3 {
        margin-bottom: 6px
    }

    .subject-reviews .list li .rating-stars, .review-list .list li .rating-stars {
        font-size: 12px
    }

    .subject-reviews .list li img + .rating-stars, .review-list .list li img + .rating-stars {
        line-height: 1;
        vertical-align: sub
    }

    .subject-reviews .list li .rating-star, .review-list .list li .rating-star {
        background-size: 12px
    }

    .subject-reviews .list li .rating-star-medium-full, .subject-reviews .list li .rating-star-medium-half, .subject-reviews .list li .rating-star-medium-gray, .review-list .list li .rating-star-medium-full, .review-list .list li .rating-star-medium-half, .review-list .list li .rating-star-medium-gray {
        width: 12px;
        height: 12px
    }

    .subject-reviews .list li .username, .review-list .list li .username {
        color: #494949
    }

    .subject-reviews .list li .abstract, .review-list .list li .abstract {
        margin-top: 5px
    }

    .subject-reviews .list li .abstract, .subject-reviews .list li .info, .review-list .list li .abstract, .review-list .list li .info {
        line-height: 1.5;
        font-size: 12px;
        color: #aaaaaa
    }

    .subject-reviews .list li .info, .review-list .list li .info {
        line-height: 1
    }

    .subject-forum-topics ul {
        padding-bottom: 25px
    }

    .subject-forum-topics ul li:nth-last-of-type(2)::after, .subject-forum-topics ul li:nth-last-of-type(1)::after {
        height: 0
    }

    .subject-forum-topics ul li h3 {
        font-size: 17px;
        font-weight: 500;
        margin: 0;
        line-height: 1.41;
        color: #494949
    }

    .subject-forum-topics ul li .info {
        font-size: 14px;
        line-height: 1;
        color: #42bd56;
        margin-top: 5px
    }

    .subject-songlist .bd {
        font-size: 17px;
        line-height: 1.5em
    }

    .subject-songlist .bd .hidden-songs {
        display: none
    }

    .subject-rec img {
        height: 80px
    }

    .subject-rec .bd {
        height: 130px
    }

    .hide {
        display: none
    }

    .promo_top_banner {
        margin-bottom: 0;
        max-width: 100%;
        overflow: hidden;
        text-align: left;
        position: relative;
        display: block !important
    }

    .promo_top_banner .banner_bg {
        font-size: 0;
        padding-bottom: 21.33333%;
        position: relative
    }

    .promo_top_banner .banner_bg .img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0
    }

    .promo_top_banner .banner_wrapper {
        position: absolute;
        left: 18px;
        top: 0;
        bottom: 0;
        right: 10px
    }

    .promo_top_banner .banner_wrapper .banner_inner {
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center;
        -webkit-box-pack: justify;
        -moz-box-pack: justify;
        box-pack: justify;
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;
        -o-justify-content: space-between;
        justify-content: space-between;
        -ms-flex-pack: justify;
        width: 100%;
        height: 100%
    }

    .promo_top_banner .banner_wrapper .banner_inner > * {
        vertical-align: middle
    }

    .promo_top_banner .promo_title {
        margin: 0
    }

    .promo_top_banner .promo_title_text {
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        color: #2CA532
    }

    .promo_top_banner .button_wrapper {
        white-space: nowrap;
        font-size: 0;
        padding-left: 12px
    }

    .promo_top_banner .promo_button {
        font-size: 13px;
        font-weight: bold;
        width: auto;
        padding: 0 14px;
        position: relative
    }

    .promo_top_banner .promo_button.open_app {
        margin-right: 0;
        margin-left: 8px
    }

    .promo_top_banner .promo_button:after {
        content: '';
        position: absolute;
        left: -4px;
        right: -4px;
        top: -10px;
        bottom: -10px
    }

    a.close_banner {
        display: none
    }

    .entire a.close_banner {
        display: block;
        position: absolute;
        top: 20px;
        right: 15px
    }

    .promo_title, .promo_text {
        line-height: 1;
        font-weight: 600;
        color: #494949
    }

    @media (min-width: 320px) and (max-width: 374px) {
        .promo_title, .promo_text {
            font-size: 17px
        }
    }

    @media (min-width: 375px) and (max-width: 413px) {
        .promo_title, .promo_text {
            font-size: 21px
        }
    }

    @media (min-width: 414px) {
        .promo_title, .promo_text {
            font-size: 23px
        }
    }

    .promo_title {
        margin: 40px 0 0 0
    }

    .entire .promo_title {
        margin: 0
    }

    @media (min-width: 320px) and (max-width: 374px) {
        .entire .promo_title {
            font-size: 19px
        }
    }

    @media (min-width: 375px) and (max-width: 413px) {
        .entire .promo_title {
            font-size: 23px
        }
    }

    @media (min-width: 414px) {
        .entire .promo_title {
            font-size: 25px
        }
    }

    .button_wrapper {
        margin: 0
    }

    .entire .button_wrapper {
        margin: 0
    }

    @media (min-width: 320px) and (max-width: 374px) {
        .promo_more, .promo_button {
            font-size: 14px
        }
    }

    @media (min-width: 375px) and (max-width: 413px) {
        .promo_more, .promo_button {
            font-size: 16px
        }
    }

    @media (min-width: 414px) {
        .promo_more, .promo_button {
            font-size: 19px
        }
    }

    .promo_more {
        white-space: nowrap;
        margin: 15px 0;
        font-weight: normal;
        color: #9b9b9b
    }

    .promo_button {
        display: inline-block;
        padding: 0 4px;
        border-radius: 3px;
        width: 42%;
        line-height: 2
    }

    .entire .promo_button {
        margin: 0
    }

    .promo_button.open_app {
        margin-right: 4%;
        color: #42bd56;
        border: 1px solid #42bd56
    }

    .promo_button.download_app {
        color: #fff;
        border: 1px solid #42bd56;
        background: #42bd56
    }

    .promo_footer_banner {
        max-width: 100%;
        margin-bottom: 0;
        padding: 30% 0 0;
        overflow: hidden;
        text-align: center;
        background: url(/f/talion/ccd6818988dec99ce0de28d5158c72862a5e3100/pics/card/below_banner_bg.png) #ecf9ee top no-repeat;
        background-size: 100%
    }

    .promo_footer_banner .promo_button {
        margin: 6% 0 14%
    }

    .promo_footer_banner .promo_img_wrapper img {
        display: block;
        margin: 0 auto;
        width: -webkit-calc((2 / 3 * 100%) + 40px);
        width: calc((2 / 3 * 100%) + 40px);
        -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
    }

    .promo_footer_banner {
        padding-left: 30px;
        padding-right: 30px
    }

    .Advertisement {
        margin-bottom: 0;
    }

    .Advertisement img {
        display: block;
        max-width: 100%;
    }

    .Advertisement a ~ img {
        left: -999px;
    }

    .Advertisement > div {
        display: block !important;
    }

    .Advertisement iframe {
        vertical-align: top;
        width: 100%;
    }

    .center .Advertisement {
        margin-bottom: 40px;
        margin-top: 20px;
    }

    .center .Advertisement:empty {
        margin: 0;
    }

    .center + .comment-item {
        margin-top: -15px;
    }

    section + .center .Advertisement {
        margin-top: -10px;
    }

    section.types + .center .Advertisement {
        margin-top: -40px;
    }

    .comments .Advertisement {
        margin-right: 18px;
    }

    .photo .center {
        width: 90.9%;
    }

    footer .Advertisement {
        margin-left: -15px;
        margin-right: -15px;
    }

    #dale_talion_group_comments_center {
        margin-top: -20px;
        margin-bottom: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 18px;
        padding-right: 18px;
        background-color: #f7f7f7;
    }

    section.types ~ section#ThemesWidget {
        margin-top: -30px;
    }

    #TopicSelectionsWidget header h1 {
        font-size: 15px;
        color: #aaa;
        line-height: 1;
        margin-bottom: 0
    }

    #TopicSelections .gl-topic-item {
        padding: 18px 0;
        position: relative;
        overflow: hidden;
        display: block;
        text-decoration: none;
        color: inherit
    }

    #TopicSelections .gl-topic-item::after {
        content: '';
        border-bottom: 1px solid #ededed;
        position: absolute;
        width: 200%;
        height: 200%;
        top: 0;
        left: 0;
        transform: scale(0.5);
        transform-origin: left top;
        z-index: -1;
        box-sizing: border-box
    }

    #TopicSelections .gl-topic-title {
        font-size: 17px;
        font-weight: 600;
        color: #494949;
        margin-bottom: 10px;
        margin-right: 84px;
        overflow: hidden
    }

    #TopicSelections .gl-topic-cover {
        background-color: #ededed;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        float: right;
        width: 70px;
        height: 70px
    }

    #TopicSelections .gl-topic-info {
        font-size: 13px
    }

    #TopicSelections .gl-topic-info .gl-topic-label {
        color: #f77a49;
        position: relative;
        padding: 4px 6px;
        margin-right: 6px
    }

    #TopicSelections .gl-topic-info .gl-topic-label::after {
        content: '';
        border: 1px solid #f77a49;
        border-radius: 6px;
        position: absolute;
        width: 200%;
        height: 200%;
        top: 0;
        left: 0;
        transform: scale(0.5);
        transform-origin: left top
    }

    #TopicSelections .gl-topic-info .gl-topic-subtitle {
        color: #9b9b9b
    }

    .bottom_ad_download {
        width: 100%;
        max-width: 650px;
        position: fixed;
        bottom: 0;
        display: none;
        left: 50%;
        background-repeat: no-repeat;
        background-size: 100% auto;
        text-align: center;
        -webkit-transform: translate(-50%, 0);
        -moz-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        z-index: 99
    }

    .bottom_ad_download iframe {
        width: 100% !important
    }

    .bottom_ad_download.show {
        opacity: 1;
        display: block
    }

    .bottom_ad_download > a {
        position: relative;
        display: block
    }

    .bottom_ad_download img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
        position: relative;
        z-index: 5
    }

    .bottom_ad_download span {
        height: 38px;
        width: 100%;
        display: block;
        position: absolute;
        bottom: 5%;
        left: 0;
        text-align: center;
        z-index: 10
    }

    .bottom_ad_download span em {
        height: 38px;
        border-radius: 20px;
        padding: 0 15px 0 43px;
        display: inline-block;
        font-style: normal;
        color: #fff;
        font-size: 17px;
        font-weight: bold;
        line-height: 38px;
        background-image: url(/f/talion/b74d76ae5a7a98fbb115fdc2a7ed1daadad70a4b/pics/card/bottom_ad_download.png);
        background-color: #42bd56;
        background-repeat: no-repeat;
        background-position: 15px 10px;
        background-size: 18px
    }

    .bottom_ad_download .close {
        height: 25px;
        width: 25px;
        position: absolute;
        top: 15px;
        right: 15px;
        opacity: .7;
        background: url(/f/talion/175f8b83636e97a8cefc32e0a7ba62f11b5caaf5/pics/card/bottom_ad_close.png) no-repeat;
        background-size: 25px;
        z-index: 11
    }

</style>