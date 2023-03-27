<!--我的-->
<template>
  <div id="mine">
    <!--    顶部按钮-->
    <div id="setup">
      <van-icon name="setting-o" size="30px"/>
    </div>
    <!--    顶部按钮end-->
    <!--    用户的头象-->
    <div id="avatar">
      <van-row>
        <van-col span="10">
          <van-image
            fit="cover"
            height="6rem"
            round
            :src="img_url+user.avatarUrl"
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
        <van-grid-item class="userInfo" text="我发布的">
          <van-row>
            <van-col span="24">{{ nowMoney }}</van-col>
          </van-row>
          <van-row>
            <van-col span="24">我发布的</van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" text="我卖出的">
          <van-row>
            <van-col span="24">0</van-col>
          </van-row>
          <van-row>
            <van-col span="24">我卖出的</van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" text="审核不通过">
          <van-row>
            <van-col span="24">{{ payCount }}</van-col>
          </van-row>
          <van-row>
            <van-col span="24">审核不通过</van-col>
          </van-row>
        </van-grid-item>
        <van-grid-item class="userInfo" text="下架">
          <van-row>
            <van-col span="24">{{ integral }}</van-col>
          </van-row>
          <van-row>
            <van-col span="24">已下架</van-col>
          </van-row>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!--    用户的信息end-->
    <!--    订单状态-->
    <van-cell-group id="OrderStatus" inset>
      <van-grid :column-num="5">
        <van-grid-item icon="shop-o" text="我发布的" to="/orderType?type=0"/>
        <van-grid-item icon="logistics" text="我卖出的" to="/orderType?type=1"/>
        <van-grid-item icon="goods-collect-o" text="审核不通过" to="/orderType?type=2"/>
        <van-grid-item icon="cart-o" text="已下架" to="/orderType?type=3"/>
        <van-grid-item icon="cart-o" text="已完成" to="/orderType?type=4"/>
      </van-grid>
    </van-cell-group>
    <!--    订单状态end-->
    <!--    功能区-->
    <van-cell-group inset>
      <van-cell icon="location" is-link title="地址管理" to="/contactList"/>
      <van-cell icon="paid" is-link title="我的钱包" to="/wallet"/>
      <van-cell icon="goods-collect" is-link title="我的收藏" to="/collect"/>
      <van-cell icon="underway" is-link title="我的足迹" @click="gofootprint"/>
      <van-cell icon="setting" is-link title="修改密码" to="/rpwd"/>
    </van-cell-group>
    <!--    功能区end-->
    <van-button size="large" style="margin-top: 15px" type="danger" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import {getUserInfo, IMG_URL, loginOut} from '../../api/api'

export default {
  name: "mine",
  data() {
    return {
      img_url: IMG_URL,//图片地址主机
      avatar: '',//头像
      nickname: '',//用户昵称
      nowMoney: 0,//用户余额
      payCount: 0,//用户购买次数
      integral: 0,//用户剩余积分
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    };
  },
  methods: {
    gofootprint() {
      this.$router.push({
        path: '/collect',
        query: {
          type: 'foot'
        }
      });
    },
    logout() {
      loginOut().then(res => {
        if (res.code == '200') {
          window.localStorage.removeItem('user')
          this.$toast.success(res.data)
          this.$router.push('/home')
        }
      })
    },

  },
  created() {
    //获取用户信息
    getUserInfo().then(res => {
      if (res.code == '200') {
        // window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        // let user = JSON.parse(window.localStorage.getItem('userInfo'))
        window.localStorage.setItem('user', JSON.stringify(res.data))
        let user = JSON.parse(window.localStorage.getItem('user'))
        console.log(res)
        this.nickname = user.nickname
        this.nowMoney = user.nowMoney
        this.payCount = user.payCount
        this.integral = user.integral
        this.avatar = this.img_url + '/' + user.avatar
      }
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
    & > div > div:nth-child(1) {
      font-size: 14px;
      font-weight: bolder;
      color: red;
    }

    & > div > div:nth-child(2) {
      margin-top: 10px;
      font-size: 12px;
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
