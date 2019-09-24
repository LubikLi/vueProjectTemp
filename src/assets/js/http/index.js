import axios from 'axios'
import Router from '../../../router/index'
import {Message, Loading} from 'element-ui'

let loading
let loadingNum = 0;

function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  loadingNum++;
}

function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    loading.close();
  }
}

let Axios = axios.create({
  timeout: 15000,
  responseType: 'json',
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // "Content-Type": "application/x-www-form-urlencoded",
    'Content-Type': 'application/json;charset=utf-8'
  }
})

const $url = ' '


if (process.env.NODE_ENV === 'development') {
  Axios.defaults.baseURL = $url;
} else if (process.env.NODE_ENV === 'debug') {
  Axios.defaults.baseURL = $url;
} else if (process.env.NODE_ENV === 'production') {
  Axios.defaults.baseURL = $url;
}

// Axios.defaults.withCredentials = true;
// Axios.defaults.transformRequest = [function(data) {
//   //数据序列化
//   return qs.stringify(data);
// }];
//在发送请求之前做某事
Axios.interceptors.request.use(
  config => {
    startLoading()
    if (localStorage.getItem('authToken')) {
      // console.log(localStorage.getItem('authToken'));
      config.headers['authToken'] = localStorage.getItem('authToken')
    }
    // console.log('this is axios config>>>', config)
    return config
  },
  error => {
    // error的回调信息，可定义
    console.error('Axios.interceptors', error)
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  response => {
    endLoading()
    const res = response
    if (res.status !== 200) {
      console.log('res', res)
    } else if (res.status === 500) {
      Message.error('服务器错误，网络连接超时...')
    }
    if (res.data.code == -1) {
      Router.push({path: '/login'})
      // Message.error('连接超时，请重新登录...')
    }
    return Promise.resolve(res.data)
  },
  error => {
    endLoading()
    Message.error('网络请求失败...')
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(Util.baseUrl + url, {
      params: params
    })
      .then(response => {
        if (response.data.meta.code == 0) {
          if (response.data.message) {
            Message({
              type: 'success',
              center: true,
              message: response.data.message
            })
          }
          resolve(response.data)
        } else {

          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*拼接参数*/
export function getOne(url) {
  return new Promise((resolve, reject) => {
    axios.get(Util.baseUrl + url)
      .then(response => {
        if (response.data.meta.code == 0) {
          // console.log(response.data)
          if (response.data.message) {
            Message({
              type: 'success',
              center: true,
              message: response.data.message
            })
          }
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(Util.baseUrl + url, data)
      .then(response => {
        if (response.data.meta.code == 0 || response.data.meta.code == 1001) {
          // console.log(response.data)
          if (response.data.message) {
            Message({
              type: 'success',
              center: true,
              message: response.data.message
            })
          }
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

/*拼接参数*/
export function postOne(url, id) {
  return new Promise((resolve, reject) => {
    axios.post(Util.baseUrl + url + '?id=' + id)
      .then(response => {
        if (response.data.meta.code == 0) {
          // console.log(response.data)
          if (response.data.message) {
            Message({
              type: 'success',
              center: true,
              message: response.data.message
            })
          }
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

/*直接拼参*/
export function postDirect(url) {
  return new Promise((resolve, reject) => {
    axios.post(Util.baseUrl + url)
      .then(response => {
        if (response.data.meta.code == 0) {
          // console.log(response.data)
          if (response.data.message) {
            Message({
              type: 'success',
              center: true,
              message: response.data.message
            })
          }
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deleteIt(url, id) {
  return new Promise((resolve, reject) => {
    let str = ""
    if (id) {
      str = Util.baseUrl + url + id
    } else {
      str = Util.baseUrl + url
    }
    axios.delete(str)
      .then(response => {
        if (response.data.meta.code == 0) {
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

export function deleteImg(url, data) {
  return new Promise((resolve, reject) => {
    axios.delete(Util.baseUrl + url, {
      params: data
    })
      .then(response => {
        if (response.data.meta.code == 0) {
          resolve(response.data)
        } else {
          Message({
            type: 'error',
            center: true,
            message: response.data.meta.message
          })
        }
      }, err => {
        reject(err)
      })
  })
}

// export{
//   Axios,
//   $url
// };
