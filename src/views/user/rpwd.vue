<!--修改密码页面-->
<template>
  <div id="rpwd">
    <!--    顶部标题-->
    <van-sticky>
      <TopTitle :t_name="title" :ificon="ificon"/>
    </van-sticky>
    <!--    顶部标题end-->
    <!--    修改表单-->
    <van-form @submit="onSubmit" ref="form">
      <van-field v-model="form.password"
       :rules="rules.password"
      type="password" label="原密码:" placeholder="请输入"/>
      <van-field v-model="form.newPassword"
       :rules="rules.newPassword" type="password" label="新密码:" placeholder="请输入"/>
      <van-field v-model="form.confirmPassword"
       :rules="rules.confirmPassword" type="password" label="确认新密码:" placeholder="请输入"/>
      <van-button block class="btn" color="#fe5e48" @click="save">确定</van-button>
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
      // password: "",
      // newPassword: "",
      // confirmPassword: "",
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.form.username = this.user.username
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      console.log(this.form)
    },
    /*更新密码*/
    // save(queryParam) {
    save() {
      this.$refs.pass.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error("2次输入的新密码不相同")
            return false
          }
          UpPassword(this.form).then(res => {

          if (res.code === '200') {
            this.$message.success("修改成功")
            this.$store.commit("logout")
          } else {
            this.$message.error(res.msg)
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

  width: calc(100% - 30px);
  margin: 20px auto;
  border-radius: 12px;
}
</style>
