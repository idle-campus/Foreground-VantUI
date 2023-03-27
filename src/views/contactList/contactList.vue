<!--联系人列表-->
<template>
  <div id="contactList">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--联系人列表信息-->
    <van-cell-group v-for="val in Address" :key="val.id">
      <van-cell>
        <template #title>
          <span>{{ val.realName }}</span>
          <span>{{ val.phone }}</span>
        </template>
        <template #label>
          <span>{{ val.province }}{{ val.city }}{{ val.district }}{{ val.detail }}</span>
        </template>
        <!--        修改图标-->
        <template #right-icon>
          <van-icon name="edit" class="search-icon" @click="goupdataContact(val.id)"/>
        </template>
        <!--        修改图标end-->
      </van-cell>
    </van-cell-group>
    <!--联系人列表信息end-->
    <van-tabbar placeholder>
      <van-button type="primary" color="red" block round id="newadd" to="/operateContactList">新增联系人</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {getAddress} from '../../api/api'

export default {
  name: "contactList",
  components: {TopTitle},
  data() {
    return {
      title: '联系人列表',
      ificon: false,
      Address: [],
      //分页
      limit: 10,//页大小,默认为 10
      page: 1,//页码,默认为1
    }
  },
  methods: {
    goupdataContact(id) {
      this.$router.push({
        name: 'operateContactList',
        params: {
          titl: '修改联系人',
          ifdel: true,
          addrid: id //地址的ID
        }
      });
    }
  },
  mounted() {
    getAddress({
      page: this.page,
      limit: this.limit
    }).then(res => {
      console.log(res)
      this.Address = res.data
    })
  }
}
</script>

<style lang="less" scoped>
#contactList {
  #newadd {
    width: 88%;
    height: 75%;
    margin: 8px auto;
  }

  .search-icon {
    font-size: 23px;
    margin-top: 11px;
  }
}
</style>
