<template>
  <!--订单列表组将-->
  <div>
    <van-cell-group v-for="val in orderList" :key="orderList.id" id="listbox">
      <!--
      val.createTime 订单创建时间
      val.statusDto.title 发货状态
      -->
      <van-cell :border="false" :title="val.createTime" size="large" :value="val.statusDto.title"/>
      <van-cell size="large">
        <template #default>
          <!--            商品卡片-->
          <van-card
            id="shopCard"
            :num="val.totalNum"
            :price="val.totalPrice"
            v-for="shopcard in val.cartInfo"
            :key="shopcard.id"
            :desc="shopcard.productInfo.storeInfo"
            :title="shopcard.productInfo.storeName"
            class="goods-card"
            :thumb='img_url + shopcard.productInfo.image'
          >
            <template #tags>
              {{ shopcard.productInfo.attrInfo.sku }}
            </template>
            <!--            自定义右下角内容-->
            <template #footer>
              <van-button v-if="val.statusDto.type==0" class="btn"
                          @click="payOrder(val.orderId)">
                立即付款
              </van-button>
              <van-button v-if="val.statusDto.type==0" class="btn"
                          @click="cancelOrder(val.orderId)">
                取消订单
              </van-button>
              <van-button class="btn" v-if="val.statusDto.type==1"
                          @click="$toast.success('已提醒卖家发货！')">
                提醒发货
              </van-button>
              <van-button v-if="val.statusDto.type==2" class="btn"
                          @click="takeOrder()">确认收货
              </van-button>
              <van-button class="btn" :to='`/order?key=${val.unique}`'>立即查看</van-button>
              <van-button v-if="val.statusDto.type==4" class="btn"
                          @click="delOrder(val.orderId)">删除订单
              </van-button>
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
import {IMG_URL, postOrderCancel, postOrderDel, postOrderPay} from "../../api/api";

export default {
  name: "orderTypeList",
  data() {
    return {
      img_url: IMG_URL,
    }
  },
  props: ['orderList'],
  methods: {
    //取消订单
    cancelOrder(id) {
      postOrderCancel({
        id: id.toString()
      }).then(res => {
        console.log(res)
      })
    },
    //确认收货
    takeOrder() {
    },
    //删除订单
    delOrder(id) {
      postOrderDel({
        uni: id
      }).then(res => {
        if (res.status === 200) {
          this.$toast.success('删除成功')
        }
      })
    },
    //支付订单
    payOrder(id) {
      postOrderPay({
        from: "h5", //支付来源
        paytype: "yue", //支付渠道
        uni: id //订单ID
      }).then(res => {
        console.log(res)
      })
    }
  },

}
</script>

<style lang="less" scoped>
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

#listbox {
  margin-top: 5px;
}
</style>
