import request from '@/plugin/axios'

var TenantGetAll = function (data) {
  return request({
    url: '/services/app/Tenant/GetLists',
    method: 'get',
    params: data
  })
}

var TenantGet = function (data) {
  return request({
    url: '/services/app/Tenant/Get',
    method: 'get',
    params: data
  })
}

var TenantDel = function (data) {
  return request({
    url: '/services/app/Tenant/Delete',
    method: 'delete',
    params: data
  })
}

var TenantCreate = function (data) {
  return request({
    url: '/services/app/Tenant/Create',
    method: 'post',
    data
  })
}
var TenantUpdate = function (data) {
  return request({
    url: '/services/app/Tenant/Update',
    method: 'put',
    data
  })
}
export { TenantGetAll, TenantGet, TenantDel, TenantCreate, TenantUpdate }