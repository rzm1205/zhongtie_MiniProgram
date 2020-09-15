import request from './network.js'
// 例子
export function queryEntrance(data) {
  return request({
    method:"post",
    url:'/ztjgOrderManage/autoUnlock',
    data:data
  })
}

export function queryInternal(data) {
  return request({
    method:"post",
    url:'/internalManage/login',
    data:data
  })
}