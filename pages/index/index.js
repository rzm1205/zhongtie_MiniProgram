import { queryEntrance,queryInternal } from '../../service/indexAPI'
import { hexMD5 } from "../../utils/md5"
import Toast from '@vant/weapp/toast/toast';
//全局实例获取的数据
const enterpriseId = getApp().globalData.enterpriseId
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showEntrance: false,
    showInternal:false,
    code:'',
    pwd:''
  },
  //===================事件监听==================
  //前往访客预约
  goAddvisitorPage(){
    wx.navigateTo({
      url: '/pages/detail/visitorDetail/addvisitor',
    })
  },
  //打开智能门禁
  openEntrance(){
  //   //清空数据
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
      code: e.detail,
      pwd: e.detail
   });
  },
  //确认开启门禁
  confirmEntranceMethod (e){
    if(this.data.code === '' || this.data.code==undefined){
      Toast.fail('请输入验证码');
      return false;
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
  //打开智能门禁
  openInternal(){
    //清空数据
    this.setData({
      pwd: ''
   });
    //打开弹框
    this.setData({
      showInternal:true
    })
  },
  //前往内部管理
  goInternalPage(){
    wx.navigateTo({
      url: '/pages/internal/internal',
    })
  },
  //确认登录到内部管理
  confirmInternalMethod (e){
    if(this.data.pwd === ''){
      Toast.fail('请输入密码');
      return ;
    }
    console.log(hexMD5("123"));
    let params = {
      pwd:hexMD5(this.data.pwd),
      enterpriseId:enterpriseId
    }
    queryInternal(params).then( res =>{
        console.log(res)
        if(res.data.rs === 1){
          // console.log(res.data._token_iben)
          //将token存储到Storage中
          wx.setStorage({
            key: 'token',
            data: res.data._token_iben,
          })
          this.goInternalPage();//前往内部管理页面
        }else{
          Toast.fail(res.data.data.errorMsg);
          return ;
        }
    }).catch( err =>{

    })
  },
})