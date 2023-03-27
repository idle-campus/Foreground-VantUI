<!--订单支付页面-->
<template>
  <div id="paySuccess">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :ificon="ificon" :t_name="title"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    提示信息-->
    <div class="content">
      <van-icon name="checked" size="100" color="#fa436a"/>
      <span style="font-size: medium; color: #fa436a; ">订单已生成！</span>
      <div class="btn">
        <van-button style="background-color: #fa436a;color: #FFFFFF;" block to="/order">查看订单</van-button>
        <van-button block to="/">返回首页</van-button>
      </div>
    </div>
    <!--    提示信息end-->
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";

export default {
  components: {TopTitle},
  name: 'paySuccess',
  data() {
    return {
      title: '支付成功',
      ificon: false
    }
  },
  created() {
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tit {
  font-size: 20px;
  color: #303133;
}

.btn {
  width: calc(100% - 60px);
  margin: 45px auto;
}

.btn button {
  margin-top: 15px;
}
</style>
