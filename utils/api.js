import _request from './request.js'
const request = new _request

// 获得微信小程序手机号和tk
export const getWechatMpPhoneAndTk = (code, encryptedData, iv) => request.post(`/getWechatMpPhoneAndTk`, {
    code,
    encryptedData,
    iv
})

// 获得手机验证码
export const phoneSms = (phone) => request.get(`/sms?phone=${phone}`)

// 手机号登陆
export const loginMobile = (data) => request.post(`/mobile`, data)