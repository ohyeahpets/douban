<template>
	<div class="header">
		<h1><router-link to="/page/home">豆瓣</router-link></h1>
		<ul class="nav">
			<li>
				<router-link to="/page/movie" style="color: rgb(35, 132, 232);">电影</router-link>
			</li>
			<li>
				<router-link to="/page/book" style="color: rgb(159, 120, 96);">图书</router-link>
			</li>
			<li>
				<router-link to="/page/status" style="color: rgb(228, 168, 19);">广播</router-link>
			</li>
			<li>
				<router-link to="/page/group" style="color: rgb(42, 184, 204);">小组</router-link>
			</li>
		</ul>
		<span class="search"><router-link to="/page/search" style="display: inline-block;width: 100%;height: 100%"></router-link></span>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import '../../SCSS/rem.scss';
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: pxTorem(58px);
		padding: 0 pxTorem(21.6px);
		box-sizing: border-box;
		border-bottom: pxTorem(1.188px) solid #f3f3f3;
		background: #fff;
		z-index: 99999;
		h1 a {
			color: #00b600;
			font-size: pxTorem(26.4px)
		}
		.search {
			width: pxTorem(28px);
			height: pxTorem(28px);
			display: block;
			background: url(search.png) no-repeat center;
			background-size: cover;
		}
		.nav {
			display: flex;
			li {
				margin-right: pxTorem(14.4px);
			}
		}
	}
</style>