<!--我的钱包页-->
<template>
  <div id="wallet">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    钱包信息-->
    <van-cell-group inset :border="false" :column-num="3" id="info">
      <van-row>
        <van-col span="8">
          <div class="title">
            <span> 总资产(元)</span>
            <br>
            <span>{{ balance.nowMoney }}</span>
          </div>
        </van-col>
        <van-col span="8">
          <div class="title">
            <span> 累计充值(元)</span>
            <br>
            <span>{{ balance.recharge }}</span>
          </div>
        </van-col>
        <van-col span="8">
          <div class="title">
            <span> 累计消费(元)</span>
            <br>
            <span>{{ balance.orderStatusSum }}</span>
          </div>
        </van-col>
      </van-row>
    </van-cell-group>
    <!--    钱包信息end-->

    <!--    充值按钮-->
    <van-cell-group inset id="recharge">
      <van-cell icon="shop-o" v-for=" val in rechargePriceWays" :key="val.id">
        <template #title>
          充值{{ val.value.price }}送多少{{ val.value.give_price }}
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-button :loading="isClick" type="danger" size="small" round @click="rechargeBut(val.id)">充值</van-button>
        </template>
      </van-cell>
    </van-cell-group>

    <!--    充值按钮end-->
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getBalance, getRechargeIndex, postRechargeTest} from '../../api/api'

export default {
  name: "wallet",
  components: {TopTitle},
  data() {
    return {
      title: '我的钱包',
      ificon: false,
      balance: {
        is_hide: "",//不明白
        recharge: 0.0,//累计充值金额
        nowMoney: 0.0,//余额
        orderStatusSum: 0.0//消费总额
      },
      rechargePriceWays: [], //充值方案全部
      //rechargePriceWaysVal: [],//充值内容
      isClick: false,//充值按钮是否被禁用
    }
  },
  mounted() {
    //获取用户的钱包信息
    this.getUserBalance()
    //获取充值方案
    getRechargeIndex().then(res => {
      console.log(res)
      this.rechargePriceWays = res.data.rechargePriceWays
    })
  },
  methods: {
    //模拟充值
    rechargeBut(id) {
      this.isClick = true
      postRechargeTest({
        rechar_id: id.toString()
      }).then(res => {
        if (res.status == 200) {
          this.$toast.success(res.data)
          this.getUserBalance()
          this.isClick = false
        } else {
          this.$toast.fail(res.data)
          this.isClick = false
        }
      })
    },
    //获取用户的钱包信息
    getUserBalance() {
      getBalance().then(res => {
        this.balance = res.data
      })
    },

  }
}
</script>

<style lang="less" scoped>
#wallet {
  #info {
    text-align: center;
    margin: 5px;
    height: 58px;
    background-color: black;

    .van-row {
      margin-top: 6px;
    }
  }

  #recharge {
    margin: 5px;

    .van-icon {
      font-size: 20px;
      margin-top: 4px;
    }

    .van-cell__title {
      line-height: 32px;
    }

    .van-button {
      width: 80px;
    }
  }

  .title {
    color: #F0AD4E;

    & > span:nth-child(1) {
      display: block;
    }

    font-size: 0.32rem;
  }

  .nums {
    font-size: 0.32rem;
  }
}
</style>
