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