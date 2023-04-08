<!--登录页-->
<template>
  <div>
    <div id="goBack_title">
      <van-button icon="arrow-left" type="primary" round size="small" color="#b4b4b4"
                  @click="goBack"/>
    </div>
    <div><p class="title">登录</p></div>

    <!--    头像-->
    <div id="avatar">
      <van-image
        round
        width="6rem"
        height="6rem"
        fit="cover"
        src="/api/img/Avatar/zero.jpg"
      />
    </div>
    <!--    头像end-->
    <!--    登录的表单-->
    <van-form
      @submit="onSubmit"
      @failed="noVerify">
      <van-field
        v-model="username"
        name="username"
        label="学号"
        placeholder="用户名"
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" class="btn">登录</van-button>
      </div>
      <div class="reg">
        <div style="padding-left:5px; float: left; display: inline-block; " @click="toRegister">没有账号？立即注册</div>
        <div style="padding-right:5px;float: right;" @click="toForgotPwd">忘记密码</div>
      </div>
    </van-form>
    <!--    登录的表单end-->

  </div>
</template>

<script>
// import {Toast} from "vant";
import {login} from '../../api/api.js'

export default {
  name: "Login",
  data() {
    return {
      username: '1908010501',
      password: '123',
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      // console.log('校验通过')
      login({
        'username': this.username,
        'password': this.password
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success('登录成功！')
          window.localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
          this.$router.push('/mine')
        } else {
          this.$toast.fail(res.msg);
        }
      })
    },
    noVerify() {
      //校验失败
      this.$toast.fail('请输入账号或密码');
    },
    //去注册页面
    toRegister() {
      this.$router.push('/Register')
    },
    //忘记密码
    toForgotPwd() {
      this.$router.push('/ForgotPwd')
    },
  },
  mounted() {
    //重复登录拦截
    if (window.localStorage.getItem('user') != null) {
      this.$toast.success('您已登录成功！,无需重复登录')
      this.$router.replace('/mine')
    }
  }
}
</script>

<style lang="less" scoped>
div {
  .title {
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    color: black;
    text-align: center;
  }

  #avatar {
    text-align: center;
  }

  #goBack_title {
  // position: fixed;
  margin-top: 8px;
  margin-left: 8px;
  z-index: 10;
}

.btn {
  width: calc(100% - 100px);
  margin: 20px auto;
  border-radius: 12px;
}

}


</style>
