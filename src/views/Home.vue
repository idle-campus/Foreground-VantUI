<template>
  <div>
    <div id="rview">
      <router-view/>
    </div>
    <van-tabbar v-model="active" placeholder>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/categories">商品分类</van-tabbar-item>
      <van-tabbar-item icon="guide-o" to="/releaseGoods">发布</van-tabbar-item>
      <!-- <van-tabbar-item icon="shopping-cart-o" to="/shopCart">购物车</van-tabbar-item> -->
      <van-tabbar-item icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    //判断底部导航条的激活状态
    isActive(val) {
      if (val.path === '/home') {
        this.active = 0
      } else if (val.path === '/categories' || val.path === '/productList') {
        this.active = 1
      } else if (val.path === '/ReleaseGoods') {

      } else if (val.path === '/mine') {
        this.active = 3
      } else {
        this.active = 0
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to) //查看路由
    next(vm => {
      vm.isActive(to)
    })
  },
  watch: {
    $route(newVal) {
      this.isActive(newVal)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
