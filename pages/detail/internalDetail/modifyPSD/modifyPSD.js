// pages/detail/internalDetail/modifyPSD/modifyPSD.js
import {modifyPSD } from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPwd:"",
    newPwd:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onSubmit(event){
    const oldPwd = event.detail.value.oldPwd;
    const newPwd = event.detail.value.newPwd;
    if(oldPwd =='' || oldPwd==undefined){
      Toast.fail('请输入旧密码');
      return false
    }
    if(newPwd =='' || newPwd==undefined){
      Toast.fail('请输入新密码');
      return false
    }
    modifyPSD(oldPwd,newPwd).then( res=>{
      if(res.data.rs === 1){
        Toast.success("修改成功");
        setTimeout(()=>{
          wx.navigateBack({
            delta:1 //返回上一级页面
          })
        },2000)
      }else{
        Toast.fail(res.data.data.errorMsg);
      }
    })
  }
})