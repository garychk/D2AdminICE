import request from '@/plugin/axios'

var ContentGetAll = function(data) {
    return request({
      url: '/services/app/Article/GetListsAsync',
      method: 'get',
      params: data
    })
  }

  var ContentGet = function(data) {
    return request({
      url: '/services/app/Article/Get',
      method: 'get',
      params: data
    })
  }

  var ContentDel = function(data) {
    return request({
      url: '/services/app/Article/Delete',
      method: 'delete',
      params: data
    })
  }

  var ContentCreateOrUpdate = function(data) {
    return request({
      url: '/services/app/Article/CreateOrUpdateAsync',
      method: 'post',
      data
    })
  }

  export{ContentGetAll,ContentGet,ContentDel,ContentCreateOrUpdate}
