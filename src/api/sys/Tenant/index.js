import request from '@/plugin/axios'

export function TenantGetAll (data) {
    return request({
      url: '/services/app/Tenant/GetLists',
      method: 'get',
      params: data
    })
  }

  export function TenantGet (data) {
    return request({
      url: '/services/app/Tenant/Get',
      method: 'get',
      params: data
    })
  }

  export function TenantDel (data) {
    return request({
      url: '/services/app/Tenant/Delete',
      method: 'delete',
      params: data
    })
  }

  export function TenantCreate (data) {
    return request({
      url: '/services/app/Tenant/Create',
      method: 'post',
      data
    })
  }