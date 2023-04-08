<!--我的-->
<template>
  <div id="mine">
    <!--    顶部按钮-->
    <div id="setup">
      <van-icon name="setting-o" size="30px"/>
    </div>
    <!--    顶部按钮end-->
    <!--    用户的头象-->
    <div id="avatar" @click="goPerson">
      <van-row>
        <van-col span="10">
          <van-image
            fit="cover"
            height="6rem"
            round
            :src="img_url + user.avatarUrl"
            width="6rem"
          />
        </van-col>
        <van-col span="14">
          <div id="userName">{{ user.nickname }}</div>
        </van-col>
      </van-row>
    </div>
    <!--    用户的头象end-->
    <!--    用户的信息-->
    <van-cell-group inset>
      <van-grid>
        <van-grid-item  class="userInfo" to="/myGoods?type=1">
          <van-row>
            <van-icon name="guide-o" size="30" color="#409EFF" />
          </van-row>
          <van-row>
            <van-col span="24">我发布<span> {{ countStatus_1 }}</span></van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" to="/myGoods?type=2">
          <van-row>
            <van-icon name="balance-list-o" size="30" color="#67C23A" />
          </van-row>
          <van-row>
            <van-col span="24">我卖出<span> {{ countStatus_2 }}</span></van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" to="/myGoods?type=3">
          <van-row>
            <van-icon name="warn-o" size="30" color="#F56C6C" />
          </van-row>
          <van-row>
            <van-col span="24" >不通过<span> {{ countViolation }}</span></van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" to="/myGoods?type=0">
          <van-row>
            <van-icon name="down" size="30" color="#909399" />
          </van-row>
          <van-row>
            <van-col span="24">已下架<span> {{ countStatus_0 }}</span></van-col>
          </van-row>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!--    用户的信息end-->
    <!--    订单状态-->
    <!-- <van-cell-group id="OrderStatus" inset>
      <van-grid :column-num="5">
        <van-grid-item icon="shop-o" text="我发布的" to="/orderType?type=0"/>
        <van-grid-item icon="logistics" text="我卖出的" to="/orderType?type=1"/>
        <van-grid-item icon="goods-collect-o" text="审核不通过" to="/orderType?type=2"/>
        <van-grid-item icon="cart-o" text="已下架" to="/orderType?type=3"/>
        <van-grid-item icon="cart-o" text="已完成" to="/orderType?type=4"/>
      </van-grid>
    </van-cell-group> -->
    <!--    订单状态end-->
    <!--    功能区-->
    <van-cell-group inset>
      <van-cell icon="user-o"  is-link title="个人中心" to="/person"/>
      <van-cell icon="shop" is-link title="我的闲置" to="/myGoods?type=1"/>
      <!-- <van-cell icon="goods-collect" is-link title="我的收藏" to="/rpwd"/> -->
      <!-- <van-cell icon="underway" is-link title="我的足迹" @click="gofootprint"/> -->
      <van-cell icon="youzan-shield" is-link title="更换邮箱" to="/changeEmail"/>
      <van-cell icon="setting" is-link title="修改密码" to="/rpwd"/>
    </van-cell-group>
    <!--    功能区end-->
    <van-cell-group inset>
      <van-cell icon="../../static/exit.jpg" is-link title="退出账号" @click="exit" />
    </van-cell-group>
    <van-button size="large" style="margin-top: 15px" type="danger" @click="exit">退出登录</van-button>
  </div>
</template>

<script>
import {IMG_URL, countViolation, countGoods, getNewData} from '../../api/api'

export default {
  name: "mine",
  // props: {
  //   // collapseBtnClass: String,
  //   user: Object
  // },
  data() {
    return {
      img_url: IMG_URL,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      countViolation:"",//审核不通过数量
      countStatus_1:"",//发布数量
      countStatus_2:"",//已售出数量
      countStatus_0:"",//下架数量
    };
  },

  created() {
    // 从后台获取最新的User数据
    this.getStu()
  },

  methods: {
    // gofootprint() {
    //   this.$router.push({
    //     path: '/collect',
    //     query: {
    //       type: 'foot'
    //     }
    //   });
    // },
    goPerson(){this.$router.push('/person')
    },

    exit() {
      this.$dialog.confirm({
      title: '提示',
      message: '您确定退出登录？',
      confirmButtonText: "退出",
    })
    .then(() => {
      this.logout()
    })
    .catch(() => {
      // on cancel
    });
      },

    logout() {
      this.$toast.success("退出成功")
      this.$store.commit("logout")
    },

  getStu() {
  let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
  if (username) {
    // 从后台获取User数据
    getNewData(username).then(res => {
      // 重新赋值后台的最新User数据
      this.user = res.data
      })
    }
  },




    },


    mounted() {
    countViolation({"id" : this.user.id}).then(res => {
      if(res.code !== '200'){
        this.$toast.fail(res.msg)
      }
      this.countViolation = res.data //审核不通过数量
    })
    // status<span> {{ countStatus_1 }}</span>
    countGoods({"id" : this.user.id,"status":1}).then(res => {
      this.countStatus_1 = res.data //发布数量
    })
    countGoods({"id" : this.user.id,"status":2}).then(res => {
      this.countStatus_2 = res.data //已售出数量
    })
    countGoods({"id" : this.user.id,"status":0}).then(res => {
      this.countStatus_0 = res.data //下架数量
    })
  }


}
</script>

<style lang="less" scoped>
#mine {
  #setup {
    .van-icon {
      display: block;
      padding-top: 8px;
      padding-right: 15px;
      text-align: end;
    }
  }

  .userInfo {
      font-size: 14px;
      // font-weight: bolder;
    span {
      color: #409EFF;
    }
  }


  .van-cell-group {
    margin: 0 8px;
    margin-top: 10px;
  }


}

#setup {
  height: 45px;
}

#avatar {
  .van-image {
    margin-left: 15px;
  }
}

#userName {
  line-height: 100px;
}
</style>
