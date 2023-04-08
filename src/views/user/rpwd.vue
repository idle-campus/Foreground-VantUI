<!--修改密码页面-->
<template>
  <div id="rpwd">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    修改表单-->
    <van-form @submit="onSubmit" ref="form" :model="form">
       <van-field v-model="password" type="password"
        label="原密码:" placeholder="请输入"
        />
      <van-field v-model="newPassword" type="password"
       label="新密码:" placeholder="请输入"
       :rules="[{ required: true }, { validator: newPasswodValidator, message: '原密码与新密码一致！'}]"
       />
      <van-field v-model="confirmPassword" type="password"
       label="确认密码:" placeholder="请输入"
       :rules="[{ required: true }, { validator: confirmPasswordValidator, message: '密码输入两次不一致！'}]"
       />
      <van-button block class="btn" color="#409EFF" @click="save">确定</van-button>
    </van-form>
    <!--    修改表单end-->

  </div>
</template>

<script>
import TopTitle from "../../components/topTitle";
import {UpPassword} from '../../api/api'

export default {
  name: 'Password',
  components: {TopTitle},
  data() {
    return {
      title: '修改密码',
      ificon: false,
      form: {},
      password: "",
      newPassword: "",
      confirmPassword: "",
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},

    };
  },
  created() {
    this.form.username = this.user.username
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      console.log(this.form)

      //校验通过
      console.log('校验通过')
      UpPassword({
        'password': this.password,
        'newPassword': this.newPassword,
        'username': this.user.username,
      }).then(res => {
        if (res.code === '200') {
          this.$toast.success(res.msg)
          this.$store.commit("logout")
        } else{
          this.$toast.fail(res.msg)
        }
      })

    },
    newPasswodValidator(){
      return this.password != this.newPassword
    },
    confirmPasswordValidator() {
      //密码验证
      //表单验证
      return this.confirmPassword === this.newPassword
    },


    /*更新密码*/
    // save(queryParam) {
    save() {
      this.$refs.pass.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$toast
            .fail("2次输入的新密码不相同")
            return false
          }

          UpPassword(this.form).then(res => {

          if (res.code === '200') {
            this.$toast.success("修改成功")
            this.$store.commit("logout")
          } else {
            this.$toast.fail(res.msg)
          }
      })
        }
      })


    },
  },
};
</script>

<style lang="less" scoped>

#rpwd {
  .van-form {
    margin-top: 15px;
  }
}

.btn {

  width: calc(100% - 100px);
  margin: 20px auto;
  border-radius: 12px;
}
</style>
