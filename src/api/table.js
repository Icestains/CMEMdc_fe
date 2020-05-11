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
    url: '/get',
    method: 'get',
    params
  })
}

export function newUser(params) {
  return request({
    url: '/post',
    method: 'post',
    data: params
  })
}

export function deleteUser(Uid) {
  return request({
    url: `/delete/${Uid}`,
    method: 'delete'
  })
}

export function updateUser(params) {
  return request({
    url: `/update`,
    method: 'post',
    data: params
  })
}
