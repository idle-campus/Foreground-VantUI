<!--购物车-->
<template>
  <div id="shopCart">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    为空时显示-->
    <!--    <van-empty description="购物车为空"/>-->
    <!--    为空时显示end-->
    <!--    购物车卡片-->
    <van-checkbox-group id="shopCard" v-model="result" ref="checkbox">
      <van-checkbox :name="value.id" v-for="value in cartList" :key="value.id" label-disabled>
        <van-swipe-cell>
          <!--          商品卡片-->
          <!--
               num 数量
               price="2.00" 价格
               desc="描述信息"
               title="商品标题"-->
          <van-card
            :num="value.cartNum"
            :price="value.productInfo.price"
            :desc="value.productInfo.storeInfo"
            :title="value.productInfo.storeName"
            class="goods-card"
            :thumb='img_url+value.productInfo.image'
          >
            <template #tags>
              <!--              商品规格-->
              <van-tag plain type="danger">
                {{ value.productInfo.attrInfo.sku }}
              </van-tag>
            </template>
            <!--            自定义右下角内容-->
            <template #footer>
              <!--              步进器-->
              <van-stepper v-model="value.cartNum" integer async-change @change="onChange(value)"/>
            </template>
            <!--            自定义右下角内容end-->
          </van-card>
          <!--          商品卡片end-->

          <!--          删除键-->
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delCar(value.id)"/>
          </template>
          <!--          删除键end-->

        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>
    <!--    购物车卡片-->
    <!--    提交订单栏-->
    <van-submit-bar :price="money" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="selectAll(checked)">全选</van-checkbox>
      <template #tip>
        左划可以删除 <span @click="onClickEditAddress">按钮点击事件</span>
      </template>
    </van-submit-bar>
    <!--    提交订单栏end-->

  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getCartList, IMG_URL, postCartDelList, postUpCartNum} from '../../api/api'

export default {
  name: "shopCart",
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '购物车',
      result: [],//多选框绑定数据
      numValue: 1,
      checked: false,
      cartList: [],//有效购物车列表
      nocartList: [],//失效购物车列表
      money: 0,
    }
  },
  methods: {
    // 删除商品
    delCar(id) {
      postCartDelList({
        ids: [id]
      }).then(res => {
        if (res.status === 200) {
          this.$toast.success('删除成功')
          this.result = []//清除多选
          this.getCart()//刷新数据
        }
      })
    },
    //提示的点击事件
    onClickEditAddress() {

    },
    //全选按钮点击事件
    selectAll(val) {
      //全选 或 全不选
      // console.log(val)
      this.$refs.checkbox.toggleAll(val)
    },
    //提交订单
    onSubmit() {
      if (this.result.length >= 1) {
        this.$router.push({
          name: 'creationOrder',
          query: {
            cartId: this.result.toString()
          }
        })
      } else {
        this.$toast.fail('最少选择一样商品')
      }
    },
    //修改购物车数量
    onChange(val) {
      //传参整个商品对象
      // console.log(val)
      this.$toast.loading({forbidClick: true});
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$toast.clear();
        // 注意此时修改 value 后会再次触发 change 事件
        if (val.cartNum > 0 && val.cartNum != null) {
          postUpCartNum({
            number: val.cartNum,
            id: val.id
          }).then(res => {
            // console.log(res)
            this.computeMoney()
          })
        }
      }, 500);
    },
    //计算金额
    computeMoney() {
      //计算金额
      let money = 0
      for (let i = 0; i < this.result.length; i++) {
        let choice = this.result[i]
        for (let l = 0; l < this.cartList.length; l++) {
          let cart = this.cartList[l]
          if (choice === cart.id) {
            // console.log(cart.id)
            let valMoney = (cart.cartNum * cart.vipTruePrice)
            money = money + valMoney
            // console.log('money', money)
            break
          }
        }
      }
      this.money = money * 100
    },
    //获取购物车列表
    getCart() {
      getCartList().then(res => {
        // console.log(res)
        this.cartList = res.data.valid //有效购物车列表
        this.nocartList = res.data.invalid //失效购物车列表
      })
    }
  },
  watch: {
    //侦听多选,计算金额
    result() {
      //计算金额
      this.computeMoney()
      //判断多选状态
      this.checked = this.result.length === this.cartList.length && this.result.length !== 0;
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style lang="less" scoped>
#shopCart {
  min-height: 100%;
  background-color: white;
  position: absolute;
  left: 0;
  right: 0;

  #shopCard {
    margin: 0 10px;
    margin-bottom: 84px;

    .van-card__price {
      color: red;
      font-weight: bolder;
    }

    .van-checkbox {
      margin: 10px 0;
      background-color: #fafafa;
    }

    /deep/ .van-checkbox__label {
      width: 100%;
    }
  }

  /deep/ .goods-card {
    margin: 0;
    //background-color: white;
  }

  /deep/ .delete-button {
    height: 100%;
  }
}

</style>
