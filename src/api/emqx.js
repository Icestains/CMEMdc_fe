import request from '@/utils/request'

export function GetDataList(params) {
  return request({
    url: '/v1/emqxdata',
    method: 'get',
    params
  })
}

export function GetClientsList(params) {
  return request({
    url: '/v1/emqxclient',
    method: 'get',
    params
  })
}

export function GetDataBySender(Sender) {
  return request({
    url: `/v1/sender/${Sender}`,
    method: 'get'
  })
}
