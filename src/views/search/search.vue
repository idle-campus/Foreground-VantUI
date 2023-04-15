<!--搜索页面-->
<template>
  <div id="search">
    <!--    搜索框组件-->
    <searchModule :is-show="isShow_search_off" :ishome="ishome"></searchModule>
    <!--    搜索框组件end-->
    <!--    搜索历史区域-->

    <div style="margin-bottom: 40px;">
      <span class="title" style="float: left;"> 搜索历史 </span>
      <span
        style="float: right; margin-top: 3px; color:#C0C4CC;"
        @click="goClear()"
        v-if="this.oldKeywords != null"
      >
        清除
      </span>
    </div>

    <div id="history">
      <span
        style="color:#C0C4CC; display:block; text-align: center;"
        v-if="this.oldKeywords === null"
      >
        无历史记录
      </span>
      <van-button
        v-for="value in oldKeywords"
        :key="value"
        type="primary"
        size="mini"
        round
        color="#eeeded"
        style="margin-left: 8px"
        @click="goSearch(value)"
      >
        {{ value }}
      </van-button>
    </div>
    <!--    搜索历史区域end-->
    <!--     热门搜索区域-->
    <!-- <span class="title">
      热门搜索
    </span>
    <div>
      <van-tag
        color="#eeeded"
        size="large"
        style="margin: 10px;"
        text-color="#000"
        plain type="primary"
        v-for="value in Keywords" :key="value"
      >
        {{ value }}
      </van-tag>
    </div> -->
    <!--     热门搜索区域end-->
  </div>
</template>

<script>
import searchModule from '../../components/searchModule'
// import {getKeyword} from '../../api/api'

export default {
  name: 'search',
  components: { searchModule },
  data() {
    return {
      isShow_search_off: true,
      ishome: false,
      // Keywords: [],//热门搜索
      oldKeywords: [] //搜索历史
    }
  },
  methods: {
    //获取历史搜索
    getOldKeywords() {
      this.oldKeywords = JSON.parse(window.localStorage.getItem('oldKeywords'))
    },
    //点击搜索按钮跳转到商品列表
    goSearch(val) {
      this.$router.push({
        name: 'productList',
        query: {
          keyword: val
        }
      })
    },

    goClear() {
      localStorage.removeItem('oldKeywords')
      this.getOldKeywords()
    }
  },
  mounted() {
    //获取历史搜索
    this.getOldKeywords()
    //获取热门搜索
    // getKeyword().then(res => {
    //   if (res.status !== 200) {
    //     this.$toast.fail('获取热门搜索数据失败')
    //     return
    //   }
    //   this.Keywords = res.data
    // })
  }
}
</script>

<style lang="less">
#search {
  background-color: white;

  .title {
    display: block;
    color: #0e0e0e;
    font-weight: bold;
    margin: 5px;
  }

  .van-button__text {
    color: #696969;
  }

  #history {
    margin-top: 30px;
    .van-button {
      padding: 10px;
    }
  }
}
</style>
