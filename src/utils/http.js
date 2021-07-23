import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
axios.defaults.baseURL = process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
axios.defaults.timeout = 30000; // 请求超时


// 请求拦截器
axios.interceptors.request.use(
  config => {
     // 在发送请求之前的处理
     config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  },
  error => {
     //处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(response => {
  //   console.log(response);
  const res = response.data
    // if (res.code == 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'success',
    //     duration: 5 * 1000
    //   })
    // 50008:非法token；50012:其他客户端登录；50014:令牌过期；
      // if (res.code === 400) {
      
      //   // to re-login
      //   MessageBox.confirm('您已经注销，您可以取消停留在本页，或再次登录，确认注销', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      // return Promise.reject(new Error(res.message || 'Error'))
    // } else {
      return res
    // }
  },
  error => {
    // console.log('err' + error) // for debug
    console.log(error.response.data.message);
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const http = {
  // 封装get请求
  get(url, params = {}) {
      return new Promise((resolve, reject) => {
          axios.get(url, {
              params: params
          }).then(res => {
              resolve(res);
          }).catch(err => {
              reject(err);
          })
      })
  },
  // 封装post请求
  post(url, data = {}, config) {
      return new Promise((resolve, reject) => {
          axios.post(url, data, config)
              .then(res => {
                  resolve(res);
              })
              .catch(err => {
                  reject(err);
              })
      })
  },
}

export default http
