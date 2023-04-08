<!--商品分类界面-->
<template>
  <div id="categories">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title"/>
    </van-sticky>
    <!--    顶部标题end-->
    <van-row>
      <!--      侧边导航条-->
      <van-col span="6">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="category in goodsCategory"
            :key="category.id" :title="category.name"
            :src='img_url+category.icon'
            @click="tab_item(category.id)"
          />
        </van-sidebar>
      </van-col>
      <!--      侧边导航条end-->
      <!--      商品分类详情-->
      <van-col span="18">
        <van-grid square :column-num="3" clickable id="grid">
          <van-grid-item v-for="children in category_children" :key="children.id">
            <van-image
              width="4rem"
              height="4rem"
              fit="cover"
              :src='img_url+children.icon'
              @click="goSearch(children.id)"
            />
            <span>{{ children.name }}</span>
          </van-grid-item>
        </van-grid>
      </van-col>
      <!--      商品分类详情end-->
    </van-row>
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getCategory, IMG_URL} from '../../api/api'

export default {
  name: "categories",
  components: {TopTitle},
  data() {
    return {
      title: '商品分类',
      activeKey: 0,
      img_url: IMG_URL,//图片主机地址
      goodsCategory: [],//分类数据
      category_children: [],//二级分类数据
    }
  },
  methods: {
    //切换二级分类
    tab_item(id) {
      let newCategory = this.goodsCategory.filter(item => item.id === id)
      // console.log(newCategory)
      this.category_children = newCategory[0].children
    },
    //点击分类跳转到商品列表
    goSearch(val) {
      this.$router.push({
        name: 'productList',
        // sid: val
        query: {
          sid: val
        }
      })
    }
  },
  mounted() {
    getCategory().then(res => {
      this.goodsCategory = res.data //初始化分类数据
      this.tab_item(res.data[0].id)//初始化二级分类数据
    })
  }
}
</script>

<style lang="less" scoped>
#categories {
  background-color: white;

  .van-sidebar-item--select {
    color: #409EFF;

  }

  .van-sidebar-item {
    background-color: white;
  }
  .van-sidebar-item--select::before {
    background-color: #409EFF;
}

  #title {
    text-align: center;
    font-weight: bolder;
    font-size: 16px;
  }

  #grid {
    margin-top: 12px;
  }
}
</style>
