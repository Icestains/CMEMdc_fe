import request from '@/utils/request'

export function Login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/v1/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/v1/logout',
    method: 'post'
  })
}

export function SignUp(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

