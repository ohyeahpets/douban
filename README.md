# douban

> A Vue.js project

技术栈vue+nodejs+vuex+axios等，仿照豆瓣，数据全部是豆瓣接口
两个接口 https://api.douban.com/v2     https://m.douban.com/rexxar/api/v2
前面测试接口   后面是官网接口   都是跨域请求，请设置config 下的index.js 中的proxyTable、或者用jsonp等其他工具请求

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
