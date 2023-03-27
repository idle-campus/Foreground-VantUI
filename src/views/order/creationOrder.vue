<!--创建订单页面-->
<template>
  <div>
    <div id="creationOrder">
      <!--    顶部标题-->
      <van-sticky>
        <TopTitle :ificon="ificon" :t_name="title"/>
      </van-sticky>
      <!--    顶部标题end-->
      <!--    选择地址-->
      <!--    控制面板的显示，和显示地址-->
      <van-cell is-link title="请选择地址" @click="showaddr = true" v-if="!ifaddress"/>
      <!--联系人列表信息-->
      <van-cell is-link @click="showaddr = true" v-if="ifaddress">
        <template #title>
          <span>{{ chooseAddress.realName }}</span>
          <span>{{ chooseAddress.phone }}</span>
        </template>
        <template #label>
          <span>
            {{ chooseAddress.province }}
            {{ chooseAddress.city }}
            {{ chooseAddress.district }}
            {{ chooseAddress.detail }}
          </span>
        </template>
      </van-cell>
      <!--联系人列表信息end-->
      <!--    控制面板的显示，和显示地址end-->
      <van-action-sheet v-model="showaddr" @select="onSelect">
        <!--      添加联系人-->
        <van-contact-card type="add" @click="onAdd"/>
        <!--      添加联系人end-->
        <!--      选择联系人面板-->
        <van-contact-card
          v-for="val in address" :key="val.id"
          :name="val.realName"
          :tel="val.phone"
          type="edit"
          @click="onEdit(val)"
        />
        <!--      选择联系人面板end-->
      </van-action-sheet>
      <!--    选择地址end-->

      <!--    商品卡片-->
      <!--
      :desc=描述信息
      :num=数量
      :price=单价
      :thumb=图片
      :title=商品名称
      -->
      <van-card
        v-for="val in cartInfo" :key="val.id"
        :desc="val.productInfo.storeInfo"
        :num="val.cartNum"
        :price="(val.vipTruePrice)"
        :thumb='img_url+val.productInfo.image'
        :title="val.productInfo.storeName"
      >
        <template #tags>
          <!--        规格-->
          <van-tag plain type="danger">{{ val.productInfo.attrInfo.sku }}</van-tag>
        </template>
      </van-card>
      <!--    商品卡片end-->

      <!--    优惠券-->
      <van-cell is-link title="优惠券" @click="showcoupon = true"/>
      <van-action-sheet v-model="showcoupon" @select="onSelect">
        <div style="height: 200px">
          优惠券列表
        </div>
      </van-action-sheet>
      <!--    优惠券end-->
      <!--    隐藏的信息-->
      <template>
        <van-cell title="商品价格" :value="(totalPrice) "/>
        <van-cell title="优惠" value=""/>
        <van-cell title="运费" value="免邮费"/>
        <van-field v-model="remark" label="备注" placeholder="请输入备注"/>
      </template>
      <!--    隐藏的信息end-->

      <!--    支付方式-->
      <template>
        <van-radio-group v-model="radio">
          <van-cell class="pay" title="余额" icon="shop-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #label>
              ￥{{ userInfo.nowMoney }}
            </template>
            <template #right-icon>
              <van-radio name="1"></van-radio>
            </template>
          </van-cell>
          <van-cell title="微信" icon="shop-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #label>
              暂未开通
            </template>
            <template #right-icon>
              <van-radio name="2"></van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </template>
      <!--    支付方式end-->
    </div>
    <!--提交订单-->
    <van-submit-bar
      style="height: 50px"
      :price="(totalPrice) * 100"
      button-text="提交订单" @submit="onSubmit"/>
    <!--提交订单end-->
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {Toast} from 'vant';
import {getAddress, IMG_URL, postOrderComputed, postOrderConfirm, postOrderCreate} from '../../api/api'

export default {
  name: "creationOrder",
  components: {TopTitle},
  data() {
    return {
      img_url: IMG_URL,
      title: '创建订单',
      ificon: false,
      showaddr: false,//地址选择弹框
      showcoupon: false,
      remark: '',
      orderKey: '',//订单的标识（ID)
      cartInfo: [],//商品信息数据
      userInfo: {},//用户信息
      totalPrice: 0,//总价
      priceGroup: {},//订单的汇总信息
      address: [],//地址信息
      ifaddress: false,//控制地址详情的显示
      chooseAddress: {},//选中的地址详情的显示
      radio: '1',//支付方式
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
    onAdd() {
      Toast('新增联系人');
    },
    // 选择联系人
    onEdit(val) {
      // Toast('选择联系人');
      // console.log(val)
      this.chooseAddress = val
      //计算总价
      postOrderComputed({
        addressId: val.id,//地址的ID
        couponId: null,//优惠券ID,功能为实现
        key: this.orderKey,//确认订单的key
        payType: 'yue',//支付方式 TODO 不知为何写死
        shipping_type: 1,//配送方式 1=快递 ，2=门店自提
      }).then(res => {
        console.log(res)
      })
      //隐藏初始选择框
      this.ifaddress = true
      //关闭地址选择框
      this.showaddr = false
    },
    // 提交订单
    onSubmit() {
      // this.$router.push('/paySuccess')
      postOrderCreate({
        addressId: this.chooseAddress.id,//地址的ID
        couponId: 0,//优惠券ID,功能为实现
        key: this.orderKey,//确认订单的key
        payType: 'yue',//支付方式 TODO 不知为何写死
        shippingType: '1',//配送方式 1=快递 ，2=门店自提
        useIntegral: 0, //使用积分 1-表示使用
        mark: '',//备注
        from: 'h5',//来源
        pinkId: 0,//拼团id 0没有拼团
      }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$toast.success(res.msg)
          setTimeout(() => {
            this.$router.replace('/paySuccess')
          }, 3000)

        } else {

          this.$toast.fail(res.msg)
        }
      })
    },
  },
  mounted() {
    let cartIds = this.$route.query.cartId
    if (cartIds == null) {
      this.$toast.fail('参数有误')
      return
    }
    let ids = [] //提交的购买参数
    ids = cartIds.split(',')
    postOrderConfirm({
      cartId: ids
    }).then(res => {
      // console.log(res)
      this.cartInfo = res.data.cartInfo
      this.userInfo = res.data.userInfo
      this.orderKey = res.data.orderKey
      this.priceGroup = res.data.priceGroup
      this.totalPrice = this.priceGroup.totalPrice
      //获取地址
      getAddress().then(res => {
        // console.log(res)
        this.address = res.data
      })
    })
  }
}
</script>

<style lang="less" scoped>
#creationOrder {
  padding-bottom: 50px;

  & > .van-cell {
    width: 95%;
    margin: 0 auto;
  }

  & > div:nth-child(2) {
    margin-top: 8px;
  }

  & > .van-card {
    width: 95%;
    margin: 0 auto;
    background-color: white;
    margin-top: 8px;
  }

  .pay {
    margin-top: 8px;
  }
}
</style>
