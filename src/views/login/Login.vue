<!--登录页-->
<template>
  <div>
    <p class="title">登录</p>
    <!--    头像-->
    <div id="avatar">
      <van-image
        round
        width="6rem"
        height="6rem"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
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
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <div class="reg">
        <div @click="toRegister">没有账号？立即注册</div>
      </div>
    </van-form>
    <!--    登录的表单end-->

  </div>
</template>

<script>
import {Toast} from "vant";
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
    onSubmit() {
      // console.log('校验通过')
      login({
        'username': this.username,
        'password': this.password
      }).then(res => {
        if (res.code === '200') {
          Toast.success('登录成功！')
          window.localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
          this.$router.push('/mine')
        } else {
          Toast.fail(res.msg);
        }
      })
    },
    noVerify() {
      //校验失败
      Toast.fail('请输入账号或密码');
    },
    //去注册页面
    toRegister() {
      this.$router.push('/Register')
    },
  },
  mounted() {
    //重复登录拦截
    if (window.localStorage.getItem('user') != null) {
      Toast.success('您已登录成功！,无需重复登录')
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
}


</style>
