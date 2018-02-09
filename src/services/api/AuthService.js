import _ from 'lodash'
import request from '../request'

const login = (user) => request({
  url:    '/users/login?include=user',
  method: 'POST',
  data: user
})
const logout = (access_token) => request({
  url:    '/users/logout',
  method: 'POST',
  params: {
    access_token
  }
})

export {
  login,
  logout
}