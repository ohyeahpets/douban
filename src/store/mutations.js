import * as types from './mutation-types'

const mutations = {
    [types.SET_DETAIL_DATA](state, detailData) {
        state.detailData = detailData  // detailData 是提交的数据
    }
}

export default mutations