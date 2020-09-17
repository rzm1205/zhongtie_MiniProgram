// pages/detail/internalDetail/modifyPersonnel/modifyPersonnel.js
import { getPersonnel,updatePersonnel,deletePersonnel }  from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    personnel:{
      name:'',
      phone:'',
      position:'',
      dept:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id:options.id
    })
    this._getPersonnelMethod();//获取单个工作人员
  },
  //事件监听
  _getPersonnelMethod(){
    getPersonnel(this.data.id).then( res =>{
      // console.log(res)
      if( res.data.rs === 1){
        this.setData({
          personnel:res.data.data
        })
      }
    })
  },
  //保存修改
  formSubmit(e){
    const {name,phone,dept,position} = e.detail.value;
    updatePersonnel(this.data.id,name,phone,dept,position).then( res =>{
      if(res.data.rs === 1){
        Toast.success("修改成功");
        // 修改成功后，返回
        setTimeout( ()=>{
          wx.navigateBack({
            delta: 1,
          })
        },2000)
      }
    })
  },
  //删除该人员
  deletePersonnelMethod(){
    deletePersonnel(this.data.id).then( res =>{
      if(res.data.rs === 1){
        Toast.success("删除成功");
        // 删除成功后，返回
        setTimeout( ()=>{
          wx.navigateBack({
            delta: 1,
          })
        },2000)
      }
    })
  }
})