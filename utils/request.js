import baseUrl from './baseUrl'
import {
  normalToast,
  loadingToast
} from './popup'


const app = getApp()

// const _header = {
//   // "content-type": "application/x-www-form-urlencoded"
//   // "Content-Type": "application/json"
//   'Content-Type': 'application/json;charset=UTF-8'
// }
class request {

  /**
   * 设置统一的异常处理
   */
  set(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  get(url, data, header = app.globalData.header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  delete(url, data, header = app.globalData.header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  put(url, data, header = app.globalData.header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  post(url, data, header = app.globalData.header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    // if (method === 'POST') {
    loadingToast()
    // }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            // wx.hideLoading()
            //200: 服务端业务处理正常结束
            if (res.data.code === 200) {
              resolve(res.data)
              // 没有权限， 需要小程序授权 登陆
            } else if (res.statusCode === 200) {
              resolve(res)
              if (res.data.code == 399) {
                wx.removeStorageSync('token')
                wx.navigateTo({
                  url: '/packageA/pages/empower/index'
                })
                // 绑定就诊卡失败  跳到绑定就诊卡 页面

              } else if (res.data.code === 1015) {
                if(res.data.msg){
                  normalToast(res.data.msg)
                }
                resolve(res.data)

              } else if (res.data.code === 1105 || res.data.code === 1106 || res.data.code === 1001) {
                resolve(res.data)
              } else {
                if(res.data.msg){
                  normalToast(res.data.msg)
                }
                reject(res.data)
              }
            }
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            normalToast('网络异常,请刷新后重试!')
            reject(res)
          }
        }),

        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          normalToast("网络超时，请稍后重试")
          reject(res)
        }),
        complete(){
          wx.hideLoading()
        }
      })
    })
  }
}

export default request