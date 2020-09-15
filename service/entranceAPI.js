import request from './network.js'
// 例子
export function queryEntrance(data) {
  return request({
    method:"post",
    url:'/ztjgOrderManage/autoUnlock',
    data:data
  })
}