import { queryEntrance } from '../../service/entranceAPI'
import Toast from '@vant/weapp/toast/toast';
//全局实例获取的数据
const robotUuid = getApp().globalData.robotUuid
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showEntrance: false,
  },
  //===================事件监听==================
  //前往访客预约
  goAddvisitorPage(){
    wx.navigateTo({
      url: '/pages/detail/visitorDetail/addvisitor',
    })
  },
  //前往内部管理
  goInternalPage(){
    wx.navigateTo({
      url: '/pages/internal/internal',
    })
  },
  //打开智能门禁
  openEntrance(){
    //清空数据
    this.setData({
      code: ''
   });
    //打开弹框
    this.setData({
      showEntrance:true
    })
  },
  codeInput(e) {
    // console.log(e)
    this.setData({
      code: e.detail
   });
  },
  //确认开启门禁
  confirmEntranceMethod (e){
    if(this.data.code === ''){
      Toast.fail('请输入验证码');
      return ;
    }
    let params = {
      code:this.data.code,
      robotUuid:robotUuid
    }
    queryEntrance(params).then( res =>{
        console.log(res)
        if(res.data.data.rs === 1){
          Toast.success('正在为您开门请您耐心等待');
        }else{
          Toast.fail(res.data.data.errorMsg);
          return ;
        }
    }).catch( err =>{

    })
  },
  onClose() {
    this.setData({ close: false });
  },
})