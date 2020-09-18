// pages/detail/internalDetail/booking/booking.js
import { queryBookingInfo,agreeInfo,rejectInfo,queryPositionList} from '../../../../service/internalAPI'
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfoList:[],
    curPositionId:'',//当前的id
    positionBroadcast:'',//贵宾点位迎宾语
    positionList:[],//点位数据
    showAgree:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._queryPageInfo();//查询列表
  },
  //查询未操作的列表
  _queryPageInfo(){
    queryBookingInfo().then( res=>{
      if(res.data.rs ===1){
        const  pageInfoList = res.data.data
        this.setData({
          pageInfoList:pageInfoList
        })
      }
    })
  },
  //查询定位列表
  _queryPositionList(){
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
  //定位播报语
  positionBroadcastInput(event){
    this.setData({
      positionBroadcast:event.detail
    })
  },
  //获取定位id
  getPositionId(event){
    console.log(event)
    // eventTarget.dataset;
    const dataset = event.currentTarget.dataset;
    this.setData({
      curPositionId:dataset.item.slocId
    })
  },
  //事件监听
  agreeDialog(){
    //定位弹框
    this.setData({
      showAgree:true
    })
    this._queryPositionList();//查询定位列表
  },
  //同意方法
  agreeInfoMethod(){
   let  positionBroadcast = this.data.positionBroadcast,
    positionId = this.data.curPositionId;
    agreeInfo(positionId,positionBroadcast).then( res => {
      if(res.data.rs === 1){
        Toast.success("同意成功");
        this._queryPageInfo();//查询列表
      }else{
        Toast.fail(res.data.data.erroMsg);
      }
    })
  },
  rejectDialog(event){
    // console.log(event)
    const id = event.currentTarget.dataset.id
    Dialog.confirm({
      message: '确定拒绝该人员吗？',
    }).then(() => {
      this._rejectInfoMethod(id);//拒绝
    });
  },
  //拒绝方法
  _rejectInfoMethod(id){
    rejectInfo(id).then( res => {
      if(res.data.rs === 1){
        Toast.success("拒绝成功");
        this._queryPageInfo();//查询列表
      }else{
        Toast.fail(res.data.data.erroMsg);
      }
    })
  }
})