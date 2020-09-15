//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    enterpriseId:297,//886,//写死，297是测试环境，123456@qq.com,密码123456 ，正式环境ZhongTieJianGong@qq.com  密码：123456，企业id  886
    robUuid:'a26f7658690140fd9db307c49a3482fa'//测试环境,//'c20ce36a02f246caa950affb92836ad4'//正式环境小铁，
  }
})