<template>
  <div>
    <el-input v-model="author" placeholder="作者"></el-input>
    <el-input v-model="keyword" placeholder="关键字"></el-input>
    <el-button type="primary" round @click="search">搜索</el-button>
    <el-button type="success" round @click="toNew">新建博客</el-button>
    <div>
      <ul class="blog-item" v-for="(item, index) in blogList" :key='index'>
        <li>{{item.title}}</li>
        <li>{{item.content}}</li>
        <li>
          <span>{{item.author}}</span>
          <span>{{item.createtime}}</span>
          <el-button type="info" plain @click="toDetail(item)">详情</el-button>
          <el-button type="info" plain @click="toEdit(item)">编辑</el-button>
          <el-button type="warning" plain @click="toDelete(item)">删除</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Blog} from '@/common/js/interface'
export default {
  name: 'login',
  data() {
    return {
      keyword: '',
      author: '',
      blogList: []
    }
  },
  created() {
    this.getBlogList()
  },
  methods: {
    getBlogList() {
      // let author = sessionStorage.getItem('loginUser')
      Blog.blogList({
        params: {
          author: this.author,
          keyword: this.keyword
        },
        success: (res) => {
          if (res.code === 200) {
            this.blogList = res.data
          } else {
            this.$message.error(res.message)
          }
        },
        error: (err) => {
          this.$message.error(err.message)
        }
      })
    },
    search() {
      this.getBlogList()
    },
    toDetail(item) {
      window.location.href = '/#/detail' + '?id=' + item.id
    },
    toNew(){
      window.location.href = '/#/new'
    },
    toEdit(item){
      window.location.href = '/#/new' + '?id=' + item.id
    },
    toDelete(item) {
      Blog.delete({
        params: {
          id: item.id
        },
        success: (res) => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getBlogList()
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
.blog-item{
  margin: 10px 0;
}
</style>