/*
  利用axios封装http模块，并把http分为post和get方法
*/
import axios from 'axios'
import {message} from 'element-ui'
// import router from '../router'

let lastTime
function alertIntervalTime (msg) {
  let nowTime = new Date().getTime()
  if (lastTime && nowTime - lastTime > 5000) {
    message.error(msg)
  }
  lastTime = new Date().getTime()
}
// 对axios设置拦截器，判断sessionStorage.sn是否存在
axios.interceptors.request.use(
  config => {
    if (sessionStorage.sn) {
      config.headers.Authentication = sessionStorage.sn
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回拦截器，判断返回值的code是否异常
axios.interceptors.response.use((response) => {
  switch (response.data.code) {
    case -1:
      return response
      break
    case 200:
      return response
    default:
    return
  }
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        sessionStorage.clear()
        alertIntervalTime('登录超时, 请重新登录')
        // router.push({name: '登录'})
        return
      case 500:
        alertIntervalTime(error.response.data.msg)
        return error
      default:
      return 404
    }
    // 返回接口返回的错误信息
  }
})
// http response服务器响应拦截器，
// get请求封装
export const get = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: data }, config).then((response) => {
      resolve(response.data)
    }).catch ((err) => {
      reject(err)
    })
  })
}
// post请求封装
export const post = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then((response) => {
      if (response) {
        resolve(response.data)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
