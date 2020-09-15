Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //事件监听
  goAddvisitorPage(){
    wx.navigateTo({
      url: '/pages/detail/visitorDetail/addvisitor',
    })
  }
  
})