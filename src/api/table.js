import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

export function getUserInfoList(params) {
  return request({
    url: '/v1/get',
    method: 'get',
    params
  })
}

export function newUser(params) {
  return request({
    url: '/v1/post',
    method: 'post',
    data: params
  })
}

export function deleteUser(Uid) {
  return request({
    url: `/v1/delete/${Uid}`,
    method: 'delete'
  })
}

export function updateUser(params) {
  return request({
    url: `/v1/update`,
    method: 'post',
    data: params
  })
}
