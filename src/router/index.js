import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Movie from 'components/movie/movie'
import homeDetail from 'components/homeDetail/homeDetail'
import Group from 'components/group/group'
import Status from 'components/status/status'
import Book from 'components/book/book'
import Register from 'components/register/register'



Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: Home
		},
		{
			path: '/page/home',
			component: Home
		},
		{
			path: '/page/movie',
			name: 'movie',
			component: Movie
		},
        {
            path: '/page/book',
            name: 'book',
            component: Book
        },
        {
            path: '/page/detail/:id',
            name: 'home-detail',
            component: homeDetail
        },
        {
            path: '/page/group',
            name: 'group',
            component: Group
        },
        {
            path: '/page/status',
            name: 'status',
            component: Status
        },
        {
            path: '/page/register',
            name: 'register',
            component: Register
        }
	]
})