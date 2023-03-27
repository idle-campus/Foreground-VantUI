<!--主页-->
<template>
  <div id="home">
    <!--    搜素框-->
    <van-sticky>
      <searchModule :is-show="isShow_search_off" :ishome="ishome"></searchModule>
    </van-sticky>
    <!--    搜素框end-->
    <!--    轮播图-->
    <div id="my-swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(banner,index) in banners" :key="index">
          <!--          banner.pic 轮播图的地址-->
          <img v-lazy="img_url+banner.pic" width="100%" height="100%" preload/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    轮播图end-->
    <!--    功能图标-->
    <van-grid square clickable :border='false' style="margin-top: 9px">
      <van-grid-item v-for="(menus,index) in menuss" :key="index" :icon="img_url+menus.pic" :text="menus.name"
                     :to="menus.url" @click="goMenus(menus.url)"/>
    </van-grid>
    <!--    功能图标end-->
    <!--    商品列表-->
    <div id="shoplist" style="margin-top: 10px;">
      <van-row class="shoptitle">
        <van-col span="24">精品推荐：</van-col>
      </van-row>
      <van-grid :column-num="2" clickable :border='false'>
        <van-grid-item v-for="(val,index) in HotLists" :key="index"
                       :to="{path:'/productDetails', query: { productId: val.id }}">
          <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            :src='img_url + val.photo '
          />
          <van-row>
            <!--            商品名-->
            <van-col span="24" class="shopname">{{ val.name }}</van-col>
          </van-row>
          <van-row class="price">
            <!--            当前价格-->
            <span class="newprice">￥{{ val.sellPrice }}</span>
            <!--            历史价格-->
            <span class="oldprice">￥{{ val.buyPrice }}</span>
          </van-row>
        </van-grid-item>
      </van-grid>
    </div>
    <!--    商品列表end-->
    <!--    最新发布-->
    <div id="shopnew" style="margin-top: 10px;">
      <van-row class="shoptitle">
        <van-col span="24">最新发布：</van-col>
      </van-row>
      <!--
        storeInfo:描述信息
        storeName:商品标题
        otPrice:历史价格
      -->
      <van-card
        v-for="(val,index) in News" :key="index"
        tag="New"
        :price="val.sellPrice"
        :desc="val.content"
        :title="val.name"
        :thumb='img_url + val.photo '
        :origin-price="val.buyPrice"
        @click="goProDeta(val.id)"
      />
    </div>
    <!--    最新发布end-->
  </div>
</template>

<script>
import {Toast} from 'vant';
import searchModule from "../../components/searchModule";
// import {getBanner, getBoutiqueList, getLike, getMenus, IMG_URL} from '../../api/api'
import {getBanner, getFindByHot, getFindByNew, getMenus, IMG_URL} from '../../api/api'

export default {
  name: "home",
  components: {searchModule},
  data() {
    return {
      isShow_search_off: false,
      ishome: true,
      banners: [],//轮播图信息
      img_url: IMG_URL,//图片主机地址
      menuss: [], //首页菜单
      HotLists: [], //首页精品推荐
      News: [], //首页最新发布
    };
  },
  methods: {
    goMenus(val) {
      if (val === '/') {
        this.$toast.fail('页面未开发')
      }
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
    goSearch() {
      //去到搜索页
      this.$router.push('/search')
    },
    goProDeta(id) {
      // console.log('商品卡片被点击')
      this.$router.push({path: '/productDetails', query: {productId: id}})
    },
    init() {
      //首页轮播图
      getBanner().then(res => {
        if (res.code === '200') {
          // console.log(res)
          this.banners = res.data
        } else {
          this.$toast.fail('获取首页轮播图失败')
        }
      })
      //首页菜单图标
      getMenus().then(res => {
        if (res.code === '200') {
          // console.log(res)
          this.menuss = res.data
        } else {
          this.$toast.fail('获取首页菜单图标失败')
        }
      })
      //首页精品推荐
      // getBoutiqueList().then(res => {
      getFindByHot().then(res => {
        // console.log(res)
        if (res.code === '200') {
          // console.log(res)
          this.HotLists = res.data
          console.log(this.HotLists)
        } else {
          this.$toast.fail('获取首页精品推荐失败')
        }
      })
      //首页最新发布
      getFindByNew().then(res => {
        // if (res.status === 200) {
        if (res.code === '200') {
          // console.log(res)
          this.News = res.data
        } else {
          this.$toast.fail('获取首页最新发布失败')
        }
      })
    }
  },
  mounted() {
    //获取首页数据
    this.init()
  }
}
</script>

<style lang="less">
#home {

  #shopnew {
    .van-card {
      background-color: white;
      margin-top: 0;

      .van-card__price {
        color: #ff8725;
      }
    }
  }

  .shopname {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
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

  .shoptitle {
    background-color: white;
    padding-top: 5px;
    padding-left: 10px
  }

  #my-swipe {
    margin-top: 10px;
    height: 100%;
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
