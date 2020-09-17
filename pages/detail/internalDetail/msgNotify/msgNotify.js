// pages/detail/internalDetail/msgNotify/msgNotify.js
import { saveMsg,queryMsgInfo } from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreeMsg:'',
    rejectMsg:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._queryMsgInfo();//查询短信模板
  },
  //事件监听
  _queryMsgInfo(){
    //查询短信模板
    queryMsgInfo().then(res => {
      if(res.data.rs ===1){
        this.setData({
          agreeMsg:res.data.data.agreeMsg,
          rejectMsg:res.data.data.rejectMsg
        })
      }
    })
  },
  //保存短信
  saveMsgMethod(event){
    const agreeMsg = event.detail.value.agreeMsg;
    const rejectMsg = event.detail.value.rejectMsg;
    if(agreeMsg=='' || agreeMsg==undefined){
      Toast.fail("请输入同意短信");
      return false;
    }
    if(rejectMsg=='' || rejectMsg==undefined){
      Toast.fail("请输入拒绝短信");
      return false;
    }
    this.setData({
      agreeMsg:agreeMsg,
      rejectMsg:rejectMsg
    })
    saveMsg(agreeMsg,rejectMsg).then( res => {
      if(res.data.rs === 1){
        Toast.success("修改成功");
        setTimeout(()=>{
          wx.navigateBack({
            delta:1 //返回上一级页面
          })
        },2000)
      }else{
        Toast.fail(res.data.errorMsg);
      }
    })
  }
})