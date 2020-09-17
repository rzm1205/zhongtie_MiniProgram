import request from './network.js'
const token = wx.getStorageSync('token')
const robUuid = getApp().globalData.robUuid
// 查询定位列表
export function queryPositionList() {
  return request({
    method:"post",
    url:'/scene/listPointsByRobUuid',
    data:{
      robUuid:robUuid,
      _token_iben:token
    }
  })
}
//主动引领开门方法
export function openDoor(commonBroadcast,positionBroadcast,positionId) {
  return request({
    method:"post",
    url:'/ztjgOrderManage/manualUnlock',
    data:{
      robUuid:robUuid,
      commonBroadcast:commonBroadcast,
      positionBroadcast:positionBroadcast,
      positionId:positionId,
      _token_iben:token
    }
  })
}
//查询短信模板
export function queryMsgInfo() {
  return request({
    method:"post",
    url:'/messageTemplate/query',
    data:{
      _token_iben:token
    }
  })
}
//保存短信
export function saveMsg(agreeMsg,rejectMsg) {
  return request({
    method:"post",
    url:'/messageTemplate/save',
    data:{
      agreeMsg:agreeMsg,
      rejectMsg:rejectMsg,
      _token_iben:token
    }
  })
}
//修改密码
export function modifyPSD(oldPwd,newPwd) {
  return request({
    method:"post",
    url:'/internalManage/updatePwd',
    data:{
      oldPwd:oldPwd,
      newPwd:newPwd,
      _token_iben:token
    }
  })
}
//查询预约列表
export function queryAppointmentInfo() {
  return request({
    method:"post",
    url:'/ztjgOrderManage/listPassedOrderRecord',
    data:{
      _token_iben:token
    }
  })
}
