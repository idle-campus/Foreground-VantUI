<!--我的闲置页面-->
<template>
  <div id="orderType">
     <!--    顶部标题-->
    <van-sticky>
      <!-- <TopTitle :t_name="title" :ificon="ificon"/> -->
      <van-nav-bar
      :title= this.title
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="wap-home" size="18" />
      </template>
    </van-nav-bar>

    </van-sticky>
    <!--    顶部标题end-->
    <!--    顶部标题end-->
    <van-tabs v-model="activetab">
      <van-tab title="我发布的" name="1">
        <div  v-if="activetab === '1' "></div>
      </van-tab>
      <van-tab title="我卖出的" name="2">
        <div  v-if="activetab === '2' "></div>
      </van-tab>
      <van-tab title="审核不通过" name="3">
        <div  v-if="activetab === '3' "></div>
      </van-tab>
      <van-tab title="已下架" name="0">
        <div v-if="activetab === '0' "></div>
      </van-tab>
    </van-tabs>




    <van-cell-group v-for="val in goodsList" :key="goodsList.index" id="listbox">
      <!--
      val.createTime 订单创建时间
      val.statusDto.title 发货状态
      -->
      <!-- <van-cell :border="false" :title="val.createTime" size="large" /> -->
      <van-cell size="large">
        <template #default>
          <!--            商品卡片-->
          <van-card
            id="shopCard"
            :price="val.sellPrice"
            :origin-price="val.buyPrice"
            :desc="val.content"
            :title="val.name"
            :thumb="img_url + val.photo"
            class="goods-card"
          >
          <template #tags>
            <van-tag plain type="success" v-if="val.status === 1 && val.isVerify === 0">待审核</van-tag>
            <van-tag plain type="danger" v-if="val.isViolation === 1 && val.isVerify === 1">审核不通过</van-tag>
            <van-tag plain type="warning" v-if="val.isViolation === 1 && val.isVerify === 0">再次审核中</van-tag>
            <van-tag plain type="primary" v-if="val.status === 2 ">卖出啦</van-tag>
            <van-tag plain color="#909399" v-if="val.status === 0 ">已下架</van-tag>
            <van-tag mark  type="danger" size="medium"  v-if="val.isViolation === 1">原因：</van-tag>
            <van-tag round   color="#fff" size="medium" text-color="#000" v-if="val.isViolation === 1">{{ val.verifyContent }}</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" @click="Edit(val)" v-if="val.status === 1 ">编辑</van-button>
            <van-button size="mini" @click="EditIsViolation(val)" v-if="val.isViolation === 1 && val.isVerify == 1">修改</van-button>
            <van-button size="mini" @click="Sold(val.id)" v-if="val.status === 1 && val.isVerify === 1">确认售出</van-button>
            <van-button size="mini" @click="Down(val.id)" v-if="val.status === 1 ">下架</van-button>
            <van-button size="mini" @click="AgainUp(val.id)" v-if="val.status === 0 && val.isViolation === 0">重新上架</van-button>
            <van-button size="mini" @click="Del(val.id)">删除</van-button>
          </template>
            <!--            自定义右下角内容end-->
          </van-card>
          <!--            商品卡片end-->
        </template>
      </van-cell>

    </van-cell-group>




  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getMyGoodsList, IMG_URL, myGoodsDel, myGoodsSold, myGoodsDown, myGoodsAgainUp} from '../../api/api'
// import myGoodsList from "./myGoodsList";

export default {
  name: 'myGoods',
  // components: {OrderTypeList, TopTitle},
  // components: {myGoodsList, TopTitle},
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '我的闲置',
      ificon: false,
      activetab: '-1',//被选中的标签
      numValue: '1',
      goodsList: {},//闲置数据
      //分页
      limit: 10,//页大小,默认为 10
      page: 1,//页码,默认为1
    }
  },
  filters: {
    //过滤器
    capittalizze(val) {
      let newVal = parseFloat(val).toFixed(2)
      return newVal
    },
  },
  watch: {
    activetab(newVal, oldCal) {
      this.getList(newVal)
    }
  },

  created() {
    this.getList()

  },

  methods: {
    getList(id) {
      getMyGoodsList({
        type: id,
        limit: 10,//页大小,默认为 10
        page: 1,//页码,默认为1
      }).then(res => {
        // this.goodsList = res.data.records
        this.goodsList = res.data

      })
    },
    updateWeb(){
      this.$router.push('/myGoods?type=1')
    },


    Sold(id){
      myGoodsSold(id).then(res => {
        if(res.code !== '200'){
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.$router.push('/mine')
        // this.$router.push('/myGoods?type=2')
      })
    },

    Down(id){
      myGoodsDown(id).then(res => {
        if(res.code !== '200'){
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.$router.push('/mine')
      //   this.$router.push({
      //   name: 'myGoods',
      //   // sid: val
      //   query: {
      //     type: 0
      //   }
      // })

      })
    },

    AgainUp(id){
      myGoodsAgainUp(id).then(res => {
        if(res.code !== '200'){
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.$router.push('/mine')

        // this.$router.push('/myGoods?type=0')
        // this.getList()

      })
    },

    Del(id){
      myGoodsDel(id).then(res => {
        if(res.code !== '200'){
          this.$toast.fail(res.msg)
        }
        this.$toast.success(res.msg)
        this.$router.push('/mine')
        // this.updateWeb()
        // this.getList(1)
      })
    },




    Edit(val) {
      this.$router.push({ path: '/editGoods', query: { val: val, title: "编辑我的闲置", type: 1} })
    },
    EditIsViolation(val) {
      this.$router.push({ path: '/editGoods', query: { val: val, title: "修改我的不通过闲置", type: 3 } })
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push( '/mine');
    },






  },
  mounted() {
    let id = this.$route.query.type
    this.activetab = id
  }
}
</script>

<style lang="less" scoped>
#orderType {
  // .van-cell-group {
  //   margin-top: 8px;
  // }

  .van-cell--large {
    padding-top: 4px;
    padding-bottom: 4px;
  }
}

#shopCard {
  background-color: white;
  padding: 4px 0;

  .van-card__thumb {
    margin-right: 20px;
  }

  .btn {
    height: 30px;
    border-radius: 7px;
  }
}


/deep/ .van-tabs__line {
    background-color: #409EFF;
}

</style>
