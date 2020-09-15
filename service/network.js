import {
  baseURL,
  timeout
} from './baseUrl.js'
//封装的request请求
export default function request(options) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject) => {
    wx.request({
      method: options.method || 'post',
      url: baseURL + options.url,
      timeout:timeout || 60000,
      data: options.data || { },
      header:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      success: (res) =>{
        // 调用接口成功
        resolve(res)
      },
      fail: (err) => {
        // 调用接口失败
        reject(err)
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
