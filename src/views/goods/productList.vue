<!--商品列表-->
<template>
  <div id="productList">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    筛选条件-->
    <van-tabbar v-model="active" :fixed="false" class="condition">
      <van-tabbar-item name="home" @click="onClick(1)">综合</van-tabbar-item>
      <van-tabbar-item name="search" @click="onClick(2)">价格<span>{{ priceSort === 'asc' ? '降序' : '升序' }}</span>
      </van-tabbar-item>
      <van-tabbar-item name="friends" @click="onClick(3)">新品</van-tabbar-item>
    </van-tabbar>
    <!--    筛选条件end-->
    <!--    为空时显示-->
    <van-empty v-if="listProds.length < 1" description="暂无商品"/>
    <!--    为空时显示end-->
    <!--    商品宫格-->
    <van-grid :border="false" :column-num="2" gutter="10">
      <van-grid-item v-for="value in listProds" :key="value.id"
                     :to="{path:'/productDetails', query: { productId: value.id }}">
        <van-image
          height="160"
          fit="cover"
          :src='img_url + value.image'/>
        <div class="productName">
          {{ value.storeName }}
        </div>
        <div class="productPrice">
          ￥{{ value.price }}
        </div>
      </van-grid-item>
    </van-grid>
    <!--    商品宫格end-->
    <!--    Divider 分割线-->
    <van-divider v-if="listProds.length > 9" @click="move(name,val)">点击加载更多</van-divider>
    <!--    Divider 分割线end-->
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getGoodsList, IMG_URL} from '../../api/api'

export default {
  name: "productList",
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '商品列表',
      active: 'home',
      name: null,//参数名,用来添加新的参数
      val: null,//参数内容
      queryParam: {
        sid: '',//分类id
        // isIntegral: 0, //是否积分兑换商品
      },
      limit: 10,
      listProds: [],//商品分类数据
      priceSort: 'asc'
    }
  },
  mounted() {
    /*搜索栏进行搜索*/
    if (this.$route.query.keyword != null) {
      // console.log(this.$route.params.keyword)
      //搜索词
      this.queryParam['keyword'] = this.$route.query.keyword
    }
    /*搜索栏进行搜索end*/
    /*分类查询商品列表*/
    if (this.$route.query.sid != null) {
      // console.log(this.$route.params.sid)
      //搜索词
      this.queryParam['sid'] = this.$route.query.sid
    }
    /*分类查询商品列表end*/
    this.getlist(this.queryParam) //获取数据
  },
  methods: {
    move(name, val) {
      console.log('move')
      if (name == this.name) {
        this.limit += 10
      } else {
        // 说明参数名改变，页大小重置
        // console.log('')
        //添加新的查询参数
        this.limit = 10
        // console.log(this.limit)
      }
      /*将传来的参数进行同步*/
      this.name = name
      this.val = val
      /*将传来的参数进行同步end*/
      let map = {}
      Object.assign(map, this.queryParam);//复制查询参数
      map[name] = val //添加新的参数
      map['limit'] = this.limit //页大小
      this.getlist(map)
    },
    /*查询商品数据*/
    getlist(queryParam) {
      getGoodsList(queryParam).then(res => {
        console.log(res)
        this.listProds = res.data.content
      })
    },
    /*判断点击的按钮*/
    onClick(id) {
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
        this.move('news', 1)
      }
      /*
      TODO 应该是图标的class
      else if (id == 4) {
        if (this.salesSort == 'desc') {
          this.salesSort = 'asc'
          this.move('salesSort', 'desc')
        } else {
          this.salesSort = 'desc'
          this.move('salesSort', 'asc')
        }
      }*/
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

}
</style>
