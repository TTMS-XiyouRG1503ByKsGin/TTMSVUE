// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import pointTip from './base/point/index.js' //导入提示框插件
import confirm from './base/confirm/index.js';//导入确认框插件

Vue.config.productionTip = false

Vue.use(pointTip);
Vue.use(confirm);
let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
console.log(sessionStorage.getItem("userInfo"));
if(userInfo){
  console.log(123);
  router.addRoutes(store.getters.dynamicRoutes);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
