<template>
  <div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="content">
    </el-input>
    <el-button type="primary" round @click="save">保存</el-button>
  </div>
</template>

<script>
import {Blog} from '@/common/js/interface'
export default {
  name: 'new',
  data() {
    return {
      title: '',
      content: '',
      author: '',
      id: 0,
      isEdit: false
    }
  },
  created() {},
  mounted() {
    let authorInfo = sessionStorage.getItem('loginUser')
    this.author = JSON.parse(authorInfo).realname
    // console.log(this.author, authorInfo);
    try{
      let query = window.location.href.split('?')[1]
      let queryObj = {}
      query.split('&').forEach(item => {
        let itemArr = item.split('=')
        queryObj[itemArr[0]] = itemArr[1]
      })
      if (queryObj.id) {
        this.id = parseInt(queryObj.id)
        this.isEdit = true
      }
      this.getNlogDetail(queryObj.id)
    } catch {}
  },
  methods: {
    getNlogDetail(id) {
      Blog.detail({
        params: {
          id: id
        },
        success: (res) => {
          if (res.code === 200) {
            this.title = res.data.title
            this.content = res.data.content
          } else {
            this.$message.error(res.message)
          }
        },
        error: (err) => {
          this.$message.error(err.message)
        }
      })
    },
    save() {
      const params = {
        title: this.title,
        content: this.content,
        author: this.author
      }
      if (this.isEdit) {
        params.id = this.id
        Blog.update({
          params: params,
          success: (res) => {
            if (res.code === 200) {
              this.$message.success('保存成功')
              window.location.href = '/index'
            } else {
              this.$message.error(res.message)
            }
          },
          error: (err) => {
            this.$message.error(err.message)
          }
        })
      } else {
        Blog.new({
          params: params,
          success: (res) => {
            if (res.code === 200) {
              this.$message.success('保存成功')
              window.location.href = '/#/index'
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
}
</script>

<style>
.blog-item{
  margin: 10px 0;
}
</style>