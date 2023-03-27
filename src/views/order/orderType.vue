<!--总订单页面-->
<template>
  <div id="orderType">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <van-tabs v-model="activetab">
      <van-tab title="我发布的" name="0">
        <order-type-list :order-list="orderList" v-if="activetab === '0' "></order-type-list>
      </van-tab>
      <van-tab title="我卖出的" name="1">
        <order-type-list :order-list="orderList" v-if="activetab === '1' "></order-type-list>
      </van-tab>
      <van-tab title="审核不通过" name="2">
        <order-type-list :order-list="orderList" v-if="activetab === '2' "></order-type-list>
      </van-tab>
      <van-tab title="已下架" name="3">
        <order-type-list :order-list="orderList" v-if="activetab === '3' "></order-type-list>
      </van-tab>
      <van-tab title="已完成" name="4">
        <order-type-list :order-list="orderList" v-if="activetab === '4' "></order-type-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getOrderList, IMG_URL} from '../../api/api'
import OrderTypeList from "./orderTypeList";

export default {
  name: "orderType",
  components: {OrderTypeList, TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '我的闲置',
      ificon: false,
      activetab: '-1',//被选中的标签
      numValue: '1',
      orderList: {},//订单数据
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
      console.log("newVal:",newVal)
      console.log("oldCal:",newVal)
      this.getList(newVal)
    }
  },
  methods: {
    getList(id) {
      console.log("getListd的id:",id)
      getOrderList({
        type: id,
        limit: 10,//页大小,默认为 10
        page: 1,//页码,默认为1
      }).then(res => {
        console.log(res)
        this.orderList = res.data.content
      })
    }
  },
  mounted() {
    let id = this.$route.query.type
    // console.log(typeof id)
    this.activetab = id
  }
}
</script>

<style lang="less" scoped>
#orderType {
  .van-cell-group {
    //margin-top: 8px;
  }

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
</style>
