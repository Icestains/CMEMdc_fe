import request from '@/utils/request'

export function getDataList(params) {
  return request({
    url: '/v1/emqxdata',
    method: 'get',
    params
  })
}

export function getClientsList(params) {
  return request({
    url: '/v1/emqxclient',
    method: 'get',
    params
  })
}
