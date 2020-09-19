// pages/detail/internalDetail/personnel/personnel.js
import { queryPersonnelInfo,deletePersonnel } from '../../../../service/internalAPI'
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

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
    // this._queryPersonnelList();//查询列表
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
  },
  //事件监听
  onClose(event) {
    // console.log(event)
    const id = event.currentTarget.dataset.id;
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除该人员吗？',
        }).then(() => {
          this.deletePersonnelMethod(id);//删除
          instance.close();
        });
        break;
    }
  },
  //左侧滑动删除该人员
  deletePersonnelMethod(id){
    deletePersonnel(id).then( res =>{
      if(res.data.rs === 1){
        Toast.success("删除成功");
        // 删除成功后，查询列表
        this._queryPersonnelList();//查询列表
      }
    })
  }
})