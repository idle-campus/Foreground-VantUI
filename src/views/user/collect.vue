<!--
我的收藏页面
我的足迹页面
-->
<template>
  <div id="collect">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <van-cell title=" " :value="text"
              @click="ifchecboxs==false?ifchecboxs=true:ifchecboxs=false;
              text=='管理'?text='取消':text='管理';
              result=[]"/> <!--result=[]  隐藏多选框时清除多选框的选中-->
    <van-checkbox-group v-model="result">
      <van-grid :column-num="2">
        <!--        :to="{path:'/productDetails', query: { productId: value.pid}}"-->
        <van-grid-item v-for="value in collectlist"
                       @click="goProductDetails(value.pid)"
                       :key="value.pid">  <!-- pid商品ID-->
          <!--          复选框-->
          <!-- @click.stop阻止冒泡，防止点击是跳转到商品详情页面-->
          <div @click.stop>
            <!--          绑定的是商品的id-->
            <van-checkbox class="checboxs" :name="value.pid" v-if="ifchecboxs">
            </van-checkbox>
          </div>
          <!--          复选框end-->
          <van-image
            height="12rem"
            fit="cover"
            :src="img_url+value.image"/>
          <van-cell id="shopname" :value="value.storeName"/>
          <van-cell id="shopprice" :value="value.price"/>
        </van-grid-item>
      </van-grid>
    </van-checkbox-group>
    <!--    批量操作-->
    <van-submit-bar button-text="删除" @submit="onSubmit" v-if="ifchecboxs">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
    <!--    批量操作end-->

  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getCollectAll, IMG_URL, postCollectDels} from '../../api/api'

export default {
  name: "collect",
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,//图片地址主机
      title: '我的收藏',
      ificon: false,
      text: '管理',
      result: [],//多选
      ifchecboxs: false,
      checked: false,
      queryType: 'collect',
      collectlist: [],//收藏列表 或 足迹列表
    };
  },
  methods: {
    onSubmit() {
      if (this.result.length <= 0) {
        this.$toast.fail('请选择删除内容')
        return
      }
      // console.log(this.result)
      // 将多选数组转为字符串
      let listId = JSON.stringify(this.result).replace('[', '').replace(']', '')
      //批量删除
      // console.log(listId)
      postCollectDels({
        category: this.queryType,
        ids: listId //字符串格式
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$toast.success('删除成功')
          //刷新数据
          this.result = [] //清除多选框的选中
          this.init()
        }
      })
    },
    goProductDetails(id) {
      this.$router.push({
        path: '/productDetails',
        query: {productId: id}
      })
    },
    //获取初始数据
    init() {
      getCollectAll({
        type: this.queryType
      }).then(res => {
        console.log(res)
        this.collectlist = res.data
      })
    }
  },
  mounted() {
    //设置标题
    if (this.$route.query.type == 'foot') {
      //我的足迹
      this.title = '我的足迹'
      this.queryType = 'foot'
    }
    //获取初始数据
    this.init();
  }
}
</script>

<style lang="less" scoped>
#collect {
  & > .van-cell {
    margin-top: 5px;
  }

  .van-checkbox {
    margin-right: 48%;
  }

  #shopname {
    padding: 5px 8px;

    .van-cell__value {
      //text-align: center;
    }

  }

  #shopprice {
    padding: 5px 8px;

    .van-cell__value {
      font-weight: bolder;
      color: #ff8725;
      font-size: 22px;
    }
  }

  .checboxs {
    position: absolute;
    z-index: 2;
    top: 20px;
    left: 10px;
  }

}
</style>
