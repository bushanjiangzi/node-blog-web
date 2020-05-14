import {get, post} from './http'

let userApi = {
  login: '/api/user/login',
}

export const User = {
  login(data) {
    post(userApi.login, data.params).then(data.success).catch(data.error)
  }
}

let blogApi = {
  blogList: '/api/blog/list',
  detail: '/api/blog/detail',
  new: '/api/blog/new',
  update: '/api/blog/update',
  delete: '/api/blog/delete'
}

export const Blog = {
  blogList(data) {
    get(blogApi.blogList, data.params).then(data.success).catch(data.error)
  },
  detail(data) {
    get(blogApi.detail, data.params).then(data.success).catch(data.error)
  },
  new(data) {
    post(blogApi.new, data.params).then(data.success).catch(data.error)
  },
  update(data) {
    post(blogApi.update, data.params).then(data.success).catch(data.error)
  },
  delete(data) {
    post(blogApi.delete, data.params).then(data.success).catch(data.error)
  }
}