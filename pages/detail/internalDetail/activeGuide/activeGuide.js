// pages/detail/internalDetail/activeGuide/activeGuide.wxml.js
import { queryPositionList ,openDoor } from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commonBroadcast:'',
    positionBroadcast:'',
    positionId:'',
    curPositionId:'',//当前的id
    positionList :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._querylist();//查询定位列表
  },
  //查询列表
  _querylist(){
    queryPositionList().then( res =>{
      if(res.data.rs === 1){
        //添加一个无的点位
        let set = {slocId:'',slocName:'无',isVIP:false}
        let positionList = []
        positionList.push(set);
        let positionList2 = [];
        positionList2 = res.data.data;
        positionList2.map((item,index) =>{
          if(index === positionList2.length-1){
            item.isVIP = true;
          }else{
            item.isVIP = false;
          }
        })
        this.setData({
          positionList: positionList.concat(positionList2)
        })
        console.log(this.data.positionList)
      }
    })
  },
  //  事件的监听
  commonBroadcastInput(event){
    this.setData({
      commonBroadcast:event.detail
    })
  },
  positionBroadcastInput(event){
    this.setData({
      positionBroadcast:event.detail
    })
  },
  //获取点位id
  getPositionId(event){
    console.log(event)
    // eventTarget.dataset;
    const dataset = event.currentTarget.dataset;
    this.setData({
      curPositionId:dataset.item.slocId
    })
  },
  //主动引领事件
  activeOpenDoorMethod(){
    let commonBroadcast = this.data.commonBroadcast,
    positionBroadcast = this.data.positionBroadcast,
    positionId = this.data.curPositionId;
    openDoor(commonBroadcast,positionBroadcast,positionId).then( res =>{
      if(res.data.rs === 1){
        Toast.success("已通知机器人开门请您耐心等待");
        // 添加成功后，跳转到内部管理
        wx.navigateTo({
          url: '/pages/internal/internal',
        })
      } else {
        if(res.data.data && res.data.data.errorMsg){
           Toast.fail(res.data.data.errorMsg);
        }else{
          Toast.fail(res.data.errorMsg);
        }
      }
    })
  }
})