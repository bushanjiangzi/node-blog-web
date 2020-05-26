<template>
  <div>
    <div>{{blogDetail}}</div>
  </div>
</template>

<script>
import {Blog} from '@/common/js/interface'
export default {
  name: 'detail',
  data() {
    return {
      blogDetail: ''
    }
  },
  created() {
    this.getBlogDetail()
  },
  methods: {
    getBlogDetail() {
      let query = window.location.href.split('?')[1]
      let queryObj = {}
      query.split('&').forEach(item => {
        let itemArr = item.split('=')
        queryObj[itemArr[0]] = itemArr[1]
      })
      // console.log('queryObj:', queryObj)
      Blog.detail({
        params: {
          id: queryObj.id
        },
        success: (res) => {
          if (res.code === 200) {
            this.blogDetail = JSON.stringify(res.data)
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