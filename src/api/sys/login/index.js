import request from '@/plugin/axios'

var AccountLogin = function(data) {
  return request({
    url: '/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}

var GetUser = function(data) {
  return request({
    url: '/services/app/User/Get',
    method: 'get',
    params: data
  })
}

var GetAllUser = function(data) {
  return request({
    url: '/services/app/User/GetLists',
    method: 'get',
    params: data
  })
}

var UserCreate = function(data) {
  return request({
    url: '/services/app/User/Create',
    method: 'post',
    data
  })
}

var UserUpdate = function(data) {
  return request({
    url: '/services/app/User/Update',
    method: 'put',
    data
  })
}
var UserDelete = function(data) {
  return request({
    url: '/services/app/User/Delete',
    method: 'delete',
    params: data
  })
}

export{AccountLogin,GetUser,GetAllUser,UserCreate,UserUpdate,UserDelete}
