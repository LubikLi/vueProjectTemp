import * as types from './mutationTypes'


export default {
  [types.SET_ACCOUNTINFO](state, data) {
    state.accountInfo = data
  },
}
