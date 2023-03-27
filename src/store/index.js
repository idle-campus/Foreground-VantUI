import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    logout() {
      // 清空缓存
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      router.push("/login")

      // 重置路由
      resetRouter()
  }
  }
})
