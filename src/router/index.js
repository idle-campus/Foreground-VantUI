import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home";
import home from "../views/home/home";
import mine from "../views/home/mine";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import ForgotPwd from "../views/login/ForgotPwd";
import search from "../views/search/search";
import productDetails from "../views/goods/productDetails";
import categories from "../views/home/categories";
import productList from "../views/goods/productList";
import rpwd from "../views/user/rpwd";
import changeEmail from "../views/user/changeEmail";
import myGoods from "../views/user/myGoods";
import Person from "../views/user/person";
import editGoods from "../views/user/editGoods";
import releaseGoods from "../views/release/releaseGoods";

import find404 from "../views/sys/404";



Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [

    {
      path: '/avatarTest',
      name: 'AvatarTest',
      component: () => import('../views/AvatarTest.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        }, {
          path: '/mine',
          name: 'mine',
          meta: {
            isToken: true,
          },
          component: mine
        }, {
          path: '/categories',
          name: 'categories',
          component: categories
        }, {
          path: '/productList',
          name: 'productList',
          meta: {
            isToken: true,
          },
          component: productList
        }, {
          path: '/releaseGoods',
          name: 'releaseGoods',
          meta: {
            isToken: true,
          },
          component: releaseGoods
        }, {
          path: '/myGoods',
          name: 'myGoods',
          component: myGoods
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/forgotPwd',
      name: 'ForgotPwd',
      component: ForgotPwd
    }, {
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/person',
      name: 'person',
      component: Person
    }, {
      path: '/rpwd',
      name: 'rpwd',
      meta: {
        isToken: true,
      },
      component: rpwd
    }, {
      path: '/changeEmail',
      name: 'changeEmail',
      meta: {
        isToken: true,
      },
      component: changeEmail
    }, {
      path: '/productDetails',
      name: 'productDetails',
      meta: {
        isToken: true,
      },
      component: productDetails
    },{
      path: '/editGoods',
      name: 'editGoods',
      meta: {
        isToken: true,
      },
      component: editGoods
    },{
      path: '/404',
      name: '404',
      component: find404
    }
  ]
})

/*进入路由之前*/
router.beforeEach((to, from, next) => {
  let loginInfo = window.localStorage.getItem('user')//用户信息
  let token = (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}).token//用户token
  //console.log('islogin', islogin)
  /*判断是否需要token*/
  if (to.meta.isToken) {
    if (loginInfo == null && token == null) {
      console.log('没有token,被拦截')
      // this.$toast('请登录！')
      return next("/login")
    } else {
      next()
    }
  } else {
    if (to.path === '/') {
      // 重定向到首页
      return next("/home")
    } else {
      next()
    }
  }

  // 未找到路由的情况
  if (!to.matched.length) {
    const storeUser = localStorage.getItem("user")
    if (storeUser) {
      next("/404")
    } else {
      // 跳回登录页面
      next("/login")
    }
  }


})


export default router
