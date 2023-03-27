// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant, {Lazyload,Tab,Tabs,Dialog,Icon,NavBar,Button,Form,Field } from 'vant';
import 'vant/lib/index.css';
import VueCropper from 'vue-cropper'

/*解决路由跳转爆错的问题  解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题*/
// 引入路由模块
import VueRouter from 'vue-router'
// 重写push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 挂载路由模块
Vue.use(VueRouter)
/*解决路由跳转爆错的问题end*/

//Vant
//懒加载
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.use(Vant);
//标签页
Vue.use(Tab);
Vue.use(Tabs);
//图片裁剪
Vue.use(VueCropper);
//弹出框
Vue.use(Dialog);
//图标
Vue.use(Icon);
//导航栏
Vue.use(NavBar);
//按钮
Vue.use(Button);
//表单
Vue.use(Form);
//输入框
Vue.use(Field);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
