// pages/detail/internalDetail/addPersonnel/addPersonnel.js
import { addPersonnel }  from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  },
  //事件监听
  //新增保存
  formSubmit(e){
    const {name,phone,dept,position} = e.detail.value;
    addPersonnel(name,phone,dept,position).then( res =>{
      if(res.data.rs === 1){
        Toast.success("新增成功");
        // 修改成功后，返回
        setTimeout( ()=>{
          wx.navigateBack({
            delta: 1,
          })
        },2000)
      }
    })
  }
})