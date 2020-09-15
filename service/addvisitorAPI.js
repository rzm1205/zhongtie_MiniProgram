import request from './network.js'
// 例子
export function queryPersonnelPageInfo(enterpriseId) {
  return request({
    method:"post",
    url:'/ztjgPersonnel/listPersonnel',
    data:{
      enterpriseId:enterpriseId
    }
  })
}
//提交申请
export function submit(data) {
  return request({
    method:"post",
    url:'/ztjgOrderManage/addOrder',
    data:data
  })
}
