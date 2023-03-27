import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home";
import home from "../views/home/home";
import mine from "../views/home/mine";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import search from "../views/search/search";
import productDetails from "../views/goods/productDetails";
import categories from "../views/home/categories";
import productList from "../views/goods/productList";
import shopCart from "../views/home/shopCart";
import contactList from "../views/contactList/contactList";
import operateContactList from "../views/contactList/operateContactList";
import wallet from "../views/user/wallet";
import rpwd from "../views/user/rpwd";
import collect from "../views/user/collect";
import orderType from "../views/order/orderType";
import order from "../views/order/order";
import creationOrder from "../views/order/creationOrder";
import paySuccess from "../views/order/paySuccess";
import releaseGoods from "../views/release/releaseGoods";


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
          component: productList
        }, {
          path: '/wallet',
          name: 'wallet',
          component: wallet
        }, {
          path: '/orderType',
          name: 'orderType',
          component: orderType
        },{
          path: '/releaseGoods',
          name: 'releaseGoods',
          component: releaseGoods
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
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/shopCart',
      name: 'shopCart',
      component: shopCart
    }, {
      path: '/contactList',
      name: 'contactList',
      meta: {
        isToken: true,
      },
      component: contactList
    }, {
      path: '/operateContactList',
      name: 'operateContactList',
      component: operateContactList
    }, {
      path: '/rpwd',
      name: 'rpwd',
      component: rpwd
    }, {
      path: '/collect',
      name: 'collect',
      component: collect
    }, {
      path: '/order',
      name: 'order',
      component: order
    }, {
      path: '/creationOrder',
      name: 'creationOrder',
      component: creationOrder
    }, {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },{
      path: '/productDetails',
      name: 'productDetails',
      component: productDetails
    }
  ]
})

/*进入路由之前*/
router.beforeEach((to, from, next) => {
  let loginInfo = window.localStorage.getItem('user')//用户信息
  let token = window.localStorage.getItem('token')//用户token
  //console.log('islogin', islogin)
  /*判断是否需要token*/
  if (to.meta.isToken) {
    if (loginInfo == null && token == null) {
      console.log('没有token,被拦截')
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
})


export default router
