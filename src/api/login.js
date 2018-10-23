import request from '@/utils/request'

import axiosJson from '../utils/axiosJson';

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export const getUserInfo = json => {
  return axiosJson.post('book/bookregister/loginBooker', json);
};
