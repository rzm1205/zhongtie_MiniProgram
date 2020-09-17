// pages/detail/internalDetail/appointment/appointment.js
import { queryAppointmentInfo } from '../../../../service/internalAPI'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageInfoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._queryPageInfo();//查询列表
  },
  //查询预约列表
  _queryPageInfo(){
    queryAppointmentInfo().then( res=>{
      if(res.data.rs ===1){
        const  pageInfoList = res.data.data
        this.setData({
          pageInfoList:pageInfoList
        })
      }
    })
  }
})