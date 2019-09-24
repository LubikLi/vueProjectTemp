// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index.js'
import '@/assets/css/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {post, postOne, postDirect, get, getOne, deleteIt, deleteImg} from '@/assets/js/http/';
import Api from '@/assets/js/api.js'
import Components from  '@/assets/js/components' //公共组件库
import '@/assets/css/base.css'
import '@/assets/css/public.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Components)


//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$postOne = postOne
Vue.prototype.$postDirect = postDirect
Vue.prototype.$get = get
Vue.prototype.$getOne = getOne
Vue.prototype.$deleteIt = deleteIt
Vue.prototype.$deleteImg = deleteImg
Vue.prototype.$api = Api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})

// 路由拦截
router.beforeEach((to, from, next) => {
  const token = '';
  if (to.meta.requireAuth) {
    if(token != undefined) {// 通过vuex state获取当前的权限是否存在
      next()
    }else{
      // 开始加载进度条
      next({
        path: '/',
      });
      NProgress.start()
    }
  } else {
    next()
  }
})
router.afterEach(transition => {
  // 结束加载进度条
  NProgress.done();
});
