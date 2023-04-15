<!--注册页-->
<template>
  <div>
    <div class="icon-back" @click="tologin">
      <van-icon size="25" name="arrow-left" />
    </div>
    <div id="Register_title">
      <p>注册</p>
    </div>
    <van-form @submit="onSubmit" @failed="noVerify">
      <!-- <van-field name="uploader" label="上传头像" center>
        <template #input>
          <van-uploader v-model="uploader" :max-count="1" />
        </template>
      </van-field> -->

      <van-field
        v-model="username"
        :readonly="this.readonly"
        clearable
        required
        label="学 号"
        placeholder="请输入10位数学号"
        :rules="[
          { required: true },
          { validator: usernamelValidator, message: '学号码格式错误！' }
        ]"
      />
      <van-cell-group>
        <van-field
          v-model="nickname"
          :readonly="this.readonly"
          required
          label="昵 称"
          :rules="[{ required: true }]"
          placeholder="请输入昵称"
        />

        <van-field
          v-model="email"
          :readonly="this.readonly"
          required
          label="邮 箱"
          placeholder="请输入邮箱"
          :rules="[
            { required: true },
            { validator: emailValidator, message: '邮箱码格式错误！' }
          ]"
        />
        <van-field
          v-model="phone"
          :readonly="this.readonly"
          required
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true },
            { validator: phoneValidator, message: '手机号码格式错误！' }
          ]"
        />
        <van-field
          v-model="password"
          :readonly="this.readonly"
          required
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[
            { required: true },
            {
              validator: passLevelValidator,
              message: '必须包含字母、数字(特殊字符可选) 长度6-12'
            }
          ]"
        />
        <van-field
          v-model="newPassword"
          :readonly="this.readonly"
          required
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[
            { required: true },
            { validator: passwodValidator, message: '密码输入两次不一致！' }
          ]"
        />
        <van-field
          v-model="sms"
          :readonly="this.readonly"
          center
          required
          clearable
          :disabled="isSms"
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          :rules="[{ required: true }]"
        >
          <template #button>
            <van-button
              size="small"
              native-type="button"
              :disabled="isBut"
              type="primary"
              @click="sendsms"
            >
              发送验证码
              <!--              倒计时-->
              <van-count-down
                id="down_time"
                :time="time"
                format="ss"
                v-if="if_time"
                @finish="time_stop"
              />
            </van-button>
          </template>
        </van-field>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" class="btn"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { register, sendEmailCode, login } from '../../api/api'

export default {
  name: 'Register',
  data() {
    return {
      nickname: 'www',
      username: '1234567890',
      email: '934668306@qq.com',
      phone: '18636569656',
      sms: '',
      password: 'qwe123',
      newPassword: 'qwe123',
      uploader: [],
      isSms: true,
      isBut: true,
      time: 60 * 1000,
      if_time: false,
      readonly: false
    }
  },
  methods: {
    sendsms() {
      //发送验证码
      // console.log('发送验证码')
      this.isBut = true //禁用发送验证码按钮
      this.isSms = false //允许输入
      this.if_time = true //显示倒计时
      sendEmailCode({
        email: this.email,
        type: 0 //注册
      }).then((res) => {
        if (res.code === '200') {
          this.$toast.success('已发送！')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    },
    time_stop() {
      this.if_time = false //隐藏倒计时
      this.isBut = false //启用发送验证码按钮
    },
    tologin() {
      //回退上一级
      this.$router.go(-1)
    },
    phoneValidator(val) {
      //手机号验证
      return new Promise((resolve) => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          let isphone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
            val
          )
          // if (isphone) {
          //   this.isBut = false
          //   resolve(true)
          // } else {
          //   this.isBut = true
          //   resolve(false)
          // }
        }, 500)
      })
    },
    emailValidator(val) {
      return new Promise((resolve) => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          // let isemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)
          let isemail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
            val
          )
          if (isemail) {
            this.isBut = false
            resolve(true)
          } else {
            this.isBut = true
            resolve(false)
          }
        }, 1000)
      })
    },
    usernamelValidator(val) {
      return new Promise((resolve) => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          let isusername = /^[1-3]\d{9,9}$/.test(val)
          // if (isusername) {
          //   this.isBut = false
          //   resolve(true)
          // } else {
          //   this.isBut = true
          //   resolve(false)
          // }
        }, 500)
      })
    },
    passLevelValidator(val) {
      return new Promise((resolve) => {
        this.$toast.loading('验证中...')
        setTimeout(() => {
          this.$toast.clear()
          let isLevel = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,12}$/.test(
            val
          )
          // if (isLevel) {
          //   this.isBut = false
          //   resolve(true)
          // } else {
          //   this.isBut = true
          //   resolve(false)
          // }
        }, 500)
      })
    },
    passwodValidator() {
      //密码验证
      //表单验证
      return this.password === this.newPassword
    },
    onSubmit() {
      //校验通过
      this.readonly = true
      console.log('this.disabled====' + this.disabled)
      register({
        phone: this.phone, //手机号
        code: this.sms, //验证码
        password: this.password,
        nickname: this.nickname, //用户昵称
        username: this.username,
        email: this.email,
        type: 0
      }).then((res) => {
        if (res.code === '200') {
          this.$toast.success(res.msg)
          setTimeout(() => {
            this.$toast.loading('正在转登录中...')
          }, 2000)
          setTimeout(() => {
            this.goLogin({
              username: this.username,
              password: this.password
            })
          }, 3000)
        } else {
          this.$toast.fail(res.msg) //用户名已存在
        }
      })
    },
    goLogin(loginData) {
      login(loginData).then((res) => {
        if (res.code === '200') {
          this.$toast.success('登录成功！')
          window.localStorage.setItem('user', JSON.stringify(res.data)) // 存储用户信息到浏览器
          this.$router.push('/mine')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    },
    noVerify() {
      //校验失败
      this.$toast.fail(`注册失败！\n 请完善信息`)
    }
  }
}
</script>

<style lang="less" scoped>
.icon-back {
  position: absolute;
  left: 2px;
  top: 15px;
}

#Register_title {
  text-align: center;
}

#down_time {
  display: inline-block;
  color: #fff;
  font-size: 12px;
}
.btn {
  width: calc(100% - 100px);
  margin: 20px auto;
  border-radius: 12px;
}
</style>
