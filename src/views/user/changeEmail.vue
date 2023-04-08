<!--忘记密码页-->
<template>
  <div>
    <div class="icon-back" @click="tologin">
      <van-icon size="25" name="arrow-left"/>
    </div>
    <div id="Register_title">
      <p>更换邮箱</p>
    </div>
    <van-form @submit="onSubmit"
              @failed="noVerify">

      <van-cell-group>
        <van-field
          v-model="email"
          required
          label="原邮箱"
          placeholder="请输入原邮箱"
          :rules="[{ required: true }, { validator: emailValidator, message: '邮箱账号格式错误！'}]"
        />
        <van-field
          v-model="newEmail"
          required
          label="新邮箱"
          placeholder="请输入新邮箱"
          :rules="[{ required: true }, { validator: emailValidator, message: '邮箱账号格式错误！'},
          { validator: checkEmailValidator, message: '与原邮箱账号一致！！'}]"
        />
        <van-field
          v-model="confirmEmail"
          required
          label="确认邮箱"
          placeholder="请再次输入新邮箱"
          :rules="[{ required: true }, { validator: newEmailValidator, message: '两次邮箱账号不一致！'}]"
        />
        <van-field
          v-model="sms"
          center
          required
          clearable
          :disabled="isSms"
          label="新邮箱验证码"
          placeholder="请输入新邮箱验的证码"
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
        <van-button round block type="info" native-type="submit">确定更换</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {changeEmail, sendEmailCode} from "../../api/api";

export default {
  name: 'changeEmail',
  data() {
    return {
      email: '934668308@qq.com',
      newEmail: '934668306@qq.com',
      confirmEmail: '934668306@qq.com',
      sms: '',
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
        email: this.newEmail,
        type: 2,//更换邮箱
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success('已发送新邮箱账号！')
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

    checkEmailValidator() {
      return this.email != this.newEmail
    },
    newEmailValidator() {
      return this.confirmEmail === this.newEmail
    },
    onSubmit() {
      //校验通过
      console.log('校验通过')
      changeEmail({
        'code': this.sms,//验证码
        'email': this.email,
        'newEmail': this.newEmail,
        'type':2,
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success(res.msg)
          this.$router.push('/mine')
        } else {
          this.$toast.fail(res.msg)
        }
      })
    },
    noVerify() {
      //校验失败
      this.$toast.fail(`更新邮箱失败！\n 请完善信息`);
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

