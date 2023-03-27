<!--订单详情页面-->
<template>
  <div id="order">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    顶部占位-->
    <div id="topplaceholder">
      <!--    背景图片 + 收货人-->
      <div id="topbg">
        <div id="text">
          {{ order.statusDto.msg }}
        </div>
        <!--        收货人-->
        <van-cell id="address">
          <template #title>
            <!--            收货人-->
            <span>{{ order.realName }}</span>
            <!--电话号码-->
            <span style="margin-left: 8px;">{{ order.userPhone }}</span>
          </template>
          <template #label>
            <!--            <span>地址</span>-->
            <span>{{ order.userAddress }}</span>
          </template>
        </van-cell>
        <!--        收货人end-->
      </div>
      <!--    背景图片 + 收货人end-->
    </div>
    <!--    顶部占位-->

    <!--订单信息-->
    <van-cell title="订单状态" :value="order.statusDto.title"/>
    <van-card
      :num="order.totalNum"
      :price="order.cartInfo[0].truePrice"
      :desc="order.cartInfo[0].productInfo.storeInfo"
      :title="order.cartInfo[0].productInfo.storeName"
      :thumb='img_url + order.cartInfo[0].productInfo.image'
    >
      <template #tags>
        <van-tag plain type="danger">{{ order.cartInfo[0].productInfo.attrInfo.sku }}</van-tag>
      </template>
    </van-card>
    <van-cell title="快递" value=""/>
    <van-cell title="订单号" :value="order.orderId"/>
    <van-cell title="下单时间" :value="order.createTime"/>
    <van-cell title="运费" :value="order.payPostage===0?'免运费':order.payPostage"/>
    <van-cell title="优惠" :value="order.payPostage===0?'无优惠':order.couponPrice"/>
    <van-cell title="总金额" :value="order.totalPrice"/>
    <van-cell title="支付方式" :value="order.statusDto.payType"/>
    <!--订单信息end-->

  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getOrderDetail, IMG_URL} from "../../api/api";

export default {
  name: "order",
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '订单详情',
      ificon: false,
      order: {},//订单详情信息
    }
  },
  created() {
    let key = this.$route.query.key
    console.log(key)
    getOrderDetail({
      key: key
    }).then(res => {
      console.log(res)
      this.order = res.data
    })
  }
}
</script>

<style lang="less" scoped>
#order {
  .van-card {
    margin-top: 0;
  }

  #topplaceholder {
    height: 150px;

    #topbg {
      width: 100%;
      background-image: url(../../../static/userBg.png);
      position: relative;

      #text {
        color: white;
        font-size: 16px;
        height: 90px;
        line-height: 90px;
        text-align: center;
      }

      #address {
        bottom: -60%;
        position: absolute;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
      }
    }

  }
}
</style>
