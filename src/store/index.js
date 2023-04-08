import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)

const store =  new Vuex.Store({

  mutations: {
    logout() {
      // 清空缓存
      localStorage.removeItem("user")
      router.push("/home")
  }
  }
})


export default store
