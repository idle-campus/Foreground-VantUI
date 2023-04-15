<!--商品列表-->
<template>
  <div id="productList">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" />
    </van-sticky>
    <!--    顶部标题end-->
    <!--    筛选条件-->
    <van-tabbar v-model="active" :fixed="false" class="condition">
      <van-tabbar-item name="home" @click="onClick(1)">综合</van-tabbar-item>
      <van-tabbar-item name="search" @click="onClick(2)"
        >价格<span>{{ priceSort === 'asc' ? '降序' : '升序' }}</span>
      </van-tabbar-item>
      <van-tabbar-item name="recommends" @click="onClick(3)"
        >推荐</van-tabbar-item
      >
    </van-tabbar>
    <!--    筛选条件end-->
    <!--    为空时显示-->
    <van-divider v-if="goodsList.length < 1">暂无闲置</van-divider>
    <!--    为空时显示end-->
    <!--    商品宫格-->
    <van-grid :border="false" :column-num="2" gutter="10">
      <van-grid-item
        v-for="value in goodsList"
        :key="value.id"
        :to="{ path: '/productDetails', query: { goodsId: value.id } }"
      >
        <van-image height="160" fit="cover" :src="img_url + value.photo" />
        <div class="productName">
          {{ value.name }}
        </div>
        <!-- <div class="productPrice">
          ￥{{ value.sellPrice }}
        </div> -->
        <div class="price">
          <!--            当前价格-->
          <span class="newprice">￥{{ value.sellPrice }}</span>
          <!--            历史价格-->
          <span class="oldprice">￥{{ value.buyPrice }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <!--    商品宫格end-->
    <!--    Divider 分割线-->
    <van-divider
      v-if="this.goodsList.length > 9 && this.goodsList.length < this.listTotal"
      @click="move(name, val)"
      >点击加载更多
    </van-divider>

    <van-divider
      v-if="
        this.goodsList.length === this.listTotal && this.goodsList.length > 1
      "
      @click="noMore()"
      >闲置见底啦！！！
    </van-divider>

    <!-- <br /><br />
    <van-divider v-if="goodsList.length > 9" @click="movePageNum(name, val)"
      >点击加载更多~PageNum
    </van-divider> -->

    <!--    Divider 分割线end-->
  </div>
</template>

<script>
import TopTitle from '../../components/topTitle'
import { getGoodsList, IMG_URL } from '../../api/api'

export default {
  name: 'productList',
  components: { TopTitle },
  data() {
    return {
      img_url: IMG_URL,
      title: '闲置推荐',
      active: 'home',
      name: null, //参数名,用来添加新的参数
      val: null, //参数内容
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
      goodsList: [], //数据
      listTotal: 0, //总条数
      priceSort: 'asc',
      pageNum: 1,
      pageSize: 10
    }
  },
  mounted() {
    // if (this.$route.query.allGoods != null) {
    //   console.log(this.$route.params.allGoods)
    //   this.queryParam['allGoods'] = this.$route.query.allGoods
    // }
    /*搜索栏进行搜索*/
    if (this.$route.query.keyword != null) {
      //搜索词
      this.queryParam['keyword'] = this.$route.query.keyword
    }
    /*分类查询商品列表*/
    if (this.$route.query.sid != null) {
      this.queryParam['sid'] = this.$route.query.sid
    }
    this.getList(this.queryParam) //获取数据
  },
  methods: {
    noMore() {
      this.$toast({
        message: '闲置见底啦！！！\n不要再点击了哦~',
        position: 'bottom'
      })
    },

    move(name, val) {
      if (name == this.name) {
        this.pageNum += 1
      } else {
        // 说明参数名改变，页大小重置)
        //添加新的查询参数
        this.pageNum = 1
      }
      /*将传来的参数进行同步*/
      this.name = name
      this.val = val
      /*将传来的参数进行同步end*/
      let map = {}
      Object.assign(map, this.queryParam) //复制查询参数
      map[name] = val //添加新的参数
      map['pageNum'] = this.pageNum //页大小
      map['pageSize'] = this.pageSize //每页数量
      this.getList(map)
    },
    /*查询商品数据*/
    getList(queryParam) {
      getGoodsList(queryParam).then((res) => {
        this.goodsList = this.goodsList.concat(res.data.records)
        this.listTotal = res.data.total
      })
    },
    /*判断点击的按钮*/
    onClick(id) {
      //初始化
      this.goodsList = []
      this.pageNum = 0
      this.listTotal = 0
      if (id === 1) {
        this.move()
      } else if (id === 2) {
        /*按商品价格进行排序*/
        if (this.priceSort === 'desc') {
          this.priceSort = 'asc'
          this.move('priceOrder', 'desc')
        } else {
          this.priceSort = 'desc'
          this.move('priceOrder', 'asc')
        }
      } else if (id === 3) {
        this.move('recommend', 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#productList {
  background-color: #f0f0ee;
  height: 100%;

  .productName {
    font-size: 14px;
    margin: 8px 0;
  }

  .productPrice {
    font-weight: bolder;
    color: #ff8725;
  }

  .condition {
    width: 95%;
    margin: 5px auto;
    font-weight: bold;
  }

  .price {
    width: 88%;
    line-height: 19.8px;
    margin-top: 2px;
    text-align: center;
  }

  .newprice {
    color: #ff8725;
    font-size: large;
    font-weight: bold;
  }

  .oldprice {
    color: #c4c7d3;
    font-size: 12px;
    text-decoration: line-through;
  }
}
</style>
