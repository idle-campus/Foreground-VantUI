<template>
  <div>
    <div id="releaseGoods_title">
      <p>发布闲置</p>
    </div>


    <van-form @submit="onSubmit">
    <!-- 上传闲置物品图片 -->
    <van-field name="uploader" label="上传图片" center>
      <template #input>
        <van-uploader v-model="uploader" :max-count="4"
        :action= upGoodsPhoto
        :on-success="handleGoodsSuccess"
        />

      </template>
    </van-field>
    <!-- 上传闲置物品图片end -->

    </van-form>


  </div>
</template>


<script >
import {releaseGoods, upGoodsPhoto} from "../../api/api";

export default {
  name:"releaseGoods",
  data() {
    return {
      form:{},

    }
  },

  methods: {
    handleGoodsSuccess(res) {
      console.log("上传图片后-后台传来的url")
      console.log(res)
      this.form.avatarUrl = res
    },

  },


}
</script>




<style lang="less" scoped>

#releaseGoods_title {
  text-align: center;
}



</style>
