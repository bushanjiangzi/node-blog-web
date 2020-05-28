<template>
  <div class="center">
    <div>登录页面</div>
    <el-input v-model="username" placeholder="用户名" @keyup="value = value.replace(/[^\a-\z\A-\Z0-9]/g, '')"></el-input>
    <el-input v-model="password" placeholder="密码" type="password"></el-input>
    <el-button type="primary" round @click="login">登录</el-button>
  </div>
</template>

<script>
import { User } from '@/common/js/interface'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.username, this.password)
      User.login({
        params: {
          username: this.username,
          password: this.password
        },
        success: (res) => {
          if (res.code === 200) {
            this.$message.success(res.message)
            sessionStorage.setItem('loginUser', JSON.stringify(res.data))
            window.location.href = '/index'
          } else {
            this.$message.error(res.message)
          }
        },
        error: (err) => {
          this.$message.error(err.message)
        }
      })
    }
  }
}
</script>

<style>
.center{
  text-align: center;
}
</style>