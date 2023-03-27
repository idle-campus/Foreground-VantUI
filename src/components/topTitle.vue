<!--    顶部标题组件-->
<template>
  <van-cell-group id="title">
    <van-cell :title="t_name">
      <template #icon>
        <van-icon name="arrow-left" @click="goback"/>
      </template>
      <template #right-icon v-if="ificon">
        <van-icon name="search" class="search-icon" size="20px" @click="gosearch"/>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: "topTitle",
  data() {
    return {}
  },
  props: {
    t_name: '',
    ificon: {
      type: Boolean,
      default: true
    }
  },
  created() {

  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    gosearch() {
      //去到搜索页
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less" scoped>
#title {
  .van-cell {
    .van-icon {
      margin-top: 3px;
      font-size: 20px;
    }
  }

  text-align: center;
  font-weight: bolder;
  font-size: 16px;
}
</style>
