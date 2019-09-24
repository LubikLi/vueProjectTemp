/**
 * Created by pc on 2019/9/25.
 */
import * as types from './mutationTypes'

/*登录函数，用户信息*/
export const loginMsg = function({commit},loginData) {
  commit(types.SET_ACCOUNTINFO,loginData)
}

