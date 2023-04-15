<!--主页-->
<template>
  <div id="home">
    <!-- 搜素框-->
    <van-sticky>
      <searchModule :is-show="isShow_search_off" :ishome="ishome" />
    </van-sticky>

    <!-- 轮播图-->
    <div id="my-swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(banner, index) in banners" :key="index">
          <img :src="img_url + banner.pic" width="100%" height="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 功能图标-->
    <!-- <van-grid square clickable :border="false" style="margin-top: 9px">
      <van-grid-item
        v-for="(menus, index) in menuss"
        :key="index"
        :icon="img_url + menus.pic"
        :text="menus.name"
        :to="menus.url"
        @click="goMenus(menus.value, menus.url)"
      />
    </van-grid> -->

    <!-- 商品列表-->
    <div id="shoplist" style="margin-top: 10px">
      <van-row class="shoptitle">
        <van-tag mark type="primary" size="large">闲置推荐</van-tag>
      </van-row>

      <van-grid :column-num="2" clickable :border="false">
        <van-grid-item
          v-for="(val, index) in HotLists"
          :key="index"
          :to="{ path: '/productDetails', query: { goodsId: val.id } }"
        >
          <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            :src="img_url + val.photo"
          />
          <van-row>
            <van-col span="24" class="shopname">{{ val.name }}</van-col>
          </van-row>
          <van-row class="price">
            <span class="newprice">￥{{ val.sellPrice }}</span>
            <span class="oldprice">￥{{ val.buyPrice }}</span>
          </van-row>
        </van-grid-item>
      </van-grid>
    </div>

    <div id="shopnew" style="margin-top: 10px">
      <van-row class="shoptitle">
        <van-tag mark type="primary" size="large">最新发布</van-tag>
      </van-row>

      <van-card
        v-for="(val, index) in News"
        :key="index"
        :price="val.sellPrice"
        :desc="val.content"
        :title="val.name"
        :thumb="img_url + val.photo"
        :origin-price="val.buyPrice"
        @click="goProData(val.id)"
      >
        <template #tag>
          <!-- <van-icon name="new" color="red" size="30"/><br> -->
          <van-tag plain type="danger">New</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import searchModule from '../../components/searchModule'
import {
  getBanner,
  getFindByHot,
  getFindByNew,
  getMenus,
  IMG_URL
} from '../../api/api'

export default {
  name: 'home',
  components: { searchModule },

  data() {
    return {
      isShow_search_off: false,
      ishome: true,
      banners: [], //轮播图信息
      img_url: IMG_URL, //图片主机地址
      menuss: [], //首页菜单
      HotLists: [], //首页闲置推荐
      News: [] //首页最新发布
    }
  },

  methods: {
    goMenus(val, url) {
      // if (val === '/') {
      //   this.$toast.fail('页面未开发')
      // }
      // console.log(val)
      // console.log(url)
      let jsonStr = {}
      jsonStr = eval(`(` + val + `)`)
      console.log('jsonStr' + jsonStr)
      console.log('jsonStr.path===' + jsonStr.path)
      // this.$router.push({ path: url, query: { val } })
      this.$router.push({ path: jsonStr.path })
    },

    onSearch(val) {
      Toast(val)
    },

    onCancel() {
      Toast('取消')
    },

    goSearch() {
      this.$router.push('/search')
    },

    goProData(id) {
      this.$router.push({ path: '/productDetails', query: { goodsId: id } })
    },

    init() {
      getBanner().then((res) => {
        if (res.code === '200') {
          this.banners = res.data
        } else {
          this.$toast.fail('获取首页轮播图失败')
        }
      })

      //首页菜单图标
      getMenus().then((res) => {
        if (res.code === '200') {
          this.menuss = res.data
        } else {
          this.$toast.fail('获取首页菜单图标失败')
        }
      })

      //首页闲置推荐
      getFindByHot().then((res) => {
        if (res.code === '200') {
          this.HotLists = res.data
          console.log(this.HotLists)
        } else {
          this.$toast.fail('获取首页精品推荐失败')
        }
      })

      //首页最新发布
      getFindByNew().then((res) => {
        if (res.code === '200') {
          this.News = res.data
        } else {
          this.$toast.fail('获取首页最新发布失败')
        }
      })
    }
  },
  mounted() {
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
    padding-left: 10px;
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
