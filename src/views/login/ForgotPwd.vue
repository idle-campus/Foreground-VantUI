<!--忘记密码页-->
<template>
  <div>
    <div class="icon-back" @click="tologin">
      <van-icon size="25" name="arrow-left"/>
    </div>
    <div id="Register_title">
      <p>忘记密码</p>
    </div>
    <van-form @submit="onSubmit"
              @failed="noVerify">

      <van-cell-group>

        <van-field
          v-model="username"
          required
          label="学 号"
          placeholder="请输入10位数学号"
          :rules="[{ required: true },
          { validator: usernamelValidator, message: '学号码格式错误！'},]"
        />
        <van-field
          v-model="email"
          required
          label="邮 箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true },
          { validator: emailValidator, message: '邮箱码格式错误！'},
          ]"
        />
        <van-field
          v-model="password"
          required
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true }, { validator: passwodvalidator, message: '密码输入两次不一致！'}]"
        />
        <van-field
          v-model="newPassword"
          required
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true }, { validator: passwodvalidator, message: '密码输入两次不一致！'}]"
        />
        <van-field
          v-model="sms"
          center
          required
          clearable
          :disabled="isSms"
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          :rules="[{ required: true }]"
        >
          <template #button>
            <van-button size="small" native-type="button" :disabled="isBut" type="primary" @click="sendsms">
              发送验证码
              <!--              倒计时-->
              <van-count-down id="down_time" :time="time" format="ss" v-if="if_time" @finish="time_stop"/>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">确定修改</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {forgotPwd, sendEmailCode} from "../../api/api";

export default {
  name: 'ForgotPwd',
  data() {
    return {
      username:'1908010503',
      email:'934668306@qq.com',
      sms: '',
      password: '12345',
      newPassword: '12345',
      isSms: true,
      isBut: true,
      time: 60 * 1000,
      if_time: false
    };
  },
  methods: {
    sendsms() {
      //发送验证码
      console.log('发送验证码')
      this.isBut = true //禁用发送验证码按钮
      this.isSms = false //允许输入
      this.if_time = true //显示倒计时
      sendEmailCode({
        email: this.email,
        type: 1,//忘记密码
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success('已发送！')
        } else {
          this.$toast.fail(res.msg);
        }
      })
    },
    time_stop() {
      this.if_time = false //隐藏倒计时
      this.isBut = false //启用发送验证码按钮
    },
    tologin() {
      //回退上一级
      this.$router.go(-1);
    },
    //邮箱验证单
    emailValidator(val){
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
          if (isemail) {
            this.isBut = false
            resolve(true);
          } else {
            this.isBut = true
            resolve(false);
          }
        }, 100);
      });
    },
    //学号验证单
    usernamelValidator(val){
      return new Promise((resolve) => {
        this.$toast.loading('验证中...');
        setTimeout(() => {
          this.$toast.clear();
          let isusername = /^[1-3]\d{9,9}$/.test(val)
          if (isusername) {
            this.isBut = false
            resolve(true);
          } else {
            this.isBut = true
            resolve(false);
          }
        }, 100);
      });
    },
    passwodvalidator() {
      //密码验证
      //表单验证
      return this.password === this.newPassword
    },
    onSubmit() {
      //校验通过
      console.log('校验通过')
      forgotPwd({
        'code': this.sms,//验证码
        'password': this.password,
        'username': this.username,
        'email': this.email,
        'type':1,
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success(res.msg)
          this.$router.push('/Login')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    },
    noVerify() {
      //校验失败
      this.$toast.fail(`重置密码失败！\n 请完善信息`);
    }

  },
};
</script>

<style lang="less" scoped>

.icon-back {
  position: absolute;
  left: 2px;
  top: 15px
}

#Register_title {
  text-align: center;
}

#down_time {
  display: inline-block;
  color: #fff;
  font-size: 12px;
}
</style>

