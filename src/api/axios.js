import axios from "axios";
import router from '../router/index'

//请求根路径 mock路径e
// axios.defaults.baseURL = 'http://127.0.0.1:8282'
// axios.defaults.baseURL = 'http://localhost:8282'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// 请求拦截
axios.interceptors.request.use(config => {
  // console.log(config)
  //拦截所有请求，添加登陆用户的token
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    if (user) {
        config.headers['token'] = user.token;  // 设置请求头
    }

  // if (window.localStorage.getItem('token')) {
  //   config.headers.Authorization = window.localStorage.getItem('token');
  // }
  return config
}, error => {
  return Promise.reject(error)
});


// // response 响应拦截
//后台用户登陆信息校验不成功就跳转到登录页面
axios.interceptors.response.use(response => {

  // console.log("返回的response")
  // console.log(response.data)
  if (response.data.code === '402') {
    /*没有token*/
    console.log("返回的402", '没有token')
    router.replace({name: 'Login'}).catch(() => console.log('402路由跳转异常'))
    // 中断Promise链
    return new Promise(() => {
    })
  } else if (response.data.code === '406') {
    /*token失效*/
    console.log("返回的406", 'token失效,清理用户信息开始')
    //要等待执行完
    // window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    router.replace({name: 'Login'}).catch(() => console.log('406路由跳转异常'))
    // 中断Promise链
    return new Promise(() => {
    })
  } else if (response.data.code=== '404') {
    console.log("返回的404")
    // 中断Promise链
    return new Promise(() => {
    })
  }
  return response
// eslint-disable-next-line no-unused-vars
}, error => {
  //统一异常处理
  console.log("响应拦截器统一异常处理的信息", error)
  // 中断Promise链
  return new Promise(() => {
  })
})

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise(resolve => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
  });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise(resolve => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    })
  });
}



/**
 * del方法，对应del请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params) {
  return new Promise(resolve => {
    axios.delete(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    })
  });
}

