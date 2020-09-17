// pages/detail/internalDetail/personnel/personnel.js
import { queryPersonnelInfo } from '../../../../service/internalAPI'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personnelList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._queryPersonnelList();//查询列表
  },
  onShow: function () {
    //需要写在onshow生命周期中，否则不刷新
    this._queryPersonnelList();//查询列表
  },
  //查询工作人员列表
  _queryPersonnelList(){
    queryPersonnelInfo().then( res => {
      if( res.data.rs === 1){
        this.setData({
          personnelList:res.data.data
        })
      }
    })
  },
  //事件监听
  goAddPersonnelMethod(){
    wx.navigateTo({
      url: '/pages/detail/internalDetail/addPersonnel/addPersonnel',
    })
  }
})