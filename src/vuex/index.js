/**
 * Created by pc on 2019/9/25.
 */
import vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 修改日志
import createPersistedState from 'vuex-persistedstate'

vue.use(vuex)

const debug = process.env.NODE_ENV !== 'production' // 开发环境中为true，否则为false

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  plugins: debug ? [createLogger(),createPersistedState()] : [createPersistedState()] // 开发环境下显示vuex的状态修改
  // plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
  // plugins:[createPersistedState()]
})
