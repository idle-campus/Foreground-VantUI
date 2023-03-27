<!--联系人操作页-->
<template>
  <div id="operateContactList">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--  输入表单-->
    <van-form @submit="onSubmit">
      <van-field
        required
        v-model="contact.realName"
        name="联系人"
        label="联系人"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />
      <van-field
        required
        v-model="contact.phone"
        type="tel"
        name="手机号"
        label="手机号"
        placeholder="请填写"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <!--      选择地址-->
      <van-field
        required
        readonly
        clickable
        name="area"
        :value="address"
        label="地区选择"
        placeholder="点击选择省市区"
        :rules="[{ required: true, message: '请选择省市区' }]"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <!--      选择地址end-->
      <van-field
        required
        autosize
        type="textarea"
        v-model="contact.detail"
        name="详细地址"
        label="详细地址"
        placeholder="请填写"
        :value="contact.cityId"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
      <van-field
        v-model="contact.postCode"
        type="number"
        name="收货邮政编码"
        label="收货邮政编码"
        placeholder="请填写"
      />

      <van-cell center title="设置默认" icon="shop-o" id="isdefault">
        <template #right-icon>
          <van-switch v-model="contact.isDefault" size="24" :active-value='1' inactive-value="0"/>
        </template>
      </van-cell>
      <!--      两个按钮-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <!--      新增和删除共用一个页面，判断是哪个-->
      <div style="margin: 16px;" v-if="ifdel">
        <van-button round block type="danger" @click="delSubmit">删除</van-button>
      </div>
      <!--      两个按钮end-->
    </van-form>
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {areaList} from '@vant/area-data';
import {getAddressOne, postDelEdit, postEdit} from '../../api/api'

export default {
  name: "operateContactList",
  components: {TopTitle},
  data() {
    return {
      title: '新增联系人',
      ificon: false,
      address: '',//选择省市区字符串
      // 联系人表单信息
      contact: {
        id: '',//地址id
        realName: '',//联系人
        phone: '',//手机号
        province: '',//收货人所在省
        city: '', //收货人所在市
        district: '',//收货人所在区
        detail: '', //详细地址
        postCode: '', //收货邮政编码
        isDefault: 0, //是否默认
        cityId: 0//省市区 ID 用于修改是定位省市区
      },
      showArea: false,
      areaList, //引入的城市信息
      ifdel: false //是否显示删除按钮
    }
  },
  mounted() {
    /*判断有没有带标题参数 没有就默认-新增联系人*/
    if (this.$route.params.titl != null) {
      this.title = this.$route.params.titl
    }
    this.ifdel = this.$route.params.ifdel
    /*获取新增还是修改 修改传入ID*/
    if (this.$route.params.addrid != null) {
      //修改地址
      let addrid = this.$route.params.addrid;
      this.contact.id = addrid
      getAddressOne({id: addrid}).then(res => {
        console.log(res)
        this.contact = res.data
        this.address = res.data.province + res.data.city + res.data.district

      })
    }
  },
  methods: {
    onSubmit() {
      postEdit(this.contact).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$toast.success(res.msg)
          this.$router.replace('/contactList')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    },
    //将地址转化为字符串
    onConfirm(values) {
      console.log(values)
      this.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.contact.province = values[0].name
      this.contact.city = values[1].name
      this.contact.district = values[2].name
      this.contact.cityId = values[2].code
      this.showArea = false;
    },
    //删除地址
    delSubmit() {
      postDelEdit({
        id: this.contact.id.toString()
      }).then(res => {
        if (res.status === 200) {
          this.$toast.success(res.msg)
          this.$router.replace('/contactList')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#operateContactList {
  #isdefault {
    margin-top: 10px;
  }

  .van-form {
    margin: 10px;
  }
}
</style>
