<!--搜索框组件-->
<template>
  <div>
    <form>
      <van-search
        v-model="value"
        :show-action="isShow"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="goSearch"
      />
    </form>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "searchModule",
  data() {
    return {
      value: ''
    }
  },
  props: {
    isShow: false,
    ishome: false
  },
  methods: {
    //点击搜索
    onSearch(val) {
      Toast(val);
      //判断本地是否有历史
      if (window.localStorage.getItem('oldKeywords')) {
        //有历史搜索，添加
        console.log('有历史搜索')
        let oldKeywords = JSON.parse(window.localStorage.getItem('oldKeywords'))
        // console.log(oldKeywords)
        oldKeywords.unshift(val); //将搜索历史添加到第一个
        oldKeywords = Array.from(new Set(oldKeywords)) //去重
        if (oldKeywords.length > 10) {
          // 截取前十个
          oldKeywords = oldKeywords.slice(0, 10)
        }
        window.localStorage.setItem('oldKeywords', JSON.stringify(oldKeywords))
      } else {
        //没有历史搜索，创建
        console.log('没有历史搜索')
        let oldKeywords = []
        oldKeywords.unshift(val);
        window.localStorage.setItem('oldKeywords', JSON.stringify(oldKeywords))
      }
      this.$router.replace({
        name: 'productList',
        query: {
          keyword: val
        }
      })
    },
    onCancel() {
      // Toast('取消');
      this.$router.replace('/home');
    },
    goSearch() {
      //去到搜索页
      if (this.ishome) {
        this.$router.push('/search')
      }
    },

  },
}
</script>

<style scoped>

</style>
