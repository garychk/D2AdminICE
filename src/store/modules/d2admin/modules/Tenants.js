import util from '@/libs/util.js'
import { TenantGetAll, TenantGet, TenantDel, TenantCreate, TenantUpdate } from '@/api/sys/Tenant'

export default {
    namespaced: true,
    actions: {
        GetAll({ dispatch }, {
            vm,
            skipCount,
            maxResultCount
        }) {
            return TenantGetAll({
                SkipCount: skipCount,
                MaxResultCount: maxResultCount
            }).catch(err => {
                console.log('err: ', err)
            })
        },
        CreateOrUpdate(vm, data){   
            if(data.id == 0 || data.id == null)                
              return TenantCreate(data)
            else
              return TenantUpdate(data)
          },
    }
}